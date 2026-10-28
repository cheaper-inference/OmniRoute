/**
 * Tool-name resolution for the Cloudflare Playground emulated tool calling.
 *
 * These tests are derived from live captures (see
 * `tests/fixtures/cloudflare-playground/cases.json`) and pin the three defects
 * that made a well-formed call resolve to the wrong tool:
 *
 *   D1 — a `<tool_call>` container was matched as if it were the call, so the
 *        name inside it was never read and the wrapper body was accepted as a
 *        nameless payload;
 *   D2 — a nameless payload fell back to `availableTools[0]`, i.e. the caller's
 *        first tool, which executes the wrong tool instead of failing;
 *   D3 — a complete JSON body closed with the wrong tag (`</path>`) was dropped
 *        because every pattern required a matching closer.
 *
 * Every case also asserts the *finalize* outcome, because a call that parses but
 * fails validation burns the single repair retry — the fix has to land on a
 * valid call, not merely on a parsed name.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  parseCfToolCalls,
  finalizeCfToolCalls,
  hasMalformedCfToolIntent,
  stripCfToolMarkup,
  serializeCfToolPrompt,
  buildCfToolReminder,
  type CfToolDef,
} from "../../open-sse/translator/cloudflarePlaygroundTools.ts";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "..", "fixtures", "cloudflare-playground");

/** The 12 tools OpenCode declared when the defect was captured. */
const OPENCODE_TOOLS: CfToolDef[] = JSON.parse(
  readFileSync(join(fixtureDir, "opencode-tools.json"), "utf8")
);
const OPENCODE_OPENAI = OPENCODE_TOOLS.map((tool) => ({
  type: "function" as const,
  function: { name: tool.name, parameters: tool.parameters },
}));

interface CorpusCase {
  id: string;
  note: string;
  tools: "opencode" | CfToolDef[];
  text: string;
  expect: { calls: string[]; finalize: "ok" | "null"; malformed: boolean };
}

const corpus = JSON.parse(readFileSync(join(fixtureDir, "cases.json"), "utf8")) as {
  nonce: string;
  cases: CorpusCase[];
};

const NONCE = corpus.nonce;

function defsFor(entry: CorpusCase): CfToolDef[] {
  return entry.tools === "opencode" ? OPENCODE_TOOLS : entry.tools;
}

function openAiFor(entry: CorpusCase) {
  return entry.tools === "opencode"
    ? OPENCODE_OPENAI
    : entry.tools.map((tool) => ({
        type: "function" as const,
        function: { name: tool.name, parameters: tool.parameters },
      }));
}

// ── Corpus: every captured shape, end to end ─────────────────────────────────

for (const entry of corpus.cases) {
  test(`corpus/${entry.id}: parses to the declared tool and finalizes`, () => {
    const defs = defsFor(entry);
    const parsed = parseCfToolCalls(entry.text, defs);
    assert.deepEqual(
      parsed.map((call) => call.name),
      entry.expect.calls,
      `${entry.note} — parsed ${JSON.stringify(parsed.map((call) => call.name))}`
    );

    const finalized =
      parsed.length > 0 ? finalizeCfToolCalls(parsed, openAiFor(entry), NONCE) : null;
    if (entry.expect.finalize === "ok") {
      assert.notEqual(finalized, null, "expected a validated batch");
      assert.deepEqual(
        finalized?.map((call) => call.name),
        entry.expect.calls
      );
      for (const call of finalized ?? []) {
        assert.doesNotThrow(() => JSON.parse(call.arguments));
        assert.equal(
          (JSON.parse(call.arguments) as Record<string, unknown>)._nonce,
          undefined,
          "the binding must be stripped before the call reaches the client"
        );
      }
    } else {
      assert.equal(finalized, null, "expected the batch to be rejected");
    }

    assert.equal(
      hasMalformedCfToolIntent(
        entry.text,
        defs.map((tool) => tool.name),
        defs
      ),
      entry.expect.malformed,
      `${entry.note} — malformed-intent gate`
    );
  });
}

