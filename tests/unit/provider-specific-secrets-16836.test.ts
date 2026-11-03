import test from "node:test";
import assert from "node:assert/strict";
import {
  encryptConnectionFields,
  decryptConnectionFields,
  looksEncrypted,
} from "../../src/lib/db/encryption.ts";
import {
  createLazyRowProxy,
  createLazyConnectionView,
} from "../../src/lib/db/providers/lazyConnectionView.ts";
import { summarizeProviderConnectionForAudit } from "../../src/lib/compliance/providerAudit.ts";
import { sanitizeProviderSpecificDataForResponse } from "../../src/lib/providers/requestDefaults.ts";
import { webSessionCredentialKey } from "../../src/lib/db/webSessionDedup.ts";

const originalKey = process.env.STORAGE_ENCRYPTION_KEY;
test.before(() => {
  process.env.STORAGE_ENCRYPTION_KEY = "provider-metadata-16836-test-key";
});
test.after(() => {
  if (originalKey === undefined) delete process.env.STORAGE_ENCRYPTION_KEY;
  else process.env.STORAGE_ENCRYPTION_KEY = originalKey;
});

test("#16836 protects consoleApiKey but preserves SQLite-queryable metadata", () => {
  const original = {
    id: "conn-16836",
    provider: "agentrouter",
    providerSpecificData: {
      consoleApiKey: "console-secret-16836",
      workspaceId: "ws-1",
      nested: { setting: 1 },
    },
  };
  const stored = encryptConnectionFields({ ...original });
  const data = stored.providerSpecificData as Record<string, unknown>;
  assert.equal(looksEncrypted(data.consoleApiKey), true);
  assert.equal(data.workspaceId, "ws-1");
  assert.deepEqual(data.nested, { setting: 1 });
  assert.equal(original.providerSpecificData.consoleApiKey, "console-secret-16836");
  assert.deepEqual(
    decryptConnectionFields(stored).providerSpecificData,
    original.providerSpecificData
  );
  assert.equal(
    decryptConnectionFields({
      providerSpecificData: { consoleApiKey: "legacy-plaintext" },
    }).providerSpecificData?.consoleApiKey,
    "legacy-plaintext"
  );
  assert.equal(
    encryptConnectionFields({ ...stored }).providerSpecificData?.consoleApiKey,
    data.consoleApiKey,
    "already encrypted values must not be double-encrypted on unrelated updates"
  );
});

test("#16836 keeps the exact connection shape when providerSpecificData is absent", () => {
  // No metadata column: an explicit undefined property breaks deepStrictEqual
  // and callers that distinguish missing fields from present-but-empty fields.
  const original = {
    apiKey: "shape-secret",
    accessToken: "shape-access",
    refreshToken: "shape-refresh",
    idToken: "shape-id",
    untouched: "keep-me",
  };
  const stored = encryptConnectionFields({ ...original });
  assert.equal(Object.hasOwn(stored, "providerSpecificData"), false);
  const restored = decryptConnectionFields(stored);
  assert.deepEqual(restored, original);
  assert.equal(Object.hasOwn(restored, "providerSpecificData"), false);
});

test("#16836 lazy views expose plaintext while the row and JSON stay protected at rest", () => {
  const stored = encryptConnectionFields({
    id: "conn-lazy",
    provider: "agentrouter",
    isActive: true,
    providerSpecificData: { consoleApiKey: "lazy-secret-16836", workspaceId: "ws-2" },
  });
  const raw = { ...stored };
  const lazy = createLazyRowProxy(raw);
  assert.equal(
    (lazy.providerSpecificData as Record<string, unknown>).consoleApiKey,
    "lazy-secret-16836"
  );
  const serialized = JSON.parse(JSON.stringify(lazy)) as {
    providerSpecificData: { consoleApiKey: string };
  };
  assert.equal(serialized.providerSpecificData.consoleApiKey, "lazy-secret-16836");
  assert.equal(
    looksEncrypted((raw.providerSpecificData as Record<string, unknown>).consoleApiKey),
    true
  );
  const typed = createLazyConnectionView(raw);
  assert.equal(typed.providerSpecificData.consoleApiKey, "lazy-secret-16836");
});

// The audit writer must not persist either the decrypted value or ciphertext.
test("#16836 audit snapshots never include nested console credentials", () => {
  const stored = encryptConnectionFields({
    id: "conn-audit",
    provider: "agentrouter",
    apiKey: "primary-secret-16836",
    providerSpecificData: {
      consoleApiKey: "audit-secret-16836",
      workspaceId: "ws-public",
    },
  });
  for (const row of [stored, decryptConnectionFields(stored), createLazyRowProxy(stored)]) {
    const snapshot = summarizeProviderConnectionForAudit(row);
    const serialized = JSON.stringify(snapshot);
    assert.ok(!serialized.includes("audit-secret-16836"));
    assert.ok(!serialized.includes("primary-secret-16836"));
    assert.ok(!serialized.includes("enc:v1:"));
    assert.deepEqual(snapshot?.providerSpecificData, { workspaceId: "ws-public" });
  }
});

