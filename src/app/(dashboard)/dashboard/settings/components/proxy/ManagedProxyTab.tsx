"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Textarea from "@/shared/components/Textarea";
import Checkbox from "@/shared/components/Checkbox";
import ManagedBinaryControls, {
  ManagedSubscriptionControls,
  type ManagedRequest,
} from "./ManagedBinaryControls";

type Core = "singbox" | "xray";
type CoreState = {
  core: Core;
  state: string;
  version?: string;
  distribution?: string;
  entries: Array<{ id: string; name: string; port: number }>;
};
async function loadCoreMetadata(loadError: string): Promise<CoreState[]> {
  const response = await fetch("/api/services/managed-proxy");
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error?.message || loadError);
  return payload.cores || [];
}

function useInitialCoreMetadata(
  loadError: string,
  setCores: (cores: CoreState[]) => void,
  setError: (error: string) => void
) {
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/services/managed-proxy", { signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error?.message || loadError);
        if (!controller.signal.aborted) setCores(payload.cores || []);
      })
      .catch((failure: Error) => {
        if (!controller.signal.aborted) setError(failure.message);
      });
    return () => controller.abort();
  }, [loadError, setCores, setError]);
}

/** Keep requests and metadata refresh isolated from form layout. */
function useManagedProxyState() {
  const t = useTranslations("managedProxy");
  const loadError = t("loadError");
  const [cores, setCores] = useState<CoreState[]>([]);
  const [core, setCore] = useState<Core | "">("");
  const [name, setName] = useState("");
  const [sourceLink, setSourceLink] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const [testResult, setTestResult] = useState("");
  const [fragmentEnabled, setFragmentEnabled] = useState(false);
  const [fragmentLength, setFragmentLength] = useState("100-200");
  const [fragmentInterval, setFragmentInterval] = useState("10-20");
  const fragment =
    core === "xray" && fragmentEnabled
      ? { packets: "tlshello", length: fragmentLength, interval: fragmentInterval }
      : undefined;
  useInitialCoreMetadata(loadError, setCores, setError);
  async function operation(
    method: "POST" | "PATCH",
    body: Record<string, unknown>
  ): Promise<Record<string, unknown> | null> {
    if (busyRef.current) return null;
    busyRef.current = true;
    setBusy(true);
    setError("");
    if (["custom", "update"].includes(String(body.action))) setTestResult("");
    try {
      const response = await fetch("/api/services/managed-proxy", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error?.message || t("operationError"));
      if (method === "POST") setSourceLink("");
      if (
        method === "POST" ||
        !["test", "releases", "subscription"].includes(String(body.action))
      ) {
        try {
          setCores(await loadCoreMetadata(loadError));
        } catch {
          setError(loadError);
        }
      }
      return payload;
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : t("operationError"));
      return null;
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }
  return {
    cores,
    core,
    setCore,
    name,
    setName,
    sourceLink,
    setSourceLink,
    error,
    busy,
    testResult,
    setTestResult,
    fragmentEnabled,
    setFragmentEnabled,
    fragmentLength,
    setFragmentLength,
    fragmentInterval,
    setFragmentInterval,
    fragment,
    operation,
  };
}

