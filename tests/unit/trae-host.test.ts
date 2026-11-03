// The Trae token refresh posts credentials to a stored `host`, so only an https origin under trae.ai
// may be used: any other value is rejected, and resolveTraeApiHost falls back to the default region
// so the refresh can never be pointed at an arbitrary server.
import { test } from "node:test";
import assert from "node:assert/strict";

import { parseTraeApiHost, resolveTraeApiHost } from "../../open-sse/utils/traeHost.ts";

const DEFAULT_HOST = "https://api-us-east.trae.ai";

test("an https origin under trae.ai is returned as an origin", () => {
  assert.equal(parseTraeApiHost("https://api-eu.trae.ai"), "https://api-eu.trae.ai");
  assert.equal(parseTraeApiHost("https://trae.ai"), "https://trae.ai");
  assert.equal(
    parseTraeApiHost("  https://API-EU.Trae.AI/some/path?x=1#y  "),
    "https://api-eu.trae.ai"
  );
});

test("a host that only looks like trae.ai is rejected", () => {
  assert.equal(parseTraeApiHost("https://nottrae.ai"), null);
  assert.equal(parseTraeApiHost("https://trae.ai.evil.example"), null);
  assert.equal(parseTraeApiHost("https://evil.example/trae.ai"), null);
});

test("anything that is not a plain https origin is rejected", () => {
  assert.equal(parseTraeApiHost("http://api-eu.trae.ai"), null);
  assert.equal(parseTraeApiHost("https://user:pass@api-eu.trae.ai"), null);
  assert.equal(parseTraeApiHost("https://user@api-eu.trae.ai"), null);
  assert.equal(parseTraeApiHost("https://api-eu.trae.ai:8443"), null);
});

test("non-string, empty and malformed values are rejected", () => {
  for (const value of [null, undefined, 42, {}, "", "   ", "not a url", "api-eu.trae.ai"]) {
    assert.equal(parseTraeApiHost(value), null, String(value));
  }
});

test("resolve returns the parsed origin or the default region", () => {
  assert.equal(resolveTraeApiHost("https://api-eu.trae.ai/v1"), "https://api-eu.trae.ai");
  assert.equal(resolveTraeApiHost("https://evil.example"), DEFAULT_HOST);
  assert.equal(resolveTraeApiHost(undefined), DEFAULT_HOST);
  assert.equal(resolveTraeApiHost(""), DEFAULT_HOST);
});
