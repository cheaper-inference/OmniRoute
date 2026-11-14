"use client";

import { useState, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import Modal from "@/shared/components/Modal";
import { Spinner } from "@/shared/components/Loading";
import type { UnreadableKeyTemplate } from "@/shared/types/keyTemplates";
import { anchorReferenceIssues, clearFieldValidationIssues } from "../keyTemplateReferenceIssues";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";
import KeyPolicySixTabEditor from "./KeyPolicySixTabEditor";
import {
  createDefaultClientKeyTemplatePolicy,
  summarizeKeyTemplatePolicy,
  validateKeyName,
  type KeyTemplate,
  type KeyTemplatePolicy,
  type PolicyEditorFormState,
  type TemplateReferenceIssue,
} from "../keyTemplatePolicyUtils";

export interface KeyTemplatesLibrarySectionProps {
  templates: KeyTemplate[];
  unreadable?: UnreadableKeyTemplate[];
  loadError?: string | null;
  loading?: boolean;
  onRefreshTemplates: () => Promise<void> | void;
  onUseTemplate: (template: KeyTemplate) => void;
}

function useLibraryDraft() {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");
  const { requestConfirm, confirmDialog } = useConfirmDialog();

  const [editorMode, setEditorMode] = useState<"create" | "edit" | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<KeyTemplate | null>(null);
  const [templateName, setTemplateName] = useState("");
  const [templateDesc, setTemplateDesc] = useState("");
  const [draftPolicy, setDraftPolicy] = useState<KeyTemplatePolicy>(() =>
    createDefaultClientKeyTemplatePolicy()
  );
  const [draftFormState, setDraftFormState] = useState<PolicyEditorFormState | undefined>(
    undefined
  );
  const [serverRefIssues, setServerRefIssues] = useState<TemplateReferenceIssue[]>([]);
  const [hasEditorErrors, setHasEditorErrors] = useState(false);
  const [hasBlockingRefs, setHasBlockingRefs] = useState(false);
  const [loadingTemplateDetail, setLoadingTemplateDetail] = useState(false);
  const loadGenerationRef = useRef(0);
  const [modalError, setModalError] = useState<string | null>(null);
  const [sectionError, setSectionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requiresReload, setRequiresReload] = useState(false);

  return {
    editorMode,
    setEditorMode,
    editingTemplate,
    setEditingTemplate,
    templateName,
    setTemplateName,
    templateDesc,
    setTemplateDesc,
    draftPolicy,
    setDraftPolicy,
    draftFormState,
    setDraftFormState,
    serverRefIssues,
    setServerRefIssues,
    hasEditorErrors,
    setHasEditorErrors,
    hasBlockingRefs,
    setHasBlockingRefs,
    loadingTemplateDetail,
    setLoadingTemplateDetail,
    modalError,
    setModalError,
    sectionError,
    setSectionError,
    isSubmitting,
    setIsSubmitting,
    requiresReload,
    setRequiresReload,
    t,
    tc,
    requestConfirm,
    confirmDialog,
    loadGenerationRef,
  };
}

type LibraryDraft = ReturnType<typeof useLibraryDraft>;

function useLibraryCreate(state: LibraryDraft) {
  const {
    setEditorMode,
    setEditingTemplate,
    setTemplateName,
    setTemplateDesc,
    setDraftPolicy,
    setDraftFormState,
    setServerRefIssues,
    setLoadingTemplateDetail,
    setModalError,
    setRequiresReload,
    loadGenerationRef,
  } = state;
  const openCreateModal = useCallback(() => {
    loadGenerationRef.current++;
    setLoadingTemplateDetail(false);
    setEditorMode("create");
    setEditingTemplate(null);
    setTemplateName("");
    setTemplateDesc("");
    setDraftPolicy(createDefaultClientKeyTemplatePolicy());
    setDraftFormState(undefined);
    setServerRefIssues([]);
    setModalError(null);
    setRequiresReload(false);
  }, [
    loadGenerationRef,
    setDraftPolicy,
    setDraftFormState,
    setEditingTemplate,
    setEditorMode,
    setLoadingTemplateDetail,
    setModalError,
    setRequiresReload,
    setServerRefIssues,
    setTemplateDesc,
    setTemplateName,
  ]);

  return openCreateModal;
}

function useLibraryEdit(state: LibraryDraft) {
  const {
    setEditorMode,
    setEditingTemplate,
    setTemplateName,
    setTemplateDesc,
    setDraftPolicy,
    setDraftFormState,
    setServerRefIssues,
    setLoadingTemplateDetail,
    setModalError,
    setRequiresReload,
    t,
    loadGenerationRef,
  } = state;
  const openEditModal = useCallback(
    async (tpl: KeyTemplate) => {
      const generation = ++loadGenerationRef.current;
      setEditorMode("edit");
      setEditingTemplate(tpl);
      setTemplateName(tpl.name);
      setTemplateDesc(tpl.description || "");
      setDraftPolicy(tpl.policy);
      setDraftFormState(undefined);
      setServerRefIssues([]);
      setModalError(null);
      setLoadingTemplateDetail(true);
      setRequiresReload(false);

      try {
        const res = await fetch(`/api/key-templates/${encodeURIComponent(tpl.id)}`);
        const data = await res.json();
        if (generation !== loadGenerationRef.current) return;
        if (res.ok) {
          if (data.template) {
            setEditingTemplate(data.template);
            setTemplateName(data.template.name);
            setTemplateDesc(data.template.description || "");
            setDraftPolicy(data.template.policy);
          }
          setServerRefIssues(
            anchorReferenceIssues(
              Array.isArray(data.referenceIssues) ? data.referenceIssues : [],
              data.template?.policy ?? tpl.policy
            )
          );
        } else {
          setRequiresReload(true);
          setModalError(extractApiErrorMessage(data, t("failedLoadTemplateDetail")));
        }
      } catch {
        if (generation !== loadGenerationRef.current) return;
        setRequiresReload(true);
        setModalError(t("failedLoadTemplateDetail"));
      } finally {
        if (generation === loadGenerationRef.current) setLoadingTemplateDetail(false);
      }
    },
    [
      t,
      loadGenerationRef,
      setDraftPolicy,
      setDraftFormState,
      setEditingTemplate,
      setEditorMode,
      setLoadingTemplateDetail,
      setModalError,
      setRequiresReload,
      setServerRefIssues,
      setTemplateDesc,
      setTemplateName,
    ]
  );

  return openEditModal;
}

function useLibraryEditing(state: LibraryDraft) {
  const openCreateModal = useLibraryCreate(state);
  const openEditModal = useLibraryEdit(state);
  const {
    setEditorMode,
    setEditingTemplate,
    setLoadingTemplateDetail,
    setModalError,
    isSubmitting,
    loadGenerationRef,
  } = state;
  const closeEditorModal = useCallback(() => {
    if (isSubmitting) return;
    loadGenerationRef.current++;
    setLoadingTemplateDetail(false);
    setEditorMode(null);
    setEditingTemplate(null);
    setModalError(null);
  }, [
    isSubmitting,
    loadGenerationRef,
    setEditingTemplate,
    setEditorMode,
    setLoadingTemplateDetail,
    setModalError,
  ]);

  return { openCreateModal, openEditModal, closeEditorModal };
}

function submitTemplateDraft({
  editorMode,
  editingTemplate,
  templateName,
  templateDesc,
  draftPolicy,
}: LibraryDraft) {
  const editing = editorMode === "edit" && editingTemplate;
  return fetch(
    editing ? `/api/key-templates/${encodeURIComponent(editing.id)}` : "/api/key-templates",
    {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(editing ? { revision: editing.revision } : {}),
        name: templateName.trim(),
        description: templateDesc.trim(),
        policy: draftPolicy,
      }),
    }
  );
}

