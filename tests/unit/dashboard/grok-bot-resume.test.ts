import assert from "node:assert/strict";
import { test } from "node:test";
import { resumeTranscript } from "../../../src/app/(dashboard)/dashboard/grok-bot/transcript";

test("a bot seen before resumes from its saved cursor", () => {
  const saved = {
    "acct:bot": { after: "40", messages: [{ seq: "40", text: "kept" }] },
  };
  assert.deepEqual(resumeTranscript(saved, "acct", "bot"), {
    phase: "live",
    after: "40",
    messages: [],
    cards: [],
  });
});

test("a newer connection login does not restore the previous conversation", () => {
  const saved = {
    "acct:bot": { after: "40", messages: [{ seq: "40", text: "kept" }], seenAt: "100" },
  };
  assert.deepEqual(resumeTranscript(saved, "acct", "bot", "200"), {
    phase: "snapshot",
    after: "0",
    messages: [],
    cards: [],
  });
});

test("a bot never opened starts a snapshot from zero", () => {
  assert.deepEqual(resumeTranscript({}, "acct", "bot"), {
    phase: "snapshot",
    after: "0",
    messages: [],
    cards: [],
  });
});
