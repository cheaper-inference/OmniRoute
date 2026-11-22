"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import type { ManagedCliRuntimeItem } from "@/lib/cliTools/managedCliRuntimes";
import { useCliRuntimeUpdates, type RuntimeRequestFailure } from "./useCliRuntimeUpdates";

type RuntimeState = ReturnType<typeof useCliRuntimeUpdates>;

type Translate = (key: string, values?: Record<string, string | number>) => string;

const REASON_KEYS: Record<string, string> = {
  explicit_override: "reasons.explicitOverride",
  not_installed: "reasons.notInstalled",
  not_runnable: "reasons.notRunnable",
  version_unknown: "reasons.versionUnknown",
  update_unsupported: "reasons.updateUnsupported",
  check_failed: "reasons.checkFailed",
  unchecked: "reasons.unchecked",
};

function failureText(failure: RuntimeRequestFailure, t: Translate): string {
  if (failure.status === 401) return t("errors.signIn");
  if (failure.status === 403) return t("errors.localOnly");
  if (failure.code === "invalid_response") return t("errors.invalidResponse");
  if (failure.code === "update_in_progress") return t("errors.updateInProgress");
  return (
    failure.message ||
    (failure.status ? t("errors.requestFailed", { status: failure.status }) : t("errors.network"))
  );
}

function statusOf(item: ManagedCliRuntimeItem): {
  key: string;
  tone: "default" | "success" | "warning" | "error" | "info";
} {
  if (item.error) return { key: "checkFailed", tone: "error" };
  if (!item.installed) return { key: "notInstalled", tone: "default" };
  if (!item.runnable) return { key: "notRunnable", tone: "warning" };
  if (item.source === "override") return { key: "override", tone: "warning" };
  if (item.reason === "update_unsupported") return { key: "manual", tone: "warning" };
  if (!item.installedVersion || !item.latestVersion) return { key: "unknown", tone: "default" };
  if (item.updateAvailable) return { key: "available", tone: "info" };
  if (item.reason === "up_to_date") return { key: "current", tone: "success" };
  return { key: "unknown", tone: "default" };
}

function CheckedTime({ value, t }: { value: string | null; t: Translate }) {
  const locale = useLocale();
  if (!value || !Number.isFinite(new Date(value).getTime())) return <>{t("neverChecked")}</>;
  return (
    <time dateTime={value} dir="ltr" className="tabular-nums">
      {new Date(value).toLocaleString(locale, { hour12: false })}
    </time>
  );
}

function isReady(item: ManagedCliRuntimeItem) {
  return (
    item.installed &&
    item.runnable &&
    item.canUpdate &&
    item.updateAvailable &&
    Boolean(item.installedVersion && item.latestVersion) &&
    !item.error
  );
}

function RuntimeCard({
  item,
  busy,
  updating,
  error,
  onUpdate,
  t,
}: {
  item: ManagedCliRuntimeItem;
  busy: boolean;
  updating: boolean;
  error?: RuntimeRequestFailure;
  onUpdate: () => void;
  t: Translate;
}) {
  const status = statusOf(item);
  const reasonKey = item.reason ? REASON_KEYS[item.reason] : null;
  const ready = isReady(item);
  const headingId = `cli-runtime-${item.id}`;
  return (
    <Card role="region" aria-labelledby={headingId} padding="sm" className="min-w-0">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id={headingId} className="ci-heading text-lg">
            {item.name}
          </h2>
          <p className="mt-1 break-all text-xs text-text-muted" dir="ltr">
            {item.packageName}
          </p>
        </div>
        <Badge variant={updating ? "info" : status.tone}>
          {t(`status.${updating ? "updating" : status.key}`)}
        </Badge>
      </div>
      <RuntimeDetails item={item} t={t} />
      {reasonKey && <p className="mt-4 text-sm text-text-muted">{t(reasonKey)}</p>}
      {item.id === "openclaw" && item.reason === "update_unsupported" && (
        <a
          href="https://docs.openclaw.ai/install/updating"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm text-primary hover:underline"
        >
          {t("manualUpdateGuide")}
        </a>
      )}
      {item.error && <p className="mt-3 break-words text-sm text-error">{item.error}</p>}
      {error && (
        <p role="alert" className="mt-3 break-words text-sm text-error">
          {failureText(error, t)}
        </p>
      )}
      <div className="mt-5 flex justify-end">
        <Button
          size="sm"
          variant="secondary"
          icon="system_update_alt"
          loading={updating}
          disabled={busy || !ready}
          onClick={onUpdate}
          aria-label={t("updateTool", { name: item.name })}
          aria-describedby="cli-runtime-update-scope"
        >
          {t(updating ? "updating" : "update")}
        </Button>
      </div>
    </Card>
  );
}

