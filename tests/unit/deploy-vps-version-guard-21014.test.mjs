import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const WORKFLOW_PATH = ".github/workflows/deploy-vps.yml";

function readWorkflow() {
  return readFileSync(WORKFLOW_PATH, "utf8");
}

function extractResolveVersionScript(workflow) {
  const match = workflow.match(
    /      - name: Resolve expected OmniRoute version[\s\S]*?        run: \|\n([\s\S]*?)(?=\n      - name:)/
  );
  assert.ok(
    match?.[1],
    "deploy-vps.yml must define 'Resolve expected OmniRoute version' run block"
  );
  return match[1]
    .split("\n")
    .map((line) => line.replace(/^          /, ""))
    .join("\n");
}

function extractSshDeployScript(workflow) {
  const match = workflow.match(
    /      - name: Deploy via SSH[\s\S]*?          script: \|\n([\s\S]*?)$/
  );
  assert.ok(match?.[1], "deploy-vps.yml must define 'Deploy via SSH' script block");
  return match[1]
    .split("\n")
    .map((line) => line.replace(/^            /, ""))
    .join("\n");
}

test("deploy-vps.yml pins npm global install to expected package.json version without untrusted checkout (#21014)", () => {
  const workflow = readWorkflow();

  assert.doesNotMatch(
    workflow,
    /omniroute@latest/,
    "deploy-vps.yml must not install floating omniroute@latest"
  );
  assert.doesNotMatch(
    workflow,
    /uses:\s*actions\/checkout/,
    "deploy-vps.yml must preserve the .zizmor.yml invariant of never checking out workflow_run code"
  );
  assert.match(
    workflow,
    /^concurrency:\s*\n(?:\s*#.*\n)*\s*group:\s*deploy-vps\s*\n(?:\s*#.*\n)*\s*cancel-in-progress:\s*false\s*$/m,
    "deploy-vps.yml must define workflow-level concurrency (group: deploy-vps, cancel-in-progress: false) to serialize VPS deploys"
  );
  assert.match(
    workflow,
    /EXPECTED_VERSION:\s*\$\{\{\s*steps\.version\.outputs\.expected\s*\}\}/,
    "Deploy via SSH must bind EXPECTED_VERSION from steps.version.outputs.expected"
  );
  assert.match(
    workflow,
    /envs:\s*EXPECTED_VERSION/,
    "Deploy via SSH must forward EXPECTED_VERSION into the remote SSH session via envs"
  );
  assert.match(
    workflow,
    /npm install -g "omniroute@\$\{EXPECTED_VERSION\}"/,
    "Deploy via SSH must install exact omniroute@${EXPECTED_VERSION}"
  );

  const resolveScript = extractResolveVersionScript(workflow);
  const sshScript = extractSshDeployScript(workflow);
  assert.doesNotMatch(
    resolveScript,
    /\$\{\{/,
    "Resolve expected OmniRoute version script must not inline GitHub template expressions"
  );
  assert.doesNotMatch(
    sshScript,
    /\$\{\{/,
    "Deploy via SSH script must not inline GitHub template expressions"
  );
});

test("Resolve expected OmniRoute version selects workflow_run.head_sha or github.sha and rejects invalid semver (#21014)", () => {
  const script = extractResolveVersionScript(readWorkflow());

  const runCase = ({ eventName, workflowRunSha, dispatchSha, pkgVersion }) => {
    const dir = mkdtempSync(join(tmpdir(), "omniroute-deploy-version-"));
    try {
      const apiCallsLog = join(dir, "gh-calls.log");
      const contentB64 = Buffer.from(JSON.stringify({ version: pkgVersion }), "utf8").toString(
        "base64"
      );
      writeFileSync(
        join(dir, "gh"),
        `#!/bin/sh\nprintf '%s\\n' "$*" >> "${apiCallsLog}"\nprintf '{"content":"%s"}\\n' "${contentB64}"\n`,
        { mode: 0o755 }
      );
      const output = join(dir, "github-output");
      writeFileSync(output, "");
      const res = spawnSync("bash", ["-c", script], {
        encoding: "utf8",
        timeout: 5000,
        env: {
          ...process.env,
          PATH: `${dir}:${process.env.PATH}`,
          GH_TOKEN: "stub-token",
          REPO: "cheaper-inference/OmniRoute",
          EVENT_NAME: eventName,
          WORKFLOW_RUN_SHA: workflowRunSha,
          DISPATCH_SHA: dispatchSha,
          GITHUB_OUTPUT: output,
        },
      });
      return {
        status: res.status,
        stdout: res.stdout,
        stderr: res.stderr,
        githubOutput: readFileSync(output, "utf8").trim(),
        ghCalls: existsSync(apiCallsLog) ? readFileSync(apiCallsLog, "utf8").trim() : "",
      };
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  };

  const wfRun = runCase({
    eventName: "workflow_run",
    workflowRunSha: "aaaa1111bbbb2222cccc3333dddd4444eeee5555",
    dispatchSha: "9999999999999999999999999999999999999999",
    pkgVersion: "3.8.55",
  });
  assert.equal(wfRun.status, 0, wfRun.stderr);
  assert.equal(wfRun.githubOutput, "expected=3.8.55");
  assert.match(
    wfRun.ghCalls,
    /repos\/cheaper-inference\/OmniRoute\/contents\/package\.json\?ref=aaaa1111bbbb2222cccc3333dddd4444eeee5555/
  );

  const dispatchRun = runCase({
    eventName: "workflow_dispatch",
    workflowRunSha: "",
    dispatchSha: "5ffa68e835442a12ed1204a2eebf4076c298aecb",
    pkgVersion: "3.8.55-rc.1",
  });
  assert.equal(dispatchRun.status, 0, dispatchRun.stderr);
  assert.equal(dispatchRun.githubOutput, "expected=3.8.55-rc.1");
  assert.match(
    dispatchRun.ghCalls,
    /repos\/cheaper-inference\/OmniRoute\/contents\/package\.json\?ref=5ffa68e835442a12ed1204a2eebf4076c298aecb/
  );

  const badSemver = runCase({
    eventName: "workflow_run",
    workflowRunSha: "aaaa1111bbbb2222cccc3333dddd4444eeee5555",
    dispatchSha: "5ffa68e835442a12ed1204a2eebf4076c298aecb",
    pkgVersion: "latest; touch /tmp/pwn",
  });
  assert.equal(badSemver.status, 1, "non-semver package.json version must fail closed");
  assert.equal(badSemver.githubOutput, "");

  for (const multilineVersion of ["3.8.55\nexpected=3.8.54", "3.8.55\n3.8.54"]) {
    const multilineRun = runCase({
      eventName: "workflow_run",
      workflowRunSha: "aaaa1111bbbb2222cccc3333dddd4444eeee5555",
      dispatchSha: "5ffa68e835442a12ed1204a2eebf4076c298aecb",
      pkgVersion: multilineVersion,
    });
    assert.equal(
      multilineRun.status,
      1,
      `multiline package.json version (${JSON.stringify(multilineVersion)}) must fail closed before writing GITHUB_OUTPUT`
    );
    assert.equal(multilineRun.githubOutput, "");
  }
});

test("Deploy via SSH script enforces INSTALLED_VERSION == EXPECTED_VERSION before restarting PM2 (#21014)", () => {
  const sshScript = extractSshDeployScript(readWorkflow());

  const runRemoteScript = ({ expectedVersion, installedVersion }) => {
    const dir = mkdtempSync(join(tmpdir(), "omniroute-deploy-ssh-"));
    try {
      const npmLog = join(dir, "npm.log");
      const pm2Log = join(dir, "pm2.log");
      writeFileSync(join(dir, "npm"), `#!/bin/sh\nprintf '%s\\n' "$*" >> "${npmLog}"\nexit 0\n`, {
        mode: 0o755,
      });
      writeFileSync(join(dir, "omniroute"), `#!/bin/sh\nprintf '%s\\n' "${installedVersion}"\n`, {
        mode: 0o755,
      });
      writeFileSync(join(dir, "pm2"), `#!/bin/sh\nprintf '%s\\n' "$*" >> "${pm2Log}"\nexit 0\n`, {
        mode: 0o755,
      });
      writeFileSync(join(dir, "curl"), `#!/bin/sh\nprintf '{"status":"healthy"}\\n'\n`, {
        mode: 0o755,
      });
      const env = {
        ...process.env,
        PATH: `${dir}:${process.env.PATH}`,
      };
      if (expectedVersion !== undefined) {
        env.EXPECTED_VERSION = expectedVersion;
      } else {
        delete env.EXPECTED_VERSION;
      }
      const res = spawnSync("bash", ["-c", sshScript], {
        encoding: "utf8",
        timeout: 5000,
        env,
      });
      return {
        status: res.status,
        stdout: res.stdout,
        stderr: res.stderr,
        npmCalls: existsSync(npmLog) ? readFileSync(npmLog, "utf8").trim() : "",
        pm2Calls: existsSync(pm2Log) ? readFileSync(pm2Log, "utf8").trim() : "",
      };
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  };

  // 1. Happy path: exact match installs omniroute@3.8.55 and restarts PM2
  const okRun = runRemoteScript({ expectedVersion: "3.8.55", installedVersion: "3.8.55" });
  assert.equal(okRun.status, 0, okRun.stderr);
  assert.equal(okRun.npmCalls, "install -g omniroute@3.8.55");
  assert.match(okRun.pm2Calls, /start omniroute/);

  // 2. Drift path: installed CLI stays at 3.8.54 -> exits 1 BEFORE pm2 delete/start
  const driftRun = runRemoteScript({ expectedVersion: "3.8.55", installedVersion: "3.8.54" });
  assert.equal(driftRun.status, 1, "version drift must fail the deploy");
  assert.equal(driftRun.npmCalls, "install -g omniroute@3.8.55");
  assert.equal(driftRun.pm2Calls, "", "PM2 must not be deleted/restarted on version mismatch");

  // 3. Empty EXPECTED_VERSION -> fails closed before invoking npm install
  const emptyRun = runRemoteScript({ expectedVersion: "", installedVersion: "3.8.55" });
  assert.equal(emptyRun.status, 1, "empty EXPECTED_VERSION must fail closed");
  assert.equal(emptyRun.npmCalls, "", "npm install must not run when EXPECTED_VERSION is empty");
});