test("#16836 all existing audit-redacted console secrets are encrypted", () => {
  const sensitiveFields = [
    "consoleApiKey",
    "alibabaConsoleCookie",
    "alibabaConsoleSecToken",
    "xiaomiMimoConsoleCookie",
    "qwenCloudCookie",
    "qwenCloudSecToken",
    "volcConsoleCookie",
    "volcCsrfToken",
    "ollamaUsageCookie",
    "ollamaCloudUsageCookie",
    "ollamaCloudCookie",
    "usageCookie",
    "accessToken",
    "refreshToken",
    "idToken",
    "apiKey",
    "secretAccessKey",
    "awsSecretAccessKey",
    "sessionToken",
    "awsSessionToken",
    "openCodeGoAuthCookie",
    "opencodeGoAuthCookie",
    "authCookie",
  ] as const;
  const metadata: Record<string, string> = { workspaceId: "ws-visible" };
  for (const field of sensitiveFields) metadata[field] = `test-secret-${field}`;
  const stored = encryptConnectionFields({
    id: "conn-all-secrets",
    provider: "alibaba",
    providerSpecificData: metadata,
  });
  const atRest = stored.providerSpecificData as Record<string, unknown>;
  for (const field of sensitiveFields) {
    assert.equal(looksEncrypted(atRest[field]), true, field);
    assert.ok(!JSON.stringify(atRest).includes(`test-secret-${field}`));
  }
  assert.equal(atRest.workspaceId, "ws-visible");
  const restored = decryptConnectionFields(stored);
  assert.deepEqual(restored.providerSpecificData, metadata);
  assert.deepEqual(summarizeProviderConnectionForAudit(restored)?.providerSpecificData, {
    workspaceId: "ws-visible",
  });
});

test("#16836 invalid nested ciphertext sets the existing credential recovery flag", () => {
  const row = encryptConnectionFields({
    id: "conn-stale-nested",
    provider: "agentrouter",
    providerSpecificData: { consoleApiKey: "stale-console-secret", workspaceId: "public" },
  });
  const metadata = row.providerSpecificData as Record<string, string>;
  const encrypted = metadata.consoleApiKey;
  assert.equal(looksEncrypted(encrypted), true);
  metadata.consoleApiKey = encrypted.slice(0, -1) + (encrypted.endsWith("0") ? "1" : "0");
  const restored: NonNullable<ReturnType<typeof decryptConnectionFields>> = decryptConnectionFields(row);
  assert.equal(restored.credentialDecryptFailed, true);
  assert.equal(
    (restored.providerSpecificData as Record<string, unknown>).consoleApiKey,
    null,
    "corrupt ciphertext must not be forwarded to quota or provider APIs"
  );
  assert.equal((restored.providerSpecificData as Record<string, unknown>).workspaceId, "public");
});

test("#16836 dashboard responses never expose encrypted or decrypted console credentials", () => {
  const secrets = {
    consoleApiKey: "console-private-response-16836",
    alibabaConsoleCookie: "alibaba-private-response-16836",
    alibabaConsoleSecToken: "alibaba-sectoken-private-16836",
    xiaomiMimoConsoleCookie: "xiaomi-private-response-16836",
  };
  const stored = encryptConnectionFields({
    id: "conn-response",
    provider: "alibaba",
    providerSpecificData: { ...secrets, workspaceId: "workspace-visible" },
  });
  for (const row of [stored, decryptConnectionFields(stored), createLazyRowProxy(stored)]) {
    const safe = sanitizeProviderSpecificDataForResponse(row.providerSpecificData);
    assert.deepEqual(safe, { workspaceId: "workspace-visible" });
    const responseJson = JSON.stringify(safe);
    for (const [name, value] of Object.entries(secrets)) {
      assert.ok(!responseJson.includes(name), name);
      assert.ok(!responseJson.includes(value), name);
    }
    assert.ok(!responseJson.includes("enc:v1:"));
  }
});

