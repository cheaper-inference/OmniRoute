/** Match visible catalogue entries by provider as well as model name. */
export function decisionEndpointModels<
  T extends { id: string; parent?: unknown; owned_by?: string; supported_endpoints?: string[] },
>(models: T[], path: string): T[] {
  const seen = new Set<string>();
  return models.filter((model) => {
    if (model.parent) return false;
    const qualified = model.id.includes("/") ? model.id : `${model.owned_by}/${model.id}`;
    if (seen.has(qualified)) return false;
    const matches =
      path === "/v1/decisions"
        ? qualified === "openai/gpt-6-luna"
        : path === "/v1beta/decisions"
          ? qualified === "gemini/gemini-decision-1"
          : path === "/v1/systemone" &&
            (model.supported_endpoints?.includes("systemone") ||
              qualified.startsWith("typesafe/jev-"));
    if (matches) seen.add(qualified);
    return matches;
  });
}
