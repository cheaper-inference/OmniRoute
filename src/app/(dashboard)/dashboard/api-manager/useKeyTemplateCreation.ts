"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";
import { useTranslations } from "next-intl";
import {
  createDefaultPolicyEditorFormState,
  editorFormStateToPolicy,
  policyToEditorFormState,
  resolveActiveReferenceIssues,
  validatePolicyEditorState,
  type KeyTemplate,
  type PolicyEditorFormState,
  type TemplateReferenceIssue,
} from "./keyTemplatePolicyUtils";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";
import type { UnreadableKeyTemplate } from "@/shared/types/keyTemplates";
import { anchorReferenceIssues, clearFieldValidationIssues } from "./keyTemplateReferenceIssues";

export function useKeyTemplateCreation() {
  const t = useTranslations("apiManager");
  const { requestConfirm, confirmDialog: templateConfirmDialog } = useConfirmDialog();
  const draft = useCreatePolicyDraft();
  const library = useTemplateLibraryList();
  const applyTemplateToCreateModal = useApplyTemplateToDraft(draft);
  const { selectedTemplateId, isCreatePolicyDirty } = draft;
  const handleSelectTemplateInCreateModal = async (nextTemplateId: string) => {
    if (nextTemplateId === selectedTemplateId) return;
    if (isCreatePolicyDirty) {
      const confirmed = await requestConfirm({
        title: t("switchTemplateConfirmTitle"),
        message: t("switchTemplateConfirmMessage"),
        confirmText: t("switchTemplateConfirmAction"),
        variant: "warning",
      });
      if (!confirmed) return;
    }
    await applyTemplateToCreateModal(nextTemplateId);
  };

  return {
    ...draft,
    ...library,
    applyTemplateToCreateModal,
    handleSelectTemplateInCreateModal,
    templateConfirmDialog,
  };
}

function useTemplateLibraryList() {
  const t = useTranslations("apiManager");
  const [templates, setTemplates] = useState<KeyTemplate[]>([]);
  const [unreadableTemplates, setUnreadableTemplates] = useState<UnreadableKeyTemplate[]>([]);
  const [templatesError, setTemplatesError] = useState<string | null>(null);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const fetchTemplates = async () => {
    setTemplatesLoading(true);
    try {
      const res = await fetch("/api/key-templates");
      const data = await res.json();
      if (!res.ok) throw new Error(extractApiErrorMessage(data, t("templateListFailed")));
      setTemplates(Array.isArray(data?.templates) ? data.templates : []);
      setUnreadableTemplates(Array.isArray(data?.unreadable) ? data.unreadable : []);
      setTemplatesError(null);
    } catch {
      setTemplatesError(t("templateListFailed"));
    } finally {
      setTemplatesLoading(false);
    }
  };

  return { templates, unreadableTemplates, templatesError, templatesLoading, fetchTemplates };
}

function useCreatePolicyValidation(
  createKeyFormState: PolicyEditorFormState,
  createKeyBaselineFormJson: string,
  createKeyRefIssues: TemplateReferenceIssue[],
  editorBlockingRefs: boolean | null
) {
  const t = useTranslations("apiManager");
  const draftCreatePolicy = useMemo(
    () => editorFormStateToPolicy(createKeyFormState),
    [createKeyFormState]
  );

  const isCreatePolicyDirty = useMemo(
    () => JSON.stringify(createKeyFormState) !== createKeyBaselineFormJson,
    [createKeyFormState, createKeyBaselineFormJson]
  );

  const createPolicyErrors = useMemo(
    () => validatePolicyEditorState(createKeyFormState, t),
    [createKeyFormState, t]
  );
  const hasCreatePolicyErrors = useMemo(
    () => Object.values(createPolicyErrors).some((list) => list.length > 0),
    [createPolicyErrors]
  );

  const activeCreateRefIssues = useMemo(
    () => resolveActiveReferenceIssues(createKeyFormState, createKeyRefIssues),
    [createKeyFormState, createKeyRefIssues]
  );
  const hasBlockingCreateRefIssues = useMemo(
    () => editorBlockingRefs ?? activeCreateRefIssues.some((issue) => issue.blocking),
    [activeCreateRefIssues, editorBlockingRefs]
  );

  return {
    draftCreatePolicy,
    isCreatePolicyDirty,
    createPolicyErrors,
    hasCreatePolicyErrors,
    hasBlockingCreateRefIssues,
  };
}

