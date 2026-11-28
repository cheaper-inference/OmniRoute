/**
 * tests/unit/entry-guard-is-symlink-safe.test.ts
 *
 * A script that decides "was I the entry program?" has to resolve `process.argv[1]`
 * before comparing, because Node resolves the module through its real path while
 * argv[1] keeps whatever the caller typed. Comparing `import.meta.url` with
 * `pathToFileURL(process.argv[1])` reports "imported" for every script reached
 * through a symlinked directory, so `main()` never runs and the process exits 0 —
 * which for a checker reads as a pass.
 *
 * The guard is `process.argv[1] && realpathSync(process.argv[1]) === import.meta.filename`:
 * `import.meta.filename` is already the real path, so only the argument needs resolving,
 * and the guard stays inside each script (the suite stages scripts into throwaway repos,
 * so a sibling module would not be there).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SCANNED_DIRS = ["scripts", "bin", "docker"];
const GUARD = "process.argv[1] && realpathSync(process.argv[1]) === import.meta.filename";

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      walk(full, out);
    } else if (/\.(mjs|js|cjs|ts)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

/** Blank out comments, keeping newlines so reported line numbers stay true. */
function stripComments(text: string): string {
  const out: string[] = [];
  let quote: string | null = null;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (quote) {
      out.push(ch);
      if (ch === "\\") {
        out.push(next ?? "");
        i++;
      } else if (ch === quote) {
        quote = null;
      }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      out.push(ch);
      continue;
    }
    if (ch === "/" && next === "/") {
      while (i < text.length && text[i] !== "\n") i++;
      out.push("\n");
      continue;
    }
    if (ch === "/" && next === "*") {
      i += 2;
      while (i < text.length && !(text[i] === "*" && text[i + 1] === "/")) {
        if (text[i] === "\n") out.push("\n");
        i++;
      }
      i++;
      continue;
    }
    out.push(ch);
  }
  return out.join("");
}

/**
 * The old shape always mentions `import.meta.url`; the guard mentions
 * `import.meta.filename` instead, so a statement with both `import.meta.url` and
 * `process.argv` is the pattern to keep out, whatever operator or spelling it uses.
 */
function scanForOffenders(root: string, dirs: string[] = SCANNED_DIRS): string[] {
  const offenders: string[] = [];
  for (const dir of dirs) {
    const base = path.join(root, dir);
    if (!fs.existsSync(base)) continue;
    for (const file of walk(base)) {
      const text = stripComments(fs.readFileSync(file, "utf-8"));
      if (!text.includes("import.meta.url")) continue;
      const shown = path.relative(root, file).split(path.sep).join("/");
      const lines = text.split("\n");
      // A guard written on one statement, and one that first parks argv[1] in a
      // variable a line or two above, both have to be seen.
      for (let i = 0; i < lines.length; i++) {
        const statement = lines[i];
        const window = lines.slice(i, i + 3).join(" ");
        // Both tokens alone are not a guard — a file may derive a path from
        // import.meta.url and read argv for its arguments. A guard compares them.
        const hit = [statement, window].find(
          (candidate) =>
            candidate.includes("import.meta.url") &&
            candidate.includes("process.argv") &&
            /(===|==|Object\.is)/.test(candidate)
        );
        if (!hit) continue;
        offenders.push(`${shown}:${i + 1}: ${hit.trim().slice(0, 120)}`);
        i += 2;
      }
    }
  }
  return offenders;
}

test("no script compares import.meta.url with the entry argument by hand", () => {
  assert.deepEqual(
    scanForOffenders(ROOT),
    [],
    `compare ${GUARD} instead: import.meta.url carries no symlink, so the old forms fail open`
  );
});

test("the guard runs a script reached through a symlinked directory", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "entry-guard-"));
  const real = path.join(dir, "real");
  const scripts = path.join(real, "scripts");
  fs.mkdirSync(scripts, { recursive: true });
  const body = (condition: string) =>
    [
      'import { realpathSync } from "node:fs";',
      `if (${condition}) {`,
      '  console.log("ran");',
      "} else {",
      '  console.log("skipped");',
      "}",
      "",
    ].join("\n");
  fs.writeFileSync(path.join(scripts, "guarded.mjs"), body(GUARD));
  fs.writeFileSync(
    path.join(scripts, "naive.mjs"),
    body('import.meta.url === pathToFileURL(process.argv[1] || "").href').replace(
      'import { realpathSync } from "node:fs";',
      'import { pathToFileURL } from "node:url";'
    )
  );
  const link = path.join(dir, "link");
  fs.symlinkSync(real, link, "dir");

  const guardedDirect = spawnSync(process.execPath, [path.join(real, "scripts/guarded.mjs")], {
    encoding: "utf-8",
  });
  const guardedLinked = spawnSync(process.execPath, [path.join(link, "scripts/guarded.mjs")], {
    encoding: "utf-8",
  });
  assert.equal(guardedDirect.stdout.trim(), "ran", guardedDirect.stderr);
  assert.equal(guardedLinked.stdout.trim(), "ran", "a symlinked path is still the entry program");

  const naiveLinked = spawnSync(process.execPath, [path.join(link, "scripts/naive.mjs")], {
    encoding: "utf-8",
  });
  assert.equal(
    naiveLinked.stdout.trim(),
    "skipped",
    "the direct comparison is what fails open, so the case above has to differ from it"
  );
  fs.rmSync(dir, { recursive: true, force: true });
});

test("importing a guarded script does not run it", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "entry-guard-import-"));
  const file = path.join(dir, "guarded.mjs");
  fs.writeFileSync(
    file,
    [
      'import { realpathSync } from "node:fs";',
      `if (${GUARD}) {`,
      '  console.log("ran");',
      "}",
      "",
    ].join("\n")
  );
  const imported = spawnSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `await import(${JSON.stringify(file)}); console.log("imported");`,
    ],
    { encoding: "utf-8" }
  );
  assert.equal(imported.status, 0, imported.stderr);
  assert.equal(imported.stdout.trim(), "imported");
  fs.rmSync(dir, { recursive: true, force: true });
});
