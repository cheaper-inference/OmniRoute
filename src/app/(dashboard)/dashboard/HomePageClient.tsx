"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect, useMemo, useCallback, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SectionHeader } from "@omniroute/ui-kit/page-header";
import { WorkflowGuide } from "@omniroute/ui-kit/workflow-guide";
import EmptyState from "@/shared/components/EmptyState";
import Icon from "@/shared/components/Icon";
import { CardSkeleton, Button, Modal } from "@/shared/components";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { AI_PROVIDERS, NOAUTH_PROVIDERS, OAUTH_PROVIDERS } from "@/shared/constants/providers";
import {
  isProviderConnectionConnected,
  isProviderConnectionErrored,
} from "@/shared/utils/providerConnectionStatus";
import { useNotificationStore } from "@/store/notificationStore";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";
import { copyToClipboard } from "@/shared/utils/clipboard";
import { getProviderDisplayLabel } from "@/shared/utils/providerDisplayLabel";
import { useIsElectron, useOpenExternal } from "@/shared/hooks/useElectron";
import { HomeProviderTopologySection } from "./HomeProviderTopologySection";
import { shouldShowProviderTopologyOnHome } from "./homeAppearance";
import ManualUpdateCommand from "./ManualUpdateCommand";
import HomeRecentRequests from "../home/HomeRecentRequests";

type UpdateStep = {
  step: string;
  status: string;
  message: string;
};

type VersionInfo = {
  current: string;
  latest: string;
  updateAvailable: boolean;
  channel: string;
  autoUpdateSupported: boolean;
  autoUpdateError?: string | null;
  manualUpdateCommand?: string | null;
};

type HomePageClientProps = {
  machineId?: string;
};

type ProviderSummaryItem = {
  id: string;
  provider: {
    id: string;
    name: string;
    color?: string;
    textIcon?: string;
    alias?: string;
  };
  total: number;
  connected: number;
  errors: number;
  modelCount: number;
  authType: "free" | "oauth" | "apikey" | string;
};

type ProviderMetricSummary = {
  totalRequests?: number;
  totalSuccesses?: number;
  successRate?: number;
  avgLatencyMs?: number;
  lastRequestAt?: string | null;
  lastErrorAt?: string | null;
  lastStatus?: number | null;
  lastErrorStatus?: number | null;
};

type ProviderModelSummary = {
  fullModel: string;
  alias?: string;
  model?: string;
};

const PROVIDER_ALIAS_TO_ID = new Map(
  Object.entries(AI_PROVIDERS)
    .flatMap(([providerId, providerInfo]) =>
      providerInfo.alias ? [[providerInfo.alias.toLowerCase(), providerId]] : []
    )
    .filter((entry): entry is [string, string] => entry.length === 2)
);

function normalizeProviderId(providerId?: string | null): string {
  const normalized = typeof providerId === "string" ? providerId.trim().toLowerCase() : "";
  if (!normalized) return "";
  return AI_PROVIDERS[normalized] ? normalized : PROVIDER_ALIAS_TO_ID.get(normalized) || normalized;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function mergeUpdateStep(steps: UpdateStep[], nextStep: UpdateStep) {
  const idx = steps.findIndex((step) => step.step === nextStep.step);
  if (idx === -1) {
    return [...steps, nextStep];
  }

  const next = [...steps];
  next[idx] = nextStep;
  return next;
}

// Quick-start link classes, extracted so each <Link> still fits on one line with
// prefetch={false} (#8281) — this file is size-frozen.
const INLINE_LINK = "text-primary hover:underline";
// The kit WorkflowGuide numbers its steps itself; the step titles carry a "1. " prefix.
const stripStepNumber = (title: string) => title.replace(/^\s*\d+[.)]\s*/, "");
const DOCS_LINK =
  "hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-text-muted hover:text-text-main hover:bg-bg-subtle transition-colors";

// Stable no-op subscription for useSyncExternalStore reads of never-changing
// browser globals (location.origin does not change without a full navigation).
function emptySubscribe() {
  return () => {};
}

