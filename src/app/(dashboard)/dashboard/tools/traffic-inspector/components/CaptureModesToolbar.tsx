"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import { cn } from "@/shared/utils/cn";
import { CustomHostsManager } from "./CustomHostsManager";
import { HttpProxySnippetCard } from "./HttpProxySnippetCard";
import {
  fetchTproxyStatus,
  startTproxyCaptureMode,
  stopTproxyCaptureMode,
} from "@/lib/inspector/tproxyCaptureApi";

interface CaptureModeState {
  agentBridge: boolean; // always on, cannot disable
  customHosts: boolean;
  httpProxy: boolean;
  systemWide: boolean;
}

interface CaptureModesToolbarProps {
  customHostCount: number;
}

function ModeDot({ active, warn }: { active: boolean; warn?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block h-1.5 w-1.5 rounded-full",
        active ? (warn ? "bg-warning" : "bg-success") : "bg-text-muted"
      )}
    />
  );
}

export function CaptureModesToolbar({ customHostCount }: CaptureModesToolbarProps) {
  const t = useTranslations("trafficInspector");
  const [modes, setModes] = useState<CaptureModeState>({
    agentBridge: true,
    customHosts: false,
    httpProxy: false,
    systemWide: false,
  });
  const [showHosts, setShowHosts] = useState(false);
  const [showProxy, setShowProxy] = useState(false);
  const [proxyPort] = useState(8080);

  // TPROXY decrypt capture is real backend state (route #4211), gated on the
  // native addon (Linux + root). Reflect the server status and drive start/stop.
  const [tproxy, setTproxy] = useState<{
    running: boolean;
    available: boolean;
    interceptCount?: number;
  }>({ running: false, available: false });
  const [tproxyBusy, setTproxyBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    fetchTproxyStatus()
      .then((s) => {
        if (alive) {
          setTproxy({
            running: s.running,
            available: s.available,
            interceptCount: s.interceptCount,
          });
        }
      })
      .catch(() => {
        // status route unreachable → leave defaults (disabled toggle)
      });
    return () => {
      alive = false;
    };
  }, []);

  const toggleMode = (key: keyof CaptureModeState) => {
    if (key === "agentBridge") return; // always on
    setModes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleTproxy = async () => {
    if (!tproxy.available || tproxyBusy) return;
    setTproxyBusy(true);
    try {
      const status = tproxy.running
        ? await stopTproxyCaptureMode()
        : await startTproxyCaptureMode();
      setTproxy({
        running: status.running,
        available: status.available,
        interceptCount: status.interceptCount,
      });
    } catch {
      // keep the prior state; the route sanitizes + reports its own errors
    } finally {
      setTproxyBusy(false);
    }
  };

  const buttons: Array<{
    key: keyof CaptureModeState;
    label: string;
    alwaysOn?: boolean;
    warn?: boolean;
    extra?: React.ReactNode;
  }> = [
    { key: "agentBridge", label: t("agentBridgeMode"), alwaysOn: true },
    {
      key: "customHosts",
      label: `${t("customHostsMode")} (${customHostCount})`,
    },
    {
      key: "httpProxy",
      label: `${t("httpProxyMode")} :${proxyPort}`,
    },
    {
      key: "systemWide",
      label: t("systemWideMode"),
      warn: true,
    },
  ];

  return (
    <>
      <div
        data-testid="capture-toolbar"
        role="group"
        aria-label={t("captureModesTitle")}
        className="flex flex-wrap items-center gap-2 rounded-card border border-border bg-bg-subtle px-3 py-2"
      >
        {buttons.map(({ key, label, alwaysOn, warn }) => {
          const active = modes[key];
          return (
            <Button
              key={key}
              size="sm"
              variant={active ? (warn ? "warning" : "primary") : "outline"}
              onClick={() => toggleMode(key)}
              disabled={alwaysOn}
              aria-pressed={active}
              className="disabled:opacity-100"
            >
              <ModeDot active={active} warn={warn} />
              {label}
              {warn && <Icon name="warning" size={14} className="text-warning" />}
            </Button>
          );
        })}

        <Button
          size="sm"
          variant={tproxy.running ? "warning" : "outline"}
          onClick={toggleTproxy}
          disabled={!tproxy.available || tproxyBusy}
          aria-pressed={tproxy.running}
          title={!tproxy.available ? t("tproxyModeUnavailable") : undefined}
        >
          <ModeDot active={tproxy.running} warn />
          {t("tproxyMode")}
          {tproxy.running && typeof tproxy.interceptCount === "number" && (
            <span>· {tproxy.interceptCount}</span>
          )}
          <Icon name="warning" size={14} className="text-warning" />
        </Button>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" icon="settings" onClick={() => setShowHosts(true)}>
            {t("manageHosts")}
          </Button>
          <Button variant="ghost" size="sm" icon="download" onClick={() => setShowProxy(true)}>
            {t("copySnippet")}
          </Button>
        </div>
      </div>

      {showHosts && <CustomHostsManager onClose={() => setShowHosts(false)} />}
      {showProxy && <HttpProxySnippetCard port={proxyPort} onClose={() => setShowProxy(false)} />}
    </>
  );
}
