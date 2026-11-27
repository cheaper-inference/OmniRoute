import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  PACKED_TARBALL_ENV,
  makeFakeRoot,
  makeFixtureTarball,
} from "../helpers/packedTarballGate.ts";

/**
 * #20643: check:install-upgrade called `process.exit()` inside its `try`, so the `finally` that
 * removes its work directory never ran and every run left `omniroute-install-upgrade-*` (two
 * full installs of the package) on the runner. These run the real gate end to end with `npm`
 * replaced by a fake whose `install -g --prefix <p> <spec>` drops a tiny `omniroute` server into
 * `<p>/bin`: it creates a SQLite database in DATA_DIR and answers the health probe with a version.
 * That is enough for the gate to reach its PASS and its FAIL verdicts, and to check that the
 * work directory is gone after either.
 */

const SCRIPT_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../scripts/check/check-install-upgrade.mjs"
);

const VERSION = "3.8.55";
const PREVIOUS = "3.8.54";

// CommonJS on purpose: the installed bin has no extension, so Node must not have to guess.
const FAKE_SERVER = `#!/usr/bin/env node
const http = require("node:http");
const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");
const port = Number(process.argv[process.argv.indexOf("--port") + 1]);
const db = new DatabaseSync(path.join(process.env.DATA_DIR, "storage.sqlite"));
db.exec("CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT)");
db.close();
http
  .createServer((req, res) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ status: "ok", version: __VERSION__ }));
  })
  .listen(port, "127.0.0.1");
process.on("SIGTERM", () => process.exit(0));
`;

// `npm install -g --prefix <prefix> ... <spec>`: install the fake server, reporting the version
// named by an `omniroute@<v>` spec, or FAKE_TARBALL_VERSION for the packed tarball.
const FAKE_NPM = `#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const args = process.argv.slice(2);
fs.appendFileSync(process.env.NPM_SHIM_LOG, args.join(" ") + "\\n");
if (args[0] !== "install") process.exit(0);
const prefix = args[args.indexOf("--prefix") + 1];
const spec = args[args.length - 1];
const version = spec.startsWith("omniroute@")
  ? spec.slice("omniroute@".length)
  : process.env.FAKE_TARBALL_VERSION;
fs.mkdirSync(path.join(prefix, "bin"), { recursive: true });
const bin = path.join(prefix, "bin", "omniroute");
fs.writeFileSync(bin, process.env.FAKE_SERVER_SOURCE.replace("__VERSION__", JSON.stringify(version)));
fs.chmodSync(bin, 0o755);
`;

function runGate(root: string, args: string[], env: Record<string, string>) {
  const shimDir = mkdtempSync(path.join(os.tmpdir(), "install-upgrade-fake-npm-"));
  const npmLog = path.join(shimDir, "npm-calls.log");
  writeFileSync(npmLog, "");
  writeFileSync(path.join(shimDir, "npm"), FAKE_NPM, { mode: 0o755 });
  try {
    const run = spawnSync(process.execPath, [SCRIPT_PATH, ...args], {
      cwd: root,
      env: {
        ...process.env,
        ...env,
        PATH: `${shimDir}${path.delimiter}${process.env.PATH ?? ""}`,
        NPM_SHIM_LOG: npmLog,
        FAKE_SERVER_SOURCE: FAKE_SERVER,
      },
      encoding: "utf8",
      timeout: 120_000,
    });
    return { status: run.status, stdout: run.stdout, stderr: run.stderr };
  } finally {
    rmSync(shimDir, { recursive: true, force: true });
  }
}

function withGate(
  fn: (ctx: { root: string; workDir: string; tarball: string }) => void
): () => void {
  return () => {
    const root = makeFakeRoot({ name: "omniroute", version: VERSION });
    const workDir = mkdtempSync(path.join(os.tmpdir(), "install-upgrade-cleanup-workdir-"));
    try {
      const tarball = makeFixtureTarball(root, { name: "omniroute", version: VERSION });
      fn({ root, workDir, tarball });
    } finally {
      rmSync(root, { recursive: true, force: true });
      rmSync(workDir, { recursive: true, force: true });
    }
  };
}

const leftovers = (workDir: string) =>
  readdirSync(workDir).filter((name) => name.startsWith("omniroute-install-upgrade-"));

test(
  "a passing run (clean install + upgrade) removes its work directory",
  withGate(({ root, workDir, tarball }) => {
    const run = runGate(root, ["--from", PREVIOUS], {
      [PACKED_TARBALL_ENV]: tarball,
      OMNIROUTE_INSTALL_UPGRADE_WORKDIR: workDir,
      FAKE_TARBALL_VERSION: VERSION,
    });
    const output = run.stdout + run.stderr;
    assert.equal(run.status, 0, output);
    assert.match(run.stdout, /clean install healthy on v3\.8\.55/);
    assert.match(run.stdout, /upgrade path: omniroute@3\.8\.54 → v3\.8\.55/);
    assert.match(run.stdout, /PASS — clean install and upgrade path both boot/);
    assert.deepEqual(leftovers(workDir), [], output);
  })
);

test(
  "a failing run removes its work directory and still exits 1",
  withGate(({ root, workDir, tarball }) => {
    // The installed server reports another version: the clean-install verdict fails.
    const run = runGate(root, ["--skip-upgrade"], {
      [PACKED_TARBALL_ENV]: tarball,
      OMNIROUTE_INSTALL_UPGRADE_WORKDIR: workDir,
      FAKE_TARBALL_VERSION: "0.0.0-wrong",
    });
    const output = run.stdout + run.stderr;
    assert.equal(run.status, 1, output);
    assert.match(run.stderr, /FAIL — 1 problem\(s\)/);
    assert.match(run.stderr, /clean: health reports version 0\.0\.0-wrong, expected 3\.8\.55/);
    assert.deepEqual(leftovers(workDir), [], output);
  })
);