test("#16836 quota console cookies stay encrypted in lazy and eager connection reads", () => {
  const secrets = {
    qwenCloudCookie: "qwen-console-cookie-secret",
    qwenCloudSecToken: "qwen-console-csrf-secret",
    volcConsoleCookie: "volc-console-cookie-secret",
    volcCsrfToken: "volc-console-csrf-secret",
  };
  const stored = encryptConnectionFields({
    id: "quota-console-secrets-16836",
    provider: "qwen-cloud-token-plan",
    providerSpecificData: { ...secrets, workspaceId: "visible-workspace" },
  });
  const disk = stored.providerSpecificData as Record<string, unknown>;
  for (const [key, secret] of Object.entries(secrets)) {
    assert.equal(looksEncrypted(disk[key]), true, key);
    assert.ok(!JSON.stringify(disk).includes(secret), key);
  }
  assert.deepEqual(decryptConnectionFields(stored).providerSpecificData, {
    ...secrets,
    workspaceId: "visible-workspace",
  });
  assert.deepEqual(createLazyRowProxy(stored).providerSpecificData, {
    ...secrets,
    workspaceId: "visible-workspace",
  });
  const audited = JSON.stringify(summarizeProviderConnectionForAudit(stored));
  for (const [key, secret] of Object.entries(secrets)) {
    assert.ok(!audited.includes(key), key);
    assert.ok(!audited.includes(secret), key);
  }
  assert.ok(!audited.includes("enc:v1:"));
});

test("#16836 compliance audits strip dashboard-redacted credential metadata", () => {
  // Protect both ciphertext and legacy plaintext. These fields are already
  // omitted by sanitizeProviderSpecificDataForResponse and must not leak into
  // the longer-lived compliance audit database.
  const secrets = {
    qwenCloudCookie: "quota-cookie-16836",
    qwenCloudSecToken: "quota-sectoken-16836",
    volcConsoleCookie: "volc-cookie-16836",
    volcCsrfToken: "volc-csrf-16836",
    ollamaCloudUsageCookie: "ollama-usage-16836",
    secretAccessKey: "aws-secret-16836",
    sessionToken: "session-token-16836",
    codexFingerprintSeed: "fingerprint-16836",
  };
  const row = {
    id: "audit-redaction-16836",
    provider: "qwen-cloud-token-plan",
    providerSpecificData: { ...secrets, workspaceId: "safe-workspace" },
  };
  for (const candidate of [row, encryptConnectionFields({ ...row })]) {
    const audit = summarizeProviderConnectionForAudit(candidate);
    assert.deepEqual(audit?.providerSpecificData, { workspaceId: "safe-workspace" });
    const serialized = JSON.stringify(audit);
    for (const [key, secret] of Object.entries(secrets)) {
      assert.ok(!serialized.includes(key), key);
      assert.ok(!serialized.includes(secret), key);
    }
    assert.ok(!serialized.includes("enc:v1:"));
  }
});

test("#16836 audit redaction cannot drift from dashboard redaction", () => {
  const sensitive = [
    "accessToken",
    "refreshToken",
    "idToken",
    "apiKey",
    "consoleApiKey",
    "secretAccessKey",
    "awsSecretAccessKey",
    "sessionToken",
    "awsSessionToken",
    "openCodeGoAuthCookie",
    "opencodeGoAuthCookie",
    "authCookie",
    "ollamaUsageCookie",
    "ollamaCloudUsageCookie",
    "ollamaCloudCookie",
    "usageCookie",
    "qwenCloudCookie",
    "qwenCloudSecToken",
    "alibabaConsoleCookie",
    "alibabaConsoleSecToken",
    "xiaomiMimoConsoleCookie",
    "runtimeKey",
    "validationId",
    "volcConsoleCookie",
    "volcCsrfToken",
    "codexFingerprintSeed",
    "codexClientIdentity",
    "codexOriginalIdentityHeaders",
    "codexTurnStateEcho",
  ];
  const metadata: Record<string, unknown> = { workspaceId: "visible-workspace" };
  for (const key of sensitive) metadata[key] = `private-${key}`;
  metadata.browserCdpEndpoint = "wss://private.example/browser?token=secret";
  const dashboard = sanitizeProviderSpecificDataForResponse(metadata);
  const audit = summarizeProviderConnectionForAudit({
    id: "audit-should-match",
    provider: "qwen-cloud-token-plan",
    providerSpecificData: metadata,
  });
  assert.deepEqual(audit?.providerSpecificData, dashboard);
  assert.deepEqual(dashboard, {
    workspaceId: "visible-workspace",
    browserCdpEndpoint: "configured",
  });
});

test("#16836 session identity must prefer known cookies over unrelated metadata", () => {
  for (const credentialField of [
    "qwenCloudCookie",
    "volcConsoleCookie",
    "alibabaConsoleCookie",
    "xiaomiMimoConsoleCookie",
    "ollamaCloudCookie",
  ] as const) {
    const baseUrl = "https://same-provider.example.test";
    const a = { baseUrl, workspaceId: "same-workspace", [credentialField]: "cookie-account-a" };
    const b = { baseUrl, workspaceId: "same-workspace", [credentialField]: "cookie-account-b" };
    assert.equal(webSessionCredentialKey(a), "cookie-account-a", credentialField);
    assert.equal(webSessionCredentialKey(b), "cookie-account-b", credentialField);
  }
});
