import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const DIAGNOSTIC = "src/example.ts(1,1): error TS2339: Property 'missing' does not exist.\n";

function fixture(t, scope) {
  const root = mkdtempSync(path.join(tmpdir(), "qg-typecheck-result-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const config =
    scope === "open-sse" ? "open-sse/tsconfig.json" : `tsconfig.typecheck-${scope}.json`;
  const baseline = path.join(root, `config/quality/${scope}-typecheck-baseline.json`);
  for (const dir of ["bin", "open-sse", "config/quality", "node_modules/typescript/bin"]) {
    mkdirSync(path.join(root, dir), { recursive: true });
  }
  writeFileSync(path.join(root, config), "{}\n");
  writeFileSync(path.join(root, "package.json"), '{"private":true}\n');
  writeFileSync(path.join(root, "node_modules/typescript/package.json"), '{"name":"typescript"}\n');
  writeFileSync(baseline, JSON.stringify({ "src/example.ts": { TS2339: 1 } }) + "\n");
  const compiler = `#!/usr/bin/env node
process.stdout.write(process.env.QG_TSC_STDOUT || "");
process.stderr.write(process.env.QG_TSC_STDERR || "");
if (process.env.QG_TSC_SIGNAL) process.kill(process.pid, process.env.QG_TSC_SIGNAL);
else process.exit(Number(process.env.QG_TSC_EXIT || "0"));
`;
  // The compiler boundary is controlled, but the real gate CLI and baseline IO run.
  writeFileSync(path.join(root, "bin/npx"), compiler, { mode: 0o755 });
  writeFileSync(path.join(root, "node_modules/typescript/bin/tsc"), compiler);
  return {
    root,
    config: path.join(root, config),
    baseline,
    compiler: path.join(root, "node_modules/typescript/bin/tsc"),
    run(env, args = []) {
      return spawnSync(
        process.execPath,
        [path.join(ROOT, `scripts/check/check-${scope}-typecheck.mjs`), ...args],
        {
          cwd: root,
          env: {
            ...process.env,
            PATH: `${path.join(root, "bin")}${path.delimiter}${process.env.PATH}`,
            ...env,
          },
          encoding: "utf8",
          timeout: 15000,
        }
      );
    },
  };
}

test("the installed TypeScript compiler still reports real source regressions", (t) => {
  const project = fixture(t, "dashboard");
  mkdirSync(path.join(project.root, "src"));
  writeFileSync(
    project.config,
    JSON.stringify({
      compilerOptions: { types: [], noLib: true, noEmit: true },
      files: ["minimal-types.d.ts", "src/example.ts"],
    })
  );
  // This compiler-process contract only needs object property diagnostics. Keep
  // unrelated DOM/standard-library parsing outside the subprocess timeout budget.
  writeFileSync(
    path.join(project.root, "minimal-types.d.ts"),
    [
      "interface Array<T> { length: number; [index: number]: T }",
      "interface Boolean {}",
      "interface CallableFunction {}",
      "interface Function {}",
      "interface IArguments {}",
      "interface NewableFunction {}",
      "interface Number {}",
      "interface Object {}",
      "interface RegExp {}",
      "interface String {}",
    ].join("\n")
  );
  writeFileSync(
    project.compiler,
    `require(${JSON.stringify(path.join(ROOT, "node_modules/typescript/bin/tsc"))});\n`
  );
  const source = path.join(project.root, "src/example.ts");
  writeFileSync(source, "const value = {};\nvalue.missing;\n");
  const baselined = project.run({});
  assert.equal(baselined.error, undefined);
  assert.equal(baselined.status, 0, baselined.stdout + baselined.stderr);
  assert.match(baselined.stdout, /dashboardTypecheckErrors=1/);
  writeFileSync(source, "const value = {};\nvalue.missing;\nvalue.alsoMissing;\n");
  const regression = project.run({});
  assert.equal(regression.error, undefined);
  assert.equal(regression.status, 1, regression.stdout + regression.stderr);
  assert.match(regression.stderr, /baseline 1, live 2/);
});

for (const scope of ["dashboard", "api", "open-sse"]) {
  for (const [label, env] of [
    ["exit without diagnostics", { QG_TSC_EXIT: "1" }],
    ["unexpected exit with partial diagnostics", { QG_TSC_STDOUT: DIAGNOSTIC, QG_TSC_EXIT: "134" }],
    [
      "global error after file diagnostics",
      { QG_TSC_STDOUT: DIAGNOSTIC + "error TS18003: No inputs.\n", QG_TSC_EXIT: "2" },
    ],
    [
      "stderr failure after file diagnostics",
      {
        QG_TSC_STDOUT: DIAGNOSTIC,
        QG_TSC_STDERR: "FATAL ERROR: out of memory\n",
        QG_TSC_EXIT: "2",
      },
    ],
    ["contradictory successful exit", { QG_TSC_STDOUT: DIAGNOSTIC, QG_TSC_EXIT: "0" }],
  ]) {
    test(`${scope} rejects ${label} and preserves the baseline`, (t) => {
      const project = fixture(t, scope);
      const before = readFileSync(project.baseline, "utf8");
      const result = project.run(env, ["--update"]);
      assert.equal(result.error, undefined);
      assert.notEqual(result.status, 0, result.stdout + result.stderr);
      assert.match(result.stderr, /did not produce a complete baseline-compatible result/);
      assert.equal(readFileSync(project.baseline, "utf8"), before);
    });
  }

  for (const code of [0, 1, 2]) {
    test(`${scope} accepts a completed compiler result with exit ${code}`, (t) => {
      const project = fixture(t, scope);
      const result = project.run({
        QG_TSC_STDOUT: code ? DIAGNOSTIC : "",
        QG_TSC_EXIT: String(code),
      });
      assert.equal(result.error, undefined);
      assert.equal(result.status, 0, result.stdout + result.stderr);
      assert.match(result.stdout, /\bOK\b/);
    });
  }

  test(`${scope} still rejects a new diagnostic count`, (t) => {
    const project = fixture(t, scope);
    const result = project.run({ QG_TSC_STDOUT: DIAGNOSTIC.repeat(2), QG_TSC_EXIT: "2" });
    assert.equal(result.error, undefined);
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stderr, /baseline 1, live 2/);
  });

  test(`${scope} does not fall back to npx when its local compiler is missing`, (t) => {
    const project = fixture(t, scope);
    rmSync(project.compiler);
    const result = project.run({ QG_TSC_EXIT: "0" });
    assert.equal(result.error, undefined);
    assert.notEqual(result.status, 0, result.stdout + result.stderr);
  });

  test(`${scope} can update a baseline after a completed clean run`, (t) => {
    const project = fixture(t, scope);
    const result = project.run({ QG_TSC_EXIT: "0" }, ["--update"]);
    assert.equal(result.error, undefined);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.deepEqual(JSON.parse(readFileSync(project.baseline, "utf8")), {});
  });
}

test("dashboard rejects a terminated compiler even after baselined diagnostics", (t) => {
  const project = fixture(t, "dashboard");
  const before = readFileSync(project.baseline, "utf8");
  const result = project.run({ QG_TSC_STDOUT: DIAGNOSTIC, QG_TSC_SIGNAL: "SIGTERM" });
  assert.equal(result.error, undefined);
  assert.notEqual(result.status, 0, result.stdout + result.stderr);
  assert.doesNotMatch(result.stdout, /\bOK\b/);
  assert.equal(readFileSync(project.baseline, "utf8"), before);
});

test("dashboard rejects global configuration errors before updating a baseline", (t) => {
  const project = fixture(t, "dashboard");
  const before = readFileSync(project.baseline, "utf8");
  const result = project.run(
    { QG_TSC_STDOUT: "error TS18003: No inputs were found in config file.\n", QG_TSC_EXIT: "2" },
    ["--update"]
  );
  assert.equal(result.error, undefined);
  assert.notEqual(result.status, 0, result.stdout + result.stderr);
  assert.equal(readFileSync(project.baseline, "utf8"), before);
});

for (const scope of ["api", "open-sse"]) {
  test(`${scope} rejects a terminated compiler without rewriting the baseline`, (t) => {
    const project = fixture(t, scope);
    const before = readFileSync(project.baseline, "utf8");
    const result = project.run({ QG_TSC_STDOUT: DIAGNOSTIC, QG_TSC_SIGNAL: "SIGTERM" }, [
      "--update",
    ]);
    assert.equal(result.error, undefined);
    assert.notEqual(result.status, 0, result.stdout + result.stderr);
    assert.equal(readFileSync(project.baseline, "utf8"), before);
  });
}
