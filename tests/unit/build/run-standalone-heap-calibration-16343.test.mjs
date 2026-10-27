// #16343 — Docker/standalone launcher heap ceiling.
//
// Observed defect: when OMNIROUTE_MEMORY_MB is unset or invalid (and NODE_OPTIONS carries no
// heap flag), scripts/dev/run-standalone.mjs starts the server with a fixed 512 MB V8 heap
// instead of the #5172 RAM-scaled default (8 GiB host → 2867 MB, 4 GiB host → 1433 MB).
//
// Required precedence, unchanged by the fix:
//   - an explicit valid OMNIROUTE_MEMORY_MB always wins (#2939);
//   - with OMNIROUTE_MEMORY_MB unset, an existing NODE_OPTIONS heap flag is kept (#5238);
//   - the heap-limit conflict warning fires only when both knobs are explicitly set and
//     disagree (#10353).
//
// The launcher runs at import time, so it is exercised as a child process. Host physical RAM
// is simulated so the expected values do not depend on the machine running the test. cwd and
// DATA_DIR point at a throwaway directory holding a stub `server.js` that reports the
// NODE_OPTIONS it was spawned with.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const launcherPath = fileURLToPath(
  new URL("../../../scripts/dev/run-standalone.mjs", import.meta.url)
);
const GiB = 1024 * 1024 * 1024;

function runLauncher(envOverrides, { simulatedRamBytes = 8 * GiB } = {}) {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-16343-"));
  try {
    writeFileSync(
      join(dir, "server.js"),
      "process.stdout.write('NODE_OPTIONS=' + (process.env.NODE_OPTIONS ?? '') + '\\n');\n"
    );
    const simulateRam = join(dir, "simulate-ram.mjs");
    writeFileSync(
      simulateRam,
      [
        'import os from "node:os";',
        'import { syncBuiltinESMExports } from "node:module";',
        `os.totalmem = () => ${simulatedRamBytes};`,
        "syncBuiltinESMExports();",
        "",
      ].join("\n")
    );
    const env = { ...process.env };
    delete env.OMNIROUTE_MEMORY_MB;
    delete env.NODE_OPTIONS;
    Object.assign(env, { DATA_DIR: join(dir, "data") }, envOverrides);
    const result = spawnSync(
      process.execPath,
      ["--import", pathToFileURL(simulateRam).href, launcherPath],
      { cwd: dir, env, encoding: "utf8", timeout: 60_000 }
    );
    assert.equal(result.error, undefined, `launcher failed to run: ${result.error}`);
    assert.equal(result.status, 0, `launcher exited ${result.status}: ${result.stderr}`);
    const line = result.stdout.split(/\r?\n/).find((l) => l.startsWith("NODE_OPTIONS="));
    assert.ok(line, `stub server did not report NODE_OPTIONS; stdout=${result.stdout}`);
    const nodeOptions = line.slice("NODE_OPTIONS=".length);
    const flags = [...nodeOptions.matchAll(/--max-old-space-size=(\d+)/g)].map((m) => Number(m[1]));
    return { nodeOptions, flags, effectiveMb: flags.at(-1), stderr: result.stderr };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test("#16343 unset OMNIROUTE_MEMORY_MB → launcher applies the calibrated heap fallback", () => {
  for (const [ramBytes, expectedMb] of [
    [8 * GiB, 2867],
    [4 * GiB, 1433],
  ]) {
    const run = runLauncher({}, { simulatedRamBytes: ramBytes });
    assert.equal(
      run.effectiveMb,
      expectedMb,
      `${ramBytes / GiB} GiB host: NODE_OPTIONS=${run.nodeOptions}`
    );
    assert.doesNotMatch(run.stderr, /heap limit conflict/);
  }
});

test("#16343 invalid OMNIROUTE_MEMORY_MB → launcher applies the calibrated heap fallback", () => {
  const run = runLauncher({ OMNIROUTE_MEMORY_MB: "not-a-number" });
  assert.equal(run.effectiveMb, 2867, `NODE_OPTIONS=${run.nodeOptions}`);
  assert.doesNotMatch(run.stderr, /heap limit conflict/);
});

test("#16343 guard: explicit valid OMNIROUTE_MEMORY_MB still wins over calibration", () => {
  const run = runLauncher({ OMNIROUTE_MEMORY_MB: "2048" });
  assert.equal(run.effectiveMb, 2048, `NODE_OPTIONS=${run.nodeOptions}`);
  assert.doesNotMatch(run.stderr, /heap limit conflict/);
});

test("#16343 guard: unset OMNIROUTE_MEMORY_MB keeps an existing NODE_OPTIONS heap (#5238)", () => {
  const run = runLauncher({ NODE_OPTIONS: "--max-old-space-size=8192" });
  assert.deepEqual(run.flags, [8192], `NODE_OPTIONS=${run.nodeOptions}`);
  assert.doesNotMatch(run.stderr, /heap limit conflict/);
});

test("#16343 guard: stock Docker env (both knobs = 1024) stays 1024 with no warning", () => {
  const run = runLauncher({
    OMNIROUTE_MEMORY_MB: "1024",
    NODE_OPTIONS: "--max-old-space-size=1024",
  });
  assert.equal(run.effectiveMb, 1024, `NODE_OPTIONS=${run.nodeOptions}`);
  assert.doesNotMatch(run.stderr, /heap limit conflict/);
});

test("#16343 guard: disagreeing knobs still warn and OMNIROUTE_MEMORY_MB wins (#10353)", () => {
  const run = runLauncher({
    OMNIROUTE_MEMORY_MB: "2048",
    NODE_OPTIONS: "--max-old-space-size=512",
  });
  assert.equal(run.effectiveMb, 2048, `NODE_OPTIONS=${run.nodeOptions}`);
  assert.match(run.stderr, /heap limit conflict/);
});
