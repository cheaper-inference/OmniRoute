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

/** Rewrite the `model` of every advisor tool in a Messages API body, in place. */
export function normalizeAdvisorToolModels(body: Record<string, unknown>): void {
  if (!Array.isArray(body.tools)) return;
  for (const tool of body.tools) {
    if (!tool || typeof tool !== "object") continue;
    const entry = tool as Record<string, unknown>;
    if (typeof entry.type !== "string" || !entry.type.startsWith("advisor_")) continue;
    if (typeof entry.model === "string") entry.model = normalizeAdvisorToolModel(entry.model);
  }
}
