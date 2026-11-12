import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-unavailable-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { usageUnavailableMessage, isSupportedUsageConnection } =
  await import("../../src/lib/usage/providerLimits.ts");

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("inf-code is pollable as an OAuth connection", () => {
  assert.equal(
    isSupportedUsageConnection({ id: "c1", provider: "inf-code", authType: "oauth" } as never),
    true
  );
});

test("a supported provider with an ineligible auth type says so", () => {
  const message = usageUnavailableMessage({
    id: "c1",
    provider: "inf-code",
    authType: "cookie",
  } as never);
  assert.match(message, /inf-code/);
  assert.match(message, /cannot be polled/);
});

test("an openai-compatible node without a quotaEndpoint is named as such", () => {
  const message = usageUnavailableMessage({
    id: "c2",
    provider: "openai-compatible-chat-deadbeef",
    authType: "apikey",
    providerSpecificData: { baseUrl: "http://192.168.129.64:18317/v1", nodeName: "InfCode Client" },
  } as never);
  assert.match(message, /openai-compatible-chat-deadbeef/);
  assert.match(message, /quotaEndpoint/);
});

test("a provider with no usage API at all is reported as unregistered", () => {
  const message = usageUnavailableMessage({
    id: "c3",
    provider: "qiniu",
    authType: "apikey",
  } as never);
  assert.match(message, /qiniu/);
  assert.match(message, /no usage\/quota API registered/);
});
