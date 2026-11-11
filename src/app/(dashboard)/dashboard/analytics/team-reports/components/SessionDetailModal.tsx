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

import type { AgentSessionRecord } from "@/lib/db/agentSessions";
import type {
  AgentSessionReportDetail,
  PricedSessionRequest,
} from "@/lib/usage/agentSessionReports";
import { Button, Modal } from "@/shared/components";
import { fmtCompact, formatCost } from "@/shared/utils/formatting";

import {
  NO_VALUE,
  formatDateTime,
  formatLatency,
  formatRatio,
  formatSpan,
  splitTokens,
} from "./format";
import { sessionRequestsExportParams } from "../reportExport";
import { useReportExport } from "../useReportExport";
import ExportMenu, { ExportNote } from "./ExportMenu";
import SessionTimeline from "./SessionTimeline";
import { CacheTokens, useTokenLabels } from "./TokenFigures";

/** Requests per page of the detail; the endpoint accepts 1..200. */
export const REQUESTS_PAGE_SIZE = 50;

type SessionDetail = AgentSessionReportDetail & { session: AgentSessionRecord };

function RecentRequestsTable({ requests }: { requests: PricedSessionRequest[] }) {
  const t = useTranslations("reports");
  const tokenLabels = useTokenLabels();
  const head = "py-2 px-2";
  const num = "py-1.5 px-2 text-right tabular-nums";
  return (
    <div className="max-h-[50vh] overflow-auto">
      <Table className="text-xs" scrollbarLabel={t("recentRequests")}>
        <TableHeader>
          <TableRow className="text-left text-text-muted">
            <TableHead className={head}>{t("colTime")}</TableHead>
            <TableHead className={head}>{t("provider")}</TableHead>
            <TableHead className={head}>{t("colModel")}</TableHead>
            <TableHead className={head}>{t("serviceTier")}</TableHead>
            <TableHead className={`${head} text-right`}>{tokenLabels.input}</TableHead>
            <TableHead className={`${head} text-right`}>{tokenLabels.output}</TableHead>
            <TableHead className={`${head} text-right`}>{tokenLabels.cache}</TableHead>
            <TableHead className={`${head} text-right`}>{t("colReasoning")}</TableHead>
            <TableHead className={`${head} text-right`}>{t("colLatency")}</TableHead>
            <TableHead className={`${head} text-right`}>{t("colTtft")}</TableHead>
            <TableHead className={head}>{t("colStatus")}</TableHead>
            <TableHead className={head}>{t("errorCode")}</TableHead>
            <TableHead className={`${head} text-right`}>{t("colCost")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => {
            const split = splitTokens(request.tokens);
            return (
              <TableRow key={request.id}>
                <TableCell className="py-1.5 px-2 text-text-muted">
                  {formatDateTime(request.timestamp)}
                </TableCell>
                <TableCell className="py-1.5 px-2">{request.provider ?? "-"}</TableCell>
                <TableCell className="py-1.5 px-2 font-mono">{request.model ?? "-"}</TableCell>
                <TableCell className="py-1.5 px-2">{request.serviceTier}</TableCell>
                <TableCell className={num}>{fmtCompact(split.input)}</TableCell>
                <TableCell className={num}>{fmtCompact(split.output)}</TableCell>
                <TableCell className={num}>
                  <CacheTokens split={split} />
                </TableCell>
                <TableCell className={num}>{fmtCompact(request.tokens.reasoning)}</TableCell>
                <TableCell className={num}>{formatLatency(request.latencyMs)}</TableCell>
                <TableCell className={num}>{formatLatency(request.ttftMs)}</TableCell>
                <TableCell
                  className={`py-1.5 px-2 ${request.success ? "text-success" : "text-error"}`}
                >
                  {request.status ?? (request.success ? "ok" : "error")}
                </TableCell>
                <TableCell className="py-1.5 px-2 font-mono">{request.errorCode ?? "-"}</TableCell>
                <TableCell className={`${num} font-mono`}>
                  {request.priced ? (
                    formatCost(request.costUsd)
                  ) : (
                    <span title={t("costUnpriced")}>
                      {NO_VALUE}
                      <span className="sr-only"> ({t("costUnpriced")})</span>
                    </span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function RequestsPager({
  offset,
  shown,
  total,
  onOffset,
}: {
  offset: number;
  shown: number;
  total: number;
  onOffset: (offset: number) => void;
}) {
  const t = useTranslations("reports");
  const from = shown === 0 ? 0 : offset + 1;
  const to = offset + shown;
  return (
    <div className="flex items-center justify-between gap-2 text-xs">
      <Button
        variant="outline"
        size="sm"
        disabled={offset === 0}
        onClick={() => onOffset(Math.max(0, offset - REQUESTS_PAGE_SIZE))}
      >
        {t("previous")}
      </Button>
      <span className="text-text-muted" aria-live="polite">
        {t("requestsRange", { from, to, total })}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={to >= total}
        onClick={() => onOffset(offset + REQUESTS_PAGE_SIZE)}
      >
        {t("next")}
      </Button>
    </div>
  );
}

export default function SessionDetailModal({
  sessionId,
  onClose,
}: {
  sessionId: string;
  onClose: () => void;
}) {
  const t = useTranslations("reports");
  const tokenLabels = useTokenLabels();
  const [offset, setOffset] = useState(0);
  // The previous page stays on screen while the next one loads.
  const [detail, setDetail] = useState<SessionDetail | null>(null);
  // The offset whose load failed, so moving to another page clears the message.
  const [failedAt, setFailedAt] = useState<number | null>(null);
  const failed = failedAt === offset;
  const { note, busy, run } = useReportExport();

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      limit: String(REQUESTS_PAGE_SIZE),
      offset: String(offset),
    });
    fetch(`/api/reports/sessions/${encodeURIComponent(sessionId)}?${params}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setDetail)
      .catch(() => {
        if (!controller.signal.aborted) setFailedAt(offset);
      });
    return () => controller.abort();
  }, [sessionId, offset]);

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
          [t("colReasoning"), fmtCompact(totals.tokens.reasoning)],
          [t("kpiWallTime"), formatSpan(totals.wallMs)],
          [t("kpiActiveTime"), formatSpan(totals.activeMs)],
          [t("kpiModelTime"), formatSpan(totals.modelMs)],
          [t("kpiAvgLatency"), formatLatency(totals.avgLatencyMs)],
          [t("kpiP95Latency"), formatLatency(totals.p95LatencyMs)],
          [t("kpiAvgTtft"), formatLatency(totals.avgTtftMs)],
          [t("kpiCacheHitRate"), formatRatio(totals.cacheHitRate)],
          [t("firstSeenAllTime"), formatDateTime(session.firstSeenAt)],
          [t("lastSeenAllTime"), formatDateTime(session.lastSeenAt)],
        ]
      : [];
  return (
    <Modal isOpen onClose={onClose} size="xl" title={t("sessionDetail")}>
      {!session || !totals || !detail ? (
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
          <ul className="space-y-0.5 text-xs text-text-muted">
            <li>{t("helpWallTime")}</li>
            <li>{t("helpActiveTime")}</li>
            <li>{t("helpModelTime")}</li>
          </ul>
          {session.projectPath && (
            <p className="truncate font-mono text-xs text-text-muted">{session.projectPath}</p>
          )}
          <SessionTimeline timeline={detail.timeline} />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-semibold">{t("recentRequests")}</h4>
            <ExportMenu
              label={t("exportRequests")}
              disabled={busy}
              onExport={(format) =>
                void run(sessionRequestsExportParams(sessionId, format), format)
              }
            />
          </div>
          <ExportNote note={note} />
          {failed && (
            <p role="alert" className="text-xs text-error">
              {t("loadFailed")}
            </p>
          )}
          <div className={failed ? "opacity-60" : undefined}>
            <RecentRequestsTable requests={detail.recentRequests} />
          </div>
          <RequestsPager
            offset={offset}
            shown={detail.recentRequests.length}
            total={detail.requestsTotal}
            onOffset={setOffset}
          />
        </div>
      )}
    </Modal>
  );
}
