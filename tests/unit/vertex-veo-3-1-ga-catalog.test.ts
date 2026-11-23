import test from "node:test";
import assert from "node:assert/strict";

import { vertexGenerateVideo } from "../../open-sse/executors/vertexMedia.ts";
import {
  getAllVideoModels,
  getVideoProvider,
  parseVideoModel,
} from "../../open-sse/config/videoRegistry.ts";

// Service Account credential with a pre-set accessToken so resolveVertexAuth never
// performs a real OAuth token exchange.
function saCredentials() {
  return {
    apiKey: JSON.stringify({
      project_id: "proj-test",
      client_email: "svc@x.iam",
      private_key: "x",
    }),
    accessToken: "test-bearer-token",
    providerSpecificData: { region: "us-central1" },
  };
}

test("vertex video catalog lists the Veo 3.1 / 3.1 Fast GA ids and no Gemini-API preview ids", () => {
  const vertex = getVideoProvider("vertex");
  assert.ok(vertex);
  assert.equal(vertex.format, "vertex-veo");
  const ids = vertex.models.map((m) => m.id);
  assert.ok(ids.includes("veo-3.1-generate-001"));
  assert.ok(ids.includes("veo-3.1-fast-generate-001"));
  // Vertex rejects the Gemini-API names (`*-generate-preview`) with 404 "Publisher model not found".
  assert.equal(
    ids.some((id) => id.includes("-preview")),
    false
  );

  const listed = getAllVideoModels().map((m) => m.id);
  assert.ok(listed.includes("vertex/veo-3.1-generate-001"));
  assert.ok(listed.includes("vertex/veo-3.1-fast-generate-001"));
  // A bare id resolves to vertex only when the catalog lists it.
  assert.deepEqual(parseVideoModel("veo-3.1-generate-001"), {
    provider: "vertex",
    model: "veo-3.1-generate-001",
  });
});

test("vertexGenerateVideo targets the Veo 3.1 Fast GA publisher model", async () => {
  const originalFetch = globalThis.fetch;
  const calls: string[] = [];
  const payloads: unknown[] = [
    { name: "projects/proj-test/.../operations/op-31" }, // submit
    { done: true, response: { videos: [{ bytesBase64Encoded: "TVA0VklERU8=" }] } }, // poll
  ];
  globalThis.fetch = (async (url: string | URL | Request) => {
    calls.push(String(url));
    const payload = payloads[Math.min(calls.length - 1, payloads.length - 1)];
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  try {
    const result = await vertexGenerateVideo(saCredentials(), {
      model: "veo-3.1-fast-generate-001",
      prompt: "a neon city",
      pollIntervalMs: 1,
      maxWaitMs: 5000,
    });

    assert.equal(result.base64, "TVA0VklERU8=");
    assert.equal(
      calls[0],
      "https://us-central1-aiplatform.googleapis.com/v1/projects/proj-test/locations/us-central1/publishers/google/models/veo-3.1-fast-generate-001:predictLongRunning"
    );
    assert.ok(calls[1].endsWith("/veo-3.1-fast-generate-001:fetchPredictOperation"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
