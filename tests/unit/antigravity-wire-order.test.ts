import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  antigravityCliUserAgent,
  getAntigravityContentHeaders,
  getAntigravityLoadCodeAssistMetadata,
  resolveAntigravityGoPlatform,
} from "../../open-sse/services/antigravityHeaders.ts";
import {
  clearAntigravityVersionCaches,
  seedAntigravityCliVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

const wire = JSON.parse(
  readFileSync(new URL("../fixtures/antigravity/native-wire.json", import.meta.url), "utf8")
);

test.afterEach(() => {
  clearAntigravityVersionCaches();
});

test("CLI User-Agent matches the native agy wire image byte for byte", () => {
  // Captured from the native CLI on Windows x64: the platform tokens are Go's
  // runtime.GOOS/GOARCH ("windows"/"amd64"), never Node's ("win32"/"x64"), and the
  // build changelist (`cl=`) is part of the fingerprint.
  seedAntigravityCliVersionCache("1.4.4");
  assert.equal(
    antigravityCliUserAgent("1.4.4", "consumer", "1003595037", {
      osType: "windows",
      arch: "amd64",
    }),
    wire.requestHeaders["User-Agent"]
  );
});

test("host platform maps to the Go GOOS/GOARCH dialect the native binary reports", () => {
  assert.deepEqual(resolveAntigravityGoPlatform("win32", "x64"), wire.platformTokens.win32);
  assert.deepEqual(resolveAntigravityGoPlatform("darwin", "arm64"), wire.platformTokens.darwin);
  assert.deepEqual(resolveAntigravityGoPlatform("linux", "x64"), wire.platformTokens.linux);
});

test("CLI loadCodeAssist metadata is the minimal native string form", () => {
  // The native CLI sends exactly {"metadata":{"ideType":"ANTIGRAVITY"}} (38 bytes) and
  // gets 200. The numeric enum shape is an IDE-only requirement.
  assert.deepEqual(getAntigravityLoadCodeAssistMetadata("cli"), wire.loadCodeAssistMetadata);
});

test("IDE loadCodeAssist metadata keeps the numeric protobuf-JSON enums", () => {
  const metadata = getAntigravityLoadCodeAssistMetadata("ide");
  assert.equal(metadata.ideType, 9);
  assert.equal(metadata.pluginType, 2);
  assert.equal(typeof metadata.platform, "number");
});

test("CLI content headers never emit the IDE-only identity headers", () => {
  seedAntigravityCliVersionCache("1.4.4");
  const headers = new Headers(getAntigravityContentHeaders("cli", "token"));
  for (const forbidden of wire.forbiddenHeaders) {
    assert.equal(headers.get(forbidden), null, `${forbidden} must be absent on the CLI path`);
  }
});

test("CLI content headers carry neither Accept nor x-goog-user-project", () => {
  // The native capture asks for SSE through the `?alt=sse` query param alone — it never
  // sends an Accept header, and a consumer account sends no quota-project header either.
  const headers = getAntigravityContentHeaders("cli", "token");
  const names = Object.keys(headers).map((name) => name.toLowerCase());
  assert.deepEqual(names.sort(), ["authorization", "content-type", "user-agent"]);
});
