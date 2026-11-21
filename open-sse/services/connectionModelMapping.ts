/**
 * Per-connection model mapping (providerSpecificData.modelMapping).
 *
 * One connection can rename a model on the wire without editing global aliases. Keys are exact
 * model ids or trailing-star patterns ("gpt-5-*"); an exact match wins, then the longest star
 * pattern. No mapping, or no match, leaves the model untouched. Applied once at the executor
 * boundary, so the native leg of every request sees the mapped id and nothing else changes.
 */
import { hasUnsafeModelIdSyntax } from "../utils/modelIdSafety.ts";

function isUsableTarget(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "" && !hasUnsafeModelIdSyntax(value.trim());
}

export function resolveConnectionModel(model: string, mapping: unknown): string | null {
  if (!mapping || typeof mapping !== "object" || Array.isArray(mapping)) return null;
  const entries = mapping as Record<string, unknown>;
  if (Object.hasOwn(entries, model)) {
    const exact = entries[model];
    return isUsableTarget(exact) ? exact.trim() : null;
  }
  let best: string | null = null;
  let bestLength = -1;
  for (const [pattern, target] of Object.entries(entries)) {
    if (!pattern.endsWith("*") || !isUsableTarget(target)) continue;
    const prefix = pattern.slice(0, -1);
    if (model.startsWith(prefix) && prefix.length > bestLength) {
      best = target.trim();
      bestLength = prefix.length;
    }
  }
  return best;
}

type ExecutorInput = { model: string; body: unknown };
type ExecutorLike = { execute: (input: ExecutorInput) => Promise<unknown> };

/**
 * Wrap an executor so execute() rewrites `model` (and a plain-object `body.model`). A Proxy
 * (not Object.create) so executors with #private fields keep working: members are read from,
 * and methods are called on, the real executor.
 */
export function wrapExecutorWithConnectionModelMapping<T extends ExecutorLike>(
  executor: T,
  providerSpecificData: Record<string, unknown> | null | undefined
): T {
  const mapping = providerSpecificData?.modelMapping;
  if (!mapping || typeof mapping !== "object" || Object.keys(mapping).length === 0) {
    return executor;
  }
  const execute = (input: ExecutorInput) => {
    const mapped = resolveConnectionModel(input.model, mapping);
    const body =
      mapped && input.body && typeof input.body === "object" && !Array.isArray(input.body)
        ? { ...(input.body as Record<string, unknown>), model: mapped }
        : input.body;
    return executor.execute(mapped ? { ...input, model: mapped, body } : input);
  };
  return new Proxy(executor, {
    get(target, prop) {
      if (prop === "execute") return execute;
      const value = Reflect.get(target, prop, target);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
}
