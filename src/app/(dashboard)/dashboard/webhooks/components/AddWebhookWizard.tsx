"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";
import { focusFirstInvalidField } from "@/shared/utils/focusFirstInvalidField";
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
import {
  webhookErrorText,
  webhookSecretTooLong,
  webhookUrlProblem,
} from "../webhookFieldValidation";

interface AddWebhookWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
  t: (key: string, opts?: Record<string, unknown>) => string;
  editingWebhook?: WebhookItem | null;
}

const STEPS = [1, 2, 3] as const;

type WizardOperation = "next" | "finish" | "delete" | null;

interface WizardSession {
  draftId: string | null;
  operation: WizardOperation;
}

async function deleteDraft(id: string): Promise<boolean> {
  const res = await fetch(`/api/webhooks/${id}`, { method: "DELETE", keepalive: true }).catch(
    () => null
  );
  return res?.ok ?? false;
}

function assertWebhookConfigSaved(
  res: Response,
  data: { error?: unknown },
  t: AddWebhookWizardProps["t"]
) {
  if (!res.ok) throw new Error(webhookErrorText(data.error, t("saveFailed")));
}

function requireCreatedDraftId(
  data: { webhook?: { id?: string } | null },
  t: AddWebhookWizardProps["t"]
): string {
  const id = data.webhook?.id;
  if (!id) throw new Error(t("saveFailed"));
  return id;
}

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
  if (kind === "slack") return webhookUrlProblem(state.slack.webhookUrl) === null;
  if (kind === "telegram") {
    return (
      state.telegram.chatId.trim().length > 0 &&
      (isEditing || state.telegram.botToken.trim().length > 0)
    );
  }
  if (kind === "discord") return webhookUrlProblem(state.discord.webhookUrl) === null;
  if (kind === "custom") {
    return (
      webhookUrlProblem(state.custom.endpointUrl) === null &&
      !webhookSecretTooLong(state.custom.secretKey)
    );
  }
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
  const [operation, setOperation] = useState<WizardOperation>(null);
  const saving = operation !== null;
  const tc = useTranslations("common");
  const [error, setError] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const sessionRef = useRef<WizardSession | null>(null);
  // Next stays enabled on step 2: a refused click is what flags the fields that need fixing
  // (inline, by the forms) and moves focus to the first of them.
  const [showStep2Errors, setShowStep2Errors] = useState(false);
  const [refusedNext, setRefusedNext] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refusedNext > 0) focusFirstInvalidField(bodyRef.current);
  }, [refusedNext]);

  useEffect(() => {
    if (!isOpen) return;
    const session: WizardSession = { draftId: null, operation: null };
    sessionRef.current = session;
    void (async () => {
      await Promise.resolve();
      if (sessionRef.current !== session) return;
      setStep(1);
      setState(stateFromWebhook(editingWebhook));
      setShowStep2Errors(false);
      setError(null);
      setOperation(null);
      setCreatedId(editingWebhook?.id ?? null);
    })();
    return () => {
      sessionRef.current = null;
      // Finish handles its own outcome, and an in-flight DELETE already uses keepalive.
      if (session.draftId && session.operation !== "finish" && session.operation !== "delete") {
        void deleteDraft(session.draftId);
      }
    };
  }, [editingWebhook, isOpen]);

  const updateOperation = (session: WizardSession, next: WizardOperation) => {
    session.operation = next;
    if (sessionRef.current === session) setOperation(next);
  };

  const handleClose = async () => {
    const session = sessionRef.current;
    if (!session || session.operation) return;
    const id = session.draftId;
    if (!id) {
      onClose();
      return;
    }

    updateOperation(session, "delete");
    setError(null);
    const deleted = await deleteDraft(id);
    if (deleted) session.draftId = null;
    updateOperation(session, null);
    if (sessionRef.current !== session) return;

    if (deleted) {
      onClose();
    } else {
      setError(t("deleteFailed"));
    }
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
    const session = sessionRef.current;
    if (!session || session.operation) return;
    if (!step2Valid(state, isEditing)) {
      setShowStep2Errors(true);
      setRefusedNext((count) => count + 1);
      return;
    }
    updateOperation(session, "next");
    setError(null);
    try {
      if (createdId) {
        const res = await fetch(`/api/webhooks/${createdId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildConfigPayload()),
        });
        const data = await res.json().catch(() => ({}));
        assertWebhookConfigSaved(res, data, t);
      } else {
        const res = await fetch("/api/webhooks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...buildConfigPayload(), enabled: false }),
        });
        const data = await res.json().catch(() => ({}));
        assertWebhookConfigSaved(res, data, t);
        const id = requireCreatedDraftId(data, t);
        if (sessionRef.current !== session) {
          void deleteDraft(id);
          return;
        }
        session.draftId = id;
        setCreatedId(id);
      }
      if (sessionRef.current === session) setStep(3);
    } catch (err) {
      if (sessionRef.current === session) {
        setError(err instanceof Error ? err.message : t("saveFailed"));
      }
    } finally {
      updateOperation(session, null);
    }
  };

  // Finish: update events/enabled/description on the already-created webhook.
  const finish = async () => {
    const session = sessionRef.current;
    if (!createdId || !session || session.operation) return;
    updateOperation(session, "finish");
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
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(webhookErrorText(data.error, t("saveFailed")));
      }
      session.draftId = null;
      if (sessionRef.current !== session) return;
      onCreated();
      onClose();
    } catch (err) {
      if (sessionRef.current === session) {
        setError(err instanceof Error ? err.message : t("saveFailed"));
      } else if (session.draftId) {
        void deleteDraft(session.draftId);
      }
    } finally {
      updateOperation(session, null);
    }
  };

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
                disabled={saving}
                loading={operation === "next" && step === 2}
              >
                {t("wizard.next")}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => void finish()}
                disabled={saving}
                loading={operation === "finish"}
              >
                {t("wizard.finish")}
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div ref={bodyRef} className="flex gap-6">
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
              onSelect={(kind) => {
                setState((s) => ({ ...s, kind }));
                setShowStep2Errors(false);
              }}
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
              showRequired={showStep2Errors}
            />
          )}
          {step === 3 && (
            <Step3EventsAndTest
              isCustom={state.kind === "custom"}
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
