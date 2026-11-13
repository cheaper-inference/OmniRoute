import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { existsSync, readdirSync, statSync } from "node:fs";
import { mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

import {
  buildChildEnv,
  defaultReadAsset,
  executePlan,
  materializeTempFiles,
  substitutePlan,
} from "../../../../bin/cli/launch/core/execute.mjs";

const dirs: string[] = [];
async function tempDir(label = "exec") {
  const dir = await mkdtemp(path.join(os.tmpdir(), `omniroute-launch-${label}-`));
  dirs.push(dir);
  return dir;
}
test.after(async () => {
  for (const dir of dirs) await rm(dir, { recursive: true, force: true });
});

const isPosix = process.platform !== "win32";
const TOKEN = "sk-session-secret-123";

function makePlan(parts: Record<string, unknown> = {}) {
  return {
    planVersion: 1,
    tool: "fake",
    argv: [],
    env: { set: {}, unset: [] },
    tempFiles: [],
    needsTempDir: true,
    secretSites: [],
    notes: [],
    warnings: [],
    preflight: [],
    teardown: [],
    postExitChecks: [],
    modelList: { strategy: "inject", viewHash: "h", injected: 0 },
    cleanup: { removeTempDir: true, revokeSession: true },
    ...parts,
  };
}

function baseOpts(extra: Record<string, unknown> = {}) {
  return {
    command: process.execPath,
    shell: false,
    baseEnv: { PATH: process.env.PATH },
    token: TOKEN,
    stdio: "ignore",
    signalSource: new EventEmitter(),
    warn: () => {},
    ...extra,
  };
}

async function waitForFile(file: string, timeoutMs = 5000) {
  const deadline = Date.now() + timeoutMs;
  while (!existsSync(file) && Date.now() < deadline) await delay(10);
  assert.ok(existsSync(file), `timed out waiting for ${file}`);
}

test("substitutePlan replaces exact placeholders only; ${TOOL} only in teardown", () => {
  const plan = makePlan({
    argv: ["--config", "${TMP}/c.json", "${TOOL}", "${OMNIROUTE_API_KEY:-x}", "${TOKEN}"],
    env: { set: { A: "${STATE}/s", K: "${TOKEN}", L: "$VAR ${{ secrets.X }}" }, unset: ["U"] },
    tempFiles: [{ path: "a.json", contents: "${TMP} ${TOKEN} ${ASSET:x/y.md} ${TOOL}" }],
    cwd: "${TMP}",
    preflight: [{ kind: "env-equals", key: "K", value: "${TOKEN}", why: "${TMP}" }],
    postExitChecks: [{ kind: "file-unchanged", path: "${STATE}/f", message: "m" }],
    teardown: [{ argv: ["${TOOL}", "rm", "${TMP}/x"], timeoutMs: 1, onError: "warn" }],
  });
  const frozen = JSON.stringify(plan);
  const s = substitutePlan(plan as never, {
    tmpDir: "/t",
    stateDir: "/s",
    token: "tok",
    command: "/bin/tool",
  });
  assert.equal(JSON.stringify(plan), frozen, "input not mutated");
  assert.deepEqual(s.argv, ["--config", "/t/c.json", "${TOOL}", "${OMNIROUTE_API_KEY:-x}", "tok"]);
  assert.deepEqual(s.env.set, { A: "/s/s", K: "tok", L: "$VAR ${{ secrets.X }}" });
  assert.equal(s.tempFiles[0].contents, "/t tok ${ASSET:x/y.md} ${TOOL}");
  assert.equal(s.cwd, "/t");
  assert.equal((s.preflight[0] as { value: string }).value, "tok");
  assert.equal((s.preflight[0] as { why: string }).why, "${TMP}", "why is not substituted");
  assert.equal((s.postExitChecks[0] as { path: string }).path, "/s/f");
  assert.deepEqual(s.teardown[0].argv, ["/bin/tool", "rm", "/t/x"]);

  const kept = substitutePlan(plan as never, { tmpDir: null, stateDir: null, token: "tok" });
  assert.equal(kept.argv[1], "${TMP}/c.json");
  assert.equal(kept.env.set.A, "${STATE}/s");
});

test("buildChildEnv: unset, set, extraEnv", () => {
  const base = { KEEP: "1", DROP: "2", OVER: "base" };
  const env = buildChildEnv(base, { set: { OVER: "plan", NEW: "n" }, unset: ["DROP"] }, { X: "e" });
  assert.deepEqual(env, { KEEP: "1", OVER: "plan", NEW: "n", X: "e" });
  assert.equal(base.DROP, "2", "base not mutated");
});

test("defaultReadAsset: missing asset is Internal naming the absolute path", () => {
  assert.throws(
    () => defaultReadAsset("does-not-exist/nope.md"),
    (error: { code?: string; message?: string }) =>
      error.code === "Internal" &&
      /launcher asset missing: .*bin[\\/]cli[\\/]launch[\\/]assets[\\/]does-not-exist[\\/]nope\.md/.test(
        error.message ?? ""
      )
  );
  assert.throws(() => defaultReadAsset("../escape.md"), { code: "Internal" });
});

test("materializeTempFiles with the default reader fails on a missing asset ref", async () => {
  const tmp = await tempDir("mat");
  assert.throws(
    () =>
      materializeTempFiles([{ path: "x.txt", contents: "${ASSET:missing/thing.md}" }] as never, {
        tmpDir: tmp,
      }),
    /launcher asset missing: .*missing[\\/]thing\.md/
  );
  assert.throws(
    () => materializeTempFiles([{ path: "../out.txt", contents: "x" }] as never, { tmpDir: tmp }),
    { code: "Internal" }
  );
});

test("executePlan end to end: env, argv, files, modes, assets, mergeBase, state, exit code", async (t) => {
  if (!isPosix) return t.skip("POSIX file modes");
  const root = await tempDir("root");
  const stateDir = path.join(await tempDir("state"), "nested", "state");
  const capture = path.join(await tempDir("cap"), "out.json");
  const homeSettings = path.join(await tempDir("home"), "settings.json");
  await writeFile(homeSettings, JSON.stringify({ keep: true, nested: { a: 1, b: 1 } }));

  const assets: Record<string, string> = {
    "codex/base.md": "BASE ${TOKEN} ${TMP}\n",
    "pi/ext.ts": 'export const x = "q";',
  };
  const readAsset = (rel: string) => {
    if (!(rel in assets)) throw new Error(`no asset ${rel}`);
    return assets[rel];
  };

  const script = `
const fs = require("fs");
const tmp = process.env.TMPD;
const st = (p) => (fs.statSync(p).mode & 0o777).toString(8);
fs.writeFileSync(process.env.CAPTURE, JSON.stringify({
  argv: process.argv.slice(1),
  env: { KEEP: process.env.KEEP, DROP: process.env.DROP, KEY: process.env.KEY, EXTRA: process.env.EXTRA },
  tmpMode: st(tmp),
  cfg: fs.readFileSync(tmp + "/conf/a.json", "utf8"), cfgMode: st(tmp + "/conf/a.json"),
  subMode: st(tmp + "/conf"),
  hook: fs.readFileSync(tmp + "/hook.sh", "utf8"), hookMode: st(tmp + "/hook.sh"),
  copy: fs.readFileSync(tmp + "/base.md", "utf8"),
  merged: JSON.parse(fs.readFileSync(tmp + "/settings.json", "utf8")),
  missingMerged: JSON.parse(fs.readFileSync(tmp + "/m2.json", "utf8")),
  state: fs.readFileSync(process.env.STATEF, "utf8"),
}));
process.exit(7);`;

  const plan = makePlan({
    argv: [
      "-e",
      script,
      "--",
      "--cfg",
      "${TMP}/conf/a.json",
      "${OMNIROUTE_API_KEY:-omniroute-local}",
    ],
    env: {
      set: {
        TMPD: "${TMP}",
        KEY: "${TOKEN}",
        CAPTURE: capture,
        STATEF: "${STATE}/s.txt",
      },
      unset: ["DROP"],
    },
    tempFiles: [
      {
        path: "conf/a.json",
        contents: '{"key":"${TOKEN}","doc":${ASSET:pi/ext.ts:json},"lit":"${HOME}"}',
      },
      { path: "hook.sh", contents: "#!/bin/sh\n${ASSET:codex/base.md}", mode: 0o700 },
      { path: "base.md", asset: "codex/base.md" },
      {
        path: "settings.json",
        contents: JSON.stringify({ nested: { b: 2 }, added: "${TOKEN}" }),
        mergeBase: { path: homeSettings, format: "json" },
      },
      {
        path: "m2.json",
        contents: JSON.stringify({ only: 1 }),
        mergeBase: { path: path.join(root, "absent.json"), format: "json" },
      },
      { path: "s.txt", root: "state", contents: "state ${TMP}" },
    ],
  });

  let printed: string[] = [];
  const result = await executePlan(
    plan as never,
    baseOpts({
      baseEnv: { PATH: process.env.PATH, KEEP: "k", DROP: "d" },
      extraEnv: { EXTRA: "e" },
      tmpRoot: root,
      stateDir,
      readAsset,
      warn: (m: string) => printed.push(m),
    })
  );
  assert.equal(result.exitCode, 7);
  assert.equal(result.forwardedSignal, null);
  assert.ok(result.tmpDir && result.tmpDir.startsWith(root));
  assert.equal(existsSync(result.tmpDir), false, "tmp dir removed");
  assert.deepEqual(await readdir(root), []);

  const seen = JSON.parse(await readFile(capture, "utf8"));
  const tmp = result.tmpDir as string;
  assert.deepEqual(seen.argv, [
    "--cfg",
    `${tmp}/conf/a.json`,
    "${OMNIROUTE_API_KEY:-omniroute-local}",
  ]);
  assert.deepEqual(seen.env, { KEEP: "k", KEY: TOKEN, EXTRA: "e" });
  assert.equal(seen.tmpMode, "700");
  assert.equal(seen.subMode, "700");
  assert.equal(seen.cfgMode, "600");
  assert.equal(seen.hookMode, "700");
  assert.deepEqual(JSON.parse(seen.cfg), { key: TOKEN, doc: assets["pi/ext.ts"], lit: "${HOME}" });
  assert.equal(seen.hook, "#!/bin/sh\nBASE ${TOKEN} ${TMP}\n", "asset text stays literal");
  assert.equal(seen.copy, assets["codex/base.md"], "asset copy is verbatim");
  assert.deepEqual(seen.merged, { keep: true, nested: { a: 1, b: 2 }, added: TOKEN });
  assert.deepEqual(seen.missingMerged, { only: 1 });
  assert.equal(seen.state, `state ${tmp}`);

  // state file survives the tmp removal, base file untouched
  const stateFile = path.join(stateDir, "s.txt");
  assert.equal(await readFile(stateFile, "utf8"), `state ${tmp}`);
  assert.equal(statSync(stateDir).mode & 0o777, 0o700);
  assert.equal(statSync(stateFile).mode & 0o777, 0o600);
  assert.deepEqual(JSON.parse(await readFile(homeSettings, "utf8")), {
    keep: true,
    nested: { a: 1, b: 1 },
  });

  assert.equal(result.warnings.length, 1);
  assert.match(result.warnings[0], /absent\.json is missing or not valid JSON/);
  assert.deepEqual(printed, result.warnings, "pre-spawn warnings printed before spawn");
  printed = [];
});

test("preflight failure: PreflightFailed, tmp removed, child never spawned", async () => {
  const root = await tempDir("pf");
  let spawned = 0;
  await assert.rejects(
    executePlan(
      makePlan({
        env: { set: { MUST: "no" }, unset: [] },
        tempFiles: [{ path: "a.txt", contents: "x" }],
        preflight: [{ kind: "env-equals", key: "MUST", value: "yes", why: "MUST must be yes" }],
      }) as never,
      baseOpts({
        tmpRoot: root,
        spawn: () => {
          spawned += 1;
          throw new Error("should not spawn");
        },
      })
    ),
    (error: { code?: string; message?: string }) =>
      error.code === "PreflightFailed" && /MUST must be yes/.test(error.message ?? "")
  );
  assert.equal(spawned, 0);
  assert.deepEqual(await readdir(root), []);
});

test("teardown runs before tmp removal with the plan env; afterExit sees tmp", async () => {
  const root = await tempDir("td");
  const out = path.join(await tempDir("tdout"), "teardown.json");
  let sawTmpInAfterExit: boolean | undefined;
  let afterExitArgs: unknown;
  const result = await executePlan(
    makePlan({
      argv: ["-e", "process.exit(0)"],
      env: { set: { MARK: "${TMP}/marker.txt", OUT: out }, unset: [] },
      tempFiles: [{ path: "marker.txt", contents: "m" }],
      teardown: [
        {
          argv: [
            "${TOOL}",
            "-e",
            `const fs = require("fs");
fs.writeFileSync(process.env.OUT, JSON.stringify({ exists: fs.existsSync(process.env.MARK), mark: process.env.MARK }));`,
          ],
          timeoutMs: 10000,
          onError: "warn",
        },
        {
          argv: [process.execPath, "-e", "setTimeout(() => {}, 20000)"],
          timeoutMs: 200,
          onError: "warn",
        },
      ],
    }) as never,
    baseOpts({
      tmpRoot: root,
      afterExit: async (info: unknown) => {
        afterExitArgs = info;
        sawTmpInAfterExit = existsSync(path.join(liveTmp(root), "marker.txt"));
        throw new Error("hook boom");
      },
    })
  );
  const seen = JSON.parse(await readFile(out, "utf8"));
  assert.equal(seen.exists, true);
  assert.equal(seen.mark, path.join(result.tmpDir as string, "marker.txt"));
  assert.equal(sawTmpInAfterExit, true);
  assert.deepEqual(afterExitArgs, { exitCode: 0, signal: null });
  assert.equal(result.warnings.length, 2);
  assert.match(result.warnings[0], /timed out after 200ms/);
  assert.match(result.warnings[1], /afterExit hook failed: hook boom/);
  assert.equal(existsSync(result.tmpDir as string), false);
});

// tmp dir under a dedicated root: the single child entry while the run is live.
function liveTmp(root: string) {
  const entries = readdirSync(root);
  assert.equal(entries.length, 1);
  return path.join(root, entries[0]);
}

test("post-exit checks warn when the tool edits watched files; token scrubbed", async () => {
  const dir = await tempDir("pe");
  const json = path.join(dir, "cfg.json");
  const raw = path.join(dir, "raw.txt");
  await writeFile(json, JSON.stringify({ model: "a" }));
  await writeFile(raw, "before");
  const script = `const fs = require("fs");
fs.writeFileSync(${JSON.stringify(json)}, JSON.stringify({ model: "b" }));
fs.writeFileSync(${JSON.stringify(raw)}, "after");`;
  const result = await executePlan(
    makePlan({
      needsTempDir: false,
      argv: ["-e", script],
      postExitChecks: [
        {
          kind: "json-key-unchanged",
          path: json,
          key: "model",
          message: `model changed ${TOKEN}`,
          revertHint: "reset it",
        },
        { kind: "file-unchanged", path: raw, message: "raw changed" },
      ],
    }) as never,
    baseOpts()
  );
  assert.equal(result.tmpDir, null);
  assert.deepEqual(result.warnings, ["model changed *** (revert: reset it)", "raw changed"]);
});

test("cleanup.removeTempDir false keeps the tmp dir", async () => {
  const root = await tempDir("keep");
  const result = await executePlan(
    makePlan({
      argv: ["-e", "0"],
      tempFiles: [{ path: "x.txt", contents: "x" }],
      cleanup: { removeTempDir: false, revokeSession: true },
    }) as never,
    baseOpts({ tmpRoot: root })
  );
  assert.equal(existsSync(path.join(result.tmpDir as string, "x.txt")), true);
});

test("SIGTERM from signalSource is forwarded: exit 143, tmp removed", async (t) => {
  if (!isPosix) return t.skip("POSIX signals");
  const root = await tempDir("sig");
  const ready = path.join(await tempDir("sigready"), "ready");
  const signals = new EventEmitter();
  const run = executePlan(
    makePlan({
      argv: [
        "-e",
        `require("fs").writeFileSync(process.env.READY, "1"); setInterval(() => {}, 1000);`,
      ],
      env: { set: { READY: ready }, unset: [] },
      tempFiles: [{ path: "x", contents: "x" }],
    }) as never,
    baseOpts({ tmpRoot: root, signalSource: signals, signalTimeoutMs: 5000 })
  );
  await waitForFile(ready);
  assert.equal(signals.listenerCount("SIGTERM"), 1);
  signals.emit("SIGTERM");
  signals.emit("SIGINT"); // first signal wins
  const result = await run;
  assert.equal(result.exitCode, 143);
  assert.equal(result.forwardedSignal, "SIGTERM");
  assert.equal(result.signal, "SIGTERM");
  assert.deepEqual(await readdir(root), []);
  for (const name of ["SIGINT", "SIGTERM", "SIGHUP"]) assert.equal(signals.listenerCount(name), 0);
});

test("SIGKILL escalation when the child ignores SIGTERM", async (t) => {
  if (!isPosix) return t.skip("POSIX signals");
  const ready = path.join(await tempDir("killready"), "ready");
  const signals = new EventEmitter();
  const started = Date.now();
  const run = executePlan(
    makePlan({
      needsTempDir: false,
      argv: [
        "-e",
        `process.on("SIGTERM", () => {}); require("fs").writeFileSync(process.env.READY, "1"); setInterval(() => {}, 1000);`,
      ],
      env: { set: { READY: ready }, unset: [] },
    }) as never,
    baseOpts({ signalSource: signals, signalTimeoutMs: 200 })
  );
  await waitForFile(ready);
  signals.emit("SIGTERM");
  const result = await run;
  assert.equal(result.exitCode, 143);
  assert.equal(result.signal, "SIGKILL");
  assert.ok(Date.now() - started < 10000);
});

test("child signal without forwarding maps to 128+n", async (t) => {
  if (!isPosix) return t.skip("POSIX signals");
  const result = await executePlan(
    makePlan({
      needsTempDir: false,
      argv: ["-e", `process.kill(process.pid, "SIGTERM")`],
    }) as never,
    baseOpts()
  );
  assert.equal(result.exitCode, 143);
  assert.equal(result.forwardedSignal, null);
});

test("ENOENT -> ToolNotFound and tmp removed; onSpawn errors become warnings", async () => {
  const root = await tempDir("enoent");
  await assert.rejects(
    executePlan(
      makePlan({ tempFiles: [{ path: "a", contents: "a" }] }) as never,
      baseOpts({ command: "/definitely/not/here/tool-xyz", tmpRoot: root })
    ),
    (error: { code?: string; message?: string }) =>
      error.code === "ToolNotFound" && /tool-xyz/.test(error.message ?? "")
  );
  assert.deepEqual(await readdir(root), []);

  let pid: number | undefined;
  const result = await executePlan(
    makePlan({ needsTempDir: false, argv: ["-e", "0"] }) as never,
    baseOpts({
      onSpawn: async (child: { pid?: number }) => {
        pid = child.pid;
        throw new Error("spawn hook");
      },
    })
  );
  assert.ok(typeof pid === "number");
  assert.equal(result.exitCode, 0);
  assert.deepEqual(result.warnings, ["onSpawn hook failed: spawn hook"]);
});

test("tempDirs (1.2) are created with their mode under tmp and state before spawn", async () => {
  const root = await tempDir("dirs");
  const stateDir = path.join(await tempDir("dirsstate"), "launch", "fake");
  const seen: Record<string, { isDir: boolean; mode: number }> = {};
  let tmpAtSpawn: string | undefined;
  const result = await executePlan(
    makePlan({
      env: { set: { LOCKS: "${TMP}/locks" }, unset: [] },
      tempDirs: [
        { path: "locks" },
        { path: "deep/er/dir", mode: 0o755 },
        { path: "data/cache", root: "state", mode: 0o750 },
      ],
      cleanup: { removeTempDir: false, revokeSession: true },
    }) as never,
    baseOpts({
      tmpRoot: root,
      stateDir,
      spawn: (_command: string, _args: string[], options: { env: Record<string, string> }) => {
        tmpAtSpawn = path.dirname(options.env.LOCKS);
        for (const [key, dir] of [
          ["locks", path.join(tmpAtSpawn, "locks")],
          ["deep", path.join(tmpAtSpawn, "deep", "er", "dir")],
          ["state", path.join(stateDir, "data", "cache")],
        ]) {
          const stat = existsSync(dir) ? statSync(dir) : undefined;
          seen[key] = { isDir: Boolean(stat?.isDirectory()), mode: (stat?.mode ?? 0) & 0o777 };
        }
        const child = new EventEmitter() as EventEmitter & { pid?: number; kill: () => void };
        child.pid = 4242;
        child.kill = () => {};
        setImmediate(() => child.emit("close", 0, null));
        return child;
      },
    })
  );
  assert.equal(result.exitCode, 0);
  assert.equal(tmpAtSpawn, result.tmpDir);
  for (const key of ["locks", "deep", "state"]) assert.equal(seen[key].isDir, true, key);
  if (isPosix) {
    assert.equal(seen.locks.mode, 0o700, "default mode 0700");
    assert.equal(seen.deep.mode, 0o755);
    assert.equal(seen.state.mode, 0o750);
  }
});

test("tempDirs escaping their root fail before spawn and remove tmp", async () => {
  const root = await tempDir("dirsbad");
  let spawned = 0;
  await assert.rejects(
    executePlan(
      makePlan({ tempDirs: [{ path: "../escape" }] }) as never,
      baseOpts({
        tmpRoot: root,
        spawn: () => {
          spawned += 1;
          throw new Error("should not spawn");
        },
      })
    ),
    (error: { code?: string }) => error.code === "Internal"
  );
  assert.equal(spawned, 0);
  assert.deepEqual(await readdir(root), []);
});
