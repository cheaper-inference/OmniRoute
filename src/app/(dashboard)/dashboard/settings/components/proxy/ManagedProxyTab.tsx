"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Textarea from "@/shared/components/Textarea";

type Core = "singbox" | "xray";
type CoreState = {
  core: Core;
  state: string;
  entries: Array<{ id: string; name: string; port: number }>;
};
/** Fetch managed-core states and entries, throwing the server message or localized fallback. */
async function loadCoreMetadata(loadError: string): Promise<CoreState[]> {
  const response = await fetch("/api/services/managed-proxy");
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error?.message || loadError);
  return payload.cores || [];
}

/** Display managed cores and submit source saves or lifecycle actions to the local service API. */
export default function ManagedProxyTab() {
  const t = useTranslations("managedProxy");
  const loadError = t("loadError");
  const [cores, setCores] = useState<CoreState[]>([]);
  const [core, setCore] = useState<Core | "">("");
  const [name, setName] = useState("");
  const [sourceLink, setSourceLink] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  /** Refresh the displayed core metadata after a successful operation. */
  async function load() {
    setCores(await loadCoreMetadata(loadError));
  }
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
  }, [loadError]);
  /**
   * Submit a save or lifecycle change, refresh metadata, and surface failures in the form.
   * Clear source input only after a successful save response.
   */
  async function operation(method: "POST" | "PATCH", body: unknown) {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/services/managed-proxy", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error?.message || t("operationError"));
      if (method === "POST") setSourceLink("");
      await load();
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : t("operationError"));
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="flex flex-col gap-4 max-w-2xl">
      <h3 className="text-base font-medium text-text-primary">{t("title")}</h3>
      <p className="text-sm text-text-muted">{t("description")}</p>
      <ManagedCoreList cores={cores} busy={busy} operation={operation} />
      <ManagedSourceFields
        core={core}
        setCore={setCore}
        name={name}
        setName={setName}
        sourceLink={sourceLink}
        setSourceLink={setSourceLink}
      />
      <p className="text-xs text-text-muted">{t("saveHint")}</p>
      {error && (
        <p role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
      <div>
        <Button
          size="sm"
          loading={busy}
          disabled={!core || !name.trim() || !sourceLink.trim()}
          onClick={() => operation("POST", { core, name, sourceLink })}
        >
          {t("saveActivate")}
        </Button>
      </div>
    </section>
  );
}

/** List each core's local endpoints and offer start/stop controls when entries exist. */
function ManagedCoreList({
  cores,
  busy,
  operation,
}: {
  cores: CoreState[];
  busy: boolean;
  operation: (method: "POST" | "PATCH", body: unknown) => Promise<void>;
}) {
  const t = useTranslations("managedProxy");
  return (
    <>
      {cores.map((item) => (
        <div key={item.core} className="flex flex-col gap-2 border-b border-border pb-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-text-primary">
              {item.core === "singbox" ? "sing-box" : "Xray"}: {t("state", { state: item.state })}
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

/** Render controlled core, name, and source inputs without storing source text separately. */
function ManagedSourceFields({
  core,
  setCore,
  name,
  setName,
  sourceLink,
  setSourceLink,
}: {
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
