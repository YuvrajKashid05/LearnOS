import {
  ArrowUpRight,
  Clock3,
  MoreHorizontal,
  PlayCircle,
  Sparkles,
} from "lucide-react";

import ProgressBar from "@/components/shared/progress-bar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TopicStatus = "draft" | "processing" | "ready" | "failed";

type TopicCardProps = {
  title: string;
  category: string;
  difficulty: string;
  status: TopicStatus;
  progress: number;
  videosFound: number;
  videosAnalyzed: number;
  updatedAt: string;
  className?: string;
};

const statusConfig: Record<
  TopicStatus,
  {
    label: string;
    className: string;
    dotClassName: string;
  }
> = {
  draft: {
    label: "Draft",
    className: "border-border bg-muted/50 text-muted-foreground",
    dotClassName: "bg-muted-foreground",
  },
  processing: {
    label: "Processing",
    className: "border-primary/20 bg-primary/10 text-primary",
    dotClassName: "bg-primary animate-pulse",
  },
  ready: {
    label: "Ready",
    className:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    dotClassName: "bg-emerald-500",
  },
  failed: {
    label: "Failed",
    className: "border-destructive/20 bg-destructive/10 text-destructive",
    dotClassName: "bg-destructive",
  },
};

export default function TopicCard({
  title,
  category,
  difficulty,
  status,
  progress,
  videosFound,
  videosAnalyzed,
  updatedAt,
  className,
}: TopicCardProps) {
  const config = statusConfig[status];

  return (
    <article
      className={cn(
        "group rounded-xl border border-border/60 bg-card p-5 transition-colors hover:border-border",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="size-4.5" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold">{title}</h3>

            <p className="mt-1 text-xs text-muted-foreground">{category}</p>
          </div>
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

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
            config.className,
          )}
        >
          <span
            className={cn("size-1.5 rounded-full", config.dotClassName)}
            aria-hidden="true"
          />
          {config.label}
        </span>

        <span className="rounded-full border border-border/60 bg-muted/30 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
          {difficulty}
        </span>
      </div>

      <div className="mt-5">
        <ProgressBar value={progress} showLabel label="Pipeline progress" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border/60 pt-4">
        <div>
          <p className="text-lg font-semibold">{videosFound}</p>
          <p className="text-xs text-muted-foreground">Videos found</p>
        </div>

        <div>
          <p className="text-lg font-semibold">{videosAnalyzed}</p>
          <p className="text-xs text-muted-foreground">Videos analyzed</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          <Clock3 className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{updatedAt}</span>
        </div>

        <Button type="button" variant="ghost" size="sm" className="shrink-0">
          <span className="hidden sm:inline">View topic</span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Button>
      </div>

      {status === "processing" && (
        <div className="mt-3 flex items-center gap-2 rounded-md bg-primary/5 px-3 py-2 text-xs text-primary">
          <PlayCircle className="size-3.5" aria-hidden="true" />
          AI pipeline is currently processing this topic.
        </div>
      )}
    </article>
  );
}
