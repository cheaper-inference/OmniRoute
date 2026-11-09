import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { IntlMessageFormat } from "intl-messageformat";

/**
 * #16381: `cliTools.piManualConfigSample` is a literal models.json snippet rendered by
 * PiToolCard through next-intl. Raw `{` / `}` in a message are ICU argument syntax, so the
 * unquoted JSON failed to compile (MALFORMED_ARGUMENT) in every catalog and the card would
 * render the error fallback instead of the sample. The value must compile AND render back
 * to the exact JSON the user is told to paste.
 */

const MESSAGES_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../src/i18n/messages"
);

function readSample(file: string): string {
  const catalog = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, file), "utf8"));
  return catalog.cliTools.piManualConfigSample;
}

test("piManualConfigSample compiles under ICU and renders valid models.json in every locale", () => {
  const files = fs.readdirSync(MESSAGES_DIR).filter((file) => file.endsWith(".json"));
  assert.ok(files.length > 1);
  for (const file of files) {
    const locale = file.replace(/\.json$/, "");
    const rendered = new IntlMessageFormat(readSample(file), locale).format() as string;
    const parsed = JSON.parse(rendered);
    assert.equal(parsed.providers.omniroute.baseUrl, "http://127.0.0.1:20128/v1", file);
    assert.equal(parsed.providers.omniroute.api, "openai-completions", file);
  }
});
