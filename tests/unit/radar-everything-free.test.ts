import assert from "node:assert/strict";
import crypto from "node:crypto";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { SignJWT } from "jose";

import { getRadarIntel } from "../../src/lib/radar/index.ts";
import { syncRadarIntel } from "../../src/lib/radar/intelSync.ts";
import { syncRadarOffers } from "../../src/lib/radar/offersSync.ts";
import { syncRadarReferrals } from "../../src/lib/radar/referralsSync.ts";
import { syncRadar } from "../../src/lib/radar/sync.ts";

const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
process.env.RADAR_FEED_PUBKEY = publicKey
  .export({ type: "spki", format: "der" })
  .toString("base64");
const offersPayload = await readFile(
  new URL("../fixtures/radar-offers-canonical.json", import.meta.url),
  "utf8"
);
const intelPayload = await readFile(
  new URL("../fixtures/radar-intel-canonical.json", import.meta.url),
  "utf8"
);
const version = "2026.08.09.1";
const fetchedAt = "2026-08-10T12:00:00.000Z";
const intelCache = {
  version,
  tier: "community" as const,
  payload: intelPayload,
  signature: signature(intelPayload),
  fetchedAt,
  supporterIdentity: "",
};
const optedIn = { optIn: true, supporterKey: null };
const legacySettings = { optIn: true, supporterKey: `omr_${"a".repeat(40)}` };

function signature(payload: string): string {
  return crypto.sign(null, Buffer.from(payload), privateKey).toString("base64");
}

function signed(payload: string): Response {
  return new Response(payload, {
    headers: {
      "x-omniroute-feed-signature": signature(payload),
      "x-omniroute-feed-tier": "community",
    },
  });
}

test("offers sync runs without a key and sends no Authorization", async () => {
  const requests: Headers[] = [];
  const result = await syncRadarOffers({
    getFlag: () => true,
    getSettings: () => optedIn,
    fetch: async (_url, init) => {
      requests.push(new Headers(init?.headers));
      return signed(offersPayload);
    },
    getCache: () => null,
    setCache: () => {},
  });
  assert.equal(result.status, "updated");
  assert.deepEqual(
    requests.map((headers) => headers.get("authorization")),
    [null]
  );
});

test("a legacy stored key is never sent by any feed sync", async () => {
  const authorizations: (string | null)[] = [];
  const deps = {
    getFlag: () => true,
    getSettings: () => legacySettings,
    fetch: (async (_url, init) => {
      authorizations.push(new Headers(init?.headers).get("authorization"));
      return new Response(null, { status: 503 });
    }) satisfies typeof fetch,
  };
  await syncRadar(deps);
  await syncRadarReferrals(deps);
  await syncRadarOffers(deps);
  await syncRadarIntel(deps);
  assert.deepEqual(authorizations, [null, null, null, null]);
});

test("Intel sync caches an empty supporter identity", async () => {
  const identities: string[] = [];
  const result = await syncRadarIntel({
    getFlag: () => true,
    getSettings: () => optedIn,
    fetch: async () => signed(intelPayload),
    getCache: () => null,
    setCache: ({ supporterIdentity }) => identities.push(supporterIdentity),
  });
  assert.equal(result.status, "updated");
  assert.deepEqual(identities, [""]);
});

test("Intel accessor serves a community-tier cache with no supporter identity", () => {
  const result = getRadarIntel({ getFlag: () => true, getCache: () => intelCache });
  assert.equal(result.intel?.version, version);
  assert.deepEqual(result.meta, { version, tier: "community", fetchedAt });
});

test("same offers version renews fetchedAt without rewriting the payload", async () => {
  const touches: string[] = [];
  await syncRadarOffers({
    getFlag: () => true,
    getSettings: () => legacySettings,
    fetch: async () => signed(offersPayload),
    getCache: () => ({
      version,
      tier: "live",
      payload: offersPayload,
      signature: signature(offersPayload),
    }),
    setCache: () => assert.fail("the equal version must not replace the payload"),
    now: () => new Date(fetchedAt),
    touchCache: (value: string) => touches.push(value),
  });
  assert.deepEqual(touches, [fetchedAt]);
});

test("settings and status expose only opt-in; a legacy key is ignored on write", async (t) => {
  process.env.RADAR_ENABLED = "true";
  process.env.JWT_SECRET = "test-radar-everything-free-secret";
  process.env.INITIAL_PASSWORD = "test-radar-everything-free-password";
  t.mock.method(globalThis, "fetch", async () => new Response(null, { status: 503 }));

  const settings = await import("../../src/app/api/radar/settings/route.ts");
  const status = await import("../../src/app/api/radar/status/route.ts");
  const { getRadarSettings } = await import("../../src/lib/db/radar.ts");
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  const headers = { Cookie: `auth_token=${token}`, "Content-Type": "application/json" };
  const settingsUrl = "http://localhost:20128/api/radar/settings";
  const post = (body: object) =>
    settings.POST(
      new Request(settingsUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      })
    );

  assert.deepEqual(await (await settings.GET(new Request(settingsUrl, { headers }))).json(), {
    optIn: false,
  });
  const supporterKey = `omr_${"b".repeat(40)}`;
  const response = await post({ optIn: true, supporterKey });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, optIn: true });
  assert.equal(getRadarSettings().supporterKey, null);
  assert.equal((await post({ supporterKey })).status, 400);
  const statusResponse = await status.GET(
    new Request("http://localhost:20128/api/radar/status", { headers })
  );
  assert.deepEqual((await statusResponse.json()).settings, { optIn: true });
});

test("only the private Radar admin link remains configurable", async () => {
  const links = await import("../../src/lib/radar/links.ts");
  assert.deepEqual(Object.keys(links), ["getRadarAdminUrl"]);
  assert.equal(existsSync("src/lib/radar/supporterKey.ts"), false);
});

test("Intel 404 means unpublished and drops the local copy", async () => {
  let clears = 0;
  const result = await syncRadarIntel({
    getFlag: () => true,
    getSettings: () => optedIn,
    fetch: async () => new Response(null, { status: 404 }),
    getCache: () => intelCache,
    setCache: () => assert.fail("an HTTP error must not replace the payload"),
    clearCache: () => {
      clears += 1;
    },
  });

  assert.deepEqual(result, { status: "unpublished" });
  assert.equal(clears, 1);
});

test("Intel 503 preserves the local copy", async () => {
  let clears = 0;
  const result = await syncRadarIntel({
    getFlag: () => true,
    getSettings: () => optedIn,
    fetch: async () => new Response(null, { status: 503 }),
    getCache: () => intelCache,
    setCache: () => assert.fail("an HTTP error must not replace the payload"),
    clearCache: () => {
      clears += 1;
    },
  });

  assert.equal(result.status, "error");
  assert.equal(clears, 0);
});

test("unpublished Intel clears only its own persisted feed", async () => {
  const db = await import("../../src/lib/db/radar.ts");
  db.setRadarIntelCache({ ...intelCache, tier: "live" });
  const catalogCache = {
    version,
    tier: "community",
    payload: "{}",
    signature: "fixture",
    fetchedAt,
  };
  db.setRadarCache(catalogCache);

  const result = await syncRadarIntel({
    getFlag: () => true,
    getSettings: () => optedIn,
    fetch: async () => new Response(null, { status: 404 }),
  });

  assert.deepEqual(result, { status: "unpublished" });
  assert.equal(db.getRadarIntelCache(), null);
  assert.deepEqual(db.getRadarCache(), { ...catalogCache, generatedAt: null });
});
