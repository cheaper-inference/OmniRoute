"use client";

import Icon from "@/shared/components/Icon";
import { Alert } from "@omniroute/ui-kit/alert";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Checkbox } from "@omniroute/ui-kit/checkbox";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Input from "@/shared/components/Input";
import { CardSkeleton } from "@/shared/components/Loading";
import Modal from "@/shared/components/Modal";
import SegmentedControl from "@/shared/components/SegmentedControl";
import { cn } from "@/shared/utils/cn";
import Toggle from "@/shared/components/Toggle";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import { isPublicDisplayBaseUrl, useDisplayBaseUrl } from "@/shared/hooks";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";
import { useTranslations } from "next-intl";
import A2ADashboardPage from "./components/A2ADashboard";
import McpDashboardPage from "./components/MCPDashboard";
import NotionSourceCard from "./components/NotionSourceCard";
import ObsidianSourceCard from "./components/ObsidianSourceCard";
import VscodeTokenAliasCard from "./VscodeTokenAliasCard";

const BUILD_TIME_CLOUD_URL = process.env.NEXT_PUBLIC_CLOUD_URL || null;
const CLOUD_ACTION_TIMEOUT_MS = 15000;

type TranslationValues = Record<string, string | number | boolean | Date>;
type CloudflaredTunnelPhase =
  "unsupported" | "not_installed" | "stopped" | "starting" | "running" | "error";

type CloudflaredTunnelStatus = {
  supported: boolean;
  installed: boolean;
  managedInstall: boolean;
  installSource: string | null;
  binaryPath: string | null;
  running: boolean;
  pid: number | null;
  publicUrl: string | null;
  apiUrl: string | null;
  targetUrl: string;
  phase: CloudflaredTunnelPhase;
  lastError: string | null;
  logPath: string;
};

type TailscaleTunnelPhase =
  "unsupported" | "not_installed" | "needs_login" | "stopped" | "running" | "error";

type TailscaleTunnelStatus = {
  supported: boolean;
  installed: boolean;
  managedInstall: boolean;
  installSource: string | null;
  binaryPath: string | null;
  loggedIn: boolean;
  daemonRunning: boolean;
  running: boolean;
  enabled: boolean;
  tunnelUrl: string | null;
  apiUrl: string | null;
  phase: TailscaleTunnelPhase;
  platform: string;
  brewAvailable: boolean;
  lastError: string | null;
  pid: number | null;
};

type NgrokTunnelPhase =
  "unsupported" | "not_installed" | "stopped" | "needs_auth" | "starting" | "running" | "error";

type NgrokTunnelStatus = {
  supported: boolean;
  installed: boolean;
  running: boolean;
  publicUrl: string | null;
  apiUrl: string | null;
  targetUrl: string;
  phase: NgrokTunnelPhase;
  lastError: string | null;
};

type TunnelNotice = {
  type: "success" | "error" | "info";
  message: string;
};

type APIPageClientProps = {
  machineId: string;
};

type EndpointProviderSummary = {
  id: string;
  provider: {
    name: string;
    alias?: string;
  };
};

type EndpointModelSummary = {
  id: string;
  owned_by?: string;
  parent?: string;
  type?: string;
  custom?: boolean;
  root?: string;
};

type CopyHandler = (text: string, key?: string) => void | Promise<void>;

type EndpointTunnelVisibility = {
  showCloudflaredTunnel: boolean;
  showTailscaleFunnel: boolean;
  showNgrokTunnel: boolean;
};

type EndpointTab = "apis" | "mcp" | "a2a" | "context-sources";

const ENDPOINT_TABS: Array<{ value: EndpointTab; labelKey: string; icon: string }> = [
  { value: "apis", labelKey: "tabApis", icon: "api" },
  { value: "mcp", labelKey: "tabMcp", icon: "extension" },
  { value: "a2a", labelKey: "tabA2a", icon: "hub" },
  { value: "context-sources", labelKey: "tabContextSources", icon: "database" },
];

const DEFAULT_TUNNEL_VISIBILITY: EndpointTunnelVisibility = {
  showCloudflaredTunnel: true,
  showTailscaleFunnel: true,
  showNgrokTunnel: true,
};

function runEndpointBackgroundTask(taskName: string, task: () => Promise<unknown>) {
  void task().catch((error) => {
    console.log("Error running endpoint background task:", taskName, error);
  });
}

