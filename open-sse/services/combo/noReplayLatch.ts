import { errorResponse } from "../../utils/error.ts";
import { isNoReplayResponse } from "../../utils/noReplayResponse.ts";
import { COMBO_HEDGE_CANCELLED_REASON } from "./comboAbortReasons.ts";
import type { HandleComboChatOptions } from "./types.ts";

type ComboInner = (options: HandleComboChatOptions) => Promise<Response>;

/** What the strategy sees instead of a latched failure: 499 already means "stop the loop". */
const stopStrategy = () => errorResponse(499, "No-replay response latched");

/**
 * Custom JSON API nodes: a business request is never replayed on another combo target.
 *
 * The first target response carrying the no-replay marker (open-sse/utils/noReplayResponse.ts)
 * becomes the combo's final answer — success, error or empty reply alike. The latch sits
 * where the strategy code receives target responses, cancels the targets still in flight
 * and stops the strategy with a 499, so a failure is neither waited on nor charged to
 * another target. The caller's abort signal stays the strategy's own: every combo runs
 * through here, and one without a marked response must behave as if the latch were absent.
 * State is local to this invocation.
 */
export async function runComboWithNoReplayLatch(
  options: HandleComboChatOptions,
  inner: ComboInner
): Promise<Response> {
  const terminalController = new AbortController();
  let latched: Response | null = null;
  const handleSingleModel: HandleComboChatOptions["handleSingleModel"] = async (
    body,
    model,
    target
  ) => {
    if (latched) return stopStrategy();
    const result = await options.handleSingleModel(
      body,
      model,
      target?.modelAbortSignal
        ? {
            ...target,
            modelAbortSignal: AbortSignal.any([terminalController.signal, target.modelAbortSignal]),
          }
        : target
    );
    if (!isNoReplayResponse(result)) return result;
    if (!latched) {
      latched = result.ok ? result.clone() : result;
      terminalController.abort(new Error(COMBO_HEDGE_CANCELLED_REASON));
    }
    return result.ok ? result : stopStrategy();
  };
  let response: Response;
  try {
    response = await inner({ ...options, handleSingleModel });
  } catch (error) {
    if (!latched) throw error;
    return latched;
  }
  if (!latched || isNoReplayResponse(response)) return response;
  return latched;
}
