import { getCachedProviderConnections, getCachedProviderNodes } from "@/lib/db/readCache";
import { getChatVisibilitySnapshot } from "@/lib/hiddenChatModels";
import { createModelVisibilityLookup } from "@/lib/hiddenModelLookup";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";

type ModelGate = (targets: Iterable<string>) => Promise<Response | null>;

async function resolveAntigravityVisibilityProvider(
  requestedModelStr?: string
): Promise<"agy" | "antigravity"> {
  const trimmed = typeof requestedModelStr === "string" ? requestedModelStr.trim() : "";
  if (trimmed.startsWith("agy/")) return "agy";
  if (trimmed.startsWith("antigravity/")) return "antigravity";
  try {
    const connections = await getCachedProviderConnections({ isActive: true });
    let hasAgy = false;
    let hasAntigravity = false;
    for (const conn of Array.isArray(connections) ? connections : []) {
      const p = (conn as { provider?: unknown })?.provider;
      if (p === "agy") hasAgy = true;
      else if (p === "antigravity") hasAntigravity = true;
    }
    if (hasAgy && !hasAntigravity) return "agy";
  } catch {
    // Fall back to canonical provider when connection cache is unavailable.
  }
  return "antigravity";
}

export type HiddenModelGateScope = {
  /**
   * The dispatch is a step of a stored combo (`handleComboChat` → `handleSingleModelChat`).
   * A `combos_only` model stays dispatchable there; only a `hidden` one is rejected.
   */
  isCombo?: boolean;
  /** The admitted combo/alias name (`authorizationContextModel`), used to spot `auto/*`. */
  contextModel?: string | null;
};

/**
 * A `combos_only` model is blocked on a direct call — but `auto/*` is a *virtual* combo the
 * operator never compiled by hand, so it must not be able to reach a model the operator chose
 * to keep out of direct use. Those dispatches are gated as direct calls too, and the auto
 * candidate pool excludes the same models (open-sse/services/autoCombo).
 */
function isFixedComboExecution(scope: HiddenModelGateScope | undefined): boolean {
  if (scope?.isCombo !== true) return false;
  const context = typeof scope.contextModel === "string" ? scope.contextModel.trim() : "";
  return !context.startsWith("auto/");
}

/** Preserve authorization precedence at both initial and final dispatch gates. */
export function withHiddenModelGate(
  authorize: ModelGate,
  requestedModelStr?: string,
  scope: HiddenModelGateScope = {}
): ModelGate {
  let visibility: ReturnType<typeof createModelVisibilityLookup> | undefined;
  const allowCombosOnly = isFixedComboExecution(scope);
  return async (targets) => {
    const resolvedTargets = [...targets];
    const denied = await authorize(resolvedTargets);
    if (denied) return denied;
    if (!visibility) {
      visibility = createModelVisibilityLookup(
        await getChatVisibilitySnapshot(),
        await getCachedProviderNodes()
      );
    }
    for (const target of resolvedTargets) {
      const separator = target.indexOf("/");
      const rawProvider = target.slice(0, separator);
      const provider =
        rawProvider === "antigravity"
          ? await resolveAntigravityVisibilityProvider(requestedModelStr)
          : rawProvider;
      const model = target.slice(separator + 1);
      if (separator <= 0) continue;
      // A stored combo may dispatch a combos_only target; a hidden one never.
      const blocked = allowCombosOnly
        ? visibility.isHiddenInCombo(provider, model)
        : visibility.isBlockedFromDirectUse(provider, model);
      if (blocked) {
        return errorResponse(404, "Model not found", {
          code: "model_not_found",
          type: "invalid_request_error",
        });
      }
    }
    return null;
  };
}
