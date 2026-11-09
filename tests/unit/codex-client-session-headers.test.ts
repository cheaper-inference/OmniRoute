import assert from "node:assert/strict";
import test from "node:test";

import {
  applyCodexClientIdentityHeaders,
  applyCodexClientMetadata,
  getCodexClientSessionId,
  getCodexConvergedThreadId,
  hasCodexIdentityHeaders,
  resolveCodexOriginalIdentityHeaders,
  withCodexFingerprintCredentials,
  type CodexClientIdentity,
  type CodexFingerprintMode,
} from "../../open-sse/config/codexIdentity.ts";
import {
  __resetCodexTurnStateOriginsForTesting,
  noteCodexTurnStateProvenance,
} from "../../open-sse/config/codexTurnState.ts";

const SESSION = "ses_client-session_01:turn.2";
const ALIASES = ["x-opencode-session-id", "x-session-affinity", "X-Session-Id"];
const credentialsFor = (mode: CodexFingerprintMode = "session") => ({
  accessToken: "synthetic-oauth-token",
  connectionId: "synthetic-connection-a",
  providerSpecificData: { codexFingerprintMode: mode } as Record<string, unknown>,
});

function identityFor(
  headers: Headers | Record<string, unknown>,
  mode: CodexFingerprintMode = "session"
) {
  const credentials = credentialsFor(mode);
  const wrapped = withCodexFingerprintCredentials(credentials, headers, {});
  const identity = wrapped.providerSpecificData.codexClientIdentity as CodexClientIdentity;
  assert.ok(identity);
  return identity;
}

for (const name of ALIASES) {
  for (const kind of ["record", "Headers"]) {
    test(`${name} in ${kind} preserves normalized session lineage through credentials and carriers`, () => {
      const record = { [name.toUpperCase()]: `  ${SESSION}  ` };
      const headers = kind === "Headers" ? new Headers(record) : record;
      assert.equal(getCodexClientSessionId(headers), SESSION);
      assert.equal(hasCodexIdentityHeaders(headers), true);
      const identity = identityFor(headers);
      assert.equal(identity.clientPresentedIdentity, true);
      assert.equal(
        identity.threadId,
        getCodexConvergedThreadId(
          SESSION,
          credentialsFor().providerSpecificData,
          "synthetic-connection-a"
        )
      );
      assert.notEqual(identity.threadId, identity.sessionId);
      assert.equal(identityFor(headers).threadId, identity.threadId);
      assert.notEqual(identityFor({ [name]: `${SESSION}-other` }).threadId, identity.threadId);

      const outbound: Record<string, string> = {};
      const body: Record<string, unknown> = {
        client_metadata: { "x-codex-turn-metadata": '{"custom":"kept"}' },
      };
      applyCodexClientIdentityHeaders(outbound, identity);
      applyCodexClientMetadata(body, identity);
      const metadata = body.client_metadata as Record<string, unknown>;
      const turn = JSON.parse(outbound["x-codex-turn-metadata"]);
      const bodyTurn = JSON.parse(metadata["x-codex-turn-metadata"] as string);
      assert.equal(outbound["session-id"], identity.sessionId);
      assert.equal(outbound.session_id, metadata.session_id);
      assert.equal(outbound["thread-id"], identity.threadId);
      assert.equal(outbound["thread-id"], metadata.thread_id);
      assert.equal(outbound["x-client-request-id"], identity.threadId);
      assert.equal(outbound["x-codex-window-id"], identity.windowId);
      assert.equal(turn.thread_id, identity.threadId);
      assert.equal(turn.turn_id, metadata.turn_id);
      assert.equal(bodyTurn.turn_id, turn.turn_id);
      assert.equal(bodyTurn.custom, "kept");
      assert.equal(turn.sandbox, undefined);
      assert.equal(turn.thread_source, undefined);
      assert.equal(bodyTurn.sandbox, undefined);
      assert.equal(bodyTurn.thread_source, undefined);
    });
  }
}

