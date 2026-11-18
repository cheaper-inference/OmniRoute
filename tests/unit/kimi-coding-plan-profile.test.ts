import assert from "node:assert/strict";
import fs from "node:fs";
import { getEventListeners } from "node:events";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { setImmediate as yieldEventLoop } from "node:timers/promises";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kimi-plan-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { getKimiUsage } = await import("../../open-sse/services/usage/kimi.ts");
const { getUsageForProvider } = await import("../../open-sse/services/usage.ts");
const { fetchMoonshotQuota, invalidateMoonshotQuotaCache } =
  await import("../../open-sse/services/moonshotQuotaFetcher.ts");
const { fetchGenericQuota, __testing: genericTesting } =
  await import("../../open-sse/services/genericQuotaFetcher.ts");
const { runWithProxyContext, hasAmbientProxyContext, proxyFetch } =
  await import("../../open-sse/utils/proxyFetch.ts");

const originalFetch = globalThis.fetch;
const payload = {
  usage: { limit: "100", used: "20", remaining: "80" },
  boosterWallet: {
    balance: { type: "BOOSTER", amountLeft: "1234000000" },
    status: "STATUS_ACTIVE",
    monthlyUsed: { priceInCents: 234, currency: "CNY" },
  },
};
const identity = {
  deviceId: "123456781234123412341234567890ab",
  deviceName: "fixture-host",
  deviceModel: "fixture-model",
  osVersion: "fixture-os",
};
type FetchCall = { url: string; init: RequestInit; inProxy: boolean };
let calls: FetchCall[] = [];

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

