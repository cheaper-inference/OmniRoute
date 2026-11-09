// Propagate only the reviewed #16441/#16408 additions. No translation API or
// blanket hash adoption. Default mode is a full, non-mutating preview.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import * as prettier from "prettier";
import { z } from "zod";
import { sectionHashes, splitSections, stripTopHeading } from "../i18n/run-translation.mjs";

const sourceBase = "b0d53251b30b0ad556c3e33bc8c9cc42d84372e9";
const sourceCurrent = "c188c8e68259fdbeb9f7823f2f1c83fb64fac00f";
const root = process.cwd();
const statePath = path.join(root, ".i18n-state.json");
const state = JSON.parse(await fs.readFile(statePath, "utf8"));
const sha = (text) => createHash("sha256").update(text).digest("hex");
const tick = (text) => "`" + text + "`";
const sourceAt = (ref, rel) =>
  execFileSync("git", ["show", `${ref}:${rel}`], { encoding: "utf8", maxBuffer: 4 * 1024 * 1024 });
const rows = [
  [
    "OMNIROUTE_NO_UPDATE_NOTIFIER",
    "∅",
    "bin/omniroute.mjs",
    `${tick('value ≠ "" ⇒ 🔕')}; ${tick("CI")}, ${tick("--quiet / -q")}, ${tick("--output ∈ {json,jsonl,csv} ⇒ 🔕")}`,
  ],
  [
    "OMNIROUTE_DOCTOR_LIVENESS_URL",
    "↳ /api/health/degradation",
    "bin/cli/commands/doctor.mjs",
    `${tick("options.livenessUrl")} → ${tick("process.env.OMNIROUTE_DOCTOR_LIVENESS_URL")} → ${tick("<dashboard>/api/health/degradation")}`,
  ],
  [
    "OMNIROUTE_PROVIDER_CATALOG_PATH",
    "src/shared/constants/providers/",
    "bin/cli/provider-catalog.mjs",
    `${tick("options.catalogPath")} → ${tick("process.env.OMNIROUTE_PROVIDER_CATALOG_PATH")}; ${tick("isAbsolute(configuredPath) ? configuredPath : resolve(rootDir, configuredPath)")}; ${tick("src/shared/constants/providers/ → src/shared/constants/providers.ts")}`,
  ],
  [
    "OMNIROUTE_PROVIDER_TEST_MODEL",
    "config.model",
    "bin/cli/provider-test.mjs",
    `${tick("input.defaultModel")} → ${tick('process.env[providerEnvName(input.provider, "MODEL")]')} → ${tick("process.env.OMNIROUTE_PROVIDER_TEST_MODEL")} → ${tick("config.model")}`,
  ],
];
const originalColdParagraph =
  "The in-memory `quality` tracker (`open-sse/services/routing/quality.ts`) is empty\nafter a cold restart, so every candidate scores a neutral `0.5` until the\nfirst observations land.\n\n";
const technicalColdParagraph =
  "`quality` (`open-sse/services/routing/quality.ts`): `cold restart → ∅`; `observations = 0 → score 0.5`.";
const changes = [];
const localeCode = z.string().regex(/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/);
const now = new Date().toISOString();

for (const rel of ["docs/reference/ENVIRONMENT.md", "docs/routing/AUTO-COMBO.md"]) {
  const previous = sourceAt(sourceBase, rel);
  const current = await fs.readFile(path.join(root, rel), "utf8");
  assert.equal(current, sourceAt(sourceCurrent, rel), "source changed since the reviewed delta");
  if (rel.endsWith("ENVIRONMENT.md")) {
    const lines = current.split("\n");
    for (const [name] of rows)
      assert.equal(lines.filter((line) => line.startsWith(`| \`${name}\``)).length, 1);
    const withoutAdditions = lines
      .filter((line) => !rows.some(([name]) => line.startsWith(`| \`${name}\``)))
      .map((line) => (line === "lastUpdated: 2026-10-11" ? "lastUpdated: 2026-10-05" : line))
      .join("\n");
    assert.equal(withoutAdditions, previous, "refuse unrelated environment source changes");
  } else {
    assert.equal(current.split(originalColdParagraph).length, 2);
    assert.equal(
      current.replace(originalColdParagraph, ""),
      previous,
      "refuse unrelated routing source changes"
    );
  }
  const entry = state.sources[rel];
  assert.equal(entry.source_hash, sha(previous), "unexpected prior source record");
  assert.equal(Object.keys(entry.locales).length, 66);
  const sourceHash = sha(current);
  const hashes = sectionHashes(splitSections(stripTopHeading(current)));
  for (const [locale, info] of Object.entries(entry.locales)) {
    localeCode.parse(locale); // A locale key must never become a path traversal.
    const target = path.join(root, "docs", "i18n", locale, rel);
    const before = await fs.readFile(target, "utf8");
    assert.equal(info.source_hash, sha(previous));
    assert.equal(info.target_hash, sha(before), `unexpected mirror edit: ${rel} [${locale}]`);
    const lines = before.split("\n");
    if (rel.endsWith("ENVIRONMENT.md")) {
      for (const [name] of rows)
        assert(!before.includes(name), `addition already present: ${name} [${locale}]`);
      const anchors = lines.flatMap((line, i) =>
        /^\|\s*`OMNIROUTE_PLUGIN_PATH`\s*\|/.test(line) ? [i] : []
      );
      assert.equal(anchors.length, 1, `ambiguous CLI table: ${locale}`);
      const end = anchors[0];
      let start = end;
      while (start > 0 && lines[start - 1].startsWith("|")) start--;
      const originalTable = lines.slice(start, end + 1);
      const additions = rows.map((row) => "| " + row.map(tick).join(" | ") + " |");
      // Descriptions already contain inline code and mathematical notation.
      for (let i = 0; i < rows.length; i++)
        additions[i] = "| " + rows[i].slice(0, 3).map(tick).join(" | ") + " | " + rows[i][3] + " |";
      const options = { ...(await prettier.resolveConfig(target)), filepath: target };
      const table = (
        await prettier.format([...originalTable, ...additions].join("\n") + "\n", options)
      )
        .trimEnd()
        .split("\n");
      assert.equal(
        table.length,
        originalTable.length + rows.length,
        "unexpected table restructuring"
      );
      lines.splice(start, originalTable.length, ...table);
    } else {
      assert(
        !before.includes("open-sse/services/routing/quality.ts"),
        `cold-start note already present: ${locale}`
      );
      const anchors = lines.flatMap((line, i) =>
        /^\|\s*`quality`\s*\|\s*0\.03\s*\|/.test(line) ? [i] : []
      );
      assert.equal(anchors.length, 1, `ambiguous factor table: ${locale}`);
      let end = anchors[0];
      while (lines[end + 1]?.startsWith("|")) end++;
      lines.splice(end + 1, 0, "", technicalColdParagraph);
    }
    const content = lines.join("\n");
    assert.notEqual(content, before);
    if (["pt-BR", "ja", "ar"].includes(locale)) {
      const options = { ...(await prettier.resolveConfig(target)), filepath: target };
      assert.equal(
        await prettier.format(content, options),
        content,
        `formatting mismatch: ${locale}`
      );
    }
    changes.push({ target, content });
    entry.locales[locale] = {
      ...info,
      source_hash: sourceHash,
      target_hash: sha(content),
      section_hashes: hashes,
      updated_at: now,
    };
  }
  entry.source_hash = sourceHash;
  console.error(`Prepared ${rel}: ${Object.keys(entry.locales).length} verified mirrors`);
}
assert.equal(changes.length, 132);
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
    sourceRecords: 2,
    translationCalls: 0,
  })
);