function RuntimeDetails({ item, t }: { item: ManagedCliRuntimeItem; t: Translate }) {
  return (
    <>
      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
        <div className="min-w-0">
          <dt className="text-xs text-text-muted">{t("installedVersion")}</dt>
          <dd className="mt-1 break-all tabular-nums" dir="ltr">
            {item.installedVersion || t(item.installed ? "unknownVersion" : "notInstalled")}
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-xs text-text-muted">{t("latestVersion")}</dt>
          <dd className="mt-1 break-all tabular-nums" dir="ltr">
            {item.latestVersion || t("unknownVersion")}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-text-muted">{t("sourceLabel")}</dt>
          <dd className="mt-1">{t(`sources.${item.source}`)}</dd>
        </div>
        <div>
          <dt className="text-xs text-text-muted">{t("lastChecked")}</dt>
          <dd className="mt-1">
            <CheckedTime value={item.checkedAt} t={t} />
          </dd>
        </div>
        {item.commandPath && (
          <div className="col-span-2 min-w-0">
            <dt className="text-xs text-text-muted">{t("executable")}</dt>
            <dd className="mt-1 break-all text-xs" dir="ltr">
              {item.commandPath}
            </dd>
          </div>
        )}
      </dl>
    </>
  );
}

function RuntimeSummary({ summary, t }: { summary: RuntimeState["summary"]; t: Translate }) {
  return (
    <>
      {summary && (
        <div className="space-y-2">
          <p>
            {summary.kind === "check"
              ? t("checkSummary", { available: summary.available, failed: summary.checkFailed })
              : t("updateSummary", {
                  updated: summary.updated,
                  failed: summary.failed,
                  checkFailed: summary.checkFailed,
                })}
          </p>
          {summary.kind === "update" && summary.updated === 0 && summary.failed === 0 && (
            <p className="text-text-muted">{t("noEligibleUpdates")}</p>
          )}
          {summary.updated > 0 && <p>{t("restartSessions")}</p>}
          {summary.modelsRefreshed > 0 && (
            <p>{t("modelsRefreshed", { count: summary.modelsRefreshed })}</p>
          )}
          {summary.modelRefreshFailed > 0 && (
            <p className="text-warning">
              {t("modelRefreshFailed")}{" "}
              <Link href="/dashboard/providers" className="underline">
                {t("openProviders")}
              </Link>
            </p>
          )}
        </div>
      )}
    </>
  );
}

