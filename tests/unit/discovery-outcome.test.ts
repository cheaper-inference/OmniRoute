/**
 * Unit coverage for the discovery outcome derivation.
 *
 * A discovery response carries the outcome of the attempt (degraded or not, and
 * why). The derivation turns that response into the record stored for the
 * connection, so the dashboard can show the last failure after the response is
 * gone.
 *
 * The rules under test:
 *  - a degraded response WITH an upstream cause is stored as "degraded";
 *  - a degraded response WITHOUT a cause stores nothing (no discovery failed);
 *  - a local condition (missing credential, missing endpoint, refused
 *    locality, empty catalog, client too old) stores nothing (the provider
 *    answered, the discovery did not fail);
 *  - a live successful discovery is stored as "healthy";
 *  - a fallback (cache, built-in catalog) stores nothing — it is not a
 *    successful discovery, and it must not erase a stored failure.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { readDiscoveryOutcome } from "../../src/app/api/providers/[id]/models/discovery/discoveryOutcome.ts";

const LOCAL_CONDITIONS = [
  "NO_CREDENTIAL",
  "NO_ENDPOINT",
  "LOCALITY_REFUSED",
  "EMPTY_CATALOG",
  "CLIENT_TOO_OLD",
];

test("a degraded response with an upstream cause is stored as degraded", () => {
  assert.deepEqual(readDiscoveryOutcome({ degraded: true, error: "HTTP 500" }), {
    status: "degraded",
    cause: "HTTP 500",
  });
});

test("the stored cause is the one the response carries, untouched", () => {
  assert.deepEqual(readDiscoveryOutcome({ degraded: true, error: "TIMEOUT" }), {
    status: "degraded",
    cause: "TIMEOUT",
  });
  assert.deepEqual(readDiscoveryOutcome({ degraded: true, error: "NETWORK_ERROR" }), {
    status: "degraded",
    cause: "NETWORK_ERROR",
  });
});

test("a degraded response without a cause stores nothing", () => {
  assert.equal(readDiscoveryOutcome({ degraded: true }), null);
  assert.equal(readDiscoveryOutcome({ degraded: true, error: "" }), null);
  assert.equal(readDiscoveryOutcome({ degraded: true, error: "   " }), null);
  assert.equal(readDiscoveryOutcome({ degraded: true, error: 42 }), null);
  assert.equal(readDiscoveryOutcome({ degraded: true, error: { code: 500 } }), null);
});

test("a local condition never overwrites the stored outcome", () => {
  for (const cause of LOCAL_CONDITIONS) {
    assert.equal(
      readDiscoveryOutcome({ degraded: true, error: cause, source: "local_catalog" }),
      null,
      `${cause} must not be stored as a failed discovery`
    );
  }
});

test("a live successful discovery is stored as healthy", () => {
  assert.deepEqual(readDiscoveryOutcome({ source: "api" }), { status: "healthy", cause: null });
  assert.deepEqual(readDiscoveryOutcome({ source: "upstream" }), {
    status: "healthy",
    cause: null,
  });
});

test("a fallback is not a successful discovery and stores nothing", () => {
  assert.equal(readDiscoveryOutcome({ source: "cache" }), null);
  assert.equal(readDiscoveryOutcome({ source: "local_catalog" }), null);
  assert.equal(readDiscoveryOutcome({ source: "github_catalog" }), null);
});

test("an unknown source stores nothing", () => {
  assert.equal(readDiscoveryOutcome({ source: "somewhere-else" }), null);
  assert.equal(readDiscoveryOutcome({ source: 42 }), null);
});

test("a response outside the contract stores nothing", () => {
  assert.equal(readDiscoveryOutcome(null), null);
  assert.equal(readDiscoveryOutcome(undefined), null);
  assert.equal(readDiscoveryOutcome("degraded"), null);
  assert.equal(readDiscoveryOutcome([]), null);
  assert.equal(readDiscoveryOutcome({}), null);
});

test("a non-boolean degraded flag is not a degraded discovery", () => {
  assert.equal(readDiscoveryOutcome({ degraded: "true", error: "HTTP 500" }), null);
  assert.equal(readDiscoveryOutcome({ degraded: 1, error: "HTTP 500" }), null);
  assert.equal(readDiscoveryOutcome({ degraded: "yes", source: "cache" }), null);
});
