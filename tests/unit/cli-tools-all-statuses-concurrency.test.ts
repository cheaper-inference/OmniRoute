import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-allstatuses-cap-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-all-statuses-cap-secret";
delete process.env.INITIAL_PASSWORD;

// Every runtime tool gets the same fake binary. The binary records how many copies run at once.
const FAKE_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fake-cli-"));
const RUNNING_DIR = path.join(FAKE_DIR, "running");
const PEAK_FILE = path.join(FAKE_DIR, "peak");
fs.mkdirSync(RUNNING_DIR);
const fakeBin = path.join(FAKE_DIR, "fake-cli");
fs.writeFileSync(
  fakeBin,
  [
    "#!/bin/sh",
    `touch "${RUNNING_DIR}/$$"`,
    `n=$(ls "${RUNNING_DIR}" | wc -l)`,
    `echo "$n" >> "${PEAK_FILE}"`,
    "sleep 0.3",
    `rm -f "${RUNNING_DIR}/$$"`,
    'echo "fake-cli 1.0.0"',
  ].join("\n"),
  { mode: 0o755 }
);

const runtimeSource = fs.readFileSync(path.resolve("src/shared/services/cliRuntime.ts"), "utf8");
const binKeys = [...runtimeSource.matchAll(/envBinKey:\s*"([A-Z0-9_]+)"/g)].map((m) => m[1]);
for (const key of binKeys) process.env[key] = fakeBin;

const core = await import("../../src/lib/db/core.ts");
const { clearCache } = await import("../../src/lib/cliTools/batchStatusCache.ts");
const route = await import("../../src/app/api/cli-tools/all-statuses/route.ts");
const { CLI_TOOLS } = await import("../../src/shared/constants/cliTools.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.rmSync(FAKE_DIR, { recursive: true, force: true });
});

// The fake CLI is a POSIX shell script.
test(
  "cold batch runs at most four tool checks at once and still reports every tool",
  { skip: process.platform === "win32" },
  async () => {
    assert.ok(binKeys.length >= 20, `premise: expected many runtime tools, got ${binKeys.length}`);
    clearCache();
    const response = await route.GET(
      new Request("http://localhost/api/cli-tools/all-statuses?refresh=true")
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as Record<string, { detection: { runnable: boolean } }>;

    const peak = Math.max(...fs.readFileSync(PEAK_FILE, "utf8").trim().split("\n").map(Number));
    assert.ok(peak >= 2, `premise: probes should overlap at all, peak was ${peak}`);
    assert.ok(peak <= 4, `at most 4 concurrent probes expected, peak was ${peak}`);

    assert.deepEqual(Object.keys(body).sort(), Object.keys(CLI_TOOLS).sort());
  }
);
