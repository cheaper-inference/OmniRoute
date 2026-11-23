"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge, Button, Checkbox, Input, Modal, TALL_MODAL_PROPS } from "@/shared/components";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";
import { matchesSearch } from "@/shared/utils/turkishText";
import {
  MIN_TRANSFER_PASSPHRASE_LENGTH,
  PROVIDER_TRANSFER_FORMAT,
  type ProviderTransferAction,
} from "@/shared/validation/schemas/providerTransfer";

interface CatalogEntry {
  id: string;
  provider: string;
  providerLabel: string | null;
  authType: string | null;
  name: string | null;
  displayName: string | null;
  email: string | null;
}

interface PlanItem {
  key: string;
  kind: "connection" | "node";
  provider: string;
  authType: string | null;
  label: string;
  email: string | null;
  status: "new" | "identical" | "conflict" | "unsupported";
  actions: ProviderTransferAction[];
  recommended: ProviderTransferAction;
}

interface Plan {
  summary: { providerConnections: number; providerNodes: number };
  providerConnections: PlanItem[];
  providerNodes: PlanItem[];
}

type Status = { type: "" | "success" | "error"; message: string };

const STATUS_VARIANT = {
  new: "success",
  identical: "default",
  conflict: "warning",
  unsupported: "error",
} as const;

function entryLabel(entry: CatalogEntry): string {
  return entry.name || entry.displayName || entry.email || entry.provider;
}

async function postJson(url: string, body: unknown): Promise<Response> {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function StatusLine({ status }: { status: Status }) {
  if (!status.message) return null;
  const tone = status.type === "error" ? "text-red-500" : "text-green-600 dark:text-green-400";
  return (
    <p role="status" className={`text-xs ${tone}`}>
      {status.message}
    </p>
  );
}

async function downloadResponseFile(res: Response, fallbackName: string): Promise<void> {
  const blob = await res.blob();
  const match = (res.headers.get("Content-Disposition") || "").match(/filename="?([^"]+)"?/);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = match?.[1] || fallbackName;
  link.click();
  URL.revokeObjectURL(url);
}

function AccountPicker({
  entries,
  selected,
  onSelectedChange,
}: {
  entries: CatalogEntry[];
  selected: Set<string>;
  onSelectedChange: (next: Set<string>) => void;
}) {
  const t = useTranslations("providerTransfer");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    if (!query.trim()) return entries;
    return entries.filter((entry) =>
      [entryLabel(entry), entry.provider, entry.providerLabel, entry.email].some((value) =>
        matchesSearch(value, query)
      )
    );
  }, [entries, query]);

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectedChange(next);
  };

  return (
    <>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("searchPlaceholder")}
        icon="search"
      />
      <div className="flex items-center gap-2 text-xs text-text-muted">
        <span>{t("selectedCount", { count: selected.size })}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSelectedChange(new Set([...selected, ...visible.map((e) => e.id)]))}
        >
          {t("selectAll")}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onSelectedChange(new Set())}>
          {t("clearSelection")}
        </Button>
      </div>
      <div className="max-h-64 overflow-y-auto rounded-lg border border-border/50 divide-y divide-border/40">
        {visible.length === 0 && <p className="p-3 text-xs text-text-muted">{t("noAccounts")}</p>}
        {visible.map((entry) => (
          <div key={entry.id} className="flex items-center gap-2 px-3 py-2">
            <Checkbox
              id={`transfer-${entry.id}`}
              checked={selected.has(entry.id)}
              onChange={() => toggle(entry.id)}
              label={entryLabel(entry)}
            />
            <span className="ml-auto text-xs text-text-muted">
              {entry.providerLabel || entry.provider}
            </span>
            {entry.authType && <Badge size="sm">{entry.authType}</Badge>}
          </div>
        ))}
      </div>
    </>
  );
}

function PassphraseFields({
  passphrase,
  confirm,
  onPassphraseChange,
  onConfirmChange,
}: {
  passphrase: string;
  confirm: string;
  onPassphraseChange: (value: string) => void;
  onConfirmChange: (value: string) => void;
}) {
  const t = useTranslations("providerTransfer");
  const mismatch = confirm.length > 0 && confirm !== passphrase;
  return (
    <>
      <Input
        type="password"
        autoComplete="new-password"
        label={t("passphrase")}
        value={passphrase}
        onChange={(e) => onPassphraseChange(e.target.value)}
        hint={t("passphraseHint", { min: MIN_TRANSFER_PASSPHRASE_LENGTH })}
      />
      <Input
        type="password"
        autoComplete="new-password"
        label={t("passphraseConfirm")}
        value={confirm}
        onChange={(e) => onConfirmChange(e.target.value)}
        error={mismatch ? t("passphraseMismatch") : undefined}
      />
    </>
  );
}

