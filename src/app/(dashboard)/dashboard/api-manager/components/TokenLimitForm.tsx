"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Toggle from "@/shared/components/Toggle";
import Modal from "@/shared/components/Modal";
import type {
  TokenLimit,
  TokenLimitResetInterval,
  TokenLimitScopeType,
  UpsertTokenLimitInput,
} from "@/lib/db/tokenLimits";

interface Props {
  apiKeyId: string;
  limit: TokenLimit | null;
  busy: boolean;
  error: string | null;
  onClose: () => void;
  onSave: (input: UpsertTokenLimitInput) => Promise<boolean>;
}

interface TokenLimitDraft {
  scopeType: TokenLimitScopeType;
  scopeValue: string;
  allowance: string;
  interval: TokenLimitResetInterval;
  resetTime: string;
  enabled: boolean;
}

type DraftUpdate = <K extends keyof TokenLimitDraft>(key: K, value: TokenLimitDraft[K]) => void;

const SCOPE_TYPES: TokenLimitScopeType[] = ["global", "provider", "model"];
const RESET_INTERVALS: TokenLimitResetInterval[] = ["never", "daily", "weekly", "monthly"];
const RESET_TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

function initialDraft(limit: TokenLimit | null): TokenLimitDraft {
  return {
    scopeType: limit?.scopeType ?? "global",
    scopeValue: limit?.scopeValue ?? "",
    allowance: String(limit?.tokenLimit ?? 2000000),
    interval: limit?.resetInterval ?? "never",
    resetTime: limit?.resetTime ?? "00:00",
    enabled: limit?.enabled ?? true,
  };
}

function isValidDraft(draft: TokenLimitDraft, tokenLimit: number): boolean {
  if (!Number.isSafeInteger(tokenLimit) || tokenLimit <= 0) return false;
  if (draft.scopeType !== "global" && !draft.scopeValue.trim()) return false;
  return draft.interval === "never" || RESET_TIME_PATTERN.test(draft.resetTime);
}

function toUpsertInput(
  apiKeyId: string,
  limit: TokenLimit | null,
  draft: TokenLimitDraft,
  tokenLimit: number
): UpsertTokenLimitInput {
  return {
    ...(limit ? { id: limit.id } : {}),
    apiKeyId,
    scopeType: draft.scopeType,
    scopeValue: draft.scopeType === "global" ? "" : draft.scopeValue.trim(),
    tokenLimit,
    resetInterval: draft.interval,
    resetTime: draft.resetTime,
    enabled: draft.enabled,
  };
}

function TokenLimitFields({
  draft,
  update,
  locked,
}: {
  draft: TokenLimitDraft;
  update: DraftUpdate;
  locked: boolean;
}) {
  const t = useTranslations("tokenLimits");
  return (
    <>
      <Input
        label={t("allowance")}
        type="number"
        min={1}
        step={1}
        required
        value={draft.allowance}
        onChange={(event) => update("allowance", event.target.value)}
      />
      <Select
        label={t("scope")}
        value={draft.scopeType}
        disabled={locked}
        options={SCOPE_TYPES.map((value) => ({ value, label: t(value) }))}
        onChange={(event) => update("scopeType", event.target.value as TokenLimitScopeType)}
      />
      {draft.scopeType !== "global" && (
        <Input
          label={t("scopeValue")}
          hint={t("scopeHint")}
          required
          disabled={locked}
          value={draft.scopeValue}
          onChange={(event) => update("scopeValue", event.target.value)}
        />
      )}
      <Select
        label={t("renewal")}
        value={draft.interval}
        disabled={locked}
        options={RESET_INTERVALS.map((value) => ({ value, label: t(value) }))}
        onChange={(event) => update("interval", event.target.value as TokenLimitResetInterval)}
      />
      {draft.interval !== "never" && (
        <Input
          label={t("resetTime")}
          type="time"
          required
          hint={t("resetHint")}
          value={draft.resetTime}
          onChange={(event) => update("resetTime", event.target.value)}
        />
      )}
      <p className="text-xs text-text-muted">
        {t(draft.interval === "never" ? "lifetimeHint" : "periodHint")}
      </p>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm">{t("enabled")}</span>
        <Toggle
          checked={draft.enabled}
          onChange={(value: boolean) => update("enabled", value)}
          ariaLabel={t("enabled")}
        />
      </div>
    </>
  );
}

export default function TokenLimitForm({ apiKeyId, limit, busy, error, onClose, onSave }: Props) {
  const t = useTranslations("tokenLimits");
  const [draft, setDraft] = useState<TokenLimitDraft>(() => initialDraft(limit));
  const [validationError, setValidationError] = useState<string | null>(null);
  const update: DraftUpdate = (key, value) => setDraft((prev) => ({ ...prev, [key]: value }));
  const message = validationError || error;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const tokenLimit = Number(draft.allowance);
    if (!isValidDraft(draft, tokenLimit)) {
      setValidationError(t("invalidInput"));
      return;
    }
    setValidationError(null);
    const saved = await onSave(toUpsertInput(apiKeyId, limit, draft, tokenLimit));
    if (saved) onClose();
  };

  return (
    <Modal
      isOpen
      onClose={() => {
        if (!busy) onClose();
      }}
      title={t(limit ? "edit" : "add")}
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <fieldset disabled={busy} className="m-0 min-w-0 border-0 p-0 flex flex-col gap-4">
          <TokenLimitFields draft={draft} update={update} locked={!!limit} />
          {message && (
            <p role="alert" className="text-sm text-error">
              {message}
            </p>
          )}
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              {t("cancel")}
            </Button>
            <Button type="submit" loading={busy}>
              {t("save")}
            </Button>
          </div>
        </fieldset>
      </form>
    </Modal>
  );
}
