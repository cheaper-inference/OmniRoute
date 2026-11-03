/**
 * Wrap a single-model dispatch with a per-target timeout that aborts and falls back.
 *
 * Extracted from handleComboChat's `handleSingleModelWithTimeout` closure (combo.ts).
 * A locally expired timer aborts that target and returns a typed 504 response so the Combo
 * can fall back without treating OmniRoute's own deadline as a provider-connection failure.
 * The per-model abort signal still comes from the target (`target.modelAbortSignal`), so
 * the outer request signal is intentionally NOT a dependency here.
 *
 * See _tasks/superpowers/plans/2026-07-03-blocoJ-combo-hotpath-decomposition.md (Task 1).
 */
import { buildErrorBody, errorResponse, sanitizeErrorMessage } from "../../utils/error.ts";
import { DECLARED_FIRST_OUTPUT_WAIT_CAP_MS } from "../comboConfig.ts";
import {
  COMBO_HEDGE_CANCELLED_REASON,
  COMBO_PER_MODEL_TIMEOUT_REASON,
} from "./comboAbortReasons.ts";
import { awaitFirstOutput, isEventStreamResponse } from "./firstOutputStream.ts";
import type { HandleSingleModel, SingleModelTarget, ComboLogger } from "./types.ts";

/** Stable internal classification for OmniRoute's own combo per-target timer. */
export const COMBO_TARGET_TIMEOUT_CODE = "combo_target_timeout";

/**
 * Diagnostic: track recent combo-per-model-timeout abort errors so an
 * unhandledRejection handler can attribute the stack trace to a specific model
 * and timeout value. Ring buffer of 4 — concurrent per-model timeouts are rare
 * but possible (e.g. hedge + per-target timeout on different targets).
 */
const CONTEXT_RING_SIZE = 4;
const lastTimeoutContexts: Array<{
  modelStr: string;
  timeoutMs: number;
  abortError: Error;
  timestamp: number;
}> = [];
let contextRingIndex = 0;

function recordTimeoutContext(ctx: {
  modelStr: string;
  timeoutMs: number;
  abortError: Error;
  timestamp: number;
}): void {
  if (lastTimeoutContexts.length < CONTEXT_RING_SIZE) {
    lastTimeoutContexts.push(ctx);
  } else {
    lastTimeoutContexts[contextRingIndex] = ctx;
    contextRingIndex = (contextRingIndex + 1) % CONTEXT_RING_SIZE;
  }
}

/** Retrieve (and clear) all pending combo-per-model-timeout diagnostic contexts. */
export function drainLastTimeoutContexts(): typeof lastTimeoutContexts {
  const out = lastTimeoutContexts.splice(0);
  contextRingIndex = 0;
  return out;
}

/**
 * Install a persistent unhandledRejection listener that logs combo-per-model-timeout
 * diagnostics. Call once at module load. The listener stays installed permanently —
 * it only acts on combo-per-model-timeout rejections and returns early for everything
 * else, so there is no handler leak and no remove/re-install race window.
 */
let diagnosticInstalled = false;
function ensureDiagnosticListener(): void {
  if (diagnosticInstalled) return;
  diagnosticInstalled = true;
  process.on("unhandledRejection", (reason: unknown) => {
    try {
      const isComboTimeout =
        reason instanceof Error && reason.message === COMBO_PER_MODEL_TIMEOUT_REASON;
      if (!isComboTimeout) return;
      const contexts = drainLastTimeoutContexts();
      // Log the full stack trace so the next production incident is diagnosable.
      // Without this, Node's default unhandledRejection warning shows only
      // "Error: combo-per-model-timeout" with no caller context.
      const summary =
        contexts.length > 0
          ? contexts.map((c) => `  model=${c.modelStr} timeout=${c.timeoutMs}ms`).join("\n")
          : "  (no context recorded)";
      console.error(
        "[COMBO-TIMEOUT-DIAGNOSTIC] unhandledRejection from combo per-model timeout.\n" +
          `${summary}\n` +
          `  abortError stack:\n${reason.stack ?? reason}`
      );
    } catch {
      // Diagnostic logging failed — never let this break the process.
    }
  });
}

