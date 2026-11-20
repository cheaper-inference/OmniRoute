#!/usr/bin/env node
// scripts/check/check-known-symbols.ts
// Anti-hallucination gate: known-symbol allow-lists. Kills the pattern "invented symbol
// that silently becomes a no-op" across six string/key-based dispatch surfaces:
//
//   (1) EXECUTOR CONFORMANCE — every entry registered in the executor map
//       (open-sse/executors/index.ts) MUST resolve, via getExecutor(), to a
//       BaseExecutor instance exposing execute() + getProvider(). An alias that
//       does not resolve to a valid executor is a dead symbol (routes to silent
//       fallback instead of failing).
//
//   (2) COMBO STRATEGIES — the dispatch MUST handle exactly the canonical set of
//       ROUTING_STRATEGY_VALUES ∪ INTERNAL_ROUTING_STRATEGY_VALUES
//       (src/shared/constants/routingStrategies.ts), except the implicit default strategies
//       documented in IMPLICIT_DEFAULT_STRATEGIES (canonical strategies
//       with no dispatch branch of their own; they fall through to default ordering). Instead of matching
//       `strategy === "..."` literals by regex over the source, the handled set
//       (handled) comes from a runtime enumeration imported from
//       open-sse/services/combo/strategyDispatch.ts — the module that imports the real
//       ordering/dispatch functions and lists which strategies they implement. Adding
//       a canonical value without wiring it into the dispatch/enumeration, or wiring a
//       non-canonical (invented) strategy string, fails here.
//
//   (3) TRANSLATOR PAIRS — the from:to pairs registered at runtime in the translator
//       registry (after bootstrap) are frozen in KNOWN_TRANSLATOR_PAIRS. Ratchet:
//       if a registered pair disappears, fail (format coverage regression). New
//       pairs do not fail — they are only reported — so legitimate additions are not blocked.
//
//   (4) MCP TOOLS — all tools registered in createMcpServer() (base MCP_TOOLS +
//       memoryTools + skillTools + gamificationTools + pluginTools + notionTools +
//       obsidianTools) MUST have at least one assigned scope (scope-enforcement). The
//       names are frozen in KNOWN_MCP_TOOL_NAMES. Ratchet: removed tool = fail.
//       New tool = report (does not block legitimate additions).
//
//   (5) A2A SKILLS — keys of A2A_SKILL_HANDLERS (src/lib/a2a/taskExecution.ts) MUST
//       bater bidirecionalmente com skills[].id expostos no Agent Card
//       (src/lib/a2a/agentCardMetadata.ts). Mismatch in either direction = fail.
//
//   (6) CLOUD AGENTS — AGENTS entries in src/lib/cloudAgent/registry.ts MUST match
//       bidirectionally with the class files in src/lib/cloudAgent/agents/
//       (basename without extension). Mismatch = fail.
//
// Ratchet: each pre-existing mismatch lives in a documented allowlist and is 0 today.
// Pattern inherited from scripts/check/check-provider-consistency.ts (a .ts gate via
// `node --import tsx` that IMPORTS real modules + pure functions + a guarded main()).
//
// Stale-enforcement (6A.3): the ONLY suppression allowlist of this gate is
// IMPLICIT_DEFAULT_STRATEGIES — each entry suppresses a `canonicalNotHandled` violation
// (canonical strategy with no dispatch branch). An entry that no longer suppresses
// any real violation (because the strategy gained a `strategy === "..."` branch)
// is stale → the gate fails with removal instructions, closing the silent-regression
// hole. The other lists (KNOWN_TRANSLATOR_PAIRS, KNOWN_MCP_TOOL_NAMES) are NOT
// suppression allowlists but ratchet snapshots (they fail on REMOVAL, not presence):
// an entry in them requires the pair/tool to stay ALIVE in the registry — the opposite of
// suppression — so stale-enforcement semantics do not apply to them.

import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve as resolvePath, basename, extname } from "node:path";
import { assertNoStale } from "./lib/allowlist.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolvePath(HERE, "..", "..");

// ───────────────────────────────────────────────────────────────────────────
// (2) COMBO STRATEGIES — canonical source + implicit defaults
// ───────────────────────────────────────────────────────────────────────────

