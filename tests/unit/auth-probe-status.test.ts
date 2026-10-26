import assert from "node:assert/strict";
import test from "node:test";
import { evaluateAuthProbeStatus } from "../../src/lib/providers/validation/authProbeStatus.ts";

for (const status of [200, 201, 204, 400, 422, 429]) {
  test(`accepts authentication evidence from HTTP ${status}`, () => {
    assert.deepEqual(evaluateAuthProbeStatus(new Response(null, { status })), {
      valid: true,
      error: null,
    });
  });
}
for (const status of [401, 403]) {
  test(`rejects HTTP ${status} even if ok is true`, () => {
    assert.deepEqual(evaluateAuthProbeStatus({ status, ok: true }), {
      valid: false,
      error: "Invalid API key",
    });
  });
}
for (const status of [301, 404, 408, 500, 503]) {
  test(`preserves error classification for HTTP ${status}`, () => {
    assert.deepEqual(evaluateAuthProbeStatus(new Response(null, { status })), {
      valid: false,
      error: status >= 500 ? `Provider unavailable (${status})` : `Validation failed: ${status}`,
    });
  });
}
