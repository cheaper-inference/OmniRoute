"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { DataTableFooter, DataTableShell } from "@omniroute/ui-kit/data-table-shell";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { TableLoadingState } from "@omniroute/ui-kit/table-loading";
import { Badge, Button, Card, EmptyState, Input, Select } from "@/shared/components";
import Icon from "@/shared/components/Icon";

type McpAuditEntry = {
  id: number;
  toolName: string;
  inputHash: string;
  outputSummary: string;
  durationMs: number;
  apiKeyId: string | null;
  success: boolean;
  errorCode: string | null;
  createdAt: string;
};

type McpAuditResponse = {
  entries: McpAuditEntry[];
  total: number;
  limit: number;
  offset: number;
};

type McpAuditStats = {
  totalCalls: number;
  successRate: number;
  avgDurationMs: number;
  topTools: Array<{ tool: string; count: number }>;
};

const MCP_PAGE_SIZE = 25;

export default function McpAuditTab() {
  const t = useTranslations("compliance");
  const [data, setData] = useState<McpAuditResponse>({
    entries: [],
    total: 0,
    limit: MCP_PAGE_SIZE,
    offset: 0,
  });
  const [stats, setStats] = useState<McpAuditStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [toolFilter, setToolFilter] = useState("");
  const [successFilter, setSuccessFilter] = useState<"all" | "true" | "false">("all");
  const [offset, setOffset] = useState(0);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/mcp/audit/stats");
      if (res.ok) setStats((await res.json()) as McpAuditStats);
    } catch {
      // non-fatal
    }
  }, []);

  useEffect(() => {
    void (async () => {
      await fetchStats();
    })();
  }, [fetchStats]);

  const fetchAudit = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("limit", String(MCP_PAGE_SIZE));
      params.set("offset", String(offset));
      if (toolFilter) params.set("tool", toolFilter);
      if (successFilter !== "all") params.set("success", successFilter);

      const response = await fetch(`/api/mcp/audit?${params.toString()}`);
      const json = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(json.error || t("failedFetchMcpAudit"));
      }

      setData({
        entries: Array.isArray(json.entries) ? json.entries : [],
        total: Number(json.total || 0),
        limit: Number(json.limit || MCP_PAGE_SIZE),
        offset: Number(json.offset || offset),
      });
    } finally {
      setLoading(false);
    }
  }, [offset, successFilter, t, toolFilter]);

  useEffect(() => {
    void (async () => {
      await fetchAudit();
    })();
  }, [fetchAudit]);

  return (
    <div className="space-y-5">
      <PageHeader
        compact
        title={t("mcpAudit")}
        description={t("mcpAuditDesc")}
        actions={
          <Button
            variant="outline"
            icon="refresh"
            loading={loading}
            onClick={() => {
              void fetchAudit();
              void fetchStats();
            }}
          >
            {t("refresh")}
          </Button>
        }
      />

      {stats && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            {
              label: t("mcpMetricCalls24h"),
              value: stats.totalCalls.toLocaleString(),
              icon: "terminal",
            },
            {
              label: t("mcpMetricSuccessRate"),
              value: `${Math.round(stats.successRate * 100)}%`,
              icon: "check_circle",
              highlight: stats.successRate >= 0.9,
            },
            {
              label: t("mcpMetricAvgDuration"),
              value: `${Math.round(stats.avgDurationMs)}ms`,
              icon: "timer",
            },
            {
              label: t("mcpMetricTopTool"),
              value: stats.topTools[0]?.tool ?? "—",
              icon: "star",
            },
          ].map((item) => (
            <Card key={item.label} padding="none" className="px-4 py-3">
              <div className="mb-1 flex items-center gap-2">
                <Icon name={item.icon} size={14} className="text-text-muted" />
                <span className="text-xs uppercase tracking-wider text-text-muted">
                  {item.label}
                </span>
              </div>
              <p
                className={
                  item.highlight
                    ? "truncate text-lg font-semibold text-success"
                    : "truncate text-lg font-semibold text-text-main"
                }
              >
                {item.value}
              </p>
            </Card>
          ))}
        </div>
      )}

      <DataTableShell
        filterAlignment="end"
        resultCount={data.total}
        resultLabel={() => t("showing", { count: data.entries.length, total: data.total })}
        filters={
          <>
            <Input
              label={t("tool")}
              value={toolFilter}
              onChange={(event) => {
                setOffset(0);
                setToolFilter(event.target.value);
              }}
              placeholder={t("toolPlaceholder")}
              className="w-full sm:w-56"
            />
            <Select
              label={t("result")}
              value={successFilter}
              onChange={(event) => {
                setOffset(0);
                setSuccessFilter(event.target.value as "all" | "true" | "false");
              }}
              className="w-full sm:w-44"
            >
              <option value="all">{t("allResults")}</option>
              <option value="true">{t("success")}</option>
              <option value="false">{t("failure")}</option>
            </Select>
            <Button
              variant="ghost"
              onClick={() => {
                setToolFilter("");
                setSuccessFilter("all");
                setOffset(0);
              }}
            >
              {t("clearFilters")}
            </Button>
          </>
        }
        pagination={
          <DataTableFooter
            pagination={
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOffset((current) => Math.max(0, current - MCP_PAGE_SIZE))}
                  disabled={offset === 0 || loading}
                >
                  {t("previous")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOffset((current) => current + MCP_PAGE_SIZE)}
                  disabled={offset + MCP_PAGE_SIZE >= data.total || loading}
                >
                  {t("next")}
                </Button>
              </div>
            }
          />
        }
      >
        {loading ? (
          <TableLoadingState label={t("loading")} />
        ) : data.entries.length === 0 ? (
          <EmptyState icon="terminal" title={t("noMcpEvents")} />
        ) : (
          <Table scrollbarLabel={t("mcpAudit")} className="min-w-[860px] text-left">
            <TableHeader>
              <TableRow>
                <TableHead>{t("timestamp")}</TableHead>
                <TableHead>{t("tool")}</TableHead>
                <TableHead>{t("duration")}</TableHead>
                <TableHead>{t("result")}</TableHead>
                <TableHead>{t("apiKey")}</TableHead>
                <TableHead>{t("output")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-mono text-xs text-text-muted">
                    {new Date(entry.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-text-main">
                    {entry.toolName}
                  </TableCell>
                  <TableCell className="text-text-muted">{entry.durationMs}ms</TableCell>
                  <TableCell>
                    <Badge size="sm" variant={entry.success ? "success" : "error"}>
                      {entry.success ? t("success") : entry.errorCode || t("failure")}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-text-muted">
                    {entry.apiKeyId || t("notAvailable")}
                  </TableCell>
                  <TableCell className="max-w-[280px] truncate text-xs text-text-muted">
                    {entry.outputSummary || t("notAvailable")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTableShell>
    </div>
  );
}
