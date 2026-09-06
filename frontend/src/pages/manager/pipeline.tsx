import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  PlayCircle,
  RotateCcw,
  XCircle,
  Zap,
} from "lucide-react";

import PipelineStatus from "@/components/manager/pipeline-status";
import PageContainer from "@/components/shared/page-container";
import SectionHeader from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";

const pipelineStages = [
  {
    name: "YouTube Discovery",
    description: "Finding relevant educational videos",
    progress: 100,
    status: "completed" as const,
  },
  {
    name: "Transcript Extraction",
    description: "Extracting transcripts from selected videos",
    progress: 100,
    status: "completed" as const,
  },
  {
    name: "Video Analysis",
    description: "Evaluating quality, relevance and difficulty",
    progress: 76,
    status: "processing" as const,
  },
  {
    name: "Duplicate Detection",
    description: "Removing duplicate and overlapping content",
    progress: 52,
    status: "processing" as const,
  },
  {
    name: "AI Scoring",
    description: "Ranking videos using learning-quality signals",
    progress: 28,
    status: "processing" as const,
  },
  {
    name: "Learning Path Generation",
    description: "Structuring videos into learning modules",
    progress: 0,
    status: "queued" as const,
  },
];

const jobs = [
  {
    topic: "React.js Advanced",
    category: "Programming",
    progress: 76,
    status: "processing" as const,
    videos: "48 videos",
    started: "Started 18 min ago",
  },
  {
    topic: "Machine Learning Fundamentals",
    category: "AI & Machine Learning",
    progress: 100,
    status: "completed" as const,
    videos: "62 videos",
    started: "Completed 1 hour ago",
  },
  {
    topic: "AWS Cloud Fundamentals",
    category: "Cloud & DevOps",
    progress: 42,
    status: "processing" as const,
    videos: "39 videos",
    started: "Started 35 min ago",
  },
  {
    topic: "Python Data Structures",
    category: "Programming",
    progress: 32,
    status: "failed" as const,
    videos: "34 videos",
    started: "Failed 2 hours ago",
  },
];

const statusConfig = {
  processing: {
    label: "Processing",
    icon: LoaderCircle,
    className: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "text-destructive",
    bg: "bg-destructive/10",
  },
};

export default function ManagerPipeline() {
  return (
    <PageContainer>
      {/* Header */}
      <section className="mb-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
              <Zap className="size-3.5" aria-hidden="true" />
              AI content pipeline
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Pipeline control center
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Monitor how learning topics move from discovery to analyzed,
              structured learning paths.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" type="button">
              <RotateCcw className="size-4" aria-hidden="true" />
              Refresh
            </Button>

            <Button type="button">
              <PlayCircle className="size-4" aria-hidden="true" />
              Run pipeline
            </Button>
          </div>
        </div>
      </section>

      {/* System status */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <PipelineMetric
          label="Active jobs"
          value="12"
          description="Currently processing"
          icon={LoaderCircle}
        />

        <PipelineMetric
          label="Queued"
          value="8"
          description="Waiting for processing"
          icon={Clock3}
        />

        <PipelineMetric
          label="Completed today"
          value="34"
          description="Successful pipeline runs"
          icon={CheckCircle2}
        />

        <PipelineMetric
          label="Failed"
          value="2"
          description="Require attention"
          icon={AlertCircle}
        />
      </section>

      {/* Current pipeline */}
      <section className="mb-10">
        <SectionHeader
          title="Current pipeline"
          description="Live conceptual view of the AI processing stages."
        />

        <PipelineStatus
          title="React.js Advanced"
          description="Processing learning content for the React.js Advanced topic."
          stages={pipelineStages}
        />
      </section>

      {/* Pipeline flow */}
      <section className="mb-10">
        <SectionHeader
          title="Pipeline flow"
          description="Every topic follows the same content-processing lifecycle."
        />

        <div className="overflow-x-auto rounded-xl border border-border/60 bg-card p-5">
          <div className="flex min-w-212.5 items-center gap-2">
            {[
              "Topic",
              "Discovery",
              "Transcripts",
              "Analysis",
              "Scoring",
              "Learning Path",
              "Review",
              "Publish",
            ].map((stage, index, stages) => (
              <div key={stage} className="flex items-center gap-2">
                <div
                  className={[
                    "flex h-14 min-w-25 items-center justify-center rounded-lg border px-3 text-center text-xs font-medium",
                    index < 4
                      ? "border-primary/20 bg-primary/5 text-primary"
                      : "border-border/60 bg-muted/30 text-muted-foreground",
                  ].join(" ")}
                >
                  {stage}
                </div>

                {index < stages.length - 1 && (
                  <div className="h-px w-5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active jobs */}
      <section>
        <SectionHeader
          title="Pipeline jobs"
          description="Topics currently moving through the processing workflow."
          count={`${jobs.length} jobs`}
        />

        <div className="space-y-3">
          {jobs.map((job) => (
            <PipelineJob key={job.topic} {...job} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

function PipelineMetric({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: typeof LoaderCircle;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4.5" aria-hidden="true" />
      </div>

      <p className="mt-5 text-sm text-muted-foreground">{label}</p>

      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function PipelineJob({
  topic,
  category,
  progress,
  status,
  videos,
  started,
}: {
  topic: string;
  category: string;
  progress: number;
  status: "processing" | "completed" | "failed";
  videos: string;
  started: string;
}) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Job information */}
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${config.bg} ${config.className}`}
          >
            <Icon
              className={`size-4 ${
                status === "processing" ? "animate-spin" : ""
              }`}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold">{topic}</h3>

            <p className="mt-1 text-xs text-muted-foreground">
              {category} · {videos} · {started}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="w-full lg:w-72">
          <div className="mb-2 flex items-center justify-between">
            <span className={`text-xs font-medium ${config.className}`}>
              {config.label}
            </span>

            <span className="text-xs font-medium text-muted-foreground">
              {progress}%
            </span>
          </div>

          <div
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${topic} pipeline progress`}
          >
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 gap-2">
          {status === "failed" && (
            <Button variant="outline" size="sm" type="button">
              <RotateCcw className="size-3.5" aria-hidden="true" />
              Retry
            </Button>
          )}

          {status === "processing" && (
            <Button variant="outline" size="sm" type="button">
              Details
            </Button>
          )}

          {status === "completed" && (
            <Button variant="outline" size="sm" type="button">
              View
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
