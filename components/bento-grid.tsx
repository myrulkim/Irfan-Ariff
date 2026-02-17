"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    children,
    isLatest = false,
}: {
    className?: string;
    title?: string | ReactNode;
    description?: string | ReactNode;
    header?: ReactNode;
    icon?: ReactNode;
    children?: ReactNode;
    isLatest?: boolean;
}) => {
    return (
        <motion.div
            initial={isLatest
                ? { opacity: 0, scale: 0.92, y: 30 }
                : { opacity: 0, y: 20 }
            }
            whileInView={isLatest
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 1, y: 0 }
            }
            viewport={{ once: true }}
            transition={isLatest
                ? { duration: 0.8, ease: "easeOut" }
                : { duration: 0.4 }
            }
            whileHover={{ scale: 1.01 }}
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 glow-border bg-stone-950",
                isLatest ? "border-green-500/20 latest-glow" : "",
                className
            )}
        >
            {header && <div className="flex flex-1 w-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800">{header}</div>}
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                {icon && <div className="mb-2">{icon}</div>}
                {title && <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {title}
                </div>}
                {description && <div className="font-sans font-normal text-neutral-600 dark:text-neutral-300 text-xs">
                    {description}
                </div>}
                {children}
            </div>
        </motion.div>
    );
};
