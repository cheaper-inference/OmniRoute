import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import plugin from "../src/index.js";

interface CapturedCall {
  kind: "provider" | "integration";
}

/**
 * Wait until `read()` stops changing, then return the settled value.
 *
 * The plugin's optional tier lands asynchronously after a publish. Waiting for
 * it with a fixed `sleep(5)` raced the work: under load the tier arrived after
 * the sleep, so the *next* assertion counted its reload and read 2 where it
 * expected 1. Polling until the value holds steady for a few consecutive turns
 * ties the wait to the work instead of to the clock.
 */
async function settle<T>(read: () => T, quietTurns = 3, timeoutMs = 5000): Promise<T> {
  const { setTimeout: sleep } = await import("node:timers/promises");
  const deadline = Date.now() + timeoutMs;
  let last = read();
  let stable = 0;
  while (stable < quietTurns && Date.now() < deadline) {
    await sleep(5);
    const current = read();
    if (current === last) {
      stable += 1;
    } else {
      last = current;
      stable = 0;
    }
  }
  return last;
}

interface FakeCtx {
  options: Record<string, unknown>;
  provider: {
    transform: (cb: (editor: unknown) => unknown) => Promise<{ dispose: () => Promise<void> }>;
    reload: () => Promise<void>;
  };
  model: {
    transform: (cb: (editor: unknown) => unknown) => Promise<{ dispose: () => Promise<void> }>;
  };
  integration: {
    transform: (cb: (draft: unknown) => unknown) => Promise<{ dispose: () => Promise<void> }>;
  };
}

function fakeCtx(options: Record<string, unknown>, seen: CapturedCall[]): FakeCtx {
  return {
    options,
    provider: {
      transform: (cb: (editor: unknown) => unknown) => {
        seen.push({ kind: "provider" });
        assert.equal(typeof cb, "function");
        return Promise.resolve({ dispose: async () => {} });
      },
      reload: async () => {},
    },
    model: {
      transform: (cb: (editor: unknown) => unknown) => {
        assert.equal(typeof cb, "function");
        return Promise.resolve({ dispose: async () => {} });
      },
    },
    integration: {
      transform: (cb: (draft: unknown) => unknown) => {
        seen.push({ kind: "integration" });
        assert.equal(typeof cb, "function");
        return Promise.resolve({ dispose: async () => {} });
      },
    },
  };
}