// ── D1: a container is not a call ────────────────────────────────────────────

test("D1: a <tool_call> wrapper never becomes the caller's first tool", () => {
  const text = '<tool_call>\n<tool name="read">{"path":"/repo/main.py"}</tool>';
  const calls = parseCfToolCalls(text, OPENCODE_TOOLS);
  assert.deepEqual(
    calls.map((call) => call.name),
    ["read"]
  );
  assert.notEqual(calls[0].name, OPENCODE_TOOLS[0].name, "must not fall back to the first tool");
});

test("D1: two calls inside one wrapper stay two calls, in document order", () => {
  const text =
    '<tool_call>\n<tool name="read">{"path":"/repo/a.py"}</tool>\n' +
    '<tool name="read">{"path":"/repo/b.py"}</tool>\n</tool_call>';
  const calls = parseCfToolCalls(text, OPENCODE_TOOLS);
  assert.deepEqual(
    calls.map((call) => call.name),
    ["read", "read"]
  );
  assert.match(calls[0].arguments, /a\.py/);
  assert.match(calls[1].arguments, /b\.py/);
});

test("D1: nested wrappers terminate and still yield one call", () => {
  const text =
    '<tool_call>\n<tool_call>\n<read>{"path":"/repo/a.py"}</read>\n</tool_call>\n</tool_call>';
  const calls = parseCfToolCalls(text, OPENCODE_TOOLS);
  assert.deepEqual(
    calls.map((call) => call.name),
    ["read"]
  );
});

test("D1: a wrapper with an explicit name attribute is still a call", () => {
  const text = '<tool name="read">{"path":"/repo/a.py"}</tool>';
  assert.deepEqual(
    parseCfToolCalls(text, OPENCODE_TOOLS).map((call) => call.name),
    ["read"]
  );
});

test("D1: a JSON body containing markup is not treated as a container", () => {
  const text =
    '<tool_call>{"name":"write","arguments":{"path":"/repo/a.html","content":"<div>x</div><read>y</read>"}}</tool_call>';
  const calls = parseCfToolCalls(text, OPENCODE_TOOLS);
  assert.deepEqual(
    calls.map((call) => call.name),
    ["write"]
  );
  assert.match(calls[0].arguments, /<div>x<\/div><read>y<\/read>/);
});

test("D1: a nameless wrapper with no nested tag keeps the legacy inference", () => {
  const text = '<tool_call>{"path":"/repo/a.py"}</tool_call>';
  assert.deepEqual(
    parseCfToolCalls(text, OPENCODE_TOOLS).map((call) => call.name),
    ["read"]
  );
});

// ── D2: infer from the schema, never from array position ─────────────────────

const INFERENCE_CASES: Array<[string, string | null]> = [
  ['{"path":"/repo/a.py","offset":240,"limit":200}', "read"],
  ['{"command":"ls"}', "shell"],
  ['{"path":"/repo/a.py"}', "read"],
  ['{"path":"/repo/a.py","content":"x"}', "write"],
  ['{"path":"/repo/a.py","oldString":"x","newString":"y"}', "edit"],
  ['{"pattern":"*.ts"}', null],
];

for (const [args, expected] of INFERENCE_CASES) {
  test(`D2: <tool>${args} infers ${expected ?? "nothing"}`, () => {
    const names = parseCfToolCalls(`<tool>${args}</tool>`, OPENCODE_TOOLS).map((call) => call.name);
    assert.deepEqual(names, expected ? [expected] : []);
  });
}

test("D2: a nameless call never executes a tool whose schema does not fit", () => {
  // The caller's first tool accepts anything (no required keys); the payload
  // only fits `read`. Before the fix this executed `list` with a stray path.
  const tools: CfToolDef[] = [
    { name: "list", parameters: { type: "object", properties: {} } },
    {
      name: "read",
      parameters: {
        type: "object",
        properties: { path: { type: "string" } },
        required: ["path"],
      },
    },
  ];
  const calls = parseCfToolCalls('<tool>{"path":"secret.txt"}</tool>', tools);
  assert.deepEqual(
    calls.map((call) => call.name),
    ["read"]
  );
});

