"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Input from "@/shared/components/Input";
import { WEBHOOK_SECRET_MAX_LENGTH } from "@/shared/constants/formLimits";
import { HmacRecipeBlock } from "../../shared/HmacRecipeBlock";
import {
  webhookSecretTooLong,
  webhookUrlFieldError,
  webhookUrlProblem,
} from "../../../webhookFieldValidation";

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

type UrlState = "idle" | "checking" | "ok" | "blocked" | "invalid";

export function CustomConfigForm({
  value,
  onChange,
  t,
  isEditing,
  showRequired,
}: CustomConfigFormProps) {
  const tv = useTranslations("formValidation");
  const [urlState, setUrlState] = useState<UrlState>("idle");

  useEffect(() => {
    const url = value.endpointUrl.trim();
    const controller = new AbortController();
    const askServer = webhookUrlProblem(value.endpointUrl) === null;
    const delay = askServer ? 600 : 0;
    const timer = setTimeout(async () => {
      if (!askServer) {
        setUrlState("idle");
        return;
      }
      setUrlState("checking");
      try {
        const res = await fetch("/api/webhooks/validate-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
          signal: controller.signal,
        });
        const data = await res.json().catch(() => ({}));
        setUrlState(data.valid ? "ok" : data.reason === "blocked_private" ? "blocked" : "invalid");
      } catch {
        if (!controller.signal.aborted) setUrlState("invalid");
      }
    }, delay);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value.endpointUrl]);

  const urlHint =
    urlState === "checking"
      ? t("validateUrl.checking")
      : urlState === "ok"
        ? t("validateUrl.ok")
        : urlState === "blocked"
          ? t("validateUrl.blockedPrivate")
          : urlState === "invalid" && value.endpointUrl.trim()
            ? t("validateUrl.invalidUrl")
            : "";

  // Empty, over the limit or not an http(s) URL is said at once, without a round trip; the
  // server's verdict (blocked private address) follows for a value that passes.
  const urlError =
    webhookUrlFieldError(value.endpointUrl, {
      label: t("custom.endpointUrl"),
      showRequired,
      t,
      tv,
    }) ?? (urlHint && urlState !== "ok" && urlState !== "checking" ? urlHint : undefined);
  // Over the route's limit the key is flagged, never cut: a truncated signing key would sign
  // payloads the receiver cannot verify.
  const secretError = webhookSecretTooLong(value.secretKey)
    ? tv("maxLength", {
        field: t("custom.secretKey"),
        max: WEBHOOK_SECRET_MAX_LENGTH,
        count: value.secretKey.trim().length,
      })
    : undefined;

  return (
    <div className="space-y-4">
      <Input
        label={t("custom.endpointUrl")}
        value={value.endpointUrl}
        onChange={(e) => onChange({ ...value, endpointUrl: e.target.value })}
        placeholder={t("custom.endpointUrlPlaceholder")}
        required
        error={urlError}
        hint={
          <>
            {urlHint && (urlState === "ok" || urlState === "checking") && (
              <span className={`block ${urlState === "ok" ? "text-success" : ""}`}>{urlHint}</span>
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