function stubProfile(
  profile: (init: RequestInit) => Response | Promise<Response>,
  usageBody: unknown = payload
): void {
  calls = [];
  globalThis.fetch = async (input, init = {}) => {
    const url = String(input);
    calls.push({ url, init, inProxy: hasAmbientProxyContext() });
    if (url.endsWith("/usages")) return jsonResponse(usageBody);
    assert.ok(url.endsWith("/me"), "unexpected endpoint: " + url);
    return profile(init);
  };
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  genericTesting.clearCache();
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("profile supplies the NK1-like Pro plan while preserving quotas and billing", async () => {
  stubProfile(() =>
    jsonResponse({
      user_level_name: " Pro ",
      user_level: 25,
      goods_version: 2,
      email: "private-profile@example.invalid",
    })
  );
  const baseline = await getKimiUsage(undefined, "fixture-key");
  const usage = await getKimiUsage(undefined, "fixture-key", {}, { includePlan: true });

  assert.equal(usage.plan, "Pro");
  assert.deepEqual(usage.quotas, baseline.quotas);
  assert.deepEqual(usage.billing, baseline.billing);
  assert.equal(usage.message, undefined);
  assert.equal(JSON.stringify(usage).includes("private-profile"), false);
  assert.deepEqual(
    calls.map((call) => call.url),
    [
      "https://api.kimi.com/coding/v1/usages",
      "https://api.kimi.com/coding/v1/usages",
      "https://api.kimi.com/coding/v1/me",
    ]
  );
});

test("regional profile URLs and credentials preserve the separate usage auth contracts", async () => {
  for (const host of ["api.kimi.ai", "api.kimi.com"]) {
    for (const mode of ["apikey", "oauth", "both"]) {
      stubProfile(() => jsonResponse({ user_level_name: "Pro" }));
      const apiKey = mode === "oauth" ? undefined : "fixture-key";
      const accessToken = mode === "apikey" ? undefined : "fixture-token";
      const usage = await getKimiUsage(
        accessToken,
        apiKey,
        { ...identity, baseUrl: "http://" + host + ":8443/coding/v1/messages?beta=true" },
        { includePlan: true }
      );
      assert.equal(usage.plan, "Pro");
      assert.deepEqual(
        calls.map((call) => call.url),
        ["https://" + host + "/coding/v1/usages", "https://" + host + "/coding/v1/me"]
      );
      const usageHeaders = new Headers(calls[0].init.headers);
      assert.equal(usageHeaders.get("x-api-key"), apiKey ?? null);
      assert.equal(usageHeaders.get("authorization"), apiKey ? null : "Bearer fixture-token");
      assert.equal(usageHeaders.get("x-msh-platform"), apiKey ? null : "kimi_code_cli");
      assert.equal(
        usageHeaders.get("x-msh-device-id"),
        apiKey ? null : "12345678-1234-1234-1234-1234567890ab"
      );
      assert.equal(usageHeaders.get("user-agent"), apiKey ? null : "kimi-code-cli/2.1.1");
      assert.deepEqual(Object.fromEntries(new Headers(calls[1].init.headers)), {
        accept: "application/json",
        authorization: "Bearer " + (apiKey ?? accessToken),
      });
      assert.equal(calls[1].init.method, "GET");
      assert.equal(calls[1].init.redirect, "error");
      assert.ok(calls[1].init.signal instanceof AbortSignal);
    }
  }
});

test("untrusted or absent base URLs keep the canonical default for both reads", async () => {
  for (const baseUrl of [undefined, "invalid", "https://evil.invalid/coding/v1"]) {
    stubProfile(() => jsonResponse({ user_level_name: "Pro" }));
    await getKimiUsage(undefined, "fixture-key", { baseUrl }, { includePlan: true });
    assert.deepEqual(
      calls.map((call) => call.url),
      ["https://api.kimi.com/coding/v1/usages", "https://api.kimi.com/coding/v1/me"]
    );
  }
});

test("only a trimmed explicit profile name overrides the legacy membership fallback", async () => {
  const legacyPayload = { ...payload, user: { membership: { level: "LEVEL_ADVANCED" } } };
  stubProfile(() => jsonResponse({ user_level_name: " Pro " }), legacyPayload);
  assert.equal(
    (await getKimiUsage(undefined, "fixture-key", {}, { includePlan: true })).plan,
    "Pro"
  );

  for (const profile of [
    null,
    [],
    "Pro",
    {},
    { user_level_name: "" },
    { user_level_name: " \t " },
    { user_level_name: 25 },
    { user_level_name: { name: "Pro" } },
    { user_level: 25, goods_version: 2 },
  ]) {
    for (const [body, expected] of [
      [legacyPayload, "Allegro"],
      [payload, "Kimi Coding"],
    ] as const) {
      stubProfile(() => jsonResponse(profile), body);
      const usage = await getKimiUsage(undefined, "fixture-key", {}, { includePlan: true });
      assert.equal(usage.plan, expected);
      assert.equal(usage.message, undefined);
    }
  }
});

test("profile HTTP, network and JSON failures preserve the complete successful usage", async () => {
  stubProfile(() => jsonResponse({ user_level_name: "Pro" }));
  const baseline = await getKimiUsage(undefined, "fixture-key");
  const failures: Array<() => Response | Promise<Response>> = [
    ...[302, 401, 403, 404, 429, 500, 503].map(
      (status) => () =>
        new Response("private-profile-error", {
          status,
          headers: { location: "https://other-region.invalid/me" },
        })
    ),
    () => {
      throw new Error("fetch failed ECONNREFUSED private-profile-error");
    },
    () => new Response("{invalid-json"),
  ];
  for (const failure of failures) {
    stubProfile(failure);
    const usage = await getKimiUsage("unused-token", "fixture-key", {}, { includePlan: true });
    assert.deepEqual(usage, baseline);
    assert.equal(JSON.stringify(usage).includes("private-profile-error"), false);
    assert.equal(calls.length, 2, "no redirect, region or alternate endpoint retry");
    assert.equal(calls[1].init.redirect, "error");
  }
});

for (const phase of ["headers", "body"] as const) {
  test("profile timeout covers " + phase + " and leaves successful usage intact", async (t) => {
    stubProfile(() => jsonResponse({}));
    const baseline = await getKimiUsage(undefined, "fixture-key");
    t.mock.timers.enable({ apis: ["setTimeout"] });
    let enter: () => void;
    const entered = new Promise<void>((resolve) => {
      enter = resolve;
    });
    let signal: AbortSignal | undefined;
    const waitForAbort = (init: RequestInit): Promise<never> => {
      signal = init.signal ?? undefined;
      assert.ok(signal);
      enter();
      return new Promise((_resolve, reject) => {
        signal!.addEventListener("abort", () => reject(signal!.reason), { once: true });
      });
    };
    stubProfile((init) => {
      if (phase === "headers") return waitForAbort(init);
      signal = init.signal ?? undefined;
      return new Response(
        new ReadableStream({
          pull() {
            enter();
          },
        })
      );
    });
    const pending = getKimiUsage(undefined, "fixture-key", {}, { includePlan: true });
    await entered;
    t.mock.timers.tick(2999);
    assert.equal(signal!.aborted, false);
    t.mock.timers.tick(1);
    assert.equal(signal!.aborted, true);
    assert.deepEqual(await pending, baseline);
    t.mock.timers.reset();
  });
}

test("profile timers are cleared after successful parsing and failures", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  for (const response of [jsonResponse({ user_level_name: "Pro" }), new Response("{invalid")]) {
    stubProfile(() => response);
    await getKimiUsage(undefined, "fixture-key", {}, { includePlan: true });
    const signal = calls[1].init.signal!;
    t.mock.timers.tick(3000);
    assert.equal(signal.aborted, false, "completed reads must release their timeout");
    assert.equal(getEventListeners(signal, "abort").length, 0);
  }
  t.mock.timers.reset();
});

