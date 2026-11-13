// tests/_helpers/mirrorFreshness.ts decides which translated mirrors a mirror-content test
// asserts. Plan "derived numbers and texts resolved only at release" (2026-11-13): a feature PR
// edits only the English source; the 66 mirrors are rewritten by the translation wave. So in
// PR mode a test asserts only the mirrors that are current with the English source according to
// .i18n-state.json (whole-file hash, or the recorded section hashes of the anchored sections)
// and skips the stale ones with a reason; in release mode it asserts every mirror, as before.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  announceMirrorPlan,
  classifyMirror,
  planMirrorAssertions,
} from "../_helpers/mirrorFreshness.ts";
import {
  sectionHashes,
  splitSections,
  stripTopHeading,
} from "../../scripts/i18n/run-translation.mjs";

const SOURCE = "docs/guides/GUIDE.md";
const PR_ENV = { GITHUB_EVENT_NAME: "pull_request", GITHUB_HEAD_REF: "feat/x" };
const RELEASE_ENV = { GITHUB_EVENT_NAME: "push", GITHUB_REF_NAME: "release/v9.9.9" };

const sha256 = (text: string) => createHash("sha256").update(text).digest("hex");

const ORIGINAL = [
  "# Guide",
  "",
  "Intro paragraph.",
  "",
  "## Retry contract",
  "",
  "The retry contract (#100) waits for `retry_after`.",
  "",
  "## Other",
  "",
  "Unrelated text.",
  "",
].join("\n");

function recordFor(sourceText: string, mirrorText: string) {
  return {
    source_hash: sha256(sourceText),
    target_hash: sha256(mirrorText),
    section_hashes: sectionHashes(splitSections(stripTopHeading(sourceText))),
    updated_at: "2026-11-13T00:00:00.000Z",
  };
}

const mirrorText = (locale: string) =>
  `# Guide (${locale})\n\n🌐 bar\n\n---\n\nIntro.\n\n## Retry\n\nContrato (#100) \`retry_after\`.\n`;

const roots: string[] = [];
test.after(() => {
  for (const root of roots) fs.rmSync(root, { recursive: true, force: true });
});

/** A throwaway checkout: one English source, two mirrors translated from `translatedFrom`. */
function fixture(current: string, translatedFrom = ORIGINAL) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "mirror-freshness-"));
  roots.push(root);
  fs.mkdirSync(path.join(root, path.dirname(SOURCE)), { recursive: true });
  fs.writeFileSync(path.join(root, SOURCE), current);
  const locales: Record<string, unknown> = {};
  for (const locale of ["pt-BR", "fr"]) {
    const target = path.join(root, "docs/i18n", locale, SOURCE);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, mirrorText(locale));
    locales[locale] = recordFor(translatedFrom, mirrorText(locale));
  }
  const state = { sources: { [SOURCE]: { source_hash: sha256(current), locales } } };
  fs.writeFileSync(path.join(root, ".i18n-state.json"), JSON.stringify(state, null, 2));
  return root;
}

test("a mirror translated from the current source bytes is fresh", () => {
  const verdict = classifyMirror({
    sourceText: ORIGINAL,
    record: recordFor(ORIGINAL, "x"),
  });
  assert.equal(verdict.status, "fresh");
});

test("an edit outside the anchored section keeps the mirror fresh for that anchor", () => {
  const edited = ORIGINAL.replace("Unrelated text.", "Unrelated text, reworded.");
  const record = recordFor(ORIGINAL, "x");
  assert.equal(classifyMirror({ sourceText: edited, record }).status, "stale");
  assert.equal(
    classifyMirror({ sourceText: edited, record, anchors: ["The retry contract (#100)"] }).status,
    "fresh"
  );
});

