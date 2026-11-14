// bin/cli/launch/core/middleware.mjs: PlanMiddleware runner + LaunchObserver bus.
// Middleware is PURE and runs inside the plan step (visible in --dry-run); observers are
// effectful, execute-only, awaited with a cap, and never fatal.

import { LaunchError, deepFreeze } from "../contract.mjs";

const DEFAULT_ORDER = 500;
const OBSERVER_CAP_MS = 2000;

/** Stable sort by `order` (built-ins 100s, user 500+). */
function sortMiddleware(list = []) {
  return list
    .map((mw, index) => ({ mw, index }))
    .sort(
      (a, b) => (a.mw.order ?? DEFAULT_ORDER) - (b.mw.order ?? DEFAULT_ORDER) || a.index - b.index
    )
    .map((entry) => entry.mw);
}

function checkId(mw) {
  if (!mw || typeof mw.id !== "string" || mw.id === "") {
    throw new LaunchError("Internal", "plan middleware needs a string id");
  }
}

/** ctx -> mw.beforePlan* -> ctx (re-frozen). Returns the ids that changed something. */
export function runBeforePlan(list, ctx) {
  const applied = [];
  let current = ctx;
  for (const mw of sortMiddleware(list)) {
    checkId(mw);
    if (typeof mw.beforePlan !== "function") continue;
    const next = mw.beforePlan(current);
    if (!next || typeof next !== "object") {
      throw new LaunchError("Internal", `middleware ${mw.id}: beforePlan must return a context`);
    }
    if (next !== current) applied.push(mw.id);
    current = deepFreeze(next);
  }
  return { ctx: current, applied };
}

/** plan -> mw.afterPlan* -> plan. validatePlan runs after this, so nothing can smuggle a secret. */
export function runAfterPlan(list, plan, ctx) {
  const applied = [];
  let current = plan;
  for (const mw of sortMiddleware(list)) {
    checkId(mw);
    if (typeof mw.afterPlan !== "function") continue;
    const next = mw.afterPlan(current, ctx);
    if (!next || typeof next !== "object") {
      throw new LaunchError("Internal", `middleware ${mw.id}: afterPlan must return a plan`);
    }
    if (next !== current) applied.push(mw.id);
    current = next;
  }
  return { plan: current, applied };
}

/**
 * Observer bus. `emit` awaits every observer, each capped at `capMs`; errors become warnings.
 * @param {Array<{ id: string, on(event: object): void | Promise<void> }>} observers
 * @param {{ warn?: (message: string) => void, capMs?: number }} [options]
 */
export function createObserverBus(observers = [], options = {}) {
  const warn = options.warn ?? (() => {});
  const capMs = options.capMs ?? OBSERVER_CAP_MS;
  return {
    async emit(event) {
      await Promise.all(
        observers.map(async (observer) => {
          let timer;
          try {
            await Promise.race([
              Promise.resolve().then(() => observer.on(event)),
              new Promise((resolve) => {
                timer = setTimeout(resolve, capMs);
                timer.unref?.();
              }),
            ]);
          } catch (error) {
            warn(`observer ${observer.id} failed on ${event.type}: ${error?.message ?? "error"}`);
          } finally {
            clearTimeout(timer);
          }
        })
      );
    },
  };
}
