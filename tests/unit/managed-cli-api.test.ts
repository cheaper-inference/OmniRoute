import assert from "node:assert/strict";
import test from "node:test";
import { setupSettingsFixture, mockSettings } from "./_mocks/settings.ts";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";
import { AUTHZ_HEADER_PEER_LOCALITY } from "../../src/server/authz/headers.ts";
import type { ManagedCliRuntimeItem } from "../../src/lib/cliTools/managedCliRuntimes.ts";

const fixture = setupSettingsFixture("managed-cli-api");
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";
const core = await import("../../src/lib/db/core.ts");
const { handleManagedCliRequest } = await import("../../src/lib/cliTools/managedCliApi.ts");
const { ManagedCliRuntimeError } = await import("../../src/lib/cliTools/managedCliRuntimes.ts");
const { isLocalOnlyPath, isLocalOnlyBypassableByManageScope } =
  await import("../../src/server/authz/routeGuard.ts");
await mockSettings({ requireLogin: false });

const url = "http://localhost/api/cli-tools/runtime/managed";
const item: ManagedCliRuntimeItem = {
  id: "codex",
  name: "Codex CLI",
  packageName: "@openai/codex",
  installed: true,
  installedVersion: "9.10.0",
  latestVersion: "9.10.0",
  runnable: true,
  source: "managed",
  commandPath: "/test/managed/codex",
  updateAvailable: false,
  canUpdate: true,
  checkedAt: "2026-11-19T00:00:00.000Z",
  error: null,
  reason: null,
};

function authenticated(body?: Record<string, unknown> | string) {
  return makeManagementSessionRequest(url, {
    method: body === undefined ? "GET" : "POST",
    headers: { [AUTHZ_HEADER_PEER_LOCALITY]: "loopback" },
    body,
  });
}

test.after(() => {
  core.resetDbInstance();
  fixture.cleanup();
});

test("runtime management stays local-only and cannot be enabled by manage-scope bypass", () => {
  assert.equal(isLocalOnlyPath("/api/cli-tools/runtime/managed"), true);
  assert.equal(isLocalOnlyBypassableByManageScope("/api/cli-tools/runtime/managed"), false);
});

test("unknown and remote peers are refused before any runtime probe", async () => {
  let calls = 0;
  for (const locality of ["", "unknown", "remote"]) {
    const request = await makeManagementSessionRequest(url, {
      headers: { [AUTHZ_HEADER_PEER_LOCALITY]: locality },
    });
    const response = await handleManagedCliRequest(request, {
      list: async () => {
        calls += 1;
        return [];
      },
    });
    assert.equal(response.status, 403);
    assert.equal(response.headers.get("cache-control"), "no-store");
  }
  assert.equal(calls, 0);
});

test("trusted LAN peers require credentials and can manage runtimes after authentication", async () => {
  let calls = 0;
  const dependencies = {
    list: async () => {
      calls += 1;
      return [item];
    },
    update: async () => {
      calls += 1;
      return { ...item, activated: true };
    },
    effects: () => ({ runtimeCacheInvalidated: true, clientVersionRefreshed: true }),
  };
  for (const body of [undefined, { action: "check" }, { action: "update", toolId: "codex" }]) {
    const callsBeforeRequest = calls;
    const init = {
      method: body ? "POST" : "GET",
      headers: { [AUTHZ_HEADER_PEER_LOCALITY]: "lan", "Content-Type": "application/json" },
      ...(body ? { body: JSON.stringify(body) } : {}),
    };
    const unauthenticated = await handleManagedCliRequest(new Request(url, init), dependencies);
    assert.equal(unauthenticated.status, 401);
    assert.equal(calls, callsBeforeRequest);
    const authenticatedRequest = await makeManagementSessionRequest(url, {
      ...init,
      body,
    });
    const response = await handleManagedCliRequest(authenticatedRequest, dependencies);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-store");
  }
  assert.equal(calls, 3);
});

test("read, check, and update require authentication even when dashboard login is disabled", async () => {
  let calls = 0;
  for (const action of [null, "check", "update"]) {
    const response = await handleManagedCliRequest(
      new Request(url, {
        method: action ? "POST" : "GET",
        headers: { [AUTHZ_HEADER_PEER_LOCALITY]: "loopback", "Content-Type": "application/json" },
        ...(action
          ? {
              body: JSON.stringify({ action, ...(action === "update" ? { toolId: "codex" } : {}) }),
            }
          : {}),
      }),
      {
        list: async () => {
          calls += 1;
          return [];
        },
        update: async () => {
          calls += 1;
          return { ...item, activated: true };
        },
      }
    );
    assert.equal(response.status, 401);
  }
  assert.equal(calls, 0);
});

test("inventory and update checks do not run the installer", async () => {
  const checked: boolean[] = [];
  const dependencies = {
    list: async (options?: { checkUpdates?: boolean }) => {
      checked.push(Boolean(options?.checkUpdates));
      return [item];
    },
    update: async () => {
      throw new Error("Installer must not run");
    },
  };
  for (const body of [undefined, { action: "check" }]) {
    const response = await handleManagedCliRequest(await authenticated(body), dependencies);
    assert.equal(response.status, 200);
    assert.deepEqual((await response.json()).items, [item]);
  }
  assert.deepEqual(checked, [false, true]);
});

