/* eslint-disable @typescript-eslint/no-explicit-any */
import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeIdentity, sanitizeText } from "../../open-sse/services/identitySanitizer.ts";

process.env.OMNIROUTE_SANITIZE_IDENTITY = "1";

const P =
  "You are a personal assistant running inside OpenClaw. ## OpenClaw Control\n<!-- openclaw:attempt:STABLE -->\nsee https://docs.openclaw.ai/x [OmniRoute Output Styles] run `openclaw gateway status` in /home/m/.openclaw/a";
const schema = {
  type: "object",
  required: ["id"],
  properties: { description: { type: "string", description: "OpenClaw id" } },
};
const clone = <T>(o: T): T => JSON.parse(JSON.stringify(o));
const stripDesc = (o: unknown) =>
  JSON.parse(JSON.stringify(o, (k, v) => (k === "description" && typeof v === "string" ? "" : v)));

const fmts: Record<string, any> = {
  openai: {
    messages: [
      { role: "system", content: P },
      { role: "user", content: "OpenClaw" },
    ],
    tools: [
      {
        type: "function",
        function: { name: "openclaw", description: "Via OpenClaw.", parameters: schema },
      },
    ],
  },
  claude: {
    system: [{ type: "text", text: P }],
    messages: [{ role: "user", content: "OpenClaw" }],
    tools: [{ name: "x", description: "OpenClaw", input_schema: schema }],
  },
  gemini: {
    systemInstruction: { parts: [{ text: P }] },
    contents: [{ role: "user", parts: [{ text: "OpenClaw" }] }],
    tools: [{ functionDeclarations: [{ name: "x", description: "OpenClaw", parameters: schema }] }],
  },
  responses: {
    instructions: P,
    input: [{ role: "user", content: "OpenClaw" }],
    tools: [{ type: "function", name: "x", description: "OpenClaw" }],
  },
  antigravity: {
    project: "p",
    request: {
      systemInstruction: { parts: [{ text: P }] },
      contents: [{ role: "user", parts: [{ text: "OpenClaw" }] }],
      tools: [
        { functionDeclarations: [{ name: "x", description: "OpenClaw", parameters: schema }] },
      ],
    },
  },
  kiro: {
    conversationState: {
      currentMessage: {
        userInputMessage: {
          content: "OpenClaw user",
          userInputMessageContext: {
            tools: [
              {
                toolSpecification: {
                  name: "x",
                  description: "OpenClaw",
                  inputSchema: { json: schema },
                },
              },
            ],
          },
        },
      },
    },
  },
};

for (const [name, body] of Object.entries(fmts)) {
  test(`identity sanitizer: ${name} is cleaned, pure and idempotent`, () => {
    const before = clone(body);
    const out = sanitizeIdentity(body);
    assert.deepEqual(body, before, "input must not be mutated");
    assert.notEqual(JSON.stringify(out), JSON.stringify(body));
    assert.deepEqual(sanitizeIdentity(out), out);
    const tools = (b: any) =>
      b.tools ??
      b.request?.tools ??
      b.conversationState.currentMessage.userInputMessage.userInputMessageContext.tools;
    assert.deepEqual(
      stripDesc(tools(out)),
      stripDesc(tools(body)),
      "only description strings may change"
    );
  });
}

test("identity sanitizer: user content, tool names, commands and paths are preserved", () => {
  const o = sanitizeIdentity(fmts.openai);
  assert.equal(o.messages[1].content, "OpenClaw");
  assert.equal(o.tools[0].function.name, "openclaw");
  assert.ok(o.messages[0].content.includes("`openclaw gateway status`"));
  assert.ok(o.messages[0].content.includes("/home/m/.openclaw/a"));
  assert.ok(!/OpenClaw|OmniRoute/.test(o.messages[0].content));
  assert.equal(
    sanitizeIdentity(fmts.kiro).conversationState.currentMessage.userInputMessage.content,
    "OpenClaw user"
  );
});

test("identity sanitizer: foreign payloads are returned as-is and system is never emptied", () => {
  for (const x of [null, undefined, 5, "x", [], {}, { messages: "no" }, { tools: [null, 1] }]) {
    assert.equal(sanitizeIdentity(x as any), x);
  }
  assert.ok(sanitizeText("OpenClaw OpenClaw").length > 0);
});

test("identity sanitizer: disabled unless OMNIROUTE_SANITIZE_IDENTITY is truthy", () => {
  process.env.OMNIROUTE_SANITIZE_IDENTITY = "0";
  assert.equal(sanitizeIdentity(fmts.openai), fmts.openai);
  delete process.env.OMNIROUTE_SANITIZE_IDENTITY;
  assert.equal(sanitizeIdentity(fmts.openai), fmts.openai);
  process.env.OMNIROUTE_SANITIZE_IDENTITY = "1";
});
