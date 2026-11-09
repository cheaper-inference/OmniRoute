"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { getProviderDisplayName } from "@/lib/display/names";
import { compareTr, matchesSearch } from "@/shared/utils/turkishText";
import { restoreProviderScopeSelection } from "../apiManagerPageUtils";
import {
  withClaudeCodeDefaultModel,
  type AccessEditorTab,
} from "../[id]/access/useApiKeyAccessForm";
import {
  type ProviderGroup,
  type ProviderPermissionModel as Model,
} from "./ProviderModelPermissionList";
import {
  editorFormStateToPolicy,
  mapReferenceIssueToTab,
  policyToEditorFormState,
  resolveActiveReferenceIssues,
  validatePolicyEditorState,
  type KeyTemplatePolicy,
  type PolicyEditorFormState,
  type TemplateReferenceIssue,
} from "../keyTemplatePolicyUtils";

import { useKeyPolicyCatalog } from "./useKeyPolicyCatalog";
import type { KeyPolicySixTabEditorProps } from "./keyPolicyEditorTypes";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";
import { anchorReferenceIssues, removesLastQuotaRestriction } from "../keyTemplateReferenceIssues";

const EMPTY_ISSUES: readonly TemplateReferenceIssue[] = [];

export function useKeyPolicyEditorModel(props: KeyPolicySixTabEditorProps) {
  const { disabled = false, serverReferenceIssues = EMPTY_ISSUES, onValidationStateChange } = props;
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");
  const [activeTab, setActiveTab] = useState<AccessEditorTab>("general");
  const { formState, commitState, issueSnapshot, editedIssues } = usePolicyDraft(props);
  const { updateState, confirmDialog } = useConfirmedPolicyUpdate(formState, commitState, disabled);
  const {
    allModels,
    modelsLoaded,
    allCombos,
    allConnections,
    allQuotaPools,
    allKeyGroups,
    allProxies,
    catalogSets,
  } = useKeyPolicyCatalog();

  const inputs = usePolicyDraftInputs();

  const {
    permissionModels,
    searchModel,
    setSearchModel,
    filteredModelsByProvider,
    expandedProviders,
    handleToggleExpandProvider,
    selectedProviderScopes,
    selectedExactModels,
    dynamicOrUnlistedModels,
    customModelPattern,
    setCustomModelPattern,
  } = useModelSelection(formState, allModels, t);
  const { activeIssues, tabErrors, tabIssueMap, hasBlockingReferenceIssues } = usePolicyValidation(
    formState,
    issueSnapshot,
    editedIssues,
    serverReferenceIssues,
    catalogSets,
    onValidationStateChange,
    t
  );
  return {
    ...inputs,
    permissionModels,
    t,
    tc,
    activeTab,
    setActiveTab,
    formState,
    updateState,
    allCombos,
    allConnections,
    allQuotaPools,
    allKeyGroups,
    allProxies,
    modelsLoaded,
    searchModel,
    setSearchModel,
    activeIssues,
    tabErrors,
    tabIssueMap,
    hasBlockingReferenceIssues,
    filteredModelsByProvider,
    expandedProviders,
    handleToggleExpandProvider,
    selectedProviderScopes,
    selectedExactModels,
    dynamicOrUnlistedModels,
    customModelPattern,
    setCustomModelPattern,
    disabled,
    confirmDialog,
  };
}

