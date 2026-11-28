import assert from "node:assert/strict";
import { test } from "node:test";
import { parseAssignments, resolveCommand } from "../../../scripts/dev/with-env.mjs";

const WINDOWS_NODE = String.raw`C:\Program Files\nodejs\node.exe`;

test("parseAssignments copies the environment and reads one assignment", () => {
  const env = { A: "original", KEEP: "unchanged" };
  const result = parseAssignments(["A=updated", "node", "B=after-command"], {
    platform: "linux",
    env,
  });

  assert.deepEqual(result, {
    env: { __proto__: null, A: "updated", KEEP: "unchanged" },
    index: 1,
  });
  assert.deepEqual(env, { A: "original", KEEP: "unchanged" });
});

test("parseAssignments preserves equals signs and empty values across assignments", () => {
  const result = parseAssignments(["A=b=c", "_EMPTY=", "node"], {
    platform: "linux",
    env: {},
  });

  assert.deepEqual(result, { env: { __proto__: null, A: "b=c", _EMPTY: "" }, index: 2 });
});

test("parseAssignments starts at the command when no assignments precede it", () => {
  const result = parseAssignments(["node", "A=argument"], {
    platform: "linux",
    env: { A: "inherited" },
  });

  assert.deepEqual(result, { env: { __proto__: null, A: "inherited" }, index: 0 });
});

test("parseAssignments treats an invalid variable name as the start of the command", () => {
  const result = parseAssignments(["A=valid", "1A=x", "B=argument"], {
    platform: "linux",
    env: {},
  });

  assert.deepEqual(result, { env: { __proto__: null, A: "valid" }, index: 1 });
});

test("parseAssignments reuses existing key casing on Windows and keeps distinct keys on Linux", () => {
  const args = ["PATH=b", "NEW_VAR=c", "node"];
  const env = { Path: "a" };

  assert.deepEqual(parseAssignments(args, { platform: "win32", env }), {
    env: { __proto__: null, Path: "b", NEW_VAR: "c" },
    index: 2,
  });
  assert.deepEqual(parseAssignments(args, { platform: "linux", env }), {
    env: { __proto__: null, Path: "a", PATH: "b", NEW_VAR: "c" },
    index: 2,
  });
});

test("resolveCommand uses the supplied Node executable on Linux and Windows", () => {
  const args = ["-p", "process.version"];
  assert.deepEqual(resolveCommand("node", args, { platform: "linux", execPath: "/custom/node" }), [
    "/custom/node",
    args,
  ]);
  assert.deepEqual(resolveCommand("node", args, { platform: "win32", execPath: WINDOWS_NODE }), [
    WINDOWS_NODE,
    args,
  ]);
});

test("resolveCommand passes c8, npm, and other commands through on Linux", () => {
  const args = ["run", "arg with spaces"];
  for (const command of ["c8", "npm", "git"]) {
    assert.deepEqual(resolveCommand(command, args, { platform: "linux" }), [command, args]);
  }
});

test("resolveCommand runs the resolved c8 script with Node on Windows", () => {
  const c8Path = String.raw`C:\repo\node_modules\c8\bin\c8.js`;
  const result = resolveCommand("c8", ["--reporter=text", "node"], {
    platform: "win32",
    execPath: WINDOWS_NODE,
    resolveC8: () => c8Path,
  });

  assert.deepEqual(result, [WINDOWS_NODE, [c8Path, "--reporter=text", "node"]]);
});

test("resolveCommand uses the absolute npm-cli.js path supplied by npm on Windows", () => {
  const npmExecPath = String.raw`D:\tooling\npm\bin\npm-cli.js`;
  const result = resolveCommand("npm", ["run", "check"], {
    platform: "win32",
    execPath: WINDOWS_NODE,
    npmExecPath,
  });

  assert.deepEqual(result, [WINDOWS_NODE, [npmExecPath, "run", "check"]]);
});

test("resolveCommand falls back to npm-cli.js beside Node for invalid npm paths on Windows", () => {
  const bundledNpm = String.raw`C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js`;
  for (const npmExecPath of ["", String.raw`npm\bin\npm-cli.js`, String.raw`D:\tooling\npm.cmd`]) {
    const result = resolveCommand("npm", ["--version"], {
      platform: "win32",
      execPath: WINDOWS_NODE,
      npmExecPath,
    });

    assert.deepEqual(result, [WINDOWS_NODE, [bundledNpm, "--version"]], npmExecPath);
  }
});

test("resolveCommand passes other commands through on Windows", () => {
  const args = ["status", "--short"];
  assert.deepEqual(resolveCommand("git", args, { platform: "win32" }), ["git", args]);
});
