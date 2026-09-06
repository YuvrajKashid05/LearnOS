import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  Layers3,
  Sparkles,
  Users,
  Video,
} from "lucide-react";

import PageContainer from "@/components/shared/page-container";
import SectionHeader from "@/components/shared/section-header";
import AnalyticsCard from "@/components/manager/analytics-card";

const overviewStats = [
  {
    label: "Active learners",
    value: "12,482",
    change: "+12.8%",
    description: "Compared with last month",
    icon: Users,
    trend: "up" as const,
  },
  {
    label: "Learning paths",
    value: "156",
    change: "+8.4%",
    description: "Published paths",
    icon: Layers3,
    trend: "up" as const,
  },
  {
    label: "Videos analyzed",
    value: "18,642",
    change: "+21.6%",
    description: "Processed by AI",
    icon: Video,
    trend: "up" as const,
  },
  {
    label: "Completion rate",
    value: "74.8%",
    change: "+5.2%",
    description: "Average path completion",
    icon: CheckCircle2,
    trend: "up" as const,
  },
];

const topicPerformance = [
  {
    name: "Programming",
    learners: "4,842",
    completion: 82,
    paths: 42,
  },
  {
    name: "AI & Machine Learning",
    learners: "3,216",
    completion: 76,
    paths: 31,
  },
  {
    name: "Data Science",
    learners: "2,184",
    completion: 71,
    paths: 24,
  },
  {
    name: "Cloud & DevOps",
    learners: "1,428",
    completion: 68,
    paths: 18,
  },
  {
    name: "Cyber Security",
    learners: "812",
    completion: 64,
    paths: 12,
  },
];

const activityData = [
  {
    day: "Mon",
    learners: 1420,
    completions: 318,
  },
  {
    day: "Tue",
    learners: 1680,
    completions: 392,
  },
  {
    day: "Wed",
    learners: 1540,
    completions: 361,
  },
  {
    day: "Thu",
    learners: 1920,
    completions: 448,
  },
  {
    day: "Fri",
    learners: 2180,
    completions: 512,
  },
  {
    day: "Sat",
    learners: 2460,
    completions: 584,
  },
  {
    day: "Sun",
    learners: 2280,
    completions: 536,
  },
];

