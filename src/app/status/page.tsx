"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AlertActions, AlertDescription, AlertTitle } from "@omniroute/ui-kit/alert";
import { Badge as KitBadge } from "@omniroute/ui-kit/badge";
import { buttonVariants } from "@omniroute/ui-kit/button";
import { StatusMatrix } from "@omniroute/ui-kit/metric-charts";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import { Spinner } from "@/shared/components/Loading";
import { OmniRouteLockup } from "@/shared/components/OmniRouteLogo";

interface HealthPayload {
  status?: string;
  timestamp?: string;
  system?: {
    version?: string;
    uptime?: number;
    nodeVersion?: string;
    platform?: string;
    pid?: number;
  };
  providerHealth?: Record<string, { state?: string; failures?: number }>;
  error?: string;
}

function formatUptime(
  seconds: number | undefined,
  format: (key: string, values?: Record<string, number>) => string
) {
  if (!seconds || seconds <= 0) return format("status.uptimeMinutes", { minutes: 0 });
  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  if (hours > 0) return format("status.uptimeHoursMinutes", { hours, minutes });
  return format("status.uptimeMinutes", { minutes });
}

export default function StatusPage() {
  const t = useTranslations("publicSystem");
  const tc = useTranslations("common");
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState<HealthPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadHealth = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/monitoring/health", { cache: "no-store" });
      const data = (await response.json()) as HealthPayload;
      if (!response.ok) {
        setError(data.error || t("status.failedToLoad"));
        setHealth(null);
        return;
      }
      setHealth(data);
    } catch {
      setError(t("status.unableToReachHealth"));
      setHealth(null);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void (async () => {
      await loadHealth();
    })();
  }, [loadHealth]);

  const providerStats = useMemo(() => {
    const providers = Object.entries(health?.providerHealth || {});
    const open = providers.filter(([, p]) => p.state === "OPEN").length;
    const halfOpen = providers.filter(([, p]) => p.state === "HALF_OPEN").length;
    const closed = providers.filter(([, p]) => p.state === "CLOSED").length;
    return { total: providers.length, open, halfOpen, closed };
  }, [health]);

  const providerItems = useMemo(
    () =>
      Object.entries(health?.providerHealth || {}).map(([id, p]) => ({
        id,
        label: id,
        enabled: p.state === "CLOSED",
      })),
    [health]
  );

  const serviceStatus = health?.status || t("status.unknown");

  return (
    <main className="min-h-screen text-text-main p-6 sm:p-10">
      <section className="max-w-4xl mx-auto space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="mb-4">
              <OmniRouteLockup />
            </div>
            <h1 className="ci-heading text-3xl">{t("status.title")}</h1>
            <p className="text-text-muted mt-1">{t("status.description")}</p>
          </div>
          <Button icon="refresh" onClick={() => void loadHealth()}>
            {tc("refresh")}
          </Button>
        </header>

        {loading && (
          <Card padding="md" className="flex items-center gap-3" role="status" aria-live="polite">
            <Spinner size="md" />
            <span className="text-text-muted">{t("status.loadingHealth")}</span>
          </Card>
        )}

        {!loading && error && (
          // Kit alert parts without the dismiss control (the kit Alert always renders one).
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
              <AlertTitle>
                <h2>{t("status.healthCheckFailed")}</h2>
              </AlertTitle>
              <AlertDescription>{error}</AlertDescription>
              <AlertActions>
                <Link
                  href="/offline"
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  {t("status.openConnectivityHelp")}
                </Link>
                <Link
                  href="/maintenance"
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  {t("status.maintenanceInfo")}
                </Link>
              </AlertActions>
            </div>
          </div>
        )}

        {!loading && health && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card padding="sm">
                <p className="text-xs uppercase tracking-wide text-text-muted">
                  {t("status.service")}
                </p>
                <div className="mt-2">
                  {health.status === "healthy" ? (
                    <KitBadge variant="live" shape="pill">
                      {serviceStatus}
                    </KitBadge>
                  ) : (
                    <Badge variant={health.status === "degraded" ? "warning" : "error"} dot>
                      {serviceStatus}
                    </Badge>
                  )}
                </div>
              </Card>
              <Card padding="sm">
                <p className="text-xs uppercase tracking-wide text-text-muted">{tc("version")}</p>
                <p className="mt-2 text-xl font-semibold">
                  {health.system?.version || t("status.notAvailable")}
                </p>
              </Card>
              <Card padding="sm">
                <p className="text-xs uppercase tracking-wide text-text-muted">{tc("uptime")}</p>
                <p className="mt-2 text-xl font-semibold">
                  {formatUptime(health.system?.uptime, t)}
                </p>
              </Card>
              <Card padding="sm">
                <p className="text-xs uppercase tracking-wide text-text-muted">
                  {t("status.providersTracked")}
                </p>
                <p className="mt-2 text-xl font-semibold">{providerStats.total}</p>
              </Card>
            </div>

            <Card padding="md">
              <h2 className="ci-heading text-lg">{t("status.circuitBreakerState")}</h2>
              <p className="text-sm text-text-muted mt-1">
                OPEN: {providerStats.open} · HALF_OPEN: {providerStats.halfOpen} · CLOSED:{" "}
                {providerStats.closed}
              </p>
              {providerItems.length > 0 && (
                <StatusMatrix
                  className="mt-4"
                  label={t("status.circuitBreakerState")}
                  items={providerItems}
                  enabledLabel={t("status.breakerClosed")}
                  disabledLabel={t("status.breakerNotClosed")}
                />
              )}
              <p className="mt-4 text-xs text-text-muted">
                {t("status.lastUpdate", {
                  timestamp: health.timestamp
                    ? new Date(health.timestamp).toLocaleString()
                    : t("status.notAvailable"),
                })}
              </p>
            </Card>
          </>
        )}
      </section>
    </main>
  );
}
