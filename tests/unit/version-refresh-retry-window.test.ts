/**
 * Client-version getters must not re-run their background lookup on every call.
 *
 * The sync getters (`get…Version()` / `get…UserAgent()`) start a background npm/GitHub
 * lookup whenever their cache is empty. The cache was only written when the registry
 * reported a version *newer* than the pin, so when the registry answered the pin itself (the
 * normal state right after a pin bump) or the lookup failed, nothing was recorded and the next
 * call — the server builds these headers per upstream request — fetched again. OpenCode
 * cached any answer but nothing on failure, and its refresh runs on every request.
 *
 * After the fix an answer that is not newer counts as checked for the module's TTL, and a
 * failure is retried only after BACKGROUND_REFRESH_RETRY_AFTER_FAILURE_MS.
 */
import test from "node:test";
import assert from "node:assert/strict";

type Mode = "pin" | "fail";
let mode: Mode = "pin";
const fetchCalls: string[] = [];
const realFetch = globalThis.fetch;

// Installed before any import: some modules capture `fetch` at load time.
globalThis.fetch = (async (input: string | URL | Request) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  fetchCalls.push(url);
  if (mode === "fail") return new Response("{}", { status: 503 });
  const pin = PINS.find(([pattern]) => pattern.test(url))?.[1];
  if (!pin) return new Response("{}", { status: 404 });
  return Response.json({ version: pin, tag_name: `v${pin}` });
}) as typeof fetch;

const profiles = await import("../../open-sse/config/providerHeaderProfiles.ts");
const kimi = await import("../../open-sse/config/providers/registry/kimi/coding/runtime.ts");
const zed = await import("../../open-sse/executors/zedClientVersion.ts");
const opencodeHeaders = await import("../../open-sse/utils/opencodeHeaders.ts");
const opencodeVersion = await import("../../open-sse/utils/opencodeCliVersion.ts");
const claude = await import("../../src/shared/constants/claudeCodeClient.ts");
const gemini = await import("../../src/shared/constants/geminiCliClient.ts");
const { BACKGROUND_REFRESH_RETRY_AFTER_FAILURE_MS } =
  await import("../../src/shared/utils/backgroundRefresh.ts");

const CODEBUDDY_PIN = profiles.CODEBUDDY_CN_USER_AGENT.match(/(\d+\.\d+\.\d+)/)?.[1] ?? "0.0.0";

// What the stub answers in "pin" mode: exactly the pinned version, never a newer one.
const PINS: Array<[RegExp, string]> = [
  [/@github\/copilot/, profiles.GITHUB_COPILOT_CLI_VERSION],
  [/@qwen-code/, profiles.QWEN_CLI_VERSION],
  [/@tencent-ai\/codebuddy-code/, CODEBUDDY_PIN],
  [/@moonshot-ai\/kimi-code/, kimi.KIMI_CODE_CLI_VERSION],
  [/zed-industries\/zed/, zed.ZED_CLIENT_VERSION],
  [/@anthropic-ai\/claude-code/, claude.CLAUDE_CODE_CLIENT_VERSION],
  [/@google\/gemini-cli/, gemini.GEMINI_CLI_CLIENT_VERSION],
  [/opencode-ai/, opencodeVersion.OPENCODE_CLI_VERSION_FALLBACK],
];

type Getter = {
  name: string;
  host: RegExp;
  call: () => unknown;
  reset: () => void;
  /** OpenCode already caches any successful answer; only its failure path was unbounded. */
  pinAnswerAlreadyCached?: boolean;
};

const GETTERS: Getter[] = [
  {
    name: "GitHub Copilot CLI",
    host: /@github\/copilot/,
    call: () => profiles.getGitHubCopilotCliVersion(),
    reset: () => profiles.resetGitHubCopilotCliVersionCache(),
  },
  {
    name: "Qwen Code",
    host: /@qwen-code/,
    call: () => profiles.getQwenCliVersion(),
    reset: () => profiles.resetQwenCliVersionCache(),
  },
  {
    name: "CodeBuddy CN",
    host: /@tencent-ai\/codebuddy-code/,
    call: () => profiles.getCodeBuddyCnUserAgent(),
    reset: () => profiles.resetCodeBuddyCnVersionCache(),
  },
  {
    name: "Kimi Code CLI",
    host: /@moonshot-ai\/kimi-code/,
    call: () => kimi.getKimiCodeCliVersion(),
    reset: () => kimi.resetKimiCodeCliVersionCache(),
  },
  {
    name: "Zed",
    host: /zed-industries\/zed/,
    call: () => zed.getZedClientVersion(),
    reset: () => zed.resetZedClientVersionCache(),
  },
  {
    name: "Claude Code",
    host: /@anthropic-ai\/claude-code/,
    call: () => claude.getClaudeCodeClientVersion(),
    reset: () => claude.resetClaudeCodeClientVersionCache(),
  },
  {
    name: "Gemini CLI",
    host: /@google\/gemini-cli/,
    call: () => gemini.getGeminiCliClientVersion(),
    reset: () => gemini.resetGeminiCliClientVersionCache(),
  },
  {
    name: "OpenCode CLI",
    host: /opencode-ai/,
    call: () => opencodeHeaders.resolveOpencodeCliDefaults("opencode", false),
    reset: () => opencodeVersion.resetOpencodeCliVersionCache(),
    pinAnswerAlreadyCached: true,
  },
];

// The getters skip their refresh under a test runner; clear those markers while measuring.
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

/** Calls the getter `times` times, letting each started lookup reach fetch and settle. */
async function fetchesFrom(getter: Getter, times = 1): Promise<number> {
  const before = fetchCalls.filter((url) => getter.host.test(url)).length;
  for (let i = 0; i < times; i++) {
    getter.call();
    await new Promise((resolve) => setTimeout(resolve, 15));
  }
  return fetchCalls.filter((url) => getter.host.test(url)).length - before;
}

async function withClockAdvancedBy<T>(ms: number, fn: () => Promise<T>): Promise<T> {
  const realNow = Date.now;
  Date.now = () => realNow() + ms;
  try {
    return await fn();
  } finally {
    Date.now = realNow;
  }
}

test.after(() => {
  globalThis.fetch = realFetch;
});

for (const getter of GETTERS) {
  if (!getter.pinAnswerAlreadyCached) {
    test(`${getter.name}: a registry answer equal to the pin is not re-fetched on the next calls`, async () => {
      getter.reset();
      mode = "pin";
      await outsideTestRunner(async () => {
        assert.equal(await fetchesFrom(getter), 1, "the first call should look the version up");
        assert.equal(
          await fetchesFrom(getter, 5),
          0,
          `${getter.name} re-fetched although the registry already answered the pin`
        );
      });
      getter.reset();
    });
  }

  test(`${getter.name}: a failed lookup waits for the retry window`, async () => {
    getter.reset();
    mode = "fail";
    await outsideTestRunner(async () => {
      assert.equal(await fetchesFrom(getter), 1, "the first call should look the version up");
      assert.equal(
        await fetchesFrom(getter, 5),
        0,
        `${getter.name} retried a failed lookup immediately`
      );
      const later = await withClockAdvancedBy(BACKGROUND_REFRESH_RETRY_AFTER_FAILURE_MS + 1, () =>
        fetchesFrom(getter)
      );
      assert.equal(later, 1, `${getter.name} should retry once the window has passed`);
    });
    mode = "pin";
    getter.reset();
  });
}