function useSaveTemplate(
  state: LibraryDraft,
  { onRefreshTemplates }: KeyTemplatesLibrarySectionProps
) {
  const {
    setEditorMode,
    setEditingTemplate,
    templateName,
    draftPolicy,
    setServerRefIssues,
    hasEditorErrors,
    hasBlockingRefs,
    loadingTemplateDetail,
    setModalError,
    isSubmitting,
    setIsSubmitting,
    requiresReload,
    setRequiresReload,
    t,
  } = state;
  const unavailable = isSubmitting || loadingTemplateDetail || requiresReload;
  const invalid = hasEditorErrors || hasBlockingRefs;
  const handleSaveTemplate = async () => {
    if (unavailable || invalid) return;
    const nameVal = validateKeyName(templateName, t);
    if (!nameVal.valid) {
      setModalError(nameVal.error || t("invalidKeyName"));
      return;
    }

    setIsSubmitting(true);
    setModalError(null);

    try {
      const res = await submitTemplateDraft(state);
      const data = await res.json();
      if (res.status === 409 && data.code === "REVISION_CONFLICT") {
        setRequiresReload(true);
        setModalError(t("templateRevisionConflictError"));
        return;
      }
      if (res.status === 409 && data.code === "TEMPLATE_NAME_CONFLICT") {
        setModalError(t("templateNameConflictError"));
        return;
      }
      if (!res.ok) {
        if (Array.isArray(data?.issues))
          setServerRefIssues(anchorReferenceIssues(data.issues, draftPolicy, state.draftFormState));
        setModalError(extractApiErrorMessage(data, t("templateSaveFailed")));
        return;
      }
      await onRefreshTemplates();
      setEditorMode(null);
      setEditingTemplate(null);
    } catch {
      setModalError(t("templateSaveFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return handleSaveTemplate;
}

function useDeleteTemplate(
  state: LibraryDraft,
  { onRefreshTemplates }: KeyTemplatesLibrarySectionProps
) {
  const { setSectionError, t, tc, requestConfirm } = state;
  const handleDeleteTemplate = async (tpl: Pick<KeyTemplate, "id" | "name">) => {
    if (
      !(await requestConfirm({
        message: t("templateDeleteConfirm", { name: tpl.name }),
        confirmText: tc("delete"),
      }))
    ) {
      return;
    }
    setSectionError(null);
    try {
      const res = await fetch(`/api/key-templates/${encodeURIComponent(tpl.id)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        setSectionError(extractApiErrorMessage(data, t("templateDeleteFailed")));
        return;
      }
      await onRefreshTemplates();
    } catch {
      setSectionError(t("templateDeleteFailed"));
    }
  };

  return handleDeleteTemplate;
}

function useLibraryModel(props: KeyTemplatesLibrarySectionProps) {
  const draft = useLibraryDraft();
  const editing = useLibraryEditing(draft);
  const handleSaveTemplate = useSaveTemplate(draft, props);
  const handleDeleteTemplate = useDeleteTemplate(draft, props);
  return {
    ...props,
    unreadable: props.unreadable ?? [],
    loadError: props.loadError ?? null,
    loading: props.loading ?? false,
    ...draft,
    ...editing,
    handleSaveTemplate,
    handleDeleteTemplate,
  };
}

type LibraryModel = ReturnType<typeof useLibraryModel>;

export default function KeyTemplatesLibrarySection(props: KeyTemplatesLibrarySectionProps) {
  const model = useLibraryModel(props);
  const { templates, unreadable, loadError, loading, t, openCreateModal, confirmDialog } = model;
  return (
    <Card data-testid="key-templates-library">
      <TemplateLibraryHeader model={model} />

      <TemplateLibraryStatus model={model} />
      {templates.length === 0 && unreadable.length === 0 && !loadError && !loading ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg border border-dashed border-border bg-surface/20">
          <div className="flex items-center gap-3">
            <Icon name="inventory_2" size={24} className="text-text-muted shrink-0" />
            <div>
              <p className="text-sm font-medium text-text-main">{t("noTemplatesYet")}</p>
              <p className="text-xs text-text-muted">{t("noTemplatesYetDesc")}</p>
            </div>
          </div>
          <Button size="sm" variant="outline" icon="add" onClick={openCreateModal}>
            {t("newTemplateAction")}
          </Button>
        </div>
      ) : (
        <TemplateCards model={model} />
      )}

      {/* Create / Edit Template Modal */}
      <TemplateEditorModal model={model} />
      {confirmDialog}
    </Card>
  );
}

function TemplateCardActions({ model, tpl }: { model: LibraryModel; tpl: KeyTemplate }) {
  const { t, onUseTemplate, openEditModal, handleDeleteTemplate } = model;
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-text-main truncate">{tpl.name}</h4>
          <span className="px-1.5 py-0.5 rounded bg-surface-2 text-text-muted text-[10px] font-mono shrink-0">
            v{tpl.revision}
          </span>
        </div>
        {tpl.description && (
          <p className="text-xs text-text-muted line-clamp-2 mt-0.5">{tpl.description}</p>
        )}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <Button
          type="button"
          size="sm"
          variant="primary"
          icon="vpn_key"
          onClick={() => onUseTemplate(tpl)}
          aria-label={`${t("useTemplateAction")} ${tpl.name}`}
        >
          {t("useTemplateAction")}
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          icon="edit"
          title={t("editTemplateAction")}
          aria-label={`${t("editTemplateAction")} ${tpl.name}`}
          onClick={() => openEditModal(tpl)}
        />
        <Button
          type="button"
          size="icon-sm"
          variant="destructive-ghost"
          icon="delete"
          title={t("deleteTemplateAction")}
          aria-label={`${t("deleteTemplateAction")} ${tpl.name}`}
          onClick={() => handleDeleteTemplate(tpl)}
        />
      </div>
    </div>
  );
}

function TemplateCards({ model }: { model: LibraryModel }) {
  const { t, templates } = model;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {templates.map((tpl) => {
        const badges = summarizeKeyTemplatePolicy(tpl.policy, t);
        return (
          <div
            key={tpl.id}
            data-testid={`template-card-${tpl.id}`}
            className="flex flex-col justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40 hover:border-border/80 transition-colors"
          >
            <div className="flex flex-col gap-2">
              <TemplateCardActions model={model} tpl={tpl} />

              <div className="flex flex-wrap gap-1.5 pt-1">
                {badges.map((b) => (
                  <span
                    key={b.id}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium ${
                      b.tone === "success"
                        ? "bg-success/10 text-success"
                        : b.tone === "warning"
                          ? "bg-warning/10 text-warning"
                          : b.tone === "error"
                            ? "bg-error/10 text-error"
                            : b.tone === "info"
                              ? "bg-info/10 text-info"
                              : "bg-surface-2 text-text-muted"
                    }`}
                  >
                    <Icon name={b.icon} size={12} />
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TemplateEditorActions({ model }: { model: LibraryModel }) {
  const {
    editorMode,
    templateName,
    hasEditorErrors,
    hasBlockingRefs,
    loadingTemplateDetail,
    isSubmitting,
    requiresReload,
    t,
    tc,
    closeEditorModal,
    handleSaveTemplate,
  } = model;
  return (
    <div className="flex gap-2 pt-2">
      <Button
        type="button"
        variant="ghost"
        fullWidth
        onClick={closeEditorModal}
        disabled={isSubmitting}
      >
        {tc("cancel")}
      </Button>
      <Button
        type="button"
        fullWidth
        loading={isSubmitting}
        disabled={
          isSubmitting ||
          loadingTemplateDetail ||
          requiresReload ||
          !templateName.trim() ||
          hasEditorErrors ||
          hasBlockingRefs
        }
        onClick={handleSaveTemplate}
      >
        {editorMode === "edit" ? t("saveChanges") : t("newTemplateAction")}
      </Button>
    </div>
  );
}

function TemplateIdentityFields({ model }: { model: LibraryModel }) {
  const {
    templateName,
    setTemplateName,
    templateDesc,
    setTemplateDesc,
    loadingTemplateDetail,
    setModalError,
    setServerRefIssues,
    isSubmitting,
    t,
  } = model;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Input
        label={t("templateNameLabel")}
        value={templateName}
        onChange={(e) => {
          setTemplateName(e.target.value);
          setModalError(null);
          setServerRefIssues(clearFieldValidationIssues);
        }}
        placeholder={t("templateNamePlaceholder")}
        maxLength={200}
        disabled={isSubmitting || loadingTemplateDetail}
      />
      <Input
        label={t("templateDescriptionLabel")}
        value={templateDesc}
        onChange={(e) => {
          setTemplateDesc(e.target.value);
          setServerRefIssues(clearFieldValidationIssues);
        }}
        placeholder={t("templateDescriptionPlaceholder")}
        maxLength={500}
        disabled={isSubmitting || loadingTemplateDetail}
      />
    </div>
  );
}

function TemplateEditorModal({ model }: { model: LibraryModel }) {
  const {
    editorMode,
    editingTemplate,
    loadingTemplateDetail,
    modalError,
    setModalError,
    isSubmitting,
    requiresReload,
    t,
    tc,
    openEditModal,
    closeEditorModal,
  } = model;
  return (
    <Modal
      isOpen={editorMode !== null}
      title={
        editorMode === "edit"
          ? t("editTemplateModalTitle", { name: editingTemplate?.name ?? "" })
          : t("newTemplateModalTitle")
      }
      maxWidth="max-w-4xl"
      bodyClassName="p-6 max-h-[calc(100vh-120px)] overflow-y-auto"
      onClose={closeEditorModal}
    >
      <div className="flex flex-col gap-4" data-testid="template-editor-modal">
        <TemplateIdentityFields model={model} />

        {loadingTemplateDetail && (
          <div className="text-xs text-text-muted flex items-center gap-2" role="status">
            <Spinner size="sm" />
            <span>{tc("loading")}</span>
          </div>
        )}

        <TemplatePolicyEditor model={model} />

        {modalError && (
          <Alert
            variant="critical"
            icon={<Icon name="error" />}
            description={modalError}
            dismissLabel={tc("close")}
            onDismiss={() => setModalError(null)}
          />
        )}
        {requiresReload && editingTemplate && (
          <Button
            variant="outline"
            disabled={loadingTemplateDetail || isSubmitting}
            onClick={() => openEditModal(editingTemplate)}
          >
            {t("templateReloadAction")}
          </Button>
        )}

        <TemplateEditorActions model={model} />
      </div>
    </Modal>
  );
}

function TemplateLibraryHeader({ model }: { model: LibraryModel }) {
  const { t, templates, unreadable, openCreateModal } = model;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 shrink-0">
          <Icon name="layers" className="text-xl text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">
            {t("keyTemplatesTitle")}
            <span className="ml-1.5 text-sm font-normal text-text-muted">
              ({templates.length + unreadable.length})
            </span>
          </h3>
          <p className="text-xs text-text-muted">{t("keyTemplatesDesc")}</p>
        </div>
      </div>
      <Button icon="add" variant="secondary" onClick={openCreateModal}>
        {t("newTemplateAction")}
      </Button>
    </div>
  );
}

function TemplateLibraryStatus({ model }: { model: LibraryModel }) {
  const {
    sectionError,
    setSectionError,
    t,
    tc,
    unreadable,
    loadError,
    loading,
    onRefreshTemplates,
    handleDeleteTemplate,
  } = model;
  return (
    <>
      {sectionError && (
        <div className="mb-4">
          <Alert
            variant="critical"
            icon={<Icon name="error" />}
            description={sectionError}
            dismissLabel={tc("close")}
            onDismiss={() => setSectionError(null)}
          />
        </div>
      )}

      {loadError && <Alert variant="critical" description={loadError} />}
      {loading && <Spinner size="sm" />}
      {loadError && (
        <Button variant="outline" onClick={onRefreshTemplates}>
          {tc("retry")}
        </Button>
      )}
      {unreadable.map((template) => (
        <div
          key={template.id}
          data-testid={`unreadable-template-${template.id}`}
          className="flex items-center justify-between gap-3 rounded-lg border border-error/30 p-4 mb-3"
        >
          <div>
            <p className="font-semibold">{template.name}</p>
            <p className="text-xs text-error">
              {t("templateUnreadableStatus")} ({template.code})
            </p>
          </div>
          <Button
            icon="delete"
            variant="outline"
            onClick={() => handleDeleteTemplate(template)}
            aria-label={`${t("deleteTemplateAction")} ${template.name}`}
          >
            {tc("delete")}
          </Button>
        </div>
      ))}
    </>
  );
}

function TemplatePolicyEditor({ model }: { model: LibraryModel }) {
  const {
    editorMode,
    draftPolicy,
    setDraftPolicy,
    serverRefIssues,
    setServerRefIssues,
    setHasEditorErrors,
    setHasBlockingRefs,
    isSubmitting,
    loadingTemplateDetail,
    requiresReload,
  } = model;
  return (
    <>
      {editorMode !== null && (
        <KeyPolicySixTabEditor
          onFormStateChange={model.setDraftFormState}
          policy={draftPolicy}
          onChange={(next) => {
            setDraftPolicy(next);
            setServerRefIssues((issues) =>
              issues.filter((issue) => issue.code !== "INVALID_FIELD")
            );
          }}
          serverReferenceIssues={serverRefIssues}
          onValidationStateChange={({ hasErrors, hasBlockingReferenceIssues }) => {
            setHasEditorErrors(hasErrors);
            setHasBlockingRefs(hasBlockingReferenceIssues);
          }}
          disabled={isSubmitting || loadingTemplateDetail || requiresReload}
        />
      )}{" "}
    </>
  );
}
