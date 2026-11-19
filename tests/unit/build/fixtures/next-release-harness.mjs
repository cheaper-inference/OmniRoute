import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  chmodSync,
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SOURCE_ROOT = resolve(process.cwd());
const WORKFLOW_ROOT = SOURCE_ROOT;
const require = createRequire(join(SOURCE_ROOT, "package.json"));
const { load } = require("js-yaml");
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const CANDIDATE = "a".repeat(40);
const TREE = "b".repeat(40);
const BEFORE = "c".repeat(40);
const REPOSITORY = "cheaper-inference/OmniRoute";
const SERVER = 'console.log("retained producer bytes");\n';
const BUILD_ID = "qualified-release-next-fixture\n";
const LOCK = '{"name":"next-release-fixture","lockfileVersion":3}\n';

export const consumers = [
  { file: "npm-publish.yml", job: "publish", name: "npm-publish" },
  { file: "electron-release.yml", job: "web-build", name: "electron-release" },
];

export function reuseStep(consumer) {
  const path = join(WORKFLOW_ROOT, ".github/workflows", consumer.file);
  const workflow = load(readFileSync(path, "utf8"));
  const steps = workflow.jobs[consumer.job].steps;
  const matches = steps.filter((step) => /^Reuse CI's next-build artifact/.test(step.name || ""));
  assert.equal(matches.length, 1, "fixture must execute the real artifact reuse boundary");
  assert.equal(
    typeof matches[0].run,
    "string",
    "reuse boundary must provide an executable command"
  );
  return matches[0];
}

function command(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    timeout: 10000,
    maxBuffer: 1024 * 1024,
    ...options,
  });
  assert.equal(result.error, undefined, `fixture command setup: ${result.error?.code}`);
  assert.equal(result.status, 0, `fixture command setup: ${result.stderr}`);
  return result;
}

function put(path, bytes) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, bytes);
}

function executable(path, body) {
  put(path, `#!/usr/bin/env node\n${body}`);
  chmodSync(path, 0o755);
}

