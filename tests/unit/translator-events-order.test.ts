import assert from "node:assert/strict";
import { before, test } from "node:test";
import {
  getTranslationEvents,
  logTranslationEvent,
  MAX_TRANSLATION_EVENTS,
} from "../../src/lib/translatorEvents.ts";

before(() => {
  logTranslationEvent({ id: "newest", timestamp: "2026-11-25T07:53:01Z" });
  logTranslationEvent({ id: "middle-first", timestamp: "2026-11-25T07:47:48Z" });
  logTranslationEvent({ id: "invalid", timestamp: "invalid" });
  logTranslationEvent({ id: "oldest", timestamp: "2026-11-25T08:43:42+01:00" });
  logTranslationEvent({ id: "middle-last", timestamp: Date.parse("2026-11-25T07:47:48Z") });
});

test("translation history applies the limit after sorting by timestamp", () => {
  const { events, total } = getTranslationEvents(1);

  assert.equal(total, 5);
  assert.deepEqual(
    events.map((event) => event.id),
    ["newest"]
  );
});

test("translation history preserves buffer order for equal timestamps", () => {
  const { events, total } = getTranslationEvents(MAX_TRANSLATION_EVENTS);

  assert.equal(total, 5);
  assert.deepEqual(
    events.map((event) => event.id),
    ["newest", "middle-last", "middle-first", "oldest", "invalid"]
  );
});
