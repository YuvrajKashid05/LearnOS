import { BookOpen, ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type TopicFormProps = {
  className?: string;
};

const categories = [
  "Programming",
  "Data Science",
  "AI & Machine Learning",
  "Engineering",
  "Cloud & DevOps",
  "Cyber Security",
  "Aptitude",
  "Interview Preparation",
];

const difficulties = ["Beginner", "Intermediate", "Advanced"];

export default function TopicForm({ className }: TopicFormProps) {
  const [topicName, setTopicName] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const canCreate = Boolean(topicName.trim() && category && difficulty);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Design-only phase:
    // Backend/API integration will be added later.
  };

  return (
    <section
      className={cn("rounded-xl border border-border/60 bg-card", className)}
    >
      <div className="border-b border-border/60 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BookOpen className="size-4" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-semibold tracking-tight">
              Create learning topic
            </h2>

            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Add a topic and prepare it for the AI content discovery pipeline.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-6">
        <div className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="manager-topic-name" className="text-sm font-medium">
              Topic name
            </label>

            <Input
              id="manager-topic-name"
              value={topicName}
              onChange={(event) => setTopicName(event.target.value)}
              placeholder="e.g. React.js Advanced"
              autoComplete="off"
            />

            <p className="text-xs text-muted-foreground">
              Use a clear topic that can be searched and analyzed by the
              learning pipeline.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="manager-topic-category"
                className="text-sm font-medium"
              >
                Category
              </label>

              <div className="relative">
                <select
                  id="manager-topic-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="h-10 w-full appearance-none rounded-md border border-input bg-background px-3 pr-9 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
                >
                  <option value="">Select category</option>

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="manager-topic-difficulty"
                className="text-sm font-medium"
              >
                Difficulty
              </label>

              <div className="relative">
                <select
                  id="manager-topic-difficulty"
                  value={difficulty}
                  onChange={(event) => setDifficulty(event.target.value)}
                  className="h-10 w-full appearance-none rounded-md border border-input bg-background px-3 pr-9 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
                >
                  <option value="">Select difficulty</option>

                  {difficulties.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-primary/15 bg-primary/5 p-4">
            <div className="flex gap-3">
              <Sparkles
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden="true"
              />

              <div>
                <p className="text-sm font-medium">AI pipeline preview</p>

                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  After creation, this topic will be ready for YouTube
                  discovery, transcript extraction, content analysis, scoring,
                  and learning-path generation.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setTopicName("");
                setCategory("");
                setDifficulty("");
              }}
            >
              Clear
            </Button>

            <Button type="submit" disabled={!canCreate}>
              <Sparkles className="size-4" aria-hidden="true" />
              Create topic
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
