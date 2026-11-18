import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  chmodSync,
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

const root = fileURLToPath(new URL("../../", import.meta.url));
const workflow = load(
  readFileSync(join(root, ".github/workflows/i18n-mirror-refresh.yml"), "utf8")
);
export const steps = workflow.jobs.refresh.steps;
export const branch = "chore/i18n-mirror-refresh";
export const baseBranch = "release/v3.8.55";
export const marker = "<!-- omniroute:i18n-mirror-refresh:v1 -->";
export const failedMirror = "docs/i18n/fr/README.md";
export const publication = "Commit and open or update the refresh PR";
export const checking = "Check the refreshed mirrors";
const hash = (value) => createHash("sha256").update(value).digest("hex");

export function report(overrides = {}) {
  return {
    ok: true,
    checkedSources: 1,
    checkedTargets: 2,
    driftedSources: [],
    missingTargets: [],
    driftedTargets: [],
    staleTargets: [],
    ...overrides,
  };
}

// The actual workflow shell runs unchanged. Git uses an isolated local bare remote;
// gh is an external-service fixture and npm/checker output is controlled. Inline
// report consumers and any validation helpers still run their real source code.
const toolSource = String.raw`
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const args = process.argv.slice(2);
const tool = path.basename(process.argv[1]);
const env = process.env;
const c = JSON.parse(fs.readFileSync(env.FIXTURE_CONTROL, "utf8"));
const log = (extra = {}) => fs.appendFileSync(env.FIXTURE_CALLS,
  JSON.stringify({ tool, args, gateMode: env.OMNIROUTE_GATE_MODE || "", ...extra }) + "\n");
log();
const flag = (name) => args[args.indexOf(name) + 1];
const output = (text) => process.stdout.write(String(text) + "\n");
const delegate = (command, argv, options = {}) => {
  const result = spawnSync(command, argv, {
    stdio: "inherit", env: { ...env, PATH: env.FIXTURE_REAL_PATH }, ...options,
  });
  if (result.error) throw result.error;
  return result.status ?? 1;
};
const gitValue = (argv) => {
  const result = spawnSync("git", argv, {
    encoding: "utf8", env: { ...env, PATH: env.FIXTURE_REAL_PATH },
  });
  if (result.status !== 0) throw new Error("fixture git lookup failed: " + result.stderr);
  return result.stdout.trim();
};
const remoteHead = (name) => gitValue(["--git-dir", env.FIXTURE_REMOTE, "rev-parse", "refs/heads/" + name]);
if (tool === "git") {
  if (args.includes("push") && c.raceSha) {
    const rc = delegate("git", ["--git-dir", env.FIXTURE_REMOTE, "update-ref", "refs/heads/" + env.REFRESH_BRANCH, c.raceSha]);
    if (rc) process.exit(rc);
    log({ raceApplied: c.raceSha });
  }
  const rc = delegate("git", args);
  if (args.includes("commit") && rc === 0) fs.writeFileSync(env.FIXTURE_COMMITTED, "1");
  process.exit(rc);
}
if (tool === "npm") {
  output("fixture docs check");
  process.exit(c.docsExit || 0);
}
if (tool === "node") {
  if (args.some((arg) => arg.endsWith("/check-translation-drift.mjs"))) {
    const value = fs.existsSync(env.FIXTURE_COMMITTED) ? (c.committedReport || c.report) : c.report;
    output(JSON.stringify(value));
    process.exit(c.checkerExit || 0);
  }
  if (args.some((arg) => arg.endsWith("/run-translation.mjs"))) {
    throw new Error("unexpected fixture command: live translator must never run");
  }
  process.exit(delegate(env.FIXTURE_NODE, args));
}
if (tool === "gh") {
  const freeze = args.includes("release-freeze") || args.some((arg) => arg.includes("labels=release-freeze"));
  if (freeze) {
    const all = c.freezes || [];
    const paginated = args[0] === "api" && args.includes("--paginate");
    const limit = args.includes("--limit") ? Number(flag("--limit")) : 30;
    const selected = args[0] === "issue" ? all.slice(0, limit) : (paginated ? all : all.slice(0, 100));
    if (args.includes("--jq") || args.includes("-q")) {
      for (const row of selected) output(row.number + "\t" + row.title);
    } else output(JSON.stringify(args.includes("--slurp") ? [selected] : selected));
    process.exit(c.freezeExit || (paginated ? c.laterFreezePageExit || 0 : 0));
  }
  if (args[0] === "api") {
    const endpoint = args.find((arg) => arg.startsWith("repos/")) || "";
    if (endpoint.includes("matching-refs/heads/release/v")) {
      output("refs/heads/release/v3.8.9\nrefs/heads/" + env.BASE); process.exit(0);
    }
    if (endpoint.includes("labels=base-red")) { process.exit(0); }
    if (endpoint.includes("git/ref/heads/")) { output(remoteHead(env.BASE)); process.exit(0); }
    if (endpoint.includes("matching-refs/heads/chore/")) {
      output(env.REFRESH_SHA); process.exit(c.refreshLookupExit || 0);
    }
  }
  if (args[0] === "pr" && args[1] === "list") {
    let rows = c.prs || [];
    if (flag("--state") === "open") rows = rows.filter((row) => row.state === "OPEN");
    if (args.includes("--jq")) {
      if (rows[0]) output(rows[0].number + " " + rows[0].baseRefName);
    } else output(JSON.stringify(rows));
    process.exit(c.prLookupExit || 0);
  }
  if (args[0] === "pr" && args[1] === "view") {
    const row = (c.prs || []).find((pr) => String(pr.number) === args[2]);
    if (!row) throw new Error("fixture PR not found");
    // Git supplies the actual head after the real local push. The service boundary
    // retains its body/draft/base, including changes made by ready/edit below.
    const pr = { ...row, headRefOid: remoteHead(env.REFRESH_BRANCH) };
    output(args.includes("--jq") ? pr.baseRefName : JSON.stringify(pr));
    process.exit(0);
  }
  if (args[0] === "pr" && ["create", "edit", "comment", "ready"].includes(args[1])) {
    if (args.includes("--body-file")) fs.copyFileSync(flag("--body-file"), env.FIXTURE_BODY);
    if (["edit", "ready"].includes(args[1])) {
      const row = (c.prs || []).find((pr) => String(pr.number) === args[2]);
      if (!row) throw new Error("fixture PR not found");
      if (args[1] === "ready" && args.includes("--undo")) row.isDraft = true;
      if (args.includes("--base")) row.baseRefName = flag("--base");
      if (args[1] === "edit" && args.includes("--body-file")) row.body = fs.readFileSync(flag("--body-file"), "utf8");
      fs.writeFileSync(env.FIXTURE_CONTROL, JSON.stringify(c));
    }
    if (args[1] === "create") output("https://example.invalid/fixture/pull/1");
    process.exit(0);
  }
  if (args[0] === "auth" && args[1] === "setup-git") process.exit(0);
}
process.stderr.write("unexpected fixture command: " + tool + " " + args.join(" ") + "\n");
process.exit(96);
`;

