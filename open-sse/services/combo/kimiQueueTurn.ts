import { AsyncLocalStorage } from "node:async_hooks";
import {
  acquireMany,
  canAdoptAccountSlot,
  type AcquireManyOptions,
  type SemaphoreRequirement,
} from "../accountSemaphore.ts";

export interface KimiQueueTurn {
  target: string;
  key: string;
  deadline: number;
  take(): (() => void) | undefined;
  dispose(): void;
}

export function createKimiQueueTurn(
  target: string,
  key: string,
  deadline: number,
  release: () => void
): KimiQueueTurn {
  let held = true;
  return {
    target,
    key,
    deadline,
    take() {
      if (!held) return undefined;
      held = false;
      return release;
    },
    dispose() {
      if (held) {
        held = false;
        release();
      }
    },
  };
}

const storageKey = Symbol.for("omniroute.kimiQueueTurn.v1");
const registry = globalThis as typeof globalThis & {
  [storageKey]?: AsyncLocalStorage<KimiQueueTurn>;
};
const storage = (registry[storageKey] ??= new AsyncLocalStorage<KimiQueueTurn>());

export function dispatchWithKimiTurn<T>(
  turn: KimiQueueTurn | undefined,
  target: string,
  dispatch: () => Promise<T>
): Promise<T> {
  return turn?.target === target ? storage.run(turn, dispatch) : dispatch();
}

/** Adopt the account's FIFO position while acquiring the remaining hierarchy, without holding a child behind a full parent. */
export async function acquireKimiDispatchGates(
  requirements: SemaphoreRequirement[],
  options: AcquireManyOptions,
  accountKey: string | null
): Promise<() => void> {
  const turn = storage.getStore();
  if (!turn || turn.key !== accountKey) return acquireMany(requirements, options);
  const releaseAccount = turn.take();
  if (!releaseAccount) return acquireMany(requirements, options);
  const remaining = () => Math.min(options.timeoutMs || Infinity, turn.deadline - Date.now());
  const cap = requirements.find((item) => item.key === accountKey)?.maxConcurrency;
  try {
    options.signal?.throwIfAborted();
    if (remaining() <= 0)
      throw Object.assign(new Error("Kimi account queue deadline expired"), {
        code: "SEMAPHORE_TIMEOUT",
      });
    if (accountKey && cap && canAdoptAccountSlot(accountKey, cap)) {
      // We own one running permit. The other applicable gates still have to admit this request.
      const others = requirements.filter((item) => item.key !== accountKey);
      const releaseOthers = await acquireMany(others, { ...options, failFast: true });
      return () => {
        releaseOthers();
        releaseAccount();
      };
    }
  } catch (error) {
    if ((error as { code?: string })?.code !== "SEMAPHORE_QUEUE_FULL") {
      releaseAccount();
      throw error;
    }
  }
  releaseAccount();
  const timeoutMs = remaining();
  if (timeoutMs <= 0)
    throw Object.assign(new Error("Kimi account queue deadline expired"), {
      code: "SEMAPHORE_TIMEOUT",
    });
  return acquireMany(requirements, { ...options, timeoutMs });
}
