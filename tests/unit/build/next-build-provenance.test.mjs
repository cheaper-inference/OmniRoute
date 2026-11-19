import assert from "node:assert/strict";
import test from "node:test";
import { ciSourceContext, verifyManifest } from "../../../scripts/ci/next-build-provenance.mjs";

const candidateSha = "1".repeat(40);
const checkout = { candidateSha, treeSha: "2".repeat(40), lockfileSha256: "3".repeat(64) };
const repository = { full_name: "owner/repo", id: 42 };
function fixture() {
  const env = {
    GITHUB_SHA: candidateSha,
    GITHUB_REPOSITORY: repository.full_name,
    GITHUB_REPOSITORY_ID: "42",
    GITHUB_REF: "refs/pull/9/merge",
    GITHUB_EVENT_NAME: "pull_request",
    NEXT_BUILD_PRODUCER_RESULT: "success",
    NEXT_BUILD_ARTIFACT_ID: "123",
    NEXT_BUILD_ARTIFACT_DIGEST: "4".repeat(64),
    NEXT_BUILD_MANIFEST_SHA256: "5".repeat(64),
    NEXT_BUILD_ARCHIVE_SHA256: "6".repeat(64),
    NEXT_BUILD_PRODUCER_ATTEMPT: "1",
  };
  const event = {
    repository,
    pull_request: {
      merge_commit_sha: candidateSha,
      head: { sha: "7".repeat(40), ref: "feature/thing", repo: { id: 43 } },
      base: { sha: "8".repeat(40), repo: { id: 42 } },
    },
  };
  const context = {
    source: ciSourceContext({ env, event, checkout }),
    workflow: {
      sha: "9".repeat(40),
      ref: "owner/repo/.github/workflows/ci.yml@refs/pull/9/merge",
      fileSha256: "a".repeat(64),
    },
    runId: "1001",
    runAttempt: "2",
  };
  const archive = { sha256: env.NEXT_BUILD_ARCHIVE_SHA256, sizeBytes: 1234 };
  const manifest = {
    schemaVersion: 1,
    policy: "ci-next-build/1",
    source: structuredClone(context.source),
    workflow: { ...context.workflow },
    producer: {
      runId: "1001",
      runAttempt: "1",
      jobId: "build",
      profile: "full",
      bundler: "webpack",
      runtime: { node: "v24.15.0", abi: "137", platform: "linux", arch: "x64" },
    },
    archive: { name: "e2e-build.tar.gz", ...archive },
    output: { sha256: "b".repeat(64), bytes: 123, files: 2, links: 0, entries: 3 },
  };
  const expected = {
    context,
    env,
    archive,
    manifestSha256: env.NEXT_BUILD_MANIFEST_SHA256,
    zip: {
      schemaVersion: 1,
      artifactId: "123",
      sha256: env.NEXT_BUILD_ARTIFACT_DIGEST,
      sizeBytes: 1111,
    },
  };
  return { manifest, expected, event, env };
}

test("PR identity keeps the tested merge, head, tree and base distinct", () => {
  const { manifest, expected } = fixture();
  assert.equal(manifest.source.candidateSha, candidateSha);
  assert.equal(manifest.source.treeSha, checkout.treeSha);
  assert.equal(manifest.source.headSha, "7".repeat(40));
  assert.equal(manifest.source.baseSha, "8".repeat(40));
  assert.notEqual(manifest.source.headRepositoryId, manifest.source.repositoryId);
  assert.equal(verifyManifest(manifest, expected), manifest);
});

test("a later consumer retains the original successful producer attempt and runtime", () => {
  const { manifest, expected } = fixture();
  expected.context.runAttempt = "7";
  // Windows is the receiving platform, not an alternate identity for Linux bytes.
  expected.consumerPlatform = "win32";
  const before = JSON.stringify(manifest);
  verifyManifest(manifest, expected);
  assert.equal(JSON.stringify(manifest), before);
  assert.equal(manifest.producer.runAttempt, "1");
  assert.equal(manifest.producer.runtime.platform, "linux");
});

for (const key of [
  "candidateSha",
  "treeSha",
  "lockfileSha256",
  "headSha",
  "headRepositoryId",
  "baseSha",
  "baseSource",
  "repository",
  "repositoryId",
  "ref",
  "headRef",
  "eventName",
  "queue",
]) {
  test(`a foreign ${key} cannot reuse a build`, () => {
    const { manifest, expected } = fixture();
    manifest.source[key] = key === "queue" ? { source: "self" } : "foreign";
    assert.throws(() => verifyManifest(manifest, expected), /ci-manifest-identity-mismatch/);
  });
}

for (const key of ["sha", "ref", "fileSha256"]) {
  test(`workflow ${key} is bound independently to the consumer context`, () => {
    const { manifest, expected } = fixture();
    manifest.workflow[key] = "foreign";
    assert.throws(() => verifyManifest(manifest, expected), /ci-manifest-identity-mismatch/);
  });
}

