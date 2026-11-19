import assert from "node:assert/strict";
import test from "node:test";
import {
  geminiDecisionSchema,
  handleGeminiDecisions,
} from "../../open-sse/handlers/geminiDecisions.ts";
const request = geminiDecisionSchema.parse({
  model: "gemini/gemini-decision-1",
  input: "Damaged parcel",
  questions: { damaged: { type: "noul", instructions: "Is it damaged?" } },
});
test("sends the native Google SDK contract directly to Gemini", async () => {
  const answers = { damaged: { type: "noul", noul: 0.95, confidence: 0.95 } };
  const result = await handleGeminiDecisions(
    request,
    { apiKey: "test-key" },
    new AbortController().signal,
    async (url, init) => {
      assert.equal(url, "https://generativelanguage.googleapis.com/v1beta/decisions");
      assert.equal(new Headers(init?.headers).get("x-goog-api-key"), "test-key");
      assert.deepEqual(JSON.parse(String(init?.body)), { ...request, model: "gemini-decision-1" });
      return Response.json({ answers });
    }
  );
  assert.deepEqual(await result.json(), { answers });
});
test("rejects OpenAI question arrays and empty batches", () => {
  for (const questions of [[], {}, [{ name: "damaged", type: "predicate" }]])
    assert.equal(geminiDecisionSchema.safeParse({ ...request, questions }).success, false);
});

test("rejects the Vertex provider before credential selection", () => {
  assert.equal(
    geminiDecisionSchema.safeParse({ ...request, model: "vertex/gemini-decision-1" }).success,
    false
  );
});
