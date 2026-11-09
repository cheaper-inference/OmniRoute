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
const { rotationGroupFor } = await import("../../open-sse/services/refreshSerializer.ts");
const { runWithAppliedProxyCapture } = await import("../../open-sse/utils/proxyFetch.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");

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
            await sseTokenRefresh.getAllAccessTokens({
              connections: [
                {
                  provider: "github",
                  connectionId: connection.id,
                  refreshToken: "rt-persist",
                  isActive: true,
                },
              ],
            });
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

test(
  "bulk token refresh serializes a rotation group without paying the queued spacing",
  { timeout: 30000 },
  async () => {
    const log = createLog();

    // Six siblings in one rotation group (codex, lane "openai-auth0") plus two
    // connections from two other rotation groups (gitlab-duo and kiro, each
    // with its own lane). Sibling refreshes must run one at a time inside the
    // group while the other groups run alongside, and the settle gap (2s
    // default) must never be paid: a sibling never queues behind its
    // predecessor.
    const connections = [
      ...Array.from({ length: 6 }, (_, i) => ({
        provider: "codex",
        connectionId: `conn-cx${i}`,
        refreshToken: `rt-cx${i}`,
        isActive: true,
      })),
      {
        provider: "gitlab-duo",
        connectionId: "conn-gld0",
        refreshToken: "rt-gld0",
        isActive: true,
        providerSpecificData: { baseUrl: "https://gitlab-test.example.com" },
      },
      {
        provider: "kiro",
        connectionId: "conn-kiro0",
        refreshToken: "rt-kiro0",
        isActive: true,
        providerSpecificData: {
          authMethod: "external_idp",
          clientId: "kiro-test-client",
          tokenEndpoint: "https://kiro-identity.test.okta.com/oauth2/v1/token",
          scope: "openid profile email",
        },
      },
    ];

    assert.equal(rotationGroupFor("codex"), "openai-auth0");
    assert.equal(rotationGroupFor("gitlab-duo"), "gitlab-duo");
    assert.equal(rotationGroupFor("kiro"), "kiro");

    const inFlightByProvider = new Map<string, number>();
    const maxInFlightByProvider = new Map<string, number>();
    let globalInFlight = 0;
    let maxGlobalInFlight = 0;
    const gates = new Map<string, () => void>();
    const seen = new Set<string>();

    const mockFetch: typeof fetch = (input, init) =>
      new Promise((resolve) => {
        const url = String(input);
        const provider = url.includes("auth.openai.com")
          ? "codex"
          : url.includes("gitlab-test")
            ? "gitlab-duo"
            : "kiro";
        const refreshToken = refreshTokenFromBody(init);
        seen.add(refreshToken);

        globalInFlight += 1;
        maxGlobalInFlight = Math.max(maxGlobalInFlight, globalInFlight);
        inFlightByProvider.set(provider, (inFlightByProvider.get(provider) ?? 0) + 1);
        maxInFlightByProvider.set(
          provider,
          Math.max(maxInFlightByProvider.get(provider) ?? 0, inFlightByProvider.get(provider)!)
        );

        gates.set(refreshToken, () => {
          gates.delete(refreshToken);
          inFlightByProvider.set(provider, inFlightByProvider.get(provider)! - 1);
          globalInFlight -= 1;
          resolve(
            jsonResponse({
              access_token: `access-${refreshToken}`,
              refresh_token: `${refreshToken}-next`,
              expires_in: 900,
            })
          );
        });
      });

    let results: Record<string, unknown> | null = null;
    let wallMs = 0;

    await withPatchedProperties(
      (await import("../../open-sse/config/constants.ts")).OAUTH_ENDPOINTS,
      {
        openai: { token: "https://auth.openai.com/oauth/token" },
        anthropic: { token: "https://api.anthropic.test/v1/oauth/token" },
      },
      async () => {
        await withMockedFetch(mockFetch, async () => {
          const started = Date.now();
          const wave = getAllAccessTokens({ connections }, log);

          // Release exactly one codex sibling at a time: the gate map is keyed
          // by refresh token in input order for the first codex, so we release
          // the smallest unresolved codex token on each round. The loop keeps
          // running until every one of the nine connections has reached the
          // network — the wave only starts the next sibling after the
          // previous one's fetch has been released.
          const codexTokens = ["rt-cx0", "rt-cx1", "rt-cx2", "rt-cx3", "rt-cx4", "rt-cx5"];
          const allTokens = [...codexTokens, "rt-gld0", "rt-kiro0"];
          let releasedCodex = 0;
          for (;;) {
            // The two other-group connections run concurrently from the start.
            for (const t of ["rt-gld0", "rt-kiro0"]) {
              if (gates.has(t)) gates.get(t)?.();
            }
            if (releasedCodex < codexTokens.length && gates.has(codexTokens[releasedCodex])) {
              gates.get(codexTokens[releasedCodex])?.();
              releasedCodex += 1;
            }
            if (gates.size === 0 && seen.size === allTokens.length) break;
            assert.ok(
              Date.now() - started < 20000,
              `the wave must finish (seen ${seen.size}/${allTokens.length}, ${
                [...gates.keys()].length
              } in flight after ${Date.now() - started} ms)`
            );
            await new Promise((resolve) => setTimeout(resolve, 5));
          }

          results = (await wave) as Record<string, unknown>;
          wallMs = Date.now() - started;
        });
      }
    );

    // One in flight at a time inside the rotation group, even though the wave
    // holds eight slots.
    assert.equal(
      maxInFlightByProvider.get("codex"),
      1,
      "at most one codex sibling refreshes at a time"
    );
    // The other-group connections ran in parallel across their lanes.
    assert.equal(
      maxInFlightByProvider.get("gitlab-duo"),
      1,
      "the gitlab-duo connection refreshes in its own lane"
    );
    assert.equal(
      maxInFlightByProvider.get("kiro"),
      1,
      "the kiro connection refreshes in its own lane"
    );
    assert.ok(
      maxGlobalInFlight >= 3,
      `rotation groups overlap (max in flight: ${maxGlobalInFlight})`
    );
    // The group serializes: wall time is at least the serial sum of the six
    // sibling refreshes (each gated behind the previous one).
    assert.ok(wallMs >= 5, `the group runs serially (wall ${wallMs} ms)`);
    // And no 2-second settle gap was paid between siblings: the whole wave
    // (serial group + parallel groups) completes well under one gap.
    assert.ok(wallMs < 2000, `no queued sibling paid the 2s settle gap (wall ${wallMs} ms)`);

    assert.deepEqual(Object.keys(results!).sort(), [
      "codex:conn-cx0",
      "codex:conn-cx1",
      "codex:conn-cx2",
      "codex:conn-cx3",
      "codex:conn-cx4",
      "codex:conn-cx5",
      "gitlab-duo:conn-gld0",
      "kiro:conn-kiro0",
    ]);
    assert.deepEqual(results!["codex:conn-cx0"], {
      accessToken: "access-rt-cx0",
      refreshToken: "rt-cx0-next",
      expiresIn: 900,
    });
  }
);

