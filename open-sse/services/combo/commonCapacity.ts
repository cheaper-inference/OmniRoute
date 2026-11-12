import { withoutAccountCapacityContext } from "../accountSemaphore.ts";
import { withoutCapacityRequest } from "./capacityBudgetContext.ts";
import { withoutAuxiliaryAdmissions } from "./auxiliaryAdmission.ts";
import { captureAccountCapacityExecution } from "../accountSemaphore.ts";
import type { AttemptLoopState } from "./attemptLoopTypes.ts";
import { wrapReadableStreamWithFinalize } from "../../handlers/chatCore/streamFinalize.ts";
import { inheritEmptyTurnPolicy } from "../../utils/emptyTurnPolicy.ts";
import { inheritProviderProbeResponse } from "../../../src/shared/utils/providerProbeResult.ts";
import { inheritLocalProcessPressureResponse } from "../../utils/localPressureResponse.ts";
import { inheritQuotaExhaustionClassification } from "./quotaExhaustion.ts";
import { inheritTransportReplayVeto } from "./preContentTransportFailure.ts";
import { capacityRequestDeadline } from "./capacityBudgetContext.ts";
import type { AccountCapacityWait, SemaphoreRequirement } from "../accountSemaphore.ts";
import { resolveRequestQueueMaxWaitMs } from "../rateLimitManager/queueSettings.ts";
/** Deferred summaries keep caller auth/tracing while owning independent admission. */
export function runDetachedHandoff(callback: () => void): void {
  withoutAccountCapacityContext(() =>
    withoutCapacityRequest(() => withoutAuxiliaryAdmissions(callback))
  );
}

export type CapacityCandidate = SemaphoreRequirement & { deadline: number };

export function capacityCandidate(
  requirement: SemaphoreRequirement,
  provider: string,
  connectionId: string,
  configuredWaitMs: number,
  deadline: number
): CapacityCandidate {
  const budget = resolveRequestQueueMaxWaitMs(provider, configuredWaitMs, connectionId);
  const queueBound = capacityRequestDeadline(requirement.key, budget, true);
  return { ...requirement, deadline: Math.min(queueBound, deadline) };
}

/** Only the selected owning body keeps admission alive for its bounded recovery. */
export function handoffCapacityResponse(response: Response, owner: AccountCapacityWait): Response {
  let body: ReadableStream<Uint8Array> | undefined;
  try {
    owner.surrender();
    if (!response.body) {
      owner.close();
      return response;
    }
    body = wrapReadableStreamWithFinalize(response.body, () => owner.close());
    const wrapped = new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    inheritEmptyTurnPolicy(response, wrapped);
    inheritProviderProbeResponse(response, wrapped);
    inheritLocalProcessPressureResponse(response, wrapped);
    inheritQuotaExhaustionClassification(response, wrapped);
    inheritTransportReplayVeto(response, wrapped);
    return wrapped;
  } catch (error) {
    owner.close();
    void body?.cancel(error).catch(() => {});
    throw error;
  }
}

export type AdmissionCharge = {
  owner: object;
  entry?: { provider: string; model: string };
  spent: boolean;
  refund(): void;
};
const pendingAdmissionCharges = new WeakMap<AttemptLoopState, Map<number, AdmissionCharge>>();
export function clearPendingCapacityCharge(
  state: AttemptLoopState,
  index: number,
  owner: object | null
): void {
  const pending = pendingAdmissionCharges.get(state);
  if (owner && pending?.get(index)?.owner === owner) pending.delete(index);
}
/** Retire only the current unstarted attempt; prior attempts and other hedges are untouched. */
export function refundPendingCapacityAttempt(
  state: AttemptLoopState,
  index: number,
  owner?: object
): void {
  const pending = pendingAdmissionCharges.get(state);
  const charge = pending?.get(index);
  if (!charge || (owner && charge.owner !== owner)) return;
  pending!.delete(index);
  charge.refund();
}

export function createPendingCapacityCharge(
  state: AttemptLoopState,
  index: number,
  owner: object | null
): AdmissionCharge | undefined {
  const executionStarted = owner ? captureAccountCapacityExecution() : null;
  let refunded = false;
  const charge: AdmissionCharge | undefined =
    executionStarted && owner
      ? {
          owner,
          spent: false,
          refund() {
            if (refunded || charge!.spent || executionStarted()) return;
            refunded = true;
            state.globalAttempts--;
            if (charge!.entry) {
              const entryIndex = state.comboAttemptOrder.indexOf(charge!.entry);
              if (entryIndex >= 0) state.comboAttemptOrder.splice(entryIndex, 1);
            }
          },
        }
      : undefined;
  if (charge) {
    let pending = pendingAdmissionCharges.get(state);
    if (!pending) pendingAdmissionCharges.set(state, (pending = new Map()));
    pending.set(index, charge);
  }
  return charge;
}
