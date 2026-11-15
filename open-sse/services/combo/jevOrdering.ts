/**
 * Jev ordering module (#15276).
 *
 * One interface: preference-ordered targets, the latest user text, whether a
 * live session pin already owns the conversation, and an `ask` port. The
 * result is the attempt order plus holds and admitted rows safe to record on
 * the decision trace. Probability floors, the admission cap, fail-open, and
 * the choice-option ceiling stay inside. Callers do not learn them.
 */

import type { ResolvedComboTarget } from "./types.ts";
import {
  buildJevCriteria,
  judgeJev,
  type JevCandidate,
  type JevChoiceAnswer,
  type JevHoldReason,
  type JudgeJevResult,
} from "./jevStrategy.ts";
import { TYPESAFE_MAX_CHOICE_OPTIONS, TYPESAFE_MAX_STATE_CHARS } from "../typesafe/systemOne.ts";

export type JevAskResult =
  { ok: true; answer: JevChoiceAnswer } | { ok: false; reason: "missing_api_key" | "unavailable" };

export type JevAsk = (input: {
  state: string;
  criteria: Record<string, string | null>;
}) => Promise<JevAskResult>;

type JevAnswerResolution = { answer: JevChoiceAnswer | null; missingApiKey: boolean };

async function requestJevAnswer(
  candidates: readonly JevCandidate[],
  state: string,
  ask: JevAsk
): Promise<JevAnswerResolution> {
  const uniqueIds = new Set(candidates.map((candidate) => candidate.id));
  if (uniqueIds.size !== candidates.length || candidates.length > TYPESAFE_MAX_CHOICE_OPTIONS) {
    return { answer: null, missingApiKey: false };
  }

  const boundedState =
    state.length > TYPESAFE_MAX_STATE_CHARS ? state.slice(0, TYPESAFE_MAX_STATE_CHARS) : state;
  try {
    const result = await ask({ state: boundedState, criteria: buildJevCriteria(candidates) });
    if (result.ok) return { answer: result.answer, missingApiKey: false };
    const unavailable = result as Extract<JevAskResult, { ok: false }>;
    return { answer: null, missingApiKey: unavailable.reason === "missing_api_key" };
  } catch {
    return { answer: null, missingApiKey: false };
  }
}

export type JevHoldRecord = {
  executionKey: string;
  modelStr: string;
  userRank: number;
  reason: JevHoldReason;
  detail?: string;
};

export type JevAdmittedRecord = {
  executionKey: string;
  modelStr: string;
  userRank: number;
  probability: number | null;
  detail: string;
};

export type JevOrderableTarget = {
  executionKey: string;
  modelStr: string;
  label?: string | null;
};

