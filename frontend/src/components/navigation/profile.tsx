import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookMarked,
  Flame,
  Goal,
  LogOut,
  Settings,
  TrendingUp,
  UserRound,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

type ProfileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

type QuickLink = {
  label: string;
  icon: typeof BookMarked;
  href: string;
};

const quickLinks: QuickLink[] = [
  {
    label: "My Learning",
    icon: BookMarked,
    href: "/my-learning",
  },
  {
    label: "Learning Goals",
    icon: Goal,
    href: "/goals",
  },
  {
    label: "Progress",
    icon: TrendingUp,
    href: "/progress",
  },
  {
    label: "Bookmarks",
    icon: BookMarked,
    href: "/bookmarks",
  },
];

const weeklyGoal = {
  completed: 4,
  target: 5,
};

const weeklyGoalPercentage = (weeklyGoal.completed / weeklyGoal.target) * 100;

export default function ProfileDrawer({ open, onClose }: ProfileDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close profile"
            aria-controls="profile-drawer"
            className="fixed inset-0 z-40 cursor-default bg-black/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            id="profile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Profile"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="
              fixed right-3 top-3 z-50 flex
              h-[calc(100svh-24px)]
              w-[calc(100%-24px)]
              max-w-md
              flex-col overflow-hidden
              rounded-2xl border
              bg-background shadow-2xl
              sm:right-5 sm:top-5
              sm:h-[calc(100svh-40px)]
              sm:w-100
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-5 py-4">
              <div>
                <h2 className="font-semibold tracking-tight">Profile</h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  Your learning account
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="size-9 rounded-xl focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close profile"
              >
                <X className="size-4" aria-hidden="true" />
              </Button>
            </div>

            {/* Profile */}
            <div className="border-b px-5 py-6">
              <div className="flex items-center gap-4">
                <div
                  className="flex size-16 shrink-0 items-center justify-center rounded-full border bg-muted/50"
                  aria-hidden="true"
                >
                  <UserRound className="size-7 text-muted-foreground" />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold">
                    Raj Kashid
                  </h3>

                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    raj@example.com
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">Student</p>
                </div>
              </div>
            </div>

            {/* Learning stats */}
            <div className="grid grid-cols-2 gap-3 border-b p-5">
              {/* Streak */}
              <div className="rounded-xl border bg-muted/20 p-4">
                <div className="flex items-center gap-2">
                  <Flame className="size-4" aria-hidden="true" />

                  <span className="text-xs text-muted-foreground">Streak</span>
                </div>

                <p className="mt-2 text-xl font-semibold">12 days</p>

                <p className="mt-1 text-[11px] text-muted-foreground">
                  Keep it going
                </p>
              </div>

              {/* Weekly goal */}
              <div className="rounded-xl border bg-muted/20 p-4">
                <div className="flex items-center gap-2">
                  <Goal className="size-4" aria-hidden="true" />

                  <span className="text-xs text-muted-foreground">
                    Weekly goal
                  </span>
                </div>

                <p className="mt-2 text-xl font-semibold">
                  {weeklyGoal.completed} / {weeklyGoal.target}h
                </p>

                <div
                  className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"
                  role="progressbar"
                  aria-label="Weekly learning goal progress"
                  aria-valuemin={0}
                  aria-valuemax={weeklyGoal.target}
                  aria-valuenow={weeklyGoal.completed}
                >
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-500"
                    style={{ width: `${weeklyGoalPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
              <p className="px-2 py-2 text-xs font-medium text-muted-foreground">
                Quick access
              </p>

              <nav aria-label="Profile quick access">
                <div className="space-y-1">
                  {quickLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={onClose}
                        className="
                          flex items-center gap-3 rounded-xl
                          px-3 py-3
                          transition-colors
                          hover:bg-muted/60
                          focus-visible:bg-muted/60
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-ring
                        "
                      >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/50">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>

                        <span className="flex-1 text-sm font-medium">
                          {item.label}
                        </span>

                        <ArrowRight
                          className="size-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </Link>
                    );
                  })}
                </div>
              </nav>

              <div className="my-3 border-t" />

              <p className="px-2 py-2 text-xs font-medium text-muted-foreground">
                Account
              </p>

              <Link
                to="/settings"
                onClick={onClose}
                className="
                  flex items-center gap-3 rounded-xl
                  px-3 py-3
                  transition-colors
                  hover:bg-muted/60
                  focus-visible:bg-muted/60
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-ring
                "
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/50">
                  <Settings className="size-4" aria-hidden="true" />
                </span>

                <span className="flex-1 text-sm font-medium">Settings</span>

                <ArrowRight
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Footer */}
            <div className="border-t p-4">
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl focus-visible:ring-2 focus-visible:ring-ring"
              >
                <LogOut className="size-4" aria-hidden="true" />
                Sign out
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
