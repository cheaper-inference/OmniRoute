import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import { convertOpenAIContentToParts } from "../../open-sse/translator/helpers/geminiHelper.ts";
import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import {
  AntigravityRemoteImageError,
  inlineAntigravityRemoteImages,
} from "../../open-sse/executors/antigravity/remoteImageInline.ts";
import { setPinnedFetchTestOverride } from "../../src/shared/network/remoteImageFetch.ts";

// Antigravity answered every OpenAI `image_url` request that used an https URL with
// "400 Unsupported mime type: image/* in contents.file_data", because the translator
// forwards remote URLs as `fileData` with the placeholder MIME type `image/*`. Base64
// data-URI images (inlineData, concrete MIME type) succeeded.

const PNG = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
]);
const JPEG = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46]);
// An IP literal skips the DNS lookup in the public-only guard, so no real network is touched.
const IMAGE_URL = "https://93.184.216.34/uploads/photo.jpg";
const creds = { accessToken: "test-token", projectId: "test-project-123" };

function fakeFetch(body: Buffer, contentType: string, calls: string[] = []): typeof fetch {
  return (async (input: string | URL | Request) => {
    calls.push(String(input));
    return new Response(body, { status: 200, headers: { "content-type": contentType } });
  }) as typeof fetch;
}

function openAIImageRequest(url: string) {
  return {
    request: {
      contents: [
        {
          role: "user",
          parts: convertOpenAIContentToParts([
            { type: "text", text: "What is in this image?" },
            { type: "image_url", image_url: { url } },
          ]),
        },
      ],
    },
  };
}

afterEach(() => setPinnedFetchTestOverride(undefined));

describe("Antigravity remote image URLs", () => {
  it("the translator emits the image/* placeholder that Antigravity rejects", () => {
    const parts = convertOpenAIContentToParts([
      { type: "image_url", image_url: { url: IMAGE_URL } },
    ]);
    assert.deepEqual(parts, [{ fileData: { fileUri: IMAGE_URL, mimeType: "image/*" } }]);
  });

  it("transformRequest inlines a remote image as base64 with its real MIME type", async () => {
    const calls: string[] = [];
    setPinnedFetchTestOverride(fakeFetch(JPEG, "application/octet-stream", calls));

    const result = await new AntigravityExecutor().transformRequest(
      "gemini-3.1-flash-lite",
      openAIImageRequest(IMAGE_URL),
      true,
      creds
    );
    assert.ok(!(result instanceof Response));
    const contents = (result.request as { contents: Array<{ parts: unknown[] }> }).contents;
    assert.deepEqual(contents[0].parts, [
      { text: "What is in this image?" },
      { inlineData: { mimeType: "image/jpeg", data: JPEG.toString("base64") } },
    ]);
    assert.equal(JSON.stringify(result).includes("image/*"), false);
    assert.equal(JSON.stringify(result).includes("fileData"), false);
    assert.deepEqual(calls, [IMAGE_URL]);
  });

  it("returns a clear 400 instead of forwarding a URL that cannot be fetched", async () => {
    setPinnedFetchTestOverride((async () => new Response("nope", { status: 404 })) as typeof fetch);

    const result = await new AntigravityExecutor().transformRequest(
      "gemini-3.1-flash-lite",
      openAIImageRequest(IMAGE_URL),
      true,
      creds
    );
    assert.ok(result instanceof Response);
    assert.equal(result.status, 400);
    const body = await result.json();
    assert.equal(body.error.code, "invalid_image_url");
  });

  it("refuses private hosts (SSRF guard) without fetching them", async () => {
    const calls: string[] = [];
    setPinnedFetchTestOverride(fakeFetch(PNG, "image/png", calls));

    const result = await new AntigravityExecutor().transformRequest(
      "gemini-3.1-flash-lite",
      openAIImageRequest("http://127.0.0.1/secret.png"),
      true,
      creds
    );
    assert.ok(result instanceof Response);
    assert.equal(result.status, 400);
    assert.deepEqual(calls, []);
  });

  it("leaves data-URI images, text and non-image fileData untouched", async () => {
    const contents = [
      {
        role: "user",
        parts: [
          { text: "hi" },
          { inlineData: { mimeType: "image/png", data: "abc" } },
          { fileData: { fileUri: "https://93.184.216.34/doc.pdf", mimeType: "application/pdf" } },
          { fileData: { fileUri: "gs://bucket/img.png", mimeType: "image/png" } },
        ],
      },
    ];
    const out = await inlineAntigravityRemoteImages(contents, {
      fetchImage: async () => {
        throw new Error("must not fetch");
      },
    });
    assert.equal(out, contents);
  });

  it("fetches each URL once per request body across fallback attempts", async () => {
    const calls: string[] = [];
    const fetchImage = async (uri: string | URL) => {
      calls.push(String(uri));
      return { buffer: Buffer.from(PNG), contentType: "image/png", url: String(uri) };
    };
    const cacheKey = {};
    const contents = [
      {
        role: "user",
        parts: [
          { fileData: { fileUri: IMAGE_URL, mimeType: "image/*" } },
          { fileData: { fileUri: IMAGE_URL, mimeType: "image/*" } },
        ],
      },
    ];
    const first = await inlineAntigravityRemoteImages(contents, { fetchImage, cacheKey });
    await inlineAntigravityRemoteImages(contents, { fetchImage, cacheKey });
    assert.deepEqual(calls, [IMAGE_URL]);
    assert.deepEqual(first[0].parts[1], {
      inlineData: { mimeType: "image/png", data: PNG.toString("base64") },
    });
    // The input is not mutated, so the next fallback attempt still sees the original body.
    assert.deepEqual(contents[0].parts[0], {
      fileData: { fileUri: IMAGE_URL, mimeType: "image/*" },
    });
  });

  it("rejects a URL that does not return an image", async () => {
    await assert.rejects(
      inlineAntigravityRemoteImages(
        [{ role: "user", parts: [{ fileData: { fileUri: IMAGE_URL, mimeType: "image/*" } }] }],
        {
          fetchImage: async (uri) => ({
            buffer: Buffer.from("<html></html>"),
            contentType: "text/html",
            url: String(uri),
          }),
        }
      ),
      AntigravityRemoteImageError
    );
  });
});
