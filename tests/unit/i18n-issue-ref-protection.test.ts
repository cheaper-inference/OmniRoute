import test from "node:test";
import assert from "node:assert/strict";

const google = await import("../../scripts/i18n/lib/google-translate.mjs");
const runner = await import("../../scripts/i18n/run-translation.mjs");

// Refresh PR #18795: the Google engine rewrote `#15281` as `# 15281` inside the `check:cycles`
// row of QUALITY_GATES.md (fa, fr, it, or, pt-BR, ru), breaking the mirror contract test, and in
// `or` it turned each sentence-ending danda into an ASCII pipe that shipped as `\|`.
const ROW =
  "| `check:cycles` | Bare exits 1 whenever any cycle exists (fail-closed since #15281) and lists the SCCs. CI blocks above the ceiling (#15159 G-01/G-02) | Yes (ratchet) |";
const TABLE = ["| Gate | What | Blocking |", "| ---- | ---- | -------- |", ROW].join("\n");

// No network: a fake of the keyless endpoint. It upper-cases prose and, like the real one did on
// #18795, puts a space after a `#` that precedes a digit in any text it can still see.
function fakeGoogle(edit: (html: string) => string = (h) => h) {
  const fetchImpl = async (_url: string, init: { body: string }) => ({
    ok: true,
    status: 200,
    json: async () =>
      new URLSearchParams(init.body).getAll("q").map((html) => {
        const parts = html.split(/(<[^>]+>)/);
        const text = parts
          .map((p) => (p.startsWith("<") || /^zq[a-z]+$/.test(p) ? p : p.toUpperCase()))
          .join("")
          .replace(/#(\d)/g, "# $1");
        return edit(text);
      }),
  });
  return fetchImpl;
}

test("maskInline masks issue references but not HTML entities or URL fragments", () => {
  const { tokens } = google.maskInline(
    "Since #15281 (see #9). a&#38;b and https://example.dev/page#12 stay; C#7 is a word."
  );
  assert.deepEqual(
    tokens.map((t: { raw: string }) => t.raw),
    ["#15281", "#9", "&#38;", "https://example.dev/page#12"]
  );
});

test("google engine keeps `#15281` verbatim in a table row and the chunk validates", async () => {
  const out = await google.translateMarkdownWithGoogle(TABLE, "fr", {
    fetchImpl: fakeGoogle(),
    backoffMs: 1,
  });
  const row = out.split("\n")[2];
  assert.ok(row.includes("#15281"), row);
  assert.ok(row.includes("#15159"), row);
  assert.ok(!/# \d/.test(row), row);
  assert.deepEqual(runner.validateTranslatedChunk(TABLE, out).problems, []);
});

test("google engine maps an Odia danda the translator wrote as a pipe back to ।", async () => {
  // the real endpoint answered `or` with ASCII `|` where a sentence ends
  const out = await google.translateMarkdownWithGoogle(TABLE, "or", {
    fetchImpl: fakeGoogle((t) => t.replace(/\.(?=\s|$)/g, " |")),
    backoffMs: 1,
  });
  const row = out.split("\n")[2];
  assert.ok(!row.includes("\\|"), row);
  assert.ok(row.includes("।"), row);
  assert.deepEqual(runner.validateTranslatedChunk(TABLE, out).problems, []);

  // other locales keep the existing behavior: a translator pipe is escaped, never a new cell
  const fr = await google.translateMarkdownWithGoogle(TABLE, "fr", {
    fetchImpl: fakeGoogle((t) => t.replace(/\.(?=\s|$)/g, " |")),
    backoffMs: 1,
  });
  assert.ok(fr.split("\n")[2].includes("\\|"));
});

test("validateTranslatedChunk rejects a chunk whose issue references changed", () => {
  const source = "Fail-closed since #15281; see #15159 and #15159 again.";
  const ok = runner.validateTranslatedChunk(
    source,
    "Voir #15159 et encore #15159 ; fail-closed depuis #15281."
  );
  assert.deepEqual(ok.problems, [], "order may change, the multiset may not");

  const spaced = runner.validateTranslatedChunk(
    source,
    "Fail-closed depuis # 15281 ; voir #15159 et #15159."
  );
  assert.ok(
    spaced.problems.some((p: string) => /issue refs/.test(p) && p.includes("#15281")),
    spaced.problems.join("; ")
  );

  const dropped = runner.validateTranslatedChunk(
    source,
    "Fail-closed depuis #15281 ; voir #15159."
  );
  assert.ok(dropped.problems.some((p: string) => /issue refs/.test(p)));

  const invented = runner.validateTranslatedChunk(
    source,
    "Fail-closed depuis #15281 ; voir #15159, #15159 et #1."
  );
  assert.ok(invented.problems.some((p: string) => /issue refs/.test(p)));

  // an HTML entity is not an issue reference
  assert.deepEqual(
    runner.validateTranslatedChunk("AT&#38;T works.", "AT&#38;T fonctionne.").problems,
    []
  );
});

test("validateTranslatedChunk rejects a table row whose cell count or escaped pipes changed", () => {
  // same number of rows, one extra cell: the old row-count check let this through
  const extraCell = TABLE.replace("lists the SCCs.", "lists the SCCs. |");
  const cells = runner.validateTranslatedChunk(TABLE, extraCell);
  assert.ok(
    cells.problems.some((p: string) => /table cells/.test(p)),
    cells.problems.join("; ")
  );

  // the `or` defect: a pipe the translator invented, escaped so the cell count holds
  const escaped = TABLE.replace("lists the SCCs.", "lists the SCCs \\|");
  const pipes = runner.validateTranslatedChunk(TABLE, escaped);
  assert.ok(
    pipes.problems.some((p: string) => /table cells/.test(p)),
    pipes.problems.join("; ")
  );

  // a source escaped pipe that survives is fine, and so is cell padding
  const src = "| A | x \\| y |\n| - | - |\n| `a\\|b` | one \\| two |";
  const out = "| A   | x \\| y   |\n| - | - |\n| `a\\|b` | um \\| dois |";
  assert.deepEqual(runner.validateTranslatedChunk(src, out).problems, []);
});

test("translateBody fails the chunk instead of shipping a corrupted issue reference", async () => {
  const body = "Bare exits 1 (fail-closed since #15281).";
  await assert.rejects(
    runner.translateBody(
      body,
      { code: "fr", english: "French" },
      {
        engine: "google",
        googleTranslate: async () => "Sortie 1 (fail-closed depuis # 15281).",
      }
    ),
    /failed validation \(google\): issue refs/
  );
});
