// A client that explicitly asks for readable thinking (`thinking.display:
// "summarized"`, e.g. @ai-sdk/anthropic / OpenCode) must not have every thinking
// block blanked by the `redact-thinking-2026-02-12` beta that OmniRoute adds on
// its own (selectBetaFlags for opaque / interleaved-thinking clients, and the
// static API-key beta set). OMNIROUTE_REDACT_THINKING=false disables the
// OmniRoute-added redact beta globally. A client that negotiated the redact beta
// itself keeps it. Claude OAuth requests keep the beta (Claude Code OAuth
// fingerprint) unless the default-off CLAUDE_OAUTH_SUMMARIZED_THINKING_UNREDACTED
// feature flag is on.

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-redact-thinking-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const { selectBetaFlags } = await import("../../open-sse/executors/claudeIdentity.ts");
const { registerFeatureFlagResolver } =
  await import("../../src/shared/utils/featureFlagResolverBridge.ts");
const {
  CLAUDE_OAUTH_SUMMARIZED_THINKING_FLAG,
  isClaudeOAuthSummarizedThinkingUnredacted,
  isRedactThinkingDisabledByEnv,
  requestsSummarizedThinking,
  shouldSuppressRedactThinking,
  stripRedactThinkingBetaForVisibleThinking,
} = await import("../../open-sse/executors/base/redactThinkingBeta.ts");

const REDACT = "redact-thinking-2026-02-12";
const INTERLEAVED = "interleaved-thinking-2025-05-14";
const originalFetch = globalThis.fetch;
const originalEnv = process.env.OMNIROUTE_REDACT_THINKING;
const OAUTH_FLAG = "CLAUDE_OAUTH_SUMMARIZED_THINKING_UNREDACTED";
const originalFlagEnv = process.env[OAUTH_FLAG];

async function withOAuthFlag<T>(value: string | undefined, fn: () => Promise<T> | T): Promise<T> {
  if (value === undefined) delete process.env[OAUTH_FLAG];
  else process.env[OAUTH_FLAG] = value;
  try {
    return await fn();
  } finally {
    delete process.env[OAUTH_FLAG];
  }
}

