export function LatestBadge() {
    return (
        <div className="absolute top-3 right-3 z-30 flex items-center gap-2 px-2 py-1 rounded-full bg-black/80 backdrop-blur-sm border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
            <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-[10px] font-mono font-medium text-green-400 tracking-wider">
                [ LATEST_PUSH ]
            </span>
        </div>
    );
}
