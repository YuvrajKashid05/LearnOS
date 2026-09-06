import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  GripVertical,
  MoreHorizontal,
  PlayCircle,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LearningModule = {
  id: string;
  title: string;
  description: string;
  videos: number;
  duration: string;
  score: number;
  status: "approved" | "review" | "pending";
};

type LearningPathReviewProps = {
  title: string;
  category: string;
  difficulty: string;
  progress: number;
  modules: LearningModule[];
  className?: string;
};

const moduleStatus = {
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    className: "text-emerald-600 dark:text-emerald-400",
    badge:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  review: {
    label: "Review",
    icon: CircleAlert,
    className: "text-amber-600 dark:text-amber-400",
    badge:
      "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  pending: {
    label: "Pending",
    icon: CircleAlert,
    className: "text-muted-foreground",
    badge: "border-border bg-muted/40 text-muted-foreground",
  },
};

export default function LearningPathReview({
  title,
  category,
  difficulty,
  progress,
  modules,
  className,
}: LearningPathReviewProps) {
  return (
    <section
      className={cn("rounded-xl border border-border/60 bg-card", className)}
    >
      <div className="border-b border-border/60 p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="size-4.5" aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-semibold tracking-tight">
                  {title}
                </h2>

                <span className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                  {difficulty}
                </span>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {category} · AI-generated learning path
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <Button type="button" variant="outline" size="sm">
              Preview
            </Button>

            <Button type="button" size="sm">
              Publish path
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Review progress</p>

            <p className="mt-0.5 text-sm font-medium">{progress}% complete</p>
          </div>

          <span className="text-xs text-muted-foreground">
            {modules.length} modules
          </span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
            }}
          />
        </div>
      </div>

      <div className="divide-y divide-border/60">
        {modules.map((module, index) => {
          const status = moduleStatus[module.status];
          const StatusIcon = status.icon;

          return (
            <div
              key={module.id}
              className="group flex gap-3 p-4 transition-colors hover:bg-muted/20 sm:p-5"
            >
              <button
                type="button"
                className="mt-1 hidden shrink-0 cursor-grab text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 sm:block"
                aria-label={`Reorder module ${index + 1}`}
              >
                <GripVertical className="size-4" aria-hidden="true" />
              </button>

              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/50 text-xs font-semibold text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold">{module.title}</h3>

                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {module.description}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="hidden shrink-0 sm:inline-flex"
                    aria-label={`More options for ${module.title}`}
                  >
                    <MoreHorizontal className="size-4" aria-hidden="true" />
                  </Button>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
                      status.badge,
                    )}
                  >
                    <StatusIcon className="size-3" aria-hidden="true" />
                    {status.label}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <PlayCircle className="size-3" aria-hidden="true" />
                    {module.videos} videos
                  </span>

                  <span className="text-[11px] text-muted-foreground">
                    {module.duration}
                  </span>

                  <span className="text-[11px] font-medium text-foreground">
                    AI score {module.score}
                  </span>
                </div>
              </div>

              <ChevronDown
                className="mt-2 hidden size-4 shrink-0 text-muted-foreground sm:block"
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>

      <div className="border-t border-border/60 bg-muted/20 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">Ready for final review?</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Check module ordering, video quality, and learning objectives
              before publishing.
            </p>
          </div>

          <Button type="button" variant="outline" size="sm">
            Open full review
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
