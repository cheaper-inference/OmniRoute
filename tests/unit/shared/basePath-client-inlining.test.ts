import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { describe, it } from "node:test";
import ts from "typescript";

// Next.js (Turbopack and webpack) only inlines DIRECT `process.env.NEXT_PUBLIC_*` member
// accesses into client bundles; a bare `process.env` object is the browser polyfill ({}).
// This test mimics that transform on the real source of basePath.ts, so a regression of
// getDeployBasePath() to the `env = process.env` default-parameter form fails here.
// Production-bundle proof (Turbopack + webpack, headless Chromium): issue #18062.
function loadAsClientBundle(inlinedBasePath: string) {
  const file = path.resolve("src/shared/utils/basePath.ts");
  const js = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const inlined = js
    .replace(/process\.env\.NEXT_PUBLIC_OMNIROUTE_BASE_PATH/g, JSON.stringify(inlinedBasePath))
    .replace(/process\.env(?![.\w])/g, "({})");
  const sandbox: Record<string, unknown> = {
    exports: {},
    process: { env: {} },
    URL,
    window: { location: { origin: "https://host" } },
  };
  vm.runInNewContext(inlined, sandbox);
  return sandbox.exports as typeof import("../../../src/shared/utils/basePath");
}

describe("basePath helpers in a client bundle (#18062)", () => {
  it("getDeployBasePath() sees the build-time inlined NEXT_PUBLIC_OMNIROUTE_BASE_PATH", () => {
    const mod = loadAsClientBundle("/omni");
    assert.equal(mod.getDeployBasePath(), "/omni");
  });

  it("withBasePath() prefixes the same-origin absolute URL the login page builds", () => {
    const mod = loadAsClientBundle("/omni");
    assert.equal(
      mod.withBasePath("https://host/api/settings/require-login"),
      "https://host/omni/api/settings/require-login"
    );
  });

  it("stays a no-op for root deploys (empty inlined value)", () => {
    const mod = loadAsClientBundle("");
    assert.equal(mod.getDeployBasePath(), "");
    assert.equal(mod.withBasePath("/api/x"), "/api/x");
  });

  it("login page does not build absolute API URLs from window.location.origin", () => {
    const src = fs.readFileSync(path.resolve("src/app/login/page.tsx"), "utf8");
    assert.doesNotMatch(src, /\$\{baseUrl\}\/api/);
  });
});
