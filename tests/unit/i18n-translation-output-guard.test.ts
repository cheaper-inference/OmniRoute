import test from "node:test";
import assert from "node:assert/strict";
import { validateTranslatedChunk } from "../../scripts/i18n/run-translation.mjs";

const SOURCE = [
  "## Web Cookie Providers (2)",
  "",
  "| ID    | Name  | Notes            |",
  "| ----- | ----- | ---------------- |",
  "| `a`   | A     | Paste the cookie |",
  "| `b`   | B     | Paste the token  |",
  "",
  "```bash",
  "npm run gen:provider-reference",
  "```",
].join("\n");

const GOOD = [
  "## Web-cookie-udbydere (2)",
  "",
  "| ID    | Navn  | Noter             |",
  "| ----- | ----- | ----------------- |",
  "| `a`   | A     | Indsæt cookien    |",
  "| `b`   | B     | Indsæt tokenet    |",
  "",
  "```bash",
  "npm run gen:provider-reference",
  "```",
].join("\n");

test("a faithful translation passes unchanged", () => {
  const r = validateTranslatedChunk(SOURCE, GOOD);
  assert.deepEqual(r.problems, []);
  assert.equal(r.text, GOOD);
});

test("rejects an extra translated H1 in the chunk body", () => {
  const output = "# Referenca za Quality Gates\n\n" + GOOD;
  const result = validateTranslatedChunk(SOURCE, output);
  assert.ok(result.problems.some((problem) => problem.startsWith("heading levels")));
  assert.equal(result.text, output, "a structural failure must not silently rewrite the body");
});

test("preserves indented code at the start of a translated chunk", () => {
  const source = "    # Example comment\n    npm ci";
  const output = "    ### Comentário traduzido\n    npm ci";
  assert.deepEqual(validateTranslatedChunk(source, output), { text: output, problems: [] });
});

const HEADING_SOURCE = "## Setup\n\n### Install\n\n## Verify";
for (const [name, output] of [
  ["missing heading", "## Configurar\n\nInstalar\n\n## Verificar"],
  ["changed heading level", "## Configurar\n\n# Instalar\n\n## Verificar"],
  ["reordered heading levels", "### Instalar\n\n## Configurar\n\n## Verificar"],
]) {
  test(`rejects ${name} even when no code or table is lost`, () => {
    assert.ok(
      validateTranslatedChunk(HEADING_SOURCE, output).problems.some((problem) =>
        problem.startsWith("heading levels")
      )
    );
  });
}

test("accepts translated titles at all six levels with valid ATX spacing", () => {
  const source = "# One\n\n## Two\n\n### Three\n\n#### Four\n\n##### Five\n\n###### Six";
  const output = " # Um\n\n  ## Dois ##\n\n   ### Três\n\n####\tQuatro\n\n#####\n\n###### Seis";
  assert.deepEqual(validateTranslatedChunk(source, output), { text: output, problems: [] });
});

test("ignores inline examples, escaped hashes and indented code as headings", () => {
  const source = [
    "## Examples",
    "",
    "Keep `# example` and ``## example``.",
    "",
    "\\# Escaped example",
    "",
    "    ### Indented example",
    "\t#### Tab-indented example",
    "",
    "####### Seven hashes are text",
    "#NoSpace",
  ].join("\n");
  const output = [
    "## Exemplos",
    "",
    "Mantenha `# example` e ``## example``.",
    "",
    "\\### Exemplo escapado",
    "",
    "    # Exemplo indentado",
    "\t## Exemplo indentado com tab",
    "",
    "####### Sete hashes são texto",
    "#SemEspaço",
  ].join("\n");
  assert.deepEqual(validateTranslatedChunk(source, output), { text: output, problems: [] });
});

for (const [name, code] of [
  ["backtick fence", "```md\n# Example\n```"],
  ["tilde fence", "~~~md\n# Example\n~~~"],
  ["longer closing fence", "```md\n# Example\n`````"],
  ["shorter nested fence", "````md\n```\n# Example\n````"],
  ["different nested delimiter", "```md\n~~~\n# Example\n```"],
  ["closing delimiter with an info string", "~~~md\n~~~still-code\n# Example\n~~~"],
  ["indented fence", "   ~~~~md\n   ~~~\n# Example\n   ~~~~"],
  ["unclosed fence", "~~~md\n# Example"],
]) {
  test(`ignores heading-shaped code inside a ${name}`, () => {
    const source = "## Examples\n\n" + code;
    const output = "## Exemplos\n\n" + code.replace("# Example", "### Exemplo\n# Outro exemplo");
    assert.deepEqual(validateTranslatedChunk(source, output), { text: output, problems: [] });
    const extra = "# Título extra\n\n" + output;
    assert.ok(
      validateTranslatedChunk(source, extra).problems.some((problem) =>
        problem.startsWith("heading levels")
      )
    );
  });
}

