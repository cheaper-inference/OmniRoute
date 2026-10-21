/**
 * MiniMax Code — dashboard device-code login (RFC 8628 + S256-PKCE).
 *
 * The account endpoint answers a pending device code with HTTP 400 and a JSON
 * body, so the body — not the status — decides what happened. The credential
 * obtained here is written into the local MiniMax Code profile.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { DEVICE_CODE_PROVIDERS } from "../../src/shared/constants/oauthDeviceCodeProviders.ts";
import {
  NOAUTH_PROVIDERS,
  supportsDeviceCodeLogin,
} from "../../src/shared/constants/providers.ts";
import { MINIMAX_CODE_CONFIG } from "../../src/lib/oauth/constants/oauth.ts";
import { minimaxCode } from "../../src/lib/oauth/providers/minimax-code.ts";
import { MINIMAX_CODE_DEVICE_GRANT } from "../../open-sse/config/minimaxCode.ts";
import { resolvePublicCred } from "../../open-sse/utils/publicCreds.ts";

const ACCOUNT_BASES = ["https://account.minimax.io", "https://account.minimax.cn"];

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("the dashboard device-code list contains minimax-code", () => {
  assert.equal(DEVICE_CODE_PROVIDERS.has("minimax-code"), true);
  assert.equal(supportsDeviceCodeLogin("minimax-code"), true);
});

test("minimax-code stays a no-auth provider that only adds a device-code login", () => {
  assert.equal(NOAUTH_PROVIDERS["minimax-code"]?.noAuth, true);
  assert.equal(NOAUTH_PROVIDERS["minimax-code"]?.isLocalCli, true);
});

test("the public client id comes from resolvePublicCred, never a literal", () => {
  assert.equal(MINIMAX_CODE_CONFIG.clientId, resolvePublicCred("minimax_id"));
  assert.equal(MINIMAX_CODE_CONFIG.scope, "agent.default");
  assert.equal(MINIMAX_CODE_CONFIG.audience, "agent-backend");
  assert.equal(ACCOUNT_BASES.includes(MINIMAX_CODE_CONFIG.accountBase), true);
  assert.equal(
    MINIMAX_CODE_CONFIG.deviceCodeUrl,
    `${MINIMAX_CODE_CONFIG.accountBase}/oauth2/device/code`
  );
  assert.equal(MINIMAX_CODE_CONFIG.tokenUrl, `${MINIMAX_CODE_CONFIG.accountBase}/oauth2/token`);
});

test("requestDeviceCode asks for an S256 device code and normalizes the answer", async () => {
  let seenUrl = "";
  let seenBody = "";
  const config = {
    ...MINIMAX_CODE_CONFIG,
    fetchImpl: (async (url: string, init: RequestInit) => {
      seenUrl = String(url);
      seenBody = String(init.body);
      return jsonResponse({
        device_code: "device-1",
        user_code: "ABCD-EFGH",
        verification_uri: "https://account.minimax.io/oauth-authorize",
        verification_uri_complete: "https://account.minimax.io/oauth-authorize?user_code=ABCD-EFGH",
        expires_in: 300,
        interval: 3,
      });
    }) as unknown as typeof fetch,
  };

  const result = await minimaxCode.requestDeviceCode(config, "challenge-value");

  assert.equal(seenUrl, MINIMAX_CODE_CONFIG.deviceCodeUrl);
  const form = new URLSearchParams(seenBody);
  assert.equal(form.get("client_id"), MINIMAX_CODE_CONFIG.clientId);
  assert.equal(form.get("scope"), "agent.default");
  assert.equal(form.get("audience"), "agent-backend");
  assert.equal(form.get("code_challenge"), "challenge-value");
  assert.equal(form.get("code_challenge_method"), "S256");

  assert.equal(result.device_code, "device-1");
  assert.equal(result.user_code, "ABCD-EFGH");
  assert.equal(result.verification_uri, "https://account.minimax.io/oauth-authorize");
  assert.equal(
    result.verification_uri_complete,
    "https://account.minimax.io/oauth-authorize?user_code=ABCD-EFGH"
  );
  assert.equal(result.expires_in, 300);
  assert.equal(result.interval, 3);
});

test("requestDeviceCode fails loudly when the account endpoint refuses", async () => {
  const config = {
    ...MINIMAX_CODE_CONFIG,
    fetchImpl: (async () => jsonResponse({ error: "invalid_client" }, 400)) as unknown as typeof fetch,
  };
  await assert.rejects(() => minimaxCode.requestDeviceCode(config, "challenge"));
});

test("pollToken reports authorization_pending (the endpoint answers 400)", async () => {
  let seenBody = "";
  const config = {
    ...MINIMAX_CODE_CONFIG,
    fetchImpl: (async (_url: string, init: RequestInit) => {
      seenBody = String(init.body);
      return jsonResponse(
        { error: "authorization_pending", error_description: "the user has not finished" },
        400
      );
    }) as unknown as typeof fetch,
  };

  const result = await minimaxCode.pollToken(config, "device-1", "verifier");
  assert.equal(result.ok, false);
  assert.equal(result.data.error, "authorization_pending");
  assert.equal(result.data.error_description, "the user has not finished");

  const form = new URLSearchParams(seenBody);
  assert.equal(form.get("grant_type"), MINIMAX_CODE_DEVICE_GRANT);
  assert.equal(form.get("device_code"), "device-1");
  assert.equal(form.get("client_id"), MINIMAX_CODE_CONFIG.clientId);
  assert.equal(form.get("code_verifier"), "verifier");
});

test("pollToken maps slow_down, expired_token and access_denied", async () => {
  const pollWithError = async (error: string) => {
    const config = {
      ...MINIMAX_CODE_CONFIG,
      fetchImpl: (async () =>
        jsonResponse({ error, error_description: "nope" }, 400)) as unknown as typeof fetch,
    };
    const result = await minimaxCode.pollToken(config, "device-1", "verifier");
    assert.equal(result.ok, false);
    assert.equal(result.data.error, error);
    return result;
  };

  await pollWithError("slow_down");
  await pollWithError("expired_token");
  await pollWithError("access_denied");
});

test("pollToken returns the token pair of an authorized grant", async () => {
  const config = {
    ...MINIMAX_CODE_CONFIG,
    fetchImpl: (async () =>
      jsonResponse({
        access_token: "access-token",
        refresh_token: "refresh-token",
        expires_in: 3600,
        token_type: "Bearer",
      })) as unknown as typeof fetch,
  };

  const result = await minimaxCode.pollToken(config, "device-1", "verifier");
  assert.equal(result.ok, true);
  assert.equal(result.data.access_token, "access-token");
  assert.equal(result.data.refresh_token, "refresh-token");
});

test("mapTokens maps the grant and reports whether the local profile was written", () => {
  const mapped = minimaxCode.mapTokens(
    { access_token: "access-token", refresh_token: "refresh-token", expires_in: 3600 },
    { profileSynced: true }
  );
  assert.equal(mapped.accessToken, "access-token");
  assert.equal(mapped.refreshToken, "refresh-token");
  assert.equal(mapped.expiresIn, 3600);
  assert.equal(mapped.tokenType, "Bearer");
  assert.equal(mapped.providerSpecificData.profileSynced, true);

  const unsynced = minimaxCode.mapTokens({ access_token: "access-token" });
  assert.equal(unsynced.providerSpecificData.profileSynced, false);
});

test("postExchange writes the credential into the local MiniMax Code profile", async () => {
  const dir = await mkdtemp(join(tmpdir(), "minimax-code-oauth-"));
  const profilePath = join(dir, "auth.json");
  await writeFile(
    profilePath,
    JSON.stringify({
      schemaVersion: 1,
      records: {
        "com.minimax.mcode.oauth.prod.en\u0000test": {
          schemaVersion: 1,
          accessToken: "old-access",
          refreshToken: "old-refresh",
          clientId: MINIMAX_CODE_CONFIG.clientId,
          scopes: ["agent.default"],
          audience: "agent-backend",
          expiresAtMs: 1,
          generation: 4,
        },
      },
    }),
    { mode: 0o600 }
  );

  const previousAuthFile = process.env.MINIMAX_CODE_AUTH_FILE;
  process.env.MINIMAX_CODE_AUTH_FILE = profilePath;
  try {
    const extra = await minimaxCode.postExchange({
      access_token: "new-access",
      refresh_token: "new-refresh",
      expires_in: 3600,
    });
    assert.equal(extra.profileSynced, true);
  } finally {
    if (previousAuthFile === undefined) delete process.env.MINIMAX_CODE_AUTH_FILE;
    else process.env.MINIMAX_CODE_AUTH_FILE = previousAuthFile;
  }

  const profile = JSON.parse(await readFile(profilePath, "utf8"));
  const record = profile.records["com.minimax.mcode.oauth.prod.en\u0000test"];
  assert.equal(record.accessToken, "new-access");
  assert.equal(record.refreshToken, "new-refresh");
  assert.equal(record.clientId, MINIMAX_CODE_CONFIG.clientId);
  assert.ok(record.generation > 4, "the generation must rise above the one in use");
});

test("postExchange survives a profile that cannot be written", async () => {
  const previousAuthFile = process.env.MINIMAX_CODE_AUTH_FILE;
  process.env.MINIMAX_CODE_AUTH_FILE = join(tmpdir(), "minimax-code-missing-dir", "auth.json");
  try {
    const extra = await minimaxCode.postExchange({ access_token: "access-token" });
    assert.equal(extra.profileSynced, false);
    assert.ok(extra.profileSyncError);
  } finally {
    if (previousAuthFile === undefined) delete process.env.MINIMAX_CODE_AUTH_FILE;
    else process.env.MINIMAX_CODE_AUTH_FILE = previousAuthFile;
  }
});
