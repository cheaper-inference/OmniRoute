/**
 * KEA-9357 / KEA-9358 / KEA-9359 / KEA-9360 / KEA-9385 — the dashboard must know which
 * local-only features a remote session cannot use, from one source of truth:
 *   - the server tells the page up front (trusted LOCAL_ONLY verdict + the real guard),
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
import { AUTHZ_HEADER_DASHBOARD_LOCAL_ACCESS } from "../../src/server/authz/headers.ts";
import { LOCAL_ONLY_DASHBOARD_PATHS } from "../../src/shared/constants/localOnlyFeatures.ts";
import {
  __resetLocalOnlyRejectionsForTests,
  detectLocalOnlyRejection,
  getLocalOnlyRejections,
  isLocalOnlyErrorBody,
  isLocalOnlyPathBlocked,
  isLocalOnlyResponse,
  reportLocalOnlyRejection,
} from "../../src/shared/utils/localOnlyAccess.ts";

afterEach(() => {
  __resetLocalOnlyRejectionsForTests();
  resetRuntimeSettingsStateForTests();
});

/** The page request as a server component sees it: the pipeline already stamped the verdict. */
function pageHeaders(locality: "local" | "remote"): Headers {
  return new Headers({ [AUTHZ_HEADER_DASHBOARD_LOCAL_ACCESS]: locality, host: "example.test" });
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
    const access = resolveDashboardLocalAccess(pageHeaders("remote"));

    // GET /api/services/cliproxy/status sits in LOCAL_ONLY_API_GET_EXEMPTIONS.
    assert.equal(isLocalOnlyPath("/api/services/cliproxy/status", "GET"), false);
    assert.equal(access.remoteBlockedPaths.includes("/api/services/cliproxy/status"), false);
  });

  test("a path stops being reported when the manage-scope bypass opens it", async () => {
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

  test("a local verdict from the guard is read as local", () => {
    assert.equal(resolveDashboardLocalAccess(pageHeaders("local")).locality, "local");
  });

  test("without the pipeline's stamp on the page request the answer is unknown, never remote", () => {
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
    assert.equal(isLocalOnlyPathBlocked(access, "/api/plugins", getLocalOnlyRejections()), true);
    assert.equal(
      isLocalOnlyPathBlocked(access, "/api/services/cliproxy/status", getLocalOnlyRejections()),
      false
    );
  });

  test("local and unknown sessions are not blocked up front", () => {
    for (const locality of ["local", "unknown"] as const) {
      const access = { locality, remoteBlockedPaths: blockedPaths };
      assert.equal(isLocalOnlyPathBlocked(access, "/api/plugins", getLocalOnlyRejections()), false);
    }
  });

  test("the first rejection blocks that path and every other registered path", async () => {
    const access = { locality: "unknown" as const, remoteBlockedPaths: blockedPaths };

    const before = getLocalOnlyRejections();
    assert.equal(await detectLocalOnlyRejection(localOnlyResponse(), "/api/plugins"), true);
    const after = getLocalOnlyRejections();

    assert.equal(isLocalOnlyPathBlocked(access, "/api/plugins", before), false);
    assert.equal(isLocalOnlyPathBlocked(access, "/api/plugins", after), true);
    assert.equal(isLocalOnlyPathBlocked(access, "/api/db/health", after), true);
    assert.equal(isLocalOnlyPathBlocked(access, "/api/services/cliproxy/status", after), false);

    reportLocalOnlyRejection("/api/plugins");
    assert.equal(getLocalOnlyRejections(), after);
  });

  test("a rejected path is blocked even when the server list does not carry it", () => {
    const access = { locality: "unknown" as const, remoteBlockedPaths: [] };
    reportLocalOnlyRejection("/api/skills/executions");
    assert.equal(
      isLocalOnlyPathBlocked(access, "/api/skills/executions", getLocalOnlyRejections()),
      true
    );
    assert.equal(isLocalOnlyPathBlocked(access, "/api/plugins", getLocalOnlyRejections()), false);
  });

  test("a response that is not a local-only rejection changes nothing", async () => {
    const access = { locality: "unknown" as const, remoteBlockedPaths: blockedPaths };
    const res = new Response("{}", { status: 500 });
    assert.equal(await detectLocalOnlyRejection(res, "/api/plugins"), false);
    assert.equal(isLocalOnlyPathBlocked(access, "/api/plugins", getLocalOnlyRejections()), false);
  });
});
