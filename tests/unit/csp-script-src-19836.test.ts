import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const modulePath = path.join(process.cwd(), "next.config.mjs");
const originalNodeEnv = process.env.NODE_ENV;

async function loadNextConfigWithEnv(env: string) {
  process.env.NODE_ENV = env;
  const mod = await import(`${pathToFileURL(modulePath).href}?env=${env}-${Date.now()}`);
  return mod.default;
}

test.afterEach(() => {
  if (originalNodeEnv === undefined) {
    delete process.env.NODE_ENV;
  } else {
    process.env.NODE_ENV = originalNodeEnv;
  }
});

test("CSP script-src excludes 'unsafe-eval' in production mode (issue #19836)", async () => {
  const nextConfig = await loadNextConfigWithEnv("production");
  const headersList = await nextConfig.headers();
  const allHeaders = headersList[0].headers;
  const cspHeader = allHeaders.find(
    (h: { key: string; value: string }) => h.key === "Content-Security-Policy"
  );
  assert.ok(cspHeader, "Content-Security-Policy header must be present");

  const csp = cspHeader.value;
  const scriptSrcMatch = csp.match(/script-src[^;]+/);
  assert.ok(scriptSrcMatch, "script-src directive must be present in CSP");

  const scriptSrc = scriptSrcMatch[0];
  assert.equal(
    scriptSrc.includes("'unsafe-eval'"),
    false,
    `production script-src must not include 'unsafe-eval'; got: ${scriptSrc}`
  );
  assert.ok(scriptSrc.includes("'self'"), "script-src must include 'self'");
  assert.ok(scriptSrc.includes("'unsafe-inline'"), "script-src must include 'unsafe-inline'");
});

test("CSP script-src retains 'unsafe-eval' in development mode for HMR / fast refresh", async () => {
  const nextConfig = await loadNextConfigWithEnv("development");
  const headersList = await nextConfig.headers();
  const allHeaders = headersList[0].headers;
  const cspHeader = allHeaders.find(
    (h: { key: string; value: string }) => h.key === "Content-Security-Policy"
  );
  assert.ok(cspHeader, "Content-Security-Policy header must be present");

  const csp = cspHeader.value;
  const scriptSrcMatch = csp.match(/script-src[^;]+/);
  assert.ok(scriptSrcMatch, "script-src directive must be present in CSP");

  const scriptSrc = scriptSrcMatch[0];
  assert.ok(
    scriptSrc.includes("'unsafe-eval'"),
    `development script-src must retain 'unsafe-eval' for HMR; got: ${scriptSrc}`
  );
});
