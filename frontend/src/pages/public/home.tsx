import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Compass,
  Layers3,
  PlayCircle,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const viewport = {
  once: true,
  margin: "-80px",
};

const features = [
  {
    icon: Compass,
    title: "Learn with direction",
    description:
      "Turn your learning goals into a clear, structured experience without the confusion of deciding what to study next.",
  },
  {
    icon: Brain,
    title: "Learn smarter",
    description:
      "Get focused explanations, useful resources, summaries, and practice designed around the topic you are learning.",
  },
  {
    icon: TrendingUp,
    title: "See your progress",
    description:
      "Keep your learning organized and understand how far you have come with simple progress tracking.",
  },
];

const learningSteps = [
  {
    number: "01",
    title: "Choose a goal",
    description:
      "Start with a subject, skill, or concept you want to understand.",
  },
  {
    number: "02",
    title: "Build your path",
    description:
      "Get a structured learning experience arranged in a logical order.",
  },
  {
    number: "03",
    title: "Learn and improve",
    description:
      "Study at your own pace, practice what you learn, and keep moving forward.",
  },
];

const stats = [
  {
    value: "Focused",
    label: "learning experience",
  },
  {
    value: "Structured",
    label: "learning paths",
  },
  {
    value: "Progress",
    label: "you can actually see",
  },
];

const experiencePoints = [
  "Clear structure",
  "Personal progress",
  "Focused experience",
];

export default function HomePage() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-lg text-sm font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Learn_ home"
          >
            <span className="flex size-8 items-center justify-center rounded-lg border bg-background/60 shadow-sm">
              <BookOpen className="size-4" aria-hidden="true" />
            </span>
            <span>Learn_</span>
          </Link>

          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Main navigation"
          >
            <a
              href="#features"
              className="rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              How it works
            </a>

            <a
              href="#experience"
              className="rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Experience
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              to="/login"
              className="hidden rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
            >
              Sign in
            </Link>

            <Link to="/register">
              <Button size="sm" className="h-9 rounded-lg px-4">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative border-b">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-5xl font-bold leading-[1.04] tracking-[-0.045em] sm:text-6xl">
              Make learning
              <span className="block text-muted-foreground">
                feel effortless.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Learn_ helps you turn your goals into a focused learning
              experience. Discover what matters, follow a clear path, and make
              steady progress without feeling overwhelmed.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/register" className="w-full sm:w-auto">
                <Button className="h-11 w-full rounded-xl px-5 sm:w-auto">
                  Start learning
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </Button>
              </Link>

              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-xl px-5 sm:w-auto"
                >
                  Explore how it works
                  <ChevronRight className="ml-1 size-4" aria-hidden="true" />
                </Button>
              </a>
            </div>

            <div className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-sm font-semibold tracking-tight">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="mx-auto w-full max-w-lg"
          >
            <div className="overflow-hidden rounded-2xl border bg-card/60 shadow-sm">
              <div className="flex items-center justify-between border-b bg-muted/30 px-5 py-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Your learning space
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    Continue learning
                  </p>
                </div>

                <div className="flex size-8 items-center justify-center rounded-lg border bg-background/70">
                  <Sparkles className="size-4" aria-hidden="true" />
                </div>
              </div>

              <div className="border-b p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <Target
                    className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-semibold">Your current goal</p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Build a strong foundation and keep your progress
                      consistent.
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Overall progress
                    </span>

                    <span className="font-medium">68%</span>
                  </div>

                  <div
                    className="h-1.5 overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-label="Overall learning progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={68}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "68%" }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.3,
                        duration: 0.9,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 divide-x border-b">
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Layers3 className="size-3.5" aria-hidden="true" />
                    <span>Path</span>
                  </div>

                  <p className="mt-3 text-lg font-semibold">12 topics</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Organized for you
                  </p>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock3 className="size-3.5" aria-hidden="true" />
                    <span>This week</span>
                  </div>

                  <p className="mt-3 text-lg font-semibold">4h 32m</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Learning time
                  </p>
                </div>
              </div>

              <Link
                to="/login"
                className="flex items-center gap-3 p-5 transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:p-6"
              >
                <PlayCircle
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    Continue where you left off
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Next lesson · 18 min
                  </p>
                </div>

                <ChevronRight
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 border-b">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp}
              transition={{ duration: 0.55 }}
            >
              <p className="text-sm font-medium text-primary">Why Learn_</p>

              <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
                Everything you need to learn with clarity.
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
                A simple learning environment designed to reduce distraction and
                help you spend more time actually learning.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className={`flex gap-4 py-6 sm:gap-5 ${
                      index !== 0 ? "border-t" : "pt-0"
                    }`}
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-background/70">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-base font-semibold">
                        {feature.title}
                      </h3>

                      <p className="mt-1.5 max-w-md text-sm leading-6 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 border-b">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp}
              transition={{ duration: 0.55 }}
            >
              <p className="text-sm font-medium text-primary">
                Simple by design
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
                A learning process that makes sense.
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
                Spend less energy figuring out how to learn and more energy
                building real understanding.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              {learningSteps.map((step, index) => (
                <div
                  key={step.number}
                  className={`flex gap-5 py-6 ${
                    index !== 0 ? "border-t" : "pt-0"
                  }`}
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background text-xs font-semibold">
                    {step.number}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-semibold">{step.title}</h3>

                    <p className="mt-1.5 max-w-md text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="overflow-hidden rounded-3xl border bg-card/60"
          >
            <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:p-12">
              <div className="max-w-lg">
                <div className="flex size-10 items-center justify-center rounded-xl border bg-background/70">
                  <Brain className="size-5" aria-hidden="true" />
                </div>

                <h2 className="mt-5 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
                  Build knowledge that stays with you.
                </h2>

                <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
                  Learn_ is built around consistency. Keep your goals, learning
                  paths, progress, and learning activity together in one focused
                  experience.
                </p>

                <div className="mt-6 space-y-2.5 text-sm text-muted-foreground">
                  {experiencePoints.map((point) => (
                    <div key={point} className="flex items-center gap-2">
                      <CheckCircle2
                        className="size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/register">
                <Button className="h-11 rounded-xl px-5">
                  Get started
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-7 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-md text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex size-7 items-center justify-center rounded-md border">
              <BookOpen className="size-3.5" aria-hidden="true" />
            </span>

            <span>Learn_</span>
          </Link>

          <p className="text-xs text-muted-foreground">
            Learn with clarity. Progress with confidence.
          </p>
        </div>
      </footer>
    </main>
  );
}
