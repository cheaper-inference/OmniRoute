// ONE allowlist — PROVIDER_SPECIFIC_SECRET_FIELDS — names the credential-bearing
// `providerSpecificData` fields. Four consumers read it and must not drift from each
// other: the at-rest encryptor (encryptConnectionFields, #16863), the API response
// sanitizer (strips them, masks the list-valued pool like `apiKey`), the compliance audit
// summary, and the web-session credential storage keys. Every assertion below iterates
// the live constant, so a field added to the list is automatically checked on every side.
import test from "node:test";
import assert from "node:assert/strict";
import type { WebSessionCredentialRequirement } from "../../src/shared/providers/webSessionCredentials.ts";

process.env.STORAGE_ENCRYPTION_KEY = "psd-secrets-drift-synthetic-key";

const { PROVIDER_SPECIFIC_SECRET_FIELDS, mapProviderSpecificDataSecrets } =
  await import("../../src/lib/db/providers/providerSpecificDataSecrets.ts");
const { encryptConnectionFields, decryptConnectionFields, looksEncrypted } =
  await import("../../src/lib/db/encryption.ts");
const { sanitizeProviderSpecificDataForResponse, PROVIDER_SPECIFIC_DATA_MASKED_LIST_FIELDS } =
  await import("../../src/lib/providers/requestDefaults.ts");
const { summarizeProviderConnectionForAudit } =
  await import("../../src/lib/compliance/providerAudit.ts");
const apiKeyMask = await import("../../src/shared/utils/apiKeyMask.ts");
const apiKeyExposure = await import("../../src/lib/apiKeyExposure.ts");
const { WEB_SESSION_CREDENTIAL_REQUIREMENTS } =
  await import("../../src/shared/providers/webSessionCredentials.ts");

type Psd = Record<string, unknown>;

const SECRET_FIELDS: ReadonlySet<string> = new Set(PROVIDER_SPECIFIC_SECRET_FIELDS);
const MASKED_LIST_FIELDS: ReadonlySet<string> = new Set(PROVIDER_SPECIFIC_DATA_MASKED_LIST_FIELDS);
const SECRET = "plain-secret-value-0123456789";

/** A providerSpecificData fixture holding `SECRET` under `key` (a list for the masked keys). */
function fixtureFor(key: string): Psd {
  return {
    [key]: MASKED_LIST_FIELDS.has(key) ? [SECRET, `${SECRET}-b`] : SECRET,
    workspaceId: "ws-visible",
    count: 2,
  };
}

function psdOf(value: unknown): Psd {
  const psd = (value as { providerSpecificData?: unknown } | null)?.providerSpecificData;
  assert.ok(psd && typeof psd === "object", "providerSpecificData must be present");
  return psd as Psd;
}

test("the shared allowlist covers the rotation pool, refresh-flow sub-tokens and web-session cookies", () => {
  assert.equal(
    new Set(PROVIDER_SPECIFIC_SECRET_FIELDS).size,
    PROVIDER_SPECIFIC_SECRET_FIELDS.length
  );
  for (const key of [
    // list of full upstream keys, shown masked by the dashboard
    "extraApiKeys",
    // short-lived sub-tokens written back by refresh / mint flows
    "copilotToken",
    "dcaToken",
    "recaptchaV3Token",
    "clientSecret",
    // web-session providers (src/shared/providers/webSessionCredentials.ts storageKeys)
    "cookie",
    "token",
    "sso",
    "sso-rw",
    "session",
    "jwt",
    "access_token",
    "refresh_token",
    "app-config-uuid",
  ]) {
    assert.ok(SECRET_FIELDS.has(key), `${key} must be a declared secret field`);
  }
  for (const key of PROVIDER_SPECIFIC_DATA_MASKED_LIST_FIELDS) {
    assert.ok(SECRET_FIELDS.has(key), `${key} is masked in responses, so it must be encrypted`);
  }
  // SQLite-queryable identity / display fields must never be enveloped.
  for (const key of [
    "workspaceId",
    "chatgptUserId",
    "username",
    "email",
    "baseUrl",
    "tags",
    "uuid",
  ]) {
    assert.equal(SECRET_FIELDS.has(key), false, `${key} is an identity field, not a secret`);
  }
});

