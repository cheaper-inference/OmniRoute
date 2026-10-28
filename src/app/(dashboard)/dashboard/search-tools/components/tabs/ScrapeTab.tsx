"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import { useScrapeFetch } from "../../hooks/useScrapeFetch";
import ScrapeResult from "../ScrapeResult";
import type { ConfigState } from "../SearchToolsConfigPane";

interface ScrapeTabProps {
  configState: ConfigState;
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

export default function ScrapeTab({ configState, onMetrics }: ScrapeTabProps) {
  const t = useTranslations("search");
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const { result, loading, error, latencyMs, fetch: doFetch, reset } = useScrapeFetch();

  const handleSubmit = async () => {
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
          <Button
            variant="primary"
            onClick={() => void handleSubmit()}
            disabled={loading}
            data-testid="scrape-button"
          >
            {loading ? t("scrapeExtracting") : t("scrapeExtract")}
          </Button>
        </div>

        {/* Options summary */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-text-muted">
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
        <div
          className="p-4 bg-error/10 border border-error/30 rounded-lg text-sm text-error"
          data-testid="scrape-error"
        >
          {error}
        </div>
      )}

      {/* Loading spinner */}
      {loading && (
        <div className="flex items-center justify-center py-12" data-testid="scrape-loading">
          <Icon name="progress_activity" size={32} className="text-primary animate-spin" />
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
