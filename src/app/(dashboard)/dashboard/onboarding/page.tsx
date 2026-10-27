"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { CodePreview } from "@omniroute/ui-kit/code-preview";
import { ChoiceCard } from "@omniroute/ui-kit/onboarding-patterns";
import { RadioGroup } from "@omniroute/ui-kit/radio-group";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Checkbox from "@/shared/components/Checkbox";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import { Spinner } from "@/shared/components/Loading";
import { cn } from "@/shared/utils/cn";
import { useDisplayBaseUrl } from "@/shared/hooks";
import { FreeProviderOnboardingCard } from "./steps/FreeProviderOnboardingCard";
import { TierTour } from "./steps/TierTour";

const STEP_IDS = ["welcome", "tiers", "security", "provider", "test", "done"];
const STEP_ICONS = ["waving_hand", "layers", "lock", "dns", "play_circle", "check_circle"];

const COMMON_PROVIDERS = [
  { id: "openai", name: "OpenAI", color: "#10A37F" },
  { id: "anthropic", name: "Anthropic", color: "#D97757" },
  { id: "google", name: "Google AI", color: "#4285F4" },
  { id: "openrouter", name: "OpenRouter", color: "#6B21A8" },
  { id: "groq", name: "Groq", color: "#F55036" },
  { id: "mistral", name: "Mistral", color: "#FF7000" },
];

