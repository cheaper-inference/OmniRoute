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
const DEAD_PATHS = new Set(DEAD_MODULES.map((file) => file.replace(/\.ts$/, "")));
// `from "x"`, `import "x"`, `import("x")` and `require("x")`, with or without a file extension.
const SPECIFIER = /(?:from|import|require)\s*\(?\s*["']([^"']+)["']/g;

// An importer is judged by the file the specifier resolves to, so the unrelated
// open-sse/mcp-server/schemas/a2a.ts is not mistaken for src/lib/skills/a2a.ts.
function resolveSpecifier(specifier: string, importer: string): string | null {
  let target: string;
  if (specifier.startsWith("@/")) target = path.join("src", specifier.slice(2));
  else if (specifier.startsWith(".")) {
    target = path.relative(ROOT, path.resolve(path.dirname(importer), specifier));
  } else if (specifier.startsWith("src/")) target = specifier;
  else return null;
  return target.replace(/\.(ts|tsx|mjs|js)$/, "");
}

function findImporters(dirs: string[]): string[] {
  const offenders: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(ts|tsx|mjs)$/.test(entry.name)) {
        const text = fs.readFileSync(full, "utf8");
        const imports = [...text.matchAll(SPECIFIER)].map((m) => resolveSpecifier(m[1], full));
        if (imports.some((target) => target && DEAD_PATHS.has(target)))
          offenders.push(path.relative(ROOT, full));
      }
    }
  };
  for (const dir of dirs) walk(path.join(ROOT, dir));
  return offenders;
}

test("the four unimported skills modules stay deleted", () => {
  const present = DEAD_MODULES.filter((file) => fs.existsSync(path.join(ROOT, file)));
  assert.deepEqual(present, []);
});

test("no source file imports a deleted skills module", () => {
  assert.deepEqual(findImporters(["src", "open-sse", "bin", "tests/unit"]), []);
});