function ExportView({ entries, loadError }: { entries: CatalogEntry[]; loadError: string }) {
  const t = useTranslations("providerTransfer");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [passphrase, setPassphrase] = useState("");
  const [confirm, setConfirm] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "", message: "" });

  const tooShort = passphrase.length < MIN_TRANSFER_PASSPHRASE_LENGTH;
  const canExport = selected.size > 0 && !tooShort && confirm === passphrase && acknowledged;

  const handleExport = async () => {
    setBusy(true);
    setStatus({ type: "", message: "" });
    try {
      const res = await postJson("/api/settings/transfer/export", {
        connectionIds: [...selected],
        passphrase,
        acknowledgeCredentialExport: true,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus({ type: "error", message: extractApiErrorMessage(data, t("exportFailed")) });
        return;
      }
      await downloadResponseFile(res, "omniroute-provider-transfer.json");
      setStatus({ type: "success", message: t("exportDone", { count: selected.size }) });
    } catch {
      setStatus({ type: "error", message: t("exportFailed") });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {loadError && <StatusLine status={{ type: "error", message: loadError }} />}
      <AccountPicker entries={entries} selected={selected} onSelectedChange={setSelected} />
      <PassphraseFields
        passphrase={passphrase}
        confirm={confirm}
        onPassphraseChange={setPassphrase}
        onConfirmChange={setConfirm}
      />
      <p className="text-xs text-amber-600 dark:text-amber-400">{t("oauthWarning")}</p>
      <Checkbox
        id="transfer-acknowledge"
        checked={acknowledged}
        onChange={(e) => setAcknowledged(e.target.checked)}
        label={t("acknowledge")}
      />
      <StatusLine status={status} />
      <div>
        <Button
          variant="primary"
          size="sm"
          disabled={!canExport}
          loading={busy}
          onClick={handleExport}
        >
          {t("exportButton")}
        </Button>
      </div>
    </div>
  );
}

function PlanRows({
  items,
  decisions,
  onChange,
}: {
  items: PlanItem[];
  decisions: Record<string, ProviderTransferAction>;
  onChange: (key: string, action: ProviderTransferAction) => void;
}) {
  const t = useTranslations("providerTransfer");
  const statusLabel = {
    new: t("statusNew"),
    identical: t("statusIdentical"),
    conflict: t("statusConflict"),
    unsupported: t("statusUnsupported"),
  };
  const actionLabel = {
    add: t("actionAdd"),
    skip: t("actionSkip"),
    replace: t("actionReplace"),
  };
  return (
    <>
      {items.map((item) => (
        <div key={item.key} className="flex flex-wrap items-center gap-2 px-3 py-2">
          <span className="text-sm text-text-main">{item.label}</span>
          <span className="text-xs text-text-muted">
            {item.kind === "node" ? t("providerNode") : item.provider}
          </span>
          <Badge size="sm" variant={STATUS_VARIANT[item.status]}>
            {statusLabel[item.status]}
          </Badge>
          <select
            aria-label={item.label}
            className="ml-auto rounded-md border border-border bg-surface px-2 py-1 text-xs"
            value={decisions[item.key] ?? item.recommended}
            onChange={(e) => onChange(item.key, e.target.value as ProviderTransferAction)}
            disabled={item.actions.length < 2}
          >
            {item.actions.map((action) => (
              <option key={action} value={action}>
                {actionLabel[action]}
              </option>
            ))}
          </select>
        </div>
      ))}
    </>
  );
}

/** POST helper shared by the preview and import steps: tracks busy + status. */
function useTransferRequest() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "", message: "" });

  const run = async (url: string, body: unknown, fallback: string) => {
    setBusy(true);
    setStatus({ type: "", message: "" });
    try {
      const res = await postJson(url, body);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ type: "error", message: extractApiErrorMessage(data, fallback) });
        return null;
      }
      return data;
    } catch {
      setStatus({ type: "error", message: fallback });
      return null;
    } finally {
      setBusy(false);
    }
  };

  return { busy, status, setStatus, run };
}

function PlanReview({
  plan,
  decisions,
  onDecision,
  busy,
  onImport,
}: {
  plan: Plan;
  decisions: Record<string, ProviderTransferAction>;
  onDecision: (key: string, action: ProviderTransferAction) => void;
  busy: boolean;
  onImport: () => void;
}) {
  const t = useTranslations("providerTransfer");
  return (
    <>
      <p className="text-xs text-text-muted">
        {t("summary", {
          connections: plan.summary.providerConnections,
          nodes: plan.summary.providerNodes,
        })}
      </p>
      <div className="max-h-72 overflow-y-auto rounded-lg border border-border/50 divide-y divide-border/40">
        <PlanRows items={plan.providerNodes} decisions={decisions} onChange={onDecision} />
        <PlanRows items={plan.providerConnections} decisions={decisions} onChange={onDecision} />
      </div>
      <div>
        <Button variant="primary" size="sm" loading={busy} onClick={onImport}>
          {t("importButton")}
        </Button>
      </div>
    </>
  );
}

