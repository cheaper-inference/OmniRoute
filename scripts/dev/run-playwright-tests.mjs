#!/usr/bin/env node

import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";
import { sanitizeColorEnv } from "../build/runtime-env.mjs";

// Playwright CLI subcommands that are forwarded untouched. Anything else (a spec path, a
// `--grep`, `--project=…`) is a `test` argument, so `npm run test:e2e -- tests/e2e/x.spec.ts`
// runs only that spec. The npm script used to pass `test tests/e2e/*.spec.ts` itself, which put
// every spec ahead of the caller's filter and made the filter a no-op.
const PASSTHROUGH_COMMANDS = new Set([
  "test",
  "show-report",
  "merge-reports",
  "show-trace",
  "install",
  "install-deps",
  "uninstall",
  "codegen",
  "clear-cache",
  "--help",
  "-h",
  "--version",
  "-V",
]);

/** Builds the Playwright CLI argv. With no arguments the config's testDir/testMatch decide. */
export function buildPlaywrightArgs(forwardedArgs) {
  if (forwardedArgs.length === 0) return ["test"];
  if (PASSTHROUGH_COMMANDS.has(forwardedArgs[0])) return [...forwardedArgs];
  return ["test", ...forwardedArgs];
}

// The CLI of `@playwright/test` — the package the specs import, and the one `npx playwright`
// resolves to in CI (node_modules/.bin/playwright). Running the runtime `playwright` package's
// CLI instead fails with "did not expect test() to be called here" whenever the two versions
// drift; package.json pins both to the same version (guarded by a unit test).
const PLAYWRIGHT_CLI = "./node_modules/@playwright/test/cli.js";

function main() {
  const args = buildPlaywrightArgs(process.argv.slice(2));
  const playwrightEnv = sanitizeColorEnv(process.env);

  delete playwrightEnv.NO_COLOR;
  delete playwrightEnv.FORCE_COLOR;

  const child = spawn(process.execPath, [PLAYWRIGHT_CLI, ...args], {
    stdio: "inherit",
    env: playwrightEnv,
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }
    process.exit(code ?? 0);
  });
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main();
}
