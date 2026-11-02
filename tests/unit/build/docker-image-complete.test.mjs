import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { isCompleteMultiArchManifest } from "../../../scripts/ci/docker-image-complete.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const scriptPath = join(root, "scripts/ci/docker-image-complete.mjs");

const makeIndex = (...platforms) => ({
  manifests: platforms.map((p) => {
    if (!p) return {};
    const [os, architecture] = p.split("/");
    return { platform: { os, architecture } };
  }),
});

test("isCompleteMultiArchManifest: pure validation table", () => {
  assert.equal(isCompleteMultiArchManifest(makeIndex("linux/amd64", "linux/arm64")), true);
  assert.equal(
    isCompleteMultiArchManifest(makeIndex("linux/amd64", "linux/arm64", "unknown/unknown")),
    true
  );
  assert.equal(
    isCompleteMultiArchManifest(JSON.stringify(makeIndex("linux/amd64", "linux/arm64"))),
    true
  );
  assert.equal(isCompleteMultiArchManifest(makeIndex("linux/amd64")), false);
  assert.equal(isCompleteMultiArchManifest(makeIndex("linux/arm64")), false);
  assert.equal(
    isCompleteMultiArchManifest(makeIndex("linux/amd64", "linux/amd64", "linux/arm64")),
    false
  );
  assert.equal(
    isCompleteMultiArchManifest(makeIndex("linux/amd64", "linux/arm64", "linux/arm64")),
    false
  );
  assert.equal(
    isCompleteMultiArchManifest(makeIndex("linux/amd64", "linux/arm64", "linux/s390x")),
    false
  );
  assert.equal(isCompleteMultiArchManifest(makeIndex("windows/amd64", "linux/arm64")), false);
  assert.equal(isCompleteMultiArchManifest({ manifests: [{}] }), false);
  assert.equal(isCompleteMultiArchManifest({ manifests: [] }), false);
  assert.equal(isCompleteMultiArchManifest({}), false);
  assert.equal(isCompleteMultiArchManifest("not-json"), false);
  assert.equal(isCompleteMultiArchManifest(null), false);
});

function withFakeDocker(fn) {
  const artifactsBase = join(root, "_artifacts");
  if (!existsSync(artifactsBase)) mkdirSync(artifactsBase, { recursive: true });
  const tempDir = mkdtempSync(join(artifactsBase, "docker-complete-test-"));
  const fakeDocker = join(tempDir, "docker");
  writeFileSync(
    fakeDocker,
    `#!/usr/bin/env node
import { appendFileSync } from "node:fs";
const log = process.env.FAKE_DOCKER_LOG;
if (log) appendFileSync(log, JSON.stringify(process.argv.slice(2)) + "\\n");
const ref = process.argv[process.argv.length - 1];
const map = JSON.parse(process.env.FAKE_DOCKER_MAP || "{}");
const entry = map[ref] ?? map["*"] ?? { status: 1, stderr: "not found" };
if (entry.stderr) process.stderr.write(entry.stderr);
if (entry.stdout) process.stdout.write(typeof entry.stdout === "string" ? entry.stdout : JSON.stringify(entry.stdout));
process.exit(entry.status ?? 0);
`
  );
  chmodSync(fakeDocker, 0o755);
  try {
    return fn((args, map = {}) => {
      const logFile = join(tempDir, "docker.log");
      if (existsSync(logFile)) rmSync(logFile);
      const env = {
        ...process.env,
        PATH: `${tempDir}:${process.env.PATH}`,
        FAKE_DOCKER_LOG: logFile,
        FAKE_DOCKER_MAP: JSON.stringify(map),
      };
      const res = spawnSync("node", [scriptPath, ...args], { env, encoding: "utf8" });
      const argv = existsSync(logFile)
        ? readFileSync(logFile, "utf8")
            .trim()
            .split("\n")
            .filter(Boolean)
            .map((l) => JSON.parse(l))
        : [];
      return { ...res, argv };
    });
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}

test("CLI test matrix", () => {
  withFakeDocker((run) => {
    // 1. complete index + attestations
    const complete = run(["app:complete"], {
      "app:complete": { stdout: makeIndex("linux/amd64", "linux/arm64", "unknown/unknown") },
    });
    assert.equal(complete.status, 0);
    assert.deepEqual(complete.argv[0], [
      "buildx",
      "imagetools",
      "inspect",
      "--raw",
      "app:complete",
    ]);

    // 2. single amd64 / arm64
    assert.equal(
      run(["app:amd64"], { "app:amd64": { stdout: makeIndex("linux/amd64") } }).status,
      1
    );
    assert.equal(
      run(["app:arm64"], { "app:arm64": { stdout: makeIndex("linux/arm64") } }).status,
      1
    );

    // 3. aggregate pair
    const pair = run(["app:d1", "app:d2"], {
      "app:d1": { stdout: makeIndex("linux/amd64", "unknown/unknown") },
      "app:d2": { stdout: makeIndex("linux/arm64") },
    });
    assert.equal(pair.status, 0);
    assert.equal(pair.argv.length, 2);
    assert.deepEqual(pair.argv[0], ["buildx", "imagetools", "inspect", "--raw", "app:d1"]);
    assert.deepEqual(pair.argv[1], ["buildx", "imagetools", "inspect", "--raw", "app:d2"]);

    // 4. duplicate
    assert.equal(
      run(["app:d1", "app:d2"], {
        "app:d1": { stdout: makeIndex("linux/amd64") },
        "app:d2": { stdout: makeIndex("linux/amd64") },
      }).status,
      1
    );

    // 5. foreign architecture
    assert.equal(
      run(["app:foreign"], {
        "app:foreign": { stdout: makeIndex("linux/amd64", "linux/arm64", "linux/s390x") },
      }).status,
      1
    );

    // 6. malformed JSON
    assert.equal(run(["app:malformed"], { "app:malformed": { stdout: "{not-json" } }).status, 1);

    // 7. missing / non-index
    assert.equal(
      run(["app:nonindex"], { "app:nonindex": { stdout: { schemaVersion: 2 } } }).status,
      1
    );

    // 8. docker status failure
    assert.equal(
      run(["app:fail"], { "app:fail": { status: 1, stderr: "network timeout" } }).status,
      1
    );

    // 9. no args
    assert.equal(run([]).status, 1);
  });
});
