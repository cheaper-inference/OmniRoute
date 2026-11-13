import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {
  evaluatePostExit,
  runTeardown,
  snapshotPostExit,
} from "../../../../bin/cli/launch/core/teardown.mjs";
import { quoteShellArgs } from "../../../../bin/cli/utils/winShellArgs.mjs";

const dirs: string[] = [];
async function tempDir() {
  const dir = await mkdtemp(path.join(os.tmpdir(), "omniroute-teardown-"));
  dirs.push(dir);
  return dir;
}
test.after(async () => {
  for (const dir of dirs) await rm(dir, { recursive: true, force: true });
});

function fakeSpawn(calls: unknown[], code = 0) {
  return (cmd: string, args: string[], options: Record<string, unknown>) => {
    calls.push({ cmd, args, options });
    const child = new EventEmitter() as EventEmitter & { kill: () => void };
    child.kill = () => {};
    setImmediate(() => child.emit("close", code, null));
    return child;
  };
}

test("runTeardown substitutes ${TOOL}, picks env, gates shell on ${TOOL}", async () => {
  const calls: Array<{ cmd: string; args: string[]; options: Record<string, unknown> }> = [];
  const planEnv = { WHICH: "plan" };
  const baseEnv = { WHICH: "base" };
  const warnings = await runTeardown(
    [
      { argv: ["${TOOL}", "mcp", "remove", "a b"], timeoutMs: 1000, onError: "warn" },
      { argv: ["/bin/other", "x"], env: "base", timeoutMs: 1000, onError: "warn" },
    ],
    {
      command: "tool.cmd",
      shell: true,
      platform: "win32",
      planEnv,
      baseEnv,
      spawn: fakeSpawn(calls) as never,
    }
  );
  assert.deepEqual(warnings, []);
  assert.equal(calls[0].cmd, "tool.cmd");
  assert.deepEqual(calls[0].args, quoteShellArgs(["mcp", "remove", "a b"], "win32"));
  assert.notDeepEqual(calls[0].args, ["mcp", "remove", "a b"]);
  assert.equal(calls[0].options.shell, true);
  assert.equal(calls[0].options.env, planEnv);
  assert.equal(calls[0].options.stdio, "ignore");
  assert.equal(calls[1].cmd, "/bin/other");
  assert.deepEqual(calls[1].args, ["x"]);
  assert.equal(calls[1].options.shell, undefined);
  assert.equal(calls[1].options.env, baseEnv);
});

test("runTeardown: non-zero exit warns, ignore is silent, ENOENT warns, never throws", async () => {
  const env = { PATH: process.env.PATH };
  const warnings = await runTeardown(
    [
      { argv: [process.execPath, "-e", "process.exit(3)"], timeoutMs: 5000, onError: "warn" },
      { argv: [process.execPath, "-e", "process.exit(4)"], timeoutMs: 5000, onError: "ignore" },
      { argv: ["/definitely/not/a/binary-xyz"], timeoutMs: 5000, onError: "warn" },
      { argv: [process.execPath, "-e", "process.exit(0)"], timeoutMs: 5000, onError: "warn" },
    ],
    { planEnv: env, baseEnv: env }
  );
  assert.equal(warnings.length, 2);
  assert.match(warnings[0], /^teardown step .* -e process\.exit\(3\) failed: exit code 3$/);
  assert.match(warnings[1], /binary-xyz failed: ENOENT/);
});

test("runTeardown timeout kills the step and warns", async () => {
  const env = { PATH: process.env.PATH };
  const started = Date.now();
  const warnings = await runTeardown(
    [
      {
        argv: [process.execPath, "-e", "setTimeout(() => {}, 20000)"],
        timeoutMs: 200,
        onError: "warn",
      },
    ],
    { planEnv: env, baseEnv: env }
  );
  assert.ok(Date.now() - started < 10000);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /timed out after 200ms/);
});

test("runTeardown runs steps sequentially", async () => {
  const dir = await tempDir();
  const log = path.join(dir, "log.txt");
  const env = { PATH: process.env.PATH, LOG: log };
  const step = (n: number, wait: number) => ({
    argv: [
      process.execPath,
      "-e",
      `setTimeout(() => require("fs").appendFileSync(process.env.LOG, "${n}"), ${wait})`,
    ],
    timeoutMs: 5000,
    onError: "warn" as const,
  });
  await runTeardown([step(1, 150), step(2, 0)], { planEnv: env, baseEnv: env });
  assert.equal(await readFile(log, "utf8"), "12");
});

test("snapshotPostExit / evaluatePostExit detect changes, read-only", async () => {
  const dir = await tempDir();
  const json = path.join(dir, "settings.json");
  const raw = path.join(dir, "raw.txt");
  const absent = path.join(dir, "absent.txt");
  await writeFile(json, JSON.stringify({ a: { b: 1 }, other: 1 }));
  await writeFile(raw, "one");
  const checks = [
    {
      kind: "json-key-unchanged",
      path: json,
      key: "a.b",
      message: "a.b changed",
      revertHint: "set a.b back",
    },
    {
      kind: "json-key-unchanged",
      path: json,
      key: "other",
      message: "other changed",
      revertHint: "x",
    },
    { kind: "file-unchanged", path: raw, message: "raw changed" },
    { kind: "file-unchanged", path: absent, message: "absent changed" },
  ] as const;
  const snapshot = snapshotPostExit(checks as never);
  assert.equal(snapshot[0].value, "1");
  assert.ok(Buffer.isBuffer(snapshot[2].bytes));
  assert.equal(snapshot[3].bytes, null);
  assert.deepEqual(evaluatePostExit(checks as never, snapshot), []);

  await writeFile(json, JSON.stringify({ a: { b: 2 }, other: 1 }));
  await writeFile(raw, "two");
  await writeFile(absent, "now here");
  assert.deepEqual(evaluatePostExit(checks as never, snapshot), [
    "a.b changed (revert: set a.b back)",
    "raw changed",
    "absent changed",
  ]);
  assert.equal(await readFile(raw, "utf8"), "two");
});

test("post-exit checks treat missing / unparseable files as undefined and accept readFile", () => {
  const files: Record<string, string> = { "/x.json": "{bad" };
  const readFileFake = (p: string) => {
    if (!(p in files)) throw new Error("ENOENT");
    return files[p];
  };
  const checks = [
    {
      kind: "json-key-unchanged",
      path: "/x.json",
      key: "k",
      message: "k changed",
      revertHint: "h",
    },
  ];
  const snapshot = snapshotPostExit(checks as never, { readFile: readFileFake });
  assert.equal(snapshot[0].value, undefined);
  files["/x.json"] = JSON.stringify({ k: "v" });
  assert.deepEqual(evaluatePostExit(checks as never, snapshot, { readFile: readFileFake }), [
    "k changed (revert: h)",
  ]);
  assert.deepEqual(evaluatePostExit(checks as never, undefined as never), []);
});
