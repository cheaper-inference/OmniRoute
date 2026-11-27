"use client";

import { Disclosure, DisclosureContent, DisclosureTrigger } from "@omniroute/ui-kit/disclosure";
import { useTranslations } from "next-intl";
import Input from "@/shared/components/Input";
import { webhookUrlFieldFeedback } from "../../../webhookFieldValidation";
import { useWebhookUrlCheck } from "./useWebhookUrlCheck";

export interface SlackConfig {
  webhookUrl: string;
}

interface SlackConfigFormProps {
  value: SlackConfig;
  onChange: (v: SlackConfig) => void;
  t: (key: string) => string;
  /** Set by a refused Next: an untouched form is not flagged for being empty. */
  showRequired?: boolean;
}

export function SlackConfigForm({ value, onChange, t, showRequired }: SlackConfigFormProps) {
  const tv = useTranslations("formValidation");
  const urlState = useWebhookUrlCheck(value.webhookUrl);
  const url = webhookUrlFieldFeedback(value.webhookUrl, urlState, {
    label: t("slack.webhookUrl"),
    showRequired,
    t,
    tv,
  });

  return (
    <div className="space-y-4">
      <Input
        label={t("slack.webhookUrl")}
        value={value.webhookUrl}
        onChange={(e) => onChange({ webhookUrl: e.target.value })}
        placeholder={t("slack.webhookUrlPlaceholder")}
        required
        error={url.error}
        hint={
          <>
            {url.status && (
              <span className={`block ${urlState === "ok" ? "text-success" : ""}`}>
                {url.status}
              </span>
            )}
            <span className="block">{t("slack.webhookUrlHint")}</span>
          </>
        }
      />
      <Disclosure className="rounded-lg border border-border bg-bg-subtle">
        <DisclosureTrigger>{t("slack.tutorial")}</DisclosureTrigger>
        {/* keepMounted: the steps stay mounted while closed, as in a native details element. */}
        <DisclosureContent keepMounted className="px-3 pb-3">
          <ol className="space-y-1.5 text-xs text-text-muted">
            {[1, 2, 3, 4].map((n) => (
              <li key={n} className="flex gap-2">
                <span className="font-semibold text-primary">{n}.</span>
                {t(`slack.tutorialStep${n}`)}
              </li>
            ))}
          </ol>
        </DisclosureContent>
      </Disclosure>
    </div>
  );
}
