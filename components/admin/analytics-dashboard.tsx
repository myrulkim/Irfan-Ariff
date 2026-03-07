'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AnalyticsData } from '@/lib/types';
import { BarChart3, MousePointer2 } from 'lucide-react';

export function AnalyticsDashboard({ initialData }: { initialData: AnalyticsData[] }) {
    const [analytics, setAnalytics] = useState<AnalyticsData[]>(initialData);
    const supabase = createClient();

    useEffect(() => {
        // Subscribe to real-time changes
        const channel = supabase
            .channel('analytics-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'analytics'
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setAnalytics(prev => [...prev, payload.new as AnalyticsData]);
                    } else if (payload.eventType === 'UPDATE') {
                        setAnalytics(prev =>
                            prev.map(item => item.id === payload.new.id ? (payload.new as AnalyticsData) : item)
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    // Sort analytics by count
    const sortedAnalytics = [...analytics].sort((a, b) => b.count - a.count);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <BarChart3 className="text-blue-500 w-5 h-5" />
                    Interaction Analytics
                </h2>
                <div className="flex items-center gap-2">
                    <p className="text-sm text-neutral-500">
                        Tracking clicks and engagement metrics.
                    </p>
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" title="Live Sync Active" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {sortedAnalytics.length > 0 ? (
                    sortedAnalytics.map((stat) => (
                        <div key={stat.id} className="bg-neutral-900/40 p-5 rounded-xl border border-white/5 flex flex-col gap-2 group hover:border-blue-500/30 transition-colors">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold font-mono">
                                    {stat.event_name.replace(/_/g, ' ')}
                                </span>
                                <MousePointer2 className="w-3 h-3 text-neutral-600 group-hover:text-blue-400" />
                            </div>
                            <div className="flex items-end justify-between">
                                <span className="text-3xl text-white font-mono">{stat.count}</span>
                                <span className="text-[10px] text-neutral-600 italic">
                                    {new Date(stat.updated_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full border border-dashed border-white/10 p-10 rounded-xl text-center">
                        <p className="text-neutral-500 italic">No interaction data found. Events will appear once triggered.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