test("unsuccessful or invalid /usages never requests a profile", async () => {
  for (const failure of [
    () => jsonResponse({ error: "unauthorized" }, 401),
    () => new Response("{invalid"),
    () => {
      throw new Error("fixture network failure");
    },
  ]) {
    calls = [];
    globalThis.fetch = async (input, init = {}) => {
      calls.push({ url: String(input), init, inProxy: false });
      return failure();
    };
    const usage = await getKimiUsage(undefined, "fixture-key", {}, { includePlan: true });
    assert.ok(usage.message);
    assert.equal(calls.length, 1);
    assert.ok(calls[0].url.endsWith("/usages"));
  }
});

test("profile names also enrich valid usage responses without quota windows", async () => {
  stubProfile(() => jsonResponse({ user_level_name: "Pro" }), {
    boosterWallet: payload.boosterWallet,
  });
  const baseline = await getKimiUsage(undefined, "fixture-key");
  const usage = await getKimiUsage(undefined, "fixture-key", {}, { includePlan: true });
  assert.deepEqual(usage, { ...baseline, plan: "Pro" });
});

test("dispatcher opt-in reaches native and compatible Coding connections on each refresh", async () => {
  for (const provider of [
    "kimi-coding",
    "kimi-coding-apikey",
    "moonshot",
    "openai-compatible-fixture",
  ]) {
    stubProfile(() => jsonResponse({ user_level_name: calls.length === 2 ? "Pro" : "Team" }));
    const connection = {
      provider,
      apiKey: "fixture-key",
      providerSpecificData: { baseUrl: "https://api.kimi.ai/coding/v1" },
    };
    assert.equal((await getUsageForProvider(connection, { includePlan: true })).plan, "Pro");
    assert.equal((await getUsageForProvider(connection, { includePlan: true })).plan, "Team");
    assert.deepEqual(
      calls.map((call) => call.url),
      [
        "https://api.kimi.ai/coding/v1/usages",
        "https://api.kimi.ai/coding/v1/me",
        "https://api.kimi.ai/coding/v1/usages",
        "https://api.kimi.ai/coding/v1/me",
      ]
    );
  }
});

