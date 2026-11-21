/**
 * Pure rules of the lending card on the self-service quota page. What is in force comes from the
 * view (`lendingActive` is computed by the server), and the instant of a save is an argument, so
 * nothing here reads the browser clock. The checks mirror the PATCH body schema.
 */

import type { DateTimeFormatOptions } from "next-intl";

import type { QuotaUnit, QuotaWindow } from "@/lib/quota/dimensions";
import {
  checkLendingDeadline,
  LENDING_UNTIL_MAX_MS,
  type SelfQuotaPool,
} from "@/shared/schemas/selfQuota";

import type { SelfServiceWriteFailure } from "./selfServiceClient";

export type LendingDeadlineChoice = "none" | "keep" | "1h" | "8h" | "24h" | "7d" | "30d";

type LendingDuration = {
  choice: Exclude<LendingDeadlineChoice, "none" | "keep">;
  unit: "hours" | "days";
  value: number;
  ms: number;
};

const HOUR_MS = 3_600_000;
const DAY_MS = 24 * HOUR_MS;

function hours(value: number, choice: LendingDuration["choice"]): LendingDuration {
  return { choice, unit: "hours", value, ms: value * HOUR_MS };
}

function days(value: number, choice: LendingDuration["choice"]): LendingDuration {
  return { choice, unit: "days", value, ms: value * DAY_MS };
}

/** Durations counted from the moment of saving: "7 days" is 168 elapsed hours. */
export const LENDING_DURATIONS: ReadonlyArray<LendingDuration> = Object.freeze([
  hours(1, "1h"),
  hours(8, "8h"),
  hours(24, "24h"),
  days(7, "7d"),
  days(30, "30d"),
]);

/** A stored deadline, for `useFormatter().dateTime`, with the time zone named. */
export const LENDING_UNTIL_FORMAT: DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
};

export type LendingStatus =
  | { kind: "off" }
  | { kind: "active"; percent: number; until: number | null }
  | { kind: "ended"; percent: number; until: number };

export interface LendingFormValues {
  percent: string;
  deadline: LendingDeadlineChoice;
}

type LendingSubmission =
  | { ok: true; lendingPercent: number; lendingUntil: number | null }
  | { ok: false; problem: "percent" | "deadline" };

type LendingBorrowRows =
  | { kind: "none" }
  | { kind: "not-applicable" }
  | { kind: "rows"; rows: Array<{ window: QuotaWindow; unit: QuotaUnit; amount: number | null }> };

export type LendingCardKind = "full" | "withdraw" | "none";

export type LendingNotice =
  | { kind: "saved" }
  | { kind: "error"; error: SelfServiceWriteFailure; retryAfterSeconds: number | null };

type LendingPool = Pick<SelfQuotaPool, "lendingPercent" | "lendingUntil" | "lendingActive">;

/**
 * Which card a pool gets. A consent pool gets the full form. Any pool may still withdraw, so a
 * pool that does not lend by consent but stores a percentage above 0 gets a withdrawal only.
 */
export function lendingCardKind(
  pool: Pick<SelfQuotaPool, "borrowMode" | "lendingPercent">
): LendingCardKind {
  if (pool.borrowMode === "consent") return "full";
  return pool.lendingPercent > 0 ? "withdraw" : "none";
}

/**
 * What is in force in a consent pool, from the server's `lendingActive`. A percentage above 0
 * that is not active and has a deadline is a consent that ended.
 */
export function describeLending(pool: LendingPool): LendingStatus {
  const { lendingPercent: percent, lendingUntil: until } = pool;
  if (percent <= 0) return { kind: "off" };
  if (pool.lendingActive) return { kind: "active", percent, until };
  return until === null ? { kind: "off" } : { kind: "ended", percent, until };
}

/** The form starts from what is in force. A stored deadline always starts on `keep`. */
export function lendingBaseline(status: LendingStatus): LendingFormValues {
  if (status.kind !== "active") return { percent: "0", deadline: "none" };
  return { percent: String(status.percent), deadline: status.until === null ? "none" : "keep" };
}

/** `keep` is offered only while a deadline is in force. */
export function lendingChoices(status: LendingStatus): LendingDeadlineChoice[] {
  const choices: LendingDeadlineChoice[] = ["none", ...LENDING_DURATIONS.map((d) => d.choice)];
  return keptDeadline(status) === null ? choices : ["keep", ...choices];
}

/** What the holder edited, with the deadline that `keep` named when one was last in force. */
export interface LendingDraft {
  values: LendingFormValues;
  keptUntil: number | null;
}

export interface LendingDeadlineOption {
  choice: LendingDeadlineChoice;
  disabled: boolean;
}

interface LendingFormView {
  values: LendingFormValues;
  /** The deadline the `keep` option names, or null when there is none to name. */
  keptUntil: number | null;
  options: LendingDeadlineOption[];
}

/** The draft after an edit. It remembers the kept deadline once it is no longer in force. */
export function lendingDraft(
  values: LendingFormValues,
  status: LendingStatus,
  previous: LendingDraft | null
): LendingDraft {
  return { values, keptUntil: keptDeadline(status) ?? previous?.keptUntil ?? null };
}

