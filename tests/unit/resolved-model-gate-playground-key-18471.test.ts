/**
 * #18471 — the resolved-model gate in handleSingleModelChat must check the same
 * API key that enforceApiKeyPolicy resolved the key metadata from.
 *
 * The dashboard playground sends only the key id (`x-omniroute-playground-key-id`)
 * plus the session cookie. enforceApiKeyPolicy resolves that id to the key, so
 * apiKeyInfo is set; the gate used to re-read only the client headers, found no
 * key, and failed every non-default key closed with
 * "API key model policy unavailable" (503).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-gate-playground-18471-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "gate-18471-api-secret";
process.env.JWT_SECRET = "gate-18471-jwt-secret";
process.env.OMNIROUTE_API_KEY = "gate-18471-self-loop-bearer";

const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { enforceApiKeyPolicy } = await import("../../src/shared/utils/apiKeyPolicy.ts");
const { createVisibleResolvedModelGate } =
  await import("../../src/sse/handlers/chat/resolvedModelPolicy.ts");

const PLAYGROUND_KEY_ID_HEADER = "x-omniroute-playground-key-id";

async function sessionCookie(): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = await new SignJWT({ authenticated: true, sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${jwt}`;
}

async function playgroundRequest(keyId: string): Promise<Request> {
  return new Request("http://localhost/api/v1/chat/completions", {
    method: "POST",
    headers: { [PLAYGROUND_KEY_ID_HEADER]: keyId, cookie: await sessionCookie() },
  });
}

function gateFor(apiKeyInfo: unknown, request: Request) {
  return createVisibleResolvedModelGate({
    apiKeyInfo,
    request,
    contextModel: null,
    comboGrantsTargets: false,
    provider: "openai",
    model: "gpt-4.1",
    modelStr: "openai/gpt-4.1",
  });
}

test.after(async () => {
  apiKeysDb.resetApiKeyState();
  await cleanupTempDataDir(TEST_DATA_DIR);
});

test("#18471 — a playground-selected key with full access passes the resolved-model gate", async () => {
  const created = await apiKeysDb.createApiKey("playground-18471-open", "machine-18471");
  const request = await playgroundRequest(created.id);

  const policy = await enforceApiKeyPolicy(request, "openai/gpt-4.1");
  assert.equal(policy.rejection, null);
  assert.equal(policy.apiKeyInfo?.id, created.id, "entry policy resolved the selected key");

  const rejection = await gateFor(policy.apiKeyInfo, request)(["openai/gpt-4.1"]);
  assert.equal(
    rejection?.status ?? null,
    null,
    "the gate must check the same key, not fail closed with 503 policy unavailable"
  );
});

test("#18471 — the gate still applies the selected key's own restrictions", async () => {
  const created = await apiKeysDb.createApiKey("playground-18471-narrow", "machine-18471");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    blockedModels: ["anthropic/claude-sonnet-4-5"],
  });
  apiKeysDb.resetApiKeyState();
  const request = await playgroundRequest(created.id);

  const policy = await enforceApiKeyPolicy(request, "openai/gpt-4.1");
  assert.equal(policy.rejection, null);
  assert.equal(policy.apiKeyInfo?.id, created.id);

  const gate = gateFor(policy.apiKeyInfo, request);
  assert.equal(await gate(["openai/gpt-4.1"]), null, "the allowed model passes");
  const denied = await gate(["anthropic/claude-sonnet-4-5"]);
  assert.equal(denied?.status, 403, "a blocked resolved model is denied with 403, not 503");
});

test("#18471 — a bearer key still reaches the gate as the same key", async () => {
  const created = await apiKeysDb.createApiKey("bearer-18471", "machine-18471");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    blockedModels: ["anthropic/claude-sonnet-4-5"],
  });
  apiKeysDb.resetApiKeyState();
  const request = new Request("http://localhost/api/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${created.key}` },
  });

  const policy = await enforceApiKeyPolicy(request, "openai/gpt-4.1");
  assert.equal(policy.apiKeyInfo?.id, created.id);
  const gate = gateFor(policy.apiKeyInfo, request);
  assert.equal(await gate(["openai/gpt-4.1"]), null);
  assert.equal((await gate(["anthropic/claude-sonnet-4-5"]))?.status, 403);
});

test("#18471 — a self-loop scoped to a key is gated on that key, not the self-loop bearer", async () => {
  const created = await apiKeysDb.createApiKey("self-loop-18471", "machine-18471");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    blockedModels: ["anthropic/claude-sonnet-4-5"],
  });
  apiKeysDb.resetApiKeyState();
  const request = new Request("http://localhost/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OMNIROUTE_API_KEY}`,
      "x-omniroute-self-loop-key-id": created.id,
    },
  });

  const policy = await enforceApiKeyPolicy(request, "openai/gpt-4.1");
  assert.equal(policy.rejection, null);
  assert.equal(policy.apiKeyInfo?.id, created.id, "entry policy scoped to the caller's key");
  const gate = gateFor(policy.apiKeyInfo, request);
  assert.equal(
    await gate(["openai/gpt-4.1"]),
    null,
    "a model the scoped key does not block passes"
  );
  assert.equal((await gate(["anthropic/claude-sonnet-4-5"]))?.status, 403);
});

test("#18471 — a self-loop scope deleted after entry fails closed, not open on the bearer", async () => {
  const created = await apiKeysDb.createApiKey("self-loop-18471-deleted", "machine-18471");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    blockedModels: ["anthropic/claude-sonnet-4-5"],
  });
  apiKeysDb.resetApiKeyState();
  const request = new Request("http://localhost/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OMNIROUTE_API_KEY}`,
      "x-omniroute-self-loop-key-id": created.id,
    },
  });

  const policy = await enforceApiKeyPolicy(request, "openai/gpt-4.1");
  assert.equal(policy.apiKeyInfo?.id, created.id, "entry policy scoped to the caller's key");
  await apiKeysDb.deleteApiKey(created.id);
  apiKeysDb.resetApiKeyState();

  const rejection = await gateFor(policy.apiKeyInfo, request)(["anthropic/claude-sonnet-4-5"]);
  assert.equal(rejection?.status, 503, "the gate must not fall back to the unrestricted bearer");
});

test("#18471 — a request whose headers cannot be read fails closed with 503", async () => {
  const request = {
    url: "http://localhost/api/v1/chat/completions",
    get headers(): Headers {
      throw new Error("headers unavailable");
    },
  } as unknown as Request;

  const gate = gateFor({ id: "key-with-metadata" }, request);
  assert.equal((await gate(["openai/gpt-4.1"]))?.status, 503);
  assert.equal((await gate(["openai/gpt-4.1"]))?.status, 503, "stays closed on a second call");
});
