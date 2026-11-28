/**
 * Attempt-side wiring of the reasoning holdback.
 *
 * `executeTargetAttempt` dispatches through `dispatchHeldReasoning`. Unless the holdback applies
 * to this attempt, that is exactly the plain `handleSingleModelWithTimeout` call it replaced.
 * When it applies, the call asks the target runner to hold the stream back while it carries
 * only reasoning, and the checkpoint a previous attempt left on the loop state is offered to
 * this one.
 *
 * The holdback applies only when all of these hold: the operator turned on
 * `COMBO_REASONING_HOLDBACK_ENABLED`; this combo's own config sets
 * `retainReasoningBeforeAnswer: true` (global combo defaults never grant it); the client asked
 * for a stream; the request is a plain single-choice Chat Completions history of text (no
 * tools, tool results, media, bound session or pinned model); dispatch is sequential (no
 * hedging, no protected priority target).
 */
import { isRegisteredFeatureFlagEnabled } from "../../utils/registeredFeatureFlag.ts";
import { parseModel } from "../model.ts";
import { getStrategyTraits } from "./strategyRegistry.ts";
import type { AttemptLoopDeps, ExecuteTargetAttemptOptions } from "./attemptLoopTypes.ts";
import {
  REASONING_HOLDBACK_MAX_BYTES,
  makeCheckpointRequest,
  readReasoningCheckpoint,
} from "./reasoningCheckpoint.ts";
import { markUpstreamOnlyBody } from "./requestPersistence.ts";
import type { SingleModelTarget } from "./types.ts";

export const COMBO_REASONING_HOLDBACK_FLAG = "COMBO_REASONING_HOLDBACK_ENABLED";

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function isPlainTextContent(content: unknown): boolean {
  if (typeof content === "string") return true;
  return (
    Array.isArray(content) &&
    content.every((part) => isRecord(part) && part.type === "text" && typeof part.text === "string")
  );
}

const PLAIN_TEXT_ROLES = new Set(["system", "developer", "user", "assistant"]);
const MESSAGE_KEYS_THAT_ARE_NOT_TEXT = ["tool_calls", "function_call", "audio", "refusal"] as const;

function isPlainTextMessage(message: unknown): boolean {
  if (!isRecord(message) || typeof message.role !== "string") return false;
  if (!PLAIN_TEXT_ROLES.has(message.role) || !isPlainTextContent(message.content)) return false;
  return MESSAGE_KEYS_THAT_ARE_NOT_TEXT.every((key) => message[key] == null);
}

/** True when the request carries no way for the model to call a tool. */
function hasNoToolSurface(body: JsonRecord): boolean {
  for (const key of ["tools", "functions"] as const) {
    const value = body[key];
    if (Array.isArray(value) ? value.length > 0 : value != null) return false;
  }
  return ["tool_choice", "function_call"].every((key) => body[key] == null || body[key] === "none");
}

function isSingleChoiceTextRequest(body: JsonRecord): boolean {
  if (body.input !== undefined || body.previous_response_id !== undefined) return false;
  if (body.n !== undefined && body.n !== 1) return false;
  return body.audio == null && !(Array.isArray(body.modalities) && body.modalities.length > 1);
}

/** A single-choice Chat Completions request whose history is plain text and that cannot call tools. */
export function isPlainChatCompletionsText(body: JsonRecord): boolean {
  if (!Array.isArray(body.messages) || body.messages.length === 0) return false;
  if (!isSingleChoiceTextRequest(body) || !hasNoToolSurface(body)) return false;
  return body.messages.every(isPlainTextMessage);
}

type HoldbackDeps = Pick<
  AttemptLoopDeps,
  | "combo"
  | "config"
  | "clientRequestedStream"
  | "effectiveSessionId"
  | "sticky"
  | "strategy"
  | "sourceFormat"
>;

function sequentialDispatch(deps: HoldbackDeps): boolean {
  const hedging = deps.config.zeroLatencyOptimizationsEnabled === true && deps.config.hedging;
  return !hedging && !getStrategyTraits(deps.strategy).contextRelay;
}

function listedProviders(deps: HoldbackDeps): Set<string> | null {
  // The combo's own config, never the cascade: global defaults do not grant the opt-in.
  const own = deps.combo.config;
  if (!isRecord(own) || own.retainReasoningBeforeAnswer !== true) return null;
  const listed = Array.isArray(own.reasoningCheckpointProviders)
    ? own.reasoningCheckpointProviders
    : [];
  return new Set(
    listed
      .filter((entry): entry is string => typeof entry === "string")
      .map((entry) => entry.trim().toLowerCase())
      .filter((entry) => entry.length > 0)
  );
}

/**
 * The providers the combo allows to receive a draft, or null when the holdback does not apply
 * to this attempt. An empty set means "hold, but never forward".
 */
export function resolveReasoningHoldback(
  deps: HoldbackDeps,
  body: JsonRecord,
  target: SingleModelTarget,
  protectedPriorityTarget: boolean
): Set<string> | null {
  if (!isRegisteredFeatureFlagEnabled(COMBO_REASONING_HOLDBACK_FLAG)) return null;
  const providers = listedProviders(deps);
  if (!providers || protectedPriorityTarget || !deps.clientRequestedStream) return null;
  if (deps.effectiveSessionId || deps.sticky?.stuck || !sequentialDispatch(deps)) return null;
  if (deps.sourceFormat && deps.sourceFormat !== "openai") return null;
  if ("modelPinned" in target && target.modelPinned) return null;
  return isPlainChatCompletionsText(body) ? providers : null;
}

function providerIsListed(providers: Set<string>, target: SingleModelTarget, modelStr: string) {
  const own = "provider" in target ? target.provider : undefined;
  return [own, parseModel(modelStr).provider].some(
    (id) => typeof id === "string" && providers.has(id.toLowerCase())
  );
}

/**
 * Dispatch one attempt through the target runner, with the holdback when it applies.
 *
 * @param opts the attempt's options (deps, state and the protected-target verdict)
 */
export async function dispatchHeldReasoning(
  opts: Pick<ExecuteTargetAttemptOptions, "deps" | "state" | "protectedPriorityTarget">,
  body: JsonRecord,
  modelStr: string,
  target: SingleModelTarget
): Promise<Response> {
  const { deps, state } = opts;
  const providers = resolveReasoningHoldback(deps, body, target, opts.protectedPriorityTarget);
  if (!providers) return deps.handleSingleModelWithTimeout(body, modelStr, target);

  let sendBody = body;
  const carried = state.reasoningCheckpoint;
  if (carried && providerIsListed(providers, target, modelStr)) {
    const withDraft = makeCheckpointRequest(body, carried, "before-answer");
    if (withDraft) {
      // The draft is for the upstream only: the marker keeps this body out of every persisted
      // request payload (see requestPersistence.ts).
      sendBody = markUpstreamOnlyBody(withDraft);
      deps.log.info(
        "COMBO",
        `Forwarding a ${carried.reasoning.length}-char reasoning draft to ${modelStr}`
      );
    }
  }
  const result = await deps.handleSingleModelWithTimeout(sendBody, modelStr, {
    ...target,
    reasoningHoldback: { maxBytes: REASONING_HOLDBACK_MAX_BYTES },
  } as SingleModelTarget);
  const produced = readReasoningCheckpoint(result);
  if (produced) state.reasoningCheckpoint = produced;
  return result;
}
