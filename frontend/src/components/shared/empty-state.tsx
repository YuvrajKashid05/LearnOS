import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-70 w-full items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 py-10",
        className,
      )}
    >
      <div className="flex max-w-md flex-col items-center text-center">
        {icon && (
          <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            {icon}
          </div>
        )}

        <h3 className="text-base font-semibold text-foreground">{title}</h3>

        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}

        {action && <div className="mt-5">{action}</div>}
      </div>
    </div>
  );
}
