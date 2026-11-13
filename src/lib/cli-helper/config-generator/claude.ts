import path from "node:path";
import os from "node:os";

import { mergeJsonConfig, readJsonValue } from "./jsonMerge.ts";

const CONFIG_PATH = path.join(os.homedir(), ".claude", "settings.json");

export function generateClaudeConfig(options: {
  baseUrl: string;
  apiKey: string;
  model?: string;
  configPath?: string;
}): string {
  let base = options.baseUrl;
  let end = base.length;
  while (end > 0 && base[end - 1] === "/") end--;
  base = end < base.length ? base.slice(0, end) : base;
  if (base.endsWith("/v1")) base = base.slice(0, -3);
  const existingModel = readJsonValue(options.configPath, ["model"]);
  const model =
    options.model ||
    (typeof existingModel === "string" && existingModel) ||
    "claude-3-5-sonnet-20241022";

  // Only these keys are OmniRoute's; permissions, hooks, statusLine and other env stay.
  return mergeJsonConfig(options.configPath, [
    [["model"], model],
    [["env", "ANTHROPIC_BASE_URL"], base],
    [["env", "ANTHROPIC_AUTH_TOKEN"], options.apiKey],
    [["env", "ANTHROPIC_MODEL"], model],
    [["env", "CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY"], "1"],
  ]);
}
