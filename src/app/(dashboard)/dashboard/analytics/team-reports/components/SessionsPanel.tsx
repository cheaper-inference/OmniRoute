"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";

import type { AgentSessionRecentUsage, AgentSessionRecord } from "@/lib/db/agentSessions";
import type { AgentSessionReportRow, SessionReportTotals } from "@/lib/usage/agentSessionReports";
import { Button, Modal, Select } from "@/shared/components";
import { fmtCompact, formatCost } from "@/shared/utils/formatting";

import { SESSION_SORT_FIELDS, type SessionOrder, type SessionSort } from "../reportFilters";
import { formatDateTime, splitTokens } from "./format";
import { CacheTokens, useTokenLabels } from "./TokenFigures";

const PAGE_SIZE = 25;

interface SessionsPanelProps {
  /** Report filters as a query string; paging and sorting are added here. */
  query: string;
  /** Bumped by the page's refresh button. */
  refreshToken: number;
  /** Owned by the page so the CSV export can follow the list order. */
  order: SessionOrder;
  onOrderChange: (order: SessionOrder) => void;
}

interface SessionDetail {
  session: AgentSessionRecord;
  recentRequests: AgentSessionRecentUsage[];
  /** All-time totals at read-time prices. */
  totals: SessionReportTotals;
}

function RecentRequestsTable({ requests }: { requests: AgentSessionRecentUsage[] }) {
  const t = useTranslations("reports");
  const tokenLabels = useTokenLabels();
  return (
    <div className="max-h-[50vh] overflow-auto">
      <Table className="text-xs" scrollbarLabel={t("recentRequests")}>
        <TableHeader>
          <TableRow className="text-left text-text-muted">
            <TableHead className="py-2 px-2">{t("colTime")}</TableHead>
            <TableHead className="py-2 px-2">{t("provider")}</TableHead>
            <TableHead className="py-2 px-2">{t("colModel")}</TableHead>
            <TableHead className="py-2 px-2 text-right">{tokenLabels.input}</TableHead>
            <TableHead className="py-2 px-2 text-right">{tokenLabels.output}</TableHead>
            <TableHead className="py-2 px-2 text-right">{tokenLabels.cache}</TableHead>
            <TableHead className="py-2 px-2 text-right">{t("colLatency")}</TableHead>
            <TableHead className="py-2 px-2">{t("colStatus")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="py-1.5 px-2 text-text-muted">
                {formatDateTime(request.timestamp)}
              </TableCell>
              <TableCell className="py-1.5 px-2">{request.provider ?? "-"}</TableCell>
              <TableCell className="py-1.5 px-2 font-mono">{request.model ?? "-"}</TableCell>
              <TableCell className="py-1.5 px-2 text-right tabular-nums">
                {fmtCompact(splitTokens(request.tokens).input)}
              </TableCell>
              <TableCell className="py-1.5 px-2 text-right tabular-nums">
                {fmtCompact(splitTokens(request.tokens).output)}
              </TableCell>
              <TableCell className="py-1.5 px-2 text-right tabular-nums">
                <CacheTokens split={splitTokens(request.tokens)} />
              </TableCell>
              <TableCell className="py-1.5 px-2 text-right tabular-nums">
                {request.latencyMs}ms
              </TableCell>
              <TableCell
                className={`py-1.5 px-2 ${request.success ? "text-success" : "text-error"}`}
              >
                {request.status ?? (request.success ? "ok" : "error")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function SessionDetailModal({ sessionId, onClose }: { sessionId: string; onClose: () => void }) {
  const t = useTranslations("reports");
  const tokenLabels = useTokenLabels();
  const [detail, setDetail] = useState<SessionDetail | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/reports/sessions/${encodeURIComponent(sessionId)}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setDetail)
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      });
    return () => controller.abort();
  }, [sessionId]);

  const session = detail?.session;
  const totals = detail?.totals;
  const tokens = totals && splitTokens(totals.tokens);
  const facts: Array<[string, ReactNode]> =
    session && totals && tokens
      ? [
          [t("member"), session.apiKeyName ?? session.apiKeyId ?? "-"],
          [t("project"), session.projectName ?? "-"],
          [t("colBranch"), session.gitBranch ?? "-"],
          [t("colCost"), formatCost(totals.costUsd)],
          [t("colRequests"), `${totals.requests} (${totals.errors} ${t("colErrors")})`],
          [tokenLabels.input, fmtCompact(tokens.input)],
          [tokenLabels.output, fmtCompact(tokens.output)],
          [tokenLabels.cache, <CacheTokens key="cache" split={tokens} />],
          [t("firstSeenAllTime"), formatDateTime(session.firstSeenAt)],
          [t("lastSeenAllTime"), formatDateTime(session.lastSeenAt)],
        ]
      : [];
  return (
    <Modal isOpen onClose={onClose} size="xl" title={t("sessionDetail")}>
      {!session || !totals ? (
        <p className="py-8 text-center text-sm text-text-muted">
          {failed ? t("loadFailed") : t("loading")}
        </p>
      ) : (
        <div className="space-y-4 text-sm">
          <dl className="grid grid-cols-2 gap-3 rounded-lg border border-border p-3 sm:grid-cols-4">
            {facts.map(([term, value]) => (
              <div key={term}>
                <dt className="text-xs uppercase text-text-muted">{term}</dt>
                <dd className="font-medium text-text-main">{value}</dd>
              </div>
            ))}
          </dl>
          {session.projectPath && (
            <p className="truncate font-mono text-xs text-text-muted">{session.projectPath}</p>
          )}
          <h4 className="font-semibold">{t("recentRequests")}</h4>
          <RecentRequestsTable requests={detail.recentRequests} />
        </div>
      )}
    </Modal>
  );
}