/**
 * Canonical strategies that do NOT have a `strategy === "..."` branch in the
 * dispatch chain because they are the default behavior (no explicit reordering). Each
 * one documented. Add here if a canonical strategy has NO
 * `strategy === "..."` reference in combo.ts (otherwise extractHandledStrategies
 * already considers it handled and the entry becomes stale — stale-enforcement below fails).
 *
 * Currently empty: the `priority` entry was removed because combo.ts started
 * referencing `strategy === "priority"` (latency pre-screen in resolveComboTargets),
 * which makes `priority` already-handled by extractHandledStrategies — the suppression no
 * longer suppressed any `canonicalNotHandled` violation (it was stale). If the pre-screen
 * is removed in the future, `priority` will reappear as `canonicalNotHandled` and the gate
 * will ask to wire it into the dispatch OR re-document it here.
 */
export const IMPLICIT_DEFAULT_STRATEGIES: Record<string, string> = {};

/**
 * Extrai todas as strings literais de `strategy === "..."` / `strategy !== "..."`
 * da fonte do combo.
 *
 * Both forms count as wired dispatch. The god-file decomposition (#3501)
 * swaps `if (strategy === "X") { ...body... }` for a leaf `tryXDispatch()` whose
 * early-exit guard is `if (strategy !== "X") return null;` — same branch,
 * inverted form. Recognizing only `===` would make the gate flag `canonicalNotHandled`
 * for a strategy that is still perfectly wired, and would pressure the code to
 * contort itself to please the regex.
 */
export function extractHandledStrategies(comboSource: string): Set<string> {
  const handled = new Set<string>();
  const re = /strategy\s*[!=]==\s*"([a-z0-9-]+)"/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(comboSource)) !== null) {
    handled.add(match[1]);
  }
  return handled;
}

export type StrategyMismatch = {
  canonicalNotHandled: string[];
  handledNotCanonical: string[];
};

/**
 * Compares the canonical set (ROUTING_STRATEGY_VALUES) with the effectively
 * handled set (dispatch branches ∪ implicit defaults).
 *   - canonicalNotHandled: canonical strategy added without dispatch wiring.
 *   - handledNotCanonical: dispatch branch for a non-canonical (invented) string.
 */
export function diffComboStrategies(
  canonical: readonly string[],
  handled: Set<string>,
  implicitDefaults: Record<string, string>
): StrategyMismatch {
  const canonicalSet = new Set(canonical);
  const effectivelyHandled = new Set<string>(handled);
  for (const id of Object.keys(implicitDefaults)) effectivelyHandled.add(id);

  const canonicalNotHandled = [...canonicalSet].filter((s) => !effectivelyHandled.has(s));
  // Handled strings that are neither canonical NOR implicit defaults = invented.
  const handledNotCanonical = [...handled].filter(
    (s) => !canonicalSet.has(s) && !(s in implicitDefaults)
  );
  return { canonicalNotHandled, handledNotCanonical };
}

// ───────────────────────────────────────────────────────────────────────────
// (1) EXECUTOR CONFORMANCE — map parse + conformance validation
// ───────────────────────────────────────────────────────────────────────────

/**
 * Extracts the keys (aliases) of the `const executors = { ... }` object literal from the source
 * of open-sse/executors/index.ts. The map is not exported, so we enumerate from the source
 * (deterministic — it is a simple literal). Each key is validated at runtime via
 * getExecutor() in main().
 */
export function extractExecutorAliases(indexSource: string): string[] {
  const start = indexSource.indexOf("const lazyExecutors");
  if (start < 0) throw new Error("could not find 'const lazyExecutors' in executors/index.ts");
  const end = indexSource.indexOf("\n};", start);
  if (end < 0) throw new Error("could not find end of executors map (`\\n};`)");
  const block = indexSource.slice(start, end);
  const keyRe = /^\s*(?:"([^"]+)"|([A-Za-z0-9_$-]+))\s*:/gm;
  const keys: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = keyRe.exec(block)) !== null) {
    keys.push(match[1] ?? match[2]);
  }
  return keys;
}

/** Minimal public surface that every registered executor must expose. */
export type ExecutorLike = {
  execute?: unknown;
  getProvider?: unknown;
};

/**
 * Given the list of aliases and a resolver (getExecutor), returns the aliases that do NOT
 * resolve to a valid BaseExecutor (not an instance, or missing execute/getProvider).
 * isInstance is injected to keep the function pure/testable with synthetic inputs.
 *
 * The resolver is awaited: since #11421 registration is lazy and `getExecutor()` returns
 * a Promise (the class is only imported and constructed on first use). Without the await,
 * EVERY alias fails — a Promise is never `instanceof BaseExecutor` — and the check
 * stops protecting anything. A rejection also counts as non-conformant: with
 * lazy loading an alias's import may fail at runtime, and that is exactly the
 * dead symbol this sub-check exists to find.
 */
