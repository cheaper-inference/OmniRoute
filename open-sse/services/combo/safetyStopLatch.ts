import { classifyProviderSafetyError } from "../../utils/providerSafety.ts";
import { extractJsonErrorFields } from "../../utils/tencentEnvelope.ts";
import { COMBO_HEDGE_CANCELLED_REASON } from "./comboAbortReasons.ts";
import { finishComboTrace } from "./decisionTrace.ts";
import type { HandleComboChatOptions } from "./types.ts";

type ComboInner = (options: HandleComboChatOptions) => Promise<Response>;

/** True when a 400/403 target response carries an explicit provider safety stop. */
async function isSafetyRejection(result: Response): Promise<boolean> {
  if (result.status !== 400 && result.status !== 403) return false;
  let parsed: unknown;
  try {
    parsed = await result.clone().json();
  } catch {
    // Non-JSON errors retain ordinary routing behavior.
    return false;
  }
  const error = extractJsonErrorFields(parsed);
  return (
    classifyProviderSafetyError({
      code: error.errorCode,
      type: error.errorType,
      message: error.message,
      status: result.status,
    }) !== null
  );
}

/**
 * PROVIDER_SAFETY_STOPS_TERMINAL (#17049): run one combo invocation with a safety latch.
 * The latch sits before strategy code sees a target response, so neither retries nor
 * intentional sibling cancellation can replace a refusal. State is local to this invocation.
 */
export async function runComboWithSafetyLatch(
  options: HandleComboChatOptions,
  invocationId: string,
  inner: ComboInner
): Promise<Response> {
  const terminalController = new AbortController();
  const signal = options.signal
    ? AbortSignal.any([options.signal, terminalController.signal])
    : terminalController.signal;
  let safetyResponse: Response | null = null;
  const handleSingleModel: HandleComboChatOptions["handleSingleModel"] = async (
    body,
    model,
    target
  ) => {
    if (safetyResponse) return safetyResponse.clone();
    signal.throwIfAborted();
    const modelAbortSignal = target?.modelAbortSignal
      ? AbortSignal.any([signal, target.modelAbortSignal])
      : signal;
    const result = await options.handleSingleModel(body, model, { ...target, modelAbortSignal });
    if (!safetyResponse && (await isSafetyRejection(result)) && !safetyResponse) {
      safetyResponse = result.clone();
      terminalController.abort(new Error(COMBO_HEDGE_CANCELLED_REASON));
    }
    return result;
  };
  let response: Response;
  try {
    response = await inner({ ...options, invocationId, handleSingleModel, signal });
  } catch (error) {
    if (!safetyResponse) throw error;
    response = safetyResponse;
  }
  if (safetyResponse) {
    response = safetyResponse;
    finishComboTrace(invocationId, { status: response.status, errorClass: "safety_rejection" });
  }
  return response;
}
