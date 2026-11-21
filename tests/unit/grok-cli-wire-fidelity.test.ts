import assert from "node:assert/strict";
import test from "node:test";

import {
  getGrokBuildClientVersion,
  getGrokBuildClientVersionSource,
  getGrokBuildCliChannel,
  getGrokBuildContextWindowOverride,
  getGrokBuildEffectiveContextWindow,
  getGrokBuildLiveContextWindow,
  getGrokBuildLoopHeaders,
  GROK_BUILD_DEFAULT_CLIENT_VERSION,
  GROK_BUILD_DEFAULT_CONTEXT_WINDOW,
  recordGrokBuildLiveContextWindow,
  resetGrokBuildClientVersionCache,
  resetGrokBuildLiveContextWindowCache,
  resolveGrokBuildClientVersion,
  seedGrokBuildClientVersionCache,
  type GrokBuildClientVersionFetch,
} from "../../open-sse/config/grokBuild.ts";
import {
  getCliVersionOverrides,
  setCliVersionOverrides,
} from "../../open-sse/config/cliVersions.ts";
import { GrokCliExecutor } from "../../open-sse/executors/grok-cli.ts";
import type { ProviderCredentials } from "../../open-sse/executors/base.ts";

/**
 * Stub fetch serving plain-text pointer bodies per URL suffix (null = 404), so
 * the resolver exercises the same primary -> GCS fallback the real CLI installer
 * uses without touching the network.
 */
function textFetch(routes: Record<string, string | null>): {
  fetchImpl: GrokBuildClientVersionFetch;
  calls: string[];
} {
  const calls: string[] = [];
  const fetchImpl: GrokBuildClientVersionFetch = async (input: string) => {
    calls.push(input);
    for (const [suffix, body] of Object.entries(routes)) {
      if (input.endsWith(suffix)) {
        return body === null
          ? new Response("not found", { status: 404 })
          : new Response(body, { status: 200 });
      }
    }
    return new Response("not found", { status: 404 });
  };
  return { fetchImpl, calls };
}

test("Grok Build discovers the latest CLI version from the x.ai/cli/<channel> pointer", async () => {
  resetGrokBuildClientVersionCache();
  const { fetchImpl, calls } = textFetch({ "/stable": "1.0.92" });
  const resolved = await resolveGrokBuildClientVersion(fetchImpl);
  assert.equal(resolved, "1.0.92");
  assert.equal(calls[0], "https://x.ai/cli/stable");
  assert.equal(getGrokBuildClientVersion(), "1.0.92");
  assert.equal(getGrokBuildClientVersionSource(), "discovered");
});

test("Grok Build falls back to the public GCS mirror when the primary pointer fails", async () => {
  resetGrokBuildClientVersionCache();
  const { fetchImpl, calls } = textFetch({
    "x.ai/cli/stable": null,
    "storage.googleapis.com/grok-build-public-artifacts/cli/stable": "1.0.90",
  });
  const resolved = await resolveGrokBuildClientVersion(fetchImpl);
  assert.equal(resolved, "1.0.90");
  assert.equal(calls.length, 2);
  assert.equal(calls[1], "https://storage.googleapis.com/grok-build-public-artifacts/cli/stable");
  assert.equal(getGrokBuildClientVersionSource(), "discovered");
});

test("Grok Build keeps the captured pin when discovery fails or reports an older version", async () => {
  resetGrokBuildClientVersionCache();
  const down = await resolveGrokBuildClientVersion(textFetch({ "/stable": null }).fetchImpl);
  assert.equal(down, GROK_BUILD_DEFAULT_CLIENT_VERSION);
  assert.equal(getGrokBuildClientVersion(), GROK_BUILD_DEFAULT_CLIENT_VERSION);
  assert.equal(getGrokBuildClientVersionSource(), "default");

  resetGrokBuildClientVersionCache();
  const stale = await resolveGrokBuildClientVersion(textFetch({ "/stable": "1.0.41" }).fetchImpl);
  assert.equal(
    stale,
    GROK_BUILD_DEFAULT_CLIENT_VERSION,
    "a pointer behind the pin never downgrades"
  );
});

test("Grok Build version test seams seed and reset the discovered cache", () => {
  resetGrokBuildClientVersionCache();
  seedGrokBuildClientVersionCache("1.0.92");
  assert.equal(getGrokBuildClientVersion(), "1.0.92");
  assert.equal(getGrokBuildClientVersionSource(), "discovered");
  resetGrokBuildClientVersionCache();
  seedGrokBuildClientVersionCache(GROK_BUILD_DEFAULT_CLIENT_VERSION);
  assert.equal(getGrokBuildClientVersionSource(), "default");
  assert.throws(() => seedGrokBuildClientVersionCache("not-a-version"));
});

test("GROK_CLI_CHANNEL selects the pointer and rejects unknown channels", async () => {
  const previous = process.env.GROK_CLI_CHANNEL;
  resetGrokBuildClientVersionCache();
  try {
    process.env.GROK_CLI_CHANNEL = "alpha";
    assert.equal(getGrokBuildCliChannel(), "alpha");
    const { fetchImpl, calls } = textFetch({ "/alpha": "1.0.92" });
    await resolveGrokBuildClientVersion(fetchImpl);
    assert.ok(calls[0].endsWith("/alpha"), `expected alpha pointer, got ${calls[0]}`);

    process.env.GROK_CLI_CHANNEL = "bogus";
    assert.equal(getGrokBuildCliChannel(), "stable");
    delete process.env.GROK_CLI_CHANNEL;
    assert.equal(getGrokBuildCliChannel(), "stable");
  } finally {
    if (previous === undefined) delete process.env.GROK_CLI_CHANNEL;
    else process.env.GROK_CLI_CHANNEL = previous;
    resetGrokBuildClientVersionCache();
  }
});