export function releaseFixture(t, consumer, options = {}) {
  const root = mkdtempSync(join(tmpdir(), "next-release-consumer-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const checkout = join(root, "checkout");
  const temporary = join(root, "runner-temp");
  const payload = join(root, "payload");
  const transport = join(root, "transport");
  const bin = join(root, "bin");
  for (const path of [checkout, temporary, payload, transport, bin]) mkdirSync(path);
  put(join(checkout, "package.json"), '{"type":"module"}\n');
  put(join(checkout, "package-lock.json"), LOCK);
  for (const folder of ["ci", "build", "release", "merge-queue"]) {
    cpSync(join(SOURCE_ROOT, "scripts", folder), join(checkout, "scripts", folder), {
      recursive: true,
    });
  }
  const ciBytes = readFileSync(join(SOURCE_ROOT, ".github/workflows/ci.yml"));
  put(join(checkout, ".github/workflows/ci.yml"), ciBytes);
  put(join(payload, ".build/next/BUILD_ID"), BUILD_ID);
  put(join(payload, ".build/next/standalone/server.js"), SERVER);
  const archive = join(transport, "e2e-build.tar.gz");
  command("tar", ["-czf", archive, "-C", payload, ".build/next"]);
  const archiveBytes = readFileSync(archive);
  const records = [
    ["BUILD_ID", "file", Buffer.byteLength(BUILD_ID), sha256(BUILD_ID)],
    ["standalone", "directory"],
    ["standalone/server.js", "file", Buffer.byteLength(SERVER), sha256(SERVER)],
  ];
  const manifest = {
    schemaVersion: 1,
    policy: "ci-next-build/1",
    source: {
      candidateSha: CANDIDATE,
      treeSha: TREE,
      lockfileSha256: sha256(LOCK),
      repository: REPOSITORY,
      repositoryId: "1234",
      eventName: "push",
      ref: "refs/heads/main",
      headSha: CANDIDATE,
      headRepositoryId: "1234",
      headRef: null,
      baseSha: BEFORE,
      baseSource: "push-before",
      queue: null,
    },
    workflow: {
      sha: CANDIDATE,
      ref: `${REPOSITORY}/.github/workflows/ci.yml@refs/heads/main`,
      fileSha256: sha256(ciBytes),
    },
    producer: {
      runId: "771",
      runAttempt: "2",
      jobId: "build",
      runtime: {
        node: process.version,
        abi: process.versions.modules,
        platform: "linux",
        arch: "x64",
      },
      profile: "full",
      bundler: "webpack",
    },
    archive: {
      name: "e2e-build.tar.gz",
      sha256: sha256(archiveBytes),
      sizeBytes: archiveBytes.length,
    },
    output: {
      sha256: sha256(records.map((record) => JSON.stringify(record) + "\n").join("")),
      files: 2,
      bytes: Buffer.byteLength(BUILD_ID) + Buffer.byteLength(SERVER),
      links: 0,
      entries: 3,
    },
  };
  options.changeManifest?.(manifest);
  const proof = join(transport, "next-build-provenance.json");
  put(proof, JSON.stringify(manifest, null, 2) + "\n");
  const members = { "e2e-build.tar.gz": archive };
  if (!options.missingManifest) members["next-build-provenance.json"] = proof;
  const zip = join(transport, "artifact.zip");
  command(
    "python3",
    [
      "-c",
      [
        "import json, os, zipfile",
        "with zipfile.ZipFile(os.environ['FIXTURE_ZIP'], 'w', compression=zipfile.ZIP_STORED) as output:",
        "    for name, path in json.loads(os.environ['FIXTURE_MEMBERS']).items():",
        "        output.write(path, name)",
      ].join("\n"),
    ],
    {
      env: { PATH: process.env.PATH, FIXTURE_ZIP: zip, FIXTURE_MEMBERS: JSON.stringify(members) },
    }
  );
  const repository = { id: 1234, full_name: REPOSITORY };
  const epoch = Date.now() - 10 * 60 * 1000;
  const at = (seconds) => new Date(epoch + seconds * 1000).toISOString();
  const run = {
    id: 771,
    run_attempt: 2,
    name: "CI",
    workflow_id: 112,
    path: ".github/workflows/ci.yml",
    event: "push",
    head_sha: CANDIDATE,
    head_branch: "main",
    repository,
    head_repository: repository,
    status: "completed",
    conclusion: "success",
    created_at: at(0),
    run_started_at: at(0),
    updated_at: at(600),
  };
  const artifact = {
    id: 991,
    name: "next-build-771-2",
    expired: false,
    size_in_bytes: readFileSync(zip).length,
    digest: `sha256:${sha256(readFileSync(zip))}`,
    created_at: at(480),
    updated_at: at(510),
    expires_at: at(86400),
    url: `https://api.github.invalid/repos/${REPOSITORY}/actions/artifacts/991`,
    archive_download_url: `https://api.github.invalid/repos/${REPOSITORY}/actions/artifacts/991/zip`,
    workflow_run: {
      id: 771,
      repository_id: 1234,
      head_repository_id: 1234,
      head_branch: "main",
      head_sha: CANDIDATE,
    },
    // These three are fixture-only transport fields; gh strips them from API responses.
    zipPath: zip,
    members,
    producerAttempt: 2,
  };
  const state = {
    repository: REPOSITORY,
    repositoryId: 1234,
    workflowId: 112,
    candidateSha: CANDIDATE,
    treeSha: TREE,
    tagSha: options.tagSha || CANDIDATE,
    releaseTag: "v3.8.55",
    runs: [run],
    jobs: [
      {
        id: 881,
        run_id: 771,
        run_attempt: 2,
        name: "Build",
        head_sha: CANDIDATE,
        status: "completed",
        conclusion: "success",
        started_at: at(60),
        completed_at: at(540),
        steps: [
          {
            name: "Upload Next.js build for downstream jobs",
            status: "completed",
            conclusion: "success",
            number: 10,
            started_at: at(480),
            completed_at: at(510),
          },
        ],
      },
    ],
    artifacts: [artifact],
  };
  options.changeState?.(state);
  if (options.legacyDecoy && state.artifacts.length) {
    state.artifacts.push({ ...state.artifacts[0], id: 992, name: "next-build" });
  }
  const statePath = join(root, "api-state.json");
  const tracePath = join(root, "trace.jsonl");
  put(statePath, JSON.stringify(state));
  put(tracePath, "");
  put(join(bin, "package.json"), '{"type":"commonjs"}\n');
  executable(join(bin, "gh"), readFileSync(join(HERE, "next-release-gh-double.cjs"), "utf8"));
  executable(
    join(bin, "git"),
    `
const fs = require("node:fs");
const args = process.argv.slice(2);
const state = JSON.parse(fs.readFileSync(process.env.OMNI_NEXT_RELEASE_FIXTURE, "utf8"));
if (args[0] === "status") process.stdout.write("");
else if (args[0] === "rev-parse" && args.at(-1) === "HEAD") console.log(state.candidateSha);
else if (args[0] === "rev-parse" && args.at(-1) === "HEAD^{tree}") console.log(state.treeSha);
else if (args[0] === "rev-parse" && args.at(-1).startsWith("refs/tags/")) console.log(state.tagSha);
else if (args[0] === "show" && args.at(-1).endsWith(":.github/workflows/ci.yml"))
  process.stdout.write(fs.readFileSync(".github/workflows/ci.yml"));
else if (args[0] === "show" && args.at(-1).endsWith(":package-lock.json"))
  process.stdout.write(fs.readFileSync("package-lock.json"));
else {
  fs.appendFileSync(process.env.OMNI_NEXT_RELEASE_TRACE,
    JSON.stringify({ operation: "unexpected", kind: "git-command", args }) + "\\n");
  process.exitCode = 94;
}
`
  );
  for (const name of ["npm", "npx", "curl", "wget"]) {
    executable(
      join(bin, name),
      `
require("node:fs").appendFileSync(process.env.OMNI_NEXT_RELEASE_TRACE,
  JSON.stringify({ operation: "unexpected", kind: "forbidden-build-or-network", command: ${JSON.stringify(name)} }) + "\\n");
process.exitCode = 94;
`
    );
  }
  const eventPath = join(root, "event.json");
  put(
    eventPath,
    JSON.stringify({
      repository,
      action: options.eventName === "workflow_dispatch" ? undefined : "released",
      ref: options.eventName === "workflow_dispatch" ? "refs/heads/main" : "refs/tags/v3.8.55",
      release: { tag_name: "v3.8.55", target_commitish: "main" },
      inputs: { version: "3.8.55", tag: "v3.8.55" },
    })
  );
  const envPath = join(root, "github-env");
  const outputPath = join(root, "github-output");
  put(envPath, "");
  put(outputPath, "");
  const env = {
    PATH: `${bin}:${dirname(process.execPath)}:${process.env.PATH}`,
    LANG: "C.UTF-8",
    TMPDIR: temporary,
    CI: "true",
    GITHUB_ACTIONS: "true",
    GH_TOKEN: "fixture-not-a-token",
    REPO: REPOSITORY,
    HEAD_SHA: CANDIDATE,
    GITHUB_SHA: CANDIDATE,
    GITHUB_REPOSITORY: REPOSITORY,
    GITHUB_REPOSITORY_ID: "1234",
    GITHUB_EVENT_NAME: options.eventName || "release",
    GITHUB_EVENT_PATH: eventPath,
    GITHUB_REF: options.eventName === "workflow_dispatch" ? "refs/heads/main" : "refs/tags/v3.8.55",
    GITHUB_REF_NAME: options.eventName === "workflow_dispatch" ? "main" : "v3.8.55",
    GITHUB_REF_TYPE: options.eventName === "workflow_dispatch" ? "branch" : "tag",
    GITHUB_RUN_ID: "999",
    GITHUB_RUN_ATTEMPT: "1",
    GITHUB_JOB: consumer.job,
    GITHUB_WORKFLOW_SHA: CANDIDATE,
    GITHUB_WORKFLOW_REF: `${REPOSITORY}/.github/workflows/${consumer.file}@refs/tags/v3.8.55`,
    GITHUB_API_URL: "https://api.github.invalid",
    GITHUB_SERVER_URL: "https://github.invalid",
    GITHUB_WORKSPACE: checkout,
    GITHUB_ENV: envPath,
    GITHUB_OUTPUT: outputPath,
    RUNNER_TEMP: temporary,
    RUNNER_OS: "Linux",
    RUNNER_ARCH: "X64",
    OMNI_NEXT_RELEASE_FIXTURE: statePath,
    OMNI_NEXT_RELEASE_TRACE: tracePath,
  };
  const trace = () => readFileSync(tracePath, "utf8").split("\n").filter(Boolean).map(JSON.parse);
  const runBoundary = () => {
    const result = spawnSync("/bin/bash", ["-euo", "pipefail", "-c", reuseStep(consumer).run], {
      cwd: checkout,
      env,
      encoding: "utf8",
      timeout: 15000,
      maxBuffer: 1024 * 1024,
    });
    assert.equal(result.error, undefined, `fixture child setup: ${result.error?.code}`);
    assert.equal(result.signal, null, `fixture child signal: ${result.signal}`);
    assert.notEqual(result.status, 127, "missing fixture tooling cannot qualify a causal RED");
    assert.doesNotMatch(
      result.stderr,
      /ERR_MODULE_NOT_FOUND|ERR_UNKNOWN_FILE_EXTENSION|Cannot find module|command not found|Unmodeled fixture/,
      "import/tooling/fixture failures cannot qualify a causal RED"
    );
    assert.deepEqual(
      trace().filter((entry) => entry.operation === "unexpected"),
      [],
      `fixture harness must model every external command; stderr=${result.stderr}`
    );
    return result;
  };
  const consumption = () => {
    const receipts = [];
    const visit = (directory) => {
      for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) visit(path);
        else if (entry.name === "next-build-consumption.json") receipts.push(path);
      }
    };
    visit(checkout);
    visit(temporary);
    assert.equal(
      receipts.length,
      1,
      "successful reuse must retain one consumer provenance receipt"
    );
    return JSON.parse(readFileSync(receipts[0], "utf8"));
  };
  return {
    root,
    checkout,
    temporary,
    env,
    state,
    trace,
    runBoundary,
    consumption,
    candidateSha: CANDIDATE,
    serverBytes: SERVER,
    serverPath: join(checkout, ".build/next/standalone/server.js"),
    inputPath: join(checkout, ".build/next/.omniroute-next-input.json"),
    environment: () => readFileSync(envPath, "utf8"),
    outputs: () => readFileSync(outputPath, "utf8"),
    serverExists: () => existsSync(join(checkout, ".build/next/standalone/server.js")),
  };
}

