import assert from "node:assert/strict";
import { test } from "node:test";

globalThis.fetch = () => {
  throw new Error("network access in tests");
};

const { extractExcerpt, htmlToText, normalizeForMatch, shortHash } =
  await import("../../scripts/quality/catalog-drift/normalize.mjs");
const { selectPath } = await import("../../scripts/quality/catalog-drift/jsonPath.mjs");

test("htmlToText drops script and style and decodes entities", () => {
  assert.equal(
    htmlToText("<p>Free&nbsp;mode &amp; API</p><script>x=1</script><style>p{}</style>"),
    "Free mode & API"
  );
  assert.equal(htmlToText("&lt; &gt; &quot; &#39; &apos; &#65; &#x42;"), "< > \" ' ' A B");
});

test("normalizeForMatch folds curly quotes, special spaces and case", () => {
  assert.equal(
    normalizeForMatch("It Doesn\u2019t include API\naccess"),
    "it doesn't include api access"
  );
  assert.equal(
    normalizeForMatch("1\u202f000\u00a0requests\u2009per\u2007day"),
    "1 000 requests per day"
  );
  assert.equal(
    normalizeForMatch("\u201cQUOTA\u201d \u2018plan\u02bcs\u2019"),
    "\"quota\" 'plan's'"
  );
});

test("normalizeForMatch keeps markdown table pipes", () => {
  assert.equal(normalizeForMatch("| Less than 10 |  20 | 50 |"), "| less than 10 | 20 | 50 |");
});

test("extractExcerpt returns chars from the anchor", () => {
  const text = "aaa free token 100,000 tokens per 24 hours bbb";
  assert.equal(extractExcerpt(text, "Free token", 20), "free token 100,000 t");
  assert.equal(extractExcerpt(text, "Missing anchor", 20), null);
});

test("shortHash is stable", () => {
  assert.equal(shortHash("abc"), "ba7816bf8f01cfea");
});

test("selectPath", () => {
  assert.equal(
    selectPath(
      { data: [{ code: { toString: null } }, { code: "free", n: 1 }] },
      "data[code=free].n"
    ),
    1
  );
  assert.deepEqual(selectPath({ data: [{ id: "a" }, { id: "b" }] }, "data[].id"), ["a", "b"]);
  assert.deepEqual(
    selectPath([{ code: "paid" }, { code: "free", models: [] }], "[code=free].models"),
    []
  );
  assert.equal(selectPath({ plans: [{ code: "free", n: 7 }] }, "plans[code=free].n"), 7);
  assert.equal(selectPath({ a: { b: 1 } }, "a.c"), undefined);
  assert.equal(
    selectPath(
      {
        a: [
          { t: true, id: "x" },
          { t: false, id: "y" },
        ],
      },
      "a[t=true].id"
    ),
    "x"
  );
  assert.deepEqual(selectPath([{ values: [1, 2] }, { values: [3] }], "[].values[]"), [1, 2, 3]);
});
