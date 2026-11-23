import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-favicon-fallback-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const originalDataDir = TEST_DATA_DIR;
const originalBasePath = process.env.OMNIROUTE_BASE_PATH;

// NOTE: Dynamic imports below are used (with comment) solely because the modules read
// process.env.DATA_DIR at evaluation time. The specifiers are literals.
import test from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("@/lib/db/settings");
const { GET } = await import("../../src/app/api/settings/favicon/route.ts");

const originalFetch = globalThis.fetch;

function buildRequest(url: string, headers?: Record<string, string>): NextRequest {
  const parsed = new URL(url);
  return new NextRequest(new Request(url, { headers: { host: parsed.host, ...headers } }));
}

function mockUpstreamFetch(handler: (url: string) => Promise<Response>): void {
  (globalThis as unknown as { fetch: typeof fetch }).fetch = (async (
    input: unknown,
    init?: RequestInit
  ) => {
    void init;
    return handler(String(input));
  }) as unknown as typeof fetch;
}

function tinyPngDataUrl(): string {
  const bytes = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
    0xde,
  ]);
  return `data:image/png;base64,${bytes.toString("base64")}`;
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.afterEach(() => {
  (globalThis as unknown as { fetch: typeof fetch }).fetch = originalFetch;
  if (originalBasePath === undefined) delete process.env.OMNIROUTE_BASE_PATH;
  else process.env.OMNIROUTE_BASE_PATH = originalBasePath;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

test("no custom icon redirects to the default icon instead of failing", async () => {
  const res = await GET(buildRequest("http://localhost:3000/api/settings/favicon"));
  assert.notEqual(res.status, 500);
  assert.equal(res.status, 307);
  const location = res.headers.get("location") ?? "";
  assert.match(location, /^https?:\/\//);
  assert.ok(location.endsWith("/favicon.svg"), `unexpected location: ${location}`);
});

test("unreachable remote icon redirects to the default icon", async () => {
  await settingsDb.updateSettings({ customFaviconUrl: "http://127.0.0.1:1/icon.png" });
  mockUpstreamFetch(() => Promise.reject(new Error("connection refused")));
  const res = await GET(buildRequest("http://localhost:3000/api/settings/favicon"));
  assert.notEqual(res.status, 500);
  assert.equal(res.status, 307);
  const location = res.headers.get("location") ?? "";
  assert.ok(location.endsWith("/favicon.svg"), `unexpected location: ${location}`);
});

test("invalid icon data redirects to the default icon", async () => {
  await settingsDb.updateSettings({ customFaviconBase64: "data:text/plain;base64,aGVsbG8=" });
  const res = await GET(buildRequest("http://localhost:3000/api/settings/favicon"));
  assert.notEqual(res.status, 500);
  assert.equal(res.status, 307);
  const location = res.headers.get("location") ?? "";
  assert.ok(location.endsWith("/favicon.svg"), `unexpected location: ${location}`);
});

test("valid custom icon is served unchanged", async () => {
  const dataUrl = tinyPngDataUrl();
  await settingsDb.updateSettings({ customFaviconBase64: dataUrl });
  const res = await GET(buildRequest("http://localhost:3000/api/settings/favicon"));
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("content-type"), "image/png");
  const body = Buffer.from(await res.arrayBuffer());
  const expected = Buffer.from(dataUrl.split(",")[1], "base64");
  assert.deepEqual(body, expected);
});

test("redirect keeps the configured subpath prefix", async () => {
  process.env.OMNIROUTE_BASE_PATH = "/omniroute";
  const res = await GET(buildRequest("http://localhost:3000/api/settings/favicon"));
  assert.equal(res.status, 307);
  const location = res.headers.get("location") ?? "";
  assert.ok(location.endsWith("/omniroute/favicon.svg"), `unexpected location: ${location}`);
});

test("direct request without forwarded protocol keeps a valid scheme", async () => {
  const res = await GET(buildRequest("http://localhost:3000/api/settings/favicon"));
  const location = res.headers.get("location") ?? "";
  assert.ok(location.startsWith("http://"), `unexpected location: ${location}`);
  assert.ok(!location.includes("http:://"), `malformed location: ${location}`);
});

test("failed default icon redirect serves the default icon file directly", async () => {
  const res = await GET(undefined as unknown as NextRequest);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("content-type"), "image/svg+xml");
  const body = await res.text();
  assert.ok(body.includes("<svg"), "default icon file must be served");
});

test("redirect keeps the public host behind a reverse proxy", async () => {
  const res = await GET(
    buildRequest("http://internal:3000/api/settings/favicon", {
      host: "internal:3000",
      "x-forwarded-host": "public.example",
      "x-forwarded-proto": "https",
    })
  );
  assert.equal(res.status, 307);
  const location = res.headers.get("location") ?? "";
  assert.ok(location.startsWith("https://public.example/"), `unexpected location: ${location}`);
});

test("unreadable default icon file answers 404 instead of failing", async () => {
  const emptyDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-favicon-empty-"));
  const previousCwd = process.cwd();
  try {
    process.chdir(emptyDir);
    const res = await GET(undefined as unknown as NextRequest);
    assert.notEqual(res.status, 500);
    assert.equal(res.status, 404);
    assert.equal(await res.text(), "Not found");
  } finally {
    process.chdir(previousCwd);
    fs.rmSync(emptyDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
