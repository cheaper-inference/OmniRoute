// Regression tests for #15159 S-01: spawn-capable /api/providers/ routes.
//
// The audit verified two spawn sites reached from management routes that
// requireLogin=false waives:
//
//   1. `src/lib/providers/validation/webProvidersB.ts:535` —
//      spawn(bin, ["acp", "--agent-type", "summarizer"], …)
//      reached from POST /api/providers/validate, /api/providers/import,
//      /api/providers/bulk
//
//   2. `src/lib/providerModels/cursorAgent.ts:17` —
//      spawn(binary, args, …)
//      reached from GET /api/providers/[id]/models
//
// Hard Rules #15 and #17 require loopback enforcement unconditionally before
// any auth check. Both hops are now gated at their call sites on the trusted
// peer-locality header (the /api/providers/[id]/models precedent): the spawn
// only runs for loopback/LAN peers, so the routes themselves stay
// remote-reachable. A path-level LOCAL_ONLY lock on validate/import/bulk
// (#15242) broke every reverse-proxied deployment — docker + nginx, the
// documented home setup — whose dashboard could then never validate ANY key
// (the Add API Key "Check" button returned 403 LOCAL_ONLY, rendered as a bare
// "Invalid" badge). This file asserts the call-site gates exist and that no
// over-broad path pattern returns.
import { test } from "node:test";
import assert from "node:assert/strict";
import { isLocalOnlyPath } from "../../../src/server/authz/routeGuard.ts";

// ─── S-01: validate/import/bulk stay remote-reachable; spawn is call-site gated ──

test("isLocalOnlyPath: /api/providers/validate, /import, /bulk are NOT local-only (spawn gated at call site)", () => {
  // webProvidersB.ts:535 spawns `bin` with argv ["acp", "--agent-type", "summarizer"]
  // only in the devin CLI-key fallback validator, which receives allowLocalSpawn from
  // each dispatching route (#15766 shape). A blanket LOCAL_ONLY pattern here locks
  // remote dashboards out of key validation for every provider — the regression
  // fixed after a reverse-proxied deployment's Check button always said "Invalid".
  assert.equal(isLocalOnlyPath("/api/providers/validate"), false);
  assert.equal(isLocalOnlyPath("/api/providers/import"), false);
  assert.equal(isLocalOnlyPath("/api/providers/bulk"), false);
  assert.equal(isLocalOnlyPath("/api/providers/validate/"), false);
  assert.equal(isLocalOnlyPath("/api/providers/import/"), false);
  assert.equal(isLocalOnlyPath("/api/providers/bulk/"), false);
});

// ─── S-01: GET /api/providers/{id}/models is NOT path-gated (deliberate) ──

test("isLocalOnlyPath: /api/providers/{id}/models stays reachable (S-01 design)", () => {
  // The second M-05-era spawn hop (cursorAgent.ts:17) is reached from this route, but
  // `{id}` is a CONNECTION id, not a provider: the spawn only runs inside the
  // `provider === "cursor"` branch. A `[^/]+/models` path pattern would lock remote model
  // discovery for EVERY provider — the over-broadening the /login precedent exists to avoid.
  // The spawn is instead gated at its call site on the trusted peer-locality header.
  assert.equal(isLocalOnlyPath("/api/providers/cursor/models"), false);
  assert.equal(isLocalOnlyPath("/api/providers/openai/models"), false);
  assert.equal(isLocalOnlyPath("/api/providers/abc-123/models"), false);
  // Must still not match the bare path (no [id] segment).
  assert.equal(isLocalOnlyPath("/api/providers/models"), false);
});

// ─── The devin spawn hop is guarded at its dispatch sites ────────────────

