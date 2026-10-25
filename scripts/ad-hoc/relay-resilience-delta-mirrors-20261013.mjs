// One reviewed source delta (#16360 / #16319); preview by default, no API calls.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import * as prettier from "prettier";
import { z } from "zod";
import { sectionHashes, splitSections, stripTopHeading } from "../i18n/run-translation.mjs";

const root = process.cwd();
const relativeSource = "docs/architecture/RESILIENCE_GUIDE.md";
const sourceAt = (ref) =>
  execFileSync("git", ["show", `${ref}:${relativeSource}`], {
    encoding: "utf8",
    maxBuffer: 4 * 1024 * 1024,
  });
const previous = sourceAt("c188c8e68259fdbeb9f7823f2f1c83fb64fac00f");
const current = await fs.readFile(path.join(root, relativeSource), "utf8");
assert.equal(current, sourceAt("ac590dafa68edba9df399dc9152c386f4d35b4b1"));
export const sourceParagraph =
  "The same gate covers the pre-dispatch case (#16319): when every target of a\n" +
  "combo is skipped before any attempt is made because its model sits in a short\n" +
  "transient lockout, the zero-attempt path waits the lock out under the same\n" +
  "ceilings and re-dispatches, instead of answering a hint-less\n" +
  "`503 ALL_TARGETS_SKIPPED`. When no wait is allowed (ceiling, attempt or budget\n" +
  "exhausted, or the feature off), the terminal response upgrades to\n" +
  "`429 rate_limit_error` carrying `retry_after` / `reset_at` from the earliest\n" +
  "transient lock expiry; quota, auth and not-found locks keep the hint-less 503.\n\n";
assert.equal(current.split(sourceParagraph).length, 2);
assert.equal(current.replace(sourceParagraph, ""), previous, "unreviewed source delta");
const technicalParagraph = [
  "```text",
  "#16319 · comboCooldownWait · pre-dispatch (attempts = 0)",
  "all targets skipped + transient model lockout:",
  "  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs",
  "    → wait → re-dispatch",
  "  wait = false → HTTP 429 rate_limit_error",
  "  retry_after / reset_at ← earliest transient lock expiry",
  "quota_exhausted / auth_error / not_found / not_found_local:",
  "  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED",
  "```",
].join("\n");
const statePath = path.join(root, ".i18n-state.json");
const state = JSON.parse(await fs.readFile(statePath, "utf8"));
const entry = state.sources[relativeSource];
const sha = (text) => createHash("sha256").update(text).digest("hex");
const localeCode = z.string().regex(/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/);
assert.equal(entry.source_hash, sha(previous));
assert.equal(Object.keys(entry.locales).length, 66);
const changes = [];
const now = new Date().toISOString();
const hashes = sectionHashes(splitSections(stripTopHeading(current)));
for (const [locale, info] of Object.entries(entry.locales)) {
  localeCode.parse(locale); // Reject traversal before constructing or opening targets.
  const target = path.join(root, "docs/i18n", locale, relativeSource);
  const before = await fs.readFile(target, "utf8");
  assert.equal(info.source_hash, sha(previous));
  assert.equal(info.target_hash, sha(before), `unreviewed target change: ${locale}`);
  assert(!before.includes("#16319"), `addition already present: ${locale}`);
  const boundary = /\n---\n\n## 5\./g;
  assert.equal([...before.matchAll(boundary)].length, 1, `ambiguous boundary: ${locale}`);
  const content = before.replace(boundary, "\n" + technicalParagraph + "\n\n---\n\n## 5.");
  assert.equal(
    await prettier.format(content, {
      ...(await prettier.resolveConfig(target)),
      filepath: target,
    }),
    content,
    `formatting mismatch: ${locale}`
  );
  changes.push({ target, content });
  entry.locales[locale] = {
    ...info,
    source_hash: sha(current),
    target_hash: sha(content),
    section_hashes: hashes,
    updated_at: now,
  };
}
entry.source_hash = sha(current);
const serialized = await prettier.format(JSON.stringify(state), {
  ...(await prettier.resolveConfig(statePath)),
  filepath: statePath,
});
if (process.argv.includes("--apply")) {
  for (const { target, content } of changes) await fs.writeFile(target, content);
  await fs.writeFile(statePath, serialized);
}
console.log(
  JSON.stringify({
    apply: process.argv.includes("--apply"),
    mirrors: changes.length,
    sourceRecords: 1,
    translationCalls: 0,
  })
);