test(
  "bulk token refresh passes each connection's proxy to the refresh fetch",
  { timeout: 30000 },
  async () => {
    const proxiedConn = (await providersDb.createProviderConnection({
      provider: "github",
      authType: "oauth",
      name: "Bulk Wave Proxy On",
      accessToken: "access-stale",
      refreshToken: "rt-proxy-on",
    })) as Record<string, unknown>;
    const directConn = (await providersDb.createProviderConnection({
      provider: "github",
      authType: "oauth",
      name: "Bulk Wave Proxy Off",
      accessToken: "access-stale",
      refreshToken: "rt-proxy-off",
    })) as Record<string, unknown>;

    const proxy = (await proxiesDb.createProxy({
      name: "Bulk wave account proxy",
      type: "http",
      host: "127.0.0.1",
      port: 9471,
    })) as Record<string, unknown>;
    await proxiesDb.assignProxyToScope("account", String(proxiedConn.id), String(proxy.id));

    const sink = { proxy: null as unknown };

    await withPatchedProperties(
      PROVIDERS,
      {
        github: { ...(PROVIDERS.github as object), tokenUrl: TOKEN_URL_C },
      },
      async () => {
        await withMockedFetch(
          async (_input, _init) => jsonResponse({ access_token: "access-proxy", expires_in: 900 }),
          async () => {
            await runWithAppliedProxyCapture(sink, () =>
              sseTokenRefresh.getAllAccessTokens({
                connections: [
                  {
                    provider: "github",
                    connectionId: proxiedConn.id,
                    refreshToken: "rt-proxy-on",
                    isActive: true,
                  },
                  {
                    provider: "github",
                    connectionId: directConn.id,
                    refreshToken: "rt-proxy-off",
                    isActive: true,
                  },
                ],
              })
            );
          }
        );
      }
    );

    // The proxied connection's refresh egressed through its assigned proxy
    // config; the innermost applied proxy is the per-account one.
    assert.ok(sink.proxy != null, "the proxied connection applied its proxy to the refresh fetch");
    assert.equal((sink.proxy as { host: string }).host, "127.0.0.1");
    assert.equal((sink.proxy as { port: number }).port, 9471);
  }
);

