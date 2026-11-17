import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #19312: JSON `/v1/images/edits` bodies only accepted data-URL references. Public http(s)
// references (`image: "https://..."`, `image: ["https://..."]`,
// `images: [{ image_url: "https://..." }]`) failed with "Invalid reference image", and an
// `image` array was counted as one unparseable candidate even when it held data URLs.

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-img-19312-"));

const {
  extractImageEditInputFromJson,
  resolveRemoteImageEditReferences,
  MAX_CODEX_IMAGE_EDIT_BYTES,
} = await import("../../src/lib/images/imageRouteModel.ts");
const { readEditInput } = await import("../../src/app/api/v1/images/edits/editInput.ts");
const { setPinnedFetchTestOverride } = await import("../../src/shared/network/remoteImageFetch.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3]);
const JPEG = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 4, 5, 6]);
const PNG_DATA_URL = `data:image/png;base64,${PNG.toString("base64")}`;

const publicLookup = async () => [{ address: "93.184.216.34", family: 4 }];

function mockFetch(routes: Record<string, () => Response>) {
  const calls: string[] = [];
  const fetchImpl = (async (input: string | URL | Request) => {
    const url = String(input);
    calls.push(url);
    const route = routes[url];
    return route ? route() : new Response("not found", { status: 404 });
  }) as typeof fetch;
  return { calls, fetchImpl };
}

const imageResponse =
  (bytes: Buffer, contentType = "image/png") =>
  () =>
    new Response(new Uint8Array(bytes), { status: 200, headers: { "content-type": contentType } });

test("#19312 resolves a public http(s) URL in a string `image` field", async () => {
  const { calls, fetchImpl } = mockFetch({ "https://cdn.example.com/ref.png": imageResponse(PNG) });
  const resolved = await resolveRemoteImageEditReferences(
    { prompt: "x", image: "https://cdn.example.com/ref.png" },
    { fetchImpl, lookup: publicLookup }
  );
  const out = extractImageEditInputFromJson(resolved);
  assert.deepEqual(calls, ["https://cdn.example.com/ref.png"]);
  assert.equal(out.imageInputCount, 1);
  assert.equal(out.images.length, 1);
  assert.equal(out.imageMime, "image/png");
  assert.deepEqual([...(out.imageBytes ?? [])], [...PNG]);
});

test("#19312 flattens an `image` array and resolves each URL entry", async () => {
  const { fetchImpl } = mockFetch({
    "https://cdn.example.com/a.jpg": imageResponse(JPEG, "application/octet-stream"),
  });
  const resolved = await resolveRemoteImageEditReferences(
    { prompt: "x", image: ["https://cdn.example.com/a.jpg", PNG_DATA_URL] },
    { fetchImpl, lookup: publicLookup }
  );
  const out = extractImageEditInputFromJson(resolved);
  assert.equal(out.imageInputCount, 2);
  // MIME comes from the magic bytes, not from the remote content-type header.
  assert.deepEqual(
    out.images.map((image) => image.mime),
    ["image/jpeg", "image/png"]
  );
});

test("#19312 extractImageEditInputFromJson counts each data URL in an `image` array", () => {
  const out = extractImageEditInputFromJson({ image: [PNG_DATA_URL, PNG_DATA_URL] });
  assert.equal(out.imageInputCount, 2);
  assert.equal(out.images.length, 2);
});

test("#19312 resolves `images[].image_url`, `images[].url` and bare `images[]` URLs", async () => {
  const { calls, fetchImpl } = mockFetch({
    "https://cdn.example.com/1.png": imageResponse(PNG),
    "https://cdn.example.com/2.png": imageResponse(PNG),
    "http://cdn.example.com/3.jpg": imageResponse(JPEG),
  });
  const resolved = await resolveRemoteImageEditReferences(
    {
      prompt: "x",
      images: [
        { image_url: "https://cdn.example.com/1.png" },
        { url: "https://cdn.example.com/2.png" },
        "http://cdn.example.com/3.jpg",
      ],
    },
    { fetchImpl, lookup: publicLookup }
  );
  const out = extractImageEditInputFromJson(resolved);
  assert.equal(calls.length, 3);
  assert.equal(out.imageInputCount, 3);
  assert.equal(out.images.length, 3);
});