test("S-01: validate/import/bulk dispatch allowLocalSpawn from the trusted peer-locality header", async () => {
  // Source-level regression guard (same shape as the cursor test below): each of the
  // three routes that can reach the devin CLI-spawn fallback via validateProviderApiKey()
  // must thread allowLocalSpawn from getRequestPeerLocality(request), so a remote peer
  // can never trigger the spawn. Fails if someone drops the flag or reorders it away.
  const fs = await import("node:fs");
  const routes = [
    "../../../src/app/api/providers/validate/route.ts",
    "../../../src/app/api/providers/import/route.ts",
    "../../../src/app/api/providers/bulk/route.ts",
  ];
  for (const route of routes) {
    const source = fs.readFileSync(new URL(route, import.meta.url), "utf8");
    assert.ok(
      source.includes("getRequestPeerLocality"),
      `${route} must derive allowLocalSpawn from getRequestPeerLocality`
    );
    assert.ok(
      /getRequestPeerLocality\(request\)\s*!==\s*"remote"/.test(source),
      `${route} must gate spawns on the trusted peer-locality header (non-remote peers only)`
    );
    assert.ok(
      source.includes("allowLocalSpawn"),
      `${route} must thread allowLocalSpawn into validateProviderApiKey`
    );
    assert.ok(
      source.includes("validateProviderApiKey("),
      `${route} must still dispatch validation`
    );
  }
});

// ─── The cursor-agent spawn hop is guarded at its call site ─────────────

test("S-01: the cursor-agent spawn call site requires a loopback peer", async () => {
  // Guards the second hop at the only place that can be accurate: the route source must
  // check the trusted locality header before fetchCursorAgentModels(). This is a source-level
  // regression guard (the runtime test for the route is an integration concern) — it fails if
  // someone removes the guard or reorders the spawn ahead of it.
  const fs = await import("node:fs");
  const source = fs.readFileSync(
    new URL("../../../src/app/api/providers/[id]/models/route.ts", import.meta.url),
    "utf8"
  );
  const guardIndex = source.indexOf("AUTHZ_HEADER_PEER_LOCALITY");
  const spawnIndex = source.indexOf("fetchCursorAgentModels()");
  assert.ok(guardIndex !== -1, "route must read the trusted peer-locality header");
  assert.ok(spawnIndex !== -1, "route must still call fetchCursorAgentModels()");
  assert.ok(
    guardIndex < spawnIndex,
    "the locality guard must appear BEFORE the fetchCursorAgentModels() spawn call"
  );
  assert.ok(
    /AUTHZ_HEADER_PEER_LOCALITY\)\s*!==\s*"loopback"/.test(source),
    'the guard must fail closed: only an explicit "loopback" locality may spawn'
  );
});

// ─── No over-broadening: the rest of /api/providers/ stays reachable ─────

test("isLocalOnlyPath: non-spawn /api/providers/ routes stay remote-reachable (S-01)", () => {
  // The generic provider CRUD surface must NOT be loopback-locked.
  // The spawn-capable validate/import/bulk paths gate the spawn at the call site.
  assert.equal(isLocalOnlyPath("/api/providers"), false);
  assert.equal(isLocalOnlyPath("/api/providers/"), false);
  assert.equal(isLocalOnlyPath("/api/providers/cursor"), false);
  assert.equal(isLocalOnlyPath("/api/providers/refresh"), false);
  assert.equal(isLocalOnlyPath("/api/providers/batch-status"), false);
  // "validate" must be its own segment, not a prefix of a sibling route name.
  assert.equal(isLocalOnlyPath("/api/providers/validate-batch"), false);
  assert.equal(isLocalOnlyPath("/api/providers/bulk-status"), false);
  assert.equal(isLocalOnlyPath("/api/providers/validate/x"), false);
});

// ─── UI never masks a pipeline rejection as a bare "Invalid" again ───────

test("validationErrorMessage: surfaces {code,message} envelopes (403 LOCAL_ONLY class)", async () => {
  // A reverse-proxied dashboard used to show only the red "Invalid" badge because the
  // modal ignored object-shaped error bodies. The helper must extract the reason.
  const { validationErrorMessage } =
    await import("../../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts");
  assert.equal(validationErrorMessage("Invalid API key"), "Invalid API key");
  assert.equal(
    validationErrorMessage({
      code: "LOCAL_ONLY",
      message: "This endpoint requires localhost access",
    }),
    "This endpoint requires localhost access"
  );
  assert.equal(validationErrorMessage({ code: "AUTH_001" }), "AUTH_001");
  assert.equal(validationErrorMessage(null), null);
  assert.equal(validationErrorMessage(""), null);
  assert.equal(validationErrorMessage({}), null);
});
