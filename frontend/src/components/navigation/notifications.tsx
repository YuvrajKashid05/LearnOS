import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckCheck, Clock3, PlayCircle, Trophy, X } from "lucide-react";

import { Button } from "@/components/ui/button";

type NotificationIcon = typeof PlayCircle;

type Notification = {
  id: number;
  icon: NotificationIcon;
  title: string;
  description: string;
  time: string;
  unread: boolean;
};

type NotificationsDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const notifications: Notification[] = [
  {
    id: 1,
    icon: PlayCircle,
    title: "Continue learning",
    description: "You're halfway through React Masterclass.",
    time: "10 min ago",
    unread: true,
  },
  {
    id: 2,
    icon: Trophy,
    title: "Goal completed",
    description: "You completed your weekly learning goal.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 3,
    icon: Clock3,
    title: "Learning reminder",
    description: "You planned to study React today.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    icon: Trophy,
    title: "New achievement",
    description: "You've completed 5 learning sessions.",
    time: "2 days ago",
    unread: false,
  },
];

export default function NotificationsDrawer({
  open,
  onClose,
}: NotificationsDrawerProps) {
  const unreadCount = notifications.filter(
    (notification) => notification.unread,
  ).length;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close notifications"
            aria-controls="notifications-drawer"
            className="fixed inset-0 z-40 cursor-default bg-black/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            id="notifications-drawer"
            aria-label="Notifications"
            role="dialog"
            aria-modal="true"
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
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold tracking-tight">
                    Notifications
                  </h2>

                  {unreadCount > 0 && (
                    <span
                      aria-label={`${unreadCount} unread notifications`}
                      className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground"
                    >
                      {unreadCount}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                  Stay updated with your learning activity
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="size-9 rounded-xl focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close notifications"
              >
                <X className="size-4" aria-hidden="true" />
              </Button>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between border-b px-5 py-3">
              <span className="text-xs text-muted-foreground">
                {unreadCount === 0
                  ? "You're all caught up"
                  : `${unreadCount} unread notification${
                      unreadCount === 1 ? "" : "s"
                    }`}
              </span>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 rounded-lg px-2.5 text-xs focus-visible:ring-2 focus-visible:ring-ring"
                disabled={unreadCount === 0}
              >
                <CheckCheck className="size-3.5" aria-hidden="true" />
                Mark all read
              </Button>
            </div>

            {/* Notifications */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              {notifications.map((notification) => {
                const Icon = notification.icon;

                return (
                  <button
                    key={notification.id}
                    type="button"
                    aria-label={`${notification.title}. ${notification.description}`}
                    className={[
                      "group flex w-full gap-3 border-b px-5 py-4 text-left",
                      "transition-colors focus-visible:bg-muted/60 focus-visible:outline-none",
                      "hover:bg-muted/50",
                      notification.unread ? "bg-muted/20" : "",
                    ].join(" ")}
                  >
                    {/* Icon */}
                    <span
                      className={[
                        "flex size-10 shrink-0 items-center justify-center rounded-xl border bg-muted/40",
                        notification.unread ? "border-primary/20" : "",
                      ].join(" ")}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </span>

                    {/* Content */}
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-3">
                        <span className="text-sm font-medium">
                          {notification.title}
                        </span>

                        {notification.unread && (
                          <span
                            className="mt-1 size-2 shrink-0 rounded-full bg-primary"
                            aria-label="Unread"
                          />
                        )}
                      </span>

                      <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                        {notification.description}
                      </span>

                      <span className="mt-2 block text-[11px] text-muted-foreground/70">
                        {notification.time}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t p-4">
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Check className="size-4" aria-hidden="true" />
                View all notifications
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
