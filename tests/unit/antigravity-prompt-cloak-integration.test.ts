/**
 * Integration of the full cloak.mjs port into the Antigravity HTTP executor:
 * the systemInstruction path rewords every TURNED_AWAY signature (not only the
 * four the older strip removed), the user turns get USER_TURNED_AWAY reworded,
 * and a bare 429 "Resource has been exhausted" carries the turned-away-prompt
 * hint so operators stop waiting out a quota that was never spent.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  AntigravityExecutor,
  cloakAntigravityUserContents,
  normalizeAntigravitySystemInstruction,
} from "../../open-sse/executors/antigravity.ts";
import { buildAntigravityUpstreamError } from "../../open-sse/executors/antigravityUpstreamError.ts";

type Envelope = {
  request: {
    systemInstruction?: { parts: Array<{ text?: string }> };
    contents?: unknown[];
    [key: string]: unknown;
  };
};

async function transform(model: string, body: Record<string, unknown>): Promise<Envelope> {
  const executor = new AntigravityExecutor();
  const result = await executor.transformRequest(model, body, true, { projectId: "project-1" });
  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  return result as unknown as Envelope;
}

// The eight signatures the old four-pattern strip never recognised.
// "You are Claude Code" is deliberately absent: the legacy strip removes that
// line (COMPETITIVE_AGENT_PROMPT_PATTERNS, #10420) before cloak runs, and its
// own suite pins that removal. Either way the wording never reaches upstream.
const NEW_SIGNATURES: Array<[string, RegExp]> = [
  ["You are Hermes Agent, built by Nous Research.", /You're Hermes Agent/],
  ["You are OpenCode, an interactive CLI tool.", /You're OpenCode/],
  [
    "You are a coding agent running in the Codex CLI.",
    /You're a coding agent running in the Codex CLI/,
  ],
  ["You are a coding assistant running inside pi, a coding agent harness.", /running within pi/],
  [
    "You are an AI agent powered by DeepSeek Harness.",
    /You're an AI agent powered by DeepSeek Harness/,
  ],
  ["RFC 2119 keywords: MUST, REQUIRED, SHOULD, RECOMMENDED, MAY, OPTIONAL.", /RFC 2119 key words/],
  ["You are Codex, an agent based on GPT-5.", /built on GPT-5/],
];

for (const model of ["gemini-3.8-flash-high", "antigravity/claude-opus-4-8-thinking"]) {
  for (const [line, expected] of NEW_SIGNATURES) {
    test(`${model}: rewrites the turned-away line "${line.slice(0, 42)}…"`, async () => {
      const envelope = await transform(model, {
        request: {
          systemInstruction: { role: "user", parts: [{ text: `${line}\nAnswer concisely.` }] },
          contents: [{ role: "user", parts: [{ text: "hi" }] }],
          generationConfig: {},
        },
      });
      const text = envelope.request.systemInstruction?.parts.map((p) => p.text).join("\n") ?? "";
      assert.match(text, expected);
      assert.equal(text.includes(line), false, "the turned-away wording must be gone");
      assert.equal(text.includes("Answer concisely."), true, "instruction text must survive");
    });
  }
}

test("normalizeAntigravitySystemInstruction drops the billing line and keeps the rest", () => {
  const out = normalizeAntigravitySystemInstruction({
    parts: [{ text: "x-anthropic-billing-header: cc_version=2.1.325; cch=abc\nUse the tools." }],
  }) as { parts: Array<{ text: string }> };
  assert.equal(out.parts[0].text.includes("x-anthropic-billing-header"), false);
  assert.equal(out.parts[0].text.includes("Use the tools."), true);
});

test("normalizeAntigravitySystemInstruction rewrites the DeepSeek Harness @-path paragraph", () => {
  const from =
    'Tokens prefixed with @ are paths the user explicitly referenced. Relative paths resolve from the workspace root; absolute paths identify files or directories on the host. A trailing slash marks a directory: list it when its contents matter. Anything else is a file: use the read tool when its contents are needed, and do not claim to have inspected it before reading. @"..." quotes a path containing spaces.';
  const out = normalizeAntigravitySystemInstruction({ parts: [{ text: from }] }) as {
    parts: Array<{ text: string }>;
  };
  assert.match(out.parts[0].text, /When the user writes @ followed by a path/);
});

test("user turns get the Codex GPT-5 lines reworded, other identities kept", async () => {
  const envelope = await transform("gemini-3.8-flash-high", {
    request: {
      systemInstruction: { role: "user", parts: [{ text: "Be brief." }] },
      contents: [
        {
          role: "user",
          parts: [
            { text: "You are Hermes Agent, built by Nous Research." },
            { text: "You are Codex, an agent based on GPT-5." },
          ],
        },
      ],
      generationConfig: {},
    },
  });
  const parts = (envelope.request.contents?.[0] as { parts: Array<{ text?: string }> }).parts;
  // Hermes goes through as written in a user turn (3 of 3 verified).
  assert.equal(parts[0].text, "You are Hermes Agent, built by Nous Research.");
  // Codex's GPT-5 line does not.
  assert.equal(parts[1].text, "You are Codex, an agent built on GPT-5.");
});

test("cloakAntigravityUserContents leaves non-text parts and clean content untouched", () => {
  const nonText = { inlineData: { mimeType: "image/png", data: "x" } };
  const call = { functionCall: { name: "t", args: { a: 1 } } };
  const clean = [{ role: "user", parts: [{ text: "hi" }, nonText, call] }];
  assert.strictEqual(cloakAntigravityUserContents(clean), clean);

  const dirty = [
    { role: "user", parts: [{ text: "You are Codex, an agent based on GPT-5." }, nonText, call] },
  ];
  const out = cloakAntigravityUserContents(dirty) as Array<{
    parts: Array<Record<string, unknown>>;
  }>;
  assert.equal(out[0].parts[0].text, "You are Codex, an agent built on GPT-5.");
  assert.strictEqual(out[0].parts[1], nonText);
  assert.strictEqual(out[0].parts[2], call);
  // The input is never mutated.
  assert.equal(
    (dirty[0].parts[0] as { text: string }).text,
    "You are Codex, an agent based on GPT-5."
  );
});

test("a bare 429 on a turned-away prompt carries the not-a-quota hint", () => {
  const body = JSON.stringify({
    error: {
      code: 429,
      message: "Resource has been exhausted (e.g. check quota).",
      status: "RESOURCE_EXHAUSTED",
    },
  });
  const error = buildAntigravityUpstreamError(
    429,
    "Too Many Requests",
    body,
    "You are OpenCode, an agent."
  );
  assert.match(error.error.message, /resource has been exhausted/i);
  assert.match(error.error.message, /not a quota and waiting won't help/);
  assert.match(error.error.message, /OpenCode/);
});

test("a bare 429 on a clean prompt gets no refused-prompt hint", () => {
  const body = JSON.stringify({
    error: {
      code: 429,
      message: "Resource has been exhausted (e.g. check quota).",
      status: "RESOURCE_EXHAUSTED",
    },
  });
  const error = buildAntigravityUpstreamError(
    429,
    "Too Many Requests",
    body,
    "You are a careful reviewer."
  );
  assert.match(error.error.message, /resource has been exhausted/i);
  assert.equal(error.error.message.includes("not a quota and waiting won't help"), false);
});

test("a non-429 never carries the refused-prompt hint", () => {
  const body = JSON.stringify({ error: { code: 500, message: "Resource has been exhausted" } });
  const error = buildAntigravityUpstreamError(
    500,
    "Internal Server Error",
    body,
    "You are OpenCode."
  );
  assert.equal(error.error.message.includes("not a quota and waiting won't help"), false);
});