test("Grok Build version precedence: dashboard override > env > discovered > pin", () => {
  const previousOverrides = getCliVersionOverrides();
  const previousEnv = process.env.GROK_CLI_CLIENT_VERSION;
  resetGrokBuildClientVersionCache();
  try {
    seedGrokBuildClientVersionCache("1.0.92");

    process.env.GROK_CLI_CLIENT_VERSION = "2.0.0";
    assert.equal(getGrokBuildClientVersion(), "2.0.0");
    assert.equal(getGrokBuildClientVersionSource(), "env");

    setCliVersionOverrides({ "grok-cli": "9.9.9" });
    assert.equal(getGrokBuildClientVersion(), "9.9.9");
    assert.equal(getGrokBuildClientVersionSource(), "settings");

    setCliVersionOverrides({});
    assert.equal(getGrokBuildClientVersion(), "2.0.0");

    delete process.env.GROK_CLI_CLIENT_VERSION;
    assert.equal(getGrokBuildClientVersion(), "1.0.92");
    assert.equal(getGrokBuildClientVersionSource(), "discovered");
  } finally {
    setCliVersionOverrides(previousOverrides);
    if (previousEnv === undefined) delete process.env.GROK_CLI_CLIENT_VERSION;
    else process.env.GROK_CLI_CLIENT_VERSION = previousEnv;
    resetGrokBuildClientVersionCache();
  }
});

test("Grok Build context window: env override, live capture and compaction headers", () => {
  const previous = process.env.GROK_CLI_CONTEXT_WINDOW;
  resetGrokBuildLiveContextWindowCache();
  try {
    process.env.GROK_CLI_CONTEXT_WINDOW = "abc";
    assert.equal(getGrokBuildContextWindowOverride(), null);
    process.env.GROK_CLI_CONTEXT_WINDOW = "0";
    assert.equal(getGrokBuildContextWindowOverride(), null);

    process.env.GROK_CLI_CONTEXT_WINDOW = "256000";
    assert.equal(getGrokBuildContextWindowOverride(), 256000);
    assert.equal(getGrokBuildEffectiveContextWindow("conn-1", "grok-4.7"), 256000);
    assert.equal(getGrokBuildLoopHeaders("conn-1", "grok-4.7")["x-compaction-at"], "204800");

    delete process.env.GROK_CLI_CONTEXT_WINDOW;
    assert.equal(getGrokBuildLiveContextWindow("conn-1", "grok-4.7"), null);
    recordGrokBuildLiveContextWindow("conn-1", "grok-4.7", 131072);
    assert.equal(getGrokBuildLiveContextWindow("conn-1", "grok-4.7"), 131072);
    assert.equal(getGrokBuildEffectiveContextWindow("conn-1", "grok-4.7"), 131072);
    assert.equal(getGrokBuildLoopHeaders("conn-1", "grok-4.7")["x-compaction-at"], "104857");

    recordGrokBuildLiveContextWindow("conn-1", "grok-4.7", -5);
    assert.equal(getGrokBuildLiveContextWindow("conn-1", "grok-4.7"), 131072);

    // Another connection+model is isolated; a model with no capture uses the
    // registry top tier (the under-advertised 256000 scalar never applies).
    assert.equal(getGrokBuildLiveContextWindow("conn-2", "grok-4.5"), null);
    assert.equal(
      getGrokBuildEffectiveContextWindow("conn-2", "grok-4.5"),
      GROK_BUILD_DEFAULT_CONTEXT_WINDOW
    );
    assert.equal(getGrokBuildLoopHeaders("conn-2", "grok-4.5")["x-compaction-at"], "400000");
  } finally {
    if (previous === undefined) delete process.env.GROK_CLI_CONTEXT_WINDOW;
    else process.env.GROK_CLI_CONTEXT_WINDOW = previous;
    resetGrokBuildLiveContextWindowCache();
  }
});

const credentials = {
  accessToken: "token",
  connectionId: "conn-1",
} as ProviderCredentials;

test("Grok CLI transformRequest aligns with the captured /v1/responses payload", () => {
  const executor = new GrokCliExecutor();
  const transformed = executor.transformRequest(
    "grok-4.7",
    {
      model: "grok-4.7",
      input: [{ role: "user", content: "hi" }],
      include: ["reasoning.encrypted_content"],
      reasoning: { summary: "concise" },
    },
    false,
    credentials
  );
  assert.ok((transformed.include as string[]).includes("no_inline_citations"));
  assert.ok((transformed.include as string[]).includes("reasoning.encrypted_content"));
  assert.equal(transformed.prompt_cache_key, "omr-conn-1-grok-4.7");
  // Concise auxiliary turns must not get an effort injected (captured 1.0.89).
  assert.equal((transformed.reasoning as Record<string, unknown> | undefined)?.effort, undefined);

  const withKey = executor.transformRequest(
    "grok-4.7",
    { model: "grok-4.7", input: [], prompt_cache_key: "custom-key" },
    false,
    credentials
  );
  assert.equal(withKey.prompt_cache_key, "custom-key");

  const main = executor.transformRequest(
    "grok-4.7",
    { model: "grok-4.7", input: [] },
    false,
    credentials
  );
  assert.equal((main.reasoning as Record<string, unknown>).effort, "high");
});
