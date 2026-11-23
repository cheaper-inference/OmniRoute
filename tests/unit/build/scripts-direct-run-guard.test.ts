import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// A script that runs its main() only when
//   import.meta.url === `file://${process.argv[1]}`
// never runs it on Windows: import.meta.url is `file:///C:/…` while argv[1] is `C:\…`.
// The gate then exits 0 without checking anything, so a local `npm run check:*`
// reports a pass that CI later contradicts. The portable form, already used by most
// scripts here, is `import.meta.url === pathToFileURL(process.argv[1] || "").href`.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const SCRIPTS = path.join(ROOT, "scripts");
const NON_PORTABLE_GUARD = "`file://${process.argv[1]}`";

function listScriptFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...listScriptFiles(full));
    else if (/\.(mjs|cjs|js|ts)$/.test(entry.name)) files.push(full);
  }
  return files;
}

test("no script decides it was run directly from a file:// template of argv[1]", () => {
  const offenders = listScriptFiles(SCRIPTS)
    .filter((file) => fs.readFileSync(file, "utf8").includes(NON_PORTABLE_GUARD))
    .map((file) => path.relative(ROOT, file).split(path.sep).join("/"));
  assert.deepEqual(
    offenders,
    [],
    `replace ${NON_PORTABLE_GUARD} with pathToFileURL(process.argv[1] || "").href in: ${offenders.join(", ")}`
  );
});

test("a direct run reaches main(): mutation-radiography without a report prints its usage", () => {
  const res = spawnSync(
    process.execPath,
    [path.join(SCRIPTS, "quality", "mutation-radiography.mjs")],
    { cwd: ROOT, encoding: "utf8" }
  );
  assert.equal(res.status, 2, `expected exit 2, got ${res.status}\n${res.stdout}${res.stderr}`);
  assert.match(res.stderr, /usage: mutation-radiography\.mjs/);
});
