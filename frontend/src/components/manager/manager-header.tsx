import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  Settings,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ManagerHeaderProps = {
  sidebarCollapsed: boolean;
  onOpenMobileSidebar: () => void;
};

export default function ManagerHeader({
  sidebarCollapsed,
  onOpenMobileSidebar,
}: ManagerHeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="relative z-30 flex h-16 shrink-0 items-center border-b border-border/60 bg-background/90 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex w-full items-center justify-between gap-4">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile menu */}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="shrink-0 lg:hidden"
            onClick={onOpenMobileSidebar}
            aria-label="Open manager navigation"
          >
            <Menu className="size-5" aria-hidden="true" />
          </Button>

          <div className="hidden min-w-0 lg:block">
            <p className="truncate text-sm font-semibold">Admin Workspace</p>
            <p className="truncate text-xs text-muted-foreground">
              Manage your Learn_ platform
            </p>
          </div>

          {/* Mobile title */}
          <div className="min-w-0 lg:hidden">
            <p className="truncate text-sm font-semibold tracking-tight">
              Learn_
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              Admin Workspace
            </p>
          </div>
        </div>

        {/* Center search */}
        <div
          className={cn(
            "hidden w-full max-w-md md:flex",
            sidebarCollapsed && "max-w-lg",
          )}
        >
          <div className="relative w-full">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />

            <input
              type="search"
              placeholder="Search topics, paths, videos..."
              className="h-9 w-full rounded-lg border border-border/60 bg-muted/40 pl-9 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:bg-background focus:ring-2 focus:ring-ring/20"
              aria-label="Search manager workspace"
            />

            <div className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-border/60 bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground lg:flex">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-1">
          {/* Mobile search */}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            aria-label="Search workspace"
          >
            <Search className="size-4.5" aria-hidden="true" />
          </Button>

          {/* Notifications */}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="size-4.5" aria-hidden="true" />

            <span
              className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary"
              aria-hidden="true"
            />
          </Button>

          <div className="mx-1 hidden h-6 w-px bg-border/60 sm:block" />

          {/* Profile */}
          <div className="relative">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="gap-2 px-2"
              onClick={() => setProfileOpen((current) => !current)}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <UserRound className="size-4" aria-hidden="true" />
              </span>

              <span className="hidden max-w-28 truncate text-xs font-medium sm:block">
                Admin
              </span>

              <ChevronDown
                className={cn(
                  "hidden size-3.5 text-muted-foreground transition-transform sm:block",
                  profileOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </Button>

            {/* Profile menu */}
            {profileOpen && (
              <div
                className="absolute right-0 top-[calc(100%+8px)] w-64 overflow-hidden rounded-xl border border-border/70 bg-popover p-1.5 text-popover-foreground shadow-xl shadow-black/10"
                role="menu"
              >
                <div className="px-3 py-3">
                  <p className="text-sm font-semibold">Admin</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    Learn_ Administrator
                  </p>
                </div>

                <div className="h-px bg-border/60" />

                <button
                  type="button"
                  role="menuitem"
                  className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <UserRound className="size-4" aria-hidden="true" />
                  Profile
                </button>

                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Settings className="size-4" aria-hidden="true" />
                  Workspace settings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