export default function HomePageClient({ machineId }: HomePageClientProps) {
  const router = useRouter();
  const isElectron = useIsElectron();
  const { openExternal } = useOpenExternal();
  const t = useTranslations("home");
  const tp = useTranslations("providers");
  const [providerConnections, setProviderConnections] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  // useSyncExternalStore keeps SSR/hydration consistent ("/v1" on the server,
  // the real origin after hydration) without a setState-in-effect round-trip.
  const baseUrl = useSyncExternalStore(
    emptySubscribe,
    () => `${globalThis.location.origin}/v1`,
    () => "/v1"
  );
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [providerMetrics, setProviderMetrics] = useState<Record<string, ProviderMetricSummary>>({});
  const [providerTopology, setProviderTopology] = useState({ lastProvider: "", errorProvider: "" });
  const [providerNodes, setProviderNodes] = useState<
    Array<{ id?: string; prefix?: string; name?: string }>
  >([]);

  // The live in-flight request feed for the Provider Topology pulse animation is owned by
  // <HomeProviderTopologySection>, which subscribes to it (gated by the `enabled` prop)
  // only when the topology is actually shown. HomePageClient must NOT open its own
  // unconditional live socket: the binding here was unused (ReferenceError in prod,
  // #4759/#4745) and the socket opened even when topology was hidden (#4596).

  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [updating, setUpdating] = useState(false);

  // Platform detection and download links for Electron
  const platform =
    typeof globalThis.window === "undefined" ? undefined : globalThis.window.electronAPI?.platform;
  // Destructured to locals: `versionInfo?.current` in a dependency array trips
  // the lint heuristic that treats any `.current` access as a mutable ref read.
  const installedVersion = versionInfo?.current || "";
  const latestVersion = versionInfo?.latest || "";
  const electronDownload = useMemo(() => {
    const cleanLatest = latestVersion.replace(/^v/, "");
    if (platform === "darwin") {
      return {
        label: t("downloadDmg"),
        url: `https://github.com/cheaper-inference/OmniRoute/releases/download/v${cleanLatest}/OmniRoute-${cleanLatest}.dmg`,
        desc: t("downloadDmgDescription", { version: installedVersion }),
      };
    }
    if (platform === "win32") {
      return {
        label: t("downloadExe"),
        url: `https://github.com/cheaper-inference/OmniRoute/releases/download/v${cleanLatest}/OmniRoute.Setup.${cleanLatest}.exe`,
        desc: t("downloadExeDescription", { version: installedVersion }),
      };
    }
    if (platform === "linux") {
      return {
        label: t("downloadAppImage"),
        url: `https://github.com/cheaper-inference/OmniRoute/releases/download/v${cleanLatest}/OmniRoute-${cleanLatest}.AppImage`,
        desc: t("downloadAppImageDescription", { version: installedVersion }),
      };
    }
    return {
      label: t("downloadUpdate"),
      url: `https://github.com/cheaper-inference/OmniRoute/releases/tag/v${cleanLatest}`,
      desc: t("downloadUpdateDescription", { version: installedVersion }),
    };
  }, [platform, t, latestVersion, installedVersion]);

  // Electron internal auto-updater state and listeners
  const [electronUpdateStatus, setElectronUpdateStatus] = useState<{
    status:
      "idle" | "checking" | "available" | "not-available" | "downloading" | "downloaded" | "error";
    version?: string;
    percent?: number;
    message?: string;
  }>({ status: "idle" });

  useEffect(() => {
    if (!isElectron || typeof globalThis.window === "undefined" || !globalThis.window.electronAPI)
      return;

    // Trigger initial check silently on mount
    globalThis.window.electronAPI.checkForUpdates().catch((err: any) => {
      console.error("[Electron] Check for updates failed:", err);
    });

    const dispose = globalThis.window.electronAPI.onUpdateStatus((data: any) => {
      setElectronUpdateStatus({
        status: data.status,
        version: data.version,
        percent: data.percent,
        message: data.message,
      });
    });

    return dispose;
  }, [isElectron]);

  const [updateSteps, setUpdateSteps] = useState<UpdateStep[]>([]);
  const [updatePhase, setUpdatePhase] = useState<"idle" | "running" | "done" | "failed">("idle");

  // Appearance settings for home page pinning
  const [showQuickStartOnHome, setShowQuickStartOnHome] = useState(true); // default on
  // #4596: default hidden until appearance settings load, so the live-WS
  // topology connection is never opened before we know the user wants it.
  const [showProviderTopologyOnHome, setShowProviderTopologyOnHome] = useState(false);
  const [appearanceSettingsLoaded, setAppearanceSettingsLoaded] = useState(false);

  useEffect(() => {
    // Fetch the pin settings (lightweight)
    fetch("/api/settings")
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => {
        if (data) {
          if (typeof data.showQuickStartOnHome === "boolean") {
            setShowQuickStartOnHome(data.showQuickStartOnHome);
          }
          // #4596 regression fix: the topology card defaults ON (matches the
          // AppearanceTab toggle's `!== false`). Honoring only an explicit boolean
          // left the card hidden whenever the setting was never persisted
          // (undefined), silently removing it for most installs. The live-WS
          // connection is still gated by `appearanceSettingsLoaded` in the data
          // effect, so it is never opened before settings load.
          setShowProviderTopologyOnHome(
            shouldShowProviderTopologyOnHome(data.showProviderTopologyOnHome)
          );
        }
      })
      .catch(() => {
        /* ignore — defaults stay */
      })
      .finally(() => {
        setAppearanceSettingsLoaded(true);
      });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [provRes, modelsRes, versionRes] = await Promise.all([
        fetch("/api/providers"),
        fetch("/api/models"),
        fetch("/api/system/version"),
      ]);
      if (provRes.ok) {
        const provData = await provRes.json();
        setProviderConnections(provData.connections || []);
      }
      if (modelsRes.ok) {
        const modelsData = await modelsRes.json();
        setModels(modelsData.models || []);
      }
      if (versionRes.ok) {
        const versionData = await versionRes.json();
        setVersionInfo(versionData);
      }
    } catch (e) {
      console.log("Error fetching data:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      await fetchData();
    })();
  }, [fetchData]);

  // Fetch provider nodes for display labels (compat providers)
  useEffect(() => {
    fetch("/api/provider-nodes")
      .then((r) => (r.ok ? r.json() : { nodes: [] }))
      .then((d) => setProviderNodes(d.nodes || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!appearanceSettingsLoaded || !showProviderTopologyOnHome) {
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let controller: AbortController | null = null;

    const loadTopologyActivity = async () => {
      const currentController = new AbortController();
      controller = currentController;
      try {
        const metricsRes = await fetch("/api/provider-metrics", {
          cache: "no-store",
          signal: currentController.signal,
        });
        if (metricsRes.ok) {
          const data = await metricsRes.json();
          if (!cancelled) {
            setProviderMetrics(data.metrics || {});
            setProviderTopology({
              lastProvider: normalizeProviderId(data.topology?.lastProvider),
              errorProvider: normalizeProviderId(data.topology?.errorProvider),
            });
          }
        }
      } catch (error) {
        const isAbortError = error instanceof DOMException && error.name === "AbortError";
        if (!cancelled && !isAbortError) {
          console.error("Failed to load topology activity:", error);
        }
      } finally {
        if (controller === currentController) {
          controller = null;
        }
        if (!cancelled) {
          timeoutId = setTimeout(loadTopologyActivity, 3000);
        }
      }
    };

    loadTopologyActivity();
    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
      controller?.abort();
    };
  }, [appearanceSettingsLoaded, showProviderTopologyOnHome]);

  // T07: Check for unhealthy API keys and show notification (once per session)
  const notifiedUnhealthyKeys = useRef<Set<string>>(new Set());
  useEffect(() => {
    const checkApiKeyHealth = () => {
      const newUnhealthyKeys = new Set<string>();
      const unhealthyProviderIds = new Set<string>();
      const unhealthyConnections: string[] = [];
      let firstUnhealthyProviderId: string | null = null;
      let hasWarning = false;

      for (const conn of providerConnections) {
        const health = conn.providerSpecificData?.apiKeyHealth as
          | Record<
              string,
              {
                status: "active" | "warning" | "invalid";
                failures: number;
                lastFailure: string | null;
              }
            >
          | undefined;
        if (!health) continue;

        // Defense-in-depth: skip stale extra_N health entries whose index
        // is out of range of the current extraApiKeys list.
        // The backend cleans this up on PATCH, but existing stale data from
        // before the fix or other code paths could still have orphan entries.
        const extras: string[] = conn.providerSpecificData?.extraApiKeys ?? [];
        const extraKeyCount = Array.isArray(extras) ? extras.length : 0;

        const unhealthyKeys = Object.entries(health).filter(([keyId, h]) => {
          if (h.status !== "invalid" && h.status !== "warning") return false;
          // extra_N entries: only flag if the index is still within bounds
          if (keyId.startsWith("extra_")) {
            const idx = Number.parseInt(keyId.slice(6), 10);
            if (Number.isNaN(idx) || idx >= extraKeyCount) return false;
          }
          return true;
        });

        if (unhealthyKeys.length > 0) {
          for (const [, h] of unhealthyKeys) {
            if (h.status === "warning") hasWarning = true;
            break;
          }
          for (const [keyId] of unhealthyKeys) {
            newUnhealthyKeys.add(`${conn.id}:${keyId}`);
          }
          firstUnhealthyProviderId ??= conn.provider;
          unhealthyConnections.push(conn.name || conn.id);
          unhealthyProviderIds.add(conn.provider);
        }
      }

      // Only notify for newly unhealthy keys (not already notified)
      const hasNewUnhealthy = Array.from(newUnhealthyKeys).some(
        (k) => !notifiedUnhealthyKeys.current.has(k)
      );
      if (hasNewUnhealthy) {
        const navigateTo =
          newUnhealthyKeys.size === 1 && firstUnhealthyProviderId
            ? `/dashboard/providers/${firstUnhealthyProviderId}`
            : `/dashboard/providers?search=${encodeURIComponent(Array.from(unhealthyProviderIds).join(" "))}`;

        const notificationType = hasWarning ? "warning" : "error";

        useNotificationStore.getState().addNotification({
          type: notificationType,
          message: tp(hasWarning ? "apiKeyWarningAlert" : "apiKeyInvalidAlert", {
            count: newUnhealthyKeys.size,
            connections: unhealthyConnections.join(", "),
          }),
          title: tp(hasWarning ? "apiKeyWarningAlertTitle" : "apiKeyInvalidAlertTitle"),
          duration: 10000,
          onClick: () => router.push(navigateTo),
        });
        // Mark all current unhealthy keys as notified
        newUnhealthyKeys.forEach((k) => notifiedUnhealthyKeys.current.add(k));
      }
    };

    if (providerConnections.length > 0) {
      checkApiKeyHealth();
    }
  }, [providerConnections, t, tp, router]);

  const providerStats = useMemo(() => {
    return Object.entries(AI_PROVIDERS).map(([providerId, providerInfo]) => {
      const connections = providerConnections.filter((conn) => conn.provider === providerId);
      const connected = connections.filter((connection) =>
        isProviderConnectionConnected(connection)
      ).length;
      const errors = connections.filter((connection) =>
        isProviderConnectionErrored(connection)
      ).length;

      const providerKeys = new Set([providerId, providerInfo.alias].filter(Boolean));
      const providerModels = models.filter((m) => providerKeys.has(m.provider));

      const authType = NOAUTH_PROVIDERS[providerId]
        ? "no-auth"
        : OAUTH_PROVIDERS[providerId]
          ? "oauth"
          : "apikey";

      return {
        id: providerId,
        provider: providerInfo,
        total: connections.length,
        connected,
        errors,
        modelCount: providerModels.length,
        authType,
      };
    });
  }, [providerConnections, models]);

  const selectedProviderModels = useMemo(() => {
    if (!selectedProvider) return [];
    const providerKeys = new Set(
      [selectedProvider.id, selectedProvider.provider?.alias].filter(Boolean)
    );
    return models.filter((m) => providerKeys.has(m.provider));
  }, [selectedProvider, models]);

  const topologyProviders = useMemo(() => {
    type ProviderHealth = "active" | "error" | "idle";
    const byProvider = new Map<
      string,
      { id: string; provider: string; name?: string; status: ProviderHealth }
    >();
    const providerConfig = AI_PROVIDERS as Record<string, { name?: string }>;

    // Connection-health per provider, so the topology node reflects "what is connected"
    // at rest (green healthy / red error) instead of going blank between requests. A
    // provider with ≥1 healthy connection is "active"; if none are healthy but some are
    // errored it is "error"; otherwise "idle". Live/recent traffic still overrides this.
    const healthByProvider = new Map<string, ProviderHealth>();
    for (const stat of providerStats) {
      const canonical = normalizeProviderId(stat.id);
      if (!canonical) continue;
      healthByProvider.set(
        canonical,
        stat.connected > 0 ? "active" : stat.errors > 0 ? "error" : "idle"
      );
    }

    const addProvider = (providerId?: string | null, name?: string) => {
      const rawProviderId = typeof providerId === "string" ? providerId.trim() : "";
      if (!rawProviderId) return;

      const canonicalProviderId = normalizeProviderId(rawProviderId);
      if (!canonicalProviderId || byProvider.has(canonicalProviderId)) return;

      // Exclude providers with no active connections (or where all connections are deactivated)
      const hasActiveConn = providerConnections.some(
        (c) => normalizeProviderId(c.provider) === canonicalProviderId && c.isActive !== false
      );
      if (!hasActiveConn) return;

      const resolvedName =
        getProviderDisplayLabel(rawProviderId, providerNodes) ||
        name ||
        providerConfig[canonicalProviderId]?.name ||
        rawProviderId;

      byProvider.set(canonicalProviderId, {
        id: canonicalProviderId,
        provider: canonicalProviderId,
        name: resolvedName,
        status: healthByProvider.get(canonicalProviderId) ?? "idle",
      });
    };

    providerStats
      .filter((provider) => provider.total > 0)
      .forEach((provider) => addProvider(provider.id, provider.provider.name));
    providerConnections.forEach((conn) => addProvider(conn.provider));
    Object.keys(providerMetrics).forEach((provider) => addProvider(provider));

    return Array.from(byProvider.values());
  }, [providerStats, providerMetrics, providerNodes, providerConnections]);

  const { lastProvider, errorProvider } = providerTopology;

  const pollBackgroundUpdate = useCallback(
    async ({
      channel,
      message,
      targetVersion,
    }: {
      channel: string;
      message: string;
      targetVersion: string;
    }) => {
      const notify = useNotificationStore.getState();
      const initialSteps =
        channel === "docker-compose"
          ? [
              {
                step: "install",
                status: "done",
                message: message || t("updateQueued", { version: targetVersion }),
              },
              {
                step: "rebuild",
                status: "running",
                message: t("updateDockerRebuilding"),
              },
              {
                step: "restart",
                status: "pending",
                message: t("updateWaitingRestart"),
              },
            ]
          : [
              {
                step: "install",
                status: "running",
                message: message || t("updateInstalling", { version: targetVersion }),
              },
              {
                step: "restart",
                status: "pending",
                message: t("updateWaitingRestart"),
              },
            ];

      setUpdateSteps(initialSteps);

      // Docker rebuilds and host-side image pulls (docker-trigger) take longer than npm.
      const maxAttempts = channel.startsWith("docker") ? 72 : 36;

      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        await wait(5000);

        try {
          const versionRes = await fetch("/api/system/version", { cache: "no-store" });
          if (!versionRes.ok) {
            throw new Error(`Version check returned ${versionRes.status}`);
          }

          const latestInfo = await versionRes.json();
          setVersionInfo(latestInfo);

          if (latestInfo.current === targetVersion) {
            setUpdateSteps((prev) => {
              let next = prev.map((step) => {
                if (step.step === "install" || step.step === "rebuild" || step.step === "restart") {
                  return { ...step, status: "done" };
                }
                return step;
              });

              next = mergeUpdateStep(next, {
                step: "complete",
                status: "done",
                message: t("updateRunning", { version: targetVersion }),
              });

              return next;
            });
            setUpdating(false);
            setUpdatePhase("done");
            notify.success(t("updateCompleted", { version: targetVersion }));
            await fetchData();
            return;
          }

          setUpdateSteps((prev) => {
            let next = prev;
            if (channel === "docker-compose") {
              next = mergeUpdateStep(next, {
                step: "rebuild",
                status: "running",
                message: t("updateDockerStillRebuilding", { version: targetVersion }),
              });
            } else {
              next = mergeUpdateStep(next, {
                step: "install",
                status: "running",
                message: t("updateInstallingBackground", { version: targetVersion }),
              });
            }

            next = mergeUpdateStep(next, {
              step: "restart",
              status: "pending",
              message: t("updateWaitingVersion", { version: targetVersion }),
            });

            return next;
          });
        } catch {
          setUpdateSteps((prev) => {
            let next = prev;
            if (channel === "docker-compose") {
              next = mergeUpdateStep(next, {
                step: "rebuild",
                status: "running",
                message: t("updateDockerStillInProgress"),
              });
            } else {
              next = mergeUpdateStep(next, {
                step: "install",
                status: "running",
                message: t("updateInstallingBackground", { version: targetVersion }),
              });
            }

            next = mergeUpdateStep(next, {
              step: "restart",
              status: "running",
              message: t("updateRestarting"),
            });

            return next;
          });
        }
      }

      setUpdateSteps((prev) =>
        mergeUpdateStep(prev, {
          step: "error",
          status: "failed",
          message: t("updateTimeout", { version: targetVersion }),
        })
      );
      setUpdating(false);
      setUpdatePhase("failed");
      notify.error(t("updateTimedOut", { version: targetVersion }));
    },
    [fetchData, t]
  );

  const handleUpdate = async () => {
    const notify = useNotificationStore.getState();
    setUpdating(true);
    setUpdatePhase("running");
    setUpdateSteps([]);

    try {
      const res = await fetch("/api/system/version", { method: "POST" });

      // If response is JSON (error/already up to date)
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (!res.ok || !data.success) {
          // #5991: the error envelope is `{ error: { code, message, correlation_id } }`.
          // Passing the raw object to notify.error() rendered it as a React child →
          // "Minified React error #31" crash ("Internal Server Error" screen), e.g. on
          // the 403 from the loopback-only /api/system/version. Extract the string.
          notify.error(extractApiErrorMessage(data, t("updateStartFailed")));
          setUpdating(false);
          setUpdatePhase("idle");
          return;
        }
        notify.success(data.message || t("updateStarted"));
        await pollBackgroundUpdate({
          channel: data.channel || "docker-compose",
          message: data.message || "",
          targetVersion: data.to || data.latest,
        });
        return;
      }

      // SSE stream — read progress events
      if (!res.body) {
        notify.error(t("noResponseStream"));
        setUpdating(false);
        setUpdatePhase("idle");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(line.slice(6));

            setUpdateSteps((prev) => {
              return mergeUpdateStep(prev, event);
            });

            if (event.step === "complete") {
              setUpdatePhase("done");
              setUpdating(false);
              notify.success(event.message || t("updateComplete"));
            } else if (event.step === "error") {
              setUpdatePhase("failed");
              notify.error(event.message || t("updateFailed"));
              setUpdating(false);
            }
          } catch {
            // ignore parse errors
          }
        }
      }
    } catch {
      setUpdatePhase("failed");
      setUpdateSteps((prev) => [
        ...prev,
        {
          step: "error",
          status: "failed",
          message: t("updateNetworkError"),
        },
      ]);
      setUpdating(false);
    }
  };

  // Auto-reload after successful update (service restarts, need new page)
  useEffect(() => {
    if (updatePhase !== "done") return;
    const timer = setTimeout(() => {
      globalThis.window.location.reload();
    }, 8000);
    return () => clearTimeout(timer);
  }, [updatePhase]);
  const stepLabels: Record<string, string> = {
    install: t("stepInstallPackage"),
    rebuild: t("stepRebuildNativeModules"),
    restart: t("stepRestartService"),
    complete: t("stepComplete"),
    error: t("stepError"),
  };
  const showUpdateOverlay = updatePhase !== "idle";

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  const currentEndpoint = baseUrl;

  return (
    <div className="flex flex-col gap-8">
      {/* Update Progress Overlay */}
      {showUpdateOverlay && (
        <div className="fixed inset-0 z-[999] bg-[var(--ci-color-overlay)] backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-bg-main border border-border rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-5">
              <Icon name="progress_activity" size={28} className="text-primary animate-spin" />
              <div>
                <h3 className="text-lg font-bold">
                  {updatePhase === "done"
                    ? t("updateCompleteTitle")
                    : updatePhase === "failed"
                      ? t("updateFailedTitle")
                      : t("updatingTitle")}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  {updatePhase === "done"
                    ? t("reloadNotice")
                    : updatePhase === "failed"
                      ? t("retryNotice")
                      : t("restartNotice")}
                </p>
              </div>
            </div>

            {/* Step list */}
            <div className="flex flex-col gap-2">
              {updateSteps
                .filter((s) => s.step !== "complete" && s.step !== "error")
                .map((s) => (
                  <div
                    key={s.step}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all ${
                      s.status === "running"
                        ? "border-primary/40 bg-primary/5"
                        : s.status === "done"
                          ? "border-success/30 bg-success/5"
                          : s.status === "failed"
                            ? "border-error/30 bg-error/5"
                            : "border-border bg-bg-subtle"
                    }`}
                  >
                    {s.status === "running" ? (
                      <Icon
                        name="progress_activity"
                        size={18}
                        className="text-primary animate-spin"
                      />
                    ) : s.status === "done" ? (
                      <Icon name="check_circle" size={18} className="text-success" />
                    ) : s.status === "failed" ? (
                      <Icon name="error" size={18} className="text-error" />
                    ) : (
                      <Icon name="warning" size={18} className="text-warning" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{stepLabels[s.step] || s.step}</p>
                      <p className="text-xs text-text-muted truncate">{s.message}</p>
                    </div>
                  </div>
                ))}

              {/* Error message */}
              {updateSteps.find((s) => s.step === "error") && (
                <div className="mt-1 px-3 py-2.5 rounded-lg border border-error/30 bg-error/5 text-error">
                  <p className="text-xs font-mono break-all">
                    {updateSteps.find((s) => s.step === "error")?.message}
                  </p>
                </div>
              )}

              {/* Completion message */}
              {updatePhase === "done" && (
                <div className="mt-1 px-3 py-2.5 rounded-lg border border-success/30 bg-success/5">
                  <p className="text-sm font-semibold text-success flex items-center gap-2">
                    <Icon name="check_circle" size={18} />
                    {updateSteps.find((s) => s.step === "complete")?.message || t("updateComplete")}
                  </p>
                  <p className="text-xs text-text-muted mt-1">{t("reloadingPageAutomatically")}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            {(updatePhase === "failed" || updatePhase === "done") && (
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  fullWidth
                  onClick={() => {
                    setUpdating(false);
                    setUpdatePhase("idle");
                    setUpdateSteps([]);
                    if (updatePhase === "done") globalThis.window.location.reload();
                  }}
                >
                  {updatePhase === "done" ? t("reloadNow") : t("closeUpdate")}
                </Button>
                {updatePhase === "failed" && (
                  <Button size="sm" variant="secondary" fullWidth onClick={handleUpdate}>
                    {t("retryUpdate")}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Update Notification Banner */}
      {versionInfo?.updateAvailable && !showUpdateOverlay && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 rounded-lg border border-primary/20 bg-primary/10 px-5 py-4 text-primary">
            <div className="flex min-h-[48px] items-center justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <Icon
                  name={
                    isElectron && electronUpdateStatus.status === "downloading"
                      ? "downloading"
                      : "system_update_alt"
                  }
                  size={24}
                />
                <div>
                  <p className="font-semibold text-sm">
                    {t("updateAvailableTitle", {
                      version: versionInfo.latest,
                      desktop: isElectron ? ` ${t("desktopAppLabel")}` : "",
                    })}
                  </p>
                  <p className="text-xs opacity-80 mt-0.5">
                    {isElectron ? (
                      <>
                        {electronUpdateStatus.status === "checking" && t("checkingForUpdates")}
                        {electronUpdateStatus.status === "available" &&
                          t("versionAvailableForDownload", { version: versionInfo.latest })}
                        {electronUpdateStatus.status === "downloading" &&
                          t("downloadingUpdate", { percent: electronUpdateStatus.percent || 0 })}
                        {electronUpdateStatus.status === "downloaded" && t("updateDownloaded")}
                        {electronUpdateStatus.status === "error" &&
                          t("autoUpdateFailed", {
                            reason: electronUpdateStatus.message || t("unknownUpdateError"),
                          })}
                        {(electronUpdateStatus.status === "idle" ||
                          electronUpdateStatus.status === "not-available") &&
                          t("versionAvailableDesktop", { version: versionInfo.latest })}
                      </>
                    ) : versionInfo.autoUpdateSupported ? (
                      t("updateAvailableDesc")
                    ) : (
                      versionInfo.autoUpdateError || t("manualUpdateRequired")
                    )}
                  </p>
                  {!isElectron &&
                    !versionInfo.autoUpdateSupported &&
                    versionInfo.manualUpdateCommand && (
                      <ManualUpdateCommand command={versionInfo.manualUpdateCommand} />
                    )}
                </div>
              </div>

              {isElectron ? (
                <div className="flex gap-2 shrink-0 ml-4">
                  {electronUpdateStatus.status === "available" && (
                    <Button
                      size="sm"
                      onClick={() => globalThis.window.electronAPI?.downloadUpdate()}
                      className="font-semibold"
                    >
                      {t("downloadUpdate")}
                    </Button>
                  )}
                  {electronUpdateStatus.status === "downloading" && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/20">
                      <Icon
                        name="progress_activity"
                        size={16}
                        className="text-primary animate-spin"
                      />
                      <span className="text-xs font-semibold">
                        {electronUpdateStatus.percent || 0}%
                      </span>
                    </div>
                  )}
                  {electronUpdateStatus.status === "downloaded" && (
                    <Button
                      size="sm"
                      onClick={() => globalThis.window.electronAPI?.installUpdate()}
                      className="font-semibold animate-pulse"
                    >
                      {t("restartAndInstall")}
                    </Button>
                  )}
                  {(electronUpdateStatus.status === "error" ||
                    electronUpdateStatus.status === "idle" ||
                    electronUpdateStatus.status === "not-available") && (
                    <Button
                      size="sm"
                      onClick={() => {
                        setElectronUpdateStatus({ status: "checking" });
                        globalThis.window.electronAPI?.checkForUpdates().catch((err: any) => {
                          setElectronUpdateStatus({ status: "error", message: err.message });
                        });
                      }}
                      className="font-semibold"
                    >
                      {t("checkForUpdate")}
                    </Button>
                  )}
                </div>
              ) : (
                <Button
                  size="sm"
                  onClick={versionInfo.autoUpdateSupported ? handleUpdate : undefined}
                  disabled={updating || !versionInfo.autoUpdateSupported}
                  className="ml-4 shrink-0 font-semibold"
                  title={versionInfo.autoUpdateError || ""}
                >
                  {versionInfo.autoUpdateSupported ? t("updateNow") : t("manualUpdate")}
                </Button>
              )}
            </div>

            {/* Direct download fallback links shown if in Electron and auto-updater has failed, is idle, or has completed check */}
            {isElectron &&
              (electronUpdateStatus.status === "error" ||
                electronUpdateStatus.status === "idle" ||
                electronUpdateStatus.status === "available" ||
                electronUpdateStatus.status === "not-available") && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-primary/20 mt-2 pt-3 gap-2">
                  <p className="text-xs opacity-75">{t("directDownloadHint")}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        openExternal(
                          `https://github.com/cheaper-inference/OmniRoute/releases/tag/v${versionInfo.latest}`
                        )
                      }
                      className="font-semibold text-xs py-1"
                    >
                      {t("releaseNotes")}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => openExternal(electronDownload.url)}
                      className="font-semibold text-xs py-1"
                    >
                      {electronDownload.label}
                    </Button>
                  </div>
                </div>
              )}
          </div>
        </div>
      )}

      {/* Quick Start (controlled by Appearance setting, default on) */}
      {showQuickStartOnHome && (
        <section className="flex flex-col gap-3">
          <SectionHeader
            title={t("quickStart")}
            description={t("quickStartDesc")}
            actions={
              <Link href="/docs" prefetch={false} className={DOCS_LINK}>
                <Icon name="menu_book" size={14} />
                {t("fullDocs")}
              </Link>
            }
          />
          <WorkflowGuide
            label={t("quickStart")}
            items={[
              {
                id: "step1",
                icon: <Icon name="key" size={18} />,
                title: stripStepNumber(t("step1Title")),
                description: (
                  <>
                    {t.rich("step1Desc", {
                      endpoint: (chunks) => (
                        <Link
                          href="/dashboard/api-manager"
                          prefetch={false}
                          className={INLINE_LINK}
                        >
                          {chunks}
                        </Link>
                      ),
                    })}
                  </>
                ),
              },
              {
                id: "step2",
                icon: <Icon name="dns" size={18} />,
                title: stripStepNumber(t("step2Title")),
                description: (
                  <>
                    {t.rich("step2Desc", {
                      providers: (chunks) => (
                        <Link href="/dashboard/providers" prefetch={false} className={INLINE_LINK}>
                          {chunks}
                        </Link>
                      ),
                    })}
                  </>
                ),
              },
              {
                id: "step3",
                icon: <Icon name="link" size={18} />,
                title: stripStepNumber(t("step3Title")),
                description: <>{t("step3Desc", { url: currentEndpoint })}</>,
              },
              {
                id: "step4",
                icon: <Icon name="analytics" size={18} />,
                title: stripStepNumber(t("step4Title")),
                description: (
                  <>
                    {t.rich("step4Desc", {
                      logs: (chunks) => (
                        <Link href="/dashboard/logs" prefetch={false} className={INLINE_LINK}>
                          {chunks}
                        </Link>
                      ),
                      analytics: (chunks) => (
                        <Link href="/dashboard/analytics" prefetch={false} className={INLINE_LINK}>
                          {chunks}
                        </Link>
                      ),
                    })}
                  </>
                ),
              },
            ]}
          />
        </section>
      )}

      {showProviderTopologyOnHome && (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
          <HomeProviderTopologySection
            providers={topologyProviders}
            lastProvider={lastProvider}
            errorProvider={errorProvider}
            enabled={showProviderTopologyOnHome}
          />
          <HomeRecentRequests enabled={showProviderTopologyOnHome} />
        </div>
      )}

      {/* Provider Models Modal */}
      {selectedProvider && (
        <ProviderModelsModal
          provider={selectedProvider}
          models={selectedProviderModels}
          onClose={() => setSelectedProvider(null)}
        />
      )}
    </div>
  );
}

