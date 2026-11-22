import assert from "node:assert/strict";
import test from "node:test";
import {
  __test_resetCredentialHealthCache,
  getCredentialHealth,
  isCredentialHealthy,
  setCredentialHealth,
} from "../../src/lib/credentialHealth/cache.ts";
import {
  recordKeyHealthStatus,
  __setKeyHealthPersistenceSink,
} from "../../open-sse/handlers/chatCore/keyHealth.ts";
import { getAllKeyHealth, removeConnectionHealth } from "../../open-sse/services/apiKeyRotator.ts";
import { persistConnectionTestHealth } from "../../src/app/api/providers/[id]/test/connectionTestHealth.ts";

const options = () => ({
  connectionId: "synthetic-manual",
  provider: "codex",
  connection: {
    testStatus: "error",
    lastError: "Quota window is closed",
    lastErrorAt: "2026-10-14T00:00:00.000Z",
    lastErrorType: "quota_exhausted",
    lastErrorSource: "upstream",
    errorCode: "429",
    rateLimitedUntil: "2099-01-01T00:00:00.000Z",
  },
  latest: {},
  probeStartedAt: "2026-10-14T00:00:30.000Z",
  result: { valid: true },
  diagnosis: { type: "ok", source: "upstream", code: null },
  operatorDisabled: false,
  clearErrorState: false,
  now: "2026-10-14T00:01:00.000Z",
});

test.afterEach(() => __test_resetCredentialHealthCache());

test(
  "persisted manual success immediately recovers cache without clearing future quota",
  { timeout: 2000 },
  async () => {
    const input = options();
    setCredentialHealth(
      input.connectionId,
      input.provider,
      "error",
      "Rejected",
      "upstream_auth_error"
    );
    let update: Record<string, unknown> | undefined;
    await persistConnectionTestHealth({
      ...input,
      persist: async (id, fields) => {
        assert.equal(id, input.connectionId);
        assert.equal(
          isCredentialHealthy(id),
          false,
          "recovery must wait for committed persistence"
        );
        update = fields;
      },
    });
    assert.equal(isCredentialHealthy(input.connectionId), true);
    assert.equal(getCredentialHealth(input.connectionId)?.lastError, undefined);
    assert.equal(update?.rateLimitedUntil, input.connection.rateLimitedUntil);
    assert.equal(update?.testStatus, "error");
    assert.equal(update?.lastError, input.connection.lastError);
    assert.equal(update?.lastErrorType, "quota_exhausted");
    assert.equal(update?.errorCode, "429");
    assert.equal(Object.hasOwn(update!, "backoffLevel"), false);
  }
);

test("failed persistence cannot advertise recovered credentials", { timeout: 2000 }, async () => {
  const input = options();
  setCredentialHealth(
    input.connectionId,
    input.provider,
    "error",
    "Rejected",
    "upstream_auth_error"
  );
  await assert.rejects(
    persistConnectionTestHealth({
      ...input,
      persist: async () => {
        throw new Error("Synthetic write failure");
      },
    }),
    /Synthetic write failure/
  );
  assert.equal(isCredentialHealthy(input.connectionId), false);
});

test(
  "a connection deleted during validation cannot advertise recovered credentials",
  { timeout: 2000 },
  async () => {
    const input = options();
    setCredentialHealth(
      input.connectionId,
      input.provider,
      "error",
      "Rejected",
      "upstream_auth_error"
    );
    // Release flow is preserved: the helper does not throw for a vanished row.
    await persistConnectionTestHealth({ ...input, persist: async () => null });
    assert.equal(isCredentialHealthy(input.connectionId), false);
  }
);

test(
  "operator-disabled success preserves activation guard and existing clear-state decision",
  { timeout: 2000 },
  async () => {
    let update: Record<string, unknown> = {};
    await persistConnectionTestHealth({
      ...options(),
      operatorDisabled: true,
      clearErrorState: true,
      persist: async (_id, fields) => {
        update = fields;
      },
    });
    assert.equal(Object.hasOwn(update, "isActive"), false);
    assert.equal(update.testStatus, "active");
    assert.equal(update.rateLimitedUntil, null);
    assert.equal(update.lastError, null);
    assert.equal(update.backoffLevel, 0);
  }
);