function usePolicyDraft({
  policy,
  formStateOverride,
  onFormStateChange,
  onChange,
  serverReferenceIssues = EMPTY_ISSUES,
}: KeyPolicySixTabEditorProps) {
  const [baselinePolicy, setBaselinePolicy] = useState<KeyTemplatePolicy>(policy);
  const [internalFormState, setFormState] = useState<PolicyEditorFormState>(() =>
    policyToEditorFormState(policy)
  );
  const formState = formStateOverride ?? internalFormState;
  const [issueSnapshot, setIssueSnapshot] = useState(() => ({
    source: serverReferenceIssues,
    issues: anchorReferenceIssues(serverReferenceIssues, policy, formState),
  }));
  const [editedIssues, setEditedIssues] = useState<readonly TemplateReferenceIssue[] | null>(null);
  if (issueSnapshot.source !== serverReferenceIssues) {
    setIssueSnapshot({
      source: serverReferenceIssues,
      issues: anchorReferenceIssues(serverReferenceIssues, policy, formState),
    });
  }

  // Sync when external policy reference changes (e.g., template selection or modal reset)
  const [prevPropPolicy, setPrevPropPolicy] = useState<KeyTemplatePolicy>(policy);
  if (!formStateOverride && policy !== prevPropPolicy) {
    setPrevPropPolicy(policy);
    setBaselinePolicy(policy);
    setFormState(policyToEditorFormState(policy));
  }

  const commitState = useCallback(
    (next: PolicyEditorFormState) => {
      const nextPolicy = editorFormStateToPolicy(next);
      const dirty = JSON.stringify(nextPolicy) !== JSON.stringify(baselinePolicy);
      if (!formStateOverride) setFormState(next);
      setPrevPropPolicy(nextPolicy);
      setEditedIssues(serverReferenceIssues);
      onFormStateChange?.(next);
      onChange?.(nextPolicy, dirty);
    },
    [baselinePolicy, formStateOverride, onFormStateChange, onChange, serverReferenceIssues]
  );
  return { formState, commitState, issueSnapshot, editedIssues };
}

function useConfirmedPolicyUpdate(
  formState: PolicyEditorFormState,
  commitState: (state: PolicyEditorFormState) => void,
  disabled: boolean
) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");
  const { requestConfirm, confirmDialog } = useConfirmDialog();
  const currentForm = useRef(formState);
  useEffect(() => {
    currentForm.current = formState;
  }, [formState]);
  const updateState = useCallback(
    async (updater: (prev: PolicyEditorFormState) => PolicyEditorFormState) => {
      if (disabled) return;
      const next = updater(formState);
      if (removesLastQuotaRestriction(formState, next)) {
        const confirmed = await requestConfirm({
          message: t("templateRemoveLastQuotaConfirm"),
          confirmText: tc("confirm"),
          variant: "warning",
        });
        if (!confirmed || currentForm.current !== formState) return;
      }
      commitState(next);
    },
    [formState, commitState, disabled, requestConfirm, t, tc]
  );

  return { updateState, confirmDialog };
}

function usePolicyValidation(
  formState: PolicyEditorFormState,
  issueSnapshot: ReturnType<typeof usePolicyDraft>["issueSnapshot"],
  editedIssues: readonly TemplateReferenceIssue[] | null,
  serverReferenceIssues: readonly TemplateReferenceIssue[],
  catalogSets: ReturnType<typeof useKeyPolicyCatalog>["catalogSets"],
  onValidationStateChange: KeyPolicySixTabEditorProps["onValidationStateChange"],
  t: (key: string) => string
) {
  const activeIssues = useMemo(
    () =>
      resolveActiveReferenceIssues(
        formState,
        issueSnapshot.issues.filter(
          (issue) => issue.code !== "INVALID_FIELD" || editedIssues !== serverReferenceIssues
        ),
        catalogSets
      ),
    [formState, issueSnapshot, editedIssues, serverReferenceIssues, catalogSets]
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

  return { activeIssues, tabErrors, tabIssueMap, hasBlockingReferenceIssues };
}

function useModelSelection(
  formState: PolicyEditorFormState,
  allModels: Model[],
  t: (key: string) => string
) {
  const [searchModel, setSearchModel] = useState("");
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

  return {
    permissionModels,
    searchModel,
    setSearchModel,
    filteredModelsByProvider,
    expandedProviders,
    handleToggleExpandProvider,
    selectedProviderScopes,
    selectedExactModels,
    dynamicOrUnlistedModels,
    customModelPattern,
    setCustomModelPattern,
  };
}

function usePolicyDraftInputs() {
  const [newBlockedPattern, setNewBlockedPattern] = useState("");
  const [newIpCidr, setNewIpCidr] = useState("");
  const [newExtraScope, setNewExtraScope] = useState("");
  const [newOverrideChannel, setNewOverrideChannel] = useState("auto");
  const [newOverrideConnId, setNewOverrideConnId] = useState("");
  return {
    newBlockedPattern,
    setNewBlockedPattern,
    newIpCidr,
    setNewIpCidr,
    newExtraScope,
    setNewExtraScope,
    newOverrideChannel,
    setNewOverrideChannel,
    newOverrideConnId,
    setNewOverrideConnId,
  };
}
