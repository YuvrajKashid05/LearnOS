import type { ReactNode } from "react";

import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  onRetry?: () => void;
  className?: string;
};

export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again.",
  action,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-70 w-full items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 px-6 py-10",
        className,
      )}
      role="alert"
    >
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
          <AlertCircle className="size-5" aria-hidden="true" />
        </div>

        <h3 className="text-base font-semibold text-foreground">{title}</h3>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {(onRetry || action) && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {onRetry && (
              <Button variant="outline" size="sm" onClick={onRetry}>
                <RefreshCw className="size-3.5" />
                Try again
              </Button>
            )}

            {action}
          </div>
        )}
      </div>
    </div>
  );
}
