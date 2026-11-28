import assert from "node:assert/strict";
import crypto from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

import type { RadarOffersCacheEntry } from "../../src/lib/radar/offersSync.ts";

const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
process.env.RADAR_FEED_PUBKEY = publicKey
  .export({ type: "spki", format: "der" })
  .toString("base64");

const offersSync = await import("../../src/lib/radar/offersSync.ts");

async function fixtureFeed(): Promise<Record<string, unknown>> {
  const bytes = await readFile(new URL("../fixtures/radar-offers-canonical.json", import.meta.url));
  return JSON.parse(bytes.toString("utf8")) as Record<string, unknown>;
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

function liveSettings(supporterKey: string | null = `omr_${"a".repeat(40)}`) {
  return { optIn: true, supporterKey };
}

test("offers sync gates flag and opt-in before fetch", async () => {
  for (const expected of ["disabled", "opt_out"] as const) {
    let fetched = false;
    const result = await offersSync.syncRadarOffers({
      getFlag: () => expected !== "disabled",
      getSettings: () =>
        expected === "opt_out" ? { optIn: false, supporterKey: null } : liveSettings(null),
      fetch: (async () => {
        fetched = true;
        return response(Buffer.from("{}"));
      }) as typeof fetch,
    });
    assert.equal(result.status, expected);
    assert.equal(fetched, false);
  }
});

test("valid offer feed without a tier header caches exact signed bytes without credentials", async () => {
  const feed = await fixtureFeed();
  const bytes = Buffer.from(JSON.stringify(feed));
  const signature = sign(bytes);
  const writes: RadarOffersCacheEntry[] = [];
  let requestUrl = "";
  let authorization: string | null = "";

  const result = await offersSync.syncRadarOffers({
    getFlag: () => true,
    getSettings: () => liveSettings(),
    getCache: () => null,
    setCache: (entry) => writes.push(entry),
    fetch: (async (input, init) => {
      requestUrl = String(input);
      authorization = new Headers(init?.headers).get("authorization");
      return response(bytes, {
        "x-omniroute-feed-signature": signature,
      });
    }) as typeof fetch,
    now: () => new Date("2026-08-09T12:05:00.000Z"),
  });

  assert.deepEqual(result, { status: "updated", version: "2026.08.09.1" });
  assert.equal(requestUrl, "https://radar.omniroute.online/v1/offers/latest");
  assert.equal(authorization, null);
  assert.equal(writes[0]!.payload, bytes.toString("utf8"));
  assert.equal(writes[0]!.signature, signature);
  assert.equal(writes[0]!.tier, "live");
});

test("signature and schema failures preserve the last good cache", async () => {
  const feed = await fixtureFeed();
  const validBytes = Buffer.from(JSON.stringify(feed));
  const cases: Array<{ expected: string; bytes: Buffer; signature: string; tier: string | null }> =
    [
      { expected: "invalid_signature", bytes: validBytes, signature: "invalid", tier: "live" },
      {
        expected: "invalid_schema",
        bytes: Buffer.from('{"feed":"wrong"}'),
        signature: "valid-for-case",
        tier: "live",
      },
      {
        expected: "invalid_schema",
        bytes: Buffer.from(JSON.stringify({ ...feed, tier: "community" })),
        signature: "valid-for-case",
        tier: "live",
      },
    ];

  for (const item of cases) {
    item.signature = item.expected === "invalid_signature" ? item.signature : sign(item.bytes);
    let written = false;
    const result = await offersSync.syncRadarOffers({
      getFlag: () => true,
      getSettings: () => liveSettings(),
      getCache: () => ({
        version: "2026.08.08.1",
        tier: "live",
        payload: "last-good",
        signature: "old",
      }),
      setCache: () => {
        written = true;
      },
      fetch: (async () =>
        response(item.bytes, {
          "x-omniroute-feed-signature": item.signature,
          ...(item.tier ? { "x-omniroute-feed-tier": item.tier } : {}),
        })) as typeof fetch,
    });
    assert.equal(result.status, item.expected);
    assert.equal(written, false);
  }
});

test("an older signed offer version preserves the payload and fetch time", async () => {
  const feed = await fixtureFeed();
  const bytes = Buffer.from(JSON.stringify(feed));
  let written = false;
  const result = await offersSync.syncRadarOffers({
    getFlag: () => true,
    getSettings: () => liveSettings(),
    getCache: () => ({
      version: "2026.08.10.1",
      tier: "live",
      payload: "last-good",
      signature: "old",
    }),
    setCache: () => {
      written = true;
    },
    touchCache: () => assert.fail("an older version must not refresh the fetch time"),
    fetch: (async () =>
      response(bytes, {
        "x-omniroute-feed-signature": sign(bytes),
        "x-omniroute-feed-tier": "live",
      })) as typeof fetch,
  });

  assert.equal(result.status, "stale");
  assert.equal(written, false);
});

test("oversized and sanitized network failures never overwrite the cache or leak the key", async () => {
  let written = false;
  const tooLarge = await offersSync.syncRadarOffers({
    getFlag: () => true,
    getSettings: () => liveSettings(),
    getCache: () => null,
    setCache: () => {
      written = true;
    },
    fetch: (async () =>
      response(Buffer.from("ignored"), {
        "content-length": String(10 * 1024 * 1024 + 1),
      })) as typeof fetch,
  });
  assert.equal(tooLarge.status, "too_large");

  const secret = `omr_${"b".repeat(40)}`;
  const failed = await offersSync.syncRadarOffers({
    getFlag: () => true,
    getSettings: () => liveSettings(secret),
    getCache: () => null,
    setCache: () => {
      written = true;
    },
    fetch: (async () => {
      throw new Error(`upstream failed for ${secret}\n    at /private/path.ts:1:1`);
    }) as typeof fetch,
  });
  assert.equal(failed.status, "error");
  assert.ok(!("reason" in failed) || !failed.reason.includes(secret));
  assert.ok(!("reason" in failed) || !failed.reason.includes("/private/path"));
  assert.equal(written, false);
});
