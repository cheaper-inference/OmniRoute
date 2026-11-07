/**
 * OMNIROUTE_IMAGE_NORMALIZATION — opt-in gateway-side vision image
 * normalization before dispatch.
 *
 * Qwen2-VL-style vision pipelines (14px patches merged 2×2, RGB conversion,
 * smart_resize under a pixel budget) reject or choke on oversized/exotic
 * images: upstream 400s on image parse and occasional zero-output hangs.
 * Normalization targets the pipeline's comfort zone: convert to RGB, long
 * edge ≤4096, total pixels ≤4,194,304, re-encode as baseline JPEG/PNG.
 * Unset (default) = off, zero change; OMNIROUTE_IMAGE_NORMALIZATION=1
 * enables. Failures are fail-open: a bad image is passed through untouched,
 * never rejected.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { resolveVisionImageNormalization, normalizeVisionImageBuffer, normalizeVisionImagesInBody } =
  await import("../../open-sse/utils/visionImageNormalization.ts");

interface SharpMeta {
  width?: number;
  height?: number;
  format?: string;
  hasAlpha?: boolean;
  isProgressive?: boolean;
}
interface SharpInstance {
  metadata(): Promise<SharpMeta>;
  toBuffer(): Promise<Buffer>;
}
interface SharpCreateOptions {
  create: {
    width: number;
    height: number;
    channels: number;
    background: string;
  };
}
type SharpFactory = {
  (input: Buffer, opts?: unknown): SharpInstance;
  (opts: SharpCreateOptions): {
    png(): SharpInstance;
    jpeg(opts?: { quality?: number }): SharpInstance;
  };
};

const sharp = (await import("sharp")
  .then((m) => m.default ?? m)
  .catch(() => null)) as SharpFactory | null;

test("env switch: unset = off (default, zero change); 1/true/on enables; 0/false/off disables", () => {
  assert.equal(resolveVisionImageNormalization({}), false);
  assert.equal(resolveVisionImageNormalization({ OMNIROUTE_IMAGE_NORMALIZATION: "" }), false);
  assert.equal(resolveVisionImageNormalization({ OMNIROUTE_IMAGE_NORMALIZATION: "junk" }), false);
  assert.equal(resolveVisionImageNormalization({ OMNIROUTE_IMAGE_NORMALIZATION: "0" }), false);
  assert.equal(resolveVisionImageNormalization({ OMNIROUTE_IMAGE_NORMALIZATION: "false" }), false);
  assert.equal(resolveVisionImageNormalization({ OMNIROUTE_IMAGE_NORMALIZATION: "1" }), true);
  assert.equal(resolveVisionImageNormalization({ OMNIROUTE_IMAGE_NORMALIZATION: "true" }), true);
  assert.equal(resolveVisionImageNormalization({ OMNIROUTE_IMAGE_NORMALIZATION: "on" }), true);
});

const sharpMissing =
  !sharp &&
  "sharp native module unavailable on this host — vision normalization cases run in CI/container";

test("disabled env: body walk is a no-op", async () => {
  const prev = process.env.OMNIROUTE_IMAGE_NORMALIZATION;
  delete process.env.OMNIROUTE_IMAGE_NORMALIZATION;
  try {
    const body = {
      messages: [
        {
          role: "user",
          content: [{ type: "image_url", image_url: { url: "data:image/png;base64,aGVsbG8=" } }],
        },
      ],
    };
    const stats = await normalizeVisionImagesInBody(body);
    assert.equal(stats.normalized, 0);
    assert.equal(stats.skipped, 0, "no walk happens at all when disabled");
    assert.equal(
      (body.messages[0].content as { image_url: { url: string } }[])[0].image_url.url,
      "data:image/png;base64,aGVsbG8=",
      "body untouched"
    );
  } finally {
    if (prev !== undefined) process.env.OMNIROUTE_IMAGE_NORMALIZATION = prev;
  }
});

const withNormalizationOn = async (fn: () => Promise<void>) => {
  const prev = process.env.OMNIROUTE_IMAGE_NORMALIZATION;
  process.env.OMNIROUTE_IMAGE_NORMALIZATION = "1";
  try {
    await fn();
  } finally {
    if (prev === undefined) delete process.env.OMNIROUTE_IMAGE_NORMALIZATION;
    else process.env.OMNIROUTE_IMAGE_NORMALIZATION = prev;
  }
};

test(
  "oversized PNG is resized into the long-edge and pixel budget",
  { skip: sharpMissing },
  async () => {
    // 6000×800 PNG: long edge 6000 > 4096 AND 4.8M pixels > 4.19M.
    const input = await sharp({
      create: { width: 6000, height: 800, channels: 3, background: "#334455" },
    })
      .png()
      .toBuffer();
    const out = await normalizeVisionImageBuffer(input);
    assert.equal(out.changed, true);
    assert.equal(out.mime, "image/png");
    const meta = await sharp(out.buffer).metadata();
    assert.ok((meta.width ?? 0) <= 4096, `width ${meta.width} within 4096`);
    assert.ok((meta.height ?? 0) <= 4096, `height ${meta.height} within 4096`);
    assert.ok((meta.width ?? 0) * (meta.height ?? 0) <= 4_194_304, "pixel budget respected");
  }
);

test(
  "alpha-carrying image is flattened to white and re-encoded as baseline JPEG",
  { skip: sharpMissing },
  async () => {
    const input = await sharp({
      create: { width: 256, height: 256, channels: 4, background: "#00000080" },
    })
      .png()
      .toBuffer();
    const out = await normalizeVisionImageBuffer(input);
    assert.equal(out.changed, true);
    assert.equal(out.mime, "image/jpeg");
    const meta = await sharp(out.buffer).metadata();
    assert.equal(meta.format, "jpeg");
    assert.equal(meta.hasAlpha, false, "alpha must be gone (flattened)");
    assert.equal(meta.isProgressive ?? false, false, "baseline (non-progressive) JPEG");
  }
);

test(
  "EXIF orientation is applied before resizing, so an oversized phone photo keeps its upright view",
  { skip: sharpMissing },
  async () => {
    // Stored 6000×600 with EXIF orientation 6 (rotate 90° CW to display): the
    // image a viewer sees is a 600×6000 portrait. Re-encoding drops EXIF, so
    // the rotation must be baked into the pixels or the model sees it sideways.
    const oriented = sharp as unknown as (opts: SharpCreateOptions) => {
      jpeg(opts?: { quality?: number }): {
        withMetadata(o: { orientation: number }): SharpInstance;
      };
    };
    const input = await oriented({
      create: { width: 6000, height: 600, channels: 3, background: "#556677" },
    })
      .jpeg({ quality: 80 })
      .withMetadata({ orientation: 6 })
      .toBuffer();
    const inMeta = (await sharp(input).metadata()) as SharpMeta & { orientation?: number };
    assert.equal(inMeta.orientation, 6, "fixture carries EXIF orientation 6");

    const out = await normalizeVisionImageBuffer(input);
    assert.equal(out.changed, true);
    const meta = (await sharp(out.buffer).metadata()) as SharpMeta & { orientation?: number };
    assert.ok(
      (meta.height ?? 0) > (meta.width ?? 0),
      `upright portrait expected, got ${meta.width}×${meta.height}`
    );
    assert.ok((meta.height ?? 0) <= 4096, `long edge ${meta.height} within 4096`);
    assert.ok((meta.width ?? 0) * (meta.height ?? 0) <= 4_194_304, "pixel budget respected");
    assert.ok(
      meta.orientation === undefined || meta.orientation === 1,
      `no residual rotation tag (got ${meta.orientation})`
    );
  }
);

test(
  "an already-compliant RGB JPEG passes through byte-identical",
  { skip: sharpMissing },
  async () => {
    const input = await sharp({
      create: { width: 640, height: 480, channels: 3, background: "#aabbcc" },
    })
      .jpeg({ quality: 80 })
      .toBuffer();
    const out = await normalizeVisionImageBuffer(input);
    assert.equal(out.changed, false);
    assert.ok(out.buffer.equals(input), "byte-identical passthrough");
  }
);

test(
  "body walker rewrites OpenAI image_url and Claude source data URIs, leaves URLs and text alone",
  { skip: sharpMissing },
  async () => {
    await withNormalizationOn(async () => {
      const png = await sharp({
        create: { width: 5000, height: 600, channels: 3, background: "#112233" },
      })
        .png()
        .toBuffer();
      const dataUri = `data:image/png;base64,${png.toString("base64")}`;

      const body = {
        model: "vision-model",
        messages: [
          { role: "user", content: "look at these" },
          {
            role: "user",
            content: [
              { type: "text", text: "screenshot:" },
              { type: "image_url", image_url: { url: dataUri } },
              { type: "image_url", image_url: { url: "https://example.com/remote.png" } },
            ],
          },
          {
            role: "user",
            content: [
              { type: "text", text: "claude-form:" },
              {
                type: "image",
                source: { type: "base64", media_type: "image/png", data: png.toString("base64") },
              },
            ],
          },
        ],
      };
      const stats = await normalizeVisionImagesInBody(body);
      assert.equal(stats.normalized, 2, "one OpenAI-form + one Claude-form image normalized");
      assert.equal(stats.skipped, 0, "remote URLs are not attempted (not downloaded, not counted)");

      interface ContentPart {
        type: string;
        text?: string;
        image_url?: { url: string };
        source?: { type: string; media_type: string; data: string };
      }
      const typedMessages = body.messages as { role: string; content: string | ContentPart[] }[];
      const openaiUrl = (typedMessages[1].content as ContentPart[]).find(
        (p) => p.type === "image_url" && p.image_url?.url.startsWith("data:")
      )?.image_url?.url;
      assert.ok(openaiUrl, "data-URI part survived");
      assert.notEqual(openaiUrl, dataUri, "oversized data URI was rewritten");
      assert.match(openaiUrl, /^data:image\/png;base64,/);

      const claudeBlock = (typedMessages[2].content as ContentPart[]).find(
        (p) => p.type === "image"
      );
      assert.ok(claudeBlock?.source?.data, "Claude-form image block present");
      const rewritten = Buffer.from(claudeBlock!.source!.data, "base64");
      const meta = await sharp(rewritten).metadata();
      assert.ok((meta.width ?? 0) <= 4096, "Claude-form image also normalized");
    });
  }
);

test("garbage data URIs are skipped, never thrown", async () => {
  await withNormalizationOn(async () => {
    const body = {
      messages: [
        {
          role: "user",
          content: [
            { type: "image_url", image_url: { url: "data:image/png;base64,not-really-base64!!!" } },
          ],
        },
      ],
    };
    const stats = await normalizeVisionImagesInBody(body);
    assert.equal(stats.normalized, 0);
    assert.equal(stats.skipped, 1);
    const part = (body.messages[0].content as { type: string; image_url: { url: string } }[])[0];
    assert.equal(
      part.image_url.url,
      "data:image/png;base64,not-really-base64!!!",
      "garbage passed through untouched (fail-open)"
    );
  });
});
