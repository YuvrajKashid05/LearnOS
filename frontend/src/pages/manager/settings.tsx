import {
  Bell,
  Check,
  Database,
  Globe,
  Lock,
  Save,
  Settings2,
  Shield,
  SlidersHorizontal,
  Sparkles,
  UserRound,
} from "lucide-react";

import PageContainer from "@/components/shared/page-container";
import SectionHeader from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ManagerSettings() {
  return (
    <PageContainer>
      {/* Header */}
      <section className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
          <Settings2 className="size-3.5" aria-hidden="true" />
          Workspace configuration
        </div>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Manage your Learn_ workspace, AI processing preferences,
          notifications, and administrator settings.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Settings navigation */}
        <aside className="hidden lg:block">
          <nav className="sticky top-6 space-y-1">
            <SettingsNavItem icon={UserRound} label="Administrator" active />

            <SettingsNavItem icon={Sparkles} label="AI Pipeline" />

            <SettingsNavItem icon={Bell} label="Notifications" />

            <SettingsNavItem icon={Shield} label="Security" />

            <SettingsNavItem icon={Database} label="Workspace" />
          </nav>
        </aside>

        {/* Settings content */}
        <div className="min-w-0 space-y-8">
          {/* Administrator */}
          <section>
            <SectionHeader
              title="Administrator profile"
              description="Basic information about the manager account."
            />

            <div className="rounded-xl border border-border/60 bg-card p-5 sm:p-6">
              <div className="flex items-center gap-4 border-b border-border/60 pb-5">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UserRound className="size-5" aria-hidden="true" />
                </div>

                <div>
                  <p className="text-sm font-semibold">Learn_ Administrator</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Platform manager
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <SettingField
                  label="Display name"
                  value="Learn_ Administrator"
                />

                <SettingField label="Email address" value="admin@learn.local" />

                <SettingField label="Workspace" value="Learn_" />

                <SettingField label="Role" value="Administrator" disabled />
              </div>

              <div className="mt-6 flex justify-end">
                <Button type="button">
                  <Save className="size-4" aria-hidden="true" />
                  Save changes
                </Button>
              </div>
            </div>
          </section>

          {/* AI Pipeline */}
          <section>
            <SectionHeader
              title="AI pipeline"
              description="Control the default behavior of content processing."
            />

            <div className="rounded-xl border border-border/60 bg-card divide-y divide-border/60">
              <ToggleSetting
                icon={Sparkles}
                title="Automatic analysis"
                description="Analyze discovered videos automatically after transcript extraction."
                enabled
              />

              <ToggleSetting
                icon={SlidersHorizontal}
                title="AI content scoring"
                description="Generate relevance and learning-quality scores for analyzed videos."
                enabled
              />

              <ToggleSetting
                icon={Database}
                title="Duplicate detection"
                description="Detect similar or overlapping videos before path generation."
                enabled
              />

              <ToggleSetting
                icon={Globe}
                title="Automatic path generation"
                description="Generate a structured learning path after successful content analysis."
                enabled
              />
            </div>
          </section>

          {/* Notifications */}
          <section>
            <SectionHeader
              title="Notifications"
              description="Choose which workspace events should generate notifications."
            />

            <div className="rounded-xl border border-border/60 bg-card divide-y divide-border/60">
              <ToggleSetting
                icon={Bell}
                title="Pipeline completed"
                description="Notify when a topic finishes processing."
                enabled
              />

              <ToggleSetting
                icon={Bell}
                title="Pipeline failures"
                description="Notify when a processing job requires attention."
                enabled
              />

              <ToggleSetting
                icon={Bell}
                title="Learning path ready"
                description="Notify when an AI-generated path is ready for review."
                enabled
              />
            </div>
          </section>

          {/* Security */}
          <section>
            <SectionHeader
              title="Security"
              description="Administrator access and workspace security controls."
            />

            <div className="rounded-xl border border-border/60 bg-card p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Lock className="size-4" aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold">
                    Administrator security
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Authentication, sessions, refresh tokens, and account
                    security will be connected during backend integration.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <SecurityBadge text="Secure sessions" />
                    <SecurityBadge text="HTTP-only cookies" />
                    <SecurityBadge text="Protected workspace" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Workspace */}
          <section>
            <SectionHeader
              title="Workspace"
              description="General configuration for the Learn_ manager workspace."
            />

            <div className="rounded-xl border border-border/60 bg-card p-5 sm:p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <SettingField label="Workspace name" value="Learn_" />

                <SettingField
                  label="Default content language"
                  value="English"
                />

                <SettingField
                  label="Default video source"
                  value="YouTube"
                  disabled
                />

                <SettingField
                  label="Processing mode"
                  value="AI-assisted"
                  disabled
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageContainer>
  );
}

function SettingsNavItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: typeof UserRound;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={[
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      ].join(" ")}
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </button>
  );
}

function SettingField({
  label,
  value,
  disabled = false,
}: {
  label: string;
  value: string;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium">{label}</label>

      <Input value={value} readOnly disabled={disabled} />
    </div>
  );
}

function ToggleSetting({
  icon: Icon,
  title,
  description,
  enabled,
}: {
  icon: typeof Sparkles;
  title: string;
  description: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center gap-4 p-5 sm:p-6">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-medium">{title}</h3>

        <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <div
        className={[
          "flex size-6 shrink-0 items-center justify-center rounded-full",
          enabled
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
        ].join(" ")}
        aria-label={enabled ? `${title} enabled` : `${title} disabled`}
      >
        {enabled && <Check className="size-3.5" aria-hidden="true" />}
      </div>
    </div>
  );
}

function SecurityBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/50 px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
      <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
      {text}
    </span>
  );
}
