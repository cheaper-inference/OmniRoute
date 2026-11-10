"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";

type Core = "singbox" | "xray";
export type ManagedRequest = (
  method: "POST" | "PATCH",
  body: Record<string, unknown>
) => Promise<Record<string, unknown> | null>;

function useReleaseCatalog(core: Core) {
  const [distribution, setDistribution] = useState<string>(core);
  const [versions, setVersions] = useState<string[]>([]);
  const [version, setVersion] = useState("");
  const [catalogLoaded, setCatalogLoaded] = useState(false);
  return {
    distribution,
    setDistribution,
    versions,
    setVersions,
    version,
    setVersion,
    catalogLoaded,
    setCatalogLoaded,
  };
}

/** Show verified release choices without starting a core on selection. */
export default function ManagedBinaryControls({
  core,
  busy,
  operation,
}: {
  core: Core;
  busy: boolean;
  operation: ManagedRequest;
}) {
  const t = useTranslations("managedProxy");
  const {
    distribution,
    setDistribution,
    versions,
    setVersions,
    version,
    setVersion,
    catalogLoaded,
    setCatalogLoaded,
  } = useReleaseCatalog(core);
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border p-3">
      <h4 className="text-sm font-medium">{t("binaryTitle")}</h4>
      <p className="text-xs text-text-muted">{t("binaryHint")}</p>
      <Select
        label={t("distribution")}
        value={distribution}
        disabled={busy}
        onChange={(event) => {
          setDistribution(event.target.value);
          setVersions([]);
          setVersion("");
          setCatalogLoaded(false);
        }}
      >
        {core === "singbox" ? (
          <option value="singbox">sing-box</option>
        ) : (
          <>
            <option value="xray">Xray</option>
            <option value="mahsa">Mahsa Core (MahsaNG)</option>
          </>
        )}
      </Select>
      <Button
        size="sm"
        variant="secondary"
        disabled={busy}
        onClick={async () => {
          const result = await operation("PATCH", { action: "releases", core, distribution });
          if (result) {
            const values = (result.releases as Array<{ version: string }>).map(
              (item) => item.version
            );
            setVersions(values);
            setVersion(values[0] || "");
            setCatalogLoaded(true);
          }
        }}
      >
        {t("checkUpdates")}
      </Button>
      {catalogLoaded && !versions.length && (
        <p className="text-xs text-text-muted">{t("noVerifiedReleases")}</p>
      )}
      {!!versions.length && (
        <ManagedReleaseSelection
          core={core}
          busy={busy}
          operation={operation}
          distribution={distribution}
          versions={versions}
          version={version}
          setVersion={setVersion}
        />
      )}
      <CustomBinaryControls core={core} busy={busy} operation={operation} />
    </div>
  );
}

function ManagedReleaseSelection({
  core,
  busy,
  operation,
  distribution,
  versions,
  version,
  setVersion,
}: {
  core: Core;
  busy: boolean;
  operation: ManagedRequest;
  distribution: string;
  versions: string[];
  version: string;
  setVersion: (value: string) => void;
}) {
  const t = useTranslations("managedProxy");
  return (
    <>
      <Select
        label={t("version")}
        value={version}
        disabled={busy}
        onChange={(event) => setVersion(event.target.value)}
      >
        {versions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
      <Button
        size="sm"
        disabled={busy || !version}
        onClick={() => operation("PATCH", { action: "update", core, distribution, version })}
      >
        {t("installVersion")}
      </Button>
    </>
  );
}

/** Explicit trust belongs to the current path/hash pair and resets on either edit. */
function CustomBinaryControls({
  core,
  busy,
  operation,
}: {
  core: Core;
  busy: boolean;
  operation: ManagedRequest;
}) {
  const t = useTranslations("managedProxy");
  const [binaryPath, setBinaryPath] = useState("");
  const [sha256, setSha256] = useState("");
  const [trusted, setTrusted] = useState(false);
  return (
    <>
      <Input
        label={t("customPath")}
        value={binaryPath}
        disabled={busy}
        autoComplete="off"
        onChange={(event) => {
          setBinaryPath(event.target.value);
          setTrusted(false);
        }}
      />
      <Input
        label={t("customHash")}
        value={sha256}
        disabled={busy}
        autoComplete="off"
        maxLength={64}
        onChange={(event) => {
          setSha256(event.target.value);
          setTrusted(false);
        }}
      />
      <Checkbox
        label={t("customTrust")}
        checked={trusted}
        disabled={busy}
        onChange={(event) => setTrusted(event.target.checked)}
      />
      <Button
        size="sm"
        variant="secondary"
        disabled={busy || !trusted || !binaryPath || !/^[a-fA-F0-9]{64}$/.test(sha256)}
        onClick={async () => {
          const result = await operation("PATCH", {
            action: "custom",
            core,
            path: binaryPath,
            sha256,
            acknowledgeUntrustedCode: trusted,
          });
          if (result) {
            setBinaryPath("");
            setSha256("");
            setTrusted(false);
          }
        }}
      >
        {t("useCustom")}
      </Button>
    </>
  );
}

export function ManagedSubscriptionControls({
  core,
  busy,
  operation,
  select,
}: {
  core: Core;
  busy: boolean;
  operation: ManagedRequest;
  select: (source: string, name: string) => void;
}) {
  const t = useTranslations("managedProxy");
  const [url, setUrl] = useState("");
  const [nodes, setNodes] = useState<Array<{ id: string; name: string; sourceLink: string }>>([]);
  const [selected, setSelected] = useState("");
  const [skipped, setSkipped] = useState(0);
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border p-3">
      <Input
        label={t("subscriptionUrl")}
        value={url}
        type="url"
        disabled={busy}
        autoComplete="off"
        onChange={(event) => {
          setUrl(event.target.value);
          setNodes([]);
          setSelected("");
          setSkipped(0);
        }}
      />
      <p className="text-xs text-text-muted">{t("subscriptionHint")}</p>
      <Button
        size="sm"
        variant="secondary"
        disabled={busy || !url.trim()}
        onClick={async () => {
          const result = await operation("PATCH", {
            action: "subscription",
            core,
            url: url.trim(),
          });
          if (result) {
            setNodes(result.nodes as typeof nodes);
            setSelected("");
            setSkipped(Number(result.skipped) || 0);
          }
        }}
      >
        {t("loadSubscription")}
      </Button>
      {skipped > 0 && (
        <p className="text-xs text-text-muted">{t("skippedNodes", { count: skipped })}</p>
      )}
      {!!nodes.length && (
        <Select
          label={t("subscriptionNode")}
          value={selected}
          disabled={busy}
          onChange={(event) => {
            setSelected(event.target.value);
            const node = nodes.find((entry) => entry.id === event.target.value);
            if (node) select(node.sourceLink, node.name);
          }}
        >
          <option value="">{t("selectNode")}</option>
          {nodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.name}
            </option>
          ))}
        </Select>
      )}
    </div>
  );
}
