import test from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-fal-images-"));

const originalDnsLookup = dns.promises.lookup;
(dns.promises as { lookup: unknown }).lookup = (async (
  _hostname: string,
  options?: { all?: boolean }
) => {
  const record = { address: "203.0.113.1", family: 4 };
  return options?.all ? [record] : record;
}) as typeof dns.promises.lookup;
process.on("exit", () => {
  (dns.promises as { lookup: unknown }).lookup = originalDnsLookup;
});

const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { setPinnedFetchTestOverride } = await import("../../src/shared/network/remoteImageFetch.ts");
const { prepareFalCompatibility } = await import("../../open-sse/handlers/fal/compatibility.ts");

test("handleImageGeneration returns Fal images as base64 when response_format is omitted", async () => {
  const originalFetch = globalThis.fetch;
  const mockFetchImpl = async (url) => {
    const stringUrl = String(url);
    if (stringUrl === "https://fal.run/fal-ai/flux-2-flex") {
      return new Response(
        JSON.stringify({ images: [{ url: "https://cdn.example.com/fal-flex.png" }] }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    if (stringUrl === "https://cdn.example.com/fal-flex.png") {
      return new Response(new Uint8Array([8, 9, 10]), {
        status: 200,
        headers: { "content-type": "image/png" },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };
  // #13883: resolveImageSource now sets `pinDns: true`, which pins the connection via a
  // real undici socket and would bypass this mocked globalThis.fetch — route it through
  // the test-only pinned-fetch override instead (src/shared/network/remoteImageFetch.ts).
  globalThis.fetch = mockFetchImpl;
  setPinnedFetchTestOverride(mockFetchImpl);

  try {
    const result = await handleImageGeneration({
      body: { model: "fal-ai/fal-ai/flux-2-flex", prompt: "red apple" },
      credentials: { apiKey: "fal-key" },
      log: null,
    });
    assert.equal(result.success, true);
    assert.equal(result.data.data[0].b64_json, "CAkK");
    assert.equal(result.data.data[0].url, undefined);
  } finally {
    globalThis.fetch = originalFetch;
    setPinnedFetchTestOverride(undefined);
  }
});

test("without the native preparer an explicit Fal url still returns base64, as before", async () => {
  const originalFetch = globalThis.fetch;
  const signedUrl = "https://cdn.example.com/fal-flex.png?signature=keep%2Bintact&expires=123";
  const mockFetchImpl: typeof fetch = async (url) =>
    String(url) === signedUrl
      ? new Response(new Uint8Array([8, 9, 10]), { headers: { "content-type": "image/png" } })
      : Response.json({ images: [{ url: signedUrl }] });
  globalThis.fetch = mockFetchImpl;
  setPinnedFetchTestOverride(mockFetchImpl);
  try {
    const result = await handleImageGeneration({
      body: { model: "fal-ai/fal-ai/flux-2-flex", prompt: "red apple", response_format: "url" },
      credentials: { apiKey: "fal-key" },
      log: null,
    });
    assert.equal(result.data.data[0].b64_json, "CAkK");
  } finally {
    globalThis.fetch = originalFetch;
    setPinnedFetchTestOverride(undefined);
  }
});

for (const responseFormat of ["url", "b64_json"] as const) {
  test(`handleImageGeneration honors explicit Fal response_format=${responseFormat}`, async () => {
    const originalFetch = globalThis.fetch;
    const signedUrl = "https://cdn.example.com/fal-flex.png?signature=keep%2Bintact&expires=123";
    const requests: string[] = [];
    const mockFetchImpl: typeof fetch = async (url) => {
      const stringUrl = String(url);
      requests.push(stringUrl);
      if (stringUrl === "https://fal.run/fal-ai/flux-2-flex") {
        return Response.json({ images: [{ url: signedUrl }] });
      }
      if (stringUrl === signedUrl) {
        return new Response(new Uint8Array([8, 9, 10]), {
          headers: { "content-type": "image/png" },
        });
      }
      throw new Error(`Unexpected URL: ${stringUrl}`);
    };
    globalThis.fetch = mockFetchImpl;
    setPinnedFetchTestOverride(mockFetchImpl);
    try {
      const result = await handleImageGeneration({
        body: {
          model: "fal-ai/fal-ai/flux-2-flex",
          prompt: "red apple",
          response_format: responseFormat,
        },
        credentials: { apiKey: "fal-key" },
        log: null,
        prepareFalInput: prepareFalCompatibility,
      });
      assert.equal(result.success, true);
      assert.deepEqual(result.data.data, [
        responseFormat === "url"
          ? { url: signedUrl, revised_prompt: "red apple" }
          : { b64_json: "CAkK", revised_prompt: "red apple" },
      ]);
      assert.deepEqual(
        requests,
        responseFormat === "url"
          ? ["https://fal.run/fal-ai/flux-2-flex"]
          : ["https://fal.run/fal-ai/flux-2-flex", signedUrl]
      );
    } finally {
      globalThis.fetch = originalFetch;
      setPinnedFetchTestOverride(undefined);
    }
  });
}
