import test from "node:test";
import assert from "node:assert/strict";
import {
  M365ImageResolver,
  M365_MAX_IMAGES,
  M365_MAX_IMAGE_BYTES,
  __setM365UploadFetchForTesting,
  m365ImagePartRef,
  resolveM365Image,
  uploadM365Image,
} from "../../open-sse/executors/m365Protocol/images.ts";
import { M365ExecutorError } from "../../open-sse/executors/m365ExecutorOutput.ts";

// Image input follows the web client: upload to /m365Copilot/UploadFile (keyed to the
// conversation, chat token), then point the message at the docId with an ImageFile annotation.

const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  "base64"
);
const JPEG = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46]);
const dataUrl = (mime: string, bytes: Buffer) => `data:${mime};base64,${bytes.toString("base64")}`;

/** Assert that `promise` rejects with an M365ExecutorError of this status and code. */
async function rejectsWith(promise: Promise<unknown>, status: number, code: string) {
  await assert.rejects(promise, (error: unknown) => {
    assert.ok(error instanceof M365ExecutorError);
    assert.equal(error.status, status);
    assert.equal(error.code, code);
    return true;
  });
}

test("image parts are read from the Chat Completions and Responses shapes", () => {
  assert.equal(m365ImagePartRef({ type: "image_url", image_url: { url: "data:x" } }), "data:x");
  assert.equal(
    m365ImagePartRef({ type: "image_url", image_url: "https://a/b.png" }),
    "https://a/b.png"
  );
  assert.equal(m365ImagePartRef({ type: "input_image", image_url: "data:y" }), "data:y");
  assert.equal(m365ImagePartRef({ type: "text", text: "hi" }), null);
  assert.throws(() => m365ImagePartRef({ type: "image_url", image_url: {} }), M365ExecutorError);
});

test("a data URL resolves to the format its bytes have, not the one it declares", async () => {
  const png = await resolveM365Image(dataUrl("image/png", PNG));
  assert.equal(png.fileType, "png");
  assert.equal(png.bytes, PNG.length);
  assert.equal(png.dataUrl, dataUrl("image/png", PNG));
  const mislabeled = await resolveM365Image(dataUrl("image/png", JPEG));
  assert.equal(mislabeled.fileType, "jpg");
  assert.ok(mislabeled.dataUrl.startsWith("data:image/jpeg;base64,"));
});

test("invalid, unsupported, oversized and non-HTTPS images are refused before any upload", async () => {
  const cases = [
    "data:image/png;base64,***",
    dataUrl("image/svg+xml", PNG),
    dataUrl("image/png", Buffer.from("not an image at all")),
    dataUrl("image/png", Buffer.concat([PNG, Buffer.alloc(M365_MAX_IMAGE_BYTES)])),
    "http://example.com/a.png",
    "file:///etc/passwd",
    "https://127.0.0.1/a.png", // the public-only fetch guard refuses private addresses
  ];
  for (const ref of cases) await rejectsWith(resolveM365Image(ref), 400, "m365_image_invalid");
});

test("a request resolves each image once and is bounded in count", async () => {
  const resolver = new M365ImageResolver();
  const ref = dataUrl("image/png", PNG);
  const [first, again] = await resolver.resolve([ref, ref]);
  assert.equal(first, again, "a repeated image is resolved once");

  const many = new M365ImageResolver();
  const refs = Array.from({ length: M365_MAX_IMAGES + 1 }, (_, i) =>
    dataUrl("image/png", Buffer.concat([PNG, Buffer.from([i])]))
  );
  await rejectsWith(many.resolve(refs), 400, "m365_image_invalid");
});

/** Run `fn` with uploads answered by `respond`, recording each request. */
async function withUploads(
  respond: () => Response | Promise<Response>,
  fn: (calls: Array<{ url: string; init: RequestInit }>) => Promise<void>
) {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const restore = __setM365UploadFetchForTesting(async (url, init) => {
    calls.push({ url: String(url), init: init ?? {} });
    return respond();
  });
  try {
    await fn(calls);
  } finally {
    restore();
  }
}

test("an upload posts the web client's form to the connection host and returns the annotation", async () => {
  await withUploads(
    () => Response.json({ docId: "doc-1" }),
    async (calls) => {
      const image = await resolveM365Image(dataUrl("image/png", PNG));
      const annotation = await uploadM365Image({
        host: "substrate.office.com",
        accessToken: "chat-token",
        conversationId: "conv-1",
        image,
      });
      assert.equal(calls.length, 1);
      const [{ url, init }] = calls;
      assert.equal(url, "https://substrate.office.com/m365Copilot/UploadFile");
      assert.equal(init.method, "POST");
      const headers = init.headers as Record<string, string>;
      assert.equal(headers.Authorization, "Bearer chat-token");
      assert.equal(headers["Content-Type"], "application/x-www-form-urlencoded");
      assert.equal(headers["X-Scenario"], "OfficeWebIncludedCopilot");
      assert.equal(headers["X-Variants"], "feature.EnableImageSupportInUploadFile");
      const form = new URLSearchParams(String(init.body));
      assert.equal(form.get("scenario"), "UploadImage");
      assert.equal(form.get("conversationId"), "conv-1");
      assert.equal(form.get("FileBase64"), image.dataUrl);
      assert.deepEqual(form.getAll("optionsSets"), [
        "cwcgptvsan",
        "flux_v3_gptv_enable_upload_multi_image_in_turn_wo_ch",
      ]);
      assert.equal(annotation.id, "doc-1");
      assert.equal(annotation.messageAnnotationType, "ImageFile");
      assert.equal(annotation.messageAnnotationMetadata.fileType, "png");
      assert.match(annotation.messageAnnotationMetadata.fileName, /^image-[0-9a-f]{8}\.png$/);
    }
  );
});

test("a failed upload fails the request with a sanitized error; no turn goes ahead without it", async () => {
  const image = await resolveM365Image(dataUrl("image/png", PNG));
  const upload = () =>
    uploadM365Image({ host: "h.example", accessToken: "secret-token", conversationId: "c", image });
  const outcomes: Array<[() => Response, number, string]> = [
    [() => new Response("no", { status: 401 }), 401, "m365_image_upload_unauthorized"],
    [() => new Response("slow down", { status: 429 }), 429, "m365_throttled"],
    [() => new Response("too big", { status: 413 }), 400, "m365_image_rejected"],
    [() => new Response("boom", { status: 500 }), 502, "m365_image_upload_failed"],
    [() => Response.json({}), 502, "m365_image_upload_failed"],
    [() => new Response("not json"), 502, "m365_image_upload_failed"],
  ];
  for (const [respond, status, code] of outcomes) {
    await withUploads(respond, async () => {
      await assert.rejects(upload(), (error: unknown) => {
        assert.ok(error instanceof M365ExecutorError);
        assert.deepEqual([error.status, error.code], [status, code]);
        assert.doesNotMatch(error.message, /secret-token|h\.example|boom|too big/);
        return true;
      });
    });
  }
  await withUploads(
    () => {
      throw new TypeError("socket hang up");
    },
    async () => rejectsWith(upload(), 502, "m365_image_upload_failed")
  );
});
