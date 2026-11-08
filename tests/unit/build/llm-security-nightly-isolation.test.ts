// Regression guard for the dead Nightly LLM Security workflow (no verdict since 2026-08-27).
//
// Both eval jobs run on the self-hosted `omni-light` pool whose runner keeps a persistent
// $HOME. The server they boot (`node dist/server.js`) defaulted to `$HOME/.omniroute`, where
// the database left behind by older nights sat at migration 134 while the tip ships 200+.
// The mass-migration safety guard (#3416, threshold 50) then refuses to migrate an existing
// database, the catalog warm-up reads a table that never got created
// (`no such table: model_capability_overrides`) and the health wait fails every night.
//
// Contract pinned here, modelled on nightly-schemathesis.yml: each job prepares a fresh
// DATA_DIR under $RUNNER_TEMP before it boots the server, the server really sees that
// directory (never the runner's home), auto-backups stay off, and two runs never share state.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import * as yaml from "js-yaml";

interface Step {
  name?: string;
  id?: string;
  run?: string;
  env?: Record<string, string>;
  if?: string;
}

interface Job {
  env?: Record<string, string>;
  steps: Step[];
}

const workflow = yaml.load(
  fs.readFileSync(
    new URL("../../../.github/workflows/nightly-llm-security.yml", import.meta.url),
    "utf8"
  )
) as { jobs: Record<string, Job> };

const PREPARE_STEP = "Prepare isolated runtime state";

const TARGETS = [
  { jobName: "promptfoo-guard", startStep: "Start OmniRoute (block mode)", gated: false },
  { jobName: "garak", startStep: "Start OmniRoute", gated: true },
];

function fixture(t: test.TestContext) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "llm-security-nightly-"));
  const bin = path.join(dir, "bin");
  const home = path.join(dir, "home");
  fs.mkdirSync(bin);
  // Model the persistent runner: a stale database already lives in $HOME/.omniroute.
  fs.mkdirSync(path.join(home, ".omniroute"), { recursive: true });
  fs.writeFileSync(path.join(home, ".omniroute", "storage.sqlite"), "stale runner database");
  const env: NodeJS.ProcessEnv = {
    PATH: `${bin}:${process.env.PATH}`,
    HOME: home,
    RUNNER_TEMP: dir,
    GITHUB_ENV: path.join(dir, "github-env"),
    FIXTURE: dir,
  };
  fs.writeFileSync(env.GITHUB_ENV!, "");
  const scripts = {
    node: 'printf "%s\\n%s\\n%s\\n" "$DATA_DIR" "$DISABLE_SQLITE_AUTO_BACKUP" "$OMNIROUTE_PLUGINS_DIR" > "$FIXTURE/server-env"\nexec /bin/sleep 60',
    // Healthy only once the fake server has written its environment, like a real health
    // check: the start step runs the server in the background, so a curl that always
    // passed let the step return before the server wrote anything (see the k6 sibling).
    curl: '[ -s "$FIXTURE/server-env" ] || exit 7',
    sleep: "/bin/sleep 0.05",
  };
  for (const [name, script] of Object.entries(scripts)) {
    fs.writeFileSync(path.join(bin, name), `#!/bin/sh\n${script}\n`, { mode: 0o755 });
  }
  t.after(() => {
    const pidFile = path.join(dir, "server.pid");
    if (fs.existsSync(pidFile)) {
      try {
        process.kill(Number(fs.readFileSync(pidFile, "utf8")));
      } catch {
        // The fake server may already be gone.
      }
    }
    fs.rmSync(dir, { recursive: true, force: true });
  });
  const run = (step: Step, overrides: NodeJS.ProcessEnv = {}) =>
    spawnSync("bash", ["-e", "-o", "pipefail", "-c", step.run!], {
      cwd: dir,
      env: { ...env, ...step.env, ...overrides },
      encoding: "utf8",
      timeout: 5000,
    });
  const exported = () => {
    const out: Record<string, string> = {};
    for (const line of fs.readFileSync(env.GITHUB_ENV!, "utf8").split("\n")) {
      const equals = line.indexOf("=");
      if (equals > 0) out[line.slice(0, equals)] = line.slice(equals + 1);
    }
    return out;
  };
  return { dir, env, run, exported };
}

