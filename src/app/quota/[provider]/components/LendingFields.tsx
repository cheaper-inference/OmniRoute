"use client";

import { useFormatter, useTranslations } from "next-intl";

import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";

import {
  LENDING_DURATIONS,
  LENDING_UNTIL_FORMAT,
  parseLendingPercent,
  type LendingDeadlineChoice,
  type LendingDeadlineOption,
  type LendingFormValues,
} from "../lib/lendingForm";

interface LendingFieldsProps {
  values: LendingFormValues;
  /** The deadline the `keep` option names, or null when there is none to name. */
  keptUntil: number | null;
  /** The deadline choices. A kept deadline that is no longer in force is listed disabled. */
  options: LendingDeadlineOption[];
  problem: "percent" | "deadline" | null;
  disabled: boolean;
  onChange: (values: LendingFormValues) => void;
}

type Translate = ReturnType<typeof useTranslations>;

function choiceLabel(choice: LendingDeadlineChoice, keptUntil: string, t: Translate): string {
  if (choice === "keep") return t("lendingDeadlineKeep", { until: keptUntil });
  if (choice === "none") return t("lendingDeadlineNone");
  const duration = LENDING_DURATIONS.find((d) => d.choice === choice);
  if (!duration) return choice;
  return duration.unit === "hours"
    ? t("lendingDeadlineHours", { hours: duration.value })
    : t("lendingDeadlineDays", { days: duration.value });
}

/** Only a duration counts from the moment of saving: no hint for `none` or a kept deadline. */
function deadlineHint(idle: boolean, deadline: LendingDeadlineChoice, t: Translate) {
  if (idle) return t("lendingDeadlineIdleHint");
  return deadline === "none" || deadline === "keep" ? undefined : t("lendingDeadlineHint");
}

/** The two fields of the lending form: the percentage and how long the consent lasts. */
export default function LendingFields({
  values,
  keptUntil,
  options,
  problem,
  disabled,
  onChange,
}: LendingFieldsProps) {
  const t = useTranslations("quotaSelf");
  const format = useFormatter();
  const keptLabel =
    keptUntil === null ? "" : format.dateTime(new Date(keptUntil), LENDING_UNTIL_FORMAT);
  const items = options.map((option) => ({
    value: option.choice,
    label: choiceLabel(option.choice, keptLabel, t),
    disabled: option.disabled,
  }));
  // With 0 nothing is lent, so a deadline has nothing to end.
  const idle = parseLendingPercent(values.percent) === 0;

  return (
    <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
      <Input
        name="lendingPercent"
        className="min-w-0"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        maxLength={3}
        label={t("lendingPercentLabel")}
        hint={t("lendingPercentHint")}
        suffix="%"
        error={problem === "percent" ? t("lendingPercentInvalid") : undefined}
        value={values.percent}
        disabled={disabled}
        onChange={(event) => onChange({ ...values, percent: event.target.value })}
      />
      <Select
        native
        name="lendingDeadline"
        className="min-w-0"
        label={t("lendingDeadlineLabel")}
        hint={deadlineHint(idle, values.deadline, t)}
        error={problem === "deadline" ? t("lendingDeadlinePassed") : undefined}
        options={items}
        value={values.deadline}
        disabled={disabled || idle}
        onChange={(event) =>
          onChange({ ...values, deadline: event.target.value as LendingDeadlineChoice })
        }
      />
    </div>
  );
}
