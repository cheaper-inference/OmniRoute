"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import type { OpenAICosts, OpenAICostPeriod } from "@/lib/usage/openaiCosts";

type Organization = { organizationId: string; costs: OpenAICosts | null; error?: string };
type Translate = ReturnType<typeof useTranslations>;

const COSTS_ENDPOINT = "/api/usage/openai-costs";
const BILLING_URL = "https://platform.openai.com/settings/organization/billing/overview";
const ADMIN_KEYS_URL = "https://platform.openai.com/settings/organization/admin-keys";

type CostsResultState = { key: string; organizations: Organization[]; error: boolean };

/**
 * Loads the reported costs; an unexpected payload is a load error, never an empty list.
 * A result belongs to one period/revision key, so a new request shows as loading at once.
 */
function useOpenAICosts(period: OpenAICostPeriod, revision: number) {
  const requestKey = `${period}:${revision}`;
  const [result, setResult] = useState<CostsResultState | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const settle = (organizations: Organization[], error: boolean) => {
      if (!controller.signal.aborted) setResult({ key: requestKey, organizations, error });
    };
    fetch(`${COSTS_ENDPOINT}?period=${period}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("billing_request_failed");
        const data = await response.json();
        if (!Array.isArray(data?.organizations)) throw new Error("billing_invalid_response");
        settle(data.organizations as Organization[], false);
      })
      .catch(() => settle([], true));
    return () => controller.abort();
  }, [period, requestKey]);

  const current = result?.key === requestKey ? result : null;
  return {
    organizations: current?.organizations ?? [],
    loading: current === null,
    error: current?.error ?? false,
  };
}

/** Runs one billing mutation; resolves true when the server accepted it. */
async function sendBillingRequest(url: string, init: RequestInit): Promise<boolean> {
  try {
    const response = await fetch(url, init);
    return response.ok;
  } catch {
    return false;
  }
}

function OrganizationCard({
  org,
  saving,
  onRemove,
  t,
}: {
  org: Organization;
  saving: boolean;
  onRemove: (id: string) => void;
  t: Translate;
}) {
  const locale = useLocale();
  const money = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 4,
  });
  const date = (seconds: number) =>
    new Date(seconds * 1000).toLocaleString(locale, { timeZone: "UTC" });
  return (
    <article className="rounded-lg border border-border p-3 space-y-2">
      <h3 className="break-all font-medium">{org.organizationId}</h3>
      {org.costs ? (
        <>
          <p className="text-xl font-semibold">{money.format(org.costs.totalUsd)}</p>
          <p className="text-xs text-text-muted">
            {date(org.costs.startTime)} – {date(org.costs.endTime)} UTC
          </p>
          <p className="text-xs text-text-muted">
            {t("updated", { time: new Date(org.costs.fetchedAt).toLocaleString(locale) })}
          </p>
        </>
      ) : (
        <p role="alert" className="text-sm text-error">
          {t("unavailable")}
        </p>
      )}
      <Button
        variant="ghost"
        size="sm"
        disabled={saving}
        onClick={() => onRemove(org.organizationId)}
        className="text-error"
      >
        {t("remove")}
      </Button>
    </article>
  );
}

function CostsResult({
  costs,
  saving,
  onRemove,
  t,
}: {
  costs: ReturnType<typeof useOpenAICosts>;
  saving: boolean;
  onRemove: (id: string) => void;
  t: Translate;
}) {
  if (costs.loading) return <p role="status">{t("loading")}</p>;
  if (costs.error) return <p role="alert">{t("loadError")}</p>;
  if (costs.organizations.length === 0)
    return <p className="text-sm text-text-muted">{t("notConfigured")}</p>;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {costs.organizations.map((org) => (
        <OrganizationCard
          key={org.organizationId}
          org={org}
          saving={saving}
          onRemove={onRemove}
          t={t}
        />
      ))}
    </div>
  );
}

function CredentialsForm({
  saving,
  onSave,
  t,
}: {
  saving: boolean;
  onSave: (organizationId: string, apiKey: string) => Promise<boolean>;
  t: Translate;
}) {
  const [organizationId, setOrganizationId] = useState("");
  const [adminKey, setAdminKey] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (await onSave(organizationId, adminKey)) {
      setAdminKey("");
      setOrganizationId("");
    }
  }

  return (
    <details>
      <summary className="cursor-pointer text-sm font-medium">{t("configure")}</summary>
      <form onSubmit={submit} className="mt-3 flex flex-col gap-3 max-w-xl">
        <p className="text-sm text-text-muted">{t("keyHint")}</p>
        <Input
          label={t("organizationId")}
          required
          pattern="org-[A-Za-z0-9_-]+"
          maxLength={124}
          value={organizationId}
          onChange={(event) => setOrganizationId(event.target.value)}
          placeholder="org-…"
        />
        <Input
          label={t("adminKey")}
          required
          type="password"
          autoComplete="new-password"
          maxLength={1024}
          value={adminKey}
          onChange={(event) => setAdminKey(event.target.value)}
        />
        <a
          href={ADMIN_KEYS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary underline"
        >
          {t("adminKeysLink")} ↗
        </a>
        <Button type="submit" variant="secondary" disabled={saving}>
          {saving ? t("saving") : t("save")}
        </Button>
      </form>
    </details>
  );
}

export default function OpenAIBillingPanel() {
  const t = useTranslations("openaiBilling");
  const [period, setPeriod] = useState<OpenAICostPeriod>("month");
  const [revision, setRevision] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const costs = useOpenAICosts(period, revision);

  async function mutate(url: string, init: RequestInit): Promise<boolean> {
    setSaving(true);
    setSaveError(false);
    const ok = await sendBillingRequest(url, init);
    setSaving(false);
    if (ok) setRevision((value) => value + 1);
    else setSaveError(true);
    return ok;
  }

  const save = (organizationId: string, apiKey: string) =>
    mutate(COSTS_ENDPOINT, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ organizationId, apiKey }),
    });
  const remove = (id: string) =>
    void mutate(`${COSTS_ENDPOINT}?organizationId=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });

  return (
    <section
      className="rounded-xl border border-border bg-surface p-4 space-y-3"
      aria-label={t("title")}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-semibold text-text-main">{t("title")}</h2>
        <a
          className="text-sm text-primary underline"
          href={BILLING_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("billingLink")} ↗
        </a>
      </div>
      <p className="text-sm text-text-muted">{t("scope")}</p>
      <p className="text-xs text-text-muted">{t("noDoubleCounting")}</p>
      <Select
        label={t("period")}
        compact
        value={period}
        onChange={(event) => setPeriod(event.target.value as OpenAICostPeriod)}
      >
        <option value="month">{t("month")}</option>
        <option value="7d">{t("sevenDays")}</option>
        <option value="30d">{t("thirtyDays")}</option>
      </Select>
      <CostsResult costs={costs} saving={saving} onRemove={remove} t={t} />
      <p className="text-xs text-text-muted">{t("lag")}</p>
      <CredentialsForm saving={saving} onSave={save} t={t} />
      {saveError && (
        <p role="alert" className="text-sm text-error">
          {t("saveError")}
        </p>
      )}
    </section>
  );
}
