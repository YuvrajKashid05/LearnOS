import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock3,
  Lock,
  Play,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import PageContainer from "@/components/shared/page-container";
import ProgressBar from "@/components/shared/progress-bar";
import SectionHeader from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";

const modules = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    description:
      "Understand the foundations and core concepts of machine learning.",
    progress: 100,
    lessons: [
      {
        title: "What is Machine Learning?",
        duration: "12 min",
        completed: true,
      },
      {
        title: "Types of Machine Learning",
        duration: "18 min",
        completed: true,
      },
      {
        title: "ML Workflow & Applications",
        duration: "15 min",
        completed: true,
      },
    ],
  },
  {
    id: 2,
    title: "Python for Machine Learning",
    description:
      "Learn the Python concepts required for practical ML development.",
    progress: 66,
    lessons: [
      {
        title: "NumPy Fundamentals",
        duration: "24 min",
        completed: true,
      },
      {
        title: "Pandas for Data Analysis",
        duration: "28 min",
        completed: true,
      },
      {
        title: "Data Visualization with Matplotlib",
        duration: "22 min",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    title: "Supervised Learning",
    description:
      "Build your understanding of regression and classification algorithms.",
    progress: 0,
    locked: true,
    lessons: [
      {
        title: "Linear Regression",
        duration: "32 min",
        completed: false,
      },
      {
        title: "Logistic Regression",
        duration: "29 min",
        completed: false,
      },
      {
        title: "Decision Trees",
        duration: "31 min",
        completed: false,
      },
    ],
  },
  {
    id: 4,
    title: "Unsupervised Learning",
    description: "Discover clustering and dimensionality reduction techniques.",
    progress: 0,
    locked: true,
    lessons: [
      {
        title: "K-Means Clustering",
        duration: "27 min",
        completed: false,
      },
      {
        title: "PCA",
        duration: "25 min",
        completed: false,
      },
      {
        title: "Real-world Applications",
        duration: "20 min",
        completed: false,
      },
    ],
  },
];

export default function LearningPathPage() {
  const [openModule, setOpenModule] = useState(1);

  return (
    <PageContainer className="max-w-7xl">
      {/* Back */}
      <Link
        to="/my-learning"
        className="mb-6 inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to My Learning
      </Link>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-card/70 p-6 shadow-sm sm:p-8">
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs font-medium">
              <Sparkles className="size-3.5" aria-hidden="true" />
              AI Learning Path
            </div>

            <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              Machine Learning Fundamentals
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Master the fundamentals of machine learning, from Python and data
              preparation to supervised and unsupervised learning.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <BookOpen className="size-4" aria-hidden="true" />4 Modules
              </span>

              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-4" aria-hidden="true" />
                12h 40m
              </span>

              <span className="inline-flex items-center gap-2">
                <Trophy className="size-4" aria-hidden="true" />
                Beginner
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button className="rounded-xl px-6">
                <Play className="mr-2 size-4 fill-current" aria-hidden="true" />
                Continue Learning
              </Button>

              <Button variant="outline" className="rounded-xl">
                View Overview
              </Button>
            </div>
          </div>

          {/* Progress */}
          <div className="rounded-2xl border bg-muted/20 p-5">
            <ProgressBar
              value={42}
              showLabel
              label="Your progress"
              className="h-2"
            />

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border bg-background/50 p-3">
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className="mt-1 text-lg font-semibold">5</p>
              </div>

              <div className="rounded-xl border bg-background/50 p-3">
                <p className="text-xs text-muted-foreground">Remaining</p>
                <p className="mt-1 text-lg font-semibold">7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Modules */}
        <section>
          <SectionHeader
            title="Course Content"
            description="Follow the modules in order to build your knowledge step by step."
          />

          <div className="space-y-3">
            {modules.map((module) => {
              const isOpen = openModule === module.id;

              return (
                <div
                  key={module.id}
                  className="overflow-hidden rounded-2xl border bg-card/60"
                >
                  <button
                    type="button"
                    onClick={() =>
                      !module.locked && setOpenModule(isOpen ? 0 : module.id)
                    }
                    disabled={module.locked}
                    aria-expanded={!module.locked ? isOpen : undefined}
                    aria-label={
                      module.locked
                        ? `${module.title}, locked`
                        : `${isOpen ? "Collapse" : "Expand"} ${module.title}`
                    }
                    className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring disabled:cursor-not-allowed disabled:hover:bg-transparent sm:p-5"
                  >
                    <div
                      className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted/50"
                      aria-hidden="true"
                    >
                      {module.locked ? (
                        <Lock className="size-4 text-muted-foreground" />
                      ) : module.progress === 100 ? (
                        <CheckCircle2 className="size-5 text-primary" />
                      ) : (
                        <span className="text-sm font-semibold">
                          {module.id}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{module.title}</h3>

                        {module.locked && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            Locked
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {module.description}
                      </p>

                      {!module.locked && (
                        <div className="mt-3 flex items-center gap-3">
                          <ProgressBar
                            value={module.progress}
                            className="h-1.5 max-w-48 flex-1"
                            indicatorClassName="bg-primary"
                            label={`${module.title} progress`}
                          />

                          <span className="shrink-0 text-xs text-muted-foreground">
                            {module.progress}%
                          </span>
                        </div>
                      )}
                    </div>

                    {!module.locked && (
                      <ChevronDown
                        className={`size-5 shrink-0 text-muted-foreground transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </button>

                  {isOpen && !module.locked && (
                    <div className="border-t">
                      {module.lessons.map((lesson, index) => (
                        <div
                          key={lesson.title}
                          className="flex items-center gap-3 px-4 py-4 sm:px-5"
                        >
                          <div className="shrink-0" aria-hidden="true">
                            {lesson.completed ? (
                              <CheckCircle2 className="size-5 text-primary" />
                            ) : (
                              <Circle className="size-5 text-muted-foreground" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {lesson.title}
                            </p>

                            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock3 className="size-3" aria-hidden="true" />
                              {lesson.duration}
                            </p>
                          </div>

                          {!lesson.completed && index === 2 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="rounded-lg"
                            >
                              Start
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* AI Insight */}
          <div className="rounded-2xl border bg-card/60 p-5">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
                <Sparkles className="size-4 text-primary" aria-hidden="true" />
              </div>

              <div>
                <h3 className="text-sm font-semibold">AI Insight</h3>

                <p className="text-xs text-muted-foreground">
                  Based on your progress
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              You're progressing well. Finish the Python visualization lesson
              before moving into supervised learning.
            </p>
          </div>

          {/* Path Stats */}
          <div className="rounded-2xl border bg-card/60 p-5">
            <h3 className="text-sm font-semibold">Learning Stats</h3>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Learning time
                </span>

                <span className="text-sm font-medium">5h 18m</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Lessons completed
                </span>

                <span className="text-sm font-medium">5 / 12</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Current streak
                </span>

                <span className="text-sm font-medium">12 days</span>
              </div>
            </div>
          </div>

          {/* Completion */}
          <div className="rounded-2xl border bg-muted/20 p-5">
            <div className="flex items-center gap-2">
              <Trophy className="size-4" aria-hidden="true" />

              <h3 className="text-sm font-semibold">Keep Going</h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Complete this learning path to unlock your achievement and
              strengthen your ML foundation.
            </p>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
