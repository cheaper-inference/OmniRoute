import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const gate = fileURLToPath(
  new URL("../../../scripts/check/check-openapi-breaking.mjs", import.meta.url)
);
const baseline = "config/quality/quality-baseline.json";

function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), "openapi-event-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const git = (...args) =>
    execFileSync("git", args, {
      cwd: dir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      env: {
        ...process.env,
        GIT_AUTHOR_NAME: "Gate test",
        GIT_AUTHOR_EMAIL: "gate@example.invalid",
        GIT_COMMITTER_NAME: "Gate test",
        GIT_COMMITTER_EMAIL: "gate@example.invalid",
      },
    }).trim();
  git("init", "-q", "--initial-branch=base");
  mkdirSync(join(dir, "docs"));
  mkdirSync(join(dir, "config/quality"), { recursive: true });
  mkdirSync(join(dir, "bin"));
  writeFileSync(
    join(dir, baseline),
    JSON.stringify({ metrics: { openapiBreaking: { value: 0 } } })
  );
  writeFileSync(join(dir, "package.json"), '{"version":"3.8.53"}');
  const spec = (paths) => writeFileSync(join(dir, "docs/openapi.yaml"), JSON.stringify({ paths }));
  const commit = () => {
    git("add", ".");
    git("-c", "core.hooksPath=/dev/null", "commit", "-qm", "fixture");
    return git("rev-parse", "HEAD");
  };
  spec({ "/stable": {} });
  const original = commit();
  git("checkout", "-qb", "contribution");
  writeFileSync(join(dir, "unrelated.txt"), "unrelated change");
  const head = commit();
  git("checkout", "-q", "base");
  spec({ "/stable": {}, "/new-on-base": {} });
  const advanced = commit();
  git("checkout", "-q", "contribution");
  // A deterministic oasdiff protocol stand-in; process tests exercise real git refs.
  writeFileSync(
    join(dir, "bin/oasdiff"),
    `#!${process.execPath}\nconst fs=require('node:fs'); const a=JSON.parse(fs.readFileSync(process.argv[5])); const b=JSON.parse(fs.readFileSync(process.argv[6])); console.log(JSON.stringify(Object.keys(a.paths).filter(p=>!Object.hasOwn(b.paths,p)).map(p=>({id:'api-path-removed-without-deprecation',path:p}))));\n`,
    { mode: 0o755 }
  );
  const run = (eventName, event, extra = {}, args = []) => {
    const eventPath = join(dir, "event.json");
    writeFileSync(eventPath, JSON.stringify(event));
    return spawnSync(process.execPath, [gate, "--ratchet", "--quiet", ...args], {
      cwd: dir,
      encoding: "utf8",
      timeout: 30000,
      env: {
        ...process.env,
        PATH: `${join(dir, "bin")}:${process.env.PATH}`,
        BASE_REF: "base",
        GITHUB_EVENT_NAME: eventName,
        GITHUB_EVENT_PATH: eventPath,
        GITHUB_SHA: git("rev-parse", "HEAD"),
        ...extra,
      },
    });
  };
  return { dir, git, spec, commit, original, head, advanced, run };
}

test("a base advance cannot invent a removal in an unchanged PR spec", (t) => {
  const f = fixture(t);
  const r = f.run("pull_request", {
    pull_request: { base: { sha: f.advanced }, head: { sha: f.head } },
  });
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /openapiBreaking=0/);
  assert.match(r.stdout, new RegExp(`openapiBaseSha=${f.original}`));
});

test("PR synthetic merge compares the merged tree to its pinned event base", (t) => {
  const f = fixture(t);
  f.git("-c", "core.hooksPath=/dev/null", "merge", "--no-ff", "-qm", "candidate", f.advanced);
  const r = f.run("pull_request", {
    pull_request: { base: { sha: f.advanced }, head: { sha: f.head } },
  });
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, new RegExp(`openapiBaseSha=${f.advanced}`));
});

