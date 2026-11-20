"use client";

import { Disclosure, DisclosureContent, DisclosureTrigger } from "@omniroute/ui-kit/disclosure";
import { useTranslations } from "next-intl";
import Input from "@/shared/components/Input";
import { webhookUrlFieldFeedback } from "../../../webhookFieldValidation";
import { useWebhookUrlCheck } from "./useWebhookUrlCheck";

export interface DiscordConfig {
  webhookUrl: string;
}

interface DiscordConfigFormProps {
  value: DiscordConfig;
  onChange: (v: DiscordConfig) => void;
  t: (key: string) => string;
  /** Set by a refused Next: an untouched form is not flagged for being empty. */
  showRequired?: boolean;
}

export function DiscordConfigForm({ value, onChange, t, showRequired }: DiscordConfigFormProps) {
  const tv = useTranslations("formValidation");
  const urlState = useWebhookUrlCheck(value.webhookUrl);
  const url = webhookUrlFieldFeedback(value.webhookUrl, urlState, {
    label: t("discord.webhookUrl"),
    showRequired,
    t,
    tv,
  });

  return (
    <div className="space-y-4">
      <Input
        label={t("discord.webhookUrl")}
        value={value.webhookUrl}
        onChange={(e) => onChange({ webhookUrl: e.target.value })}
        placeholder={t("discord.webhookUrlPlaceholder")}
        required
        error={url.error}
        hint={
          <>
            {url.status && (
              <span className={`block ${urlState === "ok" ? "text-success" : ""}`}>
                {url.status}
              </span>
            )}
            <span className="block">{t("discord.webhookUrlHint")}</span>
          </>
        }
      />
      <Disclosure className="rounded-lg border border-border bg-bg-subtle">
        <DisclosureTrigger>{t("discord.tutorial")}</DisclosureTrigger>
        {/* keepMounted: the steps stay mounted while closed, as in a native details element. */}
        <DisclosureContent keepMounted className="px-3 pb-3">
          <ol className="space-y-1.5 text-xs text-text-muted">
            {[1, 2, 3].map((n) => (
              <li key={n} className="flex gap-2">
                <span className="font-semibold text-primary">{n}.</span>
                {t(`discord.tutorialStep${n}`)}
              </li>
            ))}
          </ol>
        </DisclosureContent>
      </Disclosure>
    </div>
  );
}
