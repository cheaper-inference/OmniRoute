"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Sheet, SheetContent, SheetTitle } from "@omniroute/ui-kit/sheet";
import { Tabs, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";

import Button from "./Button";
import Icon from "./Icon";
import Select from "./Select";
import {
  LlmChatCard,
  type LlmChatControls,
} from "@/app/(dashboard)/dashboard/media-providers/components/LlmChatCard";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { cn } from "@/shared/utils/cn";
import { useApiKey } from "@/app/(dashboard)/dashboard/providers/hooks/useApiKey";
import { useProviderModels } from "@/app/(dashboard)/dashboard/providers/hooks/useProviderModels";

interface SlideOverProvider {
  id?: string;
  name: string;
  color?: string;
  apiType?: string;
  deprecated?: boolean;
  deprecationReason?: string;
  subscriptionRisk?: boolean;
  serviceKinds?: string[];
}

interface ProviderTestSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  providerId: string;
  provider: SlideOverProvider;
  staticIconPath?: string | null;
  initialTab?: TabKey;
}

type TabKey = "test" | "logs";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "test", label: "test", icon: "play_arrow" },
  { key: "logs", label: "logs", icon: "receipt_long" },
];

export default function ProviderTestSlideOver(props: ProviderTestSlideOverProps) {
  if (!props.isOpen) return null;
  return <ProviderTestSlideOverPanel {...props} />;
}

