"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Select from "@/shared/components/Select";
import { useTranslations } from "next-intl";

type A2ATaskState = "submitted" | "working" | "completed" | "failed" | "cancelled";

type A2AStatus = {
  status: "ok";
  tasks: {
    counts: Record<A2ATaskState, number>;
    total: number;
    activeStreams: number;
    lastTaskAt: string | null;
  };
  agent: {
    name: string;
    description: string;
    version: string;
    url: string;
  } | null;
  capabilities: Record<string, unknown> | null;
  skills: Array<{
    id: string;
    name: string;
    description: string;
    tags?: string[];
  }>;
};

type TaskArtifact = {
  type: "text" | "json" | "error";
  content: string;
};

type TaskEvent = {
  timestamp: string;
  state: A2ATaskState;
  message?: string;
};

type A2ATask = {
  id: string;
  skill: string;
  state: A2ATaskState;
  input: {
    skill: string;
    messages: Array<{ role: string; content: string }>;
    metadata?: Record<string, unknown>;
  };
  artifacts: TaskArtifact[];
  events: TaskEvent[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
};

type TaskListResponse = {
  tasks: A2ATask[];
  total: number;
  limit: number;
  offset: number;
};

const PAGE_SIZE = 20;
const TASK_STATES: Array<"all" | A2ATaskState> = [
  "all",
  "submitted",
  "working",
  "completed",
  "failed",
  "cancelled",
];

function stateClass(state: A2ATaskState) {
  if (state === "completed") return "bg-success/15 text-success";
  if (state === "failed") return "bg-error/15 text-error";
  if (state === "working") return "bg-warning/15 text-warning";
  if (state === "cancelled") return "bg-surface-2 text-text-muted";
  return "bg-info/15 text-info";
}

export default function A2ADashboardPage() {
  const t = useTranslations("a2aDashboard");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<A2AStatus | null>(null);

  const [stateFilter, setStateFilter] = useState<"all" | A2ATaskState>("all");
  const [skillFilter, setSkillFilter] = useState("");
  const [offset, setOffset] = useState(0);
  const [tasksData, setTasksData] = useState<TaskListResponse>({
    tasks: [],
    total: 0,
    limit: PAGE_SIZE,
    offset: 0,
  });
  const [tasksLoading, setTasksLoading] = useState(false);

  const [selectedTask, setSelectedTask] = useState<A2ATask | null>(null);
  const [actionMessage, setActionMessage] = useState("");
  const [actionBusy, setActionBusy] = useState<null | "cancel" | "send" | "stream">(null);

  const refreshStatus = useCallback(async () => {
    const response = await fetch("/api/a2a/status");
    if (!response.ok) return;
    const json = await response.json();
    setStatus(json);
  }, []);

  const refreshTasks = useCallback(async () => {
    setTasksLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("limit", String(PAGE_SIZE));
      params.set("offset", String(offset));
      if (stateFilter !== "all") params.set("state", stateFilter);
      if (skillFilter) params.set("skill", skillFilter);

      const response = await fetch(`/api/a2a/tasks?${params.toString()}`);
      if (!response.ok) return;
      const json = await response.json();
      setTasksData({
        tasks: Array.isArray(json.tasks) ? json.tasks : [],
        total: Number(json.total || 0),
        limit: Number(json.limit || PAGE_SIZE),
        offset: Number(json.offset || 0),
      });
    } finally {
      setTasksLoading(false);
    }
  }, [offset, stateFilter, skillFilter]);

  useEffect(() => {
    // Async continuation — the compiler rejects sync calls to setter-capturing
    // callbacks from the effect body (react-hooks/set-state-in-effect).
    void (async () => {
      await Promise.allSettled([refreshStatus(), refreshTasks()]);
      setLoading(false);
    })();
    const interval = setInterval(() => {
      void refreshStatus();
      void refreshTasks();
    }, 30000);
    return () => clearInterval(interval);
  }, [refreshStatus, refreshTasks]);

  useEffect(() => {
    // Async continuation — see above.
    void (async () => {
      await refreshTasks();
    })();
  }, [refreshTasks]);

  const availableSkills = useMemo(() => {
    const values = new Set<string>();
    for (const skill of status?.skills || []) values.add(skill.id);
    for (const task of tasksData.tasks) values.add(task.skill);
    return Array.from(values.values()).sort();
  }, [status, tasksData.tasks]);

  const currentPage = Math.floor(tasksData.offset / PAGE_SIZE) + 1;
  const totalPages = Math.max(1, Math.ceil(tasksData.total / PAGE_SIZE));

  const handleLoadTask = async (taskId: string) => {
    const response = await fetch(`/api/a2a/tasks/${encodeURIComponent(taskId)}`);
    if (!response.ok) return;
    const json = await response.json();
    setSelectedTask(json.task || null);
  };

  const handleCancelTask = async (taskId: string) => {
    if (!globalThis.confirm(t("confirmCancelTask", { taskId }))) return;
    setActionBusy("cancel");
    setActionMessage("");
    try {
      const response = await fetch(`/api/a2a/tasks/${encodeURIComponent(taskId)}/cancel`, {
        method: "POST",
      });
      if (!response.ok) {
        const json = await response.json().catch(() => ({}));
        setActionMessage(json?.error || t("cancelTaskFailed"));
        return;
      }
      setActionMessage(t("cancelTaskSuccess", { taskId }));
      await refreshStatus();
      await refreshTasks();
      if (selectedTask?.id === taskId) {
        await handleLoadTask(taskId);
      }
    } finally {
      setActionBusy(null);
    }
  };

  const handleSmokeSend = async () => {
    setActionBusy("send");
    setActionMessage("");
    try {
      const response = await fetch("/a2a", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "dashboard-send",
          method: "message/send",
          params: {
            skill: "quota-management",
            messages: [{ role: "user", content: "Show a short quota summary." }],
          },
        }),
      });

      const json = await response.json().catch(() => ({}));
      if (!response.ok || json?.error) {
        setActionMessage(json?.error?.message || t("smokeSendFailed"));
        return;
      }

      const taskId = json?.result?.task?.id;
      setActionMessage(taskId ? t("smokeSendSuccessWithTask", { taskId }) : t("smokeSendSuccess"));
      await refreshStatus();
      await refreshTasks();
    } finally {
      setActionBusy(null);
    }
  };

  const handleSmokeStream = async () => {
    setActionBusy("stream");
    setActionMessage("");
    try {
      const response = await fetch("/a2a", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "dashboard-stream",
          method: "message/stream",
          params: {
            skill: "quota-management",
            messages: [{ role: "user", content: "Stream a short quota summary." }],
          },
        }),
      });

      if (!response.ok || !response.body) {
        const text = await response.text().catch(() => "");
        setActionMessage(text || t("smokeStreamFailed"));
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let streamTaskId: string | null = null;
      let terminalState: string | null = null;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";

        for (const part of parts) {
          if (!part.startsWith("data: ")) continue;
          const payload = part.slice("data: ".length);
          let parsed: any;
          try {
            parsed = JSON.parse(payload);
          } catch {
            continue;
          }
          const nextTaskId = parsed?.params?.task?.id;
          const nextState = parsed?.params?.task?.state;
          if (nextTaskId) streamTaskId = nextTaskId;
          if (typeof nextState === "string") {
            if (["completed", "failed", "cancelled"].includes(nextState)) {
              terminalState = nextState;
            }
          }
        }
      }

      if (streamTaskId) {
        setActionMessage(
          t("smokeStreamSuccessWithTask", {
            taskId: streamTaskId,
            stateSuffix: terminalState ? `, ${t(`state.${terminalState as A2ATaskState}`)}` : "",
          })
        );
      } else {
        setActionMessage(t("smokeStreamNoTaskId"));
      }
      await refreshStatus();
      await refreshTasks();
    } finally {
      setActionBusy(null);
    }
  };

  if (loading) {
    return <div className="text-sm text-text-muted">{t("loading")}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label={t("health")} value={status?.status === "ok" ? t("ok") : "—"} />
        <StatCard label={t("totalTasks")} value={status?.tasks?.total || 0} />
        <StatCard label={t("activeStreams")} value={status?.tasks?.activeStreams || 0} />
        <StatCard
          label={t("lastTask")}
          value={
            status?.tasks?.lastTaskAt ? new Date(status.tasks.lastTaskAt).toLocaleTimeString() : "—"
          }
        />
      </div>

      <Card className="p-5">
        <h2 className="text-lg font-semibold mb-4">{t("taskStateOverview")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {(["submitted", "working", "completed", "failed", "cancelled"] as A2ATaskState[]).map(
            (state) => (
              <div key={state} className="rounded-lg border border-border p-3 bg-bg">
                <p className="text-xs text-text-muted uppercase">{t(`state.${state}`)}</p>
                <p className="text-2xl font-semibold mt-1">{status?.tasks?.counts?.[state] || 0}</p>
              </div>
            )
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="p-5">
          <h2 className="text-lg font-semibold mb-3">{t("agentCard")}</h2>
          {status?.agent ? (
            <div className="space-y-2 text-sm">
              <p className="font-semibold">{status.agent.name}</p>
              <p className="text-text-muted">{status.agent.description}</p>
              <p>
                {t("version")}: <span className="font-mono">{status.agent.version}</span>
              </p>
              <p>
                {t("url")}: <span className="font-mono text-xs break-all">{status.agent.url}</span>
              </p>
              <div className="pt-2">
                <p className="text-xs uppercase text-text-muted mb-1">{t("capabilities")}</p>
                <code className="text-xs break-all">
                  {JSON.stringify(status.capabilities || {}, null, 2)}
                </code>
              </div>
            </div>
          ) : (
            <p className="text-sm text-text-muted">{t("agentCardNotAvailable")}</p>
          )}
        </Card>

        <Card className="p-5">
          <h2 className="text-lg font-semibold mb-3">{t("quickValidation")}</h2>
          <p className="text-sm text-text-muted mb-3">{t("quickValidationDescription")}</p>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleSmokeSend}
              disabled={actionBusy !== null}
            >
              {t("runMessageSend")}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleSmokeStream}
              disabled={actionBusy !== null}
            >
              {t("runMessageStream")}
            </Button>
          </div>
          {actionMessage && <p className="text-sm text-text-muted mt-3">{actionMessage}</p>}
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-semibold">{t("taskManagement")}</h2>
            <p className="text-sm text-text-muted">
              {t("taskSummary", { total: tasksData.total, page: currentPage, totalPages })}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select
              aria-label={t("tableState")}
              value={stateFilter}
              onChange={(event) => {
                setOffset(0);
                setStateFilter(event.target.value as "all" | A2ATaskState);
              }}
            >
              {TASK_STATES.map((state) => (
                <option key={state} value={state}>
                  {state === "all" ? t("allStates") : t(`state.${state}`)}
                </option>
              ))}
            </Select>
            <Select
              aria-label={t("tableSkill")}
              value={skillFilter}
              onChange={(event) => {
                setOffset(0);
                setSkillFilter(event.target.value);
              }}
            >
              <option value="">{t("allSkills")}</option>
              {availableSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {tasksLoading ? (
          <p className="text-sm text-text-muted">{t("loadingTasks")}</p>
        ) : tasksData.tasks.length === 0 ? (
          <p className="text-sm text-text-muted">{t("noTasksForFilters")}</p>
        ) : (
          <div className="overflow-x-auto">
            <Table scrollbarLabel={t("taskManagement")}>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("tableTask")}</TableHead>
                  <TableHead>{t("tableSkill")}</TableHead>
                  <TableHead>{t("tableState")}</TableHead>
                  <TableHead>{t("tablePhase")}</TableHead>
                  <TableHead>{t("tableUpdated")}</TableHead>
                  <TableHead>{t("tableActions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasksData.tasks.map((task) => {
                  const fsmPhase =
                    task.metadata?.fsmPhase || (task.metadata?.workflowFSM as any)?.currentPhase;
                  let fsmBadgeColor = "bg-surface-2 text-text-muted";
                  if (fsmPhase === "plan" || fsmPhase === "plan_review")
                    fsmBadgeColor = "bg-chart-3/15 text-chart-3";
                  else if (fsmPhase === "execute") fsmBadgeColor = "bg-info/15 text-info";
                  else if (
                    ["code_review", "quality_review", "security", "test", "output_review"].includes(
                      fsmPhase
                    )
                  )
                    fsmBadgeColor = "bg-warning/15 text-warning";
                  else if (fsmPhase === "done") fsmBadgeColor = "bg-success/15 text-success";
                  else if (fsmPhase === "failed") fsmBadgeColor = "bg-error/15 text-error";

                  return (
                    <TableRow key={task.id}>
                      <TableCell className="font-mono">{task.id}</TableCell>
                      <TableCell>{task.skill}</TableCell>
                      <TableCell>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${stateClass(task.state)}`}
                        >
                          {t(`state.${task.state}`)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {fsmPhase ? (
                          <span
                            className={`text-xs px-2 py-1 rounded border border-current/20 font-medium ${fsmBadgeColor}`}
                          >
                            {fsmPhase}
                          </span>
                        ) : (
                          <span className="text-xs text-text-muted">—</span>
                        )}
                      </TableCell>
                      <TableCell>{new Date(task.updatedAt).toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleLoadTask(task.id)}
                          >
                            {t("view")}
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleCancelTask(task.id)}
                            disabled={
                              task.state === "completed" ||
                              task.state === "failed" ||
                              task.state === "cancelled" ||
                              actionBusy === "cancel"
                            }
                          >
                            {t("cancel")}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button
            size="sm"
            variant="secondary"
            disabled={offset === 0}
            onClick={() => setOffset((current) => Math.max(0, current - PAGE_SIZE))}
          >
            {t("previous")}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            disabled={offset + PAGE_SIZE >= tasksData.total}
            onClick={() =>
              setOffset((current) =>
                current + PAGE_SIZE < tasksData.total ? current + PAGE_SIZE : current
              )
            }
          >
            {t("next")}
          </Button>
        </div>
      </Card>

      {selectedTask && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">{t("taskDetail")}</h2>
            <Button size="sm" variant="secondary" onClick={() => setSelectedTask(null)}>
              {t("close")}
            </Button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border p-3 bg-bg">
              <p className="text-xs uppercase text-text-muted mb-2">{t("metadata")}</p>
              <code className="text-xs break-all whitespace-pre-wrap">
                {JSON.stringify(
                  {
                    id: selectedTask.id,
                    skill: selectedTask.skill,
                    state: selectedTask.state,
                    createdAt: selectedTask.createdAt,
                    updatedAt: selectedTask.updatedAt,
                    expiresAt: selectedTask.expiresAt,
                    metadata: selectedTask.metadata,
                  },
                  null,
                  2
                )}
              </code>
            </div>
            <div className="rounded-lg border border-border p-3 bg-bg">
              <p className="text-xs uppercase text-text-muted mb-2">{t("events")}</p>
              <code className="text-xs break-all whitespace-pre-wrap">
                {JSON.stringify(selectedTask.events, null, 2)}
              </code>
            </div>
          </div>
          <div className="rounded-lg border border-border p-3 bg-bg mt-4">
            <p className="text-xs uppercase text-text-muted mb-2">{t("artifacts")}</p>
            <code className="text-xs break-all whitespace-pre-wrap">
              {JSON.stringify(selectedTask.artifacts, null, 2)}
            </code>
          </div>
        </Card>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-border bg-bg p-4">
      <p className="text-xs text-text-muted uppercase tracking-wide">{label}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </div>
  );
}
