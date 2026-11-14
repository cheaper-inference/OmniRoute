// Startup structure of `omnirouter launch` / `gateway`: the entry fast path loads no legacy
// command, no runtime polyfill and no adapter beyond the one launched, and prints exactly what
// the full program prints. Structural checks only (no timing).

import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import type { Command, Option } from "commander";

import {
  createLaunchFastProgram,
  createOmnirouterProgram,
  launchFastPathCommand,
} from "../../../../bin/omnirouter.mjs";
import { createProgram } from "../../../../bin/cli/program.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../../..");
const ENTRY = join(ROOT, "bin/omnirouter.mjs");

const work = mkdtempSync(join(tmpdir(), "olx-perf-lazy-"));
test.after(() => rmSync(work, { recursive: true, force: true }));

const HOOK = join(work, "record-loads.mjs");
writeFileSync(
  HOOK,
  `import { registerHooks } from "node:module";
import { appendFileSync } from "node:fs";
const out = process.env.OLX_RECORD_LOADS;
registerHooks({
  load(url, context, next) {
    if (out) appendFileSync(out, url + "\\n");
    return next(url, context);
  },
});
`
);

// The full program, run the way the entry's main block runs it (loaders first, then
// createOmnirouterProgram), so the fast path can be compared against it without a hidden switch.
const FULL = join(work, "run-full.mjs");
writeFileSync(
  FULL,
  `const root = ${JSON.stringify(pathToFileURL(ROOT).href)};
const { createRequire } = await import("node:module");
const req = createRequire(root + "/package.json");
await import(pathToFile(req.resolve("tsx/esm")));
await import(root + "/open-sse/utils/setupPolyfill.ts");
const { registerAliasResolver } = await import(root + "/bin/aliasResolver.mjs");
await registerAliasResolver(${JSON.stringify(ROOT)});
const { createOmnirouterProgram } = await import(root + "/bin/omnirouter.mjs");
const { formatCliError } = await import(root + "/bin/cli/utils/formatCliError.mjs");
function pathToFile(p) { return "file://" + p; }
try {
  const program = await createOmnirouterProgram();
  await program.parseAsync(process.argv);
} catch (err) {
  if (err?.exitCode !== undefined) process.exit(err.exitCode);
  console.error("omnirouter:", formatCliError(err));
  process.exit(1);
}
`
);

type Run = { stdout: string; stderr: string; code: number | null };

