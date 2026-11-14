import assert from "node:assert/strict";
import test from "node:test";
import {
  executeGeminiDecision, geminiDecisionInputTokens, GOOGLE_DECISIONS_URL,
} from "../../open-sse/handlers/geminiDecisions.ts";
import { geminiDecisionsSchema } from "../../src/shared/validation/schemas/geminiDecisions.ts";
import { getModelEndpointDecision } from "../../open-sse/services/modelEndpointPolicy.ts";

const request = {
  model: "gemini/gemini-decision-1",
  input: "The customer received a cracked blue mug.",
  questions: {
    damaged: { type: "noul", instructions: "Was the product damaged?" },
    team: { type: "choice", instructions: "Which team?", criteria: { returns: "", sales: "" } },
    urgency: { type: "score", instructions: "How urgent?", criteria: ["low", "high"] },
  },
} as const;

test("validates all three question types together and both model identifiers", () => {
  assert.equal(geminiDecisionsSchema.safeParse(request).success, true);
  assert.equal(geminiDecisionsSchema.safeParse({
    ...request, model: "gemini-decision-1",
  }).success, true);
});

test("rejects malformed, missing and incompatible questions", () => {
  for (const body of [
    { ...request, input: undefined },
    { ...request, questions: {} },
    { ...request, questions: { "space key": request.questions.damaged } },
    { ...request, questions: { choice: { type: "choice", instructions: "Choose", criteria: { only: "" } } } },
    { ...request, questions: { score: { type: "score", instructions: "Score", criteria: ["one"] } } },
    { ...request, questions: { a: { type: "noul", instructions: "X", criteria: { unknown: "Y" } } } },
    { ...request, model: "gemini-3.8-flash" },
    { ...request, state: "unexpected System One field" },
  ]) {
    assert.equal(geminiDecisionsSchema.safeParse(body).success, false, JSON.stringify(body));
  }
});

test("validates native multimodal blocks and rejects unsafe media inputs", () => {
  assert.equal(geminiDecisionsSchema.safeParse({
    ...request,
    input: [
      { type: "text", text: "Check image of return\n" },
      { type: "image", mime_type: "image/png", data: "iVBORw0KGgo=", resolution: "low" },
      { type: "audio", mime_type: "audio/mp3", uri: "https://example.org/sample.mp3" },
      { type: "video", mime_type: "video/mp4", uri: "https://example.org/video.mp4", resolution: "high" },
      { type: "document", mime_type: "application/pdf", data: "JVBERi0=" },
    ],
  }).success, true);
  for (const input of [
    [{ type: "image", mime_type: "application/octet-stream", data: "YQ==" }],
    [{ type: "audio", mime_type: "audio/mp3", uri: "http://example.org/test.mp3" }],
    [{ type: "audio", mime_type: "audio/mp3", uri: "https://127.0.0.1/secrets" }],
    [{ type: "video", mime_type: "video/mp4", data: "bad base64" }],
    [{ type: "document", mime_type: "application/pdf", data: "JVBERi0=", uri: "https://example.org/a.pdf" }],
    [{ type: "video", mime_type: "video/mp4", uri: "https://example.org/a.mp4", resolution: "ultra_high" }],
    [{ type: "text", text: "" }],
  ]) {
    assert.equal(geminiDecisionsSchema.safeParse({ ...request, input }).success, false);
  }
});

test("Google transport removes gateway prefix, sends x-goog-api-key, preserves usage and answers", async () => {
  const answer = {
    answers: {
      damaged: { type: "noul", noul: 0.97, confidence: 0.97 },
      team: { type: "choice", choice: "returns", probabilities: { returns: 0.9, sales: 0.1 }, confidence: 0.9 },
      urgency: { type: "score", score: 0.8, probabilities: { "0": 0.2, "1": 0.8 },
        legend: { "0": "low", "1": "high" }, confidence: 0.8 },
    },
    usage: { total_input_tokens: 123, input_tokens_by_modality: [
      { modality: "text", tokens: 123 },
    ], total_output_tokens: 0, total_tokens: 123 },
  };
  let called = false;
  const fetchImpl = (async (url: RequestInfo | URL, init?: RequestInit) => {
    called = true;
    assert.equal(String(url), GOOGLE_DECISIONS_URL);
    assert.equal(new Headers(init?.headers).get("x-goog-api-key"), "test-secret");
    assert.equal(new Headers(init?.headers).get("authorization"), null);
    const outgoing = JSON.parse(String(init?.body));
    assert.equal(outgoing.model, "gemini-decision-1");
    assert.deepEqual(outgoing.questions, request.questions);
    assert.equal(outgoing.input, request.input);
    assert.equal(outgoing.state, undefined);
    return new Response(JSON.stringify(answer), { status: 200 });
  }) as typeof fetch;
  const response = await executeGeminiDecision(request, "test-secret", { fetchImpl });
  assert.equal(called, true);
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, answer);
  assert.equal(geminiDecisionInputTokens(response.body), 123);
  assert.equal(response.timedOut, false);
  assert.ok(response.latencyMs >= 0);
});

test("429 is returned intact for account cooldown/selection with Retry-After", async () => {
  const response = await executeGeminiDecision(request, "test-secret", {
    fetchImpl: (async () => new Response(JSON.stringify({
      error: { code: 429, message: "Quota exceeded" },
    }), { status: 429, headers: { "Retry-After": "9" } })) as typeof fetch,
  });
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "9");
});

test("timeout aborts the Google request with deterministic 504", async () => {
  const response = await executeGeminiDecision(request, "test-secret", {
    timeoutMs: 100,
    fetchImpl: (async (_url: RequestInfo | URL, init?: RequestInit) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () =>
          reject(new DOMException("Aborted", "AbortError")), { once: true });
      })) as typeof fetch,
  });
  assert.equal(response.status, 504);
  assert.equal(response.timedOut, true);
});

test("decision model is not chat-selectable even with a stored synthetic chat endpoint", () => {
  for (const name of ["gemini-decision-1", "gemini/gemini-decision-1"]) {
    assert.deepEqual(getModelEndpointDecision("gemini", name, ["chat"]), {
      kind: "non-chat", chatSelectable: false, reason: "provider-policy",
    });
  }
  assert.equal(getModelEndpointDecision("gemini", "gemini-3.7-flash").chatSelectable, true);
});
