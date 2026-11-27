"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import GuardedAction from "@/shared/components/GuardedAction";
import { Spinner } from "@/shared/components/Loading";
import Input from "@/shared/components/Input";
import Notice from "@/shared/components/Notice";
import { useScrapeFetch } from "../../hooks/useScrapeFetch";
import ScrapeResult from "../ScrapeResult";
import type { ConfigState } from "../SearchToolsConfigPane";
import type { SearchProviderCatalogItem } from "@/shared/schemas/searchTools";
import { WEB_FETCH_URL_MAX_LENGTH } from "@/shared/constants/formLimits";

interface ScrapeTabProps {
  configState: ConfigState;
  /** The /api/search/providers catalog; null/undefined while it is unknown (not loaded). */
  catalogProviders?: SearchProviderCatalogItem[] | null;
  /** Callback to report latency/cost to parent Studio */
  onMetrics?: (latencyMs: number | null, costUsd: number | null) => void;
}

function isValidUrl(value: string): boolean {
  try {
    const u = new URL(value.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * True when the catalog lists a fetch provider with credentials: the same "connected" set the
 * config pane offers on this tab (status `configured` or `rate_limited`, never `missing`).
 */
export function hasConnectedFetchProvider(providers: SearchProviderCatalogItem[]): boolean {
  return providers.some((p) => p.kind === "fetch" && p.status !== "missing");
}

function getFetchProviderBlockReason(
  providers: ScrapeTabProps["catalogProviders"],
  translateReason: () => string
): string | null {
  // Only a loaded catalog can say "none connected"; while it is unknown the route decides.
  return Array.isArray(providers) && !hasConnectedFetchProvider(providers)
    ? translateReason()
    : null;
}

export default function ScrapeTab({ configState, catalogProviders, onMetrics }: ScrapeTabProps) {
  const t = useTranslations("search");
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const { result, loading, error, latencyMs, fetch: doFetch, reset } = useScrapeFetch();
  const fetchProviderBlockReason = getFetchProviderBlockReason(catalogProviders, () =>
    t("scrapeNoFetchProvider")
  );
  const noFetchProvider = fetchProviderBlockReason !== null;

  const handleSubmit = async () => {
    if (noFetchProvider) return;
    setUrlError(null);
    if (!url.trim()) {
      setUrlError(t("scrapeUrlRequired"));
      return;
    }
    if (!isValidUrl(url)) {
      setUrlError(t("scrapeUrlInvalid"));
      return;
    }
    reset();
    await doFetch({
      url: url.trim(),
      format: configState.fetchFormat,
      full_page: configState.fullPage,
      provider:
        configState.provider && configState.provider !== "auto" ? configState.provider : undefined,
    });
  };

  // Report metrics to parent Studio when latencyMs changes after a fetch
  useEffect(() => {
    if (latencyMs != null) {
      onMetrics?.(latencyMs, null);
    }
  }, [latencyMs, onMetrics]);

  return (
    <div className="flex flex-col h-full p-4 space-y-4" data-testid="scrape-tab">
      {/* URL input */}
      <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
        <div className="flex items-end gap-2">
          <Input
            id="scrape-url"
            label={t("scrapeUrl")}
            className="flex-1"
            error={urlError ? <span data-testid="url-error">{urlError}</span> : undefined}
            type="url"
            maxLength={WEB_FETCH_URL_MAX_LENGTH}
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (urlError) setUrlError(null);
            }}
            placeholder="https://example.com/article"
            onKeyDown={(e) => {
              if (e.key === "Enter") void handleSubmit();
            }}
            data-testid="url-input"
          />
          <GuardedAction
            variant="primary"
            onClick={() => void handleSubmit()}
            disabled={loading}
            reason={fetchProviderBlockReason}
            data-testid="scrape-button"
          >
            {loading ? t("scrapeExtracting") : t("scrapeExtract")}
          </GuardedAction>
        </div>

        {noFetchProvider && (
          <p className="text-xs text-text-muted" data-testid="scrape-no-fetch-provider">
            {fetchProviderBlockReason}
            {" · "}
            <Link href="/dashboard/providers" className="text-accent hover:underline">
              {t("configureProvider")}
            </Link>
          </p>
        )}

        {/* Options summary */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-2xs text-text-muted">
          <span>
            Format: <span className="text-text-main font-medium">{configState.fetchFormat}</span>
          </span>
          <span>
            Full page:{" "}
            <span className="text-text-main font-medium">
              {configState.fullPage ? "Yes" : "No"}
            </span>
          </span>
          <span>
            Provider:{" "}
            <span className="text-text-main font-medium">
              {configState.provider === "auto" || !configState.provider
                ? "auto"
                : configState.provider}
            </span>
          </span>
        </div>
      </div>

      {/* Error state */}
      {error && !loading && (
        <Notice variant="critical" data-testid="scrape-error">
          {error}
        </Notice>
      )}

      {/* Loading spinner */}
      {loading && (
        <div className="flex items-center justify-center py-12" data-testid="scrape-loading">
          <Spinner size="lg" />
        </div>
      )}

      {/* Result */}
      {result && !loading && <ScrapeResult result={result} latencyMs={latencyMs} />}

      {/* Empty state — no result yet */}
      {!result && !loading && !error && (
        <div
          className="flex flex-col items-center justify-center flex-1 text-center py-12"
          data-testid="scrape-empty-state"
        >
          <span className="text-3xl mb-3" aria-hidden="true">
            📄
          </span>
          <p className="text-sm text-text-muted mb-1">{t("scrapeEmptyState")}</p>
          <p className="text-xs text-text-muted">
            {t("scrapeProvidersAvailable")}{" "}
            <Link href="/dashboard/providers" className="text-accent hover:underline">
              {t("configureProvider")}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
