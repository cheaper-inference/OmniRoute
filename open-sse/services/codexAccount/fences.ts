import { AsyncLocalStorage } from "node:async_hooks";
import { getRegisteredConnectionStore } from "../../utils/registeredConnectionStore.ts";
import {
  StaleCodexOperationError,
  type CodexConnectionFence,
  type CodexFenceOperation,
  type CodexFenceStore,
} from "./fenceTypes.ts";

export {
  StaleCodexOperationError,
  STALE_CODEX_OPERATION_CODE,
  type CodexConnectionFence,
} from "./fenceTypes.ts";

// Immutable operation scopes and response bindings are shared by the engine and DB adapter.
// They are not a mutable connection-id -> current-owner registry.
const operations = new AsyncLocalStorage<CodexFenceOperation>();
const responses = new WeakMap<Response, CodexFenceOperation>();

/** Resolve lazily: provider-store registration may occur after engine modules load. */
function registeredFenceMethod<K extends keyof CodexFenceStore>(key: K): CodexFenceStore[K] {
  return ((...args: unknown[]) => {
    const fences = getRegisteredConnectionStore()?.codexFences;
    // Never silently run a persisted Codex operation without the durable application fence.
    if (!fences) throw new StaleCodexOperationError();
    return Reflect.apply(fences[key], fences, args);
  }) as CodexFenceStore[K];
}

export const captureCodexConnectionFence = registeredFenceMethod("captureCodexConnectionFence");
export const captureCodexConnectionOwnerFence = registeredFenceMethod(
  "captureCodexConnectionOwnerFence"
);
export const adoptCodexConnectionFence = registeredFenceMethod("adoptCodexConnectionFence");
export const isCodexConnectionFenceCurrent = registeredFenceMethod("isCodexConnectionFenceCurrent");

/** The DB adapter reads this same immutable scope inside its synchronous write transaction. */
export function getCodexOperationScope(): CodexFenceOperation | undefined {
  return operations.getStore();
}
export function getCodexOperationFence(id: string): CodexConnectionFence | null {
  const operation = getCodexOperationScope();
  return operation?.fence.connectionId === id ? operation.fence : null;
}
export function runWithCodexConnectionFence<T>(
  fence: CodexConnectionFence | null,
  work: () => T,
  recovery = false
): T {
  return fence ? operations.run(Object.freeze({ fence, recovery }), work) : work();
}
export function bindCodexResponseFence(
  response: Response,
  fence: CodexConnectionFence | null
): void {
  if (fence && !responses.has(response))
    responses.set(response, Object.freeze({ fence, recovery: false }));
}
export function inheritCodexResponseFence(from: Response, to: Response): Response {
  const operation = responses.get(from);
  if (operation) responses.set(to, operation);
  return to;
}
export function runWithCodexResponseFence<T>(
  response: Response,
  work: () => T,
  recovery = false
): T {
  const operation = responses.get(response);
  return operation ? runWithCodexConnectionFence(operation.fence, work, recovery) : work();
}
export function bindCodexResponseCallbacks<T extends object>(response: Response, callbacks: T): T {
  return new Proxy(callbacks, {
    get(target, key, receiver) {
      const value: unknown = Reflect.get(target, key, receiver);
      if (typeof value !== "function") return value;
      return (...args: unknown[]) => {
        if (!isCodexResponseCurrent(response)) return;
        return runWithCodexResponseFence(response, () => Reflect.apply(value, target, args));
      };
    },
  });
}
export function isCodexResponseCurrent(response: Response, recovery = false): boolean {
  const operation = responses.get(response);
  return !operation || isCodexConnectionFenceCurrent(operation.fence, recovery);
}
