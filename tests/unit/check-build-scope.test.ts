import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { test } from "node:test";

const SCRIPT = fileURLToPath(new URL("../../scripts/check/check-build-scope.mjs", import.meta.url));
const EXCLUDES = [
  "node_modules",
  ".claude",
  ".worktrees",
  "_tasks",
  "_references",
  "_mono_repo",
  "_ideia",
];

function write(root: string, name: string, body = "export {};\n") {
  const file = path.join(root, name);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body);
}

function git(root: string, ...args: string[]) {
  const result = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
}

function fixture(options: { empty?: boolean } = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "omni-build-scope-"));
  git(root, "init", "--quiet");
  configure(root);
  if (!options.empty) write(root, "src/main.ts");
  git(root, "add", "--", ".");
  return root;
}

function configure(root: string, changes: Record<string, unknown> = {}) {
  write(
    root,
    "tsconfig.json",
    JSON.stringify({
      compilerOptions: { allowJs: true },
      include: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
      exclude: EXCLUDES,
      ...changes,
    })
  );
}

function run(root: string, args: string[] = [], env: NodeJS.ProcessEnv = process.env) {
  const result = spawnSync(process.execPath, [SCRIPT, "--root", root, "--json", ...args], {
    encoding: "utf8",
    env,
    maxBuffer: 1024 * 1024,
  });
  assert.equal(result.signal, null, result.stderr);
  assert.ok(result.stdout.trim().startsWith("{"), result.stderr || result.stdout);
  return { ...result, report: JSON.parse(result.stdout) };
}