function ProviderOverviewCard({
  item,
  metrics,
  onClick,
}: {
  item: ProviderSummaryItem;
  metrics?: ProviderMetricSummary;
  onClick: () => void;
}) {
  const t = useTranslations("home");
  const tc = useTranslations("common");

  const statusVariant =
    item.errors > 0 ? "text-error" : item.connected > 0 ? "text-success" : "text-text-muted";

  const authTypeConfig = {
    "no-auth": { color: "bg-text-muted/30", label: t("noAuthLabel") },
    free: { color: "bg-success", label: tc("free") },
    oauth: { color: "bg-info", label: t("oauthLabel") },
    apikey: { color: "bg-warning", label: t("apiKeyLabel") },
  };
  const authInfo = authTypeConfig[item.authType] || authTypeConfig.apikey;

  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="block h-auto min-h-0 w-full p-3 text-left font-normal"
    >
      <div className="flex items-center gap-2.5">
        <div
          className="size-8 rounded-lg flex items-center justify-center shrink-0"
          style={{
            backgroundColor: `color-mix(in srgb, ${item.provider.color || "var(--color-text-muted)"} 8%, transparent)`,
          }}
        >
          <ProviderIcon providerId={item.provider.id} size={26} type="color" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold truncate">{item.provider.name}</p>
            <span
              className={`size-2 rounded-full ${authInfo.color} shrink-0`}
              title={authInfo.label}
            />
          </div>
          <p className={`text-xs ${statusVariant}`}>
            {item.total === 0
              ? tc("notConfigured")
              : t("activeError", { active: item.connected, errors: item.errors })}
          </p>
          {metrics && metrics.totalRequests > 0 && (
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-text-muted">
                <span className="text-success">{metrics.totalSuccesses}</span>/
                {t("requestsShort", { count: metrics.totalRequests })}
              </span>
              <span className="text-[10px] text-text-muted">{metrics.successRate}%</span>
              <span className="text-[10px] text-text-muted">~{metrics.avgLatencyMs}ms</span>
            </div>
          )}
        </div>

        <div className="text-right shrink-0">
          <p className="text-xs font-medium text-text-main">{item.modelCount}</p>
          <p className="text-[10px] text-text-muted">{tc("models")}</p>
        </div>
      </div>
    </Button>
  );
}

