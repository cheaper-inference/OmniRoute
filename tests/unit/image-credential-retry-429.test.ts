import assert from "node:assert/strict";
import test from "node:test";

import { executeImageWithCredentialFallback } from "../../src/sse/services/imageCredentialRetry.ts";

interface MockImageCredentials {
  connectionId: string;
  accessToken: string;
}

interface MockImageResult {
  success: boolean;
  status: number;
  error?: unknown;
  data?: unknown;
  retryable?: boolean;
}

test("executeImageWithCredentialFallback rotates to sibling account on Antigravity's quota-exhausted 429 (#14112)", async () => {
  const account1: MockImageCredentials = {
    connectionId: "conn-antigravity-1",
    accessToken: "token-1",
  };
  const account2: MockImageCredentials = {
    connectionId: "conn-antigravity-2",
    accessToken: "token-2",
  };

  const executedAccounts: string[] = [];

  const mockSelectNextCredentials = async (
    _provider: string,
    _requestedModel: string | null,
    excludedConnectionIds: Set<string>
  ) => {
    if (!excludedConnectionIds.has(account2.connectionId)) {
      return account2;
    }
    return { allRateLimited: true, retryAfter: 60 };
  };

  const mockExecute = async (creds: MockImageCredentials): Promise<MockImageResult> => {
    executedAccounts.push(creds.connectionId);
    if (creds.connectionId === "conn-antigravity-1") {
      // Antigravity's explicit exhausted-quota wording — the one 429 signal
      // isAntigravityImageQuotaExhausted() treats as safe to rotate on.
      return {
        success: false,
        status: 429,
        error: {
          error: {
            message: "Individual quota reached. Contact your administrator to enable overages.",
          },
        },
      };
    }
    return {
      success: true,
      status: 200,
      data: {
        created: Date.now(),
        data: [{ b64_json: "base64-image-data-conn2" }],
      },
    };
  };

  const { credentials, result } = await executeImageWithCredentialFallback({
    provider: "antigravity",
    requestedModel: "gemini-3.1-flash-image",
    credentials: account1,
    execute: mockExecute,
    selectNextCredentials: mockSelectNextCredentials,
  });

  assert.equal(result.success, true);
  assert.equal(result.status, 200);
  assert.deepEqual(executedAccounts, ["conn-antigravity-1", "conn-antigravity-2"]);
  assert.equal(credentials.connectionId, "conn-antigravity-2");
});

