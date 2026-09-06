import {
  Activity,
  BarChart3,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CircleGauge,
  FileSearch,
  LayoutDashboard,
  ListChecks,
  Menu,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ManagerSidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onCloseMobile: () => void;
};

const navigation = [
  {
    label: "Overview",
    href: "/manager",
    icon: LayoutDashboard,
  },
  {
    label: "Topics",
    href: "/manager/topics",
    icon: BookOpen,
  },
  {
    label: "AI Pipeline",
    href: "/manager/pipeline",
    icon: Sparkles,
  },
  {
    label: "Content Analysis",
    href: "/manager/analysis",
    icon: FileSearch,
  },
  {
    label: "Learning Paths",
    href: "/manager/learning-paths",
    icon: ListChecks,
  },
  {
    label: "Analytics",
    href: "/manager/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/manager/settings",
    icon: Settings,
  },
];

export default function ManagerSidebar({
  collapsed,
  mobileOpen,
  onToggle,
  onCloseMobile,
}: ManagerSidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-200 lg:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-65 flex-col border-r border-border/60 bg-background transition-transform duration-300 lg:relative lg:z-auto lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed && "lg:w-19",
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "flex h-16 shrink-0 items-center border-b border-border/60 px-4",
            collapsed ? "lg:justify-center lg:px-2" : "justify-between",
          )}
        >
          <NavLink
            to="/manager"
            onClick={onCloseMobile}
            className={cn(
              "flex items-center gap-2.5 rounded-lg outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-ring",
              collapsed && "lg:justify-center",
            )}
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-foreground text-sm font-bold text-background">
              <BookOpen className="size-4" aria-hidden="true" />
            </div>

            <div
              className={cn(
                "min-w-0 transition-all duration-200",
                collapsed &&
                  "lg:pointer-events-none lg:w-0 lg:overflow-hidden lg:opacity-0",
              )}
            >
              <p className="text-sm font-semibold leading-none">Learn_</p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                Admin Workspace
              </p>
            </div>
          </NavLink>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onCloseMobile}
            className="lg:hidden"
            aria-label="Close navigation"
          >
            <X className="size-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-scroll min-h-0 flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === "/manager"}
                  onClick={onCloseMobile}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    cn(
                      "group flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      collapsed && "lg:justify-center lg:px-0",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={cn(
                          "size-4 shrink-0",
                          isActive && "text-primary",
                        )}
                        aria-hidden="true"
                      />

                      <span
                        className={cn(
                          "truncate transition-all duration-200",
                          collapsed &&
                            "lg:pointer-events-none lg:w-0 lg:overflow-hidden lg:opacity-0",
                        )}
                      >
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Pipeline status */}
          <div
            className={cn(
              "mt-6 rounded-xl border border-border/60 bg-card p-3",
              collapsed && "lg:border-0 lg:bg-transparent lg:p-0",
            )}
          >
            <div
              className={cn(
                "flex items-center gap-2",
                collapsed && "lg:justify-center",
              )}
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CircleGauge className="size-3.5" aria-hidden="true" />
              </div>

              <div
                className={cn(
                  "min-w-0 transition-all duration-200",
                  collapsed &&
                    "lg:pointer-events-none lg:w-0 lg:overflow-hidden lg:opacity-0",
                )}
              >
                <p className="truncate text-xs font-medium">Pipeline</p>

                <p className="mt-0.5 truncate text-[10px] text-emerald-600 dark:text-emerald-400">
                  All systems operational
                </p>
              </div>
            </div>

            {!collapsed && (
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full w-[96%] rounded-full bg-emerald-500"
                  aria-label="Pipeline health 96 percent"
                />
              </div>
            )}
          </div>
        </nav>

        {/* Bottom */}
        <div className="shrink-0 border-t border-border/60 p-3">
          <div
            className={cn(
              "mb-3 rounded-lg bg-muted/40 p-3",
              collapsed && "lg:hidden",
            )}
          >
            <div className="flex items-center gap-2">
              <Activity className="size-3.5 text-primary" aria-hidden="true" />

              <span className="text-xs font-medium">AI processing ready</span>
            </div>

            <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
              Topics can be sent to the content pipeline.
            </p>
          </div>

          {/* Collapse button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onToggle}
            className={cn("hidden w-full lg:flex", collapsed && "lg:px-0")}
            aria-label={
              collapsed ? "Expand manager sidebar" : "Collapse manager sidebar"
            }
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="size-4" aria-hidden="true" />
            ) : (
              <>
                <ChevronLeft className="size-4" aria-hidden="true" />
                <span>Collapse sidebar</span>
              </>
            )}
          </Button>

          {/* Mobile menu helper */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCloseMobile}
            className="w-full lg:hidden"
          >
            <Menu className="size-4" aria-hidden="true" />
            Close menu
          </Button>
        </div>
      </aside>
    </>
  );
}
