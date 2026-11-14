// Shared capability and model-pick pieces for the tool-capable chat inject adapters
// (pi, omp, opencode, kilo). Pure: no fs, process or os reads.

import { assertMinVersion, pickToolModel } from "./inject.mjs";

/**
 * The modelList block for a tool-capable chat view. With `injectLimit`, the view is cut to that
 * many rows spread by provider, and the limit is declared on the block too.
 * @param {string} name view name (the adapter id)
 * @param {number} minContext
 * @param {number} [injectLimit]
 */
export function toolChatModelList(name, minContext, injectLimit) {
  const view = {
    name,
    filter: {
      protocols: ["openai-chat"],
      kinds: ["chat"],
      capabilities: ["tools"],
      minContextTokens: minContext,
    },
    order: "preferences",
  };
  if (typeof injectLimit !== "number") return { strategy: "inject", view };
  return {
    strategy: "inject",
    view: { ...view, limit: injectLimit, spread: "provider" },
    injectLimit,
  };
}

/**
 * The leading capability fields shared by pi, omp and opencode: protocol, modelList,
 * minContextTokens, an optional model and the version gate.
 * @param {string} name
 * @param {{ minContext: number, versionGate: object, injectLimit?: number }} options
 */
export function toolChatCapabilities(name, { minContext, versionGate, injectLimit }) {
  return {
    protocol: "openai-chat",
    modelList: toolChatModelList(name, minContext, injectLimit),
    minContextTokens: minContext,
    model: "optional",
    versionGate,
  };
}

/**
 * Version gate, then the model pick (see assertMinVersion and pickToolModel).
 * @param {import("../../contract.d.ts").LaunchContext} ctx
 * @param {{ displayName: string, min: string, hint: string, minContext: number }} gate
 * @param {string[]} notes
 */
export function gatedToolModel(ctx, { displayName, min, hint, minContext }, notes) {
  assertMinVersion(ctx, { displayName, min, hint });
  return pickToolModel(ctx, { displayName, minContext, notes });
}
