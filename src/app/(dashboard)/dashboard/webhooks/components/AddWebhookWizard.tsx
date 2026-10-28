"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";
import { Step1ChooseIntegration } from "./steps/Step1ChooseIntegration";
import {
  Step2ConfigureIntegration,
  type SlackConfig,
  type TelegramConfig,
  type DiscordConfig,
  type CustomConfig,
} from "./steps/Step2ConfigureIntegration";
import { Step3EventsAndTest } from "./steps/Step3EventsAndTest";
import { HowItWorksSidebar } from "./HowItWorksSidebar";
import type { WebhookItem } from "./WebhookCard";
import type { WebhookKind } from "./shared/IntegrationCard";

interface AddWebhookWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
  t: (key: string, opts?: Record<string, unknown>) => string;
  editingWebhook?: WebhookItem | null;
}

const STEPS = [1, 2, 3] as const;

interface WizardState {
  kind: WebhookKind;
  slack: SlackConfig;
  telegram: TelegramConfig;
  discord: DiscordConfig;
  custom: CustomConfig;
  events: string[];
  enabled: boolean;
  description: string;
}

const INITIAL: WizardState = {
  kind: "slack",
  slack: { webhookUrl: "" },
  telegram: { botToken: "", chatId: "" },
  discord: { webhookUrl: "" },
  custom: { endpointUrl: "", secretKey: "" },
  events: ["*"],
  enabled: true,
  description: "",
};

function stateFromWebhook(webhook: WebhookItem | null | undefined): WizardState {
  if (!webhook) return INITIAL;

  return {
    kind: webhook.kind,
    slack: { webhookUrl: webhook.kind === "slack" ? webhook.url : "" },
    telegram: { botToken: "", chatId: webhook.kind === "telegram" ? webhook.url : "" },
    discord: { webhookUrl: webhook.kind === "discord" ? webhook.url : "" },
    custom: { endpointUrl: webhook.kind === "custom" ? webhook.url : "", secretKey: "" },
    events: webhook.events.length > 0 ? webhook.events : ["*"],
    enabled: webhook.enabled,
    description: webhook.description,
  };
}

function step2Valid(state: WizardState, isEditing: boolean): boolean {
  const { kind } = state;
  if (kind === "slack") return state.slack.webhookUrl.trim().length > 0;
  if (kind === "telegram") {
    return (
      state.telegram.chatId.trim().length > 0 &&
      (isEditing || state.telegram.botToken.trim().length > 0)
    );
  }
  if (kind === "discord") return state.discord.webhookUrl.trim().length > 0;
  if (kind === "custom") return state.custom.endpointUrl.trim().length > 0;
  return false;
}

