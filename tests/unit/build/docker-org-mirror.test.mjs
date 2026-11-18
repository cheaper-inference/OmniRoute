// Docker Hub org mirror (cheaperinference/omniroute): the release copies its images there when
// the DOCKERHUB_ORG_* secrets exist and skips with a visible warning when they do not, without
// failing the publish. Both branches are exercised here, plus the workflow wiring.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import YAML from "yaml";

import {
  DEFAULT_SOURCE_IMAGE,
  DEFAULT_TARGET_IMAGE,
  mirrorToOrg,
  planTags,
} from "../../../scripts/ci/docker-org-mirror.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const scriptPath = join(root, "scripts/ci/docker-org-mirror.mjs");

/**
 * Fake runner: records every call; `fail` decides which calls exit non-zero. `git ls-remote`
 * answers with `tags` (the release tags on origin); `bash` runs the real
 * scripts/ci/should-promote-latest.sh, so the :latest recheck is the workflow's own helper.
 */
function fakeDocker(fail = () => false, tags = ["v3.8.53", "v3.8.54"]) {
  const calls = [];
  const run = (cmd, args, input) => {
    calls.push({ cmd, args, input });
    if (fail(args)) return { status: 1, stdout: "", stderr: "" };
    if (cmd === "git") {
      const stdout = tags.map((t, i) => `${String(i).padStart(40, "0")}\trefs/tags/${t}\n`);
      return { status: 0, stdout: stdout.join(""), stderr: "" };
    }
    if (cmd === "bash") {
      const res = spawnSync(cmd, args, { encoding: "utf8", input });
      return { status: res.status, stdout: res.stdout, stderr: res.stderr };
    }
    return { status: 0, stdout: "", stderr: "" };
  };
  return { calls, run, dockerCalls: () => calls.filter((c) => c.cmd === "docker") };
}

const creds = { DOCKERHUB_ORG_USERNAME: "cheaperinference", DOCKERHUB_ORG_TOKEN: "dckr_oat_fake" };
const quiet = () => {};

test("planTags: mandatory Node/Web tags, best-effort Bun, latest only when promoting", () => {
  const plain = planTags("3.8.54", false);
  assert.deepEqual(
    plain.map((t) => [t.tag, t.required]),
    [
      ["3.8.54", true],
      ["3.8.54-web", true],
      ["3.8.54-bun", false],
      ["3.8.54-web-bun", false],
    ]
  );
  const promoted = planTags("3.8.54", true);
  assert.deepEqual(
    promoted.filter((t) => t.tag.startsWith("latest")).map((t) => [t.tag, t.from, t.required]),
    [
      ["latest", "3.8.54", true],
      ["latest-web", "3.8.54-web", true],
      ["latest-bun", "3.8.54-bun", false],
      ["latest-web-bun", "3.8.54-web-bun", false],
    ]
  );
});

test("without the org secrets: skips with a warning, exits 0 and never calls docker", () => {
  for (const env of [
    { VERSION: "3.8.54" },
    { VERSION: "3.8.54", DOCKERHUB_ORG_USERNAME: "cheaperinference" },
    { VERSION: "3.8.54", DOCKERHUB_ORG_TOKEN: "dckr_oat_fake" },
    { VERSION: "3.8.54", DOCKERHUB_ORG_USERNAME: "", DOCKERHUB_ORG_TOKEN: "" },
  ]) {
    const docker = fakeDocker();
    const lines = [];
    const result = mirrorToOrg(env, { run: docker.run, log: (l) => lines.push(l) });
    assert.equal(result.exitCode, 0);
    assert.equal(result.status, "skipped");
    assert.equal(docker.calls.length, 0);
    assert.match(lines.join("\n"), /^::warning title=Docker Hub org mirror skipped::/m);
    assert.match(result.summary.join("\n"), /skipped/);
    assert.match(result.summary.join("\n"), /DOCKERHUB_ORG_TOKEN/);
  }
});

