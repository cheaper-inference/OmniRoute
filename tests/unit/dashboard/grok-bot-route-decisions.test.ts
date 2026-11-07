import test from "node:test";
import assert from "node:assert/strict";

const D = "../../../src/app/(dashboard)/dashboard/grok-bot";
const { permissionAnswer, permissionFailure, permissionSummary } = await import(
  `${D}/permission.ts`
);
const { watchRefusal, watchCounter, watchSlot } = await import(`${D}/overlap.ts`);
const { transcriptErrorFrame } = await import(`${D}/transcript.ts`);
const { nextExpiry } = await import(`${D}/token.ts`);

// These four decisions used to live inside route handlers, where nothing could
// reach them: the branches that answer 409, 429, the error frame the client
// throws on, and the expiry written after a refresh.

test("a request the service already consumed answers 409 and is not retried", () => {
  assert.deepEqual(permissionFailure(404), { status: 409, code: "gone" });
});

test("any other refusal is reported as unknown so the caller may retry", () => {
  assert.deepEqual(permissionFailure(400), { status: 502, code: "unknown" });
  assert.deepEqual(permissionFailure(500), { status: 502, code: "unknown" });
  assert.deepEqual(permissionFailure(undefined), { status: 502, code: "unknown" });
});

test("the third watch on one connection is refused with 429", () => {
  const counter = watchCounter();
  assert.equal(watchRefusal(watchSlot(counter, "c-1") !== null), null, "first watch is granted");
  assert.equal(watchRefusal(watchSlot(counter, "c-1") !== null), null, "second watch is granted");
  assert.deepEqual(watchRefusal(watchSlot(counter, "c-1") !== null), {
    status: 429,
    code: "too_many_watches",
  });
});

test("the failure frame is a named event, not a data frame", () => {
  const frame = transcriptErrorFrame();
  assert.ok(frame.startsWith("event: error"), "the page throws on this line");
  assert.ok(frame.endsWith("\n\n"), "SSE needs the blank line to dispatch");
  assert.ok(!frame.startsWith("data: "), "a data frame would be parsed as content");
});

test("a refresh answer without an expiry gets a short assumed lifetime", () => {
  const now = Date.parse("2026-10-23T00:00:00Z");
  const written = nextExpiry("", now, 30 * 60 * 1000);
  assert.equal(written, "2026-10-23T00:30:00.000Z");
  // Keeping the spent value would make every later request refresh again.
  assert.notEqual(written, "2026-01-01T00:00:00.000Z");
});

test("a readable expiry is persisted as it came", () => {
  const given = "2026-12-31T23:59:59.000Z";
  assert.equal(nextExpiry(given, Date.now()), given);
});

test("the card names the machine, not its uuid", () => {
  assert.equal(
    permissionSummary({
      action: "read-file",
      target: "/Users/houminxi/code",
      machineId: "0d533c1e-4c2c-45e4-a7b3-42bb0d2b640b",
      machineLabel: "houminxi",
    }),
    "read-file /Users/houminxi/code houminxi"
  );
});

test("a payload without an agent or request id is refused before it reaches the service", () => {
  assert.equal(
    permissionAnswer({ agentId: "", entryId: "e", requestId: "r", resolution: "deny" }),
    null
  );
  assert.equal(
    permissionAnswer({ agentId: "a", entryId: "e", requestId: "", resolution: "deny" }),
    null
  );
  assert.equal(
    permissionAnswer({ agentId: "a", entryId: "e", requestId: "r", resolution: "" }),
    null
  );
});
