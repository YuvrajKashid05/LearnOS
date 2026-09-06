import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Maximize,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
} from "lucide-react";
import { type ReactNode } from "react";
import { Link } from "react-router-dom";

import PageContainer from "@/components/shared/page-container";
import ProgressBar from "@/components/shared/progress-bar";
import { Button } from "@/components/ui/button";

const lessons = [
  {
    id: 1,
    title: "Introduction to React",
    duration: "18:42",
    completed: true,
  },
  {
    id: 2,
    title: "Understanding Components",
    duration: "24:18",
    completed: false,
    current: true,
  },
  {
    id: 3,
    title: "Props and State",
    duration: "31:05",
    completed: false,
  },
  {
    id: 4,
    title: "Handling Events",
    duration: "22:41",
    completed: false,
  },
  {
    id: 5,
    title: "Building Your First App",
    duration: "28:36",
    completed: false,
  },
];

export default function VideoPlayerPage() {
  return (
    <PageContainer className="max-w-7xl">
      {/* Back */}
      <div className="mb-5">
        <Link
          to="/my-learning"
          className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to My Learning
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main Content */}
        <div className="min-w-0">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative aspect-video overflow-hidden rounded-2xl border bg-black shadow-sm"
          >
            {/* Fake video background */}
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.12),transparent_28%),linear-gradient(135deg,#111,#050505)]"
              aria-hidden="true"
            />

            {/* Center play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                type="button"
                size="icon"
                className="size-16 rounded-full shadow-2xl transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Play video"
              >
                <Play
                  className="ml-0.5 size-7 fill-current"
                  aria-hidden="true"
                />
              </Button>
            </div>

            {/* Video title */}
            <div className="absolute left-5 top-5">
              <p className="text-xs font-medium text-white/60">
                React Masterclass
              </p>

              <h2 className="mt-1 text-sm font-medium text-white sm:text-base">
                Understanding Components
              </h2>
            </div>

            {/* Video controls */}
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent px-4 pb-4 pt-12 opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
              {/* Video progress */}
              <div className="mb-3">
                <div
                  className="h-1.5 overflow-hidden rounded-full bg-white/20"
                  role="progressbar"
                  aria-label="Video progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={38}
                >
                  <div className="h-full w-[38%] rounded-full bg-white" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                {/* Left controls */}
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-9 text-white hover:bg-white/10 hover:text-white"
                    aria-label="Play video"
                  >
                    <Play className="size-4 fill-current" aria-hidden="true" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-9 text-white hover:bg-white/10 hover:text-white"
                    aria-label="Rewind 10 seconds"
                  >
                    <RotateCcw className="size-4" aria-hidden="true" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-9 text-white hover:bg-white/10 hover:text-white"
                    aria-label="Forward 10 seconds"
                  >
                    <RotateCw className="size-4" aria-hidden="true" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-9 text-white hover:bg-white/10 hover:text-white"
                    aria-label="Volume"
                  >
                    <Volume2 className="size-4" aria-hidden="true" />
                  </Button>

                  <span className="ml-1 text-xs text-white/70">
                    08:42 / 24:18
                  </span>
                </div>

                {/* Fullscreen */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-9 text-white hover:bg-white/10 hover:text-white"
                  aria-label="Enter fullscreen"
                >
                  <Maximize className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Video Information */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                React
              </span>

              <span className="text-xs text-muted-foreground">
                Lesson 2 of 12
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Understanding Components
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              Learn how React components work, how to structure reusable UI, and
              how components communicate with each other.
            </p>
          </motion.div>

          {/* Lesson Actions */}
          <div className="mt-6 flex flex-col gap-3 border-y py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                disabled
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
                Previous
              </Button>

              <Button type="button" variant="outline" className="rounded-xl">
                Next
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
            </div>

            <Button type="button" className="rounded-xl">
              <CheckCircle2 className="size-4" aria-hidden="true" />
              Mark as complete
            </Button>
          </div>

          {/* Lesson Content */}
          <section className="mt-7">
            <h2 className="text-lg font-semibold">About this lesson</h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Components are the building blocks of React applications. In this
              lesson, you'll understand how to create components, organize them
              into a hierarchy, and make your UI easier to maintain as your
              application grows.
            </p>
          </section>

          {/* Resources */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold">Resources</h2>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <ResourceCard
                icon={<FileText className="size-4" />}
                title="Lesson notes"
                description="Quick reference notes"
              />

              <ResourceCard
                icon={<ExternalLink className="size-4" />}
                title="Component cheat sheet"
                description="Useful React patterns"
              />
            </div>
          </section>
        </div>

        {/* Lesson Sidebar */}
        <aside className="h-fit overflow-hidden rounded-2xl border bg-card lg:sticky lg:top-6">
          {/* Path Header */}
          <div className="border-b p-5">
            <p className="text-xs font-medium text-muted-foreground">
              Learning path
            </p>

            <h2 className="mt-1 font-semibold">React Masterclass</h2>

            <div className="mt-4">
              <ProgressBar
                value={38}
                showLabel
                label="Your progress"
                className="h-1.5"
              />
            </div>
          </div>

          {/* Lessons */}
          <div
            className="max-h-130 overflow-y-auto dashboard-scroll"
            aria-label="Lessons"
          >
            {lessons.map((lesson) => (
              <LessonItem key={lesson.id} {...lesson} />
            ))}
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}

function ResourceCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      className="group flex items-center gap-3 rounded-xl border bg-card p-4 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-background">
        {icon}
      </span>

      <span className="min-w-0">
        <span className="block text-sm font-medium">{title}</span>

        <span className="mt-0.5 block text-xs text-muted-foreground">
          {description}
        </span>
      </span>
    </button>
  );
}

function LessonItem({
  id,
  title,
  duration,
  completed,
  current,
}: {
  id: number;
  title: string;
  duration: string;
  completed?: boolean;
  current?: boolean;
}) {
  return (
    <button
      type="button"
      aria-current={current ? "step" : undefined}
      className={[
        "flex w-full gap-3 border-b p-4 text-left transition-colors last:border-b-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
        current ? "bg-muted/70" : "hover:bg-muted/40",
      ].join(" ")}
    >
      <div
        className={[
          "flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-medium",
          current ? "bg-foreground text-background" : "bg-muted",
        ].join(" ")}
      >
        {completed ? (
          <CheckCircle2 className="size-4" aria-label="Completed" />
        ) : (
          id
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-medium">{title}</p>

        <p className="mt-1 text-xs text-muted-foreground">{duration}</p>
      </div>
    </button>
  );
}
