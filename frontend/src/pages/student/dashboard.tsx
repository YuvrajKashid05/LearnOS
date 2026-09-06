import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Play,
  Target,
  TrendingUp,
} from "lucide-react";

import PageContainer from "@/components/shared/page-container";
import ProgressBar from "@/components/shared/progress-bar";
import SectionHeader from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";

const learningPaths = [
  {
    title: "Full Stack Web Development",
    description: "Master modern frontend and backend development.",
    progress: 72,
    lessons: 24,
    completed: 17,
    label: "Web Development",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Data Science",
    description: "Learn Python, statistics, data analysis and ML.",
    progress: 48,
    lessons: 32,
    completed: 15,
    label: "Data & Analytics",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Artificial Intelligence",
    description: "Build a strong foundation in AI and machine learning.",
    progress: 26,
    lessons: 28,
    completed: 7,
    label: "AI & ML",
    thumbnail:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=900&q=80",
  },
];

const recentLearning = [
  {
    title: "React Hooks",
    category: "Web Development",
    duration: "18 min",
    progress: 82,
  },
  {
    title: "Python Data Structures",
    category: "Programming",
    duration: "24 min",
    progress: 64,
  },
  {
    title: "Introduction to Machine Learning",
    category: "AI & ML",
    duration: "31 min",
    progress: 35,
  },
];

