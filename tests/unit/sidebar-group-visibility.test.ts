// The settings value that hides sidebar groups is normalised on read: anything that is not an array
// gives no hidden groups, only known group ids are kept, duplicates collapse, and the result follows
// the canonical group order rather than the order stored.
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  HIDDEN_SIDEBAR_GROUP_LABELS_SETTING_KEY,
  HIDEABLE_SIDEBAR_GROUP_IDS,
  normalizeHiddenSidebarGroupLabels,
} from "../../src/shared/constants/sidebarGroupVisibility.ts";

test("the setting key is the one the settings store uses", () => {
  assert.equal(HIDDEN_SIDEBAR_GROUP_LABELS_SETTING_KEY, "hiddenSidebarGroupLabels");
});

test("a value that is not an array hides nothing", () => {
  for (const value of [undefined, null, "tools", 3, { tools: true }]) {
    assert.deepEqual(normalizeHiddenSidebarGroupLabels(value), [], String(value));
  }
});

test("known ids are kept and unknown or non-string entries are dropped", () => {
  assert.deepEqual(normalizeHiddenSidebarGroupLabels(["logs", "nope", 5, null, "tools"]), [
    "tools",
    "logs",
  ]);
});

test("duplicates collapse and the canonical order wins over the stored order", () => {
  assert.deepEqual(normalizeHiddenSidebarGroupLabels(["batch", "audit", "batch", "tools"]), [
    "tools",
    "audit",
    "batch",
  ]);
});

test("every hideable id survives a round trip in canonical order", () => {
  const reversed = [...HIDEABLE_SIDEBAR_GROUP_IDS].reverse();
  assert.deepEqual(normalizeHiddenSidebarGroupLabels(reversed), [...HIDEABLE_SIDEBAR_GROUP_IDS]);
});

test("ids are matched exactly, without trimming or case folding", () => {
  assert.deepEqual(normalizeHiddenSidebarGroupLabels([" tools", "Tools", "TOOLS"]), []);
});
