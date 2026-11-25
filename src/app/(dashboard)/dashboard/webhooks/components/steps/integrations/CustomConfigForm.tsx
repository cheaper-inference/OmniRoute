"use client";

import { useTranslations } from "next-intl";
import Input from "@/shared/components/Input";
import { HmacRecipeBlock } from "../../shared/HmacRecipeBlock";
import { webhookSecretFieldError, webhookUrlFieldFeedback } from "../../../webhookFieldValidation";
import { useWebhookUrlCheck } from "./useWebhookUrlCheck";

export interface CustomConfig {
  endpointUrl: string;
  secretKey: string;
}

interface CustomConfigFormProps {
  value: CustomConfig;
  onChange: (v: CustomConfig) => void;
  t: (key: string) => string;
  isEditing?: boolean;
  /** Set by a refused Next: an untouched form is not flagged for being empty. */
  showRequired?: boolean;
}

export function CustomConfigForm({
  value,
  onChange,
  t,
  isEditing,
  showRequired,
}: CustomConfigFormProps) {
  const tv = useTranslations("formValidation");
  const urlState = useWebhookUrlCheck(value.endpointUrl);
  const usesHttp = /^http:\/\//i.test(value.endpointUrl.trimStart());
  const url = webhookUrlFieldFeedback(value.endpointUrl, urlState, {
    label: t("custom.endpointUrl"),
    showRequired,
    t,
    tv,
  });
  const secretError = webhookSecretFieldError(value.secretKey, {
    label: t("custom.secretKey"),
    tv,
  });

  return (
    <div className="space-y-4">
      <Input
        label={t("custom.endpointUrl")}
        value={value.endpointUrl}
        onChange={(e) => onChange({ ...value, endpointUrl: e.target.value })}
        placeholder={t("custom.endpointUrlPlaceholder")}
        required
        error={url.error}
        hint={
          <>
            {url.status && (
              <span className={`block ${urlState === "ok" ? "text-success" : ""}`}>
                {url.status}
              </span>
            )}
            {usesHttp && (
              <span className="block text-warning" role="status">
                {t("custom.unencryptedHttpWarning")}
              </span>
            )}
          </>
        }
      />
      <Input
        label={t("custom.secretKey")}
        type="password"
        value={value.secretKey}
        onChange={(e) => onChange({ ...value, secretKey: e.target.value })}
        placeholder={isEditing ? t("secretEditPlaceholder") : t("custom.secretKeyPlaceholder")}
        autoComplete="new-password"
        error={secretError}
        hint={t("custom.secretKeyHint")}
      />
      <HmacRecipeBlock
        title={t("howItWorks.hmacRecipeTitle")}
        copyLabel={t("copy")}
        copiedLabel={t("copied")}
        snippets={[
          { label: "Node.js", code: t("howItWorks.hmacRecipe") },
          { label: "Python", code: t("howItWorks.hmacRecipePython") },
          { label: "Bash", code: t("howItWorks.hmacRecipeBash") },
        ]}
      />
    </div>
  );
}
