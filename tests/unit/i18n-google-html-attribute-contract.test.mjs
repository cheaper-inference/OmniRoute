import assert from "node:assert/strict";
import test from "node:test";
import { translateMarkdownWithGoogle } from "../../scripts/i18n/lib/google-translate.mjs";
import { validateTranslatedChunk } from "../../scripts/i18n/run-translation.mjs";

const mockGoogle = async (_url, init) => ({
  ok: true,
  status: 200,
  json: async () =>
    new URLSearchParams(init.body).getAll("q").map((text) => text.replace(/lower/g, "translated")),
});

for (const [name, prefix, attributes] of [
  ["double-quoted attribute", "", 'title="upper > lower"'],
  ["single-quoted attribute", "", "title='upper > lower'"],
  ["inline HTML", "Intro ", 'title="upper > lower"'],
  ["nested task container", "> - [x] ", 'title="upper > lower"'],
]) {
  test(`${name} keeps the entire tag while translating its visible text`, async () => {
    const source = `${prefix}<a ${attributes}>Read lower</a>`;
    const translated = await translateMarkdownWithGoogle(source, "de", {
      fetchImpl: mockGoogle,
      backoffMs: 0,
    });
    assert.equal(translated, `${prefix}<a ${attributes}>Read translated</a>`);
    assert.deepEqual(validateTranslatedChunk(source, translated).problems, []);
  });
}

test("quoted greater-than in an HTML code tag preserves its literal content", async () => {
  const code = '<code title="upper > lower">lower</code>';
  const source = `Read lower ${code}`;
  const translated = await translateMarkdownWithGoogle(source, "de", { fetchImpl: mockGoogle });
  assert.equal(translated, `Read translated ${code}`);
  assert.deepEqual(validateTranslatedChunk(source, translated).problems, []);
  assert.ok(
    validateTranslatedChunk(
      source,
      translated.replace(">lower</code>", ">changed</code>")
    ).problems.some((problem) => problem.startsWith("html code changed:"))
  );
});
