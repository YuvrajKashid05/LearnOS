import { motion } from "framer-motion";
import {
  Bookmark,
  BookOpen,
  Brain,
  CheckCircle2,
  Compass,
  History,
  Home,
  LayoutDashboard,
  Library,
  Menu,
  Plus,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";

type NavigationItem = {
  label: string;
  href: string;
  icon: typeof Home;
  comingSoon?: boolean;
};

type AppSidebarProps = {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
};

const learnNavigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/home",
    icon: Home,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Explore",
    href: "/explore",
    icon: Compass,
  },
  {
    label: "My Learning",
    href: "/my-learning",
    icon: Library,
  },
  {
    label: "Learning Goals",
    href: "/goals",
    icon: Target,
  },
  {
    label: "AI Tutor",
    href: "/ai-tutor",
    icon: Sparkles,
    comingSoon: true,
  },
  {
    label: "AI Quiz",
    href: "/ai-quiz",
    icon: Brain,
    comingSoon: true,
  },
];

const activityNavigation: NavigationItem[] = [
  {
    label: "Progress",
    href: "/progress",
    icon: TrendingUp,
  },
  {
    label: "History",
    href: "/history",
    icon: History,
  },
  {
    label: "Bookmarks",
    href: "/bookmarks",
    icon: Bookmark,
  },
];

const quickNavigation: NavigationItem[] = [
  {
    label: "Continue Learning",
    href: "/my-learning",
    icon: CheckCircle2,
  },
  {
    label: "Add Learning",
    href: "/explore",
    icon: Plus,
  },
];

function SidebarNavigation({
  items,
  collapsed,
  onNavigate,
}: {
  items: NavigationItem[];
  collapsed: boolean;
  onNavigate: () => void;
}) {
  return (
    <nav aria-label="Navigation">
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                [
                  "group flex h-10 items-center rounded-xl text-sm transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  collapsed ? "justify-center px-0" : "gap-3 px-3",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                ].join(" ")
              }
            >
              <Icon className="size-4.5 shrink-0" aria-hidden="true" />

              {!collapsed && (
                <>
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>

                  {item.comingSoon && (
                    <span className="shrink-0 rounded-full border bg-muted/60 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
                      Soon
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default function AppSidebar({
  collapsed,
  onCollapsedChange,
  mobileOpen,
  onMobileOpenChange,
}: AppSidebarProps) {
  const closeMobile = () => onMobileOpenChange(false);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <motion.button
          type="button"
          aria-label="Close navigation"
          aria-controls="app-navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <motion.aside
        id="app-navigation"
        aria-label="Main navigation"
        initial={false}
        animate={{
          width: collapsed ? 72 : 248,
        }}
        transition={{
          duration: 0.22,
          ease: "easeOut",
        }}
        className={[
          "fixed inset-y-0 left-0 z-50 flex h-svh shrink-0 flex-col",
          "bg-background",
          "lg:relative lg:z-30",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "transition-transform duration-200 lg:transition-none",
        ].join(" ")}
      >
        {/* Sidebar header */}
        <div
          className={[
            "flex h-18 shrink-0 items-center",
            collapsed ? "justify-center px-2" : "px-3",
          ].join(" ")}
        >
          {collapsed ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onCollapsedChange(false)}
              className="size-10 rounded-xl focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Expand sidebar"
            >
              <Menu className="size-5" aria-hidden="true" />
            </Button>
          ) : (
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onCollapsedChange(true)}
                  className="size-10 shrink-0 rounded-xl focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Collapse sidebar"
                >
                  <Menu className="size-5" aria-hidden="true" />
                </Button>

                <NavLink
                  to="/home"
                  onClick={closeMobile}
                  className="flex items-center gap-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Go to Learn_ home"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border bg-muted/40">
                    <BookOpen
                      className="size-4.5"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </span>

                  <span className="text-base font-semibold tracking-tight">
                    Learn_
                  </span>
                </NavLink>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={closeMobile}
                className="size-9 rounded-lg focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
                aria-label="Close sidebar"
              >
                <X className="size-5" aria-hidden="true" />
              </Button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="sidebar-scroll flex min-h-0 flex-1 flex-col overflow-y-auto px-2 py-4">
          {/* Learn */}
          <div>
            {!collapsed && (
              <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                Learn
              </p>
            )}

            <SidebarNavigation
              items={learnNavigation}
              collapsed={collapsed}
              onNavigate={closeMobile}
            />
          </div>

          {/* Activity */}
          <div className="mt-7">
            {!collapsed && (
              <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                Activity
              </p>
            )}

            <SidebarNavigation
              items={activityNavigation}
              collapsed={collapsed}
              onNavigate={closeMobile}
            />
          </div>

          {/* Quick Access */}
          <div className="mt-7">
            {!collapsed && (
              <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                Quick Access
              </p>
            )}

            <SidebarNavigation
              items={quickNavigation}
              collapsed={collapsed}
              onNavigate={closeMobile}
            />
          </div>

          {/* Weekly goal */}
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="mt-auto pt-8"
            >
              <div className="rounded-2xl bg-muted/40 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Weekly goal</p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Keep learning this week
                    </p>
                  </div>

                  <Target
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>

                <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "68%" }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-foreground"
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">3h 24m / 5h</span>

                  <span className="font-medium">68%</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Collapsed goal */}
          {collapsed && (
            <div className="mt-auto flex justify-center pt-8">
              <div
                title="Weekly goal: 68%"
                aria-label="Weekly goal: 68%"
                className="relative flex size-10 items-center justify-center rounded-xl bg-muted/50"
              >
                <Target
                  className="size-4.5 text-muted-foreground"
                  aria-hidden="true"
                />

                <span
                  className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-foreground"
                  aria-hidden="true"
                />
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="shrink-0 px-2 pb-3">
          <NavLink
            to="/settings"
            onClick={closeMobile}
            title={collapsed ? "Settings" : undefined}
            className={({ isActive }) =>
              [
                "flex h-10 items-center rounded-xl text-sm transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                collapsed ? "justify-center px-0" : "gap-3 px-3",
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              ].join(" ")
            }
          >
            <Settings className="size-4.5 shrink-0" aria-hidden="true" />

            {!collapsed && <span>Settings</span>}
          </NavLink>
        </div>
      </motion.aside>
    </>
  );
}
