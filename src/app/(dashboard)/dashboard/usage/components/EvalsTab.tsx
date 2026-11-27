"use client";

import { memo, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { Field } from "@omniroute/ui-kit/field";
import { Progress } from "@omniroute/ui-kit/progress";
import Badge from "@/shared/components/Badge";
import {
  Button,
  EmptyState,
  DataTable,
  FilterBar,
  Input,
  Modal,
  Select,
  Textarea,
} from "@/shared/components";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import IconChip from "@/shared/components/IconChip";

import { FileTrigger } from "@/shared/components/FileInput";

import { useNotificationStore } from "@/store/notificationStore";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";
import { matchesSearch } from "@/shared/utils/turkishText";
import { focusFirstInvalidField } from "@/shared/utils/focusFirstInvalidField";
import { EVAL_DEFAULT_CASE_MODEL } from "@/shared/constants/evals";
import {
  EVAL_CASE_NAME_MAX_LENGTH,
  EVAL_SUITE_DESCRIPTION_MAX_LENGTH,
  EVAL_SUITE_NAME_MAX_LENGTH,
} from "@/shared/constants/formLimits";
import {
  hasSuiteDraftErrors,
  lengthOverLimit,
  suiteDraftExceedsLimits,
  validateSuiteDraft,
  type SuiteDraftErrors,
} from "./evalSuiteDraft";

type EvalTargetType = "suite-default" | "model" | "combo";

interface EvalTargetOption {
  key: string;
  type: EvalTargetType;
  id: string | null;
  label: string;
  description: string;
}

interface EvalApiKeyOption {
  id: string;
  name: string;
  isActive: boolean;
}

interface EvalCasePreview {
  id: string;
  name: string;
  model?: string;
  input?: {
    messages?: Array<{ role: string; content: string }>;
  };
  expected?: {
    strategy?: string;
    value?: string;
  };
  tags?: string[];
}

interface EvalSuite {
  id: string;
  name: string;
  description?: string;
  source?: "built-in" | "custom";
  caseCount?: number;
  cases?: EvalCasePreview[];
  updatedAt?: string;
}

interface EvalResult {
  caseId: string;
  caseName: string;
  passed: boolean;
  durationMs: number;
  error?: string;
  details?: {
    expected?: string;
    actual?: string;
    actualSnippet?: string;
    searchTerm?: string;
    pattern?: string;
  };
}

interface EvalRunSummary {
  total: number;
  passed: number;
  failed: number;
  passRate: number;
}

interface EvalRun {
  id: string;
  runGroupId: string | null;
  suiteId: string;
  suiteName: string;
  target: {
    type: EvalTargetType;
    id: string | null;
    key: string;
    label: string;
  };
  avgLatencyMs: number;
  summary: EvalRunSummary;
  results: EvalResult[];
  outputs: Record<string, string>;
  createdAt: string;
}

interface EvalScorecard {
  suites: number;
  totalCases: number;
  totalPassed: number;
  overallPassRate: number;
  perSuite: Array<{ id: string; name: string; passRate: number }>;
}

interface EvalSuiteRunState {
  runs: EvalRun[];
  scorecard: EvalScorecard | null;
}

interface EvalsDashboardPayload {
  suites: EvalSuite[];
  recentRuns: EvalRun[];
  scorecard: EvalScorecard | null;
  targets: EvalTargetOption[];
  apiKeys: EvalApiKeyOption[];
}

type BuilderStrategy = "contains" | "exact" | "regex";

interface EvalCaseDraft {
  id: string;
  name: string;
  model: string;
  systemPrompt: string;
  userPrompt: string;
  strategy: BuilderStrategy;
  expectedValue: string;
  tags: string;
}

interface EvalSuiteDraft {
  id?: string;
  name: string;
  description: string;
  cases: EvalCaseDraft[];
}

interface ImportedEvalCase {
  id?: string;
  name?: string;
  model?: string;
  input?: {
    messages?: Array<{ role?: string; content?: string }>;
  };
  expected?: {
    strategy?: string;
    value?: string;
  };
  tags?: string[];
}

interface ImportedEvalSuiteFile {
  name?: string;
  description?: string;
  cases?: ImportedEvalCase[];
}

interface RunAllProgress {
  current: number;
  total: number;
  suiteName: string;
  completed: number;
  failedSuites: number;
}

const STRATEGIES = [
  {
    name: "contains",
    labelKey: "evalsStrategyContainsLabel",
    icon: "search",
    color: "text-info",
    bg: "bg-info/10",
    descriptionKey: "evalsStrategyContainsDescription",
  },
  {
    name: "exact",
    labelKey: "evalsStrategyExactLabel",
    icon: "check_circle",
    color: "text-success",
    bg: "bg-success/10",
    descriptionKey: "evalsStrategyExactDescription",
  },
  {
    name: "regex",
    labelKey: "evalsStrategyRegexLabel",
    icon: "code",
    color: "text-warning",
    bg: "bg-warning/10",
    descriptionKey: "evalsStrategyRegexDescription",
  },
  {
    name: "custom",
    labelKey: "evalsStrategyCustomLabel",
    icon: "tune",
    color: "text-chart-3-ink",
    bg: "bg-chart-3/10",
    descriptionKey: "evalsStrategyCustomDescription",
  },
];

const HISTORY_COLUMNS = [
  { key: "suiteName", labelKey: "historyColumnSuiteName" },
  { key: "target", labelKey: "historyColumnTarget" },
  { key: "passRate", labelKey: "historyColumnPassRate" },
  { key: "avgLatencyMs", labelKey: "historyColumnAvgLatencyMs" },
  { key: "createdAt", labelKey: "historyColumnCreatedAt" },
];

const NO_COMPARE_TARGET = "__none__";
const AUTO_API_KEY = "__auto__";

function createDraftId() {
  return `draft-${Math.random().toString(36).slice(2, 10)}`;
}

function createEmptyCaseDraft(): EvalCaseDraft {
  return {
    id: createDraftId(),
    name: "",
    model: "",
    systemPrompt: "",
    userPrompt: "",
    strategy: "contains",
    expectedValue: "",
    tags: "",
  };
}

function createEmptySuiteDraft(): EvalSuiteDraft {
  return {
    name: "",
    description: "",
    cases: [createEmptyCaseDraft()],
  };
}

function normalizeBuilderStrategy(value: unknown): BuilderStrategy {
  return value === "exact" || value === "regex" ? value : "contains";
}

function joinPromptMessages(
  messages: Array<{ role: string; content: string }> | undefined,
  role: string
): string {
  return (messages || [])
    .filter((message) => message.role === role && typeof message.content === "string")
    .map((message) => message.content)
    .join("\n\n");
}

function suiteToDraft(suite: EvalSuite): EvalSuiteDraft {
  return {
    id: suite.id,
    name: suite.name || "",
    description: suite.description || "",
    cases:
      suite.cases && suite.cases.length > 0
        ? suite.cases.map((evalCase) => ({
            id: evalCase.id || createDraftId(),
            name: evalCase.name || "",
            model: evalCase.model || "",
            systemPrompt: joinPromptMessages(evalCase.input?.messages, "system"),
            userPrompt:
              joinPromptMessages(evalCase.input?.messages, "user") ||
              (evalCase.input?.messages || [])
                .filter((message) => message.role !== "system")
                .map((message) => message.content)
                .join("\n\n"),
            strategy: normalizeBuilderStrategy(evalCase.expected?.strategy),
            expectedValue: evalCase.expected?.value || "",
            tags: (evalCase.tags || []).join(", "),
          }))
        : [createEmptyCaseDraft()],
  };
}

function suiteToCloneDraft(
  suite: EvalSuite,
  t: (key: string, values?: Record<string, unknown>) => string
): EvalSuiteDraft {
  const draft = suiteToDraft(suite);
  return {
    name: `${draft.name || suite.id} ${t("suiteBuilderCloneSuffix")}`.trim(),
    description: draft.description,
    cases: draft.cases.map((evalCase) => ({
      ...evalCase,
      id: createDraftId(),
      name: evalCase.name ? `${evalCase.name} ${t("suiteBuilderCloneSuffix")}`.trim() : "",
    })),
  };
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "";
}

function getResultExpectedValue(result: EvalResult): string {
  if (result.details?.expected) return String(result.details.expected);
  if (result.details?.searchTerm) return String(result.details.searchTerm);
  if (result.details?.pattern) return String(result.details.pattern);
  return "—";
}

function getResultActualValue(result: EvalResult, output?: string): string {
  const actual = output || result.details?.actual || result.details?.actualSnippet || "";
  return typeof actual === "string" && actual.trim().length > 0 ? actual : "—";
}

function createDraftFromImportedSuite(
  payload: ImportedEvalSuiteFile,
  fallbackName: string
): EvalSuiteDraft {
  const cases = Array.isArray(payload.cases) ? payload.cases : [];

  return {
    name:
      typeof payload.name === "string" && payload.name.trim().length > 0
        ? payload.name.trim()
        : fallbackName,
    description: typeof payload.description === "string" ? payload.description : "",
    cases:
      cases.length > 0
        ? cases.map((evalCase, index) => {
            const importedMessages = evalCase.input?.messages;
            const messages = Array.isArray(importedMessages)
              ? importedMessages
                  .map((message) => ({
                    role: typeof message.role === "string" ? message.role : "",
                    content: typeof message.content === "string" ? message.content : "",
                  }))
                  .filter((message) => message.role && message.content.trim())
              : [];

            return {
              id: createDraftId(),
              name:
                typeof evalCase.name === "string" && evalCase.name.trim().length > 0
                  ? evalCase.name.trim()
                  : `Case ${index + 1}`,
              model: typeof evalCase.model === "string" ? evalCase.model : "",
              systemPrompt: joinPromptMessages(messages, "system"),
              userPrompt:
                joinPromptMessages(messages, "user") ||
                messages
                  .filter((message) => message.role !== "system")
                  .map((message) => message.content)
                  .join("\n\n"),
              strategy: normalizeBuilderStrategy(evalCase.expected?.strategy),
              expectedValue:
                typeof evalCase.expected?.value === "string" ? evalCase.expected.value : "",
              tags: Array.isArray(evalCase.tags) ? evalCase.tags.join(", ") : "",
            };
          })
        : [createEmptyCaseDraft()],
  };
}

function getTargetLabel(
  target: { type: EvalTargetType; id: string | null },
  t: (key: string, values?: Record<string, unknown>) => string
): string {
  if (target.type === "combo") {
    return `${t("targetTypeCombo")}: ${target.id || "—"}`;
  }

  if (target.type === "model") {
    return `${t("targetTypeModel")}: ${target.id || "—"}`;
  }

  return t("targetSuiteDefaults");
}

function parseTargetKey(value: string): { type: EvalTargetType; id: string | null } {
  const [rawType, ...rawId] = value.split(":");
  const idValue = rawId.join(":");

  if (rawType === "combo") {
    return { type: "combo", id: idValue || null };
  }

  if (rawType === "model") {
    return { type: "model", id: idValue || null };
  }

  return { type: "suite-default", id: null };
}

function formatTimestamp(value: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function getResultDetails(
  result: EvalResult,
  t: (key: string, values?: Record<string, unknown>) => string
): string {
  if (result.error) {
    return `${t("resultErrorLabel")}: ${result.error}`;
  }

  if (result.details?.searchTerm) {
    return t("detailsContains", { term: result.details.searchTerm });
  }

  if (result.details?.pattern) {
    return t("detailsRegex", { pattern: result.details.pattern });
  }

  if (result.details?.expected) {
    return t("detailsExpected", {
      expected: String(result.details.expected).slice(0, 60),
    });
  }

  if (result.details?.actualSnippet) {
    return t("actualOutputLabel", {
      value: String(result.details.actualSnippet).slice(0, 60),
    });
  }

  return "—";
}

export default function EvalsTab() {
  const t = useTranslations("usage");
  const notify = useNotificationStore();
  const { requestConfirm, confirmDialog } = useConfirmDialog();
  const [suites, setSuites] = useState<EvalSuite[]>([]);
  const [recentRuns, setRecentRuns] = useState<EvalRun[]>([]);
  const [scorecard, setScorecard] = useState<EvalScorecard | null>(null);
  const [targetOptions, setTargetOptions] = useState<EvalTargetOption[]>([]);
  const [apiKeys, setApiKeys] = useState<EvalApiKeyOption[]>([]);
  const [selectedTargetKey, setSelectedTargetKey] = useState("suite-default:__default__");
  const [compareTargetKey, setCompareTargetKey] = useState("");
  const [selectedApiKeyId, setSelectedApiKeyId] = useState("");
  const [suiteRuns, setSuiteRuns] = useState<Record<string, EvalSuiteRunState>>({});
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState<string | null>(null);
  const [runningAll, setRunningAll] = useState(false);
  const [runProgress, setRunProgress] = useState<RunAllProgress | null>(null);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [suiteDraft, setSuiteDraft] = useState<EvalSuiteDraft>(createEmptySuiteDraft());
  const [savingSuite, setSavingSuite] = useState(false);
  // Set by a refused save: the builder then flags the fields inline (an untouched form is not
  // flagged for being empty) and `refusedSaves` moves focus to the first of them.
  const [showSuiteErrors, setShowSuiteErrors] = useState(false);
  const [refusedSaves, setRefusedSaves] = useState(0);
  const [deletingSuiteId, setDeletingSuiteId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        const response = await fetch("/api/evals");
        if (!response.ok) {
          throw new Error("Eval load failed");
        }

        const payload = (await response.json()) as EvalsDashboardPayload;
        if (!isMounted) return;

        setSuites(Array.isArray(payload.suites) ? payload.suites : []);
        setRecentRuns(Array.isArray(payload.recentRuns) ? payload.recentRuns : []);
        setScorecard(payload.scorecard || null);
        setTargetOptions(Array.isArray(payload.targets) ? payload.targets : []);
        setApiKeys(Array.isArray(payload.apiKeys) ? payload.apiKeys : []);
      } catch {
        if (isMounted) {
          notify.error(t("notifyEvalLoadFailed"));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Adjust-during-render (React docs pattern): keep the selected target inside
  // the current option set, and never compare a target against itself. Both
  // guards self-extinguish after their setState, so the re-render settles.
  if (
    targetOptions.length > 0 &&
    !targetOptions.some((option) => option.key === selectedTargetKey)
  ) {
    setSelectedTargetKey(targetOptions[0]?.key || "suite-default:__default__");
  }
  if (compareTargetKey && compareTargetKey === selectedTargetKey) {
    setCompareTargetKey("");
  }

  const filteredSuites = !search.trim()
    ? suites
    : suites.filter((suite) => {
        return (
          matchesSearch(suite.name ?? "", search) ||
          matchesSearch(suite.id ?? "", search) ||
          matchesSearch(suite.description ?? "", search)
        );
      });

  const totalCases = suites.reduce(
    (sum, suite) => sum + (suite.cases?.length || suite.caseCount || 0),
    0
  );

  const uniqueModels = [
    ...new Set(
      suites
        .flatMap((suite) => suite.cases || [])
        .map((evalCase) => evalCase.model)
        .filter((model): model is string => typeof model === "string" && model.trim().length > 0)
    ),
  ];

  const compareOptions = targetOptions.filter((option) => option.key !== selectedTargetKey);
  const runAllPercent =
    runProgress && runProgress.total > 0
      ? Math.round((runProgress.completed / runProgress.total) * 100)
      : 0;

  async function refreshDashboard() {
    const response = await fetch("/api/evals");
    if (!response.ok) {
      throw new Error(t("notifyEvalLoadFailed"));
    }
    const payload = (await response.json()) as EvalsDashboardPayload;
    setRecentRuns(Array.isArray(payload.recentRuns) ? payload.recentRuns : []);
    setScorecard(payload.scorecard || null);
    setTargetOptions(Array.isArray(payload.targets) ? payload.targets : []);
    setApiKeys(Array.isArray(payload.apiKeys) ? payload.apiKeys : []);
    setSuites(Array.isArray(payload.suites) ? payload.suites : []);
  }

  function openNewSuiteBuilder() {
    setSuiteDraft(createEmptySuiteDraft());
    setIsBuilderOpen(true);
  }

  function openEditSuiteBuilder(suite: EvalSuite) {
    setSuiteDraft(suiteToDraft(suite));
    setIsBuilderOpen(true);
  }

  function handleCloneSuite(suite: EvalSuite) {
    setSuiteDraft(suiteToCloneDraft(suite, t));
    setIsBuilderOpen(true);
  }

  function toggleResultExpansion(resultKey: string) {
    setExpandedResults((prev) => {
      const next = new Set(prev);
      if (next.has(resultKey)) {
        next.delete(resultKey);
      } else {
        next.add(resultKey);
      }
      return next;
    });
  }

  function handleExportSuite(suite: EvalSuite) {
    try {
      const exportPayload = {
        format: "omniroute.eval-suite.v1",
        exportedAt: new Date().toISOString(),
        id: suite.id,
        name: suite.name || suite.id,
        description: suite.description || "",
        source: suite.source || "built-in",
        cases: (suite.cases || []).map((evalCase) => ({
          name: evalCase.name || "",
          model: evalCase.model || "",
          input: {
            messages: Array.isArray(evalCase.input?.messages) ? evalCase.input?.messages : [],
          },
          expected: {
            strategy: normalizeBuilderStrategy(evalCase.expected?.strategy),
            value: evalCase.expected?.value || "",
          },
          tags: evalCase.tags || [],
        })),
      };
      const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      const slug =
        (suite.name || suite.id || "eval-suite")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") || "eval-suite";
      anchor.href = url;
      anchor.download = `${slug}.eval-suite.json`;
      anchor.click();
      URL.revokeObjectURL(url);
      notify.success(t("suiteExported"), t("notifyEvalTitle", { name: suite.name || suite.id }));
    } catch (error: unknown) {
      notify.error(
        t("notifyEvalRunFailedWithReason", {
          reason: getErrorMessage(error) || t("suiteExportFailed"),
        }),
        t("suiteExportFailed")
      );
    }
  }

  async function handleImportSuite(file: File) {
    try {
      const text = await file.text();
      const payload = JSON.parse(text) as ImportedEvalSuiteFile;
      if (!payload || typeof payload !== "object" || !Array.isArray(payload.cases)) {
        throw new Error(t("suiteImportInvalid"));
      }

      const fallbackName =
        file.name
          .replace(/\.eval-suite\.json$/i, "")
          .replace(/\.json$/i, "")
          .replace(/[-_]+/g, " ")
          .trim() || t("suiteBuilderImportedSuite");

      const draft = createDraftFromImportedSuite(payload, fallbackName);
      setSuiteDraft({
        ...draft,
        name: `${draft.name} ${t("suiteBuilderCloneSuffix")}`.trim(),
      });
      setIsBuilderOpen(true);
      notify.success(t("suiteImportReady"), t("notifyEvalTitle", { name: draft.name }));
    } catch (error: unknown) {
      notify.error(
        t("notifyEvalRunFailedWithReason", {
          reason: getErrorMessage(error) || t("suiteImportInvalid"),
        }),
        t("suiteImportFailed")
      );
    }
  }

  async function handleSaveSuite() {
    const suiteName = suiteDraft.name.trim();

    if (suiteDraft.cases.length === 0) {
      notify.warning(t("suiteBuilderCasesRequired"));
      return;
    }

    // Each missing field is flagged next to itself by the builder; a toast would only repeat
    // it away from the field. A case's model is optional (see evalSuiteDraft.ts). A value over
    // its length limit is already flagged as typed; the save is refused the same way.
    if (
      hasSuiteDraftErrors(validateSuiteDraft(suiteDraft)) ||
      suiteDraftExceedsLimits(suiteDraft)
    ) {
      setShowSuiteErrors(true);
      setRefusedSaves((count) => count + 1);
      return;
    }

    setSavingSuite(true);
    try {
      const payload = {
        name: suiteName,
        description: suiteDraft.description.trim(),
        cases: suiteDraft.cases.map((draftCase) => {
          const messages: Array<{ role: string; content: string }> = [];
          if (draftCase.systemPrompt.trim()) {
            messages.push({ role: "system", content: draftCase.systemPrompt.trim() });
          }
          if (draftCase.userPrompt.trim()) {
            messages.push({ role: "user", content: draftCase.userPrompt.trim() });
          }

          return {
            ...(draftCase.id.startsWith("draft-") ? {} : { id: draftCase.id }),
            name: draftCase.name.trim(),
            // Omitted when empty: the save schema takes a missing model, not an empty one.
            ...(draftCase.model.trim() ? { model: draftCase.model.trim() } : {}),
            input: {
              messages,
            },
            expected: {
              strategy: draftCase.strategy,
              value: draftCase.expectedValue.trim(),
            },
            tags: draftCase.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
          };
        }),
      };

      const isEditing = typeof suiteDraft.id === "string" && suiteDraft.id.trim().length > 0;
      const response = await fetch(
        isEditing ? `/api/evals/suites/${encodeURIComponent(suiteDraft.id!)}` : "/api/evals/suites",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result?.error?.message || result?.error || result?.message || t("suiteBuilderSaveFailed")
        );
      }

      await refreshDashboard();
      setExpanded(result?.suite?.id || suiteDraft.id || null);
      setIsBuilderOpen(false);
      setShowSuiteErrors(false);
      setSuiteDraft(createEmptySuiteDraft());
      notify.success(
        isEditing ? t("suiteBuilderUpdated") : t("suiteBuilderCreated"),
        t("notifyEvalTitle", { name: suiteName })
      );
    } catch (error: any) {
      notify.error(
        t("notifyEvalRunFailedWithReason", {
          reason: error?.message || t("notAvailableSymbol"),
        }),
        t("suiteBuilderSaveFailed")
      );
    } finally {
      setSavingSuite(false);
    }
  }

  async function handleDeleteSuite(suite: EvalSuite) {
    if (suite.source !== "custom") return;
    const confirmDelete = await requestConfirm(
      t("suiteBuilderDeleteConfirm", { name: suite.name || suite.id })
    );
    if (!confirmDelete) return;

    setDeletingSuiteId(suite.id);
    try {
      const response = await fetch(`/api/evals/suites/${encodeURIComponent(suite.id)}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result?.error?.message ||
            result?.error ||
            result?.message ||
            t("suiteBuilderDeleteFailed")
        );
      }
      await refreshDashboard();
      if (expanded === suite.id) {
        setExpanded(null);
      }
      notify.success(
        t("suiteBuilderDeleted"),
        t("notifyEvalTitle", { name: suite.name || suite.id })
      );
    } catch (error: any) {
      notify.error(
        t("notifyEvalRunFailedWithReason", {
          reason: error?.message || t("notAvailableSymbol"),
        }),
        t("suiteBuilderDeleteFailed")
      );
    } finally {
      setDeletingSuiteId(null);
    }
  }

  async function handleRunAllSuites() {
    const suitesToRun = filteredSuites.filter(
      (suite) => (suite.cases?.length || suite.caseCount || 0) > 0
    );

    if (suitesToRun.length === 0) {
      notify.warning(t("notifyNoTestCases"));
      return;
    }

    if (compareTargetKey && compareTargetKey === selectedTargetKey) {
      notify.warning(t("notifySelectDifferentCompareTarget"));
      return;
    }

    let completed = 0;
    let failedSuites = 0;
    let totalPassed = 0;
    let totalFailed = 0;

    setRunningAll(true);
    setRunProgress({
      current: 0,
      total: suitesToRun.length,
      suiteName: "",
      completed: 0,
      failedSuites: 0,
    });

    try {
      for (const [index, suite] of suitesToRun.entries()) {
        setRunning(suite.id);
        setRunProgress({
          current: index + 1,
          total: suitesToRun.length,
          suiteName: suite.name || suite.id,
          completed,
          failedSuites,
        });

        try {
          const response = await fetch("/api/evals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              suiteId: suite.id,
              target: parseTargetKey(selectedTargetKey),
              ...(compareTargetKey ? { compareTarget: parseTargetKey(compareTargetKey) } : {}),
              ...(selectedApiKeyId ? { apiKeyId: selectedApiKeyId } : {}),
            }),
          });

          const payload = await response.json();
          if (!response.ok) {
            throw new Error(
              payload?.error?.message ||
                payload?.error ||
                payload?.message ||
                t("notifyEvalRunFailed")
            );
          }

          const runs = Array.isArray(payload.runs) ? (payload.runs as EvalRun[]) : [];
          const comparisonScorecard = (payload.scorecard || null) as EvalScorecard | null;
          setSuiteRuns((prev) => ({
            ...prev,
            [suite.id]: {
              runs,
              scorecard: comparisonScorecard,
            },
          }));

          if (Array.isArray(payload.recentRuns)) {
            setRecentRuns(payload.recentRuns as EvalRun[]);
          }
          if (payload.historyScorecard) {
            setScorecard(payload.historyScorecard as EvalScorecard);
          }

          const primaryRun = runs[0];
          totalPassed += primaryRun?.summary.passed || 0;
          totalFailed += primaryRun?.summary.failed || 0;
          completed += 1;
        } catch (error: unknown) {
          failedSuites += 1;
          console.error("[Evals] Run all failed for suite", suite.id, error);
        } finally {
          setRunProgress({
            current: index + 1,
            total: suitesToRun.length,
            suiteName: suite.name || suite.id,
            completed,
            failedSuites,
          });
        }
      }

      await refreshDashboard();
      if (failedSuites > 0) {
        notify.warning(
          t("runAllCompletedWithFailures", { completed, failedSuites }),
          t("notifyEvalTitle", { name: t("runAllSuites") })
        );
      } else {
        notify.success(
          t("runAllCompleted", {
            suites: completed,
            passed: totalPassed,
            failed: totalFailed,
          }),
          t("notifyEvalTitle", { name: t("runAllSuites") })
        );
      }
    } finally {
      setRunning(null);
      setRunningAll(false);
      setRunProgress(null);
    }
  }

  async function handleRunEval(suite: EvalSuite) {
    if (runningAll) return;

    const cases = suite.cases || [];
    if (cases.length === 0) {
      notify.warning(t("notifyNoTestCases"));
      return;
    }

    if (compareTargetKey && compareTargetKey === selectedTargetKey) {
      notify.warning(t("notifySelectDifferentCompareTarget"));
      return;
    }

    setRunning(suite.id);

    try {
      const response = await fetch("/api/evals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suiteId: suite.id,
          target: parseTargetKey(selectedTargetKey),
          ...(compareTargetKey ? { compareTarget: parseTargetKey(compareTargetKey) } : {}),
          ...(selectedApiKeyId ? { apiKeyId: selectedApiKeyId } : {}),
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(
          payload?.error?.message || payload?.error || payload?.message || t("notifyEvalRunFailed")
        );
      }

      const runs = Array.isArray(payload.runs) ? (payload.runs as EvalRun[]) : [];
      const comparisonScorecard = (payload.scorecard || null) as EvalScorecard | null;
      setSuiteRuns((prev) => ({
        ...prev,
        [suite.id]: {
          runs,
          scorecard: comparisonScorecard,
        },
      }));
      setExpanded(suite.id);

      if (Array.isArray(payload.recentRuns)) {
        setRecentRuns(payload.recentRuns as EvalRun[]);
      } else {
        await refreshDashboard();
      }

      if (payload.historyScorecard) {
        setScorecard(payload.historyScorecard as EvalScorecard);
      }

      const primaryRun = runs[0];
      if (primaryRun) {
        const score = primaryRun.summary.passRate;
        notify.success(
          compareTargetKey
            ? t("compareCompletedWithScore", { score })
            : t("runCompletedWithScore", { score }),
          t("notifyEvalTitle", { name: suite.name || suite.id })
        );
      }
    } catch (error: any) {
      notify.error(
        t("notifyEvalRunFailedWithReason", {
          reason: error?.message || t("notAvailableSymbol"),
        }),
        t("notifyEvalTitle", { name: suite.name || suite.id })
      );
    } finally {
      setRunning(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-text-muted p-8 animate-pulse">
        <Icon name="science" size={20} />
        {t("evalsLoading")}
      </div>
    );
  }

  if (suites.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <HeroSection t={t} />
        <EmptyState
          icon="science"
          title={t("noEvalSuitesFound")}
          description={t("noEvalSuitesDescription")}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <HeroSection t={t} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="px-4 py-3 text-center">
          <span className="ci-eyebrow" data-weight="medium">
            {t("statsSuites")}
          </span>
          <div className="text-2xl font-semibold mt-1 text-chart-3-ink">{suites.length}</div>
        </Card>
        <Card className="px-4 py-3 text-center">
          <span className="ci-eyebrow" data-weight="medium">
            {t("statsTestCases")}
          </span>
          <div className="text-2xl font-semibold mt-1 text-info">{totalCases}</div>
        </Card>
        <Card className="px-4 py-3 text-center">
          <span className="ci-eyebrow" data-weight="medium">
            {t("statsModels")}
          </span>
          <div className="text-2xl font-semibold mt-1 text-success">{uniqueModels.length}</div>
        </Card>
        <Card className="px-4 py-3 text-center">
          <span className="ci-eyebrow" data-weight="medium">
            {t("statsCoverage")}
          </span>
          <div className="text-2xl font-semibold mt-1 text-warning">
            {t("statsStrategiesCount", { count: STRATEGIES.length })}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <IconChip tone="accent">
            <Icon name="route" size={20} />
          </IconChip>
          <div>
            <h3 className="ci-heading" data-size="lg">
              {t("evalControlsTitle")}
            </h3>
            <p className="text-xs text-text-muted">{t("evalControlsHint")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Select
            label={t("evalTarget")}
            value={selectedTargetKey}
            onChange={(event) => setSelectedTargetKey(event.target.value)}
            options={targetOptions.map((option) => ({
              value: option.key,
              label: getTargetLabel(option, t),
            }))}
            hint={t("evalTargetHint")}
          />
          <Select
            label={t("evalCompareTarget")}
            value={compareTargetKey || NO_COMPARE_TARGET}
            onChange={(event) =>
              setCompareTargetKey(
                event.target.value === NO_COMPARE_TARGET ? "" : event.target.value
              )
            }
            options={[
              {
                value: NO_COMPARE_TARGET,
                label: t("evalCompareOptional"),
              },
              ...compareOptions.map((option) => ({
                value: option.key,
                label: getTargetLabel(option, t),
              })),
            ]}
            hint={t("evalCompareHint")}
          />
          <Select
            label={t("evalApiKey")}
            value={selectedApiKeyId || AUTO_API_KEY}
            onChange={(event) =>
              setSelectedApiKeyId(event.target.value === AUTO_API_KEY ? "" : event.target.value)
            }
            options={[
              {
                value: AUTO_API_KEY,
                label: t("evalApiKeyAuto"),
              },
              ...apiKeys
                .filter((key) => key.isActive !== false)
                .map((key) => ({
                  value: key.id,
                  label: key.name,
                })),
            ]}
            hint={t("evalApiKeyHint")}
          />
        </div>
      </Card>

      {scorecard && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <IconChip tone="success">
              <Icon name="analytics" size={20} />
            </IconChip>
            <div>
              <h3 className="ci-heading" data-size="lg">
                {t("scorecardTitle")}
              </h3>
              <p className="text-xs text-text-muted">{t("scorecardHint")}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Card className="px-4 py-3">
              <p className="ci-eyebrow">{t("scorecardSuites")}</p>
              <p className="text-2xl font-semibold text-chart-3-ink mt-1">{scorecard.suites}</p>
            </Card>
            <Card className="px-4 py-3">
              <p className="ci-eyebrow">{t("scorecardCases")}</p>
              <p className="text-2xl font-semibold text-info mt-1">{scorecard.totalCases}</p>
            </Card>
            <Card className="px-4 py-3">
              <p className="ci-eyebrow">{t("scorecardPassed")}</p>
              <p className="text-2xl font-semibold text-success mt-1">{scorecard.totalPassed}</p>
            </Card>
            <Card className="px-4 py-3">
              <p className="ci-eyebrow">{t("scorecardPassRate")}</p>
              <p className="text-2xl font-semibold text-warning mt-1">
                {scorecard.overallPassRate}%
              </p>
            </Card>
          </div>

          {scorecard.perSuite.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
              {scorecard.perSuite.slice(0, 6).map((entry) => (
                <Card.Section key={entry.id}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-text-main truncate">
                      {entry.name}
                    </span>
                    <span className="text-xs font-semibold text-primary">{entry.passRate}%</span>
                  </div>
                </Card.Section>
              ))}
            </div>
          )}
        </Card>
      )}

      <Card className="p-0 overflow-hidden">
        <Button
          variant="ghost"
          aria-expanded={showHowItWorks}
          onClick={() => setShowHowItWorks((prev) => !prev)}
          className="h-auto min-h-0 w-full justify-between rounded-none px-6 py-4 text-left whitespace-normal"
        >
          <div className="flex items-center gap-3">
            <IconChip tone="accent">
              <Icon name="help" size={20} />
            </IconChip>
            <div>
              <h3 className="ci-heading" data-size="sm">
                {t("howItWorks")}
              </h3>
              <p className="text-xs text-text-muted">{t("howItWorksSubtitle")}</p>
            </div>
          </div>
          <Icon
            name="expand_more"
            size={24}
            className={`text-text-muted transition-transform duration-200 ${
              showHowItWorks ? "rotate-180" : ""
            }`}
          />
        </Button>

        {showHowItWorks && (
          <div className="px-6 pb-6 border-t border-border/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-chart-3/5 border border-chart-3/10">
                <div className="w-10 h-10 rounded-full bg-chart-3/20 flex items-center justify-center mb-3">
                  <span className="text-lg font-semibold text-chart-3-ink">1</span>
                </div>
                <h4 className="ci-heading mb-1" data-size="sm">
                  {t("define")}
                </h4>
                <p className="text-xs text-text-muted">{t("defineStepDescription")}</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-info/5 border border-info/10">
                <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center mb-3">
                  <span className="text-lg font-semibold text-info">2</span>
                </div>
                <h4 className="ci-heading mb-1" data-size="sm">
                  {t("run")}
                </h4>
                <p className="text-xs text-text-muted">{t("runStepDescription")}</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-success/5 border border-success/10">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center mb-3">
                  <span className="text-lg font-semibold text-success">3</span>
                </div>
                <h4 className="ci-heading mb-1" data-size="sm">
                  {t("evaluate")}
                </h4>
                <p className="text-xs text-text-muted">{t("evaluateStepDescription")}</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="ci-eyebrow mb-3" data-weight="medium">
                {t("evaluationStrategies")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {STRATEGIES.map((strategy) => (
                  <div
                    key={strategy.name}
                    className={`flex items-center gap-3 p-3 rounded-lg ${strategy.bg}`}
                  >
                    <Icon name={strategy.icon} size={18} className={strategy.color} />
                    <div>
                      <span className={`text-xs font-mono font-semibold ${strategy.color}`}>
                        {t(strategy.labelKey)}
                      </span>
                      <p className="text-xs text-text-muted mt-0.5">{t(strategy.descriptionKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <IconChip tone="info">
            <Icon name="history" size={20} />
          </IconChip>
          <div>
            <h3 className="ci-heading" data-size="lg">
              {t("recentRunsTitle")}
            </h3>
            <p className="text-xs text-text-muted">{t("recentRunsHint")}</p>
          </div>
        </div>

        <DataTable
          label={t("recentRunsTitle")}
          framed={false}
          columns={HISTORY_COLUMNS.map((column) => ({
            key: column.key,
            label: t(column.labelKey),
          }))}
          data={recentRuns.map((run) => ({
            ...run,
            id: run.id,
          }))}
          renderCell={(row, column) => {
            if (column.key === "target") {
              return (
                <span className="text-xs font-medium text-primary">
                  {getTargetLabel(row.target as EvalRun["target"], t)}
                </span>
              );
            }

            if (column.key === "passRate") {
              return (
                <span className="text-xs font-semibold text-success">
                  {Number((row.summary as EvalRunSummary)?.passRate || 0)}%
                </span>
              );
            }

            if (column.key === "avgLatencyMs") {
              return (
                <span className="text-xs font-mono text-text-muted">
                  {Number(row.avgLatencyMs || 0)}ms
                </span>
              );
            }

            if (column.key === "createdAt") {
              return (
                <span className="text-xs text-text-muted">
                  {formatTimestamp(String(row.createdAt || ""))}
                </span>
              );
            }

            return <span className="text-sm text-text-main">{String(row[column.key] || "—")}</span>;
          }}
          maxHeight="320px"
          emptyMessage={t("historyEmpty")}
        />
      </Card>

      <Card className="p-6">
        <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <IconChip tone="chart-3">
              <Icon name="science" size={20} />
            </IconChip>
            <div>
              <h3 className="ci-heading" data-size="lg">
                {t("evalSuites")}
              </h3>
              <p className="text-xs text-text-muted">{t("evalSuitesHint")}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* The pick imports at once: the kit FileTrigger opens the file picker from the button. */}
            <FileTrigger
              accept="application/json,.json"
              disabled={running !== null || runningAll}
              onFilesChange={(files) => {
                const file = files[0];
                if (file) void handleImportSuite(file);
              }}
            >
              <Button variant="outline" icon="upload_file">
                {t("importSuite")}
              </Button>
            </FileTrigger>
            <Button
              icon="play_arrow"
              variant="secondary"
              disabled={running !== null || runningAll}
              loading={runningAll}
              onClick={() => void handleRunAllSuites()}
            >
              {runningAll ? t("runAllRunning") : t("runAllSuites")}
            </Button>
            <Button
              icon="add"
              onClick={openNewSuiteBuilder}
              disabled={running !== null || runningAll}
            >
              {t("suiteBuilderNewSuite")}
            </Button>
          </div>
        </div>

        {runProgress && (
          <div className="mb-4 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-text-main">
                {t("runAllProgress", {
                  current: runProgress.current,
                  total: runProgress.total,
                  name: runProgress.suiteName || t("runAllSuites"),
                })}
              </span>
              <span className="text-xs font-semibold text-primary">{runAllPercent}%</span>
            </div>
            <Progress
              aria-label={t("runAllProgress", {
                current: runProgress.current,
                total: runProgress.total,
                name: runProgress.suiteName || t("runAllSuites"),
              })}
              aria-valuetext={`${runAllPercent}%`}
              value={runAllPercent}
              animate={false}
            />
            {runProgress.failedSuites > 0 && (
              <p className="mt-2 text-xs text-warning">
                {t("runAllFailedSuites", { count: runProgress.failedSuites })}
              </p>
            )}
          </div>
        )}

        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          placeholder={t("searchSuitesPlaceholder")}
          filters={[]}
          activeFilters={{}}
          onFilterChange={() => {}}
        >
          {null}
        </FilterBar>

        {/* Suites are sections of this card, split by hairlines like the kit plain accordion:
            the Card is the only frame (#19620). */}
        <div className="mt-4 flex flex-col divide-y divide-border">
          {filteredSuites.map((suite) => {
            const isExpanded = expanded === suite.id;
            const isRunning = running === suite.id;
            const suiteModels = [
              ...new Set(
                (suite.cases || [])
                  .map((evalCase) => evalCase.model)
                  .filter(
                    (model): model is string => typeof model === "string" && model.trim().length > 0
                  )
              ),
            ];
            const liveResult = suiteRuns[suite.id] || null;
            const suiteHistory = recentRuns.filter((run) => run.suiteId === suite.id);
            const latestScore =
              liveResult?.runs?.[0]?.summary.passRate ?? suiteHistory[0]?.summary.passRate;

            return (
              <div key={suite.id}>
                <div
                  className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 cursor-pointer hover:bg-surface/30 transition-colors"
                  onClick={() => setExpanded(isExpanded ? null : suite.id)}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      name={isExpanded ? "expand_more" : "chevron_right"}
                      size={16}
                      className="text-text-muted"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-text-main">
                          {suite.name || suite.id}
                        </p>
                        <Badge size="sm" variant={suite.source === "custom" ? "info" : "default"}>
                          {suite.source === "custom"
                            ? t("suiteBuilderCustomBadge")
                            : t("suiteBuilderBuiltInBadge")}
                        </Badge>
                        {typeof latestScore === "number" && (
                          <Badge
                            size="sm"
                            variant={
                              latestScore === 100
                                ? "success"
                                : latestScore >= 80
                                  ? "warning"
                                  : "error"
                            }
                          >
                            {latestScore}% {t("passSuffix")}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-text-muted">
                        {t("casesCount", { count: suite.cases?.length || suite.caseCount || 0 })}
                        {suite.description ? (
                          <span className="ml-1">- {suite.description}</span>
                        ) : null}
                      </p>
                      {suite.source === "custom" && suite.updatedAt ? (
                        <p className="text-xs text-text-muted mt-1">
                          {t("suiteBuilderUpdatedAt", { value: formatTimestamp(suite.updatedAt) })}
                        </p>
                      ) : null}
                      {suiteModels.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {suiteModels.map((model) => (
                            <span
                              key={model}
                              className="px-1.5 py-0.5 rounded text-3xs font-mono text-text-muted bg-surface-2"
                            >
                              {model}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      icon="content_copy"
                      disabled={running !== null || runningAll}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleCloneSuite(suite);
                      }}
                    >
                      {t("clone")}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      icon="download"
                      disabled={running !== null || runningAll}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleExportSuite(suite);
                      }}
                    >
                      {t("exportSuite")}
                    </Button>
                    {suite.source === "custom" && (
                      <>
                        <Button
                          size="sm"
                          variant="secondary"
                          icon="edit"
                          disabled={running !== null || runningAll || deletingSuiteId === suite.id}
                          onClick={(event) => {
                            event.stopPropagation();
                            openEditSuiteBuilder(suite);
                          }}
                        >
                          {t("edit")}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          icon="delete"
                          disabled={running !== null || runningAll || deletingSuiteId === suite.id}
                          loading={deletingSuiteId === suite.id}
                          onClick={(event) => {
                            event.stopPropagation();
                            void handleDeleteSuite(suite);
                          }}
                        >
                          {t("delete")}
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="primary"
                      loading={isRunning}
                      disabled={running !== null || runningAll}
                      onClick={(event) => {
                        event.stopPropagation();
                        void handleRunEval(suite);
                      }}
                    >
                      {isRunning ? t("runEvalRunning") : t("runEval")}
                    </Button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-border/20 p-4 flex flex-col gap-4">
                    {liveResult?.scorecard && liveResult.runs.length > 1 && (
                      <Card.Section>
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h4 className="ci-heading" data-size="sm">
                              {t("targetComparisonTitle")}
                            </h4>
                            <p className="text-xs text-text-muted">{t("targetComparisonHint")}</p>
                          </div>
                          <span className="text-lg font-semibold text-primary">
                            {liveResult.scorecard.overallPassRate}%
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                          {liveResult.runs.map((run) => (
                            <Card.Section key={run.id}>
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-medium text-text-main">
                                  {getTargetLabel(run.target, t)}
                                </span>
                                <span className="text-xs text-text-muted">
                                  {run.summary.passRate}% {t("passSuffix")}
                                </span>
                              </div>
                              <p className="text-xs text-text-muted mt-1">
                                {t("historyLatency", { value: run.avgLatencyMs })}
                              </p>
                            </Card.Section>
                          ))}
                        </div>
                      </Card.Section>
                    )}

                    {liveResult?.runs?.length ? (
                      <div
                        className={`grid gap-4 ${
                          liveResult.runs.length > 1 ? "xl:grid-cols-2" : "grid-cols-1"
                        }`}
                      >
                        {liveResult.runs.map((run) => (
                          <Card key={run.id} className="p-4">
                            <div className="flex items-center justify-between gap-3 mb-3">
                              <div>
                                <h4 className="ci-heading" data-size="sm">
                                  {getTargetLabel(run.target, t)}
                                </h4>
                                <p className="text-xs text-text-muted">
                                  {formatTimestamp(run.createdAt)} ·{" "}
                                  {t("historyLatency", { value: run.avgLatencyMs })}
                                </p>
                              </div>
                              <Badge variant="primary">
                                {run.summary.passRate}% {t("passSuffix")}
                              </Badge>
                            </div>

                            <Card.Section className="flex items-center gap-4 mb-4">
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-semibold text-success">
                                  {run.summary.passRate}%
                                </span>
                                <span className="text-xs text-text-muted">{t("passRate")}</span>
                              </div>
                              <div className="text-xs text-text-muted">
                                {t("summaryBreakdown", {
                                  passed: run.summary.passed,
                                  failed: run.summary.failed,
                                  total: run.summary.total,
                                })}
                              </div>
                            </Card.Section>

                            {run.results.length > 0 ? (
                              <div className="flex max-h-[420px] flex-col gap-2 overflow-auto pr-1">
                                {run.results.map((result, index) => {
                                  const resultKey = `${run.id}:${result.caseId || index}`;
                                  const isResultExpanded = expandedResults.has(resultKey);
                                  const actualOutput = getResultActualValue(
                                    result,
                                    run.outputs?.[result.caseId]
                                  );
                                  const expectedOutput = getResultExpectedValue(result);

                                  return (
                                    <div
                                      key={resultKey}
                                      className="overflow-hidden rounded-lg border border-border/20 bg-surface/20"
                                    >
                                      <Button
                                        variant="ghost"
                                        className="grid h-auto min-h-0 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-none px-3 py-3 text-left whitespace-normal"
                                        aria-expanded={isResultExpanded}
                                        aria-label={
                                          isResultExpanded ? t("collapseResult") : t("expandResult")
                                        }
                                        onClick={() => toggleResultExpansion(resultKey)}
                                      >
                                        <Icon
                                          name={isResultExpanded ? "expand_less" : "expand_more"}
                                          size={18}
                                          className="text-text-muted"
                                        />
                                        <div className="min-w-0">
                                          <div className="flex flex-wrap items-center gap-2">
                                            <span className="truncate text-sm font-medium text-text-main">
                                              {result.caseName || result.caseId || "—"}
                                            </span>
                                            <Badge
                                              size="sm"
                                              variant={result.passed ? "success" : "error"}
                                            >
                                              {result.passed
                                                ? t("resultPassed")
                                                : t("resultFailed")}
                                            </Badge>
                                            {result.error ? (
                                              <Badge size="sm" variant="error">
                                                {t("errorBadge")}
                                              </Badge>
                                            ) : null}
                                          </div>
                                          <p className="mt-1 truncate text-xs text-text-muted">
                                            {getResultDetails(result, t)}
                                          </p>
                                        </div>
                                        <span className="text-xs font-mono text-text-muted">
                                          {result.durationMs != null
                                            ? `${result.durationMs}ms`
                                            : "—"}
                                        </span>
                                      </Button>

                                      {isResultExpanded && (
                                        <div className="grid grid-cols-1 gap-3 border-t border-border/20 p-3 lg:grid-cols-2">
                                          <div>
                                            <p
                                              className="ci-eyebrow mb-1"
                                              data-size="2xs"
                                              data-weight="medium"
                                            >
                                              {t("expectedOutputLabel")}
                                            </p>
                                            <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded-md border border-border/20 bg-surface-2 p-3 text-xs text-text-main">
                                              {expectedOutput}
                                            </pre>
                                          </div>
                                          <div>
                                            <p
                                              className="ci-eyebrow mb-1"
                                              data-size="2xs"
                                              data-weight="medium"
                                            >
                                              {t("actualOutputLabel")}
                                            </p>
                                            <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded-md border border-border/20 bg-surface-2 p-3 text-xs text-text-main">
                                              {actualOutput}
                                            </pre>
                                            {result.error ? (
                                              <p className="mt-2 text-xs text-error">
                                                {result.error}
                                              </p>
                                            ) : null}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="rounded-lg border border-border/20 px-4 py-8 text-center text-sm text-text-muted">
                                {t("noResultsYet")}
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    ) : suiteHistory.length > 0 ? (
                      <Card.Section>
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <div>
                            <h4 className="ci-heading" data-size="sm">
                              {t("suiteLatestRuns")}
                            </h4>
                            <p className="text-xs text-text-muted">{t("suiteLatestRunsHint")}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {suiteHistory.slice(0, 4).map((run) => (
                            <Card.Section key={run.id}>
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-medium text-text-main">
                                  {getTargetLabel(run.target, t)}
                                </span>
                                <span className="text-xs font-semibold text-primary">
                                  {run.summary.passRate}%
                                </span>
                              </div>
                              <p className="text-xs text-text-muted mt-1">
                                {formatTimestamp(run.createdAt)}
                              </p>
                              <p className="text-xs text-text-muted mt-1">
                                {t("historyLatency", { value: run.avgLatencyMs })}
                              </p>
                            </Card.Section>
                          ))}
                        </div>
                      </Card.Section>
                    ) : null}

                    <div className="flex items-center gap-2 mb-1">
                      <Icon name="checklist" size={16} className="text-text-muted" />
                      <span className="text-xs text-text-muted font-medium">
                        {t("testCasesCount", { count: (suite.cases || []).length })}
                      </span>
                    </div>
                    <DataTable
                      label={t("testCasesCount", { count: (suite.cases || []).length })}
                      framed={false}
                      columns={[
                        { key: "name", label: t("columnCase") },
                        { key: "model", label: t("columnModel") },
                        { key: "strategy", label: t("columnStrategy") },
                        { key: "expected", label: t("columnExpected") },
                      ]}
                      data={(suite.cases || []).map((evalCase, index) => ({
                        id: evalCase.id || index,
                        name: evalCase.name,
                        model: evalCase.model || "—",
                        strategy: evalCase.expected?.strategy || "—",
                        expected: evalCase.expected?.value
                          ? String(evalCase.expected.value).slice(0, 80)
                          : "—",
                      }))}
                      renderCell={(row, column) => {
                        if (column.key === "strategy") {
                          const strategy = STRATEGIES.find((item) => item.name === row.strategy);
                          return (
                            <span
                              className={`text-xs font-mono font-semibold ${
                                strategy?.color || "text-text-muted"
                              }`}
                            >
                              {String(row.strategy || "—")}
                            </span>
                          );
                        }

                        if (column.key === "model") {
                          return (
                            <span className="text-xs font-mono text-primary/80">
                              {String(row.model || "—")}
                            </span>
                          );
                        }

                        if (column.key === "expected") {
                          return (
                            <span className="text-text-muted text-xs font-mono truncate max-w-[320px] block">
                              {String(row.expected || "—")}
                            </span>
                          );
                        }

                        return (
                          <span className="text-sm text-text-main">
                            {String(row[column.key] || "—")}
                          </span>
                        );
                      }}
                      maxHeight="320px"
                      emptyMessage={t("noTestCasesDefined")}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <SuiteBuilderModal
        draft={suiteDraft}
        isOpen={isBuilderOpen}
        onChange={setSuiteDraft}
        onClose={() => {
          if (savingSuite) return;
          setIsBuilderOpen(false);
          setShowSuiteErrors(false);
          setSuiteDraft(createEmptySuiteDraft());
        }}
        onSave={() => void handleSaveSuite()}
        saving={savingSuite}
        errors={showSuiteErrors ? validateSuiteDraft(suiteDraft) : null}
        focusInvalidRequest={refusedSaves}
        t={t}
      />
      {confirmDialog}
    </div>
  );
}

const HeroSection = memo(function HeroSection({
  t,
}: {
  t: (key: string, values?: Record<string, unknown>) => string;
}) {
  return (
    <Card className="p-0 overflow-hidden">
      <div
        className="p-6"
        style={{
          // Same three-stop wash as before, on the chart tokens (violet → blue → green).
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--color-chart-3) 5%, transparent) 0%, color-mix(in srgb, var(--color-chart-2) 5%, transparent) 50%, color-mix(in srgb, var(--color-chart-4) 5%, transparent) 100%)",
        }}
      >
        <div className="flex items-start gap-4">
          <IconChip tone="chart-3" size="lg">
            <Icon name="science" size={28} />
          </IconChip>
          <div className="flex-1">
            <h2 className="ci-heading mb-1" data-size="xl">
              {t("modelEvals")}
            </h2>
            <p className="text-sm text-text-muted leading-relaxed max-w-2xl">
              {t("evalsHeroDescription")}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <Icon name="verified" size={16} className="text-success" />
                {t("qualityValidation")}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <Icon name="compare" size={16} className="text-info" />
                {t("modelComparison")}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <Icon name="bug_report" size={16} className="text-warning" />
                {t("regressionDetection")}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <Icon name="speed" size={16} className="text-chart-3" />
                {t("latencyBenchmarks")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
});

function SuiteBuilderModal({
  draft,
  isOpen,
  onChange,
  onClose,
  onSave,
  saving,
  errors,
  focusInvalidRequest,
  t,
}: {
  draft: EvalSuiteDraft;
  isOpen: boolean;
  onChange: (next: EvalSuiteDraft) => void;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
  /** The draft's problems once a save was refused; `null` before that. */
  errors: SuiteDraftErrors | null;
  /** Bumped on each refused save: focus (and scroll) goes to the first flagged field. */
  focusInvalidRequest: number;
  t: (key: string, values?: Record<string, unknown>) => string;
}) {
  const tv = useTranslations("formValidation");
  const editableStrategies = STRATEGIES.filter((strategy) => strategy.name !== "custom");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusInvalidRequest > 0) focusFirstInvalidField(bodyRef.current);
  }, [focusInvalidRequest]);

  function updateCase(caseId: string, patch: Partial<EvalCaseDraft>) {
    onChange({
      ...draft,
      cases: draft.cases.map((entry) => (entry.id === caseId ? { ...entry, ...patch } : entry)),
    });
  }

  function addCase() {
    onChange({
      ...draft,
      cases: [...draft.cases, createEmptyCaseDraft()],
    });
  }

  function removeCase(caseId: string) {
    if (draft.cases.length <= 1) {
      onChange({
        ...draft,
        cases: [createEmptyCaseDraft()],
      });
      return;
    }

    onChange({
      ...draft,
      cases: draft.cases.filter((entry) => entry.id !== caseId),
    });
  }

  function duplicateCase(caseId: string) {
    const source = draft.cases.find((entry) => entry.id === caseId);
    if (!source) return;

    const sourceIndex = draft.cases.findIndex((entry) => entry.id === caseId);
    const duplicate = {
      ...source,
      id: createDraftId(),
      name: source.name ? `${source.name} ${t("suiteBuilderCloneSuffix")}`.trim() : "",
    };
    const nextCases = [...draft.cases];
    nextCases.splice(sourceIndex + 1, 0, duplicate);
    onChange({
      ...draft,
      cases: nextCases,
    });
  }

  // Over-limit values are flagged as they are typed (the required checks wait for a refused
  // save); the message names the field, the limit and the current trimmed length.
  function tooLongError(field: string, value: string, max: number) {
    const count = lengthOverLimit(value, max);
    return count === null ? undefined : tv("maxLength", { field, max, count });
  }

  function getExpectedPlaceholder(strategy: BuilderStrategy) {
    if (strategy === "exact") return t("suiteBuilderCaseExpectedPlaceholderExact");
    if (strategy === "regex") return t("suiteBuilderCaseExpectedPlaceholderRegex");
    return t("suiteBuilderCaseExpectedPlaceholderContains");
  }

  function getExpectedHint(strategy: BuilderStrategy) {
    if (strategy === "regex") return t("suiteBuilderCaseExpectedHintRegex");
    return undefined;
  }

  return (
    <Modal
      isOpen={isOpen}
      title={draft.id ? t("suiteBuilderEditTitle") : t("suiteBuilderCreateTitle")}
      onClose={onClose}
    >
      <div ref={bodyRef} className="flex max-h-[75vh] flex-col gap-4 overflow-y-auto pr-1">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label={t("suiteBuilderNameLabel")}
            value={draft.name}
            onChange={(event) => onChange({ ...draft, name: event.target.value })}
            placeholder={t("suiteBuilderNamePlaceholder")}
            required
            error={
              tooLongError(t("suiteBuilderNameLabel"), draft.name, EVAL_SUITE_NAME_MAX_LENGTH) ??
              (errors?.name ? t("suiteBuilderNameRequired") : undefined)
            }
          />
          <Input
            label={t("suiteBuilderDescriptionLabel")}
            value={draft.description}
            onChange={(event) => onChange({ ...draft, description: event.target.value })}
            placeholder={t("suiteBuilderDescriptionPlaceholder")}
            error={tooLongError(
              t("suiteBuilderDescriptionLabel"),
              draft.description,
              EVAL_SUITE_DESCRIPTION_MAX_LENGTH
            )}
          />
        </div>

        <Card.Section>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="ci-heading" data-size="sm">
                {t("suiteBuilderCasesTitle")}
              </h4>
              <p className="text-xs text-text-muted">{t("suiteBuilderCasesHint")}</p>
            </div>
            <Button icon="add" variant="secondary" onClick={addCase}>
              {t("suiteBuilderAddCase")}
            </Button>
          </div>
        </Card.Section>

        {draft.cases.map((draftCase, index) => {
          const selectedStrategy = editableStrategies.find(
            (strategy) => strategy.name === draftCase.strategy
          );
          const caseErrors = errors?.cases[draftCase.id];
          const promptErrorId = `suite-case-${draftCase.id}-prompt-error`;

          return (
            <Card key={draftCase.id} className="p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h4 className="ci-heading" data-size="sm">
                    {t("suiteBuilderCaseCardTitle", { index: index + 1 })}
                  </h4>
                  <p className="text-xs text-text-muted">
                    {t("suiteBuilderCaseCardHint", { index: index + 1 })}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    icon="content_copy"
                    onClick={() => duplicateCase(draftCase.id)}
                  >
                    {t("suiteBuilderDuplicateCase")}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    icon="delete"
                    onClick={() => removeCase(draftCase.id)}
                  >
                    {t("delete")}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label={t("suiteBuilderCaseNameLabel")}
                  value={draftCase.name}
                  onChange={(event) => updateCase(draftCase.id, { name: event.target.value })}
                  placeholder={t("suiteBuilderCaseNamePlaceholder")}
                  required
                  error={
                    tooLongError(
                      t("suiteBuilderCaseNameLabel"),
                      draftCase.name,
                      EVAL_CASE_NAME_MAX_LENGTH
                    ) ??
                    (caseErrors?.name
                      ? tv("required", { field: t("suiteBuilderCaseNameLabel") })
                      : undefined)
                  }
                />
                <Input
                  label={t("suiteBuilderCaseModelLabel")}
                  value={draftCase.model}
                  onChange={(event) => updateCase(draftCase.id, { model: event.target.value })}
                  placeholder={t("suiteBuilderCaseModelPlaceholder")}
                  hint={t("suiteBuilderCaseModelHint", {
                    target: t("targetSuiteDefaults"),
                    fallback: EVAL_DEFAULT_CASE_MODEL,
                  })}
                />
                <Input
                  label={t("suiteBuilderCaseTagsLabel")}
                  value={draftCase.tags}
                  onChange={(event) => updateCase(draftCase.id, { tags: event.target.value })}
                  placeholder={t("suiteBuilderCaseTagsPlaceholder")}
                  hint={t("suiteBuilderCaseTagsHint")}
                />
                <Select
                  label={t("suiteBuilderCaseStrategyLabel")}
                  value={draftCase.strategy}
                  onChange={(event) =>
                    updateCase(draftCase.id, { strategy: event.target.value as BuilderStrategy })
                  }
                  options={editableStrategies.map((strategy) => ({
                    value: strategy.name,
                    label: t(strategy.labelKey),
                  }))}
                />
                {selectedStrategy && (
                  <div
                    className={`flex items-start gap-2 rounded-lg px-3 py-2 ${selectedStrategy.bg}`}
                  >
                    <Icon
                      name={selectedStrategy.icon}
                      size={18}
                      className={`mt-0.5 ${selectedStrategy.color}`}
                    />
                    <p className="text-xs leading-relaxed text-text-muted">
                      {t(selectedStrategy.descriptionKey)}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4">
                <Field
                  label={t("suiteBuilderCaseSystemPromptLabel")}
                  htmlFor={`suite-case-${draftCase.id}-systemPrompt`}
                >
                  <Textarea
                    id={`suite-case-${draftCase.id}-systemPrompt`}
                    value={draftCase.systemPrompt}
                    onChange={(event) =>
                      updateCase(draftCase.id, { systemPrompt: event.target.value })
                    }
                    rows={3}
                    placeholder={t("suiteBuilderCaseSystemPromptPlaceholder")}
                  />
                </Field>
                <Field
                  label={t("suiteBuilderCaseUserPromptLabel")}
                  htmlFor={`suite-case-${draftCase.id}-userPrompt`}
                  error={
                    caseErrors?.prompt ? (
                      <span id={promptErrorId} role="alert">
                        {t("suiteBuilderCasePromptRequired")}
                      </span>
                    ) : undefined
                  }
                >
                  <Textarea
                    id={`suite-case-${draftCase.id}-userPrompt`}
                    error={Boolean(caseErrors?.prompt)}
                    aria-describedby={caseErrors?.prompt ? promptErrorId : undefined}
                    value={draftCase.userPrompt}
                    onChange={(event) =>
                      updateCase(draftCase.id, { userPrompt: event.target.value })
                    }
                    rows={4}
                    placeholder={t("suiteBuilderCaseUserPromptPlaceholder")}
                  />
                </Field>
                <Input
                  label={t("suiteBuilderCaseExpectedLabel")}
                  value={draftCase.expectedValue}
                  onChange={(event) =>
                    updateCase(draftCase.id, { expectedValue: event.target.value })
                  }
                  placeholder={getExpectedPlaceholder(draftCase.strategy)}
                  hint={getExpectedHint(draftCase.strategy)}
                  required
                  error={
                    caseErrors?.expectedValue
                      ? tv("required", { field: t("suiteBuilderCaseExpectedLabel") })
                      : undefined
                  }
                />
              </div>
            </Card>
          );
        })}

        <div className="flex gap-2">
          <Button fullWidth onClick={onSave} disabled={saving}>
            {saving ? t("saving") : draft.id ? t("save") : t("suiteBuilderCreateAction")}
          </Button>
          <Button fullWidth variant="ghost" onClick={onClose} disabled={saving}>
            {t("cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
