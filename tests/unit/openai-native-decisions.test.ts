import assert from "node:assert/strict";
import test from "node:test";
import {
  handleOpenAIDecisions,
  openaiDecisionSchema,
} from "../../open-sse/handlers/openaiDecisions.ts";

const request = openaiDecisionSchema.parse({
  model: "openai/gpt-6-luna",
  input: "Damaged parcel",
  questions: [{ name: "damaged", type: "predicate", instructions: "Is it damaged?" }],
});
test("forwards OpenClaw's named questions and preserves native answers", async () => {
  const answer = { answers: [{ name: "damaged", type: "predicate", probability: 0.99 }] };
  const response = await handleOpenAIDecisions(
    request,
    { apiKey: "test-key" },
    new AbortController().signal,
    async (url, init) => {
      assert.equal(url, "https://api.openai.com/v1/decisions");
      assert.equal(new Headers(init?.headers).get("authorization"), "Bearer test-key");
      assert.deepEqual(JSON.parse(String(init?.body)), { ...request, model: "gpt-6-luna" });
      return Response.json(answer);
    }
  );
  assert.deepEqual(await response.json(), answer);
});
test("rejects another provider and the System One request shape", () => {
  assert.equal(
    openaiDecisionSchema.safeParse({ ...request, model: "openrouter/openai/gpt-6-luna" }).success,
    false
  );
  assert.equal(
    openaiDecisionSchema.safeParse({ ...request, questions: { flag: { type: "noul" } } }).success,
    false
  );
});
test("transport failures return a sanitized error", async () => {
  const response = await handleOpenAIDecisions(
    request,
    { apiKey: "test-key" },
    new AbortController().signal,
    async () => {
      throw Error("private stack");
    }
  );
  assert.equal(response.status, 502);
  assert.doesNotMatch(await response.text(), /private stack/);
});
