import test from "node:test";
import assert from "node:assert/strict";

const google = await import("../../scripts/i18n/lib/google-translate.mjs");
const runner = await import("../../scripts/i18n/run-translation.mjs");

// A fake of the keyless endpoint that reproduces what the real one does to HTML input:
// translates prose (here: upper-cases it and prefixes «T:»), escapes the attribute quotes,
// puts a space before a period that follows a span, drops a comma between two spans and
// injects zero-width spaces — the behaviors observed on 2026-10-28.
function fakeGoogle({ fail429 = 0 } = {}) {
  const calls: { tl: string; q: string[] }[] = [];
  let failures = fail429;
  const fetchImpl = async (url: string, init: { body: string }) => {
    const tl = new URL(url).searchParams.get("tl") ?? "";
    const q = new URLSearchParams(init.body).getAll("q");
    calls.push({ tl, q });
    if (failures > 0) {
      failures--;
      return { ok: false, status: 429, json: async () => ({}) };
    }
    const out = q.map((html) => {
      const parts = html.split(/(<[^>]+>)/);
      let text = parts
        .map((p) => (p.startsWith("<") || /^zq[a-z]+$/.test(p) ? p : p.toUpperCase()))
        .join("");
      text = text.replace(/<span translate="no">/g, '<span translate=\\"no\\">');
      text = text.replace(/<\/span>\./g, "</span> .");
      text = text.replace(/<\/span>, <span/g, "</span> <span");
      text = text.replace(/ THE /g, " ​THE ");
      return "T:" + text;
    });
    return { ok: true, status: 200, json: async () => out };
  };
  return { fetchImpl, calls };
}

const SAMPLE = [
  "Intro paragraph that wraps",
  "onto a second line with `npm run check` and a [link to the guide](docs/GUIDE.md).",
  "",
  "> [!IMPORTANT]",
  "> Every variable in `.env.example` must appear here.",
  "",
  "| Variable | Default | Description |",
  "| -------- | ------- | ----------- |",
  "| `PORT` | `20128` | The **listening** port, see `src/server.ts`. |",
  "| `DATA_DIR` | _(unset)_ | Values `false`, `0`, `no` disable it. |",
  "",
  "```bash",
  "# keep this comment and code verbatim",
  "PORT=20128 npm run dev",
  "```",
  "",
  "- First item mentions OmniRoute and OAuth",
  "  continued on an indented line.",
  "- Second item with {count} placeholder and `INPUT_SANITIZER_ENABLED=true`, `INPUT_SANITIZER_MODE=block`.",
  "",
  "<details><summary>More</summary>",
  "",
  "## Heading with `code`",
].join("\n");

test("google engine keeps fences, table rows and every inline code span", async () => {
  const { fetchImpl } = fakeGoogle();
  const out = await google.translateMarkdownWithGoogle(SAMPLE, "pt-BR", {
    fetchImpl,
    protectedTerms: ["OmniRoute", "OAuth"],
    backoffMs: 1,
  });
  const checked = runner.validateTranslatedChunk(SAMPLE, out);
  assert.deepEqual(checked.problems, []);
  assert.deepEqual(runner.lostInlineCode(SAMPLE, out), []);
  // fence body is untouched
  assert.ok(
    out.includes("```bash\n# keep this comment and code verbatim\nPORT=20128 npm run dev\n```")
  );
  // separator row verbatim, cells translated in place
  assert.ok(out.includes("| -------- | ------- | ----------- |"));
  assert.match(
    out,
    /\| `PORT` \| `20128` \| T:THE \*\*LISTENING\*\* PORT, SEE `src\/server\.ts`\. \|/
  );
});

test("google engine restores links, alerts, prefixes, protected terms and placeholders", async () => {
  const { fetchImpl } = fakeGoogle();
  const out = await google.translateMarkdownWithGoogle(SAMPLE, "ja", {
    fetchImpl,
    protectedTerms: ["OmniRoute", "OAuth"],
    backoffMs: 1,
  });
  const lines = out.split("\n");
  // soft-wrapped paragraph joined into one translated line, link target intact
  assert.match(
    lines[0],
    /^T:INTRO PARAGRAPH .* `npm run check` .*\[LINK TO \S+ GUIDE\]\(docs\/GUIDE\.md\)\.$/
  );
  // GitHub alert marker stays on its own line
  assert.equal(lines[2], "> [!IMPORTANT]");
  assert.match(lines[3], /^> T:EVERY VARIABLE IN `\.env\.example` MUST APPEAR HERE\.$/);
  // list prefix and protected terms survive
  assert.ok(
    out.includes("- T:FIRST ITEM MENTIONS OmniRoute AND OAuth CONTINUED ON AN INDENTED LINE.")
  );
  assert.ok(out.includes("{count}"));
  // the dropped comma must not glue two code spans into one
  assert.ok(out.includes("`INPUT_SANITIZER_ENABLED=true` `INPUT_SANITIZER_MODE=block`"));
  assert.ok(out.includes("## T:HEADING WITH `code`"));
  assert.ok(!/​/.test(out), "zero-width spaces are stripped");
});