test("both quota preflight consumers and default dispatcher keep profile reads off", async () => {
  stubProfile(() => {
    throw new Error("preflight must not read profiles");
  });
  const connection = {
    provider: "kimi-coding",
    apiKey: "fixture-key",
    providerSpecificData: { baseUrl: "https://api.kimi.ai/coding/v1" },
  };
  const id = "kimi-profile-preflight-fixture";
  try {
    assert.ok(await fetchMoonshotQuota(id, connection));
    assert.ok(await fetchGenericQuota(id, connection));
    assert.ok((await getUsageForProvider(connection)).quotas);
    assert.ok((await getKimiUsage(undefined, "fixture-key", {}, { includePlan: false })).quotas);
    assert.equal(calls.length, 4);
    assert.ok(calls.every((call) => call.url.endsWith("/usages")));
  } finally {
    invalidateMoonshotQuotaCache(id);
  }
});

test("optional profile failures remain inside the inherited connection proxy context", async () => {
  stubProfile(() => {
    throw new Error("fetch failed ECONNREFUSED");
  });
  const usage = await runWithProxyContext({ type: "socks5", host: "127.0.0.1", port: 9 }, () =>
    getKimiUsage(undefined, "fixture-key", {}, { includePlan: true })
  );
  assert.ok(usage.quotas);
  assert.equal(usage.message, undefined);
  assert.equal(calls.length, 2);
  assert.ok(calls.every((call) => call.inProxy));
});

test("native dispatcher IDs without a Coding base URL opt in through the switch arm", async () => {
  for (const connection of [
    { provider: "kimi-coding", accessToken: "fixture-token" },
    { provider: "kimi-coding-apikey", apiKey: "fixture-key" },
  ]) {
    stubProfile(() => jsonResponse({ user_level_name: "Pro" }));
    assert.equal((await getUsageForProvider(connection, { includePlan: true })).plan, "Pro");
    assert.deepEqual(
      calls.map((call) => call.url),
      ["https://api.kimi.com/coding/v1/usages", "https://api.kimi.com/coding/v1/me"]
    );
  }
});

test("profile deadline cancels a stalled body through the real relay wrapper after headers", async (t) => {
  stubProfile(() => jsonResponse({}));
  const baseline = await getKimiUsage(undefined, "fixture-key");
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let callerSignal: AbortSignal | undefined;
  let relaySignal: AbortSignal | undefined;
  let sourceController: ReadableStreamDefaultController<Uint8Array> | undefined;
  let sourceBody: ReadableStream<Uint8Array> | undefined;
  let cancellations = 0;
  const relayPaths: string[] = [];
  globalThis.fetch = (input, init = {}) => {
    if (String(input).endsWith("/me")) callerSignal = init.signal ?? undefined;
    return proxyFetch(input, init, {
      undiciFetch: async (_input, relayInit = {}) => {
        const relayPath = new Headers(relayInit.headers).get("x-relay-path")!;
        relayPaths.push(relayPath);
        if (relayPath.endsWith("/usages")) return jsonResponse(payload);
        assert.equal(relayPath, "/coding/v1/me");
        relaySignal = relayInit.signal ?? undefined;
        sourceBody = new ReadableStream<Uint8Array>({
          start(controller) {
            sourceController = controller;
            controller.enqueue(new TextEncoder().encode('{"user_level_name":"Pro"'));
          },
          cancel() {
            cancellations += 1;
          },
        });
        return new Response(sourceBody);
      },
    });
  };
  let settled = false;
  const pending = runWithProxyContext(
    { type: "vercel", host: "kimi-plan-relay.invalid", relayAuth: "fixture-relay-token" },
    () => getKimiUsage(undefined, "fixture-key", {}, { includePlan: true })
  ).then((usage) => {
    settled = true;
    return usage;
  });
  t.after(async () => {
    if (!cancellations) sourceController?.close();
    await pending;
  });

  await yieldEventLoop();
  assert.ok(callerSignal);
  assert.ok(relaySignal);
  assert.notEqual(callerSignal, relaySignal);
  assert.equal(sourceBody?.locked, true);
  t.mock.timers.tick(2999);
  await yieldEventLoop();
  assert.equal(settled, false);
  t.mock.timers.tick(1);
  await yieldEventLoop();

  assert.equal(callerSignal.aborted, true);
  assert.equal(relaySignal.aborted, false, "relay caller-abort forwarding ended after headers");
  assert.equal(settled, true, "the optional profile must return at its own deadline");
  assert.equal(cancellations, 1);
  assert.equal(sourceBody?.locked, false);
  assert.equal(getEventListeners(callerSignal, "abort").length, 0);
  assert.deepEqual(await pending, baseline);
  assert.deepEqual(relayPaths, ["/coding/v1/usages", "/coding/v1/me"]);
});