/** The synthetic 504 a combo sees when its per-target budget runs out. */
function targetTimeoutResponse(modelStr: string): Response {
  // HTTP 504 (not proprietary 524): this is OmniRoute's own per-target timer.
  // Typed as combo_target_timeout so request-scoped classification can keep the
  // connection eligible for fallback instead of treating it like Cloudflare 524
  // or a genuine upstream gateway timeout.
  return new Response(
    JSON.stringify(
      buildErrorBody(504, sanitizeErrorMessage(`Model ${modelStr} timed out`), undefined, {
        type: COMBO_TARGET_TIMEOUT_CODE,
        code: COMBO_TARGET_TIMEOUT_CODE,
      })
    ),
    {
      status: 504,
      headers: { "Content-Type": "application/json" },
    }
  );
}

/**
 * A declared budget may lengthen the first-output wait, up to DECLARED_FIRST_OUTPUT_WAIT_CAP_MS;
 * it never shortens it, and the cap never lowers a floor that is already longer.
 */
export function resolveFirstOutputWaitMs(floorMs: number, declaredMs: number | undefined): number {
  if (typeof declaredMs !== "number" || !Number.isFinite(declaredMs)) return floorMs;
  return Math.max(floorMs, Math.min(declaredMs, DECLARED_FIRST_OUTPUT_WAIT_CAP_MS));
}

interface FirstOutputGateParams {
  dispatched: Response;
  modelStr: string;
  target?: SingleModelTarget;
  effectiveTimeoutMs: number;
  startedAt: number;
  timeoutController: AbortController;
  resolveDeclaredTargetBudgetMs?: (
    target?: SingleModelTarget
  ) => Promise<number | undefined> | number | undefined;
  log: ComboLogger;
}

/**
 * The dispatch settles as soon as the upstream sends headers, so its budget says nothing
 * about whether the body will produce a single token. Hold a successful stream until it
 * carries output; otherwise a target that only holds the socket open keeps the combo
 * waiting until the client gives up.
 */
async function gateFirstOutput(params: FirstOutputGateParams): Promise<Response> {
  const {
    dispatched,
    modelStr,
    target,
    effectiveTimeoutMs,
    startedAt,
    timeoutController,
    resolveDeclaredTargetBudgetMs,
    log,
  } = params;
  if (!dispatched.ok || !isEventStreamResponse(dispatched)) return dispatched;

  const firstOutputBudgetMs = resolveFirstOutputWaitMs(
    effectiveTimeoutMs,
    await resolveDeclaredTargetBudgetMs?.(target)
  );
  const gate = await awaitFirstOutput(
    dispatched,
    firstOutputBudgetMs - (Date.now() - startedAt),
    timeoutController.signal
  );
  if (gate.kind === "output") return gate.response;

  if (gate.reason !== "budget") {
    // Cancelled from outside (hedge winner, client disconnect) or the body closed empty.
    // Neither is the target's fault, so the response goes back with its body unread and the
    // existing empty/cancel handling classifies it — never as combo_target_timeout.
    log.debug?.(
      "COMBO",
      `Model ${modelStr} stream ended before output (${gate.reason}) after ${Date.now() - startedAt}ms — not counted as a timeout`
    );
    return dispatched;
  }

  const stallErr = new Error(COMBO_PER_MODEL_TIMEOUT_REASON);
  recordTimeoutContext({
    modelStr,
    timeoutMs: firstOutputBudgetMs,
    abortError: stallErr,
    timestamp: Date.now(),
  });
  timeoutController.abort(stallErr);
  log.warn(
    "COMBO",
    `Model ${modelStr} opened a stream but produced no output within ${Date.now() - startedAt}ms of dispatch (first-output budget ${firstOutputBudgetMs}ms) — falling back`
  );
  return targetTimeoutResponse(modelStr);
}

