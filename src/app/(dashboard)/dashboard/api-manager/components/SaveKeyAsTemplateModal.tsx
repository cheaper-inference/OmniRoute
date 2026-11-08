"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { Checkbox } from "@omniroute/ui-kit/checkbox";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import Modal from "@/shared/components/Modal";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";
import {
  summarizeKeyTemplatePolicy,
  validateKeyName,
  type KeyTemplate,
  type KeyTemplatePolicy,
  type TemplateReferenceIssue,
  type TemplateWarning,
  type TemplateWarningCode,
} from "../keyTemplatePolicyUtils";

export interface SaveKeyAsTemplateModalProps {
  sourceKey: { id: string; name: string } | null;
  onClose: () => void;
  onSaved: (template: KeyTemplate) => void;
}

export default function SaveKeyAsTemplateModal(props: SaveKeyAsTemplateModalProps) {
  return props.sourceKey ? (
    <SaveKeyAsTemplateModalContent
      key={props.sourceKey.id}
      {...props}
      sourceKey={props.sourceKey}
    />
  ) : null;
}

function SaveKeyAsTemplateModalContent({
  sourceKey,
  onClose,
  onSaved,
}: Omit<SaveKeyAsTemplateModalProps, "sourceKey"> & {
  sourceKey: NonNullable<SaveKeyAsTemplateModalProps["sourceKey"]>;
}) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");

  const [name, setName] = useState(`${sourceKey.name} template`.slice(0, 200));
  const [description, setDescription] = useState("");
  const [loadingPreview, setLoadingPreview] = useState(true);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [previewPolicy, setPreviewPolicy] = useState<KeyTemplatePolicy | null>(null);
  const [warnings, setWarnings] = useState<TemplateWarning[]>([]);
  const [referenceIssues, setReferenceIssues] = useState<TemplateReferenceIssue[]>([]);
  const [acknowledgedCodes, setAcknowledgedCodes] = useState<Set<TemplateWarningCode>>(
    () => new Set()
  );
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!sourceKey) return;
    let cancelled = false;
    const loadPreview = async () => {
      try {
        const res = await fetch(`/api/keys/${encodeURIComponent(sourceKey.id)}/template-policy`);
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setPreviewError(extractApiErrorMessage(data, t("templatePreviewFailed")));
          return;
        }
        setPreviewPolicy(data.policy || null);
        setWarnings(Array.isArray(data.warnings) ? data.warnings : []);
        setReferenceIssues(Array.isArray(data.referenceIssues) ? data.referenceIssues : []);
      } catch {
        if (!cancelled) {
          setPreviewError(t("templatePreviewFailed"));
        }
      } finally {
        if (!cancelled) {
          setLoadingPreview(false);
        }
      }
    };

    void loadPreview();
    return () => {
      cancelled = true;
    };
  }, [sourceKey, t]);

  if (!sourceKey) return null;

  const requiredWarnings = warnings.filter((w) => w.requiresAcknowledgement);
  const allRequiredAcknowledged = requiredWarnings.every((w) => acknowledgedCodes.has(w.code));

  const toggleAcknowledge = (code: TemplateWarningCode) => {
    setAcknowledgedCodes((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  const handleSave = async () => {
    if (isSaving || loadingPreview || !!previewError || !allRequiredAcknowledged) return;
    const nameValidation = validateKeyName(name, t);
    if (!nameValidation.valid) {
      setSaveError(nameValidation.error || t("invalidKeyName"));
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      const res = await fetch("/api/key-templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromKeyId: sourceKey.id,
          name: name.trim(),
          description: description.trim(),
          acknowledge: Array.from(acknowledgedCodes),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (Array.isArray(data?.warnings)) {
          setWarnings(data.warnings);
        }
        setSaveError(extractApiErrorMessage(data, t("templateSaveFailed")));
        return;
      }
      onSaved(data.template);
      onClose();
    } catch {
      setSaveError(t("templateSaveFailed"));
    } finally {
      setIsSaving(false);
    }
  };

  const summaryBadges = previewPolicy ? summarizeKeyTemplatePolicy(previewPolicy, t) : [];

  return (
    <Modal
      isOpen={!!sourceKey}
      title={t("saveAsTemplateTitle", { name: sourceKey.name })}
      bodyClassName="p-6 max-h-[calc(100vh-140px)] overflow-y-auto"
      onClose={() => {
        if (!isSaving) onClose();
      }}
    >
      <div className="flex flex-col gap-4" data-testid="save-as-template-modal">
        <p className="text-xs text-text-muted">{t("saveAsTemplateDesc")}</p>

        <Input
          label={t("templateNameLabel")}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSaveError(null);
          }}
          placeholder={t("templateNamePlaceholder")}
          maxLength={200}
          disabled={isSaving}
        />

        <Input
          label={t("templateDescriptionLabel")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t("templateDescriptionPlaceholder")}
          maxLength={500}
          disabled={isSaving}
        />

        {loadingPreview && (
          <div
            className="flex items-center gap-2 p-4 rounded-lg border border-border bg-surface/40 text-xs text-text-muted"
            role="status"
            aria-live="polite"
          >
            <Icon name="hourglass_empty" size={16} className="animate-spin" />
            <span>{t("templateLoadingPreview")}</span>
          </div>
        )}

        {previewError && (
          <Alert
            variant="critical"
            icon={<Icon name="error" />}
            title={t("templatePreviewRefusedTitle")}
            description={previewError}
          />
        )}

        {previewPolicy && (
          <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
            <p className="text-xs font-semibold text-text-main">
              {t("templateCapturedSnapshotHeading")}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {summaryBadges.map((b) => (
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
            <p className="text-[11px] text-text-muted pt-1">{t("templateExclusionsNote")}</p>
          </div>
        )}

        {referenceIssues.length > 0 && (
          <div className="flex flex-col gap-1.5 p-3 rounded-lg border border-warning/30 bg-warning/10">
            <p className="text-xs font-semibold text-warning flex items-center gap-1.5">
              <Icon name="warning" size={15} />
              {t("templatePreviewReferenceIssuesTitle")}
            </p>
            {referenceIssues.map((issue) => (
              <p key={`${issue.path}-${issue.code}`} className="text-xs text-warning">
                <code className="font-mono text-[11px]">{issue.path}</code>: {issue.message}
              </p>
            ))}
          </div>
        )}

        {warnings.length > 0 && (
          <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-warning/40 bg-warning/10">
            <p className="text-xs font-semibold text-warning flex items-center gap-1.5">
              <Icon name="warning" size={16} />
              {t("templateWarningsHeading")}
            </p>
            {warnings.map((w) => (
              <div
                key={w.code}
                className="flex flex-col gap-1.5 p-2.5 rounded border border-warning/30 bg-surface/80"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs text-text-main">{w.message}</span>
                  <code className="text-[10px] font-mono text-text-muted shrink-0">{w.code}</code>
                </div>
                {w.requiresAcknowledgement && (
                  <Checkbox
                    checked={acknowledgedCodes.has(w.code)}
                    onChange={() => toggleAcknowledge(w.code)}
                    label={
                      <span className="text-xs font-medium text-warning">
                        {t("templateAcknowledgeWarningLabel")}
                      </span>
                    }
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {saveError && (
          <Alert
            variant="critical"
            icon={<Icon name="error" />}
            description={saveError}
            dismissLabel={tc("close")}
            onDismiss={() => setSaveError(null)}
          />
        )}

        <div className="flex gap-2 pt-2">
          <Button type="button" variant="ghost" fullWidth onClick={onClose} disabled={isSaving}>
            {tc("cancel")}
          </Button>
          <Button
            type="button"
            fullWidth
            loading={isSaving}
            disabled={
              isSaving ||
              loadingPreview ||
              !!previewError ||
              !name.trim() ||
              !allRequiredAcknowledged
            }
            onClick={handleSave}
          >
            {t("saveAsTemplateAction")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
