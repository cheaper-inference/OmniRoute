import assert from "node:assert/strict";
import test from "node:test";
import {
  translateMarkdownWithGoogle,
  splitCells,
} from "../../scripts/i18n/lib/google-translate.mjs";

function transport() {
  const calls = [];
  return {
    calls,
    fetchImpl: async (_url, init) => {
      const items = new URLSearchParams(init.body).getAll("q");
      calls.push(items);
      return { ok: true, status: 200, json: async () => items };
    },
  };
}

for (const [name, source] of [
  ["blockquote fences", '> ```ts\n> const message = "keep code";\n> console.log(message);\n> ```'],
  ["indented code", '    const message = "keep code";\n    console.log(message);'],
  [
    "indented code whose content starts with a list marker",
    '    - console.log("keep code");\n    doWork();',
  ],
  [
    "indented code whose content starts with a quote marker",
    '    > console.log("preserve code");\n    > doWork();',
  ],
  ["indented code inside a blockquote", '>     console.log("preserve code");\n>     doWork();'],
  [
    "a fence on the first line of a list item",
    '- ```js\n  console.log("preserve code");\n  doWork();\n  ```',
  ],
]) {
  test(`Google keeps ${name} verbatim and does not submit code as prose`, async () => {
    const mock = transport();
    const out = await translateMarkdownWithGoogle(source, "es", { fetchImpl: mock.fetchImpl });
    assert.equal(out, source);
    assert.equal(mock.calls.length, 0);
  });
}

test("Google table cell splitting respects multi-backtick code delimiters", () => {
  assert.deepEqual(splitCells("| Example | ``one ` two`` | Notes |"), [
    "",
    " Example ",
    " ``one ` two`` ",
    " Notes ",
    "",
  ]);
});

test("invalid Google concurrency is rejected before any request can exceed its budget", async () => {
  const mock = transport();
  for (const concurrency of [Number.NaN, Number.POSITIVE_INFINITY, 0, -1, 1.5, "2"]) {
    await assert.rejects(
      translateMarkdownWithGoogle("A sentence that needs translation.", "es", {
        fetchImpl: mock.fetchImpl,
        concurrency,
      }),
      /concurrency/i
    );
  }
  assert.equal(mock.calls.length, 0);
});

test("invalid Google request timeout is rejected before transport", async () => {
  const mock = transport();
  for (const timeoutMs of [Number.NaN, Number.POSITIVE_INFINITY, 0, -1, 1.5, 2147483648, "30"]) {
    await assert.rejects(
      translateMarkdownWithGoogle("A sentence that needs translation.", "es", {
        fetchImpl: mock.fetchImpl,
        timeoutMs,
      }),
      /timeout/i
    );
  }
  assert.equal(mock.calls.length, 0);
});

test("task-list indented code stays verbatim after the list paragraph", async () => {
  const source = '- [x] Example\n\n      console.log("keep");\n      doWork();';
  const mock = transport();
  const out = await translateMarkdownWithGoogle(source, "es", { fetchImpl: mock.fetchImpl });
  assert.equal(out, source);
  assert.equal(
    mock.calls.flat().some((item) => item.includes("console.log")),
    false
  );
});

test("four-space list continuation prose still reaches the translator", async () => {
  const source = "- List item\n\n    Continued paragraph.";
  const mock = transport();
  await translateMarkdownWithGoogle(source, "es", { fetchImpl: mock.fetchImpl });
  assert.ok(mock.calls.flat().some((item) => item.includes("Continued paragraph")));
});

test("a quoted long fence is not closed by a shorter or mixed fence", async () => {
  const source = "> ````ts\n> ```\n> ~~~~\n> const keep = true;\n> ````";
  const mock = transport();
  assert.equal(
    await translateMarkdownWithGoogle(source, "es", { fetchImpl: mock.fetchImpl }),
    source
  );
  assert.equal(mock.calls.length, 0);
});

test("an unclosed quoted fence ends at its quote container", async () => {
  const source = "> ```ts\n> const keep = true;\n\nTranslate this paragraph.";
  const mock = transport();
  assert.equal(
    await translateMarkdownWithGoogle(source, "es", { fetchImpl: mock.fetchImpl }),
    source
  );
  assert.ok(mock.calls.flat().some((item) => item.includes("Translate this paragraph")));
});

test("quoted indented code preserves paragraph boundaries and releases outer prose", async () => {
  const source =
    '> Intro prose.\n>\n>     console.log("preserve code");\n>     doWork();\n\nOutside prose.';
  const mock = transport();
  assert.equal(
    await translateMarkdownWithGoogle(source, "es", { fetchImpl: mock.fetchImpl }),
    source
  );
  assert.deepEqual(mock.calls.flat(), ["Intro prose.", "Outside prose."]);
});

test("an unclosed list fence ends when the list item is outdented", async () => {
  const source = '- ```js\n  console.log("preserve code");\n  doWork();\n\nOutside prose.';
  const mock = transport();
  assert.equal(
    await translateMarkdownWithGoogle(source, "es", { fetchImpl: mock.fetchImpl }),
    source
  );
  assert.deepEqual(mock.calls.flat(), ["Outside prose."]);
});

test("the optional Cloud key selects v2 HTML transport and restores its response", async () => {
  let calls = 0;
  const fetchImpl = async (url, init) => {
    calls++;
    const endpoint = new URL(url);
    assert.equal(
      endpoint.origin + endpoint.pathname,
      "https://translation.googleapis.com/language/translate/v2"
    );
    assert.equal(endpoint.searchParams.get("key"), "fixture key only");
    assert.equal(init.method, "POST");
    assert.equal(init.headers["Content-Type"], "application/json");
    assert.ok(init.signal instanceof AbortSignal);
    const payload = JSON.parse(init.body);
    assert.equal(payload.source, "en");
    assert.equal(payload.target, "pt");
    assert.equal(payload.format, "html");
    return {
      ok: true,
      status: 200,
      json: async () => ({
        data: {
          translations: payload.q.map((text) => ({ translatedText: text.replace("Read", "Leia") })),
        },
      }),
    };
  };
  const translated = await translateMarkdownWithGoogle("Read `npm test`.", "pt-BR", {
    fetchImpl,
    apiKey: "fixture key only",
    concurrency: 1,
    timeoutMs: 2147483647,
  });
  assert.equal(translated, "Leia `npm test`.");
  assert.equal(calls, 1);
});