test("native session headers retain priority over conflicting aliases", () => {
  const aliases = Object.fromEntries(ALIASES.map((name) => [name, SESSION]));
  for (const record of [
    { ...aliases, "Session-Id": "native-hyphen", SESSION_ID: "native-underscore" },
    { ...aliases, SESSION_ID: "native-underscore" },
    { ...aliases, "session-id": "bad/session", session_id: "native-underscore" },
  ]) {
    for (const headers of [record, new Headers(record)]) {
      const expected = "Session-Id" in record ? "native-hyphen" : "native-underscore";
      assert.equal(getCodexClientSessionId(headers), expected);
      assert.equal(identityFor(headers).threadId, identityFor({ "session-id": expected }).threadId);
    }
  }
});

test("unusable native and alias values fall through to the first valid session alias", () => {
  const record = {
    "session-id": "bad/session",
    session_id: " ",
    "x-opencode-session-id": "bad/session",
    "x-session-affinity": ` ${SESSION} `,
    "x-session-id": "lower-priority-session",
  };
  for (const headers of [record, new Headers(record)]) {
    assert.equal(getCodexClientSessionId(headers), SESSION);
  }
  assert.equal(getCodexClientSessionId({ ...record, "x-opencode-session-id": SESSION }), SESSION);
  assert.equal(
    getCodexClientSessionId({ "x-opencode-session-id": 123, "x-session-id": SESSION }),
    SESSION
  );
});

test("absent, unrelated and parent session headers do not present an identity", () => {
  const records = [
    {},
    { "content-type": "application/json" },
    { "x-opencode-parent-session-id": SESSION },
    { "x-parent-session-id": SESSION },
    { "x-session-affinity-extra": SESSION },
  ];
  for (const record of records) {
    for (const headers of [record, new Headers(record)]) {
      assert.equal(getCodexClientSessionId(headers), null);
      assert.equal(hasCodexIdentityHeaders(headers), false);
      assert.equal(identityFor(headers).clientPresentedIdentity, false);
    }
  }
  assert.equal(getCodexClientSessionId(null), null);
  assert.equal(getCodexClientSessionId(undefined), null);
  assert.equal(hasCodexIdentityHeaders(null), false);
});

