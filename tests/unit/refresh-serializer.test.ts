/**
 * Front 1 (Codex multi-account cascade) — global refresh serialization.
 *
 * Providers under the same Auth0 client_id (OpenAI Codex + openai) get the WHOLE
 * refresh_token family revoked when two sibling accounts refresh concurrently
 * (openai/codex#9648). The per-connection mutex does NOT help here — the colliding
 * refreshes are on DIFFERENT connections. `serializeRefresh` forces concurrency=1
 * across every connection in a rotation group, so two siblings never hit Auth0's
 * /oauth/token at the same time. Non-rotating providers are left untouched.
 *
 * Evidence: VM 192.168.0.15 logs showed bursts of 5-6 Codex refreshes within
 * ~14s whenever a batch of accounts was added — exactly the cascade trigger.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  serializeRefresh,
  rotationGroupFor,
  wasRefreshTokenRotated,
  __resetRefreshSerializerForTest,
  setRefreshLaneMaxMsForTest,
} from "../../open-sse/services/refreshSerializer.ts";

// These tests assert serialization ORDERING (concurrency=1 per group); the
// inter-refresh settle gap is covered by refresh-serializer-spacing.test.ts.
// Opt out of the gap here so the ordering checks stay fast and deterministic.
process.env.CODEX_REFRESH_SPACING_MS = "0";

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

test("codex and openai share one group and never refresh concurrently", async () => {
  __resetRefreshSerializerForTest();
  let active = 0;
  let maxActive = 0;
  const order: string[] = [];

  const task = (label: string, provider: string, ms: number) =>
    serializeRefresh(provider, async () => {
      active++;
      maxActive = Math.max(maxActive, active);
      await delay(ms);
      order.push(label);
      active--;
      return label;
    });

  // codex + openai = same Auth0 client → must serialize together.
  await Promise.all([task("a", "codex", 30), task("b", "openai", 10), task("c", "codex", 10)]);

  assert.equal(maxActive, 1, "no two refreshes in the openai-auth0 group may overlap");
  assert.equal(order.length, 3);
});

test("different rotation groups run concurrently (not serialized against each other)", async () => {
  __resetRefreshSerializerForTest();
  let active = 0;
  let maxActive = 0;
  const run = (provider: string) =>
    serializeRefresh(provider, async () => {
      active++;
      maxActive = Math.max(maxActive, active);
      await delay(20);
      active--;
    });

  await Promise.all([run("codex"), run("claude"), run("kiro")]);
  assert.equal(maxActive, 3, "codex / claude / kiro are independent groups");
});

test("non-rotating providers are not serialized", async () => {
  __resetRefreshSerializerForTest();
  let active = 0;
  let maxActive = 0;
  const run = (provider: string) =>
    serializeRefresh(provider, async () => {
      active++;
      maxActive = Math.max(maxActive, active);
      await delay(20);
      active--;
    });

  await Promise.all([run("antigravity"), run("antigravity"), run("claude")]);
  assert.equal(maxActive, 3, "non-rotating providers must keep running in parallel");
});

test("an error in one refresh does not deadlock the group queue", async () => {
  __resetRefreshSerializerForTest();
  await assert.rejects(
    serializeRefresh("codex", async () => {
      throw new Error("boom");
    }),
    /boom/
  );
  const recovered = await serializeRefresh("codex", async () => "ok");
  assert.equal(recovered, "ok", "queue must keep flowing after a failed refresh");
});

test("rotationGroupFor maps the OpenAI Auth0 family together", () => {
  assert.equal(rotationGroupFor("codex"), rotationGroupFor("openai"));
  assert.notEqual(rotationGroupFor("codex"), rotationGroupFor("claude"));
  assert.equal(rotationGroupFor("antigravity"), null);
});

// Front 3 — reuse-race tolerance: only keep a connection active after an
// unrecoverable refresh failure when the DB token actually changed under us.
test("wasRefreshTokenRotated: true only when the DB token changed to a non-empty value", () => {
  assert.equal(wasRefreshTokenRotated("rt-old", "rt-new"), true, "a sibling rotated it");
  assert.equal(wasRefreshTokenRotated("rt-old", "rt-old"), false, "same token = genuinely dead");
  assert.equal(wasRefreshTokenRotated("rt-old", null), false, "no DB token = deactivate");
  assert.equal(wasRefreshTokenRotated("rt-old", ""), false, "empty DB token = deactivate");
  assert.equal(wasRefreshTokenRotated(null, "rt-new"), false, "unknown attempted = deactivate");
  assert.equal(wasRefreshTokenRotated(undefined, undefined), false);
  assert.equal(wasRefreshTokenRotated("rt-old", { token: "rt-new" }), false);
  assert.equal(wasRefreshTokenRotated(42, "rt-new"), false);
});

// Amazon Q dispatches to the same refresh backend as kiro, and Openference
// rotates one-time-use refresh tokens on its own endpoint: both need lanes.
test("amazon-q shares the kiro rotation lane", () => {
  const lane = rotationGroupFor("amazon-q");
  assert.notEqual(lane, null, "amazon-q must be a rotating provider with a lane");
  assert.equal(
    lane,
    rotationGroupFor("kiro"),
    "amazon-q dispatches to the same refresh backend as kiro"
  );
});

test("openference gets its own rotation lane", () => {
  const lane = rotationGroupFor("openference");
  assert.notEqual(lane, null, "openference must be a rotating provider with a lane");
  assert.notEqual(
    lane,
    rotationGroupFor("kiro"),
    "openference has its own endpoint, not the kiro backend"
  );
  assert.notEqual(lane, rotationGroupFor("codex"));
});

test("two amazon-q refreshes never overlap in the shared kiro lane", async () => {
  __resetRefreshSerializerForTest();
  let active = 0;
  let maxActive = 0;
  const refresh = (provider: string) =>
    serializeRefresh(provider, async () => {
      active++;
      maxActive = Math.max(maxActive, active);
      await delay(20);
      active--;
    });
  await Promise.all([refresh("amazon-q"), refresh("amazon-q")]);
  assert.equal(maxActive, 1, "two amazon-q refreshes in the kiro lane must serialize");
  let crossActive = 0;
  let crossMax = 0;
  const cross = (provider: string) =>
    serializeRefresh(provider, async () => {
      crossActive++;
      crossMax = Math.max(crossMax, crossActive);
      await delay(20);
      crossActive--;
    });
  await Promise.all([cross("amazon-q"), cross("openference")]);
  assert.equal(crossMax, 2, "amazon-q and openference are independent lanes");
});

test("two openference refreshes never overlap in their own lane", async () => {
  __resetRefreshSerializerForTest();
  let active = 0;
  let maxActive = 0;
  const refresh = (provider: string) =>
    serializeRefresh(provider, async () => {
      active++;
      maxActive = Math.max(maxActive, active);
      await delay(20);
      active--;
    });
  await Promise.all([refresh("openference"), refresh("openference")]);
  assert.equal(maxActive, 1, "two openference refreshes in their own lane must serialize");
  let crossActive = 0;
  let crossMax = 0;
  const cross = (provider: string) =>
    serializeRefresh(provider, async () => {
      crossActive++;
      crossMax = Math.max(crossMax, crossActive);
      await delay(20);
      crossActive--;
    });
  await Promise.all([cross("openference"), cross("amazon-q")]);
  assert.equal(crossMax, 2, "openference and amazon-q are independent lanes");
});

test("a nested refresh in the same group runs inside the held lane instead of deadlocking", async () => {
  // refreshAndUpdateCredentials serializes executor.refreshCredentials(), and the
  // Codex/Claude executors call getAccessToken(), which serializes again on the
  // same group. Before the fix the inner call queued behind its own caller until
  // the lane bound fired, and the outer call resolved null.
  __resetRefreshSerializerForTest();
  setRefreshLaneMaxMsForTest(500);
  try {
    const started = Date.now();
    const result = await serializeRefresh("codex", () =>
      serializeRefresh("codex", async () => "inner-refreshed")
    );
    assert.equal(result, "inner-refreshed");
    assert.ok(Date.now() - started < 400, "nested call must not wait for the lane bound");
  } finally {
    setRefreshLaneMaxMsForTest(null);
  }
});

test("reentrancy is scoped to the call chain: a sibling still waits for the held lane", async () => {
  __resetRefreshSerializerForTest();
  const order: string[] = [];
  const outer = serializeRefresh("claude", async () => {
    order.push("outer:start");
    await delay(30);
    await serializeRefresh("claude", async () => {
      order.push("nested");
    });
    order.push("outer:end");
  });
  const sibling = serializeRefresh("claude", async () => {
    order.push("sibling");
  });
  await Promise.all([outer, sibling]);
  assert.deepEqual(order, ["outer:start", "nested", "outer:end", "sibling"]);
});

test("holding one group's lane does not bypass another group's lane", async () => {
  __resetRefreshSerializerForTest();
  const order: string[] = [];
  let releaseKiro!: () => void;
  const kiroHeld = serializeRefresh(
    "kiro",
    () =>
      new Promise<void>((resolve) => {
        order.push("kiro:start");
        releaseKiro = () => {
          order.push("kiro:end");
          resolve();
        };
      })
  );
  await delay(5);
  const codexThenKiro = serializeRefresh("codex", async () => {
    await serializeRefresh("kiro", async () => {
      order.push("codex->kiro");
    });
  });
  await delay(20);
  assert.deepEqual(
    order,
    ["kiro:start"],
    "the nested kiro call must queue behind the held kiro lane"
  );
  releaseKiro();
  await Promise.all([kiroHeld, codexThenKiro]);
  assert.deepEqual(order, ["kiro:start", "kiro:end", "codex->kiro"]);
});
