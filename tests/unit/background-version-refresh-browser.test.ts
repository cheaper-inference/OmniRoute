/**
 * Background client-version refreshes must never start from a browser bundle.
 *
 * The provider registry is bundled into the dashboard, so the sync version getters
 * below run in the browser too. Their guards checked `typeof process === "undefined"`
 * (or nothing), but Next.js gives browser code a `process` object, so every full page
 * load fired anonymous lookups against api.github.com (60 requests/hour per IP, shared
 * with the server's own refresh) and the npm registry, and surfaced as
 * "403 rate limit exceeded" in the dashboard console once the GitHub budget ran out.
 *
 * Each getter is checked twice: with a browser `window` present no fetch may start,
 * and without one the same getter must still start its refresh (so the browser case
 * is not passing just because the refresh is skipped for another reason).
 */
import test from "node:test";
import assert from "node:assert/strict";

// Installed before any import: some modules capture `fetch` at load time.
const fetchCalls: string[] = [];
const realFetch = globalThis.fetch;
globalThis.fetch = (async (input: string | URL | Request) => {
  fetchCalls.push(
    typeof input === "string" ? input : input instanceof URL ? input.href : input.url
  );
  return new Response("{}", { status: 503 });
}) as typeof fetch;

const codex = await import("../../open-sse/config/codexClient.ts");
const profiles = await import("../../open-sse/config/providerHeaderProfiles.ts");
const kimi = await import("../../open-sse/config/providers/registry/kimi/coding/runtime.ts");
const zed = await import("../../open-sse/executors/zedClientVersion.ts");
const opencode = await import("../../open-sse/utils/opencodeHeaders.ts");
const claude = await import("../../src/shared/constants/claudeCodeClient.ts");
const gemini = await import("../../src/shared/constants/geminiCliClient.ts");

type Getter = {
  name: string;
  host: RegExp;
  call: () => unknown;
  reset: () => void;
};

const GETTERS: Getter[] = [
  {
    name: "Codex CLI (GitHub releases)",
    host: /api\.github\.com\/repos\/openai\/codex/,
    call: () => codex.getCodexClientVersion(),
    reset: () => codex.clearCodexClientVersionCache(),
  },
  {
    name: "Zed (GitHub releases)",
    host: /api\.github\.com\/repos\/zed-industries\/zed/,
    call: () => zed.getZedClientVersion(),
    reset: () => zed.resetZedClientVersionCache(),
  },
  {
    name: "GitHub Copilot CLI (npm)",
    host: /registry\.npmjs\.org\/@github\/copilot/,
    call: () => profiles.getGitHubCopilotCliVersion(),
    reset: () => profiles.resetGitHubCopilotCliVersionCache(),
  },
  {
    name: "Qwen Code (npm)",
    host: /registry\.npmjs\.org\/@qwen-code/,
    call: () => profiles.getQwenCliVersion(),
    reset: () => profiles.resetQwenCliVersionCache(),
  },
  {
    name: "CodeBuddy CN (npm)",
    host: /registry\.npmjs\.org\/@tencent-ai\/codebuddy-code/,
    call: () => profiles.getCodeBuddyCnUserAgent(),
    reset: () => profiles.resetCodeBuddyCnVersionCache(),
  },
  {
    name: "Kimi Code CLI (npm)",
    host: /registry\.npmjs\.org\/@moonshot-ai\/kimi-code/,
    call: () => kimi.getKimiCodeCliVersion(),
    reset: () => kimi.resetKimiCodeCliVersionCache(),
  },
  {
    name: "OpenCode CLI (npm)",
    host: /registry\.npmjs\.org\/opencode-ai/,
    call: () => opencode.resolveOpencodeCliDefaults("opencode", false),
    reset: () => {},
  },
  {
    name: "Claude Code (npm)",
    host: /registry\.npmjs\.org\/@anthropic-ai\/claude-code/,
    call: () => claude.getClaudeCodeClientVersion(),
    reset: () => claude.resetClaudeCodeClientVersionCache(),
  },
  {
    name: "Gemini CLI (npm)",
    host: /registry\.npmjs\.org\/@google\/gemini-cli/,
    call: () => gemini.getGeminiCliClientVersion(),
    reset: () => gemini.resetGeminiCliClientVersionCache(),
  },
];

// The getters skip their refresh under a test runner; clear those markers for the
// duration of each check so the production path is the one exercised.
const RUNNER_ENV = ["NODE_TEST_CONTEXT", "VITEST", "NODE_ENV"] as const;

async function outsideTestRunner<T>(fn: () => Promise<T>): Promise<T> {
  const saved = RUNNER_ENV.map((key) => [key, process.env[key]] as const);
  for (const key of RUNNER_ENV) delete process.env[key];
  try {
    return await fn();
  } finally {
    for (const [key, value] of saved) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

async function withBrowserWindow<T>(fn: () => Promise<T>): Promise<T> {
  const g = globalThis as { window?: unknown };
  g.window = {};
  try {
    return await fn();
  } finally {
    delete g.window;
  }
}

/** Runs the getter and lets any started refresh reach its fetch and settle. */
async function fetchesStartedBy(getter: Getter): Promise<number> {
  const before = fetchCalls.filter((url) => getter.host.test(url)).length;
  getter.call();
  await new Promise((resolve) => setTimeout(resolve, 20));
  return fetchCalls.filter((url) => getter.host.test(url)).length - before;
}

test.after(() => {
  globalThis.fetch = realFetch;
});

for (const getter of GETTERS) {
  test(`${getter.name}: no background lookup from a browser bundle`, async () => {
    getter.reset();
    const fromBrowser = await outsideTestRunner(() =>
      withBrowserWindow(() => fetchesStartedBy(getter))
    );
    assert.equal(fromBrowser, 0, `${getter.name} fetched from a browser runtime`);

    // Control: the same getter on the server still starts its refresh.
    getter.reset();
    const fromServer = await outsideTestRunner(() => fetchesStartedBy(getter));
    assert.ok(fromServer >= 1, `${getter.name} did not refresh on the server either`);
    getter.reset();
  });
}

test("Codex CLI: a failed release lookup is not retried on every call", async () => {
  codex.clearCodexClientVersionCache();
  const codexGetter = GETTERS[0];
  const first = await outsideTestRunner(() => fetchesStartedBy(codexGetter));
  assert.equal(first, 1, "the first call should look the release up once");

  // The lookup failed (503). Hot-path calls right after it must not hit GitHub again.
  const again = await outsideTestRunner(async () => {
    let total = 0;
    for (let i = 0; i < 5; i++) total += await fetchesStartedBy(codexGetter);
    return total;
  });
  assert.equal(again, 0, "a rate-limited or failed lookup was retried immediately");

  // Once the retry window has passed, the next call may try again.
  const realNow = Date.now;
  Date.now = () => realNow() + codex.CODEX_VERSION_RETRY_AFTER_FAILURE_MS + 1;
  try {
    const later = await outsideTestRunner(() => fetchesStartedBy(codexGetter));
    assert.equal(later, 1, "the lookup should be retried after the retry window");
  } finally {
    Date.now = realNow;
    codex.clearCodexClientVersionCache();
  }
});
