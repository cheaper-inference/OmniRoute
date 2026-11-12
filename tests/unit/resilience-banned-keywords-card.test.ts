import test from "node:test";
import assert from "node:assert/strict";

import { readSrc } from "../_helpers/readSrc";

const RESILIENCE =
  "src/app/(dashboard)/dashboard/settings/components/ResilienceTab.tsx";
const SECURITY =
  "src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx";

function assertInOrder(source: string, labels: string[]) {
  let lastIndex = -1;
  for (const label of labels) {
    const index = source.indexOf(label);
    assert.notEqual(index, -1, `Expected to find ${label}`);
    assert.ok(index > lastIndex, `Expected ${label} to appear after previous marker`);
    lastIndex = index;
  }
}

test("banned keywords card lives only on the Resilience page", () => {
  const resilience = readSrc(RESILIENCE);
  const security = readSrc(SECURITY);

  assert.match(resilience, /customBannedSignals/);
  // Anchor: make sure the negative guard cannot pass against a renamed file.
  assert.match(security, /export default function SecurityTab\(/);
  assert.doesNotMatch(security, /customBannedSignals/);
});

test("banned keywords are committed only after the server accepts the write", () => {
  const source = readSrc(RESILIENCE);

  // A failed PATCH must not leave the UI showing a keyword the server rejected.
  assertInOrder(source, [
    'if (!res.ok) throw new Error(`HTTP ${res.status}`);',
    "bannedKeywordsRef.current = next;",
    "setBannedKeywords(next);",
    "return true;",
  ]);
  assert.match(source, /notify\.error\(tx\("saveFailed"/);
  // Guard against re-introducing the optimistic write (setState before fetch).
  assert.doesNotMatch(source, /setBannedKeywords\(next\);\s*\n\s*try \{/);
});

test("banned keyword input respects the server's 200-char ceiling", () => {
  const source = readSrc(RESILIENCE);

  // Keep in sync with customBannedSignals: z.array(z.string().max(200)).
  assert.match(source, /const MAX_BANNED_KEYWORD_LENGTH = 200;/);
  assert.match(source, /maxLength=\{MAX_BANNED_KEYWORD_LENGTH\}/);
  assert.match(source, /keyword\.length > MAX_BANNED_KEYWORD_LENGTH/);
});

test("a failed settings load never renders the misleading empty state", () => {
  const source = readSrc(RESILIENCE);

  assert.match(source, /setBannedKeywordsLoadFailed\(true\)/);
  // Editing while the list is unknown must be disabled, otherwise a single
  // PATCH would overwrite the real server-side keywords.
  assert.match(source, /disabled=\{bannedKeywordsBusy\}/);
  assertInOrder(source, [
    "bannedKeywordsLoadFailed ? (",
    '"noCustomBannedSignals",',
  ]);
});

test("rapid edits read the ref, and removal is keyed by value not index", () => {
  const source = readSrc(RESILIENCE);

  assert.match(source, /bannedKeywordsRef\.current\.includes\(keyword\)/);
  assert.match(source, /bannedKeywordsRef\.current\.filter\(\(k\) => k !== keyword\)/);
  assert.match(source, /bannedKeywordsSavingRef\.current\) return/);
  assert.match(source, /<Badge key=\{keyword\}/);
  assert.doesNotMatch(source, /removeBannedKeyword\(index/);
  assert.doesNotMatch(source, /<Badge key=\{index\}/);
});
