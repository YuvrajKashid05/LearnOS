import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Filter,
  Search,
  Sparkles,
  Video,
  XCircle,
} from "lucide-react";

import AnalysisCard from "@/components/manager/analysis-card";
import PageContainer from "@/components/shared/page-container";
import SectionHeader from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const analyses = [
  {
    title: "Advanced React Patterns",
    channel: "Web Dev Simplified",
    duration: "42 min",
    score: 94,
    relevance: 96,
    quality: 93,
    transcript: "available" as const,
    status: "completed" as const,
  },
  {
    title: "React Server Components Explained",
    channel: "Theo - t3.gg",
    duration: "31 min",
    score: 91,
    relevance: 94,
    quality: 89,
    transcript: "available" as const,
    status: "completed" as const,
  },
  {
    title: "React Performance Optimization",
    channel: "Jack Herrington",
    duration: "38 min",
    score: 87,
    relevance: 91,
    quality: 84,
    transcript: "available" as const,
    status: "needs-review" as const,
  },
  {
    title: "Modern React Architecture",
    channel: "Fireship",
    duration: "14 min",
    score: 82,
    relevance: 86,
    quality: 79,
    transcript: "available" as const,
    status: "completed" as const,
  },
  {
    title: "React Hooks Deep Dive",
    channel: "Academind",
    duration: "56 min",
    score: 76,
    relevance: 81,
    quality: 74,
    transcript: "missing" as const,
    status: "analyzing" as const,
  },
  {
    title: "React State Management",
    channel: "Programming with Mosh",
    duration: "29 min",
    score: 0,
    relevance: 0,
    quality: 0,
    transcript: "missing" as const,
    status: "failed" as const,
  },
];

export default function ManagerAnalysis() {
  return (
    <PageContainer>
      {/* Header */}
      <section className="mb-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" aria-hidden="true" />
              AI content analysis
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Content analysis
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Review how the AI evaluates individual videos before they become
              part of a learning path.
            </p>
          </div>

          <Button variant="outline" type="button">
            <Sparkles className="size-4" aria-hidden="true" />
            Analysis settings
          </Button>
        </div>
      </section>

      {/* Metrics */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnalysisMetric
          label="Videos analyzed"
          value="1,284"
          description="Across active topics"
          icon={Video}
        />

        <AnalysisMetric
          label="Average AI score"
          value="87.4"
          description="Overall content quality"
          icon={Sparkles}
        />

        <AnalysisMetric
          label="Needs review"
          value="18"
          description="Require manager attention"
          icon={AlertCircle}
        />

        <AnalysisMetric
          label="Failed analysis"
          value="4"
          description="Processing failures"
          icon={XCircle}
        />
      </section>

      {/* Explanation */}
      <section className="mb-8">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="size-5" aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold">
                What does content analysis do?
              </h2>

              <p className="mt-1 max-w-3xl text-xs leading-relaxed text-muted-foreground">
                Each discovered video can be evaluated for topic relevance,
                educational quality, difficulty, transcript availability,
                duplication, and overall learning value before it enters a
                generated learning path.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center sm:flex">
              <AnalysisSignal label="Relevance" value="96%" />
              <AnalysisSignal label="Quality" value="93%" />
              <AnalysisSignal label="Transcript" value="98%" />
            </div>
          </div>
        </div>
      </section>

      {/* Search / filters */}
      <section className="mb-8 rounded-xl border border-border/60 bg-card p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />

            <Input
              placeholder="Search analyzed videos..."
              className="pl-9"
              aria-label="Search analyzed videos"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              type="button"
              className="flex-1 lg:flex-none"
            >
              <Filter className="size-4" aria-hidden="true" />
              Status
            </Button>

            <Button
              variant="outline"
              type="button"
              className="flex-1 lg:flex-none"
            >
              Score
            </Button>

            <Button
              variant="outline"
              type="button"
              className="flex-1 lg:flex-none"
            >
              Topic
            </Button>
          </div>
        </div>
      </section>

      {/* Analysis list */}
      <section>
        <SectionHeader
          title="Analyzed content"
          description="Individual video evaluations produced by the AI analysis stage."
          count="1,284 videos"
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {analyses.map((analysis) => (
            <AnalysisCard key={analysis.title} {...analysis} />
          ))}
        </div>
      </section>

      {/* Analysis criteria */}
      <section className="mt-10">
        <SectionHeader
          title="Analysis criteria"
          description="Signals used to determine whether content is suitable for a learning path."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <CriteriaCard
            icon={Sparkles}
            title="Relevance"
            description="How closely the video matches the target learning topic."
          />

          <CriteriaCard
            icon={CheckCircle2}
            title="Quality"
            description="Educational clarity, structure, depth, and overall usefulness."
          />

          <CriteriaCard
            icon={FileText}
            title="Transcript"
            description="Checks whether usable transcript content is available."
          />

          <CriteriaCard
            icon={AlertCircle}
            title="Duplicate detection"
            description="Identifies overlapping or substantially repeated content."
          />
        </div>
      </section>
    </PageContainer>
  );
}

function AnalysisMetric({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: typeof Video;
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

function AnalysisSignal({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-20 rounded-lg border border-border/60 bg-background/60 px-3 py-2">
      <p className="text-[10px] text-muted-foreground">{label}</p>

      <p className="mt-0.5 text-sm font-semibold">{value}</p>
    </div>
  );
}

function CriteriaCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Sparkles;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </div>

      <h3 className="mt-4 text-sm font-semibold">{title}</h3>

      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