export async function findNonConformingExecutors(
  aliases: string[],
  resolve: (
    alias: string
  ) => PromiseLike<ExecutorLike | null | undefined> | ExecutorLike | null | undefined,
  isInstance: (value: unknown) => boolean
): Promise<string[]> {
  const verdicts = await Promise.all(
    aliases.map(async (alias) => {
      let ex: ExecutorLike | null | undefined;
      try {
        ex = await resolve(alias);
      } catch {
        return true; // the alias does not load — dead symbol
      }
      if (!ex || !isInstance(ex)) return true;
      return typeof ex.execute !== "function" || typeof ex.getProvider !== "function";
    })
  );
  return aliases.filter((_alias, index) => verdicts[index]);
}

// ───────────────────────────────────────────────────────────────────────────
// (3) TRANSLATOR PAIRS — frozen snapshot (ratchet: pairs must not disappear)
// ───────────────────────────────────────────────────────────────────────────

/**
 * Frozen from:to pairs, registered in the translator registry after bootstrap.
 * Real snapshot measured on 2026-06-09 (18 pairs). Ratchet: if a pair disappears, fail.
 * Adding a pair does NOT fail here (only reported) — only removals are regressions.
 * To re-record after legitimately adding/removing an adapter, update this list.
 */
export const KNOWN_TRANSLATOR_PAIRS: readonly string[] = [
  "antigravity:claude",
  "antigravity:openai",
  "claude:gemini",
  "claude:openai",
  // Naver CLOVA Studio Chat Completions v3 (native envelope, model in URL path).
  "clova:openai",
  "cursor:openai",
  "gemini:claude",
  "gemini:openai",
  "kiro:openai",
  "openai-responses:openai",
  "openai:antigravity",
  "openai:claude",
  "openai:clova",
  "openai:cursor",
  "openai:gemini",
  "openai:kiro",
  "openai:openai-responses",
];

/**
 * Frozen pairs that disappeared from the live registry (regression). frozen = snapshot;
 * live = pairs observed at runtime. Returns those in frozen but not in live.
 */
export function findMissingTranslatorPairs(frozen: readonly string[], live: Set<string>): string[] {
  return frozen.filter((pair) => !live.has(pair));
}

/** Live pairs not yet in the frozen snapshot (informational, does not fail). */
export function findNewTranslatorPairs(frozen: readonly string[], live: Set<string>): string[] {
  const frozenSet = new Set(frozen);
  return [...live].filter((pair) => !frozenSet.has(pair)).sort();
}

// ───────────────────────────────────────────────────────────────────────────
// (4) MCP TOOLS — scope check + ratchet snapshot
// ───────────────────────────────────────────────────────────────────────────

export type McpToolLike = {
  name: string;
  scopes?: string[] | readonly string[];
};

/**
 * Returns the names of tools that have no scopes assigned (empty array or
 * undefined). Every registered MCP tool must declare at least one scope so
 * that scope-enforcement can filter callers correctly.
 */
export function checkMcpToolsHaveScopes(tools: McpToolLike[]): string[] {
  return tools.filter((t) => !t.scopes || t.scopes.length === 0).map((t) => t.name);
}

/**
 * Returns tools in the frozen snapshot that are no longer in the live
 * registry (removals are regressions).
 */
export function findMissingMcpTools(frozen: readonly string[], live: Set<string>): string[] {
  return frozen.filter((name) => !live.has(name));
}

/**
 * Returns live tools not present in the frozen snapshot (additions are
 * informative, not failures).
 */
export function findNewMcpTools(frozen: readonly string[], live: Set<string>): string[] {
  const frozenSet = new Set(frozen);
  return [...live].filter((name) => !frozenSet.has(name)).sort();
}

/**
 * Snapshot of all MCP tool names registered by createMcpServer() as of
 * 2026-06-13. Catraca: tool removed = fail; tool added = informative report.
 * To update after an intentional removal/rename: edit this list and document
 * the reason in the commit message.
 *
 * Sources:
 *   - MCP_TOOLS (34 base tools: omniroute_* + compression + agent_skills)
 *   - memoryTools (3): omniroute_memory_*
 *   - skillTools (4): omniroute_skills_*
 *   - gamificationTools (8): gamification_*
 *   - pluginTools (8): plugin_*
 *   - notionTools (6): notion_*
 *   - obsidianTools (22): obsidian_*
 * agentSkillTools and compressionTools are included in MCP_TOOLS (deduped by RESERVED_MCP_NAMES).
 */
