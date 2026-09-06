import {
  ArrowLeft,
  Bell,
  BookOpen,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import NotificationsDrawer from "@/components/navigation/notifications";
import ProfileDrawer from "@/components/navigation/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AppHeaderProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onMenuClick: () => void;
};

export default function AppHeader({
  collapsed,
  mobileOpen,
  onMenuClick,
}: AppHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const mobileSearchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mobileSearchOpen) {
      mobileSearchRef.current?.focus();
    }
  }, [mobileSearchOpen]);

  const closeMobileSearch = () => {
    setMobileSearchOpen(false);
  };

  return (
    <>
      <header className="relative z-30 h-18 shrink-0 bg-background">
        {/* Mobile search mode */}
        <div
          className={[
            "flex h-full items-center px-3 sm:px-4 lg:hidden",
            mobileSearchOpen ? "flex" : "hidden",
          ].join(" ")}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={closeMobileSearch}
            className="mr-1 size-10 shrink-0 rounded-xl"
            aria-label="Close search"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </Button>

          <div className="relative min-w-0 flex-1">
            <Search
              className="
                pointer-events-none
                absolute left-3.5 top-1/2
                size-4
                -translate-y-1/2
                text-muted-foreground
              "
              aria-hidden="true"
            />

            <Input
              ref={mobileSearchRef}
              type="search"
              name="mobile-learning-search"
              aria-label="Search learning content"
              placeholder="Search anything you want to learn..."
              className="
                h-11 w-full rounded-xl border bg-muted/20
                pl-10 pr-4 text-sm shadow-none
                placeholder:text-muted-foreground/70
                focus-visible:bg-background
              "
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={closeMobileSearch}
            className="ml-1 size-10 shrink-0 rounded-xl"
            aria-label="Close search"
          >
            <X className="size-5" aria-hidden="true" />
          </Button>
        </div>

        {/* Normal header */}
        <div
          className={[
            "flex h-full items-center px-4 sm:px-6 lg:px-8",
            mobileSearchOpen ? "hidden lg:flex" : "flex",
          ].join(" ")}
        >
          {/* Mobile menu */}
          {!mobileOpen && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="mr-2 size-10 shrink-0 rounded-xl lg:hidden"
              aria-label="Open navigation"
              aria-controls="app-navigation"
            >
              <Menu className="size-5" aria-hidden="true" />
            </Button>
          )}

          {/* Collapsed desktop logo */}
          {collapsed && (
            <Link
              to="/home"
              className="mr-6 hidden items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:flex"
              aria-label="Go to Learn_ home"
            >
              <div className="flex size-9 items-center justify-center rounded-xl border bg-muted/40">
                <BookOpen className="size-4.5" aria-hidden="true" />
              </div>

              <span className="text-base font-semibold tracking-tight">
                Learn_
              </span>
            </Link>
          )}

          {/* Mobile logo */}
          <Link
            to="/home"
            className="flex shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
            aria-label="Go to Learn_ home"
          >
            <div className="flex size-9 items-center justify-center rounded-xl border bg-muted/40">
              <BookOpen className="size-4.5" aria-hidden="true" />
            </div>

            <span className="text-base font-semibold tracking-tight">
              Learn_
            </span>
          </Link>

          {/* Desktop search */}
          <div className="mx-auto hidden w-full max-w-3xl justify-center px-3 sm:px-6 lg:flex">
            <div className="relative w-full">
              <Search
                className="
                  pointer-events-none
                  absolute left-3.5 top-1/2
                  size-4.5
                  -translate-y-1/2
                  text-muted-foreground
                "
                aria-hidden="true"
              />

              <Input
                type="search"
                name="learning-search"
                aria-label="Search learning content"
                placeholder="Search anything you want to learn..."
                className="
                  h-11 w-full rounded-full border bg-muted/20
                  pl-10 pr-4 text-sm shadow-none
                  placeholder:text-muted-foreground/70
                  focus-visible:bg-background
                "
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="ml-auto flex shrink-0 items-center gap-1">
            {/* Mobile search trigger */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setMobileSearchOpen(true)}
              className="size-10 rounded-xl lg:hidden"
              aria-label="Open search"
              aria-expanded={mobileSearchOpen}
              aria-controls="mobile-search-input"
            >
              <Search className="size-5" aria-hidden="true" />
            </Button>

            {/* Notifications */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setNotificationsOpen(true)}
              className="relative size-10 rounded-xl"
              aria-label="Notifications"
              aria-haspopup="dialog"
              aria-expanded={notificationsOpen}
            >
              <Bell className="size-4.5" aria-hidden="true" />

              <span
                className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-primary"
                aria-hidden="true"
              />
            </Button>

            {/* Profile */}
            <Button
              type="button"
              variant="ghost"
              onClick={() => setProfileOpen(true)}
              className="size-10 rounded-xl p-0"
              aria-label="Open profile"
              aria-haspopup="dialog"
              aria-expanded={profileOpen}
            >
              <span className="flex size-9 items-center justify-center rounded-full border bg-muted/40">
                <UserRound className="size-4.25" aria-hidden="true" />
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Notifications */}
      <NotificationsDrawer
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      {/* Profile */}
      <ProfileDrawer open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
