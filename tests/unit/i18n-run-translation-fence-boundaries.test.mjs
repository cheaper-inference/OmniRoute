import test from "node:test";
import assert from "node:assert/strict";
import { chunkMarkdown, joinTranslatedChunks } from "../../scripts/i18n/run-translation.mjs";

test("an H2 inside an oversized fenced block cannot become a chunk boundary", () => {
  const source = [
    "```markdown",
    "x".repeat(1800),
    "## heading inside code",
    "y".repeat(1800),
    "```",
  ].join("\n");
  const chunks = chunkMarkdown(source, Math.ceil(source.length / 2));
  assert.deepEqual(chunks, [source], "an indivisible code block must remain whole");
  assert.equal(joinTranslatedChunks(chunks), source);
});

test("a shorter or different delimiter cannot close the code block during paragraph splitting", () => {
  const source = [
    "````markdown",
    "x".repeat(400),
    "```",
    "",
    "### still code",
    "y".repeat(400),
    "~~~",
    "",
    "```` not a closing fence",
    "z".repeat(400),
    "`````",
  ].join("\n");
  assert.deepEqual(chunkMarkdown(source, 500), [source]);
});

test("tilde fences retain mixed delimiters and H2 examples with CRLF line endings", () => {
  const source = [
    "~~~~markdown",
    "x".repeat(400),
    "~~~",
    "```",
    "",
    "## still code",
    "y".repeat(400),
    "~~~~~\t",
  ].join("\r\n");
  assert.deepEqual(chunkMarkdown(source, 500), [source]);
});

test("an unclosed fence remains indivisible through the end of the body", () => {
  const source = ["```markdown", "x".repeat(400), "", "## still code", "y".repeat(400)].join("\n");
  assert.deepEqual(chunkMarkdown(source, 500), [source]);
});

test("a real H2 after a matching longer closing fence remains a safe boundary", () => {
  const code = ["````markdown", "x".repeat(400), "## still code", "`````"].join("\n");
  const outside = `## Outside\n\n${"y".repeat(400)}`;
  const chunks = chunkMarkdown(`${code}\n\n${outside}`, 500);
  assert.equal(chunks.length, 2);
  assert.equal(chunks[0].trimEnd(), code);
  assert.equal(chunks[1], outside);
});

test("up to three leading spaces still open a fenced block", () => {
  const source = ["   ```markdown", "x".repeat(400), "## still code", "y".repeat(400), " ```"].join(
    "\n"
  );
  assert.deepEqual(chunkMarkdown(source, 500), [source]);
});

test("a backtick in a backtick info string cannot hide a real H2", () => {
  const prefix = ["```bad`info", "x".repeat(400)].join("\n");
  const outside = `## Outside\n${"y".repeat(400)}`;
  const chunks = chunkMarkdown(`${prefix}\n${outside}`, 500);
  assert.equal(chunks.length, 2);
  assert.equal(chunks[1], outside);
});

test("a fenced code block nested inside a list is never fragmented", () => {
  const code = [
    "    ```text",
    "    " + "x".repeat(450),
    "",
    "    " + "y".repeat(450),
    "    ```",
  ].join("\n");
  const source = "1. Item\n\n" + code;
  const chunks = chunkMarkdown(source, 300);
  assert.ok(
    chunks.some((chunk) => chunk.includes(code)),
    "one chunk must retain the complete nested code block"
  );
});