function ProviderTestSlideOverPanel({
  onClose,
  providerId,
  provider,
  staticIconPath,
  initialTab = "test",
}: ProviderTestSlideOverProps) {
  const t = useTranslations("providerTest");
  const [tab, setTab] = useState<TabKey>(initialTab);
  const [model, setModel] = useState<string>("");
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [controls, setControls] = useState<LlmChatControls | null>(null);
  const onControlsChange = useCallback((c: LlmChatControls) => setControls(c), []);

  const { keys } = useApiKey();
  const { models } = useProviderModels(providerId);
  const firstModel = models[0]?.id ?? "";

  // Escape, the overlay click, the focus trap and the body scroll lock are the kit Sheet's
  // (Radix Dialog); the panel only renders while open, so it mounts already open.
  // Focus return is ours, as in the Modal adapter: Radix only refocuses its own SheetTrigger,
  // which a controlled panel never has, so remember the opener when the sheet takes focus and
  // put focus back on it when the sheet closes. Radix fires onCloseAutoFocus after the panel
  // unmounts too, so this also covers the parent dropping the panel (`isOpen` → false).
  const openerRef = useRef<HTMLElement | null>(null);
  const color = provider.color || "#64748b";
  const modelOptions = models.length > 0 ? models : [];

  return (
    <Sheet
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent
        side="right"
        showClose={false}
        aria-describedby={undefined}
        className="w-full sm:w-[640px] md:w-[720px] lg:w-[820px] max-w-full bg-surface p-0"
        onOpenAutoFocus={() => {
          const active = document.activeElement;
          openerRef.current = active instanceof HTMLElement ? active : null;
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          const opener = openerRef.current;
          openerRef.current = null;
          if (opener?.isConnected) opener.focus();
        }}
      >
        <SheetTitle className="ci-sr-only">
          {t("dialogLabel", { provider: provider.name })}
        </SheetTitle>
        <SlideOverHeader
          provider={provider}
          providerId={providerId}
          staticIconPath={staticIconPath}
          color={color}
          onClose={onClose}
        />
        {tab === "test" && (
          <TestToolbar
            model={model || firstModel}
            onModelChange={setModel}
            modelOptions={modelOptions}
            selectedKey={selectedKey}
            onSelectedKeyChange={setSelectedKey}
            keys={keys}
            controls={controls}
          />
        )}
        <SlideOverTabs
          tab={tab}
          onChange={setTab}
          label={t("dialogLabel", { provider: provider.name })}
        />
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          {tab === "test" && (
            <div className="flex-1 min-h-0 flex flex-col pl-4 pr-2 py-3">
              <LlmChatCard
                providerId={providerId}
                embedded
                hideToolbar
                model={model}
                onModelChange={setModel}
                selectedKey={selectedKey}
                onSelectedKeyChange={setSelectedKey}
                onControlsChange={onControlsChange}
              />
            </div>
          )}
          {tab === "logs" && <LogsTab providerId={providerId} />}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SlideOverHeader({
  provider,
  providerId,
  staticIconPath,
  color,
  onClose,
}: {
  provider: SlideOverProvider;
  providerId: string;
  staticIconPath?: string | null;
  color: string;
  onClose: () => void;
}) {
  const t = useTranslations("providerTest");
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border shrink-0">
      <div
        className="size-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}15` }}
      >
        {staticIconPath ? (
          <Image src={staticIconPath} alt={provider.name} width={22} height={22} />
        ) : (
          <ProviderIcon providerId={provider.id || providerId} size={22} type="color" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-semibold text-text-main truncate" title={provider.name}>
          {provider.name}
        </h2>
        <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
          {provider.apiType && <span className="font-mono">{provider.apiType}</span>}
          {provider.deprecated && (
            <>
              <span>·</span>
              <span className="flex items-center gap-0.5 text-text-muted/70">
                <Icon name="block" size={12} />
                {t("deprecated")}
              </span>
            </>
          )}
          {provider.subscriptionRisk && (
            <>
              <span>·</span>
              <span className="flex items-center gap-0.5 text-warning">
                <Icon name="info" size={12} />
                {t("risk")}
              </span>
            </>
          )}
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={onClose} aria-label={t("close")}>
        <Icon name="close" size={20} />
      </Button>
    </div>
  );
}

function TestToolbar({
  model,
  onModelChange,
  modelOptions,
  selectedKey,
  onSelectedKeyChange,
  keys,
  controls,
}: {
  model: string;
  onModelChange: (m: string) => void;
  modelOptions: { id: string }[];
  selectedKey: string;
  onSelectedKeyChange: (k: string) => void;
  keys: { id: string; key: string; name?: string }[];
  controls: LlmChatControls | null;
}) {
  const t = useTranslations("providerTest");
  const hasMessages = controls?.hasMessages ?? false;
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-2 border-b border-border bg-bg-subtle/30 shrink-0">
      <Select
        compact
        label={t("model")}
        value={model}
        onChange={(e) => onModelChange(e.target.value)}
        className="min-w-0 flex-1 text-xs"
        selectClassName="text-xs"
      >
        {modelOptions.length === 0 && <option value="">—</option>}
        {modelOptions.map((m) => (
          <option key={m.id} value={m.id}>
            {m.id}
          </option>
        ))}
      </Select>
      {keys.length > 0 && (
        <Select
          compact
          label={t("key")}
          value={selectedKey}
          onChange={(e) => onSelectedKeyChange(e.target.value)}
          className="text-xs"
          selectClassName="text-xs"
        >
          <option value="">({t("defaultKey")})</option>
          {keys.map((k) => (
            <option key={k.id} value={k.key}>
              {k.name ?? k.id}
            </option>
          ))}
        </Select>
      )}
      {hasMessages && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => controls?.clear()}
          title={t("clearConversation")}
          className="gap-1 text-[11px] text-text-muted hover:text-text-main"
        >
          <Icon name="delete_sweep" size={14} />
          {t("clear")}
        </Button>
      )}
    </div>
  );
}