/** Compose the managed-core form without mixing transport and layout state. */
export default function ManagedProxyTab() {
  const t = useTranslations("managedProxy");
  const state = useManagedProxyState();
  const {
    cores,
    core,
    setCore,
    name,
    setName,
    sourceLink,
    setSourceLink,
    error,
    busy,
    testResult,
    setTestResult,
    setFragmentEnabled,
    operation,
  } = state;
  return (
    <section className="flex flex-col gap-4 max-w-2xl">
      <h3 className="text-base font-medium text-text-primary">{t("title")}</h3>
      <p className="text-sm text-text-muted">{t("description")}</p>
      <ManagedCoreList cores={cores} busy={busy} operation={operation} />
      <ManagedSourceFields
        core={core}
        setCore={(value) => {
          setCore(value);
          setTestResult("");
          setFragmentEnabled(false);
        }}
        busy={busy}
        name={name}
        setName={setName}
        sourceLink={sourceLink}
        setSourceLink={(value) => {
          setSourceLink(value);
          setTestResult("");
        }}
      />
      {core && (
        <>
          <ManagedSubscriptionControls
            key={`subscription-${core}`}
            core={core}
            busy={busy}
            operation={operation}
            select={(source, label) => {
              setSourceLink(source);
              setName(label);
              setTestResult("");
            }}
          />
          <ManagedBinaryControls
            key={`binary-${core}`}
            core={core}
            busy={busy}
            operation={operation}
          />
        </>
      )}
      {core === "xray" && <ManagedFragmentControls state={state} />}
      <p className="text-xs text-text-muted">{t("saveHint")}</p>
      <p className="text-xs text-text-muted">{t("testHint")}</p>
      {testResult && (
        <p role="status" className="text-sm text-success">
          {testResult}
        </p>
      )}
      {error && (
        <p role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
      <ManagedSourceActions state={state} />
    </section>
  );
}

/** Fragmentation stays opt-in and edits invalidate the previous test result. */
function ManagedFragmentControls({ state }: { state: ReturnType<typeof useManagedProxyState> }) {
  const t = useTranslations("managedProxy");
  const {
    busy,
    fragmentEnabled,
    setFragmentEnabled,
    fragmentLength,
    setFragmentLength,
    fragmentInterval,
    setFragmentInterval,
    setTestResult,
  } = state;
  return (
    <>
      <Checkbox
        label={t("fragmentEnable")}
        checked={fragmentEnabled}
        disabled={busy}
        onChange={(event) => {
          setFragmentEnabled(event.target.checked);
          setTestResult("");
        }}
      />
      {fragmentEnabled && (
        <>
          <p className="text-xs text-text-muted">{t("fragmentHint")}</p>
          <Input
            label={t("fragmentLength")}
            value={fragmentLength}
            disabled={busy}
            onChange={(event) => {
              setFragmentLength(event.target.value);
              setTestResult("");
            }}
          />
          <Input
            label={t("fragmentInterval")}
            value={fragmentInterval}
            disabled={busy}
            onChange={(event) => {
              setFragmentInterval(event.target.value);
              setTestResult("");
            }}
          />
        </>
      )}
    </>
  );
}

/** Test and Save are separate explicit actions; testing never persists the source. */
function ManagedSourceActions({ state }: { state: ReturnType<typeof useManagedProxyState> }) {
  const t = useTranslations("managedProxy");
  const { busy, core, sourceLink, fragment, name, operation, setTestResult } = state;
  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="secondary"
        disabled={busy || !core || !sourceLink.trim()}
        onClick={async () => {
          setTestResult("");
          const result = await operation("PATCH", { action: "test", core, sourceLink, fragment });
          if (result)
            setTestResult(
              t("testSuccess", { ip: String(result.publicIp), ms: Number(result.latencyMs) })
            );
        }}
      >
        {t("testSource")}
      </Button>
      <Button
        size="sm"
        loading={busy}
        disabled={busy || !core || !name.trim() || !sourceLink.trim()}
        onClick={() => operation("POST", { core, name, sourceLink, fragment })}
      >
        {t("saveActivate")}
      </Button>
    </div>
  );
}

function ManagedCoreList({
  cores,
  busy,
  operation,
}: {
  cores: CoreState[];
  busy: boolean;
  operation: ManagedRequest;
}) {
  const t = useTranslations("managedProxy");
  return (
    <>
      {cores.map((item) => (
        <div key={item.core} className="flex flex-col gap-2 border-b border-border pb-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-text-primary">
              {item.distribution === "mahsa"
                ? "Mahsa Core"
                : item.core === "singbox"
                  ? "sing-box"
                  : "Xray"}
              : {t("state", { state: item.state })}
              {item.version && (
                <span className="text-xs text-text-muted ml-2">
                  {t("version")}: {item.version}
                </span>
              )}
            </span>
            <Button
              size="sm"
              variant="secondary"
              disabled={busy || !item.entries.length}
              onClick={() =>
                operation("PATCH", {
                  core: item.core,
                  action: item.state === "running" ? "stop" : "start",
                })
              }
            >
              {item.state === "running" ? t("stop") : t("start")}
            </Button>
          </div>
          {item.entries.map((entry) => (
            <p key={entry.id} className="text-xs text-text-muted">
              {entry.name} — socks5://127.0.0.1:{entry.port}
            </p>
          ))}
        </div>
      ))}
    </>
  );
}

function ManagedSourceFields({
  busy,
  core,
  setCore,
  name,
  setName,
  sourceLink,
  setSourceLink,
}: {
  busy: boolean;
  core: Core | "";
  setCore: (v: Core | "") => void;
  name: string;
  setName: (v: string) => void;
  sourceLink: string;
  setSourceLink: (v: string) => void;
}) {
  const t = useTranslations("managedProxy");
  return (
    <>
      <Select
        label={t("core")}
        id="managed-core-choice"
        disabled={busy}
        value={core}
        onChange={(e) => setCore(e.target.value as Core | "")}
      >
        <option value="">{t("selectCore")}</option>
        <option value="singbox">sing-box</option>
        <option value="xray">Xray</option>
      </Select>
      <Input
        label={t("name")}
        id="managed-proxy-name"
        disabled={busy}
        maxLength={120}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        <label htmlFor="managed-proxy-source" className="text-xs text-text-muted block mb-1.5">
          {t("source")}
        </label>
        <Textarea
          id="managed-proxy-source"
          disabled={busy}
          rows={4}
          autoComplete="off"
          spellCheck={false}
          value={sourceLink}
          onChange={(e) => setSourceLink(e.target.value)}
        />
      </div>
    </>
  );
}
