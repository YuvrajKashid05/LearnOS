import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flame,
  Plus,
  Target,
  TrendingUp,
} from "lucide-react";

import PageContainer from "@/components/shared/page-container";
import ProgressBar from "@/components/shared/progress-bar";
import SectionHeader from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";

const goals = [
  {
    title: "Become a Full Stack Developer",
    description: "Build strong skills across frontend and backend development.",
    progress: 68,
    current: "17 of 25 milestones",
    target: "Sep 30, 2026",
    weekly: "4h 20m",
    status: "On track",
  },
  {
    title: "Learn Machine Learning",
    description: "Understand ML fundamentals and build practical projects.",
    progress: 42,
    current: "8 of 19 milestones",
    target: "Nov 15, 2026",
    weekly: "3h 10m",
    status: "On track",
  },
  {
    title: "Master Data Analytics",
    description: "Learn Excel, SQL, Power BI and practical data analysis.",
    progress: 24,
    current: "5 of 21 milestones",
    target: "Dec 20, 2026",
    weekly: "2h 45m",
    status: "Getting started",
  },
];

const goalStats = [
  {
    icon: Target,
    label: "Active goals",
    value: "3",
    detail: "Currently learning",
  },
  {
    icon: TrendingUp,
    label: "Average progress",
    value: "45%",
    detail: "Across all goals",
  },
  {
    icon: Clock3,
    label: "Weekly target",
    value: "10h 15m",
    detail: "Planned learning",
  },
];

export default function LearningGoalsPage() {
  return (
    <div className="w-full">
      <PageContainer className="max-w-375">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-sm text-muted-foreground">Stay focused</p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Learning Goals
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Set meaningful learning goals and turn them into consistent
              progress.
            </p>
          </div>

          <Button className="h-10 rounded-xl">
            <Plus className="mr-2 size-4" />
            Create goal
          </Button>
        </motion.section>

        {/* Overview */}
        <section
          aria-label="Learning goal overview"
          className="mb-10 grid gap-4 sm:grid-cols-3"
        >
          {goalStats.map((stat, index) => (
            <OverviewCard
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              detail={stat.detail}
              index={index}
            />
          ))}
        </section>

        {/* Focus banner */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-10 rounded-2xl border bg-muted/10 p-5 sm:p-6"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background">
                <Flame className="size-4" />
              </div>

              <div>
                <p className="text-sm font-semibold">Your current focus</p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
                  Full Stack Web Development is your strongest goal right now.
                  Keep your weekly learning rhythm consistent.
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <p className="text-xs text-muted-foreground">Current progress</p>

              <p className="mt-1 text-lg font-semibold">68%</p>
            </div>
          </div>
        </motion.section>

        {/* Goals */}
        <section>
          <SectionHeader
            title="Your goals"
            description="Keep working toward the skills you want to master."
            count="3 active goals"
          />

          <div className="space-y-4">
            {goals.map((goal, index) => (
              <GoalCard key={goal.title} goal={goal} index={index} />
            ))}
          </div>
        </section>

        {/* Weekly target */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-10 rounded-2xl border bg-muted/10 p-5 sm:p-6"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background">
                <Target className="size-4" />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Weekly learning target
                </h2>

                <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
                  You planned to spend 10h 15m learning this week.
                </p>
              </div>
            </div>

            <div className="w-full lg:max-w-md">
              <ProgressBar
                value={84}
                showLabel
                label="8h 36m completed"
                indicatorClassName="bg-foreground"
              />

              <p className="mt-2 text-[11px] text-muted-foreground">
                1h 39m remaining to reach your weekly target.
              </p>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="mt-10 rounded-2xl border bg-muted/10 p-6 sm:p-8"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background">
                <Plus className="size-4" />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  Have another skill in mind?
                </h3>

                <p className="mt-1 max-w-xl text-xs leading-5 text-muted-foreground sm:text-sm">
                  Create another goal and build a focused learning path around
                  it.
                </p>
              </div>
            </div>

            <Button variant="outline" className="w-full rounded-xl sm:w-auto">
              Add another goal
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </motion.section>
      </PageContainer>
    </div>
  );
}

function OverviewCard({
  icon: Icon,
  label,
  value,
  detail,
  index,
}: {
  icon: typeof Target;
  label: string;
  value: string;
  detail: string;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
      }}
      className="rounded-2xl border bg-muted/10 p-5 transition-colors hover:bg-muted/20"
    >
      <div className="flex size-9 items-center justify-center rounded-xl bg-background">
        <Icon className="size-4" />
      </div>

      <p className="mt-5 text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </motion.article>
  );
}

function GoalCard({
  goal,
  index,
}: {
  goal: (typeof goals)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
      }}
      whileHover={{ y: -1 }}
      className="rounded-2xl border bg-muted/10 p-5 transition-colors hover:bg-muted/20 sm:p-6"
    >
      <div className="flex flex-col gap-6">
        {/* Top */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background">
              <Target className="size-4" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold sm:text-base">
                  {goal.title}
                </h3>

                <span className="rounded-full border bg-background px-2 py-0.5 text-[10px] font-medium">
                  {goal.status}
                </span>
              </div>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground sm:text-sm">
                {goal.description}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="hidden size-9 shrink-0 rounded-xl sm:flex"
            aria-label={`Open ${goal.title}`}
          >
            <ArrowRight className="size-4" />
          </Button>
        </div>

        {/* Progress */}
        <ProgressBar
          value={goal.progress}
          showLabel
          label={`Progress — ${goal.current}`}
          indicatorClassName="bg-foreground"
        />

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-3">
          <DetailItem icon={CalendarDays} label="Target" value={goal.target} />

          <DetailItem icon={Clock3} label="Weekly target" value={goal.weekly} />

          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <CheckCircle2 className="size-3.5" />
              Milestones
            </div>

            <p className="mt-1 text-xs font-medium">{goal.current}</p>
          </div>
        </div>

        {/* Mobile action */}
        <Button variant="outline" className="w-full rounded-xl sm:hidden">
          View goal
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    </motion.article>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </div>

      <p className="mt-1 text-xs font-medium">{value}</p>
    </div>
  );
}