export const KNOWN_MCP_TOOL_NAMES: readonly string[] = [
  // MCP_TOOLS base (34)
  "omniroute_get_health",
  "omniroute_list_combos",
  "omniroute_get_combo_metrics",
  "omniroute_switch_combo",
  "omniroute_check_quota",
  "omniroute_route_request",
  "omniroute_cost_report",
  "omniroute_list_models_catalog",
  "omniroute_web_search",
  "omniroute_x_search",
  "omniroute_simulate_route",
  "omniroute_set_budget_guard",
  "omniroute_set_routing_strategy",
  "omniroute_set_resilience_profile",
  "omniroute_test_combo",
  "omniroute_get_provider_metrics",
  "omniroute_best_combo_for_task",
  "omniroute_explain_route",
  "omniroute_get_session_snapshot",
  "omniroute_db_health_check",
  "omniroute_sync_pricing",
  "omniroute_cache_stats",
  "omniroute_cache_flush",
  "omniroute_compression_status",
  "omniroute_compression_configure",
  "omniroute_set_compression_engine",
  "omniroute_list_compression_combos",
  "omniroute_compression_combo_stats",
  "omniroute_oneproxy_fetch",
  "omniroute_oneproxy_rotate",
  "omniroute_oneproxy_stats",
  "omniroute_agent_skills_list",
  "omniroute_agent_skills_get",
  "omniroute_agent_skills_coverage",
  // memoryTools (3)
  "omniroute_memory_search",
  "omniroute_memory_add",
  "omniroute_memory_clear",
  // skillTools (4)
  "omniroute_skills_list",
  "omniroute_skills_enable",
  "omniroute_skills_execute",
  "omniroute_skills_executions",
  // gamificationTools (8)
  "gamification_leaderboard",
  "gamification_rank",
  "gamification_profile",
  "gamification_badges",
  "gamification_transfer",
  "gamification_invite",
  "gamification_servers",
  "gamification_anomalies",
  // pluginTools (8)
  "plugin_list",
  "plugin_install",
  "plugin_activate",
  "plugin_deactivate",
  "plugin_uninstall",
  "plugin_configure",
  "plugin_executions",
  "plugin_scan",
  // notionTools (6)
  "notion_search",
  "notion_get_page",
  "notion_list_block_children",
  "notion_query_database",
  "notion_get_database",
  "notion_append_blocks",
  // obsidianTools (22)
  "obsidian_check_status",
  "obsidian_search_simple",
  "obsidian_search_structured",
  "obsidian_read_note",
  "obsidian_list_vault",
  "obsidian_get_document_map",
  "obsidian_get_note_metadata",
  "obsidian_get_active_file",
  "obsidian_get_periodic_note",
  "obsidian_get_tags",
  "obsidian_list_commands",
  "obsidian_write_note",
  "obsidian_append_note",
  "obsidian_patch_note",
  "obsidian_delete_note",
  "obsidian_move_note",
  "obsidian_execute_command",
  "obsidian_open_file",
  "obsidian_sync_status",
  "obsidian_sync_trigger",
  "obsidian_sync_conflicts",
  "obsidian_sync_resolve_conflict",
];

// ───────────────────────────────────────────────────────────────────────────
// (5) A2A SKILLS — bidirectional diff between handlers and agent card
// ───────────────────────────────────────────────────────────────────────────

export type A2ASkillDiff = {
  /** Skills registered in A2A_SKILL_HANDLERS but not exposed in the Agent Card */
  inHandlersNotCard: string[];
  /** Skills exposed in the Agent Card but not registered in A2A_SKILL_HANDLERS */
  inCardNotHandlers: string[];
};

/**
 * Bidirectionally diffs A2A skill handler keys against Agent Card skill IDs.
 * Both directions matter:
 *   - inHandlersNotCard: skill is routable but agents can't discover it
 *   - inCardNotHandlers: skill is advertised but calling it fails silently
 */
export function diffA2ASkills(handlers: Set<string>, agentCard: Set<string>): A2ASkillDiff {
  const inHandlersNotCard = [...handlers].filter((s) => !agentCard.has(s)).sort();
  const inCardNotHandlers = [...agentCard].filter((s) => !handlers.has(s)).sort();
  return { inHandlersNotCard, inCardNotHandlers };
}