function inFixture(callback: (root: string) => void, options?: { empty?: boolean }) {
  const root = fixture(options);
  try {
    callback(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test("legitimate indexed growth past 12000 root files does not become a leak", () => {
  inFixture((root) => {
    for (let i = 0; i < 12000; i++) write(root, `src/growth/f${i}.ts`, "");
    git(root, "add", "--", "src");
    const result = run(root);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.equal(result.report.status, "PASS");
    assert.equal(result.report.count, 12001);
    assert.equal(result.report.max, null);
    assert.equal(result.report.trackedCount, 12001);
  });
});

for (const destination of ["src/copied-project/file.ts", "scratch/copied-project/file.ts"]) {
  test(`an untracked source copy fails even below the old threshold: ${destination}`, () => {
    inFixture((root) => {
      write(root, destination);
      const result = run(root);
      assert.equal(result.status, 1);
      assert.ok(result.report.findings.some((f: { path: string }) => f.path === destination));
    });
  });
}

test("new intended source becomes admissible when added to the index", () => {
  inFixture((root) => {
    write(root, "src/new-module.ts");
    assert.equal(run(root).status, 1);
    git(root, "add", "--", "src/new-module.ts");
    assert.equal(run(root).status, 0);
  });
});

test("indexing a copied project in a foreign root does not authorize it", () => {
  inFixture((root) => {
    write(root, "archive-copy/src/file.ts");
    git(root, "add", "--", ".");
    const result = run(root);
    assert.equal(result.status, 1);
    assert.ok(result.report.findings.some((f: { code: string }) => f.code === "FORBIDDEN_ROOT"));
  });
});

for (const excluded of [".claude", "_tasks"]) {
  test(`removing the ${excluded} exclusion fails with an empty tree`, () => {
    inFixture(
      (root) => {
        configure(root, { exclude: EXCLUDES.filter((name) => name !== excluded) });
        const result = run(root);
        assert.equal(result.status, 1);
        assert.ok(
          result.report.findings.some(
            (f: { code: string; path: string }) =>
              f.code === "MISSING_EXCLUSION" && f.path === excluded
          )
        );
      },
      { empty: true }
    );
  });
}

test("files entries cannot bypass an exclusion for private source", () => {
  inFixture((root) => {
    write(root, "_tasks/leaked.ts");
    configure(root, { files: ["_tasks/leaked.ts"] });
    git(root, "add", "--", ".");
    const result = run(root);
    assert.equal(result.status, 1);
    assert.ok(result.report.findings.some((f: { path: string }) => f.path === "_tasks/leaked.ts"));
  });
});

test("excluded worktrees stay out and equivalent directory-glob barriers are accepted", () => {
  inFixture((root) => {
    configure(root, { exclude: EXCLUDES.map((name) => `${name}/**`) });
    write(root, ".claude/worktrees/copied/src/file.ts");
    write(root, "_tasks/private-copy.ts");
    const result = run(root);
    assert.equal(result.status, 0, result.stdout);
    assert.equal(result.report.count, 1);
  });
});

test("effective includes and glob exclusions leave unrelated files out", () => {
  inFixture((root) => {
    configure(root, { include: ["src/**/*.ts"], exclude: [...EXCLUDES, "src/generated/**"] });
    write(root, "tests/not-in-this-project.test.ts");
    write(root, "src/generated/not-in-this-project.ts");
    const result = run(root);
    assert.equal(result.status, 0, result.stdout);
    assert.equal(result.report.count, 1);
  });
});

test("JSONC and relative inherited include/exclude patterns use TypeScript semantics", () => {
  inFixture((root) => {
    write(
      root,
      "config/base.json",
      JSON.stringify({ include: ["../src/**/*.ts"], exclude: EXCLUDES.map((x) => "../" + x) })
    );
    write(root, "tsconfig.json", '{\n // inherited config\n "extends": "./config/base.json",\n}\n');
    write(root, "tests/outside-include.test.ts");
    const result = run(root);
    assert.equal(result.status, 0, result.stdout);
    assert.equal(result.report.count, 1);
  });
});

test("TypeScript source-extension priority is respected", () => {
  inFixture((root) => {
    write(root, "src/main.js");
    const result = run(root);
    assert.equal(result.status, 0, result.stdout);
    assert.equal(result.report.count, 1);
  });
});

test("known Next generated types are narrow exceptions, not permission for adjacent output", () => {
  inFixture((root) => {
    configure(root, { include: ["**/*.ts", ".next/**/*.ts", ".next-playwright/**/*.ts"] });
    for (const name of [
      "next-env.d.ts",
      ".next/types/routes.d.ts",
      ".next/dev/types/validator.ts",
      ".next-playwright/types/routes.d.ts",
    ])
      write(root, name);
    const allowed = run(root);
    assert.equal(allowed.status, 0, allowed.stdout);
    assert.equal(allowed.report.generatedCount, 4);
    write(root, ".next/server/leaked-bundle.ts");
    const refused = run(root);
    assert.equal(refused.status, 1);
    assert.ok(
      refused.report.findings.some(
        (f: { path: string }) => f.path === ".next/server/leaked-bundle.ts"
      )
    );
  });
});

test("an indexed symlink cannot import source outside the repository", () => {
  inFixture((root) => {
    const external = fs.mkdtempSync(path.join(os.tmpdir(), "omni-build-scope-external-"));
    try {
      write(external, "outside.ts");
      fs.symlinkSync(path.join(external, "outside.ts"), path.join(root, "src/escape.ts"));
      git(root, "add", "--", ".");
      const result = run(root);
      assert.equal(result.status, 1);
      assert.ok(result.report.findings.some((f: { code: string }) => f.code === "SCOPE_ESCAPE"));
    } finally {
      fs.rmSync(external, { recursive: true, force: true });
    }
  });
});

test("an external include is refused even before its directory exists", () => {
  inFixture((root) => {
    configure(root, { include: ["src/**/*.ts", "../not-created-build-scope-copy/**/*.ts"] });
    const result = run(root);
    assert.equal(result.status, 1, result.stdout);
    assert.ok(result.report.findings.some((f: { code: string }) => f.code === "SCOPE_ESCAPE"));
  });
});

test("an indexed alias cannot expose a protected physical file inside the repository", () => {
  inFixture((root) => {
    write(root, "_tasks/private.ts");
    fs.symlinkSync(path.join(root, "_tasks/private.ts"), path.join(root, "src/alias.ts"));
    git(root, "add", "--", "src/alias.ts");
    const result = run(root);
    assert.equal(result.status, 1, result.stdout);
    assert.ok(
      result.report.findings.some((f: { code: string }) => f.code === "FORBIDDEN_PHYSICAL_SOURCE")
    );
  });
});

test("an indexed alias requires provenance of its excluded physical source", () => {
  inFixture((root) => {
    configure(root, { exclude: [...EXCLUDES, "src/hidden"] });
    write(root, "src/hidden/copy.ts");
    fs.symlinkSync(path.join(root, "src/hidden/copy.ts"), path.join(root, "src/alias.ts"));
    git(root, "add", "--", "src/alias.ts");
    const result = run(root);
    assert.equal(result.status, 1, result.stdout);
    assert.ok(
      result.report.findings.some((f: { code: string }) => f.code === "UNTRACKED_PHYSICAL_SOURCE")
    );
    git(root, "add", "--", "src/hidden/copy.ts");
    assert.equal(run(root).status, 0);
  });
});

test("a generated-looking alias cannot admit a private physical source", () => {
  inFixture((root) => {
    configure(root, { include: ["src/**/*.ts", ".next/types/**/*.ts"] });
    write(root, "_tasks/private.ts");
    fs.mkdirSync(path.join(root, ".next/types"), { recursive: true });
    fs.symlinkSync(path.join(root, "_tasks/private.ts"), path.join(root, ".next/types/alias.ts"));
    const result = run(root);
    assert.equal(result.status, 1, result.stdout);
    assert.equal(result.report.generatedCount, 0);
    assert.ok(
      result.report.findings.some((f: { code: string }) => f.code === "FORBIDDEN_PHYSICAL_SOURCE")
    );
  });
});

test("a directory alias is refused before walking a protected worktree", () => {
  inFixture((root) => {
    write(root, "_tasks/copied/src/file.ts");
    fs.symlinkSync(path.join(root, "_tasks/copied"), path.join(root, "src/alias"));
    git(root, "add", "--", "src/alias");
    const result = run(root);
    assert.equal(result.status, 1, result.stdout);
    assert.ok(
      result.report.findings.some((f: { code: string }) => f.code === "FORBIDDEN_PHYSICAL_SOURCE")
    );
  });
});

test("an explicit generated-looking root must resolve to a regular file", () => {
  inFixture((root) => {
    const directory = ".next/types/not-a-file.ts";
    fs.mkdirSync(path.join(root, directory), { recursive: true });
    configure(root, { files: ["src/main.ts", directory], include: [] });
    const result = run(root);
    assert.equal(result.status, 1, result.stdout);
    assert.equal(result.report.generatedCount, 0);
    assert.ok(
      result.report.findings.some(
        (f: { code: string; path: string }) => f.code === "NOT_FILE" && f.path === directory
      )
    );
  });
});

test("configuration and Git failures cannot become zero-file PASS", () => {
  inFixture((root) => {
    write(root, "tsconfig.json", "{broken");
    assert.equal(run(root).status, 2);
    configure(root);
    const result = run(root, [], { ...process.env, PATH: root });
    assert.equal(result.status, 2);
    assert.equal(result.report.status, "INCOMPLETE");
    assert.ok(result.report.findings.some((f: { code: string }) => f.code === "GIT_ERROR"));
  });
});

test("directory errors and unavailable TypeScript matcher fail closed", () => {
  inFixture((root) => {
    const source = `
      import fs from "node:fs";
      import ts from "typescript";
      import { inspectBuildScope } from ${JSON.stringify(pathToFileURL(SCRIPT).href)};
      const root = ${JSON.stringify(root)};
      const brokenFs = { ...fs, readdirSync(file, options) {
        if (file.endsWith("/src")) throw Object.assign(new Error("denied"), { code: "EACCES" });
        return fs.readdirSync(file, options);
      }};
      console.log(JSON.stringify([
        inspectBuildScope(root, { fs: brokenFs }),
        inspectBuildScope(root, { typescript: { ...ts, matchFiles: undefined } })
      ]));
    `;
    const result = spawnSync(process.execPath, ["--input-type=module"], {
      input: source,
      cwd: path.dirname(path.dirname(path.dirname(SCRIPT))),
      encoding: "utf8",
    });
    assert.equal(result.status, 0, result.stderr);
    const reports = JSON.parse(result.stdout);
    assert.equal(reports[0].status, "INCOMPLETE");
    assert.equal(reports[0].exitCode, 2);
    assert.ok(reports[0].findings.some((f: { code: string }) => f.code === "IO_ERROR"));
    assert.equal(reports[1].status, "INCOMPLETE");
    assert.ok(reports[1].findings.some((f: { code: string }) => f.code === "TYPESCRIPT_API"));
  });
});

test("an explicit max is a validated budget and JSON stays one machine-readable object", () => {
  inFixture((root) => {
    write(root, "src/second.ts");
    git(root, "add", "--", ".");
    assert.equal(run(root, ["--max", "2"]).status, 0);
    const exceeded = run(root, ["--max", "1"]);
    assert.equal(exceeded.status, 1);
    assert.ok(exceeded.report.findings.some((f: { code: string }) => f.code === "EXPLICIT_BUDGET"));
    for (const value of ["0", "-1", "1.5", "wat"])
      assert.equal(run(root, ["--max", value]).status, 2);
    assert.equal(run(root, ["--unknown"]).status, 2);
  });
});
