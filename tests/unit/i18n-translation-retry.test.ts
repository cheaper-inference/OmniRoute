import assert from "node:assert/strict";
import test from "node:test";
import { resetLlmCircuit } from "../../scripts/i18n/lib/translate-backend.mjs";
import { translateBody } from "../../scripts/i18n/run-translation.mjs";

type Message = { role: string; content: string };
const source = "## Limit\n\nKeep the literal `(token, IP)` unchanged.";
const invalid = "## Limite\n\nMantenha o literal `(token, endereço)` inalterado.";
const valid = "## Limite\n\nMantenha o literal `(token, IP)` inalterado.";
const googleValid = "## Limite\n\nConserve o literal `(token, IP)` inalterado.";
const locale = { code: "pt-BR", english: "Portuguese", native: "Português" };

function fixture(correctOnFeedback: boolean, googleFallback = false) {
  const requests: Message[][] = [];
  const googleCalls: string[] = [];
  return {
    requests,
    googleCalls,
    backend: {
      model: "fixture",
      googleFallback,
      googleTranslate: async (chunk: string) => {
        googleCalls.push(chunk);
        return googleValid;
      },
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

test("translation retry supplies validation feedback and preserves the literal", async (t) => {
  resetLlmCircuit();
  t.after(resetLlmCircuit);
  const { backend, requests, googleCalls } = fixture(true);
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
  assert.deepEqual(googleCalls, []);
});

test("a corrected retry never reaches the Google fallback even when it is enabled", async (t) => {
  resetLlmCircuit();
  t.after(resetLlmCircuit);
  const { backend, requests, googleCalls } = fixture(true, true);
  assert.equal(await translateBody(source, locale, backend), valid);
  assert.equal(requests.length, 2);
  assert.deepEqual(googleCalls, []);
});

test("translation that stays invalid after feedback retries falls back to Google", async (t) => {
  resetLlmCircuit();
  t.after(resetLlmCircuit);
  const { backend, requests, googleCalls } = fixture(false, true);
  assert.equal(await translateBody(source, locale, backend), googleValid);
  // The whole corrective retry budget is spent before the fallback engages.
  assert.equal(requests.length, 3);
  assert.ok(
    requests[2].some((message) => message.role === "assistant" && message.content === invalid)
  );
  assert.deepEqual(googleCalls, [source]);
});

test("an invalid Google answer is still rejected after the fallback", async (t) => {
  resetLlmCircuit();
  t.after(resetLlmCircuit);
  const { backend, requests } = fixture(false, true);
  await assert.rejects(
    translateBody(source, locale, { ...backend, googleTranslate: async () => invalid }),
    /failed validation \(google\): inline code changed/
  );
  assert.equal(requests.length, 3);
});

test("with the Google fallback opted out, content that remains invalid is rejected", async (t) => {
  resetLlmCircuit();
  t.after(resetLlmCircuit);
  const { backend, requests, googleCalls } = fixture(false, false);
  await assert.rejects(
    translateBody(source, locale, backend),
    /failed validation: inline code changed/
  );
  assert.equal(requests.length, 3);
  assert.deepEqual(googleCalls, []);
});