/**
 * What the form shows: the draft, or what is in force when nothing was edited. A draft keeps its
 * deadline choice even when the state no longer offers it. That choice is then listed disabled,
 * so the select shows it, and Save reports a deadline problem instead of sending another deadline.
 */
export function lendingFormView(
  draft: LendingDraft | null,
  status: LendingStatus
): LendingFormView {
  const values = draft ? draft.values : lendingBaseline(status);
  const offered = lendingChoices(status).map((choice) => ({ choice, disabled: false }));
  const listed = offered.some((option) => option.choice === values.deadline);
  return {
    values,
    keptUntil: keptDeadline(status) ?? draft?.keptUntil ?? null,
    options: listed ? offered : [{ choice: values.deadline, disabled: true }, ...offered],
  };
}

/** A whole number from 0 to 100, written with digits only. */
export function parseLendingPercent(raw: string): number | null {
  if (!/^[0-9]{1,3}$/.test(raw)) return null;
  const value = Number(raw);
  return value <= 100 ? value : null;
}

function keptDeadline(status: LendingStatus): number | null {
  return status.kind === "active" ? status.until : null;
}

function percentInForce(status: LendingStatus): number {
  return status.kind === "active" ? status.percent : 0;
}

/**
 * True when saving would change what is in force. Two zeros are equal whatever the deadline. A
 * percentage that does not parse counts as a change, so Save stays reachable and shows the error.
 */
export function lendingIsDirty(values: LendingFormValues, status: LendingStatus): boolean {
  const percent = parseLendingPercent(values.percent);
  if (percent === null || percent !== percentInForce(status)) return true;
  if (percent === 0) return false;
  const kept = keptDeadline(status);
  return values.deadline !== (kept === null ? "none" : "keep");
}

function acceptedDeadline(until: number, nowMs: number): boolean {
  return (
    Number.isSafeInteger(until) &&
    checkLendingDeadline(until, nowMs) === "ok" &&
    until <= LENDING_UNTIL_MAX_MS
  );
}

function deadlineFor(
  choice: LendingDeadlineChoice,
  status: LendingStatus,
  nowMs: number
): number | null {
  if (choice === "keep") return keptDeadline(status);
  const duration = LENDING_DURATIONS.find((d) => d.choice === choice);
  return duration ? nowMs + duration.ms : null;
}

/**
 * The PATCH fields for these values, with `nowMs` the instant of the save. A percentage of 0
 * sends no deadline. `keep` without a deadline in force, or an instant the schema refuses, is a
 * deadline problem.
 */
export function buildLendingSubmission(
  values: LendingFormValues,
  status: LendingStatus,
  nowMs: number
): LendingSubmission {
  const percent = parseLendingPercent(values.percent);
  if (percent === null) return { ok: false, problem: "percent" };
  if (percent === 0 || values.deadline === "none") {
    return { ok: true, lendingPercent: percent, lendingUntil: null };
  }
  const until = deadlineFor(values.deadline, status, nowMs);
  if (until === null || !acceptedDeadline(until, nowMs)) return { ok: false, problem: "deadline" };
  return { ok: true, lendingPercent: percent, lendingUntil: until };
}

function borrowFigure(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}

/**
 * What other keys lend to this key now. A soft or burst key is not limited by it, so no figure
 * applies. A hard key gets one row per pool dimension, and a missing figure stays null.
 */
export function lendingBorrowRows(
  pool: Pick<SelfQuotaPool, "policy" | "dimensions">
): LendingBorrowRows {
  if (pool.policy !== "hard") return { kind: "not-applicable" };
  if (pool.dimensions.length === 0) return { kind: "none" };
  const rows = pool.dimensions.map((dimension) => ({
    window: dimension.window,
    unit: dimension.unit,
    amount: borrowFigure(dimension.yourShare.borrowAvailable),
  }));
  return { kind: "rows", rows };
}

const ERROR_TEXT: Readonly<
  Record<Exclude<SelfServiceWriteFailure, "rate-limited">, { key: string; reload: boolean }>
> = {
  unauthorized: { key: "lendingErrorKey", reload: false },
  forbidden: { key: "lendingErrorClosed", reload: true },
  "not-found": { key: "lendingErrorGone", reload: true },
  rejected: { key: "lendingErrorRejected", reload: false },
  server: { key: "lendingErrorServer", reload: false },
  network: { key: "lendingErrorNetwork", reload: false },
  "invalid-response": { key: "lendingErrorUnreadable", reload: false },
};

/** The catalog key of a failed save, and whether the card offers a reload. */
export function lendingErrorText(
  error: SelfServiceWriteFailure,
  retryAfterSeconds: number | null
): { key: string; values?: { seconds: number }; reload: boolean } {
  if (error !== "rate-limited") return { ...ERROR_TEXT[error] };
  if (retryAfterSeconds !== null && retryAfterSeconds >= 1) {
    return {
      key: "lendingErrorRateLimited",
      values: { seconds: retryAfterSeconds },
      reload: false,
    };
  }
  return { key: "lendingErrorRateLimitedUnknown", reload: false };
}
