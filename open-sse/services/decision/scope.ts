/**
 * Depth guard for decision calls. A `combo-model` decision runs a model in process; anything
 * that would start another decision inside that call sees `decisionDepth() > 0` and falls
 * back instead (the in-process twin of the `x-omniroute-decision-model` header).
 */
import { AsyncLocalStorage } from "node:async_hooks";

const depthStore = new AsyncLocalStorage<number>();

/** Decision calls currently running in this async context (0 outside any). */
export function decisionDepth(): number {
  return depthStore.getStore() ?? 0;
}

export function runInDecisionScope<T>(fn: () => Promise<T>): Promise<T> {
  return depthStore.run(decisionDepth() + 1, fn);
}