function SortControls({
  sort,
  desc,
  onSort,
  onToggleOrder,
}: {
  sort: SessionSort;
  desc: boolean;
  onSort: (sort: SessionSort) => void;
  onToggleOrder: () => void;
}) {
  const t = useTranslations("reports");
  return (
    <div className="flex items-end gap-2">
      <Select
        label={t("sortBy")}
        value={sort}
        onChange={(event) => onSort(event.target.value as SessionSort)}
        options={SESSION_SORT_FIELDS.map((field) => ({ value: field, label: t(`sort_${field}`) }))}
      />
      <Button variant="outline" onClick={onToggleOrder}>
        {desc ? t("sortDesc") : t("sortAsc")}
      </Button>
    </div>
  );
}

function SessionRow({
  session,
  onSelect,
}: {
  session: AgentSessionReportRow;
  onSelect: (id: string) => void;
}) {
  const t = useTranslations("reports");
  const tokens = splitTokens(session.tokens);
  return (
    <TableRow>
      <TableCell className="py-2.5 px-3 font-medium">
        {session.apiKeyName ?? session.apiKeyId ?? "-"}
      </TableCell>
      <TableCell className="py-2.5 px-3 font-mono text-xs">{session.projectName ?? "-"}</TableCell>
      <TableCell className="py-2.5 px-3 text-text-muted">{session.client ?? "-"}</TableCell>
      <TableCell className="py-2.5 px-3 font-mono text-xs text-text-muted">
        {session.gitBranch ?? "-"}
      </TableCell>
      <TableCell className="py-2.5 px-3 text-right tabular-nums">
        {session.requests}
        {session.errors > 0 && (
          <span className="ml-1 text-xs text-error">
            ({session.errors} {t("colErrors")})
          </span>
        )}
      </TableCell>
      <TableCell className="py-2.5 px-3 text-right tabular-nums">
        {fmtCompact(tokens.input)}
      </TableCell>
      <TableCell className="py-2.5 px-3 text-right tabular-nums">
        {fmtCompact(tokens.output)}
      </TableCell>
      <TableCell className="py-2.5 px-3 text-right tabular-nums">
        <CacheTokens split={tokens} />
      </TableCell>
      <TableCell className="py-2.5 px-3 text-right font-mono tabular-nums text-success">
        {formatCost(session.costUsd)}
      </TableCell>
      <TableCell className="py-2.5 px-3 text-text-muted">
        {formatDateTime(session.windowLastSeenAt)}
      </TableCell>
      <TableCell className="py-2.5 px-3 text-right">
        <Button variant="ghost" size="sm" onClick={() => onSelect(session.id)}>
          {t("details")}
        </Button>
      </TableCell>
    </TableRow>
  );
}

