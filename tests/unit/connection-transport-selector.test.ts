// Per-connection transport selectors (connection edit modal):
//   - codexTransport: "http" | "websocket" | "app-server" (open-sse/executors/codex.ts)
//   - qoderCliTransport: "print" | "acp" (open-sse/services/qoderCliAcp.ts)
//
// Two invariants are pinned here because both fail silently otherwise:
//   1. Zod rejects an unknown value (a typo must not persist).
//   2. normalizeProviderSpecificData drops `null`/invalid, which is how the modal
//      reverts a connection to "Default / inherit env" (the PUT route shallow-merges,
//      so an omitted key would keep the previous choice forever).
import assert from "node:assert/strict";
import { test } from "node:test";

import {
  CODEX_TRANSPORT_VALUES,
  QODER_CLI_TRANSPORT_VALUES,
  normalizeCodexTransport,
  normalizeQoderCliTransport,
  transportPatchValue,
} from "../../src/shared/constants/connectionTransport.ts";
import { validateProviderSpecificData } from "../../src/shared/validation/providerSpecificData.ts";
import { normalizeProviderSpecificData } from "../../src/lib/providers/requestDefaults.ts";
import { isQoderAcpTransportEnabled } from "../../open-sse/services/qoderCliAcp.ts";

type Issue = { path: (string | number)[] };

/** Run the shared refinement and return the reported paths. */
function issuePaths(providerSpecificData: Record<string, unknown>): string[] {
  const issues: Issue[] = [];
  const ctx = {
    addIssue: (issue: Issue) => issues.push(issue),
  } as unknown as Parameters<typeof validateProviderSpecificData>[1];
  validateProviderSpecificData(providerSpecificData, ctx);
  return issues.map((issue) => issue.path.join("."));
}

test("connectionTransport constants stay in sync with the executor values", () => {
  assert.deepEqual([...CODEX_TRANSPORT_VALUES], ["http", "websocket", "app-server"]);
  assert.deepEqual([...QODER_CLI_TRANSPORT_VALUES], ["print", "acp"]);
});

test("normalize helpers map unknown and empty values to the default sentinel", () => {
  assert.equal(normalizeCodexTransport("app-server"), "app-server");
  assert.equal(normalizeCodexTransport("  WebSocket "), "websocket");
  assert.equal(normalizeCodexTransport("carrier-pigeon"), "");
  assert.equal(normalizeCodexTransport(null), "");
  assert.equal(normalizeCodexTransport(undefined), "");

  assert.equal(normalizeQoderCliTransport("acp"), "acp");
  assert.equal(normalizeQoderCliTransport("PRINT"), "print");
  assert.equal(normalizeQoderCliTransport("nope"), "");
});

test("transportPatchValue sends null (not undefined) to clear a stored override", () => {
  assert.equal(transportPatchValue(""), null);
  assert.equal(transportPatchValue("   "), null);
  assert.equal(transportPatchValue("app-server"), "app-server");
  assert.equal(transportPatchValue(" ACP "), "acp");
});

test("Zod accepts every declared transport value", () => {
  for (const value of CODEX_TRANSPORT_VALUES) {
    assert.deepEqual(issuePaths({ codexTransport: value }), [], `codexTransport=${value}`);
  }
  for (const value of QODER_CLI_TRANSPORT_VALUES) {
    assert.deepEqual(issuePaths({ qoderCliTransport: value }), [], `qoderCliTransport=${value}`);
  }
  // Absent and null are both "no override".
  assert.deepEqual(issuePaths({}), []);
  assert.deepEqual(issuePaths({ codexTransport: null, qoderCliTransport: null }), []);
});

test("Zod rejects an unknown transport value and names the field", () => {
  assert.deepEqual(issuePaths({ codexTransport: "carrier-pigeon" }), ["codexTransport"]);
  assert.deepEqual(issuePaths({ qoderCliTransport: "stream" }), ["qoderCliTransport"]);
});

test("normalizeProviderSpecificData keeps valid transports and drops null/invalid", () => {
  const kept = normalizeProviderSpecificData("codex", {
    codexTransport: " App-Server ",
    qoderCliTransport: "ACP",
  });
  assert.equal(kept?.codexTransport, "app-server");
  assert.equal(kept?.qoderCliTransport, "acp");

  for (const cleared of [null, undefined, "", "carrier-pigeon"]) {
    const normalized = normalizeProviderSpecificData("codex", {
      codexTransport: cleared,
      qoderCliTransport: cleared,
      tag: "keep-me",
    });
    assert.equal(
      normalized?.codexTransport,
      undefined,
      `codexTransport=${String(cleared)} must be dropped`
    );
    assert.equal(
      normalized?.qoderCliTransport,
      undefined,
      `qoderCliTransport=${String(cleared)} must be dropped`
    );
    // Other keys in the same object are untouched.
    assert.equal(normalized?.tag, "keep-me");
  }
});

test("qoderCliTransport wins over QODER_CLI_TRANSPORT; absent defers to env", () => {
  const previous = process.env.QODER_CLI_TRANSPORT;
  try {
    process.env.QODER_CLI_TRANSPORT = "acp";
    // Per-connection override beats the process default in both directions.
    assert.equal(isQoderAcpTransportEnabled({ qoderCliTransport: "print" }), false);
    assert.equal(isQoderAcpTransportEnabled({ qoderCliTransport: " ACP " }), true);
    // No override → env decides.
    assert.equal(isQoderAcpTransportEnabled({}), true);
    assert.equal(isQoderAcpTransportEnabled(undefined), true);

    process.env.QODER_CLI_TRANSPORT = "";
    assert.equal(isQoderAcpTransportEnabled({ qoderCliTransport: "acp" }), true);
    assert.equal(isQoderAcpTransportEnabled({}), false);
    // Anything outside the two declared values is not an override.
    assert.equal(isQoderAcpTransportEnabled({ qoderCliTransport: "stream" }), false);
  } finally {
    if (previous === undefined) delete process.env.QODER_CLI_TRANSPORT;
    else process.env.QODER_CLI_TRANSPORT = previous;
  }
});