test("with the org secrets: logs in through stdin and copies every tag from GHCR", () => {
  const docker = fakeDocker();
  const result = mirrorToOrg(
    { VERSION: "3.8.54", PROMOTE_LATEST: "true", ...creds },
    {
      run: docker.run,
      log: quiet,
    }
  );
  assert.equal(result.exitCode, 0);
  assert.equal(result.status, "mirrored");

  const [login, ...rest] = docker.dockerCalls();
  assert.deepEqual(login.args, ["login", "--username", "cheaperinference", "--password-stdin"]);
  assert.equal(login.input, "dckr_oat_fake");
  assert.ok(
    !docker.calls.some((c) => c.args.includes("dckr_oat_fake")),
    "the token never appears in argv"
  );

  const created = rest
    .filter((c) => c.args[2] === "create")
    .map((c) => `${c.args[4]} <- ${c.args[5]}`);
  assert.deepEqual(created, [
    `${DEFAULT_TARGET_IMAGE}:3.8.54 <- ${DEFAULT_SOURCE_IMAGE}:3.8.54`,
    `${DEFAULT_TARGET_IMAGE}:3.8.54-web <- ${DEFAULT_SOURCE_IMAGE}:3.8.54-web`,
    `${DEFAULT_TARGET_IMAGE}:3.8.54-bun <- ${DEFAULT_SOURCE_IMAGE}:3.8.54-bun`,
    `${DEFAULT_TARGET_IMAGE}:3.8.54-web-bun <- ${DEFAULT_SOURCE_IMAGE}:3.8.54-web-bun`,
    `${DEFAULT_TARGET_IMAGE}:latest <- ${DEFAULT_SOURCE_IMAGE}:3.8.54`,
    `${DEFAULT_TARGET_IMAGE}:latest-web <- ${DEFAULT_SOURCE_IMAGE}:3.8.54-web`,
    `${DEFAULT_TARGET_IMAGE}:latest-bun <- ${DEFAULT_SOURCE_IMAGE}:3.8.54-bun`,
    `${DEFAULT_TARGET_IMAGE}:latest-web-bun <- ${DEFAULT_SOURCE_IMAGE}:3.8.54-web-bun`,
  ]);
});

