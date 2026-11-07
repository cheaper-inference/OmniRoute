"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { DataTableFooter, DataTableShell } from "@omniroute/ui-kit/data-table-shell";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@omniroute/ui-kit/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { TableLoadingState } from "@omniroute/ui-kit/table-loading";
import { Badge, Button, EmptyState, Input, Select } from "@/shared/components";
import Icon from "@/shared/components/Icon";

type AuditEntry = {
  id: number;
  timestamp: string;
  action: string;
  actor: string;
  target?: string | null;
  details?: unknown;
  metadata?: unknown;
  ip_address?: string | null;
  ip?: string | null;
  resourceType?: string | null;
  status?: string | null;
  requestId?: string | null;
};

type Severity = "info" | "warning" | "critical";

const PAGE_SIZE = 50;

function getSeverity(entry: AuditEntry): Severity {
  const action = entry.action.toLowerCase();
  const status = (entry.status || "").toLowerCase();

  if (
    status === "error" ||
    status === "failed" ||
    status === "blocked" ||
    action.includes("blocked") ||
    action.includes("denied") ||
    action.includes("violation") ||
    action.includes("delete") ||
    action.includes("remove")
  ) {
    return "critical";
  }

  if (status === "warning" || action.includes("warning") || action.includes("validate")) {
    return "warning";
  }

  return "info";
}