function SlideOverTabs({
  tab,
  onChange,
  label,
}: {
  tab: TabKey;
  onChange: (next: TabKey) => void;
  label: string;
}) {
  const translate = useTranslations("providerTest");
  return (
    <Tabs
      variant="underline"
      value={tab}
      onValueChange={(next) => onChange(next as TabKey)}
      className="shrink-0 border-b border-border px-4 pt-2"
    >
      <TabsList aria-label={label}>
        {TABS.map((tabItem) => (
          <TabsTrigger
            key={tabItem.key}
            value={tabItem.key}
            // The panels are rendered by the slide-over itself (no TabsContent).
            aria-controls={undefined}
            className="gap-1.5 text-xs"
          >
            <Icon name={tabItem.icon} size={16} />
            <span>{translate(`tabs.${tabItem.label}`)}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

function TabPlaceholder({ icon, title, body }: { icon: string; title: string; body: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-10 text-center flex-1 min-h-0 overflow-y-auto">
      <div className="size-12 rounded-full bg-accent/10 flex items-center justify-center">
        <Icon name={icon} size={24} className="text-accent" />
      </div>
      <h3 className="text-sm font-semibold text-text-main">{title}</h3>
      <div className="text-xs text-text-muted max-w-sm">{body}</div>
    </div>
  );
}

interface LogEntry {
  id: string | number;
  timestamp: string;
  model?: string;
  requestedModel?: string;
  provider?: string;
  providerDisplay?: string | null;
  status?: number;
  duration?: number;
  tokens?: { in?: number; out?: number };
  account?: string;
  apiKey?: string;
  apiKeyName?: string;
  apiKeyId?: string;
}

function formatRequester(
  log: LogEntry,
  unknownRequester: string
): { label: string; title: string } {
  const name = log.apiKeyName || log.account;
  const keyHint = log.apiKey || log.apiKeyId;
  const masked =
    typeof keyHint === "string" && keyHint.length > 8
      ? `${keyHint.slice(0, 4)}…${keyHint.slice(-4)}`
      : keyHint || "";
  if (name && masked) return { label: name, title: `${name} (${masked})` };
  if (name) return { label: name, title: name };
  if (masked) return { label: masked, title: keyHint || masked };
  return { label: "—", title: unknownRequester };
}

type LogsState =
  | { status: "loading" }
  | { status: "ready"; logs: LogEntry[] }
  | { status: "error"; message: string };

function LogsTab({ providerId }: { providerId: string }) {
  const t = useTranslations("providerTest");
  const [state, setState] = useState<LogsState>({ status: "loading" });
  const [expanded, setExpanded] = useState<string | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();

    async function load() {
      try {
        const url = `/api/usage/call-logs?provider=${encodeURIComponent(providerId)}&limit=20`;
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        const logs: LogEntry[] = Array.isArray(data) ? data : (data?.logs ?? []);
        setState({ status: "ready", logs });
      } catch (err) {
        if (cancelled || (err as { name?: string })?.name === "AbortError") return;
        setState({ status: "error", message: (err as Error).message || t("failedToLoadLogs") });
      }
    }

    void load();
    const interval = setInterval(load, 2000);

    return () => {
      cancelled = true;
      ctrl.abort();
      clearInterval(interval);
    };
  }, [providerId, refreshTick, t]);

  const handleRefresh = useCallback(() => setRefreshTick((n) => n + 1), []);

  if (state.status === "loading") {
    return (
      <div className="flex-1 min-h-0 flex items-center justify-center text-xs text-text-muted gap-2">
        <Icon name="progress_activity" size={18} className="animate-spin" />
        {t("loadingLogs")}
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <TabPlaceholder icon="error" title={t("failedToLoadLogs")} body={<p>{state.message}</p>} />
    );
  }

  if (state.logs.length === 0) {
    return (
      <TabPlaceholder
        icon="receipt_long"
        title={t("noLogsYet")}
        body={
          <>
            <p>{t("noLogsDescription")}</p>
            <a
              href={`/dashboard/logs?connection=${encodeURIComponent(providerId)}`}
              className="mt-2 inline-flex items-center gap-1 text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("openFullLogs")}
              <Icon name="open_in_new" size={14} />
            </a>
          </>
        }
      />
    );
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border shrink-0">
        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider text-text-muted font-medium">
          <span className="inline-flex items-center gap-1.5">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-success">{t("live")}</span>
          </span>
          <span aria-hidden>·</span>
          <span>{t("tailingLast", { count: state.logs.length })}</span>
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          title={t("refreshNow")}
          className="gap-1 text-[10px] text-text-muted hover:text-text-main"
        >
          <Icon name="refresh" size={14} />
          {t("refresh")}
        </Button>
      </div>
      <ul className="flex-1 min-h-0 overflow-y-auto divide-y divide-border/40">
        {state.logs.map((log) => {
          const key = String(log.id);
          const isExpanded = expanded === key;
          const statusOk = typeof log.status === "number" && log.status >= 200 && log.status < 400;
          const statusColor = statusOk
            ? "text-success"
            : typeof log.status === "number"
              ? "text-error"
              : "text-text-muted";
          const requester = formatRequester(log, t("unknownRequester"));
          return (
            <li key={key}>
              <Button
                variant="ghost"
                aria-expanded={isExpanded}
                onClick={() => setExpanded(isExpanded ? null : key)}
                className="h-auto w-full justify-start gap-3 rounded-none px-4 py-2 text-left font-normal hover:bg-bg-subtle"
              >
                <span className={`text-[11px] font-mono shrink-0 w-10 ${statusColor}`}>
                  {log.status ?? "—"}
                </span>
                <span className="text-[11px] text-text-muted shrink-0 w-20 font-mono">
                  {formatRelativeTs(log.timestamp)}
                </span>
                <div className="flex-1 min-w-0 flex flex-col">
                  <span
                    className="text-xs truncate text-text-main"
                    title={log.model || log.requestedModel}
                  >
                    {log.model || log.requestedModel || "—"}
                  </span>
                  <span
                    className="text-[10px] text-text-muted truncate font-mono"
                    title={requester.title}
                  >
                    {requester.label}
                  </span>
                </div>
                <span className="text-[11px] text-text-muted shrink-0 font-mono w-14 text-right">
                  {formatDurationMs(log.duration)}
                </span>
                <Icon
                  name="chevron_right"
                  size={16}
                  className={cn("text-text-muted transition-transform", isExpanded && "rotate-90")}
                />
              </Button>
              {isExpanded && <LogDetail log={log} />}
            </li>
          );
        })}
      </ul>
      <div className="px-4 py-2 border-t border-border text-[10px] text-text-muted text-center shrink-0">
        <a
          href={`/dashboard/logs?connection=${encodeURIComponent(providerId)}`}
          className="inline-flex items-center gap-1 hover:text-text-main hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("openFullLogs")}
          <Icon name="open_in_new" size={12} />
        </a>
      </div>
    </div>
  );
}

function LogDetail({ log }: { log: LogEntry }) {
  const t = useTranslations("providerTest");
  const requester = formatRequester(log, t("unknownRequester"));
  const tokensIn = log.tokens?.in;
  const tokensOut = log.tokens?.out;
  const rows: { label: string; value: string; mono?: boolean }[] = [
    { label: t("fields.timestamp"), value: new Date(log.timestamp).toLocaleString(), mono: true },
    { label: t("fields.status"), value: String(log.status ?? "—") },
    { label: t("fields.duration"), value: formatDurationMs(log.duration) },
    { label: t("fields.model"), value: log.model || "—", mono: true },
    { label: t("fields.requestedModel"), value: log.requestedModel || "—", mono: true },
    { label: t("fields.provider"), value: log.providerDisplay || log.provider || "—", mono: true },
    { label: t("fields.requester"), value: requester.title, mono: true },
    {
      label: t("fields.tokens"),
      value:
        tokensIn != null || tokensOut != null ? `in ${tokensIn ?? 0} · out ${tokensOut ?? 0}` : "—",
    },
  ];
  return (
    <dl className="px-4 py-3 bg-bg-subtle/40 border-t border-border grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1.5 text-[11px]">
      {rows.map((row) => (
        <div key={row.label} className="contents">
          <dt className="text-text-muted uppercase tracking-wider text-[10px] font-medium">
            {row.label}
          </dt>
          <dd className={`text-text-main min-w-0 break-words ${row.mono ? "font-mono" : ""}`}>
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function formatRelativeTs(ts: string | undefined): string {
  if (!ts) return "—";
  const date = new Date(ts);
  if (isNaN(date.getTime())) return "—";
  const diff = (Date.now() - date.getTime()) / 1000;
  if (diff < 60) return `${Math.max(0, Math.floor(diff))}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString();
}

function formatDurationMs(ms: number | undefined): string {
  if (ms == null) return "—";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}
