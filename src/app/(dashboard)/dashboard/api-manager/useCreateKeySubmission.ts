"use client";

import { useTranslations } from "next-intl";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";
import { buildApiKeyCreateScopes } from "./apiManagerScopes";
import { anchorReferenceIssues } from "./keyTemplateReferenceIssues";
import { validateKeyName, type KeyTemplatePolicy } from "./keyTemplatePolicyUtils";
import type { useKeyTemplateCreation } from "./useKeyTemplateCreation";

type CreateDraft = ReturnType<typeof useKeyTemplateCreation>;
type Translate = (key: string, values?: Record<string, unknown>) => string;

function canSubmitDraft(draft: CreateDraft, focusName: () => void, t: Translate) {
  const nameValidation = validateKeyName(draft.newKeyName, t);
  if (!nameValidation.valid) {
    focusName();
    draft.setNameError(nameValidation.error || t("invalidKeyName"));
    return false;
  }
  const policyError = draft.hasCreatePolicyErrors
    ? Object.values(draft.createPolicyErrors).flat()[0] || t("invalidPolicyError")
    : null;
  if (policyError || draft.hasBlockingCreateRefIssues) {
    draft.setShowFullPolicyEditor(true);
    draft.setCreateError(policyError || t("staleReferenceBlockingError"));
    return false;
  }
  return true;
}

function policyWithQuickPermissions(draft: CreateDraft): KeyTemplatePolicy {
  const scopes = buildApiKeyCreateScopes({
    manageEnabled: draft.newKeyManageEnabled,
    selfUsageEnabled: draft.newKeySelfUsageEnabled,
    selfAccountQuotaEnabled: draft.newKeyAccountQuotaEnabled,
  });
  const customScopes = draft.draftCreatePolicy.key.scopes.filter(
    (scope) => !["manage", "self:usage", "self:account-quota"].includes(scope)
  );
  return {
    ...draft.draftCreatePolicy,
    key: {
      ...draft.draftCreatePolicy.key,
      scopes: Array.from(new Set([...customScopes, ...scopes])),
      allowUsageCommand: draft.newKeyAllowUsageCommand,
    },
  };
}

function sanitizeKeyName(name: string) {
  return name
    .replace(/[<>"']/g, "")
    .trim()
    .slice(0, 200);
}

export function useCreateKeySubmission(
  draft: CreateDraft,
  options: {
    isSubmitting: boolean;
    setIsSubmitting: (submitting: boolean) => void;
    focusName: () => void;
    onCreated: (key: string) => Promise<void>;
  }
) {
  const t = useTranslations("apiManager");
  return async () => {
    if (
      options.isSubmitting ||
      draft.loadingTemplatePolicy ||
      !canSubmitDraft(draft, options.focusName, t)
    )
      return;
    options.setIsSubmitting(true);
    draft.setNameError(null);
    draft.setCreateError(null);
    const policy = policyWithQuickPermissions(draft);
    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitizeKeyName(draft.newKeyName),
          policy,
          ...(draft.selectedTemplateRef ? { templateRef: draft.selectedTemplateRef } : {}),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        await options.onCreated(data.key);
      } else {
        if (res.status === 422 && Array.isArray(data?.issues)) {
          draft.setCreateKeyRefIssues(
            anchorReferenceIssues(data.issues, policy, draft.createKeyFormState)
          );
          draft.setShowFullPolicyEditor(true);
        }
        draft.setCreateError(extractApiErrorMessage(data, t("failedCreateKey")));
      }
    } catch {
      draft.setCreateError(t("failedCreateKeyRetry"));
    } finally {
      options.setIsSubmitting(false);
    }
  };
}
