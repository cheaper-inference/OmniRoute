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

test("every redirect revalidates DNS and preserves the caller's fetch before shared overrides", async () => {
  const requested: string[] = [];
  const resolved: string[] = [];
  let overrideCalls = 0;
  let redirectBodyCancelled = false;
  setPinnedFetchTestOverride(async () => {
    overrideCalls++;
    return new Response("wrong transport");
  });
  try {
    const result = await fetchRemoteMedia("https://first.example.test/media", {
      guard: "public-only",
      pinDns: true,
      lookup: async (hostname) => {
        resolved.push(hostname);
        return [{ address: "203.0.113.10", family: 4 }];
      },
      fetchImpl: async (input) => {
        requested.push(String(input));
        assert.equal(resolved.length, requested.length);
        if (requested.length === 1) {
          return new Response(
            new ReadableStream({
              cancel() {
                redirectBodyCancelled = true;
              },
            }),
            {
              status: 302,
              headers: { location: "https://second.example.test/media" },
            }
          );
        }
        assert.equal(redirectBodyCancelled, true);
        return new Response("final media");
      },
    });
    assert.equal(result.buffer.toString(), "final media");
    assert.equal(result.url, "https://second.example.test/media");
    assert.deepEqual(resolved, ["first.example.test", "second.example.test"]);
    assert.deepEqual(requested, [
      "https://first.example.test/media",
      "https://second.example.test/media",
    ]);
    assert.equal(overrideCalls, 0);
  } finally {
    setPinnedFetchTestOverride(undefined);
  }
});

test("a shared fetch override cannot bypass private DNS validation on a redirect", async () => {
  const requested: string[] = [];
  setPinnedFetchTestOverride(async (input) => {
    requested.push(String(input));
    return new Response(null, {
      status: 302,
      headers: { location: "https://private.example.test/media" },
    });
  });
  try {
    await assert.rejects(
      fetchRemoteMedia("https://public.example.test/media", {
        guard: "public-only",
        pinDns: true,
        lookup: async (hostname) => [
          { address: hostname === "public.example.test" ? "203.0.113.10" : "10.0.0.2", family: 4 },
        ],
      }),
      /blocked private address/
    );
    assert.deepEqual(requested, ["https://public.example.test/media"]);
  } finally {
    setPinnedFetchTestOverride(undefined);
  }
});
