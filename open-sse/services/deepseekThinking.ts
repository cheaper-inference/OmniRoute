/**
 * DeepSeek V4 thinking mode vs forced tool choice (#20639).
 *
 * DeepSeek's Chat Completions API rejects `tool_choice: "required"` and named-tool
 * choices with HTTP 400 while thinking mode is on, and V4 thinks by default. Whether
 * thinking is on is only known once the final body is built (a `-none` model alias becomes
 * `reasoning_effort: "none"` late), so this is decided at the resolved-target boundary,
 * not from a per-model flag.
 *
 * Mode precedence follows the DeepSeek docs: a `thinking` object decides on its own `type`;
 * with no `thinking` object, `reasoning_effort: "none"` turns thinking off; anything else
 * (including no field at all) leaves it on.
 */
import { isForcedToolChoice } from "../utils/toolChoice.ts";

type JsonRecord = Record<string, unknown>;

/** Native DeepSeek V4 family: deepseek-v4-*, deepseek-v4.1-* and the deepseek-flash alias. */
const DEEPSEEK_THINKING_MODEL_PATTERN = /^deepseek-(?:v4|flash)(?:[._-]|$)/i;

export function isDeepSeekThinkingModel(
  provider: string | null | undefined,
  model: string | null | undefined
): boolean {
  if (provider !== "deepseek" || typeof model !== "string") return false;
  const bare = model.slice(model.lastIndexOf("/") + 1);
  return DEEPSEEK_THINKING_MODEL_PATTERN.test(bare);
}

export function isDeepSeekThinkingActive(body: JsonRecord): boolean {
  const thinking = body.thinking;
  if (thinking !== null && typeof thinking === "object" && !Array.isArray(thinking)) {
    return (thinking as JsonRecord).type !== "disabled";
  }
  const effort = body.reasoning_effort;
  return !(typeof effort === "string" && effort.trim().toLowerCase() === "none");
}

/** True when the body pairs a forced tool choice with thinking on for a DeepSeek V4 target. */
export function shouldDropForcedToolChoiceForDeepSeek(
  body: JsonRecord,
  provider: string | null | undefined,
  model: string | null | undefined
): boolean {
  return (
    isDeepSeekThinkingModel(provider, model) &&
    isForcedToolChoice(body.tool_choice) &&
    isDeepSeekThinkingActive(body)
  );
}
