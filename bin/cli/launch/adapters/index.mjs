/**
 * Lazy launch adapter index: static metadata for every adapter whose tier is not "later", in
 * adapter (file) order, so startup can resolve ids, aliases and help text without importing
 * any adapter module. `load()` imports the adapter on demand.
 *
 * Fields mirror the adapter itself: `displayName` is `adapter.displayName` (undefined when the
 * adapter has none; the registry then falls back to the manifest), `tier` is
 * `adapter.capabilities.tier`, `aliases` is `adapter.aliases` (empty when none).
 * tests/unit/cli/launch/registry.test.ts checks this index against ./all.mjs so it cannot
 * drift: update both together when adding or changing an adapter.
 */

const entry = (id, displayName, tier, load) =>
  Object.freeze({ id, displayName, tier, aliases: Object.freeze([]), load });

export const ADAPTER_INDEX = Object.freeze([
  entry("aider", "Aider", "core", () => import("./aider.mjs").then((m) => m.default)),
  entry("claude", undefined, "core", () => import("./claude.mjs").then((m) => m.default)),
  entry("cline", "Cline", "core", () => import("./cline.mjs").then((m) => m.default)),
  entry("codex", undefined, "core", () => import("./codex.mjs").then((m) => m.default)),
  entry("continue", "Continue CLI", "supported", () =>
    import("./continue.mjs").then((m) => m.default)
  ),
  entry("copilot", "GitHub Copilot CLI", "supported", () =>
    import("./copilot.mjs").then((m) => m.default)
  ),
  entry("crush", "Crush", "core", () => import("./crush.mjs").then((m) => m.default)),
  entry("deepseek", "DeepSeek Harness", "core", () =>
    import("./deepseek.mjs").then((m) => m.default)
  ),
  entry("gemini", "Gemini CLI", "supported", () => import("./gemini.mjs").then((m) => m.default)),
  entry("goose", "Goose", "supported", () => import("./goose.mjs").then((m) => m.default)),
  entry("hermes", "Hermes Agent", "core", () => import("./hermes.mjs").then((m) => m.default)),
  entry("kilo", "Kilo Code CLI", "supported", () => import("./kilo.mjs").then((m) => m.default)),
  entry("kimi", "Kimi Code CLI", "supported", () => import("./kimi.mjs").then((m) => m.default)),
  entry("omp", "Oh My Pi", "core", () => import("./omp.mjs").then((m) => m.default)),
  entry("openclaw", "OpenClaw", "core", () => import("./openclaw.mjs").then((m) => m.default)),
  entry("opencode", "OpenCode", "core", () => import("./opencode.mjs").then((m) => m.default)),
  entry("pi", "Pi", "core", () => import("./pi.mjs").then((m) => m.default)),
  entry("pool", "Poolside Pool", "supported", () => import("./pool.mjs").then((m) => m.default)),
  entry("qwen", "Qwen Code", "core", () => import("./qwen.mjs").then((m) => m.default)),
]);