function useCreateDraftValues() {
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyManageEnabled, setNewKeyManageEnabled] = useState(false);
  const [newKeySelfUsageEnabled, setNewKeySelfUsageEnabled] = useState(true);
  const [newKeyAccountQuotaEnabled, setNewKeyAccountQuotaEnabled] = useState(false);
  const [newKeyAllowUsageCommand, setNewKeyAllowUsageCommand] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [selectedTemplateRef, setSelectedTemplateRef] = useState<{
    id: string;
    revision: number;
  } | null>(null);
  const [createKeyFormState, setRawCreateKeyFormState] = useState<PolicyEditorFormState>(() =>
    createDefaultPolicyEditorFormState()
  );
  const [createKeyBaselineFormJson, setCreateKeyBaselineFormJson] = useState<string>(() =>
    JSON.stringify(createDefaultPolicyEditorFormState())
  );
  const [createKeyRefIssues, setCreateKeyRefIssues] = useState<TemplateReferenceIssue[]>([]);
  const [loadingTemplatePolicy, setLoadingTemplatePolicy] = useState(false);
  const templateLoadGenerationRef = useRef(0);
  const [editorBlockingRefs, setEditorBlockingRefs] = useState<boolean | null>(null);
  const handleEditorValidation = useCallback((state: { hasBlockingReferenceIssues: boolean }) => {
    setEditorBlockingRefs(state.hasBlockingReferenceIssues);
  }, []);
  const [showFullPolicyEditor, setShowFullPolicyEditor] = useState(false);
  const setCreateKeyFormState = useCallback(
    (
      update: PolicyEditorFormState | ((previous: PolicyEditorFormState) => PolicyEditorFormState)
    ) => {
      setRawCreateKeyFormState(update);
      setCreateKeyRefIssues(clearFieldValidationIssues);
    },
    []
  );

  return {
    newKeyName,
    setNewKeyName,
    newKeyManageEnabled,
    setNewKeyManageEnabled,
    newKeySelfUsageEnabled,
    setNewKeySelfUsageEnabled,
    newKeyAccountQuotaEnabled,
    setNewKeyAccountQuotaEnabled,
    newKeyAllowUsageCommand,
    setNewKeyAllowUsageCommand,
    nameError,
    setNameError,
    createError,
    setCreateError,
    selectedTemplateId,
    setSelectedTemplateId,
    selectedTemplateRef,
    setSelectedTemplateRef,
    createKeyFormState,
    setCreateKeyFormState,
    createKeyBaselineFormJson,
    setCreateKeyBaselineFormJson,
    createKeyRefIssues,
    setCreateKeyRefIssues,
    loadingTemplatePolicy,
    setLoadingTemplatePolicy,
    editorBlockingRefs,
    setEditorBlockingRefs,
    showFullPolicyEditor,
    setShowFullPolicyEditor,
    templateLoadGenerationRef,
    handleEditorValidation,
  };
}

