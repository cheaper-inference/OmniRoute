import assert from "node:assert/strict";
import { execFileSync, spawn, spawnSync } from "node:child_process";
import { once } from "node:events";
import { readFileSync } from "node:fs";
import { constants } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const RUNNER = join(ROOT, "scripts/dev/with-env.mjs");

function run(args: string[]) {
  const result = spawnSync(process.execPath, [RUNNER, ...args], {
    cwd: ROOT,
    encoding: "utf8",
    timeout: 10_000,
  });
  assert.ifError(result.error);
  return result;
}

test("sets one variable in the child environment", () => {
  const result = run(["WITH_ENV_A=one", "node", "-p", "process.env.WITH_ENV_A"]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.trim(), "one");
});

test("sets multiple variables and preserves an equals sign and an empty value", () => {
  const result = run([
    "WITH_ENV_A=b=c",
    "WITH_ENV_B=",
    "node",
    "-p",
    "JSON.stringify([process.env.WITH_ENV_A, process.env.WITH_ENV_B])",
  ]);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), ["b=c", ""]);
});

test("runs without assignments and passes command arguments literally", () => {
  const args = ["a space", `"double" and 'single' quotes`, "*", "$X", "A=after-command"];
  const result = run(["node", "-p", "JSON.stringify(process.argv.slice(1))", "--", ...args]);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), args);
});

test("propagates a nonzero exit code", () => {
  const result = run(["node", "-e", "process.exit(27)"]);
  assert.equal(result.status, 27, result.stderr);
});

test("reports a missing command after the assignments", () => {
  const result = run(["WITH_ENV_A=one"]);
  assert.ok(result.status && result.status !== 0);
  assert.match(result.stderr, /with-env: missing command/);
});

test("reports an executable that cannot be found", () => {
  const command = "omniroute-with-env-nonexistent-executable";
  const result = run([command]);
  assert.ok(result.status && result.status !== 0);
  assert.match(result.stderr, new RegExp(`with-env:.*${command}.*ENOENT`));
});

test(
  "propagates the signal status when the child terminates itself",
  {
    skip: process.platform === "win32" ? "Requires POSIX signal exit status" : false,
  },
  () => {
    const result = run(["node", "-e", 'process.kill(process.pid, "SIGTERM")']);
    assert.ok(
      result.signal === "SIGTERM" || result.status === 128 + constants.signals.SIGTERM,
      `expected SIGTERM or its exit code, got ${result.signal ?? result.status}\n${result.stderr}`
    );
  }
);

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  test(
    `forwards ${signal} to the child`,
    {
      skip: process.platform === "win32" ? "Requires POSIX signal delivery" : false,
      timeout: 10_000,
    },
    async (t) => {
      const runner = spawn(
        process.execPath,
        [
          RUNNER,
          "node",
          "-e",
          `process.on("${signal}", () => process.exit(42));
      process.stdout.write("ready\\n");
      setTimeout(() => process.exit(99), 5000);`,
        ],
        { cwd: ROOT, stdio: ["ignore", "pipe", "inherit"] }
      );
      t.after(() => {
        if (runner.exitCode === null && runner.signalCode === null) runner.kill("SIGKILL");
      });
      const closed = once(runner, "close");
      const ready = await Promise.race([
        once(runner.stdout, "data").then(([data]) => String(data).trim()),
        closed.then(() => ""),
      ]);
      assert.equal(ready, "ready");
      assert.ok(runner.kill(signal));
      assert.deepEqual(await closed, [42, null]);
    }
  );
}

test("no repository package manifest calls or declares cross-env", () => {
  const paths = execFileSync(
    "git",
    [
      "ls-files",
      "-z",
      "--cached",
      "--others",
      "--exclude-standard",
      "--",
      ":(glob)**/package.json",
    ],
    { cwd: ROOT, encoding: "utf8" }
  )
    .split("\0")
    .filter(Boolean);
  assert.ok(paths.includes("package.json"));
  const violations: string[] = [];
  for (const path of paths) {
    const manifest = JSON.parse(readFileSync(join(ROOT, path), "utf8"));
    for (const [name, command] of Object.entries(manifest.scripts ?? {})) {
      if (typeof command === "string" && /(?<![\w-])cross-env(?:-shell)?(?![\w-])/i.test(command)) {
        violations.push(`${path} scripts.${name}`);
      }
    }
    for (const field of [
      "dependencies",
      "devDependencies",
      "optionalDependencies",
      "peerDependencies",
    ]) {
      if (Object.hasOwn(manifest[field] ?? {}, "cross-env")) {
        violations.push(`${path} ${field}.cross-env`);
      }
    }
  }
  assert.deepEqual(violations, []);
});
