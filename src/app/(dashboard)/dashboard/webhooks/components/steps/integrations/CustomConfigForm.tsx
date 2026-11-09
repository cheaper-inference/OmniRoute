"use client";

import { useEffect, useState } from "react";
import Input from "@/shared/components/Input";
import { HmacRecipeBlock } from "../../shared/HmacRecipeBlock";

export interface CustomConfig {
  endpointUrl: string;
  secretKey: string;
}

interface CustomConfigFormProps {
  value: CustomConfig;
  onChange: (v: CustomConfig) => void;
  t: (key: string) => string;
  isEditing?: boolean;
}

type UrlState = "idle" | "checking" | "ok" | "blocked" | "invalid";

export function CustomConfigForm({ value, onChange, t, isEditing }: CustomConfigFormProps) {
  const [urlState, setUrlState] = useState<UrlState>("idle");

  useEffect(() => {
    const url = value.endpointUrl.trim();
    const controller = new AbortController();
    const delay = url ? 600 : 0;
    const timer = setTimeout(async () => {
      if (!url) {
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

  return (
    <div className="space-y-4">
      <Input
        label={t("custom.endpointUrl")}
        value={value.endpointUrl}
        onChange={(e) => onChange({ ...value, endpointUrl: e.target.value })}
        placeholder={t("custom.endpointUrlPlaceholder")}
        error={urlHint && urlState !== "ok" && urlState !== "checking" ? urlHint : undefined}
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
