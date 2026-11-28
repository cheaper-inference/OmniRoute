import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { keyCreatedNoteKey } from "../../src/app/(dashboard)/dashboard/api-manager/apiManagerPageUtils.js";
import { deepMergeFallback } from "../../src/i18n/request.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const messagesDir = path.join(repoRoot, "src/i18n/messages");
const pagePath = path.join(
  repoRoot,
  "src/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient.tsx"
);

function apiManagerMessages(locale: string): Record<string, string> {
  const file = path.join(messagesDir, `${locale}.json`);
  return JSON.parse(fs.readFileSync(file, "utf8")).apiManager;
}

describe("API key created note follows the reveal setting", () => {
  it("picks the one-time note when reveal is off and the revealable note when it is on", () => {
    assert.equal(keyCreatedNoteKey(false), "keyCreatedNote");
    assert.equal(keyCreatedNoteKey(true), "keyCreatedNoteRevealable");
  });

  it("the revealable English note does not say the key is never shown again", () => {
    const en = apiManagerMessages("en");
    assert.match(en.keyCreatedNote, /won't be shown again/);
    assert.ok(en.keyCreatedNoteRevealable, "keyCreatedNoteRevealable is missing in en");
    assert.doesNotMatch(en.keyCreatedNoteRevealable, /shown again|never|not be shown/i);
    assert.match(en.keyCreatedNoteRevealable, /later/i);
  });

  // New UI keys go to en.json only (#20177); the translation wave fills the other catalogs and the
  // dashboard falls back to English until then. What every locale must do is resolve the key.
  it("every locale resolves the revealable note key, through the English fallback if needed", () => {
    const en = apiManagerMessages("en");
    const unresolved = fs
      .readdirSync(messagesDir)
      .filter((name) => name.endsWith(".json"))
      .map((name) => name.replace(/\.json$/, ""))
      .filter((locale) => {
        const merged = deepMergeFallback({ ...apiManagerMessages(locale) }, en);
        return !merged.keyCreatedNoteRevealable;
      });
    assert.deepEqual(unresolved, []);
  });

  it("the created-key modal asks the helper with the allowKeyReveal state", () => {
    const source = fs.readFileSync(pagePath, "utf8");
    assert.match(source, /description=\{t\(keyCreatedNoteKey\(allowKeyReveal\)\)\}/);
    assert.doesNotMatch(source, /description=\{t\("keyCreatedNote"\)\}/);
  });
});
