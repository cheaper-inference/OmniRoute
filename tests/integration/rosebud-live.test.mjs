import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";

// Explicit opt-in: this test spends the connected account's existing credits.
// Run against a locally reachable candidate with a management-scoped API key.
const enabled = process.env.ROSEBUD_LIVE_TEST === "1";
test(
  "Rosebud image travels through OmniRoute and uses native account credits",
  { skip: !enabled, timeout: 720000 },
  async () => {
    const base = process.env.OMNIROUTE_BASE_URL || "http://127.0.0.1:20128";
    const key = process.env.OMNIROUTE_API_KEY;
    const connectionId = process.env.ROSEBUD_CONNECTION_ID;
    assert.ok(key && connectionId, "Set OMNIROUTE_API_KEY and ROSEBUD_CONNECTION_ID");
    const call = async (path, body) => {
      const response = await fetch(base + path, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(660000),
      });
      const result = await response.json();
      assert.equal(response.ok, true, `HTTP ${response.status}: ${JSON.stringify(result.error)}`);
      return result;
    };
    const before = await call("/api/rosebud/account", { connectionId });
    assert.equal(before.status, "active");
    const output = await call("/v1/images/generations", {
      model: "rosebud/flux-2-flash",
      prompt: "A small blue spaceship on a plain white background",
      response_format: "b64_json",
      idempotency_key: "live-test-" + randomUUID(),
    });
    const bytes = Buffer.from(output.data[0].b64_json, "base64");
    assert.deepEqual(bytes.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    const after = await call("/api/rosebud/account", { connectionId });
    assert.equal(output.rosebud_usage.unit, "rosebud_credits");
    assert.equal(output.rosebud_usage.usd_cost, null);
    assert.ok(
      before.account.balance > after.account.balance,
      "Existing subscription balance must decrease"
    );
    assert.ok(
      after.usage.some(
        (row) => row.id === output.rosebud_usage.job_id && row.status === "succeeded"
      )
    );
    if (typeof output.rosebud_usage.consumed === "number") {
      assert.equal(before.account.balance - after.account.balance, output.rosebud_usage.consumed);
    }
  }
);
