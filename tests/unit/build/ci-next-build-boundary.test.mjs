import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  linkSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import test from "node:test";
import { load } from "js-yaml";
import { ciSourceContext } from "../../../scripts/ci/next-build-provenance.mjs";
import { measureNextTree } from "../../../scripts/build/standaloneInput.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const workflow = load(readFileSync(join(root, ".github/workflows/ci.yml"), "utf8"));
const posix = { skip: process.platform === "win32", timeout: 30000 };
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const consumers = [
  ["package-artifact", (step) => step.run === "npm run build:cli"],
  ["electron-package-smoke", (step) => step.name === "Install Electron dependencies"],
  ["test-e2e", (step) => step.name === "Run E2E tests (duration-balanced shard)"],
];

function directory(t, prefix) {
  const artifacts = join(root, "_artifacts");
  mkdirSync(artifacts, { recursive: true });
  const path = mkdtempSync(join(artifacts, prefix));
  t.after(() => rmSync(path, { recursive: true, force: true }));
  return path;
}

function run(command, args, cwd, env = {}) {
  const result = spawnSync(command, args, {
    cwd,
    env: { PATH: process.env.PATH, LANG: "C.UTF-8", ...env },
    encoding: "utf8",
    timeout: 15000,
    maxBuffer: 1024 * 1024,
  });
  assert.equal(result.error, undefined, `${command} fixture must execute`);
  return result;
}

function installBuilderSentinel(workspace, marker) {
  writeFileSync(
    join(workspace, "scripts/build/build-next-isolated.mjs"),
    `
    import { writeFileSync } from "node:fs";
    import { resolve } from "node:path";
    import { pathToFileURL } from "node:url";
    export * from ${JSON.stringify(pathToFileURL(join(root, "scripts/build/build-next-isolated.mjs")).href)};
    export async function main() {
      writeFileSync(${JSON.stringify(marker)}, JSON.stringify({ argv: process.argv.slice(2), cwd: process.cwd() }));
      console.error("FIXTURE_NEXT_BUILDER_CALLED");
      process.exitCode = 99;
    }
    if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) await main();
  `
  );
}

