import test, { mock } from "node:test";
import assert from "node:assert/strict";
import { buildComplexityRoutingHint } from "../../open-sse/services/autoCombo/complexityRouter.ts";
import { resetSessionTierFloor } from "../../open-sse/services/autoCombo/sessionTierFloor.ts";

const FLAG = "OMNIROUTE_SESSION_TIER_FLOOR";
const LOG = { info: () => {} };
const TARGETS = [
  {
    kind: "model",
    provider: "openai",
    model: "gpt-4o-mini",
    modelStr: "openai/gpt-4o-mini",
    executionKey: "k1",
    stepId: "s1",
  },
] as unknown as Parameters<typeof buildComplexityRoutingHint>[0];

// A tool-using request is floored at "cheap"; a bare greeting is "free".
const TOOL_BODY = {
  messages: [{ role: "user", content: "weather?" }],
  tools: [{ function: { name: "get_weather", description: "Get the weather", parameters: {} } }],
};
const YES_BODY = { messages: [{ role: "user", content: "yes" }] };

async function tier(body: unknown, sessionId?: string) {
  const hint = await buildComplexityRoutingHint(TARGETS, body as never, LOG, sessionId);
  return hint?.recommendedMinTier;
}

test.beforeEach(() => {
  delete process.env[FLAG];
  resetSessionTierFloor();
});
test.afterEach(() => {
  delete process.env[FLAG];
  mock.timers.reset();
  mock.restoreAll();
});

test("flag unset: a short follow-up drops back to free (unchanged default)", async () => {
  assert.equal(await tier(TOOL_BODY, "s-a"), "cheap");
  assert.equal(await tier(YES_BODY, "s-a"), "free");
});

test("flag on: a short follow-up keeps the tier the session already reached", async () => {
  process.env[FLAG] = "true";
  assert.equal(await tier(TOOL_BODY, "s-a"), "cheap");
  assert.equal(await tier(YES_BODY, "s-a"), "cheap");
});

test("flag on: the floor is per session and needs a session id", async () => {
  process.env[FLAG] = "true";
  await tier(TOOL_BODY, "s-a");
  assert.equal(await tier(YES_BODY, "s-b"), "free");
  assert.equal(await tier(YES_BODY, undefined), "free");
});

test("flag on: the floor expires after 24 h idle", async () => {
  process.env[FLAG] = "true";
  const realNow = Date.now();
  mock.method(Date, "now", () => realNow);
  await tier(TOOL_BODY, "s-a");
  mock.method(Date, "now", () => realNow + 24 * 3_600_000 + 1);
  assert.equal(await tier(YES_BODY, "s-a"), "free");
});