test("with the org secrets: a missing Bun source is skipped, not an error", () => {
  const docker = fakeDocker((args) => args[2] === "inspect");
  const result = mirrorToOrg({ VERSION: "3.8.54", ...creds }, { run: docker.run, log: quiet });
  assert.equal(result.exitCode, 0);
  const created = docker.calls.filter((c) => c.args[2] === "create").map((c) => c.args[4]);
  assert.deepEqual(created, [
    `${DEFAULT_TARGET_IMAGE}:3.8.54`,
    `${DEFAULT_TARGET_IMAGE}:3.8.54-web`,
  ]);
  assert.match(result.summary.join("\n"), /3\.8\.54-bun` \| skipped/);
});

test("with the org secrets: a failed mandatory copy or login exits 1", () => {
  const copyFails = fakeDocker((args) => args[2] === "create" && args[4].endsWith(":3.8.54-web"));
  const copyResult = mirrorToOrg(
    { VERSION: "3.8.54", ...creds },
    {
      run: copyFails.run,
      log: quiet,
    }
  );
  assert.equal(copyResult.exitCode, 1);
  assert.equal(copyResult.status, "failed");
  assert.match(copyResult.summary.join("\n"), /3\.8\.54-web/);

  const loginFails = fakeDocker((args) => args[0] === "login");
  const loginResult = mirrorToOrg(
    { VERSION: "3.8.54", ...creds },
    {
      run: loginFails.run,
      log: quiet,
    }
  );
  assert.equal(loginResult.exitCode, 1);
  assert.equal(loginFails.calls.length, 1);
});

test("channels and bad versions: main/next are not mirrored, anything else non-semver fails", () => {
  for (const channel of ["main", "next"]) {
    const docker = fakeDocker();
    const result = mirrorToOrg({ VERSION: channel, ...creds }, { run: docker.run, log: quiet });
    assert.equal(result.exitCode, 0);
    assert.equal(docker.calls.length, 0);
  }
  for (const bad of ["", "v3.8.54", "3.8", "3.8.54;rm -rf /", "latest"]) {
    const docker = fakeDocker();
    const result = mirrorToOrg({ VERSION: bad, ...creds }, { run: docker.run, log: quiet });
    assert.equal(result.exitCode, 1, `VERSION=${JSON.stringify(bad)}`);
    assert.equal(docker.calls.length, 0);
  }
});

test("CLI without the org secrets: exit 0 with the warning annotation and a summary line", () => {
  const dir = mkdtempSync(join(tmpdir(), "docker-org-mirror-"));
  try {
    const summaryFile = join(dir, "summary.md");
    const outputFile = join(dir, "output");
    const env = {
      PATH: process.env.PATH,
      VERSION: "3.8.54",
      GITHUB_STEP_SUMMARY: summaryFile,
      GITHUB_OUTPUT: outputFile,
    };
    const res = spawnSync(process.execPath, [scriptPath], { env, encoding: "utf8" });
    assert.equal(res.status, 0, res.stderr);
    assert.match(res.stdout, /::warning title=Docker Hub org mirror skipped::/);
    assert.match(readFileSync(summaryFile, "utf8"), /Docker Hub org mirror skipped/);
    assert.equal(readFileSync(outputFile, "utf8"), "promoted=false\n");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("workflow wiring: docker-publish calls the mirror with optional org secrets", () => {
  const publish = readFileSync(join(root, ".github/workflows/docker-publish.yml"), "utf8");
  const job = publish.slice(publish.indexOf("  mirror-org-dockerhub:"));
  assert.ok(job.length > 0 && publish.includes("  mirror-org-dockerhub:"));
  const block = job.slice(0, job.indexOf("\n\n"));
  assert.match(block, /needs: \[prepare, merge\]/);
  assert.match(block, /needs\.merge\.result == 'success'/);
  assert.match(block, /uses: \.\/\.github\/workflows\/docker-org-mirror\.yml/);
  assert.match(block, /DOCKERHUB_ORG_USERNAME: \$\{\{ secrets\.DOCKERHUB_ORG_USERNAME \}\}/);
  assert.match(block, /DOCKERHUB_ORG_TOKEN: \$\{\{ secrets\.DOCKERHUB_ORG_TOKEN \}\}/);
  assert.doesNotMatch(block, /secrets: inherit/);

  const mirror = readFileSync(join(root, ".github/workflows/docker-org-mirror.yml"), "utf8");
  assert.match(mirror, /\n  workflow_call:\n/);
  assert.match(mirror, /\n  workflow_dispatch:\n/);
  for (const name of ["DOCKERHUB_ORG_USERNAME", "DOCKERHUB_ORG_TOKEN"]) {
    assert.match(mirror, new RegExp(`${name}:\\n        required: false`));
  }
  assert.match(mirror, /run: node scripts\/ci\/docker-org-mirror\.mjs/);
  assert.doesNotMatch(
    mirror,
    /run:[^\n]*\$\{\{ inputs\./,
    "inputs reach the shell only through env"
  );
});

test("promote_latest with a prerelease VERSION is rejected before login and before any copy", () => {
  for (const env of [
    { VERSION: "3.8.55-rc.1", PROMOTE_LATEST: "true", ...creds },
    { VERSION: "3.8.55-rc.1", PROMOTE_LATEST: "true" },
  ]) {
    const docker = fakeDocker();
    const lines = [];
    const result = mirrorToOrg(env, { run: docker.run, log: (l) => lines.push(l) });
    assert.equal(result.exitCode, 1);
    assert.equal(result.status, "failed");
    assert.equal(docker.calls.length, 0, "no login, no tag listing, no copy");
    assert.match(lines.join("\n"), /^::error title=Docker Hub org mirror::.*prerelease/m);
  }
  // Without promote_latest a prerelease is still mirrored under its own tags.
  const docker = fakeDocker();
  const result = mirrorToOrg({ VERSION: "3.8.55-rc.1", ...creds }, { run: docker.run, log: quiet });
  assert.equal(result.exitCode, 0);
  const created = docker.dockerCalls().filter((c) => c.args[2] === "create");
  assert.ok(created.every((c) => !c.args[4].includes(":latest")));
});

test("promote_latest is rechecked against origin's tags: an older release never moves latest", () => {
  const docker = fakeDocker(() => false, ["v3.8.53", "v3.8.54", "v3.8.55"]);
  const lines = [];
  const result = mirrorToOrg(
    { VERSION: "3.8.54", PROMOTE_LATEST: "true", ...creds },
    { run: docker.run, log: (l) => lines.push(l) }
  );
  assert.equal(result.exitCode, 0);
  assert.equal(result.status, "mirrored");
  assert.equal(result.promoted, false);
  const listing = docker.calls.find((c) => c.cmd === "git");
  assert.deepEqual(listing.args, ["ls-remote", "--tags", "--refs", "origin"]);
  const created = docker
    .dockerCalls()
    .filter((c) => c.args[2] === "create")
    .map((c) => c.args[4]);
  assert.deepEqual(created, [
    `${DEFAULT_TARGET_IMAGE}:3.8.54`,
    `${DEFAULT_TARGET_IMAGE}:3.8.54-web`,
    `${DEFAULT_TARGET_IMAGE}:3.8.54-bun`,
    `${DEFAULT_TARGET_IMAGE}:3.8.54-web-bun`,
  ]);
  assert.match(lines.join("\n"), /3\.8\.54 is no longer the highest stable release/);
  assert.match(result.summary.join("\n"), /:latest` not moved/);
});