function ProviderModelsModal({
  provider,
  models,
  onClose,
}: {
  provider: ProviderSummaryItem;
  models: ProviderModelSummary[];
  onClose: () => void;
}) {
  const [copiedModel, setCopiedModel] = useState(null);
  const notify = useNotificationStore();
  const router = useRouter();
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const ts = useTranslations("sidebar");

  const navigateTo = (path) => {
    onClose();
    router.push(path);
  };

  const handleCopy = async (text) => {
    await copyToClipboard(text);
    setCopiedModel(text);
    notify.success(t("copiedModel", { model: text }));
    setTimeout(() => setCopiedModel(null), 2000);
  };

  return (
    <Modal
      isOpen={true}
      title={t("providerModelsTitle", { provider: provider.provider.name })}
      onClose={onClose}
    >
      <div className="flex flex-col gap-3">
        {/* Summary */}
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Icon name="token" size={16} />
          {models.length === 1
            ? t("modelAvailable", { count: models.length })
            : t("modelsAvailable", { count: models.length })}
          {provider.total > 0 && (
            <span className="ml-auto text-xs text-success">
              ●{" "}
              {provider.connected === 1
                ? t("connectionsActive", { count: provider.connected })
                : t("connectionsActivePlural", { count: provider.connected })}
            </span>
          )}
        </div>

        {models.length === 0 ? (
          <EmptyState
            icon="search_off"
            title={t("noModelsAvailable")}
            description={t("configureFirst", { providers: ts("providers") })}
          />
        ) : (
          <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto">
            {models.map((m) => (
              <div
                key={m.fullModel}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface/50 transition-colors group"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-sm text-text-main truncate">{m.fullModel}</p>
                  {m.alias !== m.model && (
                    <p className="text-[10px] text-text-muted">
                      {t("aliasLabel")}: {m.alias}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  icon={copiedModel === m.fullModel ? "check" : "content_copy"}
                  onClick={() => handleCopy(m.fullModel)}
                  title={t("copyModelName")}
                  aria-label={t("copyModelName")}
                  className="ml-2 shrink-0 text-text-muted opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                />
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-border">
          <Button
            variant="secondary"
            fullWidth
            size="sm"
            onClick={() => navigateTo(`/dashboard/providers/${provider.id}`)}
            className="flex-1"
          >
            <Icon name="settings" size={14} />
            {t("configureProvider")}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            {tc("close")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