export default function ManagerAnalytics() {
  return (
    <PageContainer>
      {/* Header */}
      <section className="mb-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
              <BarChart3 className="size-3.5" aria-hidden="true" />
              Platform analytics
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Analytics
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Understand learner activity, learning-path performance, and
              content growth across Learn_.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Last 7 days
            </button>

            <button
              type="button"
              className="rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Export
            </button>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="mb-10">
        <SectionHeader
          title="Platform overview"
          description="High-level performance indicators for the learning platform."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overviewStats.map((stat) => (
            <AnalyticsCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      {/* Activity chart */}
      <section className="mb-10">
        <SectionHeader
          title="Learner activity"
          description="Daily learner activity and completed learning sessions."
        />

        <div className="rounded-xl border border-border/60 bg-card p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Weekly activity</p>

              <p className="mt-1 text-2xl font-semibold tracking-tight">
                13,480
              </p>

              <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
                <span>14.2% increase</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary" />
                Learners
              </div>

              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-muted-foreground/40" />
                Completions
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex h-56 items-end gap-2 sm:gap-4">
              {activityData.map((item) => {
                const learnerHeight = Math.max(
                  12,
                  (item.learners / 2600) * 100,
                );

                const completionHeight = Math.max(
                  8,
                  (item.completions / 600) * 100,
                );

                return (
                  <div
                    key={item.day}
                    className="flex h-full min-w-0 flex-1 flex-col justify-end"
                  >
                    <div className="flex h-full items-end justify-center gap-1">
                      <div
                        className="w-3 rounded-t-sm bg-primary/80 transition-all sm:w-5"
                        style={{
                          height: `${learnerHeight}%`,
                        }}
                        title={`${item.learners} learners`}
                      />

                      <div
                        className="w-3 rounded-t-sm bg-muted-foreground/30 transition-all sm:w-5"
                        style={{
                          height: `${completionHeight}%`,
                        }}
                        title={`${item.completions} completions`}
                      />
                    </div>

                    <p className="mt-3 text-center text-[10px] text-muted-foreground">
                      {item.day}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Topic performance */}
      <section className="mb-10">
        <SectionHeader
          title="Topic performance"
          description="Compare learner engagement and completion across major categories."
        />

        <div className="rounded-xl border border-border/60 bg-card">
          <div className="hidden border-b border-border/60 px-5 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:grid sm:grid-cols-[1.5fr_1fr_1.5fr_80px]">
            <span>Category</span>
            <span>Learners</span>
            <span>Completion</span>
            <span>Paths</span>
          </div>

          <div className="divide-y divide-border/60">
            {topicPerformance.map((topic) => (
              <div
                key={topic.name}
                className="grid gap-4 px-5 py-4 sm:grid-cols-[1.5fr_1fr_1.5fr_80px] sm:items-center"
              >
                <div>
                  <p className="text-sm font-medium">{topic.name}</p>

                  <p className="mt-1 text-[11px] text-muted-foreground sm:hidden">
                    {topic.learners} learners · {topic.paths} paths
                  </p>
                </div>

                <p className="hidden text-xs text-muted-foreground sm:block">
                  {topic.learners}
                </p>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">
                      {topic.completion}%
                    </span>

                    <span className="text-[10px] text-muted-foreground">
                      completion
                    </span>
                  </div>

                  <div
                    className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-valuenow={topic.completion}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${topic.name} completion rate`}
                  >
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{
                        width: `${topic.completion}%`,
                      }}
                    />
                  </div>
                </div>

                <p className="hidden text-xs font-medium sm:block">
                  {topic.paths}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI metrics */}
      <section className="mb-10">
        <SectionHeader
          title="AI performance"
          description="Aggregate metrics from the content analysis and learning-path generation systems."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AiMetric
            icon={Sparkles}
            label="Average content score"
            value="87.4"
            detail="Across analyzed videos"
            trend="+3.8%"
          />

          <AiMetric
            icon={Video}
            label="Content acceptance"
            value="72.6%"
            detail="Videos selected for paths"
            trend="+6.2%"
          />

          <AiMetric
            icon={Layers3}
            label="Path generation"
            value="94.2%"
            detail="Successful generations"
            trend="+2.1%"
          />

          <AiMetric
            icon={Clock3}
            label="Avg. processing time"
            value="8m 42s"
            detail="Per learning topic"
            trend="-11.4%"
            inverse
          />
        </div>
      </section>

      {/* Insights */}
      <section>
        <SectionHeader
          title="Platform insights"
          description="Useful signals from the current platform data."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <InsightCard
            icon={Activity}
            title="Learner engagement is growing"
            description="Weekly learner activity has increased steadily, with the strongest activity during the weekend."
          />

          <InsightCard
            icon={BookOpen}
            title="Programming leads usage"
            description="Programming currently has the highest learner count and the strongest completion performance."
          />

          <InsightCard
            icon={Sparkles}
            title="AI quality is improving"
            description="Average content scores continue to increase as more videos pass through the analysis pipeline."
          />
        </div>
      </section>
    </PageContainer>
  );
}

function AiMetric({
  icon: Icon,
  label,
  value,
  detail,
  trend,
  inverse = false,
}: {
  icon: typeof Sparkles;
  label: string;
  value: string;
  detail: string;
  trend: string;
  inverse?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" aria-hidden="true" />
        </div>

        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {inverse ? (
            <ArrowDownRight className="size-3.5" aria-hidden="true" />
          ) : (
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          )}

          {trend}
        </span>
      </div>

      <p className="mt-5 text-sm text-muted-foreground">{label}</p>

      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}

function InsightCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Activity;
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
