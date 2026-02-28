import { ImageResponse } from 'next/og';
import { createClient } from '@/lib/supabase/client';

// We avoid 'edge' for now as it can be picky with certain dependencies,
// and we'll use the browser client to avoid cookies() issues.
export const dynamic = 'force-dynamic';

export async function GET() {
    // Using the browser client to avoid cookies() issues in the OG route
    const supabase = createClient();

    const { data: projects, error } = await supabase
        .from('projects')
        .select('title')
        .order('is_latest', { ascending: false })
        .order('display_order', { ascending: true })
        .limit(1);

    if (error) {
        console.error('OG Image Supabase Error:', error);
    }

    const latestProject = projects && projects.length > 0 ? projects[0].title : 'Portfolio';

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    backgroundColor: '#000',
                    backgroundImage: 'radial-gradient(circle at 25% 25%, #111 0%, #000 100%)',
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
                        color: '#fff',
                        opacity: 0.8,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <div style={{ color: '#22c55e', fontWeight: 'bold' }}>&gt;</div>
                    <div>irfan.</div>
                </div>

                {/* Status Dot */}
                <div
                    style={{
                        position: 'absolute',
                        top: '40px',
                        right: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                    }}
                >
                    <div
                        style={{
                            width: '10px',
                            height: '10px',
                            backgroundColor: '#22c55e',
                            borderRadius: '50%',
                            boxShadow: '0 0 10px #22c55e',
                        }}
                    ></div>
                    <div style={{ color: '#22c55e', fontSize: '18px', fontWeight: 'bold' }}>ONLINE</div>
                </div>

                {/* Main Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        position: 'relative',
                    }}
                >
                    {/* Subtle Glow Background for Text */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-20px',
                            left: '-20px',
                            right: '-20px',
                            bottom: '-20px',
                            background: 'rgba(34, 197, 94, 0.03)',
                            filter: 'blur(30px)',
                            borderRadius: '20px',
                        }}
                    ></div>

                    <h1
                        style={{
                            fontSize: '72px',
                            fontWeight: 'bold',
                            color: '#fff',
                            margin: 0,
                            letterSpacing: '-2px',
                        }}
                    >
                        Irfan Ariff | Software Developer
                    </h1>

                    <p
                        style={{
                            fontSize: '32px',
                            color: '#666',
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <span style={{ color: '#22c55e' }}>~ /</span>
                        <span>seeking_internship_2026</span>
                    </p>
                </div>

                {/* Tags */}
                <div
                    style={{
                        display: 'flex',
                        gap: '16px',
                        marginTop: '40px',
                    }}
                >
                    {['Next.js', 'Flutter', 'Custom Systems'].map((tech) => (
                        <div
                            key={tech}
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#aaa',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                fontSize: '24px',
                            }}
                        >
                            [ {tech} ]
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
                        color: '#444',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <span style={{ color: '#22c55e' }}>[ latest_push:</span>
                    <span style={{ color: '#888' }}>{latestProject} ]</span>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
