import assert from "node:assert/strict";
import { after, describe, it } from "node:test";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

after(() => resetDbInstance());

// These providers used the common fallback before native DeepSeek support.
// Keep this regression portable to branches without the native DeepSeek gate.
describe("JSON schema fallback system content arrays", () => {
  for (const provider of ["openai-compatible-chat-fixture", "kilocode"]) {
    for (const frozen of [false, true]) {
      it(`${provider} preserves ${frozen ? "frozen" : "mutable"} caller content across repeated transforms`, () => {
        const schema = {
          type: "object",
          properties: { ok: { type: "boolean" } },
          required: ["ok"],
        };
        const content = [
          { type: "text", text: "Keep the first instruction." },
          { type: "text", text: "Keep the second instruction." },
        ];
        if (frozen) {
          content.forEach(Object.freeze);
          Object.freeze(content);
        }
        const body = {
          model: "fixture-model",
          messages: [
            { role: "system", content },
            { role: "user", content: "Return the result." },
          ],
          response_format: { type: "json_schema", json_schema: { name: "fixture", schema } },
        };
        const before = structuredClone(body);
        const executor = new DefaultExecutor(provider);

        const result = executor.transformRequest("fixture-model", body, false, {}) as typeof body;

        assert.deepEqual(body, before);
        assert.deepEqual(
          result.response_format,
          provider === "kilocode" ? undefined : { type: "json_object" }
        );
        assert.equal(result.messages.filter((message) => message.role === "system").length, 1);
        const transformedContent = result.messages[0].content;
        assert.ok(Array.isArray(transformedContent));
        assert.notStrictEqual(transformedContent, content);
        assert.equal(transformedContent.length, content.length + 1);
        assert.deepEqual(transformedContent.slice(0, -1), content);
        assert.equal(transformedContent.at(-1)?.type, "text");
        assert.match(String(transformedContent.at(-1)?.text), /strictly follows this JSON schema/);
        assert.ok(
          String(transformedContent.at(-1)?.text).includes(JSON.stringify(schema, null, 2))
        );
        assert.deepEqual(result.messages[1], before.messages[1]);

        const repeated = executor.transformRequest("fixture-model", body, false, {}) as typeof body;
        assert.deepEqual(repeated.messages, result.messages);
        assert.deepEqual(body, before);
      });
    }
  }
});
