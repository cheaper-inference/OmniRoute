/**
 * resolvePublicApiBaseUrl: the API origin reported to key holders. The environment is passed in,
 * so these tests never touch process.env.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { resolvePublicApiBaseUrl } from "../../src/server/origin/publicApiBaseUrl.ts";

const r = (env: Record<string, string>) => resolvePublicApiBaseUrl(env as NodeJS.ProcessEnv);
const APP = { OMNIROUTE_PUBLIC_BASE_URL: "https://app.example.com" };

test("the API-specific origin wins, then the public base URL, then null", () => {
  assert.equal(
    r({ ...APP, OMNIROUTE_PUBLIC_API_BASE_URL: "https://api.example.com" }),
    "https://api.example.com"
  );
  assert.equal(r(APP), "https://app.example.com");
  assert.equal(r({ ...APP, OMNIROUTE_PUBLIC_API_BASE_URL: "  " }), "https://app.example.com");
  assert.equal(r({}), null);
  assert.equal(r({ NEXT_PUBLIC_BASE_URL: "http://localhost:20128" }), null);
});

test("values are reduced to scheme, host and port; an invalid API origin yields null instead of falling back", () => {
  assert.equal(
    r({ OMNIROUTE_PUBLIC_API_BASE_URL: " HTTPS://API.Example.com:8443/v1/?x=1#f " }),
    "https://api.example.com:8443"
  );
  for (const bad of ["not a url", "ftp://api.example.com", "javascript:alert(1)"])
    assert.equal(r({ ...APP, OMNIROUTE_PUBLIC_API_BASE_URL: bad }), null);
  assert.equal(
    r({ OMNIROUTE_PUBLIC_API_BASE_URL: "https://u:p@api.example.com/x" }),
    "https://api.example.com"
  );
});

test("an invalid API origin is warned about once, by name, without its value", () => {
  const warnings: Array<[Record<string, unknown>, string]> = [];
  const notice = {
    warned: false,
    log: { warn: (f: Record<string, unknown>, m: string) => warnings.push([f, m]) },
  };
  const env = { ...APP, OMNIROUTE_PUBLIC_API_BASE_URL: "ftp://secret-host.example.com" };
  assert.equal(resolvePublicApiBaseUrl(env, notice), null);
  assert.equal(resolvePublicApiBaseUrl(env, notice), null);
  assert.equal(warnings.length, 1);
  assert.deepEqual(warnings[0][0], { variable: "OMNIROUTE_PUBLIC_API_BASE_URL" });
  assert.ok(!JSON.stringify(warnings).includes("secret-host"));
  // A valid or unset API origin never warns.
  const quiet = { warned: false, log: notice.log };
  resolvePublicApiBaseUrl(APP, quiet);
  resolvePublicApiBaseUrl({ OMNIROUTE_PUBLIC_API_BASE_URL: "https://api.example.com" }, quiet);
  assert.equal(warnings.length, 1);
});
