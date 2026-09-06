import { useEffect, useState, type FormEvent } from "react";

import { getProfile, updateProfile } from "@/api/user.api";
import PageContainer from "@/components/shared/page-container";
import SectionHeader from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";

export default function Settings() {
  const { user, isLoading: authLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      if (authLoading) {
        return;
      }

      if (!user) {
        setLoadingProfile(false);
        return;
      }

      setLoadingProfile(true);
      setError(null);

      try {
        const profile = await getProfile();

        if (cancelled) {
          return;
        }

        setName(profile.name);
        setEmail(profile.email);
      } catch (requestError) {
        if (cancelled) {
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load your profile.",
        );
      } finally {
        if (!cancelled) {
          setLoadingProfile(false);
        }
      }
    };

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (saving || loadingProfile) {
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const profile = await updateProfile({
        name: name.trim(),
      });

      setName(profile.name);
      setSuccess("Profile updated successfully.");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to update your profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageContainer>
      <SectionHeader
        title="Settings"
        description="Manage your Learn_ profile and account preferences."
      />

      <div className="mt-8 max-w-2xl">
        <section className="rounded-2xl border border-border bg-card/60 p-6 shadow-sm backdrop-blur-xl">
          <div>
            <h2 className="text-lg font-semibold">Profile</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Update the information associated with your Learn_ account.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="mt-6 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground"
            >
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="space-y-2">
              <label htmlFor="settings-name" className="text-sm font-medium">
                Full name
              </label>

              <Input
                id="settings-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={loadingProfile || saving}
                minLength={3}
                maxLength={50}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="settings-email" className="text-sm font-medium">
                Email
              </label>

              <Input
                id="settings-email"
                name="email"
                type="email"
                value={email}
                disabled
                readOnly
              />

              <p className="text-xs text-muted-foreground">
                Your email address cannot be changed here.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={loadingProfile || saving || !name.trim()}
              >
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </PageContainer>
  );
}
