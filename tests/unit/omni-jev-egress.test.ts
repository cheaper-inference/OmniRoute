import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// The opt-in jev-api mode sends the user's text to a third party, so it must leave through the
// project's outbound policy (egress guard + global proxy), like the Nadir strategy, not a bare fetch.
const source = readFileSync(
  new URL("../../open-sse/services/autoCombo/omniJev.ts", import.meta.url),
  "utf8"
);

test("jev-api egress goes through safeOutboundFetch with the provider outbound guard", () => {
  assert.match(source, /import\("@\/shared\/network\/safeOutboundFetch"\)/);
  assert.match(source, /guard:\s*getProviderOutboundGuard\(\)/);
});

test("jev-api egress never falls back to the bare global fetch", () => {
  assert.doesNotMatch(source, /\(deps\.fetch \?\? fetch\)/);
});
