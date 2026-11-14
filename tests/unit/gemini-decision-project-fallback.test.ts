import assert from "node:assert/strict";
import test from "node:test";
import {
  handleGeminiDecisionRequest,
  type GeminiDecisionWorkflowDeps,
} from "../../open-sse/handlers/geminiDecisionWorkflow.ts";

test("a project-scoped 429 skips sibling keys and retries a healthy project", async () => {
  const accounts = [
    { id: "a", connectionId: "a", projectId: "limited-project", apiKey: "key-a",
      testStatus: "valid", lastErrorAt: null, rateLimitedUntil: null },
    { id: "b", connectionId: "b", projectId: "limited-project", apiKey: "key-b" },
    { id: "c", connectionId: "c", projectId: "healthy-project", apiKey: "key-c" },
  ];
  const selectedExclusions: string[][] = [];
  const fetchKeys: string[] = [];
  const marked: string[] = [];
  const recovered: unknown[] = [];
  const metered: string[] = [];
  const originalFetch = globalThis.fetch;

  const deps: GeminiDecisionWorkflowDeps = {
    select: async (allowed, excluded) => {
      selectedExclusions.push([...excluded]);
      return accounts.find((account) =>
        !excluded.includes(account.id) &&
        (allowed === null || allowed.includes(account.id))
      ) ?? null;
    },
    unusable: () => null,
    getConnections: async () => accounts,
    markUnavailable: async (account) => {
      marked.push(account.connectionId!);
    },
    clearRecovered: async (_account, expectedState) => {
      recovered.push(expectedState);
    },
    logAttempt: () => undefined,
    decorateSuccessHeaders: (headers) => headers.set("x-test-decision", "ok"),
  };

  globalThis.fetch = async (_url, options) => {
    const key = new Headers(options?.headers).get("x-goog-api-key")!;
    fetchKeys.push(key);
    if (key === "key-b") throw new Error("Sibling project key must be excluded");
    if (key === "key-a") {
      return Response.json({ error: { code: 429, message: "Quota exceeded" } }, {
        status: 429,
        headers: { "Retry-After": "8" },
      });
    }
    return Response.json({
      answers: { valid: { type: "noul", noul: 1 } },
      usage: { total_input_tokens: 11 },
    });
  };
  try {
    const response = await handleGeminiDecisionRequest(
      { model: "gemini/gemini-decision-1", input: "Check this", questions: {
        valid: { type: "noul", instructions: "Is it valid?" },
      } },
      ["a", "b", "c"],
      new AbortController().signal,
      (tokens, _startedAt, connectionId) => metered.push(connectionId + ":" + tokens),
      deps
    );
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("x-omniroute-decisions-attempts"), "2");
    assert.equal(response.headers.get("x-test-decision"), "ok");
    assert.deepEqual(fetchKeys, ["key-a", "key-c"]);
    assert.deepEqual(marked, ["a"]);
    assert.ok(selectedExclusions[1].includes("b"), "all sibling keys are excluded after the project 429");
    assert.deepEqual(metered, ["c:11"]);
    assert.deepEqual(recovered, [{
      testStatus: null, lastErrorAt: null, rateLimitedUntil: null,
    }]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
