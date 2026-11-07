/**
 * Last-resort wire format for GitHub Copilot ids that no catalog tags as Responses-only.
 *
 * Copilot serves its newest GPT models (gpt-6-*, gpt-5.5+) and the codex ids on /responses only.
 * When such an id has no explicit format source, nothing tags it as "openai-responses": the body
 * is built for Chat Completions, the request lands on /chat/completions, and Copilot rejects it
 * with 400 ("... use /v1/responses").
 *
 * Applies to the `github`, `gh` and `ghe-copilot` provider ids, with or without a provider prefix
 * on the model id. A synced catalog row that persists no chat endpoint (discovery saved the id
 * without `supported_endpoints`) does not count as an explicit source, so such a row is inferred
 * as Responses too. Contract change from #15337: a metadata-free synced `gpt-6-*` row used to stay
 * on Chat Completions, it now goes to /responses.
 *
 * The inference runs at model-format resolution (not in the executor) so the body translation and
 * the executor's URL choice stay coherent. Callers apply it only when no explicit source exists:
 * custom-model / compat-override targetFormat, a synced row that declares a chat endpoint, or a
 * static registry row. Claude and Gemini ids are excluded: Copilot's /responses endpoint rejects
 * them.
 */

const GITHUB_RESPONSES_ONLY_GPT = /^(?:.*codex.*|gpt-(?:[6-9]|5\.[5-9]).*)$/i;
const NON_RESPONSES_FAMILY = /claude|gemini/i;

export function inferGithubUnsyncedTargetFormat(
  providerId: string,
  modelId: string
): "openai-responses" | undefined {
  if (providerId !== "github" && providerId !== "gh" && providerId !== "ghe-copilot") {
    return undefined;
  }
  const bareModelId = modelId.replace(/^(?:github|gh|ghe-copilot)\//i, "");
  if (!GITHUB_RESPONSES_ONLY_GPT.test(bareModelId) || NON_RESPONSES_FAMILY.test(bareModelId)) {
    return undefined;
  }
  return "openai-responses";
}