for (const eventName of ["push", "merge_group"]) {
  test(`${eventName} retains a genuine removed endpoint failure`, (t) => {
    const f = fixture(t);
    f.spec({});
    const after = f.commit();
    const event =
      eventName === "push"
        ? { before: f.head, after }
        : { merge_group: { base_sha: f.head, head_sha: after } };
    const r = f.run(eventName, event);
    assert.equal(r.status, 1, r.stdout + r.stderr);
    assert.match(r.stdout, /openapiBreaking=1/);
    assert.match(r.stdout, new RegExp(`openapiBaseSha=${f.head}`));
  });
}

for (const [label, event, env] of [
  ["missing event base", {}, {}],
  ["unavailable event base", { before: "a".repeat(40) }, {}],
  ["checkout from another candidate", { before: "a".repeat(40) }, { GITHUB_SHA: "b".repeat(40) }],
]) {
  test(`required measurement fails closed: ${label}`, (t) => {
    const f = fixture(t);
    const r = f.run("push", { after: f.head, ...event }, env);
    assert.equal(r.status, 2, r.stdout + r.stderr);
    assert.match(r.stdout, /openapiBreaking=INCOMPLETE/);
  });
}

test("required measurement fails when oasdiff is missing", (t) => {
  const f = fixture(t);
  const r = f.run("push", { before: f.original, after: f.head }, { PATH: "/nonexistent-bin-dir" });
  assert.equal(r.status, 2);
  assert.match(r.stdout, /openapiBreaking=INCOMPLETE reason=binary-absent/);
});

test("invalid scanner JSON is incomplete, never zero findings", (t) => {
  const f = fixture(t);
  writeFileSync(join(f.dir, "bin/oasdiff"), `#!${process.execPath}\nconsole.log('{}');\n`, {
    mode: 0o755,
  });
  const r = f.run("push", { before: f.original, after: f.head });
  assert.equal(r.status, 2);
  assert.match(r.stdout, /openapiBreaking=INCOMPLETE reason=invalid-report/);
});

test("JSON output still enforces the required ratchet", (t) => {
  const f = fixture(t);
  f.spec({});
  const after = f.commit();
  const r = f.run("push", { before: f.head, after }, {}, ["--json"]);
  assert.equal(r.status, 1, r.stdout + r.stderr);
});

test("a changed spec cannot borrow the checkout's candidate identity", (t) => {
  const f = fixture(t);
  f.spec({});
  const r = f.run("push", { before: f.original, after: f.head });
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stdout, /openapiBreaking=INCOMPLETE reason=candidate-spec-mismatch/);
});

test("required comparison cannot pass with a missing ratchet baseline", (t) => {
  const f = fixture(t);
  rmSync(join(f.dir, baseline));
  const r = f.run("push", { before: f.original, after: f.head });
  assert.equal(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stdout, /openapiBreaking=INCOMPLETE reason=baseline-unresolved/);
});

for (const eventName of ["schedule", "workflow_dispatch"]) {
  test(`${eventName} observes the selected checkout against its pinned first parent`, (t) => {
    const f = fixture(t);
    const r = f.run(eventName, {}, { GITHUB_SHA: f.advanced });
    assert.equal(r.status, 0, r.stdout + r.stderr);
    assert.match(r.stdout, new RegExp(`openapiBaseSha=${f.original}`));
  });
}

for (const [label, program, reason] of [
  ["empty output", "", "invalid-report"],
  ["malformed JSON", "console.log('{');", "parse-error"],
  ["failed tool with plausible output", "console.log('[]');process.exit(1);", "oasdiff-error"],
]) {
  test(`required measurement rejects ${label}`, (t) => {
    const f = fixture(t);
    writeFileSync(join(f.dir, "bin/oasdiff"), `#!${process.execPath}\n${program}\n`, {
      mode: 0o755,
    });
    const r = f.run("push", { before: f.original, after: f.head });
    assert.equal(r.status, 2, r.stdout + r.stderr);
    assert.match(r.stdout, new RegExp(`openapiBreaking=INCOMPLETE reason=${reason}`));
  });
}
