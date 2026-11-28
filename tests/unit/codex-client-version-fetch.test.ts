import assert from "node:assert/strict";
import test from "node:test";

import { DEFAULT_CODEX_CLIENT_VERSION } from "../../src/shared/constants/codexClient.ts";
import {
  clearCodexClientVersionCache,
  resetCodexClientVersionCacheForTests,
  refreshCodexClientVersion,
  CODEX_VERSION_CACHE_TTL_MS,
  getCodexAdvertisedVersionSource,
  getCodexClientVersion,
  resolveCodexClientVersion,
} from "../../open-sse/config/codexClient.ts";

const CODEX_RELEASE_URL = "https://api.github.com/repos/openai/codex/releases/latest";

function releaseFetch(tagName: string): typeof fetch {
  return (async (url: string | URL | Request) => {
    assert.equal(String(url), CODEX_RELEASE_URL);
    return new Response(JSON.stringify({ tag_name: tagName }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
}

async function withEnv<T>(
  entries: Record<string, string | undefined>,
  fn: () => T | Promise<T>
): Promise<T> {
  const previous = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(entries)) {
    previous.set(key, process.env[key]);
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
  try {
    return await fn();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

test.afterEach(() => {
  clearCodexClientVersionCache();
  resetCodexClientVersionCacheForTests();
  delete process.env.CODEX_CLIENT_VERSION;
});

test("a fetched Codex release newer than the pin is returned", async () => {
  await withEnv({ CODEX_CLIENT_VERSION: undefined }, async () => {
    const version = await resolveCodexClientVersion(releaseFetch("rust-v0.165.1"));
    assert.equal(version, "0.165.1");
    assert.equal(getCodexClientVersion(), "0.165.1");
    assert.notEqual(version, DEFAULT_CODEX_CLIENT_VERSION);
  });
});

test("a rejected fetch falls back to the pinned Codex version", async () => {
  await withEnv({ CODEX_CLIENT_VERSION: undefined }, async () => {
    const failingFetch = (async () => {
      throw new Error("network down");
    }) as typeof fetch;

    const version = await resolveCodexClientVersion(failingFetch);
    assert.equal(version, DEFAULT_CODEX_CLIENT_VERSION);
    assert.equal(getCodexClientVersion(), DEFAULT_CODEX_CLIENT_VERSION);
  });
});

test("CODEX_CLIENT_VERSION beats a newer fetched release", async () => {
  await withEnv({ CODEX_CLIENT_VERSION: "0.99.0" }, async () => {
    const version = await resolveCodexClientVersion(releaseFetch("rust-v0.165.1"));
    assert.equal(version, "0.165.1");
    assert.equal(getCodexClientVersion(), "0.99.0");
  });
});

test("inference refreshes an expired release cache while retaining its last known version", async () => {
  const originalNow = Date.now;
  const originalFetch = globalThis.fetch;
  let now = 1000000000;
  Date.now = () => now;
  try {
    await withEnv({ CODEX_CLIENT_VERSION: undefined, NODE_TEST_CONTEXT: undefined }, async () => {
      await resolveCodexClientVersion(releaseFetch("rust-v99.0.1"));
      now += CODEX_VERSION_CACHE_TTL_MS + 1;
      let calls = 0;
      globalThis.fetch = (async () => {
        calls++;
        return new Response(JSON.stringify({ tag_name: "rust-v99.0.2" }));
      }) as typeof fetch;
      assert.equal(getCodexClientVersion(), "99.0.1");
      assert.equal(getCodexClientVersion(), "99.0.1");
      await new Promise((resolve) => setImmediate(resolve));
      assert.equal(calls, 1);
      assert.equal(getCodexClientVersion(), "99.0.2");
      assert.equal(getCodexAdvertisedVersionSource(), "discovered");
    });
  } finally {
    Date.now = originalNow;
    globalThis.fetch = originalFetch;
  }
});

test("a stale npm discovery cache cannot mask a newer release forever", async () => {
  const originalNow = Date.now;
  const originalFetch = globalThis.fetch;
  let now = 1000000000;
  Date.now = () => now;
  try {
    await withEnv({ CODEX_CLIENT_VERSION: undefined, NODE_TEST_CONTEXT: undefined }, async () => {
      await refreshCodexClientVersion(
        async () => new Response(JSON.stringify({ name: "@openai/codex", version: "99.0.1" }))
      );
      now += CODEX_VERSION_CACHE_TTL_MS + 1;
      let calls = 0;
      globalThis.fetch = (async () => {
        calls++;
        return new Response(JSON.stringify({ tag_name: "rust-v99.0.2" }));
      }) as typeof fetch;
      getCodexClientVersion();
      await new Promise((resolve) => setImmediate(resolve));
      assert.equal(calls, 1);
      assert.equal(getCodexClientVersion(), "99.0.2");
      assert.equal(getCodexAdvertisedVersionSource(), "discovered");
    });
  } finally {
    Date.now = originalNow;
    globalThis.fetch = originalFetch;
  }
});

test("older releases never downgrade a previously discovered version", async () => {
  const originalNow = Date.now;
  let now = 1000000000;
  Date.now = () => now;
  try {
    await resolveCodexClientVersion(releaseFetch("rust-v99.0.2"));
    now += CODEX_VERSION_CACHE_TTL_MS + 1;
    assert.equal(await resolveCodexClientVersion(releaseFetch("rust-v99.0.1")), "99.0.2");
  } finally {
    Date.now = originalNow;
  }
});

test("a fresh npm cache does not postpone an expired release lookup", async () => {
  const originalNow = Date.now;
  const originalFetch = globalThis.fetch;
  let now = 1_000_000_000;
  Date.now = () => now;
  try {
    await withEnv({ CODEX_CLIENT_VERSION: undefined, NODE_TEST_CONTEXT: undefined }, async () => {
      await resolveCodexClientVersion(releaseFetch("rust-v99.0.1"));
      now += 5 * 60 * 60 * 1000;
      await refreshCodexClientVersion(async () =>
        Response.json({ name: "@openai/codex", version: "99.0.1" })
      );
      now += 2 * 60 * 60 * 1000;
      let calls = 0;
      globalThis.fetch = async () => {
        calls++;
        return Response.json({ tag_name: "rust-v99.0.2" });
      };
      assert.equal(getCodexClientVersion(), "99.0.1");
      await new Promise((resolve) => setImmediate(resolve));
      assert.equal(calls, 1);
      assert.equal(getCodexClientVersion(), "99.0.2");
    });
  } finally {
    Date.now = originalNow;
    globalThis.fetch = originalFetch;
  }
});