test("the response sanitizer strips or masks every declared field and keeps the rest", () => {
  for (const key of PROVIDER_SPECIFIC_SECRET_FIELDS) {
    const sanitized = sanitizeProviderSpecificDataForResponse(fixtureFor(key)) as Psd;
    assert.ok(sanitized, `${key}: sanitizer returned nothing`);
    assert.ok(
      !JSON.stringify(sanitized).includes(SECRET),
      `${key}: raw secret reached the response`
    );
    if (MASKED_LIST_FIELDS.has(key)) {
      assert.deepEqual(sanitized[key], [
        apiKeyMask.maskStoredApiKey(SECRET),
        apiKeyMask.maskStoredApiKey(`${SECRET}-b`),
      ]);
    } else {
      assert.ok(!(key in sanitized), `${key}: must be stripped from the response`);
    }
    assert.equal(sanitized.workspaceId, "ws-visible");
    assert.equal(sanitized.count, 2);
  }
});

test("encryptConnectionFields envelopes every declared field — each string of a list — and decrypt restores it", () => {
  for (const key of PROVIDER_SPECIFIC_SECRET_FIELDS) {
    const input = fixtureFor(key);
    const stored = encryptConnectionFields({
      id: "conn-drift",
      provider: "openai",
      providerSpecificData: input,
    });
    const atRest = psdOf(stored);
    assert.notStrictEqual(atRest, input, `${key}: the input object must not be mutated`);
    assert.ok(!JSON.stringify(atRest).includes(SECRET), `${key}: plaintext survived encryption`);
    if (MASKED_LIST_FIELDS.has(key)) {
      const entries = atRest[key] as unknown[];
      assert.equal(entries.length, 2, `${key}: list length preserved`);
      for (const entry of entries) assert.ok(looksEncrypted(entry), `${key}[] entry not enveloped`);
    } else {
      assert.ok(looksEncrypted(atRest[key]), `${key}: not enveloped`);
    }
    assert.equal(atRest.workspaceId, "ws-visible");
    assert.equal(atRest.count, 2);

    // Idempotent: a second pass never re-wraps an envelope.
    const twice = encryptConnectionFields({ providerSpecificData: atRest });
    assert.deepEqual(psdOf(twice), atRest, `${key}: double encryption`);

    assert.deepEqual(psdOf(decryptConnectionFields(stored)), input, `${key}: round-trip mismatch`);
  }
});

test("the compliance audit strips every declared field, ciphertext or legacy plaintext", () => {
  for (const key of PROVIDER_SPECIFIC_SECRET_FIELDS) {
    const row = { id: "audit-drift", provider: "openai", providerSpecificData: fixtureFor(key) };
    for (const candidate of [row, encryptConnectionFields({ ...row })]) {
      const audit = summarizeProviderConnectionForAudit(candidate);
      assert.deepEqual(audit?.providerSpecificData, { workspaceId: "ws-visible", count: 2 }, key);
      assert.ok(!JSON.stringify(audit).includes(SECRET), `${key}: secret reached the audit record`);
    }
  }
});

test("every web-session credential requirement stores its credential under a declared field", () => {
  const requirements: Record<string, WebSessionCredentialRequirement> =
    WEB_SESSION_CREDENTIAL_REQUIREMENTS;
  for (const [provider, requirement] of Object.entries(requirements)) {
    if (requirement.kind === "none") continue;
    const covered = requirement.storageKeys.filter((key: string) => SECRET_FIELDS.has(key));
    assert.ok(
      covered.length > 0,
      `${provider}: none of its storageKeys [${requirement.storageKeys.join(", ")}] is a declared secret field`
    );
  }
});

