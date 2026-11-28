import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const nextConfig = readFileSync(new URL("../../../next.config.mjs", import.meta.url), "utf8");

test("standalone tracing excludes the env template and the env sync script for all routes", () => {
  const globalExcludes = nextConfig.match(
    /outputFileTracingExcludes:\s*\{[\s\S]*?"\*\*\/\*"\s*:\s*\[([^\]]*)\]/
  )?.[1];
  assert.ok(globalExcludes, "standalone tracing must define global exclusions");
  assert.match(globalExcludes, /^\s*"\.\/\.env\.example",$/m);
  assert.match(globalExcludes, /^\s*"\.\/scripts\/dev\/sync-env\.mjs",$/m);
});