export function fixture(t, { partial = false, statePaddingBytes = 0 } = {}) {
  const temporary = mkdtempSync(join(tmpdir(), "mirror-refresh-writer-"));
  t.after(() =>
    rmSync(temporary, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
  );
  const work = join(temporary, "checkout");
  const remote = join(temporary, "origin.git");
  const bin = join(temporary, "scripts/ad-hoc/bin");
  const control = join(temporary, "control.json");
  const callsPath = join(temporary, "calls.jsonl");
  mkdirSync(work);
  mkdirSync(bin, { recursive: true });
  const realPath = `${dirname(process.execPath)}:/usr/bin:/bin`;
  const env = {
    PATH: realPath,
    LANG: "C.UTF-8",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_TERMINAL_PROMPT: "0",
    GIT_ALLOW_PROTOCOL: "file",
    GIT_NO_LAZY_FETCH: "1",
    GIT_AUTHOR_NAME: "Mirror Fixture",
    GIT_AUTHOR_EMAIL: "mirror@example.invalid",
    GIT_COMMITTER_NAME: "Mirror Fixture",
    GIT_COMMITTER_EMAIL: "mirror@example.invalid",
  };
  const git = (...args) =>
    execFileSync("git", args, {
      cwd: work,
      env,
      encoding: "utf8",
      timeout: 10000,
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  const write = (name, value) => {
    mkdirSync(dirname(join(work, name)), { recursive: true });
    writeFileSync(join(work, name), value);
  };
  git("init", "--quiet", "--bare", "--initial-branch=" + baseBranch, remote);
  git("init", "--quiet", "--initial-branch=" + baseBranch);
  git("remote", "add", "origin", remote);
  cpSync(join(root, "scripts/i18n"), join(work, "scripts/i18n"), { recursive: true });
  write(".gitignore", "/scripts/\n/config/\n/package.json\n");
  write("package.json", '{"type":"module"}\n');
  write("llm.txt", "# Fixture\n\nInstructions unchanged.\n");
  write("README.md", "# Fixture\n\nSource content.\n");
  const before = { sources: { "README.md": { source_hash: hash("source-before"), locales: {} } } };
  if (statePaddingBytes) before.fixturePadding = "x".repeat(statePaddingBytes);
  for (const locale of ["de", "fr"]) {
    const content = `# ${locale}\n\nOld translation.\n`;
    write(`docs/i18n/${locale}/README.md`, content);
    write(`docs/i18n/${locale}/llm.txt`, `# ${locale}\n\n---\n\nInstructions unchanged.\n`);
    before.sources["README.md"].locales[locale] = {
      source_hash: hash("source-before"),
      target_hash: hash(content),
      updated_at: "2026-11-17T00:00:00.000Z",
    };
  }
  write(".i18n-state.json", JSON.stringify(before));
  git("add", "--all");
  git("commit", "--quiet", "-m", "test: mirror base");
  const base = git("rev-parse", "HEAD");
  git("push", "--quiet", "origin", `HEAD:refs/heads/${baseBranch}`);
  const translated = "# de\n\nUpdated translation.\n";
  const after = structuredClone(before);
  after.sources["README.md"].source_hash = hash("source-after");
  after.sources["README.md"].locales.de = {
    source_hash: hash("source-after"),
    target_hash: hash(translated),
    updated_at: "2026-11-18T00:00:00.000Z",
  };
  write("docs/i18n/de/README.md", translated);
  write(".i18n-state.json", JSON.stringify(after));
  const initial = { report: report(), freezes: [], prs: [] };
  const configure = (values) => {
    const previous = existsSync(control) ? JSON.parse(readFileSync(control, "utf8")) : initial;
    writeFileSync(control, JSON.stringify({ ...previous, ...values }));
  };
  configure({});
  writeFileSync(callsPath, "");
  for (const command of ["git", "gh", "npm", "node"]) {
    const filename = join(bin, command);
    writeFileSync(filename, `#!${process.execPath}\n${toolSource}`);
    chmodSync(filename, 0o755);
  }
  const preload = join(temporary, "scripts/ad-hoc/no-network.mjs");
  writeFileSync(
    preload,
    'globalThis.fetch = async () => { throw new Error("fixture blocks live network"); };\n'
  );
  const runtime = {
    ...env,
    PATH: `${bin}:${realPath}`,
    NODE_OPTIONS: `--import=${preload}`,
    RUNNER_TEMP: temporary,
    GITHUB_OUTPUT: join(temporary, "outputs"),
    GITHUB_STEP_SUMMARY: join(temporary, "summary"),
    FIXTURE_CONTROL: control,
    FIXTURE_CALLS: callsPath,
    FIXTURE_REMOTE: remote,
    FIXTURE_REAL_PATH: realPath,
    FIXTURE_NODE: process.execPath,
    FIXTURE_COMMITTED: join(temporary, "committed"),
    FIXTURE_BODY: join(temporary, "published-body.md"),
    BASE: baseBranch,
    INPUT_BASE: baseBranch,
    BASE_SHA: base,
    REFRESH_SHA: "",
    REFRESH_BRANCH: branch,
    REPO: "example/fixture",
    PR_TITLE: "docs(i18n): fixture",
    ENGINE: "google",
    FILES: "README.md",
    LLM: "false",
    PARTIAL: partial ? "true" : "",
    GH_TOKEN: "fixture-token",
    REFRESH_READ_TOKEN: "fixture-read-token",
    RUN_URL: "https://example.invalid/fixture/actions/runs/1",
  };
  for (const path of [runtime.GITHUB_OUTPUT, runtime.GITHUB_STEP_SUMMARY]) writeFileSync(path, "");
  if (partial)
    writeFileSync(
      join(temporary, "translate-failures.json"),
      JSON.stringify({
        considered: 2,
        translated: 1,
        skipped: 0,
        failed: 1,
        failures: [{ rel: "README.md", locale: "fr", error: "controlled fixture failure" }],
        translatedUnits: [{ rel: "README.md", locale: "de" }],
      })
    );
  const calls = () => readFileSync(callsPath, "utf8").split("\n").filter(Boolean).map(JSON.parse);
  const run = (label, overrides = {}) => {
    const step = steps.find((value) => value.id === label || value.name === label);
    assert.equal(typeof step?.run, "string", `existing workflow interface: ${label}`);
    const result = spawnSync(
      "bash",
      ["--noprofile", "--norc", "-e", "-o", "pipefail", "-c", step.run],
      {
        cwd: work,
        env: { ...runtime, ...overrides },
        encoding: "utf8",
        timeout: 20000,
        maxBuffer: 1024 * 1024,
      }
    );
    assert.equal(result.error, undefined);
    assert.equal(result.signal, null);
    assert.doesNotMatch(
      result.stderr,
      /ERR_MODULE_NOT_FOUND|does not provide an export named|unexpected fixture command/
    );
    return {
      ...result,
      calls: calls(),
      outputs: readFileSync(runtime.GITHUB_OUTPUT, "utf8"),
      body: existsSync(runtime.FIXTURE_BODY) ? readFileSync(runtime.FIXTURE_BODY, "utf8") : "",
    };
  };
  const remoteHead = () =>
    git("ls-remote", "--heads", "origin", `refs/heads/${branch}`).split("\t")[0];
  const hook = (script) => {
    write("scripts/ad-hoc/hook.mjs", script);
    write(".git/hooks/pre-commit", "#!/bin/sh\nnode scripts/ad-hoc/hook.mjs\n");
    chmodSync(join(work, ".git/hooks/pre-commit"), 0o755);
  };
  const competingCommit = () => {
    const checkout = join(temporary, "competitor");
    git("clone", "--quiet", "--branch", baseBranch, remote, checkout);
    writeFileSync(join(checkout, "competing.txt"), "another writer\n");
    const other = (...args) =>
      execFileSync("git", args, { cwd: checkout, env, encoding: "utf8", timeout: 10000 }).trim();
    other("add", "competing.txt");
    other("commit", "--quiet", "-m", "test: competing writer");
    const sha = other("rev-parse", "HEAD");
    other("push", "--quiet", "origin", `${sha}:refs/heads/fixture-race-object`);
    return sha;
  };
  return {
    work,
    remote,
    base,
    before,
    after,
    env: runtime,
    git,
    write,
    run,
    configure,
    calls,
    remoteHead,
    hook,
    competingCommit,
  };
}

export function ownedPr(sha, overrides = {}) {
  return {
    number: 12,
    state: "OPEN",
    isDraft: true,
    baseRefName: baseBranch,
    headRefName: branch,
    headRefOid: sha,
    body: marker + "\n- Candidate: `" + sha + "`",
    headRepository: { nameWithOwner: "example/fixture" },
    isCrossRepository: false,
    ...overrides,
  };
}

export function assertUnpublished(result) {
  assert.notEqual(result.status, 0, result.stdout + result.stderr);
  assert.equal(
    result.calls.filter((call) => call.tool === "git" && call.args.includes("push")).length,
    0
  );
  assert.equal(
    result.calls.filter(
      (call) =>
        call.tool === "gh" &&
        call.args[0] === "pr" &&
        ["create", "edit", "comment", "ready"].includes(call.args[1])
    ).length,
    0
  );
}
