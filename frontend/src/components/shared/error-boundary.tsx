import { Component, type ErrorInfo, type ReactNode } from "react";

import { Button } from "@/components/ui/button";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Learn_ application error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback) {
      return this.props.fallback;
    }

    return (
      <div className="flex min-h-svh items-center justify-center bg-background px-6 py-12 text-foreground">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 text-destructive">
            <span className="text-xl font-semibold">!</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Something went wrong
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Learn_ ran into an unexpected problem. You can try again or reload
            the application.
          </p>

          {import.meta.env.DEV && this.state.error?.message && (
            <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4 text-left">
              <p className="wrap-break-word font-mono text-xs text-muted-foreground">
                {this.state.error.message}
              </p>
            </div>
          )}

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button type="button" variant="outline" onClick={this.handleRetry}>
              Try again
            </Button>

            <Button type="button" onClick={this.handleReload}>
              Reload app
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
