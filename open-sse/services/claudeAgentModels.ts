/**
 * Claude Agent live model discovery: asks the vendored CLI (through the Agent
 * SDK's supportedModels()) which models the host login actually exposes.
 * The static REGISTRY list stays the catalog fallback; this source reflects
 * the real account and feeds the provider status surface.
 */
import {
  resolveClaudeAgentSdk,
  resolveClaudeCodeExecutable,
} from "../utils/claudeAgentSdk.ts";

export interface ClaudeAgentDiscoveredModel {
  id: string;
  name: string;
  description?: string;
  supportsEffort?: boolean;
  supportedEffortLevels?: string[];
}

export interface ClaudeAgentModelsResult {
  source: "cli" | "unavailable";
  models: ClaudeAgentDiscoveredModel[];
  error?: string;
}

const DISCOVERY_TIMEOUT_MS = 30_000;
const CACHE_TTL_MS = 10 * 60_000;

let cache: { at: number; result: ClaudeAgentModelsResult } | null = null;

/** Live model discovery from the vendored CLI; cached 10 minutes. */
export async function discoverClaudeAgentModels(): Promise<ClaudeAgentModelsResult> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.result;
  const result = await probeModels();
  cache = { at: Date.now(), result };
  return result;
}

export function clearClaudeAgentModelsCache(): void {
  cache = null;
}

async function probeModels(): Promise<ClaudeAgentModelsResult> {
  const sdk = await resolveClaudeAgentSdk();
  const cliPath = resolveClaudeCodeExecutable(sdk);
  if (!sdk || !cliPath) return { source: "unavailable", models: [] };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DISCOVERY_TIMEOUT_MS);
  try {
    const query = sdk.query({
      // Discovery only: the prompt stream is never consumed;
      // supportedModels() resolves from the CLI init frame, then the child
      // is torn down in the finally block.
      prompt: neverEndingPrompt(),
      options: {
        maxTurns: 1,
        tools: [],
        permissionMode: "dontAsk",
        settingSources: [],
        pathToClaudeCodeExecutable: cliPath,
        abortController: controller,
      },
    });
    const rows = (await query.supportedModels()) ?? [];
    return { source: "cli", models: mapModelRows(rows) };
  } catch (err) {
    return {
      source: "unavailable",
      models: [],
      error: err instanceof Error ? err.message : String(err),
    };
  } finally {
    clearTimeout(timer);
    controller.abort();
  }
}

// Discovery never needs a turn; the generator waits until abort() tears the
// child process down.
async function* neverEndingPrompt(): AsyncGenerator<never> {
  await new Promise<void>(() => {});
  yield* [];
}

/** SDK ModelInfo rows → catalog-shaped rows; drops the "default" alias row. */
export function mapModelRows(
  rows: Array<{
    value: string;
    displayName?: string;
    description?: string;
    supportsEffort?: boolean;
    supportedEffortLevels?: string[];
  }>
): ClaudeAgentDiscoveredModel[] {
  // First-party models only: bare aliases (opus/sonnet/haiku/fable) and
  // claude-* ids, after stripping the CLI's cmd//claude/ routing prefixes
  // (a router-backed CLI may otherwise leak third-party vendor models here).
  // The original value stays as the id — that is what the CLI accepts.
  const seen = new Set<string>();
  const out: ClaudeAgentDiscoveredModel[] = [];
  for (const row of rows) {
    if (!row.value || row.value === "default") continue;
    let normalized = row.value;
    while (normalized.startsWith("cmd/") || normalized.startsWith("claude/")) {
      normalized = normalized.slice(normalized.indexOf("/") + 1);
    }
    if (!/^claude-/.test(normalized) && !/^(opus|sonnet|haiku|fable)$/.test(normalized)) {
      continue;
    }
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    out.push({
      id: row.value,
      name: row.displayName || row.value,
      description: row.description || undefined,
      supportsEffort: row.supportsEffort,
      supportedEffortLevels: row.supportedEffortLevels,
    });
  }
  return out;
}
