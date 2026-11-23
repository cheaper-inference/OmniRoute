import assert from "node:assert/strict";
import test from "node:test";

import {
  ANTIGRAVITY_CLI_FALLBACK_VERSION,
  ANTIGRAVITY_IDE_FALLBACK_VERSION,
  ANTIGRAVITY_VERSION_CACHE_TTL_MS,
  ANTIGRAVITY_VERSION_RETRY_TTL_MS,
  clearAntigravityVersionCaches,
  getCachedAntigravityCliVersion,
  getCachedAntigravityIdeVersion,
  resolveAntigravityCliVersion,
  resolveAntigravityIdeVersion,
  seedAntigravityCliVersionCache,
  seedAntigravityIdeVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

const originalDateNow = Date.now;

test.afterEach(() => {
  Date.now = originalDateNow;
  clearAntigravityVersionCaches();
});

test("IDE and CLI start with independent captured fallback versions", () => {
  assert.equal(getCachedAntigravityIdeVersion(), ANTIGRAVITY_IDE_FALLBACK_VERSION);
  assert.equal(getCachedAntigravityCliVersion(), ANTIGRAVITY_CLI_FALLBACK_VERSION);
  assert.equal(ANTIGRAVITY_IDE_FALLBACK_VERSION, "2.5.5");
  assert.equal(ANTIGRAVITY_CLI_FALLBACK_VERSION, "1.5.8");
});

test("IDE resolver reads the official updater feed and caches only the IDE version", async () => {
  const urls: string[] = [];
  const fetchMock = async (url: string | URL | Request) => {
    urls.push(String(url));
    return new Response(JSON.stringify([{ version: "2.6.0", execution_id: "ide-release" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  assert.equal(await resolveAntigravityIdeVersion(fetchMock as typeof fetch), "2.6.0");
  assert.equal(await resolveAntigravityIdeVersion(fetchMock as typeof fetch), "2.6.0");
  assert.equal(urls.length, 1);
  assert.equal(
    urls[0],
    "https://antigravity-auto-updater-974169037036.us-central1.run.app/releases"
  );
  assert.equal(getCachedAntigravityIdeVersion(), "2.6.0");
  assert.equal(getCachedAntigravityCliVersion(), "1.5.8");
});

test("IDE resolver selects the newest feed entry and never falls below its version floor", async () => {
  const mixedFeedFetch = async () =>
    new Response(
      JSON.stringify([
        { version: "2.0.0" },
        { version: "2.8.0" },
        { version: "2.6.0" },
        { version: "invalid" },
      ]),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  assert.equal(await resolveAntigravityIdeVersion(mixedFeedFetch as typeof fetch), "2.8.0");

  clearAntigravityVersionCaches();
  const staleFeedFetch = async () =>
    new Response(JSON.stringify([{ version: "2.0.0" }, { version: "1.23.2" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  assert.equal(
    await resolveAntigravityIdeVersion(staleFeedFetch as typeof fetch),
    ANTIGRAVITY_IDE_FALLBACK_VERSION
  );
  assert.equal(getCachedAntigravityIdeVersion(), ANTIGRAVITY_IDE_FALLBACK_VERSION);
});

test("IDE resolver keeps a newer cached version when a later feed response is older", async () => {
  let now = 1_000;
  Date.now = () => now;
  seedAntigravityIdeVersionCache("2.9.0", now);
  now += ANTIGRAVITY_VERSION_CACHE_TTL_MS + 1;

  const olderFeedFetch = async () =>
    new Response(JSON.stringify([{ version: "2.8.0" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  assert.equal(await resolveAntigravityIdeVersion(olderFeedFetch as typeof fetch), "2.9.0");
  assert.equal(getCachedAntigravityIdeVersion(), "2.9.0");
});

test("CLI resolver reads the official Google GitHub release and caches only the CLI version", async () => {
  const urls: string[] = [];
  const fetchMock = async (url: string | URL | Request) => {
    urls.push(String(url));
    return new Response(JSON.stringify({ tag_name: "v1.6.0", name: "1.6.0" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  assert.equal(await resolveAntigravityCliVersion(fetchMock as typeof fetch), "1.6.0");
  assert.equal(await resolveAntigravityCliVersion(fetchMock as typeof fetch), "1.6.0");
  assert.equal(urls.length, 1);
  assert.equal(
    urls[0],
    "https://api.github.com/repos/google-antigravity/antigravity-cli/releases/latest"
  );
  assert.equal(getCachedAntigravityCliVersion(), "1.6.0");
  assert.equal(getCachedAntigravityIdeVersion(), "2.5.5");
});

test("IDE and CLI TTL refreshes are independent", async () => {
  let now = 1_000;
  Date.now = () => now;
  seedAntigravityCliVersionCache("1.6.0", now);

  const firstFetch = async () =>
    new Response(JSON.stringify([{ version: "2.6.0" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  const secondFetch = async () =>
    new Response(JSON.stringify([{ version: "2.7.0" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  assert.equal(await resolveAntigravityIdeVersion(firstFetch as typeof fetch), "2.6.0");
  now += ANTIGRAVITY_VERSION_CACHE_TTL_MS + 1;
  assert.equal(await resolveAntigravityIdeVersion(secondFetch as typeof fetch), "2.7.0");
  assert.equal(getCachedAntigravityCliVersion(), "1.6.0");
});

test("each resolver falls back only to its own last known good version", async () => {
  let fetches = 0;
  const failingFetch = async () => {
    fetches += 1;
    throw new Error("network down");
  };
  let now = 1_000_000;
  const realNow = Date.now;
  Date.now = () => now;

  try {
    assert.equal(
      await resolveAntigravityIdeVersion(failingFetch as typeof fetch),
      ANTIGRAVITY_IDE_FALLBACK_VERSION
    );
    assert.equal(
      await resolveAntigravityCliVersion(failingFetch as typeof fetch),
      ANTIGRAVITY_CLI_FALLBACK_VERSION
    );

    // Step past the retry window first: otherwise the failure above answers these two calls
    // from its own branch and the fresh-cache path is never exercised.
    now += ANTIGRAVITY_VERSION_RETRY_TTL_MS + 1;
    seedAntigravityIdeVersionCache("2.8.0", now);
    seedAntigravityCliVersionCache("1.6.0", now);
    assert.equal(await resolveAntigravityIdeVersion(failingFetch as typeof fetch), "2.8.0");
    assert.equal(await resolveAntigravityCliVersion(failingFetch as typeof fetch), "1.6.0");
    assert.equal(fetches, 2, "a fresh cache answers these two without touching the network");
  } finally {
    Date.now = realNow;
  }
});

test("concurrent requests coalesce within each product without crossing products", async () => {
  let ideCalls = 0;
  let cliCalls = 0;
  let releaseIde: (() => void) | undefined;
  let releaseCli: (() => void) | undefined;
  const ideGate = new Promise<void>((resolve) => {
    releaseIde = resolve;
  });
  const cliGate = new Promise<void>((resolve) => {
    releaseCli = resolve;
  });

  const ideFetch = async () => {
    ideCalls += 1;
    await ideGate;
    return new Response(JSON.stringify([{ version: "2.9.0" }]), { status: 200 });
  };
  const cliFetch = async () => {
    cliCalls += 1;
    await cliGate;
    return new Response(JSON.stringify({ tag_name: "1.6.0" }), { status: 200 });
  };

  const ideOne = resolveAntigravityIdeVersion(ideFetch as typeof fetch);
  const ideTwo = resolveAntigravityIdeVersion(ideFetch as typeof fetch);
  const cliOne = resolveAntigravityCliVersion(cliFetch as typeof fetch);
  const cliTwo = resolveAntigravityCliVersion(cliFetch as typeof fetch);
  releaseIde?.();
  releaseCli?.();

  assert.deepEqual(await Promise.all([ideOne, ideTwo]), ["2.9.0", "2.9.0"]);
  assert.deepEqual(await Promise.all([cliOne, cliTwo]), ["1.6.0", "1.6.0"]);
  assert.equal(ideCalls, 1);
  assert.equal(cliCalls, 1);
});

test("a failed release lookup is retried at most once per retry window", async () => {
  let now = 5_000;
  Date.now = () => now;
  let calls = 0;
  const failingFetch = async () => {
    calls += 1;
    throw new Error("offline");
  };
  const originalWarn = console.warn;
  console.warn = () => {};

  try {
    assert.equal(
      await resolveAntigravityCliVersion(failingFetch as typeof fetch),
      ANTIGRAVITY_CLI_FALLBACK_VERSION
    );
    assert.equal(
      await resolveAntigravityCliVersion(failingFetch as typeof fetch),
      ANTIGRAVITY_CLI_FALLBACK_VERSION
    );
    assert.equal(calls, 1, "the retry window must absorb the second attempt");

    now += ANTIGRAVITY_VERSION_RETRY_TTL_MS + 1;
    await resolveAntigravityCliVersion(failingFetch as typeof fetch);
    assert.equal(calls, 2, "the lookup is attempted again once the window expires");
  } finally {
    console.warn = originalWarn;
  }
});

test("an explicit version override wins over the cache and the fallback", async () => {
  let calls = 0;
  const fetchMock = async () => {
    calls += 1;
    return new Response(JSON.stringify({ tag_name: "1.6.0" }), { status: 200 });
  };

  process.env.ANTIGRAVITY_CLI_VERSION = "v9.9.9";
  process.env.ANTIGRAVITY_IDE_VERSION = "8.8.8";
  try {
    assert.equal(await resolveAntigravityCliVersion(fetchMock as typeof fetch), "9.9.9");
    assert.equal(getCachedAntigravityCliVersion(), "9.9.9");
    assert.equal(await resolveAntigravityIdeVersion(fetchMock as typeof fetch), "8.8.8");
    assert.equal(getCachedAntigravityIdeVersion(), "8.8.8");
    assert.equal(calls, 0, "an override must not reach for the release source");
  } finally {
    delete process.env.ANTIGRAVITY_CLI_VERSION;
    delete process.env.ANTIGRAVITY_IDE_VERSION;
  }
});

test("an outage warns once and stays quiet until the source recovers", async () => {
  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (message?: unknown) => {
    warnings.push(String(message));
  };
  let now = 10_000;
  Date.now = () => now;
  const failingFetch = async () => {
    throw new Error("offline");
  };
  const okFetch = async () => new Response(JSON.stringify({ tag_name: "1.6.0" }), { status: 200 });

  try {
    await resolveAntigravityCliVersion(failingFetch as typeof fetch);
    now += ANTIGRAVITY_VERSION_RETRY_TTL_MS + 1;
    await resolveAntigravityCliVersion(failingFetch as typeof fetch);
    assert.equal(warnings.length, 1, "one warning per outage, not one per attempt");
    assert.match(warnings[0], /antigravity-version/);
    assert.match(warnings[0], /cli release lookup failed/);
    assert.match(warnings[0], /offline/);
    assert.match(warnings[0], new RegExp(ANTIGRAVITY_CLI_FALLBACK_VERSION.replace(/\./g, "\\.")));

    now += ANTIGRAVITY_VERSION_RETRY_TTL_MS + 1;
    assert.equal(await resolveAntigravityCliVersion(okFetch as typeof fetch), "1.6.0");

    now += ANTIGRAVITY_VERSION_CACHE_TTL_MS + 1;
    await resolveAntigravityCliVersion(failingFetch as typeof fetch);
    assert.equal(warnings.length, 2, "recovery re-arms the warning");
  } finally {
    console.warn = originalWarn;
  }
});

test("a cache clear during an in-flight lookup is not undone when it fails", async () => {
  clearAntigravityVersionCaches();
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  let calls = 0;
  const failingFetch = (async () => {
    calls += 1;
    await gate;
    throw new Error("feed down");
  }) as unknown as typeof fetch;

  const pending = resolveAntigravityIdeVersion(failingFetch);
  clearAntigravityVersionCaches();
  release();
  await pending;

  // The failed lookup started before the clear, so its failure timestamp must not be
  // recorded: a second call has to reach the feed again instead of sitting in the retry window.
  await resolveAntigravityIdeVersion(failingFetch);
  assert.equal(calls, 2);
});

test("a stale successful lookup does not populate the cache", async () => {
  const originalWarn = console.warn;
  console.warn = () => {};
  clearAntigravityVersionCaches();
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const pending = resolveAntigravityIdeVersion((async () => {
    await gate;
    return { ok: true, json: async () => [{ version: "9.9.9" }] };
  }) as unknown as typeof fetch);

  clearAntigravityVersionCaches();
  release();
  const version = await pending;

  assert.equal(version, "9.9.9", "the caller still receives what it resolved");
  try {
    assert.equal(
      getCachedAntigravityIdeVersion(),
      ANTIGRAVITY_IDE_FALLBACK_VERSION,
      "a lookup started before the clear must not fill the cache"
    );
  } finally {
    console.warn = originalWarn;
  }
});

test("a settled stale lookup does not free the slot a newer lookup owns", async () => {
  const originalWarn = console.warn;
  console.warn = () => {};
  clearAntigravityVersionCaches();
  const releases: Array<() => void> = [];
  const gates = [0, 1].map(
    () =>
      new Promise<void>((resolve) => {
        releases.push(resolve);
      })
  );
  let calls = 0;
  const fetchImpl = (async () => {
    const index = calls;
    calls += 1;
    await gates[index];
    if (index === 0) throw new Error("feed down");
    return { ok: true, json: async () => [{ version: "9.9.9" }] };
  }) as unknown as typeof fetch;

  const stale = resolveAntigravityIdeVersion(fetchImpl);
  clearAntigravityVersionCaches();
  const current = resolveAntigravityIdeVersion(fetchImpl);
  releases[0]();
  await stale;

  // The stale lookup settled while the newer one still owns the slot: a third call has to
  // join the newer lookup instead of starting another fetch.
  const joined = resolveAntigravityIdeVersion(fetchImpl);
  releases[1]();
  try {
    assert.equal(await joined, await current);
    assert.equal(calls, 2, "the stale finally must not free the newer lookup's slot");
  } finally {
    console.warn = originalWarn;
  }
});
