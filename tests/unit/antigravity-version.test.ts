import assert from "node:assert/strict";
import test from "node:test";

import {
  ANTIGRAVITY_CLI_FALLBACK_VERSION,
  ANTIGRAVITY_IDE_FALLBACK_VERSION,
  ANTIGRAVITY_VERSION_CACHE_TTL_MS,
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
  assert.equal(ANTIGRAVITY_IDE_FALLBACK_VERSION, "2.7.0");
  assert.equal(ANTIGRAVITY_CLI_FALLBACK_VERSION, "1.5.9");
});

test("IDE resolver reads the official updater feed and caches only the IDE version", async () => {
  const urls: string[] = [];
  const fetchMock = async (url: string | URL | Request) => {
    urls.push(String(url));
    return new Response("<a data-ide-latest-version>v2.8.0</a>", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  assert.equal(await resolveAntigravityIdeVersion(fetchMock as typeof fetch), "2.8.0");
  assert.equal(await resolveAntigravityIdeVersion(fetchMock as typeof fetch), "2.8.0");
  assert.equal(urls.length, 1);
  assert.equal(urls[0], "https://antigravity.google/download");
  assert.equal(getCachedAntigravityIdeVersion(), "2.8.0");
  assert.equal(getCachedAntigravityCliVersion(), "1.5.9");
});

test("IDE resolver selects the newest feed entry and never falls below its version floor", async () => {
  const mixedFeedFetch = async () =>
    new Response(
      JSON.stringify([
        { version: "2.0.0" },
        { version: "2.8.0" },
        { version: "2.8.0" },
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
  assert.equal(getCachedAntigravityIdeVersion(), "2.7.0");
});

test("IDE and CLI TTL refreshes are independent", async () => {
  let now = 1_000;
  Date.now = () => now;
  seedAntigravityCliVersionCache("1.5.9", now);

  const firstFetch = async () =>
    new Response(JSON.stringify([{ version: "2.8.0" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  const secondFetch = async () =>
    new Response(JSON.stringify([{ version: "2.9.0" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  assert.equal(await resolveAntigravityIdeVersion(firstFetch as typeof fetch), "2.8.0");
  now += ANTIGRAVITY_VERSION_CACHE_TTL_MS + 1;
  assert.equal(await resolveAntigravityIdeVersion(secondFetch as typeof fetch), "2.9.0");
  assert.equal(getCachedAntigravityCliVersion(), "1.5.9");
});

test("each resolver falls back only to its own last known good version", async () => {
  const failingFetch = async () => {
    throw new Error("network down");
  };

  assert.equal(
    await resolveAntigravityIdeVersion(failingFetch as typeof fetch),
    ANTIGRAVITY_IDE_FALLBACK_VERSION
  );
  assert.equal(
    await resolveAntigravityCliVersion(failingFetch as typeof fetch),
    ANTIGRAVITY_CLI_FALLBACK_VERSION
  );

  seedAntigravityIdeVersionCache("2.8.0", 0);
  seedAntigravityCliVersionCache("1.6.0", 0);
  assert.equal(await resolveAntigravityIdeVersion(failingFetch as typeof fetch), "2.8.0");
  assert.equal(await resolveAntigravityCliVersion(failingFetch as typeof fetch), "1.6.0");
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
    return new Response("<a data-ide-latest-version>v2.9.0</a>", { status: 200 });
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

test("IDE discovery reads only the standalone IDE version, never the App or SDK", async () => {
  const urls: string[] = [];
  const fetchMock = async (url: string | URL | Request) => {
    urls.push(String(url));
    return new Response(
      '<a data-app-latest-version>v2.32.0</a><a class="chip" data-ide-latest-version>v2.7.0</a><a>SDK v9.0.0</a>'
    );
  };
  assert.equal(await resolveAntigravityIdeVersion(fetchMock as typeof fetch), "2.7.0");
  assert.deepEqual(urls, ["https://antigravity.google/download"]);
});

test("a changed download page falls back to the legacy feed without taking unrelated versions", async () => {
  const fetchMock = async (url: string | URL | Request) =>
    new Response(
      String(url) === "https://antigravity.google/download"
        ? "<a data-app-latest-version>v99.0.0</a>"
        : JSON.stringify([{ version: "2.8.0" }])
    );
  assert.equal(await resolveAntigravityIdeVersion(fetchMock as typeof fetch), "2.8.0");
});

test("failed version sources back off without discarding the last known version", async () => {
  let now = 2_000_000_000_000;
  Date.now = () => now;
  seedAntigravityIdeVersionCache("2.9.0", now - ANTIGRAVITY_VERSION_CACHE_TTL_MS - 1);
  let calls = 0;
  const failing = async () => {
    calls++;
    throw new Error("offline");
  };
  for (let i = 0; i < 3; i++) assert.equal(await resolveAntigravityIdeVersion(failing), "2.9.0");
  assert.equal(calls, 2);
  now += 60_001;
  assert.equal(await resolveAntigravityIdeVersion(failing), "2.9.0");
  assert.equal(calls, 4);
  now += 60_001;
  assert.equal(
    await resolveAntigravityIdeVersion(
      async () => new Response("<a data-ide-latest-version>2.10.0</a>")
    ),
    "2.10.0"
  );
});

test("cold failed lookups also back off while returning the captured floor", async () => {
  let calls = 0;
  const failing = async () => {
    calls++;
    return new Response("unavailable", { status: 503 });
  };
  for (let i = 0; i < 3; i++)
    assert.equal(await resolveAntigravityIdeVersion(failing), ANTIGRAVITY_IDE_FALLBACK_VERSION);
  assert.equal(calls, 2);
});

test("oversized IDE bodies are cancelled before falling back to the legacy feed", async () => {
  let cancelled = false;
  let calls = 0;
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        new TextEncoder().encode("<a data-ide-latest-version>2.9.0</a>" + " ".repeat(512 * 1024))
      );
    },
    cancel() {
      cancelled = true;
    },
  });
  const result = await resolveAntigravityIdeVersion(async () =>
    ++calls === 1 ? new Response(body) : Response.json([{ version: "2.8.0" }])
  );
  assert.equal(result, "2.8.0");
  assert.equal(calls, 2);
  assert.equal(cancelled, true);
});

test("a missing response body falls back to the legacy feed", async () => {
  let calls = 0;
  assert.equal(
    await resolveAntigravityIdeVersion(async () =>
      ++calls === 1 ? new Response(null) : Response.json([{ version: "2.8.0" }])
    ),
    "2.8.0"
  );
  assert.equal(calls, 2);
});

test("the version timeout cancels a stalled body and tries the fallback", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let calls = 0;
  let cancelled = false;
  const body = new ReadableStream<Uint8Array>({
    cancel() {
      cancelled = true;
    },
  });
  const result = resolveAntigravityIdeVersion(async () =>
    ++calls === 1 ? new Response(body) : Response.json([{ version: "2.8.0" }])
  );
  await new Promise<void>((resolve) => setImmediate(resolve));
  t.mock.timers.tick(5_001);
  assert.equal(await result, "2.8.0");
  assert.equal(cancelled, true);
  assert.equal(calls, 2);
});
