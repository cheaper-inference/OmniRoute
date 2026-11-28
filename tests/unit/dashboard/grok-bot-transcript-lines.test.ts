import test from "node:test";
import assert from "node:assert/strict";

const { transcriptLines } =
  await import("../../../src/app/(dashboard)/dashboard/grok-bot/transcript.ts");

test("frames become one json line each, replay included", () => {
  const lines = transcriptLines([
    { replay: true, rows: { entries: [{ updatedSeq: "1" }] } },
    { heartbeat: true },
  ]);
  assert.deepEqual(
    lines.map((line) => JSON.parse(line)),
    [{ replay: true, rows: { entries: [{ updatedSeq: "1" }] } }, { heartbeat: true }]
  );
});
