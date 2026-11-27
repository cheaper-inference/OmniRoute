import test from "node:test";
import assert from "node:assert/strict";

import {
  getAllOcrModels,
  getOcrProvider,
  parseOcrModel,
  VERTEX_DEEPSEEK_RETIRED_MODEL_ID,
} from "../../open-sse/config/ocrRegistry.ts";
import { handleOcr } from "../../open-sse/handlers/ocr.ts";

// Vertex AI retired the managed deepseek-ocr-maas model on 2026-10-21 (#20423).
const RETIRED = "deepseek-ocr-maas";
const credentials = {
  apiKey: "tok",
  baseUrl: "https://example.test/v1/endpoints/openapi/chat/completions",
};
const okFetch = (capture: { model?: string; calls: number }) =>
  (async (_url: string, init: { body: string }) => {
    capture.calls++;
    capture.model = JSON.parse(init.body).model;
    return new Response(JSON.stringify({ choices: [{ message: { content: "x" } }] }), {
      status: 200,
    });
  }) as unknown as typeof fetch;

test("#20423: vertex-deepseek-ocr no longer advertises the retired model", () => {
  assert.equal(VERTEX_DEEPSEEK_RETIRED_MODEL_ID, RETIRED);
  const ids = getOcrProvider("vertex-deepseek-ocr")?.models.map((m) => m.id) ?? [];
  assert.ok(!ids.includes(RETIRED));
  assert.ok(!getAllOcrModels().some((m) => m.id === `vertex-deepseek-ocr/${RETIRED}`));
  assert.equal(parseOcrModel(RETIRED).provider, null);
});

test("#20423: the retired model id is rejected with 400 and never sent upstream", async () => {
  const cap = { calls: 0 } as { model?: string; calls: number };
  const res = await handleOcr({
    body: {
      model: `vertex-deepseek-ocr/${RETIRED}`,
      document: { type: "document_url", document_url: "gs://b/x.pdf" },
    },
    credentials,
    fetchImpl: okFetch(cap),
  });
  assert.equal(res.status, 400);
  assert.equal(cap.calls, 0);
});

test("#20423: a self-deployed model id is sent as supplied, without a forced deepseek-ai/ prefix", async () => {
  const cap = { calls: 0 } as { model?: string; calls: number };
  const res = await handleOcr({
    body: {
      model: "vertex-deepseek-ocr/my-deployed-ocr",
      document: { type: "document_url", document_url: "gs://b/x.pdf" },
    },
    credentials,
    fetchImpl: okFetch(cap),
  });
  assert.equal(res.status, 200);
  assert.equal(cap.model, "my-deployed-ocr");
});