describe("plugin-v2 entrypoint", () => {
  it("boot line is silent by default, visible with startupDebug", async () => {
    const seen: CapturedCall[] = [];
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(args.map(String).join(" "));
    };
    try {
      await (plugin as unknown as { setup: (ctx: FakeCtx) => Promise<void> }).setup(
        fakeCtx({ baseURL: "https://gw.example.com", providerId: "omniroute" }, seen)
      );
    } finally {
      console.warn = origWarn;
    }
    assert.ok(
      !warns.some((line) => line.includes("init providerId=")),
      `boot line must stay silent by default, got: ${JSON.stringify(warns)}`
    );
    assert.deepEqual(
      seen.map((s) => s.kind),
      ["provider", "integration"]
    );
    const seen2: CapturedCall[] = [];
    const warns2: string[] = [];
    console.warn = (...args: unknown[]) => {
      warns2.push(args.map(String).join(" "));
    };
    try {
      await (plugin as unknown as { setup: (ctx: FakeCtx) => Promise<void> }).setup(
        fakeCtx(
          { baseURL: "https://gw.example.com", providerId: "omniroute", startupDebug: true },
          seen2
        )
      );
    } finally {
      console.warn = origWarn;
    }
    assert.ok(
      warns2.some((line) => line.includes("init providerId=omniroute")),
      `boot line must show with startupDebug, got: ${JSON.stringify(warns2)}`
    );
  });

  it("setup publishes the provider payload through editor.add", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (href.includes("/v1/models")) {
        return {
          ok: true,
          status: 200,
          statusText: "OK",
          json: async () => ({ data: [{ id: "m1" }] }),
        };
      }
      return { ok: true, status: 200, statusText: "OK", json: async () => ({ combos: [] }) };
    }) as typeof fetch;
    const added: Array<{ info: Record<string, unknown>; models: unknown[] }> = [];
    const ctx = {
      options: { baseURL: "https://gw.example.com", providerId: "payload-add", apiKey: "k" },
      provider: {
        transform: (cb: (editor: { add: (input: unknown) => void }) => void) => {
          cb({
            add: (input: unknown) => {
              added.push(input as { info: Record<string, unknown>; models: unknown[] });
            },
          });
          return Promise.resolve({ dispose: async () => {} });
        },
        reload: async () => {},
      },
      model: {
        transform: () => Promise.resolve({ dispose: async () => {} }),
      },
      integration: {
        transform: () => Promise.resolve({ dispose: async () => {} }),
      },
    };
    try {
      await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
    } finally {
      globalThis.fetch = origFetch;
    }
    assert.equal(added.length, 1);
    assert.equal(added[0]?.info.id, "payload-add");
  });

  it("declares key plus env methods and no oauth in the integration transform", async () => {
    const seen: CapturedCall[] = [];
    const integrationCallbacks: Array<(draft: unknown) => unknown> = [];
    const providerCallbacks: Array<(editor: unknown) => unknown> = [];
    const ctx: FakeCtx = {
      options: { baseURL: "https://gw.example.com", providerId: "omniroute" },
      provider: {
        transform: (cb: (editor: unknown) => unknown) => {
          seen.push({ kind: "provider" });
          providerCallbacks.push(cb);
          return Promise.resolve({ dispose: async () => {} });
        },
        reload: async () => {},
      },
      model: {
        transform: () => Promise.resolve({ dispose: async () => {} }),
      },
      integration: {
        transform: (cb: (draft: unknown) => unknown) => {
          seen.push({ kind: "integration" });
          integrationCallbacks.push(cb);
          return Promise.resolve({ dispose: async () => {} });
        },
      },
    };
    const logs: string[] = [];
    const origLog = console.log;
    console.log = (...args: unknown[]) => {
      logs.push(String(args[0]));
    };
    try {
      await (plugin as unknown as { setup: (ctx: FakeCtx) => Promise<void> }).setup(ctx);
    } finally {
      console.log = origLog;
    }
    assert.equal(integrationCallbacks.length, 1);

    interface MethodUpdate {
      integrationID: string;
      method: { type: string; label?: string; names?: string[] };
    }
    interface FakeIntegrationDraft {
      updates: Array<{ id: string; name: string }>;
      methods: MethodUpdate[];
      update: (id: string, fn: (i: { name: string }) => void) => void;
      method: { update: (input: MethodUpdate) => void };
    }
    const draft: FakeIntegrationDraft = {
      updates: [],
      methods: [],
      update(id: string, fn: (i: { name: string }) => void) {
        const entry = { name: "" };
        fn(entry);
        this.updates.push({ id, name: entry.name });
      },
      method: {
        update(input: MethodUpdate) {
          draft.methods.push(input);
        },
      },
    };
    (integrationCallbacks[0] as (draft: FakeIntegrationDraft) => unknown)(draft);
    assert.deepEqual(draft.updates, [{ id: "omniroute", name: "OmniRoute" }]);
    const keyMethod = draft.methods.find((m) => m.method.type === "key");
    const envMethod = draft.methods.find((m) => m.method.type === "env");
    assert.ok(keyMethod);
    assert.equal(keyMethod?.integrationID, "omniroute");
    assert.ok(envMethod);
    assert.deepEqual(envMethod?.method.names, ["OMNIROUTE_API_KEY"]);
    assert.ok(!draft.methods.some((m) => m.method.type === "oauth"));
  });

  it("lazy refresh: [m1] then [m1,m2] reloads once; identical runs never reload", async () => {
    const { mkdtempSync } = await import("node:fs");
    const { tmpdir } = await import("node:os");
    const { join } = await import("node:path");
    const dir = mkdtempSync(join(tmpdir(), "omniroute-lazy-"));
    const prevDataDir = process.env.OPENCODE_DATA_DIR;
    process.env.OPENCODE_DATA_DIR = dir;
    let modelsCall = 0;
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (!href.includes("/v1/models")) {
        return { ok: true, status: 200, statusText: "OK", json: async () => ({ combos: [] }) };
      }
      modelsCall += 1;
      const ids = modelsCall <= 1 ? [{ id: "m1" }] : [{ id: "m1" }, { id: "m2" }];
      return { ok: true, status: 200, statusText: "OK", json: async () => ({ data: ids }) };
    }) as typeof fetch;
    try {
      let reloads = 0;
      const ctx = {
        options: {
          baseURL: "https://gw.example.com",
          providerId: "lazy-reload",
          apiKey: "k-lazy",
          modelCacheTtlMs: 1,
        },
        provider: {
          transform: (cb: (editor: { add: (input: unknown) => void }) => void) => {
            cb({ add: () => {} });
            return Promise.resolve({ dispose: async () => {} });
          },
          reload: async () => {
            reloads += 1;
          },
        },
        model: {
          transform: () => Promise.resolve({ dispose: async () => {} }),
        },
        integration: {
          transform: () => Promise.resolve({ dispose: async () => {} }),
        },
      };
      const logs: string[] = [];
      const origLog = console.log;
      console.log = (...args: unknown[]) => {
        logs.push(String(args[0]));
      };
      try {
        await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
      } finally {
        console.log = origLog;
      }
      assert.equal(reloads, 0, "the first publish sets the baseline, it does not reload");
      assert.equal(modelsCall, 1);
      // The optional tier lands after that first publish and brings combos and
      // the overlay with it — one reload, so the picker shows them without
      // waiting for the next refresh.
      const afterFirstUpgrade = await settle(() => reloads);
      assert.ok(afterFirstUpgrade <= 1, `at most one reload for the first upgrade, got ${reloads}`);
      if (prevDataDir === undefined) delete process.env.OPENCODE_DATA_DIR;
      else process.env.OPENCODE_DATA_DIR = prevDataDir;
    } finally {
      globalThis.fetch = origFetch;
    }
  });
});