function archive(t, { tamper = false, missing = false, links = false } = {}) {
  const workspace = directory(t, "next-build-boundary-");
  const source = join(workspace, "source");
  const download = join(workspace, "_artifacts/next-build-download");
  const sealed = join(workspace, "sealed");
  mkdirSync(join(source, ".build/next/standalone"), { recursive: true });
  mkdirSync(download, { recursive: true });
  mkdirSync(sealed);
  const server = join(source, ".build/next/standalone/server.js");
  const target = join(sealed, "e2e-build.tar.gz");
  writeFileSync(server, "module.exports = 'original fixture bytes';\n");
  writeFileSync(join(source, ".build/next/BUILD_ID"), "fixture-build-id\n");
  if (links) {
    const modules = join(source, ".build/next/standalone/node_modules");
    mkdirSync(join(modules, ".bin"), { recursive: true });
    mkdirSync(join(modules, "fixture"));
    writeFileSync(join(modules, "fixture/cli.js"), "module.exports = 42;\n");
    symlinkSync("../fixture/cli.js", join(modules, ".bin/fixture"));
    linkSync(join(modules, "fixture/cli.js"), join(modules, "fixture/alias.js"));
  }
  const output = measureNextTree(join(source, ".build/next"));
  const pack = () => {
    const result = run("tar", ["-czf", target, "-C", source, ".build/next"], workspace);
    assert.equal(result.status, 0, result.stderr);
  };
  pack();
  const original = readFileSync(target);
  const declaredSha256 = sha256(original);
  const candidateSha = "1".repeat(40);
  const treeSha = "2".repeat(40);
  const lock = '{"lockfileVersion":3}\n';
  const workflowBytes = "name: fixture CI\n";
  const event = {
    repository: { full_name: "owner/repo", id: 1234 },
    pull_request: {
      merge_commit_sha: candidateSha,
      head: { sha: "3".repeat(40), ref: "feature/fixture", repo: { id: 5678 } },
      base: { sha: "4".repeat(40), repo: { id: 1234 } },
    },
  };
  const env = {
    GITHUB_SHA: candidateSha,
    GITHUB_REPOSITORY: "owner/repo",
    GITHUB_REPOSITORY_ID: "1234",
    GITHUB_REF: "refs/pull/7/merge",
    GITHUB_EVENT_NAME: "pull_request",
    GITHUB_EVENT_PATH: join(workspace, "_artifacts/event.json"),
    GITHUB_WORKFLOW_SHA: "5".repeat(40),
    GITHUB_WORKFLOW_REF: "owner/repo/.github/workflows/ci.yml@refs/pull/7/merge",
    GITHUB_RUN_ID: "987654321",
    GITHUB_RUN_ATTEMPT: "2",
    GITHUB_WORKSPACE: workspace,
    GITHUB_ENV: join(workspace, "_artifacts/github-env"),
    NEXT_BUILD_ARTIFACT_ID: "123456",
    NEXT_BUILD_ARCHIVE_SHA256: declaredSha256,
    NEXT_BUILD_PRODUCER_ATTEMPT: "1",
    NEXT_BUILD_PRODUCER_RESULT: "success",
    NEXT_BUILD_QUEUE_BASE: "",
    NEXT_BUILD_PYTHON: "python3",
    MSYS: "",
    PATH: `${join(workspace, "bin")}:${process.env.PATH}`,
  };
  const manifest = `${JSON.stringify({
    schemaVersion: 1,
    policy: "ci-next-build/1",
    source: ciSourceContext({
      env,
      event,
      checkout: { candidateSha, treeSha, lockfileSha256: sha256(lock) },
    }),
    workflow: {
      sha: env.GITHUB_WORKFLOW_SHA,
      ref: env.GITHUB_WORKFLOW_REF,
      fileSha256: sha256(workflowBytes),
    },
    producer: {
      runId: env.GITHUB_RUN_ID,
      runAttempt: "1",
      jobId: "build",
      profile: "full",
      bundler: "webpack",
      runtime: { node: "v24.15.0", abi: "137", platform: "linux", arch: "x64" },
    },
    archive: { name: "e2e-build.tar.gz", sizeBytes: original.length, sha256: declaredSha256 },
    output,
  })}\n`;
  if (!missing) writeFileSync(join(sealed, "next-build-provenance.json"), manifest);
  env.NEXT_BUILD_MANIFEST_SHA256 = sha256(manifest);
  if (tamper) {
    writeFileSync(server, "module.exports = 'changed fixture bytes that were not sealed';\n");
    pack();
    assert.notEqual(sha256(readFileSync(target)), declaredSha256);
  }
  const listing = run("tar", ["-tzf", target], workspace);
  assert.equal(listing.status, 0, listing.stderr);
  assert.match(listing.stdout, /\.build\/next\/standalone\/server\.js/);
  // Verifier scripts execute from this fixture, not the working checkout.
  // No build, package or test consumer is invoked.
  mkdirSync(join(workspace, "scripts"));
  for (const subdirectory of ["ci", "build", "release", "merge-queue"]) {
    cpSync(join(root, "scripts", subdirectory), join(workspace, "scripts", subdirectory), {
      recursive: true,
    });
  }
  writeFileSync(join(workspace, "package.json"), JSON.stringify({ type: "module" }));
  writeFileSync(join(workspace, "package-lock.json"), lock);
  mkdirSync(join(workspace, ".github/workflows"), { recursive: true });
  writeFileSync(join(workspace, ".github/workflows/ci.yml"), workflowBytes);
  writeFileSync(env.GITHUB_EVENT_PATH, JSON.stringify(event));
  mkdirSync(join(workspace, "bin"));
  writeFileSync(
    join(workspace, "bin/git"),
    `#!${process.execPath}\n
    if(process.argv[2] === "rev-parse") console.log(process.argv[3] === "HEAD" ? "${candidateSha}" : "${treeSha}");
  `,
    { mode: 0o755 }
  );
  const zip = join(download, "next-build.zip");
  const zipped = run(
    "python3",
    [
      "-c",
      `
import pathlib, sys, zipfile
source, target = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as bundle:
    for member in sorted(source.iterdir()): bundle.write(member, member.name)
`,
      sealed,
      zip,
    ],
    workspace
  );
  assert.equal(zipped.status, 0, zipped.stderr);
  env.NEXT_BUILD_ARTIFACT_DIGEST = sha256(readFileSync(zip));
  const builderMarker = join(workspace, "unexpected-next-builder.json");
  installBuilderSentinel(workspace, builderMarker);
  return { workspace, target, env, builderMarker };
}

