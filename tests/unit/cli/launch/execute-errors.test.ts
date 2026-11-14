import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { existsSync } from "node:fs";
import { mkdtemp, readdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { executePlan, materializeTempFiles } from "../../../../bin/cli/launch/core/execute.mjs";

const dirs: string[] = [];
async function tempDir(label: string) {
  const dir = await mkdtemp(path.join(os.tmpdir(), `omniroute-launch-${label}-`));
  dirs.push(dir);
  return dir;
}
test.after(async () => {
  for (const dir of dirs) await rm(dir, { recursive: true, force: true });
});

function makePlan(parts: Record<string, unknown> = {}) {
  return {
    planVersion: 1,
    tool: "fake",
    argv: [],
    env: { set: {}, unset: [] },
    tempFiles: [],
    needsTempDir: true,
    preflight: [],
    teardown: [],
    postExitChecks: [],
    cleanup: { removeTempDir: true, revokeSession: true },
    ...parts,
  };
}

test("materializeTempFiles: mergeBase with non-JSON contents is Internal naming the file", async () => {
  const root = await tempDir("exec-merge");
  assert.throws(
    () =>
      materializeTempFiles(
        [
          { path: "s.json", contents: "not json", mergeBase: { path: "/x", format: "json" } },
        ] as never,
        { tmpDir: root, readFile: () => "{}" }
      ),
    (error: { code?: string; message?: string; cause?: unknown }) =>
      error.code === "Internal" &&
      error.message === "temp file s.json contents are not valid JSON" &&
      error.cause instanceof SyntaxError
  );
  assert.equal(existsSync(path.join(root, "s.json")), false);
});

test("executePlan: a synchronous non-ENOENT spawn throw is Internal and removes the tmp dir", async () => {
  const root = await tempDir("exec-spawnthrow");
  await assert.rejects(
    executePlan(makePlan() as never, {
      command: "/bin/fake-tool",
      tmpRoot: root,
      signalSource: new EventEmitter(),
      warn: () => {},
      spawn: () => {
        throw new Error("boom");
      },
    }),
    (error: { code?: string; message?: string }) =>
      error.code === "Internal" && error.message === "could not start /bin/fake-tool: boom"
  );
  assert.deepEqual(await readdir(root), []);
});

test("executePlan: default warn prints scrubbed pre-spawn warnings to stderr", async (t) => {
  const root = await tempDir("exec-warn");
  const lines: string[] = [];
  const write = process.stderr.write;
  t.mock.method(process.stderr, "write", (chunk: string) => {
    lines.push(String(chunk));
    return true;
  });
  const child = new EventEmitter() as EventEmitter & { pid: number; kill: () => void };
  child.pid = 1;
  child.kill = () => {};
  const result = await executePlan(
    makePlan({
      tempFiles: [
        {
          path: "m.json",
          contents: "{}",
          mergeBase: { path: "/missing/tok-1/s.json", format: "json" },
        },
      ],
    }) as never,
    {
      command: "/bin/fake-tool",
      tmpRoot: root,
      token: "tok-1",
      signalSource: new EventEmitter(),
      readFile: () => {
        throw new Error("absent");
      },
      spawn: () => {
        setImmediate(() => child.emit("close", 0, null));
        return child;
      },
    }
  );
  t.mock.restoreAll();
  assert.equal(process.stderr.write, write);
  assert.equal(result.exitCode, 0);
  const expected =
    "merge base /missing/***/s.json is missing or not valid JSON; using launcher settings alone";
  assert.deepEqual(lines, [`omnirouter: warning: ${expected}\n`]);
  assert.deepEqual(result.warnings, [expected]);
});