test("profile header deadline survives relay retry backoff and cancels a late response body", async (t) => {
  stubProfile(() => jsonResponse({}));
  const baseline = await getKimiUsage(undefined, "fixture-key");
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let callerSignal: AbortSignal | undefined;
  let retrySignal: AbortSignal | undefined;
  let rejectFirst: ((reason: Error) => void) | undefined;
  let resolveLate: ((response: Response) => void) | undefined;
  let profileAttempts = 0;
  let cancellations = 0;
  let lateController: ReadableStreamDefaultController<Uint8Array> | undefined;
  const lateBody = new ReadableStream<Uint8Array>({
    start(controller) {
      lateController = controller;
      controller.enqueue(new TextEncoder().encode('{"user_level_name":"Pro"'));
    },
    cancel() {
      cancellations += 1;
    },
  });
  globalThis.fetch = (input, init = {}) => {
    if (String(input).endsWith("/me")) callerSignal = init.signal ?? undefined;
    return proxyFetch(input, init, {
      undiciFetch: async (_input, relayInit = {}) => {
        const relayPath = new Headers(relayInit.headers).get("x-relay-path")!;
        if (relayPath.endsWith("/usages")) return jsonResponse(payload);
        assert.equal(relayPath, "/coding/v1/me");
        profileAttempts += 1;
        if (profileAttempts === 1) {
          return new Promise<Response>((_resolve, reject) => {
            rejectFirst = reject;
          });
        }
        retrySignal = relayInit.signal ?? undefined;
        return new Promise<Response>((resolve) => {
          resolveLate = resolve;
        });
      },
    });
  };
  let settled = false;
  const pending = runWithProxyContext(
    { type: "vercel", host: "kimi-plan-relay.invalid", relayAuth: "fixture-relay-token" },
    () => getKimiUsage(undefined, "fixture-key", {}, { includePlan: true })
  ).then((usage) => {
    settled = true;
    return usage;
  });
  t.after(async () => {
    t.mock.timers.tick(20);
    await yieldEventLoop();
    if (!cancellations) resolveLate?.(new Response(lateBody));
    await yieldEventLoop();
    if (!settled && !cancellations) lateController?.close();
    await pending;
  });

  await yieldEventLoop();
  assert.ok(rejectFirst);
  t.mock.timers.tick(2999);
  rejectFirst(new Error("fetch failed"));
  await yieldEventLoop();
  t.mock.timers.tick(1);
  await yieldEventLoop();
  assert.equal(callerSignal?.aborted, true);
  assert.equal(
    settled,
    true,
    "the profile header deadline must not depend on relay abort forwarding"
  );
  assert.deepEqual(await pending, baseline);

  t.mock.timers.tick(10);
  await yieldEventLoop();
  assert.equal(
    profileAttempts,
    2,
    "exercise the wrapper's retry after caller abort during backoff"
  );
  assert.equal(retrySignal?.aborted, false);
  assert.ok(resolveLate);
  resolveLate(new Response(lateBody));
  await yieldEventLoop();
  assert.equal(cancellations, 1, "a response arriving after the deadline must be cancelled");
  assert.equal(lateBody.locked, false);
  assert.equal(getEventListeners(callerSignal!, "abort").length, 0);
});
