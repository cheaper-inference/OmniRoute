"use client";

import { useTranslations } from "next-intl";
import { TYPE_COLORS, LEVEL_COLORS, PROVIDER_COLORS } from "@/shared/constants/colors";
import {
  formatDuration as formatLatency,
  maskAccount,
  maskSegment,
} from "@/shared/utils/formatting";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import Badge from "./Badge";
import Modal, { TALL_MODAL_PROPS } from "./Modal";

/**
 * Proxy log detail modal — shows full proxy event metadata, error info, and config.
 * Extracted from ProxyLogger.js for maintainability.
 */
/**
 * Proxy label for the detail pane: the registry name when the log carries one
 * (`murphy-eu-fr (http://host:port)`), else `type://host:port`, else the direct label.
 * Module-scope so the component's cyclomatic complexity stays inside the ratchet.
 */
function formatProxyLabel(proxy, directLabel) {
  if (!proxy) return directLabel;
  const endpoint = `${proxy.type}://${proxy.host}:${proxy.port}`;
  return proxy.name ? `${proxy.name} (${endpoint})` : endpoint;
}

// Per-attempt durations from send start; unknown stays a dash, never 0.
function formatAttemptTiming(ms: unknown): string {
  if (typeof ms !== "number") return "—";
  return ms === 0 ? "0ms" : formatLatency(ms);
}

function ObservedField({ label, children }) {
  return (
    <div>
      <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{label}</div>
      <div className="text-sm font-medium font-mono">{children}</div>
    </div>
  );
}

function ObservedLinkField({ label, href, title, short }) {
  return (
    <div>
      <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{label}</div>
      {href ? (
        <a
          href={href}
          title={title}
          className="text-sm font-medium font-mono text-primary hover:underline break-all"
        >
          {short}…
        </a>
      ) : (
        <div className="text-sm text-text-muted">—</div>
      )}
    </div>
  );
}

function StatusBadges({ log, t }) {
  const typeColor = TYPE_COLORS[log.proxy?.type] || {
    bg: "#6B7280",
    text: "#fff",
    label: log.proxy?.type || "-",
  };
  const levelColor = LEVEL_COLORS[log.level] || LEVEL_COLORS.direct;
  const providerColor = PROVIDER_COLORS[log.provider] || {
    bg: "#374151",
    text: "#fff",
    label: (log.provider || "-").toUpperCase(),
  };
  return (
    <>
      <div>
        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{t("type")}</div>
        <span
          className="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase"
          style={{ backgroundColor: typeColor.bg, color: typeColor.text }}
        >
          {typeColor.label}
        </span>
      </div>
      <div>
        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
          {t("level")}
        </div>
        <span
          className="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase"
          style={{ backgroundColor: levelColor.bg, color: levelColor.text }}
        >
          {levelColor.label}
        </span>
      </div>
      <div>
        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
          {t("provider")}
        </div>
        {log.provider ? (
          <span
            className="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase"
            style={{ backgroundColor: providerColor.bg, color: providerColor.text }}
          >
            {providerColor.label}
          </span>
        ) : (
          <div className="text-sm text-text-muted">—</div>
        )}
      </div>
      <TlsBadge log={log} t={t} />
    </>
  );
}

function TlsBadge({ log, t }) {
  return (
    <div>
      <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
        {t("tlsFingerprint")}
      </div>
      {log.tlsFingerprint ? (
        <Badge variant="info" className="text-[10px] font-bold uppercase">
          <span aria-hidden="true">🔒</span> Chrome 124
        </Badge>
      ) : (
        <div className="text-sm text-text-muted">{t("directNative")}</div>
      )}
    </div>
  );
}

function ObservedMetadataGrid({ log, t, emailsVisible }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-bg-subtle rounded-xl border border-border">
      <div>
        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{t("time")}</div>
        <div className="text-sm font-medium">{formatDateValue(log.timestamp)}</div>
      </div>
      <div>
        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
          {t("latency")}
        </div>
        <div className="text-sm font-medium">{formatLatency(log.latencyMs)}</div>
      </div>
      <div>
        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
          {t("clientIp")}
        </div>
        <div className="text-sm font-medium font-mono text-success">{log.clientIp || "—"}</div>
      </div>
      <div>
        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
          {t("proxy")}
        </div>
        <div className="text-sm font-medium font-mono text-primary">
          {formatProxyLabel(log.proxy, t("direct"))}
        </div>
      </div>
      <StatusBadges log={log} t={t} />
      <ObservedField label={t("upstreamStatus")}>
        {typeof log.upstreamStatus === "number" ? String(log.upstreamStatus) : t("noResponse")}
      </ObservedField>
      <ObservedField label={t("headersAfter")}>{formatAttemptTiming(log.headersMs)}</ObservedField>
      <ObservedField label={t("firstChunkAfter")}>
        {formatAttemptTiming(log.firstChunkMs)}
      </ObservedField>
      <ObservedField label={t("egressIp")}>
        <span className="text-success">{maskSegment(log.egressIp) || "—"}</span>
      </ObservedField>
      <ObservedLinkField
        label={t("correlationId")}
        href={
          log.correlationId
            ? `/dashboard/logs?correlationId=${encodeURIComponent(log.correlationId)}`
            : null
        }
        title={log.correlationId}
        short={log.correlationId?.slice(0, 12)}
      />
      <ObservedField label={t("servedBy")}>
        {maskAccount(log.rotationAccount ?? log.account, emailsVisible) || "—"}
      </ObservedField>
      <div className="col-span-2">
        <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
          {t("targetUrl")}
        </div>
        <div className="text-sm font-medium font-mono text-text-muted break-all">
          {log.targetUrl || "—"}
        </div>
      </div>
    </div>
  );
}

function formatDateValue(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR") + ", " + d.toLocaleTimeString("en-US", { hour12: false });
  } catch {
    return iso;
  }
}

// Proxy status string → kit Badge tone.
function proxyStatusTone(status: unknown) {
  if (status === "success") return "success" as const;
  if (status === "error") return "error" as const;
  if (status === "timeout") return "warning" as const;
  return "default" as const;
}

export default function ProxyLogDetail({ log, onClose }) {
  const t = useTranslations("proxyLog");
  const { emailsVisible } = useEmailPrivacyStore();

  // The Modal adapter (kit Dialog) owns Escape, the overlay click, the focus trap and the
  // focus return.
  return (
    <Modal
      isOpen
      onClose={onClose}
      maxWidth="700px"
      size="full"
      {...TALL_MODAL_PROPS}
      title={
        <span className="flex items-center gap-3">
          <Badge variant={proxyStatusTone(log.status)} className="font-bold uppercase">
            {log.status}
          </Badge>
          <span>{t("event")}</span>
        </span>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Metadata Grid */}
        <ObservedMetadataGrid log={log} t={t} emailsVisible={emailsVisible} />

        {/* Error */}
        {log.error && (
          <div className="rounded-xl border border-error/30 bg-error/10 p-4">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-error">
              {t("error")}
            </div>
            <div className="font-mono text-sm text-error">{log.error}</div>
          </div>
        )}

        {/* Proxy Config Details */}
        {log.proxy && (
          <div className="rounded-xl border border-border bg-bg-subtle p-4">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
              {t("configuration")}
            </div>
            <pre className="overflow-x-auto rounded-lg bg-surface-2 p-3 font-mono text-xs text-text-primary">
              {JSON.stringify(log.proxy, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </Modal>
  );
}
