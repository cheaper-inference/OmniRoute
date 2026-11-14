import assert from "node:assert/strict";
import test from "node:test";

import {
  fetchRemoteMedia,
  setPinnedFetchTestOverride,
} from "../../open-sse/utils/remoteMediaFetch.ts";
import * as imageCompatibility from "../../src/shared/network/remoteImageFetch.ts";

test("application and engine entry points share the download policy and pinned-fetch override", async () => {
  assert.equal(imageCompatibility.fetchRemoteMedia, fetchRemoteMedia);
  assert.equal(imageCompatibility.setPinnedFetchTestOverride, setPinnedFetchTestOverride);
  const requested: string[] = [];
  imageCompatibility.setPinnedFetchTestOverride(async (input) => {
    requested.push(String(input));
    return new Response("shared-media", { headers: { "content-type": "audio/mpeg" } });
  });
  try {
    const result = await fetchRemoteMedia("https://cdn.example.test/audio.mp3", {
      guard: "public-only",
      pinDns: true,
      lookup: async () => [{ address: "203.0.113.10", family: 4 }],
      maxBytes: 64,
    });
    assert.equal(result.buffer.toString(), "shared-media");
    assert.equal(result.contentType, "audio/mpeg");
    assert.deepEqual(requested, ["https://cdn.example.test/audio.mp3"]);
  } finally {
    imageCompatibility.setPinnedFetchTestOverride(undefined);
  }
});

test("generic remote-media fetch reuses the public-only bounded download policy", async () => {
  const result = await fetchRemoteMedia("https://cdn.example.test/video.mp4", {
    fetchImpl: async () =>
      new Response(Buffer.from("video-bytes"), {
        headers: { "content-type": "video/mp4" },
      }),
    guard: "public-only",
    lookup: async () => [{ address: "203.0.113.10", family: 4 }],
    maxBytes: 1024,
  });

  assert.equal(result.buffer.toString(), "video-bytes");
  assert.equal(result.contentType, "video/mp4");
});

test("generic remote-media fetch rejects private DNS answers before downloading", async () => {
  let fetched = false;
  await assert.rejects(
    () =>
      fetchRemoteMedia("https://cdn.example.test/video.mp4", {
        fetchImpl: async () => {
          fetched = true;
          return new Response("unexpected");
        },
        guard: "public-only",
        lookup: async () => [{ address: "127.0.0.1", family: 4 }],
      }),
    /blocked private address/
  );
  assert.equal(fetched, false);
});

test("HTTPS-only media mode rejects a redirect downgrade before following the hop", async () => {
  const fetched: string[] = [];
  await assert.rejects(
    () =>
      fetchRemoteMedia("https://cdn.example.test/video.mp4", {
        enforceHttps: true,
        fetchImpl: async (input) => {
          fetched.push(String(input));
          return new Response(null, {
            status: 302,
            headers: { location: "http://public.example.test/downgraded.mp4" },
          });
        },
        guard: "public-only",
        lookup: async () => [{ address: "203.0.113.10", family: 4 }],
      }),
    /HTTPS/
  );
  assert.deepEqual(fetched, ["https://cdn.example.test/video.mp4"]);
});

test("existing image/audio callers remain backwards-compatible when HTTPS-only mode is omitted", async () => {
  const fetched: string[] = [];
  const result = await fetchRemoteMedia("https://cdn.example.test/media", {
    fetchImpl: async (input) => {
      fetched.push(String(input));
      if (fetched.length === 1) {
        return new Response(null, {
          status: 302,
          headers: { location: "http://public.example.test/media" },
        });
      }
      return new Response("media");
    },
    guard: "public-only",
    lookup: async () => [{ address: "203.0.113.10", family: 4 }],
  });
  assert.equal(result.buffer.toString(), "media");
  assert.equal(fetched.length, 2);
});