function useCreatePolicyDraft() {
  const values = useCreateDraftValues();
  const {
    setNewKeyName,
    setNewKeyManageEnabled,
    setNewKeySelfUsageEnabled,
    setNewKeyAccountQuotaEnabled,
    setNewKeyAllowUsageCommand,
    setNameError,
    setCreateError,
    setSelectedTemplateId,
    setSelectedTemplateRef,
    createKeyFormState,
    setCreateKeyFormState,
    createKeyBaselineFormJson,
    setCreateKeyBaselineFormJson,
    createKeyRefIssues,
    setCreateKeyRefIssues,
    setLoadingTemplatePolicy,
    editorBlockingRefs,
    setEditorBlockingRefs,
    setShowFullPolicyEditor,
    templateLoadGenerationRef,
  } = values;
  const syncCreateKeyFormState = useCallback(
    (nextFormState: PolicyEditorFormState) => {
      setCreateKeyRefIssues(clearFieldValidationIssues);
      setCreateKeyFormState(nextFormState);
      setNewKeyManageEnabled(nextFormState.manageEnabled);
      setNewKeySelfUsageEnabled(nextFormState.selfUsageEnabled);
      setNewKeyAccountQuotaEnabled(nextFormState.selfAccountQuotaEnabled);
      setNewKeyAllowUsageCommand(nextFormState.allowUsageCommand);
    },
    [
      setCreateKeyFormState,
      setCreateKeyRefIssues,
      setNewKeyAccountQuotaEnabled,
      setNewKeyAllowUsageCommand,
      setNewKeyManageEnabled,
      setNewKeySelfUsageEnabled,
    ]
  );

  const resetCreateKeyModalState = useCallback(() => {
    templateLoadGenerationRef.current++;
    setEditorBlockingRefs(null);
    const defaultForm = createDefaultPolicyEditorFormState();
    setNewKeyName("");
    syncCreateKeyFormState(defaultForm);
    setCreateKeyBaselineFormJson(JSON.stringify(defaultForm));
    setSelectedTemplateId("");
    setSelectedTemplateRef(null);
    setCreateKeyRefIssues([]);
    setLoadingTemplatePolicy(false);
    setShowFullPolicyEditor(false);
    setNameError(null);
    setCreateError(null);
  }, [
    syncCreateKeyFormState,
    setCreateError,
    setCreateKeyBaselineFormJson,
    setCreateKeyRefIssues,
    setEditorBlockingRefs,
    setLoadingTemplatePolicy,
    setNameError,
    setNewKeyName,
    setSelectedTemplateId,
    setSelectedTemplateRef,
    setShowFullPolicyEditor,
    templateLoadGenerationRef,
  ]);

  const validation = useCreatePolicyValidation(
    createKeyFormState,
    createKeyBaselineFormJson,
    createKeyRefIssues,
    editorBlockingRefs
  );
  return { ...values, syncCreateKeyFormState, resetCreateKeyModalState, ...validation };
}

type CreatePolicyDraft = ReturnType<typeof useCreatePolicyDraft>;

function useApplyTemplateToDraft(draft: CreatePolicyDraft) {
  const t = useTranslations("apiManager");
  const {
    setCreateError,
    setSelectedTemplateId,
    setSelectedTemplateRef,
    setCreateKeyBaselineFormJson,
    setCreateKeyRefIssues,
    setLoadingTemplatePolicy,
    setEditorBlockingRefs,
    setShowFullPolicyEditor,
    templateLoadGenerationRef,
    syncCreateKeyFormState,
  } = draft;
  return async (templateId: string) => {
    const generation = ++templateLoadGenerationRef.current;
    setEditorBlockingRefs(null);
    if (!templateId) {
      setLoadingTemplatePolicy(false);
      const defaultForm = createDefaultPolicyEditorFormState();
      syncCreateKeyFormState(defaultForm);
      setCreateKeyBaselineFormJson(JSON.stringify(defaultForm));
      setSelectedTemplateId("");
      setSelectedTemplateRef(null);
      setCreateKeyRefIssues([]);
      return;
    }

    setLoadingTemplatePolicy(true);
    setCreateError(null);
    try {
      const res = await fetch(`/api/key-templates/${encodeURIComponent(templateId)}`);
      const data = await res.json();
      if (generation !== templateLoadGenerationRef.current) return;
      if (res.ok && data?.template?.policy) {
        const tpl = data.template as KeyTemplate;
        const refIssues: TemplateReferenceIssue[] = Array.isArray(data.referenceIssues)
          ? data.referenceIssues
          : [];
        const nextForm = policyToEditorFormState(tpl.policy);
        syncCreateKeyFormState(nextForm);
        setCreateKeyBaselineFormJson(JSON.stringify(nextForm));
        setSelectedTemplateId(tpl.id);
        setSelectedTemplateRef({ id: tpl.id, revision: tpl.revision });
        setCreateKeyRefIssues(anchorReferenceIssues(refIssues, tpl.policy));
        if (refIssues.length > 0) {
          setShowFullPolicyEditor(true);
        }
        return;
      }
      setCreateError(extractApiErrorMessage(data, t("failedLoadTemplateDetail")));
    } catch {
      if (generation !== templateLoadGenerationRef.current) return;
      setCreateError(t("failedLoadTemplateDetail"));
    } finally {
      if (generation === templateLoadGenerationRef.current) setLoadingTemplatePolicy(false);
    }
  };
}
