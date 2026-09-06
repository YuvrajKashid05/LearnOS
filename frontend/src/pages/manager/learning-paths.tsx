import {
  BookOpen,
  CheckCircle2,
  Clock3,
  Eye,
  Filter,
  Layers3,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Video,
} from "lucide-react";

import LearningPathReview from "@/components/manager/learning-path-review";
import PageContainer from "@/components/shared/page-container";
import SectionHeader from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const learningPaths = [
  {
    title: "React.js Advanced",
    category: "Programming",
    difficulty: "Advanced",
    progress: 92,
    modules: [
      {
        id: "react-1",
        title: "Advanced React Patterns",
        description: "Reusable patterns and scalable React architecture.",
        videos: 8,
        duration: "4h 12m",
        score: 94,
        status: "approved" as const,
      },
      {
        id: "react-2",
        title: "Performance Optimization",
        description: "Rendering, memoization and performance strategies.",
        videos: 6,
        duration: "3h 08m",
        score: 89,
        status: "review" as const,
      },
      {
        id: "react-3",
        title: "Server Components",
        description: "Modern React server-side rendering concepts.",
        videos: 5,
        duration: "2h 41m",
        score: 91,
        status: "approved" as const,
      },
    ],
  },
  {
    title: "Machine Learning Fundamentals",
    category: "AI & Machine Learning",
    difficulty: "Intermediate",
    progress: 100,
    modules: [
      {
        id: "ml-1",
        title: "ML Foundations",
        description: "Core concepts, datasets and machine learning workflow.",
        videos: 9,
        duration: "5h 20m",
        score: 96,
        status: "approved" as const,
      },
      {
        id: "ml-2",
        title: "Supervised Learning",
        description: "Regression, classification and evaluation techniques.",
        videos: 11,
        duration: "6h 15m",
        score: 93,
        status: "approved" as const,
      },
      {
        id: "ml-3",
        title: "Unsupervised Learning",
        description: "Clustering, dimensionality reduction and patterns.",
        videos: 7,
        duration: "4h 03m",
        score: 90,
        status: "approved" as const,
      },
    ],
  },
];

const pathList = [
  {
    title: "React.js Advanced",
    category: "Programming",
    difficulty: "Advanced",
    status: "Review required",
    statusType: "review" as const,
    modules: 8,
    videos: 48,
    duration: "18h 42m",
    updated: "12 min ago",
  },
  {
    title: "Machine Learning Fundamentals",
    category: "AI & Machine Learning",
    difficulty: "Intermediate",
    status: "Published",
    statusType: "published" as const,
    modules: 10,
    videos: 62,
    duration: "31h 15m",
    updated: "1 hour ago",
  },
  {
    title: "Neural Networks",
    category: "AI & Machine Learning",
    difficulty: "Advanced",
    status: "Published",
    statusType: "published" as const,
    modules: 7,
    videos: 41,
    duration: "22h 08m",
    updated: "Yesterday",
  },
  {
    title: "AWS Cloud Fundamentals",
    category: "Cloud & DevOps",
    difficulty: "Beginner",
    status: "Generating",
    statusType: "generating" as const,
    modules: 0,
    videos: 39,
    duration: "—",
    updated: "35 min ago",
  },
];

export default function ManagerLearningPaths() {
  return (
    <PageContainer>
      {/* Header */}
      <section className="mb-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
              <Layers3 className="size-3.5" aria-hidden="true" />
              Learning path management
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Learning paths
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Review AI-generated learning structures, approve modules, and
              prepare paths for publishing.
            </p>
          </div>

          <Button type="button">
            <Plus className="size-4" aria-hidden="true" />
            Create path
          </Button>
        </div>
      </section>

      {/* Metrics */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <PathMetric
          label="Total paths"
          value="156"
          description="Generated learning paths"
          icon={Layers3}
        />

        <PathMetric
          label="Published"
          value="128"
          description="Available to learners"
          icon={CheckCircle2}
        />

        <PathMetric
          label="Under review"
          value="18"
          description="Waiting for approval"
          icon={Eye}
        />

        <PathMetric
          label="Generating"
          value="10"
          description="AI paths being created"
          icon={Sparkles}
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
              placeholder="Search learning paths..."
              className="pl-9"
              aria-label="Search learning paths"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              type="button"
              className="flex-1 lg:flex-none"
            >
              <Filter className="size-4" aria-hidden="true" />
              Status
            </Button>

            <Button
              variant="outline"
              type="button"
              className="flex-1 lg:flex-none"
            >
              Category
            </Button>

            <Button
              variant="outline"
              type="button"
              className="flex-1 lg:flex-none"
            >
              Difficulty
            </Button>
          </div>
        </div>
      </section>

      {/* All paths */}
      <section>
        <SectionHeader
          title="All learning paths"
          description="AI-generated learning experiences in your workspace."
          count="156 paths"
        />

        <div className="space-y-3">
          {pathList.map((path) => (
            <LearningPathRow key={path.title} {...path} />
          ))}
        </div>
      </section>

      {/* Review */}
      <section className="mt-10">
        <SectionHeader
          title="Path review"
          description="Inspect the current AI-generated structure before publishing."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {learningPaths.map((path) => (
            <LearningPathReview key={path.title} {...path} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

function PathMetric({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: typeof Layers3;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4.5" aria-hidden="true" />
      </div>

      <p className="mt-5 text-sm text-muted-foreground">{label}</p>

      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function LearningPathRow({
  title,
  category,
  difficulty,
  status,
  statusType,
  modules,
  videos,
  duration,
  updated,
}: {
  title: string;
  category: string;
  difficulty: string;
  status: string;
  statusType: "review" | "published" | "generating";
  modules: number;
  videos: number;
  duration: string;
  updated: string;
}) {
  let StatusIcon = Eye;
  let statusClass = "text-amber-600 dark:text-amber-400";
  let statusBg = "bg-amber-500/10";

  if (statusType === "published") {
    StatusIcon = CheckCircle2;
    statusClass = "text-emerald-600 dark:text-emerald-400";
    statusBg = "bg-emerald-500/10";
  }

  if (statusType === "generating") {
    StatusIcon = Sparkles;
    statusClass = "text-primary";
    statusBg = "bg-primary/10";
  }

  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-border sm:p-5">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
        {/* Identity */}
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${statusBg} ${statusClass}`}
          >
            <StatusIcon className="size-4" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold">{title}</h3>

            <p className="mt-1 text-xs text-muted-foreground">
              {category} · {difficulty}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 xl:flex xl:items-center">
          <PathInfo icon={BookOpen} label="Modules" value={String(modules)} />

          <PathInfo icon={Video} label="Videos" value={String(videos)} />

          <PathInfo icon={Clock3} label="Duration" value={duration} />

          <div className="hidden sm:block">
            <p className="text-[10px] text-muted-foreground">Updated</p>

            <p className="mt-1 text-xs font-medium">{updated}</p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between gap-3 xl:min-w-37.5 xl:justify-end">
          <span className={`text-xs font-medium ${statusClass}`}>{status}</span>

          <Button
            variant="ghost"
            size="icon-sm"
            type="button"
            aria-label={`More options for ${title}`}
          >
            <MoreHorizontal className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function PathInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3" aria-hidden="true" />

        <span className="text-[10px]">{label}</span>
      </div>

      <p className="mt-1 text-xs font-medium">{value}</p>
    </div>
  );
}
