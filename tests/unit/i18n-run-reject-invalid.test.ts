import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { translateChunk, validateTranslatedChunk } from "../../scripts/i18n/run-translation.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const RUN_TRANSLATION = path.join(ROOT, "scripts/i18n/run-translation.mjs");

const SOURCE = [
  "## How the catalog stays fresh",
  "",
  "The modelCacheTtlMs setting controls how long a cached catalog stays fresh before the next refresh.",
].join("\n");

const TAMIL = [
  "## பட்டியல் எப்படி புதுப்பிக்கப்படுகிறது",
  "",
  "modelCacheTtlMs அமைப்பு, பட்டியல் அடுத்த புதுப்பிப்பு வரை எவ்வளவு காலம் புதியதாக இருக்கும் என்பதைக் கட்டுப்படுத்துகிறது.",
].join("\n");

const CODE_ONLY = [
  "```bash",
  "npm run gen:provider-reference -- --locale=fr --concurrency=4",
  "npm run gen:provider-reference -- --locale=de --concurrency=4",
  "```",
].join("\n");

const INDENTED_CODE_ONLY = [
  "    npm run gen:provider-reference -- --locale=fr --concurrency=4",
  "    npm run gen:provider-reference -- --locale=de --concurrency=4",
].join("\n");

const INDENTED_CODE_SECTION = [
  "Configure the generation step before you refresh the provider reference catalog.",
  "",
  "    npm run gen:provider-reference -- --locale=fr --concurrency=4",
  "    npm run gen:provider-reference -- --locale=de --concurrency=4",
  "    npm run gen:provider-reference -- --locale=es --concurrency=4",
  "    npm run gen:provider-reference -- --locale=it --concurrency=4",
].join("\n");

const INDENTED_CODE_SECTION_TAMIL = [
  "பட்டியல் குறிப்பு புதுப்பிப்பதற்கு முன் உருவாக்கும் படியை அமைக்கவும்.",
  "",
  "    npm run gen:provider-reference -- --locale=fr --concurrency=4",
  "    npm run gen:provider-reference -- --locale=de --concurrency=4",
  "    npm run gen:provider-reference -- --locale=es --concurrency=4",
  "    npm run gen:provider-reference -- --locale=it --concurrency=4",
].join("\n");

const ONE_PROSE_LINE = [
  "## Setup",
  "",
  "Install the required packages before starting the server.",
].join("\n");

const ONE_PROSE_LINE_TAMIL = [
  "## Setup",
  "",
  "சேவையகத்தைத் தொடங்குவதற்கு முன் தேவையான தொகுப்புகளை நிறுவவும்.",
].join("\n");

test("an unknown option exits with usage before doing any work", () => {
  const result = spawnSync(process.execPath, [RUN_TRANSLATION, "--model=x"], {
    cwd: ROOT,
    encoding: "utf8",
  });
  assert.equal(result.status, 2);
  const output = `${result.stdout}${result.stderr}`;
  assert.match(output, /Usage: node scripts\/i18n\/run-translation\.mjs \[options\]/);
  assert.match(output, /unknown option: --model=x/);
});

test("a verbatim echo of the source is reported as untranslated", () => {
  const { problems } = validateTranslatedChunk(SOURCE, SOURCE);
  assert.ok(problems.some((problem) => /untranslated/.test(problem)));
});

test("an identical code-only section is not reported as untranslated", () => {
  const { problems } = validateTranslatedChunk(CODE_ONLY, CODE_ONLY);
  assert.deepEqual(problems, []);
});

test("a real Tamil translation is not reported as untranslated", () => {
  const { problems } = validateTranslatedChunk(SOURCE, TAMIL);
  assert.deepEqual(problems, []);
});

test("a rejected echo is retried and the corrected translation is returned", async () => {
  let calls = 0;
  const call = async () => (calls++ === 0 ? SOURCE : TAMIL);
  const text = await translateChunk(
    SOURCE,
    "Translate the markdown to Tamil.",
    { model: "test-model" },
    { call }
  );
  assert.ok(calls >= 2);
  assert.equal(text, TAMIL);
});

test("an identical indented code-only section is not reported as untranslated", () => {
  const { problems } = validateTranslatedChunk(INDENTED_CODE_ONLY, INDENTED_CODE_ONLY);
  assert.deepEqual(problems, []);
});

test("a translated section with preserved indented code is not reported as untranslated", () => {
  const { problems } = validateTranslatedChunk(INDENTED_CODE_SECTION, INDENTED_CODE_SECTION_TAMIL);
  assert.deepEqual(problems, []);
});

test("a byte-equal echo with a single prose line is reported as untranslated", () => {
  const { problems } = validateTranslatedChunk(ONE_PROSE_LINE, ONE_PROSE_LINE);
  assert.ok(problems.some((problem) => /untranslated/.test(problem)));
});

test("a real single-prose-line translation is not reported as untranslated", () => {
  const { problems } = validateTranslatedChunk(ONE_PROSE_LINE, ONE_PROSE_LINE_TAMIL);
  assert.deepEqual(problems, []);
});