for (const name of ALIASES) {
  test(`${name} rejects blank, unsafe, oversized and nonstring values without fabricating carriers`, () => {
    const invalid = [
      "",
      " \t ",
      "bad/session",
      "bad session",
      "bad\r\nvalue",
      "é",
      "s".repeat(201),
      123,
      false,
      null,
      undefined,
      [SESSION],
      {},
    ];
    for (const value of invalid) {
      const record = { [name]: value };
      const bags: Array<Headers | Record<string, unknown>> = [record];
      // Headers itself forbids CR/LF and coerces nonstrings: test those at the raw record seam.
      if (typeof value === "string" && !/[\r\n]/.test(value)) {
        bags.push(new Headers(record as Record<string, string>));
      }
      for (const headers of bags) {
        assert.equal(getCodexClientSessionId(headers), null);
        assert.equal(hasCodexIdentityHeaders(headers), false);
        const identity = identityFor(headers);
        assert.equal(identity.clientPresentedIdentity, false);
        const outbound: Record<string, string> = {};
        const body: Record<string, unknown> = {};
        applyCodexClientIdentityHeaders(outbound, identity);
        applyCodexClientMetadata(body, identity);
        assert.deepEqual(outbound, { "x-codex-installation-id": identity.installationId });
        assert.deepEqual(body.client_metadata, {
          "x-codex-installation-id": identity.installationId,
        });
      }
    }
  });

  test(`${name} leaves full account-sharing, device scope and off passthrough contracts intact`, () => {
    const full = identityFor({ [name]: SESSION }, "full");
    assert.equal(full.threadId, full.sessionId);
    assert.equal(identityFor({ [name]: `${SESSION}-other` }, "full").threadId, full.threadId);
    const device = identityFor({ [name]: SESSION }, "device");
    assert.equal(device.sessionId, "");
    assert.equal(device.threadId, "");
    const headers: Record<string, string> = {};
    applyCodexClientIdentityHeaders(headers, device);
    assert.deepEqual(headers, { "x-codex-installation-id": device.installationId });

    const credentials = credentialsFor("off");
    assert.equal(
      withCodexFingerprintCredentials(credentials, { [name]: SESSION }, {}),
      credentials
    );
    assert.equal(
      resolveCodexOriginalIdentityHeaders({ credentials, clientHeaders: { [name]: SESSION } }),
      null
    );
    const native = withCodexFingerprintCredentials(
      credentials,
      { [name]: SESSION, "session-id": "native" },
      {}
    );
    assert.deepEqual(native.providerSpecificData.codexOriginalIdentityHeaders, {
      "session-id": "native",
    });
  });

  test(`${name} skips compact identity convergence and API-key credentials`, () => {
    for (const path of ["/compact", "/responses/compact", "/v1/responses/compact"]) {
      const credentials = { ...credentialsFor(), requestEndpointPath: path };
      assert.equal(
        withCodexFingerprintCredentials(credentials, { [name]: SESSION }, {}),
        credentials
      );
    }
    const credentials = { ...credentialsFor(), accessToken: undefined };
    assert.equal(
      withCodexFingerprintCredentials(credentials, { [name]: SESSION }, {}),
      credentials
    );
  });

  test(`${name} uses the original normalized session for turn-state provenance and echo routing`, () => {
    __resetCodexTurnStateOriginsForTesting();
    try {
      const headers = new Headers({
        [name]: ` ${SESSION} `,
        "x-codex-turn-state": "synthetic-turn-state",
      });
      // Both response commit paths record this exported extractor's result.
      noteCodexTurnStateProvenance(getCodexClientSessionId(headers), "synthetic-connection-a");
      for (const mode of ["session", "full", "device", "off"] as const) {
        const credentials = credentialsFor(mode);
        assert.equal(
          withCodexFingerprintCredentials(credentials, headers, {}).providerSpecificData
            .codexTurnStateEcho,
          "synthetic-turn-state"
        );
        const other = { ...credentials, connectionId: "synthetic-connection-b" };
        assert.equal(
          withCodexFingerprintCredentials(other, headers, {}).providerSpecificData
            .codexTurnStateEcho,
          undefined
        );
        assert.equal(
          withCodexFingerprintCredentials(
            other,
            { [name]: `${SESSION}-unknown`, "x-codex-turn-state": "unknown-echo" },
            {}
          ).providerSpecificData.codexTurnStateEcho,
          "unknown-echo"
        );
      }
      const compact = {
        ...credentialsFor(),
        connectionId: "synthetic-connection-b",
        requestEndpointPath: "/responses/compact",
      };
      assert.equal(withCodexFingerprintCredentials(compact, headers, {}), compact);
      const native = {
        "session-id": "native-unknown",
        [name]: SESSION,
        "x-codex-turn-state": "native-echo",
      };
      assert.equal(
        withCodexFingerprintCredentials(compact, native, {}).providerSpecificData
          .codexTurnStateEcho,
        "native-echo"
      );
    } finally {
      __resetCodexTurnStateOriginsForTesting();
    }
  });
}

test("alias-backed executor headers and body agree without mutating caller inputs or cache policy", async () => {
  const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");
  const executor = new CodexExecutor();
  for (const name of ALIASES) {
    for (const scope of ["client", "thread"]) {
      const credentials = credentialsFor();
      credentials.providerSpecificData.codexPromptCacheKeyScope = scope;
      const clientHeaders = Object.freeze({ [name]: SESSION });
      const body = Object.freeze({
        model: "gpt-5.5",
        input: Object.freeze([{ role: "user", content: "synthetic fixture" }]),
        prompt_cache_key: SESSION,
        client_metadata: Object.freeze({ "x-codex-turn-metadata": '{"custom":"kept"}' }),
      });
      const before = structuredClone({ credentials, clientHeaders, body });
      Object.freeze(credentials.providerSpecificData);
      Object.freeze(credentials);
      const wrapped = withCodexFingerprintCredentials(credentials, clientHeaders, body);
      const identity = wrapped.providerSpecificData.codexClientIdentity as CodexClientIdentity;
      const headers = executor.buildHeaders(wrapped, true, clientHeaders);
      const transformed = executor.transformRequest("gpt-5.5", body, true, wrapped);
      const metadata = transformed.client_metadata as Record<string, unknown>;
      assert.equal(identity.clientPresentedIdentity, true);
      assert.equal(headers["thread-id"], identity.threadId);
      assert.equal(metadata.thread_id, headers["thread-id"]);
      assert.equal(metadata.session_id, headers["session-id"]);
      assert.equal(transformed.prompt_cache_key, scope === "thread" ? identity.threadId : SESSION);
      assert.deepEqual({ credentials, clientHeaders, body }, before);
    }
  }
});
