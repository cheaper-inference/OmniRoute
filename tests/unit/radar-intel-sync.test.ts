import assert from "node:assert/strict";
import crypto from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

import type { RadarIntelCacheEntry } from "../../src/lib/radar/intelSync.ts";

const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
process.env.RADAR_FEED_PUBKEY = publicKey
  .export({ type: "spki", format: "der" })
  .toString("base64");

const intelSync = await import("../../src/lib/radar/intelSync.ts");
const { RadarIntelFeedSchema } = await import("../../src/lib/radar/intelFeedSchema.ts");

async function fixtureBytes(): Promise<Buffer> {
  return readFile(new URL("../fixtures/radar-intel-canonical.json", import.meta.url));
}

function sign(bytes: Buffer): string {
  return crypto.sign(null, bytes, privateKey).toString("base64");
}

function response(body: Buffer, headers: Record<string, string> = {}, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers(headers),
    arrayBuffer: async () => body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength),
  } as Response;
}

const supporterKey = `omr_${"a".repeat(40)}`;
const liveSettings = { optIn: true, supporterKey };

test("canonical Intel fixture is byte-identical to the private contract", async () => {
  const bytes = await fixtureBytes();
  assert.equal(bytes.byteLength, 1024);
  assert.equal(
    crypto.createHash("sha256").update(bytes).digest("hex"),
    "c36aaa6ad53942afa0325d6b0fad0aa048ef66f24c805b743b9815446b0e6176"
  );
  assert.equal(RadarIntelFeedSchema.parse(JSON.parse(bytes.toString("utf8"))).tier, "live");
});

test("Intel schema rejects telemetry and inconsistent ranking counters", async () => {
  const feed = JSON.parse((await fixtureBytes()).toString("utf8"));
  assert.equal(RadarIntelFeedSchema.safeParse({ ...feed, uptime: 99.9 }).success, false);
  feed.rankings[0].matches = 2;
  assert.equal(RadarIntelFeedSchema.safeParse(feed).success, false);
});

test("Intel sync gates before fetch and only accepts exact signed live bytes", async () => {
  for (const expected of ["disabled", "opt_out"] as const) {
    let fetched = false;
    const result = await intelSync.syncRadarIntel({
      getFlag: () => expected !== "disabled",
      getSettings: () =>
        expected === "opt_out"
          ? { optIn: false, supporterKey: null }
          : { optIn: true, supporterKey: null },
      fetch: (async () => {
        fetched = true;
        return response(Buffer.from("{}"));
      }) as typeof fetch,
    });
    assert.equal(result.status, expected);
    assert.equal(fetched, false);
  }

  const bytes = await fixtureBytes();
  const writes: RadarIntelCacheEntry[] = [];
  let authorization: string | null = "";
  let requestUrl = "";
  const result = await intelSync.syncRadarIntel({
    getFlag: () => true,
    getSettings: () => liveSettings,
    getCache: () => null,
    setCache: (entry) => writes.push(entry),
    fetch: (async (input, init) => {
      requestUrl = String(input);
      authorization = new Headers(init?.headers).get("authorization");
      return response(bytes, {
        "x-omniroute-feed-signature": sign(bytes),
        "x-omniroute-feed-tier": "community",
      });
    }) as typeof fetch,
    now: () => new Date("2026-08-09T12:05:00.000Z"),
  });

  assert.deepEqual(result, { status: "updated", version: "2026.08.09.1" });
  assert.equal(requestUrl, "https://radar.omniroute.online/v1/intel/latest");
  assert.equal(authorization, null);
  assert.equal(writes[0]?.payload, bytes.toString("utf8"));
  assert.equal(writes[0]?.tier, "live");
  assert.equal(writes[0]?.supporterIdentity, "");
  assert.equal(writes[0]?.signature, sign(bytes));
});

