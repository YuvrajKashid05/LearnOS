import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  count?: string;
  className?: string;
};

export default function SectionHeader({
  title,
  description,
  action,
  count,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-6 flex items-end justify-between gap-4", className)}>
      <div className="min-w-0">
        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {count && (
          <span className="hidden text-xs text-muted-foreground sm:block">
            {count}
          </span>
        )}

        {action}
      </div>
    </div>
  );
}
