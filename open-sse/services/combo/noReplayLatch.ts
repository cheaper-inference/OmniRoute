import { isNoReplayResponse } from "../../utils/noReplayResponse.ts";
import { COMBO_HEDGE_CANCELLED_REASON } from "./comboAbortReasons.ts";
import type { HandleComboChatOptions } from "./types.ts";

type ComboInner = (options: HandleComboChatOptions) => Promise<Response>;

/**
 * Custom JSON API nodes: a business request is never replayed on another combo target.
 *
 * The first target response carrying the no-replay marker (open-sse/utils/noReplayResponse.ts)
 * becomes the combo's final answer — success, error or empty reply alike. The latch sits
 * where the strategy code receives target responses (same seam as the provider-safety
 * latch), aborts the remaining dispatch and answers any further target call with the
 * latched response instead of dispatching it. Responses without the marker leave the
 * combo untouched; state is local to this invocation.
 */
export async function runComboWithNoReplayLatch(
  options: HandleComboChatOptions,
  inner: ComboInner
): Promise<Response> {
  const terminalController = new AbortController();
  const signal = options.signal
    ? AbortSignal.any([options.signal, terminalController.signal])
    : terminalController.signal;
  let latched: Response | null = null;
  const handleSingleModel: HandleComboChatOptions["handleSingleModel"] = async (
    body,
    model,
    target
  ) => {
    if (latched) return latched.clone();
    const result = await options.handleSingleModel(body, model, target);
    if (!latched && isNoReplayResponse(result)) {
      latched = result.clone();
      terminalController.abort(new Error(COMBO_HEDGE_CANCELLED_REASON));
    }
    return result;
  };
  let response: Response;
  try {
    response = await inner({ ...options, handleSingleModel, signal });
  } catch (error) {
    if (!latched) throw error;
    return latched;
  }
  if (!latched || isNoReplayResponse(response)) return response;
  return latched;
}