test.after(() => {
  globalThis.fetch = originalFetch;
  if (originalEnv === undefined) delete process.env.OMNIROUTE_REDACT_THINKING;
  else process.env.OMNIROUTE_REDACT_THINKING = originalEnv;
  if (originalFlagEnv === undefined) delete process.env[OAUTH_FLAG];
  else process.env[OAUTH_FLAG] = originalFlagEnv;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function body(thinking?: Record<string, unknown>) {
  return {
    model: "claude-haiku-4-5",
    max_tokens: 64,
    messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
    ...(thinking ? { thinking } : {}),
  };
}

const SUMMARIZED = { type: "adaptive", display: "summarized" };

test("requestsSummarizedThinking only matches an explicit summarized display", () => {
  assert.equal(requestsSummarizedThinking(body(SUMMARIZED)), true);
  assert.equal(requestsSummarizedThinking(body({ type: "adaptive" })), false);
  assert.equal(requestsSummarizedThinking(body({ type: "adaptive", display: "omitted" })), false);
  assert.equal(requestsSummarizedThinking(body()), false);
  assert.equal(requestsSummarizedThinking(null), false);
});

test("OMNIROUTE_REDACT_THINKING=false disables the OmniRoute-added redact beta", () => {
  assert.equal(isRedactThinkingDisabledByEnv({ OMNIROUTE_REDACT_THINKING: "false" }), true);
  assert.equal(isRedactThinkingDisabledByEnv({ OMNIROUTE_REDACT_THINKING: "0" }), true);
  assert.equal(isRedactThinkingDisabledByEnv({ OMNIROUTE_REDACT_THINKING: "true" }), false);
  assert.equal(isRedactThinkingDisabledByEnv({}), false);
  assert.equal(
    shouldSuppressRedactThinking(body(), null, { OMNIROUTE_REDACT_THINKING: "off" }),
    true
  );
});

test("client-negotiated redact beta always wins", () => {
  assert.equal(
    shouldSuppressRedactThinking(body(SUMMARIZED), `${INTERLEAVED},${REDACT}`, {}),
    false
  );
});

test("selectBetaFlags keeps redact-thinking by default (opaque and interleaved clients)", () => {
  assert.ok(
    selectBetaFlags(body({ type: "adaptive" }))
      .split(",")
      .includes(REDACT)
  );
  assert.ok(
    selectBetaFlags(body({ type: "adaptive" }), null, INTERLEAVED)
      .split(",")
      .includes(REDACT)
  );
});

test("selectBetaFlags (OAuth fingerprint) keeps redact-thinking for summarized thinking by default", async () => {
  await withOAuthFlag(undefined, () => {
    for (const clientBeta of [null, INTERLEAVED]) {
      const flags = selectBetaFlags(body(SUMMARIZED), null, clientBeta).split(",");
      assert.ok(flags.includes(REDACT), `clientBeta=${clientBeta}`);
    }
  });
});

test("selectBetaFlags omits redact-thinking for summarized thinking when the OAuth flag is on", async () => {
  await withOAuthFlag("true", () => {
    for (const clientBeta of [null, INTERLEAVED]) {
      const flags = selectBetaFlags(body(SUMMARIZED), null, clientBeta).split(",");
      assert.ok(!flags.includes(REDACT), `clientBeta=${clientBeta}`);
      assert.ok(flags.includes(INTERLEAVED));
      assert.ok(flags.includes("thinking-token-count-2026-05-13"));
    }
  });
});

test("OAuth flag reader follows the server feature-flag resolver bridge and fails closed", () => {
  assert.equal(CLAUDE_OAUTH_SUMMARIZED_THINKING_FLAG, OAUTH_FLAG);
  const seen: string[] = [];
  const previous = (globalThis as Record<symbol, unknown>)[
    Symbol.for("omniroute.featureFlagResolver")
  ] as ((key: string) => boolean) | undefined;
  try {
    registerFeatureFlagResolver((key) => {
      seen.push(key);
      return key === OAUTH_FLAG;
    });
    assert.equal(isClaudeOAuthSummarizedThinkingUnredacted({}), true);
    assert.deepEqual(seen, [OAUTH_FLAG]);
    registerFeatureFlagResolver(() => {
      throw new Error("resolver down");
    });
    assert.equal(isClaudeOAuthSummarizedThinkingUnredacted({ [OAUTH_FLAG]: "true" }), false);
    registerFeatureFlagResolver(null);
    assert.equal(isClaudeOAuthSummarizedThinkingUnredacted({}), false);
    assert.equal(isClaudeOAuthSummarizedThinkingUnredacted({ [OAUTH_FLAG]: "true" }), true);
  } finally {
    registerFeatureFlagResolver(previous ?? null);
  }
});

test("strip helper leaves a Claude OAuth header alone unless the OAuth flag is on", async () => {
  await withOAuthFlag(undefined, () => {
    const oauth = { "anthropic-beta": `${INTERLEAVED},${REDACT}` };
    assert.equal(
      stripRedactThinkingBetaForVisibleThinking(oauth, body(SUMMARIZED), null, {
        claudeOAuth: true,
        env: {},
      }),
      false
    );
    assert.equal(oauth["anthropic-beta"], `${INTERLEAVED},${REDACT}`);
  });
  await withOAuthFlag("true", () => {
    const oauth = { "anthropic-beta": `${INTERLEAVED},${REDACT}` };
    assert.equal(
      stripRedactThinkingBetaForVisibleThinking(oauth, body(SUMMARIZED), null, {
        claudeOAuth: true,
        env: {},
      }),
      true
    );
    assert.equal(oauth["anthropic-beta"], INTERLEAVED);
  });
});

test("strip helper removes redact-thinking from the static API-key beta header", () => {
  const headers = {
    "Anthropic-Beta": `claude-code-20250219,${INTERLEAVED},${REDACT},effort-2025-11-24`,
  };
  assert.equal(
    stripRedactThinkingBetaForVisibleThinking(headers, body(SUMMARIZED), null, { env: {} }),
    true
  );
  assert.equal(headers["Anthropic-Beta"], `claude-code-20250219,${INTERLEAVED},effort-2025-11-24`);

  const untouched = { "anthropic-beta": `${INTERLEAVED},${REDACT}` };
  assert.equal(
    stripRedactThinkingBetaForVisibleThinking(untouched, body({ type: "adaptive" }), null, {
      env: {},
    }),
    false
  );
  assert.equal(untouched["anthropic-beta"], `${INTERLEAVED},${REDACT}`);

  const optedIn = { "anthropic-beta": `${INTERLEAVED},${REDACT}` };
  assert.equal(
    stripRedactThinkingBetaForVisibleThinking(optedIn, body(SUMMARIZED), null, {
      connectionOptedIn: true,
      env: {},
    }),
    false
  );
  assert.equal(optedIn["anthropic-beta"], `${INTERLEAVED},${REDACT}`);
});

function captureFetchHeaders(): Array<Record<string, string>> {
  const captured: Array<Record<string, string>> = [];
  globalThis.fetch = (async (url: unknown, init: { headers?: Record<string, string> } = {}) => {
    if (String(url).includes("/v1/messages")) captured.push({ ...(init.headers || {}) });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;
  return captured;
}

function betaOf(headers: Record<string, string>): string[] {
  const key = Object.keys(headers).find((k) => k.toLowerCase() === "anthropic-beta");
  return key ? headers[key].split(",").map((v) => v.trim()) : [];
}

async function dispatch(
  provider: string,
  credentials: Record<string, unknown>,
  reqBody: Record<string, unknown>
) {
  const captured = captureFetchHeaders();
  await new DefaultExecutor(provider).execute({
    model: "claude-haiku-4-5",
    body: reqBody,
    stream: false,
    credentials,
    clientHeaders: { "anthropic-beta": INTERLEAVED, "user-agent": "ai-sdk/anthropic" },
  });
  assert.equal(captured.length, 1);
  return betaOf(captured[0]);
}

test("claude OAuth dispatch: fingerprint redact beta is unchanged by default, even for summarized thinking", async () => {
  delete process.env.OMNIROUTE_REDACT_THINKING;
  const creds = { accessToken: "sk-ant-oat-test-token" };
  await withOAuthFlag(undefined, async () => {
    assert.ok((await dispatch("claude", creds, body({ type: "adaptive" }))).includes(REDACT));
    assert.ok((await dispatch("claude", creds, body(SUMMARIZED))).includes(REDACT));
  });
});

test("claude OAuth dispatch: with the OAuth flag on, summarized thinking drops the redact beta", async () => {
  delete process.env.OMNIROUTE_REDACT_THINKING;
  const creds = { accessToken: "sk-ant-oat-test-token" };
  await withOAuthFlag("true", async () => {
    assert.ok((await dispatch("claude", creds, body({ type: "adaptive" }))).includes(REDACT));
    const summarized = await dispatch("claude", creds, body(SUMMARIZED));
    assert.ok(!summarized.includes(REDACT));
    assert.ok(summarized.includes(INTERLEAVED));
  });
});

test("claude API-key dispatch: summarized thinking drops the redact beta without the OAuth flag", async () => {
  delete process.env.OMNIROUTE_REDACT_THINKING;
  const creds = { apiKey: "sk-ant-api-test" };
  await withOAuthFlag(undefined, async () => {
    assert.ok((await dispatch("claude", creds, body({ type: "adaptive" }))).includes(REDACT));
    assert.ok(!(await dispatch("claude", creds, body(SUMMARIZED))).includes(REDACT));
  });
});

test("anthropic API-key dispatch: summarized thinking drops the static redact beta", async () => {
  delete process.env.OMNIROUTE_REDACT_THINKING;
  const creds = { apiKey: "sk-ant-api-test" };
  assert.ok((await dispatch("anthropic", creds, body({ type: "adaptive" }))).includes(REDACT));
  assert.ok(!(await dispatch("anthropic", creds, body(SUMMARIZED))).includes(REDACT));
});

test("OMNIROUTE_REDACT_THINKING=false drops redact beta at dispatch (OAuth only with the flag)", async () => {
  process.env.OMNIROUTE_REDACT_THINKING = "false";
  try {
    const apiKey = { apiKey: "sk-ant-api-test" };
    assert.ok(!(await dispatch("anthropic", apiKey, body({ type: "adaptive" }))).includes(REDACT));
    const oauth = { accessToken: "sk-ant-oat-test-token" };
    await withOAuthFlag(undefined, async () => {
      assert.ok((await dispatch("claude", oauth, body({ type: "adaptive" }))).includes(REDACT));
    });
    await withOAuthFlag("true", async () => {
      assert.ok(!(await dispatch("claude", oauth, body({ type: "adaptive" }))).includes(REDACT));
    });
  } finally {
    delete process.env.OMNIROUTE_REDACT_THINKING;
  }
});
