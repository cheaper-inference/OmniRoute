import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  isCompleteMultiArchManifest,
  isManifestNotFound,
} from "../../../scripts/ci/docker-image-complete.mjs";

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
  const tempDir = mkdtempSync(join(tmpdir(), "docker-complete-test-"));
  const fakeDocker = join(tempDir, "docker");
  writeFileSync(
    join(tempDir, "fake-docker.cjs"),
    `const { appendFileSync, existsSync, readFileSync } = require("node:fs");
const log = process.env.FAKE_DOCKER_LOG;
const ref = process.argv[process.argv.length - 1];
const previousCalls = log && existsSync(log)
  ? readFileSync(log, "utf8").split("\\n").filter((line) => line.endsWith(JSON.stringify(ref) + "]")).length
  : 0;
if (log) appendFileSync(log, JSON.stringify(process.argv.slice(2)) + "\\n");
const map = JSON.parse(process.env.FAKE_DOCKER_MAP || "{}");
const entry = map[ref] ?? map["*"] ?? { status: 1, stderr: "not found" };
if (previousCalls < (entry.failFirst ?? 0)) {
  process.stderr.write("ERROR: failed to do request: 503 Service Unavailable");
  process.exit(1);
}
if (entry.stderr) process.stderr.write(entry.stderr);
if (entry.stdout) process.stdout.write(typeof entry.stdout === "string" ? entry.stdout : JSON.stringify(entry.stdout));
process.exit(entry.status ?? 0);
`
  );
  writeFileSync(fakeDocker, `#!/bin/sh\nexec node "${join(tempDir, "fake-docker.cjs")}" "$@"\n`);
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
        DOCKER_IMAGE_COMPLETE_RETRY_DELAY_MS: "0",
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

    // 6. malformed JSON: cannot tell what the tag holds
    assert.equal(run(["app:malformed"], { "app:malformed": { stdout: "{not-json" } }).status, 2);

    // 7. missing / non-index
    assert.equal(
      run(["app:nonindex"], { "app:nonindex": { stdout: { schemaVersion: 2 } } }).status,
      1
    );

    // 8. missing tag: a definite answer, no retry
    const missing = run(["app:missing"], {
      "app:missing": { status: 1, stderr: "ERROR: docker.io/library/app:missing: not found" },
    });
    assert.equal(missing.status, 1);
    assert.equal(missing.argv.length, 1);

    // 9. registry failure: retried, then "could not tell"
    const failing = run(["app:fail"], { "app:fail": { status: 1, stderr: "network timeout" } });
    assert.equal(failing.status, 2);
    assert.equal(failing.argv.length, 3);

    // 10. transient failure that recovers
    const recovered = run(["app:flaky"], {
      "app:flaky": {
        failFirst: 2,
        stdout: makeIndex("linux/amd64", "linux/arm64"),
      },
    });
    assert.equal(recovered.status, 0, recovered.stderr);
    assert.equal(recovered.argv.length, 3);

    // 11. no args
    assert.equal(run([]).status, 2);
  });
});

test("isManifestNotFound: only a missing tag counts, never a registry or network failure", () => {
  // Captured from docker buildx v0.37.0.
  assert.equal(
    isManifestNotFound("ERROR: docker.io/diegosouzapw/omniroute:no-such-tag: not found"),
    true
  );
  assert.equal(isManifestNotFound("manifest unknown"), true);
  assert.equal(isManifestNotFound("name unknown: repository not known to registry"), true);
  assert.equal(
    isManifestNotFound(
      'ERROR: failed to do request: Head "https://registry.invalid/v2/foo/manifests/1": dial tcp: lookup registry.invalid on 127.0.0.11:53: no such host'
    ),
    false
  );
  assert.equal(isManifestNotFound("dial tcp: lookup registry.invalid: not found"), false);
  assert.equal(
    isManifestNotFound(
      "ERROR: failed to authorize: failed to fetch anonymous token: unexpected status: 401 Unauthorized"
    ),
    false
  );
  assert.equal(isManifestNotFound("toomanyrequests: 429 Too Many Requests"), false);
  assert.equal(isManifestNotFound(""), false);
  assert.equal(isManifestNotFound(undefined), false);
});
