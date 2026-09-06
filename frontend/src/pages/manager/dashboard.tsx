import {
  Activity,
  BarChart3,
  CheckCircle2,
  Layers3,
  PlayCircle,
  Plus,
  Sparkles,
  TrendingUp,
  Users,
  Video,
  XCircle,
  Zap,
} from "lucide-react";

import AnalysisCard from "@/components/manager/analysis-card";
import AnalyticsCard from "@/components/manager/analytics-card";
import LearningPathReview from "@/components/manager/learning-path-review";
import ManagerStatCard from "@/components/manager/manager-stat-card";
import PipelineStatus from "@/components/manager/pipeline-status";
import TopicCard from "@/components/manager/topic-card";
import TopicForm from "@/components/manager/topic-form";
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
    name: "AI Scoring",
    description: "Ranking videos using learning-quality signals",
    progress: 48,
    status: "processing" as const,
  },
  {
    name: "Learning Path Generation",
    description: "Structuring videos into learning modules",
    progress: 0,
    status: "queued" as const,
  },
];

const topics = [
  {
    title: "React.js Advanced",
    category: "Programming",
    difficulty: "Advanced",
    status: "processing" as const,
    progress: 65,
    videosFound: 48,
    videosAnalyzed: 31,
    updatedAt: "12 min ago",
  },
  {
    title: "Machine Learning Fundamentals",
    category: "AI & Machine Learning",
    difficulty: "Intermediate",
    status: "ready" as const,
    progress: 100,
    videosFound: 62,
    videosAnalyzed: 62,
    updatedAt: "1 hour ago",
  },
  {
    title: "Docker & Kubernetes",
    category: "Cloud & DevOps",
    difficulty: "Advanced",
    status: "draft" as const,
    progress: 0,
    videosFound: 0,
    videosAnalyzed: 0,
    updatedAt: "Yesterday",
  },
];

const analyses = [
  {
    title: "React Server Components Explained",
    channel: "Fireship",
    duration: "18:42",
    score: 94,
    relevance: 97,
    quality: 92,
    transcript: "available" as const,
    status: "completed" as const,
  },
  {
    title: "Advanced React Patterns",
    channel: "Jack Herrington",
    duration: "31:15",
    score: 89,
    relevance: 93,
    quality: 87,
    transcript: "available" as const,
    status: "needs-review" as const,
  },
];

const modules = [
  {
    id: "module-1",
    title: "Advanced React Patterns",
    description:
      "Reusable patterns and scalable architecture for complex React applications.",
    videos: 8,
    duration: "4h 12m",
    score: 94,
    status: "approved" as const,
  },
  {
    id: "module-2",
    title: "Performance Optimization",
    description:
      "Rendering, memoization and performance strategies for production applications.",
    videos: 6,
    duration: "3h 08m",
    score: 89,
    status: "review" as const,
  },
  {
    id: "module-3",
    title: "Server Components",
    description:
      "Modern React server-side rendering and component architecture.",
    videos: 5,
    duration: "2h 41m",
    score: 91,
    status: "approved" as const,
  },
];

const recentActivity = [
  {
    title: "Machine Learning Fundamentals",
    description: "Learning path published successfully",
    time: "8 min ago",
    icon: CheckCircle2,
    iconClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-500/10",
  },
  {
    title: "React.js Advanced",
    description: "AI video analysis is processing",
    time: "18 min ago",
    icon: Activity,
    iconClass: "text-primary",
    bgClass: "bg-primary/10",
  },
  {
    title: "AWS Cloud Fundamentals",
    description: "Pipeline job started",
    time: "35 min ago",
    icon: PlayCircle,
    iconClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-500/10",
  },
  {
    title: "Python Data Structures",
    description: "Pipeline processing failed",
    time: "2 hours ago",
    icon: XCircle,
    iconClass: "text-destructive",
    bgClass: "bg-destructive/10",
  },
];

