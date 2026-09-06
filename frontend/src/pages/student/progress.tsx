import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  Flame,
  Target,
  TrendingUp,
} from "lucide-react";

import PageContainer from "@/components/shared/page-container";
import ProgressBar from "@/components/shared/progress-bar";
import SectionHeader from "@/components/shared/section-header";

const weeklyActivity = [
  { day: "Mon", hours: 1.2 },
  { day: "Tue", hours: 0.8 },
  { day: "Wed", hours: 1.6 },
  { day: "Thu", hours: 0.4 },
  { day: "Fri", hours: 1.1 },
  { day: "Sat", hours: 2.1 },
  { day: "Sun", hours: 1.4 },
];

const learningProgress = [
  {
    title: "Full Stack Web Development",
    lessons: "17 / 24 lessons",
    progress: 72,
    time: "12h 40m",
  },
  {
    title: "Data Science with Python",
    lessons: "15 / 32 lessons",
    progress: 48,
    time: "9h 20m",
  },
  {
    title: "Machine Learning",
    lessons: "7 / 28 lessons",
    progress: 26,
    time: "5h 45m",
  },
  {
    title: "Cloud & DevOps",
    lessons: "5 / 27 lessons",
    progress: 18,
    time: "3h 10m",
  },
];

const achievements = [
  {
    icon: Flame,
    title: "7-day streak",
    description: "You kept your learning streak alive.",
  },
  {
    icon: BookOpen,
    title: "25 lessons",
    description: "You completed your first 25 lessons.",
  },
  {
    icon: Target,
    title: "Weekly goal",
    description: "You completed your weekly learning target.",
  },
];