function formatJson(value: unknown) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function formatLocalDate(value: string) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export default function ComplianceTab() {
  const t = useTranslations("compliance");
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [eventType, setEventType] = useState("");
  const [actor, setActor] = useState("");
  const [severity, setSeverity] = useState<"all" | Severity>("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (actor) params.set("actor", actor);
      params.set("limit", String(PAGE_SIZE));
      params.set("offset", String(offset));
      if (eventType) params.set("action", eventType);
      if (from) params.set("from", from);
      if (to) params.set("to", to);

      const response = await fetch(`/api/compliance/audit-log?${params.toString()}`);
      const data = await response.json().catch(() => []);
      if (!response.ok) {
        throw new Error(data.error || t("failedFetch"));
      }

      setEntries(Array.isArray(data) ? data : []);
      const total = Number(response.headers.get("x-total-count") || "0");
      setTotalCount(Number.isFinite(total) ? total : 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("failedFetch"));
    } finally {
      setLoading(false);
    }
  }, [actor, eventType, from, offset, t, to]);

  useEffect(() => {
    void (async () => {
      await fetchEntries();
    })();
  }, [fetchEntries]);

  const visibleEntries = useMemo(() => {
    if (severity === "all") return entries;
    return entries.filter((entry) => getSeverity(entry) === severity);
  }, [entries, severity]);

  const eventTypes = useMemo(() => {
    return Array.from(new Set(entries.map((entry) => entry.action).filter(Boolean))).sort();
  }, [entries]);

  const actors = useMemo(() => {
    return Array.from(new Set(entries.map((entry) => entry.actor).filter(Boolean))).sort();
  }, [entries]);

  const canGoNext = offset + PAGE_SIZE < totalCount;

  const resetFilters = () => {
    setEventType("");
    setActor("");
    setSeverity("all");
    setFrom("");
    setTo("");
    setOffset(0);
  };

  const exportVisibleEntries = () => {
    const payload = JSON.stringify(visibleEntries, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `omniroute-compliance-audit-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const severityTone = (value: Severity) => {
    if (value === "critical") return "error" as const;
    if (value === "warning") return "warning" as const;
    return "info" as const;
  };

  const pageButtons = (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOffset((current) => Math.max(0, current - PAGE_SIZE))}
        disabled={offset === 0 || loading}
      >
        {t("previous")}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOffset((current) => current + PAGE_SIZE)}
        disabled={!canGoNext || loading}
      >
        {t("next")}
      </Button>
    </div>
  );

  return (
    <div className="space-y-5">
      <PageHeader
        compact
        title={t("title")}
        description={t("description")}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              icon="refresh"
              loading={loading}
              onClick={() => void fetchEntries()}
            >
              {t("refresh")}
            </Button>
            <Button
              variant="outline"
              icon="download"
              onClick={exportVisibleEntries}
              disabled={visibleEntries.length === 0}
            >
              {t("export")}
            </Button>
          </div>
        }
      />

      {error && (
        <Alert
          variant="critical"
          icon={<Icon name="error" size={16} />}
          dismissLabel={t("dismissError")}
          onDismiss={() => setError(null)}
          description={error}
        />
      )}

      <DataTableShell
        filterAlignment="end"
        resultCount={totalCount}
        resultLabel={() => t("showing", { count: visibleEntries.length, total: totalCount })}
        filters={
          <>
            <div>
              <Input
                label={t("eventType")}
                list="compliance-event-types"
                value={eventType}
                onChange={(event) => {
                  setOffset(0);
                  setEventType(event.target.value);
                }}
                placeholder={t("eventTypePlaceholder")}
                className="w-full sm:w-48"
              />
              <datalist id="compliance-event-types">
                {eventTypes.map((type) => (
                  <option key={type} value={type} />
                ))}
              </datalist>
            </div>
            <div>
              <Input
                label={t("actor")}
                list="compliance-actors"
                value={actor}
                onChange={(event) => {
                  setOffset(0);
                  setActor(event.target.value);
                }}
                placeholder={t("actorPlaceholder")}
                className="w-full sm:w-44"
              />
              <datalist id="compliance-actors">
                {actors.map((a) => (
                  <option key={a} value={a} />
                ))}
              </datalist>
            </div>
            <Select
              label={t("severity")}
              value={severity}
              onChange={(event) => {
                setOffset(0);
                setSeverity(event.target.value as "all" | Severity);
              }}
              className="w-full sm:w-40"
            >
              <option value="all">{t("allSeverities")}</option>
              <option value="info">{t("info")}</option>
              <option value="warning">{t("warning")}</option>
              <option value="critical">{t("critical")}</option>
            </Select>
            <Input
              type="datetime-local"
              label={t("from")}
              value={from}
              onChange={(event) => {
                setOffset(0);
                setFrom(event.target.value);
              }}
              className="w-full sm:w-52"
            />
            <Input
              type="datetime-local"
              label={t("to")}
              value={to}
              onChange={(event) => {
                setOffset(0);
                setTo(event.target.value);
              }}
              className="w-full sm:w-52"
            />
            <Button variant="ghost" onClick={resetFilters}>
              {t("clearFilters")}
            </Button>
          </>
        }
        pagination={<DataTableFooter pagination={pageButtons} />}
      >
        {loading ? (
          <TableLoadingState label={t("loading")} />
        ) : visibleEntries.length === 0 ? (
          <EmptyState icon="policy" title={t("noEvents")} />
        ) : (
          <Table scrollbarLabel={t("title")} className="min-w-[1040px] text-left">
            <TableHeader>
              <TableRow>
                <TableHead>{t("timestamp")}</TableHead>
                <TableHead>{t("eventType")}</TableHead>
                <TableHead>{t("severity")}</TableHead>
                <TableHead>{t("sourceIp")}</TableHead>
                <TableHead>{t("userOrKey")}</TableHead>
                <TableHead>{t("action")}</TableHead>
                <TableHead>{t("result")}</TableHead>
                <TableHead className="text-right">{t("details")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleEntries.map((entry) => {
                const entrySeverity = getSeverity(entry);
                return (
                  <TableRow key={entry.id}>
                    <TableCell className="font-mono text-xs text-text-muted">
                      {formatLocalDate(entry.timestamp)}
                    </TableCell>
                    <TableCell>
                      <Badge size="sm" className="font-mono">
                        {t.has(`eventTypes.${entry.action}`)
                          ? t(`eventTypes.${entry.action}`)
                          : entry.action}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge size="sm" variant={severityTone(entrySeverity)}>
                        {t(entrySeverity)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-text-muted">
                      {entry.ip_address || entry.ip || t("notAvailable")}
                    </TableCell>
                    <TableCell className="text-text-main">{entry.actor || t("system")}</TableCell>
                    <TableCell className="max-w-[220px] truncate text-text-muted">
                      {entry.target || entry.resourceType || t("notAvailable")}
                    </TableCell>
                    <TableCell className="text-text-muted">
                      {entry.status || t("notAvailable")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => setSelectedEntry(entry)}>
                        {t("viewDetails")}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </DataTableShell>

      <Sheet
        open={selectedEntry !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedEntry(null);
        }}
      >
        {/* showClose={false}: the kit close button hard-codes an English label. */}
        <SheetContent side="right" showClose={false} className="w-full sm:max-w-2xl">
          <SheetHeader className="flex flex-row items-center justify-between gap-3">
            <div className="min-w-0">
              <SheetTitle>{t("details")}</SheetTitle>
              <SheetDescription>
                {selectedEntry
                  ? `${selectedEntry.action} · ${formatLocalDate(selectedEntry.timestamp)}`
                  : ""}
              </SheetDescription>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={t("closeDetails")}
              onClick={() => setSelectedEntry(null)}
            >
              <Icon name="close" size={18} />
            </Button>
          </SheetHeader>
          <SheetBody>
            <pre className="overflow-auto whitespace-pre-wrap break-words rounded-lg border border-border bg-bg-subtle p-4 font-mono text-xs text-text-main">
              {selectedEntry ? formatJson(selectedEntry) : ""}
            </pre>
          </SheetBody>
        </SheetContent>
      </Sheet>
    </div>
  );
}
