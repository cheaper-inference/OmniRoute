import test from "node:test";
import assert from "node:assert/strict";
import { JulesAgent } from "../../src/lib/cloudAgent/agents/jules.ts";

test("Jules creation uses one timestamp even when the clock advances between serializations", async (t) => {
  const start = Date.parse("2026-10-31T23:59:59.999Z");
  const toISOString = Date.prototype.toISOString;
  t.mock.timers.enable({ apis: ["Date"], now: start });
  t.mock.method(Date.prototype, "toISOString", function (this: Date) {
    const value = toISOString.call(this);
    // Make two independent clock reads straddle a millisecond and UTC day.
    t.mock.timers.tick(1);
    return value;
  });
  const fakeFetch = t.mock.method(globalThis, "fetch", async () =>
    Response.json({ name: "sessions/timestamp-fixture" })
  );
  const agent = new JulesAgent();
  const params = {
    prompt: "Test timestamp consistency",
    source: { repoName: "example", repoUrl: "https://github.com/example/example" },
    options: {},
  };

  const first = await agent.createTask(params, { apiKey: "test-only-key" });
  assert.equal(first.createdAt, "2026-10-31T23:59:59.999Z");
  assert.equal(first.updatedAt, first.createdAt);

  const second = await agent.createTask(params, { apiKey: "test-only-key" });
  assert.equal(second.createdAt, "2026-11-01T00:00:00.000Z");
  assert.equal(second.updatedAt, second.createdAt);
  assert.notEqual(second.createdAt, first.createdAt, "each task samples its own creation time");
  assert.equal(fakeFetch.mock.callCount(), 2);
});
