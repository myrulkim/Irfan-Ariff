import { ImageResponse } from 'next/og';
import { createClient } from '@/lib/supabase/client';

export const runtime = 'edge';

export async function GET() {
    try {
        const supabase = createClient();
        const { data: projects } = await supabase
            .from('projects')
            .select('title')
            .order('is_latest', { ascending: false })
            .order('display_order', { ascending: true })
            .limit(1);

        const latestProject = projects && projects.length > 0 ? projects[0].title : 'Portfolio';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '630px',
                        width: '1200px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        backgroundColor: '#000000',
                        backgroundImage: 'radial-gradient(circle at 25% 25%, #111111 0%, #000000 100%)',
                        padding: '80px',
                        fontFamily: 'monospace',
                    }}
                >
                    {/* Header Brand */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '40px',
                            left: '40px',
                            fontSize: '32px',
                            color: '#ffffff',
                            opacity: 0.8,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ color: '#22c55e', fontWeight: 'bold', display: 'flex' }}>{`>`}</div>
                        <div style={{ marginLeft: '10px', display: 'flex' }}>irfan.</div>
                    </div>

                    {/* Status Dot */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '40px',
                            right: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '8px 20px',
                            borderRadius: '20px',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                        }}
                    >
                        <div
                            style={{
                                width: '12px',
                                height: '12px',
                                backgroundColor: '#22c55e',
                                borderRadius: '50%',
                                display: 'flex',
                                marginRight: '10px',
                                boxShadow: '0 0 10px #22c55e'
                            }}
                        ></div>
                        <div style={{ color: '#22c55e', fontSize: '18px', fontWeight: 'bold', display: 'flex' }}>{`[ ONLINE ]`}</div>
                    </div>

                    {/* Main Content Block */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            padding: '20px',
                            borderLeft: '4px solid #22c55e'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                fontSize: '72px',
                                fontWeight: 'bold',
                                color: '#ffffff',
                                margin: 0,
                                letterSpacing: '-1px'
                            }}
                        >
                            Irfan Ariff | Software Developer
                        </div>

                        <div
                            style={{
                                fontSize: '32px',
                                color: '#888888',
                                marginTop: '10px',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <div style={{ color: '#22c55e', display: 'flex' }}>{`~ /`}</div>
                            <div style={{ marginLeft: '12px', display: 'flex' }}>seeking_internship_2026</div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div
                        style={{
                            display: 'flex',
                            marginTop: '50px',
                        }}
                    >
                        {['Next.js', 'Flutter', 'Custom Systems'].map((tech) => (
                            <div
                                key={tech}
                                style={{
                                    background: 'rgba(34, 197, 94, 0.05)',
                                    border: '1px solid rgba(34, 197, 94, 0.2)',
                                    color: '#22c55e',
                                    padding: '12px 24px',
                                    borderRadius: '10px',
                                    fontSize: '22px',
                                    marginRight: '20px',
                                    display: 'flex'
                                }}
                            >
                                {`[ ${tech} ]`}
                            </div>
                        ))}
                    </div>

                    {/* Footer / Latest Push */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '40px',
                            left: '40px',
                            fontSize: '20px',
                            color: '#555555',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ color: '#22c55e', display: 'flex' }}>{`[ latest_push:`}</div>
                        <div style={{ color: '#888888', marginLeft: '10px', display: 'flex' }}>{`${latestProject} ]`}</div>
                    </div>
                </div>
            ),
            { width: 1200, height: 630 }
        );
    } catch (e: any) {
        return new Response(`Error: ${e.message}`, { status: 500 });
    }
}