export function buildTargetTimeoutRunner(deps: {
  handleSingleModel: HandleSingleModel;
  comboTargetTimeoutMs: number;
  log: ComboLogger;
  resolveTargetTimeoutMs?: (
    target?: SingleModelTarget
  ) => Promise<number | undefined> | number | undefined;
  /**
   * The target's own declared budget, consulted only for the first-output wait. It can only
   * lengthen that wait past the dispatch budget (up to DECLARED_FIRST_OUTPUT_WAIT_CAP_MS),
   * never shorten it.
   */
  resolveDeclaredTargetBudgetMs?: (
    target?: SingleModelTarget
  ) => Promise<number | undefined> | number | undefined;
}): (
  b: Record<string, unknown>,
  modelStr: string,
  target?: SingleModelTarget
) => Promise<Response> {
  const {
    handleSingleModel,
    comboTargetTimeoutMs,
    log,
    resolveTargetTimeoutMs,
    resolveDeclaredTargetBudgetMs,
  } = deps;
  ensureDiagnosticListener();
  return async (
    b: Record<string, unknown>,
    modelStr: string,
    target?: SingleModelTarget
  ): Promise<Response> => {
    const resolvedTimeoutMs = await resolveTargetTimeoutMs?.(target);
    const effectiveTimeoutMs =
      typeof resolvedTimeoutMs === "number" && Number.isFinite(resolvedTimeoutMs)
        ? resolvedTimeoutMs
        : comboTargetTimeoutMs;
    if (effectiveTimeoutMs <= 0) {
      // G3 (silent-stop fix): a disabled per-model timeout means a hung upstream
      // stalls the target until the combo loop safety timer (COMBO_LOOP_SAFETY_TIMEOUT_MS)
      // force-terminates — surface that dependency instead of silently running bare.
      log.warn(
        "COMBO",
        `Per-model combo timeout is DISABLED (effectiveTimeoutMs=${effectiveTimeoutMs}) for ${modelStr} — a hung upstream will hang this target until the combo loop safety timeout`
      );
      return handleSingleModel(b, modelStr, target).catch((err) =>
        errorResponse(502, err?.message ?? "Upstream model error")
      );
    }

    const startedAt = Date.now();
    const timeoutController = new AbortController();
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let timedOut = false;
    const timeoutPromise = new Promise<Response>((resolve) => {
      timeoutId = setTimeout(() => {
        timedOut = true;
        const abortErr = new Error(COMBO_PER_MODEL_TIMEOUT_REASON);
        recordTimeoutContext({
          modelStr,
          timeoutMs: effectiveTimeoutMs,
          abortError: abortErr,
          timestamp: Date.now(),
        });
        log.warn(
          "COMBO",
          `Model ${modelStr} exceeded ${effectiveTimeoutMs}ms timeout — falling back`
        );
        timeoutController.abort(abortErr);
        resolve(targetTimeoutResponse(modelStr));
      }, effectiveTimeoutMs);
    });
    const targetWithSignal = {
      ...(target ?? {}),
      modelAbortSignal: timeoutController.signal,
    };
    const parentHedgeSignal = target?.modelAbortSignal ?? null;
    let onParentHedgeAbort: (() => void) | null = null;
    if (parentHedgeSignal) {
      if (parentHedgeSignal.aborted) {
        timeoutController.abort(new Error(COMBO_HEDGE_CANCELLED_REASON));
      } else {
        onParentHedgeAbort = () => {
          timeoutController.abort(new Error(COMBO_HEDGE_CANCELLED_REASON));
        };
        parentHedgeSignal.addEventListener("abort", onParentHedgeAbort, { once: true });
      }
    }
    // Both branches of the race resolve (never reject): the inner handleSingleModel call has a
    // .catch() that converts rejections into responses, and timeoutPromise always resolves. The
    // outer .catch() guards the .catch() handler itself (e.g. a broken Error.prototype.message
    // getter), which would otherwise surface as a tagged unhandledRejection.
    let dispatched: Response;
    try {
      dispatched = await Promise.race([
        handleSingleModel(b, modelStr, targetWithSignal).catch((err) => {
          if (timedOut) {
            // Inner call rejected because we aborted it. The synthetic 504 from timeoutPromise
            // already won the race; resolve cleanly without leaking err.message.
            return new Response(null, { status: 599 });
          }
          return errorResponse(502, err?.message ?? "Upstream model error");
        }),
        timeoutPromise,
      ]).catch((raceErr) => {
        // Defensive: should never fire — both race branches always resolve.
        const detail = raceErr instanceof Error ? raceErr.message : String(raceErr);
        log.error?.(
          "COMBO",
          `Unexpected rejection in combo timeout race for ${modelStr}: ${detail}`
        );
        return errorResponse(502, `Combo timeout dispatch error: ${detail}`);
      });
    } finally {
      clearTimeout(timeoutId);
    }

    try {
      return await gateFirstOutput({
        dispatched,
        modelStr,
        target,
        effectiveTimeoutMs,
        startedAt,
        timeoutController,
        resolveDeclaredTargetBudgetMs,
        log,
      });
    } finally {
      // The parent hedge can cancel this target at any point up to here, including while the
      // first-output gate is still waiting.
      if (parentHedgeSignal && onParentHedgeAbort) {
        parentHedgeSignal.removeEventListener("abort", onParentHedgeAbort);
      }
    }
  };
}
