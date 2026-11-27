import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const CHILD_TIMEOUT_MS = 120_000;

// Fails every import of `sharp` the way a runtime without a usable binary does
// (Android/Termux arm64: "Could not load the "sharp" module using the android-arm64 runtime").
const FAIL_SHARP_HOOK = `
import { register } from "node:module";
register("data:text/javascript," + encodeURIComponent(\`
export async function resolve(specifier, context, next) {
  if (specifier === "sharp") throw new Error("simulated: Could not load the sharp module");
  return next(specifier, context);
}\`));
`;

function importWithoutSharp(specifier: string) {
  return spawnSync(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "--import",
      `data:text/javascript,${encodeURIComponent(FAIL_SHARP_HOOK)}`,
      "--input-type=module",
      "-e",
      `await import(${JSON.stringify(specifier)}); console.log("imported");`,
    ],
    { cwd: repoRoot, encoding: "utf8", timeout: CHILD_TIMEOUT_MS }
  );
}

test("the guardrails the startup hook awaits load when sharp cannot (#21183)", () => {
  const guardrails = pathToFileURL(path.join(repoRoot, "src/lib/guardrails/index.ts")).href;
  const child = importWithoutSharp(guardrails);
  assert.equal(child.status, 0, child.stderr);
  assert.match(child.stdout, /imported/);
});

test("the simulated failure does stop an import of sharp", () => {
  const child = importWithoutSharp("sharp");
  assert.notEqual(child.status, 0);
  assert.match(child.stderr, /simulated: Could not load the sharp module/);
});
