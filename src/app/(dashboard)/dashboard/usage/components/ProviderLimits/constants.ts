export const PROVIDER_LABEL: Record<string, string> = {
  chatgpt: "ChatGPT",
  antigravity: "Antigravity",
  github: "GitHub Copilot",
  kiro: "Kiro AI",
  "amazon-q": "Amazon Q",
  codex: "OpenAI Codex",
  claude: "Claude Code",
  glm: "GLM (Z.AI)",
  zai: "Z.AI",
  glmt: "GLM Thinking",
  "opencode-go": "OpenCode Go",
  "ollama-cloud": "Ollama Cloud",
  moonshot: "Kimi",
  "kimi-coding": "Kimi Coding",
  minimax: "MiniMax",
  "minimax-cn": "MiniMax CN",
  nanogpt: "NanoGPT",
  nan: "NaN.Builders",
  apmix: "Apmix",
  deepseek: "DeepSeek",
  "xai-oauth": "xAI OAuth (Grok)",
  "grok-cli": "Grok Build",
  llmgateway: "LLM Gateway",
  lyceum: "Lyceum",
  clinepass: "ClinePass",
};


/** A node the quota page can name: id plus whichever label the operator set. */
export interface ProviderNodeLabel {
  id?: unknown;
  name?: unknown;
  prefix?: unknown;
}

/**
 * Labels for the quota page. Built-in providers come from PROVIDER_LABEL; a custom
 * node's generated id is not in that table, so its name (then prefix) fills the gap.
 * A node that sets neither is left out and the page shows the id, as before.
 */
export function providerLabelsWithNodes(
  nodes: ProviderNodeLabel[] | null | undefined
): Record<string, string> {
  const labels: Record<string, string> = { ...PROVIDER_LABEL };
  for (const node of nodes || []) {
    const id = typeof node?.id === "string" ? node.id : "";
    const name = typeof node?.name === "string" ? node.name.trim() : "";
    const prefix = typeof node?.prefix === "string" ? node.prefix.trim() : "";
    if (id && (name || prefix)) labels[id] = name || prefix;
  }
  return labels;
}

export const PROVIDER_ORDER: Record<string, number> = {
  antigravity: 1,
  github: 3,
  codex: 4,
  claude: 5,
  kiro: 6,
  glm: 7,
  zai: 8,
  glmt: 9,
  "opencode-go": 10,
  "ollama-cloud": 11,
  "kimi-coding": 12,
  minimax: 13,
  "minimax-cn": 14,
  nanogpt: 15,
  "xai-oauth": 16,
  "grok-cli": 17,
  llmgateway: 18,
  lyceum: 19,
  clinepass: 20,
};

export const TIER_FILTERS = [
  { key: "all", labelKey: "tierAll" },
  { key: "enterprise", labelKey: "tierEnterprise" },
  { key: "team", labelKey: "tierTeam" },
  { key: "business", labelKey: "tierBusiness" },
  { key: "ultra", labelKey: "tierUltra" },
  { key: "pro", labelKey: "tierPro" },
  { key: "plus", labelKey: "tierPlus" },
  { key: "lite", labelKey: "tierLite" },
  { key: "free", labelKey: "tierFree" },
  { key: "unknown", labelKey: "tierUnknown" },
];
