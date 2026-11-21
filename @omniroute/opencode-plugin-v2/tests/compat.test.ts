import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import plugin from "../src/index.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Stub the gateway so setup publishes a deterministic catalog without a network. */
function stubFetch(): () => void {
  const original = globalThis.fetch;
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
  return () => {
    globalThis.fetch = original;
  };
}

/** Isolate disk snapshots so a test never reads or writes the operator's catalog. */
function isolatedDataDir(): () => void {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-compat-"));
  const previous = process.env.OPENCODE_DATA_DIR;
  process.env.OPENCODE_DATA_DIR = dir;
  return () => {
    if (previous === undefined) delete process.env.OPENCODE_DATA_DIR;
    else process.env.OPENCODE_DATA_DIR = previous;
    rmSync(dir, { recursive: true, force: true });
  };
}

/** A host context with every domain the plugin reads. Tests replace one at a time. */
function validCtx(
  overrides: {
    options?: Record<string, unknown>;
    provider?: unknown;
    model?: unknown;
    integration?: unknown;
    aisdk?: unknown;
  } = {}
) {
  const ctx: Record<string, unknown> = {
    options: { baseURL: "https://gw.example.com", ...overrides.options },
    provider: {
      transform: () => Promise.resolve({ dispose: async () => {} }),
      reload: async () => {},
    },
    model: {
      transform: () => Promise.resolve({ dispose: async () => {} }),
      reload: async () => {},
    },
    integration: {
      transform: () => Promise.resolve({ dispose: async () => {} }),
      connection: { active: async () => undefined, resolve: async () => undefined },
    },
  };
  if ("provider" in overrides) ctx.provider = overrides.provider;
  if ("model" in overrides) ctx.model = overrides.model;
  if ("integration" in overrides) ctx.integration = overrides.integration;
  if ("aisdk" in overrides) ctx.aisdk = overrides.aisdk;
  return ctx;
}

async function setup(ctx: unknown): Promise<unknown> {
  return (plugin as unknown as { setup: (c: unknown) => Promise<unknown> }).setup(ctx);
}

describe("stable typed plugin contract", () => {
  it("publishes the catalog on a host that exposes no model transform domain", async () => {
    // The typed contract never reads the model domain. A host without it must
    // still publish through provider.transform.
    let added = 0;
    const published: unknown[] = [];
    const ctx = validCtx({
      options: { apiKey: "dummy" },
      model: undefined,
      provider: {
        transform: (cb: (editor: { add: (input: unknown) => void }) => void) => {
          cb({
            add: (input: unknown) => {
              published.push(input);
              added += 1;
            },
          });
          return Promise.resolve({ dispose: async () => {} });
        },
        reload: async () => {},
      },
    });
    const restore = isolatedDataDir();
    const unstub = stubFetch();
    try {
      const cleanup = await setup(ctx);
      assert.equal(typeof cleanup, "function");
      assert.ok(added >= 1, "the catalog is published through provider.transform");
      const providerPayload = published[0] as { models: Array<{ id: string }> } | undefined;
      assert.ok(
        providerPayload?.models.some((m) => m.id === "m1"),
        "the fetched model m1 is published in the catalog"
      );
    } finally {
      unstub();
      restore();
    }
  });

  it("publishes the catalog on a host with no integration transform or AI-SDK hooks", async () => {
    let added = 0;
    const published: unknown[] = [];
    const ctx = validCtx({
      options: { apiKey: "dummy" },
      integration: {
        connection: { active: async () => undefined, resolve: async () => undefined },
      },
      provider: {
        transform: (cb: (editor: { add: (input: unknown) => void }) => void) => {
          cb({
            add: (input: unknown) => {
              published.push(input);
              added += 1;
            },
          });
          return Promise.resolve({ dispose: async () => {} });
        },
        reload: async () => {},
      },
    });
    const restore = isolatedDataDir();
    const unstub = stubFetch();
    try {
      assert.equal(typeof (await setup(ctx)), "function");
      assert.ok(added >= 1, "a missing integration transform costs no catalog rows");
      const providerPayload = published[0] as { models: Array<{ id: string }> } | undefined;
      assert.ok(
        providerPayload?.models.some((m) => m.id === "m1"),
        "the fetched model m1 is published without an integration transform"
      );
    } finally {
      unstub();
      restore();
    }
  });

  it("rejects a host that has no provider transform", async () => {
    const ctx = validCtx({ provider: { reload: async () => {} } });
    await assert.rejects(() => setup(ctx));
  });

  it("rejects a non-object context", async () => {
    await assert.rejects(() => setup(null));
  });

  it("has no stale root index.d.ts declaration", () => {
    assert.ok(!existsSync(join(root, "index.d.ts")));
  });

  it("has no dead legacyToInfo converter", () => {
    const catalog = readFileSync(join(root, "src", "catalog.ts"), "utf8");
    assert.ok(!catalog.includes("legacyToInfo"));
  });
});
