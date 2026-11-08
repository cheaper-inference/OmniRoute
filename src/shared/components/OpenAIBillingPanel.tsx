"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { OpenAICosts, OpenAICostPeriod } from "@/lib/usage/openaiCosts";

type Organization = { organizationId: string; costs: OpenAICosts | null; error?: string };

export default function OpenAIBillingPanel() {
  const t = useTranslations("openaiBilling");
  const locale = useLocale();
  const [period, setPeriod] = useState<OpenAICostPeriod>("month");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [revision, setRevision] = useState(0);
  const [organizationId, setOrganizationId] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/usage/openai-costs?period=${period}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((data) => {
        if (!controller.signal.aborted) setOrganizations(data.organizations);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [period, revision]);

  function resetResult() {
    setLoading(true);
    setError(false);
    setOrganizations([]);
  }

  function reload() {
    resetResult();
    setRevision((value) => value + 1);
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setSaveError(false);
    try {
      const response = await fetch("/api/usage/openai-costs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organizationId, apiKey: adminKey }),
      });
      if (!response.ok) throw new Error();
      setAdminKey("");
      setOrganizationId("");
      reload();
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    setSaving(true);
    setSaveError(false);
    try {
      const response = await fetch(
        `/api/usage/openai-costs?organizationId=${encodeURIComponent(id)}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error();
      reload();
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  }

  const money = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 4,
  });
  const date = (seconds: number) =>
    new Date(seconds * 1000).toLocaleString(locale, { timeZone: "UTC" });
  return (
    <section
      className="rounded-xl border border-border bg-surface p-4 space-y-3"
      aria-label={t("title")}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-semibold text-text-main">{t("title")}</h2>
        <a
          className="text-sm text-primary underline"
          href="https://platform.openai.com/settings/organization/billing/overview"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("billingLink")} ↗
        </a>
      </div>
      <p className="text-sm text-text-muted">{t("scope")}</p>
      <p className="text-xs text-text-muted">{t("noDoubleCounting")}</p>
      <label className="flex flex-wrap items-center gap-2 text-sm">
        {t("period")}
        <select
          className="rounded border border-border bg-surface p-2"
          value={period}
          onChange={(event) => {
            const next = event.target.value as OpenAICostPeriod;
            if (next !== period) {
              resetResult();
              setPeriod(next);
            }
          }}
        >
          <option value="month">{t("month")}</option>
          <option value="7d">{t("sevenDays")}</option>
          <option value="30d">{t("thirtyDays")}</option>
        </select>
      </label>
      {loading ? (
        <p role="status">{t("loading")}</p>
      ) : error ? (
        <p role="alert">{t("loadError")}</p>
      ) : organizations.length === 0 ? (
        <p className="text-sm text-text-muted">{t("notConfigured")}</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {organizations.map((org) => (
            <article
              key={org.organizationId}
              className="rounded-lg border border-border p-3 space-y-2"
            >
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
              <button
                type="button"
                disabled={saving}
                onClick={() => void remove(org.organizationId)}
                className="text-sm text-error underline"
              >
                {t("remove")}
              </button>
            </article>
          ))}
        </div>
      )}
      <p className="text-xs text-text-muted">{t("lag")}</p>
      <details>
        <summary className="cursor-pointer text-sm font-medium">{t("configure")}</summary>
        <form onSubmit={save} className="mt-3 flex flex-col gap-3 max-w-xl">
          <p className="text-sm text-text-muted">{t("keyHint")}</p>
          <label className="text-sm">
            {t("organizationId")}
            <input
              required
              pattern="org-[A-Za-z0-9_-]+"
              maxLength={124}
              value={organizationId}
              onChange={(event) => setOrganizationId(event.target.value)}
              placeholder="org-…"
              className="mt-1 w-full rounded border border-border bg-surface p-2"
            />
          </label>
          <label className="text-sm">
            {t("adminKey")}
            <input
              required
              type="password"
              autoComplete="new-password"
              maxLength={1024}
              value={adminKey}
              onChange={(event) => setAdminKey(event.target.value)}
              className="mt-1 w-full rounded border border-border bg-surface p-2"
            />
          </label>
          <a
            href="https://platform.openai.com/settings/organization/admin-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline"
          >
            {t("adminKeysLink")} ↗
          </a>
          <button
            type="submit"
            disabled={saving}
            className="rounded border border-border px-3 py-2 text-sm disabled:opacity-50"
          >
            {saving ? t("saving") : t("save")}
          </button>
        </form>
      </details>
      {saveError && (
        <p role="alert" className="text-sm text-error">
          {t("saveError")}
        </p>
      )}
    </section>
  );
}
