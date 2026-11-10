/**
 * #18699: `src/lib/docsSanitizer.ts` imports jsdom, which next.config keeps external. Next's trace
 * leaves it out of the standalone tree, so in a real standalone install the import fails and every
 * translated page falls back to English. It looks fine from inside the repo, because Node finds the
 * checkout's node_modules by walking up. (npm installs get jsdom from `dependencies` since
 * 2026-11-03; standalone and Docker bundles get it from this colocation step.)
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { assembleStandalone } from "../../scripts/build/assembleStandalone.mjs";
import { computeDependencyClosure } from "../../scripts/build/colocateOptionals.mjs";

function writePackage(nodeModules: string, name: string, dependencies: Record<string, string>) {
  const dir = path.join(nodeModules, name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify({ name, version: "1.0.0", main: "index.js", dependencies })
  );
  fs.writeFileSync(path.join(dir, "index.js"), "module.exports = {};\n");
}

function makeBuild(t: test.TestContext, { mirrors }: { mirrors: boolean }) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "assemble-docs-18699-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));

  const nodeModules = path.join(root, "node_modules");
  writePackage(nodeModules, "jsdom", { parse5: "1.0.0" });
  writePackage(nodeModules, "parse5", {});

  const distDir = path.join(root, ".build", "next");
  const standalone = path.join(distDir, "standalone");
  fs.mkdirSync(path.join(standalone, "node_modules"), { recursive: true });
  fs.mkdirSync(path.join(distDir, "static"), { recursive: true });
  fs.writeFileSync(path.join(standalone, "package.json"), JSON.stringify({ name: "app" }));
  if (mirrors) {
    const mirror = path.join(standalone, "docs", "i18n", "pt-BR", "docs", "guides");
    fs.mkdirSync(mirror, { recursive: true });
    fs.writeFileSync(path.join(mirror, "A.md"), "# A\n");
  } else {
    fs.mkdirSync(path.join(standalone, "docs"), { recursive: true });
  }

  return { root, distDir, standalone };
}

test("a standalone bundle with translated docs gets the docs sanitizer's jsdom closure", (t) => {
  const { root, distDir, standalone } = makeBuild(t, { mirrors: true });

  assembleStandalone({ distDir, outDir: standalone, projectRoot: root, copyNatives: true });

  assert.ok(fs.existsSync(path.join(standalone, "node_modules", "jsdom", "index.js")));
  assert.ok(fs.existsSync(path.join(standalone, "node_modules", "parse5", "index.js")));
});

test("a bundle without translated docs does not carry jsdom", (t) => {
  const { root, distDir, standalone } = makeBuild(t, { mirrors: false });

  assembleStandalone({ distDir, outDir: standalone, projectRoot: root, copyNatives: true });

  assert.equal(fs.existsSync(path.join(standalone, "node_modules", "jsdom")), false);
});

test("the real jsdom install resolves to a closure the colocation walk can copy", () => {
  const closure = computeDependencyClosure(path.resolve("node_modules"), ["jsdom"]);

  assert.equal(closure[0], "jsdom");
  for (const required of ["parse5", "whatwg-url", "tough-cookie"]) {
    assert.ok(closure.includes(required), `closure must include ${required}`);
  }
});