export default function OnboardingWizard() {
  const router = useRouter();
  const t = useTranslations("onboarding");
  const tc = useTranslations("common");
  const baseUrl = useDisplayBaseUrl();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const apiEndpoint = `${baseUrl}/api/v1`;

  // Security step state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [skipSecurity, setSkipSecurity] = useState(false);

  // #14296: fresh Docker/NAT-forwarded installs (peer isn't 127.0.0.1) hit a
  // 401 on the bootstrap writes below until the operator supplies the
  // one-shot token the server printed to its log.
  const [bootstrapToken, setBootstrapToken] = useState("");
  const [needsBootstrapToken, setNeedsBootstrapToken] = useState(false);

  // Provider step state
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [providerUrl, setProviderUrl] = useState("");
  const [providerKey, setProviderKey] = useState("");
  const [providerName, setProviderName] = useState("");

  // Test step state
  const [testStatus, setTestStatus] = useState("idle"); // idle, testing, success, error
  const [testMessage, setTestMessage] = useState("");

  // Check if setup is already complete
  useEffect(() => {
    const checkSetup = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const settings = await res.json();
          if (settings.setupComplete) {
            router.replace("/dashboard");
            return;
          }
        }
      } catch {
        // Continue with setup
      }
      setLoading(false);
    };
    checkSetup();
  }, [router]);

  const STEPS = STEP_IDS.map((id, i) => ({
    id,
    title: t(id === "done" ? "ready" : id),
    icon: STEP_ICONS[i],
  }));

  const currentStep = STEPS[step];
  const isLastStep = step === STEPS.length - 1;

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const [errorMessage, setErrorMessage] = useState("");

  // #14296: attach the operator-supplied bootstrap token when we have one —
  // required only for a non-loopback (e.g. Docker/NAT-forwarded) caller
  // completing a fresh install; a no-op header on every other install.
  const bootstrapHeaders = (base: Record<string, string> = {}) =>
    bootstrapToken ? { ...base, "x-omniroute-bootstrap-token": bootstrapToken } : base;

  // Returns true when the caller should stop (a bootstrap-token prompt was
  // shown), false when the response was a "real" failure to report normally.
  const handleBootstrapAuthFailure = (res: Response): boolean => {
    if (res.status === 401 && !bootstrapToken) {
      setNeedsBootstrapToken(true);
      setErrorMessage(t("bootstrapTokenHelp"));
      return true;
    }
    return false;
  };

  const handleSetPassword = async () => {
    setErrorMessage("");
    if (skipSecurity) {
      // (#574) Explicitly disable requireLogin when skipping password setup
      try {
        const res = await fetch("/api/settings/require-login", {
          method: "POST",
          headers: bootstrapHeaders({ "Content-Type": "application/json" }),
          body: JSON.stringify({ requireLogin: false }),
        });
        if (!res.ok) {
          if (!handleBootstrapAuthFailure(res)) setErrorMessage(t("failedSetPassword"));
          return;
        }
      } catch {
        setErrorMessage(t("connectionError"));
        return;
      }
      handleNext();
      return;
    }
    if (password !== confirmPassword) return;
    try {
      const res = await fetch("/api/settings/require-login", {
        method: "POST",
        headers: bootstrapHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ requireLogin: true, password }),
      });
      if (!res.ok) {
        if (handleBootstrapAuthFailure(res)) return;
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || t("failedSetPassword"));
        return;
      }
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!loginRes.ok) {
        const data = await loginRes.json().catch(() => ({}));
        setErrorMessage(data.error || t("connectionError"));
        return;
      }
      handleNext();
    } catch {
      setErrorMessage(t("connectionError"));
    }
  };

  const handleAddProvider = async () => {
    if (!selectedProvider || !providerKey) return;
    setErrorMessage("");
    try {
      const provider = COMMON_PROVIDERS.find((p) => p.id === selectedProvider);
      const defaultUrls = {
        openai: "https://api.openai.com",
        anthropic: "https://api.anthropic.com",
        google: "https://generativelanguage.googleapis.com",
        openrouter: "https://openrouter.ai/api",
        groq: "https://api.groq.com/openai",
        mistral: "https://api.mistral.ai",
      };
      const res = await fetch("/api/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: selectedProvider,
          name: providerName || provider?.name || selectedProvider,
          url: providerUrl || defaultUrls[selectedProvider] || "",
          apiKey: providerKey,
          isActive: true,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || t("failedAddProvider"));
        return;
      }
      handleNext();
    } catch {
      setErrorMessage(t("connectionError"));
    }
  };

  const handleTestProvider = async () => {
    setTestStatus("testing");
    setTestMessage(t("testingConnection"));
    try {
      const res = await fetch("/api/providers");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const conn = data.connections?.[0];
      if (!conn) {
        setTestStatus("error");
        setTestMessage(t("noProviderFound"));
        return;
      }
      const testRes = await fetch(`/api/providers/${conn.id}/test`, { method: "POST" });
      if (testRes.ok) {
        setTestStatus("success");
        setTestMessage(t("connectionSuccessful"));
      } else {
        const err = await testRes.json().catch(() => ({}));
        setTestStatus("error");
        setTestMessage(err.error || t("testFailed"));
      }
    } catch {
      setTestStatus("error");
      setTestMessage(t("couldNotTest"));
    }
  };

  const handleFinish = async () => {
    setErrorMessage("");
    try {
      // (#574) If no password was set during wizard, disable requireLogin
      // to prevent the user from being locked out on the login page
      const settings = await fetch("/api/settings/require-login")
        .then((r) => r.json())
        .catch(() => ({}));
      if (!settings.hasPassword) {
        const requireLoginRes = await fetch("/api/settings/require-login", {
          method: "POST",
          headers: bootstrapHeaders({ "Content-Type": "application/json" }),
          body: JSON.stringify({ requireLogin: false }),
        });
        // #14296: this write used to be fire-and-forget, so a 401 from a
        // Docker/NAT-forwarded install silently left requireLogin untouched
        // and the wizard sailed on to setupComplete/dashboard anyway,
        // reproducing the reported redirect loop. Surface it instead.
        if (!requireLoginRes.ok && handleBootstrapAuthFailure(requireLoginRes)) return;
      }

      const patchRes = await fetch("/api/settings", {
        method: "PATCH",
        headers: bootstrapHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ setupComplete: true }),
      });
      if (!patchRes.ok) {
        if (handleBootstrapAuthFailure(patchRes)) return;
        setErrorMessage(t("connectionError"));
        return;
      }
    } catch {
      setErrorMessage(t("connectionError"));
      return;
    }
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner label={tc("loading")} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress Indicator */}
        {/* Narrow below sm: 6 dots + 5 connectors must fit 390 px (F4). */}
        <ol
          aria-label={t("stepProgress")}
          className="flex items-center justify-center gap-1 sm:gap-2 mb-8"
        >
          {STEPS.map((s, i) => (
            <li
              key={s.id}
              className="flex items-center gap-1 sm:gap-2"
              aria-current={i === step ? "step" : undefined}
            >
              <span
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                  i < step
                    ? "bg-success-bg text-success"
                    : i === step
                      ? "bg-primary/20 text-primary ring-2 ring-primary/40"
                      : "bg-surface-2 text-text-muted"
                )}
              >
                {i < step ? <Icon name="check" size={16} /> : i + 1}
                <span className="sr-only">{s.title}</span>
              </span>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "w-3 sm:w-8 h-0.5 rounded-full transition-colors",
                    i < step ? "bg-success/40" : "bg-border"
                  )}
                />
              )}
            </li>
          ))}
        </ol>

        {/* Card */}
        <Card padding="lg" className="shadow-xl">
          {/* Step Header */}
          <div className="text-center mb-6">
            <Icon
              name={currentStep.icon}
              size={48}
              className={cn(
                "mx-auto mb-3 block",
                currentStep.id === "done" ? "text-success" : "text-primary"
              )}
            />
            {/* The step title is the page heading (the wizard has no PageHeader). */}
            <h1 className="text-2xl font-bold text-text-main">{currentStep.title}</h1>
            {currentStep.id === "tiers" && (
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-muted text-balance">
                {t("tier.subtitle")}
              </p>
            )}
          </div>

          {/* #14296: fresh-install bootstrap token prompt + generic errors —
              rendered above the step content so it applies regardless of
              which step's write actually failed (security step or the
              Finish/Skip-wizard buttons). */}
          {errorMessage && (
            <Alert
              variant="warning"
              className="mb-4"
              dismissLabel={tc("close")}
              onDismiss={() => setErrorMessage("")}
            >
              <p className="text-sm">{errorMessage}</p>
              {needsBootstrapToken && (
                <div className="mt-3 space-y-2">
                  <Input
                    type="text"
                    placeholder={t("bootstrapTokenLabel")}
                    aria-label={t("bootstrapTokenLabel")}
                    value={bootstrapToken}
                    onChange={(e) => setBootstrapToken(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    onClick={isLastStep ? handleFinish : handleSetPassword}
                    disabled={!bootstrapToken}
                  >
                    {t("retry")}
                  </Button>
                </div>
              )}
            </Alert>
          )}

          {/* Step Content */}
          <div className="min-h-[200px]">
            {/* Welcome */}
            {currentStep.id === "welcome" && (
              <div className="text-center space-y-4">
                <p className="text-text-muted">{t("welcomeDesc")}</p>
                <div className="mt-6 grid grid-cols-3 gap-3 items-stretch">
                  {[
                    { icon: "swap_horiz", label: t("multiProvider") },
                    { icon: "monitoring", label: t("usageTracking") },
                    { icon: "shield", label: t("apiKeyMgmt") },
                  ].map((f) => (
                    <div
                      key={f.icon}
                      className="h-full bg-surface-2 rounded-xl p-3 text-center border border-border"
                    >
                      <div className="flex h-full flex-col items-center justify-center">
                        <Icon name={f.icon} size={24} className="text-primary mb-1 block" />
                        <span className="text-xs text-text-muted">{f.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tiers */}
            {currentStep.id === "tiers" && <TierTour />}

            {/* Security */}
            {currentStep.id === "security" && (
              <div className="space-y-4">
                <p className="text-sm text-text-muted text-center">{t("securityDesc")}</p>
                <Checkbox
                  label={t("skipPassword")}
                  checked={skipSecurity}
                  onChange={(e) => setSkipSecurity(e.target.checked)}
                />
                {skipSecurity && (
                  <p className="text-xs text-warning text-center animate-in fade-in duration-200">
                    {t("securityDescSkipWarning")}
                  </p>
                )}
                {!skipSecurity && (
                  <div className="space-y-3">
                    {/* Caps Lock warning comes from the Input adapter (common.capsLockOn). */}
                    <Input
                      type="password"
                      placeholder={t("enterPassword")}
                      aria-label={t("enterPassword")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      type="password"
                      placeholder={t("confirmPasswordPlaceholder")}
                      aria-label={t("confirmPasswordPlaceholder")}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      error={
                        password && confirmPassword && password !== confirmPassword
                          ? t("passwordsMismatch")
                          : undefined
                      }
                    />
                  </div>
                )}
              </div>
            )}

            {/* Provider */}
            {currentStep.id === "provider" && (
              <div className="space-y-4">
                <p className="text-sm text-text-muted text-center">{t("providerDesc")}</p>
                {skipSecurity && (
                  <p
                    role="status"
                    className="rounded-lg border border-warning/30 bg-warning-bg p-3 text-center text-sm text-warning animate-in fade-in duration-200"
                  >
                    {t("providerRequiresPassword")}
                  </p>
                )}
                {!skipSecurity && <FreeProviderOnboardingCard />}
                {!skipSecurity && (
                  <div className="flex items-center gap-3 text-[11px] text-text-muted">
                    <span className="h-px flex-1 bg-border" />
                    <span>{t("freeProviders.orUseApiKey")}</span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                )}
                {!skipSecurity && (
                  <RadioGroup
                    aria-label={t("providerDesc")}
                    value={selectedProvider ?? ""}
                    onValueChange={(id) => {
                      const provider = COMMON_PROVIDERS.find((p) => p.id === id);
                      setSelectedProvider(id);
                      if (provider) setProviderName(provider.name);
                    }}
                    className="[&_.ci-radio-group__items]:grid-cols-2 sm:[&_.ci-radio-group__items]:grid-cols-3 [&_.ci-radio-group__items]:gap-2"
                  >
                    {COMMON_PROVIDERS.map((p) => (
                      <ChoiceCard
                        key={p.id}
                        value={p.id}
                        title={p.name}
                        tone="accent"
                        className="text-xs"
                      />
                    ))}
                  </RadioGroup>
                )}
                {!skipSecurity && selectedProvider && (
                  <div className="space-y-3 mt-4">
                    <Input
                      type="password"
                      placeholder={t("apiKeyRequired")}
                      aria-label={t("apiKeyRequired")}
                      value={providerKey}
                      onChange={(e) => setProviderKey(e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder={t("customUrlOptional")}
                      aria-label={t("customUrlOptional")}
                      value={providerUrl}
                      onChange={(e) => setProviderUrl(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Test */}
            {currentStep.id === "test" && (
              <div className="text-center space-y-4">
                <p className="text-sm text-text-muted">{t("testDesc")}</p>
                {testStatus === "idle" && (
                  <Button variant="primary" onClick={handleTestProvider}>
                    {t("runTest")}
                  </Button>
                )}
                {testStatus === "testing" && (
                  <div className="flex items-center justify-center gap-2 text-text-muted">
                    <Icon name="progress_activity" size={20} className="animate-spin" />
                    <span className="text-sm">{testMessage}</span>
                  </div>
                )}
                {testStatus === "success" && (
                  <div className="flex items-center justify-center gap-2 text-success">
                    <Icon name="check_circle" size={20} />
                    <span className="text-sm">{testMessage}</span>
                  </div>
                )}
                {testStatus === "error" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-warning">
                      <Icon name="warning" size={20} />
                      <span className="text-sm">{testMessage}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleTestProvider}>
                      {t("retry")}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Done */}
            {currentStep.id === "done" && (
              <div className="text-center space-y-4">
                <p className="text-text-muted">{t("doneDesc")}</p>
                <CodePreview
                  variant="surface"
                  filename={t("yourEndpoint")}
                  language=""
                  code={apiEndpoint}
                  copyLabel={tc("copy")}
                  copiedLabel={tc("copied")}
                  className="text-left"
                />
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <div>
              {step > 0 && !isLastStep && (
                <Button variant="ghost" onClick={handleBack}>
                  {tc("back")}
                </Button>
              )}
            </div>
            <div className="flex items-center gap-3">
              {!isLastStep && step > 0 && (
                <Button variant="ghost" onClick={handleNext}>
                  {t("skip")}
                </Button>
              )}
              {currentStep.id === "welcome" && (
                <Button variant="primary" onClick={handleNext}>
                  {t("getStarted")}
                </Button>
              )}
              {currentStep.id === "tiers" && (
                <Button variant="primary" onClick={handleNext}>
                  {t("continue")}
                </Button>
              )}
              {currentStep.id === "security" && (
                <Button
                  variant="primary"
                  onClick={handleSetPassword}
                  disabled={!skipSecurity && (!password || password !== confirmPassword)}
                >
                  {skipSecurity ? t("skipAndContinue") : t("setPassword")}
                </Button>
              )}
              {currentStep.id === "provider" && !skipSecurity ? (
                <Button
                  variant="primary"
                  onClick={handleAddProvider}
                  disabled={!selectedProvider || !providerKey}
                >
                  {t("addProvider")}
                </Button>
              ) : null}
              {currentStep.id === "test" && (
                <Button variant="primary" onClick={handleNext}>
                  {testStatus === "success" ? t("continue") : t("skip")}
                </Button>
              )}
              {isLastStep && (
                <Button variant="primary" onClick={handleFinish}>
                  {t("goToDashboard")}
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Skip Wizard */}
        {!isLastStep && (
          <div className="text-center mt-4">
            <Button variant="ghost" size="sm" className="text-text-muted" onClick={handleFinish}>
              {t("skipWizard")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