test("detects a real heading after a matching fence closes", () => {
  const source = "## Examples\n\n~~~~md\n# Example\n~~~~~\n\n### Continue";
  const output = "## Exemplos\n\n~~~~md\n# Example\n~~~~~\n\n#### Continuar";
  assert.ok(
    validateTranslatedChunk(source, output).problems.some((problem) =>
      problem.startsWith("heading levels")
    )
  );
});

test("preserves initial code indentation inside a wrapping translation fence", () => {
  const source = "    # Example\n    npm ci";
  const output = "    ### Exemplo\n    npm ci";
  assert.deepEqual(validateTranslatedChunk(source, "```markdown\n" + output + "\n```"), {
    text: output,
    problems: [],
  });
});

test("stripping leaked reasoning preserves the following indented code", () => {
  const source = "    # Example\n    npm ci";
  const output = "    ### Exemplo\n    npm ci";
  for (const prefix of ["", "## Examples\n\n"]) {
    const translatedPrefix = prefix.replace("Examples", "Exemplos");
    const result = validateTranslatedChunk(
      prefix + source,
      translatedPrefix + "<think>Private reasoning</think>\n\n" + output
    );
    assert.deepEqual(result, { text: translatedPrefix + output, problems: [] });
  }
});

test("strips a leaked <think> block (refresh-5: 41 mirrors shipped one)", () => {
  const leaked = [
    "<think>",
    "Right, so I've been tasked with translating a Markdown table. I'll keep the header.",
    "</think>",
    "",
    GOOD,
  ].join("\n");
  const r = validateTranslatedChunk(SOURCE, leaked);
  assert.deepEqual(r.problems, []);
  assert.equal(r.text, GOOD);
});

test("strips a <think> block leaked in the middle of the chunk", () => {
  const lines = GOOD.split("\n");
  const leaked = [
    ...lines.slice(0, 4),
    "",
    "<think>",
    "My plan became clear: translate the third column only.",
    "</think>",
    "",
    ...lines.slice(4),
  ].join("\n");
  const r = validateTranslatedChunk(SOURCE, leaked);
  assert.deepEqual(r.problems, []);
  assert.ok(!r.text.includes("think>"));
  assert.ok(!r.text.includes("My plan"));
});

test("unwraps a ```markdown fence around the whole answer", () => {
  const r = validateTranslatedChunk(SOURCE, "```markdown\n" + GOOD + "\n```");
  assert.deepEqual(r.problems, []);
  assert.equal(r.text, GOOD);
});

test("rejects dropped table rows (refresh-5: es PROVIDER_REFERENCE lost 23 rows)", () => {
  const dropped = GOOD.split("\n")
    .filter((l) => !l.startsWith("| `b`"))
    .join("\n");
  const r = validateTranslatedChunk(SOURCE, dropped);
  // The dropped row also takes its inline code with it, so both guards fire.
  assert.deepEqual(r.problems, ["table rows 3/4", "inline code changed: `b`"]);
});

test("rejects a changed code-fence count", () => {
  const r = validateTranslatedChunk(SOURCE, GOOD + "\n```\nstray\n```");
  assert.ok(r.problems.some((p) => /code fences 4\/2/.test(p)));
});

test("rejects an unterminated <think> block", () => {
  const r = validateTranslatedChunk(SOURCE, "<think>\nI need to translate this.\n" + GOOD);
  assert.ok(r.problems.some((p) => /think/.test(p)));
});

test("rejects English meta-prose that the source does not contain", () => {
  const leaked = "Okay, I need to translate the table below.\n\n" + GOOD;
  const r = validateTranslatedChunk(SOURCE, leaked);
  assert.ok(r.problems.some((p) => /meta-prose/.test(p)));
});

test("meta phrases already present in the source are not flagged", () => {
  const src = "I'll show the steps below.\n\n" + SOURCE;
  const out = "I'll show the steps below.\n\n" + GOOD;
  assert.deepEqual(validateTranslatedChunk(src, out).problems, []);
});

