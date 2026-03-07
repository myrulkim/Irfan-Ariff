'use client';

import { useEffect, useRef } from 'react';
import { trackClick } from '@/lib/actions/analytics';

export function VisitTracker() {
    const tracked = useRef(false);

    useEffect(() => {
        // Only track once per component mount (session-ish)
        if (tracked.current) return;

        // We use a simple localStorage flag to avoid counting refreshes as new visitors
        // during the same browser session.
        const sessionKey = `portfolio_visit_${new Date().toISOString().split('T')[0]}`;
        const hasVisitedToday = localStorage.getItem(sessionKey);

        if (!hasVisitedToday) {
            trackClick('unique_visitor');
            localStorage.setItem(sessionKey, 'true');
        }

        // We still track "total_page_views" if you want both
        trackClick('total_page_view');

        tracked.current = true;
    }, []);

    return null; // This component doesn't render anything
}