test("Intel sync preserves the good cache on signature, schema, replay, and size failures", async () => {
  const bytes = await fixtureBytes();
  const validSignature = sign(bytes);
  const cases = [
    { expected: "invalid_signature", body: bytes, signature: "bad", tier: "live" },
    {
      expected: "invalid_schema",
      body: Buffer.from(
        JSON.stringify({ ...JSON.parse(bytes.toString("utf8")), tier: "community" })
      ),
      signature: "",
      tier: "live",
    },
    {
      expected: "invalid_schema",
      body: Buffer.from('{"feed":"wrong"}'),
      signature: "",
      tier: "live",
    },
  ];

  for (const item of cases) {
    const signature = item.expected === "invalid_schema" ? sign(item.body) : item.signature;
    let written = false;
    const result = await intelSync.syncRadarIntel({
      getFlag: () => true,
      getSettings: () => liveSettings,
      getCache: () => ({
        version: "2026.08.08.1",
        tier: "live",
        payload: "last-good",
        signature: "old",
        supporterIdentity: `radar:${"b".repeat(64)}`,
      }),
      setCache: () => {
        written = true;
      },
      fetch: (async () =>
        response(item.body, {
          "x-omniroute-feed-signature": signature,
          "x-omniroute-feed-tier": item.tier,
        })) as typeof fetch,
    });
    assert.equal(result.status, item.expected);
    assert.equal(written, false);
  }

  let written = false;
  const stale = await intelSync.syncRadarIntel({
    getFlag: () => true,
    getSettings: () => liveSettings,
    getCache: () => ({
      version: "2026.08.10.1",
      tier: "live",
      payload: "last-good",
      signature: "old",
      supporterIdentity: `radar:${"b".repeat(64)}`,
    }),
    setCache: () => {
      written = true;
    },
    touchCache: () => assert.fail("an older version must not refresh the fetch time"),
    fetch: (async () =>
      response(bytes, {
        "x-omniroute-feed-signature": validSignature,
        "x-omniroute-feed-tier": "live",
      })) as typeof fetch,
  });
  assert.equal(stale.status, "stale");

  const oversized = await intelSync.syncRadarIntel({
    getFlag: () => true,
    getSettings: () => liveSettings,
    getCache: () => null,
    setCache: () => {
      written = true;
    },
    fetch: (async () =>
      response(Buffer.from("ignored"), {
        "content-length": String(10 * 1024 * 1024 + 1),
      })) as typeof fetch,
  });
  assert.equal(oversized.status, "too_large");
  assert.equal(written, false);
});

test("Intel sync enforces the byte cap while reading streamed chunks", async () => {
  let cancelled = false;
  let written = false;
  const firstChunk = new Uint8Array(6 * 1024 * 1024);
  const secondChunk = new Uint8Array(5 * 1024 * 1024);
  const chunks = [firstChunk, secondChunk];
  let chunkIndex = 0;
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      controller.enqueue(chunks[chunkIndex]);
      chunkIndex += 1;
    },
    cancel() {
      cancelled = true;
    },
  });

  const result = await intelSync.syncRadarIntel({
    getFlag: () => true,
    getSettings: () => liveSettings,
    getCache: () => null,
    setCache: () => {
      written = true;
    },
    fetch: (async () =>
      new Response(body, {
        status: 200,
        headers: { "x-omniroute-feed-tier": "live" },
      })) as typeof fetch,
  });

  assert.equal(result.status, "too_large");
  assert.equal(cancelled, true);
  assert.equal(written, false);
});

test("Intel sync refreshes the fetch time of an equal signed version", async () => {
  const bytes = await fixtureBytes();
  const signature = sign(bytes);
  const fetchedAt = "2026-08-10T12:00:00.000Z";
  const touches: string[] = [];
  const result = await intelSync.syncRadarIntel({
    getFlag: () => true,
    getSettings: () => ({ optIn: true }),
    getCache: () => ({
      version: "2026.08.09.1",
      tier: "live",
      payload: bytes.toString("utf8"),
      signature,
      supporterIdentity: "",
    }),
    setCache: () => assert.fail("the equal version must not replace the payload"),
    touchCache: (value) => touches.push(value),
    fetch: async () => response(bytes, { "x-omniroute-feed-signature": signature }),
    now: () => new Date(fetchedAt),
  });
  assert.equal(result.status, "stale");
  assert.deepEqual(touches, [fetchedAt]);
});
