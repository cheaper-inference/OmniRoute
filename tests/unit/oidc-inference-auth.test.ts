/**
 * Generic OIDC inference auth on the client API (/v1/*).
 *
 * Covers token verification against a standards-compliant issuer (Keycloak
 * shape: realm_access.roles / resource_access), role → key-group mapping,
 * just-in-time shadow-key provisioning, and fail-closed behavior.
 *
 * No network: a locally generated RSA key pair signs the tokens and a stubbed
 * global `fetch` serves discovery + JWKS. Self-isolating DATA_DIR like the
 * Entra suite.
 */
import { describe, it, before, after, beforeEach } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT, exportJWK, generateKeyPair, type CryptoKey } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "oidc-inference-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "oidc-inference-test-secret";

const ISSUER = "https://auth.example.com/realms/main";
const DISCOVERY_URL = `${ISSUER}/.well-known/openid-configuration`;
const JWKS_URI = "https://auth.example.com/realms/main/protocol/openid-connect/certs";
const AUDIENCE = "omniroute-inference";
const KID = "test-signing-key";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { createKeyGroup, getKeyGroupsForApiKey } = await import("../../src/lib/db/apiKeyGroups.ts");
const { getSsoIdentity } = await import("../../src/lib/db/ssoIdentities.ts");
const {
  evaluateOidcInferenceAuth,
  resetOidcInferenceResolutionCache,
  looksLikeOidcJwt,
  oidcInferenceIdentityKey,
} = await import("../../src/server/authz/oidcInference/evaluate.ts");
const { resetOidcDiscoveryCache, parseOidcInferenceSettings } =
  await import("../../src/server/authz/oidcInference/config.ts");
const { extractOidcRoles } = await import("../../src/server/authz/oidcInference/verifyToken.ts");

let signingKey: CryptoKey;
let jwksKeys: Record<string, unknown>[];

const realFetch = globalThis.fetch;