test("executeImageWithCredentialFallback terminates when all accounts return Antigravity's quota-exhausted 429 (#14112)", async () => {
  const account1: MockImageCredentials = {
    connectionId: "conn-antigravity-1",
    accessToken: "token-1",
  };
  const account2: MockImageCredentials = {
    connectionId: "conn-antigravity-2",
    accessToken: "token-2",
  };

  const executedAccounts: string[] = [];

  const mockSelectNextCredentials = async (
    _provider: string,
    _requestedModel: string | null,
    excludedConnectionIds: Set<string>
  ) => {
    if (!excludedConnectionIds.has(account2.connectionId)) {
      return account2;
    }
    return { allRateLimited: true, retryAfter: 60 };
  };

  const mockExecute = async (creds: MockImageCredentials): Promise<MockImageResult> => {
    executedAccounts.push(creds.connectionId);
    return {
      success: false,
      status: 429,
      error: {
        error: {
          message: "Individual quota reached. Contact your administrator to enable overages.",
        },
      },
    };
  };

  const { result } = await executeImageWithCredentialFallback({
    provider: "antigravity",
    requestedModel: "gemini-3.1-flash-image",
    credentials: account1,
    execute: mockExecute,
    selectNextCredentials: mockSelectNextCredentials,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 429);
  assert.deepEqual(executedAccounts, ["conn-antigravity-1", "conn-antigravity-2"]);
});

test("executeImageWithCredentialFallback does not rotate on an ordinary (non-quota-exhausted) 429 (#14112)", async () => {
  const account1: MockImageCredentials = {
    connectionId: "conn-antigravity-1",
    accessToken: "token-1",
  };
  const account2: MockImageCredentials = {
    connectionId: "conn-antigravity-2",
    accessToken: "token-2",
  };

  const executedAccounts: string[] = [];

  const mockSelectNextCredentials = async (
    _provider: string,
    _requestedModel: string | null,
    _excludedConnectionIds: Set<string>
  ) => account2;

  const mockExecute = async (creds: MockImageCredentials): Promise<MockImageResult> => {
    executedAccounts.push(creds.connectionId);
    // Image generation is non-idempotent: an ordinary rate-limit 429 (no
    // quota-exhausted evidence) must NOT trigger account rotation.
    return {
      success: false,
      status: 429,
      error: { error: { message: "RESOURCE_EXHAUSTED: too many requests; retry later" } },
    };
  };

  const { result } = await executeImageWithCredentialFallback({
    provider: "antigravity",
    requestedModel: "gemini-3.1-flash-image",
    credentials: account1,
    execute: mockExecute,
    selectNextCredentials: mockSelectNextCredentials,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 429);
  assert.deepEqual(executedAccounts, ["conn-antigravity-1"]);
});

test("executeImageWithCredentialFallback handles 401 and retryable flags correctly", async () => {
  const account1: MockImageCredentials = { connectionId: "conn-1", accessToken: "token-1" };
  const account2: MockImageCredentials = { connectionId: "conn-2", accessToken: "token-2" };

  const executedAccounts: string[] = [];

  const mockSelectNextCredentials = async (
    _provider: string,
    _requestedModel: string | null,
    excludedConnectionIds: Set<string>
  ) => {
    if (!excludedConnectionIds.has(account2.connectionId)) {
      return account2;
    }
    return null;
  };

  // 1. Test 401 rotation
  const result401 = await executeImageWithCredentialFallback({
    provider: "codex",
    requestedModel: "gpt-5.6-sol",
    credentials: account1,
    execute: async (creds: MockImageCredentials): Promise<MockImageResult> => {
      executedAccounts.push(creds.connectionId);
      if (creds.connectionId === "conn-1") {
        return { success: false, status: 401, error: "Unauthorized" };
      }
      return { success: true, status: 200, data: { ok: true } };
    },
    selectNextCredentials: mockSelectNextCredentials,
  });

  assert.equal(result401.result.success, true);
  assert.deepEqual(executedAccounts, ["conn-1", "conn-2"]);

  // 2. Non-retryable 400 error does NOT rotate
  executedAccounts.length = 0;
  const result400 = await executeImageWithCredentialFallback({
    provider: "codex",
    requestedModel: "gpt-5.6-sol",
    credentials: account1,
    execute: async (creds: MockImageCredentials): Promise<MockImageResult> => {
      executedAccounts.push(creds.connectionId);
      return { success: false, status: 400, error: "Invalid prompt format" };
    },
    selectNextCredentials: mockSelectNextCredentials,
  });

  assert.equal(result400.result.success, false);
  assert.equal(result400.result.status, 400);
  assert.deepEqual(executedAccounts, ["conn-1"]); // did not rotate

  // 3. Retryable 400 error DOES rotate
  executedAccounts.length = 0;
  const result400Retryable = await executeImageWithCredentialFallback({
    provider: "codex",
    requestedModel: "gpt-5.6-sol",
    credentials: account1,
    execute: async (creds: MockImageCredentials): Promise<MockImageResult> => {
      executedAccounts.push(creds.connectionId);
      if (creds.connectionId === "conn-1") {
        return {
          success: false,
          status: 400,
          retryable: true,
          error: "Model not supported on this account",
        };
      }
      return { success: true, status: 200, data: { ok: true } };
    },
    selectNextCredentials: mockSelectNextCredentials,
  });

  assert.equal(result400Retryable.result.success, true);
  assert.deepEqual(executedAccounts, ["conn-1", "conn-2"]);
});

test("image fallback must reject a selector returning an account outside the caller's API-key scope", async () => {
  const executed: string[] = [];
  let selectedScope: string[] | null = null;
  const first: MockImageCredentials = { connectionId: "allowed-1", accessToken: "first" };
  const forbidden: MockImageCredentials = { connectionId: "forbidden-2", accessToken: "second" };
  const result = await executeImageWithCredentialFallback({
    provider: "codex",
    requestedModel: "gpt-image-2",
    credentials: first,
    allowedConnections: ["allowed-1"],
    execute: async (credentials: MockImageCredentials): Promise<MockImageResult> => {
      executed.push(credentials.connectionId);
      return { success: false, status: 401, error: "expired token" };
    },
    selectNextCredentials: async (_provider, _model, _excluded, allowed) => {
      selectedScope = allowed;
      return forbidden;
    },
  });
  assert.deepEqual(selectedScope, ["allowed-1"]);
  assert.deepEqual(executed, ["allowed-1"]);
  assert.equal(result.result.status, 403);
});

test("image generation fails closed before sending on a disallowed initial credential", async () => {
  let executed = false;
  const result = await executeImageWithCredentialFallback({
    provider: "codex",
    requestedModel: "gpt-image-2",
    credentials: { connectionId: "forbidden", accessToken: "test" },
    allowedConnections: ["allowed"],
    execute: async (): Promise<MockImageResult> => {
      executed = true;
      return { success: true, status: 200 };
    },
  });
  assert.equal(executed, false);
  assert.equal(result.result.status, 403);
});

test("an empty API-key allowlist is not equivalent to an unscoped image request", async () => {
  let executions = 0;
  const result = await executeImageWithCredentialFallback({
    provider: "codex",
    requestedModel: "gpt-image-2",
    credentials: { connectionId: "some-account", accessToken: "test" },
    allowedConnections: [],
    execute: async (): Promise<MockImageResult> => {
      executions++;
      return { success: true, status: 200 };
    },
  });
  assert.equal(executions, 0);
  assert.equal(result.result.status, 403);
});

test("image account policy sentinel returns 403 without dispatch", async () => {
  let dispatched = 0;
  const { result } = await executeImageWithCredentialFallback({
    provider: "codex",
    requestedModel: "gpt-image-2",
    credentials: { blockedByKeyPolicy: true, blockedCount: 2 },
    allowedConnections: ["conn-permitted"],
    execute: async (): Promise<MockImageResult> => {
      dispatched++;
      return { success: true, status: 200 };
    },
  });
  assert.equal(result.status, 403);
  assert.equal(dispatched, 0);
});

test("policy denial after rotating a rejected account takes precedence over prior 401", async () => {
  let dispatched = 0;
  const { result } = await executeImageWithCredentialFallback({
    provider: "codex",
    requestedModel: "gpt-image-2",
    credentials: { connectionId: "conn-permitted", accessToken: "unused" },
    allowedConnections: ["conn-permitted"],
    execute: async (): Promise<MockImageResult> => {
      dispatched++;
      return { success: false, status: 401 };
    },
    selectNextCredentials: async () => ({ blockedByKeyPolicy: true }),
  });
  assert.equal(result.status, 403);
  assert.equal(dispatched, 1);
});

test("a scoped image key cannot dispatch without any credentials", async () => {
  for (const scope of [[], ["permitted-account"]]) {
    let executed = false;
    const { result } = await executeImageWithCredentialFallback({
      provider: "custom",
      requestedModel: "image-model",
      credentials: null,
      allowedConnections: scope,
      execute: async (): Promise<MockImageResult> => {
        executed = true;
        return { success: true, status: 200 };
      },
    });
    assert.equal(result.status, 403);
    assert.equal(executed, false);
  }
});

test("an unscoped local image provider may still dispatch without credentials", async () => {
  let executed = false;
  const { result } = await executeImageWithCredentialFallback({
    provider: "custom",
    requestedModel: "image-model",
    credentials: null,
    allowedConnections: null,
    execute: async (): Promise<MockImageResult> => {
      executed = true;
      return { success: true, status: 200 };
    },
  });
  assert.equal(result.status, 200);
  assert.equal(executed, true);
});

test("keyless image execution honors an explicit noauth connection scope", async () => {
  let dispatched = 0;
  const execute = async () => {
    dispatched++;
    return { success: true, status: 200 };
  };
  const allowed = await executeImageWithCredentialFallback({
    provider: "sdwebui",
    requestedModel: "sdwebui",
    credentials: null,
    allowedConnections: ["noauth"],
    execute,
  });
  assert.equal(allowed.result.status, 200);
  assert.equal(dispatched, 1);

  const denied = await executeImageWithCredentialFallback({
    provider: "sdwebui",
    requestedModel: "sdwebui",
    credentials: null,
    allowedConnections: ["unrelated-connection"],
    execute,
  });
  assert.equal(denied.result.status, 403);
  assert.equal(dispatched, 1);
});
