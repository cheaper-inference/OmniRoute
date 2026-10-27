/**
 * Competitive system-prompt strip (port of decolua/9router b566b20,
 * generalized): Antigravity's server-side filter flags system prompts
 * advertising competing agents ("You are a Claude agent, built on
 * Anthropic's Claude Agent SDK.") and answers with 429 RESOURCE_EXHAUSTED.
 * The strip removes the identity sentences before dispatch.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  AntigravityExecutor,
  normalizeAntigravitySystemInstruction,
  stripCompetitiveAgentPrompts,
} from "../../open-sse/executors/antigravity.ts";

test("strips the exact Claude Agent SDK identity line (9router b566b20 case)", () => {
  const input = {
    parts: [{ text: "You are a Claude agent, built on Anthropic's Claude Agent SDK." }],
  };
  const out = stripCompetitiveAgentPrompts(input) as { parts: Array<{ text: string }> };
  assert.equal(out.parts[0].text, "");
});

test("keeps the instruction text that follows the identity sentence", () => {
  const input = {
    parts: [
      {
        text:
          "You are a Claude agent, built on Anthropic's Claude Agent SDK.\n" +
          "Answer concisely and cite sources.",
      },
    ],
  };
  const out = stripCompetitiveAgentPrompts(input) as { parts: Array<{ text: string }> };
  assert.equal(out.parts[0].text, "Answer concisely and cite sources.");
});

test("strips 'You are Claude Code' and Anthropic-created assistant lines", () => {
  const input = { parts: [{ text: "You are Claude Code, an agentic coding tool." }] };
  const out = stripCompetitiveAgentPrompts(input) as { parts: Array<{ text: string }> };
  assert.equal(out.parts[0].text, "");
});

test("leaves ordinary system prompts untouched (same reference, no allocation)", () => {
  const input = { parts: [{ text: "You are a helpful assistant. Be concise." }] };
  const out = stripCompetitiveAgentPrompts(input);
  assert.strictEqual(out, input, "must return the original reference when nothing matched");
});

test("only rewrites matching parts in a multi-part system instruction", () => {
  const input = {
    parts: [
      { text: "You are a Claude agent, built on Anthropic's Claude Agent SDK." },
      { text: "Use the tools when available." },
    ],
  };
  const out = stripCompetitiveAgentPrompts(input) as { parts: Array<{ text: string }> };
  assert.equal(out.parts[0].text, "");
  assert.equal(out.parts[1].text, "Use the tools when available.");
});

test("returns the input unchanged for non-systemInstruction shapes", () => {
  const input = { contents: [{ role: "user", parts: [{ text: "hi" }] }] };
  assert.strictEqual(stripCompetitiveAgentPrompts(input), input);
  assert.strictEqual(stripCompetitiveAgentPrompts(null), null);
  assert.strictEqual(stripCompetitiveAgentPrompts(undefined), undefined);
});

// ── Oh My Pi (OMP) harness marker normalization ──────────────────────────────
// Large OMP agent prompts routed to Antigravity get a false 429 RESOURCE_EXHAUSTED.
// The normalizer neutralizes the harness tags/branding in systemInstruction text only,
// on both the Claude and the Gemini branches, and drops the used_claude* telemetry keys.

const RFC_LINE = "RFC 2119: MUST, REQUIRED, SHOULD, RECOMMENDED, MAY, OPTIONAL.";
const OMP_SYSTEM = [
  "<SyStEm-Conventions>",
  RFC_LINE,
  "</system_conventions>",
  "<SYSTEM_directive>Directive body.</system-directive>",
  "<CrItIcAl>Critical body.</CRITICAL>",
  "Oh My Pi coding harness; Oh My Pi; omp Live",
].join("\n");
const OUTSIDE_MARKER = "<critical> outside instruction data Oh My Pi omp Live <system-conventions>";

type Part = { text?: unknown; [key: string]: unknown };
type Envelope = {
  requestType?: string;
  labels?: Record<string, unknown>;
  request: {
    systemInstruction?: { parts: Part[]; [key: string]: unknown };
    contents?: Array<{ role: string; parts: Array<Record<string, unknown>> }>;
    labels?: Record<string, unknown>;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

function assertNeutralized(text: unknown) {
  assert.equal(typeof text, "string");
  const value = text as string;
  assert.match(value, /<conventions>/);
  assert.match(value, /<\/conventions>/);
  assert.match(value, /<instructions>Directive body\.<\/instructions>/);
  assert.match(value, /<important>Critical body\.<\/important>/);
  assert.ok(value.includes(RFC_LINE), "instruction body must survive");
  assert.ok(value.includes("AI coding assistant; coding assistant; coding assistant live"));
  assert.doesNotMatch(value, /<\/?system[-_](conventions|directive)>/i);
  assert.doesNotMatch(value, /<\/?critical>/i);
  assert.doesNotMatch(value, /Oh My Pi|omp Live/i);
}

function ompBody(): Record<string, unknown> {
  return {
    used_claude: "root telemetry",
    used_claude_conservative: "root conservative telemetry",
    labels: {
      used_claude: "root label",
      used_claude_conservative: "root conservative label",
      keep: "root label kept",
    },
    request: {
      used_claude: "request telemetry",
      used_claude_conservative: "request conservative telemetry",
      labels: {
        used_claude: "request label",
        used_claude_conservative: "request conservative label",
        keep: "request label kept",
      },
      systemInstruction: { role: "user", parts: [{ text: OMP_SYSTEM }] },
      contents: [
        {
          role: "user",
          parts: [
            { text: OUTSIDE_MARKER },
            { functionCall: { name: "marker_tool", args: { prompt: OUTSIDE_MARKER } } },
          ],
        },
        {
          role: "user",
          parts: [{ functionResponse: { name: "marker_tool", response: { r: OUTSIDE_MARKER } } }],
        },
      ],
      generationConfig: {},
    },
  };
}

async function transform(model: string, body: Record<string, unknown>): Promise<Envelope> {
  const executor = new AntigravityExecutor();
  const result = await executor.transformRequest(model, body, true, { projectId: "project-1" });
  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  return result as unknown as Envelope;
}

test("normalizeAntigravitySystemInstruction rewrites OMP tags and branding", () => {
  const input = { parts: [{ text: OMP_SYSTEM, keep: "meta" }] };
  const out = normalizeAntigravitySystemInstruction(input) as { parts: Part[] };
  assertNeutralized(out.parts[0].text);
  assert.equal(out.parts[0].keep, "meta");
  assert.equal(input.parts[0].text, OMP_SYSTEM, "input must not be mutated");
});

test("normalizeAntigravitySystemInstruction keeps non-text parts and the legacy alias", () => {
  const nonText = { inlineData: { mimeType: "image/png", data: "x" } };
  const nonString = { text: 42 };
  const input = { parts: [nonText, nonString, { text: "<critical>x</critical>" }] };
  const out = normalizeAntigravitySystemInstruction(input) as { parts: Part[] };
  assert.strictEqual(out.parts[0], nonText);
  assert.strictEqual(out.parts[1], nonString);
  assert.equal(out.parts[2].text, "<important>x</important>");
  assert.strictEqual(stripCompetitiveAgentPrompts, normalizeAntigravitySystemInstruction);
});

for (const model of ["antigravity/claude-opus-4-8-thinking", "gemini-3.8-flash-high"]) {
  test(`${model}: systemInstruction OMP markers are normalized in the envelope`, async () => {
    const envelope = await transform(model, ompBody());
    assertNeutralized(envelope.request.systemInstruction?.parts[0].text);
  });

  test(`${model}: user turns and tool args/results are not rewritten`, async () => {
    const envelope = await transform(model, ompBody());
    const serialized = JSON.stringify(envelope.request.contents);
    const contents = envelope.request.contents ?? [];
    assert.equal(contents[0].parts[0].text, OUTSIDE_MARKER);
    assert.deepEqual(contents[0].parts[1].functionCall, {
      name: "marker_tool",
      args: { prompt: OUTSIDE_MARKER },
    });
    assert.ok(serialized.includes(JSON.stringify({ r: OUTSIDE_MARKER })));
  });

  test(`${model}: used_claude telemetry keys are stripped, other labels kept`, async () => {
    const envelope = await transform(model, ompBody());
    assert.equal("used_claude" in envelope, false);
    assert.equal("used_claude_conservative" in envelope, false);
    assert.deepEqual(envelope.labels, { keep: "root label kept" });
    assert.equal("used_claude" in envelope.request, false);
    assert.equal("used_claude_conservative" in envelope.request, false);
    if (envelope.request.labels !== undefined) {
      assert.deepEqual(envelope.request.labels, { keep: "request label kept" });
    }
  });

  test(`${model}: requestType stays "agent" by default (gated, #2055/#8013)`, async () => {
    const envelope = await transform(model, { ...ompBody(), requestType: "agent" });
    assert.equal(envelope.requestType, "agent");
    const implicit = await transform(model, ompBody());
    assert.equal(implicit.requestType, "agent");
  });
}

test("gemini branch keeps the systemInstruction reference when nothing matches", async () => {
  const systemInstruction = { role: "user", parts: [{ text: "You are a helpful assistant." }] };
  const envelope = await transform("gemini-3.8-flash-high", {
    request: {
      systemInstruction,
      contents: [{ role: "user", parts: [{ text: "hi" }] }],
      generationConfig: {},
    },
  });
  assert.strictEqual(envelope.request.systemInstruction, systemInstruction);
});