test("mapProviderSpecificDataSecrets maps string lists entry by entry and leaves everything else alone", () => {
  const input = { extraApiKeys: ["a", "b", 7, ""], storageState: { cookies: [] }, tags: ["x"] };
  const upper = mapProviderSpecificDataSecrets(input, (value) => value.toUpperCase()) as Psd;
  assert.deepEqual(upper, {
    extraApiKeys: ["A", "B", 7, ""],
    storageState: { cookies: [] },
    tags: ["x"],
  });
  assert.deepEqual(input.extraApiKeys, ["a", "b", 7, ""], "input list not mutated");
  assert.strictEqual(
    upper.storageState,
    input.storageState,
    "object values pass through by reference"
  );

  // A null/undefined result drops that entry: an undecryptable token must never be forwarded
  // upstream as if it were a key.
  const dropped = mapProviderSpecificDataSecrets(input, (value) =>
    value === "b" ? null : value
  ) as Psd;
  assert.deepEqual(dropped.extraApiKeys, ["a", 7, ""]);

  // Nothing changed → the very same object comes back (callers skip the write).
  assert.strictEqual(
    mapProviderSpecificDataSecrets(input, (value) => value),
    input
  );
  for (const passthrough of [null, undefined, "text", ["list"], 42]) {
    assert.strictEqual(
      mapProviderSpecificDataSecrets(passthrough, (value) => value),
      passthrough
    );
  }
});

test("decryptConnectionFields drops an undecryptable list entry and raises the recovery flag", () => {
  const stored = encryptConnectionFields({
    id: "conn-corrupt-list",
    provider: "openai",
    providerSpecificData: { extraApiKeys: ["sk-good-0123456789abcdef", "sk-bad-0123456789abcdef"] },
  });
  const list = psdOf(stored).extraApiKeys as string[];
  const corrupt = list[1];
  list[1] = corrupt.slice(0, -1) + (corrupt.endsWith("0") ? "1" : "0");
  const restored: NonNullable<ReturnType<typeof decryptConnectionFields>> =
    decryptConnectionFields(stored);
  assert.equal(restored.credentialDecryptFailed, true);
  assert.deepEqual(psdOf(restored).extraApiKeys, ["sk-good-0123456789abcdef"]);
});

test("extraApiKeys are masked with the very same function the routes use for apiKey", () => {
  assert.strictEqual(apiKeyExposure.maskStoredApiKey, apiKeyMask.maskStoredApiKey);
  assert.equal(apiKeyMask.maskStoredApiKey("sk-0123456789abcdef"), "sk-01234****cdef");
});

test("reconcileMaskedExtraApiKeys maps placeholders back to stored tokens and drops orphans", () => {
  const stored = ["sk-aaaa-0123456789abcd", "sk-bbbb-0123456789abcd"];
  const mask = apiKeyMask.maskStoredApiKey;
  assert.deepEqual(
    apiKeyMask.reconcileMaskedExtraApiKeys([mask(stored[0]), mask(stored[1])], stored),
    stored
  );
  assert.deepEqual(
    apiKeyMask.reconcileMaskedExtraApiKeys([mask(stored[1]), "sk-new-0123456789abcd"], stored),
    [stored[1], "sk-new-0123456789abcd"]
  );
  assert.deepEqual(apiKeyMask.reconcileMaskedExtraApiKeys(["sk-zzzz****wxyz"], stored), []);
  assert.deepEqual(
    apiKeyMask.reconcileMaskedExtraApiKeys([mask(stored[0]), stored[0]], stored),
    [stored[0]],
    "a placeholder and its plaintext twin collapse to one entry"
  );
  assert.deepEqual(apiKeyMask.reconcileMaskedExtraApiKeys(["plain"], undefined), ["plain"]);
  assert.equal(apiKeyMask.reconcileMaskedExtraApiKeys(undefined, stored), undefined);
  assert.equal(apiKeyMask.reconcileMaskedExtraApiKeys("oops", stored), "oops");
});
