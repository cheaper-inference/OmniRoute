// The fallback input-token estimate runs when a provider sends no usage. It used to split the
// whole serialized request into arrays just to read `.length`. It must now count in one pass,
// with exactly the same numbers as before (CJK, astral CJK, camelCase, punctuation, whitespace).
import test from "node:test";
import assert from "node:assert/strict";

const { estimateInputTokens } = await import("../../open-sse/utils/usageTracking.ts");

// Frozen copy of the previous split/filter implementation: the parity oracle.
function referenceEstimate(text: unknown) {
  if (!text || typeof text !== "string") return 0;
  const cjkMatches = text.match(/[\u3000-\u9fff\uf900-\ufaff\u{20000}-\u{2fa1f}]/gu);
  const cjkCount = cjkMatches ? cjkMatches.length : 0;
  const nonCJK = text.replace(/[\u3000-\u9fff\uf900-\ufaff]/g, " ");
  const tokens = nonCJK
    .split(/(\s+|[^\w\s]|(?<=[a-z])(?=[A-Z]))/)
    .filter((t) => t && t.trim().length > 0);
  return cjkCount + Math.ceil(tokens.length * 1.3);
}

const FIXTURES = [
  "",
  "hello world",
  "camelCaseIdentifier and snake_case_name",
  "XMLHttpRequest parseJSON getHTTPResponse",
  "a,b;c.d!e?f (g) [h] {i} \"j\" 'k'",
  "tabs\tand\nnewlines\r\nand\u00a0nbsp\u2003em\u2028ls\ufeffbom",
  "你好，世界。こんにちは 안녕하세요 한글",
  "mixed你好World好camelCase世界",
  "astral \u{20000}\u{2a6d6}\u{2fa1f} cjk and emoji \u{1f600}\u{1f4a9} end",
  "accents café naïve Ünïcödé",
  "lone \ud800 high and \udc00 low surrogates",
  "\u3000ideographic\u3000space\u3000",
  "ABC DEF aBC abC a1B2 _Under_Score",
];

function* randomTexts(count: number) {
  const alphabet = [
    ..."abcxyzABCXYZ019_",
    ..." \t\n,.;:!?()[]{}\"'\\/-+=<>@#$%^&*|~`",
    ..."\u3000\u4e00\u9fff\uf900\ufaff\u00e9\u00a0\u2003\ufeff",
    "\u{20000}",
    "\u{2fa1f}",
    "\u{1f600}",
    "\ud800",
    "\udc00",
  ];
  let seed = 123456789;
  const next = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff);
  for (let i = 0; i < count; i++) {
    const length = next() % 60;
    let out = "";
    for (let j = 0; j < length; j++) out += alphabet[next() % alphabet.length];
    yield out;
  }
}

// The body is serialized first, so the oracle runs on the same JSON text as production.
function expected(body: Record<string, unknown>) {
  return referenceEstimate(JSON.stringify(body));
}

test("estimateInputTokens keeps the exact previous numbers on fixtures", () => {
  for (const text of FIXTURES) {
    assert.equal(estimateInputTokens({ a: text }), expected({ a: text }), JSON.stringify(text));
  }
  assert.equal(estimateInputTokens(undefined), 0);
  assert.equal(estimateInputTokens("text"), 0);
});

test("estimateInputTokens keeps the exact previous numbers for every UTF-16 code unit", () => {
  for (let code = 0; code <= 0xffff; code++) {
    const text = `aB${String.fromCharCode(code)}cD${String.fromCharCode(code)}`;
    assert.equal(estimateInputTokens({ a: text }), expected({ a: text }), `U+${code.toString(16)}`);
  }
});

test("estimateInputTokens keeps the exact previous numbers on 3000 random texts", () => {
  for (const text of randomTexts(3000)) {
    assert.equal(estimateInputTokens({ a: text }), expected({ a: text }), JSON.stringify(text));
  }
});

test("estimateInputTokens counts without split or filter arrays", () => {
  const body = {
    model: "m",
    messages: [{ role: "user", content: "parse the HTTPResponse now, 你好 world ".repeat(2000) }],
    tools: [{ type: "function", function: { name: "getThing", parameters: { type: "object" } } }],
  };
  const { tools, ...withoutTools } = body;
  const want = expected(withoutTools) + Math.ceil(JSON.stringify(tools).length / 6);

  const origSplit = String.prototype.split;
  const origFilter = Array.prototype.filter;
  let splitCalls = 0;
  let filterCalls = 0;
  String.prototype.split = function (this: string, ...args: unknown[]) {
    splitCalls++;
    return Reflect.apply(origSplit, this, args);
  } as typeof String.prototype.split;
  Array.prototype.filter = function (this: unknown[], ...args: unknown[]) {
    filterCalls++;
    return Reflect.apply(origFilter, this, args);
  } as typeof Array.prototype.filter;
  let actual: number;
  try {
    actual = estimateInputTokens(body);
  } finally {
    String.prototype.split = origSplit;
    Array.prototype.filter = origFilter;
  }

  assert.equal(actual, want);
  assert.equal(splitCalls, 0, "no String.split on the request text");
  assert.equal(filterCalls, 0, "no Array.filter over a token array");
});
