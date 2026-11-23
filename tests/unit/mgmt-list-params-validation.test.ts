import { test, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { SignJWT } from "jose";

// The list routes of the dashboard and the management API parsed `?limit=`, `?offset=` and `?page=` with a bare
// `Number` or `Number.parseInt`. `?limit=abc` reached the SQLite `LIMIT ?` bind as NaN ("datatype mismatch") and
// came back as a 500 (or threw out of the handler). The `/v1/batches` and `/v1/files` siblings already answer a
// bad `limit` with a 400; these routes now do the same, through one helper.

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-mgmt-list-params-"));
process.env.DATA_DIR = dataDir;
process.env.JWT_SECRET = "mgmt-list-params-session-secret";
process.env.API_KEY_SECRET = "mgmt-list-params-key-secret";
process.env.REQUIRE_API_KEY = "false";

const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

after(() => {
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

const owner = await createApiKey("mgmt-list-params-owner", "test-device", []);
const cookie = `auth_token=${await new SignJWT({ authenticated: true, sub: "admin" })
  .setProtectedHeader({ alg: "HS256" })
  .setExpirationTime("1h")
  .sign(new TextEncoder().encode(process.env.JWT_SECRET))}`;

type Handler = (request: Request) => Promise<Response>;

const routes: Array<{
  name: string;
  path: string;
  load: () => Promise<{ GET: Handler }>;
  auth: "key" | "session";
  params: Array<{ name: string; valid: string }>;
}> = [
  {
    name: "/api/batches",
    path: "/api/batches",
    load: () => import("../../src/app/api/batches/route.ts"),
    auth: "key",
    params: [{ name: "limit", valid: "5" }],
  },
  {
    name: "/api/files",
    path: "/api/files",
    load: () => import("../../src/app/api/files/route.ts"),
    auth: "key",
    params: [{ name: "limit", valid: "5" }],
  },
  {
    name: "/api/logs/detail",
    path: "/api/logs/detail",
    load: () => import("../../src/app/api/logs/detail/route.ts"),
    auth: "session",
    params: [
      { name: "limit", valid: "5" },
      { name: "offset", valid: "0" },
    ],
  },
  {
    name: "/api/cache/entries",
    path: "/api/cache/entries",
    load: () => import("../../src/app/api/cache/entries/route.ts"),
    auth: "session",
    params: [
      { name: "page", valid: "1" },
      { name: "limit", valid: "5" },
    ],
  },
  {
    name: "/api/webhooks",
    path: "/api/webhooks",
    load: () => import("../../src/app/api/webhooks/route.ts"),
    auth: "session",
    params: [
      { name: "limit", valid: "5" },
      { name: "offset", valid: "0" },
    ],
  },
  {
    name: "/api/v1/management/proxies",
    path: "/api/v1/management/proxies",
    load: () => import("../../src/app/api/v1/management/proxies/route.ts"),
    auth: "session",
    params: [
      { name: "limit", valid: "5" },
      { name: "offset", valid: "0" },
    ],
  },
  {
    name: "/api/v1/management/proxies/assignments",
    path: "/api/v1/management/proxies/assignments",
    load: () => import("../../src/app/api/v1/management/proxies/assignments/route.ts"),
    auth: "session",
    params: [
      { name: "limit", valid: "5" },
      { name: "offset", valid: "0" },
    ],
  },
];

for (const route of routes) {
  const call = async (query: string) => {
    const { GET } = await route.load();
    return GET(
      new Request(`http://localhost${route.path}${query}`, {
        headers: route.auth === "key" ? { authorization: `Bearer ${owner.key}` } : { cookie },
      })
    );
  };

  for (const param of route.params) {
    test(`${route.name}?${param.name}=abc answers 400, not a 500`, async () => {
      const bad = ["abc", "1.5", "NaN", "10x", "1e3", "99999999999999999999"];
      for (const value of bad) {
        const response = await call(`?${param.name}=${encodeURIComponent(value)}`);
        assert.equal(response.status, 400, `${param.name}=${value}`);
        const body = (await response.json()) as { error?: { message?: string; type?: string } };
        assert.match(body.error?.message ?? "", new RegExp(`^${param.name} must be an integer$`));
        assert.equal(body.error?.type, "invalid_request_error");
      }
    });
  }

  test(`${route.name} still answers with no parameters, empty ones, valid ones and out-of-range integers`, async () => {
    const valid = route.params.map((param) => `${param.name}=${param.valid}`).join("&");
    const empty = route.params.map((param) => `${param.name}=`).join("&");
    // Out-of-range integers are clamped by the routes as before; only a value that is not an integer is refused.
    const outOfRange = route.params.map((param) => `${param.name}=-5`).join("&");
    const huge = route.params.map((param) => `${param.name}=999`).join("&");
    for (const query of ["", `?${empty}`, `?${valid}`, `?${outOfRange}`, `?${huge}`]) {
      const response = await call(query);
      assert.equal(response.status, 200, `${route.name}${query || " (no query)"}`);
    }
  });
}
