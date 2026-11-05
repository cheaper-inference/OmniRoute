import assert from "node:assert/strict";
import test from "node:test";

import { looksUntranslated } from "../../scripts/i18n/lib/untranslated-guard.mjs";

// Eight long command/JSON lines plus two translated prose lines reproduce the old inclusive
// 8/10 threshold false positive from BRANCH_PROTECTION_MAIN.md|bs.
const SOURCE_WITH_PROTECTED_COMMAND = [
  "Owner action. Apply via Settings, then add the branch protection rule:",
  "",
  "```bash",
  "gh api -X PUT repos/diegosouzapw/OmniRoute/branches/main/protection \\",
  '{ "required_status_checks": { "strict": true, "contexts": ["Quality Ratchet"] },',
  '  "enforce_admins": false,',
  '  "required_pull_request_reviews": { "required_approving_review_count": 0 },',
  '  "restrictions": null,',
  '  "required_linear_history": false,',
  '  "allow_force_pushes": false,',
  '  "allow_deletions": false }',
  "```",
  "",
  "Tighten administrator enforcement after the forward-merge flow is stable.",
].join("\n");

const BOSNIAN_WITH_PROTECTED_COMMAND = SOURCE_WITH_PROTECTED_COMMAND.replace(
  "Owner action. Apply via Settings, then add the branch protection rule:",
  "Radnja vlasnika. Primijenite pravilo zaštite grane putem postavki:"
).replace(
  "Tighten administrator enforcement after the forward-merge flow is stable.",
  "Pooštrite provedbu za administratore kada tok spajanja postane stabilan."
);

test("translated prose is not rejected when a fenced command remains byte-identical", () => {
  assert.equal(
    looksUntranslated(BOSNIAN_WITH_PROTECTED_COMMAND, SOURCE_WITH_PROTECTED_COMMAND),
    false
  );
});

test("an identical fenced-code-only fragment is not treated as untranslated prose", () => {
  const codeOnly = "```bash\ngh api repos/example/project/branches/main/protection\n```";

  assert.equal(looksUntranslated(codeOnly, codeOnly), false);
});

test("short prose copies are still detected after fenced code is excluded", () => {
  assert.equal(looksUntranslated("Apply this rule.", "Apply this rule."), true);
  assert.equal(looksUntranslated("Primijeni ovo pravilo.", "Apply this rule."), false);
});

test("inline code remains part of prose copy detection", () => {
  const source = "Keep `enforce_admins:false` until the forward-merge flow is stable.";

  assert.equal(looksUntranslated(source, source), true);
  assert.equal(
    looksUntranslated(
      "Zadržite `enforce_admins:false` dok tok spajanja ne postane stabilan.",
      source
    ),
    false
  );
});

test("Markdown tables remain part of prose copy detection", () => {
  const source = [
    "| Action | Meaning |",
    "| --- | --- |",
    "| Apply protection | Keep main safe |",
  ].join("\n");
  const translated = [
    "| Radnja | Značenje |",
    "| --- | --- |",
    "| Primijeni zaštitu | Sačuvaj main |",
  ].join("\n");

  assert.equal(looksUntranslated(source, source), true);
  assert.equal(looksUntranslated(translated, source), false);
});

test("the existing 80 percent threshold still rejects mostly-English prose", () => {
  const source = [
    "English sentence number one remains copied.",
    "English sentence number two remains copied.",
    "English sentence number three remains copied.",
    "English sentence number four remains copied.",
    "English sentence number five remains copied.",
  ];
  const mirror = [...source.slice(0, 4), "Peta rečenica je prevedena i dovoljno dugačka."];

  assert.equal(looksUntranslated(mirror.join("\n"), source.join("\n")), true);
});

for (const [name, code] of [
  ["backtick fence", "```md\nEnglish code content\n```"],
  ["tilde fence", "~~~md\nEnglish code content\n~~~"],
  ["longer closing fence", "```md\nEnglish code content\n`````"],
  ["shorter nested fence", "````md\n```\nEnglish code content\n````"],
  ["different nested delimiter", "```md\n~~~\nEnglish code content\n```"],
  ["closing delimiter with an info string", "~~~md\n~~~still-code\nEnglish code content\n~~~"],
  ["indented fence", "   ~~~~md\n   ~~~\nEnglish code content\n   ~~~~"],
  ["unclosed fence", "~~~md\nEnglish code content"],
]) {
  test(`identical code inside a ${name} is ignored`, () => {
    assert.equal(looksUntranslated(code, code), false);
  });
}

test("copy detection resumes after a matching fence closes", () => {
  const source = "~~~~md\nEnglish code content\n~~~~~\n\nApply branch protection now.";

  assert.equal(looksUntranslated(source, source), true);
});
