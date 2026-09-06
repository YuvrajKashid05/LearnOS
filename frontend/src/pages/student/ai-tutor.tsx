import {
  ArrowLeft,
  BookOpen,
  Bot,
  MessageCircle,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "@/components/shared/page-container";
import SectionHeader from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";

const capabilities = [
  {
    icon: MessageCircle,
    title: "Ask Anything",
    description:
      "Ask questions about topics you're learning and get explanations in simple language.",
  },
  {
    icon: BookOpen,
    title: "Learn With Context",
    description:
      "The tutor will understand your learning path and explain concepts based on your current level.",
  },
  {
    icon: WandSparkles,
    title: "Personalized Help",
    description:
      "Get examples, hints, summaries, and step-by-step guidance whenever you get stuck.",
  },
];

export default function AiTutorPage() {
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
        {/* Glow */}
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
            <Bot className="size-8" aria-hidden="true" />
          </div>

          {/* Badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs font-medium">
            <Sparkles className="size-3.5" aria-hidden="true" />
            AI-powered learning assistant
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Your AI Tutor is
            <span className="block text-muted-foreground">coming soon.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            We're building an intelligent tutor that understands what you're
            learning and helps you learn faster with personalized explanations,
            examples, hints, and guidance.
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
              Start a Conversation
            </Button>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mt-10">
        <SectionHeader
          title="What your AI Tutor will do"
          description="Designed to become your personal learning companion."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-2xl border bg-card/50 p-5 transition-colors hover:bg-muted/20"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-muted/50">
                  <Icon className="size-5" aria-hidden="true" />
                </div>

                <h3 className="mt-4 font-semibold">{item.title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Future Preview */}
      <section className="mt-10 rounded-2xl border bg-muted/20 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-background/70">
            <Bot className="size-5" aria-hidden="true" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold">
              Built around your learning journey
            </h3>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              The future AI Tutor will use your learning path, completed
              lessons, goals, and progress to provide more relevant help.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="size-4" aria-hidden="true" />
            In development
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
