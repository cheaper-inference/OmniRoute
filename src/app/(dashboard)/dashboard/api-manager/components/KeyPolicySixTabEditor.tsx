"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";
import { Checkbox, CheckboxGroup } from "@omniroute/ui-kit/checkbox";
import { Alert } from "@omniroute/ui-kit/alert";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Toggle from "@/shared/components/Toggle";
import {
  KeyTemplateReasoningFields,
  KeyTemplateTokenLimitTiming,
} from "./KeyTemplatePolicyDetails";
import { ENDPOINT_CATEGORIES } from "@/shared/constants/endpointCategories";
import { API_KEY_CODEX_SERVICE_MODES } from "@/shared/constants/codexServiceMode";
import { getProviderDisplayName } from "@/lib/display/names";
import { compareTr, matchesSearch } from "@/shared/utils/turkishText";
import {
  formatProviderModelPermissionSummary,
  restoreProviderScopeSelection,
} from "../apiManagerPageUtils";
import {
  CLAUDE_CODE_DEFAULT_MODEL_ID,
  CLAUDE_CODE_DEFAULT_MODEL_NAME,
  withClaudeCodeDefaultModel,
  type AccessEditorTab,
} from "../[id]/access/useApiKeyAccessForm";
import TabErrorList from "../[id]/access/tabs/TabErrorList";
import ProviderModelPermissionList, {
  type ProviderGroup,
  type ProviderPermissionModel as Model,
} from "./ProviderModelPermissionList";
import ProviderConnectionPermissionList, {
  type ProviderConnection,
} from "./ProviderConnectionPermissionList";
import PreferredConnectionsSection from "./PreferredConnectionsSection";
import { AllowedCombosSection, type AllowedComboOption } from "./AllowedCombosSection";
import { ApiKeyAutoCombosToggle } from "./ApiKeyAutoCombosToggle";
import { ApiKeyCcDiscoveryAliasesToggle } from "./ApiKeyCcDiscoveryAliasesToggle";
import { ApiKeyCatalogScopeSelect } from "./ApiKeyCatalogScopeSelect";
import { ApiKeyCompressionToggle } from "./ApiKeyCompressionToggle";
import { ChaosModeAccessToggle } from "./ChaosModeAccessToggle";
import { BypassProviderQuotaToggle } from "./BypassProviderQuotaToggle";
import { UsageLimitSettings } from "./UsageLimitSettings";
import {
  editorFormStateToPolicy,
  mapReferenceIssueToTab,
  policyToEditorFormState,
  resolveActiveReferenceIssues,
  validatePolicyEditorState,
  type KeyTemplateCacheDefaultMode,
  type KeyTemplateCodexServiceMode,
  type KeyTemplatePolicy,
  type KeyTemplateReasoningRule,
  type KeyTemplateResetInterval,
  type KeyTemplateTokenLimit,
  type PolicyEditorFormState,
  type TemplateReferenceIssue,
} from "../keyTemplatePolicyUtils";

const TABS: Array<{ id: AccessEditorTab; icon: string; labelKey: string }> = [
  { id: "general", icon: "tune", labelKey: "tabGeneral" },
  { id: "models", icon: "psychology", labelKey: "tabModels" },
  { id: "combos", icon: "hub", labelKey: "tabCombos" },
  { id: "connections", icon: "cable", labelKey: "tabConnections" },
  { id: "limits", icon: "speed", labelKey: "tabLimits" },
  { id: "behaviour", icon: "toggle_on", labelKey: "tabBehaviour" },
];

interface QuotaPoolItem {
  id: string;
  name?: string;
  groupId?: string;
}

interface KeyGroupItem {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
}

interface ProxyItem {
  id: string;
  name?: string;
  host?: string;
  port?: number;
}

export interface KeyPolicySixTabEditorProps {
  policy: KeyTemplatePolicy;
  onChange?: (nextPolicy: KeyTemplatePolicy, isDirty: boolean) => void;
  formStateOverride?: PolicyEditorFormState;
  onFormStateChange?: (state: PolicyEditorFormState) => void;
  serverReferenceIssues?: readonly TemplateReferenceIssue[];
  onValidationStateChange?: (state: {
    hasErrors: boolean;
    hasBlockingReferenceIssues: boolean;
    activeIssues: TemplateReferenceIssue[];
  }) => void;
  disabled?: boolean;
}

