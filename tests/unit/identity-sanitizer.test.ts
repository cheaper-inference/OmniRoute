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

type Body = Record<string, unknown>;
type Msg = { content: string };
type Tool = { function: { name: string } };
type OpenAI = { messages: Msg[]; tools: Tool[] };

const fmts: Record<string, Body> = {
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
    const tools = (b: Body): unknown => {
      const req = b.request as Body | undefined;
      const ctx = (
        (b.conversationState as Body | undefined)?.currentMessage as
          { userInputMessage: { userInputMessageContext: Body } } | undefined
      )?.userInputMessage.userInputMessageContext;
      return b.tools ?? req?.tools ?? ctx?.tools;
    };
    assert.deepEqual(
      stripDesc(tools(out)),
      stripDesc(tools(body)),
      "only description strings may change"
    );
  });
}

test("identity sanitizer: user content, tool names, commands and paths are preserved", () => {
  const o = sanitizeIdentity(fmts.openai) as unknown as OpenAI;
  assert.equal(o.messages[1].content, "OpenClaw");
  assert.equal(o.tools[0].function.name, "openclaw");
  assert.ok(o.messages[0].content.includes("`openclaw gateway status`"));
  assert.ok(o.messages[0].content.includes("/home/m/.openclaw/a"));
  assert.ok(!/OpenClaw|OmniRoute/.test(o.messages[0].content));
  assert.equal(
    (
      sanitizeIdentity(fmts.kiro).conversationState as {
        currentMessage: { userInputMessage: Msg };
      }
    ).currentMessage.userInputMessage.content,
    "OpenClaw user"
  );
});

test("identity sanitizer: foreign payloads are returned as-is and system is never emptied", () => {
  for (const x of [null, undefined, 5, "x", [], {}, { messages: "no" }, { tools: [null, 1] }]) {
    assert.equal(sanitizeIdentity(x), x);
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

test("identity sanitizer: code spans, lookalike hosts, bare apex and schema instance values", () => {
  const t = sanitizeText(
    "OpenClaw docs https://openclaw.ai/a and https://openclaw.ai.evil.test/x and https://evil.test/?u=docs.openclaw.ai ok `run OpenClaw now` end"
  );
  assert.ok(t.includes("`run OpenClaw now`"));
  assert.ok(!t.includes("https://openclaw.ai/a"));
  assert.ok(t.includes("https://openclaw.ai.evil.test/x"));
  assert.ok(t.includes("https://evil.test/?u=docs.openclaw.ai"));
  const tool = {
    name: "x",
    description: "OpenClaw tool",
    input_schema: {
      type: "object",
      properties: {
        mode: { type: "string", enum: ["OpenClaw"], default: "OpenClaw", description: "OpenClaw" },
        description: { type: "string", description: "OpenClaw field" },
        cfg: {
          type: "object",
          enum: [{ description: "OpenClaw" }],
          default: { description: "OpenClaw" },
        },
      },
    },
  };
  const out = sanitizeIdentity({ tools: [tool] }) as { tools: (typeof tool)[] };
  const p = out.tools[0].input_schema.properties;
  assert.equal(out.tools[0].description, "the platform tool");
  assert.deepEqual(p.mode.enum, ["OpenClaw"]);
  assert.equal(p.mode.default, "OpenClaw");
  assert.equal(p.mode.description, "the platform");
  assert.equal(p.description.description, "the platform field");
  assert.deepEqual(p.cfg.enum, [{ description: "OpenClaw" }]);
  assert.deepEqual(p.cfg.default, { description: "OpenClaw" });
});
