import { describe, it, mock, before, after, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import plugin from "../src/index.js";
import { startRefreshLoop } from "../src/refresh-loop.js";
import { diskSnapshotPath, memoryCacheKey } from "../src/cache.js";

interface ReloadCounter {
  count: number;
}

interface SetupResult {
  added: Array<{ info?: { id?: string }; models?: Array<{ id?: string }> }>;
  ctx: Record<string, unknown>;
}

function isolateDisk(): () => void {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-cf-"));
  const prev = process.env.OPENCODE_DATA_DIR;
  process.env.OPENCODE_DATA_DIR = dir;
  return () => {
    if (prev === undefined) delete process.env.OPENCODE_DATA_DIR;
    else process.env.OPENCODE_DATA_DIR = prev;
  };
}

function setupCtx(
  providerId: string,
  reloads: ReloadCounter,
  apiKey = "k-" + providerId
): SetupResult {
  const added: SetupResult["added"] = [];
  let transformCb: ((editor: { add: (input: unknown) => void }) => void) | undefined;
  const ctx: Record<string, unknown> = {
    options: { baseURL: "https://gw.example.com", providerId, apiKey, modelCacheTtlMs: 60000 },
    provider: {
      transform: (cb: (editor: { add: (input: unknown) => void }) => void) => {
        transformCb = cb;
        cb({ add: (input: unknown) => added.push(input as SetupResult["added"][number]) });
        return Promise.resolve({ dispose: async () => {} });
      },
      reload: async () => {
        reloads.count += 1;
        if (transformCb) {
          transformCb({
            add: (input: unknown) => added.push(input as SetupResult["added"][number]),
          });
        }
      },
    },
    model: { transform: () => Promise.resolve({ dispose: async () => {} }) },
    integration: { transform: () => Promise.resolve({ dispose: async () => {} }) },
  };
  return { added, ctx };
}

function ok(body: unknown): Record<string, unknown> {
  return { ok: true, status: 200, statusText: "OK", json: async () => body };
}

async function silence<T>(fn: () => Promise<T>): Promise<T> {
  const warn = console.warn;
  const log = console.log;
  console.warn = () => {};
  console.log = () => {};
  try {
    return await fn();
  } finally {
    console.warn = warn;
    console.log = log;
  }
}

function lastPublished(added: SetupResult["added"]): SetupResult["added"][number] | undefined {
  return added.length > 0 ? added[added.length - 1] : undefined;
}

function publishedIds(added: SetupResult["added"]): string[] {
  const last = lastPublished(added);
  const models = (last?.models ?? []) as Array<{ id?: string }>;
  return models.map((m) => String(m.id));
}

const registryKey = Symbol.for("omniroute.opencode-plugin-v2.refresh-loops");

function getRegistry(): Map<
  string,
  { stop: () => void; state: { entries: Map<string, unknown> } }
> {
  const g = globalThis as unknown as Record<
    symbol,
    Map<string, { stop: () => void; state: { entries: Map<string, unknown> } }>
  >;
  if (!g[registryKey]) g[registryKey] = new Map();
  return g[registryKey];
}

describe("catalog freshness (background refresh loop)", () => {
  let restoreDisk: (() => void) | undefined;

  afterEach(() => {
    const reg = getRegistry();
    for (const entry of reg.values()) {
      try {
        entry.stop();
      } catch {
        // ignore
      }
    }
    reg.clear();
    if (restoreDisk) {
      restoreDisk();
      restoreDisk = undefined;
    }
    mock.timers.reset();
  });

  it("served catalog follows the gateway after a background refresh", async () => {
    restoreDisk = isolateDisk();
    mock.timers.enable({ apis: ["setInterval"] });
    const origFetch = globalThis.fetch;
    let gatewayModels = [{ id: "m1" }];
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (href.includes("/v1/models")) return ok({ data: gatewayModels }) as unknown as Response;
      return ok({ combos: [] }) as unknown as Response;
    }) as typeof fetch;
    const reloads: ReloadCounter = { count: 0 };
    const { added, ctx } = setupCtx("t1", reloads);
    try {
      await silence(async () => {
        await (plugin as { setup: (c: unknown) => Promise<() => void> }).setup(ctx);
        await new Promise((r) => setTimeout(r, 200));
        const before = reloads.count;
        gatewayModels = [{ id: "m1" }, { id: "m2" }];
        await mock.timers.tick(60000);
        await new Promise((r) => setTimeout(r, 200));
        assert.ok(publishedIds(added).includes("m2"), "m2 must be published after the tick");
        assert.equal(reloads.count - before, 1, "exactly one reload on the tick");
      });
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("an unchanged catalog does not request a reload", async () => {
    restoreDisk = isolateDisk();
    mock.timers.enable({ apis: ["setInterval"] });
    const origFetch = globalThis.fetch;
    const gatewayModels = [{ id: "m1" }];
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (href.includes("/v1/models")) return ok({ data: gatewayModels }) as unknown as Response;
      return ok({ combos: [] }) as unknown as Response;
    }) as typeof fetch;
    const reloads: ReloadCounter = { count: 0 };
    const { added, ctx } = setupCtx("t2", reloads);
    try {
      await silence(async () => {
        await (plugin as { setup: (c: unknown) => Promise<() => void> }).setup(ctx);
        await new Promise((r) => setTimeout(r, 200));
        const before = reloads.count;
        await mock.timers.tick(60000);
        await new Promise((r) => setTimeout(r, 200));
        assert.equal(reloads.count - before, 0, "no reload when content is unchanged");
      });
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("a refresh never overlaps itself", async () => {
    mock.timers.enable({ apis: ["setInterval"] });
    let refreshCalls = 0;
    const stop = startRefreshLoop({
      intervalMs: 10,
      refresh: async () => {
        refreshCalls += 1;
        await new Promise((r) => setTimeout(r, 200));
      },
      logger: { warn: () => {} },
    });
    try {
      await mock.timers.tick(25);
      await new Promise((r) => setTimeout(r, 70));
      assert.ok(refreshCalls <= 1, `expected at most one in-flight refresh, got ${refreshCalls}`);
    } finally {
      stop();
    }
  });

  it("a second install replaces the loop instead of stacking it", async () => {
    restoreDisk = isolateDisk();
    mock.timers.enable({ apis: ["setInterval"] });
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (href.includes("/v1/models")) return ok({ data: [{ id: "m1" }] }) as unknown as Response;
      return ok({ combos: [] }) as unknown as Response;
    }) as typeof fetch;
    const reloads: ReloadCounter = { count: 0 };
    try {
      for (let i = 0; i < 3; i++) {
        const { ctx } = setupCtx("t4", reloads);
        await (plugin as { setup: (c: unknown) => Promise<() => void> }).setup(ctx);
        await new Promise((r) => setTimeout(r, 20));
      }
      assert.equal(getRegistry().size, 1, "only one loop registered for the providerId");
      const before = reloads.count;
      await mock.timers.tick(60000);
      await new Promise((r) => setTimeout(r, 200));
      assert.equal(reloads.count - before, 1, "a single tick triggers a single refresh");
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("the period is clamped to the 60s floor", async () => {
    restoreDisk = isolateDisk();
    mock.timers.enable({ apis: ["setInterval"] });
    const origFetch = globalThis.fetch;
    let modelsCalls = 0;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (href.includes("/v1/models")) {
        modelsCalls += 1;
        return ok({ data: [{ id: "m1" }] }) as unknown as Response;
      }
      return ok({ combos: [] }) as unknown as Response;
    }) as typeof fetch;
    const reloads: ReloadCounter = { count: 0 };
    const { ctx } = setupCtx("t5", reloads);
    (ctx as { options: { modelCacheTtlMs: number } }).options.modelCacheTtlMs = 1;
    try {
      await silence(async () => {
        await (plugin as { setup: (c: unknown) => Promise<() => void> }).setup(ctx);
        await new Promise((r) => setTimeout(r, 200));
        const baseline = modelsCalls;
        await mock.timers.tick(30000);
        await new Promise((r) => setTimeout(r, 20));
        assert.equal(modelsCalls, baseline, "no tick before the 60s floor");
        await mock.timers.tick(30000);
        await new Promise((r) => setTimeout(r, 200));
        assert.equal(modelsCalls, baseline + 1, "first useful tick lands at 60s");
      });
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("a failed refresh keeps the last known catalog and logs", async () => {
    restoreDisk = isolateDisk();
    mock.timers.enable({ apis: ["setInterval"] });
    const origFetch = globalThis.fetch;
    let modelsCalls = 0;
    const warns: string[] = [];
    const origWarn = console.warn;
    const origLog = console.log;
    console.log = () => {};
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (href.includes("/v1/models")) {
        modelsCalls += 1;
        if (modelsCalls >= 2) throw new Error("boom");
        return ok({ data: [{ id: "m1" }] }) as unknown as Response;
      }
      return ok({ combos: [] }) as unknown as Response;
    }) as typeof fetch;
    const reloads: ReloadCounter = { count: 0 };
    const { added, ctx } = setupCtx("t6", reloads);
    try {
      console.warn = (...args: unknown[]) => warns.push(args.map(String).join(" "));
      await (plugin as { setup: (c: unknown) => Promise<() => void> }).setup(ctx);
      await new Promise((r) => setTimeout(r, 200));
      const before = reloads.count;
      await mock.timers.tick(60000);
      await new Promise((r) => setTimeout(r, 200));
      assert.ok(publishedIds(added).includes("m1"), "last known catalog stays published");
      assert.equal(reloads.count - before, 0, "no reload when the refresh failed");
      assert.ok(
        warns.some((w) => /models fetch failed|background refresh failed/i.test(w)),
        "a warning is logged"
      );
    } finally {
      console.warn = origWarn;
      console.log = origLog;
      globalThis.fetch = origFetch;
    }
  });

  it("the stale memory entry is removed when the credential moves", async () => {
    restoreDisk = isolateDisk();
    mock.timers.enable({ apis: ["setInterval"] });
    const origFetch = globalThis.fetch;
    const origEnv = process.env.OMNIROUTE_API_KEY;
    delete process.env.OMNIROUTE_API_KEY;
    let connectionKey: string | undefined;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (href.includes("/v1/models")) return ok({ data: [{ id: "m1" }] }) as unknown as Response;
      return ok({ combos: [] }) as unknown as Response;
    }) as typeof fetch;
    const reloads: ReloadCounter = { count: 0 };
    const { ctx } = setupCtx("t7", reloads, "");
    const ctxObj = ctx as {
      integration: {
        connection?: {
          active: (id: string) => Promise<unknown>;
          resolve: (c: unknown) => Promise<unknown>;
        };
      };
    };
    ctxObj.integration.connection = {
      active: async () => (connectionKey === undefined ? undefined : { id: "conn" }),
      resolve: async () => ({ type: "key", key: connectionKey }),
    };
    const origLog = console.log;
    console.log = () => {};
    try {
      connectionKey = undefined;
      await (plugin as { setup: (c: unknown) => Promise<() => void> }).setup(ctx);
      await new Promise((r) => setTimeout(r, 50));
      const entries = getRegistry().get("t7")?.state.entries;
      assert.ok(entries, "the installation is registered");
      // Without a key the models fetcher refuses to run, so nothing is cached
      // under the initial (empty) credential yet. Seed that slot to stand for
      // a catalog cached before the credential moved.
      const baseURL = "https://gw.example.com";
      const previousKey = memoryCacheKey(baseURL, "\0");
      entries.set(previousKey, { models: [{ id: "old" }], combos: [], fetchedAt: Date.now() });
      connectionKey = "key-moved";
      await mock.timers.tick(60000);
      await new Promise((r) => setTimeout(r, 50));
      assert.equal(
        entries.has(previousKey),
        false,
        "the entry cached under the previous credential is evicted"
      );
      assert.deepEqual(
        [...entries.keys()],
        [memoryCacheKey(baseURL, "key-moved\0key-moved")],
        "only the entry for the new credential remains"
      );
    } finally {
      console.log = origLog;
      if (origEnv === undefined) delete process.env.OMNIROUTE_API_KEY;
      else process.env.OMNIROUTE_API_KEY = origEnv;
      globalThis.fetch = origFetch;
    }
  });

  it("gateway change converges without a restart", async () => {
    restoreDisk = isolateDisk();
    mock.timers.enable({ apis: ["setInterval"] });
    const origFetch = globalThis.fetch;
    let gatewayModels = [{ id: "m1" }];
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (href.includes("/v1/models")) return ok({ data: gatewayModels }) as unknown as Response;
      return ok({ combos: [] }) as unknown as Response;
    }) as typeof fetch;
    const reloads: ReloadCounter = { count: 0 };
    const { added, ctx } = setupCtx("f1", reloads);
    try {
      await silence(async () => {
        await (plugin as { setup: (c: unknown) => Promise<() => void> }).setup(ctx);
        await new Promise((r) => setTimeout(r, 200));
        gatewayModels = [{ id: "m1" }, { id: "m2" }];
        await mock.timers.tick(60000);
        await new Promise((r) => setTimeout(r, 200));
        assert.ok(publishedIds(added).includes("m2"));
      });
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("disk snapshot and served catalog stay coherent after a tick", async () => {
    restoreDisk = isolateDisk();
    mock.timers.enable({ apis: ["setInterval"] });
    const origFetch = globalThis.fetch;
    let gatewayModels = [{ id: "m1" }];
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (href.includes("/v1/models")) return ok({ data: gatewayModels }) as unknown as Response;
      return ok({ combos: [] }) as unknown as Response;
    }) as typeof fetch;
    const reloads: ReloadCounter = { count: 0 };
    const { added, ctx } = setupCtx("f2", reloads);
    try {
      await silence(async () => {
        gatewayModels = [{ id: "m1" }, { id: "m2" }];
        await (plugin as { setup: (c: unknown) => Promise<() => void> }).setup(ctx);
        await new Promise((r) => setTimeout(r, 200));
        await mock.timers.tick(60000);
        await new Promise((r) => setTimeout(r, 200));
      });
      const { readFile } = await import("node:fs/promises");
      const snap = JSON.parse(await readFile(diskSnapshotPath("f2"), "utf8")) as {
        models: Array<{ id: string }>;
      };
      const snapIds = snap.models.map((m) => m.id);
      const served = publishedIds(added);
      assert.ok(
        served.every((id) => snapIds.includes(id)),
        "served ids are a subset of the snapshot"
      );
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("a reactivated gateway branch is served without a restart", async () => {
    restoreDisk = isolateDisk();
    mock.timers.enable({ apis: ["setInterval"] });
    const origFetch = globalThis.fetch;
    let gatewayModels = [{ id: "m1" }];
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (href.includes("/v1/models")) return ok({ data: gatewayModels }) as unknown as Response;
      return ok({ combos: [] }) as unknown as Response;
    }) as typeof fetch;
    const reloads: ReloadCounter = { count: 0 };
    const { added, ctx } = setupCtx("f3", reloads);
    try {
      await silence(async () => {
        await (plugin as { setup: (c: unknown) => Promise<() => void> }).setup(ctx);
        await new Promise((r) => setTimeout(r, 200));
        gatewayModels = [{ id: "m1" }, { id: "nvidia/direct" }];
        await mock.timers.tick(60000);
        await new Promise((r) => setTimeout(r, 200));
        assert.ok(publishedIds(added).includes("nvidia/direct"), "reactivated branch is served");
      });
    } finally {
      globalThis.fetch = origFetch;
    }
  });
});
