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

function rewrittenTo(res: Response | null): string | null {
  return res?.headers.get("x-middleware-rewrite") ?? null;
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

test("the gate rewrites only a /quota/<segment> that must not exist", async () => {
  await withFlag("true", () => {
    for (const p of [
      "/quota/claude",
      "/quota/cc",
      "/quota",
      "/quota/claude/extra",
      "/dashboard",
      "/api/v1/me/quota/claude",
    ]) {
      assert.equal(gate(p), null, p);
    }
    for (const p of ["/quota/nope", "/quota/..%2Fx", "/quota/%E0%A4%A"]) {
      const target = rewrittenTo(gate(p));
      assert.ok(target?.endsWith("/_not-found"), `${p} → ${target}`);
    }
  });
  await withFlag(undefined, () => {
    assert.equal(rewrittenTo(gate("/quota/claude?key=abc")), "http://localhost/_not-found");
  });
});

test("proxy() answers a disabled panel like a missing route, never with a login redirect", async () => {
  await withFlag(undefined, async () => {
    const res = await proxy(new NextRequest("http://localhost/quota/claude"));
    const target = rewrittenTo(res);
    assert.ok(target?.endsWith("/_not-found"), `rewrite target: ${target}`);
    assert.equal(res.headers.get("location"), null);
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
