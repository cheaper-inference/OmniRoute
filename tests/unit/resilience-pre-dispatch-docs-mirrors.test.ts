import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { assertMirrorRepairRejectsUnsafeLocale } from "../_helpers/mirrorRepairLocaleGuard.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const relativeSource = "docs/architecture/RESILIENCE_GUIDE.md";
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");
const hash = (text: string) => createHash("sha256").update(text).digest("hex");
const state: {
  sources: Record<
    string,
    {
      source_hash: string;
      locales: Record<
        string,
        {
          source_hash: string;
          target_hash: string;
        }
      >;
    }
  >;
} = JSON.parse(read(".i18n-state.json"));
const current = read(relativeSource);
const sourceParagraph = current.match(
  /The same gate covers the pre-dispatch case \(#16319\):[\s\S]+?hint-less 503\.\n\n/
)?.[0];

test("the English resilience source documents zero-attempt cooldown recovery", () => {
  assert(sourceParagraph);
  for (const token of [
    "429 rate_limit_error",
    "retry_after",
    "reset_at",
    "quota, auth and not-found",
  ])
    assert(sourceParagraph.includes(token));
});

test("every resilience mirror includes the pre-dispatch retry and terminal contracts", () => {
  const missing: string[] = [];
  for (const locale of Object.keys(state.sources[relativeSource].locales)) {
    const target = read(`docs/i18n/${locale}/${relativeSource}`);
    for (const token of [
      "#16319",
      "attempts = 0",
      "wait = false → HTTP 429 rate_limit_error",
      "retry_after / reset_at",
      "no transient hint → HTTP 503 ALL_TARGETS_SKIPPED",
    ])
      if (!target.includes(token)) missing.push(`${locale}: ${token}`);
  }
  assert.equal(missing.length, 0, missing.slice(0, 8).join(", "));
});

test("resilience mirror provenance describes current source and target bytes", () => {
  const entry = state.sources[relativeSource];
  assert.equal(entry.source_hash, hash(current));
  for (const [locale, info] of Object.entries(entry.locales)) {
    assert.equal(info.source_hash, hash(current));
    assert.equal(info.target_hash, hash(read(`docs/i18n/${locale}/${relativeSource}`)));
  }
});

test("resilience mirror repair rejects a traversal before target reads", async () => {
  assert(sourceParagraph);
  await assertMirrorRepairRejectsUnsafeLocale({
    script: path.join(root, "scripts/ad-hoc/relay-resilience-delta-mirrors-20261013.mjs"),
    relativeSource,
    current,
    previous: current.replace(sourceParagraph, ""),
  });
});
