import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type AnalyticsCardProps = {
  title?: string;
  label?: string;
  value: string;
  change: string;
  description: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  className?: string;
};

export default function AnalyticsCard({
  title,
  label,
  value,
  change,
  description,
  icon: Icon,
  trend = "up",
  className,
}: AnalyticsCardProps) {
  const displayLabel = label ?? title ?? "";

  const trendClass =
    trend === "up"
      ? "text-emerald-600 dark:text-emerald-400"
      : trend === "down"
        ? "text-destructive"
        : "text-muted-foreground";

  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-card p-5 transition-colors hover:border-border",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4.5" aria-hidden="true" />
        </div>

        <span className={cn("text-xs font-medium", trendClass)}>{change}</span>
      </div>

      <p className="mt-5 text-sm text-muted-foreground">{displayLabel}</p>

      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