function appliedCounts(data: unknown): { connections: number; nodes: number; skipped: number } {
  const applied = (data as { applied?: Record<string, number> }).applied || {};
  return {
    connections: applied.providerConnections ?? 0,
    nodes: applied.providerNodes ?? 0,
    skipped: applied.skipped ?? 0,
  };
}

/** Parse a picked transfer file; null when it is not JSON or not a transfer bundle. */
async function readTransferFile(file: File): Promise<unknown> {
  try {
    const parsed = JSON.parse(await file.text());
    return parsed?.format === PROVIDER_TRANSFER_FORMAT ? parsed : null;
  } catch {
    return null;
  }
}

function FileChooser({
  label,
  onChange,
}: {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm">
      <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
        upload_file
      </span>
      {label}
      <input type="file" accept=".json" className="hidden" onChange={onChange} />
    </label>
  );
}

function ImportView() {
  const t = useTranslations("providerTransfer");
  const [bundle, setBundle] = useState<unknown>(null);
  const [fileName, setFileName] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [plan, setPlan] = useState<Plan | null>(null);
  const [decisions, setDecisions] = useState<Record<string, ProviderTransferAction>>({});
  const { busy, status, setStatus, run } = useTransferRequest();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    setPlan(null);
    setDecisions({});
    setStatus({ type: "", message: "" });
    if (!file) return;
    const parsed = await readTransferFile(file);
    setBundle(parsed);
    setFileName(parsed ? file.name : "");
    if (!parsed) setStatus({ type: "error", message: t("invalidFile") });
  };

  const handlePreview = async () => {
    const data = await run(
      "/api/settings/transfer/preview",
      { bundle, passphrase },
      t("previewFailed")
    );
    if (data) {
      setPlan(data as Plan);
      setDecisions({});
    }
  };

  const handleImport = async () => {
    const data = await run(
      "/api/settings/transfer/import",
      { bundle, passphrase, decisions },
      t("importFailed")
    );
    if (!data) return;
    setPlan(null);
    setStatus({ type: "success", message: t("importSuccess", appliedCounts(data)) });
  };

  const setDecision = (key: string, action: ProviderTransferAction) =>
    setDecisions((current) => ({ ...current, [key]: action }));

  return (
    <div className="flex flex-col gap-3">
      <FileChooser label={fileName || t("chooseFile")} onChange={handleFile} />
      <Input
        type="password"
        autoComplete="off"
        label={t("passphrase")}
        value={passphrase}
        onChange={(e) => setPassphrase(e.target.value)}
      />
      <div>
        <Button
          variant="outline"
          size="sm"
          disabled={!bundle || !passphrase}
          loading={busy && !plan}
          onClick={handlePreview}
        >
          {t("previewButton")}
        </Button>
      </div>
      {plan && (
        <PlanReview
          plan={plan}
          decisions={decisions}
          onDecision={setDecision}
          busy={busy}
          onImport={handleImport}
        />
      )}
      <StatusLine status={status} />
    </div>
  );
}

/** Settings → Storage: open the selective provider-account transfer dialog. */
export default function ProviderTransferPanel() {
  const t = useTranslations("providerTransfer");
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"export" | "import">("export");
  const [entries, setEntries] = useState<CatalogEntry[]>([]);
  const [loadError, setLoadError] = useState("");

  const handleOpen = async () => {
    setOpen(true);
    setLoadError("");
    try {
      const res = await fetch("/api/settings/transfer/catalog");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setLoadError(extractApiErrorMessage(data, t("loadFailed")));
        return;
      }
      setEntries((data as { providerConnections?: CatalogEntry[] }).providerConnections || []);
    } catch {
      setLoadError(t("loadFailed"));
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={handleOpen}>
        <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
          move_up
        </span>
        {t("open")}
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={t("title")}
        size="lg"
        {...TALL_MODAL_PROPS}
      >
        <p className="mb-3 text-xs text-text-muted">{t("description")}</p>
        <div className="mb-3 flex gap-2" role="tablist">
          {(["export", "import"] as const).map((value) => (
            <Button
              key={value}
              role="tab"
              aria-selected={tab === value}
              variant={tab === value ? "primary" : "ghost"}
              size="sm"
              onClick={() => setTab(value)}
            >
              {value === "export" ? t("exportTab") : t("importTab")}
            </Button>
          ))}
        </div>
        {tab === "export" ? <ExportView entries={entries} loadError={loadError} /> : <ImportView />}
      </Modal>
    </>
  );
}
