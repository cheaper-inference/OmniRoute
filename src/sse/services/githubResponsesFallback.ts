/**
 * Last-resort wire format for GitHub Copilot GPT ids that no catalog knows yet.
 *
 * Copilot serves its newest GPT models (gpt-6-*, gpt-5.5+) on /responses only. When an id is
 * missing from the static seed and no live /models sync has run, nothing tags it as
 * "openai-responses": the body is built for Chat Completions, the request lands on
 * /chat/completions, and Copilot rejects it with 400 ("... use /v1/responses").
 *
 * The inference runs at model-format resolution (not in the executor) so the body translation and
 * the executor's URL choice stay coherent. Callers apply it only when no explicit source exists:
 * custom-model / compat-override targetFormat, a synced catalog row, or a static registry row.
 * Claude and Gemini ids are excluded: Copilot's /responses endpoint rejects them.
 */

const GITHUB_RESPONSES_ONLY_GPT = /^gpt-(?:[6-9]|5\.[5-9])/i;
const NON_RESPONSES_FAMILY = /claude|gemini/i;

export function inferGithubUnsyncedTargetFormat(
  providerId: string,
  modelId: string
): "openai-responses" | undefined {
  if (providerId !== "github") return undefined;
  if (!GITHUB_RESPONSES_ONLY_GPT.test(modelId) || NON_RESPONSES_FAMILY.test(modelId)) {
    return undefined;
  }
  return "openai-responses";
}
