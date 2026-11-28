/** Count native Gemini support and matching catalogue entries for the other routes. */
export function decisionEndpointModelCount<
  T extends { id: string; parent?: unknown; owned_by?: string; supported_endpoints?: string[] },
>(models: readonly T[], path: string): number {
  // The native route accepts one model, gemini-decision-1, including its qualified alias.
  // Gemini's chat catalogue does not need to advertise this Decisions-only model.
  if (path === "/v1beta/decisions") return 1;

  const seen = new Set<string>();
  for (const model of models) {
    if (model.parent) continue;
    const qualified = model.id.includes("/") ? model.id : `${model.owned_by}/${model.id}`;
    if (seen.has(qualified)) continue;
    const matches =
      path === "/v1/decisions"
        ? qualified === "openai/gpt-6-luna"
        : path === "/v1/systemone" &&
          (model.supported_endpoints?.includes("systemone") ||
            qualified.startsWith("typesafe/jev-"));
    if (matches) seen.add(qualified);
  }
  return seen.size;
}