for (const [name, change, reason] of [
  [
    "a failed new Build",
    (_manifest, e) => {
      e.env.NEXT_BUILD_PRODUCER_RESULT = "failure";
    },
    "ci-producer-not-successful",
  ],
  [
    "a cancelled new Build",
    (_manifest, e) => {
      e.env.NEXT_BUILD_PRODUCER_RESULT = "cancelled";
    },
    "ci-producer-not-successful",
  ],
  [
    "an ambiguous artifact ID",
    (_manifest, e) => {
      e.env.NEXT_BUILD_ARTIFACT_ID = "123,456";
    },
    "ci-independent-output-missing",
  ],
  [
    "missing independent manifest digest",
    (_manifest, e) => {
      delete e.env.NEXT_BUILD_MANIFEST_SHA256;
    },
    "ci-independent-output-missing",
  ],
  [
    "changed manifest bytes",
    (_manifest, e) => {
      e.manifestSha256 = "c".repeat(64);
    },
    "ci-manifest-digest-mismatch",
  ],
  [
    "foreign ZIP artifact ID",
    (_manifest, e) => {
      e.zip.artifactId = "456";
    },
    "ci-zip-proof-mismatch",
  ],
  [
    "foreign ZIP digest",
    (_manifest, e) => {
      e.zip.sha256 = "c".repeat(64);
    },
    "ci-zip-proof-mismatch",
  ],
  [
    "foreign run",
    (m) => {
      m.producer.runId = "1002";
    },
    "ci-producer-attempt-mismatch",
  ],
  [
    "relabeled attempt",
    (m) => {
      m.producer.runAttempt = "2";
    },
    "ci-producer-attempt-mismatch",
  ],
  [
    "future attempt",
    (m, e) => {
      m.producer.runAttempt = e.env.NEXT_BUILD_PRODUCER_ATTEMPT = "3";
    },
    "ci-producer-attempt-mismatch",
  ],
  [
    "a partial build profile",
    (m) => {
      m.producer.profile = "backend";
    },
    "ci-producer-runtime-invalid",
  ],
  [
    "an unknown bundler",
    (m) => {
      m.producer.bundler = "unknown";
    },
    "ci-producer-runtime-invalid",
  ],
  [
    "a missing ABI",
    (m) => {
      delete m.producer.runtime.abi;
    },
    "ci-producer-runtime-invalid",
  ],
  [
    "an invalid runtime",
    (m) => {
      m.producer.runtime.node = "latest";
    },
    "ci-producer-runtime-invalid",
  ],
  [
    "changed tar bytes",
    (_manifest, e) => {
      e.archive.sha256 = "c".repeat(64);
    },
    "ci-archive-digest-mismatch",
  ],
  [
    "a changed tar size",
    (_manifest, e) => {
      e.archive.sizeBytes += 1;
    },
    "ci-archive-digest-mismatch",
  ],
  [
    "empty output evidence",
    (m) => {
      m.output.files = 0;
    },
    "ci-output-tree-invalid",
  ],
]) {
  test(`Next provenance rejects ${name}`, () => {
    const { manifest, expected } = fixture();
    change(manifest, expected);
    assert.throws(() => verifyManifest(manifest, expected), new RegExp(reason));
  });
}

test("a queue push created with zero before binds the trailer base, not itself", () => {
  const { env } = fixture();
  const baseSha = "8".repeat(40);
  Object.assign(env, {
    GITHUB_EVENT_NAME: "push",
    GITHUB_REF: `refs/heads/omni-queue/release-v3.8.55/b1-${candidateSha.slice(0, 12)}`,
    NEXT_BUILD_QUEUE_BASE: baseSha,
  });
  const event = { repository, ref: env.GITHUB_REF, before: "0".repeat(40), after: candidateSha };
  const queueMessage = `candidate\n\nOmni-Queue-Base: ${baseSha}\nOmni-Queue-Batch: b1\nOmni-Queue-Target: release/v3.8.55\n`;
  const source = ciSourceContext({
    env,
    event,
    checkout,
    queueMessage,
  });
  assert.equal(source.baseSha, baseSha);
  assert.equal(source.baseSource, "queue");
  assert.equal(source.queue.source, "trailer");
  assert.throws(() => ciSourceContext({ env, event, checkout, queueMessage: "no base" }));
  assert.throws(
    () =>
      ciSourceContext({
        env: { ...env, NEXT_BUILD_QUEUE_BASE: candidateSha },
        event,
        checkout,
        queueMessage,
      }),
    /ci-queue-base-mismatch/
  );
});

test("merge-group and dispatch contexts use their own source fields", () => {
  const { env } = fixture();
  const merge = ciSourceContext({
    env: { ...env, GITHUB_EVENT_NAME: "merge_group" },
    checkout,
    event: { repository, merge_group: { head_sha: candidateSha, base_sha: "8".repeat(40) } },
  });
  assert.equal(merge.baseSource, "merge-group");
  const dispatch = ciSourceContext({
    env: {
      ...env,
      GITHUB_EVENT_NAME: "workflow_dispatch",
      GITHUB_REF: "refs/heads/release/v3.8.55",
    },
    checkout,
    event: { repository },
  });
  assert.equal(dispatch.baseSha, candidateSha);
  assert.equal(dispatch.baseSource, "candidate");
});

test("event head substitution cannot relabel a synthetic PR checkout", () => {
  const { env, event } = fixture();
  assert.throws(
    () =>
      ciSourceContext({
        env,
        event,
        checkout: { ...checkout, candidateSha: event.pull_request.head.sha },
      }),
    /ci-checkout-sha-mismatch/
  );
});
