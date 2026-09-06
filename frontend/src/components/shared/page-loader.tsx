export default function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="flex min-h-svh items-center justify-center bg-background px-6 text-foreground"
    >
      <div className="flex flex-col items-center">
        <div className="relative flex size-14 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-border border-t-foreground" />

          <span className="text-sm font-semibold tracking-tight">Learn_</span>
        </div>

        <p className="mt-5 text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
