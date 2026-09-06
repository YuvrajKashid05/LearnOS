import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Play,
  Search,
  TrendingUp,
} from "lucide-react";

import PageContainer from "@/components/shared/page-container";
import ProgressBar from "@/components/shared/progress-bar";
import SectionHeader from "@/components/shared/section-header";
import { Input } from "@/components/ui/input";

const activePaths = [
  {
    title: "Full Stack Web Development",
    description: "React, Node.js, databases and deployment",
    progress: 72,
    completed: 17,
    total: 24,
    timeLeft: "4h 20m",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Data Science with Python",
    description: "Python, statistics, pandas and visualization",
    progress: 48,
    completed: 15,
    total: 32,
    timeLeft: "8h 45m",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Machine Learning",
    description: "ML fundamentals and practical algorithms",
    progress: 26,
    completed: 7,
    total: 28,
    timeLeft: "9h 10m",
    thumbnail:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Cloud & DevOps",
    description: "Linux, Docker, CI/CD and cloud infrastructure",
    progress: 18,
    completed: 5,
    total: 27,
    timeLeft: "10h 30m",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
  },
];

const completedPaths = [
  {
    title: "JavaScript Fundamentals",
    description: "Core JavaScript concepts and modern syntax",
    completed: "Completed 2 weeks ago",
    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Git & GitHub Fundamentals",
    description: "Version control and collaborative development",
    completed: "Completed 1 month ago",
    thumbnail:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=900&q=80",
  },
];

export default function MyLearningPage() {
  return (
    <PageContainer className="max-w-375">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <p className="text-sm text-muted-foreground">Your library</p>

        <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              My Learning
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Continue your learning paths and keep building your skills.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <BookOpen className="size-3.5" aria-hidden="true" />
            {activePaths.length} active paths
          </div>
        </div>
      </motion.section>

      {/* Overview */}
      <section className="mb-8 grid gap-4 sm:grid-cols-3">
        <OverviewCard
          icon={BookOpen}
          label="Active paths"
          value="4"
          detail="Currently learning"
          index={0}
        />

        <OverviewCard
          icon={TrendingUp}
          label="Average progress"
          value="41%"
          detail="Across active paths"
          index={1}
        />

        <OverviewCard
          icon={CheckCircle2}
          label="Completed"
          value="2"
          detail="Finished learning paths"
          index={2}
        />
      </section>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="mb-10"
      >
        <div className="relative w-full max-w-xl">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />

          <Input
            type="search"
            placeholder="Search your learning..."
            aria-label="Search your learning"
            className="h-11 rounded-xl border bg-muted/20 pl-10 pr-4 shadow-none transition-colors focus-visible:bg-background"
          />
        </div>
      </motion.div>

      {/* Continue Learning */}
      <section className="mb-14">
        <SectionHeader
          title="Continue learning"
          description="Pick up where you left off."
          count={`${activePaths.length} paths`}
        />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {activePaths.map((path, index) => (
            <LearningCard key={path.title} path={path} index={index} />
          ))}
        </div>
      </section>

      {/* Completed */}
      <section>
        <SectionHeader
          title="Completed"
          description="Learning paths you have finished."
          count={`${completedPaths.length} paths`}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {completedPaths.map((path, index) => (
            <CompletedCard key={path.title} path={path} index={index} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

function OverviewCard({
  icon: Icon,
  label,
  value,
  detail,
  index,
}: {
  icon: typeof BookOpen;
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
        <Icon className="size-4" aria-hidden="true" />
      </div>

      <p className="mt-5 text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </motion.article>
  );
}

function LearningCard({
  path,
  index,
}: {
  path: (typeof activePaths)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.06,
      }}
      whileHover={{ y: -3 }}
      className="group min-w-0 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-2xl border bg-muted">
        <img
          src={path.thumbnail}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-90" />

        {/* Lesson count */}
        <div className="absolute bottom-3 right-3 rounded-md border border-white/10 bg-black/70 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-md">
          {path.total} lessons
        </div>

        {/* Play */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-11 scale-90 items-center justify-center rounded-full bg-black/65 text-white opacity-0 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            <Play className="ml-0.5 size-5 fill-current" aria-hidden="true" />
          </div>
        </div>

        {/* Progress */}
        <div className="absolute bottom-0 left-0 right-0">
          <ProgressBar
            value={path.progress}
            className="h-1 rounded-none bg-black/30"
            indicatorClassName="rounded-none bg-white"
          />
        </div>
      </div>

      {/* Information */}
      <div className="mt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-semibold leading-5 tracking-tight">
            {path.title}
          </h3>

          <ArrowRight
            className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground"
            aria-hidden="true"
          />
        </div>

        <p className="mt-1.5 line-clamp-1 text-xs leading-5 text-muted-foreground">
          {path.description}
        </p>

        {/* Progress */}
        <div className="mt-4">
          <ProgressBar
            value={path.progress}
            showLabel
            label={`${path.completed} of ${path.total} lessons`}
            className="h-1.5"
            indicatorClassName="bg-foreground"
          />
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock3 className="size-3.5" aria-hidden="true" />
            {path.timeLeft} left
          </span>

          <span className="font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Continue
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function CompletedCard({
  path,
  index,
}: {
  path: (typeof completedPaths)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.06,
      }}
      whileHover={{ y: -3 }}
      className="group min-w-0 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-2xl border bg-muted">
        <img
          src={path.thumbnail}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover grayscale-15 transition-all duration-500 group-hover:scale-[1.025] group-hover:grayscale-0"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />

        {/* Completed badge */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md border border-white/10 bg-black/70 px-2.5 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
          <CheckCircle2 className="size-3.5" aria-hidden="true" />
          Completed
        </div>
      </div>

      {/* Information */}
      <div className="mt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-semibold leading-5 tracking-tight">
            {path.title}
          </h3>

          <ArrowRight
            className="mt-0.5 size-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>

        <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
          {path.description}
        </p>

        <p className="mt-3 text-xs text-muted-foreground">{path.completed}</p>
      </div>
    </motion.article>
  );
}
