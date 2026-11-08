"use client";

import { useState, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import Modal from "@/shared/components/Modal";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";
import KeyPolicySixTabEditor from "./KeyPolicySixTabEditor";
import {
  createDefaultClientKeyTemplatePolicy,
  summarizeKeyTemplatePolicy,
  validateKeyName,
  type KeyTemplate,
  type KeyTemplatePolicy,
  type TemplateReferenceIssue,
} from "../keyTemplatePolicyUtils";

export interface KeyTemplatesLibrarySectionProps {
  templates: KeyTemplate[];
  onRefreshTemplates: () => Promise<void> | void;
  onUseTemplate: (template: KeyTemplate) => void;
}

export default function KeyTemplatesLibrarySection({
  templates,
  onRefreshTemplates,
  onUseTemplate,
}: KeyTemplatesLibrarySectionProps) {
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
  const [serverRefIssues, setServerRefIssues] = useState<TemplateReferenceIssue[]>([]);
  const [hasEditorErrors, setHasEditorErrors] = useState(false);
  const [hasBlockingRefs, setHasBlockingRefs] = useState(false);
  const [loadingTemplateDetail, setLoadingTemplateDetail] = useState(false);
  const loadGeneration = useRef(0);
  const [modalError, setModalError] = useState<string | null>(null);
  const [sectionError, setSectionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openCreateModal = useCallback(() => {
    loadGeneration.current++;
    setLoadingTemplateDetail(false);
    setEditorMode("create");
    setEditingTemplate(null);
    setTemplateName("");
    setTemplateDesc("");
    setDraftPolicy(createDefaultClientKeyTemplatePolicy());
    setServerRefIssues([]);
    setModalError(null);
  }, []);

  const openEditModal = useCallback(async (tpl: KeyTemplate) => {
    const generation = ++loadGeneration.current;
    setEditorMode("edit");
    setEditingTemplate(tpl);
    setTemplateName(tpl.name);
    setTemplateDesc(tpl.description || "");
    setDraftPolicy(tpl.policy);
    setServerRefIssues([]);
    setModalError(null);
    setLoadingTemplateDetail(true);

    try {
      const res = await fetch(`/api/key-templates/${encodeURIComponent(tpl.id)}`);
      if (res.ok) {
        const data = await res.json();
        if (generation !== loadGeneration.current) return;
        if (data.template) {
          setEditingTemplate(data.template);
          setTemplateName(data.template.name);
          setTemplateDesc(data.template.description || "");
          setDraftPolicy(data.template.policy);
        }
        setServerRefIssues(Array.isArray(data.referenceIssues) ? data.referenceIssues : []);
      }
    } catch {
      // Keep cached template snapshot if detail fetch fails
    } finally {
      if (generation === loadGeneration.current) setLoadingTemplateDetail(false);
    }
  }, []);

  const closeEditorModal = useCallback(() => {
    if (isSubmitting) return;
    loadGeneration.current++;
    setLoadingTemplateDetail(false);
    setEditorMode(null);
    setEditingTemplate(null);
    setModalError(null);
  }, [isSubmitting]);

  const handleSaveTemplate = async () => {
    if (isSubmitting || hasEditorErrors || hasBlockingRefs) return;
    const nameVal = validateKeyName(templateName, t);
    if (!nameVal.valid) {
      setModalError(nameVal.error || t("invalidKeyName"));
      return;
    }

    setIsSubmitting(true);
    setModalError(null);

    try {
      if (editorMode === "create") {
        const res = await fetch("/api/key-templates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: templateName.trim(),
            description: templateDesc.trim(),
            policy: draftPolicy,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          if (Array.isArray(data?.issues)) setServerRefIssues(data.issues);
          setModalError(extractApiErrorMessage(data, t("templateSaveFailed")));
          return;
        }
        await onRefreshTemplates();
        setEditorMode(null);
      } else if (editorMode === "edit" && editingTemplate) {
        const res = await fetch(`/api/key-templates/${encodeURIComponent(editingTemplate.id)}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            revision: editingTemplate.revision,
            name: templateName.trim(),
            description: templateDesc.trim(),
            policy: draftPolicy,
          }),
        });
        const data = await res.json();
        if (res.status === 409) {
          setModalError(t("templateRevisionConflictError"));
          return;
        }
        if (!res.ok) {
          if (Array.isArray(data?.issues)) setServerRefIssues(data.issues);
          setModalError(extractApiErrorMessage(data, t("templateSaveFailed")));
          return;
        }
        await onRefreshTemplates();
        setEditorMode(null);
        setEditingTemplate(null);
      }
    } catch {
      setModalError(t("templateSaveFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTemplate = async (tpl: KeyTemplate) => {
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

  return (
    <Card data-testid="key-templates-library">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 shrink-0">
            <Icon name="bookmarks" className="text-xl text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">
              {t("keyTemplatesTitle")}
              <span className="ml-1.5 text-sm font-normal text-text-muted">
                ({templates.length})
              </span>
            </h3>
            <p className="text-xs text-text-muted">{t("keyTemplatesDesc")}</p>
          </div>
        </div>
        <Button icon="add" variant="secondary" onClick={openCreateModal}>
          {t("newTemplateAction")}
        </Button>
      </div>

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

      {templates.length === 0 ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg border border-dashed border-border bg-surface/20">
          <div className="flex items-center gap-3">
            <Icon name="bookmark_border" size={24} className="text-text-muted shrink-0" />
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
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-text-main truncate">
                          {tpl.name}
                        </h4>
                        <span className="px-1.5 py-0.5 rounded bg-surface-2 text-text-muted text-[10px] font-mono shrink-0">
                          v{tpl.revision}
                        </span>
                      </div>
                      {tpl.description && (
                        <p className="text-xs text-text-muted line-clamp-2 mt-0.5">
                          {tpl.description}
                        </p>
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
                        variant="ghost"
                        icon="delete"
                        className="text-error"
                        title={t("deleteTemplateAction")}
                        aria-label={`${t("deleteTemplateAction")} ${tpl.name}`}
                        onClick={() => handleDeleteTemplate(tpl)}
                      />
                    </div>
                  </div>

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
      )}

      {/* Create / Edit Template Modal */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label={t("templateNameLabel")}
              value={templateName}
              onChange={(e) => {
                setTemplateName(e.target.value);
                setModalError(null);
              }}
              placeholder={t("templateNamePlaceholder")}
              maxLength={200}
              disabled={isSubmitting || loadingTemplateDetail}
            />
            <Input
              label={t("templateDescriptionLabel")}
              value={templateDesc}
              onChange={(e) => setTemplateDesc(e.target.value)}
              placeholder={t("templateDescriptionPlaceholder")}
              maxLength={500}
              disabled={isSubmitting || loadingTemplateDetail}
            />
          </div>

          {loadingTemplateDetail && (
            <div className="text-xs text-text-muted flex items-center gap-2" role="status">
              <Icon name="hourglass_empty" size={14} className="animate-spin" />
              <span>{tc("loading")}</span>
            </div>
          )}

          {editorMode !== null && (
            <KeyPolicySixTabEditor
              policy={draftPolicy}
              onChange={(next) => setDraftPolicy(next)}
              serverReferenceIssues={serverRefIssues}
              onValidationStateChange={({ hasErrors, hasBlockingReferenceIssues }) => {
                setHasEditorErrors(hasErrors);
                setHasBlockingRefs(hasBlockingReferenceIssues);
              }}
              disabled={isSubmitting || loadingTemplateDetail}
            />
          )}

          {modalError && (
            <Alert
              variant="critical"
              icon={<Icon name="error" />}
              description={modalError}
              dismissLabel={tc("close")}
              onDismiss={() => setModalError(null)}
            />
          )}

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
                !templateName.trim() ||
                hasEditorErrors ||
                hasBlockingRefs
              }
              onClick={handleSaveTemplate}
            >
              {editorMode === "edit" ? t("saveChanges") : t("newTemplateAction")}
            </Button>
          </div>
        </div>
      </Modal>
      {confirmDialog}
    </Card>
  );
}
