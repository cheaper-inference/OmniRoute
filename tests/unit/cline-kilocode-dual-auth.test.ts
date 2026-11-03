import { test } from "node:test";
import * as assert from "node:assert";
import {
  FREE_APIKEY_PROVIDER_IDS,
  supportsApiKeyOnFreeProvider,
  supportsDualAuthProvider,
  supportsBulkApiKey,
} from "../../src/shared/constants/providers.ts";
import { isManagedProviderConnectionId } from "../../src/lib/providers/catalog.ts";
import { connectionMatchesProviderCard } from "../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts";
import { REGISTRY } from "../../open-sse/config/providers/index.ts";

// ── Dual-auth API-key admission (POST /api/providers gate) ───────────────────
// cline and kilocode are OAuth-primary (isOAuth=true → "Connect" opens the OAuth flow) but
// ALSO accept a pasted BYOK API key. The API-key path must pass the managed-
// connection gate (isManagedProviderConnectionId) WITHOUT flipping isOAuth off.
// That means admitting it through the dedicated DUAL_AUTH set, NOT through
// FREE_APIKEY_PROVIDER_IDS (which would set providerSupportsPat=true → isOAuth=false
// and break the primary Connect→OAuth routing). Regression guard for the layout.

test("cline and kilocode: supportsDualAuth=true, NOT in FREE_APIKEY, isManagedConnectionId=true", () => {
  for (const provider of ["cline", "kilocode"]) {
    assert.ok(
      isManagedProviderConnectionId(provider),
      `POST /api/providers must accept a ${provider} apikey connection (dual-auth BYOK path)`
    );
    assert.ok(
      !supportsApiKeyOnFreeProvider(provider),
      `${provider} must NOT be in FREE_APIKEY_PROVIDER_IDS — that would flip isOAuth false`
    );
    assert.ok(
      !FREE_APIKEY_PROVIDER_IDS.has(provider),
      `${provider} must NOT be in FREE_APIKEY_PROVIDER_IDS`
    );
    assert.equal(supportsDualAuthProvider(provider), true, `${provider} must support dual auth`);
  }
});

test("cline and kilocode apikey connections match the provider's OAuth card", () => {
  for (const provider of ["cline", "kilocode"]) {
    for (const authType of ["apikey", "api_key", "oauth"]) {
      assert.equal(
        connectionMatchesProviderCard({ provider, authType }, provider, "oauth"),
        true,
        `${provider} with authType ${authType} should match the OAuth card`
      );
    }
  }
});

test("cline and kilocode registry authType remains 'oauth' (OAuth stays primary)", () => {
  assert.equal(REGISTRY.cline.authType, "oauth");
  assert.equal(REGISTRY.kilocode.authType, "oauth");
});

test("cline and kilocode bulk-key admission: supportsBulkApiKey returns true", () => {
  assert.equal(supportsBulkApiKey("cline"), true);
  assert.equal(supportsBulkApiKey("kilocode"), true);
});

test("cline and kilocode are registered in SPECIALTY_VALIDATORS for direct chat probe", async () => {
  const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
  // Missing API key returns explicit error without hitting network
  const resCline = await validateProviderApiKey({ provider: "cline", apiKey: "" });
  assert.equal(resCline.valid, false);
  assert.equal(resCline.error, "Provider and API key required");

  const resKilo = await validateProviderApiKey({ provider: "kilocode", apiKey: "" });
  assert.equal(resKilo.valid, false);
  assert.equal(resKilo.error, "Provider and API key required");
});

// ── Validator dispatch against a fake upstream (#16298) ─────────────────────
// The test above only proves the registration SHAPE: `validateProviderApiKey({apiKey:""})`
// short-circuits at the `!apiKey` guard, so it never reaches the validator and proves
// nothing about whether the validator actually authenticates.
//
// The tests below stand up a local fake upstream that mirrors the real Cline / Kilo Code
// behavior — an OPEN catalog route (200 for any key, which is what made the generic
// /v1/models probe green bogus keys) plus an AUTHENTICATED chat route — and dispatch
// REAL validation calls through it, following the zylo-key-validation-13828 pattern.
//
// The fake upstream is loopback, so the provider validation guard's default
// "local-first" mode allows it (areLocalProviderUrlsAllowed() → block-metadata).

import { after, before } from "node:test";
import { createServer, type Server } from "node:http";

const VALID_KEY = "sk-valid-test-key";

let server: Server;
let baseUrl = "";
let modelsRequests = 0;
let chatRequests = 0;
let lastChatAuthorization: string | null = null;
let lastChatBody: { model?: string } | null = null;
let lastChatPath = "";
let lastEditorName: string | undefined;