test(
  "failed probes keep transient cooldown and terminal-state update semantics",
  { timeout: 2000 },
  async () => {
    const input = options();
    let update: Record<string, unknown> = {};
    await persistConnectionTestHealth({
      ...input,
      result: { valid: false, error: "Transient network failure" },
      diagnosis: { type: "network_error", source: "upstream", code: "network_error" },
      persist: async (_id, fields) => {
        update = fields;
      },
    });
    assert.equal(update.testStatus, "error");
    assert.equal(Object.hasOwn(update, "isActive"), false);
    assert.ok(Date.parse(String(update.rateLimitedUntil)) > Date.now());
    assert.equal(getCredentialHealth(input.connectionId), undefined);
    await persistConnectionTestHealth({
      ...input,
      result: { valid: false, error: "Terminal failure" },
      diagnosis: { type: "expired", source: "account", code: "expired" },
      persist: async (_id, fields) => {
        update = fields;
      },
    });
    assert.equal(update.rateLimitedUntil, input.connection.rateLimitedUntil);
  }
);

const PASSIVE_ENV = "OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS";
const adoptedTokens = {
  accessToken: "synthetic-adopted-access",
  refreshToken: "synthetic-adopted-refresh",
  expiresIn: 3600,
};
const TOKEN_FIELDS = ["accessToken", "refreshToken", "expiresAt"] as const;

async function persistWithRefresh(provider: string): Promise<Record<string, unknown>> {
  let update: Record<string, unknown> = {};
  await persistConnectionTestHealth({
    ...options(),
    provider,
    result: { valid: true, refreshed: true, newTokens: adoptedTokens },
    persist: async (_id, fields) => {
      update = fields;
    },
  });
  return update;
}

test(
  "a passive Codex connection test never persists tokens carried by its result",
  { timeout: 2000 },
  async () => {
    const previous = process.env[PASSIVE_ENV];
    process.env[PASSIVE_ENV] = "codex";
    try {
      for (const provider of ["codex", "cx"]) {
        const update = await persistWithRefresh(provider);
        for (const field of TOKEN_FIELDS) {
          assert.equal(
            Object.hasOwn(update, field),
            false,
            `${provider}: passive standby must not write ${field} from a connection test`
          );
        }
        assert.equal(update.testStatus, "error", "health fields are still persisted");
      }
    } finally {
      if (previous === undefined) delete process.env[PASSIVE_ENV];
      else process.env[PASSIVE_ENV] = previous;
    }
  }
);

test(
  "a non-passive connection test still persists refreshed tokens",
  { timeout: 2000 },
  async () => {
    const previous = process.env[PASSIVE_ENV];
    delete process.env[PASSIVE_ENV];
    try {
      const update = await persistWithRefresh("codex");
      assert.equal(update.accessToken, adoptedTokens.accessToken);
      assert.equal(update.refreshToken, adoptedTokens.refreshToken);
      assert.ok(Date.parse(String(update.expiresAt)) > Date.now());
      // Passive mode scoped to codex must not affect other providers.
      process.env[PASSIVE_ENV] = "codex";
      const other = await persistWithRefresh("claude");
      assert.equal(other.accessToken, adoptedTokens.accessToken);
    } finally {
      if (previous === undefined) delete process.env[PASSIVE_ENV];
      else process.env[PASSIVE_ENV] = previous;
    }
  }
);

test("a rejected recovery write leaves the in-memory key rejection untouched", async () => {
  const input = options();
  const credentials = { connectionId: input.connectionId, apiKey: "recovery-fixture" };
  __setKeyHealthPersistenceSink(() => {});
  try {
    recordKeyHealthStatus(401, credentials, undefined, undefined, "", null, 1);
    recordKeyHealthStatus(401, credentials, undefined, undefined, "", null, 2);
    const before = structuredClone(getAllKeyHealth()[`${input.connectionId}:primary`]);
    await assert.rejects(
      persistConnectionTestHealth({
        ...input,
        connection: { ...input.connection, apiKey: "recovery-fixture" },
        latest: { providerSpecificData: { apiKeyHealth: { primary: before } } },
        persist: async () => {
          throw new Error("Synthetic recovery commit failure");
        },
      }),
      /Synthetic recovery commit failure/
    );
    assert.deepEqual(getAllKeyHealth()[`${input.connectionId}:primary`], before);
    assert.equal(isCredentialHealthy(input.connectionId), false);
  } finally {
    __setKeyHealthPersistenceSink(null);
    removeConnectionHealth(input.connectionId);
  }
});

