// Startup structure of `omniroute launch <tool>` / `omniroute gateway` through the real
// `bin/omniroute.mjs` entry: help loads no adapter and no pipeline, a launch loads only the
// launched tool's adapter, `--json` stdout stays one JSON document (the entry's env-loading
// notices go to stderr), and the launch command is strict about arguments before `--`.
// Structural checks only (no timing).

import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { nativeCoverageArgs } from "../../../_helpers/nativeCoverageArgs.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../../..");
const ENTRY = join(ROOT, "bin/omniroute.mjs");

const work = mkdtempSync(join(tmpdir(), "olx-perf-lazy-"));
test.after(() => rmSync(work, { recursive: true, force: true }));

// Records resolved module URLs (each once). A resolve hook, not a load hook: in the coverage shard
// run the CLI's tsx bridge registers a short-circuiting load hook after this one, which would hide
// every module loaded after it; nothing short-circuits the resolution of these modules.
const HOOK = join(work, "record-loads.mjs");
writeFileSync(
  HOOK,
  `import { registerHooks } from "node:module";
import { appendFileSync } from "node:fs";
const out = process.env.OLX_RECORD_LOADS;
const seen = new Set();
registerHooks({
  resolve(specifier, context, next) {
    const result = next(specifier, context);
    if (out && !seen.has(result.url)) {
      seen.add(result.url);
      appendFileSync(out, result.url + "\\n");
    }
    return result;
  },
});
`
);

type Run = { stdout: string; stderr: string; code: number | null; loaded: string[] };

let runs = 0;
/**
 * Spawn the real entry with a sandboxed HOME / DATA_DIR / PATH, recording module loads. The
 * sandbox DATA_DIR has a `.env`, so the entry prints its "Loaded env" notice on every run.
 */
function runEntry(argv: string[]): Promise<Run> {
  const id = `run-${++runs}`;
  const home = join(work, id);
  const binDir = join(home, "empty-bin");
  const dataDir = join(home, "data");
  mkdirSync(binDir, { recursive: true });
  mkdirSync(dataDir, { recursive: true });
  writeFileSync(join(dataDir, ".env"), "OMNIROUTE_LAUNCH_SUMMARY=0\n");
  const loadsFile = join(home, "loads.txt");
  const env: Record<string, string> = {
    HOME: home,
    USERPROFILE: home,
    DATA_DIR: dataDir,
    PATH: binDir,
    TMPDIR: process.env.TMPDIR ?? tmpdir(),
    LANG: "en_US.UTF-8",
    NO_COLOR: "1",
    CI: "1",
    NO_UPDATE_NOTIFIER: "1",
    OMNIROUTE_NO_UPDATE_NOTIFIER: "1",
    OMNIROUTE_CLI_SKIP_REPO_ENV: "1",
    OLX_RECORD_LOADS: loadsFile,
  };
  // The filtered env drops NODE_OPTIONS; restore the coverage layout preload in the shard run so
  // the entry's modules keep the same V8 layout as every other process (a no-op elsewhere).
  const args = [...nativeCoverageArgs(), "--import", pathToFileURL(HOOK).href, ENTRY, ...argv];
  return new Promise((resolveRun, reject) => {
    const child = spawn(process.execPath, args, { cwd: home, env, stdio: "pipe" });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("error", reject);
    child.on("close", (code) => {
      let loaded: string[] = [];
      try {
        loaded = readFileSync(loadsFile, "utf8").split("\n").filter(Boolean);
      } catch {
        loaded = [];
      }
      resolveRun({ stdout, stderr, code, loaded });
    });
  });
}

/** A local port with nothing listening on it. */
async function freePort(): Promise<number> {
  const server = createServer();
  await new Promise<void>((done) => server.listen(0, "127.0.0.1", done));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  await new Promise<void>((done) => server.close(() => done()));
  return port;
}

const rel = (url: string) =>
  url.startsWith("file:") ? fileURLToPath(url).replace(`${ROOT}/`, "") : url;

const adapterLoads = (loaded: string[]) =>
  loaded
    .map(rel)
    .filter((path) => /^bin\/cli\/launch\/adapters\/[^/]+\.mjs$/.test(path))
    .filter((path) => !path.endsWith("/index.mjs"));

const loadsPipeline = (loaded: string[]) =>
  loaded.map(rel).includes("bin/cli/launch/core/pipeline.mjs");

test("launch <tool> --help and gateway --help load no adapter and no pipeline", async () => {
  const [launchHelp, gatewayHelp] = await Promise.all([
    runEntry(["launch", "claude", "--help"]),
    runEntry(["gateway", "--help"]),
  ]);
  for (const run of [launchHelp, gatewayHelp]) {
    assert.equal(run.code, 0, run.stderr);
    assert.ok(
      run.loaded.some((url) => rel(url) === "bin/cli/program.mjs"),
      "the hook recorded loads"
    );
    assert.deepEqual(adapterLoads(run.loaded), []);
    assert.equal(loadsPipeline(run.loaded), false);
  }
  assert.match(launchHelp.stdout, /^Usage: omniroute launch /m);
  assert.match(launchHelp.stdout, /Launchable tools:/);
  assert.match(launchHelp.stdout, /--all-models/);
  assert.match(gatewayHelp.stdout, /^Usage: omniroute gateway /m);
  for (const sub of ["status", "keep", "stop"]) assert.match(gatewayHelp.stdout, new RegExp(sub));
});

test("a single-tool launch loads only that tool's adapter; --json stdout is one JSON document", async () => {
  const port = await freePort();
  const run = await runEntry(["launch", "claude", "--dry-run", "--json", "--port", String(port)]);
  assert.doesNotThrow(() => JSON.parse(run.stdout), `${run.stdout}\n${run.stderr}`);
  assert.equal(typeof JSON.parse(run.stdout), "object");
  assert.match(run.stderr, /Loaded env from/, "the entry's env notice goes to stderr");
  assert.deepEqual(adapterLoads(run.loaded), ["bin/cli/launch/adapters/claude.mjs"]);
});

test("arguments before -- are strict: unknown option and stray word exit 2", async () => {
  const [unknown, stray] = await Promise.all([
    runEntry(["launch", "claude", "--bogus"]),
    runEntry(["launch", "claude", "extra"]),
  ]);
  assert.equal(unknown.code, 2, unknown.stderr);
  assert.match(unknown.stderr, /unknown option '--bogus'/);
  assert.equal(stray.code, 2, stray.stderr);
  assert.match(stray.stderr, /unexpected argument "extra"/);
  assert.match(stray.stderr, /omniroute launch claude -- --help/);
  for (const run of [unknown, stray]) assert.equal(loadsPipeline(run.loaded), false);
});
