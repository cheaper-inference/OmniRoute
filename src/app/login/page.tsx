"use client";

import Icon from "@/shared/components/Icon";
import { OmniRouteLockup } from "@/shared/components/OmniRouteLogo";

import { useTranslations } from "next-intl";

import { useState, useEffect } from "react";
// Direct module imports, not the "@/shared/components" barrel: the barrel
// re-exports Sidebar/Header/composites (and transitively the whole dashboard
// shell) which would otherwise ship in the /login page chunks.
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Input from "@/shared/components/Input";
import { Spinner } from "@/shared/components/Loading";
import { AlertDescription, AlertTitle } from "@omniroute/ui-kit/alert";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const t = useTranslations("auth");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const [setupComplete, setSetupComplete] = useState<boolean | null>(null);
  const [oidcEnabled, setOidcEnabled] = useState<boolean | null>(null);
  const [oidcDisablePasswordLogin, setOidcDisablePasswordLogin] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);
  const [nodeVersion, setNodeVersion] = useState(null);
  const [nodeCompatible, setNodeCompatible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    async function checkAuth() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

      try {
        const res = await fetch(`${baseUrl}/api/settings/require-login`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.nodeVersion) setNodeVersion(data.nodeVersion);
          if (data.nodeCompatible === false) setNodeCompatible(false);
          if (data.authenticated === true || data.requireLogin === false) {
            window.location.href = "/dashboard";
            return;
          }
          setHasPassword(!!data.hasPassword);
          setSetupComplete(!!data.setupComplete);
          setOidcEnabled(!!data.oidcEnabled);
          setOidcDisablePasswordLogin(!!data.oidcDisablePasswordLogin);
        } else {
          setHasPassword(true);
          setSetupComplete(true);
          setOidcEnabled(false);
          setOidcDisablePasswordLogin(false);
        }
      } catch (err) {
        clearTimeout(timeoutId);
        setHasPassword(true);
        setSetupComplete(true);
        setOidcEnabled(false);
        setOidcDisablePasswordLogin(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        sessionStorage.setItem("omniroute_login_time", String(Date.now()));
        window.location.href = "/dashboard";
      } else {
        const data = await res.json();
        // (#521) If no password is set, redirect to onboarding instead of showing an error
        if (data.needsSetup) {
          window.location.href = "/dashboard/onboarding";
          return;
        }
        setError(data.error || t("invalidPassword"));
      }
    } catch (err) {
      setError(t("errorOccurredRetry"));
    } finally {
      setLoading(false);
    }
  };

  const nodeWarningBanner =
    !nodeCompatible && nodeVersion ? (
      <div className="w-full max-w-lg mx-auto mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
        {/* Kit alert parts without the dismiss control: the Node warning is a permanent banner
            (the kit Alert always renders a dismiss button — kit gap). */}
        <div
          role="alert"
          data-slot="alert"
          data-variant="critical"
          className="ci-alert ci-alert--critical"
        >
          <span className="ci-alert__icon">
            <Icon name="error" size={20} />
          </span>
          <div className="ci-alert__body">
            <AlertTitle>{t("nodeIncompatibleTitle")}</AlertTitle>
            <AlertDescription>
              <p className="mb-3">{t("nodeIncompatibleDesc", { version: nodeVersion })}</p>
              <div className="rounded-control border border-border bg-bg-subtle px-4 py-3 font-mono text-sm">
                <div className="mb-1 flex items-center gap-2 text-text-muted">
                  <Icon name="terminal" size={14} />
                  <span className="text-xs">{t("nodeIncompatibleFixLabel")}</span>
                </div>
                <code className="text-text-main">nvm install 22 && nvm use 22</code>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-text-muted">
                <Icon name="info" size={14} />
                {t("nodeIncompatibleHint")}
              </p>
            </AlertDescription>
          </div>
        </div>
      </div>
    ) : null;
  if (
    hasPassword === null ||
    setupComplete === null ||
    oidcEnabled === null ||
    (oidcEnabled && oidcDisablePasswordLogin === null)
  ) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        {nodeWarningBanner}
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" label={t("loading")} />
          <span className="text-sm text-text-muted" aria-hidden="true">
            {t("loading")}
          </span>
        </div>
      </div>
    );
  }

  if (!hasPassword && !setupComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        {nodeWarningBanner}
        <div
          className={`w-full max-w-md transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-card bg-bg-subtle border border-border mb-6">
              <Icon name="rocket_launch" size={40} className="text-text-muted" />
            </div>
            <h1 className="ci-heading text-3xl">{t("welcome")}</h1>
            <p className="text-text-muted mt-2">{t("configureInstance")}</p>
          </div>

          <Card padding="lg">
            <div className="text-center">
              <p className="text-text-muted leading-relaxed mb-6">{t("runOnboardingWizard")}</p>
              <Button
                variant="primary"
                className="w-full h-11 text-sm font-medium"
                onClick={() => router.push("/dashboard/onboarding")}
              >
                {t("startOnboarding")}
              </Button>
            </div>
          </Card>

          <p className="text-center text-xs text-text-muted mt-8">
            OmniRoute — {t("unifiedProxy")}
          </p>
        </div>
      </div>
    );
  }

  if (!hasPassword && setupComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        {nodeWarningBanner}
        <div
          className={`w-full max-w-md transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-card bg-warning-bg border border-border mb-6">
              <Icon name="shield_person" size={40} className="text-warning" />
            </div>
            <h1 className="ci-heading text-3xl">{t("secureYourInstance")}</h1>
            <p className="text-text-muted mt-2">{t("passwordNotEnabled")}</p>
          </div>

          <Card padding="lg">
            <div className="text-center">
              <p className="text-text-muted leading-relaxed mb-6">{t("setPasswordDescription")}</p>
              <Button
                variant="primary"
                className="w-full h-11 text-sm font-medium"
                onClick={() => router.push("/dashboard/onboarding")}
              >
                {t("configurePassword")}
              </Button>
            </div>
          </Card>

          <p className="text-center text-xs text-text-muted mt-8">
            OmniRoute — {t("unifiedAiApiProxy")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {nodeWarningBanner && (
        <div className="flex justify-center pt-6 px-6">{nodeWarningBanner}</div>
      )}
      <div className="flex-1 flex">
        <div className="flex-1 flex items-center justify-center p-6">
          <div
            className={`w-full max-w-sm transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <Card padding="lg">
              <div className="mb-8">
                <div className="mb-8">
                  <OmniRouteLockup />
                </div>
                <h1 className="ci-heading text-2xl">{t("signIn")}</h1>
                <p className="text-text-muted mt-1.5">
                  {oidcEnabled && oidcDisablePasswordLogin
                    ? t("continueWithOidc")
                    : t("enterPassword")}
                </p>
              </div>

              {oidcEnabled && oidcDisablePasswordLogin ? (
                <div className="space-y-4">
                  <Button
                    type="button"
                    variant="primary"
                    icon="login"
                    className="w-full h-11 text-sm font-medium"
                    onClick={() => (window.location.href = "/api/auth/oidc/login")}
                  >
                    {t("continueWithOidc")}
                  </Button>
                </div>
              ) : (
                <>
                  <form onSubmit={handleLogin} className="space-y-5 w-full">
                    <Input
                      type="password"
                      label={t("password")}
                      placeholder={t("enterPassword")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoFocus
                      error={error || undefined}
                      hint={t("defaultPasswordHint")}
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full h-11 text-sm font-medium"
                      loading={loading}
                    >
                      {t("continue")}
                    </Button>
                  </form>

                  {oidcEnabled && (
                    <div className="mt-4">
                      <Button
                        type="button"
                        variant="secondary"
                        icon="login"
                        className="w-full h-11 text-sm font-medium"
                        onClick={() => (window.location.href = "/api/auth/oidc/login")}
                      >
                        {t("continueWithOidc")}
                      </Button>
                    </div>
                  )}
                </>
              )}

              {!oidcEnabled && (
                <div className="mt-6 pt-6 border-t border-border">
                  <a
                    href="/forgot-password"
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {t("forgotPassword")}
                  </a>
                </div>
              )}
            </Card>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 bg-bg-subtle border-l border-border items-center justify-center p-12">
          <div
            className={`max-w-md transition-all duration-700 delay-200 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="space-y-8">
              <div>
                <h2 className="ci-heading text-2xl mb-3">{t("unifiedAiApiProxy")}</h2>
                <p className="text-text-muted leading-relaxed">{t("unifiedAiApiProxyDesc")}</p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: "swap_horiz",
                    title: t("featureMultiProviderTitle"),
                    desc: t("featureMultiProviderDesc"),
                  },
                  {
                    icon: "speed",
                    title: t("featureLoadBalancingTitle"),
                    desc: t("featureLoadBalancingDesc"),
                  },
                  {
                    icon: "analytics",
                    title: t("featureUsageTrackingTitle"),
                    desc: t("featureUsageTrackingDesc"),
                  },
                ].map((item) => (
                  <div
                    key={item.icon}
                    className="flex items-start gap-4 p-4 rounded-card bg-surface border border-border"
                  >
                    <div className="w-10 h-10 rounded-control bg-bg-subtle flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={20} className="text-text-muted" />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-main">{item.title}</h3>
                      <p className="text-sm text-text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