function installFetchStub(): void {
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    if (url === DISCOVERY_URL) {
      return new Response(
        JSON.stringify({
          issuer: ISSUER,
          authorization_endpoint: `${ISSUER}/protocol/openid-connect/auth`,
          token_endpoint: `${ISSUER}/protocol/openid-connect/token`,
          jwks_uri: JWKS_URI,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (url === JWKS_URI) {
      return new Response(JSON.stringify({ keys: jwksKeys }), {
        status: 200,
        headers: { "Content-Type": "application/json" } as Record<string, string>,
      });
    }
    throw new Error(`Unexpected fetch in test: ${url}`);
  }) as typeof fetch;
}

interface TokenOverrides {
  audience?: string;
  issuer?: string;
  sub?: string;
  realmRoles?: string[];
  clientRoles?: Record<string, string[]>;
  expiresAt?: number;
  signWithWrongKey?: boolean;
  alg?: string;
  username?: string;
}

let wrongKey: CryptoKey;

async function mintToken(overrides: TokenOverrides = {}): Promise<string> {
  const payload: Record<string, unknown> = {
    iss: overrides.issuer ?? ISSUER,
    aud: overrides.audience ?? AUDIENCE,
    sub: overrides.sub ?? "user-123",
    preferred_username: overrides.username ?? "alice",
    exp: overrides.expiresAt ?? Math.floor(Date.now() / 1000) + 300,
    iat: Math.floor(Date.now() / 1000),
  };
  if (overrides.realmRoles) payload.realm_access = { roles: overrides.realmRoles };
  if (overrides.clientRoles) payload.resource_access = overrides.clientRoles;

  const key = overrides.signWithWrongKey ? wrongKey : signingKey;
  const kid = overrides.signWithWrongKey ? "wrong-key" : KID;
  return new SignJWT(payload).setProtectedHeader({ alg: "RS256", kid, typ: "JWT" }).sign(key);
}

async function enableSso(overrides: Record<string, unknown> = {}): Promise<void> {
  await updateSettings({
    oidcInferenceEnabled: true,
    oidcInferenceIssuer: ISSUER,
    oidcInferenceAudience: AUDIENCE,
    oidcInferenceRoleMappings: [
      { role: "omniroute", keyGroupId: baseKeyGroupId },
      { role: "omniroute-plus", keyGroupId: plusKeyGroupId },
    ],
    oidcInferenceDefaultKeyGroupId: null,
    ...overrides,
  });
  invalidateDbCache("settings");
}

let baseKeyGroupId: string;
let plusKeyGroupId: string;

before(async () => {
  const pair = await generateKeyPair("RS256", { extractable: true });
  signingKey = pair.privateKey;
  const wrongPair = await generateKeyPair("RS256", { extractable: true });
  wrongKey = wrongPair.privateKey;
  const publicJwk = await exportJWK(pair.publicKey);
  jwksKeys = [{ ...publicJwk, kid: KID, alg: "RS256", use: "sig" }];
  installFetchStub();

  baseKeyGroupId = createKeyGroup("OIDC base", "role omniroute").id;
  plusKeyGroupId = createKeyGroup("OIDC plus", "role omniroute-plus").id;

  await enableSso();
});

beforeEach(() => {
  resetOidcInferenceResolutionCache();
  resetOidcDiscoveryCache();
});

after(() => {
  globalThis.fetch = realFetch;
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

describe("looksLikeOidcJwt — the coexist pre-filter", () => {
  it("rejects an OmniRoute API key", () => {
    assert.equal(looksLikeOidcJwt("sk-1234567890abcdef-abc123-deadbeef"), false);
  });

  it("rejects HS256 tokens and non-JWT strings", () => {
    assert.equal(looksLikeOidcJwt("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ4In0.c2ln"), false);
    assert.equal(looksLikeOidcJwt("garbage"), false);
    assert.equal(looksLikeOidcJwt("a.b.c"), false);
  });

  it("accepts an RS256 JWT with a kid", async () => {
    assert.equal(looksLikeOidcJwt(await mintToken()), true);
  });
});

describe("extractOidcRoles", () => {
  it("unions realm_access.roles and every resource_access client's roles", () => {
    const roles = extractOidcRoles({
      realm_access: { roles: ["omniroute", "default-roles-main"] },
      resource_access: {
        "claude-desktop": { roles: ["omniroute-plus"] },
        account: { roles: ["manage-account"] },
      },
    });
    assert.deepEqual(
      new Set(roles),
      new Set(["omniroute", "default-roles-main", "omniroute-plus", "manage-account"])
    );
  });

  it("returns empty for tokens without role claims", () => {
    assert.deepEqual(extractOidcRoles({ sub: "x" }), []);
  });
});

describe("config parsing", () => {
  it("parses role mappings, dropping malformed entries", () => {
    const config = parseOidcInferenceSettings({
      oidcInferenceEnabled: true,
      oidcInferenceIssuer: " https://auth.example.com/realms/main ",
      oidcInferenceAudience: "omniroute-inference",
      oidcInferenceRoleMappings: [
        { role: "omniroute", keyGroupId: "g1" },
        { role: "", keyGroupId: "g2" },
        "nonsense",
      ],
      oidcInferenceDefaultKeyGroupId: "",
    });
    assert.equal(config.enabled, true);
    assert.equal(config.issuer, "https://auth.example.com/realms/main");
    assert.deepEqual(config.roleMappings, [{ role: "omniroute", keyGroupId: "g1" }]);
    assert.equal(config.defaultKeyGroupId, null);
  });
});

describe("evaluateOidcInferenceAuth — happy path", () => {
  it("provisions a shadow key in the mapped group for a realm role", async () => {
    const verdict = await evaluateOidcInferenceAuth(await mintToken({ realmRoles: ["omniroute"] }));
    assert.equal(verdict.ok, true);
    if (!verdict.ok) return;
    const identity = getSsoIdentity(verdict.oid);
    assert.ok(identity, "sso identity row created");
    const groups = identity ? getKeyGroupsForApiKey(identity.apiKeyId).map((g) => g.id) : [];
    assert.equal(groups.includes(baseKeyGroupId), true);
    assert.equal(verdict.label, "alice");
  });

  it("maps the plus role to the plus group, and multiple roles to both", async () => {
    const verdict = await evaluateOidcInferenceAuth(
      await mintToken({ sub: "both", realmRoles: ["omniroute", "omniroute-plus"] })
    );
    assert.equal(verdict.ok, true);
    if (!verdict.ok) return;
    const identity = getSsoIdentity(verdict.oid)!;
    const groups = getKeyGroupsForApiKey(identity.apiKeyId).map((g) => g.id);
    assert.equal(groups.includes(baseKeyGroupId), true);
    assert.equal(groups.includes(plusKeyGroupId), true);
  });

  it("accepts client roles from resource_access", async () => {
    const verdict = await evaluateOidcInferenceAuth(
      await mintToken({
        sub: "client-roles",
        clientRoles: { "claude-desktop": { roles: ["omniroute"] } as unknown as string[] },
      })
    );
    assert.equal(verdict.ok, true);
  });
});

describe("evaluateOidcInferenceAuth — fail closed", () => {
  it("denies a user whose roles map to nothing (403, not wide open)", async () => {
    const verdict = await evaluateOidcInferenceAuth(
      await mintToken({ sub: "norole", realmRoles: ["default-roles-main"] })
    );
    assert.equal(verdict.ok, false);
    if (verdict.ok) return;
    const f = verdict as { status: number; code: string };
    assert.equal(f.status, 403);
    assert.equal(f.code, "AUTH_OIDC_INFERENCE_NO_ROLE");
  });

  it("rejects a wrong audience", async () => {
    const verdict = await evaluateOidcInferenceAuth(
      await mintToken({ audience: "api://other", realmRoles: ["omniroute"] })
    );
    assert.equal(verdict.ok, false);
    if (verdict.ok) return;
    const f = verdict as { status: number; code: string };
    assert.equal(f.status, 401);
  });

  it("rejects a foreign issuer", async () => {
    const verdict = await evaluateOidcInferenceAuth(
      await mintToken({ issuer: "https://evil.example.com/realms/main", realmRoles: ["omniroute"] })
    );
    assert.equal(verdict.ok, false);
    if (verdict.ok) return;
    const f = verdict as { status: number; code: string };
    assert.equal(f.status, 401);
  });

  it("rejects a signature from an unknown key", async () => {
    const verdict = await evaluateOidcInferenceAuth(
      await mintToken({ signWithWrongKey: true, realmRoles: ["omniroute"] })
    );
    assert.equal(verdict.ok, false);
    if (verdict.ok) return;
    const f = verdict as { status: number; code: string };
    assert.equal(f.status, 401);
  });

  it("rejects an expired token", async () => {
    const verdict = await evaluateOidcInferenceAuth(
      await mintToken({ realmRoles: ["omniroute"], expiresAt: Math.floor(Date.now() / 1000) - 100 })
    );
    assert.equal(verdict.ok, false);
    if (verdict.ok) return;
    const f = verdict as { status: number; code: string };
    assert.equal(f.code, "AUTH_OIDC_INFERENCE_EXPIRED");
  });

  it("refuses to run when disabled or half-configured", async () => {
    await updateSettings({ oidcInferenceEnabled: false });
    await invalidateDbCache();
    const disabled = await evaluateOidcInferenceAuth(
      await mintToken({ realmRoles: ["omniroute"] })
    );
    assert.equal(disabled.ok, false);

    await enableSso({ oidcInferenceAudience: "" });
    const halfConfigured = await evaluateOidcInferenceAuth(
      await mintToken({ realmRoles: ["omniroute"] })
    );
    assert.equal(halfConfigured.ok, false);
    if (halfConfigured.ok) return;
    const hf = halfConfigured as { status: number; code: string };
    assert.equal(hf.code, "AUTH_OIDC_INFERENCE_INCOMPLETE");

    await enableSso();
  });
});

describe("identity key", () => {
  it("is distinct per issuer and stable per subject", () => {
    const a = oidcInferenceIdentityKey(ISSUER, "user-1");
    const b = oidcInferenceIdentityKey("https://other.example.com/realms/x", "user-1");
    assert.notEqual(a, b);
    assert.equal(a, oidcInferenceIdentityKey(ISSUER, "user-1"));
  });
});
