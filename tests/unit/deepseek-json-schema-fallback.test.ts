import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// The native `deepseek` provider (alias `ds/`) documents only
// `response_format: { type: "json_object" }`; a `json_schema` request is
// answered with HTTP 400 "This response_format type is unavailable now".
// The default executor must downgrade it to `json_object` and carry the
// schema in the system prompt (which also satisfies DeepSeek's rule that the
// prompt must mention "json").

type RequestBody = Record<string, unknown>;
type Message = { role: string; content: unknown };
type TransformedBody = Record<string, unknown> & {
  messages?: Message[];
  response_format?: unknown;
};

function transform(provider: string, model: string, body: RequestBody) {
  const executor = new DefaultExecutor(provider);
  return executor.transformRequest(model, body, false, {}) as TransformedBody;
}

const schema = {
  type: "object",
  properties: { ok: { type: "boolean" } },
  required: ["ok"],
};

describe("native DeepSeek json_schema fallback", () => {
  it("downgrades json_schema to json_object and injects the schema into a fresh system prompt", () => {
    const body = {
      model: "deepseek-v4-flash",
      messages: [{ role: "user", content: "x" }],
      response_format: {
        type: "json_schema",
        json_schema: { name: "t", schema },
      },
    };

    const result = transform("deepseek", "deepseek-v4-flash", body);

    assert.deepEqual(result.response_format, { type: "json_object" });
    const messages = result.messages ?? [];
    assert.equal(messages.length, 2);
    assert.equal(messages[0].role, "system");
    const systemText = String(messages[0].content);
    assert.match(systemText, /JSON/);
    assert.ok(systemText.includes(JSON.stringify(schema, null, 2)));
    assert.deepEqual(messages[1], { role: "user", content: "x" });
    // The caller's body is not mutated.
    assert.equal(body.response_format.type, "json_schema");
    assert.equal(body.messages.length, 1);
  });

  it("appends the schema prompt to an existing system message instead of adding a second one", () => {
    const body = {
      model: "deepseek-v4-pro",
      messages: [
        { role: "system", content: "You are concise." },
        { role: "user", content: "x" },
      ],
      response_format: {
        type: "json_schema",
        json_schema: { name: "t", schema },
      },
    };

    const result = transform("deepseek", "deepseek-v4-pro", body);

    assert.deepEqual(result.response_format, { type: "json_object" });
    const messages = result.messages ?? [];
    assert.equal(messages.filter((m) => m.role === "system").length, 1);
    const systemText = String(messages[0].content);
    assert.match(systemText, /^You are concise\./);
    assert.match(systemText, /strictly follows this JSON schema/);
    assert.equal(body.messages[0].content, "You are concise.");
  });

  it("leaves a json_object response_format untouched (DeepSeek accepts it natively)", () => {
    const body = {
      model: "deepseek-v4-flash",
      messages: [{ role: "user", content: "return json" }],
      response_format: { type: "json_object" },
    };

    const result = transform("deepseek", "deepseek-v4-flash", body);

    assert.deepEqual(result.response_format, { type: "json_object" });
    assert.equal(result.messages?.length, 1);
    assert.equal(result.messages?.[0].role, "user");
  });

  it("leaves a text response_format untouched (no JSON prompt injected)", () => {
    const result = transform("deepseek", "deepseek-v4-flash", {
      model: "deepseek-v4-flash",
      messages: [{ role: "user", content: "x" }],
      response_format: { type: "text" },
    });

    assert.deepEqual(result.response_format, { type: "text" });
    assert.equal(result.messages?.length, 1);
    assert.equal(result.messages?.[0].role, "user");
  });

  it("downgrades a schema-less json_schema to json_object with a generic JSON prompt", () => {
    const result = transform("deepseek", "deepseek-v4-flash", {
      model: "deepseek-v4-flash",
      messages: [{ role: "user", content: "x" }],
      response_format: { type: "json_schema", json_schema: { name: "t" } },
    });

    assert.deepEqual(result.response_format, { type: "json_object" });
    assert.equal(result.messages?.[0].role, "system");
    assert.match(String(result.messages?.[0].content), /valid JSON only/);
  });

  it("is a no-op when no response_format is sent (Responses / Anthropic alternate bodies)", () => {
    const responsesBody = {
      model: "deepseek-v4-flash",
      input: "x",
      text: { format: { type: "json_schema", name: "t", schema } },
    };
    const responsesResult = transform("deepseek", "deepseek-v4-flash", responsesBody);
    assert.equal(responsesResult.response_format, undefined);
    assert.deepEqual(responsesResult.text, responsesBody.text);
    assert.equal(responsesResult.messages, undefined);

    const chatBody = {
      model: "deepseek-v4-flash",
      messages: [{ role: "user", content: "x" }],
    };
    const chatResult = transform("deepseek", "deepseek-v4-flash", chatBody);
    assert.equal(chatResult.response_format, undefined);
    assert.equal(chatResult.messages?.length, 1);
  });

  it("keeps the native json_schema path for OpenAI (Structured Outputs)", () => {
    const responseFormat = {
      type: "json_schema",
      json_schema: { name: "t", schema },
    };
    const result = transform("openai", "gpt-4.1", {
      model: "gpt-4.1",
      messages: [{ role: "user", content: "x" }],
      response_format: responseFormat,
    });

    assert.deepEqual(result.response_format, responseFormat);
    assert.equal(result.messages?.length, 1);
  });

  it("still strips response_format entirely for kilocode", () => {
    const result = transform("kilocode", "deepseek/deepseek-v4-flash", {
      model: "deepseek/deepseek-v4-flash",
      messages: [{ role: "user", content: "x" }],
      response_format: { type: "json_schema", json_schema: { name: "t", schema } },
    });

    assert.equal(result.response_format, undefined);
    assert.equal(result.messages?.[0].role, "system");
  });
});