// ───────────────────────────────────────────────────────────────────────────
// (6) CLOUD AGENTS — registry keys vs agent class files
// ───────────────────────────────────────────────────────────────────────────

export type CloudAgentDiff = {
  /** Registry keys with no corresponding agent file in agents/ */
  inRegistryNotFiles: string[];
  /** Agent files with no corresponding registry key */
  inFilesNotRegistry: string[];
};

/**
 * Bidirectionally diffs cloud agent registry keys against agent file basenames
 * (filename without extension, e.g. "codex.ts" → "codex"). Note: registry key
 * "codex-cloud" maps to file "codex.ts" — this mapping is handled by the
 * caller (main) which reads the actual class-name-to-key binding from registry.ts.
 * The pure function here just diffs two already-normalised sets.
 */
export function diffCloudAgents(
  registryKeys: Set<string>,
  agentFiles: Set<string>
): CloudAgentDiff {
  const inRegistryNotFiles = [...registryKeys].filter((k) => !agentFiles.has(k)).sort();
  const inFilesNotRegistry = [...agentFiles].filter((f) => !registryKeys.has(f)).sort();
  return { inRegistryNotFiles, inFilesNotRegistry };
}

/**
 * Reads the registry.ts source file and returns the set of provider IDs
 * (keys in the AGENTS object literal).
 */
export function extractCloudAgentRegistryKeys(registrySource: string): Set<string> {
  // Match the AGENTS object: find start, extract keys
  const start = registrySource.indexOf("const AGENTS: Record<string, CloudAgentBase> = {");
  if (start < 0) throw new Error("could not find `const AGENTS:` in cloudAgent/registry.ts");
  const end = registrySource.indexOf("\n};", start);
  if (end < 0) throw new Error("could not find end of AGENTS map");
  const block = registrySource.slice(start, end);
  // Match quoted or bare keys: "codex-cloud": or jules:
  const keyRe = /^\s*(?:"([^"]+)"|([A-Za-z0-9_$-]+))\s*:/gm;
  const keys = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = keyRe.exec(block)) !== null) {
    const key = match[1] ?? match[2];
    // Skip the TypeScript type annotation line
    if (key && key !== "Record") keys.add(key);
  }
  return keys;
}

/**
 * Lists agent file basenames (without extension) from the agents/ directory.
 * Maps known filename→registryKey aliases (e.g. "codex" → "codex-cloud").
 */
export const AGENT_FILE_TO_REGISTRY_KEY: Record<string, string> = {
  codex: "codex-cloud",
  // #4227: file agents/cursor.ts ↔ registry key "cursor-cloud" (distinct from the
  // OAuth chat provider `cursor`).
  cursor: "cursor-cloud",
};

