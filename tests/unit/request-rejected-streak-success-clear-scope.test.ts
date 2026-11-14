// #18574 — a successful request must clear the refusal streak only for the model that
// succeeded. chatHelpers' onRequestSuccess used to call clearRequestRejectedStreak() with
// no model, which wipes every `connectionId|*` streak, so interleaved traffic on a healthy
// sibling model kept resetting the refused model's count.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  __resetRequestRejectedStreaksForTests,
  clearRequestRejectedStreak,
  hasRequestRejectedStreak,
  recordRequestRejected,
} from "../../open-sse/services/requestRejectedStreak.ts";

const CONN = "conn-18574";

test.afterEach(() => __resetRequestRejectedStreaksForTests());

test("clearing one model's streak leaves a sibling model's streak intact", () => {
  recordRequestRejected(CONN, "model-a", Date.now());
  recordRequestRejected(CONN, "model-b", Date.now());

  clearRequestRejectedStreak(CONN, "model-a");

  assert.equal(hasRequestRejectedStreak(CONN, "model-a"), false);
  assert.equal(hasRequestRejectedStreak(CONN, "model-b"), true);
});

test("chatHelpers onRequestSuccess clears the streak for the succeeded model only", () => {
  const helpers = fs.readFileSync(
    path.join(process.cwd(), "src/sse/handlers/chatHelpers.ts"),
    "utf8"
  );
  const start = helpers.indexOf("onRequestSuccess: async () => {");
  assert.ok(start > 0, "onRequestSuccess not found in chatHelpers.ts");
  const end = helpers.indexOf("onStreamFailure:", start);
  assert.match(
    helpers.slice(start, end),
    /clearRequestRejectedStreak\(\s*(?:credentials|served)\.connectionId,\s*model\s*\)/,
    "the success hook must scope the clear to the model that succeeded"
  );
});
