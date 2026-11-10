import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const LEVELS = { DEBUG: 10, INFO: 20, WARNING: 30, ERROR: 40 };
/** Fixed diagnostic messages never contain child output, environment values or credentials. */
function log(level, message) {
  const minimum = LEVELS.INFO;
  if (LEVELS[level] >= minimum)
    process.stderr.write(`${new Date().toISOString()} ${level} ${message}\n`);
}

/** Inspect before terminating; an unknown inspection result must fail closed. */
function inspectChild(pid, env, platform) {
  if (platform === "win32")
    return spawnSync(
      "pwsh",
      [
        "-NoProfile",
        "-Command",
        "$p=Get-CimInstance Win32_Process -Filter ('ProcessId=' + $env:FIXTURE_PID); if($p){ $p.CommandLine; $p.CreationDate.ToUniversalTime().ToString('o') }",
      ],
      {
        env: { ...env, FIXTURE_PID: String(pid) },
        encoding: "utf8",
        timeout: 5000,
        windowsHide: true,
      }
    );
  return spawnSync("ps", ["-p", String(pid), "-o", "args="], { encoding: "utf8", timeout: 5000 });
}

/** Vanished and recycled PIDs are harmless; inspection errors are not proof of absence. */
export function ownsFixtureChild(record, inspected, platform) {
  if (inspected.error || inspected.signal) throw new Error("Cannot inspect fixture child safely");
  const output = String(inspected.stdout || "").trim();
  if (platform !== "win32" && inspected.status === 1 && !output) return false;
  assert.equal(inspected.status, 0, "Cannot verify owned child survivor");
  if (!output.includes("managedProxyChild.mjs")) return false;
  if (platform === "win32") {
    const created = Date.parse(output.split(/\r?\n/).at(-1));
    const started = Date.parse(record.startedAt);
    return Number.isFinite(created) && created <= started && started - created < 30000;
  }
  return true;
}

/** Wait only for a child we just verified and terminated. */
async function waitForExit(pid) {
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline) {
    try {
      process.kill(pid, 0);
    } catch (error) {
      if (error.code === "ESRCH") return;
      throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("Owned synthetic child did not exit after termination");
}

/** Remove stale records; terminate only proven fixture survivors and keep the leak gate blocking. */
export async function sweepFixtureChildren(root, env, dependencies = {}) {
  const platform = dependencies.platform || process.platform;
  const inspect = dependencies.inspect || ((pid) => inspectChild(pid, env, platform));
  const exists = dependencies.exists || ((pid) => process.kill(pid, 0));
  const terminate = dependencies.terminate || ((pid) => process.kill(pid, "SIGKILL"));
  const wait = dependencies.wait || waitForExit;
  let survivors = 0;
  for (const name of fs.readdirSync(root).filter((file) => /^child-\d+\.json$/.test(file))) {
    const file = path.join(root, name);
    const record = JSON.parse(fs.readFileSync(file, "utf8"));
    assert.ok(
      Number.isInteger(record.pid) &&
        record.pid > 0 &&
        Number.isFinite(Date.parse(record.startedAt))
    );
    try {
      exists(record.pid);
      if (ownsFixtureChild(record, inspect(record.pid), platform)) {
        survivors++;
        log("WARNING", "Verified fixture child survived cleanup; terminating it");
        terminate(record.pid);
        await wait(record.pid);
      } else log("DEBUG", "Discarding a vanished or recycled fixture PID record");
      fs.rmSync(file, { force: true });
    } catch (error) {
      if (error.code !== "ESRCH") {
        log("ERROR", "Fixture child cleanup could not be verified");
        throw error;
      }
      fs.rmSync(file, { force: true });
    }
  }
  assert.equal(survivors, 0, "Owned synthetic children survived test cleanup and were terminated");
  log("INFO", "Fixture child cleanup verified");
}
