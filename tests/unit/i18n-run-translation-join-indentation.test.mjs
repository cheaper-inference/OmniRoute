import test from "node:test";
import assert from "node:assert/strict";
import { chunkMarkdown, joinTranslatedChunks } from "../../scripts/i18n/run-translation.mjs";

test("joining chunked Markdown preserves indentation on a following fenced block", () => {
  const code = ["  ```js", "  const answer = 42;", "  ```"].join("\n");
  const prefix = "prose ".repeat(100).trimEnd();
  const chunks = chunkMarkdown(`${prefix}\n\n${code}`, 400);
  assert.equal(chunks.length, 2);
  assert.equal(joinTranslatedChunks(chunks), `${prefix}\n\n${code}`);
});

test("joining preserves an indented code block after leading blank lines", () => {
  const code = "    const answer = 42;\n    console.log(answer);";
  assert.equal(
    joinTranslatedChunks(["## Example\n", `\r\n \t\r\n${code}`]),
    `## Example\n\n${code}`
  );
});

test("table rows and tight list items retain one newline at chunk seams", () => {
  assert.equal(joinTranslatedChunks(["| a | b |\n\n", "\n| c | d |"]), "| a | b |\n| c | d |");
  assert.equal(
    joinTranslatedChunks(["- one\n  detail\n\n", "\n\n- two\n  more detail"]),
    "- one\n  detail\n- two\n  more detail"
  );
});

test("ordinary paragraph seams retain a single blank line", () => {
  assert.equal(
    joinTranslatedChunks(["## A\ntext\n\n", "\n \n## B\nmore"]),
    "## A\ntext\n\n## B\nmore"
  );
});
