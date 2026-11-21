/**
 * KEA-9357 / KEA-9358 / KEA-9359 / KEA-9360 / KEA-9385 — the dashboard must know which
 * local-only features a remote session cannot use, from one source of truth:
 *   - the server tells the page up front (trusted peer-locality stamp + the real guard),
 *   - the client recognises the guard's 403 body and remembers it for the session.
 */

import test, { afterEach, describe } from "node:test";
import assert from "node:assert/strict";

import {
  applyRuntimeSettings,
  resetRuntimeSettingsStateForTests,
} from "../../src/lib/config/runtimeSettings.ts";
import { resolveDashboardLocalAccess } from "../../src/lib/security/dashboardLocalAccess.ts";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard.ts";
import { AUTHZ_HEADER_PEER_LOCALITY } from "../../src/server/authz/headers.ts";
import { LOCAL_ONLY_DASHBOARD_PATHS } from "../../src/shared/constants/localOnlyFeatures.ts";
import {
  __resetLocalOnlyRejectionsForTests,
  detectLocalOnlyRejection,
  isLocalOnlyErrorBody,
  isLocalOnlyPathBlocked,
  isLocalOnlyResponse,
  reportLocalOnlyRejection,
} from "../../src/shared/utils/localOnlyAccess.ts";

const ENV_KEYS = ["OMNIROUTE_PEER_STAMP_TOKEN", "OMNIROUTE_TRUST_PROXY"] as const;
const savedEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

afterEach(() => {
  for (const key of ENV_KEYS) {
    if (savedEnv[key] === undefined) delete process.env[key];
    else process.env[key] = savedEnv[key];
  }
  __resetLocalOnlyRejectionsForTests();
  resetRuntimeSettingsStateForTests();
});

/** The page request as a server component sees it: the pipeline already stamped the verdict. */
function pageHeaders(locality: string): Headers {
  return new Headers({ [AUTHZ_HEADER_PEER_LOCALITY]: locality, host: "example.test" });
}

/** The exact body `rejectionResponse()` builds for the guard's LOCAL_ONLY verdict. */
function localOnlyResponse(): Response {
  return new Response(
    JSON.stringify({
      error: {
        code: "LOCAL_ONLY",
        message: "This endpoint requires localhost access",
        correlation_id: "req-1",
      },
    }),
    { status: 403 }
  );
}

describe("resolveDashboardLocalAccess (server)", () => {
  test("a remote session is told which dashboard features the guard rejects", () => {
    process.env.OMNIROUTE_PEER_STAMP_TOKEN = "stamp-token";
    delete process.env.OMNIROUTE_TRUST_PROXY;

    const access = resolveDashboardLocalAccess(pageHeaders("remote"));

    assert.equal(access.locality, "remote");
    // Paths no configuration opens to a remote session. The two plain reads
    // (/api/resilience/connections, /api/skills/executions) are left out on purpose: whether
    // a remote session may run them is the guard's decision (a GET exemption or the
    // manage-scope bypass), covered by the two tests below.
    for (const path of [
      "/api/db/health",
      "/api/plugins",
      "/api/tools/traffic-inspector/capture-modes",
      "/api/services/mux/status",
    ]) {
      assert.ok(access.remoteBlockedPaths.includes(path), `${path} must be reported as blocked`);
    }
  });

  test("a path the guard serves remotely for GET is never reported as blocked", () => {
    process.env.OMNIROUTE_PEER_STAMP_TOKEN = "stamp-token";

    const access = resolveDashboardLocalAccess(pageHeaders("remote"));

    // GET /api/services/cliproxy/status sits in LOCAL_ONLY_API_GET_EXEMPTIONS.
    assert.equal(isLocalOnlyPath("/api/services/cliproxy/status", "GET"), false);
    assert.equal(access.remoteBlockedPaths.includes("/api/services/cliproxy/status"), false);
  });

  test("a path stops being reported when the manage-scope bypass opens it", async () => {
    process.env.OMNIROUTE_PEER_STAMP_TOKEN = "stamp-token";
    delete process.env.OMNIROUTE_TRUST_PROXY;
    const path = "/api/resilience/connections";
    const reported = () =>
      resolveDashboardLocalAccess(pageHeaders("remote")).remoteBlockedPaths.includes(path);
    const setBypassPrefixes = (prefixes: string[]) =>
      applyRuntimeSettings(
        { localOnlyManageScopeBypassEnabled: true, localOnlyManageScopeBypassPrefixes: prefixes },
        { force: true }
      );

    // The answer must follow the guard's configuration, whatever the default list is: a
    // notice over a page whose request would succeed hides a working feature.
    await setBypassPrefixes(["/api/mcp/"]);
    assert.equal(reported(), true, `${path} is local-only while the bypass does not list it`);

    await setBypassPrefixes(["/api/mcp/", path]);
    assert.equal(reported(), false, `${path} must not be reported once the bypass lists it`);
  });

  test("loopback and private-LAN sessions are local", () => {
    process.env.OMNIROUTE_PEER_STAMP_TOKEN = "stamp-token";

    assert.equal(resolveDashboardLocalAccess(pageHeaders("loopback")).locality, "local");
    assert.equal(resolveDashboardLocalAccess(pageHeaders("lan")).locality, "local");
  });

  test("behind a trusted private proxy the stamp cannot tell LAN from remote: unknown", () => {
    process.env.OMNIROUTE_PEER_STAMP_TOKEN = "stamp-token";
    process.env.OMNIROUTE_TRUST_PROXY = "private";

    assert.equal(resolveDashboardLocalAccess(pageHeaders("remote")).locality, "unknown");
  });

  test("without the pipeline's stamp on the page request the answer is unknown, never remote", () => {
    process.env.OMNIROUTE_PEER_STAMP_TOKEN = "stamp-token";
    delete process.env.OMNIROUTE_TRUST_PROXY;

    // A local operator must not lose the feature because a header did not reach the page.
    const access = resolveDashboardLocalAccess(new Headers({ host: "example.test" }));

    assert.equal(access.locality, "unknown");
  });

  test("every registered path is one the guard classifies as local-only", () => {
    for (const path of LOCAL_ONLY_DASHBOARD_PATHS) {
      assert.equal(isLocalOnlyPath(path), true, `${path} is not a LOCAL_ONLY route`);
    }
  });
});

