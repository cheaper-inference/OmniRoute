"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

import Button from "@/shared/components/Button";

import {
  buildLendingSubmission,
  lendingBaseline,
  lendingChoices,
  lendingIsDirty,
  type LendingFormValues,
  type LendingStatus,
} from "../lib/lendingForm";
import type { LendingActions } from "../lib/useLendingSave";
import { useLendingSubmit, type LendingSaveWatch } from "../lib/useLendingSubmit";
import LendingFields from "./LendingFields";
import LendingMessage from "./LendingMessage";

interface LendingFormProps {
  /** The pool's opaque reference, the only pool name the request carries. */
  poolRef: string;
  status: LendingStatus;
  lending: LendingActions;
  watch: LendingSaveWatch;
  /** The saved view needs another card: show only the message, no fields and no button. */
  settled?: boolean;
}

const FIELD_NAME = { percent: "lendingPercent", deadline: "lendingDeadline" } as const;

/** What the form shows: the draft, or what is in force when nothing was edited. */
function formValues(draft: LendingFormValues | null, status: LendingStatus): LendingFormValues {
  const baseline = lendingBaseline(status);
  if (!draft) return baseline;
  // A choice the current state no longer offers (a deadline that ended) falls back.
  const offered = lendingChoices(status).includes(draft.deadline);
  return offered ? draft : { ...draft, deadline: baseline.deadline };
}

/**
 * The lending form. Nothing is sent until Save is pressed, one save at a time. A failed save
 * keeps the values as typed. The instant of a deadline is read from the clock when Save is
 * pressed, never while rendering.
 */
export default function LendingForm({
  poolRef,
  status,
  lending,
  watch,
  settled = false,
}: LendingFormProps) {
  const t = useTranslations("quotaSelf");
  const [draft, setDraft] = useState<LendingFormValues | null>(null);
  const [problem, setProblem] = useState<"percent" | "deadline" | null>(null);
  const { notice, clearNotice, saving, busy, send, messageRef } = useLendingSubmit(lending, watch);
  const values = formValues(draft, status);
  const dirty = lendingIsDirty(values, status);

  const edit = (next: LendingFormValues) => {
    setDraft(next);
    setProblem(null);
    clearNotice();
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy() || !dirty) return;
    const form = event.currentTarget;
    const built = buildLendingSubmission(values, status, Date.now());
    // `in` narrows the union with or without strictNullChecks.
    if ("problem" in built) {
      setProblem(built.problem);
      const field = form.elements.namedItem(FIELD_NAME[built.problem]);
      if (field instanceof HTMLElement) field.focus();
      return;
    }
    const { lendingPercent, lendingUntil } = built;
    const saved = await send({ pool: poolRef, lendingPercent, lendingUntil });
    if (saved) setDraft(null);
  };

  return (
    <form
      className="min-w-0 space-y-3"
      noValidate
      aria-busy={saving}
      onSubmit={(event) => void submit(event)}
    >
      {settled ? null : (
        <>
          <LendingFields
            values={values}
            status={status}
            problem={problem}
            disabled={saving}
            onChange={edit}
          />
          <Button type="submit" disabled={!dirty || saving} loading={saving}>
            {t("lendingSave")}
          </Button>
        </>
      )}
      <LendingMessage notice={notice} onReload={lending.reload} ref={messageRef} />
    </form>
  );
}
