"use client";

import { useState, useEffect, useCallback, useId } from "react";
import Icon from "@/shared/components/Icon";
import { Card, Button, Input, Badge } from "@/shared/components";
import Checkbox from "@/shared/components/Checkbox";
import EmptyState from "@/shared/components/EmptyState";
import Select from "@/shared/components/Select";
import Textarea from "@/shared/components/Textarea";
import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { buttonVariants } from "@omniroute/ui-kit/button";
import { Field } from "@omniroute/ui-kit/field";
import { Switch } from "@omniroute/ui-kit/switch";
import { Tabs, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";

// ── Types ────────────────────────────────────────────────────────────────────

interface CloudAgentTask {
  id: string;
  providerId: string;
  status: "queued" | "running" | "awaiting_approval" | "completed" | "failed" | "cancelled";
  prompt: string;
  source: {
    repoName?: string;
    repoUrl?: string;
    branch?: string;
  };
  createdAt: string;
  updatedAt: string;
  result?: Record<string, unknown> | null;
  error?: string;
  activities: Array<{
    id: string;
    type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
    content: string;
    timestamp: string;
  }>;
}

type TabId = "tasks" | "agents" | "settings";
type TaskStatus = CloudAgentTask["status"];

// ── Constants ────────────────────────────────────────────────────────────────

const CLOUD_AGENTS = [
  {
    id: "jules",
    name: "Jules",
    provider: "Google",
    descriptionKey: "agentDescriptions.jules",
    icon: "smart_toy",
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
  {
    id: "devin",
    name: "Devin",
    provider: "Cognition",
    descriptionKey: "agentDescriptions.devin",
    icon: "psychology",
    iconBg: "bg-info/10",
    iconColor: "text-info",
  },
  {
    id: "codex-cloud",
    name: "Codex Cloud",
    provider: "OpenAI",
    descriptionKey: "agentDescriptions.codexCloud",
    icon: "cloud",
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  {
    id: "cursor-cloud",
    name: "Cursor Cloud",
    provider: "Cursor",
    descriptionKey: "agentDescriptions.cursorCloud",
    icon: "cloud",
    iconBg: "bg-surface-2/10",
    iconColor: "text-text-muted",
  },
];

const STATUS_OPTIONS: { value: TaskStatus | "all"; labelKey: string }[] = [
  { value: "all", labelKey: "filterAll" },
  { value: "queued", labelKey: "statusPending" },
  { value: "running", labelKey: "statusRunning" },
  { value: "awaiting_approval", labelKey: "statusWaitingApproval" },
  { value: "completed", labelKey: "statusCompleted" },
  { value: "failed", labelKey: "statusFailed" },
  { value: "cancelled", labelKey: "statusCancelled" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function getAgentInfo(providerId: string) {
  return CLOUD_AGENTS.find((a) => a.id === providerId) || CLOUD_AGENTS[0];
}

function formatDuration(start: string, end: string) {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  if (ms < 1000) return `${ms}ms`;
  const secs = Math.floor(ms / 1000);
  if (secs < 60) return `${secs}s`;
  const mins = Math.floor(secs / 60);
  const remainSecs = secs % 60;
  return `${mins}m ${remainSecs}s`;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function CloudAgentsPage() {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<TabId>("tasks");
  const t = useTranslations("cloudAgents");
  const tSidebar = useTranslations("sidebar");
  const taskPromptId = useId();

  // ── Tasks state ──────────────────────────────────────────────────────────

  const [tasks, setTasks] = useState<CloudAgentTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [selectedTask, setSelectedTask] = useState<CloudAgentTask | null>(null);
  const [newTask, setNewTask] = useState({
    providerId: "jules",
    prompt: "",
    repoName: "",
    repoUrl: "",
    branch: "main",
    autoCreatePr: true,
  });
  const [messageInput, setMessageInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [providerFilter, setProviderFilter] = useState<string>("all");

  // ── Agents health state ──────────────────────────────────────────────────

  const [agentHealth, setAgentHealth] = useState<Record<string, boolean>>({});

  // ── Settings state (localStorage) ────────────────────────────────────────

  const [settings, setSettings] = useState({
    autoCreatePr: true,
    requireApproval: false,
    enabled: true,
  });

  // ── Load settings from localStorage ──────────────────────────────────────

  useEffect(() => {
    const loadSettings = setTimeout(() => {
      try {
        const stored = localStorage.getItem("omniroute-cloud-agents-settings");
        if (stored) setSettings(JSON.parse(stored));
      } catch {
        // Ignore malformed or unavailable local storage.
      }
    }, 0);
    return () => clearTimeout(loadSettings);
  }, []);

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    try {
      localStorage.setItem("omniroute-cloud-agents-settings", JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  // ── Task helpers ─────────────────────────────────────────────────────────

  const upsertTask = useCallback((task: CloudAgentTask) => {
    setTasks((prev) => {
      const exists = prev.some((c) => c.id === task.id);
      return exists ? prev.map((c) => (c.id === task.id ? task : c)) : [task, ...prev];
    });
    setSelectedTask((current) => (current?.id === task.id ? task : current));
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/agents/tasks");
      if (res.ok) {
        const data = await res.json();
        setTasks(Array.isArray(data.data) ? data.data : []);
      }
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialFetch = setTimeout(() => void fetchTasks(), 0);
    return () => clearTimeout(initialFetch);
  }, [fetchTasks]);

  // ── Auto-poll when tasks are running/queued ──────────────────────────────

  const hasActiveTasks = tasks.some((t) => t.status === "running" || t.status === "queued");

  useEffect(() => {
    if (!hasActiveTasks) return;
    const id = setInterval(() => {
      fetchTasks();
    }, 5000);
    return () => clearInterval(id);
  }, [hasActiveTasks, fetchTasks]);

  // ── Fetch agent health ───────────────────────────────────────────────────

  const fetchAgentHealth = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/agents/health");
      if (res.ok) {
        const data = await res.json();
        if (data.data) setAgentHealth(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch agent health:", err);
    }
  }, []);

  // ── Tab mount effects ────────────────────────────────────────────────────

  useEffect(() => {
    if (activeTab !== "agents") return;
    const healthFetch = setTimeout(() => void fetchAgentHealth(), 0);
    return () => clearTimeout(healthFetch);
  }, [activeTab, fetchAgentHealth]);

  // ── Filtered tasks ───────────────────────────────────────────────────────

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter !== "all" && task.status !== statusFilter) return false;
    if (providerFilter !== "all" && task.providerId !== providerFilter) return false;
    return true;
  });

  // ── Task actions (preserved from original) ───────────────────────────────

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const source = {
        repoName: newTask.repoName.trim(),
        repoUrl: newTask.repoUrl.trim(),
        ...(newTask.branch.trim() ? { branch: newTask.branch.trim() } : {}),
      };
      const res = await fetch("/api/v1/agents/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerId: newTask.providerId,
          prompt: newTask.prompt,
          source,
          options: { autoCreatePr: newTask.autoCreatePr },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.data) upsertTask(data.data);
        setNewTask({
          providerId: "jules",
          prompt: "",
          repoName: "",
          repoUrl: "",
          branch: "main",
          autoCreatePr: true,
        });
      }
    } catch (err) {
      console.error("Failed to create task:", err);
    } finally {
      setCreating(false);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedTask || !messageInput.trim()) return;
    try {
      const res = await fetch(`/api/v1/agents/tasks/${selectedTask.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "message", message: messageInput }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.data) upsertTask(data.data);
        setMessageInput("");
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleApprovePlan = async () => {
    if (!selectedTask) return;
    try {
      const res = await fetch(`/api/v1/agents/tasks/${selectedTask.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve" }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.data) upsertTask(data.data);
      }
    } catch (err) {
      console.error("Failed to approve plan:", err);
    }
  };

  const handleCancelTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/v1/agents/tasks/${taskId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel" }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.data) upsertTask(data.data);
      }
    } catch (err) {
      console.error("Failed to cancel task:", err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/v1/agents/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
        if (selectedTask?.id === taskId) setSelectedTask(null);
      }
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  // ── Render helpers ───────────────────────────────────────────────────────

  const getStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      { variant: "default" | "primary" | "success" | "warning" | "error" | "info"; label: string }
    > = {
      queued: { variant: "default", label: t("statusPending") },
      running: { variant: "info", label: t("statusRunning") },
      awaiting_approval: { variant: "warning", label: t("statusWaitingApproval") },
      completed: { variant: "success", label: t("statusCompleted") },
      failed: { variant: "error", label: t("statusFailed") },
      cancelled: { variant: "default", label: t("statusCancelled") },
    };
    const s = statusMap[status] || statusMap.queued;
    return (
      <Badge variant={s.variant} dot={status === "running"}>
        {s.label}
      </Badge>
    );
  };

  const getPlanText = (task: CloudAgentTask) => {
    return task.activities.find((a) => a.type === "plan")?.content || "";
  };

  const formatResult = (result: CloudAgentTask["result"]) => {
    if (!result) return "";
    if (typeof result === "string") return result;
    return JSON.stringify(result, null, 2);
  };

  // ── Tab definitions ──────────────────────────────────────────────────────

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: "tasks", label: t("tasksTab") || "Tasks", icon: "task_alt" },
    { id: "agents", label: t("agentsTab") || "Agents", icon: "smart_toy" },
    { id: "settings", label: t("settingsTab") || "Settings", icon: "tune" },
  ];

  // ── Loading state ────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div role="status" className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Icon name="progress_activity" size={32} className="animate-spin text-primary" />
        <p className="text-sm text-text-muted">{t("loading")}</p>
      </div>
    );
  }

  // ── Main render ──────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-6">
      {/* Page title (lote 7 pendência 12): the shell title hides when a PageHeader is present. */}
      <PageHeader
        compact
        title={tSidebar("cloudAgents")}
        description={tSidebar("cloudAgentsSubtitle")}
      />
      {/* Header */}
      <Card className="border-primary/20 bg-primary/5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-sm font-semibold text-text-main">{t("aboutTitle")}</h2>
            <p className="text-sm text-text-muted mt-1">{t("aboutDescription")}</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-2 w-2 rounded-full ${settings.enabled ? "bg-success" : "bg-surface-2"}`}
            />
            <span className="text-xs text-text-muted">
              {settings.enabled
                ? t("agentsEnabled") || "Enabled"
                : t("agentsDisabled") || "Disabled"}
            </span>
          </div>
        </div>
      </Card>

      {/* Tab bar — the panels below are rendered by the page (no TabsContent). */}
      <Tabs
        variant="underline"
        value={activeTab}
        onValueChange={(next) => setActiveTab(next as TabId)}
      >
        <TabsList aria-label={t("aboutTitle")}>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} aria-controls={undefined} className="gap-1.5">
              <Icon name={tab.icon} size={16} />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* ── Tasks Tab ──────────────────────────────────────────────────────── */}
      {activeTab === "tasks" && (
        <div className="flex flex-col gap-6">
          {/* Create task form */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Icon name="add_task" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t("newTaskTitle")}</h3>
                <p className="text-sm text-text-muted">{t("newTaskDescription")}</p>
              </div>
            </div>
            <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label={t("selectAgent")}
                  value={newTask.providerId}
                  onChange={(e) => setNewTask({ ...newTask, providerId: e.target.value })}
                >
                  {CLOUD_AGENTS.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name} ({agent.provider})
                    </option>
                  ))}
                </Select>
              </div>
              <Field label={t("taskDescription")} htmlFor={taskPromptId}>
                <Textarea
                  id={taskPromptId}
                  placeholder={t("taskDescriptionPlaceholder")}
                  value={newTask.prompt}
                  onChange={(e) => setNewTask({ ...newTask, prompt: e.target.value })}
                  className="min-h-24 text-sm"
                  required
                />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={t("repositoryName")}
                  placeholder="omniroute"
                  value={newTask.repoName}
                  onChange={(e) => setNewTask({ ...newTask, repoName: e.target.value })}
                  required
                />
                <Input
                  label={t("repositoryUrl")}
                  placeholder="https://github.com/owner/repo"
                  value={newTask.repoUrl}
                  onChange={(e) => setNewTask({ ...newTask, repoUrl: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={t("branch")}
                  placeholder="main"
                  value={newTask.branch}
                  onChange={(e) => setNewTask({ ...newTask, branch: e.target.value })}
                />
                <Checkbox
                  checked={newTask.autoCreatePr}
                  onChange={(e) => setNewTask({ ...newTask, autoCreatePr: e.target.checked })}
                  label={t("settingAutoPR")}
                  className="pt-7 text-sm text-text-muted"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="primary" loading={creating}>
                  <Icon name="rocket_launch" size={16} className="mr-1" />
                  {t("startTask")}
                </Button>
              </div>
            </form>
          </Card>

          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TaskStatus | "all")}
              aria-label={t("statusFilter")}
              className="w-auto"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {t(opt.labelKey) || opt.value}
                </option>
              ))}
            </Select>
            <Select
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              aria-label={t("filterAllProviders") || "All Providers"}
              className="w-auto"
            >
              <option value="all">{t("filterAllProviders") || "All Providers"}</option>
              {CLOUD_AGENTS.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </Select>
            {hasActiveTasks && (
              <span className="flex items-center gap-1.5 text-xs text-info">
                <span className="animate-pulse">●</span>
                {t("autoRefreshing") || "Auto-refreshing"}
              </span>
            )}
          </div>

          {/* Tasks list + detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              {filteredTasks.length === 0 ? (
                <EmptyState
                  icon="assignment"
                  title={t("noTasksTitle") || "No tasks yet"}
                  description={t("noTasksDesc") || "Create your first task to get started."}
                />
              ) : (
                filteredTasks.map((task) => {
                  const agent = getAgentInfo(task.providerId);
                  return (
                    <Card
                      key={task.id}
                      padding="sm"
                      hover
                      className={`transition-all ${
                        selectedTask?.id === task.id ? "!border-primary ring-1 ring-primary/20" : ""
                      }`}
                      onClick={() => setSelectedTask(task)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-lg ${agent.iconBg} ${agent.iconColor}`}>
                            <Icon name={agent.icon} size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text-main line-clamp-1">
                              {task.prompt || t("untitledTask")}
                            </p>
                            <p className="text-xs text-text-muted">
                              {agent.name} · {new Date(task.createdAt).toLocaleString(locale)}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(task.status)}
                      </div>
                    </Card>
                  );
                })
              )}
            </div>

            {/* Task detail panel */}
            <div className="flex flex-col gap-3">
              {selectedTask ? (
                <Card className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-1.5 rounded-lg ${getAgentInfo(selectedTask.providerId).iconBg} ${getAgentInfo(selectedTask.providerId).iconColor}`}
                      >
                        <Icon name={getAgentInfo(selectedTask.providerId).icon} size={16} />
                      </div>
                      <div>
                        <p className="font-medium">{getAgentInfo(selectedTask.providerId).name}</p>
                        <p className="text-xs text-text-muted">
                          {t("created")}: {new Date(selectedTask.createdAt).toLocaleString(locale)}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(selectedTask.status)}
                  </div>

                  {/* Duration for completed/failed tasks */}
                  {selectedTask.status === "completed" && (
                    <div className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Icon name="timer" size={14} />
                      {formatDuration(selectedTask.createdAt, selectedTask.updatedAt)}
                    </div>
                  )}

                  {/* Awaiting approval: show plan */}
                  {selectedTask.status === "awaiting_approval" && getPlanText(selectedTask) && (
                    <div className="rounded-lg border border-warning/20 bg-warning/10 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="description" size={16} className="text-warning" />
                        <span className="text-sm font-medium text-warning">{t("planReady")}</span>
                      </div>
                      <pre className="text-xs text-text-muted whitespace-pre-wrap bg-bg-subtle rounded p-2 max-h-32 overflow-auto">
                        {getPlanText(selectedTask)}
                      </pre>
                      <div className="flex gap-2 mt-2">
                        <Button variant="primary" size="sm" onClick={handleApprovePlan}>
                          <Icon name="check" size={14} className="mr-1" />
                          {t("approvePlan")}
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleCancelTask(selectedTask.id)}
                        >
                          {t("rejectPlan")}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Activities */}
                  {selectedTask.activities.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium">{t("conversation")}</p>
                      <div className="flex flex-col gap-2 max-h-64 overflow-auto">
                        {selectedTask.activities.map((activity) => (
                          <div
                            key={activity.id}
                            className={`p-2 rounded-lg text-xs ${
                              activity.type === "message" || activity.type === "completion"
                                ? "bg-primary/10 text-text-main"
                                : "bg-bg-subtle text-text-main"
                            }`}
                          >
                            <span className="font-medium">
                              {t(`activityTypes.${activity.type}`)}:{" "}
                            </span>
                            {activity.content}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Result with PR link */}
                  {selectedTask.result && (
                    <div className="rounded-lg border border-success/20 bg-success/10 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="check_circle" size={16} className="text-success" />
                        <span className="text-sm font-medium text-success">{t("result")}</span>
                      </div>
                      <pre className="text-xs text-text-muted whitespace-pre-wrap">
                        {formatResult(selectedTask.result)}
                      </pre>
                      {(selectedTask.result as Record<string, unknown>)?.prUrl && (
                        <a
                          href={(selectedTask.result as Record<string, unknown>).prUrl as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={buttonVariants({
                            variant: "secondary",
                            size: "sm",
                            className: "mt-2 gap-1.5 text-xs",
                          })}
                        >
                          <Icon name="open_in_new" size={14} />
                          {t("viewPR") || "View Pull Request"}
                        </a>
                      )}
                    </div>
                  )}

                  {/* Error */}
                  {selectedTask.error && (
                    <div className="rounded-lg border border-error/20 bg-error/10 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="error" size={16} className="text-error" />
                        <span className="text-sm font-medium text-error">{t("error")}</span>
                      </div>
                      <p className="text-xs text-text-muted">{selectedTask.error}</p>
                    </div>
                  )}

                  {/* Message input for running tasks */}
                  {selectedTask.status === "running" && (
                    <div className="flex gap-2">
                      <Input
                        placeholder={t("sendMessagePlaceholder")}
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button
                        variant="primary"
                        size="icon"
                        onClick={handleSendMessage}
                        aria-label={t("sendMessagePlaceholder")}
                      >
                        <Icon name="send" size={16} />
                      </Button>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex justify-between pt-3 border-t border-border/30">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCancelTask(selectedTask.id)}
                      disabled={["completed", "failed", "cancelled"].includes(selectedTask.status)}
                    >
                      <Icon name="cancel" size={14} className="mr-1" />
                      {t("cancel")}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTask(selectedTask.id)}
                      className="text-error hover:text-error"
                    >
                      <Icon name="delete" size={14} className="mr-1" />
                      {t("delete")}
                    </Button>
                  </div>
                </Card>
              ) : (
                <EmptyState icon="touch_app" title={t("selectTaskPrompt")} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Agents Tab ─────────────────────────────────────────────────────── */}
      {activeTab === "agents" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CLOUD_AGENTS.map((agent) => {
            const connected = agentHealth[agent.id] === true;
            return (
              <Card key={agent.id} padding="md" className="relative">
                <div className="flex flex-col items-center text-center gap-3">
                  {/* Icon */}
                  <div className={`p-3 rounded-xl ${agent.iconBg} ${agent.iconColor}`}>
                    <Icon name={agent.icon} size={32} />
                  </div>

                  {/* Name + provider */}
                  <div>
                    <h3 className="text-base font-semibold text-text-main">{agent.name}</h3>
                    <p className="text-xs text-text-muted">{agent.provider}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-muted">{t(agent.descriptionKey)}</p>

                  {/* Connection status */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${connected ? "bg-success" : "bg-error"}`}
                    />
                    <span className="text-xs text-text-muted">
                      {connected
                        ? t("connected") || "Connected"
                        : t("notConnected") || "Not connected"}
                    </span>
                  </div>

                  {/* Configure button */}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      window.location.href = "/dashboard/providers?section=cloudagent";
                    }}
                  >
                    <Icon name="settings" size={14} className="mr-1" />
                    {t("configure") || "Configure"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* ── Settings Tab ───────────────────────────────────────────────────── */}
      {activeTab === "settings" && (
        <Card>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-base font-semibold text-text-main mb-1">
                {t("settingsTitle") || "Cloud Agent Settings"}
              </h3>
              <p className="text-sm text-text-muted">
                {t("settingsDesc") || "Configure local preferences for cloud agents."}
              </p>
            </div>

            {/* Toggle: Enable cloud agents */}
            <Switch
              side="right"
              label={t("settingEnableAgents") || "Enable cloud agents"}
              description={
                t("settingEnableAgentsDesc") || "Master switch for all cloud agent functionality."
              }
              checked={settings.enabled}
              aria-checked={settings.enabled}
              onCheckedChange={() => updateSetting("enabled", !settings.enabled)}
              className="justify-between py-3 border-b border-border/30"
            />

            {/* Toggle: Auto-create PR */}
            <Switch
              side="right"
              label={t("settingAutoPR") || "Auto-create PR"}
              description={
                t("settingAutoPRDesc") ||
                "Automatically create a pull request when a task completes."
              }
              checked={settings.autoCreatePr}
              aria-checked={settings.autoCreatePr}
              onCheckedChange={() => updateSetting("autoCreatePr", !settings.autoCreatePr)}
              className="justify-between py-3 border-b border-border/30"
            />

            {/* Toggle: Require approval */}
            <Switch
              side="right"
              label={t("settingRequireApproval") || "Require plan approval"}
              description={
                t("settingRequireApprovalDesc") ||
                "Pause execution until you approve the agent's plan."
              }
              checked={settings.requireApproval}
              aria-checked={settings.requireApproval}
              onCheckedChange={() => updateSetting("requireApproval", !settings.requireApproval)}
              className="justify-between py-3"
            />
          </div>
        </Card>
      )}
    </div>
  );
}