export default function StudentDashboard() {
  return (
    <PageContainer className="max-w-375">
      {/* Welcome */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-sm text-muted-foreground">
              Good morning 👋
            </p>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Welcome back
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Continue where you left off and keep making progress toward your
              learning goals.
            </p>
          </div>

          <Button type="button" variant="outline" className="w-fit rounded-xl">
            Explore learning
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </motion.section>

      {/* Continue Learning */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="mb-8"
      >
        <div className="overflow-hidden rounded-2xl border bg-card">
          <div className="grid lg:grid-cols-[1.4fr_1fr]">
            {/* Preview */}
            <div className="group relative min-h-57.5 overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80"
                alt="Full Stack Web Development learning preview"
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />

              <div className="absolute inset-0 bg-linear-to-br from-background/20 via-background/40 to-background/80" />

              {/* Center play */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex size-16 items-center justify-center rounded-full border bg-background/85 shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                  <Play className="ml-1 size-6 fill-current" />
                </div>

                <p className="mt-4 text-sm font-medium text-white">
                  React Fundamentals
                </p>

                <p className="mt-1 text-xs text-white/70">
                  Hooks & Component Architecture
                </p>
              </div>

              {/* Duration */}
              <span className="absolute bottom-4 right-4 rounded-md bg-black/75 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                18:42
              </span>

              {/* Progress */}
              <div className="absolute bottom-0 left-0 right-0">
                <ProgressBar
                  value={72}
                  className="h-1 rounded-none bg-black/30"
                  indicatorClassName="rounded-none bg-white"
                  aria-label="React Fundamentals progress"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <div className="mb-5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <BookOpen className="size-4" />
                Continue learning
              </div>

              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Full Stack Web Development
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                React fundamentals — Hooks, state management and component
                architecture.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <MiniStat value="72%" label="Complete" />
                <MiniStat value="17/24" label="Lessons" />
                <MiniStat value="18m" label="Remaining" />
              </div>

              <div className="mt-6">
                <Button type="button" className="rounded-xl">
                  Continue learning
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={Clock3}
          label="Learning time"
          value="12h 36m"
          description="This month"
          trend="+18%"
          trendLabel="vs last month"
        />

        <StatCard
          icon={TrendingUp}
          label="Weekly progress"
          value="68%"
          description="3h 24m this week"
          trend="+12%"
          trendLabel="vs last week"
        />

        <StatCard
          icon={Target}
          label="Active paths"
          value="3"
          description="2 currently on track"
          trend="67%"
          trendLabel="on track"
        />
      </section>

      {/* Learning Paths */}
      <section className="mb-10">
        <SectionHeader
          title="Your learning paths"
          description="Pick up where you left off."
          action={
            <Button type="button" variant="ghost" className="rounded-xl">
              View all
              <ArrowRight className="size-4" />
            </Button>
          }
          className="mb-5"
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {learningPaths.map((path, index) => (
            <motion.article
              key={path.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.06,
              }}
              whileHover={{ y: -3 }}
              className="group overflow-hidden rounded-2xl border bg-card transition-colors hover:bg-muted/20"
            >
              {/* Visual */}
              <div className="relative h-32 overflow-hidden bg-muted">
                <img
                  src={path.thumbnail}
                  alt={`${path.title} learning path`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                <span className="absolute left-3 top-3 rounded-md border border-white/10 bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                  {path.label}
                </span>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex size-10 scale-90 items-center justify-center rounded-full bg-black/65 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    <Play className="ml-0.5 size-4 fill-current" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                  <ProgressBar
                    value={path.progress}
                    className="h-1.5 rounded-none bg-black/30"
                    indicatorClassName="rounded-none bg-white"
                    aria-label={`${path.title} progress`}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="line-clamp-2 font-medium tracking-tight">
                    {path.title}
                  </h3>

                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>

                <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">
                  {path.description}
                </p>

                {/* Progress */}
                <div className="mt-6">
                  <ProgressBar
                    value={path.progress}
                    showLabel
                    label={`${path.completed} of ${path.lessons} lessons`}
                  />
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {path.lessons - path.completed} lessons remaining
                  </span>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 rounded-lg px-2.5"
                  >
                    Continue
                    <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Recent Learning */}
      <section>
        <SectionHeader
          title="Recent learning"
          description="Continue from your latest lessons."
          action={
            <Button type="button" variant="ghost" className="rounded-xl">
              View history
              <ArrowRight className="size-4" />
            </Button>
          }
          className="mb-5"
        />

        <div className="divide-y overflow-hidden rounded-2xl border bg-card">
          {recentLearning.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              className="group flex cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-muted/20 sm:p-5"
            >
              {/* Thumbnail */}
              <div className="relative flex h-16 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted sm:h-20 sm:w-36">
                <div className="absolute inset-0 bg-linear-to-br from-muted via-background/40 to-muted" />

                <div className="relative flex size-9 items-center justify-center rounded-full border bg-background/75 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                  <Play className="ml-0.5 size-4 fill-current" />
                </div>
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  {item.category}
                  <span className="mx-1.5 text-muted-foreground/40">·</span>
                  {item.duration}
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <ProgressBar
                    value={item.progress}
                    className="h-1 flex-1"
                    indicatorClassName="bg-foreground"
                    aria-label={`${item.title} progress`}
                  />

                  <span className="shrink-0 text-[11px] font-medium">
                    {item.progress}%
                  </span>
                </div>
              </div>

              {/* Action */}
              <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-foreground sm:block" />
            </motion.div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border bg-muted/30 px-3 py-2.5">
      <p className="text-sm font-semibold tracking-tight">{value}</p>

      <p className="mt-0.5 text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  description,
  trend,
  trendLabel,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
  description: string;
  trend: string;
  trendLabel: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group rounded-2xl border bg-card p-5 transition-colors hover:bg-muted/20"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
            <Icon className="size-4.5" />
          </div>

          <span className="text-sm font-medium text-muted-foreground">
            {label}
          </span>
        </div>

        <span className="text-xs font-medium text-muted-foreground">
          {trend}
        </span>
      </div>

      <div className="mt-6">
        <p className="text-2xl font-semibold tracking-tight">{value}</p>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{description}</span>

          <span className="text-muted-foreground/40">·</span>

          <span className="text-xs text-muted-foreground">{trendLabel}</span>
        </div>
      </div>

      <div className="mt-5 flex h-1 gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => (
          <div
            key={bar}
            className={[
              "flex-1 rounded-full bg-muted transition-colors",
              bar <= 6 ? "group-hover:bg-foreground/60" : "",
            ].join(" ")}
          />
        ))}
      </div>
    </motion.div>
  );
}
