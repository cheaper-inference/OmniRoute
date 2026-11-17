// Claude Code window env for a routed model. Pure and spawn-free on purpose: setup-claude.mjs
// is reached from an API route (sync-models), so it must not import launch.mjs (spawn-capable).

/**
 * Claude Code assumes 200K for a gateway model id it does not know, so 190000 is right for
 * windows of 200k or more. A smaller real window would overflow first: compact at 85% of it,
 * and declare the window itself because Claude Code accepts no compact window below 100000.
 * shortcut: no 1M marking for larger windows, a wrong 1M claim puts the safety net behind the
 * API limit; add it once the catalog windows are trusted.
 *
 * @param {number|string|undefined} contextWindow the routed model's real window, in tokens
 * @returns {Record<string,string>} CLAUDE_CODE_AUTO_COMPACT_WINDOW (when set) and, below 200k,
 *   CLAUDE_CODE_MAX_CONTEXT_TOKENS
 */
export function claudeWindowEnv(contextWindow) {
  const env = { CLAUDE_CODE_AUTO_COMPACT_WINDOW: "190000" };
  const window = Math.floor(Number(contextWindow));
  if (window > 0 && window < 200_000) {
    env.CLAUDE_CODE_MAX_CONTEXT_TOKENS = String(window);
    const compact = Math.floor(window * 0.85);
    if (compact >= 100_000) env.CLAUDE_CODE_AUTO_COMPACT_WINDOW = String(compact);
    else delete env.CLAUDE_CODE_AUTO_COMPACT_WINDOW;
  }
  return env;
}
