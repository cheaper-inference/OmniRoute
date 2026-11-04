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
import { Badge, Button, EmptyState, Input, Select } from "@/shared/components";
import type { A2ATask, TaskState } from "@/lib/a2a/taskManager";

type TaskListResponse = {
  tasks: A2ATask[];
  total: number;
  limit: number;
  offset: number;
};

const A2A_PAGE_SIZE = 25;

const STATE_TONES: Record<TaskState, "warning" | "info" | "success" | "error" | "default"> = {
  submitted: "warning",
  working: "info",
  completed: "success",
  failed: "error",
  cancelled: "default",
};

function taskDuration(task: A2ATask): string {
  const ms = new Date(task.updatedAt).getTime() - new Date(task.createdAt).getTime();
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

export default function A2aAuditTab() {
  const t = useTranslations("compliance");
  const [data, setData] = useState<TaskListResponse>({
    tasks: [],
    total: 0,
    limit: A2A_PAGE_SIZE,
    offset: 0,
  });
  const [loading, setLoading] = useState(true);
  const [skillFilter, setSkillFilter] = useState("");
  const [stateFilter, setStateFilter] = useState<TaskState | "all">("all");
  const [offset, setOffset] = useState(0);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("limit", String(A2A_PAGE_SIZE));
      params.set("offset", String(offset));
      if (skillFilter) params.set("skill", skillFilter);
      if (stateFilter !== "all") params.set("state", stateFilter);

      const response = await fetch(`/api/a2a/tasks?${params.toString()}`);
      const json = (await response.json().catch(() => ({}))) as Partial<TaskListResponse>;
      setData({
        tasks: Array.isArray(json.tasks) ? json.tasks : [],
        total: Number(json.total || 0),
        limit: Number(json.limit || A2A_PAGE_SIZE),
        offset: Number(json.offset || offset),
      });
    } finally {
      setLoading(false);
    }
  }, [offset, skillFilter, stateFilter]);

  useEffect(() => {
    void (async () => {
      await fetchTasks();
    })();
  }, [fetchTasks]);

  return (
    <div className="space-y-5">
      <PageHeader
        compact
        title={t("a2aAudit")}
        description={t("a2aAuditDesc")}
        actions={
          <Button
            variant="outline"
            icon="refresh"
            loading={loading}
            onClick={() => void fetchTasks()}
          >
            {t("refresh")}
          </Button>
        }
      />

      <DataTableShell
        filterAlignment="end"
        resultCount={data.total}
        resultLabel={() => t("a2aShowingTasks", { count: data.tasks.length, total: data.total })}
        filters={
          <>
            <Input
              label={t("a2aSkill")}
              value={skillFilter}
              onChange={(e) => {
                setOffset(0);
                setSkillFilter(e.target.value);
              }}
              placeholder={t("a2aSkillPlaceholder")}
              className="w-full sm:w-56"
            />
            <Select
              label={t("a2aState")}
              value={stateFilter}
              onChange={(e) => {
                setOffset(0);
                setStateFilter(e.target.value as TaskState | "all");
              }}
              className="w-full sm:w-44"
            >
              <option value="all">{t("a2aAllStates")}</option>
              <option value="submitted">{t("a2aStateSubmitted")}</option>
              <option value="working">{t("a2aStateWorking")}</option>
              <option value="completed">{t("a2aStateCompleted")}</option>
              <option value="failed">{t("a2aStateFailed")}</option>
              <option value="cancelled">{t("a2aStateCancelled")}</option>
            </Select>
            <Button
              variant="ghost"
              onClick={() => {
                setSkillFilter("");
                setStateFilter("all");
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
                  onClick={() => setOffset((c) => Math.max(0, c - A2A_PAGE_SIZE))}
                  disabled={offset === 0 || loading}
                >
                  {t("previous")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOffset((c) => c + A2A_PAGE_SIZE)}
                  disabled={offset + A2A_PAGE_SIZE >= data.total || loading}
                >
                  {t("next")}
                </Button>
              </div>
            }
          />
        }
      >
        {loading ? (
          <TableLoadingState label={t("a2aLoadingTasks")} />
        ) : data.tasks.length === 0 ? (
          <EmptyState icon="device_hub" title={t("a2aNoTasks")} />
        ) : (
          <Table scrollbarLabel={t("a2aAudit")} className="min-w-[760px] text-left">
            <TableHeader>
              <TableRow>
                <TableHead>{t("timestamp")}</TableHead>
                <TableHead>{t("a2aTaskId")}</TableHead>
                <TableHead>{t("a2aSkill")}</TableHead>
                <TableHead>{t("a2aState")}</TableHead>
                <TableHead>{t("duration")}</TableHead>
                <TableHead>{t("a2aEvents")}</TableHead>
                <TableHead>{t("a2aArtifacts")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-mono text-xs text-text-muted">
                    {new Date(task.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-text-muted">
                    {task.id.slice(0, 8)}&hellip;
                  </TableCell>
                  <TableCell className="font-mono text-xs text-text-main">{task.skill}</TableCell>
                  <TableCell>
                    <Badge size="sm" variant={STATE_TONES[task.state]}>
                      {t(`a2aState${task.state.charAt(0).toUpperCase()}${task.state.slice(1)}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-text-muted">{taskDuration(task)}</TableCell>
                  <TableCell className="text-text-muted">{task.events.length}</TableCell>
                  <TableCell className="text-text-muted">{task.artifacts.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTableShell>
    </div>
  );
}