function ProviderVersions({
  identities,
  identityFailed,
  t,
}: Pick<RuntimeState, "identities" | "identityFailed"> & { t: Translate }) {
  return (
    <>
      <Card padding="sm">
        <h2 className="ci-heading text-lg">{t("providerClientTitle")}</h2>
        <p className="mt-2 text-sm text-text-muted">{t("providerClientDescription")}</p>
        {identityFailed ? (
          <p className="mt-3 text-sm text-warning">{t("providerClientUnavailable")}</p>
        ) : identities === null ? (
          <p className="mt-3 text-sm text-text-muted">{t("loading")}</p>
        ) : (
          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {identities.map((identity) => (
              <div key={identity.key} className="min-w-0">
                <dt className="text-sm">{identity.key === "codex" ? "Codex" : "Claude Code"}</dt>
                <dd className="mt-1 text-sm">
                  <bdi dir="ltr" className="tabular-nums">
                    {identity.effective}
                  </bdi>
                  <span className="ms-2 text-text-muted">
                    {t(
                      `clientSources.${
                        ["settings", "env", "discovered", "default"].includes(identity.source)
                          ? identity.source
                          : "unknown"
                      }`
                    )}
                  </span>
                </dd>
                <dd className="mt-2 text-sm">
                  <Link
                    href={`/dashboard/providers/${identity.key}`}
                    className="text-primary hover:underline"
                  >
                    {t("providerSettings", {
                      name: identity.key === "codex" ? "Codex" : "Claude Code",
                    })}
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Card>
    </>
  );
}

function RuntimeProgress({
  operation,
  items,
  summary,
  t,
}: Pick<RuntimeState, "operation" | "items" | "summary"> & { t: Translate }) {
  const loading = operation?.kind === "load";
  return (
    <>
      <div role="status" aria-live="polite" aria-atomic="true" className="text-sm">
        {loading && <p>{t("loading")}</p>}
        {operation?.kind === "check" && <p>{t("checking")}</p>}
        {operation?.toolId && (
          <p>
            {t("updatingTool", {
              name: items.find((item) => item.id === operation.toolId)?.name || operation.toolId,
            })}
          </p>
        )}
        {operation?.kind === "batch" && !operation.toolId && <p>{t("checking")}</p>}
        <RuntimeSummary summary={summary} t={t} />
      </div>
    </>
  );
}

function RuntimeActions({
  operation,
  items,
  run,
  t,
}: Pick<RuntimeState, "operation" | "items" | "run"> & { t: Translate }) {
  const busy = operation !== null;
  const hasInstalled = items.some((item) => item.installed);
  return (
    <>
      <Card padding="sm" surface="subtle">
        <p id="cli-runtime-update-scope" className="text-sm text-text-main">
          {t("updateScope")}
        </p>
        <p className="mt-2 text-sm text-text-muted">{t("localAccess")}</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            variant="secondary"
            icon="refresh"
            disabled={busy}
            loading={operation?.kind === "check"}
            onClick={() => void run("check")}
          >
            {t("checkForUpdates")}
          </Button>
          <Button
            icon="system_update_alt"
            disabled={busy || !hasInstalled}
            loading={operation?.kind === "batch"}
            onClick={() => void run("batch")}
            aria-describedby="cli-runtime-update-scope"
          >
            {t("checkAndUpdate")}
          </Button>
        </div>
      </Card>
    </>
  );
}

export default function CliRuntimeUpdatesPanel() {
  const t = useTranslations("cliCode.runtimeUpdates");
  const { items, operation, error, rowErrors, summary, identities, identityFailed, run } =
    useCliRuntimeUpdates();
  const busy = operation !== null;
  const loading = operation?.kind === "load";
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <PageHeader compact title={t("title")} description={t("description")} />
      <Link href="/dashboard/cli-code" className="w-fit text-sm text-primary hover:underline">
        {t("backToCliCode")}
      </Link>

      <RuntimeActions operation={operation} items={items} run={run} t={t} />

      {error && (
        <Card padding="sm">
          <p role="alert" className="text-sm text-error">
            {failureText(error, t)}
          </p>
          <Button
            className="mt-3"
            size="sm"
            variant="secondary"
            disabled={busy}
            onClick={() => void run("load")}
          >
            {t("retry")}
          </Button>
        </Card>
      )}

      <RuntimeProgress operation={operation} items={items} summary={summary} t={t} />

      {!loading && !error && items.length === 0 && (
        <Card padding="sm">
          <p>{t("empty")}</p>
        </Card>
      )}
      <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-2" aria-busy={busy}>
        {items.map((item) => (
          <RuntimeCard
            key={item.id}
            item={item}
            busy={busy}
            updating={operation?.toolId === item.id}
            error={rowErrors[item.id]}
            onUpdate={() => void run("update", item)}
            t={t}
          />
        ))}
      </div>

      <ProviderVersions identities={identities} identityFailed={identityFailed} t={t} />
    </div>
  );
}