test("#19312 private and loopback references are rejected without a request", async () => {
  const { calls, fetchImpl } = mockFetch({});
  const body = {
    prompt: "x",
    images: [
      { image_url: "http://127.0.0.1:20128/ref.png" },
      "http://169.254.169.254/latest/meta-data",
      "https://rebind.example.com/ref.png",
    ],
  };
  const resolved = await resolveRemoteImageEditReferences(body, {
    fetchImpl,
    lookup: async () => [{ address: "10.0.0.5", family: 4 }],
  });
  assert.deepEqual(calls, [], "the guard must block before any fetch");
  assert.deepEqual(resolved.images, body.images, "blocked references stay unresolved");
  const out = extractImageEditInputFromJson(resolved);
  assert.equal(out.imageInputCount, 3);
  assert.equal(out.images.length, 0);
});

test("#19312 oversized downloads are rejected", async () => {
  const oversized = Buffer.alloc(MAX_CODEX_IMAGE_EDIT_BYTES + 1);
  PNG.copy(oversized);
  const declared = mockFetch({
    "https://cdn.example.com/declared.png": () =>
      new Response(new Uint8Array(PNG), {
        status: 200,
        headers: {
          "content-type": "image/png",
          "content-length": String(MAX_CODEX_IMAGE_EDIT_BYTES + 1),
        },
      }),
  });
  const streamed = mockFetch({ "https://cdn.example.com/streamed.png": imageResponse(oversized) });

  for (const [url, { fetchImpl }] of [
    ["https://cdn.example.com/declared.png", declared],
    ["https://cdn.example.com/streamed.png", streamed],
  ] as const) {
    const resolved = await resolveRemoteImageEditReferences(
      { image: url },
      { fetchImpl, lookup: publicLookup }
    );
    assert.equal(resolved.image, url);
    assert.equal(extractImageEditInputFromJson(resolved).images.length, 0);
  }
});

test("#19312 non-image and failed downloads are rejected", async () => {
  const { fetchImpl } = mockFetch({
    "https://cdn.example.com/page.html": imageResponse(Buffer.from("<html></html>"), "text/html"),
    // A lying content-type does not make HTML an image.
    "https://cdn.example.com/fake.png": imageResponse(Buffer.from("<html></html>"), "image/png"),
    "https://cdn.example.com/icon.svg": imageResponse(
      Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"/>'),
      "image/svg+xml"
    ),
  });
  const urls = [
    "https://cdn.example.com/page.html",
    "https://cdn.example.com/fake.png",
    "https://cdn.example.com/icon.svg",
    "https://cdn.example.com/missing.png",
  ];
  const resolved = await resolveRemoteImageEditReferences(
    { image: urls },
    { fetchImpl, lookup: publicLookup }
  );
  assert.deepEqual(resolved.image, urls);
  const out = extractImageEditInputFromJson(resolved);
  assert.equal(out.imageInputCount, 4);
  assert.equal(out.images.length, 0);
});

test("#19312 reference sets above the edit limit are not fetched", async () => {
  const { calls, fetchImpl } = mockFetch({});
  const body = { image: Array(17).fill("https://cdn.example.com/ref.png") };
  const resolved = await resolveRemoteImageEditReferences(body, {
    fetchImpl,
    lookup: publicLookup,
  });
  assert.equal(resolved, body);
  assert.deepEqual(calls, []);
});

test("#19312 readEditInput resolves http(s) references in a JSON edit body", async () => {
  const calls: string[] = [];
  setPinnedFetchTestOverride((async (input: string | URL | Request) => {
    calls.push(String(input));
    return imageResponse(PNG)();
  }) as typeof fetch);
  try {
    const request = new Request("http://localhost/v1/images/edits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: "gpt-image-2",
        prompt: "make it blue",
        // An IP literal skips the DNS lookup, so no real resolver is involved.
        images: [{ image_url: "https://93.184.216.34/ref.png" }],
      }),
    });
    const input = await readEditInput(request);
    assert.ok(input);
    assert.deepEqual(calls, ["https://93.184.216.34/ref.png"]);
    assert.equal(input.imageInputCount, 1);
    assert.equal(input.images.length, 1);
    assert.equal(input.imageMime, "image/png");
    assert.equal(input.hasMask, false);
  } finally {
    setPinnedFetchTestOverride(undefined);
  }
});

test.after(() => {
  try {
    resetDbInstance();
  } catch {
    /* ignore */
  }
  try {
    fs.rmSync(process.env.DATA_DIR as string, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 100,
    });
  } catch {
    /* ignore */
  }
});
