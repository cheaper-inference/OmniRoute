import assert from "node:assert/strict";
import test from "node:test";

import { runEnvDocSync } from "../../../scripts/check/check-env-doc-sync.mjs";

const header = "| Variable | Default | Description |\n| --- | --- | --- |";
const row = "| `EXAMPLE_KEY` | _(unset)_ | Required for this example. |";

function check(envDocText) {
  return runEnvDocSync({
    envExampleText: "EXAMPLE_KEY=fixture\n",
    envDocText,
    codeVars: new Set(["EXAMPLE_KEY"]),
    ignore: new Set(),
    docOnlyAllowlist: new Set(),
    envOnlyAllowlist: new Set(),
  });
}

function expectDuplicate(text) {
  const result = check(text);
  assert.equal(result.ok, false);
  assert.equal(result.problems.duplicateDocDefinitions.length, 1);
  const finding = result.problems.duplicateDocDefinitions[0];
  assert.equal(finding.variable, "EXAMPLE_KEY");
  assert.equal(finding.lines.length, 2);
  assert.ok(finding.lines[0] < finding.lines[1]);
  assert.ok(finding.section);
  assert.deepEqual(result.problems.codeMissingEnv, []);
  assert.deepEqual(result.problems.envMissingDoc, []);
  assert.deepEqual(result.problems.docMissingEnv, []);
}

function expectValid(text) {
  const result = check(text);
  assert.equal(result.ok, true);
  assert.deepEqual(result.problems.duplicateDocDefinitions ?? [], []);
}

test("conflicting defaults in the same section fail the environment contract", () => {
  expectDuplicate(`# Reference\n${header}\n${row}\n| \`EXAMPLE_KEY\` | enabled | Optional. |`);
});

test("identical repeated declarations fail even when variable sets match", () => {
  expectDuplicate(`# Reference\n${header}\n${row}\n${row}`);
});

test("a second table under the same heading cannot repeat a declaration", () => {
  expectDuplicate(`# Reference\n${header}\n${row}\n\n${header}\n${row}`);
});

test("tables without optional outer borders also reject repeated declarations", () => {
  const unbordered = "`EXAMPLE_KEY` | unset | Example.";
  expectDuplicate(
    `# Reference\nVariable | Default | Description\n--- | --- | ---\n${unbordered}\n${unbordered}`
  );
});

test("prose references to a documented variable do not create extra declarations", () => {
  expectValid(
    `# Reference\n${header}\n${row}\nSet \`EXAMPLE_KEY\` explicitly.\nInspect \`EXAMPLE_KEY\` in settings.`
  );
});

test("different sections may document the same variable in different contexts", () => {
  expectValid(`# Reference\n## Server\n${header}\n${row}\n## CLI\n${header}\n${row}`);
});

test("identical child heading names under different parents stay separate", () => {
  expectValid(
    `# Reference\n## Server\n### Defaults\n${header}\n${row}\n## CLI\n### Defaults\n${header}\n${row}`
  );
});

test("backtick-fenced examples and their headings do not declare variables", () => {
  expectValid(
    `# Reference\n${header}\n${row}\n\n\`\`\`md\n# Example\n${header}\n${row}\n${row}\n\`\`\``
  );
});

test("a shorter tilde marker does not close an example fence", () => {
  expectValid(`# Reference\n${header}\n${row}\n\n~~~~md\n${header}\n${row}\n~~~\n${row}\n~~~~`);
});

test("four-space-indented code examples do not declare variables", () => {
  expectValid(`# Reference\n${header}\n${row}\n\n    ${row}\n    ${row}`);
});
