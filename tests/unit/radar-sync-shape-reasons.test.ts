/**
 * Radar sync: after the signature check passes, a feed with a bad shape reports up to
 * 8 path-labelled reasons (for example `models[0].id: ...`) next to `invalid_schema`.
 * The status string and the "cache untouched" rule do not change. Reasons name paths
 * and zod messages only; they never echo feed values.
 */
import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
process.env.RADAR_FEED_PUBKEY = publicKey
  .export({ type: "spki", format: "der" })
  .toString("base64");

const syncMod = await import("../../src/lib/radar/sync.ts");

const FIXTURE = JSON.parse(
  fs.readFileSync(
    path.resolve(import.meta.dirname!, "../fixtures/radar-feed-canonical.json"),
    "utf8"
  )
);

async function syncBytes(bytes: Buffer) {
  const signature = crypto.sign(null, bytes, privateKey).toString("base64");
  let cacheWritten = false;
  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: () => {
      cacheWritten = true;
    },
    fetch: (() =>
      Promise.resolve({
        ok: true,
        status: 200,
        headers: new Map([["x-omniroute-feed-signature", signature]]),
        arrayBuffer: () =>
          Promise.resolve(
            bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
          ),
      } as unknown as Response)) as unknown as typeof globalThis.fetch,
  });
  return { result, cacheWritten };
}

test("invalid_schema names the broken path and never echoes the bad value", async () => {
  const broken = structuredClone(FIXTURE);
  broken.models[0].modelId = 12345678901;
  const { result, cacheWritten } = await syncBytes(Buffer.from(JSON.stringify(broken)));

  assert.equal(result.status, "invalid_schema");
  assert.equal(cacheWritten, false);
  const reasons = (result as { reasons?: string[] }).reasons;
  assert.ok(Array.isArray(reasons) && reasons.length > 0, "reasons must be present");
  assert.ok(
    reasons.some((r) => r.startsWith("models[0].modelId")),
    `a reason must start with models[0].modelId, path, got: ${JSON.stringify(reasons)}`
  );
  assert.equal(JSON.stringify(reasons).includes("12345678901"), false);
});

test("invalid_schema reports at most 8 reasons", async () => {
  const broken = structuredClone(FIXTURE);
  broken.models = Array.from({ length: 20 }, () => ({ modelId: 1 }));
  const { result } = await syncBytes(Buffer.from(JSON.stringify(broken)));

  assert.equal(result.status, "invalid_schema");
  const reasons = (result as { reasons?: string[] }).reasons ?? [];
  assert.ok(reasons.length >= 1 && reasons.length <= 8, `got ${reasons.length}`);
});

test("a feed that is not JSON still returns invalid_schema with one reason", async () => {
  const { result } = await syncBytes(Buffer.from("not json"));
  assert.equal(result.status, "invalid_schema");
  assert.deepEqual((result as { reasons?: string[] }).reasons, ["body: not valid JSON"]);
});
