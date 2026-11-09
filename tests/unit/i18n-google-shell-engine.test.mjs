import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { translationEngine } from "../../scripts/i18n/lib/translate-backend.mjs";

// Execute only the public, side-effect-free required-variable decision. The actual shell
// entrypoint loads environment files and starts workers, so it is never sourced or executed.
const source = readFileSync(
  new URL("../../scripts/i18n/translate-new-keys.sh", import.meta.url),
  "utf8"
);
const start = source.indexOf("REQUIRED_VARS=");
const end = source.indexOf("OPTIONAL_VARS=", start);
assert.ok(start >= 0 && end > start);
const decision = source.slice(start, end);
assert.doesNotMatch(decision, /load_translation_env|\.env|sync-ui|\bnode\b/);
for (const value of ["google", "GOOGLE", "  Google \t", "llm", "goog le", ""]) {
  test(`shell and public backend select the same engine for ${JSON.stringify(value)}`, () => {
    const result = spawnSync("/bin/bash", ["--noprofile", "--norc", "-s"], {
      input: `${decision}\nprintf '%s' "$REQUIRED_VARS"\n`,
      encoding: "utf8",
      timeout: 2000,
      env: { PATH: "/usr/bin:/bin", LC_ALL: "C", OMNIROUTE_TRANSLATION_ENGINE: value },
    });
    assert.equal(result.status, 0, result.stderr);
    const engine = translationEngine({ OMNIROUTE_TRANSLATION_ENGINE: value });
    assert.equal(result.stdout === "", engine === "google");
    if (engine !== "google") {
      assert.equal(
        result.stdout,
        "OMNIROUTE_TRANSLATION_API_URL OMNIROUTE_TRANSLATION_API_KEY OMNIROUTE_TRANSLATION_MODEL"
      );
    }
  });
}
