"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@omniroute/ui-kit/button";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { Tabs, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/shared/components/Icon";
import { Card } from "@/shared/components";
import Button from "@/shared/components/Button";
import { shouldAutoSyncOnOpen } from "@/lib/radar/autoSync";
import { RadarAccessExplainer } from "./RadarAccessExplainer";
import { RadarCatalogTable, type RadarMergedEntry } from "./RadarCatalogTable";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RadarMeta {
  version: string;
  fetchedAt: string;
}

interface RadarStatusResponse {
  feeds?: { intel?: { available?: boolean } };
}

type PageState = "flag_off" | "optin_pending" | "empty" | "populated";

/** D28 — referral links / free credits. Client-side mirror of RadarReferral. */
interface RadarReferralItem {
  provider: string;
  url: string;
  kind: "fixo" | "campanha";
  validUntil: string | null;
  requiredAction: string | null;
  isDefault: boolean;
}

interface RadarReferralsState {
  fixed: RadarReferralItem[];
  campaigns: RadarReferralItem[];
}

type RadarTabId = "catalog" | "referrals";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Determine the page state from the fetch result. */
export function resolveRadarPageState(
  flagOn: boolean,
  optedIn: boolean,
  hasEntries: boolean
): PageState {
  if (!flagOn) return "flag_off";
  if (!optedIn) return "optin_pending";
  if (!hasEntries) return "empty";
  return "populated";
}

/** Relative time string (e.g., "3h ago", "2d ago"). */
function relativeTime(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diffMs = now - then;
  if (diffMs < 0) return "just now";
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

async function fetchIntelAvailability(): Promise<boolean> {
  const response = await fetch("/api/radar/status", { cache: "no-store" });
  if (response.status !== 200) return false;
  const status = (await response.json()) as RadarStatusResponse;
  return status.feeds?.intel?.available === true;
}

export default function RadarPage() {
  const t = useTranslations("radarPage");
  const [entries, setEntries] = useState<RadarMergedEntry[]>([]);
  const [meta, setMeta] = useState<RadarMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [featureAvailable, setFeatureAvailable] = useState<boolean | null>(null);
  const [optIn, setOptIn] = useState<boolean | null>(null);
  const [intelAvailable, setIntelAvailable] = useState(false);
  const [activating, setActivating] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<RadarTabId>("catalog");
  const [referrals, setReferrals] = useState<RadarReferralsState>({
    fixed: [],
    campaigns: [],
  });

  const fetchCatalog = useCallback(
    async (showLoading = true) => {
      if (showLoading) setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/radar/catalog", { cache: "no-store" });
        if (res.status === 404) {
          // Flag off — treat as not found
          setFeatureAvailable(false);
          setEntries([]);
          setMeta(null);
          if (showLoading) setLoading(false);
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setFeatureAvailable(true);
        const data = await res.json();
        setEntries(data.entries || []);
        setMeta(data.meta || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : t("errorLoading"));
      } finally {
        if (showLoading) setLoading(false);
      }
    },
    [t]
  );
  const refreshCatalogSilently = useCallback(() => fetchCatalog(false), [fetchCatalog]);

  // D28 — fetch the referral links section ("Pegue seus créditos grátis").
  // Best-effort: flag off => 404, no cache => empty shape; either way this
  // never blocks rendering of the rest of the page.
  const fetchReferrals = useCallback(async () => {
    try {
      const res = await fetch("/api/radar/referrals");
      if (!res.ok) return;
      const data = await res.json();
      setReferrals({
        fixed: Array.isArray(data.fixed) ? data.fixed : [],
        campaigns: Array.isArray(data.campaigns) ? data.campaigns : [],
      });
    } catch {
      // Best-effort only.
    }
  }, []);

  const fetchSettings = useCallback(() => {
    void Promise.all([
      fetch("/api/radar/settings", { cache: "no-store" }),
      fetchIntelAvailability().catch(() => false),
    ])
      .then(async ([settingsRes, available]) => {
        setIntelAvailable(available);
        if (settingsRes.status === 404) {
          setFeatureAvailable(false);
          setOptIn(null);
          return;
        }
        if (!settingsRes.ok) throw new Error(`HTTP ${settingsRes.status}`);
        const settingsData = await settingsRes.json();
        setFeatureAvailable(true);
        setOptIn(settingsData.optIn === true);
        if (settingsData.optIn === true) {
          await fetchCatalog();
          void fetchReferrals();
        }
      })
      .catch(() => setOptIn(null))
      .finally(() => setLoading(false));
  }, [fetchCatalog, fetchReferrals]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Sync (defined before handleActivate which depends on it)
  const handleSync = useCallback(async () => {
    setSyncing(true);
    setError("");
    try {
      const res = await fetch("/api/radar/sync", { method: "POST" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.status === "updated" || data.status === "stale") {
        await fetchCatalog();
        void fetchReferrals();
      } else if (data.status === "error" || data.status === "too_large") {
        // "too_large" reuses the generic sync-failed copy — the feed exceeded the
        // client-side size cap (10MB), which is operationally the same as any
        // other sync failure from the operator's point of view.
        setError(data.reason || t("syncFailed"));
      } else if (data.status === "disabled") {
        setError(t("flagDisabled"));
      } else if (data.status === "opt_out") {
        setOptIn(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("syncFailed"));
    } finally {
      setSyncing(false);
    }
  }, [t, fetchCatalog, fetchReferrals]);

  // Auto-sync on open: when the operator is already opted in and the cached
  // feed is stale (or absent), refresh it automatically once per mount so the
  // page always shows current data without requiring the manual Sync button
  // (spec: dados atualizados a cada abrir da página). The ref guards against
  // re-firing when `meta` updates after the sync itself.
  const autoSyncFiredRef = useRef(false);
  useEffect(() => {
    if (loading || syncing || optIn !== true || autoSyncFiredRef.current) return;
    if (!shouldAutoSyncOnOpen(meta?.fetchedAt ?? null, Date.now())) return;
    autoSyncFiredRef.current = true;
    void (async () => {
      await handleSync();
    })();
  }, [loading, syncing, optIn, meta, handleSync]);

  // Activate opt-in
  const handleActivate = useCallback(async () => {
    setActivating(true);
    try {
      const res = await fetch("/api/radar/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optIn: true }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setOptIn(true);
      // After activation, trigger a sync
      await handleSync();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("activationFailed"));
    } finally {
      setActivating(false);
    }
  }, [t, handleSync]);

  // Feature availability and privacy opt-in are independent states. A successful
  // settings response with `optIn: false` means "show activation", not "flag off".
  const pageState = resolveRadarPageState(
    featureAvailable !== false,
    optIn === true,
    meta !== null
  );

  // Flag off — render not-found
  if (featureAvailable === false && !loading) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        compact
        title={t("title")}
        description={t("subtitle")}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {intelAvailable && (pageState === "empty" || pageState === "populated") && (
              <Link
                href="/dashboard/radar/intel"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                {t("intel")}
              </Link>
            )}
            {(pageState === "empty" || pageState === "populated") && (
              <Link
                href="/dashboard/radar/offers"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                {t("offers")}
              </Link>
            )}
            {(pageState === "empty" || pageState === "populated") && (
              <Link
                href="/dashboard/radar/combos"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                {t("guidedCombos")}
              </Link>
            )}
            {pageState === "populated" && (
              <Button variant="outline" size="sm" onClick={handleSync} disabled={syncing}>
                {syncing ? t("syncing") : t("syncNow")}
              </Button>
            )}
          </div>
        }
      />

      {/* Feed freshness header */}
      {meta && (
        <div className="flex items-center gap-4 text-sm text-text-muted">
          <span>
            {t("feedVersion")}: <span className="font-mono">{meta.version}</span>
          </span>
          <span>
            {t("feedFetched")}: {relativeTime(meta.fetchedAt)}
          </span>
        </div>
      )}

      {error && <div className="p-3 rounded-lg bg-error/10 text-error text-sm">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-text-muted">{t("loading")}</div>
        </div>
      ) : (
        <>
          {/* Opt-in pending */}
          {pageState === "optin_pending" && (
            <Card>
              <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 py-8 text-center">
                <Icon name="radar" size={36} className="text-primary" />
                <h2 className="ci-heading" data-size="xl">
                  {t("activateTitle")}
                </h2>
                <p className="max-w-2xl text-text-muted">{t("activateDescription")}</p>

                <RadarAccessExplainer />

                <Button size="lg" onClick={handleActivate} disabled={activating}>
                  {activating ? t("activating") : t("activateButton")}
                </Button>
              </div>
            </Card>
          )}

          {/* D28 — tab bar. Only shown once opted in (empty/populated) — the
              activation gate above is a single full-screen step, not a tab. */}
          {(pageState === "empty" || pageState === "populated") && (
            <Tabs
              variant="underline"
              value={activeTab}
              onValueChange={(next) => setActiveTab(next as typeof activeTab)}
            >
              <TabsList aria-label={t("catalogTab")}>
                {/* The panels below are rendered by the page itself (no TabsContent). */}
                <TabsTrigger value="catalog" aria-controls={undefined}>
                  {t("catalogTab")}
                </TabsTrigger>
                <TabsTrigger value="referrals" aria-controls={undefined}>
                  {t("freeCreditsTab")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}

          {/* Free credits tab (D28 — referral links) */}
          {(pageState === "empty" || pageState === "populated") && activeTab === "referrals" && (
            <div className="flex flex-col gap-6">
              <p className="text-sm text-text-muted">{t("freeCreditsSubtitle")}</p>

              {referrals.fixed.length === 0 ? (
                <Card>
                  <p className="text-text-muted text-center py-6">{t("fixedLinksEmpty")}</p>
                </Card>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {referrals.fixed.map((referral) => (
                    <Card key={`${referral.provider}:fixed`} padding="sm">
                      <div className="flex flex-col gap-2">
                        <span className="font-medium">{referral.provider}</span>
                        {referral.requiredAction && (
                          <p className="text-xs text-text-muted">
                            {t("requiredActionLabel")} {referral.requiredAction}
                          </p>
                        )}
                        <a
                          href={referral.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline w-fit"
                        >
                          {t("claimButton")}
                          <Icon name="open_in_new" size={14} />
                        </a>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              <div>
                <h3 className="ci-heading mb-3" data-size="lg">
                  {t("campaignsTitle")}
                </h3>
                {referrals.campaigns.length === 0 ? (
                  <Card>
                    <p className="text-text-muted text-center py-6">{t("campaignsEmpty")}</p>
                  </Card>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {referrals.campaigns.map((referral, idx) => (
                      <Card key={`${referral.provider}:campaign:${idx}`} padding="sm">
                        <div className="flex flex-col gap-2">
                          <span className="font-medium">{referral.provider}</span>
                          {referral.requiredAction && (
                            <p className="text-xs text-text-muted">
                              {t("requiredActionLabel")} {referral.requiredAction}
                            </p>
                          )}
                          {referral.validUntil && (
                            <p className="text-xs text-warning">
                              {t("campaignsValidUntil", {
                                date: new Date(referral.validUntil).toLocaleDateString(),
                              })}
                            </p>
                          )}
                          <a
                            href={referral.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline w-fit"
                          >
                            {t("claimButton")}
                            <Icon name="open_in_new" size={14} />
                          </a>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Empty cache — opted in but no data yet */}
          {pageState === "empty" && activeTab === "catalog" && (
            <Card>
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <p className="text-text-muted">{t("emptyState")}</p>
                <Button size="lg" onClick={handleSync} disabled={syncing}>
                  {syncing ? t("syncing") : t("syncCta")}
                </Button>
              </div>
            </Card>
          )}

          {/* Populated catalog table */}
          {pageState === "populated" && activeTab === "catalog" && (
            <RadarCatalogTable
              entries={entries}
              refreshCatalog={refreshCatalogSilently}
              onError={setError}
            />
          )}
        </>
      )}
    </div>
  );
}
