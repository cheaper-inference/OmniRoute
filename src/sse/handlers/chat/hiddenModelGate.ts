import { getCachedProviderConnections } from "@/lib/db/readCache";
import { getHiddenChatModels } from "@/lib/hiddenChatModels";
import { createHiddenModelLookup } from "@/lib/hiddenModelLookup";
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

/** Preserve authorization precedence at both initial and final dispatch gates. */
export function withHiddenModelGate(authorize: ModelGate, requestedModelStr?: string): ModelGate {
  let isHidden: ReturnType<typeof createHiddenModelLookup> | undefined;
  return async (targets) => {
    const resolvedTargets = [...targets];
    const denied = await authorize(resolvedTargets);
    if (denied) return denied;
    isHidden ??= createHiddenModelLookup(await getHiddenChatModels());
    for (const target of resolvedTargets) {
      const separator = target.indexOf("/");
      const rawProvider = target.slice(0, separator);
      const provider =
        rawProvider === "antigravity"
          ? await resolveAntigravityVisibilityProvider(requestedModelStr)
          : rawProvider;
      const model = target.slice(separator + 1);
      if (separator > 0 && isHidden(provider, model)) {
        return errorResponse(404, "Model not found", {
          code: "model_not_found",
          type: "invalid_request_error",
        });
      }
    }
    return null;
  };
}
