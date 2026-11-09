import test from "node:test";
import assert from "node:assert/strict";
import { translateBody, translateChunk } from "../../scripts/i18n/run-translation.mjs";

const source = "## Limit\n\nKeep the literal `(token, IP)` unchanged.";
const invalid = "## Limite\n\nMantenha o literal `(token, endereço)` inalterado.";
const valid = "## Limite\n\nMantenha o literal `(token, IP)` inalterado.";

test("chunk retries include the rejected answer and the source literal in corrective feedback", async () => {
  const requests = [];
  const result = await translateChunk(
    source,
    "system",
    { model: "fixture" },
    {
      call: async (messages) => {
        requests.push(structuredClone(messages));
        return requests.length === 1 ? invalid : valid;
      },
    }
  );
  assert.equal(result, valid);
  assert.equal(requests.length, 2);
  assert.equal(requests[1][1].content, source);
  assert.deepEqual(requests[1][2], { role: "assistant", content: invalid });
  assert.equal(requests[1][3].role, "user");
  assert.match(requests[1][3].content, /inline code changed: `\(token, IP\)`/);
});

for (const correctOnFeedback of [true, false]) {
  test(`translateBody preserves the corrective retry contract (corrected=${correctOnFeedback})`, async (t) => {
    const requests = [];
    // The HTTP boundary is replaced entirely; no socket or provider is involved.
    t.mock.method(globalThis, "fetch", async (url, options) => {
      assert.equal(url, "https://translation-fixture.invalid/chat/completions");
      const { messages } = JSON.parse(options.body);
      requests.push(messages);
      const hasFeedback = messages
        .slice(2)
        .some(
          (message) => message.role === "user" && message.content.includes("inline code changed")
        );
      return {
        ok: true,
        json: async () => ({
          choices: [{ message: { content: correctOnFeedback && hasFeedback ? valid : invalid } }],
        }),
      };
    });
    const backend = {
      apiUrl: "https://translation-fixture.invalid",
      apiKey: "fixture-only",
      model: "fixture",
      googleFallback: false, // This fixture verifies the LLM-only corrective retry contract.
      timeoutMs: 5000,
    };
    const locale = { code: "pt-BR", english: "Portuguese", native: "Português" };
    if (correctOnFeedback) {
      assert.equal(await translateBody(source, locale, backend), valid);
      assert.equal(requests.length, 2);
      assert.equal(requests[1][1].content, source);
      assert.deepEqual(requests[1][2], { role: "assistant", content: invalid });
      assert.match(requests[1][3].content, /inline code changed: `\(token, IP\)`/);
    } else {
      await assert.rejects(
        translateBody(source, locale, backend),
        /failed validation: inline code changed/
      );
      assert.equal(requests.length, 3);
    }
  });
}

test("an indivisible fenced chunk fails without sending incomplete code fragments", async () => {
  const code = ["```markdown", "x".repeat(1800), "## inside code", "y".repeat(1800), "```"].join(
    "\n"
  );
  const inputs = [];
  await assert.rejects(
    translateChunk(
      code,
      "system",
      { model: "fixture" },
      {
        call: async (messages) => {
          inputs.push(messages[1].content);
          return "truncated";
        },
      }
    ),
    /failed validation/
  );
  assert.deepEqual(inputs, [code, code, code]);
});