export type JevOrderOutcome<T extends JevOrderableTarget = ResolvedComboTarget> = {
  targets: T[];
  holds: JevHoldRecord[];
  admitted: JevAdmittedRecord[];
  /**
   * True when this request's head is a Jev verdict or fail-open preference
   * head and later stages must not replace it. The pipeline also protects an
   * already-resolved continuation pin before it reaches this pure orderer.
   */
  protectHead: boolean;
  fellOpen: boolean;
  fallbackReason: "low_confidence" | "jev_unavailable" | null;
  /** True when the ask port reported a missing TypeSafe key. */
  missingApiKey: boolean;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function toUserTextContent(content: unknown): string | null {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return null;
  const text = content
    .filter(
      (part) =>
        isRecord(part) &&
        (part.type === "text" || part.type === "input_text") &&
        typeof part.text === "string"
    )
    .map((part) => (part as Record<string, unknown>).text as string)
    .filter((part) => part.length > 0)
    .join("\n");
  return text.length > 0 ? text : null;
}

/**
 * Latest user text only — never the tool transcript or system prompts.
 * Chat Completions: last `messages` entry with role user.
 * Responses API: last `input` item with role user (not a join of the whole array).
 */
export function extractPromptForJevState(body: Record<string, unknown> | null | undefined): string {
  if (!body || typeof body !== "object") return "";
  const fromMessages = latestUserMessageText(body.messages);
  if (fromMessages !== null) return fromMessages;
  if (typeof body.input === "string") return body.input;
  const fromInput = latestResponsesUserInput(body.input);
  if (fromInput !== null) return fromInput;
  if (typeof body.prompt === "string") return body.prompt;
  return "";
}

function latestUserMessageText(messages: unknown): string | null {
  if (!Array.isArray(messages)) return null;
  for (const message of [...messages].reverse()) {
    if (!isRecord(message) || message.role !== "user") continue;
    const text = toUserTextContent(message.content);
    if (text !== null) return text;
  }
  return null;
}

function latestResponsesUserInput(input: unknown): string | null {
  if (!Array.isArray(input)) return null;
  for (const item of [...input].reverse()) {
    if (!isRecord(item) || item.role !== "user") continue;
    if (typeof item.content === "string" || Array.isArray(item.content)) {
      const text = toUserTextContent(item.content);
      if (text !== null) return text;
    }
    if (typeof item.text === "string" && item.text.length > 0) return item.text;
  }
  return null;
}

export async function orderJevComboTargets<T extends JevOrderableTarget>(
  targets: readonly T[],
  state: string,
  ports: { sessionPinned: boolean; ask: JevAsk }
): Promise<JevOrderOutcome<T>> {
  if (ports.sessionPinned || targets.length <= 1) {
    return {
      targets: [...targets],
      holds: [],
      admitted: [],
      protectHead: false,
      fellOpen: false,
      fallbackReason: null,
      missingApiKey: false,
    };
  }

  const candidates = targets.map((target, index) => ({
    id: `jev-option-${index + 1}`,
    userRank: index,
    label: target.label || target.modelStr,
  }));
  const { answer, missingApiKey } = await requestJevAnswer(candidates, state, ports.ask);

  return toOutcome(
    targets,
    candidates,
    judgeJev(candidates, answer),
    missingApiKey,
    answer?.confidence ?? null
  );
}

function formatAdmittedDetail(
  userRank: number,
  probability: number | null,
  confidence: number | null,
  fellOpen: boolean,
  fallbackReason: JudgeJevResult["fallbackReason"],
  missingApiKey: boolean
): string {
  const parts = [`verdict=admitted`, `rank=${userRank}`];
  if (probability !== null && probability !== undefined) parts.push(`p=${probability}`);
  if (confidence !== null && confidence !== undefined && !fellOpen) {
    parts.push(`c=${confidence}`);
  }
  if (fellOpen && fallbackReason) parts.push(`fallback=${fallbackReason}`);
  if (missingApiKey) parts.push("Jev is not configured");
  return parts.join(" ");
}

function formatHoldDetail(
  userRank: number,
  probability: number | null,
  reason: JevHoldReason
): string {
  const parts = [`verdict=held`, `rank=${userRank}`, `reason=${reason}`];
  if (probability !== null && probability !== undefined) parts.push(`p=${probability}`);
  return parts.join(" ");
}

function toOutcome<T extends JevOrderableTarget>(
  targets: readonly T[],
  candidates: readonly JevCandidate[],
  judged: JudgeJevResult,
  missingApiKey: boolean,
  confidence: number | null
): JevOrderOutcome<T> {
  const byId = new Map(candidates.map((candidate, index) => [candidate.id, targets[index]]));
  const holds: JevHoldRecord[] = [];
  for (const row of judged.held) {
    const target = byId.get(row.id);
    if (!target || !row.reason) continue;
    holds.push({
      executionKey: target.executionKey,
      modelStr: target.modelStr,
      userRank: row.userRank,
      reason: row.reason,
      detail: formatHoldDetail(row.userRank, row.probability, row.reason),
    });
  }
  const admitted: JevAdmittedRecord[] = [];
  for (const row of judged.admitted) {
    const target = byId.get(row.id);
    if (!target) continue;
    admitted.push({
      executionKey: target.executionKey,
      modelStr: target.modelStr,
      userRank: row.userRank,
      probability: row.probability,
      detail: formatAdmittedDetail(
        row.userRank,
        row.probability,
        confidence,
        judged.fellOpen,
        judged.fallbackReason,
        missingApiKey
      ),
    });
  }
  const orderedTargets = judged.admitted
    .map((row) => byId.get(row.id))
    .filter((target): target is T => target !== undefined);
  return {
    targets: orderedTargets,
    holds,
    admitted,
    protectHead: true,
    fellOpen: judged.fellOpen,
    fallbackReason: judged.fallbackReason,
    missingApiKey,
  };
}
