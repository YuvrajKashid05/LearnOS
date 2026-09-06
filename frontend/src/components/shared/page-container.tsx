import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
