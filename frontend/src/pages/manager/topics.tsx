import { BookOpen, Filter, Plus, Search, Sparkles } from "lucide-react";

import TopicCard from "@/components/manager/topic-card";
import TopicForm from "@/components/manager/topic-form";
import PageContainer from "@/components/shared/page-container";
import SectionHeader from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const topics = [
  {
    title: "React.js Advanced",
    category: "Programming",
    difficulty: "Advanced",
    status: "processing" as const,
    progress: 65,
    videosFound: 48,
    videosAnalyzed: 31,
    updatedAt: "Updated 12 min ago",
  },
  {
    title: "Machine Learning Fundamentals",
    category: "AI & Machine Learning",
    difficulty: "Intermediate",
    status: "ready" as const,
    progress: 100,
    videosFound: 62,
    videosAnalyzed: 57,
    updatedAt: "Updated 1 hour ago",
  },
  {
    title: "Docker & Kubernetes",
    category: "Cloud & DevOps",
    difficulty: "Intermediate",
    status: "draft" as const,
    progress: 0,
    videosFound: 0,
    videosAnalyzed: 0,
    updatedAt: "Created today",
  },
  {
    title: "Python Data Structures",
    category: "Programming",
    difficulty: "Beginner",
    status: "failed" as const,
    progress: 32,
    videosFound: 34,
    videosAnalyzed: 11,
    updatedAt: "Failed 2 hours ago",
  },
  {
    title: "Neural Networks",
    category: "AI & Machine Learning",
    difficulty: "Advanced",
    status: "ready" as const,
    progress: 100,
    videosFound: 71,
    videosAnalyzed: 64,
    updatedAt: "Updated yesterday",
  },
  {
    title: "AWS Cloud Fundamentals",
    category: "Cloud & DevOps",
    difficulty: "Beginner",
    status: "processing" as const,
    progress: 42,
    videosFound: 39,
    videosAnalyzed: 16,
    updatedAt: "Updated 35 min ago",
  },
];

export default function ManagerTopics() {
  return (
    <PageContainer>
      {/* Header */}
      <section className="mb-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
              <BookOpen className="size-3.5" aria-hidden="true" />
              Learning topics
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Manage topics
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Create and manage topics that will be processed by the Learn_ AI
              content pipeline.
            </p>
          </div>

          <Button type="button">
            <Plus className="size-4" aria-hidden="true" />
            Create topic
          </Button>
        </div>
      </section>

      {/* Topic statistics */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <TopicMetric
          label="Total topics"
          value="184"
          description="All learning topics"
        />

        <TopicMetric
          label="Processing"
          value="12"
          description="Currently in pipeline"
        />

        <TopicMetric
          label="Ready"
          value="156"
          description="Ready for learners"
        />

        <TopicMetric
          label="Needs attention"
          value="16"
          description="Drafts or failed jobs"
        />
      </section>

      {/* Search and filters */}
      <section className="mb-8 rounded-xl border border-border/60 bg-card p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />

            <Input
              placeholder="Search topics..."
              className="pl-9"
              aria-label="Search topics"
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 lg:flex-none"
            >
              <Filter className="size-4" aria-hidden="true" />
              Status
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex-1 lg:flex-none"
            >
              Category
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex-1 lg:flex-none"
            >
              Difficulty
            </Button>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section>
        <SectionHeader
          title="All topics"
          description="Topics available in your manager workspace."
          count="184 topics"
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {topics.map((topic) => (
            <TopicCard key={topic.title} {...topic} />
          ))}
        </div>
      </section>

      {/* Create topic */}
      <section className="mt-10">
        <SectionHeader
          title="Add a new topic"
          description="Prepare a new subject for AI-powered content discovery."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <TopicForm />

          <div className="rounded-xl border border-border/60 bg-card p-5 sm:p-6">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="size-4" aria-hidden="true" />
            </div>

            <h3 className="mt-4 text-sm font-semibold">
              How topic processing works
            </h3>

            <div className="mt-5 space-y-4">
              <PipelineStep
                number="01"
                title="Create topic"
                description="Define the subject, category, and difficulty."
              />

              <PipelineStep
                number="02"
                title="Discover content"
                description="Find relevant educational videos."
              />

              <PipelineStep
                number="03"
                title="Analyze content"
                description="Evaluate transcripts and video quality."
              />

              <PipelineStep
                number="04"
                title="Generate path"
                description="Build a structured learning experience."
              />
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

function TopicMetric({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function PipelineStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-[10px] font-semibold text-muted-foreground">
        {number}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium">{title}</p>

        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