test("preserves a source-owned inline think-tag example", () => {
  const source = "Keep the example `<think>...</think>` in the documentation.";
  const output = "Mantenha o exemplo `<think>...</think>` na documentação.";
  const result = validateTranslatedChunk(source, output);
  assert.deepEqual(result.problems, []);
  assert.equal(result.text, output);
});

test("preserves fenced examples while allowing prose comments to be translated", () => {
  const source = "Example:\n\n```xml\n<!-- Keep the tags -->\n<think>...</think>\n```";
  const output = "Exemplo:\n\n```xml\n<!-- Mantenha as tags -->\n<think>...</think>\n```";
  const result = validateTranslatedChunk(source, output);
  assert.deepEqual(result.problems, []);
  assert.equal(result.text, output);
});

test("strips added reasoning without deleting the legitimate example", () => {
  const source = "Example: `<think>...</think>`.";
  const output = "Exemplo: `<think>...</think>`.";
  const result = validateTranslatedChunk(source, "<think>Private reasoning</think>\n" + output);
  assert.deepEqual(result.problems, []);
  assert.equal(result.text, output);
});

test("rejects missing, altered and duplicated source examples", () => {
  const source = "Example: `<think>...</think>`.";
  for (const output of [
    "Exemplo: ``.",
    "Exemplo: `<think>Private reasoning</think>`.",
    "Exemplo: `<think>...</think>` e `<think>...</think>`.",
    "Exemplo: <think>...</think>.",
  ]) {
    assert.ok(validateTranslatedChunk(source, output).problems.length > 0, output);
  }
});

test("preserves separately quoted opening and closing tags without allowing an added block", () => {
  const source = "Tags: `<think>` and `</think>`.";
  const output = "Tags: `<think>` e `</think>`.";
  assert.deepEqual(validateTranslatedChunk(source, output), { text: output, problems: [] });
  const leaked = output + "\n`<think>Private reasoning</think>`";
  assert.ok(validateTranslatedChunk(source, leaked).problems.length > 0);
});

test("rejects incomplete reasoning even when a valid example is present", () => {
  const source = "Example: `<think>...</think>`.";
  const result = validateTranslatedChunk(source, source + "\n<think>Private reasoning");
  assert.ok(result.problems.some((problem) => /leaked <think>/.test(problem)));
});

test("rejects a leaked outer block that consumes a source-owned example", () => {
  const source = "Example: `<think>...</think>`.";
  const result = validateTranslatedChunk(source, "<think>Private reasoning " + source + "</think>");
  assert.ok(result.problems.some((problem) => /missing source/.test(problem)));
});

test("a wrapping markdown fence does not grant permission for a bare think block", () => {
  const source = "Example: `<think>...</think>`.";
  const valid = validateTranslatedChunk(source, "```markdown\n" + source + "\n```");
  assert.deepEqual(valid, { text: source, problems: [] });
  const invalid = validateTranslatedChunk(source, "```markdown\n<think>...</think>\n```");
  assert.ok(invalid.problems.length > 0);
});

test("handles marker-shaped source text without substitution collisions", () => {
  const source = "\0omniroute-think-literal:0\0 Example: `<think>...</think>`.";
  assert.deepEqual(validateTranslatedChunk(source, source), { text: source, problems: [] });
});

test("preserves an example inside a tilde fence", () => {
  const source = "Example:\n\n~~~xml\n<think>...</think>\n~~~";
  assert.deepEqual(validateTranslatedChunk(source, source), { text: source, problems: [] });
});

test("preserves an example in a fence closed by a longer delimiter", () => {
  const source = "Example:\n\n```xml\n<think>...</think>\n````";
  assert.deepEqual(validateTranslatedChunk(source, source), { text: source, problems: [] });
});

test("unwraps separately quoted tags, with or without a preceding reasoning block", () => {
  const source = "Tags: `<think>` and `</think>`.";
  const output = "Tags: `<think>` e `</think>`.";
  for (const prefix of ["", "<think>Private reasoning</think>\n"]) {
    const result = validateTranslatedChunk(source, prefix + "```markdown\n" + output + "\n```");
    assert.deepEqual(result, { text: output, problems: [] });
  }
});

test("unequal inline-code delimiters cannot authorize an incomplete think tag", () => {
  const source = "Opening tag: `<think>`.";
  const output = "Abertura: `<think>``\nPrivate reasoning.";
  const result = validateTranslatedChunk(source, output);
  assert.ok(result.problems.length > 0);
});

