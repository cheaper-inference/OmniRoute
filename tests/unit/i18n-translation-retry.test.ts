import assert from "node:assert/strict";
import test from "node:test";
import { translateBody } from "../../scripts/i18n/run-translation.mjs";

type Message = { role: string; content: string };
const source = "## Limit\n\nKeep the literal `(token, IP)` unchanged.";
const invalid = "## Limite\n\nMantenha o literal `(token, endereço)` inalterado.";
const valid = "## Limite\n\nMantenha o literal `(token, IP)` inalterado.";
const locale = { code: "pt-BR", english: "Portuguese", native: "Português" };

function fixture(correctOnFeedback: boolean) {
  const requests: Message[][] = [];
  return {
    requests,
    backend: {
      model: "fixture",
      googleFallback: false,
      // Test the corrective conversation at the injected model boundary; a
      // live HTTP listener is not needed for this retry/validation contract.
      callChat: async (messages: Message[]) => {
        requests.push(structuredClone(messages));
        const feedback = messages
          .slice(2)
          .some(
            (message) => message.role === "user" && message.content.includes("inline code changed")
          );
        return correctOnFeedback && feedback ? valid : invalid;
      },
    },
  };
}

test("translation retry supplies validation feedback and preserves the literal", async () => {
  const { backend, requests } = fixture(true);
  assert.equal(await translateBody(source, locale, backend), valid);
  assert.equal(requests.length, 2);
  assert.equal(requests[1][1].content, source);
  assert.ok(
    requests[1].some((message) => message.role === "assistant" && message.content === invalid)
  );
  assert.ok(
    requests[1].some(
      (message) => message.role === "user" && message.content.includes("`(token, IP)`")
    )
  );
});

test("translation retry still rejects content that remains invalid", async () => {
  const { backend, requests } = fixture(false);
  await assert.rejects(
    translateBody(source, locale, backend),
    /failed validation: inline code changed/
  );
  assert.equal(requests.length, 3);
});
