// Codex workspace metadata for the provider dashboard: the ChatGPT accounts
// endpoint names the workspace a connection is bound to (personal plan vs.
// Business seat), which the OAuth id_token does not carry.
import { beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import {
  CODEX_ACCOUNTS_CHECK_URL,
  fetchCodexWorkspaceInfo,
  parseCodexWorkspaceInfo,
} from "../../open-sse/services/usage/codexWorkspace.ts";
import {
  CODEX_WORKSPACE_INFO_FAILURE_BACKOFF_MS,
  CODEX_WORKSPACE_INFO_TTL_MS,
  resetCodexWorkspaceInfoBackoff,
  syncCodexWorkspaceInfoIfNeeded,
} from "../../src/lib/usage/codexWorkspaceSync.ts";

beforeEach(() => {
  resetCodexWorkspaceInfoBackoff();
});

// Shape of https://chatgpt.com/backend-api/accounts/check/v4-2023-04-27 for a
// user with a personal Pro plan and a seat in a Business workspace.
const ACCOUNTS_PAYLOAD = {
  accounts: {
    "ws-business": {
      account: {
        name: "Acme Ltd",
        structure: "workspace",
        plan_type: "self_serve_business_prolite",
        account_user_role: "standard-user",
      },
    },
    "acct-personal": {
      account: {
        name: null,
        structure: "personal",
        plan_type: "pro",
        account_user_role: "account-owner",
      },
    },
    default: {
      account: {
        name: null,
        structure: "personal",
        plan_type: "pro",
        account_user_role: "account-owner",
      },
    },
  },
  account_ordering: ["acct-personal", "ws-business"],
};

test("parseCodexWorkspaceInfo returns the account bound to the workspace id", () => {
  assert.deepEqual(parseCodexWorkspaceInfo(ACCOUNTS_PAYLOAD, "ws-business"), {
    workspaceName: "Acme Ltd",
    workspaceStructure: "workspace",
    workspaceRole: "standard-user",
  });
  assert.deepEqual(parseCodexWorkspaceInfo(ACCOUNTS_PAYLOAD, "acct-personal"), {
    workspaceName: null,
    workspaceStructure: "personal",
    workspaceRole: "account-owner",
  });
});

test("parseCodexWorkspaceInfo uses the default entry only when no workspace is bound", () => {
  assert.equal(parseCodexWorkspaceInfo(ACCOUNTS_PAYLOAD, null)?.workspaceStructure, "personal");
  assert.equal(parseCodexWorkspaceInfo(ACCOUNTS_PAYLOAD, "ws-unknown"), null);
});

test("parseCodexWorkspaceInfo rejects malformed payloads", () => {
  assert.equal(parseCodexWorkspaceInfo(null, "ws-business"), null);
  assert.equal(parseCodexWorkspaceInfo({ accounts: [] }, "ws-business"), null);
  assert.equal(parseCodexWorkspaceInfo({ accounts: { "ws-business": {} } }, "ws-business"), null);
});

test("fetchCodexWorkspaceInfo sends the workspace header and a timeout signal", async () => {
  let seen: { url: string; init: RequestInit } | null = null;
  const info = await fetchCodexWorkspaceInfo("token-1", "ws-business", {
    fetchImpl: async (url, init) => {
      seen = { url, init };
      return new Response(JSON.stringify(ACCOUNTS_PAYLOAD), { status: 200 });
    },
  });
  assert.equal(info?.workspaceName, "Acme Ltd");
  assert.ok(seen);
  assert.equal(seen.url, CODEX_ACCOUNTS_CHECK_URL);
  const headers = seen.init.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer token-1");
  assert.equal(headers["chatgpt-account-id"], "ws-business");
  assert.ok(seen.init.signal instanceof AbortSignal);
});

test("fetchCodexWorkspaceInfo resolves to null on HTTP errors, network errors and bad JSON", async () => {
  const cases: Array<() => Promise<Response>> = [
    async () => new Response("denied", { status: 403 }),
    async () => {
      throw new Error("socket hang up");
    },
    async () => new Response("not json", { status: 200 }),
  ];
  for (const respond of cases) {
    assert.equal(
      await fetchCodexWorkspaceInfo("token-1", "ws-business", { fetchImpl: respond }),
      null
    );
  }
});

const NOW = Date.parse("2026-10-28T10:00:00.000Z");
const INFO = { workspaceName: "Acme Ltd", workspaceStructure: "workspace", workspaceRole: "owner" };

test("syncCodexWorkspaceInfoIfNeeded stores workspace info and returns the updated connection", async () => {
  const writes: Array<{ id: string; psd: Record<string, unknown> }> = [];
  const connection = {
    id: "conn-1",
    provider: "codex",
    accessToken: "token-1",
    providerSpecificData: { workspaceId: "ws-business", workspacePlanType: "team" },
  };
  const result = await syncCodexWorkspaceInfoIfNeeded(connection, {
    persist: async (id, psd) => {
      writes.push({ id, psd });
    },
    fetchInfo: async (token, workspaceId, options) => {
      assert.equal(token, "token-1");
      assert.equal(workspaceId, "ws-business");
      assert.equal(options.connectionId, "conn-1");
      return INFO;
    },
    now: () => NOW,
  });
  const expected = {
    workspaceId: "ws-business",
    workspacePlanType: "team",
    workspaceName: "Acme Ltd",
    workspaceStructure: "workspace",
    workspaceRole: "owner",
    workspaceInfoFetchedAt: "2026-10-28T10:00:00.000Z",
  };
  // Only the workspace keys are written; the store merges them onto the row.
  assert.deepEqual(writes, [
    {
      id: "conn-1",
      psd: {
        workspaceName: "Acme Ltd",
        workspaceStructure: "workspace",
        workspaceRole: "owner",
        workspaceInfoFetchedAt: "2026-10-28T10:00:00.000Z",
      },
    },
  ]);
  assert.deepEqual(result.providerSpecificData, expected);
});

test("syncCodexWorkspaceInfoIfNeeded skips fresh entries, other providers and missing tokens", async () => {
  let calls = 0;
  const deps = {
    persist: async () => {
      calls++;
    },
    fetchInfo: async () => {
      calls++;
      return INFO;
    },
    now: () => NOW,
  };
  const fresh = new Date(NOW - CODEX_WORKSPACE_INFO_TTL_MS + 60_000).toISOString();
  const base = { id: "conn-1", provider: "codex", accessToken: "token-1" };
  await syncCodexWorkspaceInfoIfNeeded(
    { ...base, providerSpecificData: { workspaceInfoFetchedAt: fresh } },
    deps
  );
  await syncCodexWorkspaceInfoIfNeeded({ ...base, provider: "claude" }, deps);
  await syncCodexWorkspaceInfoIfNeeded({ ...base, accessToken: null }, deps);
  assert.equal(calls, 0);

  const stale = new Date(NOW - CODEX_WORKSPACE_INFO_TTL_MS - 60_000).toISOString();
  await syncCodexWorkspaceInfoIfNeeded(
    { ...base, providerSpecificData: { workspaceInfoFetchedAt: stale } },
    deps
  );
  assert.equal(calls, 2);
});

test("syncCodexWorkspaceInfoIfNeeded leaves the connection unchanged when lookup or write fails", async () => {
  const connection = { id: "conn-1", provider: "codex", accessToken: "token-1" };
  const noInfo = await syncCodexWorkspaceInfoIfNeeded(connection, {
    persist: async () => assert.fail("must not write without info"),
    fetchInfo: async () => null,
  });
  assert.equal(noInfo, connection);

  const writeFails = await syncCodexWorkspaceInfoIfNeeded(connection, {
    persist: async () => {
      throw new Error("database is locked");
    },
    fetchInfo: async () => INFO,
  });
  assert.equal(writeFails, connection);
});

test("syncCodexWorkspaceInfoIfNeeded backs off after a failed lookup instead of retrying every refresh", async () => {
  let lookups = 0;
  let clock = NOW;
  let answer: typeof INFO | null = null;
  const deps = {
    persist: async () => {},
    fetchInfo: async () => {
      lookups++;
      return answer;
    },
    now: () => clock,
  };
  const connection = { id: "conn-blocked", provider: "codex", accessToken: "token-1" };

  await syncCodexWorkspaceInfoIfNeeded(connection, deps);
  assert.equal(lookups, 1);

  // Usage refreshes inside the backoff window do not hit the endpoint again.
  clock = NOW + 5 * 60_000;
  await syncCodexWorkspaceInfoIfNeeded(connection, deps);
  clock = NOW + CODEX_WORKSPACE_INFO_FAILURE_BACKOFF_MS - 1;
  await syncCodexWorkspaceInfoIfNeeded(connection, deps);
  assert.equal(lookups, 1);

  // The backoff is per connection.
  await syncCodexWorkspaceInfoIfNeeded({ ...connection, id: "conn-other" }, deps);
  assert.equal(lookups, 2);

  // Once the window passes, the lookup is retried and a success clears the backoff.
  clock = NOW + CODEX_WORKSPACE_INFO_FAILURE_BACKOFF_MS;
  answer = INFO;
  const synced = await syncCodexWorkspaceInfoIfNeeded(connection, deps);
  assert.equal(lookups, 3);
  assert.equal((synced.providerSpecificData as Record<string, unknown>).workspaceName, "Acme Ltd");
});

test("syncCodexWorkspaceInfoIfNeeded never writes back the providerSpecificData read before the lookup", async () => {
  const writes: Array<Record<string, unknown>> = [];
  const connection = {
    id: "conn-1",
    provider: "codex",
    accessToken: "token-1",
    providerSpecificData: { workspaceId: "ws-business", cooldownUntil: null },
  };
  await syncCodexWorkspaceInfoIfNeeded(connection, {
    persist: async (_id, fields) => {
      writes.push(fields);
    },
    fetchInfo: async () => INFO,
    now: () => NOW,
  });
  // A stale cooldownUntil: null from the snapshot would overwrite a cooldown another
  // path stored while the lookup was in flight.
  assert.deepEqual(writes, [
    {
      workspaceName: "Acme Ltd",
      workspaceStructure: "workspace",
      workspaceRole: "owner",
      workspaceInfoFetchedAt: "2026-10-28T10:00:00.000Z",
    },
  ]);
});