export function assertQualifiedReuse(fixture, result) {
  assert.equal(result.status, 0, `qualified producer must be reusable: ${result.stderr}`);
  assert.equal(
    fixture.serverExists(),
    true,
    "run/attempt-qualified artifact must restore the producer tree without a fallback build"
  );
  assert.equal(readFileSync(fixture.serverPath, "utf8"), fixture.serverBytes);
  assert.deepEqual(
    fixture.trace().filter((entry) => entry.operation === "artifact-download"),
    [
      {
        operation: "artifact-download",
        artifactId: 991,
        name: "next-build-771-2",
        runId: 771,
        attempt: 2,
      },
    ]
  );
  const receipt = fixture.consumption();
  assert.equal(receipt.candidateSha, fixture.candidateSha);
  assert.equal(String(receipt.artifactId), "991");
  assert.equal(
    receipt.artifactDigest.replace(/^sha256:/, ""),
    fixture.state.artifacts[0].digest.slice(7)
  );
  assert.equal(receipt.producerRunId, "771");
  assert.equal(receipt.producerAttempt, "2");
  assert.equal(receipt.consumerRunId, "999");
  assert.equal(receipt.consumerAttempt, "1");
  const input = readFileSync(fixture.inputPath);
  assert.equal(receipt.inputReceiptSha256, sha256(input));
  assert.match(fixture.environment(), /^OMNIROUTE_REQUIRE_PREBUILT_NEXT=1$/m);
  assert.match(
    fixture.environment(),
    new RegExp(`^OMNIROUTE_NEXT_INPUT_SHA256=${sha256(input)}$`, "m")
  );
}
