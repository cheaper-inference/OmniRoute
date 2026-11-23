/**
 * Batch items owned by an SSO identity must dispatch with that user's
 * shadow-key credential.
 *
 * `getApiKeyById()` redacts SSO secrets (`redactSsoSecret`) — a documented
 * security invariant. Before the fix, the batch worker resolved the owner key
 * only through that helper, so an SSO-owned batch dispatched every item with
 * no Authorization at all: 401 across the board with REQUIRE_API_KEY on,
 * anonymous inference (no group/budget policy, no attribution) with it off.
 * The worker must resolve the shadow secret through the same
 * lifecycle-checked path the policy layer uses, without weakening public
 * redaction — and a deprovisioned user's batch must still fail closed.
 */
import { after, before, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { mock } from "node:test";
import { SignJWT, exportJWK, generateKeyPair, type CryptoKey } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-batch-sso-shadow-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "batch-sso-shadow-test-secret";
process.env.STORAGE_ENCRYPTION_KEY = "synthetic-batch-sso-shadow-key-0001";

const ISSUER = "https://auth.example.com/realms/batch";
const DISCOVERY_URL = `${ISSUER}/.well-known/openid-configuration`;
const JWKS_URI = `${ISSUER}/protocol/openid-connect/certs`;
const AUDIENCE = "omniroute-inference";
const KID = "batch-sso-key";

const realFetch = globalThis.fetch;
let signingKey: CryptoKey;
let jwksKeys: Record<string, unknown>[];

const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { createKeyGroup } = await import("../../src/lib/db/apiKeyGroups.ts");
const { createFile } = await import("../../src/lib/db/files.ts");
const { getBatch, createBatch } = await import("../../src/lib/db/batches.ts");
const { getSsoIdentity, getSsoShadowSecret, setSsoKeyActive } =
  await import("../../src/lib/db/ssoIdentities.ts");
const { getApiKeyById } = await import("../../src/lib/db/apiKeys.ts");
const { evaluateOidcInferenceAuth, resetOidcInferenceResolutionCache, oidcInferenceIdentityKey } =
  await import("../../src/server/authz/oidcInference/evaluate.ts");
const { resetOidcDiscoveryCache } = await import("../../src/server/authz/oidcInference/config.ts");
const { dispatch } = await import("@/lib/batches/dispatch");
const batchProcessor = await import("../../open-sse/services/batchProcessor.ts");

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

async function mintToken(sub: string): Promise<string> {
  return new SignJWT({
    iss: ISSUER,
    aud: AUDIENCE,
    sub,
    preferred_username: "batch-user",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 300,
    realm_access: { roles: ["omniroute"] },
  })
    .setProtectedHeader({ alg: "RS256", kid: KID, typ: "JWT" })
    .sign(signingKey);
}

let keyGroupId: string;

before(async () => {
  const pair = await generateKeyPair("RS256", { extractable: true });
  signingKey = pair.privateKey;
  const publicJwk = await exportJWK(pair.publicKey);
  jwksKeys = [{ ...publicJwk, kid: KID, alg: "RS256", use: "sig" }];
  installFetchStub();

  keyGroupId = createKeyGroup("batch-sso-group", "role omniroute").id;
  await updateSettings({
    oidcInferenceEnabled: true,
    oidcInferenceIssuer: ISSUER,
    oidcInferenceAudience: AUDIENCE,
    oidcInferenceRoleMappings: [{ role: "omniroute", keyGroupId }],
    oidcInferenceDefaultKeyGroupId: null,
  });
  invalidateDbCache("settings");
});

beforeEach(() => {
  resetOidcInferenceResolutionCache();
  resetOidcDiscoveryCache();
});

after(() => {
  globalThis.fetch = realFetch;
  batchProcessor.stopBatchProcessor?.();
});

const BATCH_ITEM = {
  method: "POST",
  url: "/v1/chat/completions",
  body: { model: "gpt-4", messages: [{ role: "user", content: "hi" }] },
};

async function seedSsoOwnedBatch(sub: string): Promise<string> {
  const verdict = await evaluateOidcInferenceAuth(await mintToken(sub));
  assert.ok(verdict.ok, "SSO auth must succeed to seed a shadow key");
  const identity = getSsoIdentity(oidcInferenceIdentityKey(ISSUER, sub));
  assert.ok(identity, "identity must be provisioned");

  const file = await createFile({
    bytes: Buffer.byteLength(JSON.stringify(BATCH_ITEM) + "\n"),
    filename: "batch_input.jsonl",
    purpose: "batch_input",
    content: Buffer.from(JSON.stringify(BATCH_ITEM) + "\n"),
  });
  const batch = await createBatch({
    endpoint: "/v1/chat/completions",
    status: "validating",
    apiKeyId: identity.apiKeyId,
    inputFileId: file.id,
    completionWindow: "24h",
  });
  return batch.id;
}

async function runBatchToCompletion(batchId: string): Promise<void> {
  await batchProcessor.processPendingBatches();
  for (let i = 0; i < 80; i++) {
    const b = await getBatch(batchId);
    if (b?.status === "completed" || b?.status === "failed") return;
    await new Promise((r) => setTimeout(r, 50));
  }
  throw new Error("batch did not finish within timeout");
}

function okResponse(): Response {
  return new Response(
    JSON.stringify({
      id: "chatcmpl-batch",
      choices: [{ message: { content: "hello" } }],
      usage: { prompt_tokens: 10, completion_tokens: 5 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

describe("batch worker resolves SSO shadow credentials", () => {
  it("dispatches SSO-owned batch items with the shadow-key credential", async () => {
    const batchId = await seedSsoOwnedBatch("batch-sso-user");
    const identity = getSsoIdentity(oidcInferenceIdentityKey(ISSUER, "batch-sso-user"))!;
    const expectedSecret = getSsoShadowSecret(identity.oid);
    assert.ok(expectedSecret, "shadow secret must resolve for a live identity");

    // Public redaction contract stays intact in the same scenario.
    const redacted = await getApiKeyById(identity.apiKeyId);
    assert.equal((redacted as { key?: string }).key, "");

    let capturedApiKey: string | null | undefined;
    mock.method(dispatch, "dispatchBatchApiRequest", async (args: { apiKey?: string }) => {
      capturedApiKey = args?.apiKey;
      return okResponse();
    });

    await runBatchToCompletion(batchId);

    assert.equal(capturedApiKey, expectedSecret);
    const finished = await getBatch(batchId);
    assert.equal(finished?.status, "completed");
  });

  it("fails closed after the shadow key is deactivated (no credential escapes)", async () => {
    const batchId = await seedSsoOwnedBatch("deprovisioned-user");
    const identity = getSsoIdentity(oidcInferenceIdentityKey(ISSUER, "deprovisioned-user"))!;
    setSsoKeyActive(identity.apiKeyId, false);
    assert.equal(getSsoShadowSecret(identity.oid), null);

    let capturedApiKey: string | null | undefined = "unset";
    mock.method(dispatch, "dispatchBatchApiRequest", async (args: { apiKey?: string }) => {
      capturedApiKey = args?.apiKey;
      return okResponse();
    });

    await runBatchToCompletion(batchId);

    assert.ok(!capturedApiKey, "deprovisioned identity must not yield a credential");
  });
});
