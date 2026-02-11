import { cn } from "@/lib/utils";
import { Folder } from "lucide-react";

interface ProjectHeaderProps {
    title: string;
    path?: string; // e.g., "~/projects/"
    extension?: string; // e.g., ".dart"
    className?: string; // For additional styling
}

export function ProjectHeader({ title, path = "~/projects/", extension = "", className }: ProjectHeaderProps) {
    return (
        <div className={cn("flex flex-col space-y-1.5 font-mono text-xs sm:text-sm text-neutral-500", className)}>
            <div className="flex items-center gap-2 opacity-70">
                <Folder className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-blue-500">{path}</span>
            </div>
            <div className="flex items-center gap-1 font-bold text-neutral-300 text-base sm:text-lg">
                <span>{title}</span>
                <span className="text-neutral-600 font-normal">{extension}</span>
            </div>
        </div>
    );
}
