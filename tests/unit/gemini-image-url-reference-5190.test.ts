import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-gemini-url-ref-5190-"));

const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { geminiReferenceImageError } =
  await import("../../open-sse/handlers/imageGeneration/providers/geminiInline.ts");

const originalFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

type Part = { text?: string; inlineData?: { mimeType: string; data: string } };
type Captured = {
  url: string;
  body: { contents?: Array<{ parts: Part[] }>; request?: { contents: Array<{ parts: Part[] }> } };
};

function capture() {
  const calls: Captured[] = [];
  globalThis.fetch = (async (url: string | URL, init: RequestInit = {}) => {
    calls.push({ url: String(url), body: JSON.parse(String(init.body || "{}")) });
    const parts = [{ inlineData: { mimeType: "image/png", data: "aW1n" } }];
    // Antigravity wraps the Gemini payload in `response`; AI Studio returns it bare.
    const payload = String(url).includes("generativelanguage")
      ? { candidates: [{ content: { parts } }] }
      : { response: { candidates: [{ content: { parts } }] } };
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
  return calls;
}

const ANTIGRAVITY = {
  model: "antigravity/gemini-3.1-flash-image-preview",
  credentials: { accessToken: "ag-token", projectId: "project-123" },
};
const AI_STUDIO = {
  model: "gemini/gemini-3.1-flash-image-preview",
  credentials: { apiKey: "k" },
};

for (const [label, target] of [
  ["Antigravity", ANTIGRAVITY],
  ["Gemini AI Studio", AI_STUDIO],
] as const) {
  for (const field of ["image", "image_url", "image_urls", "images"] as const) {
    test(`${label}: an http(s) reference image in \`${field}\` is rejected with 400, not dropped`, async () => {
      const calls = capture();
      const url = "https://example.com/photo.png";
      const result = await handleImageGeneration({
        body: {
          model: target.model,
          prompt: "make it look like a watercolor",
          [field]: field === "image_urls" || field === "images" ? [url] : url,
        },
        credentials: target.credentials,
        log: null,
      });

      assert.equal(result.success, false);
      assert.equal(result.status, 400);
      assert.match(String(result.error), /URL/i);
      assert.match(String(result.error), /base64|data URI/i);
      assert.equal(calls.length, 0, "no text-only request may go upstream");
    });
  }
}

test("Gemini AI Studio forwards a data-URI reference image as an inlineData part", async () => {
  const calls = capture();
  const result = await handleImageGeneration({
    body: {
      model: AI_STUDIO.model,
      prompt: "add a hat",
      image: "data:image/jpeg;base64,dGVzdC1qcGVnLWRhdGE=",
    },
    credentials: AI_STUDIO.credentials,
    log: null,
  });

  assert.equal(result.success, true);
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0].body.contents[0].parts, [
    { inlineData: { mimeType: "image/jpeg", data: "dGVzdC1qcGVnLWRhdGE=" } },
    { text: "add a hat" },
  ]);
});

test("a request without any reference image still generates text-to-image", async () => {
  const calls = capture();
  const result = await handleImageGeneration({
    body: { model: ANTIGRAVITY.model, prompt: "a fox" },
    credentials: ANTIGRAVITY.credentials,
    log: null,
  });
  assert.equal(result.success, true);
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0].body.request.contents[0].parts, [{ text: "a fox" }]);
});

test("geminiReferenceImageError only fires for a reference it cannot inline", () => {
  assert.equal(geminiReferenceImageError({ prompt: "x" }), null);
  assert.equal(geminiReferenceImageError({ image: "data:image/png;base64,aGk=" }), null);
  assert.equal(geminiReferenceImageError({ imageBytes: Buffer.from("png") }), null);
  assert.equal(geminiReferenceImageError({ image: "" }), null);
  assert.match(String(geminiReferenceImageError({ image_url: "http://a.test/x.png" })), /URL/);
});
