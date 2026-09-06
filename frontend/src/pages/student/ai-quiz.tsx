import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  Clock3,
  Lightbulb,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "@/components/shared/page-container";
import SectionHeader from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Brain,
    title: "AI-Generated Questions",
    description:
      "Quizzes will be generated from the topics and lessons you're currently studying.",
  },
  {
    icon: Target,
    title: "Adaptive Difficulty",
    description:
      "Question difficulty will adapt to your performance and learning level.",
  },
  {
    icon: Lightbulb,
    title: "Smart Explanations",
    description:
      "Understand why an answer is correct with AI-powered explanations and hints.",
  },
];

export default function AiQuizPage() {
  return (
    <PageContainer className="max-w-6xl">
      {/* Back */}
      <Link
        to="/home"
        className="mb-8 inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to Home
      </Link>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-card/60 px-6 py-12 shadow-sm sm:px-10 sm:py-16">
        <div
          className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -bottom-32 -right-20 size-80 rounded-full bg-primary/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          {/* Icon */}
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border bg-muted/40 shadow-sm">
            <Brain className="size-8" aria-hidden="true" />
          </div>

          {/* Badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs font-medium">
            <Sparkles className="size-3.5" aria-hidden="true" />
            AI-powered assessments
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            AI Quizzes are
            <span className="block text-muted-foreground">coming soon.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Test your understanding with intelligent quizzes generated around
            your learning journey, progress, and current skill level.
          </p>

          {/* Coming Soon */}
          <div className="mt-8 inline-flex items-center rounded-full border bg-background/70 px-5 py-2.5 text-sm font-semibold shadow-sm">
            <span
              className="mr-2 size-2 rounded-full bg-primary"
              aria-hidden="true"
            />
            Coming Soon
          </div>

          <div className="mt-6">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              disabled
            >
              Start a Quiz
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mt-10">
        <SectionHeader
          title="What AI Quizzes will offer"
          description="Practice smarter and identify the topics you need to improve."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-2xl border bg-card/50 p-5 transition-colors hover:bg-muted/20"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-muted/50">
                  <Icon className="size-5" aria-hidden="true" />
                </div>

                <h3 className="mt-4 font-semibold">{feature.title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Future Quiz Preview */}
      <section className="mt-10 rounded-2xl border bg-muted/20 p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-background/70">
            <Trophy className="size-5" aria-hidden="true" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold">
              Your knowledge, measured intelligently
            </h3>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Future quizzes will help identify weak areas and recommend what
              you should learn next.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock3 className="size-4" aria-hidden="true" />
            In development
          </div>
        </div>
      </section>

      {/* Bottom Note */}
      <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <CheckCircle2 className="size-3.5" aria-hidden="true" />
        Your quiz history and performance will be available here in the future.
      </div>
    </PageContainer>
  );
}
