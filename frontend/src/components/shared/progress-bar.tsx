import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  className?: string;
  indicatorClassName?: string;
  showLabel?: boolean;
  label?: string;
};

export default function ProgressBar({
  value,
  className,
  indicatorClassName,
  showLabel = false,
  label,
}: ProgressBarProps) {
  const progress = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-2 flex items-center justify-between gap-3 text-xs">
          <span className="truncate text-muted-foreground">
            {label ?? "Progress"}
          </span>
          <span className="shrink-0 font-medium text-foreground">
            {Math.round(progress)}%
          </span>
        </div>
      )}

      <div
        className={cn(
          "h-2 w-full overflow-hidden rounded-full bg-muted",
          className,
        )}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
      >
        <div
          className={cn(
            "h-full rounded-full bg-primary transition-[width] duration-500 ease-out",
            indicatorClassName,
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
