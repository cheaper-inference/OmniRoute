/**
 * #15289 — actionable terminal response when the shared combo attempt budget is
 * spent mostly on context-window rejections.
 *
 * In a heterogeneous pool a context_length_exceeded 400 deliberately falls
 * through to the next target (a sibling may have a larger window). When the
 * prompt is simply too large for most of the pool, that burns the whole budget
 * and the client only saw the opaque "Maximum combo retry limit reached".
 */
import { errorResponseWithComboDiagnostics } from "../../utils/error.ts";
import type { ComboDiagnostics } from "../../utils/error.ts";
import { isContextOverflow400 } from "./comboPredicates.ts";
import { buildComboDiag } from "./executeTargetClassify.ts";
import type { AttemptLoopState } from "./attemptLoopTypes.ts";

export const CONTEXT_OVERFLOW_BUDGET_MESSAGE =
  "The request exceeds the context window of the available combo candidates. Reduce the conversation size (condense or start a new task) and retry.";

interface BudgetErrorEntry {
  status?: number;
  error?: string;
}

/** Runtime-unit loops do not otherwise retain error text for terminal diagnostics. */
export async function readBudgetFailure(response: Response): Promise<BudgetErrorEntry> {
  let error = "";
  if (response.status === 400 || response.status === 413) {
    try {
      error = await response.clone().text();
    } catch {
      // An unreadable body is not proof of context overflow.
    }
  }
  return { status: response.status, error };
}

// Claude Code compacts only on this wording and reads both counts from it. The final token-budget
// gate writes it on the Claude wire; keep it when it is the last rejection (it may sit inside a
// raw JSON error body).
const CLAUDE_PROMPT_TOO_LONG = /prompt is too long: (\d+) tokens > (\d+) maximum/i;

export function buildContextBudgetResponse(
  lastError: string | null | undefined,
  errors: ReadonlyArray<BudgetErrorEntry>,
  diagnostics: ComboDiagnostics
): Response {
  if (isContextOverflowDominant(lastError, errors)) {
    const claude = CLAUDE_PROMPT_TOO_LONG.exec(String(lastError || ""));
    const message = claude
      ? `prompt is too long: ${claude[1]} tokens > ${claude[2]} maximum`
      : CONTEXT_OVERFLOW_BUDGET_MESSAGE;
    return errorResponseWithComboDiagnostics(400, message, diagnostics, {
      code: "context_length_exceeded",
      type: "invalid_request_error",
    });
  }
  return errorResponseWithComboDiagnostics(503, "Maximum combo retry limit reached", diagnostics);
}

/** True when the last failure and at least half of the recorded failures were context overflows. */
export function isContextOverflowDominant(
  lastError: string | null | undefined,
  comboErrors: ReadonlyArray<BudgetErrorEntry> | null | undefined
): boolean {
  if (!isContextOverflow400(lastError)) return false;
  const entries = comboErrors ?? [];
  if (entries.length === 0) return true;
  const overflowCount = entries.filter(
    (e) => (e.status === 400 || e.status === 413) && isContextOverflow400(e.error)
  ).length;
  return overflowCount * 2 >= entries.length;
}

const REASONING_EXHAUSTED_MESSAGE =
  "All combo candidates exhausted their token budget on reasoning without producing content. Increase max_tokens — reasoning models need a larger budget to emit content.";

/**
 * Terminal response when the shared attempt budget is spent. If the dominant
 * cause was reasoning models exhausting a too-small max_tokens budget, or an
 * oversized prompt (#15289), retrying more models cannot help — say so.
 */
export function buildBudgetExhaustedResponse(
  state: AttemptLoopState,
  traceInvocationId: string
): Response {
  const reasoningExhausted = /reasoning consumed \d+\/\d+ tokens/.test(state.lastError || "");
  const failureReason = reasoningExhausted ? "reasoning_budget_exhausted" : "max_attempts_exceeded";
  const diag = buildComboDiag(state, traceInvocationId, failureReason);
  if (!reasoningExhausted) {
    return buildContextBudgetResponse(state.lastError, state.comboErrors, diag);
  }
  return errorResponseWithComboDiagnostics(503, REASONING_EXHAUSTED_MESSAGE, diag);
}
