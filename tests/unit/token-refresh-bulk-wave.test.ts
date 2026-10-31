/**
 * Grouped token refresh (`getAllAccessTokens`) — bounded wave, per-connection
 * results, and rotated-token persistence on the connection row.
 *
 * The grouped path used to refresh each connection serially without a
 * connection id (Layer 2, no per-connection mutex), keep one result per
 * provider (same-provider siblings overwrote each other), and leave rotated
 * refresh tokens out of the database.
 *
 * Real isolated DB (`DATA_DIR` mkdtemp + `resetDbInstance`) — `mock.module`
 * is unavailable under the tsx/ESM runner of this repo.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-token-refresh-bulk-wave-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const tokenRefresh = await import("../../open-sse/services/tokenRefresh.ts");
const sseTokenRefresh = await import("../../src/sse/services/tokenRefresh.ts");
const { PROVIDERS } = await import("../../open-sse/config/constants.ts");

const { getAllAccessTokens, getConnectionRefreshMutexStatus } = tokenRefresh;

const TOKEN_URL_A = "https://auth-a.example.com/token";
const TOKEN_URL_B = "https://auth-b.example.com/token";
const TOKEN_URL_C = "https://auth-c.example.com/token";

type LogLevel = "debug" | "info" | "warn" | "error";
type LogEntry = { level: LogLevel; scope: unknown; message: unknown; meta: unknown };
type MockLogger = {
  entries: LogEntry[];
  debug: (...args: [unknown?, unknown?, unknown?]) => void;
  info: (...args: [unknown?, unknown?, unknown?]) => void;
  warn: (...args: [unknown?, unknown?, unknown?]) => void;
  error: (...args: [unknown?, unknown?, unknown?]) => void;
};

function createLog(): MockLogger {
  const entries: LogEntry[] = [];
  const push = (level: LogLevel, args: [unknown?, unknown?, unknown?]) => {
    const [scope, message, meta] = args;
    entries.push({ level, scope, message, meta });
  };

  return {
    entries,
    debug: (...args) => push("debug", args),
    info: (...args) => push("info", args),
    warn: (...args) => push("warn", args),
    error: (...args) => push("error", args),
  };
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function refreshTokenFromBody(init?: RequestInit): string {
  const body = init?.body;
  const params =
    typeof body === "string"
      ? new URLSearchParams(body)
      : body instanceof URLSearchParams
        ? body
        : new URLSearchParams();
  return params.get("refresh_token") ?? "";
}

async function withMockedFetch<TResult>(fetchImpl: typeof fetch, fn: () => Promise<TResult>) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  try {
    return await fn();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function withPatchedProperties<TResult>(
  target: object,
  patch: Record<string, unknown>,
  fn: () => Promise<TResult>
) {
  const previous = new Map<string, unknown>();
  const targetRecord = target as Record<string, unknown>;
  for (const [key, value] of Object.entries(patch)) {
    previous.set(
      key,
      Object.prototype.hasOwnProperty.call(targetRecord, key) ? targetRecord[key] : undefined
    );
    targetRecord[key] = value;
  }

  try {
    return await fn();
  } finally {
    for (const [key] of Object.entries(patch)) {
      const prior = previous.get(key);
      if (prior === undefined) {
        delete targetRecord[key];
      } else {
        targetRecord[key] = prior;
      }
    }
  }
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.before(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test(
  "bulk token refresh refreshes all connections in one bounded wave",
  { timeout: 30000 },
  async () => {
    const log = createLog();
    let fetchCount = 0;
    let inFlight = 0;
    let maxInFlight = 0;
    const gates = new Map<string, () => void>();

    const connections = [
      {
        provider: "custom-oauth-task-201",
        connectionId: "conn-a1",
        refreshToken: "rt-a1",
        isActive: true,
      },
      {
        provider: "custom-oauth-task-202",
        connectionId: "conn-a2",
        refreshToken: "rt-a2",
        isActive: true,
      },
      {
        provider: "custom-oauth-task-202",
        connectionId: "conn-a3",
        refreshToken: "rt-a3",
        isActive: true,
      },
    ];

    const mockFetch: typeof fetch = (input, init) =>
      new Promise((resolve) => {
        const url = String(input);
        fetchCount += 1;
        inFlight += 1;
        maxInFlight = Math.max(maxInFlight, inFlight);

        let refreshToken = refreshTokenFromBody(init);
        if (!refreshToken) {
          refreshToken = `${url}#${fetchCount}`;
        }

        gates.set(refreshToken, () => {
          inFlight -= 1;
          resolve(jsonResponse({ access_token: `access-${refreshToken}`, expires_in: 900 }));
        });
      });

    await withPatchedProperties(
      PROVIDERS,
      {
        "custom-oauth-task-201": { tokenUrl: TOKEN_URL_A },
        "custom-oauth-task-202": { tokenUrl: TOKEN_URL_B },
      },
      async () => {
        await withMockedFetch(mockFetch, async () => {
          const wave = getAllAccessTokens({ connections }, log);

          // Every connection must be in flight before any of them resolves.
          const deadline = Date.now() + 5000;
          while (fetchCount < 3) {
            assert.ok(
              Date.now() < deadline,
              `all three refreshes should be in flight (in flight: ${fetchCount})`
            );
            await new Promise((resolve) => setTimeout(resolve, 5));
          }
          assert.equal(maxInFlight, 3, "the wave ran all three connections at once, not serially");

          for (const key of ["rt-a1", "rt-a2", "rt-a3"]) {
            gates.get(key)?.();
          }

          const results = (await wave) as Record<string, unknown>;
          assert.deepEqual(
            Object.keys(results).sort(),
            [
              "custom-oauth-task-201:conn-a1",
              "custom-oauth-task-202:conn-a2",
              "custom-oauth-task-202:conn-a3",
            ],
            "one key per connection — same-provider siblings do not overwrite each other"
          );
          assert.deepEqual(results["custom-oauth-task-201:conn-a1"], {
            accessToken: "access-rt-a1",
            refreshToken: "rt-a1",
            expiresIn: 900,
          });
          assert.deepEqual(results["custom-oauth-task-202:conn-a2"], {
            accessToken: "access-rt-a2",
            refreshToken: "rt-a2",
            expiresIn: 900,
          });
          assert.deepEqual(results["custom-oauth-task-202:conn-a3"], {
            accessToken: "access-rt-a3",
            refreshToken: "rt-a3",
            expiresIn: 900,
          });
        });
      }
    );
  }
);

test(
  "bulk token refresh persists the rotated refresh token on the connection row",
  { timeout: 30000 },
  async () => {
    const connection = (await providersDb.createProviderConnection({
      provider: "github",
      authType: "oauth",
      name: "Bulk Wave Persist",
      accessToken: "access-stale",
      refreshToken: "rt-persist",
    })) as Record<string, unknown>;

    const log = createLog();
    let sawMutexWhileInFlight = false;

    await withPatchedProperties(
      PROVIDERS,
      {
        github: { ...(PROVIDERS.github as object), tokenUrl: TOKEN_URL_C },
      },
      async () => {
        await withMockedFetch(
          async (_input, _init) => {
            const mutexStatus = getConnectionRefreshMutexStatus();
            sawMutexWhileInFlight = Object.hasOwn(mutexStatus, connection.id);
            return jsonResponse({
              access_token: "access-persist",
              refresh_token: "rt-persist-next",
              expires_in: 900,
            });
          },
          async () => {
            await getAllAccessTokens(
              {
                connections: [
                  {
                    provider: "github",
                    connectionId: connection.id,
                    refreshToken: "rt-persist",
                    isActive: true,
                  },
                ],
              },
              log
            );
          }
        );
      }
    );

    assert.equal(
      sawMutexWhileInFlight,
      true,
      "the per-connection mutex held while the refresh was in flight (Layer 1 path)"
    );
    const row = await providersDb.getProviderConnectionById(connection.id);
    assert.equal(
      row?.refreshToken,
      "rt-persist-next",
      "rotated refresh token written back to the row"
    );
    assert.equal(row?.accessToken, "access-persist");
    assert.equal(
      log.entries.some((entry) => String(entry.message).includes("DB row will not be updated")),
      false,
      "no Layer 2 without-onPersist warning — the row was updated in the refresh path"
    );
  }
);

test(
  "bulk token refresh keeps serving the other connections when one fails",
  { timeout: 30000 },
  async () => {
    const log = createLog();

    const connections = [
      {
        provider: "custom-oauth-task-201",
        connectionId: "conn-f1",
        refreshToken: "rt-f1",
        isActive: true,
      },
      {
        provider: "custom-oauth-task-202",
        connectionId: "conn-f2",
        refreshToken: "rt-f2",
        isActive: true,
      },
      {
        provider: "custom-oauth-task-203",
        connectionId: "conn-f3",
        refreshToken: "rt-f3",
        isActive: true,
      },
    ];

    let results: Record<string, unknown> | null = null;
    await withPatchedProperties(
      PROVIDERS,
      {
        "custom-oauth-task-201": { tokenUrl: TOKEN_URL_A },
        "custom-oauth-task-202": { tokenUrl: TOKEN_URL_B },
        "custom-oauth-task-203": { tokenUrl: TOKEN_URL_C },
      },
      async () => {
        await withMockedFetch(
          async (_input, init) => {
            const refreshToken = refreshTokenFromBody(init);
            if (refreshToken === "rt-f2") {
              return new Response(JSON.stringify({ error: "invalid_grant" }), {
                status: 400,
                headers: { "content-type": "application/json" },
              });
            }
            return jsonResponse({ access_token: `access-${refreshToken}`, expires_in: 900 });
          },
          async () => {
            results = (await getAllAccessTokens({ connections }, log)) as Record<string, unknown>;
          }
        );
      }
    );

    assert.ok(results, "the grouped refresh completed without throwing");
    assert.deepEqual(results!["custom-oauth-task-201:conn-f1"], {
      accessToken: "access-rt-f1",
      refreshToken: "rt-f1",
      expiresIn: 900,
    });
    assert.equal(results!["custom-oauth-task-202:conn-f2"], null, "the failed connection is null");
    assert.deepEqual(results!["custom-oauth-task-203:conn-f3"], {
      accessToken: "access-rt-f3",
      refreshToken: "rt-f3",
      expiresIn: 900,
    });
  }
);

test(
  "bulk token refresh keeps the connection input order in the result",
  { timeout: 30000 },
  async () => {
    const log = createLog();

    const connections = [
      {
        provider: "custom-oauth-task-201",
        connectionId: "conn-o1",
        refreshToken: "rt-o1",
        isActive: true,
      },
      {
        provider: "custom-oauth-task-202",
        connectionId: "conn-o2",
        refreshToken: "rt-o2",
        isActive: true,
      },
      {
        provider: "custom-oauth-task-203",
        connectionId: "conn-o3",
        refreshToken: "rt-o3",
        isActive: true,
      },
    ];

    const mockFetch: typeof fetch = (_input, init) =>
      new Promise((resolve) => {
        const refreshToken = refreshTokenFromBody(init);
        // The upstream settles the third connection first.
        setTimeout(
          () =>
            resolve(
              jsonResponse({
                access_token: `access-${refreshToken}`,
                expires_in: 900,
              })
            ),
          refreshToken === "rt-o3" ? 1 : refreshToken === "rt-o2" ? 40 : 80
        );
      });

    let results: Record<string, unknown> | null = null;
    await withPatchedProperties(
      PROVIDERS,
      {
        "custom-oauth-task-201": { tokenUrl: TOKEN_URL_A },
        "custom-oauth-task-202": { tokenUrl: TOKEN_URL_B },
        "custom-oauth-task-203": { tokenUrl: TOKEN_URL_C },
      },
      async () => {
        await withMockedFetch(mockFetch, async () => {
          results = (await getAllAccessTokens({ connections }, log)) as Record<string, unknown>;
        });
      }
    );

    assert.deepEqual(Object.keys(results!), [
      "custom-oauth-task-201:conn-o1",
      "custom-oauth-task-202:conn-o2",
      "custom-oauth-task-203:conn-o3",
    ]);
    assert.deepEqual(results!["custom-oauth-task-201:conn-o1"], {
      accessToken: "access-rt-o1",
      refreshToken: "rt-o1",
      expiresIn: 900,
    });
    assert.deepEqual(results!["custom-oauth-task-202:conn-o2"], {
      accessToken: "access-rt-o2",
      refreshToken: "rt-o2",
      expiresIn: 900,
    });
    assert.deepEqual(results!["custom-oauth-task-203:conn-o3"], {
      accessToken: "access-rt-o3",
      refreshToken: "rt-o3",
      expiresIn: 900,
    });
  }
);

test(
  "the SSE wrapper bulk refresh passes the connection id through to the row",
  { timeout: 30000 },
  async () => {
    const connection = (await providersDb.createProviderConnection({
      provider: "github",
      authType: "oauth",
      name: "Bulk Wave Wrapper",
      accessToken: "access-stale",
      refreshToken: "rt-wrapper",
    })) as Record<string, unknown>;

    const log = createLog();
    let sawMutexWhileInFlight = false;

    await withPatchedProperties(
      PROVIDERS,
      {
        github: { ...(PROVIDERS.github as object), tokenUrl: TOKEN_URL_C },
      },
      async () => {
        await withMockedFetch(
          async (_input, _init) => {
            const mutexStatus = getConnectionRefreshMutexStatus();
            sawMutexWhileInFlight = Object.hasOwn(mutexStatus, connection.id);
            return jsonResponse({
              access_token: "access-wrapper",
              refresh_token: "rt-wrapper-next",
              expires_in: 900,
            });
          },
          async () => {
            const results = (await sseTokenRefresh.getAllAccessTokens({
              connections: [
                {
                  provider: "github",
                  connectionId: connection.id,
                  refreshToken: "rt-wrapper",
                  isActive: true,
                },
              ],
            })) as Record<string, unknown>;

            const wrapperKey = String(
              Object.keys(results).find((k) => k.includes(String(connection.id)))
            );
            assert.equal(
              (results[wrapperKey] as Record<string, unknown>)?.accessToken,
              "access-wrapper"
            );
          }
        );
      }
    );

    assert.equal(sawMutexWhileInFlight, true, "wrapper path reached the per-connection mutex");
    const row = await providersDb.getProviderConnectionById(connection.id);
    assert.equal(row?.refreshToken, "rt-wrapper-next");
    assert.equal(
      log.entries.some((entry) => String(entry.message).includes("DB row will not be updated")),
      false
    );
  }
);