test("D2: a single declared tool is still inferred without arguments", () => {
  const tools = [OPENCODE_TOOLS.find((tool) => tool.name === "shell") as CfToolDef];
  assert.deepEqual(
    parseCfToolCalls("<tool>{}</tool>", tools).map((call) => call.name),
    ["shell"]
  );
});

test("D2: a hint still wins when the tag carries one", () => {
  const tools: CfToolDef[] = [
    { name: "bash", parameters: { type: "object", properties: { command: {} } } },
    { name: "read_file", parameters: { type: "object", properties: { path: {} } } },
  ];
  assert.deepEqual(
    parseCfToolCalls('<tool name="bash">{"path":"x"}</tool>', tools).map((call) => call.name),
    ["bash"]
  );
});

// ── D3: complete body, wrong closer ──────────────────────────────────────────

test("D3: a body closed with the last argument's name is recovered", () => {
  const text = '<tool name="write">{"path":"/repo/a.py","content":"x"}</path>';
  const calls = parseCfToolCalls(text, OPENCODE_TOOLS);
  assert.deepEqual(
    calls.map((call) => call.name),
    ["write"]
  );
});

test("D3: a body closed with another declared tool's tag is recovered", () => {
  const text = '<tool name="read">{"path":"/repo/a.py"}</read>';
  assert.deepEqual(
    parseCfToolCalls(text, OPENCODE_TOOLS).map((call) => call.name),
    ["read"]
  );
});

test("D3: an unclosed body is not recovered when the JSON is incomplete", () => {
  const text = '<write>{"path":"/repo/a.py","content":"def main():\\n    return 0';
  assert.deepEqual(parseCfToolCalls(text, OPENCODE_TOOLS), []);
});

test("D3: a complete body followed by prose is still recovered", () => {
  const text = '<write>{"path":"/repo/a.py","content":"x"}</path>\nDone.';
  assert.deepEqual(
    parseCfToolCalls(text, OPENCODE_TOOLS).map((call) => call.name),
    ["write"]
  );
});

test("D3: the recovery never invents a call from prose", () => {
  const text = 'Use a <tool> block: {"path": "/repo/a.py"} when you need to read.';
  assert.deepEqual(parseCfToolCalls(text, OPENCODE_TOOLS), []);
});

// ── D7: the model puts the tool name inside the JSON ─────────────────────────

test('D7: <edit>{"arg":"read", path} is honoured as a read', () => {
  const text = '<edit>{"arg": "read", "path": "/repo/NODES.md", "_nonce": "NONCE"}</edit>';
  const calls = parseCfToolCalls(text, OPENCODE_TOOLS);
  assert.deepEqual(
    calls.map((call) => call.name),
    ["read"]
  );
  const args = JSON.parse(calls[0].arguments) as Record<string, unknown>;
  assert.equal(args.path, "/repo/NODES.md");
  assert.equal(args.arg, undefined, "the hint key must not reach the tool");
  assert.equal(args._nonce, "NONCE", "the binding must survive for finalize");
});

test("D7: the hint is ignored when the tag's own schema declares that argument", () => {
  // `skill` really does take a `name`; it must not be reinterpreted as a tool.
  const text = '<skill>{"name": "pdf"}</skill>';
  assert.deepEqual(
    parseCfToolCalls(text, OPENCODE_TOOLS).map((call) => call.name),
    ["skill"]
  );
});

test("D7: a hint with no usable arguments yields no call", () => {
  const text = '<edit>{"arg": "read", "_nonce": "NONCE"}</edit>';
  assert.deepEqual(parseCfToolCalls(text, OPENCODE_TOOLS), []);
  assert.equal(
    hasMalformedCfToolIntent(
      text,
      OPENCODE_TOOLS.map((tool) => tool.name),
      OPENCODE_TOOLS
    ),
    true,
    "the executor must retry instead of answering with the markup"
  );
});