export default function ManagerDashboard() {
  return (
    <PageContainer>
      {/* Hero */}
      <section className="mb-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Learn_ Manager Workspace
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Platform control center
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Monitor learning content, AI processing, generated learning paths,
              and platform performance from one workspace.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" type="button">
              <Activity className="size-4" aria-hidden="true" />
              Activity
            </Button>

            <Button type="button">
              <Plus className="size-4" aria-hidden="true" />
              Create topic
            </Button>
          </div>
        </div>
      </section>

      {/* Platform stats */}
      <section className="mb-10">
        <SectionHeader
          title="Platform overview"
          description="A quick snapshot of your learning platform."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ManagerStatCard
            label="Total learners"
            value="12,840"
            change="+12.4%"
            description="Compared with last month"
            icon={Users}
          />

          <ManagerStatCard
            label="Learning topics"
            value="156"
            change="+8.2%"
            description="Topics across all categories"
            icon={Layers3}
          />

          <ManagerStatCard
            label="Videos analyzed"
            value="4,286"
            change="+18.6%"
            description="AI-analyzed educational videos"
            icon={Video}
          />

          <ManagerStatCard
            label="Published paths"
            value="128"
            change="+6.8%"
            description="Learning paths available"
            icon={BookOpenIcon}
          />
        </div>
      </section>

      {/* Pipeline */}
      <section className="mb-10">
        <SectionHeader
          title="AI pipeline"
          description="Current processing state of the content generation workflow."
          action={
            <Button variant="outline" size="sm" type="button">
              View pipeline
            </Button>
          }
        />

        <PipelineStatus
          title="React.js Advanced"
          description="Processing learning content for the React.js Advanced topic."
          stages={pipelineStages}
        />
      </section>

      {/* Topics */}
      <section className="mb-10">
        <SectionHeader
          title="Learning topics"
          description="Recently created and processed learning topics."
          count="156 topics"
          action={
            <Button variant="outline" size="sm" type="button">
              View all
            </Button>
          }
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {topics.map((topic) => (
            <TopicCard key={topic.title} {...topic} />
          ))}
        </div>
      </section>

      {/* Create topic */}
      <section className="mb-10">
        <SectionHeader
          title="Create a learning topic"
          description="Start the AI content pipeline by defining a new topic."
        />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <TopicForm />

          <div className="rounded-xl border border-border/60 bg-card p-5 sm:p-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Zap className="size-4.5" aria-hidden="true" />
            </div>

            <h3 className="mt-5 text-sm font-semibold">
              Automated content discovery
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Once a topic enters the pipeline, Learn_ can discover relevant
              videos, extract transcripts, analyze quality, detect duplicates,
              and organize the best content into a structured learning path.
            </p>

            <div className="mt-5 space-y-3">
              <PipelineStep
                number="01"
                title="Discover"
                description="Find relevant YouTube content"
              />

              <PipelineStep
                number="02"
                title="Analyze"
                description="Evaluate learning quality"
              />

              <PipelineStep
                number="03"
                title="Structure"
                description="Generate learning modules"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content analysis */}
      <section className="mb-10">
        <SectionHeader
          title="Content analysis"
          description="Recent AI analysis results requiring attention."
          count="2 videos"
          action={
            <Button variant="outline" size="sm" type="button">
              View analysis
            </Button>
          }
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {analyses.map((analysis) => (
            <AnalysisCard key={analysis.title} {...analysis} />
          ))}
        </div>
      </section>

      {/* Learning path review */}
      <section className="mb-10">
        <SectionHeader
          title="Learning path review"
          description="Review AI-generated modules before publishing."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <LearningPathReview
            title="React.js Advanced"
            category="Programming"
            difficulty="Advanced"
            progress={92}
            modules={modules}
          />

          <div className="rounded-xl border border-border/60 bg-card p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="size-4.5" aria-hidden="true" />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  AI-generated structure
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Ready for manager review
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <ReviewStat label="Modules generated" value="8" />

              <ReviewStat label="Videos selected" value="48" />

              <ReviewStat label="Average AI score" value="91%" />

              <ReviewStat label="Review completion" value="92%" />
            </div>

            <Button className="mt-6 w-full" type="button">
              Review learning path
            </Button>
          </div>
        </div>
      </section>

      {/* Analytics */}
      <section className="mb-10">
        <SectionHeader
          title="Platform analytics"
          description="Key learning and content performance indicators."
          action={
            <Button variant="outline" size="sm" type="button">
              View analytics
            </Button>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AnalyticsCard
            label="Completion rate"
            value="84%"
            change="+8.4%"
            description="Learners completing assigned paths"
            icon={CheckCircle2}
            trend="up"
          />

          <AnalyticsCard
            label="Learning activity"
            value="12.8K"
            change="+14.2%"
            description="Learning sessions this month"
            icon={BarChart3}
            trend="up"
          />

          <AnalyticsCard
            label="Published content"
            value="1,284"
            change="+6.8%"
            description="Videos currently available"
            icon={CheckCircle2}
            trend="up"
          />

          <AnalyticsCard
            label="Learner growth"
            value="+18.6%"
            change="+4.2%"
            description="Growth compared with last month"
            icon={TrendingUp}
            trend="up"
          />
        </div>
      </section>

      {/* Recent activity */}
      <section className="mb-10">
        <SectionHeader
          title="Recent activity"
          description="Latest events across the manager workspace."
        />

        <div className="rounded-xl border border-border/60 bg-card">
          {recentActivity.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.title}
                className={[
                  "flex items-center gap-4 p-4 sm:p-5",
                  index !== recentActivity.length - 1
                    ? "border-b border-border/60"
                    : "",
                ].join(" ")}
              >
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${activity.bgClass} ${activity.iconClass}`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {activity.title}
                  </p>

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                </div>

                <span className="shrink-0 text-[11px] text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Workspace health */}
      <section className="pb-6">
        <SectionHeader
          title="Workspace health"
          description="Current state of the Learn_ processing environment."
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <HealthCard
            title="AI pipeline"
            status="Operational"
            description="All processing stages available"
            icon={Sparkles}
          />

          <HealthCard
            title="Content processing"
            status="Operational"
            description="Video analysis running normally"
            icon={Video}
          />

          <HealthCard
            title="Learning paths"
            status="Healthy"
            description="Generation and review workflows ready"
            icon={Layers3}
          />
        </div>
      </section>
    </PageContainer>
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
    <div className="flex items-center gap-3">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-[10px] font-semibold text-muted-foreground">
        {number}
      </span>

      <div className="min-w-0">
        <p className="text-xs font-medium">{title}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

function ReviewStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-semibold">{value}</span>
    </div>
  );
}

function HealthCard({
  title,
  status,
  description,
  icon: Icon,
}: {
  title: string;
  status: string;
  description: string;
  icon: typeof Sparkles;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" aria-hidden="true" />
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <span className="size-1.5 rounded-full bg-current" />
          {status}
        </span>
      </div>

      <p className="mt-5 text-sm font-medium">{title}</p>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

const BookOpenIcon = Layers3;
