"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";

import type { AgentSessionReportRow } from "@/lib/usage/agentSessionReports";
import { Button, ColumnToggle } from "@/shared/components";
import { fmtCompact, formatCost } from "@/shared/utils/formatting";

import {
  SESSION_COLUMNS,
  type SessionColumn,
  type SessionColumnVisibility,
} from "../sessionColumns";
import { formatDateTime, formatSpan, splitTokens } from "./format";
import { CacheTokens, useTokenLabels } from "./TokenFigures";

interface ColumnDef {
  key: SessionColumn;
  header: string;
  /** Number columns are right-aligned. */
  numeric?: boolean;
  cellClass?: string;
  cell: (session: AgentSessionReportRow) => ReactNode;
}

const DASH = "-";

function useColumnDefs(): ColumnDef[] {
  const t = useTranslations("reports");
  const tokenLabels = useTokenLabels();
  const defs: Record<SessionColumn, Omit<ColumnDef, "key">> = {
    member: {
      header: t("member"),
      cellClass: "font-medium",
      cell: (s) => s.apiKeyName ?? s.apiKeyId ?? DASH,
    },
    project: {
      header: t("project"),
      cellClass: "font-mono text-xs",
      cell: (s) => s.projectName ?? DASH,
    },
    client: { header: t("client"), cellClass: "text-text-muted", cell: (s) => s.client ?? DASH },
    branch: {
      header: t("colBranch"),
      cellClass: "font-mono text-xs text-text-muted",
      cell: (s) => s.gitBranch ?? DASH,
    },
    requests: { header: t("colRequests"), numeric: true, cell: (s) => s.requests },
    errors: {
      header: t("colErrors"),
      numeric: true,
      cellClass: "text-error",
      cell: (s) => (s.errors > 0 ? s.errors : <span className="text-text-muted">0</span>),
    },
    activeTime: { header: t("colActiveTime"), numeric: true, cell: (s) => formatSpan(s.activeMs) },
    mainModel: {
      header: t("colMainModel"),
      cellClass: "font-mono text-xs",
      cell: (s) => s.mainModel ?? DASH,
    },
    input: {
      header: tokenLabels.input,
      numeric: true,
      cell: (s) => fmtCompact(splitTokens(s.tokens).input),
    },
    output: { header: tokenLabels.output, numeric: true, cell: (s) => fmtCompact(s.tokens.output) },
    cache: {
      header: tokenLabels.cache,
      numeric: true,
      cell: (s) => <CacheTokens split={splitTokens(s.tokens)} />,
    },
    reasoning: {
      header: t("colReasoning"),
      numeric: true,
      cell: (s) => fmtCompact(s.tokens.reasoning),
    },
    cost: {
      header: t("colCost"),
      numeric: true,
      cellClass: "font-mono text-success",
      cell: (s) => formatCost(s.costUsd),
    },
    firstSeen: {
      header: t("colFirstSeenWindow"),
      cellClass: "text-text-muted",
      cell: (s) => formatDateTime(s.windowFirstSeenAt),
    },
    lastActive: {
      header: t("colLastActive"),
      cellClass: "text-text-muted",
      cell: (s) => formatDateTime(s.windowLastSeenAt),
    },
  };
  return SESSION_COLUMNS.map((key) => ({ key, ...defs[key] }));
}

/** The column picker for the list; the kit menu behind `ColumnToggle` keeps it keyboard-operable. */
export function SessionColumnPicker({
  visible,
  onToggle,
}: {
  visible: SessionColumnVisibility;
  onToggle: (column: string) => void;
}) {
  const columns = useColumnDefs().map(({ key, header }) => ({ key, label: header }));
  return <ColumnToggle columns={columns} visible={visible} onToggle={onToggle} />;
}

export default function SessionsTable({
  sessions,
  visible,
  onSelect,
}: {
  sessions: AgentSessionReportRow[];
  visible: SessionColumnVisibility;
  onSelect: (id: string) => void;
}) {
  const t = useTranslations("reports");
  const columns = useColumnDefs().filter((column) => visible[column.key]);
  return (
    <Table className="text-sm" scrollbarLabel={t("tab_sessions")}>
      <TableHeader>
        <TableRow className="text-left text-xs uppercase tracking-wider text-text-muted">
          {columns.map((column) => (
            <TableHead
              key={column.key}
              className={`py-2 px-3 ${column.numeric ? "text-right" : ""}`}
            >
              {column.header}
            </TableHead>
          ))}
          <TableHead className="py-2 px-3" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.map((session) => (
          <TableRow key={session.id}>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                className={`py-2.5 px-3 ${column.numeric ? "text-right tabular-nums" : ""} ${column.cellClass ?? ""}`}
              >
                {column.cell(session)}
              </TableCell>
            ))}
            <TableCell className="py-2.5 px-3 text-right">
              <Button variant="ghost" size="sm" onClick={() => onSelect(session.id)}>
                {t("details")}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
