import { test } from "node:test";
import assert from "node:assert/strict";

import { resolveCopilotTokenBaseUrl } from "../../src/sse/services/tokenRefresh.ts";

const withGheUrl = (gheUrl: string) => ({ providerSpecificData: { gheUrl } });

test("ghe-copilot token base URL drops trailing slashes and surrounding spaces", () => {
  const credentials = withGheUrl("  https://ghe.example.com///  ");
  assert.equal(
    resolveCopilotTokenBaseUrl("ghe-copilot", credentials),
    "https://ghe.example.com/api/v3"
  );
});

test("ghe-copilot token base URL ignores other providers and blank hosts", () => {
  assert.equal(resolveCopilotTokenBaseUrl("copilot", withGheUrl("https://x")), undefined);
  assert.equal(resolveCopilotTokenBaseUrl("ghe-copilot", withGheUrl("   ")), undefined);
});

test("a long run of slashes before the end stays linear", () => {
  // `/\/+$/` retries from every slash here, which is quadratic on this input.
  const hostile = `https://ghe.example.com${"/".repeat(100_000)}x`;
  const startedAt = performance.now();
  const resolved = resolveCopilotTokenBaseUrl("ghe-copilot", withGheUrl(hostile));
  const elapsedMs = performance.now() - startedAt;
  assert.equal(resolved, `${hostile}/api/v3`);
  assert.ok(elapsedMs < 1_000, `took ${Math.round(elapsedMs)} ms`);
});
