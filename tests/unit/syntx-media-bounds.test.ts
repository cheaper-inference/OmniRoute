import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// The handler-level tests below import the video / image / upscale handlers, which pull in
// the usage DB; point it at a throwaway dir so no test data is written to the real one.
process.env.DATA_DIR =
  process.env.DATA_DIR ?? mkdtempSync(join(tmpdir(), "omniroute-syntx-bounds-"));

// Dynamic imports, same style as syntx-media.test.ts (service modules load with side effects).
const { fetchSyntxMediaBytes, decodeDataUrlBounded, SyntxMediaError, SYNTX_MEDIA_MAX_BYTES } =
  await import("../../open-sse/services/syntxMedia.ts");
const { handleSyntxVideoGeneration } =
  await import("../../open-sse/handlers/videoGeneration/syntxHandler.ts");
const { handleSyntxImageGeneration } =
  await import("../../open-sse/handlers/imageGeneration/providers/syntx.ts");
const { handleSyntxImageUpscale } = await import("../../open-sse/handlers/imageUpscale/syntx.ts");

const isStatus = (status: number) => (e: unknown) =>
  e instanceof SyntxMediaError && e.status === status;

function fakeJwt(): string {
  return (
    "eyJhbGciOiJub25lIn0." +
    Buffer.from(JSON.stringify({ sub: "1", exp: Math.floor(Date.now() / 1000) + 3600 })).toString(
      "base64url"
    ) +
    ".x"
  );
}

const credentials = { accessToken: fakeJwt() };
const noopFetch = (async () => new Response("unused", { status: 200 })) as typeof fetch;
// A well-formed base64 data URL whose decoded size (150 MiB) exceeds the limit: the decode
// refuses with a 400 before it allocates the bytes.
const oversizedDataUrl = `data:image/png;base64,${"A".repeat(150 * 1024 * 1024)}`;
const oversizedMessage = `SYNTX media data URL exceeds ${SYNTX_MEDIA_MAX_BYTES} byte limit`;

