"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Modal from "@/shared/components/Modal";
import type { Team } from "./helpers";
export interface TeamPayload {
  name: string;
  description: string;
  maxBudgetUsd: number | null;
  budgetDuration: "1d" | "7d" | "30d" | null;
}
type Duration = "1d" | "7d" | "30d";

/** Returns the i18n key of the first problem, or "" when the form is valid. */
function validateTeamForm(fields: {
  name: string;
  description: string;
  enabled: boolean;
  amount: string;
}): string {
  const name = fields.name.trim();
  if (!name || name.length > 200 || fields.description.length > 2000) return "invalidName";
  const amount = Number(fields.amount);
  if (fields.enabled && (!Number.isFinite(amount) || amount <= 0)) return "invalidAmount";
  return "";
}

function BudgetFields({
  enabled,
  amount,
  duration,
  pending,
  onEnabled,
  onAmount,
  onDuration,
}: {
  enabled: boolean;
  amount: string;
  duration: Duration;
  pending: boolean;
  onEnabled: (value: boolean) => void;
  onAmount: (value: string) => void;
  onDuration: (value: Duration) => void;
}) {
  const t = useTranslations("teamCosts");
  return (
    <>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={enabled} onChange={(e) => onEnabled(e.target.checked)} />
        {t("enableBudget")}
      </label>
      <div
        className={`grid motion-safe:transition-[grid-template-rows] motion-safe:duration-200 ${enabled ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        aria-hidden={!enabled}
      >
        <div className="overflow-hidden">
          <fieldset disabled={!enabled || pending} className="space-y-3">
            <Input
              label={t("amount")}
              type="number"
              step="any"
              value={amount}
              onChange={(e) => onAmount(e.target.value)}
            />
            <label className="block text-sm">
              {t("duration")}
              <select
                aria-label={t("duration")}
                className="ml-3 rounded-control border border-border bg-bg p-2"
                value={duration}
                onChange={(e) => onDuration(e.target.value as Duration)}
              >
                <option value="1d">{t("day1")}</option>
                <option value="7d">{t("day7")}</option>
                <option value="30d">{t("day30")}</option>
              </select>
            </label>
          </fieldset>
        </div>
      </div>
    </>
  );
}

function ProfileFields({
  name,
  description,
  onName,
  onDescription,
}: {
  name: string;
  description: string;
  onName: (value: string) => void;
  onDescription: (value: string) => void;
}) {
  const t = useTranslations("teamCosts");
  return (
    <>
      <Input
        label={t("name")}
        value={name}
        onChange={(e) => onName(e.target.value)}
        required
        maxLength={200}
      />
      <label className="block text-sm">
        {t("description")}
        <textarea
          className="mt-2 w-full rounded-control border border-border bg-bg p-3 text-text-main"
          value={description}
          maxLength={2000}
          onChange={(e) => onDescription(e.target.value)}
        />
      </label>
    </>
  );
}

function FormFooter({
  problem,
  pending,
  onClose,
}: {
  problem: string;
  pending: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("teamCosts");
  return (
    <>
      {problem && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {t(problem)}
        </p>
      )}
      <div className="flex justify-end gap-2">
        <Button variant="ghost" disabled={pending} onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button type="submit" loading={pending}>
          {t("save")}
        </Button>
      </div>
    </>
  );
}

export default function TeamForm({
  team,
  pending,
  error,
  onClose,
  onSave,
}: {
  team: Team | null;
  pending: boolean;
  error: string;
  onClose: () => void;
  onSave: (payload: TeamPayload) => Promise<void>;
}) {
  const t = useTranslations("teamCosts");
  const [name, setName] = useState(team?.name ?? "");
  const [description, setDescription] = useState(team?.description ?? "");
  const [enabled, setEnabled] = useState(team?.maxBudgetUsd != null);
  const [amount, setAmount] = useState(team?.maxBudgetUsd?.toString() ?? "");
  const [duration, setDuration] = useState<Duration>(team?.budgetDuration ?? "30d");
  const [validation, setValidation] = useState("");
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (pending) return;
    const problem = validateTeamForm({ name, description, enabled, amount });
    if (problem) {
      setValidation(problem);
      return;
    }
    setValidation("");
    await onSave({
      name: name.trim(),
      description: description.trim(),
      maxBudgetUsd: enabled ? Number(amount) : null,
      budgetDuration: enabled ? duration : null,
    });
  }
  return (
    <Modal
      isOpen
      title={t(team ? "edit" : "create")}
      onClose={() => {
        if (!pending) onClose();
      }}
      closeOnOverlay={!pending}
      showCloseButton={!pending}
    >
      <form onSubmit={(event) => void submit(event)} noValidate className="space-y-4">
        <fieldset disabled={pending} className="space-y-4">
          <ProfileFields
            name={name}
            description={description}
            onName={setName}
            onDescription={setDescription}
          />
          <BudgetFields
            enabled={enabled}
            amount={amount}
            duration={duration}
            pending={pending}
            onEnabled={setEnabled}
            onAmount={setAmount}
            onDuration={setDuration}
          />
        </fieldset>
        <FormFooter problem={validation || error} pending={pending} onClose={onClose} />
      </form>
    </Modal>
  );
}
