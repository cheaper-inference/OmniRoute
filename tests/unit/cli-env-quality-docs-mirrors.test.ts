import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
const envDoc = "docs/reference/ENVIRONMENT.md";
const qualityDoc = "docs/routing/AUTO-COMBO.md";
const names = [
  "OMNIROUTE_NO_UPDATE_NOTIFIER",
  "OMNIROUTE_DOCTOR_LIVENESS_URL",
  "OMNIROUTE_PROVIDER_CATALOG_PATH",
  "OMNIROUTE_PROVIDER_TEST_MODEL",
  "CODEBUDDY_SYSTEM_PROMPT_MAX_LEN",
];
const qualityPath = "open-sse/services/routing/quality.ts";
interface State {
  sources: Record<
    string,
    { source_hash: string; locales: Record<string, { source_hash: string; target_hash: string }> }
  >;
}
const state: State = JSON.parse(read(".i18n-state.json"));
const config: { locales: { code: string }[]; docsExcluded?: string[] } = JSON.parse(
  read("config/i18n.json")
);
const locales = config.locales
  .map((locale) => locale.code)
  .filter((locale) => !(config.docsExcluded ?? ["en"]).includes(locale));

test("published English sources contain CLI and CodeBuddy variables and the cold-start note", () => {
  for (const name of names) assert(read(envDoc).includes(name));
  assert(read(qualityDoc).includes(qualityPath));
});

test("every documentation locale covers the CLI, CodeBuddy and cold-start contracts", () => {
  const missing: string[] = [];
  for (const locale of locales) {
    const env = read(`docs/i18n/${locale}/${envDoc}`);
    for (const name of names) if (!env.includes(name)) missing.push(`${locale}: ${name}`);
    const quality = read(`docs/i18n/${locale}/${qualityDoc}`);
    if (!quality.includes(qualityPath)) missing.push(`${locale}: quality tracker`);
  }
  assert.equal(missing.length, 0, missing.slice(0, 8).join(", "));
});

test("CodeBuddy rows preserve the opt-in cap and replacement provenance in every locale", () => {
  const variable = "`CODEBUDDY_SYSTEM_PROMPT_MAX_LEN`";
  for (const locale of locales) {
    const rows = read(`docs/i18n/${locale}/${envDoc}`)
      .split("\n")
      .filter((line) => line.includes(variable));
    assert.equal(rows.length, 1, `one CodeBuddy row: ${locale}`);
    const row = rows[0];
    assert(row.includes("open-sse/executors/codebuddy/shared.ts"), locale);
    assert(row.includes("∅ (∞)"), `default has no length cap: ${locale}`);
    assert(row.includes("`0`"), `zero disables the cap: ${locale}`);
    assert(row.includes("Tencent"), `identity-filter explanation: ${locale}`);
  }
});

test("the two source-delta mirror records describe the translated bytes", () => {
  // Whether the English source moved on since the translation is the i18n drift gate's call
  // (scripts/i18n/check-translation-drift.mjs — PR-scoped since 2026-10-20); pinning it here
  // turned every inherited drift of ENVIRONMENT.md into a red unit shard on unrelated PRs
  // (release/v3.8.53, translation backend down). What a unit test CAN pin is that each mirror
  // still holds the bytes its record describes — no hand edit, no truncated write.
  for (const relative of [envDoc, qualityDoc]) {
    for (const locale of locales) {
      const record = state.sources[relative].locales[locale];
      assert.equal(
        record.target_hash,
        hash(read(`docs/i18n/${locale}/${relative}`)),
        `${locale}: ${relative} mirror bytes differ from the recorded translation`
      );
    }
  }
});
