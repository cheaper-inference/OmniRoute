/**
 * The "translation" family of check:pr-derived-paths (config/quality/derived-paths/translation.json):
 * a feature PR edits the English sources only; locale catalogs, docs/i18n mirrors, the hash ledger
 * and the real-translation ratchet are written by the release refresh, translation waves and the
 * scheduled mirror refresh. Pins the categories, writers and companions against real paths.
 */

import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { evaluateDerivedPaths, loadFamilies } from "../../scripts/check/check-pr-derived-paths.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const families = loadFamilies(REPO);
const verdict = (files: string[], branch: string) => {
  const res = evaluateDerivedPaths({ files, branch, families });
  return {
    violations: res.violations.filter((v) => v.family === "translation").map((v) => v.category),
    allowed: res.allowed.filter((a) => a.family === "translation").map((a) => a.reason),
  };
};

test("the translation family is declared once and loads", () => {
  const family = families.filter((f) => f.family === "translation");
  assert.equal(family.length, 1);
  assert.deepEqual(
    family[0].categories.map((c) => c.id),
    [
      "ui-locale-catalogs",
      "cli-locale-catalogs",
      "docs-i18n-mirrors",
      "ui-translation-ratio-baseline",
    ]
  );
  for (const cat of family[0].categories) {
    assert.ok(cat.why.length > 20, `${cat.id}: why`);
    assert.ok(cat.refreshedBy.length > 20, `${cat.id}: refreshedBy`);
  }
});

test("a feature PR may edit the English catalogs and regenerate the compact error catalogs", () => {
  assert.deepEqual(
    verdict(
      [
        "src/app/(dashboard)/x/page.tsx",
        "src/i18n/messages/en.json",
        "bin/cli/locales/en.json",
        "src/i18n/global-error-messages/en.json",
        "docs/guides/I18N.md",
      ],
      "feat/x"
    ),
    { violations: [], allowed: [] }
  );
});

test("a feature PR that carries other locales, mirrors or the ratio baseline fails per category", () => {
  assert.deepEqual(
    verdict(
      [
        "src/app/x.tsx",
        "src/i18n/messages/en.json",
        "src/i18n/messages/pt-BR.json",
        "bin/cli/locales/zh-CN.json",
        "docs/i18n/es/docs/guides/I18N.md",
        ".i18n-state.json",
        "config/quality/i18n-translation-baseline.json",
      ],
      "feat/x"
    ).violations,
    [
      "ui-locale-catalogs",
      "cli-locale-catalogs",
      "docs-i18n-mirrors",
      "ui-translation-ratio-baseline",
    ]
  );
});

test("a translation-only PR (with its compact catalogs and a changelog fragment) is allowed", () => {
  assert.deepEqual(
    verdict(
      [
        "src/i18n/messages/ko.json",
        "src/i18n/global-error-messages/ko.json",
        "changelog.d/fixes/0000-ko-copy.md",
      ],
      "fix/ko-copy"
    ),
    { violations: [], allowed: ["family-only"] }
  );
});

test("the writer branches of the release, the waves and the mirror refresh are allowed", () => {
  for (const branch of [
    "release/v3.8.55",
    "docs/i18n-wave-1113",
    "docs/i18n-environment-split",
    "chore/i18n-mirror-refresh",
    "chore/derived-refresh",
  ]) {
    assert.deepEqual(
      verdict(["src/i18n/messages/pt-BR.json", "scripts/i18n/run-translation.mjs"], branch),
      { violations: [], allowed: ["writer"] },
      branch
    );
  }
});
