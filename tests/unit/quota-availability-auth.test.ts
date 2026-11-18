import assert from "node:assert/strict";
import { test } from "node:test";
import { NextRequest } from "next/server";
import { updateSettings } from "../../src/lib/db/settings.ts";
import { classifyRoute } from "../../src/server/authz/classify.ts";
import { proxy, config } from "../../src/proxy.ts";

test("central proxy rejects anonymous availability and provider-limits management GETs", async () => {
  await updateSettings({ requireLogin: true });
  assert.ok(config.matcher.includes("/api/:path*"));
  for (const path of ["/api/usage/availability", "/api/usage/provider-limits"]) {
    assert.equal(classifyRoute(path, "GET").routeClass, "MANAGEMENT");
    const response = await proxy(
      new NextRequest(`http://synthetic.example.test${path}`, { method: "GET" })
    );
    assert.equal(response.status, 401);
    assert.equal(response.headers.get("x-omniroute-route-class"), "MANAGEMENT");
    assert.equal((await response.json()).error.code, "AUTH_001");
  }
});
