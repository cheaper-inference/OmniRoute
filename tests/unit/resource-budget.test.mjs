import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { once } from "node:events";
import {
  chmodSync,
  existsSync,
  readFileSync,
  readdirSync,
  mkdtempSync,
  mkdirSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import { fileURLToPath } from "node:url";

import {
  evaluateAdmission,
  parseProcStartTicks,
  runMonitoredCommand,
} from "../../scripts/dev/resource-budget.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../../scripts/dev/resource-budget.mjs", import.meta.url)
);
const PROCESS_HELPER_URL = new URL("../../scripts/dev/resource-budget-process.mjs", import.meta.url)
  .href;
const sandboxes = [];

after(() => {
  for (const dir of sandboxes) rmSync(dir, { recursive: true, force: true });
});

function sandbox() {
  const dir = mkdtempSync(join(tmpdir(), "resource-budget-"));
  sandboxes.push(dir);
  return dir;
}

function run(args, env = process.env) {
  return spawnSync(process.execPath, [SCRIPT_PATH, ...args], {
    encoding: "utf8",
    env,
    timeout: 10_000,
  });
}

function runAsync(args, env = process.env) {
  return startAsync(args, env).completed;
}

function startAsync(args, env = process.env) {
  const child = spawn(process.execPath, [SCRIPT_PATH, ...args], {
    encoding: "utf8",
    env,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let stdout = "";
  let stderr = "";
  child.stdout.setEncoding("utf8");
  child.stderr.setEncoding("utf8");
  child.stdout.on("data", (chunk) => (stdout += chunk));
  child.stderr.on("data", (chunk) => (stderr += chunk));
  const completed = new Promise((resolve) => {
    child.on("close", (status, signal) => resolve({ status, signal, stdout, stderr }));
  });
  const exited = new Promise((resolve) => {
    child.on("exit", (status, signal) => resolve({ status, signal, stdout, stderr }));
  });
  return { child, completed, exited };
}

function json(result) {
  assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
  return JSON.parse(result.stdout);
}

function terminalReceipt(result) {
  const prefix = "[resource-budget] receipt ";
  const line = result.stderr.split("\n").find((candidate) => candidate.startsWith(prefix));
  assert.ok(line, `missing resource receipt in stderr:\n${result.stderr}`);
  return JSON.parse(line.slice(prefix.length));
}

function fixedStatfsEnv(commonDir, name, available) {
  const preload = join(commonDir, `${name}.mjs`);
  writeFileSync(
    preload,
    [
      'import fs from "node:fs";',
      'import { syncBuiltinESMExports } from "node:module";',
      `fs.statfsSync = () => ({ bavail: ${available}n, bsize: 1n });`,
      "syncBuiltinESMExports();",
    ].join("\n")
  );
  return { ...process.env, NODE_OPTIONS: `--import=${preload}` };
}

function isAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    if (error.code === "ESRCH") return false;
    throw error;
  }
}

