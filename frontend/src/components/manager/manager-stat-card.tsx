import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ManagerStatCardProps = {
  label: string;
  value: string;
  change: string;
  description: string;
  icon: LucideIcon;
  className?: string;
};

export default function ManagerStatCard({
  label,
  value,
  change,
  description,
  icon: Icon,
  className,
}: ManagerStatCardProps) {
  return (
    <div
      className={cn(
        "group rounded-xl border border-border/60 bg-card p-5 transition-colors hover:border-border",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4.5" aria-hidden="true" />
        </div>

        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {change}
        </span>
      </div>

      <p className="mt-5 text-sm text-muted-foreground">{label}</p>

      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