test(
  "an account-deactivated verdict is terminal even on an unparked connection",
  { timeout: 2000 },
  async () => {
    const input = options();
    const unparked = { ...input.connection, testStatus: "error" };
    let update: Record<string, unknown> = {};
    await persistConnectionTestHealth({
      ...input,
      connection: unparked,
      result: { valid: false, error: "Account deactivated" },
      diagnosis: { type: "account_deactivated", source: "account", code: "account_deactivated" },
      persist: async (_id, fields) => {
        update = fields;
      },
    });
    assert.equal(
      update.rateLimitedUntil,
      unparked.rateLimitedUntil,
      "a deactivated account must not be scheduled for a 30s retry"
    );
    assert.equal(update.testStatus, "error");
  }
);

test(
  "a failed probe on a parked row writes no cooldown of its own",
  { timeout: 2000 },
  async () => {
    // The transaction restores the stored deadline. When the parked row has none, the handler must
    // not invent one: a 30s window here would be the second owner this series removed.
    const input = options();
    const parked = { ...input.connection, testStatus: "deactivated", rateLimitedUntil: null };
    let update: Record<string, unknown> = {};
    await persistConnectionTestHealth({
      ...input,
      connection: parked,
      result: { valid: false, error: "probe failed" },
      diagnosis: { type: "upstream_error", source: "upstream", code: "500" },
      persist: async (_id, fields) => {
        update = fields;
      },
    });
    assert.equal(
      Object.prototype.hasOwnProperty.call(update, "rateLimitedUntil"),
      false,
      "a parked row's cooldown belongs to the transaction, not to the probe handler"
    );
  }
);

test(
  "a transient failure on an unparked connection still gets the short retry window",
  { timeout: 2000 },
  async () => {
    const input = options();
    const unparked = { ...input.connection, testStatus: "error", rateLimitedUntil: null };
    let update: Record<string, unknown> = {};
    await persistConnectionTestHealth({
      ...input,
      connection: unparked,
      result: { valid: false, error: "Transient network failure" },
      diagnosis: { type: "network_error", source: "upstream", code: "network_error" },
      persist: async (_id, fields) => {
        update = fields;
      },
    });
    assert.equal(update.testStatus, "error");
    const waitMs = Date.parse(String(update.rateLimitedUntil)) - Date.now();
    assert.ok(waitMs > 25_000 && waitMs < 35_000, `expected a 30s retry window, got ${waitMs}ms`);
  }
);

test(
  "the probe write path asks for parked-verdict preservation only on failure",
  { timeout: 2000 },
  async () => {
    const input = options();
    const seen: Array<Record<string, unknown> | undefined> = [];
    const persist = async (
      _id: string,
      _fields: Record<string, unknown>,
      opts?: Record<string, unknown>
    ) => {
      seen.push(opts);
    };
    await persistConnectionTestHealth({
      ...input,
      result: { valid: false, error: "Account deactivated" },
      diagnosis: { type: "account_deactivated", source: "account", code: "account_deactivated" },
      persist,
    });
    await persistConnectionTestHealth({
      ...input,
      result: { valid: true },
      diagnosis: { type: "ok", source: "upstream", code: null },
      persist,
    });
    assert.equal(seen[0]?.probeHealthWrite?.outcome, "failure");
    assert.equal(seen[1]?.probeHealthWrite?.outcome, "success");
    assert.equal(seen[1]?.probeHealthWrite?.startedAt, input.probeStartedAt);
  }
);

test(
  "the probe write carries the fresh row, not the pre-probe snapshot",
  { timeout: 2000 },
  async () => {
    const input = options();
    let update: Record<string, unknown> = {};
    await persistConnectionTestHealth({
      ...input,
      // Snapshot taken before the probe: healthy, no cooldown.
      connection: { ...input.connection, testStatus: "active", rateLimitedUntil: null, lastError: null },
      // Row read after the probe: parked by real traffic while the probe ran.
      latest: {
        ...input.connection,
        testStatus: "deactivated",
        rateLimitedUntil: "2099-05-05T00:00:00.000Z",
        lastError: "Account deactivated",
      },
      result: { valid: true },
      diagnosis: { type: "ok", source: "upstream", code: null },
      clearErrorState: false,
      persist: async (_id, fields) => {
        update = fields;
      },
    });
    assert.equal(update.testStatus, "deactivated");
    assert.equal(update.rateLimitedUntil, "2099-05-05T00:00:00.000Z");
    assert.equal(update.lastError, "Account deactivated");
  }
);
