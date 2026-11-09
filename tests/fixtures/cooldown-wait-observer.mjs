import { waitForCooldownAwareRetry as actualWait } from "../../src/sse/services/cooldownAwareRetry.ts";
export * from "../../src/sse/services/cooldownAwareRetry.ts";

let observer = null;
export function setCooldownWaitObserver(value) {
  observer = value;
}

export async function waitForCooldownAwareRetry(waitMs, signal) {
  const observation = observer;
  if (!observation) return actualWait(waitMs, signal);
  observation.calls++;
  observation.waitMs = waitMs;
  observation.start();
  const completed = await actualWait(waitMs, signal);
  observation.done = true;
  observation.complete(waitMs);
  return completed;
}
