import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");

test("packages/ui-kit is a private, UNLICENSED workspace pinned to an upstream commit", () => {
  const pkg = JSON.parse(read("packages/ui-kit/package.json"));
  assert.equal(pkg.name, "@omniroute/ui-kit");
  assert.equal(pkg.private, true);
  assert.equal(pkg.license, "UNLICENSED");
  assert.equal(pkg.exports["."], "./src/index.ts");
  assert.equal(pkg.exports["./styles.css"], "./src/ci-ui.css");
  for (const target of Object.values(pkg.exports))
    assert.ok(
      fs.existsSync(path.join(ROOT, "packages/ui-kit", target as string)),
      `export target missing: ${target}`
    );
  const upstream = read("packages/ui-kit/UPSTREAM.md");
  assert.match(upstream, /commit:\s*[0-9a-f]{40}/);
  const pinnedVersion = /^- version:\s*(\d+\.\d+\.\d+)$/m.exec(upstream)?.[1];
  assert.equal(
    pinnedVersion,
    pkg.version,
    "the workspace version mirrors the pinned upstream version"
  );
  assert.match(upstream, /license-authorization:/);
});

test("vendored sources carry no .js suffix on relative imports (sync transform applied)", () => {
  const src = path.join(ROOT, "packages/ui-kit/src");
  const files = fs.readdirSync(src).filter((f) => /\.(ts|tsx)$/.test(f));
  assert.ok(files.length > 60, `expected the kit sources, got ${files.length} files`);
  for (const f of files) {
    const text = fs.readFileSync(path.join(src, f), "utf8");
    assert.doesNotMatch(text, /from "\.{1,2}\/[^"]+\.js"/, `${f} still imports with a .js suffix`);
  }
});

test("the snapshot gate script exists and is wired in package.json", () => {
  assert.ok(fs.existsSync(path.join(ROOT, "scripts/check/check-ui-kit-snapshot.mjs")));
  const pkg = JSON.parse(read("package.json"));
  assert.equal(
    pkg.scripts["check:ui-kit-snapshot"],
    "node scripts/check/check-ui-kit-snapshot.mjs"
  );
  assert.ok(pkg.workspaces.includes("packages/ui-kit"));
  for (const dep of [
    "@radix-ui/react-dialog",
    "@radix-ui/react-dropdown-menu",
    "@radix-ui/react-popover",
    "@radix-ui/react-select",
    "@radix-ui/react-slot",
    "@radix-ui/react-tooltip",
    "react-day-picker",
  ])
    assert.ok(pkg.dependencies[dep], `${dep} must be a root dependency (kit requirement)`);
  assert.equal(pkg.dependencies["react-day-picker"], "10.0.1");
});

test("next, tsconfig, vitest and eslint know about the vendored package", () => {
  assert.match(read("next.config.mjs"), /transpilePackages:\s*\[[^\]]*"@omniroute\/ui-kit"/);
  const tsconfig = JSON.parse(read("tsconfig.json"));
  assert.deepEqual(tsconfig.compilerOptions.paths["@omniroute/ui-kit"], ["./packages/ui-kit/src"]);
  assert.deepEqual(tsconfig.compilerOptions.paths["@omniroute/ui-kit/*"], [
    "./packages/ui-kit/src/*",
  ]);
  assert.match(
    read("vitest.config.ts"),
    /"@omniroute\/ui-kit":\s*path\.resolve\(__dirname,\s*"\.\/packages\/ui-kit\/src"\)/
  );
  assert.match(read("eslint.config.mjs"), /"packages\/ui-kit\/\*\*"/);
  assert.match(read(".prettierignore"), /^packages\/ui-kit\/src\/\*\*$/m);
});
