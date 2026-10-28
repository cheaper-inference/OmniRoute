// Behavioral check for the OMNIROUTE_SESSION_TTL_MIN override. node:test runs
// each file in its own process, so setting the env at the top of this file and
// importing the module dynamically gives the resolver a fresh read without
// touching the cache other tests rely on.
import test from "node:test";
import assert from "node:assert/strict";

process.env.OMNIROUTE_SESSION_TTL_MIN = "45";

test("OMNIROUTE_SESSION_TTL_MIN=45 keeps a session alive at 15 minutes but expires it at 46", async () => {
  const mod = await import("../../open-sse/services/sessionManager.ts");

  const realNow = Date.now;
  let fakeNow = 1_000_000;
  Date.now = () => fakeNow;
  try {
    mod.clearSessions();
    mod.touchSession("ttl-env-override");
    assert.ok(mod.getSessionInfo("ttl-env-override"), "session alive right after touch");

    fakeNow += 15 * 60 * 1000 + 1; // past the 15-minute default, inside the 45-minute override
    assert.ok(
      mod.getSessionInfo("ttl-env-override"),
      "45-minute override must outlive the 15-minute default"
    );

    fakeNow += 31 * 60 * 1000; // now 46+ minutes since touch
    assert.equal(
      mod.getSessionInfo("ttl-env-override"),
      null,
      "session must expire past the overridden TTL"
    );
  } finally {
    Date.now = realNow;
    mod.clearSessions();
  }
});
