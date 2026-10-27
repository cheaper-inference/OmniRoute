import test from "node:test";
import assert from "node:assert/strict";

const { transformRequestForProvider } = await import("../../open-sse/handlers/rerank.ts");

// The /v1/rerank schema accepts any element in `documents` (z.unknown()), and the Voyage branch
// already reads `doc?.text`. NVIDIA and DeepInfra read `doc.text`, which throws on a null entry
// before the request is built.

test("nvidia rerank maps a null document to an empty passage instead of throwing", () => {
  const out = transformRequestForProvider(
    { format: "nvidia" },
    { model: "m", query: "q", documents: ["a", null, { text: "b" }], top_n: 3 }
  );
  assert.deepEqual(out.passages, [{ text: "a" }, { text: "" }, { text: "b" }]);
});

test("deepinfra rerank maps a null document to an empty string instead of throwing", () => {
  const out = transformRequestForProvider(
    { format: "deepinfra" },
    { model: "m", query: "q", documents: ["a", null, { text: "b" }] }
  );
  assert.deepEqual(out.documents, ["a", "", "b"]);
});
