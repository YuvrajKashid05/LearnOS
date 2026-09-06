import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  MoreHorizontal,
  PlayCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AnalysisStatus = "analyzing" | "completed" | "needs-review" | "failed";

type AnalysisCardProps = {
  title: string;
  channel: string;
  duration: string;
  score: number;
  relevance: number;
  quality: number;
  transcript: "available" | "missing";
  status: AnalysisStatus;
  className?: string;
};

const statusConfig: Record<
  AnalysisStatus,
  {
    label: string;
    className: string;
    icon: typeof CheckCircle2;
  }
> = {
  analyzing: {
    label: "Analyzing",
    className: "text-primary",
    icon: Sparkles,
  },
  completed: {
    label: "Analyzed",
    className: "text-emerald-600 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  "needs-review": {
    label: "Needs review",
    className: "text-amber-600 dark:text-amber-400",
    icon: AlertTriangle,
  },
  failed: {
    label: "Failed",
    className: "text-destructive",
    icon: AlertTriangle,
  },
};

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">{label}</span>

        <span className="text-xs font-medium">{value}%</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

export default function AnalysisCard({
  title,
  channel,
  duration,
  score,
  relevance,
  quality,
  transcript,
  status,
  className,
}: AnalysisCardProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <article
      className={cn(
        "group rounded-xl border border-border/60 bg-card p-5 transition-colors hover:border-border",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <PlayCircle className="size-5" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
                {title}
              </h3>

              <p className="mt-1 text-xs text-muted-foreground">
                {channel} · {duration}
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`More options for ${title}`}
              className="shrink-0"
            >
              <MoreHorizontal className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium",
                config.className,
              )}
            >
              <StatusIcon
                className={cn(
                  "size-3.5",
                  status === "analyzing" && "animate-pulse",
                )}
                aria-hidden="true"
              />

              {config.label}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">AI score</span>

              <span className="text-sm font-semibold">{score}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <Score label="Topic relevance" value={relevance} />
        <Score label="Content quality" value={quality} />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
            transcript === "available"
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
          )}
        >
          <FileText className="size-3" aria-hidden="true" />

          {transcript === "available"
            ? "Transcript available"
            : "Transcript missing"}
        </span>

        {status === "completed" && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/30 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            <ShieldCheck className="size-3" aria-hidden="true" />
            Quality checked
          </span>
        )}
      </div>
    </article>
  );
}
