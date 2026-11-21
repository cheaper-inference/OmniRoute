/**
 * `combo-model` decider: one of the operator's own provider models answers the routing
 * question in process, through the combo's `handleSingleModel` — the way the fusion judge
 * runs (fusion.ts). Prompt and parser are the OpenAI-chat decision wire (#15641).
 *
 * Guards: a combo reference (`auto`, `auto/*`, a configured combo name, or any id without a
 * provider prefix) is refused; the call is non-streaming, tool-free, temperature 0 with a small
 * output budget and none of the client's system prompt, tools or history; it runs inside the
 * decision scope, so a decision started from within it is refused (depth guard); one timeout
 * aborts it through the target's `modelAbortSignal`.
 */
import { extractPanelText } from "../fusion.ts";
import type { ComboCollectionLike, HandleSingleModel } from "../combo/types.ts";
import {
  clampDecisionTimeout,
  DEFAULT_DECISION_TIMEOUT_MS,
  MAX_DECISION_TIMEOUT_MS,
} from "./config.ts";
import { decisionDepth, runInDecisionScope } from "./scope.ts";
import { readBoundedJson } from "./transport.ts";
import {
  decisionFailure,
  type Decider,
  type DecisionChoiceRequest,
  type DecisionFailureReason,
} from "./types.ts";
import {
  DECISION_MAX_OUTPUT_TOKENS,
  OPENAI_DECISION_SYSTEM_PROMPT,
  buildOpenAiDecisionMessages,
  parseDecisionAnswerText,
  toDecisionChoiceResult,
} from "./wires.ts";

export interface ComboModelDeciderOptions {
  /** `provider/model` of one of the operator's models. */
  model?: string;
  timeoutMs?: number;
  /** The combo's `handleSingleModel`; absent outside a live request (e.g. the preview). */
  dispatch?: HandleSingleModel;
  allCombos?: ComboCollectionLike;
  /** The client's request body: only its shape (messages / input / contents) is reused. */
  clientBody?: Record<string, unknown> | null;
  now?: () => number;
}

function comboNames(allCombos: ComboCollectionLike): Set<string> {
  const list = Array.isArray(allCombos)
    ? allCombos
    : Array.isArray(allCombos?.combos)
      ? allCombos.combos
      : [];
  return new Set(
    list
      .map((combo) => (combo as { name?: unknown } | null)?.name)
      .filter((name): name is string => typeof name === "string" && name.length > 0)
  );
}

/** True when `model` would route through a combo instead of one provider model. */
export function isDecisionComboRef(model: string, allCombos: ComboCollectionLike): boolean {
  const id = model.trim();
  if (id === "auto" || id.startsWith("auto/") || !id.includes("/")) return true;
  return comboNames(allCombos).has(id);
}

/** Decision body in the client's own wire shape, so the dispatcher translates it as usual. */
function buildBody(model: string, request: DecisionChoiceRequest, clientBody: unknown) {
  const [, user] = buildOpenAiDecisionMessages(request);
  // One user turn carries the instructions: valid for OpenAI, Claude and Gemini alike.
  const text = `${OPENAI_DECISION_SYSTEM_PROMPT}\n\n${user.content}`;
  const shape = (clientBody ?? {}) as { input?: unknown; contents?: unknown; messages?: unknown };
  const common = { model, stream: false, temperature: 0 };
  if (!Array.isArray(shape.messages) && shape.input !== undefined) {
    return {
      ...common,
      max_output_tokens: DECISION_MAX_OUTPUT_TOKENS,
      input: [{ role: "user", content: text }],
    };
  }
  if (!Array.isArray(shape.messages) && Array.isArray(shape.contents)) {
    return {
      ...common,
      generationConfig: { temperature: 0, maxOutputTokens: DECISION_MAX_OUTPUT_TOKENS },
      contents: [{ role: "user", parts: [{ text }] }],
    };
  }
  return {
    ...common,
    max_tokens: DECISION_MAX_OUTPUT_TOKENS,
    messages: [{ role: "user", content: text }],
  };
}

/** Why the in-process call must not run, or `null` when it may. */
function preconditionFailure(
  options: ComboModelDeciderOptions,
  model: string | undefined,
  request: DecisionChoiceRequest
): DecisionFailureReason | null {
  if (!model || !options.dispatch) return "not_configured";
  if (isDecisionComboRef(model, options.allCombos)) return "recursion";
  if (decisionDepth() > 0) return "recursion";
  if (request.signal?.aborted) return "timeout";
  return null;
}

type DispatchOutcome = { status: number } | { json: unknown };

/** Dispatch inside the decision scope; non-2xx keeps the status only, the body is never read. */
function dispatchInScope(
  dispatch: HandleSingleModel,
  model: string,
  body: Record<string, unknown>,
  signal: AbortSignal
): Promise<DispatchOutcome> {
  return runInDecisionScope(async () => {
    const response = await dispatch(body, model, { modelAbortSignal: signal });
    if (!response.ok) {
      await response.body?.cancel().catch(() => {});
      return { status: response.status };
    }
    return { json: await readBoundedJson(response) };
  });
}

export function createComboModelDecider(options: ComboModelDeciderOptions): Decider {
  const now = options.now ?? Date.now;
  const clamped = clampDecisionTimeout(options.timeoutMs);
  // Explicit upper bound at the timer site (the clamp above already enforces it).
  const timeoutMs =
    clamped > 0 && clamped <= MAX_DECISION_TIMEOUT_MS ? clamped : DEFAULT_DECISION_TIMEOUT_MS;

  return async (request) => {
    const model = options.model?.trim();
    const blocked = preconditionFailure(options, model, request);
    if (blocked) return decisionFailure(blocked);

    const controller = new AbortController();
    const onCallerAbort = () => controller.abort();
    request.signal?.addEventListener("abort", onCallerAbort, { once: true });
    const startedAt = now();
    const elapsed = () => Math.max(0, now() - startedAt);
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timedOut = new Promise<"timeout">((resolve) => {
      timer = setTimeout(() => {
        controller.abort();
        resolve("timeout");
      }, timeoutMs);
    });
    const body = buildBody(model as string, request, options.clientBody);
    const call = dispatchInScope(
      options.dispatch as HandleSingleModel,
      model as string,
      body,
      controller.signal
    );
    call.catch(() => {});

    try {
      const outcome = await Promise.race([call, timedOut]);
      if (outcome === "timeout" || controller.signal.aborted) {
        return decisionFailure("timeout", { latencyMs: elapsed() });
      }
      if ("status" in outcome) {
        return decisionFailure("http_error", { status: outcome.status, latencyMs: elapsed() });
      }
      const json = outcome.json as { model?: unknown } | null;
      const answer = parseDecisionAnswerText(extractPanelText(json), json?.model ?? model);
      return toDecisionChoiceResult(answer, request, elapsed());
    } catch {
      return decisionFailure(controller.signal.aborted ? "timeout" : "invalid_response", {
        latencyMs: elapsed(),
      });
    } finally {
      clearTimeout(timer);
      request.signal?.removeEventListener("abort", onCallerAbort);
    }
  };
}
