import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Cloud,
  Code2,
  Database,
  FlaskConical,
  Globe2,
  LockKeyhole,
  Search,
  Server,
  Sparkles,
} from "lucide-react";

import PageContainer from "@/components/shared/page-container";
import SectionHeader from "@/components/shared/section-header";
import { Input } from "@/components/ui/input";

const categories = [
  { name: "All", icon: Sparkles },
  { name: "Programming", icon: Code2 },
  { name: "Data Science", icon: Database },
  { name: "AI & ML", icon: Brain },
  { name: "Cloud & DevOps", icon: Cloud },
  { name: "Cyber Security", icon: LockKeyhole },
  { name: "Engineering", icon: FlaskConical },
];

const topics = [
  {
    title: "Web Development",
    description:
      "Build modern websites and applications from frontend to backend.",
    icon: Globe2,
    lessons: "24+ learning resources",
  },
  {
    title: "Python Programming",
    description: "Learn Python from fundamentals to real-world programming.",
    icon: Code2,
    lessons: "32+ learning resources",
  },
  {
    title: "Machine Learning",
    description:
      "Understand ML concepts, algorithms and practical implementation.",
    icon: Brain,
    lessons: "28+ learning resources",
  },
  {
    title: "Data Analytics",
    description:
      "Learn data analysis, visualization, statistics and business insights.",
    icon: Database,
    lessons: "26+ learning resources",
  },
  {
    title: "Cloud Computing",
    description:
      "Understand cloud infrastructure, services and modern deployment.",
    icon: Cloud,
    lessons: "22+ learning resources",
  },
  {
    title: "DevOps",
    description:
      "Learn CI/CD, containers, infrastructure and deployment workflows.",
    icon: Server,
    lessons: "30+ learning resources",
  },
];

export default function ExplorePage() {
  return (
    <PageContainer className="max-w-375">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="max-w-3xl">
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            Discover
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Explore learning
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Find something new to learn and build your next learning path.
          </p>
        </div>
      </motion.section>

      {/* Search */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="mb-10"
      >
        <div className="relative max-w-3xl">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />

          <Input
            placeholder="What do you want to learn?"
            aria-label="Search learning topics"
            className="
              h-14 rounded-2xl border bg-card pl-12 pr-4 text-sm
              shadow-sm transition-all
              placeholder:text-muted-foreground/70
              focus-visible:ring-2
            "
          />
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-11"
      >
        <SectionHeader
          title="Categories"
          description="Browse learning areas."
          className="mb-4"
        />

        <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const active = index === 0;

            return (
              <motion.button
                key={category.name}
                type="button"
                whileTap={{ scale: 0.97 }}
                aria-pressed={active}
                className={[
                  "flex h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-sm font-medium",
                  "transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active
                    ? "bg-foreground text-background shadow-sm"
                    : "border bg-card text-muted-foreground hover:border-foreground/20 hover:bg-muted/60 hover:text-foreground",
                ].join(" ")}
              >
                <Icon className="size-4" aria-hidden="true" />
                {category.name}
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* Popular Topics */}
      <section>
        <SectionHeader
          title="Popular topics"
          description="Start with a topic and create your learning path."
          className="mb-6"
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {topics.map((topic, index) => {
            const Icon = topic.icon;

            return (
              <motion.button
                key={topic.title}
                type="button"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.05,
                }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
                className="group text-left focus-visible:outline-none"
              >
                <div
                  className="
                    relative h-full overflow-hidden rounded-2xl border
                    bg-card p-5 shadow-sm transition-all duration-200
                    hover:border-foreground/15 hover:shadow-md
                    focus-within:ring-2 focus-within:ring-ring
                  "
                >
                  {/* Subtle hover glow */}
                  <div
                    className="
                      pointer-events-none absolute -right-16 -top-16
                      size-32 rounded-full bg-foreground/5 blur-3xl
                      opacity-0 transition-opacity duration-300
                      group-hover:opacity-100
                    "
                  />

                  <div className="relative">
                    {/* Top row */}
                    <div className="mb-7 flex items-start justify-between">
                      <div
                        className="
                          flex size-12 items-center justify-center
                          rounded-xl border bg-muted/50
                          transition-colors duration-200
                          group-hover:bg-muted
                        "
                      >
                        <Icon className="size-5" aria-hidden="true" />
                      </div>

                      <div
                        className="
                          flex size-8 items-center justify-center
                          rounded-lg text-muted-foreground
                          transition-all duration-200
                          group-hover:bg-muted group-hover:text-foreground
                        "
                      >
                        <ArrowRight
                          className="
                            size-4 transition-transform duration-200
                            group-hover:translate-x-0.5
                          "
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-base font-semibold tracking-tight">
                      {topic.title}
                    </h3>

                    <p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">
                      {topic.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-6 flex items-center justify-between border-t pt-4">
                      <span className="text-xs font-medium text-muted-foreground">
                        {topic.lessons}
                      </span>

                      <span className="text-xs font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                        Explore
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* AI CTA */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-11"
      >
        <div
          className="
            relative overflow-hidden rounded-2xl border bg-card
            p-6 shadow-sm sm:p-7
          "
        >
          {/* Background decoration */}
          <div
            className="
              pointer-events-none absolute -right-20 -top-20
              size-48 rounded-full bg-foreground/5 blur-3xl
            "
          />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div
                className="
                  flex size-11 shrink-0 items-center justify-center
                  rounded-xl border bg-muted/50
                "
              >
                <Sparkles className="size-5" aria-hidden="true" />
              </div>

              <div>
                <h2 className="font-semibold tracking-tight">
                  Know exactly what you want to learn?
                </h2>

                <p className="mt-1.5 max-w-xl text-sm leading-5 text-muted-foreground">
                  Search for any topic and Learn_ can help you turn it into a
                  structured learning path.
                </p>
              </div>
            </div>

            <motion.button
              type="button"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="
                flex h-10 shrink-0 items-center justify-center gap-2
                rounded-xl bg-foreground px-4 text-sm font-medium
                text-background transition-opacity hover:opacity-90
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2
                focus-visible:ring-offset-background
              "
            >
              Start learning
              <ArrowRight className="size-4" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </motion.section>
    </PageContainer>
  );
}
