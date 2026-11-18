/**
 * Anthropic's advisor server tool (`advisor_20260301`) carries its own `model`. Claude Code
 * fills it with the model name the client was configured with, which behind OmniRoute is an
 * alias such as `claude-opus-5.5` or `claude/claude-opus-5-5`. Anthropic only accepts its own
 * ids (`claude-opus-5-5`) and rejects the whole request with a 400 otherwise.
 */

/** Map an OmniRoute-style Claude model name to Anthropic's id; other names pass through. */
export function normalizeAdvisorToolModel(model: string): string {
  const name = model.trim().replace(/^[^/]+\/(?=claude-)/, "");
  if (!name.startsWith("claude-")) return model;
  return name.replace(/(\d)\.(\d)/g, "$1-$2");
}

/**
 * Replace every advisor tool in a Messages API body with a copy carrying Anthropic's model id.
 * The tools array and its objects are shared with the caller's request (combo fallbacks and the
 * semantic cache reuse it), so they are copied rather than edited in place.
 */
export function normalizeAdvisorToolModels(body: Record<string, unknown>): void {
  if (!Array.isArray(body.tools)) return;
  body.tools = body.tools.map((tool) => {
    if (!tool || typeof tool !== "object") return tool;
    const entry = tool as Record<string, unknown>;
    if (typeof entry.type !== "string" || !entry.type.startsWith("advisor_")) return tool;
    if (typeof entry.model !== "string") return tool;
    const model = normalizeAdvisorToolModel(entry.model);
    return model === entry.model ? tool : { ...entry, model };
  });
}
