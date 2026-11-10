/**
 * Regression tests for Kiro's 2026-11-09 client-version gate (#19607).
 *
 * The gate accepts the IDE-shaped fingerprint (`KiroIDE-<version>-<machineId>`),
 * not a bare CLI version: live A/B on an IdC eu-central-1 profile returned 403
 * for `kiro-cli/3.1.0` and 200 for `KiroIDE-1.4.121-<machineId>`. These tests pin
 * the surface name, the version, the per-connection machine id and the absence of
 * the retired `kiro-ide/1.0.0` identity so the executor and catalogue cannot
 * drift back to a rejected User-Agent.
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  buildKiroFingerprintHeaders,
  buildKiroServiceUserAgent,
  KIRO_IDE_VERSION,
  resolveKiroMachineId,
} from "../../open-sse/services/kiroIdentity.ts";

const HEX64 = /^[a-f0-9]{64}$/;

test("service identity uses the current IDE fingerprint and streaming surface", () => {
  const identity = buildKiroServiceUserAgent({ clientId: "client-abc" }, "token-1");

  // The gate keys on the IDE app/version shape, so the version must be current.
  assert.match(identity.userAgent, new RegExp(`KiroIDE-${KIRO_IDE_VERSION}-[a-f0-9]{64}$`));
  // GenerateAssistantResponse is the streaming surface; the catalogue uses runtime.
  assert.match(identity.userAgent, /api\/codewhispererstreaming#/);
  assert.match(identity.amzUserAgent, new RegExp(`KiroIDE-${KIRO_IDE_VERSION}-[a-f0-9]{64}$`));
  // The retired identities are exactly what the gate rejected.
  assert.doesNotMatch(identity.userAgent, /kiro-ide\/1\.0\.0|kiro-cli\/3\.1\.0/);
});

test("machine id is stable per connection and distinct across connections", () => {
  const first = resolveKiroMachineId({ clientId: "client-abc" }, "token-1");
  const again = resolveKiroMachineId({ clientId: "client-abc" }, "token-2");
  const other = resolveKiroMachineId({ clientId: "client-xyz" }, "token-1");

  assert.match(first, HEX64);
  // Token refresh must not churn the fingerprint Kiro sees for the same account.
  assert.equal(first, again);
  // Two accounts must not share a machine id.
  assert.notEqual(first, other);
});

test("catalogue fingerprint uses the runtime surface and current IDE version", () => {
  const headers = buildKiroFingerprintHeaders(
    { clientId: "client-abc", authMethod: "idc" },
    "token-1"
  );

  assert.match(headers["User-Agent"], new RegExp(`KiroIDE-${KIRO_IDE_VERSION}-[a-f0-9]{64}$`));
  assert.match(headers["User-Agent"], /api\/codewhispererruntime#/);
  assert.match(headers["x-amz-user-agent"], new RegExp(`KiroIDE-${KIRO_IDE_VERSION}-`));
});

test("API-key catalogue probes keep the API_KEY token type", () => {
  const headers = buildKiroFingerprintHeaders(
    { clientId: "client-abc", authMethod: "api_key" },
    "key-1"
  );

  // API keys authenticate on a different token type than SSO/social sessions.
  assert.equal(headers.tokentype, "API_KEY");
});

test("external-IdP catalogue probes carry the token-type header, IdC does not", () => {
  // Org-IdP (external_idp) tokens must be labelled or CodeWhisperer resolves the
  // wrong ARN; SSO/IdC tokens must NOT carry it. The shared builder must keep that
  // split now that catalogue probes route through it.
  const externalIdp = buildKiroFingerprintHeaders(
    { clientId: "client-abc", authMethod: "external_idp" },
    "token-1"
  );
  assert.ok(externalIdp["TokenType"] || externalIdp["tokentype"], "expected a token-type header");
  assert.equal(
    Object.values(externalIdp).filter((v) => String(v).toUpperCase() === "EXTERNAL_IDP").length,
    1
  );

  const idc = buildKiroFingerprintHeaders(
    { clientId: "client-abc", authMethod: "idc" },
    "token-1"
  );
  assert.equal(
    Object.values(idc).filter((v) => String(v).toUpperCase() === "EXTERNAL_IDP").length,
    0
  );
});