function hasExecutableThreads(pid) {
  try {
    const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
    const fields = stat
      .slice(stat.lastIndexOf(")") + 2)
      .trim()
      .split(/\s+/);
    return fields[0] !== "Z" || fields[17] !== "1";
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

function childPids(pid) {
  try {
    const value = readFileSync(`/proc/${pid}/task/${pid}/children`, "utf8").trim();
    return value ? value.split(/\s+/).map(Number) : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function waitUntil(predicate, message, timeoutMs = 5_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  assert.fail(message);
}

test("reserves, reports, and releases capacity through the CLI", () => {
  const commonDir = sandbox();
  const reserved = json(
    run([
      "reserve",
      "--common-dir",
      commonDir,
      "--reserve-bytes",
      "1",
      "--floor-bytes",
      "0",
      "--purpose",
      "unit-lifecycle",
      "--owner-pid",
      String(process.pid),
      "--json",
    ])
  );

  assert.match(reserved.lease.handle, /^[0-9a-f-]+\.[0-9a-f]+$/);
  assert.equal(reserved.lease.reservedBytes, "1");

  const active = json(run(["status", "--common-dir", commonDir, "--json"]));
  assert.equal(active.leases.length, 1);
  assert.equal(active.leases[0].purpose, "unit-lifecycle");
  assert.equal(active.leases[0].identity, "LIVE");
  assert.equal("token" in active.leases[0], false);
  assert.equal("handle" in active.leases[0], false);

  json(run(["release", "--common-dir", commonDir, "--lease", reserved.lease.handle, "--json"]));
  const released = json(run(["status", "--common-dir", commonDir, "--json"]));
  assert.equal(released.leases.length, 0);
});

test("status of an unused common dir is strictly read-only", () => {
  const commonDir = sandbox();
  const before = readdirSync(commonDir);
  const status = json(run(["status", "--common-dir", commonDir, "--json"]));
  assert.deepEqual(status.leases, []);
  assert.deepEqual(readdirSync(commonDir), before);
});

test("help is successful and unknown options fail before state mutation", () => {
  const help = run(["--help"]);
  assert.equal(help.status, 0, help.stderr);
  assert.match(help.stdout, /resource-budget\.mjs run/);

  const commonDir = sandbox();
  const before = readdirSync(commonDir);
  const unknown = run(["status", "--common-dir", commonDir, "--typo", "value", "--json"]);
  assert.equal(unknown.status, 2, unknown.stderr);
  assert.match(unknown.stderr, /unknown option: --typo/);
  assert.deepEqual(readdirSync(commonDir), before);
});

test("mutation restricts a pre-existing state directory to the owner", () => {
  const commonDir = sandbox();
  const stateDir = join(commonDir, "omniroute-resource-budget");
  mkdirSync(stateDir, { mode: 0o777 });
  chmodSync(stateDir, 0o777);

  json(
    run([
      "reserve",
      "--common-dir",
      commonDir,
      "--reserve-bytes",
      "1",
      "--floor-bytes",
      "0",
      "--purpose",
      "permission-restriction",
      "--owner-pid",
      String(process.pid),
      "--json",
    ])
  );

  assert.equal(statSync(stateDir).mode & 0o777, 0o700);
});

test("status never repairs a missing mutex or rewrites a corrupt ledger", () => {
  const missingLockDir = sandbox();
  const reservation = json(
    run([
      "reserve",
      "--common-dir",
      missingLockDir,
      "--reserve-bytes",
      "1",
      "--floor-bytes",
      "0",
      "--purpose",
      "missing-lock",
      "--owner-pid",
      String(process.pid),
      "--json",
    ])
  );
  assert.ok(reservation.lease.id);
  const lockPath = join(missingLockDir, "omniroute-resource-budget.lock");
  rmSync(lockPath);
  const missingLockStatus = run(["status", "--common-dir", missingLockDir, "--json"]);
  assert.equal(missingLockStatus.status, 78, missingLockStatus.stderr);
  assert.equal(existsSync(lockPath), false, "status recreated the missing mutex");

  const corruptDir = sandbox();
  json(
    run([
      "reserve",
      "--common-dir",
      corruptDir,
      "--reserve-bytes",
      "1",
      "--floor-bytes",
      "0",
      "--purpose",
      "corrupt-ledger",
      "--owner-pid",
      String(process.pid),
      "--json",
    ])
  );
  const ledgerPath = join(corruptDir, "omniroute-resource-budget", "leases-v1.json");
  writeFileSync(ledgerPath, "{ definitely-not-json\n");
  const corruptStatus = run(["status", "--common-dir", corruptDir, "--json"]);
  assert.equal(corruptStatus.status, 78, corruptStatus.stderr);
  assert.equal(readFileSync(ledgerPath, "utf8"), "{ definitely-not-json\n");
});

test("admission arithmetic and proc parsing are deterministic seams", () => {
  assert.deepEqual(
    evaluateAdmission({ available: 100n, reserved: 30n, requested: 20n, floor: 50n }),
    { allowed: true, remaining: 50n }
  );
  assert.deepEqual(
    evaluateAdmission({ available: 100n, reserved: 31n, requested: 20n, floor: 50n }),
    { allowed: false, remaining: 49n }
  );

  const afterComm = ["S", ...Array(18).fill("0"), "424242"];
  assert.equal(
    parseProcStartTicks(`123 (name with ) parentheses) ${afterComm.join(" ")}`),
    "424242"
  );
});

function processGroupProbe(body) {
  const result = spawnSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      [
        'import fs from "node:fs";',
        'import { syncBuiltinESMExports } from "node:module";',
        `const helperUrl = ${JSON.stringify(PROCESS_HELPER_URL)};`,
        "const { listProcessGroupMembers, killVerifiedGroupMembers } = await import(helperUrl);",
        "const records = new Map();",
        "const signals = [];",
        "let unreadable = false;",
        "let becomeZombie = false;",
        "const reads = new Map();",
        "const group = 1234;",
        'function stat(pid, state, pgid = group, threadCount = "1") {',
        '  const fields = [state, "1", String(pgid), ...Array(16).fill("0"), String(pid * 10)];',
        "  fields[17] = String(threadCount);",
        '  return `${pid} (fixture process) ${fields.join(" ")}`;',
        "}",
        "fs.readdirSync = () => [...records.keys()].map((pid) => ({ name: String(pid), isDirectory: () => true }));",
        "fs.readFileSync = (path) => {",
        '  const pid = Number(String(path).split("/")[2]);',
        "  reads.set(pid, (reads.get(pid) ?? 0) + 1);",
        '  if (unreadable && pid === 9999) throw Object.assign(new Error("fixture inaccessible PID"), { code: "EACCES" });',
        '  if (becomeZombie && reads.get(pid) > 1) return stat(pid, "Z");',
        "  return records.get(pid);",
        "};",
        "process.kill = (...args) => signals.push(args);",
        "syncBuiltinESMExports();",
        body,
      ].join("\n"),
    ],
    { encoding: "utf8", timeout: 5_000 }
  );
  return json(result);
}

test("group quiescence excludes known zombies but preserves executable and stopped members", () => {
  const result = processGroupProbe(
    [
      'records.set(2000, stat(2000, "Z"));',
      'records.set(2001, stat(2001, "S"));',
      'records.set(2002, stat(2002, "T"));',
      'records.set(2003, stat(2003, "R", 9998));',
      "console.log(JSON.stringify(listProcessGroupMembers(group)));",
    ].join("\n")
  );
  assert.equal(result.unknown, false);
  assert.deepEqual(
    result.members.map((member) => member.pid),
    [2001, 2002]
  );
});

test("known zombies never make an unreadable process table safe to release", () => {
  const result = processGroupProbe(
    [
      'records.set(2000, stat(2000, "Z"));',
      'records.set(9999, stat(9999, "S"));',
      "unreadable = true;",
      "const snapshot = listProcessGroupMembers(group);",
      "const drained = await killVerifiedGroupMembers(group, group, 50);",
      "console.log(JSON.stringify({ snapshot, drained, signals }));",
    ].join("\n")
  );
  assert.equal(result.snapshot.unknown, true);
  assert.deepEqual(result.snapshot.members, []);
  assert.equal(result.drained, false);
  assert.deepEqual(result.signals, []);
});

test("zombie leaders with additional or unknown threads still block quiescence", () => {
  const result = processGroupProbe(
    [
      'records.set(2000, stat(2000, "Z"));',
      'records.set(2001, stat(2001, "Z", group, "2"));',
      'records.set(2002, stat(2002, "Z", group, "0"));',
      'records.set(2003, stat(2003, "Z", group, "unknown"));',
      "console.log(JSON.stringify(listProcessGroupMembers(group)));",
    ].join("\n")
  );
  assert.deepEqual(
    result.members.map((member) => member.pid),
    [2001, 2002, 2003]
  );
});

test("a member becoming a zombie between scan and signal needs no signal or foreign reap", () => {
  const result = processGroupProbe(
    [
      'records.set(2000, stat(2000, "S"));',
      "becomeZombie = true;",
      "const drained = await killVerifiedGroupMembers(group, group, 50);",
      "console.log(JSON.stringify({ drained, signals }));",
    ].join("\n")
  );
  assert.equal(result.drained, true);
  assert.deepEqual(result.signals, []);
});

test("two concurrent reservations cannot both consume the same capacity", async () => {
  const commonDir = sandbox();
  const preload = join(commonDir, "fixed-statfs.mjs");
  writeFileSync(
    preload,
    [
      'import fs from "node:fs";',
      'import { syncBuiltinESMExports } from "node:module";',
      "fs.statfsSync = () => ({ bavail: 100n, bsize: 1n });",
      "syncBuiltinESMExports();",
    ].join("\n")
  );
  const env = { ...process.env, NODE_OPTIONS: `--import=${preload}` };
  const baseArgs = [
    "reserve",
    "--common-dir",
    commonDir,
    "--reserve-bytes",
    "60",
    "--floor-bytes",
    "0",
    "--owner-pid",
    String(process.pid),
    "--json",
  ];

  const [first, second] = await Promise.all([
    runAsync([...baseArgs, "--purpose", "race-first"], env),
    runAsync([...baseArgs, "--purpose", "race-second"], env),
  ]);
  assert.deepEqual(
    [first.status, second.status].sort((a, b) => a - b),
    [0, 75],
    `first=${JSON.stringify(first)} second=${JSON.stringify(second)}`
  );

  const status = json(run(["status", "--common-dir", commonDir, "--json"]));
  assert.equal(status.leases.length, 1);
  assert.equal(status.reservedBytes, "60");
});

test("a new reservation preserves the highest floor already contracted", () => {
  const commonDir = sandbox();
  const env = fixedStatfsEnv(commonDir, "available-20", 20);
  json(
    run(
      [
        "reserve",
        "--common-dir",
        commonDir,
        "--reserve-bytes",
        "5",
        "--floor-bytes",
        "12",
        "--purpose",
        "high-floor",
        "--owner-pid",
        String(process.pid),
        "--json",
      ],
      env
    )
  );
  const denied = run(
    [
      "reserve",
      "--common-dir",
      commonDir,
      "--reserve-bytes",
      "10",
      "--floor-bytes",
      "0",
      "--purpose",
      "low-floor",
      "--owner-pid",
      String(process.pid),
      "--json",
    ],
    env
  );
  assert.equal(denied.status, 75, denied.stderr);
  assert.equal(json(run(["status", "--common-dir", commonDir, "--json"], env)).leases.length, 1);
});

test("resize preserves every existing floor without changing the denied lease", () => {
  const commonDir = sandbox();
  const env = fixedStatfsEnv(commonDir, "available-20", 20);
  json(
    run(
      [
        "reserve",
        "--common-dir",
        commonDir,
        "--reserve-bytes",
        "5",
        "--floor-bytes",
        "12",
        "--purpose",
        "resize-high-floor",
        "--owner-pid",
        String(process.pid),
        "--json",
      ],
      env
    )
  );
  const low = json(
    run(
      [
        "reserve",
        "--common-dir",
        commonDir,
        "--reserve-bytes",
        "1",
        "--floor-bytes",
        "0",
        "--purpose",
        "resize-low-floor",
        "--owner-pid",
        String(process.pid),
        "--json",
      ],
      env
    )
  );
  const denied = run(
    [
      "resize",
      "--common-dir",
      commonDir,
      "--lease",
      low.lease.handle,
      "--reserve-bytes",
      "10",
      "--json",
    ],
    env
  );
  assert.equal(denied.status, 75, denied.stderr);
  const status = json(run(["status", "--common-dir", commonDir, "--json"], env));
  assert.equal(status.leases.find((lease) => lease.id === low.lease.id).reservedBytes, "1");
});

test("every lease check enforces the highest floor in the ledger", () => {
  const commonDir = sandbox();
  const highEnv = fixedStatfsEnv(commonDir, "available-20", 20);
  const lowEnv = fixedStatfsEnv(commonDir, "available-15", 15);
  const high = json(
    run(
      [
        "reserve",
        "--common-dir",
        commonDir,
        "--reserve-bytes",
        "5",
        "--floor-bytes",
        "12",
        "--purpose",
        "check-high-floor",
        "--owner-pid",
        String(process.pid),
        "--json",
      ],
      highEnv
    )
  );
  const low = json(
    run(
      [
        "reserve",
        "--common-dir",
        commonDir,
        "--reserve-bytes",
        "1",
        "--floor-bytes",
        "0",
        "--purpose",
        "check-low-floor",
        "--owner-pid",
        String(process.pid),
        "--json",
      ],
      highEnv
    )
  );
  for (const handle of [high.lease.handle, low.lease.handle]) {
    const denied = run(["check", "--common-dir", commonDir, "--lease", handle, "--json"], lowEnv);
    assert.equal(denied.status, 75, denied.stderr);
  }
});

for (const protectedPath of ["state", "ledger", "ledger-lock", "compat-lock"]) {
  test(`a dangling ${protectedPath} symlink fails closed without creating its target`, () => {
    const commonDir = sandbox();
    const stateDir = join(commonDir, "omniroute-resource-budget");
    const target = join(commonDir, `${protectedPath}-outside-target`);
    if (protectedPath === "state") {
      symlinkSync(target, stateDir);
    } else if (protectedPath === "ledger") {
      mkdirSync(stateDir, { mode: 0o700 });
      symlinkSync(target, join(stateDir, "leases-v1.json"));
    } else if (protectedPath === "ledger-lock") {
      symlinkSync(target, join(commonDir, "omniroute-resource-budget.lock"));
    } else {
      symlinkSync(target, join(commonDir, "omniroute-new-worktree.lock"));
    }
    const args =
      protectedPath === "compat-lock"
        ? [
            "run",
            "--common-dir",
            commonDir,
            "--reserve-bytes",
            "1",
            "--monitor-floor-bytes",
            "0",
            "--purpose",
            "dangling-compat-lock",
            "--",
            process.execPath,
            "-e",
            "process.exit(0)",
          ]
        : [
            "reserve",
            "--common-dir",
            commonDir,
            "--reserve-bytes",
            "1",
            "--floor-bytes",
            "0",
            "--purpose",
            `dangling-${protectedPath}`,
            "--owner-pid",
            String(process.pid),
            "--json",
          ];
    const result = run(args);
    assert.equal(result.status, 78, result.stderr);
    assert.equal(existsSync(target), false, "the symlink target was created");
  });
}

test("status preserves a stale lease until explicit identity-checked reclaim", async () => {
  const commonDir = sandbox();
  const owner = spawn(process.execPath, ["-e", "setInterval(() => {}, 1000)"], {
    stdio: "ignore",
  });
  await once(owner, "spawn");
  try {
    const reserved = json(
      run([
        "reserve",
        "--common-dir",
        commonDir,
        "--reserve-bytes",
        "1",
        "--floor-bytes",
        "0",
        "--purpose",
        "stale-owner",
        "--owner-pid",
        String(owner.pid),
        "--json",
      ])
    );
    owner.kill("SIGTERM");
    await once(owner, "close");

    const stale = json(run(["status", "--common-dir", commonDir, "--json"]));
    assert.equal(stale.leases.length, 1, "status must not auto-purge");
    assert.equal(stale.leases[0].identity, "STALE");
    assert.equal(stale.leases[0].reason, "pid-missing");

    const reclaimed = json(
      run(["reclaim-stale", "--common-dir", commonDir, "--lease-id", reserved.lease.id, "--json"])
    );
    assert.equal(reclaimed.reclaimed, reserved.lease.id);
    const empty = json(run(["status", "--common-dir", commonDir, "--json"]));
    assert.deepEqual(empty.leases, []);
  } finally {
    if (owner.exitCode === null && owner.signalCode === null) owner.kill("SIGKILL");
  }
});

test("reclaim-stale refuses a lease whose owner identity is still live", () => {
  const commonDir = sandbox();
  const reserved = json(
    run([
      "reserve",
      "--common-dir",
      commonDir,
      "--reserve-bytes",
      "1",
      "--floor-bytes",
      "0",
      "--purpose",
      "live-owner",
      "--owner-pid",
      String(process.pid),
      "--json",
    ])
  );
  const reclaim = run([
    "reclaim-stale",
    "--common-dir",
    commonDir,
    "--lease-id",
    reserved.lease.id,
    "--json",
  ]);
  assert.equal(reclaim.status, 78, reclaim.stderr);
  assert.match(reclaim.stderr, /LIVE/);
  assert.equal(json(run(["status", "--common-dir", commonDir, "--json"])).leases.length, 1);
});

test("PID reuse is stale, while unreadable identity remains UNKNOWN and unreclaimable", () => {
  const reusedDir = sandbox();
  const reused = json(
    run([
      "reserve",
      "--common-dir",
      reusedDir,
      "--reserve-bytes",
      "1",
      "--floor-bytes",
      "0",
      "--purpose",
      "pid-reuse",
      "--owner-pid",
      String(process.pid),
      "--json",
    ])
  );
  const reusedLedgerPath = join(reusedDir, "omniroute-resource-budget", "leases-v1.json");
  const reusedLedger = JSON.parse(readFileSync(reusedLedgerPath, "utf8"));
  reusedLedger.leases[0].owner.startTicks = String(
    BigInt(reusedLedger.leases[0].owner.startTicks) + 1n
  );
  writeFileSync(reusedLedgerPath, `${JSON.stringify(reusedLedger, null, 2)}\n`);
  const reusedStatus = json(run(["status", "--common-dir", reusedDir, "--json"]));
  assert.equal(reusedStatus.leases[0].identity, "STALE");
  assert.equal(reusedStatus.leases[0].reason, "pid-reused");
  json(run(["reclaim-stale", "--common-dir", reusedDir, "--lease-id", reused.lease.id, "--json"]));

  const unknownDir = sandbox();
  const unknown = json(
    run([
      "reserve",
      "--common-dir",
      unknownDir,
      "--reserve-bytes",
      "1",
      "--floor-bytes",
      "0",
      "--purpose",
      "unknown-owner",
      "--owner-pid",
      String(process.pid),
      "--json",
    ])
  );
  const preload = join(unknownDir, "deny-proc-read.mjs");
  writeFileSync(
    preload,
    [
      'import fs from "node:fs";',
      'import { syncBuiltinESMExports } from "node:module";',
      "const original = fs.readFileSync.bind(fs);",
      `fs.readFileSync = (path, ...args) => { if (String(path) === ${JSON.stringify(`/proc/${process.pid}/stat`)}) { const error = new Error("fixture EACCES"); error.code = "EACCES"; throw error; } return original(path, ...args); };`,
      "syncBuiltinESMExports();",
    ].join("\n")
  );
  const env = { ...process.env, NODE_OPTIONS: `--import=${preload}` };
  const unknownStatus = json(run(["status", "--common-dir", unknownDir, "--json"], env));
  assert.equal(unknownStatus.leases[0].identity, "UNKNOWN");
  const reclaim = run(
    ["reclaim-stale", "--common-dir", unknownDir, "--lease-id", unknown.lease.id, "--json"],
    env
  );
  assert.equal(reclaim.status, 78, reclaim.stderr);
  assert.match(reclaim.stderr, /UNKNOWN/);
  json(run(["release", "--common-dir", unknownDir, "--lease", unknown.lease.handle, "--json"]));
});

test("check and resize keep one authenticated lease without an unreserved gap", () => {
  const commonDir = sandbox();
  const reserved = json(
    run([
      "reserve",
      "--common-dir",
      commonDir,
      "--reserve-bytes",
      "10",
      "--floor-bytes",
      "0",
      "--purpose",
      "resize-owner",
      "--owner-pid",
      String(process.pid),
      "--json",
    ])
  );
  const checked = json(
    run(["check", "--common-dir", commonDir, "--lease", reserved.lease.handle, "--json"])
  );
  assert.equal(checked.checked, reserved.lease.id);
  assert.equal(checked.identity, "LIVE");

  const resized = json(
    run([
      "resize",
      "--common-dir",
      commonDir,
      "--lease",
      reserved.lease.handle,
      "--reserve-bytes",
      "20",
      "--json",
    ])
  );
  assert.equal(resized.reservedBytes, "20");
  const status = json(run(["status", "--common-dir", commonDir, "--json"]));
  assert.equal(status.leases.length, 1);
  assert.equal(status.leases[0].reservedBytes, "20");

  const denied = run([
    "resize",
    "--common-dir",
    commonDir,
    "--lease",
    reserved.lease.handle,
    "--reserve-bytes",
    "999999999999999999999999999999",
    "--json",
  ]);
  assert.equal(denied.status, 75, denied.stderr);
  assert.equal(
    json(run(["status", "--common-dir", commonDir, "--json"])).leases[0].reservedBytes,
    "20",
    "a denied resize must preserve the prior reservation"
  );
});

test("a forged lease token cannot check, resize, or release another owner's reservation", () => {
  const commonDir = sandbox();
  const reserved = json(
    run([
      "reserve",
      "--common-dir",
      commonDir,
      "--reserve-bytes",
      "1",
      "--floor-bytes",
      "0",
      "--purpose",
      "token-owner",
      "--owner-pid",
      String(process.pid),
      "--json",
    ])
  );
  const forged = `${reserved.lease.id}.${"0".repeat(64)}`;
  for (const args of [
    ["check", "--common-dir", commonDir, "--lease", forged, "--json"],
    ["resize", "--common-dir", commonDir, "--lease", forged, "--reserve-bytes", "2", "--json"],
    ["release", "--common-dir", commonDir, "--lease", forged, "--json"],
  ]) {
    const result = run(args);
    assert.equal(result.status, 78, `${args[0]}: ${result.stderr}`);
  }
  assert.equal(json(run(["status", "--common-dir", commonDir, "--json"])).leases.length, 1);
});

test("pressure monitoring terminates only its own process group", async () => {
  const dir = sandbox();
  const grandchildPidFile = join(dir, "grandchild.pid");
  const sentinel = spawn(process.execPath, ["-e", "setInterval(() => {}, 1000)"], {
    detached: true,
    stdio: "ignore",
  });
  sentinel.unref();
  try {
    const childProgram = [
      'const { spawn } = require("node:child_process");',
      'const { writeFileSync } = require("node:fs");',
      `const child = spawn(process.execPath, ["-e", "process.on('SIGTERM', () => {}); setInterval(() => {}, 1000)"], { stdio: "ignore" });`,
      `writeFileSync(${JSON.stringify(grandchildPidFile)}, String(child.pid));`,
      'process.on("SIGTERM", () => {});',
      "setInterval(() => {}, 1000);",
    ].join("\n");

    const outcome = await runMonitoredCommand({
      command: process.execPath,
      args: ["-e", childProgram],
      monitorFloorBytes: 50n,
      pollMs: 10,
      graceMs: 1_000,
      stdio: "ignore",
      sampleAvailableBytes: async () => (existsSync(grandchildPidFile) ? 0n : 100n),
    });
    assert.equal(outcome.reason, "capacity-floor");
    assert.equal(outcome.exitCode, 75);

    const grandchildPid = Number(readFileSync(grandchildPidFile, "utf8"));
    await waitUntil(() => !isAlive(grandchildPid), "grandchild survived its owned process group");
    assert.equal(isAlive(sentinel.pid), true, "unrelated sentinel was signalled");
  } finally {
    if (isAlive(sentinel.pid)) process.kill(-sentinel.pid, "SIGKILL");
  }
});

test("a direct parent may exit on TERM without orphaning its TERM-ignoring child", async () => {
  const dir = sandbox();
  const grandchildPidFile = join(dir, "term-ignoring-child.pid");
  const termReceivedFile = join(dir, "term-ignoring-child.received");
  const grandchildProgram = [
    'const { writeFileSync } = require("node:fs");',
    `process.on("SIGTERM", () => writeFileSync(${JSON.stringify(termReceivedFile)}, "received"));`,
    `writeFileSync(${JSON.stringify(grandchildPidFile)}, String(process.pid));`,
    "setInterval(() => {}, 1000);",
  ].join("\n");
  const childProgram = [
    'const { spawn } = require("node:child_process");',
    `spawn(process.execPath, ["-e", ${JSON.stringify(grandchildProgram)}], { stdio: "ignore" });`,
    "setInterval(() => {}, 1000);",
  ].join("\n");

  const outcome = await runMonitoredCommand({
    command: process.execPath,
    args: ["-e", childProgram],
    monitorFloorBytes: 50n,
    pollMs: 10,
    graceMs: 100,
    stdio: "ignore",
    sampleAvailableBytes: async () => (existsSync(grandchildPidFile) ? 0n : 100n),
  });
  assert.equal(outcome.reason, "capacity-floor");
  assert.equal(outcome.exitCode, 75);

  const grandchildPid = Number(readFileSync(grandchildPidFile, "utf8"));
  assert.equal(readFileSync(termReceivedFile, "utf8"), "received");
  assert.equal(
    hasExecutableThreads(grandchildPid),
    false,
    "TERM-ignoring descendant still executable at terminal cleanup"
  );
  await waitUntil(
    () => !isAlive(grandchildPid),
    "TERM-ignoring descendant escaped sentinel cleanup"
  );
});

test("run propagates child status and releases its lease on every normal exit", () => {
  for (const expectedStatus of [0, 7]) {
    const commonDir = sandbox();
    const result = run([
      "run",
      "--common-dir",
      commonDir,
      "--reserve-bytes",
      "1",
      "--monitor-floor-bytes",
      "0",
      "--purpose",
      `run-exit-${expectedStatus}`,
      "--poll-ms",
      "10",
      "--grace-ms",
      "500",
      "--",
      process.execPath,
      "-e",
      `process.exit(${expectedStatus})`,
    ]);
    assert.equal(result.status, expectedStatus, result.stderr);
    assert.deepEqual(
      json(run(["status", "--common-dir", commonDir, "--json"])).leases,
      [],
      `lease leaked after child exit ${expectedStatus}`
    );
  }
});

test("run emits sampled capacity receipts for success and workload failure", () => {
  for (const [expectedStatus, classification] of [
    [0, "PASS"],
    [7, "WORKLOAD_FAILED"],
  ]) {
    const commonDir = sandbox();
    const result = run([
      "run",
      "--common-dir",
      commonDir,
      "--reserve-bytes",
      "1",
      "--monitor-floor-bytes",
      "0",
      "--purpose",
      `receipt-${expectedStatus}`,
      "--poll-ms",
      "10",
      "--grace-ms",
      "500",
      "--",
      process.execPath,
      "-e",
      `process.exit(${expectedStatus})`,
    ]);
    assert.equal(result.status, expectedStatus, result.stderr);
    const receipt = terminalReceipt(result);
    assert.equal(receipt.classification, classification);
    assert.equal(receipt.exitCode, expectedStatus);
    assert.match(receipt.leaseId, /^[0-9a-f-]+$/);
    assert.match(receipt.initialAvailableBytes, /^[0-9]+$/);
    assert.match(receipt.minimumObservedAvailableBytes, /^[0-9]+$/);
    assert.match(receipt.finalAvailableBytes, /^[0-9]+$/);
    assert.ok(receipt.observedSamples >= 2);
    assert.equal(receipt.quiescence, "PROVEN_EMPTY");
    assert.equal(receipt.leaseState, "RELEASED");
  }
});

test("run preserves a workload exit caused by a signal", () => {
  const commonDir = sandbox();
  const result = run([
    "run",
    "--common-dir",
    commonDir,
    "--reserve-bytes",
    "1",
    "--monitor-floor-bytes",
    "0",
    "--purpose",
    "signal-exit",
    "--poll-ms",
    "10",
    "--grace-ms",
    "500",
    "--",
    process.execPath,
    "-e",
    'process.kill(process.pid, "SIGTERM")',
  ]);
  assert.equal(result.status, 143, result.stderr);
  const receipt = terminalReceipt(result);
  assert.equal(receipt.classification, "WORKLOAD_FAILED");
  assert.equal(receipt.exitCode, 143);
  assert.equal(receipt.workloadSignal, "SIGTERM");
});

test("a runtime capacity crossing emits RESOURCE_HOLD with sampled minimum", () => {
  const commonDir = sandbox();
  const preload = join(commonDir, "runtime-capacity-crossing.mjs");
  writeFileSync(
    preload,
    [
      'import fs from "node:fs";',
      'import { syncBuiltinESMExports } from "node:module";',
      'const low = process.argv.includes("status");',
      "fs.statfsSync = () => ({ bavail: low ? 0n : 1000n, bsize: 1n });",
      "syncBuiltinESMExports();",
    ].join("\n")
  );
  const env = { ...process.env, NODE_OPTIONS: `--import=${preload}` };
  const result = run(
    [
      "run",
      "--common-dir",
      commonDir,
      "--reserve-bytes",
      "1",
      "--monitor-floor-bytes",
      "1",
      "--purpose",
      "runtime-capacity-hold",
      "--poll-ms",
      "10",
      "--grace-ms",
      "500",
      "--",
      process.execPath,
      "-e",
      "setInterval(() => {}, 1000)",
    ],
    env
  );
  assert.equal(result.status, 75, result.stderr);
  const receipt = terminalReceipt(result);
  assert.equal(receipt.classification, "RESOURCE_HOLD");
  assert.equal(receipt.exitCode, 75);
  assert.equal(receipt.minimumObservedAvailableBytes, "0");
  assert.equal(receipt.initialAvailableBytes, "0");
  assert.equal(receipt.finalAvailableBytes, "0");
  assert.equal(receipt.quiescence, "NOT_STARTED");
});

test("a final capacity crossing fails the guard but preserves workload exit zero", () => {
  const commonDir = sandbox();
  const counter = join(commonDir, "final-capacity-counter.txt");
  const preload = join(commonDir, "final-capacity-crossing.mjs");
  writeFileSync(counter, "0");
  writeFileSync(
    preload,
    [
      'import fs from "node:fs";',
      'import { syncBuiltinESMExports } from "node:module";',
      "fs.statfsSync = () => {",
      "  let sample = 0;",
      '  if (process.argv.includes("status")) {',
      `    sample = Number(fs.readFileSync(${JSON.stringify(counter)}, "utf8")) + 1;`,
      `    fs.writeFileSync(${JSON.stringify(counter)}, String(sample));`,
      "  }",
      "  return { bavail: sample >= 3 ? 0n : 100n, bsize: 1n };",
      "};",
      "syncBuiltinESMExports();",
    ].join("\n")
  );
  const env = { ...process.env, NODE_OPTIONS: `--import=${preload}` };
  const result = run(
    [
      "run",
      "--common-dir",
      commonDir,
      "--reserve-bytes",
      "1",
      "--monitor-floor-bytes",
      "10",
      "--purpose",
      "final-capacity-hold",
      "--poll-ms",
      "20",
      "--grace-ms",
      "500",
      "--",
      process.execPath,
      "-e",
      "process.exit(0)",
    ],
    env
  );

  assert.equal(result.status, 75, result.stderr);
  assert.equal(readFileSync(counter, "utf8"), "3");
  const receipt = terminalReceipt(result);
  assert.equal(receipt.classification, "RESOURCE_HOLD");
  assert.equal(receipt.exitCode, 75);
  assert.equal(receipt.workloadExitCode, 0);
  assert.equal(receipt.workloadSignal, null);
  assert.equal(receipt.minimumObservedAvailableBytes, "0");
  assert.equal(receipt.finalAvailableBytes, "0");
  assert.equal(receipt.quiescence, "PROVEN_EMPTY");
  assert.equal(receipt.leaseState, "RELEASED");
});

test("a runtime floor crossing preserves the workload exit observed during cleanup", () => {
  const commonDir = sandbox();
  const marker = join(commonDir, "runtime-exit-identity.started");
  const preload = join(commonDir, "runtime-exit-identity.mjs");
  writeFileSync(
    preload,
    [
      'import fs from "node:fs";',
      'import { syncBuiltinESMExports } from "node:module";',
      `fs.statfsSync = () => ({ bavail: fs.existsSync(${JSON.stringify(marker)}) ? 0n : 100n, bsize: 1n });`,
      "syncBuiltinESMExports();",
    ].join("\n")
  );
  const env = { ...process.env, NODE_OPTIONS: `--import=${preload}` };
  const workload = [
    'process.on("SIGTERM", () => process.exit(42));',
    `require("node:fs").writeFileSync(${JSON.stringify(marker)}, "started");`,
    "setInterval(() => {}, 1000);",
  ].join("\n");
  const result = run(
    [
      "run",
      "--common-dir",
      commonDir,
      "--reserve-bytes",
      "1",
      "--monitor-floor-bytes",
      "10",
      "--purpose",
      "runtime-exit-identity",
      "--poll-ms",
      "20",
      "--grace-ms",
      "500",
      "--",
      process.execPath,
      "-e",
      workload,
    ],
    env
  );

  assert.equal(result.status, 75, result.stderr);
  const receipt = terminalReceipt(result);
  assert.equal(receipt.classification, "RESOURCE_HOLD");
  assert.equal(receipt.exitCode, 75);
  assert.equal(receipt.workloadExitCode, 42);
  assert.equal(receipt.workloadSignal, null);
  assert.equal(receipt.quiescence, "PROVEN_EMPTY");
  assert.equal(receipt.leaseState, "RELEASED");
});

test("SIGTERM to the CLI cleans descendants before releasing lease and compatibility lock", async () => {
  const commonDir = sandbox();
  const grandchildPidFile = join(commonDir, "wrapper-term-child.pid");
  const command = [
    'const { spawn } = require("node:child_process");',
    'const { writeFileSync } = require("node:fs");',
    'const child = spawn(process.execPath, ["-e", "setInterval(() => {}, 1000)"], { stdio: "ignore" });',
    `writeFileSync(${JSON.stringify(grandchildPidFile)}, String(child.pid));`,
    "setInterval(() => {}, 1000);",
  ].join("\n");
  const running = startAsync([
    "run",
    "--common-dir",
    commonDir,
    "--reserve-bytes",
    "1",
    "--monitor-floor-bytes",
    "0",
    "--purpose",
    "wrapper-term",
    "--poll-ms",
    "20",
    "--grace-ms",
    "200",
    "--",
    process.execPath,
    "-e",
    command,
  ]);
  await waitUntil(() => existsSync(grandchildPidFile), "run command never started");
  await waitUntil(
    () => json(run(["status", "--common-dir", commonDir, "--json"])).leases.length === 1,
    "run lease never became visible"
  );
  const compatLock = join(commonDir, "omniroute-new-worktree.lock");
  assert.notEqual(
    spawnSync("flock", ["-x", "-n", compatLock, "true"]).status,
    0,
    "run did not hold the compatibility lock"
  );
  assert.equal(
    spawnSync("flock", ["-s", "-n", compatLock, "true"]).status,
    0,
    "heavy runs should share the compatibility barrier and rely on reservations"
  );

  running.child.kill("SIGTERM");
  const result = await running.completed;
  assert.equal(result.status, 143, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
  const grandchildPid = Number(readFileSync(grandchildPidFile, "utf8"));
  // An outer subreaper may still own the exited descendant's zombie. It alone
  // can reap that PID; this must not keep the guard's anchor or lease alive.
  assert.equal(
    hasExecutableThreads(grandchildPid),
    false,
    "descendant still executable when wrapper SIGTERM completed"
  );
  await waitUntil(() => !isAlive(grandchildPid), "descendant survived wrapper SIGTERM");
  assert.deepEqual(json(run(["status", "--common-dir", commonDir, "--json"])).leases, []);
  assert.equal(
    spawnSync("flock", ["-x", "-n", compatLock, "true"]).status,
    0,
    "compatibility lock released before cleanup completed"
  );
});

test("controller crash leaves the anchored lease and lock until bounded descendant cleanup", async () => {
  const commonDir = sandbox();
  const grandchildPidFile = join(commonDir, "controller-crash-child.pid");
  const command = [
    'const { spawn } = require("node:child_process");',
    'const { writeFileSync } = require("node:fs");',
    `const child = spawn(process.execPath, ["-e", "process.on('SIGTERM', () => {}); setInterval(() => {}, 1000)"], { stdio: "ignore" });`,
    `writeFileSync(${JSON.stringify(grandchildPidFile)}, String(child.pid));`,
    'process.on("SIGTERM", () => {});',
    "setInterval(() => {}, 1000);",
  ].join("\n");
  const running = startAsync([
    "run",
    "--common-dir",
    commonDir,
    "--reserve-bytes",
    "1",
    "--monitor-floor-bytes",
    "0",
    "--purpose",
    "controller-crash",
    "--poll-ms",
    "20",
    "--grace-ms",
    "3000",
    "--",
    process.execPath,
    "-e",
    command,
  ]);
  await waitUntil(() => existsSync(grandchildPidFile), "run command never started");
  await waitUntil(() => childPids(running.child.pid).length === 1, "controller PID not found");
  const controllerPid = childPids(running.child.pid)[0];
  const beforeCrash = json(run(["status", "--common-dir", commonDir, "--json"]));
  assert.equal(beforeCrash.leases.length, 1);
  const anchorPid = beforeCrash.leases[0].ownerPid;
  assert.notEqual(
    anchorPid,
    controllerPid,
    "lease was not transferred to the process-group anchor"
  );
  const compatLock = join(commonDir, "omniroute-new-worktree.lock");

  process.kill(controllerPid, "SIGKILL");
  const duringCleanup = json(run(["status", "--common-dir", commonDir, "--json"]));
  assert.equal(duringCleanup.leases.length, 1);
  assert.equal(duringCleanup.leases[0].identity, "LIVE");
  assert.equal(duringCleanup.leases[0].ownerPid, anchorPid);
  assert.notEqual(
    spawnSync("flock", ["-x", "-n", compatLock, "true"]).status,
    0,
    "anchor released the compatibility lock before cleanup"
  );

  const grandchildPid = Number(readFileSync(grandchildPidFile, "utf8"));
  const outerResult = await running.completed;
  assert.notEqual(outerResult.status, 0, "controller crash was reported as success");
  await waitUntil(() => !isAlive(anchorPid), "anchor did not finish bounded disconnect cleanup");
  await waitUntil(() => !isAlive(grandchildPid), "descendant survived disconnect cleanup");
  const afterCleanup = json(run(["status", "--common-dir", commonDir, "--json"]));
  assert.equal(afterCleanup.leases.length, 1, "crash cleanup must not auto-release the lease");
  assert.equal(afterCleanup.leases[0].identity, "STALE");
  assert.equal(afterCleanup.reservedBytes, "1");
  assert.equal(spawnSync("flock", ["-x", "-n", compatLock, "true"]).status, 0);

  json(
    run([
      "reclaim-stale",
      "--common-dir",
      commonDir,
      "--lease-id",
      afterCleanup.leases[0].id,
      "--json",
    ])
  );
});

test("sentinel loss preserves an UNKNOWN lease and never signals the surviving workload", async () => {
  const commonDir = sandbox();
  const workloadPidFile = join(commonDir, "lost-sentinel-workload.pid");
  const command = [
    'const { writeFileSync } = require("node:fs");',
    `writeFileSync(${JSON.stringify(workloadPidFile)}, String(process.pid));`,
    "process.stdout.destroy(); process.stderr.destroy();",
    "setInterval(() => {}, 1000);",
  ].join("\n");
  const running = startAsync([
    "run",
    "--common-dir",
    commonDir,
    "--reserve-bytes",
    "1",
    "--monitor-floor-bytes",
    "0",
    "--purpose",
    "lost-sentinel",
    "--poll-ms",
    "20",
    "--grace-ms",
    "200",
    "--",
    process.execPath,
    "-e",
    command,
  ]);
  await waitUntil(() => existsSync(workloadPidFile), "workload never started");
  const active = json(run(["status", "--common-dir", commonDir, "--json"]));
  assert.equal(active.leases.length, 1);
  const lease = active.leases[0];
  const workloadPid = Number(readFileSync(workloadPidFile, "utf8"));
  assert.equal(isAlive(lease.ownerPid), true);
  assert.equal(isAlive(workloadPid), true);

  process.kill(lease.ownerPid, "SIGKILL");
  const timeout = Symbol("timeout");
  const outcome = await Promise.race([
    running.exited,
    new Promise((resolve) => setTimeout(() => resolve(timeout), 2_000)),
  ]);
  if (outcome === timeout) {
    running.child.kill("SIGTERM");
    if (isAlive(workloadPid)) process.kill(workloadPid, "SIGKILL");
    await running.completed;
    assert.fail("wrapper did not detect the lost sentinel within its bounded poll interval");
  }

  assert.equal(outcome.status, 78, `stdout:\n${outcome.stdout}\nstderr:\n${outcome.stderr}`);
  const receipt = terminalReceipt(outcome);
  assert.equal(receipt.classification, "RESOURCE_HOLD");
  assert.equal(receipt.quiescence, "UNKNOWN");
  assert.equal(receipt.leaseState, "PRESERVED");
  assert.equal(
    receipt.observedGroupMembers.some(
      (member) => member.pid === workloadPid && /^[0-9]+$/.test(member.startTicks)
    ),
    true
  );
  assert.equal(isAlive(workloadPid), true, "lost-anchor handling signalled the workload");
  const held = json(run(["status", "--common-dir", commonDir, "--json"]));
  assert.equal(held.leases.length, 1);
  assert.equal(held.leases[0].identity, "STALE");
  assert.equal(held.leases[0].quiescence, "NOT_QUIESCENT");
  const prematureReclaim = run([
    "reclaim-stale",
    "--common-dir",
    commonDir,
    "--lease-id",
    lease.id,
    "--json",
  ]);
  assert.equal(prematureReclaim.status, 78, prematureReclaim.stderr);

  process.kill(workloadPid, "SIGKILL");
  await waitUntil(() => !isAlive(workloadPid), "workload survived fixture cleanup");
  await running.completed;
  const drained = json(run(["status", "--common-dir", commonDir, "--json"]));
  assert.equal(drained.leases[0].quiescence, "PROVEN_EMPTY");
  json(run(["reclaim-stale", "--common-dir", commonDir, "--lease-id", lease.id, "--json"]));
});

test("a shutdown refusal is bounded and preserves the lease for explicit recovery", async () => {
  const commonDir = sandbox();
  const preload = join(commonDir, "one-unknown-proc-scan.mjs");
  writeFileSync(
    preload,
    [
      'import fs from "node:fs";',
      'import { syncBuiltinESMExports } from "node:module";',
      "const original = fs.readdirSync.bind(fs);",
      "let injected = false;",
      "fs.readdirSync = (path, ...args) => {",
      '  if (!injected && process.argv.includes("__group-leader") && String(path) === "/proc") {',
      "    injected = true;",
      '    const error = new Error("fixture unreadable /proc");',
      '    error.code = "EACCES";',
      "    throw error;",
      "  }",
      "  return original(path, ...args);",
      "};",
      "syncBuiltinESMExports();",
    ].join("\n")
  );
  const env = { ...process.env, NODE_OPTIONS: `--import=${preload}` };
  const running = startAsync(
    [
      "run",
      "--common-dir",
      commonDir,
      "--reserve-bytes",
      "1",
      "--monitor-floor-bytes",
      "0",
      "--purpose",
      "shutdown-refusal",
      "--poll-ms",
      "20",
      "--grace-ms",
      "100",
      "--",
      process.execPath,
      "-e",
      "process.exit(0)",
    ],
    env
  );
  let lease;
  await waitUntil(() => {
    lease = json(run(["status", "--common-dir", commonDir, "--json"])).leases[0];
    return lease?.processGroup !== undefined && lease.processGroup === lease.ownerPid;
  }, "run lease was never transferred to the anchor");
  const timeout = Symbol("timeout");
  const result = await Promise.race([
    running.completed,
    new Promise((resolve) => setTimeout(() => resolve(timeout), 8_000)),
  ]);
  if (result === timeout) {
    const [controllerPid] = childPids(running.child.pid);
    if (controllerPid && isAlive(controllerPid)) process.kill(controllerPid, "SIGKILL");
    const cleanupResult = await running.completed;
    await waitUntil(() => !isAlive(lease.ownerPid), "anchor survived test cleanup");
    json(run(["reclaim-stale", "--common-dir", commonDir, "--lease-id", lease.id, "--json"]));
    assert.fail(
      `shutdown refusal left the controller waiting without a bound\nstdout:\n${cleanupResult.stdout}\nstderr:\n${cleanupResult.stderr}`
    );
  }

  assert.equal(result.status, 78, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
  assert.match(result.stderr, /shutdown refused|shutdown confirmation timed out/);
  const receipt = terminalReceipt(result);
  assert.equal(receipt.workloadExitCode, 0);
  assert.equal(receipt.workloadSignal, null);
  assert.equal(receipt.quiescence, "UNKNOWN");
  assert.equal(receipt.leaseState, "PRESERVED");
  await waitUntil(() => !isAlive(lease.ownerPid), "anchor did not finish disconnect cleanup");
  const stale = json(run(["status", "--common-dir", commonDir, "--json"]));
  assert.equal(stale.leases[0].identity, "STALE");
  json(run(["reclaim-stale", "--common-dir", commonDir, "--lease-id", lease.id, "--json"]));
});
