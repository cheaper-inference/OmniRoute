import { test, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  findRunnableAlternate,
  parseWhereCandidates,
} from "../../src/shared/services/cliRuntimeFallthrough.ts";

// #20452 — a stale/broken first claude on PATH must not hide a working later one.
const originalEnv = { ...process.env };
const root = fs.mkdtempSync(path.join(process.env.DATA_DIR || os.tmpdir(), "repro-20452-"));
after(() => {
  for (const k of Object.keys(process.env)) if (!(k in originalEnv)) delete process.env[k];
  Object.assign(process.env, originalEnv);
  fs.rmSync(root, { recursive: true, force: true });
});

test("a broken first claude on PATH must not hide a working second claude", async () => {
  const home = path.join(root, "home");
  const stale = path.join(root, "stale-npm-bin");
  const good = path.join(root, "native-bin");
  for (const d of [home, stale, good]) fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(path.join(stale, "claude"), "#!/bin/sh\necho 'not compatible' >&2\nexit 1\n", {
    mode: 0o755,
  });
  fs.writeFileSync(path.join(good, "claude"), "#!/bin/sh\necho '2.1.327 (Claude Code)'\nexit 0\n", {
    mode: 0o755,
  });

  process.env.HOME = home;
  process.env.PATH = [stale, good, "/usr/bin", "/bin"].join(path.delimiter);
  delete process.env.CLI_CLAUDE_BIN;
  delete process.env.CLI_EXTRA_PATHS;

  const mod = await import(
    pathToFileURL(path.join(process.cwd(), "src/shared/services/cliRuntime.ts")).href +
      `?case=${Date.now()}`
  );
  const status = await mod.getCliRuntimeStatus("claude");
  assert.equal(status.installed, true);
  assert.equal(status.runnable, true, `got ${status.reason} @ ${status.commandPath}`);
  assert.equal(status.commandPath, path.join(good, "claude"));
});

test("parseWhereCandidates keeps every extension match in order, de-duplicated (Windows)", () => {
  const out = parseWhereCandidates(
    [
      "C:\\Users\\u\\AppData\\Roaming\\npm\\claude",
      "C:\\Users\\u\\AppData\\Roaming\\npm\\claude.cmd",
      "C:\\Users\\u\\.local\\bin\\claude.exe",
      "c:\\users\\u\\.local\\bin\\CLAUDE.EXE",
    ].join("\r\n")
  );
  assert.deepEqual(out, [
    "C:\\Users\\u\\AppData\\Roaming\\npm\\claude.cmd",
    "C:\\Users\\u\\.local\\bin\\claude.exe",
  ]);
});

test("findRunnableAlternate skips the tried path, caps attempts and returns the first runnable", async () => {
  const seen: string[] = [];
  const check = async (p: string) => {
    seen.push(p);
    return p === "c" ? { runnable: true, version: "1" } : { runnable: false };
  };
  const hit = await findRunnableAlternate(["a", "b", "c", "d"], "A", () => true, check);
  assert.equal(hit?.commandPath, "c");
  assert.deepEqual(seen, ["b", "c"]);

  const none = await findRunnableAlternate(
    ["a", "b", "c", "d", "e"],
    null,
    () => true,
    async () => ({
      runnable: false,
    })
  );
  assert.equal(none, null);
});
