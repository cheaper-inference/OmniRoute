"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Tabs, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import Icon from "@/shared/components/Icon";
import Button from "@/shared/components/Button";
import { cn } from "@/shared/utils/cn";
import type { OmniSkill } from "./OmniSkillCard";

interface SkillDetail extends OmniSkill {
  schema?: {
    input?: Record<string, unknown>;
    output?: Record<string, unknown>;
  };
  handler?: string;
}

interface SkillExecution {
  id: string;
  skillId: string;
  skillName: string;
  status: string;
  duration: number;
  createdAt: string;
}

type InspectorTab = "schema" | "handler" | "executions" | "sandbox";

interface SkillInspectorPaneProps {
  selectedSkillId: string | null;
  skill: OmniSkill | null;
  onSetMode: (skillId: string, mode: "on" | "off" | "auto") => void;
  onUninstall: (skillId: string) => void;
}

export function SkillInspectorPane({
  selectedSkillId,
  skill,
  onSetMode,
  onUninstall,
}: SkillInspectorPaneProps): JSX.Element {
  const locale = useLocale();
  const t = useTranslations("skills");
  const [activeTab, setActiveTab] = useState<InspectorTab>("schema");
  const [detail, setDetail] = useState<SkillDetail | null>(null);
  const [executions, setExecutions] = useState<SkillExecution[]>([]);
  const [loadingExecs, setLoadingExecs] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!selectedSkillId) {
      // Reset via microtask to avoid synchronous setState-in-effect
      Promise.resolve().then(() => {
        if (!cancelled) {
          setDetail(null);
          setExecutions([]);
        }
      });
      return () => {
        cancelled = true;
      };
    }
    // Fetch full skill detail for schema + handler
    fetch(`/api/skills/${selectedSkillId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: SkillDetail | null) => {
        if (!cancelled && data) setDetail(data);
      })
      .catch(() => null);
    return () => {
      cancelled = true;
    };
  }, [selectedSkillId]);

  useEffect(() => {
    if (!selectedSkillId || activeTab !== "executions") return;
    let cancelled = false;
    Promise.resolve().then(() => {
      if (!cancelled) setLoadingExecs(true);
    });
    fetch(`/api/skills/executions?skillId=${selectedSkillId}&limit=20`)
      .then((r) => (r.ok ? r.json() : { data: [] }))
      .then((data: { data?: SkillExecution[] }) => {
        if (!cancelled) {
          setExecutions(data.data || []);
          setLoadingExecs(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoadingExecs(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedSkillId, activeTab]);

  if (!selectedSkillId || !skill) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-text-muted text-sm text-center p-6">
        <Icon name="manage_search" size={40} className="mb-3 opacity-30" />
        <span>{t("selectSkillToInspect")}</span>
      </div>
    );
  }

  const effectiveMode = skill.mode || (skill.enabled ? "on" : "off");

  const tabs: { id: InspectorTab; label: string }[] = [
    { id: "schema", label: t("schemaTab") },
    { id: "handler", label: t("handlerTab") },
    { id: "executions", label: t("executionsTab") },
    { id: "sandbox", label: t("sandboxTab") },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Inspector header */}
      <div className="px-4 pt-4 pb-2 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <Icon name="auto_fix_high" size={18} className="text-primary" />
          <h3 className="font-semibold text-text-main text-sm">{skill.name}</h3>
        </div>
        <p className="text-xs text-text-muted line-clamp-2">{skill.description}</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded ${
              effectiveMode === "on"
                ? "bg-success/10 text-success"
                : effectiveMode === "auto"
                  ? "bg-warning/10 text-warning"
                  : "bg-surface-2 text-text-muted"
            }`}
          >
            {t("mode")}: {effectiveMode}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-2 text-text-muted">
            {(skill.sourceProvider || "local").toUpperCase()}
          </span>
        </div>
      </div>

      {/* Inspector sub-tabs */}
      <Tabs
        variant="underline"
        value={activeTab}
        onValueChange={(next) => setActiveTab(next as typeof activeTab)}
        className="px-2"
      >
        {/* The inspector panels below render themselves (no TabsContent). */}
        <TabsList aria-label={skill.name}>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} aria-controls={undefined} className="text-xs">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Inspector content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === "schema" && (
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1.5">
                {t("inputSchema")}
              </p>
              <pre className="text-xs bg-bg-subtle rounded-lg p-3 overflow-auto max-h-[200px] text-text-main font-mono whitespace-pre-wrap">
                {JSON.stringify(detail?.schema?.input ?? {}, null, 2) || "{}"}
              </pre>
            </div>
            <div>
              <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1.5">
                {t("outputSchema")}
              </p>
              <pre className="text-xs bg-bg-subtle rounded-lg p-3 overflow-auto max-h-[200px] text-text-main font-mono whitespace-pre-wrap">
                {JSON.stringify(detail?.schema?.output ?? {}, null, 2) || "{}"}
              </pre>
            </div>
          </div>
        )}

        {activeTab === "handler" && (
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1.5">
              {t("handlerCode")}
            </p>
            <pre className="text-xs bg-bg-subtle rounded-lg p-3 overflow-auto max-h-[400px] text-text-main font-mono whitespace-pre-wrap">
              {detail?.handler ?? `// ${t("handlerUnavailable")}`}
            </pre>
          </div>
        )}

        {activeTab === "executions" && (
          <div>
            {loadingExecs ? (
              <div className="text-xs text-text-muted">{t("loading")}...</div>
            ) : executions.length === 0 ? (
              <div className="text-xs text-text-muted text-center py-6">{t("noExecutions")}</div>
            ) : (
              <Table
                className="text-xs"
                aria-label={t("executionsTab")}
                scrollbarLabel={t("executionsTab")}
              >
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("status")}</TableHead>
                    <TableHead>{t("duration")}</TableHead>
                    <TableHead>{t("time")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {executions.map((exec) => (
                    <TableRow key={exec.id}>
                      <TableCell>
                        <span
                          className={`px-1.5 py-0.5 rounded ${
                            exec.status === "success"
                              ? "bg-success/10 text-success"
                              : exec.status === "error"
                                ? "bg-error/10 text-error"
                                : "bg-warning/10 text-warning"
                          }`}
                        >
                          {exec.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-text-muted">{exec.duration}ms</TableCell>
                      <TableCell className="text-text-muted">
                        {new Date(exec.createdAt).toLocaleString(locale)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        )}

        {activeTab === "sandbox" && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1.5">
              {t("sandboxConfig")}
            </p>
            {[
              { label: t("cpuLimit"), desc: t("cpuLimitDesc"), value: "100ms" },
              { label: t("memoryLimit"), desc: t("memoryLimitDesc"), value: "256MB" },
              { label: t("timeout"), desc: t("timeoutDesc"), value: "30s" },
              { label: t("networkAccess"), desc: t("networkAccessDesc"), value: t("disabled") },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-2.5 rounded-lg bg-bg-subtle"
              >
                <div>
                  <p className="text-xs font-medium">{item.label}</p>
                  <p className="text-[10px] text-text-muted">{item.desc}</p>
                </div>
                <span className="text-xs font-mono text-text-muted">{item.value}</span>
              </div>
            ))}
            <Button variant="outline" size="sm" fullWidth className="mt-3 text-xs text-text-muted">
              {t("runTestPlaceholder")}
            </Button>
          </div>
        )}
      </div>

      {/* Inspector action buttons */}
      <div className="px-4 py-3 border-t border-border flex items-center gap-1.5">
        {(["on", "auto", "off"] as const).map((mode) => (
          <Button
            key={mode}
            variant="outline"
            size="sm"
            onClick={() => onSetMode(skill.id, mode)}
            aria-label={t("setModeAria", { mode })}
            aria-pressed={effectiveMode === mode}
            className={cn(
              "flex-1 text-xs",
              effectiveMode === mode
                ? mode === "on"
                  ? "border-success text-success bg-success/10"
                  : mode === "auto"
                    ? "border-warning text-warning bg-warning/10"
                    : "border-error text-error bg-error/10"
                : "text-text-muted"
            )}
          >
            {mode === "on" ? t("onMode") : mode === "auto" ? t("autoMode") : t("offMode")}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUninstall(skill.id)}
          aria-label={t("uninstallSkill")}
          className="flex-1 text-xs text-error hover:bg-error/10 hover:text-error"
        >
          {t("delete")}
        </Button>
      </div>
    </div>
  );
}

export default SkillInspectorPane;