describe("LOCAL_ONLY rejection detection (client)", () => {
  test("recognises the guard's 403 body", async () => {
    assert.equal(isLocalOnlyErrorBody(403, { error: { code: "LOCAL_ONLY" } }), true);
    assert.equal(await isLocalOnlyResponse(localOnlyResponse()), true);
  });

  test("leaves the response body readable for the caller", async () => {
    const res = localOnlyResponse();
    await isLocalOnlyResponse(res);
    assert.equal((await res.json()).error.code, "LOCAL_ONLY");
  });

  test("any other 403, and any other status, is not a local-only rejection", async () => {
    assert.equal(isLocalOnlyErrorBody(403, { error: { code: "AUTH_SCOPE" } }), false);
    assert.equal(isLocalOnlyErrorBody(403, { error: "Access denied" }), false);
    assert.equal(isLocalOnlyErrorBody(500, { error: { code: "LOCAL_ONLY" } }), false);
    assert.equal(await isLocalOnlyResponse(new Response("{}", { status: 403 })), false);
    assert.equal(await isLocalOnlyResponse(new Response("not json", { status: 403 })), false);
    assert.equal(await isLocalOnlyResponse(new Response("{}", { status: 200 })), false);
  });
});

describe("isLocalOnlyPathBlocked (client)", () => {
  const blockedPaths = ["/api/plugins", "/api/db/health"];

  test("a remote session is blocked up front, before any request", () => {
    const access = { locality: "remote" as const, remoteBlockedPaths: blockedPaths };
    assert.equal(isLocalOnlyPathBlocked(access, "/api/plugins"), true);
    assert.equal(isLocalOnlyPathBlocked(access, "/api/services/cliproxy/status"), false);
  });

  test("local and unknown sessions are not blocked up front", () => {
    for (const locality of ["local", "unknown"] as const) {
      const access = { locality, remoteBlockedPaths: blockedPaths };
      assert.equal(isLocalOnlyPathBlocked(access, "/api/plugins"), false);
    }
  });

  test("the first rejection blocks that path and every other registered path", async () => {
    const access = { locality: "unknown" as const, remoteBlockedPaths: blockedPaths };

    assert.equal(await detectLocalOnlyRejection(localOnlyResponse(), "/api/plugins"), true);

    assert.equal(isLocalOnlyPathBlocked(access, "/api/plugins"), true);
    assert.equal(isLocalOnlyPathBlocked(access, "/api/db/health"), true);
    assert.equal(isLocalOnlyPathBlocked(access, "/api/services/cliproxy/status"), false);
  });

  test("a rejected path is blocked even when the server list does not carry it", () => {
    const access = { locality: "unknown" as const, remoteBlockedPaths: [] };
    reportLocalOnlyRejection("/api/skills/executions");
    assert.equal(isLocalOnlyPathBlocked(access, "/api/skills/executions"), true);
    assert.equal(isLocalOnlyPathBlocked(access, "/api/plugins"), false);
  });

  test("a response that is not a local-only rejection changes nothing", async () => {
    const access = { locality: "unknown" as const, remoteBlockedPaths: blockedPaths };
    const res = new Response("{}", { status: 500 });
    assert.equal(await detectLocalOnlyRejection(res, "/api/plugins"), false);
    assert.equal(isLocalOnlyPathBlocked(access, "/api/plugins"), false);
  });
});