async function freePort(t: test.TestContext) {
  const server = net.createServer((socket) => socket.destroy());
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = String((server.address() as net.AddressInfo).port);
  await new Promise<void>((resolve) => server.close(() => resolve()));
  t.after(() => server.close());
  return port;
}

for (const { jobName, startStep, gated } of TARGETS) {
  const job = workflow.jobs[jobName];
  const steps = job?.steps ?? [];
  const prepare = steps.find((step) => step.name === PREPARE_STEP);
  const start = steps.find((step) => step.name === startStep);

  test(`${jobName}: prepares a fresh DATA_DIR under RUNNER_TEMP before booting the eval server`, async (t) => {
    assert.ok(job, `nightly-llm-security.yml must keep the '${jobName}' job`);
    assert.ok(start, `'${jobName}' must keep its '${startStep}' step`);
    assert.ok(prepare?.run, `'${jobName}' must gain a '${PREPARE_STEP}' run step`);
    assert.ok(
      steps.indexOf(prepare!) < steps.indexOf(start!),
      "the runtime state must be prepared before the server starts"
    );

    const f = fixture(t);
    const port = await freePort(t);
    const dataDirs: string[] = [];
    for (let attempt = 0; attempt < 2; attempt++) {
      const prepared = f.run(prepare!);
      assert.equal(prepared.status, 0, prepared.stderr);
      const exported = f.exported();
      const dataDir = exported.DATA_DIR;
      assert.ok(dataDir, "the prepare step must export DATA_DIR through GITHUB_ENV");
      assert.ok(
        dataDir.startsWith(`${f.dir}${path.sep}`),
        `DATA_DIR must live under RUNNER_TEMP, got ${dataDir}`
      );
      assert.ok(fs.statSync(dataDir).isDirectory(), "DATA_DIR must exist before the server boots");
      assert.equal(
        fs.existsSync(path.join(dataDir, "storage.sqlite")),
        false,
        "a fresh DATA_DIR must start with no database"
      );
      assert.equal(exported.OMNIROUTE_PLUGINS_DIR, path.join(dataDir, "plugins"));

      // Each boot must be judged by its own server: drop the previous boot's file first.
      fs.rmSync(path.join(f.dir, "server-env"), { force: true });
      const booted = f.run(start!, { ...exported, PORT: port });
      assert.equal(booted.status, 0, booted.stderr);
      const [seenDataDir, seenBackupFlag, seenPluginsDir] = fs
        .readFileSync(path.join(f.dir, "server-env"), "utf8")
        .split("\n");
      assert.equal(seenDataDir, dataDir, "the server must boot on the prepared DATA_DIR");
      assert.equal(seenPluginsDir, path.join(dataDir, "plugins"));
      assert.equal(
        seenBackupFlag,
        "true",
        "DISABLE_SQLITE_AUTO_BACKUP=true must reach the server (no pre-migration backup pile)"
      );
      assert.equal(
        fs.readFileSync(path.join(f.env.HOME!, ".omniroute", "storage.sqlite"), "utf8"),
        "stale runner database",
        "the runner's persistent $HOME/.omniroute must stay untouched"
      );
      dataDirs.push(dataDir);
      const pidFile = path.join(f.dir, "server.pid");
      process.kill(Number(fs.readFileSync(pidFile, "utf8")));
      fs.rmSync(pidFile);
    }
    assert.notEqual(dataDirs[0], dataDirs[1], "two runs must never share runtime state");
  });

  test(`${jobName}: the isolation step ${gated ? "is gated on the provider secret like its siblings" : "runs unconditionally"}`, () => {
    assert.ok(prepare, `'${jobName}' must gain a '${PREPARE_STEP}' step`);
    if (gated) {
      assert.equal(prepare!.if, "steps.gate.outputs.run == 'true'");
    } else {
      assert.equal(prepare!.if, undefined);
    }
  });
}