// ───────────────────────────────────────────────────────────────────────────
// main() — imports real modules, reads sources, runs the six sub-checks
// ───────────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  if (!process.env.DATA_DIR?.trim()) delete process.env.DATA_DIR;
  if (process.env.OMNIROUTE_ALLOW_DEFAULT_DATA_DIR !== "1") {
    await import("../../tests/_setup/isolateDataDir.ts");
  }
  const failures: string[] = [];

  // ── (1) Executor conformance ──────────────────────────────────────────────
  const executorsMod = await import("@omniroute/open-sse/executors/index.ts");
  const getExecutor = executorsMod.getExecutor as (alias: string) => Promise<ExecutorLike>;
  const BaseExecutor = executorsMod.BaseExecutor as new (...args: never[]) => unknown;
  const indexSource = readFileSync(resolvePath(REPO_ROOT, "open-sse/executors/index.ts"), "utf8");
  const aliases = extractExecutorAliases(indexSource);
  if (aliases.length === 0) {
    failures.push(
      "[executor] parse of the `executors` map found no aliases (broken regex?)"
    );
  }
  const isExecutorInstance = (value: unknown) => value instanceof BaseExecutor;
  const badExecutors = await findNonConformingExecutors(aliases, getExecutor, isExecutorInstance);
  if (badExecutors.length) {
    failures.push(
      `[executor] ${badExecutors.length} registered alias(es) that do not resolve to a valid BaseExecutor (instance + execute() + getProvider()):\n` +
        badExecutors.map((a) => `    ✗ ${a}`).join("\n") +
        `\n    → check the entry in open-sse/executors/index.ts (class imported/exported and extends BaseExecutor).`
    );
  }

  // ── (2) Combo strategies ──────────────────────────────────────────────────
  // Canonical = user-facing ROUTING_STRATEGY_VALUES ∪ INTERNAL_ROUTING_STRATEGY_VALUES
  // (system-only strategies like "quota-share" are registered but hidden from the UI;
  // they still must have a real dispatch branch in combo.ts — enforced below).
  const strategiesMod = await import("@/shared/constants/routingStrategies.ts");
  const canonical = [
    ...(strategiesMod.ROUTING_STRATEGY_VALUES as readonly string[]),
    ...(strategiesMod.INTERNAL_ROUTING_STRATEGY_VALUES as readonly string[]),
  ];
  // G1: the handled set comes from a runtime-imported dispatch registry that imports the
  // actual strategy-ordering functions and enumerates which strategies they implement —
  // NOT from regex-scanning `strategy === "..."` literals in source. The old regex broke
  // when the dispatch was decomposed (Block J / #3501) and will break again when R0.3
  // converts it to a registry; enumerating at runtime keeps the gate correct either way.
  // Each entry in HANDLED_COMBO_STRATEGIES must stay in sync with a real dispatch branch.
  const strategyDispatchMod =
    await import("@omniroute/open-sse/services/combo/strategyDispatch.ts");
  const handled = new Set(strategyDispatchMod.HANDLED_COMBO_STRATEGIES as readonly string[]);

  // Stale-enforcement (6A.3): IMPLICIT_DEFAULT_STRATEGIES is a suppression allowlist —
  // each entry exists ONLY to suppress a `canonicalNotHandled` violation (a canonical
  // strategy with no `strategy === "..."` dispatch reference). The live violations it
  // suppresses are the canonical strategies NOT already in `handled` (computed with an
  // EMPTY implicit-defaults map). An entry whose key IS already in `handled` suppresses
  // nothing → it is stale and the gate must fail asking for its removal.
  const liveImplicitNeeded = diffComboStrategies(canonical, handled, {}).canonicalNotHandled;
  assertNoStale(
    Object.keys(IMPLICIT_DEFAULT_STRATEGIES),
    liveImplicitNeeded,
    "known-symbols:combo"
  );

  const { canonicalNotHandled, handledNotCanonical } = diffComboStrategies(
    canonical,
    handled,
    IMPLICIT_DEFAULT_STRATEGIES
  );
  if (canonicalNotHandled.length) {
    failures.push(
      `[combo] ${canonicalNotHandled.length} canonical strategy(ies) with no dispatch branch in combo.ts:\n` +
        canonicalNotHandled.map((s) => `    ✗ ${s}`).join("\n") +
        `\n    → wire it into the dispatch (`strategy === "${canonicalNotHandled[0]}"`) or document it in IMPLICIT_DEFAULT_STRATEGIES.`
    );
  }
  if (handledNotCanonical.length) {
    failures.push(
      `[combo] ${handledNotCanonical.length} handled strategy string(s) in dispatch but absent from ROUTING_STRATEGY_VALUES (invented/orphaned):\n` +
        handledNotCanonical.map((s) => `    ✗ ${s}`).join("\n") +
        `\n    → register it in src/shared/constants/routingStrategies.ts or remove the dead branch.`
    );
  }

  // ── (3) Translator pairs ──────────────────────────────────────────────────
  await import("@omniroute/open-sse/translator/bootstrap.ts").then((m) =>
    (m.bootstrapTranslatorRegistry as () => void)()
  );
  const formatsMod = await import("@omniroute/open-sse/translator/formats.ts");
  const registryMod = await import("@omniroute/open-sse/translator/registry.ts");
  const FORMATS = formatsMod.FORMATS as Record<string, string>;
  const getRequestTranslator = registryMod.getRequestTranslator as (
    from: string,
    to: string
  ) => unknown;
  const getResponseTranslator = registryMod.getResponseTranslator as (
    from: string,
    to: string
  ) => unknown;
  const formatIds = Object.values(FORMATS);
  const livePairs = new Set<string>();
  for (const from of formatIds) {
    for (const to of formatIds) {
      if (from === to) continue;
      if (getRequestTranslator(from, to) || getResponseTranslator(from, to)) {
        livePairs.add(`${from}:${to}`);
      }
    }
  }
  const missingPairs = findMissingTranslatorPairs(KNOWN_TRANSLATOR_PAIRS, livePairs);
  if (missingPairs.length) {
    failures.push(
      `[translator] ${missingPairs.length} frozen from:to pair(s) disappeared from the live registry (regression):\n` +
        missingPairs.map((p) => `    ✗ ${p}`).join("\n") +
        `\n    → restore the adapter in open-sse/translator/ or, if the removal was intentional, update KNOWN_TRANSLATOR_PAIRS.`
    );
  }
  const newPairs = findNewTranslatorPairs(KNOWN_TRANSLATOR_PAIRS, livePairs);

  // ── (4) MCP tools scope + snapshot ───────────────────────────────────────
  const { MCP_TOOLS } = await import("@omniroute/open-sse/mcp-server/schemas/tools.ts");
  const { memoryTools } = await import("@omniroute/open-sse/mcp-server/tools/memoryTools.ts");
  const { skillTools } = await import("@omniroute/open-sse/mcp-server/tools/skillTools.ts");
  const { gamificationTools } =
    await import("@omniroute/open-sse/mcp-server/tools/gamificationTools.ts");
  const { pluginTools } = await import("@omniroute/open-sse/mcp-server/tools/pluginTools.ts");
  const { notionTools } = await import("@omniroute/open-sse/mcp-server/tools/notionTools.ts");
  const { obsidianTools } = await import("@omniroute/open-sse/mcp-server/tools/obsidianTools.ts");

  // Build the full live set of registered tools (deduped by RESERVED_MCP_NAMES logic:
  // agentSkillTools + compressionTools are already in MCP_TOOLS).
  const liveMcpTools: McpToolLike[] = [
    ...(MCP_TOOLS as unknown as McpToolLike[]),
    ...Object.values(memoryTools as Record<string, McpToolLike>),
    ...Object.values(skillTools as Record<string, McpToolLike>),
    ...(gamificationTools as unknown as McpToolLike[]),
    ...(pluginTools as unknown as McpToolLike[]),
    ...(notionTools as unknown as McpToolLike[]),
    ...(obsidianTools as unknown as McpToolLike[]),
  ];
  const liveMcpToolNames = new Set(liveMcpTools.map((t) => t.name));

  // 4a. Every registered tool must have at least one scope.
  const toolsWithoutScopes = checkMcpToolsHaveScopes(liveMcpTools);
  if (toolsWithoutScopes.length) {
    failures.push(
      `[mcp-tools] ${toolsWithoutScopes.length} tool(s) with no assigned scope(s) — every registered tool must have at least 1 scope for scope-enforcement:\n` +
        toolsWithoutScopes.map((n) => `    ✗ ${n}`).join("\n") +
        `\n    → add the scopes: [...] field to the tool definition.`
    );
  }

  // 4b. Snapshot catraca: tools removed are regressions.
  const missingMcpTools = findMissingMcpTools(KNOWN_MCP_TOOL_NAMES, liveMcpToolNames);
  if (missingMcpTools.length) {
    failures.push(
      `[mcp-tools] ${missingMcpTools.length} frozen tool(s) disappeared from the live registry (regression):\n` +
        missingMcpTools.map((n) => `    ✗ ${n}`).join("\n") +
        `\n    → restore the tool or, if the removal was intentional, update KNOWN_MCP_TOOL_NAMES.`
    );
  }
  const newMcpTools = findNewMcpTools(KNOWN_MCP_TOOL_NAMES, liveMcpToolNames);

  // ── (5) A2A skills ───────────────────────────────────────────────────────
  const { A2A_SKILL_HANDLERS } = await import("@/lib/a2a/taskExecution.ts");
  const handlerKeys = new Set(Object.keys(A2A_SKILL_HANDLERS as Record<string, unknown>));

  // Parse the Agent Card route statically (the skills array is a literal in the source).
  const agentCardSource = readFileSync(
    resolvePath(REPO_ROOT, "src/lib/a2a/agentCardMetadata.ts"),
    "utf8"
  );
  // Extract skill IDs: `id: "..."` lines inside the skills array.
  const skillIdRe = /\bid:\s*"([^"]+)"/g;
  const agentCardSkills = new Set<string>();
  let skillMatch: RegExpExecArray | null;
  while ((skillMatch = skillIdRe.exec(agentCardSource)) !== null) {
    agentCardSkills.add(skillMatch[1]);
  }
  if (agentCardSkills.size === 0) {
    failures.push(
      "[a2a-skills] parse of the Agent Card found no skill id (broken regex or file moved?)"
    );
  }

  const { inHandlersNotCard, inCardNotHandlers } = diffA2ASkills(handlerKeys, agentCardSkills);
  if (inHandlersNotCard.length) {
    failures.push(
      `[a2a-skills] ${inHandlersNotCard.length} skill(s) in A2A_SKILL_HANDLERS but absent from the Agent Card (agents cannot discover them):\n` +
        inHandlersNotCard.map((s) => `    ✗ ${s}`).join("\n") +
        `\n    → add the skill in src/lib/a2a/agentCardMetadata.ts (skills array).`
    );
  }
  if (inCardNotHandlers.length) {
    failures.push(
      `[a2a-skills] ${inCardNotHandlers.length} skill(s) exposed in the Agent Card but absent from A2A_SKILL_HANDLERS (call silently fails):\n` +
        inCardNotHandlers.map((s) => `    ✗ ${s}`).join("\n") +
        `\n    → register the handler in src/lib/a2a/taskExecution.ts (A2A_SKILL_HANDLERS).`
    );
  }

  // ── (6) Cloud agents ─────────────────────────────────────────────────────
  const registrySource = readFileSync(
    resolvePath(REPO_ROOT, "src/lib/cloudAgent/registry.ts"),
    "utf8"
  );
  const registryKeys = extractCloudAgentRegistryKeys(registrySource);

  // Read agent file basenames from agents/ directory, applying the alias map.
  const agentsDir = resolvePath(REPO_ROOT, "src/lib/cloudAgent/agents");
  const agentFileBases = new Set(
    readdirSync(agentsDir)
      .filter((f) => /\.(ts|js)$/.test(f) && !f.endsWith(".d.ts") && !f.endsWith(".test.ts"))
      .map((f) => {
        const base = basename(f, extname(f));
        return AGENT_FILE_TO_REGISTRY_KEY[base] ?? base;
      })
  );

  const { inRegistryNotFiles, inFilesNotRegistry } = diffCloudAgents(registryKeys, agentFileBases);
  if (inRegistryNotFiles.length) {
    failures.push(
      `[cloud-agents] ${inRegistryNotFiles.length} key(s) in the registry with no class file in agents/:\n` +
        inRegistryNotFiles.map((k) => `    ✗ ${k}`).join("\n") +
        `\n    → create the file src/lib/cloudAgent/agents/<name>.ts or update AGENT_FILE_TO_REGISTRY_KEY.`
    );
  }
  if (inFilesNotRegistry.length) {
    failures.push(
      `[cloud-agents] ${inFilesNotRegistry.length} file(s) in agents/ with no registry entry:\n` +
        inFilesNotRegistry.map((f) => `    ✗ ${f}`).join("\n") +
        `\n    → register the agent in src/lib/cloudAgent/registry.ts or add the alias in AGENT_FILE_TO_REGISTRY_KEY.`
    );
  }

  // ── Result ────────────────────────────────────────────────────────────────
  if (failures.length) {
    console.error(
      `[known-symbols] ${failures.length} sub-checagem(ns) falharam:\n\n${failures.join("\n\n")}`
    );
    process.exit(1);
  }
  // assertNoStale (combo) sets process.exitCode=1 without throwing — do not print the OK
  // misleading message; the stale message was already logged to stderr by the helper.
  if (process.exitCode === 1) return;

  const newPairsNote = newPairs.length
    ? ` (${newPairs.length} new/unfrozen pair(s): ${newPairs.join(", ")} — update KNOWN_TRANSLATOR_PAIRS if intentional)`
    : "";
  const newMcpNote = newMcpTools.length
    ? ` (${newMcpTools.length} new/unfrozen tool(s): ${newMcpTools.join(", ")} — update KNOWN_MCP_TOOL_NAMES if intentional)`
    : "";
  console.log(
    `[known-symbols] OK — ` +
      `${aliases.length} conformant executors; ` +
      `${canonical.length} canonical strategies (${handled.size} via dispatch + ${Object.keys(IMPLICIT_DEFAULT_STRATEGIES).length} implicit default(s)); ` +
      `${livePairs.size} live translator pairs vs ${KNOWN_TRANSLATOR_PAIRS.length} frozen${newPairsNote}; ` +
      `${liveMcpToolNames.size} MCP tools (${toolsWithoutScopes.length === 0 ? "all with scope" : `${toolsWithoutScopes.length} without scope`}) vs ${KNOWN_MCP_TOOL_NAMES.length} frozen${newMcpNote}; ` +
      `${handlerKeys.size} A2A skills (handlers↔card OK); ` +
      `${registryKeys.size} cloud agents (registry↔files OK)`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main().catch((err) => {
    console.error(
      `[known-symbols] erro fatal: ${err instanceof Error ? err.message : String(err)}`
    );
    process.exit(1);
  });
}
