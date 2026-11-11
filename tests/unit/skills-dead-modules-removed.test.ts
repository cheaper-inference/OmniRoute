import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const DEAD_MODULES = [
  "src/lib/skills/hybrid.ts",
  "src/lib/skills/a2a.ts",
  "src/lib/skills/custom.ts",
  "src/lib/skills/builtin/browser.ts",
];

test("the four unimported skills modules stay deleted", () => {
  const present = DEAD_MODULES.filter((file) => fs.existsSync(path.join(ROOT, file)));
  assert.deepEqual(present, []);
});

test("no source file imports a deleted skills module", () => {
  const importPattern = /from\s+["'][^"']*skills\/(hybrid|a2a|custom|builtin\/browser)["']/;
  const offenders: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (
        /\.(ts|tsx|mjs)$/.test(entry.name) &&
        importPattern.test(fs.readFileSync(full, "utf8"))
      )
        offenders.push(path.relative(ROOT, full));
    }
  };
  for (const dir of ["src", "open-sse", "bin"]) walk(path.join(ROOT, dir));
  assert.deepEqual(offenders, []);
});
