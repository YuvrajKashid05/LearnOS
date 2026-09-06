import type { ReactNode } from "react";

import { motion } from "framer-motion";
import { CheckCircle2, Clock3, History, Play, Search } from "lucide-react";

import PageContainer from "@/components/shared/page-container";
import ProgressBar from "@/components/shared/progress-bar";
import SectionHeader from "@/components/shared/section-header";
import { Input } from "@/components/ui/input";

const history = [
  {
    title: "React & TypeScript",
    category: "Web Development",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80",
    progress: 82,
    lastStudied: "Today",
    duration: "2h 18m",
    completed: false,
  },
  {
    title: "Python for Data Analysis",
    category: "Data Science",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    progress: 64,
    lastStudied: "Yesterday",
    duration: "1h 42m",
    completed: false,
  },
  {
    title: "Machine Learning Fundamentals",
    category: "AI & ML",
    thumbnail:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=900&q=80",
    progress: 100,
    lastStudied: "2 days ago",
    duration: "3h 26m",
    completed: true,
  },
  {
    title: "Git & GitHub Fundamentals",
    category: "Programming",
    thumbnail:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=900&q=80",
    progress: 100,
    lastStudied: "4 days ago",
    duration: "1h 12m",
    completed: true,
  },
  {
    title: "Docker & Containers",
    category: "Cloud & DevOps",
    thumbnail:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=900&q=80",
    progress: 38,
    lastStudied: "5 days ago",
    duration: "48m",
    completed: false,
  },
  {
    title: "SQL Database Fundamentals",
    category: "Data Science",
    thumbnail:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80",
    progress: 51,
    lastStudied: "1 week ago",
    duration: "1h 08m",
    completed: false,
  },
];

const filters = ["All", "In progress", "Completed"];

export default function HistoryPage() {
  return (
    <div className="w-full">
      <PageContainer className="max-w-375">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="hidden size-11 shrink-0 items-center justify-center rounded-xl border bg-muted/40 sm:flex">
              <History className="size-5" />
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-muted-foreground">
                Activity
              </p>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Learning history
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Keep track of what you have learned and pick up where you left
                off.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Controls */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          {/* Search */}
          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search your learning history..."
              aria-label="Search your learning history"
              className="h-11 rounded-xl bg-muted/20 pl-10 shadow-none"
            />
          </div>

          {/* Filters */}
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            aria-label="History filters"
          >
            {filters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                aria-pressed={index === 0}
                className={[
                  "flex h-9 shrink-0 items-center rounded-xl px-3.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  index === 0
                    ? "bg-foreground text-background"
                    : "border bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Summary */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8 grid gap-3 sm:grid-cols-3"
          aria-label="Learning history summary"
        >
          <SummaryCard
            icon={<History className="size-4" />}
            label="Total activity"
            value="6"
          />

          <SummaryCard
            icon={<Clock3 className="size-4" />}
            label="In progress"
            value="4"
          />

          <SummaryCard
            icon={<CheckCircle2 className="size-4" />}
            label="Completed"
            value="2"
          />
        </motion.section>

        {/* History list */}
        <section>
          <SectionHeader
            title="Recent activity"
            description="Your recently opened and completed learning resources."
            count={`${history.length} activities`}
          />

          <div className="space-y-3">
            {history.map((item, index) => (
              <HistoryItem key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>
      </PageContainer>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}

        <span className="text-xs font-medium">{label}</span>
      </div>

      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function HistoryItem({
  item,
  index,
}: {
  item: (typeof history)[number];
  index: number;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.04,
      }}
      whileHover={{ y: -1 }}
      className="group w-full text-left focus-visible:outline-none"
      aria-label={`Open ${item.title}`}
    >
      <div className="rounded-2xl border bg-card p-3 shadow-sm transition-all duration-200 hover:border-foreground/15 hover:shadow-md focus-within:ring-3 focus-within:ring-ring/50 sm:p-4">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-24 sm:w-40">
            <img
              src={item.thumbnail}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20"
            />

            {!item.completed && (
              <div
                aria-hidden="true"
                className="absolute bottom-2 left-2 flex size-7 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur-sm"
              >
                <Play className="ml-0.5 size-3.5 fill-current" />
              </div>
            )}

            {item.completed && (
              <div
                aria-hidden="true"
                className="absolute bottom-2 left-2 flex size-7 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur-sm"
              >
                <CheckCircle2 className="size-4" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1 py-0.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold tracking-tight sm:text-base">
                  {item.title}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {item.category}
                </p>
              </div>

              <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
                {item.lastStudied}
              </span>
            </div>

            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                <span className="text-muted-foreground">
                  {item.completed ? "Completed" : `${item.progress}% complete`}
                </span>

                <span className="shrink-0 text-muted-foreground">
                  {item.duration}
                </span>
              </div>

              <ProgressBar
                value={item.progress}
                label={`${item.title} progress`}
                indicatorClassName="bg-foreground"
              />
            </div>
          </div>
        </div>

        {/* Mobile date */}
        <div className="mt-3 flex items-center justify-between border-t pt-3 sm:hidden">
          <span className="text-xs text-muted-foreground">
            {item.lastStudied}
          </span>

          <span className="flex items-center gap-1 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100">
            Open
            <Play className="size-3" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