export default function KeyPolicySixTabEditor({
  policy,
  onChange,
  formStateOverride,
  onFormStateChange,
  serverReferenceIssues = [],
  onValidationStateChange,
  disabled = false,
}: KeyPolicySixTabEditorProps) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");

  const [activeTab, setActiveTab] = useState<AccessEditorTab>("general");
  const [baselinePolicy, setBaselinePolicy] = useState<KeyTemplatePolicy>(policy);
  const [internalFormState, setFormState] = useState<PolicyEditorFormState>(() =>
    policyToEditorFormState(policy)
  );
  const formState = formStateOverride ?? internalFormState;

  // Sync when external policy reference changes (e.g., template selection or modal reset)
  const [prevPropPolicy, setPrevPropPolicy] = useState<KeyTemplatePolicy>(policy);
  if (!formStateOverride && policy !== prevPropPolicy) {
    setPrevPropPolicy(policy);
    setBaselinePolicy(policy);
    setFormState(policyToEditorFormState(policy));
  }

  // Catalog state (lazy loaded when editor mounts)
  const [allModels, setAllModels] = useState<Model[]>([]);
  const [_modelsLoaded, setModelsLoaded] = useState(false);
  const [allCombos, setAllCombos] = useState<AllowedComboOption[]>([]);
  const [allConnections, setAllConnections] = useState<ProviderConnection[]>([]);
  const [allQuotaPools, setAllQuotaPools] = useState<QuotaPoolItem[]>([]);
  const [allKeyGroups, setAllKeyGroups] = useState<KeyGroupItem[]>([]);
  const [allProxies, setAllProxies] = useState<ProxyItem[]>([]);
  const [catalogLoaded, setCatalogLoaded] = useState(false);

  const [searchModel, setSearchModel] = useState("");
  const [newBlockedPattern, setNewBlockedPattern] = useState("");
  const [newIpCidr, setNewIpCidr] = useState("");
  const [newExtraScope, setNewExtraScope] = useState("");
  const [newOverrideChannel, setNewOverrideChannel] = useState("auto");
  const [newOverrideConnId, setNewOverrideConnId] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadCatalogs = async () => {
      try {
        const [modelsRes, combosRes, providersRes, poolsRes, groupsRes, proxiesRes] =
          await Promise.all([
            fetch("/v1/models").catch(() => null),
            fetch("/api/combos").catch(() => null),
            fetch("/api/providers").catch(() => null),
            fetch("/api/quota/pools").catch(() => null),
            fetch("/api/keys/groups").catch(() => null),
            fetch("/api/settings/proxies").catch(() => null),
          ]);

        if (cancelled) return;

        if (combosRes?.ok) {
          const d = await combosRes.json();
          if (!cancelled) setAllCombos(Array.isArray(d.combos) ? d.combos : []);
        }
        if (providersRes?.ok) {
          const d = await providersRes.json();
          if (!cancelled) setAllConnections(Array.isArray(d.connections) ? d.connections : []);
        }
        if (poolsRes?.ok) {
          const d = await poolsRes.json();
          if (!cancelled) setAllQuotaPools(Array.isArray(d.pools) ? d.pools : []);
        }
        if (groupsRes?.ok) {
          const d = await groupsRes.json();
          if (!cancelled) setAllKeyGroups(Array.isArray(d.groups) ? d.groups : []);
        }
        if (proxiesRes?.ok) {
          const d = await proxiesRes.json();
          const items = Array.isArray(d.items)
            ? d.items
            : Array.isArray(d.proxies)
              ? d.proxies
              : [];
          if (!cancelled) setAllProxies(items);
        }

        if (modelsRes?.ok) {
          const d = await modelsRes.json();
          if (!cancelled) {
            setAllModels(Array.isArray(d.data) ? d.data : []);
            setModelsLoaded(true);
          }
        } else {
          const fallbackRes = await fetch("/api/models?all=true").catch(() => null);
          if (!cancelled && fallbackRes?.ok) {
            const fd = await fallbackRes.json();
            const rawList = Array.isArray(fd.models) ? fd.models : [];
            setAllModels(
              rawList
                .map(
                  (m: {
                    fullModel?: string;
                    provider?: string;
                    model?: string;
                    alias?: string;
                  }) => ({
                    id: typeof m.fullModel === "string" ? m.fullModel : `${m.provider}/${m.model}`,
                    owned_by: typeof m.provider === "string" ? m.provider : "unknown",
                    name: typeof m.alias === "string" ? m.alias : m.model || m.fullModel,
                  })
                )
                .filter((m: Model) => typeof m.id === "string" && m.id.length > 0)
            );
          }
          if (!cancelled) setModelsLoaded(true);
        }
      } finally {
        if (!cancelled) setCatalogLoaded(true);
      }
    };

    void loadCatalogs();
    return () => {
      cancelled = true;
    };
  }, []);

  const updateState = useCallback(
    (updater: (prev: PolicyEditorFormState) => PolicyEditorFormState) => {
      const next = updater(formState);
      const nextPolicy = editorFormStateToPolicy(next);
      const dirty = JSON.stringify(nextPolicy) !== JSON.stringify(baselinePolicy);
      if (!formStateOverride) setFormState(next);
      setPrevPropPolicy(nextPolicy);
      onFormStateChange?.(next);
      onChange?.(nextPolicy, dirty);
    },
    [baselinePolicy, onChange, formState, formStateOverride, onFormStateChange]
  );

  const catalogSets = useMemo(() => {
    if (!catalogLoaded) return undefined;
    return {
      connectionIds:
        allConnections.length > 0 ? new Set(allConnections.map((c) => c.id)) : undefined,
      comboNames: allCombos.length > 0 ? new Set(allCombos.map((c) => c.name)) : undefined,
      comboIds:
        allCombos.length > 0
          ? new Set(allCombos.map((c) => c.id || c.name).filter(Boolean))
          : undefined,
      quotaPoolIds: allQuotaPools.length > 0 ? new Set(allQuotaPools.map((p) => p.id)) : undefined,
      proxyIds: allProxies.length > 0 ? new Set(allProxies.map((p) => p.id)) : undefined,
      groupIds:
        allKeyGroups.length > 0
          ? new Set(allKeyGroups.filter((g) => g.isActive !== false).map((g) => g.id))
          : undefined,
    };
  }, [catalogLoaded, allConnections, allCombos, allQuotaPools, allProxies, allKeyGroups]);

  const activeIssues = useMemo(
    () => resolveActiveReferenceIssues(formState, serverReferenceIssues, catalogSets),
    [formState, serverReferenceIssues, catalogSets]
  );

  const tabErrors = useMemo(() => validatePolicyEditorState(formState, t), [formState, t]);

  const tabIssueMap = useMemo(() => {
    const byTab: Record<AccessEditorTab, TemplateReferenceIssue[]> = {
      general: [],
      models: [],
      combos: [],
      connections: [],
      limits: [],
      behaviour: [],
    };
    for (const issue of activeIssues) {
      byTab[mapReferenceIssueToTab(issue.path)].push(issue);
    }
    return byTab;
  }, [activeIssues]);

  const hasErrors = useMemo(
    () => Object.values(tabErrors).some((list) => list.length > 0),
    [tabErrors]
  );
  const hasBlockingReferenceIssues = useMemo(
    () => activeIssues.some((issue) => issue.blocking),
    [activeIssues]
  );

  useEffect(() => {
    onValidationStateChange?.({
      hasErrors,
      hasBlockingReferenceIssues,
      activeIssues,
    });
  }, [hasErrors, hasBlockingReferenceIssues, activeIssues, onValidationStateChange]);

  // Models grouping
  const permissionModels = useMemo(() => withClaudeCodeDefaultModel(allModels), [allModels]);
  const modelsByProvider = useMemo((): ProviderGroup[] => {
    const grouped: Record<string, Model[]> = {};
    for (const model of permissionModels) {
      const provider =
        getProviderDisplayName(model.owned_by) || model.owned_by || t("unknownProvider");
      if (!grouped[provider]) grouped[provider] = [];
      grouped[provider].push(model);
    }
    return Object.entries(grouped).sort((a, b) => compareTr(a[0], b[0]));
  }, [permissionModels, t]);

  const filteredModelsByProvider = useMemo((): ProviderGroup[] => {
    if (!searchModel.trim()) return modelsByProvider;
    return modelsByProvider
      .map(([provider, models]): ProviderGroup => [
        provider,
        models.filter(
          (m) =>
            matchesSearch(m.id, searchModel) ||
            matchesSearch(m.name || "", searchModel) ||
            matchesSearch(provider, searchModel)
        ),
      ])
      .filter(([, models]) => models.length > 0);
  }, [modelsByProvider, searchModel]);

  const [expandedProviders, setExpandedProviders] = useState<Set<string>>(() => new Set());
  const handleToggleExpandProvider = useCallback((provider: string) => {
    setExpandedProviders((prev) => {
      const next = new Set(prev);
      if (next.has(provider)) next.delete(provider);
      else next.add(provider);
      return next;
    });
  }, []);

  const { providerWildcards: selectedProviderScopes, exactModels: selectedExactModels } = useMemo(
    () => restoreProviderScopeSelection(formState.selectedModels),
    [formState.selectedModels]
  );

  const knownModelIdSet = useMemo(
    () => new Set(permissionModels.map((m) => m.id)),
    [permissionModels]
  );
  const dynamicOrUnlistedModels = useMemo(
    () => formState.selectedModels.filter((id) => !id.endsWith("/*") && !knownModelIdSet.has(id)),
    [formState.selectedModels, knownModelIdSet]
  );

  const [customModelPattern, setCustomModelPattern] = useState("");

  const removeReferenceIssueTarget = useCallback(
    (issue: TemplateReferenceIssue) => {
      const parts = issue.path.split(".");
      const idx = Number(parts[2]);
      updateState((prev) => {
        if (issue.path.startsWith("key.allowedConnections") && Number.isInteger(idx)) {
          const removedId = prev.selectedConnections[idx];
          const nextSelected = prev.selectedConnections.filter((_, i) => i !== idx);
          return {
            ...prev,
            selectedConnections: nextSelected,
            selectedPreferredConnections: prev.selectedPreferredConnections.filter(
              (id) => id !== removedId
            ),
          };
        }
        if (issue.path.startsWith("key.preferredConnections") && Number.isInteger(idx)) {
          return {
            ...prev,
            selectedPreferredConnections: prev.selectedPreferredConnections.filter(
              (_, i) => i !== idx
            ),
          };
        }
        if (issue.path.startsWith("key.allowedCombos") && Number.isInteger(idx)) {
          return {
            ...prev,
            selectedCombos: prev.selectedCombos.filter((_, i) => i !== idx),
          };
        }
        if (issue.path.startsWith("key.allowedQuotas") && Number.isInteger(idx)) {
          return {
            ...prev,
            allowedQuotas: prev.allowedQuotas.filter((_, i) => i !== idx),
          };
        }
        if (issue.path === "key.proxyId") {
          return { ...prev, proxyId: "" };
        }
        if (issue.path.startsWith("related.groupIds") && Number.isInteger(idx)) {
          return {
            ...prev,
            groupIds: prev.groupIds.filter((_, i) => i !== idx),
          };
        }
        if (issue.path.startsWith("related.autoCandidateOverrides") && Number.isInteger(idx)) {
          return {
            ...prev,
            autoCandidateOverrides: prev.autoCandidateOverrides.filter((_, i) => i !== idx),
          };
        }
        if (issue.path.startsWith("related.reasoningRules") && Number.isInteger(idx)) {
          return {
            ...prev,
            reasoningRules: prev.reasoningRules.filter((_, i) => i !== idx),
          };
        }
        return prev;
      });
    },
    [updateState]
  );

  const renderTabReferenceIssues = (tab: AccessEditorTab) => {
    const issues = tabIssueMap[tab];
    if (!issues || issues.length === 0) return null;
    return (
      <div className="flex flex-col gap-2" data-testid={`reference-issues-${tab}`}>
        {issues.map((issue) => (
          <div
            key={`${issue.path}-${issue.code}`}
            role="alert"
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border text-xs ${
              issue.blocking
                ? "bg-error/10 border-error/30 text-error"
                : "bg-warning/10 border-warning/30 text-warning"
            }`}
          >
            <div className="flex items-start gap-2">
              <Icon
                name={issue.blocking ? "error" : "warning"}
                size={16}
                className="shrink-0 mt-0.5"
              />
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold">
                  {issue.blocking
                    ? t("templateBlockingReferenceIssue")
                    : t("templateNonBlockingReferenceIssue")}{" "}
                  <code className="font-mono text-[11px]">({issue.code})</code>
                </span>
                <span>{issue.message}</span>
                <span className="font-mono text-[10px] opacity-80">{issue.path}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {issue.path.startsWith("key.allowedConnections") &&
                formState.selectedConnections.length <= 1 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      updateState((prev) => ({
                        ...prev,
                        allowAllConnections: true,
                        selectedConnections: [],
                      }))
                    }
                  >
                    {t("allConnections")}
                  </Button>
                )}
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => removeReferenceIssueTarget(issue)}
              >
                {t("templateRemoveStaleRef")}
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4" data-testid="key-policy-six-tab-editor">
      {activeIssues.length > 0 && (
        <Alert
          variant={hasBlockingReferenceIssues ? "critical" : "warning"}
          icon={<Icon name={hasBlockingReferenceIssues ? "error" : "warning"} />}
          title={
            hasBlockingReferenceIssues
              ? t("templateStaleReferencesBlockingTitle")
              : t("templateStaleReferencesWarningTitle")
          }
          description={
            hasBlockingReferenceIssues
              ? t("templateStaleReferencesBlockingDesc")
              : t("templateStaleReferencesWarningDesc")
          }
        />
      )}

      <Tabs
        variant="underline"
        value={activeTab}
        onValueChange={(next) => setActiveTab(next as AccessEditorTab)}
        className="flex flex-col gap-4"
      >
        <TabsList aria-label={t("accessEditorTabsLabel")}>
          {TABS.map((tabDef) => {
            const errCount =
              (tabErrors[tabDef.id]?.length ?? 0) +
              (tabIssueMap[tabDef.id]?.filter((i) => i.blocking).length ?? 0);
            const warnCount = tabIssueMap[tabDef.id]?.filter((i) => !i.blocking).length ?? 0;
            return (
              <TabsTrigger
                key={tabDef.id}
                value={tabDef.id}
                id={`policy-tab-${tabDef.id}`}
                aria-controls={`policy-panel-${tabDef.id}`}
                icon={<Icon name={tabDef.icon} size={16} />}
                className="whitespace-nowrap"
              >
                <span>{t(tabDef.labelKey)}</span>
                {errCount > 0 && (
                  <span
                    className="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-error text-bg"
                    title={t("errorBadgeLabel", { count: errCount })}
                  >
                    {errCount}
                  </span>
                )}
                {errCount === 0 && warnCount > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-warning text-bg">
                    {warnCount}
                  </span>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent
          value={activeTab}
          id={`policy-panel-${activeTab}`}
          aria-labelledby={`policy-tab-${activeTab}`}
          className="focus:outline-none"
        >
          <Card className="p-4 sm:p-5">
            <fieldset disabled={disabled} className="m-0 min-w-0 border-0 p-0 flex flex-col gap-4">
              {renderTabReferenceIssues(activeTab)}
              <TabErrorList errors={tabErrors[activeTab]} />

              {/* ==================== GENERAL TAB ==================== */}
              {activeTab === "general" && (
                <div className="flex flex-col gap-4">
                  {/* Lifecycle: Active & Banned */}
                  <div className="flex items-start justify-between gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-text-main">{t("keyActive")}</p>
                      <p className="text-xs text-text-muted">{t("keyActiveDesc")}</p>
                    </div>
                    <Toggle
                      size="sm"
                      checked={formState.isActive}
                      onChange={() => updateState((p) => ({ ...p, isActive: !p.isActive }))}
                      ariaLabel={t("keyActive")}
                    />
                  </div>

                  <div className="flex items-start justify-between gap-3 p-3.5 rounded-lg border border-error/20 bg-error/5">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold text-error">{t("bannedStatus")}</p>
                      <p className="text-xs text-error">{t("templateBannedStatusDesc")}</p>
                    </div>
                    <Toggle
                      size="sm"
                      checked={formState.isBanned}
                      onChange={() => updateState((p) => ({ ...p, isBanned: !p.isBanned }))}
                      ariaLabel={t("bannedStatus")}
                    />
                  </div>

                  {/* Relative Expiry */}
                  <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-text-main">
                          {t("templateExpirationPolicy")}
                        </p>
                        <p className="text-xs text-text-muted">
                          {t("templateExpirationPolicyDesc")}
                        </p>
                      </div>
                      <div className="flex gap-1 p-0.5 bg-surface rounded-md shrink-0">
                        <Button
                          type="button"
                          size="sm"
                          variant={formState.expiryMode === "none" ? "primary" : "ghost"}
                          aria-pressed={formState.expiryMode === "none"}
                          onClick={() => updateState((p) => ({ ...p, expiryMode: "none" }))}
                          className="text-xs"
                        >
                          {t("never")}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant={formState.expiryMode === "relative" ? "primary" : "ghost"}
                          aria-pressed={formState.expiryMode === "relative"}
                          onClick={() => updateState((p) => ({ ...p, expiryMode: "relative" }))}
                          className="text-xs"
                        >
                          {t("templateRelativeTtl")}
                        </Button>
                      </div>
                    </div>
                    {formState.expiryMode === "relative" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border/50">
                        <Input
                          label={t("templateTtlDuration")}
                          type="number"
                          min={1}
                          value={formState.expiryTtlValue}
                          onChange={(e) =>
                            updateState((p) => ({ ...p, expiryTtlValue: e.target.value }))
                          }
                        />
                        <Select
                          label={t("templateTtlUnit")}
                          value={formState.expiryTtlUnit}
                          onChange={(e) =>
                            updateState((p) => ({
                              ...p,
                              expiryTtlUnit: e.target.value as
                                "seconds" | "minutes" | "hours" | "days",
                            }))
                          }
                        >
                          <option value="seconds">{t("templateUnitSeconds")}</option>
                          <option value="minutes">{t("templateUnitMinutes")}</option>
                          <option value="hours">{t("templateUnitHours")}</option>
                          <option value="days">{t("templateUnitDays")}</option>
                        </Select>
                      </div>
                    )}
                  </div>

                  {/* Management Access */}
                  <div className="flex items-start justify-between gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-text-main">{t("managementAccess")}</p>
                      <p className="text-xs text-text-muted">{t("managementAccessDesc")}</p>
                    </div>
                    <Toggle
                      size="sm"
                      checked={formState.manageEnabled}
                      onChange={() =>
                        updateState((p) => ({ ...p, manageEnabled: !p.manageEnabled }))
                      }
                      ariaLabel={t("managementAccess")}
                    />
                  </div>

                  {/* Self-service Visibility */}
                  <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-text-main">
                        {t("selfServiceVisibility")}
                      </p>
                      <p className="text-xs text-text-muted">{t("selfServiceVisibilityDesc")}</p>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-col gap-0.5">
                        <p className="text-xs font-medium text-text-main">
                          {t("ownUsageVisibility")}
                        </p>
                        <p className="text-xs text-text-muted">{t("ownUsageVisibilityDesc")}</p>
                      </div>
                      <Toggle
                        size="sm"
                        checked={formState.selfUsageEnabled}
                        onChange={() =>
                          updateState((p) => ({
                            ...p,
                            selfUsageEnabled: !p.selfUsageEnabled,
                            selfAccountQuotaEnabled: p.selfUsageEnabled
                              ? false
                              : p.selfAccountQuotaEnabled,
                          }))
                        }
                        ariaLabel={t("ownUsageVisibility")}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-border/50 pt-2">
                      <div className="flex flex-col gap-0.5">
                        <p className="text-xs font-medium text-text-main">
                          {t("sharedAccountQuotaVisibility")}
                        </p>
                        <p className="text-xs text-text-muted">
                          {t("sharedAccountQuotaVisibilityDesc")}
                        </p>
                      </div>
                      <Toggle
                        size="sm"
                        checked={formState.selfAccountQuotaEnabled}
                        disabled={!formState.selfUsageEnabled}
                        onChange={() =>
                          updateState((p) => ({
                            ...p,
                            selfAccountQuotaEnabled: !p.selfAccountQuotaEnabled,
                          }))
                        }
                        ariaLabel={t("sharedAccountQuotaVisibility")}
                      />
                    </div>
                  </div>

                  {/* Extra Scopes (e.g. lease:exclusive or custom scopes) */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-col gap-0.5">
                        <p className="text-sm font-medium text-text-main">{t("exclusiveLease")}</p>
                        <p className="text-xs text-text-muted">{t("exclusiveLeaseNoticeDesc")}</p>
                      </div>
                      <Toggle
                        size="sm"
                        checked={formState.extraScopes.includes("lease:exclusive")}
                        onChange={() =>
                          updateState((p) => ({
                            ...p,
                            extraScopes: p.extraScopes.includes("lease:exclusive")
                              ? p.extraScopes.filter((s) => s !== "lease:exclusive")
                              : [...p.extraScopes, "lease:exclusive"],
                          }))
                        }
                        ariaLabel={t("exclusiveLease")}
                      />
                    </div>
                    {formState.extraScopes.filter((s) => s !== "lease:exclusive").length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
                        {formState.extraScopes
                          .filter((s) => s !== "lease:exclusive")
                          .map((scope) => (
                            <span
                              key={scope}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-border text-xs font-mono"
                            >
                              {scope}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                className="h-4 w-4 p-0 text-text-muted hover:text-error"
                                onClick={() =>
                                  updateState((p) => ({
                                    ...p,
                                    extraScopes: p.extraScopes.filter((s) => s !== scope),
                                  }))
                                }
                                aria-label={t("removeSelection", { name: scope })}
                              >
                                <Icon name="close" size={12} />
                              </Button>
                            </span>
                          ))}
                      </div>
                    )}
                    <div className="flex gap-2 pt-1">
                      <Input
                        value={newExtraScope}
                        onChange={(e) => setNewExtraScope(e.target.value)}
                        placeholder={t("templateAdditionalScopePlaceholder")}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        disabled={!newExtraScope.trim()}
                        onClick={() => {
                          const s = newExtraScope.trim();
                          if (!s) return;
                          updateState((p) => ({
                            ...p,
                            extraScopes: p.extraScopes.includes(s)
                              ? p.extraScopes
                              : [...p.extraScopes, s],
                          }));
                          setNewExtraScope("");
                        }}
                      >
                        {t("templateAddScope")}
                      </Button>
                    </div>
                  </div>

                  {/* Allowed Endpoints */}
                  <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-text-main">
                          {t("endpointRestrictions")}
                        </p>
                        <p className="text-xs text-text-muted">
                          {formState.allowAllEndpoints
                            ? t("allEndpointsAllowed")
                            : t("endpointsRestricted", {
                                count: formState.selectedEndpoints.length,
                              })}
                        </p>
                      </div>
                      <div className="flex gap-1 p-0.5 bg-surface rounded-md">
                        <Button
                          type="button"
                          size="sm"
                          variant={formState.allowAllEndpoints ? "primary" : "ghost"}
                          aria-pressed={formState.allowAllEndpoints}
                          onClick={() =>
                            updateState((p) => ({
                              ...p,
                              allowAllEndpoints: true,
                              selectedEndpoints: [],
                            }))
                          }
                          className="text-xs"
                        >
                          {t("all")}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant={!formState.allowAllEndpoints ? "primary" : "ghost"}
                          aria-pressed={!formState.allowAllEndpoints}
                          onClick={() =>
                            updateState((p) => ({
                              ...p,
                              allowAllEndpoints: false,
                              selectedEndpoints:
                                p.selectedEndpoints.length === 0
                                  ? ENDPOINT_CATEGORIES.map((c) => c.id)
                                  : p.selectedEndpoints,
                            }))
                          }
                          className="text-xs"
                        >
                          {t("restrict")}
                        </Button>
                      </div>
                    </div>
                    {!formState.allowAllEndpoints && (
                      <CheckboxGroup
                        aria-label={t("endpointRestrictions")}
                        className="pt-1 [&_.ci-checkbox-group__items]:grid [&_.ci-checkbox-group__items]:max-h-56 [&_.ci-checkbox-group__items]:grid-cols-1 [&_.ci-checkbox-group__items]:gap-2 [&_.ci-checkbox-group__items]:overflow-y-auto sm:[&_.ci-checkbox-group__items]:grid-cols-2"
                      >
                        {ENDPOINT_CATEGORIES.map((cat) => (
                          <Checkbox
                            key={cat.id}
                            card
                            checked={formState.selectedEndpoints.includes(cat.id)}
                            onChange={() =>
                              updateState((p) => ({
                                ...p,
                                selectedEndpoints: p.selectedEndpoints.includes(cat.id)
                                  ? p.selectedEndpoints.filter((id) => id !== cat.id)
                                  : [...p.selectedEndpoints, cat.id],
                              }))
                            }
                            label={<span className="text-xs font-medium">{cat.label}</span>}
                            description={<span className="text-[10px]">{cat.description}</span>}
                          />
                        ))}
                      </CheckboxGroup>
                    )}
                  </div>

                  {/* IP Allowlist & Proxy ID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
                      <p className="text-sm font-medium text-text-main">
                        {t("templateIpAllowlist")}
                      </p>
                      <p className="text-xs text-text-muted">{t("templateIpAllowlistDesc")}</p>
                      <div className="flex gap-2">
                        <Input
                          value={newIpCidr}
                          onChange={(e) => setNewIpCidr(e.target.value)}
                          placeholder="e.g. 10.0.0.0/8"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          disabled={!newIpCidr.trim()}
                          onClick={() => {
                            const ip = newIpCidr.trim();
                            if (!ip) return;
                            updateState((p) => ({
                              ...p,
                              ipAllowlist: p.ipAllowlist.includes(ip)
                                ? p.ipAllowlist
                                : [...p.ipAllowlist, ip],
                            }));
                            setNewIpCidr("");
                          }}
                        >
                          {t("templateAddIp")}
                        </Button>
                      </div>
                      {formState.ipAllowlist.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {formState.ipAllowlist.map((ip) => (
                            <span
                              key={ip}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-border text-xs font-mono"
                            >
                              {ip}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                className="h-4 w-4 p-0 text-text-muted hover:text-error"
                                onClick={() =>
                                  updateState((p) => ({
                                    ...p,
                                    ipAllowlist: p.ipAllowlist.filter((entry) => entry !== ip),
                                  }))
                                }
                                aria-label={t("removeSelection", { name: ip })}
                              >
                                <Icon name="close" size={12} />
                              </Button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
                      <p className="text-sm font-medium text-text-main">
                        {t("templateBoundProxy")}
                      </p>
                      <p className="text-xs text-text-muted">{t("templateBoundProxyDesc")}</p>
                      <Input
                        value={formState.proxyId}
                        onChange={(e) => updateState((p) => ({ ...p, proxyId: e.target.value }))}
                        list="policy-editor-proxy-options"
                        placeholder={t("templateBoundProxyPlaceholder")}
                      />
                      <datalist id="policy-editor-proxy-options">
                        {allProxies.map((proxy) => (
                          <option
                            key={proxy.id}
                            value={proxy.id}
                            label={proxy.name || `${proxy.host ?? ""}:${proxy.port ?? ""}`}
                          />
                        ))}
                      </datalist>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== MODELS TAB ==================== */}
              {activeTab === "models" && (
                <div className="flex flex-col gap-4">
                  {/* Clear separation Section 1: Execution Access Control */}
                  <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-border bg-surface/30">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-text-main">
                          {t("templateExecutionAccessHeading")}
                        </p>
                        <p className="text-xs text-text-muted">
                          {t("templateExecutionAccessDesc")}
                        </p>
                      </div>
                      <div className="flex gap-1 p-0.5 bg-surface rounded-md">
                        <Button
                          type="button"
                          size="sm"
                          variant={formState.allowAllModels ? "primary" : "ghost"}
                          aria-pressed={formState.allowAllModels}
                          onClick={() => updateState((p) => ({ ...p, allowAllModels: true }))}
                          className="gap-1.5 text-xs"
                        >
                          <Icon name="lock_open" size={16} />
                          {t("allowAll")}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant={!formState.allowAllModels ? "primary" : "ghost"}
                          aria-pressed={!formState.allowAllModels}
                          onClick={() => updateState((p) => ({ ...p, allowAllModels: false }))}
                          className="gap-1.5 text-xs"
                        >
                          <Icon name="lock" size={16} />
                          {t("restrict")}
                        </Button>
                      </div>
                    </div>

                    <div
                      className={`flex items-start gap-2 p-2.5 rounded-lg text-xs ${
                        formState.allowAllModels
                          ? "bg-success/10 border border-success/30 text-success"
                          : formState.selectedModels.length === 0
                            ? "bg-error/10 border border-error/30 text-error"
                            : "bg-warning/10 border border-warning/30 text-warning"
                      }`}
                    >
                      <Icon
                        name={
                          formState.allowAllModels
                            ? "info"
                            : formState.selectedModels.length === 0
                              ? "block"
                              : "warning"
                        }
                        size={16}
                        className="shrink-0 mt-0.5"
                      />
                      <span>
                        {formState.allowAllModels
                          ? t("allowAllDesc")
                          : formState.selectedModels.length === 0
                            ? t("templateModelsDenyAllBanner")
                            : formatProviderModelPermissionSummary(
                                selectedProviderScopes.length,
                                selectedExactModels.length,
                                t,
                                tc
                              )}
                      </span>
                    </div>

                    {!formState.allowAllModels && (
                      <>
                        {/* Dynamic / Custom model pattern entry */}
                        <div className="flex gap-2">
                          <Input
                            value={customModelPattern}
                            onChange={(e) => setCustomModelPattern(e.target.value)}
                            placeholder={t("templateAddModelPatternPlaceholder")}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            disabled={!customModelPattern.trim()}
                            onClick={() => {
                              const pat = customModelPattern.trim();
                              if (!pat) return;
                              updateState((p) => ({
                                ...p,
                                selectedModels: p.selectedModels.includes(pat)
                                  ? p.selectedModels
                                  : [...p.selectedModels, pat],
                              }));
                              setCustomModelPattern("");
                            }}
                          >
                            {t("templateAddModelPattern")}
                          </Button>
                        </div>

                        {dynamicOrUnlistedModels.length > 0 && (
                          <div className="flex flex-col gap-1.5 p-2.5 rounded border border-info/30 bg-info/5">
                            <p className="text-[11px] font-medium text-info">
                              {t("templateDynamicModelPatternsNote")}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {dynamicOrUnlistedModels.map((pat) => (
                                <span
                                  key={pat}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-border text-xs font-mono"
                                >
                                  {pat}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-sm"
                                    className="h-4 w-4 p-0 text-text-muted hover:text-error"
                                    onClick={() =>
                                      updateState((p) => ({
                                        ...p,
                                        selectedModels: p.selectedModels.filter((m) => m !== pat),
                                      }))
                                    }
                                    aria-label={t("removeSelection", { name: pat })}
                                  >
                                    <Icon name="close" size={12} />
                                  </Button>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <ProviderModelPermissionList
                          modelsByProvider={filteredModelsByProvider}
                          allModels={permissionModels}
                          selectedModels={formState.selectedModels}
                          expandedProviders={expandedProviders}
                          searchModel={searchModel}
                          onSearchChange={setSearchModel}
                          onToggleExpand={handleToggleExpandProvider}
                          onSelectionChange={(nextModels) =>
                            updateState((p) => ({ ...p, selectedModels: nextModels }))
                          }
                          getModelDisplayName={(id) =>
                            id === CLAUDE_CODE_DEFAULT_MODEL_ID
                              ? CLAUDE_CODE_DEFAULT_MODEL_NAME
                              : id
                          }
                        />
                      </>
                    )}

                    {/* Blocked Models (Deny-list always wins) */}
                    <div className="flex flex-col gap-2 pt-3 border-t border-border/60">
                      <p className="text-xs font-semibold text-text-main">
                        {t("templateBlockedModelsTitle")}
                      </p>
                      <p className="text-[11px] text-text-muted">
                        {t("templateBlockedModelsDesc")}
                      </p>
                      <div className="flex gap-2">
                        <Input
                          value={newBlockedPattern}
                          onChange={(e) => setNewBlockedPattern(e.target.value)}
                          placeholder="e.g. anthropic/claude-3-opus*"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          disabled={!newBlockedPattern.trim()}
                          onClick={() => {
                            const pat = newBlockedPattern.trim();
                            if (!pat) return;
                            updateState((p) => ({
                              ...p,
                              blockedModels: p.blockedModels.includes(pat)
                                ? p.blockedModels
                                : [...p.blockedModels, pat],
                            }));
                            setNewBlockedPattern("");
                          }}
                        >
                          {t("templateAddBlockedPattern")}
                        </Button>
                      </div>
                      {formState.blockedModels.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {formState.blockedModels.map((pat) => (
                            <span
                              key={pat}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-error/10 border border-error/30 text-error text-xs font-mono"
                            >
                              {pat}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                className="h-4 w-4 p-0 text-error"
                                onClick={() =>
                                  updateState((p) => ({
                                    ...p,
                                    blockedModels: p.blockedModels.filter((m) => m !== pat),
                                  }))
                                }
                                aria-label={t("removeSelection", { name: pat })}
                              >
                                <Icon name="close" size={12} />
                              </Button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Disable Non-Public Models (Restricts BOTH Execution AND Listing) */}
                    <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-warning/30 bg-warning/5">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-medium text-text-main">
                            {t("disableNonPublicModels")}
                          </p>
                          <span className="px-1.5 py-0.5 rounded bg-warning/20 text-warning text-[10px] font-semibold">
                            {t("templateExecAndListingBadge")}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted">{t("disableNonPublicModelsDesc")}</p>
                      </div>
                      <Toggle
                        size="sm"
                        checked={formState.disableNonPublicModels}
                        onChange={() =>
                          updateState((p) => ({
                            ...p,
                            disableNonPublicModels: !p.disableNonPublicModels,
                          }))
                        }
                        ariaLabel={t("disableNonPublicModels")}
                      />
                    </div>

                    {/* Forced Model */}
                    <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-surface/40">
                      <Input
                        label={t("forcedModel")}
                        hint={t("forcedModelDesc")}
                        value={formState.forcedModel}
                        onChange={(e) =>
                          updateState((p) => ({ ...p, forcedModel: e.target.value }))
                        }
                        placeholder={t("forcedModelPlaceholder")}
                      />
                    </div>
                  </div>

                  {/* Clear separation Section 2: /v1/models Catalog Listing Only */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/30">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-text-main">
                        {t("templateCatalogListingHeading")}
                      </p>
                      <span className="px-1.5 py-0.5 rounded bg-surface-2 text-text-muted text-[10px] font-semibold">
                        {t("templateListingOnlyBadge")}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted">{t("templateCatalogListingDesc")}</p>
                    <ApiKeyCatalogScopeSelect
                      value={formState.catalogScope}
                      onChange={(scope) => updateState((p) => ({ ...p, catalogScope: scope }))}
                    />
                  </div>
                </div>
              )}

              {/* ==================== COMBOS TAB ==================== */}
              {activeTab === "combos" && (
                <div className="flex flex-col gap-4">
                  <ApiKeyAutoCombosToggle
                    enabled={formState.allowAutoCombos}
                    onToggle={() =>
                      updateState((p) => ({ ...p, allowAutoCombos: !p.allowAutoCombos }))
                    }
                  />
                  <ApiKeyCcDiscoveryAliasesToggle
                    enabled={formState.allowCcDiscoveryAliases}
                    onToggle={() =>
                      updateState((p) => ({
                        ...p,
                        allowCcDiscoveryAliases: !p.allowCcDiscoveryAliases,
                      }))
                    }
                  />

                  <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-0.5">
                        <p className="text-sm font-medium text-text-main">{t("allowedCombos")}</p>
                        <p className="text-xs text-text-muted">
                          {formState.allowAllCombos
                            ? t("allCombosAllowed")
                            : formState.selectedCombos.length === 0
                              ? t("templateCombosDenyAllBanner")
                              : t("restrictedComboCount", {
                                  count: formState.selectedCombos.length,
                                })}
                        </p>
                      </div>
                      <div className="flex gap-1 p-0.5 bg-surface rounded-md">
                        <Button
                          type="button"
                          size="sm"
                          variant={formState.allowAllCombos ? "primary" : "ghost"}
                          aria-pressed={formState.allowAllCombos}
                          onClick={() => updateState((p) => ({ ...p, allowAllCombos: true }))}
                          className="text-xs"
                        >
                          {t("all")}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant={!formState.allowAllCombos ? "primary" : "ghost"}
                          aria-pressed={!formState.allowAllCombos}
                          onClick={() => updateState((p) => ({ ...p, allowAllCombos: false }))}
                          className="text-xs"
                        >
                          {t("restrict")}
                        </Button>
                      </div>
                    </div>

                    {!formState.allowAllCombos && (
                      <div className="flex flex-col gap-2 pt-2">
                        {allCombos.length > 0 && (
                          <AllowedCombosSection
                            allCombos={allCombos}
                            allowAllCombos={formState.allowAllCombos}
                            selectedCombos={formState.selectedCombos}
                            onAllowAll={(preserved) =>
                              updateState((p) => ({
                                ...p,
                                allowAllCombos: true,
                                selectedCombos: preserved,
                              }))
                            }
                            onRestrict={() => updateState((p) => ({ ...p, allowAllCombos: false }))}
                            onToggleCombo={(comboName) =>
                              updateState((p) => ({
                                ...p,
                                selectedCombos: p.selectedCombos.includes(comboName)
                                  ? p.selectedCombos.filter((c) => c !== comboName)
                                  : [...p.selectedCombos, comboName],
                              }))
                            }
                          />
                        )}
                        {formState.selectedCombos.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {formState.selectedCombos.map((comboName) => (
                              <span
                                key={comboName}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-border text-xs font-mono"
                              >
                                {comboName}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon-sm"
                                  className="h-4 w-4 p-0 text-text-muted hover:text-error"
                                  onClick={() =>
                                    updateState((p) => ({
                                      ...p,
                                      selectedCombos: p.selectedCombos.filter(
                                        (c) => c !== comboName
                                      ),
                                    }))
                                  }
                                  aria-label={t("removeSelection", { name: comboName })}
                                >
                                  <Icon name="close" size={12} />
                                </Button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Auto-Combo Candidate Overrides */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
                    <p className="text-sm font-medium text-text-main">
                      {t("templateAutoCandidateOverridesTitle")}
                    </p>
                    <p className="text-xs text-text-muted">
                      {t("templateAutoCandidateOverridesDesc")}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <Input
                        value={newOverrideChannel}
                        onChange={(e) => setNewOverrideChannel(e.target.value)}
                        placeholder={t("templateAutoChannelPlaceholder")}
                      />
                      <Input
                        value={newOverrideConnId}
                        onChange={(e) => setNewOverrideConnId(e.target.value)}
                        list="policy-editor-conn-options"
                        placeholder={t("templateConnectionIdPlaceholder")}
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        disabled={!newOverrideChannel.trim() || !newOverrideConnId.trim()}
                        onClick={() => {
                          const ch = newOverrideChannel.trim();
                          const cid = newOverrideConnId.trim();
                          if (!ch || !cid) return;
                          updateState((p) => ({
                            ...p,
                            autoCandidateOverrides: [
                              ...p.autoCandidateOverrides.filter(
                                (o) => !(o.autoChannel === ch && o.connectionId === cid)
                              ),
                              { autoChannel: ch, connectionId: cid, excluded: true },
                            ],
                          }));
                          setNewOverrideConnId("");
                        }}
                      >
                        {t("templateAddCandidateOverride")}
                      </Button>
                    </div>
                    <datalist id="policy-editor-conn-options">
                      {allConnections.map((c) => (
                        <option key={c.id} value={c.id} label={c.name || c.id} />
                      ))}
                    </datalist>
                    {formState.autoCandidateOverrides.length > 0 && (
                      <div className="flex flex-col gap-1.5 pt-2">
                        {formState.autoCandidateOverrides.map((ov, idx) => (
                          <div
                            key={`${ov.autoChannel}-${ov.connectionId}-${idx}`}
                            className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded bg-surface border border-border text-xs"
                          >
                            <span className="font-mono">
                              {ov.autoChannel} → {ov.connectionId} (
                              {ov.excluded ? "excluded" : "included"})
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              onClick={() =>
                                updateState((p) => ({
                                  ...p,
                                  autoCandidateOverrides: p.autoCandidateOverrides.filter(
                                    (_, i) => i !== idx
                                  ),
                                }))
                              }
                              aria-label={tc("delete")}
                            >
                              <Icon name="delete" size={14} className="text-error" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ==================== CONNECTIONS TAB ==================== */}
              {activeTab === "connections" && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-text-main">
                          {t("allowedConnections")}
                        </p>
                        <p className="text-xs text-text-muted">
                          {formState.allowAllConnections
                            ? t("allConnectionsDesc")
                            : formState.selectedConnections.length === 0
                              ? t("selectAtLeastOneConnection")
                              : t("restrictedToConnections", {
                                  count: formState.selectedConnections.length,
                                })}
                        </p>
                      </div>
                      <div className="flex gap-1 p-0.5 bg-surface rounded-md">
                        <Button
                          type="button"
                          size="sm"
                          variant={formState.allowAllConnections ? "primary" : "ghost"}
                          aria-pressed={formState.allowAllConnections}
                          onClick={() =>
                            updateState((p) => ({
                              ...p,
                              allowAllConnections: true,
                              selectedConnections: [],
                            }))
                          }
                          className="text-xs"
                        >
                          {t("allConnections")}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant={!formState.allowAllConnections ? "primary" : "ghost"}
                          aria-pressed={!formState.allowAllConnections}
                          onClick={() => updateState((p) => ({ ...p, allowAllConnections: false }))}
                          className="text-xs"
                        >
                          {t("onlySelectedConnections")}
                        </Button>
                      </div>
                    </div>

                    {!formState.allowAllConnections && (
                      <div className="flex flex-col gap-2 pt-2">
                        {formState.selectedConnections.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {formState.selectedConnections.map((connId) => {
                              const conn = allConnections.find((c) => c.id === connId);
                              return (
                                <span
                                  key={connId}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-border text-xs font-mono"
                                >
                                  {conn?.name ? `${conn.name} (${connId.slice(0, 8)})` : connId}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-sm"
                                    className="h-4 w-4 p-0 text-text-muted hover:text-error"
                                    onClick={() =>
                                      updateState((p) => ({
                                        ...p,
                                        selectedConnections: p.selectedConnections.filter(
                                          (id) => id !== connId
                                        ),
                                        selectedPreferredConnections:
                                          p.selectedPreferredConnections.filter(
                                            (id) => id !== connId
                                          ),
                                      }))
                                    }
                                    aria-label={t("removeSelection", { name: connId })}
                                  >
                                    <Icon name="close" size={12} />
                                  </Button>
                                </span>
                              );
                            })}
                          </div>
                        )}
                        <ProviderConnectionPermissionList
                          connections={allConnections}
                          selectedConnections={formState.selectedConnections}
                          onSelectionChange={(nextConns) =>
                            updateState((p) => ({
                              ...p,
                              selectedConnections: nextConns,
                              selectedPreferredConnections: p.selectedPreferredConnections.filter(
                                (id) => nextConns.includes(id)
                              ),
                            }))
                          }
                        />
                      </div>
                    )}
                  </div>

                  <PreferredConnectionsSection
                    connections={allConnections}
                    allowAllConnections={formState.allowAllConnections}
                    selectedConnections={formState.selectedConnections}
                    preferredConnections={formState.selectedPreferredConnections}
                    onTogglePreferred={(connId) =>
                      updateState((p) => ({
                        ...p,
                        selectedPreferredConnections: p.selectedPreferredConnections.includes(
                          connId
                        )
                          ? p.selectedPreferredConnections.filter((id) => id !== connId)
                          : [...p.selectedPreferredConnections, connId],
                      }))
                    }
                    onMovePreferred={(connId, dir) =>
                      updateState((p) => {
                        const list = [...p.selectedPreferredConnections];
                        const idx = list.indexOf(connId);
                        const target = idx + dir;
                        if (idx < 0 || target < 0 || target >= list.length) return p;
                        [list[idx], list[target]] = [list[target], list[idx]];
                        return { ...p, selectedPreferredConnections: list };
                      })
                    }
                    onClearPreferred={() =>
                      updateState((p) => ({ ...p, selectedPreferredConnections: [] }))
                    }
                  />
                </div>
              )}

              {/* ==================== LIMITS TAB ==================== */}
              {activeTab === "limits" && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
                    <Input
                      label={t("maxActiveSessions")}
                      hint={t("maxActiveSessionsDescription")}
                      type="number"
                      min={0}
                      value={String(formState.maxSessions)}
                      onChange={(e) =>
                        updateState((p) => ({
                          ...p,
                          maxSessions: Math.max(0, parseInt(e.target.value) || 0),
                        }))
                      }
                    />
                    <Input
                      label={t("throttleDelay")}
                      hint={t("throttleDelayDescription")}
                      type="number"
                      min={0}
                      max={300000}
                      value={String(formState.throttleDelayMs)}
                      onChange={(e) =>
                        updateState((p) => ({
                          ...p,
                          throttleDelayMs: Math.max(0, parseInt(e.target.value) || 0),
                        }))
                      }
                    />
                    <Input
                      label={t("templateMaxRequestsPerMinute")}
                      type="number"
                      min={0}
                      placeholder={t("never")}
                      value={formState.maxRequestsPerMinute}
                      onChange={(e) =>
                        updateState((p) => ({ ...p, maxRequestsPerMinute: e.target.value }))
                      }
                    />
                    <Input
                      label={t("templateMaxRequestsPerDay")}
                      type="number"
                      min={0}
                      placeholder={t("never")}
                      value={formState.maxRequestsPerDay}
                      onChange={(e) =>
                        updateState((p) => ({ ...p, maxRequestsPerDay: e.target.value }))
                      }
                    />
                  </div>

                  {/* Custom Rate Limits */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-text-main">
                          {t("apiManagerCustomRateLimits")}
                        </p>
                        <p className="text-xs text-text-muted">
                          {t("apiManagerCustomRateLimitsDesc")}
                        </p>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        icon="add"
                        onClick={() =>
                          updateState((p) => ({
                            ...p,
                            rateLimits: [...p.rateLimits, { limit: 100, window: 60 }],
                          }))
                        }
                      >
                        {t("templateAddRateLimit")}
                      </Button>
                    </div>
                    {formState.rateLimits.map((rl, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Input
                          type="number"
                          min={1}
                          value={String(rl.limit)}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            updateState((p) => {
                              const next = [...p.rateLimits];
                              next[idx] = { ...next[idx], limit: val };
                              return { ...p, rateLimits: next };
                            });
                          }}
                          aria-label={t("apiManagerRateLimitRequestsPlaceholder")}
                        />
                        <span className="text-xs text-text-muted">
                          {t("apiManagerRateLimitReqPer")}
                        </span>
                        <Input
                          type="number"
                          min={1}
                          value={String(rl.window)}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            updateState((p) => {
                              const next = [...p.rateLimits];
                              next[idx] = { ...next[idx], window: val };
                              return { ...p, rateLimits: next };
                            });
                          }}
                          aria-label={t("apiManagerRateLimitSecondsPlaceholder")}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() =>
                            updateState((p) => ({
                              ...p,
                              rateLimits: p.rateLimits.filter((_, i) => i !== idx),
                            }))
                          }
                          aria-label={t("apiManagerRemoveLimitTitle")}
                        >
                          <Icon name="delete" size={16} className="text-error" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Access Schedule */}
                  <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-text-main">{t("accessSchedule")}</p>
                        <p className="text-xs text-text-muted">{t("accessScheduleDesc")}</p>
                      </div>
                      <Toggle
                        size="sm"
                        checked={formState.scheduleEnabled}
                        onChange={() =>
                          updateState((p) => ({ ...p, scheduleEnabled: !p.scheduleEnabled }))
                        }
                        ariaLabel={t("accessSchedule")}
                      />
                    </div>
                    {formState.scheduleEnabled && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/50">
                        <Input
                          label={t("scheduleFrom")}
                          type="time"
                          value={formState.scheduleFrom}
                          onChange={(e) =>
                            updateState((p) => ({ ...p, scheduleFrom: e.target.value }))
                          }
                        />
                        <Input
                          label={t("scheduleUntil")}
                          type="time"
                          value={formState.scheduleUntil}
                          onChange={(e) =>
                            updateState((p) => ({ ...p, scheduleUntil: e.target.value }))
                          }
                        />
                        <Input
                          label={t("scheduleTimezone")}
                          type="text"
                          value={formState.scheduleTz}
                          onChange={(e) =>
                            updateState((p) => ({ ...p, scheduleTz: e.target.value }))
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Key USD Usage Limits */}
                  <div className="p-3.5 rounded-lg border border-border bg-surface/40">
                    <UsageLimitSettings
                      enabled={formState.usageLimitEnabled}
                      dailyLimitUsd={formState.dailyUsageLimitUsd}
                      weeklyLimitUsd={formState.weeklyUsageLimitUsd}
                      enabledLabel={tc("enabled")}
                      disabledLabel={tc("disabled")}
                      onEnabledChange={(enabled) =>
                        updateState((p) => ({ ...p, usageLimitEnabled: enabled }))
                      }
                      onDailyLimitUsdChange={(val) =>
                        updateState((p) => ({ ...p, dailyUsageLimitUsd: val }))
                      }
                      onWeeklyLimitUsdChange={(val) =>
                        updateState((p) => ({ ...p, weeklyUsageLimitUsd: val }))
                      }
                    />
                  </div>

                  {/* Related: Domain Budget */}
                  <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-text-main">
                          {t("templateDomainBudgetTitle")}
                        </p>
                        <p className="text-xs text-text-muted">{t("templateDomainBudgetDesc")}</p>
                      </div>
                      <Toggle
                        size="sm"
                        checked={formState.domainBudgetEnabled}
                        onChange={() =>
                          updateState((p) => ({
                            ...p,
                            domainBudgetEnabled: !p.domainBudgetEnabled,
                          }))
                        }
                        ariaLabel={t("templateDomainBudgetTitle")}
                      />
                    </div>
                    {formState.domainBudgetEnabled && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/50">
                        <Input
                          label={t("templateDomainDailyUsd")}
                          type="number"
                          min={0}
                          step="0.01"
                          value={formState.domainDailyLimitUsd}
                          onChange={(e) =>
                            updateState((p) => ({ ...p, domainDailyLimitUsd: e.target.value }))
                          }
                        />
                        <Input
                          label={t("templateDomainWeeklyUsd")}
                          type="number"
                          min={0}
                          step="0.01"
                          value={formState.domainWeeklyLimitUsd}
                          onChange={(e) =>
                            updateState((p) => ({ ...p, domainWeeklyLimitUsd: e.target.value }))
                          }
                        />
                        <Input
                          label={t("templateDomainMonthlyUsd")}
                          type="number"
                          min={0}
                          step="0.01"
                          value={formState.domainMonthlyLimitUsd}
                          onChange={(e) =>
                            updateState((p) => ({ ...p, domainMonthlyLimitUsd: e.target.value }))
                          }
                        />
                        <Input
                          label={t("templateDomainWarningPct")}
                          type="number"
                          min={0}
                          step="any"
                          max={100}
                          value={formState.domainWarningThresholdPct}
                          onChange={(e) =>
                            updateState((p) => ({
                              ...p,
                              domainWarningThresholdPct: e.target.value,
                            }))
                          }
                        />
                        <Select
                          label={t("templateResetInterval")}
                          value={formState.domainResetInterval}
                          onChange={(e) =>
                            updateState((p) => ({
                              ...p,
                              domainResetInterval: e.target.value as KeyTemplateResetInterval,
                            }))
                          }
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </Select>
                        <Input
                          label={t("templateResetTime")}
                          type="time"
                          value={formState.domainResetTime}
                          onChange={(e) =>
                            updateState((p) => ({ ...p, domainResetTime: e.target.value }))
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Related: TPM / RPM / Monthly Quota Limits */}
                  <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-text-main">
                          {t("templateQuotaLimitsTitle")}
                        </p>
                        <p className="text-xs text-text-muted">{t("templateQuotaLimitsDesc")}</p>
                      </div>
                      <Toggle
                        size="sm"
                        checked={formState.quotaLimitsEnabled}
                        onChange={() =>
                          updateState((p) => ({
                            ...p,
                            quotaLimitsEnabled: !p.quotaLimitsEnabled,
                          }))
                        }
                        ariaLabel={t("templateQuotaLimitsTitle")}
                      />
                    </div>
                    {formState.quotaLimitsEnabled && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/50">
                        <Input
                          label={t("tpmLimitLabel")}
                          type="number"
                          min={0}
                          step="any"
                          value={formState.quotaTpmLimit}
                          onChange={(e) =>
                            updateState((p) => ({ ...p, quotaTpmLimit: e.target.value }))
                          }
                        />
                        <Input
                          label={t("rpmLimitLabel")}
                          type="number"
                          min={0}
                          step="any"
                          value={formState.quotaRpmLimit}
                          onChange={(e) =>
                            updateState((p) => ({ ...p, quotaRpmLimit: e.target.value }))
                          }
                        />
                        <Input
                          label={t("monthlyLimitUsdLabel")}
                          type="number"
                          min={0}
                          step="0.01"
                          value={formState.quotaMonthlyUsd}
                          onChange={(e) =>
                            updateState((p) => ({ ...p, quotaMonthlyUsd: e.target.value }))
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Related: Scoped Token Limits */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-text-main">
                          {t("templateTokenLimitsTitle")}
                        </p>
                        <p className="text-xs text-text-muted">{t("templateTokenLimitsDesc")}</p>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        icon="add"
                        onClick={() =>
                          updateState((p) => ({
                            ...p,
                            tokenLimits: [
                              ...p.tokenLimits,
                              {
                                scopeType: "global",
                                scopeValue: "",
                                tokenLimit: 1000000,
                                resetInterval: "monthly",
                                resetTime: "00:00",
                                enabled: true,
                              },
                            ],
                          }))
                        }
                      >
                        {t("templateAddTokenLimit")}
                      </Button>
                    </div>
                    {formState.tokenLimits.map((tl, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-end pt-2 border-t border-border/40"
                      >
                        <Select
                          label={t("templateTokenScopeType")}
                          value={tl.scopeType}
                          onChange={(e) => {
                            const nextScope = e.target.value as KeyTemplateTokenLimit["scopeType"];
                            updateState((p) => {
                              const next = [...p.tokenLimits];
                              next[idx] = {
                                ...next[idx],
                                scopeType: nextScope,
                                scopeValue: nextScope === "global" ? "" : next[idx].scopeValue,
                              };
                              return { ...p, tokenLimits: next };
                            });
                          }}
                        >
                          <option value="global">Global</option>
                          <option value="provider">Provider</option>
                          <option value="model">Model</option>
                        </Select>
                        <Input
                          label={t("templateTokenScopeValue")}
                          disabled={tl.scopeType === "global"}
                          value={tl.scopeValue}
                          onChange={(e) =>
                            updateState((p) => {
                              const next = [...p.tokenLimits];
                              next[idx] = { ...next[idx], scopeValue: e.target.value };
                              return { ...p, tokenLimits: next };
                            })
                          }
                          placeholder={tl.scopeType === "global" ? "All" : "openai"}
                        />
                        <Input
                          label={t("templateTokenMaxTokens")}
                          type="number"
                          min={1}
                          value={String(tl.tokenLimit)}
                          onChange={(e) =>
                            updateState((p) => {
                              const next = [...p.tokenLimits];
                              next[idx] = {
                                ...next[idx],
                                tokenLimit: parseInt(e.target.value) || 0,
                              };
                              return { ...p, tokenLimits: next };
                            })
                          }
                        />
                        <Select
                          label={t("templateResetInterval")}
                          value={tl.resetInterval}
                          onChange={(e) =>
                            updateState((p) => {
                              const next = [...p.tokenLimits];
                              next[idx] = {
                                ...next[idx],
                                resetInterval: e.target.value as KeyTemplateResetInterval,
                              };
                              return { ...p, tokenLimits: next };
                            })
                          }
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </Select>
                        <KeyTemplateTokenLimitTiming
                          limit={tl}
                          onChange={(patch) =>
                            updateState((p) => ({
                              ...p,
                              tokenLimits: p.tokenLimits.map((value, i) =>
                                i === idx ? { ...value, ...patch } : value
                              ),
                            }))
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() =>
                            updateState((p) => ({
                              ...p,
                              tokenLimits: p.tokenLimits.filter((_, i) => i !== idx),
                            }))
                          }
                          aria-label={tc("delete")}
                        >
                          <Icon name="delete" size={16} className="text-error" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Allowed Quota Pools */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
                    <p className="text-sm font-medium text-text-main">
                      {t("templateAllowedQuotaPools")}
                    </p>
                    <p className="text-xs text-text-muted">{t("templateAllowedQuotaPoolsDesc")}</p>
                    {allQuotaPools.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {allQuotaPools.map((pool) => {
                          const selected = formState.allowedQuotas.includes(pool.id);
                          return (
                            <Button
                              key={pool.id}
                              type="button"
                              size="sm"
                              variant={selected ? "primary" : "outline"}
                              aria-pressed={selected}
                              onClick={() =>
                                updateState((p) => ({
                                  ...p,
                                  allowedQuotas: selected
                                    ? p.allowedQuotas.filter((id) => id !== pool.id)
                                    : [...p.allowedQuotas, pool.id],
                                }))
                              }
                              className="text-xs font-mono"
                            >
                              {pool.name || pool.id}
                            </Button>
                          );
                        })}
                      </div>
                    )}
                    {formState.allowedQuotas.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {formState.allowedQuotas.map((poolId) => (
                          <span
                            key={poolId}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-border text-xs font-mono"
                          >
                            {poolId}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              className="h-4 w-4 p-0 text-text-muted hover:text-error"
                              onClick={() =>
                                updateState((p) => ({
                                  ...p,
                                  allowedQuotas: p.allowedQuotas.filter((id) => id !== poolId),
                                }))
                              }
                              aria-label={t("removeSelection", { name: poolId })}
                            >
                              <Icon name="close" size={12} />
                            </Button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ==================== BEHAVIOUR TAB ==================== */}
              {activeTab === "behaviour" && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-text-main">
                        {t("noLogPayloadPrivacy")}
                      </p>
                      <p className="text-xs text-text-muted">{t("templateNoLogDesc")}</p>
                    </div>
                    <Toggle
                      size="sm"
                      checked={formState.noLog}
                      onChange={() => updateState((p) => ({ ...p, noLog: !p.noLog }))}
                      ariaLabel={t("noLogPayloadPrivacy")}
                    />
                  </div>

                  <div className="flex items-start justify-between gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-text-main">{t("autoResolve")}</p>
                      <p className="text-xs text-text-muted">{t("autoResolveDesc")}</p>
                    </div>
                    <Toggle
                      size="sm"
                      checked={formState.autoResolve}
                      onChange={() => updateState((p) => ({ ...p, autoResolve: !p.autoResolve }))}
                      ariaLabel={t("autoResolve")}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
                    <Select
                      label={t("streamDefaultMode")}
                      value={formState.streamDefaultMode}
                      onChange={(e) =>
                        updateState((p) => ({
                          ...p,
                          streamDefaultMode: e.target.value as "legacy" | "json",
                        }))
                      }
                    >
                      <option value="legacy">{t("streamDefaultLegacy")}</option>
                      <option value="json">{t("streamDefaultJson")}</option>
                    </Select>

                    <Select
                      label={t("templateCacheDefaultMode")}
                      value={formState.cacheDefaultMode}
                      onChange={(e) =>
                        updateState((p) => ({
                          ...p,
                          cacheDefaultMode: e.target.value as KeyTemplateCacheDefaultMode,
                        }))
                      }
                    >
                      <option value="legacy">Legacy</option>
                      <option value="bypass">Bypass</option>
                    </Select>

                    <Select
                      label={t("templateCodexServiceMode")}
                      value={formState.codexServiceMode}
                      onChange={(e) =>
                        updateState((p) => ({
                          ...p,
                          codexServiceMode: e.target.value as KeyTemplateCodexServiceMode,
                        }))
                      }
                    >
                      {API_KEY_CODEX_SERVICE_MODES.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <ApiKeyCompressionToggle
                    enabled={formState.compressionEnabled}
                    onToggle={() =>
                      updateState((p) => ({ ...p, compressionEnabled: !p.compressionEnabled }))
                    }
                  />

                  <ChaosModeAccessToggle
                    enabled={formState.chaosModeEnabled}
                    onToggle={() =>
                      updateState((p) => ({ ...p, chaosModeEnabled: !p.chaosModeEnabled }))
                    }
                  />

                  <div className="flex items-start justify-between gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-text-main">{t("localUsageCommand")}</p>
                      <p className="text-xs text-text-muted">{t("localUsageCommandDesc")}</p>
                    </div>
                    <Toggle
                      size="sm"
                      checked={formState.allowUsageCommand}
                      onChange={() =>
                        updateState((p) => ({ ...p, allowUsageCommand: !p.allowUsageCommand }))
                      }
                      ariaLabel={t("localUsageCommand")}
                    />
                  </div>

                  <BypassProviderQuotaToggle
                    enabled={formState.bypassProviderQuotaPolicyEnabled}
                    onToggle={() =>
                      updateState((p) => ({
                        ...p,
                        bypassProviderQuotaPolicyEnabled: !p.bypassProviderQuotaPolicyEnabled,
                      }))
                    }
                  />

                  {/* Related: Key Groups (Shared Group Policy) */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
                    <p className="text-sm font-medium text-text-main">
                      {t("templateKeyGroupsTitle")}
                    </p>
                    <p className="text-xs text-text-muted">{t("templateKeyGroupsDesc")}</p>
                    {allKeyGroups.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {allKeyGroups.map((group) => {
                          const selected = formState.groupIds.includes(group.id);
                          return (
                            <Button
                              key={group.id}
                              type="button"
                              size="sm"
                              variant={selected ? "primary" : "outline"}
                              aria-pressed={selected}
                              onClick={() =>
                                updateState((p) => ({
                                  ...p,
                                  groupIds: selected
                                    ? p.groupIds.filter((id) => id !== group.id)
                                    : [...p.groupIds, group.id],
                                }))
                              }
                              className="text-xs"
                            >
                              {group.name}
                            </Button>
                          );
                        })}
                      </div>
                    )}
                    {formState.groupIds.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {formState.groupIds.map((gid) => {
                          const grp = allKeyGroups.find((g) => g.id === gid);
                          return (
                            <span
                              key={gid}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-info/10 border border-info/30 text-info text-xs font-mono"
                            >
                              {grp?.name ? `${grp.name} (${gid.slice(0, 8)})` : gid}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                className="h-4 w-4 p-0 text-info hover:text-error"
                                onClick={() =>
                                  updateState((p) => ({
                                    ...p,
                                    groupIds: p.groupIds.filter((id) => id !== gid),
                                  }))
                                }
                                aria-label={t("removeSelection", { name: gid })}
                              >
                                <Icon name="close" size={12} />
                              </Button>
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Related: Reasoning Routing Rules */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-text-main">
                          {t("templateReasoningRulesTitle")}
                        </p>
                        <p className="text-xs text-text-muted">{t("templateReasoningRulesDesc")}</p>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        icon="add"
                        onClick={() =>
                          updateState((p) => ({
                            ...p,
                            reasoningRules: [
                              ...p.reasoningRules,
                              {
                                name: `Rule ${p.reasoningRules.length + 1}`,
                                description: "",
                                scope: "apiKey",
                                comboId: null,
                                connectionId: null,
                                modelPattern: null,
                                sourceEffort: "any",
                                requestTags: [],
                                tagMatchMode: "any",
                                effortMode: "default",
                                targetEffort: "medium",
                                targetKind: "keep",
                                targetModel: null,
                                targetComboId: null,
                                budgetAction: "preserve",
                                budgetTokens: null,
                                priority: 0,
                                enabled: true,
                              },
                            ],
                          }))
                        }
                      >
                        {t("templateAddReasoningRule")}
                      </Button>
                    </div>
                    {formState.reasoningRules.map((rule, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col gap-2 p-2.5 rounded border border-border bg-surface/50"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end">
                          <Input
                            label={t("name")}
                            value={rule.name}
                            onChange={(e) =>
                              updateState((p) => {
                                const next = [...p.reasoningRules];
                                next[idx] = { ...next[idx], name: e.target.value };
                                return { ...p, reasoningRules: next };
                              })
                            }
                          />
                          <Select
                            label="Effort Mode"
                            value={rule.effortMode}
                            onChange={(e) =>
                              updateState((p) => {
                                const next = [...p.reasoningRules];
                                const mode = e.target
                                  .value as KeyTemplateReasoningRule["effortMode"];
                                next[idx] = {
                                  ...next[idx],
                                  effortMode: mode,
                                  targetEffort:
                                    mode === "inherit" ? null : next[idx].targetEffort || "medium",
                                };
                                return { ...p, reasoningRules: next };
                              })
                            }
                          >
                            <option value="inherit">Inherit</option>
                            <option value="default">Default</option>
                            <option value="force">Force</option>
                          </Select>
                          <Select
                            label="Target Effort"
                            disabled={rule.effortMode === "inherit"}
                            value={rule.targetEffort ?? "medium"}
                            onChange={(e) =>
                              updateState((p) => {
                                const next = [...p.reasoningRules];
                                next[idx] = {
                                  ...next[idx],
                                  targetEffort: e.target
                                    .value as KeyTemplateReasoningRule["targetEffort"],
                                };
                                return { ...p, reasoningRules: next };
                              })
                            }
                          >
                            <option value="none">none</option>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                            <option value="xhigh">xhigh</option>
                            <option value="max">max</option>
                            <option value="ultra">ultra</option>
                          </Select>
                          <div className="flex items-center justify-end gap-2">
                            <Toggle
                              size="sm"
                              checked={rule.enabled}
                              onChange={() =>
                                updateState((p) => {
                                  const next = [...p.reasoningRules];
                                  next[idx] = { ...next[idx], enabled: !next[idx].enabled };
                                  return { ...p, reasoningRules: next };
                                })
                              }
                              ariaLabel={t("name")}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              onClick={() =>
                                updateState((p) => ({
                                  ...p,
                                  reasoningRules: p.reasoningRules.filter((_, i) => i !== idx),
                                }))
                              }
                              aria-label={tc("delete")}
                            >
                              <Icon name="delete" size={16} className="text-error" />
                            </Button>
                          </div>
                        </div>
                        <KeyTemplateReasoningFields
                          rule={rule}
                          onChange={(patch) =>
                            updateState((p) => ({
                              ...p,
                              reasoningRules: p.reasoningRules.map((value, i) =>
                                i === idx ? { ...value, ...patch } : value
                              ),
                            }))
                          }
                          combos={allCombos.flatMap((combo) =>
                            combo.id ? [{ id: combo.id, label: combo.name }] : []
                          )}
                          connections={allConnections.map((connection) => ({
                            id: connection.id,
                            label: connection.name,
                          }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </fieldset>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
