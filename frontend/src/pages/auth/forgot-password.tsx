import {
  ArrowLeft,
  ArrowRight,
  BookOpen
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-6 py-10 text-foreground sm:py-12">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 size-130 -translate-x-1/2 translate-y-[-58%] rounded-full bg-primary/9 blur-3xl" />

        <div className="absolute bottom-0 left-1/2 size-115 -translate-x-1/2 translate-y-[62%] rounded-full bg-primary/6 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,hsl(var(--primary)/0.035),transparent_42%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-105">

        {/* Brand */}
        <div className="mb-9 flex flex-col items-center text-center sm:mb-6">
          <div className="mb-4 flex size-11 items-center justify-center rounded-xl border bg-background/70 shadow-sm backdrop-blur-sm">
            <BookOpen className="size-5" />
          </div>

          <h1 className="text-xl font-semibold tracking-[-0.02em]">
            Learn_
          </h1>
        </div>

        {/* Heading */}
        <div className="mb-7 text-center sm:mb-8">
        

          <h2 className="text-3xl font-bold tracking-[-0.03em]">
            Forgot your password?
          </h2>

          <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
            Enter your email and we'll help you reset your password.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border bg-card/80 p-6 shadow-xl shadow-black/5 backdrop-blur-xl sm:p-8">
          <form className="space-y-5">

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="h-11 bg-background/70"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="h-11 w-full"
            >
              Send reset link

              <ArrowRight className="ml-2 size-4" />
            </Button>
          </form>
        </div>

        {/* Back to login */}
        <div className="mt-6 text-center sm:mt-7">
          <a
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to sign in
          </a>
        </div>
      </div>
    </main>
  )
}