before(async () => {
  server = createServer((req, res) => {
    const path = (req.url || "").split("?")[0];
    const auth = req.headers["authorization"];

    // The open catalog: 200 for ANY key — this is exactly what made the generic
    // /v1/models probe green bogus Cline / Kilo keys.
    if (path.endsWith("/models")) {
      modelsRequests += 1;
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ object: "list", data: [{ id: "openrouter/free" }] }));
      return;
    }

    if (path.endsWith("/chat/completions")) {
      chatRequests += 1;
      lastChatPath = path;
      lastChatAuthorization = typeof auth === "string" ? auth : null;
      lastEditorName = req.headers["x-kilocode-editorname"] as string | undefined;
      const chunks: Buffer[] = [];
      req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
      req.on("end", () => {
        try {
          lastChatBody = JSON.parse(Buffer.concat(chunks).toString("utf8"));
        } catch {
          lastChatBody = null;
        }
        if (auth !== `Bearer ${VALID_KEY}`) {
          res.writeHead(401, { "content-type": "application/json" });
          res.end(JSON.stringify({ error: "Unauthorized" }));
          return;
        }
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ choices: [{ message: { role: "assistant", content: "ok" } }] }));
      });
      return;
    }

    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Not Found");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("no assigned port");
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((err) => (err ? reject(err) : resolve()))
  );
});

test("#16298 the Cline validator authenticates against the chat route, not the open catalog", async () => {
  const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
  modelsRequests = 0;
  chatRequests = 0;

  const result = await validateProviderApiKey({
    provider: "cline",
    apiKey: "sk-invalid-test-key",
    providerSpecificData: { baseUrl },
  });

  assert.equal(
    modelsRequests,
    0,
    "the open catalog must not be consulted — a 200 from it is what greened bogus keys"
  );
  assert.ok(chatRequests > 0, "the Cline validator must probe the authenticated chat route");
  assert.equal(
    result.valid,
    false,
    "a key Cline rejects on the chat route must not validate just because the catalog is open"
  );
  assert.equal(lastChatAuthorization, "Bearer sk-invalid-test-key");
});

test("#16298 the Cline validator accepts a key the chat route authenticates", async () => {
  const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
  const result = await validateProviderApiKey({
    provider: "cline",
    apiKey: VALID_KEY,
    providerSpecificData: { baseUrl },
  });

  assert.equal(result.valid, true, `expected a valid verdict, got ${JSON.stringify(result)}`);
  assert.equal(lastChatAuthorization, `Bearer ${VALID_KEY}`);
});

test("#16298 the Cline validator probes a FREE model, not the registry's first (paid) model", async () => {
  const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
  chatRequests = 0;

  await validateProviderApiKey({
    provider: "cline",
    apiKey: VALID_KEY,
    providerSpecificData: { baseUrl },
  });

  assert.ok(chatRequests > 0, "the Cline validator must reach the chat route");
  assert.equal(
    lastChatBody?.model,
    "openrouter/free",
    "the probe must use the free router — the registry's first model (z-ai/glm-5.2) is PAID " +
      "and answers 402 for an account without credit, which the probe reports as an invalid key"
  );
});

test("#16298 the Cline validator resolves the chat URL without duplicating the /api path", async () => {
  const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
  chatRequests = 0;

  await validateProviderApiKey({
    provider: "cline",
    apiKey: VALID_KEY,
    providerSpecificData: { baseUrl: `${baseUrl}/api/v1` },
  });

  assert.ok(chatRequests > 0, "the Cline validator must reach the chat route");
  assert.equal(
    lastChatPath,
    "/api/v1/chat/completions",
    "a base URL ending in /api/v1 must resolve to /api/v1/chat/completions, never /api/api/v1/..."
  );
});

test("#16298 the Kilo Code validator authenticates against the chat route", async () => {
  const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
  modelsRequests = 0;
  chatRequests = 0;

  const result = await validateProviderApiKey({
    provider: "kilocode",
    apiKey: "sk-invalid-test-key",
    providerSpecificData: { baseUrl },
  });

  assert.equal(modelsRequests, 0, "the open catalog must not be consulted");
  assert.ok(chatRequests > 0, "the Kilo Code validator must probe the authenticated chat route");
  assert.equal(result.valid, false, "a key Kilo Code rejects must not validate");
  assert.equal(lastChatAuthorization, "Bearer sk-invalid-test-key");
});

test("#16298 the Kilo Code validator accepts a key the chat route authenticates", async () => {
  const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
  const result = await validateProviderApiKey({
    provider: "kilocode",
    apiKey: VALID_KEY,
    providerSpecificData: { baseUrl },
  });

  assert.equal(result.valid, true, `expected a valid verdict, got ${JSON.stringify(result)}`);
  assert.equal(lastChatAuthorization, `Bearer ${VALID_KEY}`);
});

test("#16298 the Kilo Code validator sends the required editor-name header", async () => {
  const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
  await validateProviderApiKey({
    provider: "kilocode",
    apiKey: VALID_KEY,
    providerSpecificData: { baseUrl },
  });

  assert.equal(
    lastEditorName,
    "OmniRoute",
    "Kilo Code's gateway requires the X-KILOCODE-EDITORNAME header"
  );
});
