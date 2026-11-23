import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

function headerKeys(headers: Record<string, string>, name: string): string[] {
  return Object.keys(headers).filter((key) => key.toLowerCase() === name);
}

test("openrouter buildHeaders keeps one client attribution value per header", () => {
  const headers = new DefaultExecutor("openrouter").buildHeaders({ apiKey: "k" }, false, {
    "http-referer": "https://app.example",
    "x-title": "My Agent",
  });

  assert.deepEqual(headerKeys(headers, "http-referer"), ["http-referer"]);
  assert.equal(headers["http-referer"], "https://app.example");
  assert.deepEqual(headerKeys(headers, "x-title"), ["x-title"]);
  assert.equal(headers["x-title"], "My Agent");
  assert.equal(headers["X-Title"], undefined);
});

test("openai-compatible customHeaders replace a forwarded client x-title", () => {
  const headers = new DefaultExecutor("openai-compatible-test").buildHeaders(
    { apiKey: "k", providerSpecificData: { customHeaders: { "X-Title": "Op" } } },
    false,
    { "x-title": "Client" }
  );

  assert.deepEqual(headerKeys(headers, "x-title"), ["X-Title"]);
  assert.equal(headers["X-Title"], "Op");
  assert.equal(headers["x-title"], undefined);
});