describe("syntx media size bounds", () => {
  it("refuses a body whose content-length exceeds the limit before reading it", async () => {
    let getReaderCalls = 0;
    const body = new ReadableStream<Uint8Array>({
      start: (controller) => {
        controller.enqueue(new Uint8Array(16));
        controller.close();
      },
    });
    const response = new Response(body, {
      status: 200,
      headers: { "content-type": "video/mp4", "content-length": String(200 * 1024 * 1024) },
    });
    // The reader is the only read path: if the content-length pre-check did not fire first the
    // code must open a reader to stream the body, so a non-zero count would mean a download.
    // Counting getReader() calls therefore proves the body was never read. (A pull-based
    // ReadableStream performs one backpressure pull on its own even with no reader, so counting
    // pulls cannot discriminate.)
    const responseBody = response.body as ReadableStream<Uint8Array>;
    const realGetReader = responseBody.getReader.bind(responseBody);
    (responseBody as unknown as { getReader: () => unknown }).getReader = () => {
      getReaderCalls++;
      return realGetReader();
    };
    const fetchImpl = (async () => response) as typeof fetch;
    await assert.rejects(
      fetchSyntxMediaBytes("https://r2.syntx.ai/x.mp4", fetchImpl),
      isStatus(413)
    );
    assert.equal(getReaderCalls, 0); // no download: the reader was never opened
  });

  it("refuses mid-stream a body over the limit when content-length is absent", async () => {
    let cancelled = false;
    const chunk = new Uint8Array(1024 * 1024).fill(1);
    const body = new ReadableStream<Uint8Array>({
      start: (controller) => {
        for (let i = 0; i < 60; i++) controller.enqueue(chunk);
        controller.close();
      },
      cancel: () => {
        cancelled = true;
      },
    });
    const fetchImpl = (async () =>
      new Response(body, {
        status: 200,
        headers: { "content-type": "video/mp4" },
      })) as typeof fetch;
    await assert.rejects(
      fetchSyntxMediaBytes("https://r2.syntx.ai/x.mp4", fetchImpl),
      isStatus(413)
    );
    assert.equal(cancelled, true); // the oversized stream was cancelled, not buffered whole
  });

  it("maps an abort while the download is in flight to 499", async () => {
    const controller = new AbortController();
    const fetchImpl = (() => {
      controller.abort();
      return Promise.reject(new DOMException("This operation was aborted", "AbortError"));
    }) as typeof fetch;
    await assert.rejects(
      fetchSyntxMediaBytes("https://r2.syntx.ai/x.mp4", fetchImpl, {
        signal: controller.signal,
      }),
      isStatus(499)
    );
  });

  it("maps an abort while the body is being read to 499", async () => {
    const controller = new AbortController();
    const body = new ReadableStream<Uint8Array>({
      // the client aborts while the body is being read: the pending read() rejects
      pull: () =>
        new Promise<never>((_resolve, reject) => {
          controller.signal.addEventListener("abort", () =>
            reject(new DOMException("This operation was aborted", "AbortError"))
          );
          controller.abort();
        }),
      cancel: () => undefined,
    });
    const fetchImpl = (async () =>
      new Response(body, {
        status: 200,
        headers: { "content-type": "video/mp4" },
      })) as typeof fetch;
    const pending = fetchSyntxMediaBytes("https://r2.syntx.ai/x.mp4", fetchImpl, {
      signal: controller.signal,
    });
    await assert.rejects(pending, isStatus(499));
  });

  it("keeps a 413 over the size limit when the client aborts while the fetch is in flight", async () => {
    // The conversion catch must remap only a transport abort to 499: when the client aborts
    // while the fetch is in flight, the response still carries a content-length over the limit,
    // so the content-length pre-check raises a 413. Without the guard the catch would convert
    // that 413 to 499 and the size limit would be reported as a cancellation.
    const controller = new AbortController();
    const body = new ReadableStream<Uint8Array>({
      start: (c) => {
        c.enqueue(new Uint8Array(16));
        c.close();
      },
    });
    const response = new Response(body, {
      status: 200,
      headers: { "content-type": "video/mp4", "content-length": String(200 * 1024 * 1024) },
    });
    const fetchImpl = (async () => {
      controller.abort(); // the client cancels while the fetch is still in flight
      return response;
    }) as typeof fetch;
    await assert.rejects(
      fetchSyntxMediaBytes("https://r2.syntx.ai/x.mp4", fetchImpl, {
        signal: controller.signal,
      }),
      isStatus(413) // the 413 survives the concurrent abort (not converted to 499)
    );
  });

  it("refuses to start the fetch when the signal is already aborted", async () => {
    let fetchCalls = 0;
    const controller = new AbortController();
    controller.abort();
    const fetchImpl = (() => {
      fetchCalls++;
      return Promise.resolve(new Response("x"));
    }) as typeof fetch;
    await assert.rejects(
      fetchSyntxMediaBytes("https://r2.syntx.ai/x.mp4", fetchImpl, {
        signal: controller.signal,
      }),
      isStatus(499)
    );
    assert.equal(fetchCalls, 0); // the pre-check refuses before any network activity
  });

  it("rejects an oversized data URL without allocating its bytes", async () => {
    const original = Buffer.from;
    let base64Allocs = 0;
    (Buffer as { from: unknown }).from = new Proxy(original, {
      apply: (_target, thisArg, args) => {
        if (args.length >= 2 && args[1] === "base64") base64Allocs++;
        return original.apply(thisArg, args as [ArrayBuffer | Uint8Array, string?]);
      },
    }) as typeof Buffer.from;
    try {
      // A base64 string of 150 MiB (about 112.5 MiB decoded) is over the 50 MiB limit.
      const dataUrl = `data:image/png;base64,${"A".repeat(150 * 1024 * 1024)}`;
      assert.throws(() => decodeDataUrlBounded(dataUrl), isStatus(400));
      assert.equal(base64Allocs, 0); // no allocation happened before the refusal
    } finally {
      (Buffer as { from: unknown }).from = original;
    }
  });

  it("accepts a data URL whose decoded size is exactly the limit minus one byte", () => {
    const b64 = Buffer.alloc(50 * 1024 * 1024 - 1, 65).toString("base64");
    const decoded = decodeDataUrlBounded(`data:image/png;base64,${b64}`);
    assert.ok(decoded);
    assert.equal(decoded.bytes.byteLength, 50 * 1024 * 1024 - 1);
    assert.equal(decoded.mime, "image/png");
  });

  it("keeps an unknown mime type unchanged when decoding a data URL", () => {
    const b64 = Buffer.from("hello").toString("base64");
    const decoded = decodeDataUrlBounded(`data:application/x-weird;base64,${b64}`);
    assert.ok(decoded);
    assert.equal(decoded.mime, "application/x-weird");
    assert.equal(decoded.bytes.byteLength, 5);
  });

  it("returns 400 from the video handler when a reference data URL exceeds the limit", async () => {
    const result = await handleSyntxVideoGeneration({
      model: "syntx/sora/gpt",
      provider: "syntx",
      body: { prompt: "hi", image_url: oversizedDataUrl },
      credentials,
      fetchImpl: noopFetch,
    });
    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.equal(result.error, oversizedMessage);
  });

  it("returns 400 from the image handler when a reference data URL exceeds the limit", async () => {
    const result = await handleSyntxImageGeneration({
      model: "syntx/sora-images/gpt-image-2",
      provider: "syntx",
      body: { prompt: "hi", image_url: oversizedDataUrl },
      credentials,
      fetchImpl: noopFetch,
    });
    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.equal(result.error, oversizedMessage);
  });

  it("returns 400 from the upscale handler when the source data URL exceeds the limit", async () => {
    const result = await handleSyntxImageUpscale({
      model: "syntx/magnific/magnific",
      provider: "syntx",
      body: { image: { b64_json: "A".repeat(150 * 1024 * 1024) } },
      credentials,
      fetchImpl: noopFetch,
    });
    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.equal(result.error, oversizedMessage);
  });
});