test(
  "bulk token refresh parks idle wave slots instead of spinning while a rotation group is busy",
  { timeout: 30000 },
  async () => {
    const log = createLog();

    // Three claude siblings share the "anthropic-oauth" lane, so the wave runs
    // them one at a time and two of its three slots sit idle for the whole
    // wave. Each refresh waits ~300 ms on the network. An idle slot must wait
    // for the in-flight sibling to finish, not re-poll the event loop with
    // setImmediate in a tight loop (that burns the CPU the proxy serves
    // requests on for as long as a sibling refresh lasts — up to the 60 s
    // lane bound).
    const connections = Array.from({ length: 3 }, (_, i) => ({
      provider: "claude",
      connectionId: `conn-cl${i}`,
      refreshToken: `rt-cl${i}`,
      isActive: true,
    }));
    assert.equal(rotationGroupFor("claude"), "anthropic-oauth");

    const mockFetch: typeof fetch = (_input, init) =>
      new Promise((resolve) => {
        const refreshToken = refreshTokenFromBody(init);
        setTimeout(
          () =>
            resolve(
              jsonResponse({
                access_token: `access-${refreshToken}`,
                refresh_token: `${refreshToken}-next`,
                expires_in: 900,
              })
            ),
          300
        );
      });

    const originalSetImmediate = globalThis.setImmediate;
    let immediateCalls = 0;
    const countingSetImmediate = ((...args: Parameters<typeof setImmediate>) => {
      immediateCalls += 1;
      return originalSetImmediate(...args);
    }) as typeof setImmediate;

    let results: Record<string, unknown> | null = null;
    await withPatchedProperties(
      (await import("../../open-sse/config/constants.ts")).OAUTH_ENDPOINTS,
      { anthropic: { token: "https://api.anthropic.test/v1/oauth/token" } },
      async () => {
        await withMockedFetch(mockFetch, async () => {
          globalThis.setImmediate = countingSetImmediate;
          try {
            results = (await getAllAccessTokens({ connections }, log)) as Record<string, unknown>;
          } finally {
            globalThis.setImmediate = originalSetImmediate;
          }
        });
      }
    );

    assert.deepEqual(Object.keys(results!).sort(), [
      "claude:conn-cl0",
      "claude:conn-cl1",
      "claude:conn-cl2",
    ]);
    for (const key of Object.keys(results!)) {
      assert.ok(results![key], `${key} refreshed`);
    }
    // A spinning slot schedules thousands of immediates over ~900 ms of
    // serialized network waits; a parked slot schedules none. The bound leaves
    // room for incidental immediates from the fetch/Response machinery.
    assert.ok(
      immediateCalls < 50,
      `idle wave slots must not busy-poll (setImmediate called ${immediateCalls} times)`
    );
  }
);
