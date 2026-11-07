"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Checkbox } from "@omniroute/ui-kit/checkbox";
import Button from "@/shared/components/Button";

interface FreeProviderOption {
  id: string;
  name: string;
  website: string;
  caution: string;
  defaultModel?: string;
}

interface SetupResult {
  providerId: string;
  status: "created" | "skipped" | "failed";
  reason?: string;
}

async function readJson(response: Response): Promise<Record<string, unknown>> {
  return (await response.json().catch(() => ({}))) as Record<string, unknown>;
}

export function FreeProviderOnboardingCard() {
  const t = useTranslations("onboarding.freeProviders");
  const [providers, setProviders] = useState<FreeProviderOption[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<SetupResult[]>([]);

  useEffect(() => {
    let active = true;
    void fetch("/api/providers/free-onboarding")
      .then(async (response) => {
        const data = await readJson(response);
        if (!response.ok) throw new Error("load-failed");
        const options = Array.isArray(data.providers)
          ? (data.providers as FreeProviderOption[])
          : [];
        if (!active) return;
        setProviders(options);
        setSelectedIds(options.map((provider) => provider.id).sort());
      })
      .catch(() => {
        if (active) setError(t("loadFailed"));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [t]);

  const failedIds = useMemo(
    () => results.filter((result) => result.status === "failed").map((result) => result.providerId),
    [results]
  );

  const toggleProvider = (providerId: string) => {
    setSelectedIds((current) =>
      current.includes(providerId)
        ? current.filter((id) => id !== providerId)
        : [...current, providerId].sort()
    );
    setConfirmed(false);
  };

  const submit = async (providerIds = selectedIds) => {
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/providers/free-onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ providerIds, confirmed: true }),
      });
      const data = await readJson(response);
      if (!response.ok) throw new Error("setup-failed");
      setResults(Array.isArray(data.results) ? (data.results as SetupResult[]) : []);
    } catch {
      setError(t("setupFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-xs text-text-muted">{t("loading")}</p>;
  if (providers.length === 0 && !error) {
    return <p className="text-xs text-text-muted">{t("alreadyConfigured")}</p>;
  }

  return (
    <section className="space-y-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
      <div>
        <h3 className="text-sm font-semibold text-text-main">{t("title")}</h3>
        <p className="mt-1 text-xs leading-relaxed text-text-muted">{t("description")}</p>
      </div>

      <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
        {providers.map((provider) => (
          <Checkbox
            key={provider.id}
            card
            checked={selectedIds.includes(provider.id)}
            onChange={() => toggleProvider(provider.id)}
            label={<span className="text-xs font-medium text-text-main">{provider.name}</span>}
            description={
              <>
                <span className="block text-[11px] leading-relaxed text-warning">
                  {provider.caution}
                </span>
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-[11px] text-primary hover:underline"
                  onClick={(event) => event.stopPropagation()}
                >
                  {t("reviewProviderSite")}
                </a>
              </>
            }
          />
        ))}
      </div>

      <Checkbox
        data-testid="free-provider-confirmation"
        checked={confirmed}
        onChange={(event) => setConfirmed(event.target.checked)}
        label={<span className="text-xs text-text-muted">{t("confirmation")}</span>}
      />

      {error && <p className="text-xs text-error">{error}</p>}
      {results.length > 0 && (
        <ul className="space-y-1 text-xs text-text-muted">
          {results.map((result) => (
            <li key={result.providerId}>
              {result.providerId}: {t(`result.${result.status}`)}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2">
        <Button
          data-testid="setup-free-providers"
          variant="primary"
          size="sm"
          disabled={!confirmed || selectedIds.length === 0 || submitting}
          onClick={() => void submit()}
        >
          {submitting ? t("settingUp") : t("setupSelected")}
        </Button>
        {failedIds.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            disabled={submitting}
            onClick={() => void submit(failedIds)}
          >
            {t("retryFailed")}
          </Button>
        )}
      </div>
    </section>
  );
}
