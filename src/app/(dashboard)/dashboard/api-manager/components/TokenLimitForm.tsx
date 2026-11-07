"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Toggle from "@/shared/components/Toggle";
import Modal from "@/shared/components/Modal";
import type { TokenLimit, UpsertTokenLimitInput } from "@/lib/db/tokenLimits";

interface Props {
  apiKeyId: string;
  limit: TokenLimit | null;
  busy: boolean;
  error: string | null;
  onClose: () => void;
  onSave: (input: UpsertTokenLimitInput) => Promise<boolean>;
}

export default function TokenLimitForm({ apiKeyId, limit, busy, error, onClose, onSave }: Props) {
  const t = useTranslations("tokenLimits");
  const [scopeType, setScopeType] = useState(limit?.scopeType ?? "global");
  const [scopeValue, setScopeValue] = useState(limit?.scopeValue ?? "");
  const [allowance, setAllowance] = useState(String(limit?.tokenLimit ?? 2000000));
  const [interval, setInterval] = useState(limit?.resetInterval ?? "never");
  const [resetTime, setResetTime] = useState(limit?.resetTime ?? "00:00");
  const [enabled, setEnabled] = useState(limit?.enabled ?? true);
  const [validationError, setValidationError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const tokenLimit = Number(allowance);
    if (
      !Number.isSafeInteger(tokenLimit) ||
      tokenLimit <= 0 ||
      (scopeType !== "global" && !scopeValue.trim()) ||
      (interval !== "never" && !/^([01]\d|2[0-3]):[0-5]\d$/.test(resetTime))
    ) {
      setValidationError(t("invalidInput"));
      return;
    }
    setValidationError(null);
    const saved = await onSave({
      ...(limit ? { id: limit.id } : {}),
      apiKeyId,
      scopeType,
      scopeValue: scopeType === "global" ? "" : scopeValue.trim(),
      tokenLimit,
      resetInterval: interval,
      resetTime,
      enabled,
    });
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
          <Input
            label={t("allowance")}
            type="number"
            min={1}
            step={1}
            required
            value={allowance}
            onChange={(event) => setAllowance(event.target.value)}
          />
          <Select
            label={t("scope")}
            value={scopeType}
            disabled={!!limit}
            options={["global", "provider", "model"].map((value) => ({ value, label: t(value) }))}
            onChange={(event) => setScopeType(event.target.value as typeof scopeType)}
          />
          {scopeType !== "global" && (
            <Input
              label={t("scopeValue")}
              hint={t("scopeHint")}
              required
              disabled={!!limit}
              value={scopeValue}
              onChange={(event) => setScopeValue(event.target.value)}
            />
          )}
          <Select
            label={t("renewal")}
            value={interval}
            disabled={!!limit}
            options={["never", "daily", "weekly", "monthly"].map((value) => ({
              value,
              label: t(value),
            }))}
            onChange={(event) => setInterval(event.target.value as typeof interval)}
          />
          {interval !== "never" && (
            <Input
              label={t("resetTime")}
              type="time"
              required
              hint={t("resetHint")}
              value={resetTime}
              onChange={(event) => setResetTime(event.target.value)}
            />
          )}
          <p className="text-xs text-text-muted">
            {t(interval === "never" ? "lifetimeHint" : "periodHint")}
          </p>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm">{t("enabled")}</span>
            <Toggle checked={enabled} onChange={setEnabled} ariaLabel={t("enabled")} />
          </div>
          {(validationError || error) && (
            <p role="alert" className="text-sm text-error">
              {validationError || error}
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