describe("host hooks reach plugin-owned alias providers", () => {
  type HookCb = (input: {
    model: { providerID: string; id: string };
    language?: unknown;
    package?: string;
    options?: Record<string, unknown>;
  }) => void;

  function ctxWithHooks(
    options: Record<string, unknown>,
    hooks: Map<string, HookCb>,
    publishedIds: string[] = []
  ): unknown {
    const ctx = fakeCtx(options, []);
    return {
      ...ctx,
      provider: {
        ...ctx.provider,
        // Replaying the transform is what records the ids this setup actually
        // published; the hook guard must read that set, not an id prefix.
        transform: (cb: (editor: unknown) => unknown) => {
          cb({
            add(input: { info: { id: string } }) {
              publishedIds.push(String(input.info.id));
            },
            get() {
              return undefined;
            },
            remove() {},
            models: { set() {} },
          });
          return Promise.resolve({ dispose: async () => {} });
        },
      },
      aisdk: {
        hook: (name: string, cb: HookCb) => {
          hooks.set(name, cb);
          return Promise.resolve({ dispose: async () => {} });
        },
      },
    };
  }

  it("sanitizes Gemini schemas only on providers this setup published", async () => {
    const hooks = new Map<string, HookCb>();
    await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(
      ctxWithHooks({ baseURL: "https://gw.example.com", providerId: "omniroute" }, hooks)
    );
    const cb = hooks.get("language");
    assert.ok(cb, "the language hook must be registered");

    const original = { doGenerate() {}, doStream() {} };
    const ownInput = {
      model: { providerID: "omniroute", id: "gemini-2.5-flash" },
      language: original as unknown,
    };
    cb!(ownInput);
    assert.notEqual(ownInput.language, original, "the base provider must get Gemini sanitization");

    for (const providerID of ["omniroute-gemini", "omniroute-staging", "anthropic"]) {
      const foreignInput = {
        model: { providerID, id: "gemini-2.5-flash" },
        language: original as unknown,
      };
      cb!(foreignInput);
      assert.equal(foreignInput.language, original, `${providerID} is not published by this setup`);
    }
  });

  it("marks telemetry on a published provider when the option is on", async () => {
    const hooks = new Map<string, HookCb>();
    await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(
      ctxWithHooks(
        { baseURL: "https://gw.example.com", providerId: "omniroute", telemetry: true },
        hooks
      )
    );
    const cb = hooks.get("sdk");
    assert.ok(cb, "the sdk hook must be registered when telemetry is on");
    const input = {
      model: { providerID: "omniroute", id: "sonnet" },
      package: "@ai-sdk/openai-compatible",
      options: {} as Record<string, unknown>,
    };
    cb!(input);
    assert.equal(input.options.telemetry, true);

    const foreign = {
      model: { providerID: "omniroute-staging", id: "sonnet" },
      package: "@ai-sdk/openai-compatible",
      options: {} as Record<string, unknown>,
    };
    cb!(foreign);
    assert.equal(foreign.options.telemetry, undefined, "another setup keeps its telemetry option");
  });

  it("keeps Gemini sanitization on a published alias provider", async () => {
    const hooks = new Map<string, HookCb>();
    const publishedIds: string[] = [];
    const dataDir = mkdtempSync(join(tmpdir(), "plugin-hooks-"));
    const previousDataDir = process.env.OPENCODE_DATA_DIR;
    const originalFetch = globalThis.fetch;
    process.env.OPENCODE_DATA_DIR = dataDir;
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const ok = (body: unknown) =>
        Promise.resolve({ ok: true, status: 200, json: async () => body } as Response);
      if (String(input).includes("/v1/models")) return ok({ data: [{ id: "cc/sonnet" }] });
      return ok({});
    }) as typeof fetch;
    try {
      await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(
        ctxWithHooks(
          {
            baseURL: "https://hooks.example.com",
            providerId: "omniroute",
            apiKey: "test-key",
            publishPerProvider: true,
          },
          hooks,
          publishedIds
        )
      );
      assert.ok(
        publishedIds.includes("omniroute-cc"),
        `expected the alias provider to be published, got ${JSON.stringify(publishedIds)}`
      );
      const cb = hooks.get("language");
      assert.ok(cb, "the language hook must be registered");
      const original = { doGenerate() {}, doStream() {} };
      const input = {
        model: { providerID: "omniroute-cc", id: "gemini-2.5-flash" },
        language: original as unknown,
      };
      cb!(input);
      assert.notEqual(
        input.language,
        original,
        "a published alias provider keeps the sanitization"
      );
    } finally {
      globalThis.fetch = originalFetch;
      if (previousDataDir === undefined) delete process.env.OPENCODE_DATA_DIR;
      else process.env.OPENCODE_DATA_DIR = previousDataDir;
      rmSync(dataDir, { recursive: true, force: true });
    }
  });

  it("keeps telemetry disabled on an alias provider when the option is off", async () => {
    const hooks = new Map<string, HookCb>();
    await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(
      ctxWithHooks({ baseURL: "https://gw.example.com", providerId: "omniroute" }, hooks)
    );
    assert.equal(hooks.has("sdk"), false, "no sdk hook when telemetry is off");
  });
});
