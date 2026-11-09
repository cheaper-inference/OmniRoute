// Regression guard for the dead `k6-soak` job of Nightly Resilience (#16853).
//
// The job ran on the hosted 7 GB `ubuntu-latest` runner, which dies during the backend-only
// `npm run build:cli` ("The runner has received a shutdown signal", 8 nights out of 8) —
// the same class as #11965, which moved its siblings (promptfoo-guard, garak, a11y) to the
// self-hosted `omni-light` pool. That pool keeps a persistent $HOME, so the server must boot
// on a fresh DATA_DIR under $RUNNER_TEMP (same contract as nightly-llm-security.yml, see
// llm-security-nightly-isolation.test.ts) instead of a stale `$HOME/.omniroute` database,
// and it must own a port nothing else on the box answers on.
//
// The health wait used to `break` and carry on when the server never came up, so the soak
// ran against nothing. Pinned here: an unreachable server fails the job.
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
  uses?: string;
  env?: Record<string, string>;
  if?: string;
}

interface Job {
  "runs-on"?: string | string[];
  env?: Record<string, string>;
  steps: Step[];
}

const WORKFLOWS_DIR = new URL("../../../.github/workflows/", import.meta.url);
const workflow = yaml.load(
  fs.readFileSync(new URL("nightly-resilience.yml", WORKFLOWS_DIR), "utf8")
) as { jobs: Record<string, Job> };

const JOB = "k6-soak";
const PREPARE_STEP = "Prepare isolated runtime state";
const START_STEP = "Start OmniRoute (background)";
const SOAK_STEP = "Run k6 soak";
const OMNI_LIGHT_RUNS_ON =
  "${{ (vars.USE_VPS_RUNNER == 'true' && fromJSON('[\"self-hosted\",\"omni-light\"]')) || 'ubuntu-latest' }}";

const job = workflow.jobs[JOB];
const steps = job?.steps ?? [];
const stepNamed = (name: string) => steps.find((step) => step.name === name);
const prepare = stepNamed(PREPARE_STEP);
const start = stepNamed(START_STEP);
const soak = stepNamed(SOAK_STEP);
const npmCi = steps.find((step) => step.run?.trim() === "npm ci");

function fixture(t: test.TestContext, { serverComesUp }: { serverComesUp: boolean }) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "resilience-k6-nightly-"));
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
    node: 'printf "%s\\n%s\\n%s\\n" "$DATA_DIR" "$DISABLE_SQLITE_AUTO_BACKUP" "$OMNIROUTE_PLUGINS_DIR" > "$FIXTURE/server-env"\necho "fake server log line"\nexec /bin/sleep 60',
    // Healthy only once the fake server has written its environment, like a real health
    // check: the start step runs the server in the background, so a curl that always
    // passed let the step return before the server wrote anything, and the test then
    // read no file (ENOENT) or the previous boot's file (seen in #17100's CI).
    curl: serverComesUp ? '[ -s "$FIXTURE/server-env" ] || exit 7' : "exit 7",
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
      // The failing-boot case walks the whole 60-iteration health wait; keep headroom on a
      // loaded box so a slow wait is never mistaken for a hang.
      timeout: 30000,
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

test("k6-soak: runs on the omni-light pool (hosted 7 GB VM dies in the build, #11965 class)", () => {
  assert.ok(job, `nightly-resilience.yml must keep the '${JOB}' job`);
  assert.equal(job["runs-on"], OMNI_LIGHT_RUNS_ON);
});

test("k6-soak: owns a port no other workflow uses, and the soak targets it", () => {
  assert.ok(start?.run, `'${JOB}' must keep its '${START_STEP}' step`);
  assert.ok(soak, `'${JOB}' must keep its '${SOAK_STEP}' step`);
  const port = start!.env?.PORT;
  assert.ok(port, "the start step must pin PORT");
  assert.notEqual(port, "20128", "20128 is the deployed server's port on the shared box");
  assert.equal(soak!.env?.BASE_URL, `http://localhost:${port}`);
  assert.ok(
    start!.run!.includes(`http://localhost:${port}/api/monitoring/health`),
    "the health wait must probe the job's own port"
  );
  assert.equal(soak!.env?.SOAK_DURATION, "3m");
  assert.equal(soak!.env?.SOAK_VUS, "10");

  for (const file of fs.readdirSync(WORKFLOWS_DIR)) {
    if (!/\.ya?ml$/.test(file) || file === "nightly-resilience.yml") continue;
    const text = fs.readFileSync(new URL(file, WORKFLOWS_DIR), "utf8");
    assert.ok(!text.includes(port!), `port ${port} is already used by ${file}`);
  }
  for (const [name, other] of Object.entries(workflow.jobs)) {
    if (name === JOB) continue;
    const otherPort = other.env?.PORT;
    if (otherPort) assert.notEqual(otherPort, port, `port ${port} collides with job '${name}'`);
  }
});

test("k6-soak: prepares a fresh DATA_DIR under RUNNER_TEMP before npm ci and the server boot", async (t) => {
  assert.ok(start, `'${JOB}' must keep its '${START_STEP}' step`);
  assert.ok(npmCi, `'${JOB}' must keep its 'npm ci' step`);
  assert.ok(prepare?.run, `'${JOB}' must gain a '${PREPARE_STEP}' run step`);
  assert.equal(prepare!.if, undefined, "the isolation step must run unconditionally");
  assert.ok(
    steps.indexOf(prepare!) < steps.indexOf(npmCi!),
    "the runtime state must be prepared before npm ci (same order as nightly-llm-security)"
  );
  assert.ok(
    steps.indexOf(prepare!) < steps.indexOf(start!),
    "the runtime state must be prepared before the server starts"
  );

  const f = fixture(t, { serverComesUp: true });
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

test("k6-soak: a server that never comes up fails the job instead of soaking nothing", (t) => {
  assert.ok(start?.run, `'${JOB}' must keep its '${START_STEP}' step`);
  const f = fixture(t, { serverComesUp: false });
  const booted = f.run(start!, { DATA_DIR: path.join(f.dir, "data") });
  assert.notEqual(booted.status, 0, "an unreachable server must fail the start step");
  assert.match(booted.stdout, /::error::/, "the failure must surface as a workflow error");
  assert.match(booted.stdout, /fake server log line/, "the server log tail must be printed");
});