export default function ProgressPage() {
  const totalHours = weeklyActivity.reduce(
    (total, item) => total + item.hours,
    0,
  );

  const maxHours = Math.max(...weeklyActivity.map((item) => item.hours));
  const averageHours = totalHours / weeklyActivity.length;

  return (
    <div className="w-full">
      <PageContainer className="max-w-375">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <p className="text-sm text-muted-foreground">Your learning journey</p>

          <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Progress
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                See how consistently you are learning and how far you have come.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-xl border bg-muted/20 px-3 py-2">
              <TrendingUp className="size-4" />

              <span className="text-sm font-medium">+12% this week</span>
            </div>
          </div>
        </motion.section>

        {/* Stats */}
        <section
          aria-label="Learning progress statistics"
          className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <StatCard
            icon={Clock3}
            label="Learning time"
            value="18h 42m"
            detail="+12% this week"
            index={0}
          />

          <StatCard
            icon={TrendingUp}
            label="Completion rate"
            value="56%"
            detail="+8% from last month"
            index={1}
          />

          <StatCard
            icon={BookOpen}
            label="Lessons completed"
            value="44"
            detail="Across 4 learning paths"
            index={2}
          />

          <StatCard
            icon={Flame}
            label="Learning streak"
            value="12 days"
            detail="Personal best: 18 days"
            index={3}
          />
        </section>

        {/* Main analytics */}
        <div className="grid gap-8 xl:grid-cols-[1.5fr_1fr]">
          {/* Weekly Activity */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-2xl border bg-muted/10 p-5 sm:p-6"
            aria-labelledby="weekly-activity-title"
          >
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="weekly-activity-title"
                  className="text-lg font-semibold tracking-tight"
                >
                  Weekly activity
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Hours spent learning this week.
                </p>
              </div>

              <div className="text-right">
                <p className="text-xl font-semibold">
                  {totalHours.toFixed(1)}h
                </p>

                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </div>

            {/* Chart */}
            <div
              className="relative"
              role="img"
              aria-label={`Weekly learning activity. Total ${totalHours.toFixed(
                1,
              )} hours, with Saturday being the highest at ${maxHours} hours.`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 flex flex-col justify-between"
              >
                <div className="h-px w-full bg-border/50" />
                <div className="mt-13 h-px w-full bg-border/30" />
                <div className="mt-13 h-px w-full bg-border/30" />
                <div className="mt-13 h-px w-full bg-border/30" />
              </div>

              <div className="relative flex h-60 items-end gap-2 sm:gap-4">
                {weeklyActivity.map((item, index) => {
                  const height = (item.hours / maxHours) * 100;

                  return (
                    <div
                      key={item.day}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                    >
                      <div className="flex h-full w-full items-end justify-center">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{
                            duration: 0.7,
                            delay: index * 0.06,
                            ease: "easeOut",
                          }}
                          className="group relative w-full max-w-9 cursor-default rounded-t-lg bg-foreground/80 transition-opacity hover:opacity-80"
                          aria-hidden="true"
                        >
                          <div className="absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border bg-background px-2 py-1 text-[10px] font-medium shadow-sm group-hover:block">
                            {item.hours}h
                          </div>
                        </motion.div>
                      </div>

                      <span className="text-[11px] text-muted-foreground">
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium">Average daily learning</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Based on your activity this week.
                </p>
              </div>

              <p className="text-sm font-semibold">
                {averageHours.toFixed(1)}h / day
              </p>
            </div>
          </motion.section>

          {/* Learning Summary */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="rounded-2xl border bg-muted/10 p-5 sm:p-6"
            aria-labelledby="learning-summary-title"
          >
            <h2
              id="learning-summary-title"
              className="text-lg font-semibold tracking-tight"
            >
              Learning summary
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your overall learning activity.
            </p>

            <div className="mt-7 space-y-5">
              <SummaryRow label="This week" value="8h 36m" />
              <SummaryRow label="This month" value="31h 18m" />
              <SummaryRow label="Total learning time" value="126h 42m" />
              <SummaryRow label="Lessons completed" value="44" />
              <SummaryRow label="Learning paths" value="4 active" />
            </div>

            <div className="mt-7 rounded-xl border bg-background p-4">
              <div className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <CheckCircle2 className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    You're building momentum
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    You have learned more this week than your previous week.
                    Keep the momentum going.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Learning Path Progress */}
        <section className="mt-10">
          <SectionHeader
            title="Learning path progress"
            description="Track how much of each learning path you have completed."
            count="4 active paths"
          />

          <div className="grid gap-4 lg:grid-cols-2">
            {learningProgress.map((path, index) => (
              <motion.article
                key={path.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                className="group rounded-2xl border bg-muted/10 p-5 transition-colors hover:bg-muted/20 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background">
                      <BookOpen className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold">
                        {path.title}
                      </h3>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {path.lessons}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-sm font-semibold">
                    {path.progress}%
                  </span>
                </div>

                <div className="mt-5">
                  <ProgressBar
                    value={path.progress}
                    label={`${path.title} progress`}
                    indicatorClassName="bg-foreground"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <span className="text-xs text-muted-foreground">
                    {path.time} learning time
                  </span>

                  <span className="text-xs font-medium">
                    {path.progress >= 70
                      ? "Almost there"
                      : path.progress >= 40
                        ? "In progress"
                        : "Getting started"}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mt-10">
          <SectionHeader
            title="Recent achievements"
            description="Small milestones from your learning journey."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;

              return (
                <motion.article
                  key={achievement.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.06,
                  }}
                  className="rounded-2xl border bg-muted/10 p-5"
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-background">
                    <Icon className="size-4" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold">
                    {achievement.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {achievement.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* Bottom insight */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="mt-10 rounded-2xl border bg-muted/10 p-5 sm:p-6"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background">
                <Award className="size-4" />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Keep your learning rhythm
                </h2>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
                  Your strongest learning day was Saturday. Consistent smaller
                  sessions throughout the week can help you maintain your
                  progress without relying on one long session.
                </p>
              </div>
            </div>

            <div className="shrink-0 rounded-xl bg-background px-4 py-3 text-center">
              <p className="text-lg font-semibold">2.1h</p>
              <p className="text-[11px] text-muted-foreground">Best day</p>
            </div>
          </div>
        </motion.section>
      </PageContainer>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
  index,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
  detail: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
      }}
      className="rounded-2xl border bg-muted/10 p-5 transition-colors hover:bg-muted/20"
    >
      <div className="flex items-center justify-between">
        <div className="flex size-9 items-center justify-center rounded-xl bg-background">
          <Icon className="size-4" />
        </div>
      </div>

      <p className="mt-5 text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </motion.div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>

      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
