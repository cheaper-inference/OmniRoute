/**
 * tests/_helpers/localeParityMode.ts — the conditional skips of the locale-parity tests (plan
 * "derived numbers and texts resolved only at release", 2026-11-13).
 *
 * Two things are pinned here:
 *   1. what the pr-mode deferral of the placeholder/ICU parity tests covers: nothing in release
 *      mode, only the keys whose English changed since the merge base when it can be read, every
 *      key when it cannot (the unit-test job checks out a single commit);
 *   2. which tests may use the helper at all. check:test-masking counts `.skip(` and
 *      `{ skip: true }` but not a computed `{ skip: "<reason>" }`, so a mode-conditional skip
 *      would spread without anyone noticing. Adding a test to the list below is a reviewed change.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { computeEnglishRewriteDeferral, rewrittenKeys } from "../_helpers/localeParityMode.ts";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

const BASE_EN = { common: { rows: "{count} rows parsed", save: "Save", title: "Title" } };
const HEAD_EN = {
  common: { rows: "{rows} rows parsed", save: "Save", title: "Title", panel: "Panel" },
};

test("rewrittenKeys lists only keys present on both sides with a different English value", () => {
  assert.deepEqual([...rewrittenKeys(BASE_EN, HEAD_EN)], ["common.rows"]);
  assert.deepEqual([...rewrittenKeys(BASE_EN, BASE_EN)], []);
});

test("release mode defers nothing, even without a merge base", () => {
  let read = false;
  const deferral = computeEnglishRewriteDeferral({
    mode: "release",
    headEn: HEAD_EN,
    readBaseEn: () => {
      read = true;
      return null;
    },
  });
  assert.equal(deferral.all, false);
  assert.equal(deferral.keys.size, 0);
  assert.equal(read, false, "release mode never consults git");
});

test("pr mode with a readable merge base defers only the keys the PR rewrote", () => {
  const deferral = computeEnglishRewriteDeferral({
    mode: "pr",
    headEn: HEAD_EN,
    readBaseEn: () => ({ ref: "origin/release/v9.9.9", en: BASE_EN }),
  });
  assert.equal(deferral.all, false);
  assert.deepEqual([...deferral.keys], ["common.rows"]);
  assert.match(deferral.reason, /1 key\(s\) rewritten since origin\/release\/v9\.9\.9/);
});

test("pr mode with no readable merge base defers every key, and says where they are judged", () => {
  const deferral = computeEnglishRewriteDeferral({
    mode: "pr",
    headEn: HEAD_EN,
    readBaseEn: () => null,
  });
  assert.equal(deferral.all, true);
  assert.match(deferral.reason, /check-key-completeness/);
});

// Every test file allowed to use tests/_helpers/localeParityMode.ts, and why.
const ALLOWED = new Map([
  ["tests/unit/cli-i18n-catalog.test.ts", "zh-CN / zh-TW CLI key parity with en.json"],
  ["tests/unit/i18n-pt-br.test.ts", "pt-BR carries every key of en.json"],
  [
    "tests/unit/i18n-vi-completeness.test.ts",
    "vi key parity; placeholder check defers keys whose English the PR rewrote",
  ],
  [
    "tests/unit/i18n-placeholder-parity.test.ts",
    "placeholder parity defers keys whose English the PR rewrote",
  ],
  ["tests/unit/locale-parity-mode.test.ts", "this test"],
]);

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(test|spec)\.(ts|tsx|mts|mjs)$/.test(entry.name)) out.push(full);
  }
  return out;
}

test("only the listed locale-parity tests use the mode-conditional skip helper", () => {
  const users = walk(path.join(REPO, "tests"))
    .filter((file) => fs.readFileSync(file, "utf8").includes("_helpers/localeParityMode"))
    .map((file) => path.relative(REPO, file).split(path.sep).join("/"))
    .sort();
  assert.deepEqual(
    users,
    [...ALLOWED.keys()].sort(),
    "a new user of localeParityMode.ts must be added to ALLOWED with its reason (and reviewed)"
  );
});