let runs = 0;
/** Spawn the real entry with a sandboxed HOME / DATA_DIR / PATH; optionally record loads. */
function runEntry(
  argv: string[],
  { slow = false, record = false }: { slow?: boolean; record?: boolean } = {}
): Promise<Run & { loaded: string[] }> {
  const id = `run-${++runs}`;
  const home = join(work, id);
  const binDir = join(home, "empty-bin");
  mkdirSync(binDir, { recursive: true });
  const loadsFile = join(home, "loads.txt");
  const env: Record<string, string> = {
    HOME: home,
    USERPROFILE: home,
    DATA_DIR: join(home, "data"),
    PATH: binDir,
    TMPDIR: process.env.TMPDIR ?? tmpdir(),
    LANG: "en_US.UTF-8",
    NO_COLOR: "1",
  };
  if (record) env.OLX_RECORD_LOADS = loadsFile;
  const args = [
    ...(record ? ["--import", pathToFileURL(HOOK).href] : []),
    slow ? FULL : ENTRY,
    ...argv,
  ];
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

function forbiddenLoads(loaded: string[]): string[] {
  return loaded
    .map(rel)
    .filter(
      (path) =>
        /^bin\/cli\/commands\/[^/]+\.mjs$/.test(path) ||
        path === "bin/cli/program.mjs" ||
        path === "open-sse/utils/setupPolyfill.ts" ||
        path === "bin/aliasResolver.mjs" ||
        /\/node_modules\/ws\//.test(path) ||
        path === "bin/cli/launch/core/pipeline.mjs"
    );
}

const adapterLoads = (loaded: string[]) =>
  loaded
    .map(rel)
    .filter((path) => /^bin\/cli\/launch\/adapters\/[^/]+\.mjs$/.test(path))
    .filter((path) => !path.endsWith("/index.mjs"));

test("launchFastPathCommand: only launch/gateway after known root options", () => {
  const cmd = (...args: string[]) => launchFastPathCommand(["node", "omnirouter", ...args]);
  assert.equal(cmd("launch", "--help"), "launch");
  assert.equal(cmd("gateway", "status"), "gateway");
  assert.equal(cmd("--api-key", "k", "launch"), "launch");
  assert.equal(cmd("--api-key=k", "-q", "--no-color", "--quiet", "gateway"), "gateway");
  assert.equal(
    cmd("--output", "json", "--timeout", "5", "--base-url", "u", "--context", "c", "launch"),
    "launch"
  );
  assert.equal(cmd("--lang=en", "--output=csv", "launch"), "launch");
  assert.equal(cmd("--api-key", "launch"), null, "launch is the --api-key value");
  for (const args of [
    [],
    ["--help"],
    ["-h", "launch"],
    ["help", "launch"],
    ["--bogus", "launch"],
    ["--", "launch"],
    ["--output", "bogus", "launch"],
    ["--output=bogus", "launch"],
    ["--no-color=1", "launch"],
    ["--api-key"],
    ["serve"],
    ["launch-codex"],
    ["Launch"],
  ]) {
    assert.equal(cmd(...args), null, JSON.stringify(args));
  }
});

type OptionShape = {
  flags: string;
  description: string;
  defaultValue: unknown;
  envVar: string | undefined;
  argChoices: readonly string[] | undefined;
  hidden: boolean;
  negate: boolean;
  required: boolean;
  optional: boolean;
};

const optionShape = (o: Option & { negate?: boolean; hidden?: boolean }): OptionShape => ({
  flags: o.flags,
  description: o.description,
  defaultValue: o.defaultValue,
  envVar: o.envVar,
  argChoices: o.argChoices,
  hidden: Boolean(o.hidden),
  negate: Boolean(o.negate),
  required: Boolean(o.required),
  optional: Boolean(o.optional),
});

test("fast program root options, name, version and settings match createProgram()", async () => {
  const fast = (await createLaunchFastProgram()) as Command;
  const full = createProgram() as Command;
  assert.deepEqual(fast.options.map(optionShape), full.options.map(optionShape));
  assert.equal(fast.name(), "omnirouter");
  assert.equal(fast.version(), full.version());
  assert.equal(fast.description(), full.description());
  const settings = (c: Command) => {
    const raw = c as unknown as Record<string, unknown>;
    return {
      showHelpAfterError: raw._showHelpAfterError,
      exitOverride: typeof raw._exitCallback,
      allowUnknownOption: raw._allowUnknownOption,
      allowExcessArguments: raw._allowExcessArguments,
      enablePositionalOptions: raw._enablePositionalOptions,
      passThroughOptions: raw._passThroughOptions,
      combineFlagAndOptionalValue: raw._combineFlagAndOptionalValue,
      showSuggestionAfterError: raw._showSuggestionAfterError,
    };
  };
  assert.deepEqual(settings(fast), settings(full));
  assert.deepEqual(
    fast.commands.map((c) => c.name()),
    ["launch", "gateway"]
  );
});

test("fast program and full program register the same launch and gateway commands", async () => {
  const fast = (await createLaunchFastProgram()) as Command;
  const full = (await createOmnirouterProgram()) as Command;
  for (const name of ["launch", "gateway"]) {
    const a = fast.commands.find((c) => c.name() === name)!;
    const b = full.commands.find((c) => c.name() === name)!;
    let helpA = "";
    let helpB = "";
    a.configureOutput({ writeOut: (s: string) => (helpA += s) });
    b.configureOutput({ writeOut: (s: string) => (helpB += s) });
    a.outputHelp();
    b.outputHelp();
    assert.equal(helpA, helpB, `${name} help`);
    assert.deepEqual(a.options.map(optionShape), b.options.map(optionShape), name);
  }
});

test("spawned fast path prints exactly what the full program prints", async () => {
  const port = await freePort();
  const cases = [
    ["launch", "--help"],
    ["gateway", "--help"],
    ["gateway", "status", "--help"],
    ["launch", "--bogus"],
    ["launch"],
    ["--api-key", "k", "launch", "--help"],
    ["launch", "claude", "extra"],
    ["gateway", "bogus"],
    ["launch", "nope", "--json"],
    ["launch", "claude", "--dry-run", "--json", "--port", String(port)],
  ];
  const results = await Promise.all(
    cases.map(async (argv) => ({
      argv,
      fast: await runEntry(argv),
      slow: await runEntry(argv, { slow: true }),
    }))
  );
  for (const { argv, fast, slow } of results) {
    const label = JSON.stringify(argv);
    assert.equal(fast.stdout, slow.stdout, `${label} stdout`);
    assert.equal(fast.stderr, slow.stderr, `${label} stderr`);
    assert.equal(fast.code, slow.code, `${label} exit code`);
  }
  const byArgv = new Map(results.map((r) => [r.argv.join(" "), r.fast]));
  assert.equal(byArgv.get("launch --help")?.code, 0);
  assert.match(byArgv.get("launch --help")?.stdout ?? "", /Launchable tools:/);
  assert.equal(byArgv.get("launch --bogus")?.code, 2);
  assert.equal(byArgv.get("launch")?.code, 2);
  assert.equal(byArgv.get("launch claude extra")?.code, 2);
});

test("launch --help and gateway --help load no adapter, legacy command, polyfill or pipeline", async () => {
  const [launchHelp, gatewayHelp] = await Promise.all([
    runEntry(["launch", "--help"], { record: true }),
    runEntry(["gateway", "--help"], { record: true }),
  ]);
  for (const run of [launchHelp, gatewayHelp]) {
    assert.equal(run.code, 0, run.stderr);
    assert.ok(
      run.loaded.some((url) => rel(url) === "bin/cli/launch/command.mjs"),
      "the hook recorded loads"
    );
    assert.deepEqual(forbiddenLoads(run.loaded), []);
    assert.deepEqual(adapterLoads(run.loaded), []);
  }
});

test("a single-tool launch loads only that tool's adapter", async () => {
  const port = await freePort();
  const run = await runEntry(["launch", "claude", "--dry-run", "--json", "--port", String(port)], {
    record: true,
  });
  assert.ok(run.stdout.trim().startsWith("{"), `${run.stdout}\n${run.stderr}`);
  assert.deepEqual(adapterLoads(run.loaded), ["bin/cli/launch/adapters/claude.mjs"]);
  const forbidden = forbiddenLoads(run.loaded).filter(
    (path) => path !== "bin/cli/launch/core/pipeline.mjs"
  );
  assert.deepEqual(forbidden, []);
});