test("promote_latest recheck: the highest stable version promotes; prerelease tags do not count", () => {
  const docker = fakeDocker(() => false, ["v3.8.9", "v3.8.54", "v3.8.55-rc.1", "v3.9.0-beta.2"]);
  const result = mirrorToOrg(
    { VERSION: "3.8.54", PROMOTE_LATEST: "true", ...creds },
    { run: docker.run, log: quiet }
  );
  assert.equal(result.exitCode, 0);
  assert.equal(result.promoted, true);
  const created = docker
    .dockerCalls()
    .filter((c) => c.args[2] === "create")
    .map((c) => c.args[4]);
  assert.ok(created.includes(`${DEFAULT_TARGET_IMAGE}:latest`));
  assert.ok(created.includes(`${DEFAULT_TARGET_IMAGE}:latest-web`));
});

test("promote_latest recheck: a failed tag listing fails closed before login", () => {
  const docker = fakeDocker((args) => args[0] === "ls-remote");
  const result = mirrorToOrg(
    { VERSION: "3.8.54", PROMOTE_LATEST: "true", ...creds },
    { run: docker.run, log: quiet }
  );
  assert.equal(result.exitCode, 1);
  assert.equal(result.status, "failed");
  assert.equal(docker.dockerCalls().length, 0, "no login and no copy");
});

test("workflow: one shared mirror concurrency group, and the description follows the recheck", () => {
  const wf = YAML.parse(
    readFileSync(join(root, ".github/workflows/docker-org-mirror.yml"), "utf8")
  );
  const job = wf.jobs.mirror;
  // Not keyed by github.ref: two releases must queue behind each other, never run together.
  assert.deepEqual(job.concurrency, { group: "docker-org-mirror", "cancel-in-progress": false });
  const copy = job.steps.find((s) => s.run === "node scripts/ci/docker-org-mirror.mjs");
  assert.equal(copy.id, "mirror");
  const description = job.steps.find((s) => String(s.uses).startsWith("peter-evans/"));
  assert.match(description.if, /steps\.mirror\.outputs\.promoted == 'true'/);
  assert.doesNotMatch(description.if, /inputs\.promote_latest/);
});