test("restores dollar replacement syntax as literal bytes", () => {
  const source = "Example:\n\n```xml\n<think>$& $$ $` $'</think>\n```";
  assert.deepEqual(validateTranslatedChunk(source, source), { text: source, problems: [] });
});

test("respects even and odd backslash prefixes before inline-code delimiters", () => {
  const example = "`<think>...</think>`";
  for (const count of [2, 4]) {
    const source = "Example: " + String.fromCharCode(92).repeat(count) + example;
    assert.deepEqual(validateTranslatedChunk(source, source), { text: source, problems: [] });
  }
  for (const count of [1, 3]) {
    const source = "Example: " + example;
    const output = "Exemplo: " + String.fromCharCode(92).repeat(count) + example;
    assert.ok(validateTranslatedChunk(source, output).problems.length > 0);
  }
});

test("separate paragraphs cannot authorize an incomplete think tag as inline code", () => {
  const source = "Opening tag: `<think>`.";
  for (const newline of ["\n", "\r\n"]) {
    for (const output of [
      "Abertura: `<think>" + newline + newline + "Private reasoning." + newline + "`",
      "Abertura: `" + newline + "  " + newline + "<think>" + newline + newline + "`",
    ]) {
      assert.ok(validateTranslatedChunk(source, output).problems.length > 0, output);
    }
  }
});

test("preserves a multiline inline example within one paragraph", () => {
  const source = "Example: `<think>\n...\n</think>`.";
  assert.deepEqual(validateTranslatedChunk(source, source), { text: source, problems: [] });
});

// Inline code is a literal (2026-10-18/19 resync, #17117 / #17122): in every pass some locales
// translated the text between backticks — the runner's own error message, `MemoryHigh=4G`,
// `[Free]`, `// evidence:` — or broke a backtick so every later span on the line paired wrong.
// The hash-based drift check cannot see either, so the chunk guard compares the spans.
const SPAN_SOURCE = [
  "| CPU | load 60 | starved the listeners' heartbeats (`The self-hosted runner lost communication`, #16853) |",
  "",
  "Gemini rejects tool declarations that contain `$schema` or",
  "`additionalProperties`, answering `400 INVALID_ARGUMENT`.",
].join("\n");

test("rejects a translated inline code span (the runner error literal)", () => {
  const out = [
    "| CPU | carga 60 | travou os heartbeats (`O runner self-hosted perdeu a comunicação`, #16853) |",
    "",
    "O Gemini rejeita declarações que contêm `$schema` ou",
    "`additionalProperties`, respondendo `400 INVALID_ARGUMENT`.",
  ].join("\n");
  const r = validateTranslatedChunk(SPAN_SOURCE, out);
  assert.equal(r.problems.length, 1, r.problems.join("; "));
  assert.match(r.problems[0], /inline code changed: `The self-hosted runner lost communication`/);
});

test("rejects a dropped backtick that re-pairs the following spans (hy mirror)", () => {
  const out = [
    "| CPU | 60 | (`The self-hosted runner lost communication`, #16853) |",
    "",
    "Gemini-ն մերժում է, եթե պարունակում են `$schema` կամ",
    "`additionalProperties՝ պատասխանելով `400 INVALID_ARGUMENT`։",
  ].join("\n");
  const r = validateTranslatedChunk(SPAN_SOURCE, out);
  assert.equal(r.problems.length, 1, r.problems.join("; "));
  assert.match(r.problems[0], /inline code changed: .*`additionalProperties`/);
});

test("accepts a span that wraps across a line break and spans the translator added", () => {
  const out = [
    "| CPU | 60 | heartbeats (`The self-hosted runner lost",
    "communication`, #16853) |",
    "",
    "O Gemini rejeita `tool declarations` com `$schema` ou `additionalProperties`,",
    "respondendo `400 INVALID_ARGUMENT`.",
  ].join("\n");
  // The wrapped row is no longer a table row, so compare spans only.
  assert.ok(
    !validateTranslatedChunk(SPAN_SOURCE, out).problems.some((p) => p.startsWith("inline code")),
    "a span split by a soft line break is the same span; an added span is not a loss"
  );
});

test("inline code inside fenced blocks is not compared (prose comments may be translated)", () => {
  const source = ["```bash", "# `npm ci` first", "npm ci", "```", "Run `npm ci`."].join("\n");
  const out = ["```bash", "# primeiro `npm ci` antes", "npm ci", "```", "Rode `npm ci`."].join(
    "\n"
  );
  assert.deepEqual(validateTranslatedChunk(source, out).problems, []);
});
