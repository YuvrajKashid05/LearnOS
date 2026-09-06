import { CheckCircle2, Clock3, LoaderCircle, XCircle, Zap } from "lucide-react";

import ProgressBar from "@/components/shared/progress-bar";
import { cn } from "@/lib/utils";

type PipelineStageStatus = "completed" | "processing" | "queued" | "failed";

type PipelineStage = {
  name: string;
  description: string;
  progress: number;
  status: PipelineStageStatus;
};

type PipelineStatusProps = {
  title: string;
  description?: string;
  stages: PipelineStage[];
  className?: string;
};

const statusConfig: Record<
  PipelineStageStatus,
  {
    label: string;
    icon: typeof CheckCircle2;
    className: string;
  }
> = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "text-emerald-600 dark:text-emerald-400",
  },
  processing: {
    label: "Processing",
    icon: LoaderCircle,
    className: "text-primary",
  },
  queued: {
    label: "Queued",
    icon: Clock3,
    className: "text-muted-foreground",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "text-destructive",
  },
};

export default function PipelineStatus({
  title,
  description,
  stages,
  className,
}: PipelineStatusProps) {
  const completedCount = stages.filter(
    (stage) => stage.status === "completed",
  ).length;

  const processingCount = stages.filter(
    (stage) => stage.status === "processing",
  ).length;

  const overallProgress =
    stages.length > 0
      ? Math.round(
          stages.reduce((total, stage) => total + stage.progress, 0) /
            stages.length,
        )
      : 0;

  return (
    <section
      className={cn("rounded-xl border border-border/60 bg-card", className)}
    >
      <div className="border-b border-border/60 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="size-4" aria-hidden="true" />
              </div>

              <h2 className="text-base font-semibold tracking-tight">
                {title}
              </h2>
            </div>

            {description && (
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          <div className="shrink-0 rounded-lg border border-border/60 bg-muted/40 px-3 py-2">
            <p className="text-xs text-muted-foreground">Overall progress</p>
            <p className="mt-0.5 text-lg font-semibold">{overallProgress}%</p>
          </div>
        </div>

        <div className="mt-5">
          <ProgressBar value={overallProgress} />
        </div>
      </div>

      <div className="divide-y divide-border/60">
        {stages.map((stage, index) => {
          const config = statusConfig[stage.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={`${stage.name}-${index}`}
              className="p-5 transition-colors hover:bg-muted/20 sm:p-6"
            >
              <div className="flex gap-4">
                <div className="relative flex shrink-0 flex-col items-center">
                  <div
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full border bg-background",
                      stage.status === "processing" &&
                        "border-primary/40 bg-primary/10",
                      stage.status === "completed" &&
                        "border-emerald-500/20 bg-emerald-500/10",
                      stage.status === "failed" &&
                        "border-destructive/20 bg-destructive/10",
                      stage.status === "queued" && "border-border bg-muted/40",
                    )}
                  >
                    <StatusIcon
                      className={cn(
                        "size-4",
                        config.className,
                        stage.status === "processing" && "animate-spin",
                      )}
                      aria-hidden="true"
                    />
                  </div>

                  {index < stages.length - 1 && (
                    <div className="mt-2 h-full min-h-8 w-px bg-border" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium">{stage.name}</h3>

                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {stage.description}
                      </p>
                    </div>

                    <span
                      className={cn(
                        "shrink-0 text-xs font-medium",
                        config.className,
                      )}
                    >
                      {config.label}
                    </span>
                  </div>

                  <div className="mt-4">
                    <ProgressBar
                      value={stage.progress}
                      showLabel
                      label={stage.name}
                      indicatorClassName={cn(
                        stage.status === "failed" && "bg-destructive",
                        stage.status === "queued" && "bg-muted-foreground/40",
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 border-t border-border/60 sm:grid-cols-3">
        <div className="p-4 text-center sm:p-5">
          <p className="text-lg font-semibold">{completedCount}</p>
          <p className="mt-1 text-xs text-muted-foreground">Completed</p>
        </div>

        <div className="border-l border-border/60 p-4 text-center sm:p-5">
          <p className="text-lg font-semibold">{processingCount}</p>
          <p className="mt-1 text-xs text-muted-foreground">Processing</p>
        </div>

        <div className="col-span-2 border-t border-border/60 p-4 text-center sm:col-span-1 sm:border-l sm:border-t-0 sm:p-5">
          <p className="text-lg font-semibold">{stages.length}</p>
          <p className="mt-1 text-xs text-muted-foreground">Total stages</p>
        </div>
      </div>
    </section>
  );
}