function SessionsTable({
  sessions,
  onSelect,
}: {
  sessions: AgentSessionReportRow[];
  onSelect: (id: string) => void;
}) {
  const t = useTranslations("reports");
  const tokenLabels = useTokenLabels();
  return (
    <Table className="text-sm" scrollbarLabel={t("tab_sessions")}>
      <TableHeader>
        <TableRow className="text-left text-xs uppercase tracking-wider text-text-muted">
          <TableHead className="py-2 px-3">{t("member")}</TableHead>
          <TableHead className="py-2 px-3">{t("project")}</TableHead>
          <TableHead className="py-2 px-3">{t("client")}</TableHead>
          <TableHead className="py-2 px-3">{t("colBranch")}</TableHead>
          <TableHead className="py-2 px-3 text-right">{t("colRequests")}</TableHead>
          <TableHead className="py-2 px-3 text-right">{tokenLabels.input}</TableHead>
          <TableHead className="py-2 px-3 text-right">{tokenLabels.output}</TableHead>
          <TableHead className="py-2 px-3 text-right">{tokenLabels.cache}</TableHead>
          <TableHead className="py-2 px-3 text-right">{t("colCost")}</TableHead>
          <TableHead className="py-2 px-3">{t("colLastActive")}</TableHead>
          <TableHead className="py-2 px-3" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.map((session) => (
          <SessionRow key={session.id} session={session} onSelect={onSelect} />
        ))}
      </TableBody>
    </Table>
  );
}

function Pager({
  page,
  pages,
  total,
  onPage,
}: {
  page: number;
  pages: number;
  total: number;
  onPage: (page: number) => void;
}) {
  const t = useTranslations("reports");
  return (
    <div className="flex items-center justify-between border-t border-border/30 pt-3 text-xs">
      <Button variant="outline" size="sm" disabled={page === 0} onClick={() => onPage(page - 1)}>
        {t("previous")}
      </Button>
      <span className="text-text-muted">{t("pageOf", { page: page + 1, pages, total })}</span>
      <Button
        variant="outline"
        size="sm"
        disabled={page + 1 >= pages}
        onClick={() => onPage(page + 1)}
      >
        {t("next")}
      </Button>
    </div>
  );
}

export default function SessionsPanel({
  query,
  refreshToken,
  order,
  onOrderChange,
}: SessionsPanelProps) {
  const t = useTranslations("reports");
  const { sort, desc } = order;
  // Paging is tied to the query it was chosen for, so a filter change starts again at page 1.
  const [paging, setPaging] = useState({ query, page: 0 });
  const page = paging.query === query ? paging.page : 0;
  const [data, setData] = useState<{ sessions: AgentSessionReportRow[]; total: number } | null>(
    null
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(query);
    params.set("sort", sort);
    params.set("order", desc ? "desc" : "asc");
    params.set("limit", String(PAGE_SIZE));
    params.set("offset", String(page * PAGE_SIZE));
    const controller = new AbortController();
    fetch(`/api/reports/sessions?${params}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((next) => next && setData(next))
      .catch(() => {
        // Aborted by a newer query or a failed load; the last page stays visible.
      });
    return () => controller.abort();
  }, [query, sort, desc, page, refreshToken]);

  const total = data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-xs text-text-muted">{t("sessionsWindowHintV2")}</p>
        <SortControls
          sort={sort}
          desc={desc}
          onSort={(next) => onOrderChange({ sort: next, desc })}
          onToggleOrder={() => onOrderChange({ sort, desc: !desc })}
        />
      </div>

      {data && data.sessions.length === 0 ? (
        <p className="py-8 text-center text-sm text-text-muted">{t("noData")}</p>
      ) : (
        <SessionsTable sessions={data?.sessions ?? []} onSelect={setSelectedId} />
      )}

      <Pager
        page={page}
        pages={pages}
        total={total}
        onPage={(next) => setPaging({ query, page: next })}
      />

      {selectedId && (
        <SessionDetailModal sessionId={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}
