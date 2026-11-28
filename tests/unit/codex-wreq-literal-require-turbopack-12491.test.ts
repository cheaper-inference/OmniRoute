import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

/**
 * Regression guard for #12491: the Codex app-server WebSocket transport
 * ("Codex app-server websocket transport unavailable") never comes up inside
 * the Next.js standalone Docker runtime because open-sse/executors/codex.ts
 * resolves wreq-js with a LITERAL specifier:
 *
 *   const _wreqRequire = createRequire(import.meta.url);
 *   const mod = _wreqRequire("wreq-js");
 *
 * Turbopack statically detects the literal string argument and rewrites the
 * call into `require("wreq-js-<buildhash>")`, satisfied only by a symlink
 * Turbopack drops at `.next/node_modules/wreq-js-<buildhash> -> node_modules/wreq-js`
 * during the build. That symlink is a `.next`-relative build artifact; it is not
 * reachable through the same relative path once files are re-laid-out for a
 * standalone Docker image, so `require("wreq-js-<buildhash>")` throws
 * MODULE_NOT_FOUND at runtime — even though `node -e "require('wreq-js')"`
 * (the literal package name) succeeds fine in the very same container.
 *
 * Verified interactively against a real `next build --turbopack` (Next 16.3.3):
 * compiling `const _wreqRequire = createRequire(import.meta.url); _wreqRequire("wreq-js")`
 * emits `64301,(e,t,r)=>{t.exports=e.x("wreq-js-3b69dd5e46bd26d3",()=>require("wreq-js-3b69dd5e46bd26d3"))}`
 * in the compiled chunk, and the build directory gained
 * `.next/node_modules/wreq-js-3b69dd5e46bd26d3 -> ../../node_modules/wreq-js`.
 * The Codex executor now delegates to wreqLoader.ts, which keeps the specifier
 * a runtime variable (`Reflect.apply(runtimeRequire, undefined, [moduleName])`)
 * like open-sse/utils/browserProfiles.ts.
 */

const CODEX_TS_PATH = join(ROOT, "open-sse", "executors", "codex.ts");
const WREQ_LOADER_TS_PATH = join(ROOT, "open-sse", "executors", "codex", "wreqLoader.ts");

test("the Codex wreq-js loader must not pass a literal specifier to createRequire()'s resolver", () => {
  const executor = readFileSync(CODEX_TS_PATH, "utf8");
  const loader = readFileSync(WREQ_LOADER_TS_PATH, "utf8");

  assert.match(executor, /\bloadCodexWreqModule\(\)/);
  assert.match(
    loader,
    /const\s+runtimeRequire\s*=\s*nodeModule\.createRequire\(/,
    "expected wreqLoader.ts to define the runtime resolver via nodeModule.createRequire()"
  );

  const literalCallPattern = /\b(?:runtimeRequire|_wreqRequire)\s*\(\s*["'`]wreq-js["'`]\s*[,)]/;
  assert.doesNotMatch(
    `${executor}\n${loader}`,
    literalCallPattern,
    'Pass "wreq-js" through a variable via Reflect.apply(runtimeRequire, undefined, [moduleName]). ' +
      'Turbopack rewrites a literal call to `require("wreq-js-<buildhash>")`, which needs a build-time ' +
      "symlink that is missing from the standalone Docker runtime (#12491)."
  );
});