export function AddWebhookWizard({
  isOpen,
  onClose,
  onCreated,
  t,
  editingWebhook,
}: AddWebhookWizardProps) {
  const isEditing = Boolean(editingWebhook);
  const [step, setStep] = useState(1);
  const [state, setState] = useState<WizardState>(INITIAL);
  const [saving, setSaving] = useState(false);
  const tc = useTranslations("common");
  const [error, setError] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    void (async () => {
      await Promise.resolve();
      setStep(1);
      setState(stateFromWebhook(editingWebhook));
      setError(null);
      setCreatedId(editingWebhook?.id ?? null);
    })();
  }, [editingWebhook, isOpen]);

  const handleClose = () => {
    if (saving) return;
    setStep(1);
    setState(INITIAL);
    setError(null);
    setCreatedId(null);
    onClose();
  };

  // Builds the config payload (URL + kind + metadata) — sent when entering step 3.
  const buildConfigPayload = () => {
    const { kind } = state;
    if (kind === "slack") return { kind, url: state.slack.webhookUrl };
    if (kind === "discord") return { kind, url: state.discord.webhookUrl };
    if (kind === "telegram") {
      const payload: Record<string, unknown> = { kind, url: state.telegram.chatId };
      if (state.telegram.botToken.trim()) {
        payload.metadata = { botToken: state.telegram.botToken };
      }
      return payload;
    }
    const payload: Record<string, unknown> = { kind, url: state.custom.endpointUrl };
    if (state.custom.secretKey.trim()) payload.secret = state.custom.secretKey.trim();
    return payload;
  };

  // Called when Next is clicked on step 2: create (or update) the webhook so the
  // test button is available at step 3 before the user clicks Finish.
  const handleNextFromStep2 = async () => {
    setSaving(true);
    setError(null);
    try {
      if (createdId) {
        const res = await fetch(`/api/webhooks/${createdId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildConfigPayload()),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || t("saveFailed"));
      } else {
        const res = await fetch("/api/webhooks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildConfigPayload()),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || t("saveFailed"));
        setCreatedId(data.webhook?.id ?? null);
      }
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("saveFailed"));
    } finally {
      setSaving(false);
    }
  };

  // Finish: update events/enabled/description on the already-created webhook.
  const finish = async () => {
    if (!createdId) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/webhooks/${createdId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...buildConfigPayload(),
          events: state.events,
          enabled: state.enabled,
          description: state.description,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || t("saveFailed"));
      onCreated();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("saveFailed"));
    } finally {
      setSaving(false);
    }
  };

  const canGoNext = step === 1 ? true : step === 2 ? step2Valid(state, isEditing) : true;

  const stepTitle =
    step === 1
      ? t("wizard.step1Title")
      : step === 2
        ? t("wizard.step2Title")
        : t("wizard.step3Title");

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`${t(isEditing ? "editWebhook" : "addWebhook")} — ${stepTitle}`}
      size="xl"
      footer={
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-1" aria-hidden="true">
            {STEPS.map((s) => (
              <span
                key={s}
                className={`inline-block size-2 rounded-full transition-colors ${
                  s === step ? "bg-primary" : s < step ? "bg-primary/40" : "bg-border"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleClose} disabled={saving}>
              {t("wizard.cancel")}
            </Button>
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep((s) => s - 1)} disabled={saving}>
                {t("wizard.back")}
              </Button>
            )}
            {step < 3 ? (
              <Button
                variant="primary"
                onClick={() => (step === 2 ? void handleNextFromStep2() : setStep((s) => s + 1))}
                disabled={!canGoNext || saving}
                loading={saving && step === 2}
              >
                {t("wizard.next")}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => void finish()}
                disabled={saving}
                loading={saving}
              >
                {t("wizard.finish")}
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div className="flex gap-6">
        <div className="min-w-0 flex-1">
          {error && (
            <Alert
              variant="critical"
              className="mb-4"
              description={error}
              dismissLabel={tc("dismissNotification")}
              onDismiss={() => setError(null)}
            />
          )}
          {step === 1 && (
            <Step1ChooseIntegration
              selected={state.kind}
              onSelect={(kind) => setState((s) => ({ ...s, kind }))}
              t={t}
            />
          )}
          {step === 2 && (
            <Step2ConfigureIntegration
              kind={state.kind}
              slack={state.slack}
              telegram={state.telegram}
              discord={state.discord}
              custom={state.custom}
              onChangeSlack={(v) => setState((s) => ({ ...s, slack: v }))}
              onChangeTelegram={(v) => setState((s) => ({ ...s, telegram: v }))}
              onChangeDiscord={(v) => setState((s) => ({ ...s, discord: v }))}
              onChangeCustom={(v) => setState((s) => ({ ...s, custom: v }))}
              t={t}
              isEditing={isEditing}
            />
          )}
          {step === 3 && (
            <Step3EventsAndTest
              webhookId={createdId ?? undefined}
              events={state.events}
              enabled={state.enabled}
              description={state.description}
              onChangeEvents={(events) => setState((s) => ({ ...s, events }))}
              onChangeEnabled={(enabled) => setState((s) => ({ ...s, enabled }))}
              onChangeDescription={(description) => setState((s) => ({ ...s, description }))}
              t={t}
            />
          )}
        </div>
        <div className="w-64 shrink-0 hidden lg:block">
          <HowItWorksSidebar t={t} showCustomNote={state.kind === "custom"} />
        </div>
      </div>
    </Modal>
  );
}
