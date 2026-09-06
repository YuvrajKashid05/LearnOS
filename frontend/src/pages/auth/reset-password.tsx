import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    LockKeyhole,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPasswordPage() {
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
        <div className="mb-9 flex flex-col items-center text-center sm:mb-10">
          <div className="mb-4 flex size-11 items-center justify-center rounded-xl border bg-background/70 shadow-sm backdrop-blur-sm">
            <BookOpen className="size-5" />
          </div>

          <h1 className="text-xl font-semibold tracking-[-0.02em]">
            Learn_
          </h1>
        </div>

        {/* Heading */}
        <div className="mb-7 text-center sm:mb-8">
          <div className="mb-4 flex justify-center">
            <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
              <LockKeyhole className="size-5 text-muted-foreground" />
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-[-0.03em]">
            Reset your password
          </h2>

          <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
            Create a new password for your account.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border bg-card/80 p-6 shadow-xl shadow-black/5 backdrop-blur-xl sm:p-8">
          <form className="space-y-5">

            {/* New password */}
            <div className="space-y-2">
              <Label htmlFor="password">
                New password
              </Label>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a new password"
                autoComplete="new-password"
                className="h-11 bg-background/70"
              />

              <p className="text-xs text-muted-foreground">
                Use at least 8 characters.
              </p>
            </div>

            {/* Confirm password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm password
              </Label>

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                className="h-11 bg-background/70"
              />
            </div>

            {/* Reset */}
            <Button
              type="submit"
              className="h-11 w-full"
            >
              Reset password

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