test("only a fixed tool ID can reach installation; versions and package arguments are rejected", async () => {
  let calls = 0;
  for (const body of [
    "{",
    {},
    { action: "exec" },
    { action: "check", toolId: "codex" },
    { action: "update", toolId: "codex", version: "latest" },
    { action: "update", toolId: "codex", packageName: "another-package" },
    { action: "update", toolId: "../../other" },
  ]) {
    const response = await handleManagedCliRequest(await authenticated(body), {
      update: async () => {
        calls += 1;
        return { ...item, activated: true };
      },
    });
    assert.equal(response.status, 400, JSON.stringify(body));
  }
  const unsupported = await handleManagedCliRequest(
    await authenticated({ action: "update", toolId: "other" }),
    {
      update: async () => {
        calls += 1;
        return { ...item, activated: true };
      },
    }
  );
  assert.equal(unsupported.status, 404);
  assert.equal(calls, 0);
});

test("successful installation returns its actual status and applies effects once", async () => {
  const calls: string[] = [];
  const response = await handleManagedCliRequest(
    await authenticated({ action: "update", toolId: "codex" }),
    {
      update: async (id) => {
        calls.push(id);
        return { ...item, activated: true };
      },
      effects: (updated) => {
        assert.deepEqual(updated, item);
        calls.push("effects");
        return { runtimeCacheInvalidated: true, clientVersionRefreshed: true };
      },
    }
  );
  assert.equal(response.status, 200);
  assert.equal((await response.json()).item.installedVersion, "9.10.0");
  assert.deepEqual(calls, ["codex", "effects"]);
});

test("installation failure preserves the failure status and never runs success effects", async () => {
  let effects = 0;
  const response = await handleManagedCliRequest(
    await authenticated({ action: "update", toolId: "codex" }),
    {
      update: async () => {
        throw new ManagedCliRuntimeError("UPDATE_BUSY", "An update is already running", 409);
      },
      effects: () => {
        effects += 1;
        return { runtimeCacheInvalidated: true, clientVersionRefreshed: true };
      },
    }
  );
  assert.equal(response.status, 409);
  assert.equal((await response.json()).error.details.code, "UPDATE_BUSY");
  assert.equal(effects, 0);
});

test("a no-op managed update returns inventory without running activation effects", async () => {
  let effects = 0;
  const response = await handleManagedCliRequest(
    await authenticated({ action: "update", toolId: "codex" }),
    {
      update: async () => ({ ...item, activated: false }),
      effects: () => {
        effects += 1;
        return { runtimeCacheInvalidated: true, clientVersionRefreshed: true };
      },
    }
  );
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.activated, false);
  assert.equal(payload.item.installedVersion, item.installedVersion);
  assert.equal(effects, 0);
});

test("unexpected installer details are not returned to the browser", async () => {
  const response = await handleManagedCliRequest(
    await authenticated({ action: "update", toolId: "codex" }),
    {
      update: async () => {
        throw new Error("private-command-output credential=do-not-leak");
      },
    }
  );
  assert.equal(response.status, 500);
  assert.doesNotMatch(await response.text(), /private-command-output|do-not-leak|stack/);
});

test("npm policy requirement reaches the browser with its actionable message", async () => {
  const message = "This CLI requires stable npm 11.18+ or npm 12. Update npm separately and retry.";
  const response = await handleManagedCliRequest(
    await authenticated({ action: "update", toolId: "claude" }),
    {
      update: async () => {
        throw new ManagedCliRuntimeError("npm_policy_unsupported", message, 409);
      },
    }
  );
  assert.equal(response.status, 409);
  const payload = await response.json();
  assert.equal(payload.error.details.code, "npm_policy_unsupported");
  assert.equal(payload.error.message, message);
});

test("HTTP route guards both handlers before dispatch, including with login disabled", async () => {
  const { GET, POST } = await import("../../src/app/api/cli-tools/runtime/managed/route.ts");
  for (const handler of [GET, POST]) {
    const method = handler === GET ? "GET" : "POST";
    for (const locality of ["", "unknown", "remote", "loopback", "lan"]) {
      const response = await handler(
        new Request(url, {
          method,
          headers: { [AUTHZ_HEADER_PEER_LOCALITY]: locality },
        })
      );
      assert.equal(response.status, locality === "loopback" || locality === "lan" ? 401 : 403);
      assert.equal(response.headers.get("cache-control"), "no-store");
    }
    const remote = await makeManagementSessionRequest(url, {
      method,
      headers: { [AUTHZ_HEADER_PEER_LOCALITY]: "remote" },
    });
    assert.equal((await handler(remote)).status, 403);
  }
  // A locally authenticated request reaches validation, not runtime installation.
  const validSession = await authenticated("invalid-json");
  const response = await POST(validSession);
  assert.equal(response.status, 400);
  assert.equal(response.headers.get("cache-control"), "no-store");
});