export default function APIPageClient({ machineId }: Readonly<APIPageClientProps>) {
  const [resolvedMachineId, setResolvedMachineId] = useState(machineId || "");
  const t = useTranslations("endpoint");
  const tc = useTranslations("common");
  const [loading, setLoading] = useState(true);

  // Endpoints / models state
  const [allModels, setAllModels] = useState([]);
  const [modelsLoading, setModelsLoading] = useState(true);

  // Cloud sync state
  const [cloudEnabled, setCloudEnabled] = useState(false);
  const [showCloudModal, setShowCloudModal] = useState(false);
  const [acknowledgeCloudUpload, setAcknowledgeCloudUpload] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [cloudSyncing, setCloudSyncing] = useState(false);
  const [cloudStatus, setCloudStatus] = useState(null);
  const [syncStep, setSyncStep] = useState(""); // "syncing" | "verifying" | "disabling" | "done" | ""
  const [modalSuccess, setModalSuccess] = useState(false); // show success state in modal before closing
  const [selectedProvider, setSelectedProvider] = useState(null); // for provider models popup
  const [cloudBaseUrl, setCloudBaseUrl] = useState(BUILD_TIME_CLOUD_URL); // dynamic cloud URL from API response
  const [cloudConfigured, setCloudConfigured] = useState(Boolean(BUILD_TIME_CLOUD_URL));
  const [_mcpStatus, setMcpStatus] = useState<any>(null);
  const [_a2aStatus, setA2aStatus] = useState<any>(null);
  const [searchProviders, setSearchProviders] = useState<any[]>([]);
  const [cloudflaredStatus, setCloudflaredStatus] = useState<CloudflaredTunnelStatus | null>(null);
  const [cloudflaredBusy, setCloudflaredBusy] = useState(false);
  const [cloudflaredNotice, setCloudflaredNotice] = useState<TunnelNotice | null>(null);
  const [tailscaleStatus, setTailscaleStatus] = useState<TailscaleTunnelStatus | null>(null);
  const [tailscaleBusy, setTailscaleBusy] = useState(false);
  const [tailscaleNotice, setTailscaleNotice] = useState<TunnelNotice | null>(null);
  const [showTailscaleInstallModal, setShowTailscaleInstallModal] = useState(false);
  const [tailscaleInstallBusy, setTailscaleInstallBusy] = useState(false);
  const [tailscaleInstallLog, setTailscaleInstallLog] = useState<string[]>([]);
  const [tailscalePassword, setTailscalePassword] = useState("");
  const [showCloudflaredTunnel, setShowCloudflaredTunnel] = useState(true);
  const [showTailscaleFunnel, setShowTailscaleFunnel] = useState(true);
  const [ngrokStatus, setNgrokStatus] = useState<NgrokTunnelStatus | null>(null);
  const [ngrokBusy, setNgrokBusy] = useState(false);
  const [ngrokNotice, setNgrokNotice] = useState<TunnelNotice | null>(null);
  const [ngrokToken, setNgrokToken] = useState("");
  const [showNgrokTunnel, setShowNgrokTunnel] = useState(true);
  const [expandedTunnel, setExpandedTunnel] = useState<string | null>(null);
  const [localApiUrl, setLocalApiUrl] = useState(
    typeof window !== "undefined" ? `${window.location.origin}/v1` : "http://localhost:20128/v1"
  );
  const [lanUrls, setLanUrls] = useState<string[]>([]);
  const [tailscaleIpUrl, setTailscaleIpUrl] = useState<string | null>(null);
  const [activeEndpointTab, setActiveEndpointTab] = useState<EndpointTab>("apis");
  const [customSystemPromptEnabled, setCustomSystemPromptEnabled] = useState(false);
  const [customSystemPrompt, setCustomSystemPrompt] = useState("");

  const { copied, copy } = useCopyToClipboard();

  const translateOrFallback = useCallback(
    (key: string, fallback: string, values?: TranslationValues) => {
      try {
        const message = values ? t(key as never, values as never) : t(key as never);
        if (!message || message === key || message === `endpoint.${key}`) {
          return fallback;
        }
        return message;
      } catch {
        return fallback;
      }
    },
    [t]
  );

  const fetchSearchProviders = async () => {
    try {
      const res = await fetch("/api/search/providers");
      if (res.ok) {
        const data = await res.json();
        setSearchProviders(data.providers || []);
      }
    } catch {
      // Search endpoint may not be available
    }
  };

  const fetchCloudflaredStatus = useCallback(
    async (silent = false) => {
      try {
        const res = await fetch("/api/tunnels/cloudflared", { cache: "no-store" });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(
            data?.error ||
              translateOrFallback(
                "cloudflaredRequestFailed",
                "Failed to load Cloudflare tunnel status"
              )
          );
        }

        setCloudflaredStatus(data);
        return data as CloudflaredTunnelStatus;
      } catch (error) {
        if (!silent) {
          setCloudflaredNotice({
            type: "error",
            message:
              error instanceof Error
                ? error.message
                : translateOrFallback(
                    "cloudflaredRequestFailed",
                    "Failed to load Cloudflare tunnel status"
                  ),
          });
        }
        return null;
      }
    },
    [translateOrFallback]
  );

  const fetchTailscaleStatus = useCallback(
    async (silent = false) => {
      try {
        const res = await fetch("/api/tunnels/tailscale", { cache: "no-store" });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(
            data?.error ||
              translateOrFallback("tailscaleRequestFailed", "Failed to load Tailscale status")
          );
        }

        setTailscaleStatus(data);
        return data as TailscaleTunnelStatus;
      } catch (error) {
        if (!silent) {
          setTailscaleNotice({
            type: "error",
            message:
              error instanceof Error
                ? error.message
                : translateOrFallback("tailscaleRequestFailed", "Failed to load Tailscale status"),
          });
        }
        return null;
      }
    },
    [translateOrFallback]
  );

  const fetchNgrokStatus = useCallback(
    async (silent = false) => {
      try {
        const res = await fetch("/api/tunnels/ngrok", { cache: "no-store" });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(
            data?.error || translateOrFallback("ngrokRequestFailed", "Failed to load ngrok status")
          );
        }

        setNgrokStatus(data);
        return data as NgrokTunnelStatus;
      } catch (error) {
        if (!silent) {
          setNgrokNotice({
            type: "error",
            message:
              error instanceof Error
                ? error.message
                : translateOrFallback("ngrokRequestFailed", "Failed to load ngrok status"),
          });
        }
        return null;
      }
    },
    [translateOrFallback]
  );

  const fetchModels = async () => {
    setModelsLoading(true);
    try {
      const res = await fetch("/v1/models");
      if (res.ok) {
        const data = await res.json();
        setAllModels(data.data || []);
      }
    } catch (e) {
      console.log("Error fetching models:", e);
    } finally {
      setModelsLoading(false);
    }
  };

  const fetchProtocolStatus = async () => {
    try {
      const [mcpRes, a2aRes] = await Promise.allSettled([
        fetch("/api/mcp/status"),
        fetch("/api/a2a/status"),
      ]);

      if (mcpRes.status === "fulfilled" && mcpRes.value.ok) {
        setMcpStatus(await mcpRes.value.json());
      }
      if (a2aRes.status === "fulfilled" && a2aRes.value.ok) {
        setA2aStatus(await a2aRes.value.json());
      }
    } catch {
      // Ignore status failures; protocols panel has fallback text.
    }
  };

  // Categorize models by endpoint type
  // Filter out parent models (models with parent field set) to avoid showing duplicates
  const endpointData = useMemo(() => {
    const chat = allModels.filter((m) => !m.type && !m.parent);
    const embeddings = allModels.filter((m) => m.type === "embedding" && !m.parent);
    const images = allModels.filter((m) => m.type === "image" && !m.parent);
    const video = allModels.filter((m) => m.type === "video" && !m.parent);
    const rerank = allModels.filter((m) => m.type === "rerank" && !m.parent);
    const audioTranscription = allModels.filter(
      (m) => m.type === "audio" && m.subtype === "transcription" && !m.parent
    );
    const audioSpeech = allModels.filter(
      (m) => m.type === "audio" && m.subtype === "speech" && !m.parent
    );
    const moderation = allModels.filter((m) => m.type === "moderation" && !m.parent);
    const music = allModels.filter((m) => m.type === "music" && !m.parent);
    return {
      chat,
      embeddings,
      images,
      video,
      rerank,
      audioTranscription,
      audioSpeech,
      moderation,
      music,
    };
  }, [allModels]);

  const totalEndpointModelCount = useMemo(
    () => Object.values(endpointData).reduce((acc, models) => acc + models.length, 0),
    [endpointData]
  );

  const availableEndpointCount = useMemo(() => {
    const chatCount = endpointData.chat.length > 0 ? 4 : 0; // chat + responses + completions + messages
    const imageCount = endpointData.images.length > 0 ? 2 : 0; // image gen + image edits
    const otherMedia = [
      endpointData.embeddings,
      endpointData.audioTranscription,
      endpointData.audioSpeech,
      endpointData.music,
      endpointData.video,
    ].filter((m) => m.length > 0).length;
    const utilityFixed = 3; // batch + files + list models (always available)
    const modelUtility =
      (endpointData.rerank.length > 0 ? 1 : 0) + (endpointData.moderation.length > 0 ? 1 : 0);
    const searchCount = searchProviders.length > 0 ? 1 : 0;
    return chatCount + imageCount + otherMedia + utilityFixed + modelUtility + searchCount;
  }, [endpointData, searchProviders]);

  const postCloudAction = async (action, timeoutMs = CLOUD_ACTION_TIMEOUT_MS) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch("/api/sync/cloud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          ...(action === "enable" ? { acknowledgeCredentialUpload: acknowledgeCloudUpload } : {}),
        }),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => ({}));
      return { ok: res.ok, status: res.status, data };
    } catch (error) {
      if (error?.name === "AbortError") {
        return { ok: false, status: 408, data: { error: t("cloudRequestTimeout") } };
      }
      return { ok: false, status: 500, data: { error: error.message || t("cloudRequestFailed") } };
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const loadCloudSettings = async (
    shouldApplyState: () => boolean = () => true
  ): Promise<EndpointTunnelVisibility> => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        const tunnelVisibility = {
          showCloudflaredTunnel: data.hideEndpointCloudflaredTunnel !== true,
          showTailscaleFunnel: data.hideEndpointTailscaleFunnel !== true,
          showNgrokTunnel: data.hideEndpointNgrokTunnel !== true,
        };

        if (!shouldApplyState()) {
          return tunnelVisibility;
        }

        setCloudEnabled(data.cloudEnabled || false);
        if (typeof data.cloudConfigured === "boolean") {
          setCloudConfigured(data.cloudConfigured);
        }
        if (data.cloudUrl) {
          setCloudBaseUrl(data.cloudUrl);
        }
        if (data.machineId) {
          setResolvedMachineId(data.machineId);
        }
        setShowCloudflaredTunnel(tunnelVisibility.showCloudflaredTunnel);
        setShowTailscaleFunnel(tunnelVisibility.showTailscaleFunnel);
        setShowNgrokTunnel(tunnelVisibility.showNgrokTunnel);
        if (data.ngrokAuthToken) setNgrokToken(data.ngrokAuthToken);
        setCustomSystemPromptEnabled(!!data.customSystemPromptEnabled);
        setCustomSystemPrompt(data.customSystemPrompt || "");

        if (!tunnelVisibility.showCloudflaredTunnel) {
          setCloudflaredStatus(null);
          setCloudflaredNotice(null);
        }
        if (!tunnelVisibility.showTailscaleFunnel) {
          setTailscaleStatus(null);
          setTailscaleNotice(null);
        }
        if (!tunnelVisibility.showNgrokTunnel) {
          setNgrokStatus(null);
          setNgrokNotice(null);
        }

        return tunnelVisibility;
      }
    } catch (error) {
      console.log("Error loading cloud settings:", error);
    }

    return DEFAULT_TUNNEL_VISIBILITY;
  };

  useEffect(() => {
    let mounted = true;

    const loadPage = async () => {
      const tunnelVisibility = await loadCloudSettings(() => mounted);

      if (!mounted) return;
      setLoading(false);

      runEndpointBackgroundTask("models", fetchModels);
      runEndpointBackgroundTask("protocol-status", fetchProtocolStatus);
      runEndpointBackgroundTask("search-providers", fetchSearchProviders);
      runEndpointBackgroundTask("network-info", async () => {
        try {
          const res = await fetch("/api/network/info");
          if (res.ok) {
            const data = await res.json();
            if (mounted) {
              if (data.localUrl) setLocalApiUrl(data.localUrl);
              setLanUrls(data.lanUrls ?? []);
              if (data.tailscaleIpUrl) setTailscaleIpUrl(data.tailscaleIpUrl);
            }
          }
        } catch {
          // non-critical
        }
      });

      if (tunnelVisibility.showCloudflaredTunnel) {
        runEndpointBackgroundTask("cloudflared-status", () => fetchCloudflaredStatus(true));
      }
      if (tunnelVisibility.showTailscaleFunnel) {
        runEndpointBackgroundTask("tailscale-status", () => fetchTailscaleStatus(true));
      }
      if (tunnelVisibility.showNgrokTunnel) {
        runEndpointBackgroundTask("ngrok-status", () => fetchNgrokStatus(true));
      }
    };

    void loadPage();

    return () => {
      mounted = false;
    };
  }, [fetchCloudflaredStatus, fetchTailscaleStatus, fetchNgrokStatus]);

  const handleCustomSystemPromptEnabledChange = (value: boolean) => {
    setCustomSystemPromptEnabled(value);
    void fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customSystemPromptEnabled: value }),
    });
  };

  const handleCustomSystemPromptChange = (value: string) => {
    setCustomSystemPrompt(value);
    void fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customSystemPrompt: value }),
    });
  };

  const handleCloudToggle = (checked) => {
    if (checked) {
      if (!cloudConfigured) {
        setCloudStatus({
          type: "warning",
          message: translateOrFallback(
            "cloudSyncNotConfigured",
            "Cloud sync is not configured on this instance."
          ),
        });
        return;
      }
      setAcknowledgeCloudUpload(false);
      setShowCloudModal(true);
    } else {
      setShowDisableModal(true);
    }
  };

  // Auto-dismiss cloudStatus after 5s
  useEffect(() => {
    if (cloudStatus) {
      const timer = setTimeout(() => setCloudStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [cloudStatus]);

  useEffect(() => {
    if (cloudflaredNotice) {
      const timer = setTimeout(() => setCloudflaredNotice(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [cloudflaredNotice]);

  useEffect(() => {
    if (tailscaleNotice) {
      const timer = setTimeout(() => setTailscaleNotice(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [tailscaleNotice]);

  useEffect(() => {
    if (ngrokNotice) {
      const timer = setTimeout(() => setNgrokNotice(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [ngrokNotice]);

  useEffect(() => {
    const interval = setInterval(() => {
      void fetchProtocolStatus();
      if (showCloudflaredTunnel) {
        void fetchCloudflaredStatus(true);
      }
      if (showTailscaleFunnel) {
        void fetchTailscaleStatus(true);
      }
      if (showNgrokTunnel) {
        void fetchNgrokStatus(true);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [
    fetchCloudflaredStatus,
    fetchNgrokStatus,
    fetchTailscaleStatus,
    showCloudflaredTunnel,
    showNgrokTunnel,
    showTailscaleFunnel,
  ]);

  const dispatchCloudChange = () => {
    globalThis.dispatchEvent(new Event("cloud-status-changed"));
  };

  const handleEnableCloud = async () => {
    if (!acknowledgeCloudUpload || !cloudConfigured) return;
    setCloudSyncing(true);
    setModalSuccess(false);
    setSyncStep("syncing");
    try {
      const { ok, status, data } = await postCloudAction("enable");
      if (ok) {
        setSyncStep("verifying");

        // Brief delay so user sees the verifying step
        await new Promise((r) => setTimeout(r, 600));

        // Sync succeeded — mark as enabled regardless of verify result
        setCloudEnabled(true);
        setSyncStep("done");
        setModalSuccess(true);
        setCloudSyncing(false);
        dispatchCloudChange();

        // Show success in modal for a moment, then close
        await new Promise((r) => setTimeout(r, 1200));
        setShowCloudModal(false);
        setModalSuccess(false);

        if (data.verified) {
          setCloudStatus({ type: "success", message: t("cloudConnectedVerified") });
        } else {
          setCloudStatus({
            type: "warning",
            message: data.verifyError
              ? t("connectedVerificationPendingWithError", { error: data.verifyError })
              : t("connectedVerificationPending"),
          });
        }

        // Update cloud URL from API response (fixes undefined/v1 when env var not set)
        if (data.cloudUrl) {
          setCloudBaseUrl(data.cloudUrl);
        }
        // Reload settings to ensure fresh state
        await loadCloudSettings();
      } else {
        // Sync failed — provide a helpful error message
        let errorMessage = data.error || t("failedEnable");
        if (status === 502 || status === 408) {
          errorMessage = t("cloudWorkerUnreachable");
        }
        setCloudStatus({ type: "error", message: errorMessage });
        setShowCloudModal(false);
      }
    } catch (error) {
      setCloudStatus({ type: "error", message: error.message || t("connectionFailed") });
      setShowCloudModal(false);
    } finally {
      setCloudSyncing(false);
      setSyncStep("");
    }
  };

  const handleConfirmDisable = async () => {
    setCloudSyncing(true);
    setSyncStep("syncing");

    try {
      // Step 1: Sync latest data from cloud
      await postCloudAction("sync");

      setSyncStep("disabling");

      // Step 2: Disable cloud
      const { ok, data } = await postCloudAction("disable");

      if (ok) {
        setCloudEnabled(false);
        setCloudStatus({ type: "success", message: t("cloudDisabledSuccess") });
        setShowDisableModal(false);
        dispatchCloudChange();
        await loadCloudSettings();
      } else {
        setCloudStatus({ type: "error", message: data.error || t("failedDisable") });
      }
    } catch (error) {
      console.log("Error disabling cloud:", error);
      setCloudStatus({ type: "error", message: t("failedDisable") });
    } finally {
      setCloudSyncing(false);
      setSyncStep("");
    }
  };

  const handleCloudflaredAction = async (action: "enable" | "disable") => {
    setCloudflaredBusy(true);
    setCloudflaredNotice(null);

    try {
      const res = await fetch("/api/tunnels/cloudflared", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          extractApiErrorMessage(
            data,
            translateOrFallback("cloudflaredRequestFailed", "Failed to update Cloudflare tunnel")
          )
        );
      }

      if (data?.status) {
        setCloudflaredStatus(data.status);
      }

      setCloudflaredNotice({
        type: "success",
        message:
          action === "enable"
            ? translateOrFallback("cloudflaredStarted", "Cloudflare tunnel started")
            : translateOrFallback("cloudflaredStopped", "Cloudflare tunnel stopped"),
      });
    } catch (error) {
      setCloudflaredNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : translateOrFallback("cloudflaredRequestFailed", "Failed to update Cloudflare tunnel"),
      });
    } finally {
      setCloudflaredBusy(false);
      await fetchCloudflaredStatus(true);
    }
  };

  const handleNgrokAction = async (action: "enable" | "disable") => {
    setNgrokBusy(true);
    setNgrokNotice(null);

    try {
      const res = await fetch("/api/tunnels/ngrok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, authToken: action === "enable" ? ngrokToken : undefined }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.error || translateOrFallback("ngrokRequestFailed", "Failed to update ngrok tunnel")
        );
      }

      if (data?.status) {
        setNgrokStatus(data.status);
      }

      setNgrokNotice({
        type: "success",
        message:
          action === "enable"
            ? translateOrFallback("ngrokStarted", "ngrok tunnel started")
            : translateOrFallback("ngrokStopped", "ngrok tunnel stopped"),
      });
      if (action === "enable" && ngrokToken) {
        await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ngrokAuthToken: ngrokToken }),
        });
      }
    } catch (error) {
      setNgrokNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : translateOrFallback("ngrokRequestFailed", "Failed to update ngrok tunnel"),
      });
    } finally {
      setNgrokBusy(false);
      await fetchNgrokStatus(true);
    }
  };

  const waitForTailscale = useCallback(
    async (
      predicate: (status: TailscaleTunnelStatus) => boolean,
      attempts = 40,
      delayMs = 3000
    ) => {
      for (let attempt = 0; attempt < attempts; attempt += 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        const status = await fetchTailscaleStatus(true);
        if (status && predicate(status)) {
          return status;
        }
      }
      return null;
    },
    [fetchTailscaleStatus]
  );

  const requestTailscaleEnable = useCallback(async (payload: Record<string, unknown> = {}) => {
    const res = await fetch("/api/tunnels/tailscale/enable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return { res, data };
  }, []);

  const handleTailscaleEnable = useCallback(async () => {
    setTailscaleBusy(true);
    setTailscaleNotice(null);

    try {
      let { res, data } = await requestTailscaleEnable({
        sudoPassword: tailscalePassword || undefined,
      });
      if (!res.ok) {
        throw new Error(
          data?.error ||
            translateOrFallback("tailscaleEnableFailed", "Failed to enable Tailscale Funnel")
        );
      }

      if (data?.needsLogin && data?.authUrl) {
        window.open(data.authUrl, "tailscale_auth", "width=680,height=780");
        setTailscaleNotice({
          type: "info",
          message: translateOrFallback(
            "tailscaleWaitingForLogin",
            "Complete the Tailscale login in the opened browser tab. OmniRoute will retry automatically."
          ),
        });

        const loggedIn = await waitForTailscale((status) => status.loggedIn);
        if (!loggedIn) {
          throw new Error(
            translateOrFallback("tailscaleLoginTimedOut", "Timed out waiting for Tailscale login")
          );
        }

        ({ res, data } = await requestTailscaleEnable({
          sudoPassword: tailscalePassword || undefined,
        }));
        if (!res.ok) {
          throw new Error(
            data?.error ||
              translateOrFallback("tailscaleEnableFailed", "Failed to enable Tailscale Funnel")
          );
        }
      }

      if (data?.funnelNotEnabled && data?.enableUrl) {
        window.open(data.enableUrl, "tailscale_funnel", "width=680,height=780");
        setTailscaleNotice({
          type: "info",
          message: translateOrFallback(
            "tailscaleWaitingForFunnel",
            "Enable Funnel for this device in the opened browser tab. OmniRoute will keep polling."
          ),
        });

        let enabled = null;
        for (let attempt = 0; attempt < 40; attempt += 1) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          const next = await requestTailscaleEnable({
            sudoPassword: tailscalePassword || undefined,
          });
          if (!next.res.ok) {
            throw new Error(
              next.data?.error ||
                translateOrFallback("tailscaleEnableFailed", "Failed to enable Tailscale Funnel")
            );
          }
          if (next.data?.success) {
            enabled = next;
            break;
          }
          if (!next.data?.funnelNotEnabled) {
            enabled = next;
            break;
          }
        }

        if (!enabled?.data?.success) {
          throw new Error(
            translateOrFallback(
              "tailscaleFunnelTimedOut",
              "Timed out waiting for Tailscale Funnel to be enabled"
            )
          );
        }

        data = enabled.data;
      }

      if (!data?.success) {
        throw new Error(
          data?.error ||
            translateOrFallback("tailscaleEnableFailed", "Failed to enable Tailscale Funnel")
        );
      }

      if (data?.status) {
        setTailscaleStatus(data.status);
      }
      setTailscaleNotice({
        type: "success",
        message: translateOrFallback("tailscaleStarted", "Tailscale Funnel enabled"),
      });
    } catch (error) {
      setTailscaleNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : translateOrFallback("tailscaleEnableFailed", "Failed to enable Tailscale Funnel"),
      });
    } finally {
      setTailscaleBusy(false);
      await fetchTailscaleStatus(true);
    }
  }, [
    fetchTailscaleStatus,
    requestTailscaleEnable,
    tailscalePassword,
    translateOrFallback,
    waitForTailscale,
  ]);

  const handleTailscaleDisable = useCallback(async () => {
    setTailscaleBusy(true);
    setTailscaleNotice(null);

    try {
      const res = await fetch("/api/tunnels/tailscale/disable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sudoPassword: tailscalePassword || undefined }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.error ||
            translateOrFallback("tailscaleDisableFailed", "Failed to disable Tailscale Funnel")
        );
      }

      if (data?.status) {
        setTailscaleStatus(data.status);
      }
      setTailscaleNotice({
        type: "success",
        message: translateOrFallback("tailscaleStopped", "Tailscale Funnel disabled"),
      });
    } catch (error) {
      setTailscaleNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : translateOrFallback("tailscaleDisableFailed", "Failed to disable Tailscale Funnel"),
      });
    } finally {
      setTailscaleBusy(false);
      await fetchTailscaleStatus(true);
    }
  }, [fetchTailscaleStatus, tailscalePassword, translateOrFallback]);

  const handleTailscaleInstall = useCallback(async () => {
    setTailscaleInstallBusy(true);
    setTailscaleInstallLog([]);
    setTailscaleNotice(null);

    try {
      const res = await fetch("/api/tunnels/tailscale/install", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sudoPassword: tailscalePassword || undefined }),
      });

      if (!res.body) {
        throw new Error(
          translateOrFallback("tailscaleInstallFailed", "Failed to install Tailscale")
        );
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let installSucceeded = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";

        for (const part of parts) {
          const lines = part.split("\n");
          let eventName = "progress";
          let payload: Record<string, unknown> | null = null;

          for (const line of lines) {
            if (line.startsWith("event: ")) {
              eventName = line.slice(7).trim();
            } else if (line.startsWith("data: ")) {
              payload = JSON.parse(line.slice(6));
            }
          }

          if (!payload) continue;

          if (eventName === "progress") {
            const message =
              typeof payload.message === "string"
                ? payload.message
                : translateOrFallback("tailscaleInstallProgress", "Working...");
            setTailscaleInstallLog((current) => [...current.slice(-79), message]);
          } else if (eventName === "done") {
            installSucceeded = true;
            if (payload.status) {
              setTailscaleStatus(payload.status as TailscaleTunnelStatus);
            }
          } else if (eventName === "error") {
            throw new Error(
              typeof payload.error === "string"
                ? payload.error
                : translateOrFallback("tailscaleInstallFailed", "Failed to install Tailscale")
            );
          }
        }
      }

      if (!installSucceeded) {
        throw new Error(
          translateOrFallback("tailscaleInstallFailed", "Failed to install Tailscale")
        );
      }

      setShowTailscaleInstallModal(false);
      setTailscalePassword("");
      setTailscaleNotice({
        type: "success",
        message: translateOrFallback("tailscaleInstalled", "Tailscale installed successfully"),
      });
      await fetchTailscaleStatus(true);
      await handleTailscaleEnable();
    } catch (error) {
      setTailscaleNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : translateOrFallback("tailscaleInstallFailed", "Failed to install Tailscale"),
      });
    } finally {
      setTailscaleInstallBusy(false);
    }
  }, [fetchTailscaleStatus, handleTailscaleEnable, tailscalePassword, translateOrFallback]);

  const displayBaseUrl = useDisplayBaseUrl();
  const displayApiUrl = `${displayBaseUrl}/v1`;
  const publicDisplayApiUrl = isPublicDisplayBaseUrl(displayBaseUrl) ? displayApiUrl : null;
  const normalizedCloudBaseUrl = cloudBaseUrl
    ? resolvedMachineId && !cloudBaseUrl.endsWith(`/${resolvedMachineId}`)
      ? `${cloudBaseUrl}/${resolvedMachineId}`
      : cloudBaseUrl
    : null;
  const cloudEndpointNew = normalizedCloudBaseUrl ? `${normalizedCloudBaseUrl}/v1` : null;

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  const activeTunnelUrls = [
    ...(publicDisplayApiUrl
      ? [{ label: t("tierPublic"), url: publicDisplayApiUrl, key: "active_public" }]
      : []),
    ...(cloudflaredStatus?.running && cloudflaredStatus.apiUrl
      ? [{ label: "Cloudflare", url: cloudflaredStatus.apiUrl, key: "active_cf" }]
      : []),
    ...(tailscaleStatus?.running && (tailscaleStatus.apiUrl ?? tailscaleStatus.tunnelUrl)
      ? [
          {
            label: "Tailscale",
            url: tailscaleStatus.apiUrl ?? tailscaleStatus.tunnelUrl ?? "",
            key: "active_ts",
          },
        ]
      : []),
    ...(ngrokStatus?.running && ngrokStatus.apiUrl
      ? [{ label: "ngrok", url: ngrokStatus.apiUrl, key: "active_ngrok" }]
      : []),
  ];
  const preferredTunnelUrl = activeTunnelUrls[0]?.url ?? null;
  const currentEndpoint =
    preferredTunnelUrl ??
    (cloudEnabled && cloudEndpointNew ? cloudEndpointNew : null) ??
    displayApiUrl;
  const activeUrls = [
    ...activeTunnelUrls,
    ...(cloudEnabled && cloudEndpointNew
      ? [{ label: t("activeCloud"), url: cloudEndpointNew, key: "active_cloud" }]
      : []),
    { label: t("activeLocal"), url: localApiUrl, key: "active_local" },
  ].filter(
    (candidate, index, candidates) =>
      candidates.findIndex((other) => other.url === candidate.url) === index
  );
  const visibleTunnelCount = [showCloudflaredTunnel, showTailscaleFunnel, showNgrokTunnel].filter(
    Boolean
  ).length;
  const activeTunnelCount = [
    showCloudflaredTunnel && cloudflaredStatus?.running,
    showTailscaleFunnel && tailscaleStatus?.running,
    showNgrokTunnel && ngrokStatus?.running,
  ].filter(Boolean).length;

  const cloudflaredPhase = cloudflaredStatus?.phase || "not_installed";
  const cloudflaredPhaseMeta: Record<CloudflaredTunnelPhase, { label: string; className: string }> =
    {
      running: {
        label: translateOrFallback("cloudflaredRunning", "Running"),
        className: "bg-success/10 border-success/30 text-success",
      },
      starting: {
        label: translateOrFallback("cloudflaredStarting", "Starting"),
        className: "bg-info/10 border-info/30 text-info",
      },
      stopped: {
        label: translateOrFallback("cloudflaredStoppedState", "Stopped"),
        className: "bg-surface border-border/70 text-text-muted",
      },
      not_installed: {
        label: translateOrFallback("cloudflaredNotInstalled", "Not installed"),
        className: "bg-surface border-border/70 text-text-muted",
      },
      unsupported: {
        label: translateOrFallback("cloudflaredUnsupported", "Unsupported"),
        className: "bg-warning/10 border-warning/30 text-warning",
      },
      error: {
        label: translateOrFallback("cloudflaredError", "Error"),
        className: "bg-error/10 border-error/30 text-error",
      },
    };
  const cloudflaredActionLabel = cloudflaredStatus?.running
    ? translateOrFallback("cloudflaredDisable", "Stop Tunnel")
    : cloudflaredStatus?.installed
      ? translateOrFallback("cloudflaredEnable", "Enable Tunnel")
      : translateOrFallback("cloudflaredInstallAndEnable", "Install & Enable");
  const tailscalePhase = tailscaleStatus?.phase || "not_installed";
  const tailscalePhaseMeta: Record<TailscaleTunnelPhase, { label: string; className: string }> = {
    running: {
      label: translateOrFallback("tailscaleRunning", "Running"),
      className: "bg-success/10 border-success/30 text-success",
    },
    needs_login: {
      label: translateOrFallback("tailscaleNeedsLogin", "Needs Login"),
      className: "bg-info/10 border-info/30 text-info",
    },
    stopped: {
      label: translateOrFallback("tailscaleStoppedState", "Stopped"),
      className: "bg-surface border-border/70 text-text-muted",
    },
    not_installed: {
      label: translateOrFallback("tailscaleNotInstalled", "Not installed"),
      className: "bg-surface border-border/70 text-text-muted",
    },
    unsupported: {
      label: translateOrFallback("tailscaleUnsupported", "Unsupported"),
      className: "bg-warning/10 border-warning/30 text-warning",
    },
    error: {
      label: translateOrFallback("tailscaleError", "Error"),
      className: "bg-error/10 border-error/30 text-error",
    },
  };
  const tailscaleActionLabel = tailscaleStatus?.running
    ? translateOrFallback("tailscaleDisable", "Stop Funnel")
    : tailscaleStatus?.installed
      ? tailscaleStatus?.loggedIn
        ? translateOrFallback("tailscaleEnable", "Enable Funnel")
        : translateOrFallback("tailscaleLoginAndEnable", "Login & Enable")
      : translateOrFallback("tailscaleInstallAndEnable", "Install & Enable");
  const tailscaleUrlNotice = translateOrFallback(
    "tailscaleUrlNotice",
    "Uses your Tailscale .ts.net address. Login and Funnel approval may be required on first use."
  );

  const ngrokPhase = ngrokStatus?.phase || "not_installed";
  const ngrokPhaseMeta: Record<NgrokTunnelPhase, { label: string; className: string }> = {
    running: {
      label: translateOrFallback("ngrokRunning", "Running"),
      className: "bg-success/10 border-success/30 text-success",
    },
    starting: {
      label: translateOrFallback("ngrokStarting", "Starting"),
      className: "bg-info/10 border-info/30 text-info",
    },
    stopped: {
      label: translateOrFallback("ngrokStoppedState", "Stopped"),
      className: "bg-surface border-border/70 text-text-muted",
    },
    needs_auth: {
      label: translateOrFallback("ngrokNeedsAuth", "Needs Auth"),
      className: "bg-warning/10 border-warning/30 text-warning",
    },
    not_installed: {
      label: translateOrFallback("ngrokNotInstalled", "Not installed"),
      className: "bg-surface border-border/70 text-text-muted",
    },
    unsupported: {
      label: translateOrFallback("ngrokUnsupported", "Unsupported"),
      className: "bg-warning/10 border-warning/30 text-warning",
    },
    error: {
      label: translateOrFallback("ngrokError", "Error"),
      className: "bg-error/10 border-error/30 text-error",
    },
  };
  const ngrokActionLabel = ngrokStatus?.running
    ? translateOrFallback("ngrokDisable", "Stop Tunnel")
    : translateOrFallback("ngrokEnable", "Enable Tunnel");
  const ngrokUrlNotice = translateOrFallback("ngrokUrlNotice", "Creates a public ngrok tunnel.");

  return (
    <div className="flex flex-col gap-8">
      {/* Guided connection header (#11228): /v1 URL + test action lead; advanced protocols demoted */}
      <div className="flex flex-col gap-2">
        <PageHeader compact title={t("title")} description={t("subtitle")} />
        <div className="flex items-center gap-3 mt-2">
          <code className="text-sm bg-card-subtle px-3 py-1 rounded-md text-text-main font-mono">
            {displayBaseUrl}/v1
          </code>
          <a href="#test" className="text-sm text-action font-medium hover:underline">
            {t("testEndpoint")}
          </a>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span>{t("advancedProtocols")}</span>
        </div>
      </div>
      <SegmentedControl
        options={ENDPOINT_TABS.map((tab) => ({ ...tab, label: t(tab.labelKey) }))}
        value={activeEndpointTab}
        onChange={(value) => setActiveEndpointTab(value as EndpointTab)}
        aria-label={t("endpointSections")}
        className="w-fit"
      />

      {activeEndpointTab === "mcp" ? <McpDashboardPage /> : null}
      {activeEndpointTab === "a2a" ? <A2ADashboardPage /> : null}
      {activeEndpointTab === "context-sources" ? (
        <div className="flex flex-col gap-4">
          <NotionSourceCard />
          <ObsidianSourceCard />
        </div>
      ) : null}

      {/* Endpoint Card */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">{t("title")}</h2>

        {/* Cloud Status Toast */}
        {cloudStatus && (
          <Alert
            variant={
              cloudStatus.type === "success"
                ? "success"
                : cloudStatus.type === "warning"
                  ? "warning"
                  : "critical"
            }
            className="mb-4 animate-in fade-in slide-in-from-top-2 duration-300"
            icon={
              <Icon
                name={
                  cloudStatus.type === "success"
                    ? "check_circle"
                    : cloudStatus.type === "warning"
                      ? "warning"
                      : "error"
                }
                size={18}
              />
            }
            description={cloudStatus.message}
            dismissLabel={tc("close")}
            onDismiss={() => setCloudStatus(null)}
          />
        )}

        {/* Active URLs bar */}
        {activeUrls.length > 0 && (
          <div className="mb-4 rounded-lg border border-primary/20 bg-primary/5 p-3">
            <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-2">
              {t("activeEndpoints")}
            </p>
            <div className="flex flex-col gap-1.5">
              {activeUrls.map(({ label, url, key }) => (
                <div key={key} className="flex items-center gap-2 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                  <span className="text-xs text-text-muted w-20 shrink-0">{label}</span>
                  <code className="text-xs font-mono text-text-main flex-1 truncate min-w-0">
                    {url}
                  </code>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => void copy(url, key)}
                    className="shrink-0 text-text-muted"
                    aria-label={`${tc("copy")} ${label}`}
                    title={url}
                    icon={copied === key ? "check" : "content_copy"}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connection rows */}
        <div className="flex flex-col">
          {/* Local Server */}
          <div className="flex items-center gap-3 py-3">
            <Icon name="computer" size={18} className="text-success" />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1 flex-wrap">
                <span className="text-sm font-medium">{t("localServer")}</span>
                {resolvedMachineId && (
                  <span className="text-xs text-text-muted">· {resolvedMachineId.slice(0, 8)}</span>
                )}
                {lanUrls.map((url) => (
                  <Button
                    key={url}
                    variant="ghost"
                    size="sm"
                    onClick={() => void copy(url, `lan_${url}`)}
                    title={t("copyUrlTitle", { url })}
                    aria-label={t("copyUrlTitle", { url })}
                    className="h-auto min-h-0 gap-0.5 px-1 py-0 text-[10px] font-normal text-text-muted"
                  >
                    <code className="font-mono">{url.replace(/^https?:\/\//, "")}</code>
                    <Icon
                      name={copied === `lan_${url}` ? "check" : "content_copy"}
                      size={10}
                      className="opacity-60"
                    />
                  </Button>
                ))}
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 border border-success/30 text-success shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              {t("statusRunning")}
            </span>
            <Button
              variant="outline"
              size="sm"
              icon={copied === "endpoint_url" ? "check" : "content_copy"}
              onClick={() => void copy(localApiUrl, "endpoint_url")}
              className="shrink-0 text-text-muted"
            >
              {copied === "endpoint_url" ? tc("copied") : tc("copy")}
            </Button>
          </div>

          {/* Tunnels section header */}
          <div className="flex items-center gap-2 pt-4 pb-1 border-t border-border/50">
            <Icon name="network_node" size={14} className="text-text-muted" />
            <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
              {t("tunnels")}
            </span>
            <div className="flex-1 h-px bg-border/50" />
            <span className="text-[10px] text-text-muted">
              {t("activeTunnelCount", {
                active: activeTunnelCount,
                total: visibleTunnelCount,
              })}
            </span>
          </div>

          {/* Cloud OmniRoute — wraps below sm: the text block keeps a minimum width so the
              status pill and the action move to the next line instead of squeezing it; only
              the URL may break anywhere ("Cloud sync d|estination" at 390 px, F4). */}
          <div className="flex flex-wrap items-center gap-3 py-3">
            <Icon name="cloud" size={18} className="text-info" />
            <div className="flex-1 min-w-[12rem]">
              <span className="text-sm font-medium">{t("cloudOmniroute")}</span>
              <p
                className="text-xs text-text-muted break-words"
                data-testid="cloud-sync-destination"
              >
                {translateOrFallback(
                  "cloudUploadDestination",
                  "Cloud sync destination (not local backups):"
                )}{" "}
                {/* break-all only for a URL: the "Not configured" fallback is words (review I-1). */}
                <span className={cloudBaseUrl ? "break-all" : undefined}>
                  {cloudBaseUrl || tc("notConfigured")}
                </span>
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 ${
                cloudEnabled
                  ? "bg-success/10 border-success/30 text-success"
                  : "bg-surface border-border/70 text-text-muted"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${cloudEnabled ? "bg-success animate-pulse" : "bg-text-muted"}`}
              />
              {cloudEnabled ? tc("active") : tc("disabled")}
            </span>
            {cloudEnabled ? (
              <Button
                size="sm"
                variant="secondary"
                icon="cloud_off"
                onClick={() => handleCloudToggle(false)}
                disabled={cloudSyncing}
                className="shrink-0 border-error/30 text-error hover:bg-error/10"
              >
                {t("disableCloud")}
              </Button>
            ) : cloudConfigured ? (
              <Button
                size="sm"
                variant="primary"
                icon="cloud_upload"
                onClick={() => handleCloudToggle(true)}
                disabled={cloudSyncing}
                className="shrink-0"
              >
                {t("enableCloud")}
              </Button>
            ) : (
              <span className="text-xs text-text-muted shrink-0 px-2 py-1 rounded border border-border/70 bg-surface">
                {tc("notConfigured")}
              </span>
            )}
          </div>

          {/* Cloudflare Quick Tunnel */}
          {showCloudflaredTunnel && (
            <div className="border-t border-border/30">
              <div className="flex items-center gap-3 py-3">
                <Icon name="cloud_queue" size={18} className="text-warning" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium">
                    {translateOrFallback("cloudflaredTitle", "Cloudflare Quick Tunnel")}
                  </span>
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium shrink-0 ${cloudflaredPhaseMeta[cloudflaredPhase].className}`}
                >
                  {cloudflaredPhaseMeta[cloudflaredPhase].label}
                </span>
                {cloudflaredStatus?.supported !== false && (
                  <Button
                    size="sm"
                    variant={cloudflaredStatus?.running ? "outline" : "primary"}
                    icon={cloudflaredStatus?.running ? "cloud_off" : "cloud_upload"}
                    loading={cloudflaredBusy}
                    onClick={() => {
                      void handleCloudflaredAction(
                        cloudflaredStatus?.running ? "disable" : "enable"
                      );
                    }}
                    className="shrink-0"
                  >
                    {cloudflaredActionLabel}
                  </Button>
                )}
              </div>
              {cloudflaredNotice && (
                <Alert
                  variant={
                    cloudflaredNotice.type === "success"
                      ? "success"
                      : cloudflaredNotice.type === "info"
                        ? "info"
                        : "critical"
                  }
                  className="mb-2 ml-7"
                  icon={
                    <Icon
                      name={
                        cloudflaredNotice.type === "success"
                          ? "check_circle"
                          : cloudflaredNotice.type === "info"
                            ? "info"
                            : "error"
                      }
                      size={18}
                    />
                  }
                  description={cloudflaredNotice.message}
                  dismissLabel={tc("close")}
                  onDismiss={() => setCloudflaredNotice(null)}
                />
              )}
              {cloudflaredStatus?.lastError && (
                <p className="mb-2 ml-7 text-xs text-error">
                  {translateOrFallback("cloudflaredLastError", "Last error: {error}", {
                    error: cloudflaredStatus.lastError,
                  })}
                </p>
              )}
            </div>
          )}

          {/* Tailscale Funnel */}
          {showTailscaleFunnel && (
            <div className={showCloudflaredTunnel ? "border-t border-border/30" : ""}>
              <div
                role="button"
                tabIndex={0}
                className="w-full flex items-center gap-3 py-3 hover:bg-surface/40 transition-colors rounded -mx-1 px-1 text-left cursor-pointer"
                onClick={() => setExpandedTunnel(expandedTunnel === "ts" ? null : "ts")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedTunnel(expandedTunnel === "ts" ? null : "ts");
                  }
                }}
              >
                <Icon name="vpn_lock" size={18} className="text-chart-3" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <span className="text-sm font-medium">
                      {translateOrFallback("tailscaleTitle", "Tailscale Funnel")}
                    </span>
                    {tailscaleIpUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          void copy(tailscaleIpUrl, "tailscale_ip_inline");
                        }}
                        title={`${tc("copy")} ${tailscaleIpUrl}`}
                        aria-label={`${tc("copy")} ${tailscaleIpUrl}`}
                        className="h-auto min-h-0 gap-0.5 px-1 py-0 text-[10px] font-normal text-text-muted"
                      >
                        <code className="font-mono">
                          {tailscaleIpUrl.replace(/^https?:\/\//, "")}
                        </code>
                        <Icon
                          name={copied === "tailscale_ip_inline" ? "check" : "content_copy"}
                          size={10}
                          className="opacity-60"
                        />
                      </Button>
                    )}
                  </div>
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium shrink-0 ${tailscalePhaseMeta[tailscalePhase].className}`}
                >
                  {tailscalePhaseMeta[tailscalePhase].label}
                </span>
                {tailscaleStatus?.supported !== false && (
                  <Button
                    size="sm"
                    variant={tailscaleStatus?.running ? "outline" : "primary"}
                    icon={tailscaleStatus?.running ? "vpn_key_off" : "vpn_lock"}
                    loading={tailscaleBusy}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (tailscaleStatus?.running) {
                        void handleTailscaleDisable();
                      } else if (tailscaleStatus?.installed) {
                        void handleTailscaleEnable();
                      } else {
                        setShowTailscaleInstallModal(true);
                      }
                    }}
                    className="shrink-0"
                  >
                    {tailscaleActionLabel}
                  </Button>
                )}
                <Icon
                  name="expand_more"
                  size={18}
                  className={cn(
                    "text-text-muted shrink-0 transition-transform duration-200",
                    expandedTunnel === "ts" && "rotate-180"
                  )}
                />
              </div>
              {expandedTunnel === "ts" && (
                <div className="pb-3 pl-7 pr-1 flex flex-col gap-2">
                  {tailscaleNotice && (
                    <Alert
                      variant={
                        tailscaleNotice.type === "success"
                          ? "success"
                          : tailscaleNotice.type === "info"
                            ? "info"
                            : "critical"
                      }
                      icon={
                        <Icon
                          name={
                            tailscaleNotice.type === "success"
                              ? "check_circle"
                              : tailscaleNotice.type === "info"
                                ? "info"
                                : "error"
                          }
                          size={18}
                        />
                      }
                      description={tailscaleNotice.message}
                      dismissLabel={tc("close")}
                      onDismiss={() => setTailscaleNotice(null)}
                    />
                  )}
                  <p className="text-xs text-text-muted">{tailscaleUrlNotice}</p>
                  {tailscaleStatus?.phase === "needs_login" && (
                    <p className="text-xs text-info">
                      {translateOrFallback(
                        "tailscaleNeedsLoginHint",
                        "Authenticate this machine with Tailscale, then enable Funnel."
                      )}
                    </p>
                  )}
                  {tailscaleStatus?.installed && tailscaleStatus?.platform !== "win32" && (
                    <div className="flex flex-col gap-1">
                      <Input
                        label={translateOrFallback(
                          "tailscaleSudoLabel",
                          "Sudo Password (required on macOS/Linux)"
                        )}
                        type="password"
                        value={tailscalePassword}
                        onChange={(event) => setTailscalePassword(event.target.value)}
                        placeholder={translateOrFallback(
                          "tailscaleSudoPlaceholder",
                          "Optional sudo password"
                        )}
                        disabled={tailscaleBusy}
                        className="font-mono text-sm"
                      />
                    </div>
                  )}
                  {tailscaleStatus?.binaryPath && (
                    <p className="text-xs text-text-muted">
                      {translateOrFallback("tailscaleBinaryPath", "Binary: {path}", {
                        path: tailscaleStatus.binaryPath,
                      })}
                    </p>
                  )}
                  {tailscaleStatus?.lastError && (
                    <p className="text-xs text-error">
                      {translateOrFallback("tailscaleLastError", "Last error: {error}", {
                        error: tailscaleStatus.lastError,
                      })}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ngrok Tunnel */}
          {showNgrokTunnel && (
            <div
              className={
                showCloudflaredTunnel || showTailscaleFunnel ? "border-t border-border/30" : ""
              }
            >
              <div
                role="button"
                tabIndex={0}
                className="w-full flex items-center gap-3 py-3 hover:bg-surface/40 transition-colors rounded -mx-1 px-1 text-left cursor-pointer"
                onClick={() => setExpandedTunnel(expandedTunnel === "ngrok" ? null : "ngrok")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedTunnel(expandedTunnel === "ngrok" ? null : "ngrok");
                  }
                }}
              >
                <Icon name="public" size={18} className="text-chart-3" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium">
                    {translateOrFallback("ngrokTitle", "ngrok Tunnel")}
                  </span>
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium shrink-0 ${ngrokPhaseMeta[ngrokPhase].className}`}
                >
                  {ngrokPhaseMeta[ngrokPhase].label}
                </span>
                {ngrokStatus?.supported !== false && (
                  <Button
                    size="sm"
                    variant={ngrokStatus?.running ? "outline" : "primary"}
                    icon={ngrokStatus?.running ? "public_off" : "public"}
                    loading={ngrokBusy}
                    onClick={(e) => {
                      e.stopPropagation();
                      void handleNgrokAction(ngrokStatus?.running ? "disable" : "enable");
                    }}
                    className="shrink-0"
                  >
                    {ngrokActionLabel}
                  </Button>
                )}
                <Icon
                  name="expand_more"
                  size={18}
                  className={cn(
                    "text-text-muted shrink-0 transition-transform duration-200",
                    expandedTunnel === "ngrok" && "rotate-180"
                  )}
                />
              </div>
              {expandedTunnel === "ngrok" && (
                <div className="pb-3 pl-7 pr-1 flex flex-col gap-2">
                  {ngrokNotice && (
                    <Alert
                      variant={
                        ngrokNotice.type === "success"
                          ? "success"
                          : ngrokNotice.type === "info"
                            ? "info"
                            : "critical"
                      }
                      icon={
                        <Icon
                          name={
                            ngrokNotice.type === "success"
                              ? "check_circle"
                              : ngrokNotice.type === "info"
                                ? "info"
                                : "error"
                          }
                          size={18}
                        />
                      }
                      description={ngrokNotice.message}
                      dismissLabel={tc("close")}
                      onDismiss={() => setNgrokNotice(null)}
                    />
                  )}
                  <p className="text-xs text-text-muted">{ngrokUrlNotice}</p>
                  {ngrokStatus?.phase === "needs_auth" && (
                    <div className="flex flex-col gap-1">
                      <Input
                        label={translateOrFallback(
                          "ngrokAuthTokenLabel",
                          "Authtoken (Required if NGROK_AUTHTOKEN not set in environment)"
                        )}
                        type="password"
                        value={ngrokToken}
                        onChange={(event) => setNgrokToken(event.target.value)}
                        placeholder={translateOrFallback(
                          "ngrokAuthTokenPlaceholder",
                          "Enter your ngrok authtoken"
                        )}
                        disabled={ngrokBusy}
                        className="font-mono text-sm"
                      />
                    </div>
                  )}
                  {ngrokStatus?.lastError && (
                    <p className="text-xs text-error">
                      {translateOrFallback("ngrokLastError", "Last error: {error}", {
                        error: ngrokStatus.lastError,
                      })}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Custom System Prompt */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-border gap-4 flex-wrap">
          <div className="min-w-0 flex-1">
            <p className="font-medium text-sm">{t("customSystemPromptTitle")}</p>
            <p className="text-sm text-text-muted">{t("customSystemPromptDescription")}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {customSystemPromptEnabled && (
              <Input
                type="text"
                value={customSystemPrompt}
                onChange={(e) => handleCustomSystemPromptChange(e.target.value)}
                placeholder={t("customSystemPromptPlaceholder")}
                className="w-64 text-xs"
              />
            )}
            <Toggle
              checked={customSystemPromptEnabled}
              onChange={handleCustomSystemPromptEnabledChange}
              ariaLabel={t("customSystemPromptTitle")}
              size="sm"
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold">{t("available")}</h2>
            <p className="text-sm text-text-muted">
              {modelsLoading
                ? translateOrFallback("loadingModels", "Loading available models...")
                : t("modelsAcrossEndpoints", {
                    models: totalEndpointModelCount,
                    endpoints: availableEndpointCount,
                  })}
            </p>
          </div>
        </div>

        {/* Core APIs */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="hub" className="text-sm text-primary" />
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              {t("categoryCore")}
            </h3>
            <div className="flex-1 h-px bg-border/50" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            <EndpointCard
              icon="chat"
              iconColor="text-info"
              iconBg="bg-info/10"
              title={t("chatCompletions")}
              path="/v1/chat/completions"
              models={endpointData.chat}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="code"
              iconColor="text-chart-3"
              iconBg="bg-chart-3/10"
              title={t("responses")}
              path="/v1/responses"
              models={endpointData.chat}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="text_fields"
              iconColor="text-warning"
              iconBg="bg-warning/10"
              title={t("completionsLegacy")}
              path="/v1/completions"
              models={endpointData.chat}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="psychology"
              iconColor="text-chart-3"
              iconBg="bg-chart-3/10"
              title={t("messagesApi")}
              path="/v1/messages"
              models={null}
              badge="Anthropic"
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
            />
          </div>
        </div>

        {/* Media & Multi-Modal */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="perm_media" className="text-sm text-chart-3" />
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              {t("categoryMedia")}
            </h3>
            <div className="flex-1 h-px bg-border/50" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            <EndpointCard
              icon="data_array"
              iconColor="text-success"
              iconBg="bg-success/10"
              title={t("embeddings")}
              path="/v1/embeddings"
              models={endpointData.embeddings}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="image"
              iconColor="text-chart-3"
              iconBg="bg-chart-3/10"
              title={t("imageGeneration")}
              path="/v1/images/generations"
              models={endpointData.images}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="edit_square"
              iconColor="text-chart-3"
              iconBg="bg-chart-3/10"
              title={t("imageEdits")}
              path="/v1/images/edits"
              models={endpointData.images}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="mic"
              iconColor="text-error"
              iconBg="bg-error/10"
              title={t("audioTranscription")}
              path="/v1/audio/transcriptions"
              models={endpointData.audioTranscription}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="record_voice_over"
              iconColor="text-info"
              iconBg="bg-info/10"
              title={t("textToSpeech")}
              path="/v1/audio/speech"
              models={endpointData.audioSpeech}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="music_note"
              iconColor="text-chart-3"
              iconBg="bg-chart-3/10"
              title={t("musicGeneration")}
              path="/v1/music/generations"
              models={endpointData.music}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="videocam"
              iconColor="text-error"
              iconBg="bg-error/10"
              title={t("videoGeneration")}
              path="/v1/videos/generations"
              models={endpointData.video}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
          </div>
        </div>

        {/* Search & Discovery */}
        {searchProviders.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="travel_explore" className="text-sm text-info" />
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                {t("categorySearch")}
              </h3>
              <div className="flex-1 h-px bg-border/50" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              <EndpointCard
                icon="search"
                iconColor="text-info"
                iconBg="bg-info/10"
                title={t("webSearch")}
                path="/v1/search"
                models={searchProviders.map((p) => ({ id: p.id, owned_by: p.id, type: "search" }))}
                copy={copy}
                copied={copied}
                baseUrl={currentEndpoint}
              />
            </div>
          </div>
        )}

        {/* Utility & Management */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Icon name="build" className="text-sm text-warning" />
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              {t("categoryUtility")}
            </h3>
            <div className="flex-1 h-px bg-border/50" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            <EndpointCard
              icon="sort"
              iconColor="text-warning"
              iconBg="bg-warning/10"
              title={t("rerank")}
              path="/v1/rerank"
              models={endpointData.rerank}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="shield"
              iconColor="text-warning"
              iconBg="bg-warning/10"
              title={t("moderations")}
              path="/v1/moderations"
              models={endpointData.moderation}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
              modelsLoading={modelsLoading}
            />
            <EndpointCard
              icon="view_list"
              iconColor="text-chart-4"
              iconBg="bg-chart-4/10"
              title={t("batchApi")}
              path="/v1/batches"
              models={null}
              badge="OpenAI"
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
            />
            <EndpointCard
              icon="folder"
              iconColor="text-warning"
              iconBg="bg-warning/10"
              title={t("filesApi")}
              path="/v1/files"
              models={null}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
            />
            <EndpointCard
              icon="list"
              iconColor="text-chart-4"
              iconBg="bg-chart-4/10"
              title={t("listModels")}
              path="/v1/models"
              models={allModels}
              modelsLoading={modelsLoading}
              copy={copy}
              copied={copied}
              baseUrl={currentEndpoint}
            />
          </div>

          <VscodeTokenAliasCard className="mt-4" />
        </div>
      </Card>

      {/* Cloud Enable Modal */}
      <Modal
        isOpen={showCloudModal}
        title={t("enableCloudTitle")}
        onClose={() => setShowCloudModal(false)}
      >
        <div className="flex flex-col gap-4">
          <div className="bg-info-bg border border-info/30 rounded-lg p-4">
            <p className="text-sm text-info font-medium mb-2">{t("whatYouGet")}</p>
            <ul className="text-sm text-info space-y-1">
              <li>• {t("cloudBenefitAccess")}</li>
              <li>• {t("cloudBenefitShare")}</li>
              <li>• {t("cloudBenefitPorts")}</li>
              <li>• {t("cloudBenefitEdge")}</li>
            </ul>
          </div>

          <div className="bg-warning-bg border border-warning/30 rounded-lg p-4">
            <p className="text-sm text-warning font-medium mb-1">{tc("note")}</p>
            <ul className="text-sm text-warning space-y-1">
              <li>• {t("cloudSessionNote")}</li>
              <li>• {t("cloudUnstableNote")}</li>
            </ul>
          </div>

          <div className="rounded-lg border border-error/40 bg-error/10 p-4">
            <p className={cloudBaseUrl ? "text-sm break-all" : "text-sm"}>
              {cloudBaseUrl || tc("notConfigured")}
            </p>
            <p className="text-sm mt-2">
              {translateOrFallback(
                "cloudUploadWarning",
                "Cloud sync is disabled by default on new installations. Enabling it uploads provider API keys, OAuth access/refresh tokens, OmniRoute API keys, and configuration to the destination above, now and during future syncs. This is separate from local Storage backups. Only enable it if you trust that server."
              )}
            </p>
            <Checkbox
              className="mt-3 text-sm"
              checked={acknowledgeCloudUpload}
              onChange={(event) => setAcknowledgeCloudUpload(event.target.checked)}
              label={translateOrFallback(
                "cloudUploadConsent",
                "I understand and authorize uploading my credentials to this destination."
              )}
            />
          </div>

          {/* Sync Progress / Success */}
          {(cloudSyncing || modalSuccess) && (
            <div
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                modalSuccess ? "bg-success/10 border-success/30" : "bg-primary/10 border-primary/30"
              }`}
            >
              {modalSuccess ? (
                <Icon name="check_circle" className="text-success text-xl" />
              ) : (
                <Icon name="progress_activity" className="animate-spin text-primary" />
              )}
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    modalSuccess ? "text-success" : "text-primary"
                  }`}
                >
                  {modalSuccess && t("cloudConnected")}
                  {!modalSuccess && syncStep === "syncing" && t("connectingToCloud")}
                  {!modalSuccess && syncStep === "verifying" && t("verifyingConnection")}
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleEnableCloud}
              fullWidth
              disabled={cloudSyncing || modalSuccess || !acknowledgeCloudUpload || !cloudConfigured}
            >
              {cloudSyncing ? (
                <span className="flex items-center gap-2">
                  <Icon name="progress_activity" className="animate-spin text-sm" />
                  {syncStep === "syncing" ? t("connecting") : t("verifying")}
                </span>
              ) : modalSuccess ? (
                <span className="flex items-center gap-2">
                  <Icon name="check" className="text-sm" />
                  {t("connected")}
                </span>
              ) : (
                t("enableCloud")
              )}
            </Button>
            <Button
              onClick={() => setShowCloudModal(false)}
              variant="ghost"
              fullWidth
              disabled={cloudSyncing || modalSuccess}
            >
              {tc("cancel")}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Disable Cloud Modal */}
      <Modal
        isOpen={showDisableModal}
        title={t("disableCloudTitle")}
        onClose={() => !cloudSyncing && setShowDisableModal(false)}
      >
        <div className="flex flex-col gap-4">
          <div className="bg-error-bg border border-error/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="warning" className="text-error" />
              <div>
                <p className="text-sm text-error font-medium mb-1">{tc("warning")}</p>
                <p className="text-sm text-error">{t("disableWarning")}</p>
              </div>
            </div>
          </div>

          {/* Sync Progress */}
          {cloudSyncing && (
            <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/30 rounded-lg">
              <Icon name="progress_activity" className="animate-spin text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-primary">
                  {syncStep === "syncing" && t("syncingData")}
                  {syncStep === "disabling" && t("disablingCloud")}
                </p>
              </div>
            </div>
          )}

          <p className="text-sm text-text-muted">{t("disableConfirm")}</p>

          <div className="flex gap-2">
            <Button
              onClick={handleConfirmDisable}
              fullWidth
              disabled={cloudSyncing}
              variant="danger"
            >
              {cloudSyncing ? (
                <span className="flex items-center gap-2">
                  <Icon name="progress_activity" className="animate-spin text-sm" />
                  {syncStep === "syncing" ? t("syncing") : t("disabling")}
                </span>
              ) : (
                t("disableCloud")
              )}
            </Button>
            <Button
              onClick={() => setShowDisableModal(false)}
              variant="ghost"
              fullWidth
              disabled={cloudSyncing}
            >
              {tc("cancel")}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showTailscaleInstallModal}
        title={translateOrFallback("tailscaleInstallTitle", "Install Tailscale")}
        onClose={() => !tailscaleInstallBusy && setShowTailscaleInstallModal(false)}
      >
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-info/30 bg-info/10 p-4">
            <p className="text-sm font-medium text-info">
              {translateOrFallback(
                "tailscaleInstallIntro",
                "Installs Tailscale on this machine and prepares OmniRoute to enable Funnel."
              )}
            </p>
            <p className="mt-2 text-sm text-info/80">
              {translateOrFallback(
                "tailscaleInstallPasswordHint",
                "On macOS and Linux, sudo may be required for the package install and daemon start."
              )}
            </p>
          </div>

          <Input
            type="password"
            value={tailscalePassword}
            onChange={(event) => setTailscalePassword(event.target.value)}
            placeholder={translateOrFallback("tailscaleSudoPlaceholder", "Optional sudo password")}
            disabled={tailscaleInstallBusy}
          />

          {tailscaleInstallLog.length > 0 && (
            <div className="max-h-48 overflow-auto rounded-lg border border-border/70 bg-surface/60 p-3">
              <pre className="whitespace-pre-wrap text-xs text-text-muted">
                {tailscaleInstallLog.join("\n")}
              </pre>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={() => void handleTailscaleInstall()}
              fullWidth
              disabled={tailscaleInstallBusy}
            >
              {tailscaleInstallBusy ? (
                <span className="flex items-center gap-2">
                  <Icon name="progress_activity" className="animate-spin text-sm" />
                  {translateOrFallback("tailscaleInstalling", "Installing")}
                </span>
              ) : (
                translateOrFallback("tailscaleInstallAndEnable", "Install & Enable")
              )}
            </Button>
            <Button
              onClick={() => setShowTailscaleInstallModal(false)}
              variant="ghost"
              fullWidth
              disabled={tailscaleInstallBusy}
            >
              {tc("cancel")}
            </Button>
          </div>
        </div>
      </Modal>
      {/* Provider Models Popup */}
      {selectedProvider && (
        <ProviderModelsModal
          provider={selectedProvider}
          models={allModels}
          copy={copy}
          copied={copied}
          onClose={() => setSelectedProvider(null)}
        />
      )}
    </div>
  );
}

// -- Sub-component: Provider Models Modal ------------------------------------------

function ProviderModelsModal({
  provider,
  models,
  copy,
  copied,
  onClose,
}: Readonly<{
  provider: EndpointProviderSummary;
  models: EndpointModelSummary[];
  copy: CopyHandler;
  copied?: string | null;
  onClose: () => void;
}>) {
  const t = useTranslations("endpoint");
  const tc = useTranslations("common");
  // Get provider alias for matching models
  // Filter out parent models (models with parent field set) to avoid showing duplicates
  const providerAlias = provider.provider.alias || provider.id;
  const providerModels = useMemo(() => {
    return models.filter(
      (m) => !m.parent && (m.owned_by === providerAlias || m.owned_by === provider.id)
    );
  }, [models, providerAlias, provider.id]);

  const chatModels = providerModels.filter((m) => !m.type);
  const embeddingModels = providerModels.filter((m) => m.type === "embedding");
  const imageModels = providerModels.filter((m) => m.type === "image");

  const renderModelGroup = (title, icon, groupModels) => {
    if (groupModels.length === 0) return null;
    return (
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Icon name={icon} className="text-sm" />
          {title} ({groupModels.length})
        </h4>
        <div className="flex flex-col gap-1">
          {groupModels.map((m) => {
            const copyKey = `modal-${m.id}`;
            return (
              <div
                key={m.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface/60 group"
              >
                <code className="text-sm font-mono flex-1 truncate">{m.id}</code>
                {m.custom && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                    {t("custom")}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => copy(m.id, copyKey)}
                  className="text-text-muted opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100"
                  title={tc("copy")}
                  aria-label={`${tc("copy")} ${m.id}`}
                  icon={copied === copyKey ? "check" : "content_copy"}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={t("providerModelsTitle", { provider: provider.provider.name })}
    >
      <div className="max-h-[60vh] overflow-y-auto">
        {providerModels.length === 0 ? (
          <p className="text-sm text-text-muted py-4 text-center">{t("noModelsForProvider")}</p>
        ) : (
          <>
            {renderModelGroup(t("chat"), "chat", chatModels)}
            {renderModelGroup(t("embedding"), "data_array", embeddingModels)}
            {renderModelGroup(t("image"), "image", imageModels)}
          </>
        )}
      </div>
    </Modal>
  );
}

// -- Sub-component: Endpoint Section ------------------------------------------

function EndpointCard({
  icon,
  iconColor,
  iconBg,
  title,
  path,
  models,
  copy,
  copied,
  baseUrl,
  badge,
  modelsLoading = false,
}: Readonly<{
  icon: string;
  iconColor: string;
  iconBg: string;
  title: string;
  path: string;
  models: EndpointModelSummary[] | null;
  copy: CopyHandler;
  copied?: string | null;
  baseUrl: string;
  badge?: string;
  modelsLoading?: boolean;
}>) {
  const t = useTranslations("endpoint");
  const copyId = `endpoint_${path}`;
  const fullUrl = `${baseUrl.replace(/\/v1$/, "")}${path}`;

  return (
    <div className="border border-border rounded-lg p-3 hover:bg-surface/30 transition-colors flex flex-col gap-2">
      <div className="flex items-start gap-2.5">
        <div className={`flex items-center justify-center size-8 rounded-lg ${iconBg} shrink-0`}>
          <Icon name={icon} size={16} className={iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-xs leading-tight">{title}</span>
            {badge && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full border border-border/60 text-text-muted font-medium uppercase tracking-wider leading-none">
                {badge}
              </span>
            )}
          </div>
          <span className="text-xs text-text-muted mt-0.5 block">
            {models === null
              ? "—"
              : modelsLoading
                ? "..."
                : t("modelsCount", { count: models.length })}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <code className="flex-1 text-[10px] font-mono text-text-muted bg-surface/80 px-2 py-1 rounded truncate">
          {path}
        </code>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => void copy(fullUrl, copyId)}
          className="shrink-0 text-text-muted"
          title={t("copyUrl")}
          aria-label={`${t("copyUrl")}: ${path}`}
          icon={copied === copyId ? "check" : "content_copy"}
        />
      </div>
    </div>
  );
}
