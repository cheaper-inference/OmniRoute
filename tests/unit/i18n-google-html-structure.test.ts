import test from "node:test";
import assert from "node:assert/strict";

const google = await import("../../scripts/i18n/lib/google-translate.mjs");
const runner = await import("../../scripts/i18n/run-translation.mjs");

// README.md's tech-stack table: HTML rows inside markdown. A Google re-translation broke the
// database row in 24 locales (2026-10-28) while the run reported "0 failed".
const ROWS = [
  "  <tr><td nowrap><b>Language</b></td><td>TypeScript 6.0 — <b>100% TypeScript</b> across <code>src/</code> and <code>open-sse/</code> (zero <code>any</code> in core since v2.0)</td></tr>",
  "  <tr><td nowrap><b>Database</b></td><td>better-sqlite3 (SQLite, WAL journaling) + LowDB (JSON legacy) — 147 domain modules, 213 migrations</td></tr>",
].join("\n");

const tagSequence = (s: string) => s.match(/<\/?[A-Za-z][\w-]*(?=[\s/>])[^>]*>/g) ?? [];

// A translator that rewrites every letter it is sent outside markup (upper-cases it), the way
// the web endpoint translates whatever text reaches it — including the text between a
// `<code>` tag pair and product names that are not masked.
function upperCaseGoogle() {
  const fetchImpl = async (_url: string, init: { body: string }) => ({
    ok: true,
    status: 200,
    json: async () =>
      new URLSearchParams(init.body).getAll("q").map((html) =>
        html
          .split(/(<[^>]+>)/)
          .map((p) => (p.startsWith("<") || /^zq[a-z]+$/.test(p) ? p : p.toUpperCase()))
          .join("")
      ),
  });
  return fetchImpl;
}

test("an HTML table row keeps its tags, <code> content and product names", async () => {
  const out = await google.translateMarkdownWithGoogle(ROWS, "am", {
    fetchImpl: upperCaseGoogle(),
    protectedTerms: [],
    backoffMs: 1,
  });
  // prose is translated…
  assert.match(out, /DATABASE/);
  assert.match(out, /DOMAIN MODULES/);
  // …the HTML structure and every code span come back verbatim, in source order…
  assert.deepEqual(tagSequence(out), tagSequence(ROWS));
  for (const code of ["<code>src/</code>", "<code>open-sse/</code>", "<code>any</code>"]) {
    assert.ok(out.includes(code), `${code} must survive verbatim:\n${out}`);
  }
  // …and the product / technical identifiers are never handed to the translator
  for (const name of ["better-sqlite3", "SQLite", "LowDB", "TypeScript"]) {
    assert.ok(out.includes(name), `${name} must survive verbatim:\n${out}`);
  }
  assert.deepEqual(runner.validateTranslatedChunk(ROWS, out).problems, []);
});

test("a token id the translator echoes as bare text never reaches the output (ja leak)", async () => {
  // ja, 2026-10-28: every span came back intact AND the ids `zqi` / `zqo` also came back as
  // plain words, so restore() accepted the answer and the ids leaked into the mirror.
  const src = "Prose with `alpha` and `beta` inside.";
  const mask = google.maskInline(src);
  const echoed = mask.html.replace(/(<span translate="no">(zq[a-z]+)<\/span>)/, "$1 $2");
  assert.notEqual(echoed, mask.html);
  assert.equal(mask.restore(echoed), null);

  const fetchImpl = async (_url: string, init: { body: string }) => ({
    ok: true,
    status: 200,
    json: async () =>
      new URLSearchParams(init.body)
        .getAll("q")
        .map((q) => q.replace(/(<span translate="no">(zq[a-z]+)<\/span>)/, "$1 $2")),
  });
  const out = await google.translateMarkdownWithGoogle(`${src}\n\nSecond paragraph.`, "ja", {
    fetchImpl,
    backoffMs: 1,
    maxUntranslatedRatio: 1,
  });
  assert.doesNotMatch(out, /(?<![A-Za-z])zq[a-z]+/);
  assert.ok(out.includes(src), "the unrestorable segment keeps its English text");
});

test("a token the translator duplicates or HTML tags it reorders are rejected", () => {
  const mask = google.maskInline("Use the <b>bold</b> flag and `x` here.");
  const ids = [...mask.html.matchAll(/<span translate="no">(zq[a-z]+)<\/span>/g)].map((m) => m[1]);
  assert.equal(ids.length, 3); // <b>, </b>, `x`
  const span = (id: string) => `<span translate="no">${id}</span>`;
  // the closing tag moved in front of the opening one (ja: `<b>`…`</code>` mis-nested)
  const swapped = mask.html
    .replace(span(ids[0]), "\u0000")
    .replace(span(ids[1]), span(ids[0]))
    .replace("\u0000", span(ids[1]));
  assert.equal(mask.restore(swapped), null);
  // a code token emitted twice
  assert.equal(mask.restore(mask.html.replace(span(ids[2]), span(ids[2]) + span(ids[2]))), null);
  // the faithful answer still restores
  assert.equal(mask.restore(mask.html), "Use the <b>bold</b> flag and `x` here.");
});

test("the output guard rejects a chunk whose HTML structure or <code> content changed", () => {
  const good = ROWS.replace("Language", "Sprache").replace("domain modules", "Domänenmodule");
  assert.deepEqual(runner.validateTranslatedChunk(ROWS, good).problems, []);

  const cases: Record<string, string> = {
    "translated <code> content": ROWS.replace("<code>any</code>", "<code>ማንኛውም</code>"),
    "dropped cell": ROWS.replace("<td nowrap><b>Database</b></td>", "<b>Database</b>"),
    "mis-nested tags (ja)": ROWS.replace(
      "<b>100% TypeScript</b> across <code>src/</code>",
      "<b> src/</code>および<code> TypeScript 100 </b>"
    ),
    "leaked token id": ROWS.replace("(zero ", "(zero zqi "),
    "leaked mask span": ROWS.replace("legacy", '<span translate="no">zqa</span>'),
  };
  for (const [name, bad] of Object.entries(cases)) {
    const { problems } = runner.validateTranslatedChunk(ROWS, bad);
    assert.ok(problems.length > 0, `${name} must be rejected`);
  }
});

test("the HTML guard ignores tags inside fences and inline code", () => {
  const src = ["Use `<br>` here.", "", "```html", "<div><b>x</b></div>", "```"].join("\n");
  const out = ["Utilisez `<br>` ici.", "", "```html", "<div><b>x</b></div>", "```"].join("\n");
  assert.deepEqual(runner.validateTranslatedChunk(src, out).problems, []);
});

test("the em dash that anchors README's database-row counts is never localized (de)", async () => {
  // check-docs reads the module / migration counts after "—" in this row; de answered "–".
  const fetchImpl = async (_url: string, init: { body: string }) => ({
    ok: true,
    status: 200,
    json: async () => new URLSearchParams(init.body).getAll("q").map((q) => q.replace(/—/g, "–")),
  });
  const out = await google.translateMarkdownWithGoogle(ROWS, "de", { fetchImpl, backoffMs: 1 });
  assert.match(out, /<td>better-sqlite3 [^<]*— 147 domain modules, 213 migrations<\/td>/);
});
