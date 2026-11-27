// Whether /quota/<provider> exists: the QUOTA_SELF_PANEL flag plus a provider from the registry.
// A page that must not exist is rewritten by src/proxy.ts to the not-found route, so the answer
// is a real 404 even though the root loading.tsx would start streaming with 200.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-panel-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.QUOTA_SELF_PANEL;

const core = await import("../../src/lib/db/core.ts");
const { resolveQuotaPanelPage, quotaPanelGateResponse } =
  await import("../../src/server/selfService/panelRoute.ts");
const { proxy } = await import("../../src/proxy.ts");

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test.after(() => {
  delete process.env.QUOTA_SELF_PANEL;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function withFlag<T>(value: string | undefined, fn: () => T | Promise<T>): Promise<T> {
  const previous = process.env.QUOTA_SELF_PANEL;
  if (value === undefined) delete process.env.QUOTA_SELF_PANEL;
  else process.env.QUOTA_SELF_PANEL = value;
  try {
    return await fn();
  } finally {
    if (previous === undefined) delete process.env.QUOTA_SELF_PANEL;
    else process.env.QUOTA_SELF_PANEL = previous;
  }
}

function gate(pathname: string) {
  return quotaPanelGateResponse(new NextRequest("http://localhost" + pathname));
}

/** The gate's own 404: answered here, with no rewrite or redirect for the framework to follow. */
async function assertPlainNotFound(res: Response | null, label: string): Promise<void> {
  assert.ok(res, `${label}: the gate answers`);
  assert.equal(res.status, 404, label);
  assert.equal(res.headers.get("x-middleware-rewrite"), null, `${label}: no rewrite`);
  assert.equal(res.headers.get("x-middleware-next"), null, `${label}: not passed on`);
  assert.equal(res.headers.get("location"), null, `${label}: no redirect`);
  assert.equal(res.headers.get("cache-control"), "no-store", label);
  assert.equal(await res.text(), "Not Found", label);
}

test("flag off: no provider has a page", async () => {
  await withFlag(undefined, () => {
    assert.equal(resolveQuotaPanelPage("claude"), null);
  });
  await withFlag("false", () => {
    assert.equal(resolveQuotaPanelPage("claude"), null);
  });
});

test("flag on: ids and aliases resolve to the registry entry", async () => {
  await withFlag("true", () => {
    assert.deepEqual(resolveQuotaPanelPage("claude"), {
      provider: "claude",
      providerName: "Claude Code",
    });
    assert.deepEqual(resolveQuotaPanelPage("cc"), {
      provider: "claude",
      providerName: "Claude Code",
    });
    assert.equal(resolveQuotaPanelPage("Anthropic")?.provider, "anthropic");
    assert.equal(resolveQuotaPanelPage(" anthropic ")?.provider, "anthropic");
    assert.equal(resolveQuotaPanelPage("codex")?.provider, "codex");
  });
});

test("flag on: anything outside the registry or the segment shape has no page", async () => {
  await withFlag("true", () => {
    for (const segment of [
      "",
      "not-a-provider",
      "openai-compatible-x",
      "cl aude",
      "../x",
      "a".repeat(65),
    ]) {
      assert.equal(resolveQuotaPanelPage(segment), null, JSON.stringify(segment));
    }
  });
});

test("the gate answers 404 only for a /quota/<segment> that must not exist", async () => {
  await withFlag("true", async () => {
    for (const p of [
      "/quota/claude",
      "/quota/claude/",
      "/quota/cc",
      "/quota/cl%61ude",
      "/quota",
      // Other casing has no route: the gate passes it to the framework's own 404.
      "/QUOTA/nope",
      "/quota/claude/extra",
      "/dashboard",
      "/api/v1/me/quota/claude",
    ]) {
      assert.equal(gate(p), null, p);
    }
    for (const p of ["/quota/nope", "/quota/nope/", "/quota/..%2Fx", "/quota/%E0%A4%A"]) {
      await assertPlainNotFound(gate(p), p);
    }
  });
  await withFlag(undefined, async () => {
    await assertPlainNotFound(gate("/quota/claude?key=abc"), "flag off");
  });
});

test("the gate's 404 does not depend on the address or scheme the request claims", async () => {
  await withFlag(undefined, async () => {
    // A rewrite would be resolved against the request's origin. Behind a TLS proxy, or with the
    // server bound to a loopback address, that origin is not the one the server listens on.
    for (const origin of [
      "http://127.0.0.1:20128",
      "https://localhost:20128",
      "http://[::1]:20128",
    ]) {
      const request = new NextRequest(`${origin}/quota/claude`, {
        headers: { "x-forwarded-proto": "https", "x-forwarded-host": "panel.example.net" },
      });
      await assertPlainNotFound(quotaPanelGateResponse(request), origin);
    }
  });
});

test("a flag read that throws counts as off: the page answers 404", async () => {
  const originalEnv = process.env;
  const originalConsoleError = console.error;
  process.env = new Proxy(originalEnv, {
    get(target, key, receiver) {
      if (key === "QUOTA_SELF_PANEL") throw new Error("flag store unavailable");
      return Reflect.get(target, key, receiver);
    },
  });
  const logged: unknown[][] = [];
  console.error = (...args: unknown[]) => {
    logged.push(args);
  };
  try {
    assert.equal(resolveQuotaPanelPage("claude"), null);
    await assertPlainNotFound(gate("/quota/claude"), "flag read throws");
    assert.equal(logged.length, 2, "each failed flag read is logged");
  } finally {
    process.env = originalEnv;
    console.error = originalConsoleError;
  }
});

test("proxy() answers a disabled panel like a missing route, never with a login redirect", async () => {
  await withFlag(undefined, async () => {
    const res = await proxy(new NextRequest("http://localhost/quota/claude"));
    await assertPlainNotFound(res, "proxy()");
  });
});

test("the API handler validates the segment with the shared schema", () => {
  const source = fs.readFileSync(
    path.join(repoRoot, "src/server/selfService/quotaHandler.ts"),
    "utf8"
  );
  assert.ok(source.includes("selfQuotaProviderSegmentSchema"));
  assert.ok(!source.includes(".regex("));
});