function extractionSteps(jobId, firstConsumer) {
  const steps = workflow.jobs[jobId].steps;
  const download = steps.findIndex((step) => step.name === "Download Next.js build artifact");
  const consumer = steps.findIndex(firstConsumer);
  assert.ok(download >= 0 && consumer > download, `fixture locates ${jobId} input boundary`);
  const boundary = steps.slice(download + 1, consumer);
  assert.ok(boundary.some((step) => /tar\s+-xzf/.test(step.run || "")));
  for (const step of boundary) {
    assert.equal(
      step.uses,
      undefined,
      "new actions at this boundary need an explicit fixture double"
    );
    assert.doesNotMatch(
      step.run || "",
      /\b(?:npm|npx|curl|wget|gh)\b/,
      "fixture only verifies/extracts bytes"
    );
    assert.doesNotMatch(
      step.run || "",
      /\$\{\{/,
      "workflow expressions need explicit fixture substitution"
    );
  }
  return boundary;
}

function verifyAndExtract(fixture, steps) {
  const env = { ...fixture.env };
  let result = { status: 0, stdout: "", stderr: "" };
  for (const step of steps) {
    for (const [key, value] of Object.entries(step.env || {})) {
      if (typeof value === "string" && value.includes("${{")) {
        assert.ok(Object.hasOwn(env, key), `fixture must bind the independent ${key} value`);
      } else env[key] = String(value);
    }
    result = run("/bin/bash", ["-euo", "pipefail", "-c", step.run], fixture.workspace, env);
    if (result.status !== 0) return result;
  }
  return result;
}

for (const [jobId, firstConsumer] of consumers) {
  for (const tamper of [false, true]) {
    test(
      `Next boundary ${jobId} rejects ${tamper ? "changed tar bytes" : "missing manifest"} before extraction`,
      posix,
      (t) => {
        const fixture = archive(t, { tamper, missing: !tamper });
        const result = verifyAndExtract(fixture, extractionSteps(jobId, firstConsumer));
        assert.equal(
          existsSync(fixture.builderMarker),
          false,
          "input verification cannot trigger a rebuild"
        );
        assert.notEqual(result.status, 0, `${jobId} admitted an unverified build input`);
        assert.match(result.stderr, tamper ? /ci-archive-digest-mismatch/ : /zip-members-invalid/);
        assert.equal(
          existsSync(join(fixture.workspace, ".build/next/standalone/server.js")),
          false
        );
      }
    );
  }
}

for (const [jobId, firstConsumer] of consumers) {
  test(
    `Next boundary ${jobId} accepts one exact producer from a previous successful attempt`,
    posix,
    (t) => {
      const fixture = archive(t, { links: true });
      const result = verifyAndExtract(fixture, extractionSteps(jobId, firstConsumer));
      assert.equal(result.status, 0, result.stderr);
      assert.equal(existsSync(fixture.builderMarker), false);
      assert.equal(
        readFileSync(join(fixture.workspace, ".build/next/standalone/server.js"), "utf8"),
        "module.exports = 'original fixture bytes';\n"
      );
      const receipt = JSON.parse(
        readFileSync(
          join(fixture.workspace, "_artifacts/next-build-verified/next-build-consumption.json")
        )
      );
      assert.equal(receipt.producerAttempt, "1");
      assert.equal(receipt.consumerAttempt, "2");
      assert.equal(receipt.artifactId, fixture.env.NEXT_BUILD_ARTIFACT_ID);
      assert.equal(receipt.candidateSha, fixture.env.GITHUB_SHA);
      assert.equal(
        receipt.inputReceiptSha256,
        sha256(
          readFileSync(join(fixture.workspace, "_artifacts/next-build-verified/next-input.json"))
        )
      );
      assert.match(
        readFileSync(fixture.env.GITHUB_ENV, "utf8"),
        /OMNIROUTE_REQUIRE_PREBUILT_NEXT=1\nOMNIROUTE_NEXT_INPUT_SHA256=[a-f0-9]{64}\n/
      );
    }
  );
}

test("Next boundary controls retain all consumers, Windows advisory, queue isolation and nine E2E shards", () => {
  assert.deepEqual(
    consumers.map(([id]) => id),
    ["package-artifact", "electron-package-smoke", "test-e2e"]
  );
  const electron = workflow.jobs["electron-package-smoke"];
  assert.deepEqual(electron.strategy.matrix.os, ["ubuntu-latest", "windows-latest"]);
  const windows = electron.steps.find(
    (step) => step.name === "Prepare Electron standalone (Windows prebuild verification)"
  );
  assert.equal(windows.if, "runner.os == 'Windows'");
  assert.equal(windows["continue-on-error"], true);
  assert.equal(windows.run, "npm run prepare:bundle 2>&1");
  assert.deepEqual(workflow.jobs["test-e2e"].strategy.matrix.shard, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (const [id] of consumers) assert.match(workflow.jobs[id].if, /queueCandidate/);
  assert.match(
    workflow.jobs.build["runs-on"],
    /!startsWith\(github\.ref, 'refs\/heads\/omni-queue\/'\)/
  );
  const build = workflow.jobs.build.steps.find((step) => step.run === "npm run build");
  assert.match(
    build.env.OMNIROUTE_USE_TURBOPACK,
    /!startsWith\(github\.ref, 'refs\/heads\/omni-queue\/'\)/
  );
});

test("the Electron Windows extraction requires native symbolic links", () => {
  const electron = workflow.jobs["electron-package-smoke"];
  const extract = electron.steps.find((step) => step.name === "Extract Next.js build artifact");
  assert.equal(extract.shell, "bash");
  assert.equal(
    extract.env.MSYS,
    "${{ runner.os == 'Windows' && 'winsymlinks:nativestrict' || '' }}"
  );
  assert.match(extract.run, /tar -xzf .*\nnode .* consume /);
});

test("one producer binds immutable artifact IDs and retained consumption evidence for all consumers", () => {
  const producer = workflow.jobs.build;
  const capture = producer.steps.find((step) => step.name === "Capture Next.js producer identity");
  const seal = producer.steps.find((step) => step.id === "next-build-proof");
  const build = producer.steps.find((step) => step.run === "npm run build");
  const upload = producer.steps.find((step) => step.id === "next-build-artifact");
  assert.equal(capture.env.OMNIROUTE_USE_TURBOPACK, build.env.OMNIROUTE_USE_TURBOPACK);
  assert.equal(seal.env.OMNIROUTE_USE_TURBOPACK, build.env.OMNIROUTE_USE_TURBOPACK);
  assert.equal(producer.steps.filter((step) => step.run === "npm run build").length, 1);
  assert.ok(producer.steps.indexOf(capture) < producer.steps.indexOf(build));
  assert.ok(producer.steps.indexOf(seal) > producer.steps.indexOf(build));
  assert.match(upload.with.name, /github\.run_id.*github\.run_attempt/);
  assert.match(upload.with.path, /e2e-build\.tar\.gz[\s\S]*next-build-provenance\.json/);
  assert.equal(
    producer.outputs.nextArtifactId,
    "${{ steps.next-build-artifact.outputs.artifact-id }}"
  );
  assert.equal(
    producer.outputs.nextArtifactDigest,
    "${{ steps.next-build-artifact.outputs.artifact-digest }}"
  );
  for (const [id] of consumers) {
    const steps = workflow.jobs[id].steps;
    const download = steps.find((step) => step.name === "Download Next.js build artifact");
    const extract = steps.find((step) => step.name === "Extract Next.js build artifact");
    assert.equal(download.with["artifact-ids"], "${{ needs.build.outputs.nextArtifactId }}");
    assert.equal(download.with.name, undefined);
    assert.equal(download.with["skip-decompress"], true);
    assert.equal(download.with["digest-mismatch"], "error");
    assert.equal(extract.shell, "bash", "Windows must also stop after a failed verifier");
    assert.equal(extract.env.NEXT_BUILD_PRODUCER_RESULT, "${{ needs.build.result }}");
    assert.equal(
      extract.env.NEXT_BUILD_PRODUCER_ATTEMPT,
      "${{ needs.build.outputs.nextProducerAttempt }}"
    );
    assert.ok(
      extract.run.indexOf("next-build-provenance.mjs verify") < extract.run.indexOf("tar -xzf")
    );
    assert.ok(
      extract.run.indexOf("next-build-provenance.mjs consume") > extract.run.indexOf("tar -xzf")
    );
    const retained = steps.find((step) => step.name === "Retain Next.js consumption evidence");
    assert.match(retained.with.path, /next-build-consumption\.json/);
    assert.match(retained.with.path, /next-input\.json/);
    assert.match(retained.with.name, /github\.run_attempt/);
  }
  const pack = workflow.jobs["package-artifact"].steps.find((step) =>
    step.name?.startsWith("Stamp dist/BUILD_SHA")
  );
  assert.equal(
    pack.env.OMNIROUTE_BUILD_SHA,
    "${{ github.event.pull_request.head.sha || github.sha }}"
  );
});

function prepublish(t, requirePrebuilt, withBuildId = false) {
  const workspace = directory(t, "next-prebuilt-strict-");
  mkdirSync(join(workspace, "scripts"));
  cpSync(join(root, "scripts/build"), join(workspace, "scripts/build"), { recursive: true });
  writeFileSync(join(workspace, "package.json"), JSON.stringify({ type: "module" }));
  const dist = join(workspace, "dist");
  mkdirSync(dist);
  const staging = join(dist, "old-staging.txt");
  writeFileSync(staging, "existing staging must survive an invalid strict input\n");
  if (withBuildId) {
    mkdirSync(join(workspace, ".build/next"), { recursive: true });
    writeFileSync(join(workspace, ".build/next/BUILD_ID"), "id-without-standalone\n");
  }
  const marker = join(workspace, "unexpected-next-builder.json");
  installBuilderSentinel(workspace, marker);
  const result = run(
    process.execPath,
    ["--import", import.meta.resolve("tsx/esm"), join(workspace, "scripts/build/prepublish.ts")],
    workspace,
    {
      OMNIROUTE_DIST_DIR: dist,
      ...(requirePrebuilt ? { OMNIROUTE_REQUIRE_PREBUILT_NEXT: "1" } : {}),
    }
  );
  return {
    ...result,
    attempted: existsSync(marker) ? JSON.parse(readFileSync(marker, "utf8")) : null,
    stagingPresent: existsSync(staging),
    workspace,
  };
}

test("Next prebuilt harness reaches only the fixture builder in legacy mode", posix, (t) => {
  const result = prepublish(t, false);
  assert.notEqual(result.status, 0, "the sentinel deliberately exits 99");
  assert.deepEqual(result.attempted, { argv: [], cwd: result.workspace });
  assert.match(result.stderr, /FIXTURE_NEXT_BUILDER_CALLED/);
});

for (const withBuildId of [false, true]) {
  test(
    `Next strict prebuilt rejects ${withBuildId ? "BUILD_ID without standalone" : "missing standalone"} without rebuilding or deleting staging`,
    posix,
    (t) => {
      const result = prepublish(t, true, withBuildId);
      assert.notEqual(result.status, 0);
      assert.equal(result.attempted, null, "a strict consumer cannot silently become a producer");
      assert.equal(
        result.stagingPresent,
        true,
        "invalid input is rejected before staging is mutated"
      );
      assert.match(result.stderr, /PREBUILT_NEXT_REQUIRED/);
    }
  );
}