// ── D6: silent leaks are turned into a retry ─────────────────────────────────

const SILENT_LEAKS = [
  '<tool_call>read(path: "/repo/a.py")',
  'read(path: "/repo/a.py")',
  '<tool_call>shell("ls")',
  '<tool>read(path: "/repo/a.py")</tool>',
];

for (const text of SILENT_LEAKS) {
  test(`D6: ${JSON.stringify(text.slice(0, 40))} is reported as tool intent`, () => {
    assert.equal(
      hasMalformedCfToolIntent(
        text,
        OPENCODE_TOOLS.map((tool) => tool.name),
        OPENCODE_TOOLS
      ),
      true
    );
  });
}

test("D6: prose that mentions a call form mid-sentence is not intent", () => {
  const text = "The helper is called as read(path: ...) in the docs, so call it that way.";
  assert.equal(
    hasMalformedCfToolIntent(
      text,
      OPENCODE_TOOLS.map((tool) => tool.name),
      OPENCODE_TOOLS
    ),
    false
  );
});

test("D6: a well-formed call is never reported as malformed", () => {
  for (const text of [
    '<read>{"path":"/repo/a.py"}</read>',
    '<tool_call>\n<tool name="read">{"path":"/repo/a.py"}</tool>',
    '<tool>{"path":"/repo/a.py"}</tool>',
  ]) {
    assert.equal(
      hasMalformedCfToolIntent(
        text,
        OPENCODE_TOOLS.map((tool) => tool.name),
        OPENCODE_TOOLS
      ),
      false,
      text
    );
  }
});

// ── D4: no tool markup survives into content ─────────────────────────────────

const TOOL_NAMES = OPENCODE_TOOLS.map((tool) => tool.name);

test("D4: the tool_call family is stripped from content", () => {
  assert.equal(
    stripCfToolMarkup('<tool_call>\n<tool name="read">{"path":"/repo/a.py"}</tool>', TOOL_NAMES),
    ""
  );
  assert.equal(
    stripCfToolMarkup('<tool_call><read>{"path":"/repo/a.py"}</read></tool_call>', TOOL_NAMES),
    ""
  );
  assert.equal(stripCfToolMarkup('<tool_call>{"path":"/repo/a.py"}</tool_call>', TOOL_NAMES), "");
});

test("D4: orphan wrapper tags are stripped", () => {
  assert.equal(stripCfToolMarkup("<tool_call>\n", TOOL_NAMES), "");
  assert.equal(stripCfToolMarkup("<tool_call></tool_call>", TOOL_NAMES), "");
  assert.equal(stripCfToolMarkup('<tool-call><read>{"path":"x"}</read>', TOOL_NAMES), "");
});

test("D4: surrounding prose is preserved", () => {
  assert.equal(
    stripCfToolMarkup(
      'Let me read it.\n<tool_call>\n<tool name="read">{"path":"/repo/a.py"}</tool>',
      TOOL_NAMES
    ),
    // Trailing whitespace is deliberately preserved by this function (the
    // executor only nulls content that is *entirely* empty).
    "Let me read it.\n\n"
  );
});

// ── D8: the contract must not prime a real tool name ─────────────────────────

test("D8: the contract example uses a placeholder, not the caller's first tool", () => {
  const prompt = serializeCfToolPrompt(OPENCODE_OPENAI);
  const first = OPENCODE_TOOLS[0].name;
  assert.doesNotMatch(prompt, new RegExp(`<${first}>`));
  assert.match(prompt, /<TOOL>/);
  assert.match(prompt, /never inside the JSON/i);
});

test("D8: the reminder repeats the placeholder, not the caller's first tool", () => {
  const reminder = buildCfToolReminder(OPENCODE_OPENAI);
  assert.doesNotMatch(reminder, new RegExp(`<${OPENCODE_TOOLS[0].name}>\\{`));
  assert.match(reminder, /<TOOL>/);
});