test("an edit inside the anchored section makes the mirror stale, with the reason", () => {
  const edited = ORIGINAL.replace("`retry_after`", "`retry_after` or `reset_at`");
  const verdict = classifyMirror({
    sourceText: edited,
    record: recordFor(ORIGINAL, "x"),
    anchors: [/^The retry contract \(#100\)/m],
  });
  assert.equal(verdict.status, "stale");
  assert.match(verdict.reason, /changed since this mirror was translated/);
});

test("a record without section hashes falls back to the whole-file comparison", () => {
  const edited = ORIGINAL.replace("Unrelated text.", "Unrelated text, reworded.");
  const { section_hashes: _drop, ...legacy } = recordFor(ORIGINAL, "x");
  const verdict = classifyMirror({ sourceText: edited, record: legacy, anchors: ["#100"] });
  assert.equal(verdict.status, "stale");
});

test("a mirror with no translation record is untracked and therefore still asserted", () => {
  assert.equal(classifyMirror({ sourceText: ORIGINAL, record: undefined }).status, "untracked");
  const root = fixture(ORIGINAL);
  const plan = planMirrorAssertions({
    root,
    source: SOURCE,
    locales: ["pt-BR", "fr", "de"],
    env: PR_ENV,
  });
  assert.deepEqual(plan.assert, ["pt-BR", "fr", "de"]);
  assert.deepEqual(plan.skipped, []);
});

test("PR mode: fresh mirrors are asserted", () => {
  const root = fixture(ORIGINAL);
  const plan = planMirrorAssertions({ root, source: SOURCE, env: PR_ENV });
  assert.equal(plan.mode, "pr");
  assert.deepEqual(plan.assert.sort(), ["fr", "pt-BR"]);
  assert.deepEqual(plan.skipped, []);
});

test("PR mode: stale mirrors are skipped with a reason that names the strict mode", (t) => {
  const edited = ORIGINAL.replace("`retry_after`", "`retry_after_ms`");
  const root = fixture(edited);
  const plan = planMirrorAssertions({
    root,
    source: SOURCE,
    anchors: ["The retry contract (#100)"],
    env: PR_ENV,
  });
  assert.equal(plan.mode, "pr");
  assert.deepEqual(plan.assert, []);
  assert.deepEqual(plan.skipped.map((s) => s.locale).sort(), ["fr", "pt-BR"]);
  for (const skipped of plan.skipped) assert.match(skipped.reason, /changed since/);
  const notes: string[] = [];
  let skippedWith: string | undefined;
  announceMirrorPlan(
    {
      diagnostic: (message: string) => notes.push(message),
      skip: (message?: string) => {
        skippedWith = message;
      },
    },
    plan
  );
  assert.match(notes.join("\n"), /SKIP reason=pr-mode/);
  assert.match(notes.join("\n"), /strict check runs in release mode/);
  assert.match(skippedWith ?? "", /SKIP reason=pr-mode/);
  t.diagnostic(notes.join("\n"));
});

test("release mode: stale mirrors are asserted, so a missing token fails the test", () => {
  const edited = ORIGINAL.replace("`retry_after`", "`retry_after_ms`");
  const root = fixture(edited);
  const plan = planMirrorAssertions({
    root,
    source: SOURCE,
    anchors: ["The retry contract (#100)"],
    env: RELEASE_ENV,
  });
  assert.equal(plan.mode, "release");
  assert.deepEqual(plan.assert.sort(), ["fr", "pt-BR"]);
  assert.deepEqual(plan.skipped, []);
  // What a mirror-content test does with the plan: the stale mirrors still lack the new token.
  assert.throws(() => {
    const missing = plan.assert.filter(
      (locale) =>
        !fs
          .readFileSync(path.join(root, "docs/i18n", locale, SOURCE), "utf8")
          .includes("`retry_after_ms`")
    );
    assert.equal(missing.length, 0, missing.join(", "));
  });
});

test("a local run with no event and no override is release mode (strict by default)", () => {
  const root = fixture(ORIGINAL.replace("`retry_after`", "`x`"));
  const plan = planMirrorAssertions({ root, source: SOURCE, env: {} });
  assert.equal(plan.mode, "release");
  assert.equal(plan.skipped.length, 0);
});

test("OMNIROUTE_GATE_MODE=pr turns PR mode on outside Actions", () => {
  const root = fixture(ORIGINAL.replace("`retry_after`", "`x`"));
  const plan = planMirrorAssertions({
    root,
    source: SOURCE,
    env: { OMNIROUTE_GATE_MODE: "pr" },
  });
  assert.equal(plan.mode, "pr");
  assert.equal(plan.skipped.length, 2);
});

test("an anchor missing from the English source is a test bug and throws in both modes", () => {
  const root = fixture(ORIGINAL);
  for (const env of [PR_ENV, RELEASE_ENV]) {
    assert.throws(
      () => planMirrorAssertions({ root, source: SOURCE, anchors: ["no such text"], env }),
      /not found in docs\/guides\/GUIDE\.md/
    );
  }
});

test("announceMirrorPlan stays silent when every mirror is asserted", () => {
  const root = fixture(ORIGINAL);
  const plan = planMirrorAssertions({ root, source: SOURCE, env: PR_ENV });
  const notes: string[] = [];
  let skipped = false;
  announceMirrorPlan(
    {
      diagnostic: (message: string) => notes.push(message),
      skip: () => {
        skipped = true;
      },
    },
    plan
  );
  assert.deepEqual(notes, []);
  assert.equal(skipped, false);
});
