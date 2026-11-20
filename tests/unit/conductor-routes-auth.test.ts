import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// Budget-route-auth pattern: proves from the source that the auth gate comes BEFORE any use of the proxy.
const ROUTES = [
  "src/app/api/conductor/fleet/route.ts",
  "src/app/api/conductor/tasks/[id]/route.ts",
  "src/app/api/conductor/tasks/[id]/cancel/route.ts",
  // Creation route (drawer repeat): covered here by the same pattern, instead of
  // duplicar o teste de fonte dentro de `conductor-create-route.test.ts`.
  "src/app/api/conductor/tasks/route.ts",
];

for (const route of ROUTES) {
  test(`${route}: requireManagementAuth before proxy to hub`, () => {
    const src = fs.readFileSync(path.join(process.cwd(), route), "utf8");
    const authAt = src.indexOf("requireManagementAuth(");
    assert.ok(authAt > 0, "handler chama requireManagementAuth");
    assert.match(src, /if \(authError\) return authError;/, "curto-circuito no erro de auth");
    const proxyAt = src.search(
      /getFleetSnapshot\(|getConductorTaskDetail\(|cancelConductorTask\(|createConductorTask\(/
    );
    assert.ok(proxyAt > authAt, "proxy ao hub só depois do gate de auth");
    assert.ok(
      !src.includes("CONDUCTOR_HUB_TOKEN"),
      "token nunca manuseado na rota (vive no hubProxy)"
    );
  });
}