test("google engine maps OmniRoute locale codes and batches all segments of a chunk", async () => {
  assert.equal(google.googleLangFor("pt-BR"), "pt");
  assert.equal(google.googleLangFor("pt"), "pt-PT");
  assert.equal(google.googleLangFor("uk-UA"), "uk");
  assert.equal(google.googleLangFor("phi"), "tl");
  assert.equal(google.googleLangFor("zh-TW"), "zh-TW");
  assert.equal(google.googleLangFor("de"), "de");
  const { fetchImpl, calls } = fakeGoogle();
  await google.translateMarkdownWithGoogle(SAMPLE, "uk-UA", { fetchImpl, backoffMs: 1 });
  assert.equal(calls.length, 1, "one POST carries every segment of a small chunk");
  assert.equal(calls[0].tl, "uk");
  assert.deepEqual(google.planBatches(["a".repeat(3000), "b".repeat(3000), "c"]).length, 2);
});

test("google engine retries a 429 and gives up loudly when segments cannot be restored", async () => {
  const flaky = fakeGoogle({ fail429: 2 });
  const out = await google.translateMarkdownWithGoogle("Plain sentence.", "de", {
    fetchImpl: flaky.fetchImpl,
    backoffMs: 1,
  });
  assert.equal(out, "T:PLAIN SENTENCE.");
  assert.equal(flaky.calls.length, 3);

  const lossy = async (_url: string, init: { body: string }) => ({
    ok: true,
    status: 200,
    json: async () => new URLSearchParams(init.body).getAll("q").map(() => "token dropped"),
  });
  await assert.rejects(
    google.translateMarkdownWithGoogle("Run `npm test` now.", "de", {
      fetchImpl: lossy,
      backoffMs: 1,
    }),
    /segments could not be restored/
  );
});

test("translateBody falls back to Google for a chunk the model keeps truncating", async () => {
  const body = "| A | B |\n| - | - |\n| one | two |\n| three | four |";
  let modelCalls = 0;
  const backend = {
    engine: "llm",
    model: "primary",
    googleFallback: true,
    callChat: async () => {
      modelCalls++;
      return "| A | B |\n| - | - |\n| um | dois |"; // one row lost, as the model did on ENVIRONMENT
    },
    googleTranslate: async (chunk: string) => chunk.replace("one", "um").replace("three", "três"),
  };
  const out = await runner.translateBody(body, { code: "pt-BR", english: "Portuguese" }, backend);
  assert.equal(modelCalls, 3, "the model gets its normal attempts first");
  assert.ok(out.includes("| um | two |") && out.includes("| três | four |"));

  await assert.rejects(
    runner.translateBody(
      body,
      { code: "pt-BR", english: "Portuguese" },
      { ...backend, googleFallback: false }
    ),
    /failed validation: table rows 3\/4/
  );
});

test("translateBody uses Google directly with the google engine and on model errors", async () => {
  const body = "Hello world.";
  const googleOnly = await runner.translateBody(
    body,
    { code: "de", english: "German" },
    { engine: "google", googleTranslate: async () => "Hallo Welt." }
  );
  assert.equal(googleOnly, "Hallo Welt.");

  const onError = await runner.translateBody(
    body,
    { code: "de", english: "German" },
    {
      engine: "llm",
      model: "primary",
      googleFallback: true,
      callChat: async () => {
        throw new Error("upstream 429: quota exhausted");
      },
      googleTranslate: async () => "Hallo Welt.",
    }
  );
  assert.equal(onError, "Hallo Welt.");
  assert.equal(runner.translationEngine({ OMNIROUTE_TRANSLATION_ENGINE: "Google" }), "google");
  assert.equal(runner.translationEngine({}), "llm");
  assert.equal(runner.googleFallbackEnabled({}), true);
  assert.equal(runner.googleFallbackEnabled({ OMNIROUTE_TRANSLATION_GOOGLE_FALLBACK: "0" }), false);
});

test("a backtick or pipe the translator writes into prose cannot open a code span or split a cell", async () => {
  const src = "| `A` | Minimum: `10000` (10 s). |";
  const fetchImpl = async (_url: string, init: { body: string }) => ({
    ok: true,
    status: 200,
    json: async () =>
      new URLSearchParams(init.body)
        .getAll("q")
        .map((q) => q.replace("Minimum:", "Նվազագույնը`").replace("(10 s)", "(10 վրկ | 10 s)")),
  });
  const out = await google.translateMarkdownWithGoogle(src, "hy", { fetchImpl, backoffMs: 1 });
  assert.deepEqual(runner.lostInlineCode(src, out), []);
  assert.ok(out.includes("Նվազագույնը՝ `10000`"));
  assert.ok(out.includes("10 վրկ \\| 10 s"));
  assert.equal(out.split(/(?<!\\)\|/).length, src.split(/(?<!\\)\|/).length);
});
