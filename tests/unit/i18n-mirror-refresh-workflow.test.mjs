import assert from "node:assert/strict";
import { test } from "node:test";
import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const workflow = readFileSync(path.join(root, ".github/workflows/i18n-mirror-refresh.yml"), "utf8");
const base = "a".repeat(40);
const candidate = "c".repeat(40);
const previous = "b".repeat(40);
const marker = "<!-- omniroute:i18n-mirror-refresh:v1 -->";
const buckets = [
  "driftedSources",
  "missingTargets",
  "driftedTargets",
  "staleTargets",
  "inconsistentSectionCaches",
];

function block(label) {
  const begin = workflow.indexOf(label);
  assert.notEqual(begin, -1, `workflow step exists: ${label}`);
  const start = workflow.indexOf("        run: |\n", begin) + "        run: |\n".length;
  const next = workflow.indexOf("\n      - ", start);
  return workflow
    .slice(start, next < 0 ? undefined : next)
    .split("\n")
    .map((line) => line.slice(10))
    .join("\n");
}

function report(bucket = null) {
  const value = {
    ok: true,
    checkedSources: 1,
    checkedTargets: 1,
    ...Object.fromEntries(buckets.map((key) => [key, []])),
  };
  if (bucket) {
    value[bucket] = [{ rel: "README.md", locale: "pt-BR" }];
    value.ok = false;
  }
  return value;
}

const stub = `#!${process.execPath}
import fs from "node:fs";
import path from "node:path";
const tool = path.basename(process.argv[1]);
const args = process.argv.slice(2);
const env = process.env;
fs.appendFileSync("calls.jsonl", JSON.stringify({ tool, args }) + "\\n");
const out = (value) => process.stdout.write(String(value) + "\\n");
if (tool === "npm") { out("fixture docs check"); process.exit(Number(env.NPM_RC || 0)); }
if (tool === "gh") {
  if (args[0] === "api") {
    const endpoint = args.find((arg) => arg.startsWith("repos/"));
    if (endpoint?.includes("labels=release-freeze")) { out(env.FREEZES || ""); process.exit(Number(env.FREEZE_RC || 0)); }
    if (endpoint?.includes("labels=base-red")) { out(env.BASE_REDS || ""); process.exit(Number(env.BASE_RED_RC || 0)); }
    if (endpoint?.includes("matching-refs/heads/release/v")) { out("refs/heads/release/v3.8.9\\nrefs/heads/release/v3.8.53"); process.exit(0); }
    if (endpoint?.includes("matching-refs/heads/chore/")) { out(env.REFRESH_SHA || ""); process.exit(Number(env.REFRESH_API_RC || 0)); }
    if (endpoint?.includes("git/ref/heads/")) { out(env.REMOTE_BASE_SHA || env.BASE_SHA); process.exit(0); }
  }
  if (args[0] === "pr" && args[1] === "list") { out(env.PR_ROWS || "[]"); process.exit(0); }
  if (args[0] === "pr" && args[1] === "view") { out(env.BASE); process.exit(0); }
  if (args[0] === "pr" && args[1] === "create") { out("https://github.com/example/repo/pull/1"); process.exit(0); }
  if (args[0] === "pr" && ["ready", "edit"].includes(args[1])) process.exit(0);
  if (args[0] === "auth" && args[1] === "setup-git") process.exit(0);
}
if (tool === "git") {
  if (args[0] === "rev-parse") {
    if (args[1] === "HEAD^") out(env.BASE_SHA);
    else out(fs.existsSync("committed") ? env.CANDIDATE_SHA : (env.CHECKOUT_SHA || env.BASE_SHA));
    process.exit(0);
  }
  if (args.includes("commit")) { fs.writeFileSync("committed", "1"); process.exit(0); }
  if (args[0] === "add") process.exit(0);
  if (args[0] === "diff") {
    if (args.includes("--quiet")) process.exit(env.NO_CHANGE === "1" ? 0 : 1);
    if (args.includes("--name-only")) {
      process.stdout.write((env.CHANGED_PATH || "docs/i18n/pt-BR/README.md") + (args.includes("-z") ? "\\0" : "\\n"));
    }
    process.exit(0);
  }
  if (args[0] === "push") {
    const expected = "--force-with-lease=refs/heads/chore/i18n-mirror-refresh:" + (env.REFRESH_SHA || "");
    if (!args.includes(expected) || args.includes("--force")) process.exit(95);
    process.exit(Number(env.PUSH_RC || 0));
  }
}
process.stderr.write("unexpected stub command\\n"); process.exit(96);
`;

function execute(label, overrides = {}, checker = report()) {
  const directory = mkdtempSync(path.join(tmpdir(), "i18n-refresh-workflow-"));
  const stubs = path.join(directory, "scripts/ad-hoc/stubs");
  mkdirSync(stubs, { recursive: true });
  mkdirSync(path.join(directory, "scripts/i18n"), { recursive: true });
  writeFileSync(path.join(directory, "package.json"), '{"type":"module"}');
  writeFileSync(path.join(directory, "report.json"), JSON.stringify(checker));
  writeFileSync(
    path.join(directory, "scripts/i18n/mirror-refresh-report.mjs"),
    readFileSync(path.join(root, "scripts/i18n/mirror-refresh-report.mjs"))
  );
  writeFileSync(
    path.join(directory, "scripts/i18n/check-translation-drift.mjs"),
    'import fs from "node:fs"; process.stdout.write(fs.readFileSync("report.json")); process.exit(Number(process.env.CHECKER_RC || 0));'
  );
  writeFileSync(
    path.join(directory, "scripts/i18n/run-translation.mjs"),
    'console.log("[i18n-run] summary: translated=0, skipped=0, failed=1"); process.exit(Number(process.env.TRANSLATE_RC || 0));'
  );
  for (const command of ["gh", "git", "npm"]) {
    const filename = path.join(stubs, command);
    writeFileSync(filename, stub);
    chmodSync(filename, 0o755);
  }
  for (const filename of ["output", "summary", "calls.jsonl"])
    writeFileSync(path.join(directory, filename), "");
  const env = {
    PATH: `${stubs}:${path.dirname(process.execPath)}:/usr/bin:/bin`,
    LANG: "C.UTF-8",
    RUNNER_TEMP: directory,
    GITHUB_OUTPUT: path.join(directory, "output"),
    GITHUB_STEP_SUMMARY: path.join(directory, "summary"),
    REFRESH_READ_TOKEN: "fixture-read-token",
    REPO: "example/repo",
    BASE: "release/v3.8.53",
    INPUT_BASE: "release/v3.8.53",
    BASE_SHA: base,
    CANDIDATE_SHA: candidate,
    REFRESH_SHA: "",
    REFRESH_BRANCH: "chore/i18n-mirror-refresh",
    PR_TITLE: "docs(i18n): fixture",
    FILES: "README.md",
    ENGINE: "google",
    RUN_URL: "https://github.com/example/repo/actions/runs/1",
    OMNIROUTE_TRANSLATION_API_KEY: "",
    OMNIROUTE_TRANSLATION_API_URL: "",
    OMNIROUTE_TRANSLATION_MODEL: "",
    OMNIROUTE_TRANSLATION_FALLBACK_MODELS: "",
    OMNIROUTE_TRANSLATION_GOOGLE_API_KEY: "",
    ...overrides,
  };
  try {
    // Preserve Actions' outer -e: `set -uo pipefail` inside a step does not disable it.
    const result = spawnSync(
      "bash",
      ["--noprofile", "--norc", "-e", "-o", "pipefail", "-c", block(label)],
      { cwd: directory, env, encoding: "utf8", timeout: 10000 }
    );
    assert.equal(result.error, undefined);
    assert.equal(result.signal, null);
    const body = path.join(directory, "pr-body.md");
    let prBody = "";
    try {
      prBody = readFileSync(body, "utf8");
    } catch {
      /* No publication attempted. */
    }
    return {
      ...result,
      output: readFileSync(path.join(directory, "output"), "utf8"),
      summary: readFileSync(path.join(directory, "summary"), "utf8"),
      prBody,
      calls: readFileSync(path.join(directory, "calls.jsonl"), "utf8")
        .split("\n")
        .filter(Boolean)
        .map(JSON.parse),
    };
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

const publish = "- name: Commit and open or update the refresh PR";
const calls = (result, tool, command) =>
  result.calls.filter((call) => call.tool === tool && call.args.includes(command));
const owned = (state = "OPEN", isDraft = true) =>
  JSON.stringify([
    {
      number: 12,
      baseRefName: "release/v3.8.52",
      headRefOid: previous,
      state,
      isDraft,
      body: marker,
      headRefName: "chore/i18n-mirror-refresh",
      headRepository: { nameWithOwner: "example/repo" },
      isCrossRepository: false,
    },
  ]);

test("freeze API failure stops target resolution", () => {
  const result = execute("id: target", { FREEZE_RC: "42" });
  assert.equal(result.status, 42);
  assert.doesNotMatch(result.output, /skip=false/);
});

for (const title of ["release-freeze: v3.8.53 in progress", "global release-freeze"]) {
  test(`an applicable freeze skips work: ${title}`, () => {
    const result = execute("id: target", { FREEZES: `1\t${title}` });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.output, /skip=true/);
  });
}

test("another release freeze does not block the selected branch", () => {
  const result = execute("id: target", { FREEZES: "1\trelease-freeze: v3.8.52 in progress" });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.output, /skip=false/);
  assert.match(result.output, new RegExp(`base_sha=${base}`));
});

test("schedule default chooses the highest version and an explicit main is supported", () => {
  const scheduled = execute("id: target", { INPUT_BASE: "" });
  assert.equal(scheduled.status, 0, scheduled.stderr);
  assert.match(scheduled.output, /base=release\/v3\.8\.53/);
  const main = execute("id: target", { INPUT_BASE: "main", BASE: "main" });
  assert.equal(main.status, 0, main.stderr);
  assert.match(main.output, /base=main/);
});

test("a feature branch is refused before any API or translation execution", () => {
  const result = execute("id: target", { INPUT_BASE: "feature/unreviewed" });
  assert.notEqual(result.status, 0);
  assert.deepEqual(result.calls, []);
});

test("absent state is incomplete, not an empty work order", () => {
  const result = execute("id: drift", {}, { ok: false, reason: "missing-state" });
  assert.equal(result.status, 2);
  assert.doesNotMatch(result.output, /files=/);
});

test("cache-only drift selects its source and checkout identity is required", () => {
  const result = execute("id: drift", {}, report("inconsistentSectionCaches"));
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.output, /files=README.md/);
  assert.notEqual(execute("id: drift", { CHECKOUT_SHA: previous }).status, 0);
});

for (const bucket of ["staleTargets", "inconsistentSectionCaches"]) {
  test(`${bucket} prevents publication even when global ok is true`, () => {
    const result = execute("- name: Check the refreshed mirrors", {}, report(bucket));
    assert.equal(result.status, 1);
    assert.match(result.summary, /no PR opened/);
    assert.match(result.summary, new RegExp(bucket));
  });
}

test("translation failure preserves exit and a failure summary under Bash -e", () => {
  const result = execute("id: translate", { TRANSLATE_RC: "7" });
  assert.equal(result.status, 7);
  assert.match(result.summary, /Translation failed \(exit 7\).*no PR opened/);
});

test("docs and checker process failures remain failures with a summary", () => {
  const docs = execute("- name: Check the refreshed mirrors", { NPM_RC: "7" });
  assert.equal(docs.status, 1);
  assert.match(docs.summary, /exits 7 0/);
  const checker = execute("- name: Check the refreshed mirrors", { CHECKER_RC: "7" });
  assert.equal(checker.status, 1);
  assert.match(checker.summary, /checker 7/);
});

test("new scheduled publication creates a draft with an empty-head lease", () => {
  const result = execute(publish);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(calls(result, "git", "push").length, 1);
  assert.ok(calls(result, "gh", "create")[0].args.includes("--draft"));
  assert.match(result.prBody, /Base health: UNKNOWN/);
  assert.match(result.prBody, /not proof of green/);
  assert.match(result.prBody, new RegExp(base));
  assert.match(result.prBody, new RegExp(candidate));
});

test("an already-draft owned PR updates without a redundant ready-state call", () => {
  const result = execute(publish, { REFRESH_SHA: previous, PR_ROWS: owned() });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(calls(result, "gh", "ready").length, 0);
  assert.equal(calls(result, "gh", "edit").length, 1);
  assert.equal(calls(result, "gh", "create").length, 0);
});

test("a ready owned PR becomes a draft before its head changes", () => {
  const result = execute(publish, { REFRESH_SHA: previous, PR_ROWS: owned("OPEN", false) });
  assert.equal(result.status, 0, result.stderr);
  const ready = result.calls.findIndex((call) => call.tool === "gh" && call.args.includes("ready"));
  const push = result.calls.findIndex((call) => call.tool === "git" && call.args.includes("push"));
  assert.ok(ready >= 0 && ready < push);
});

test("a closed owned PR permits the next scheduled draft", () => {
  const result = execute(publish, { REFRESH_SHA: previous, PR_ROWS: owned("MERGED", false) });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(calls(result, "gh", "create").length, 1);
});

for (const [name, values] of [
  ["new freeze", { FREEZES: "1\trelease-freeze: v3.8.53 in progress" }],
  ["freeze query error", { FREEZE_RC: "42" }],
  ["moved base", { REMOTE_BASE_SHA: previous }],
  ["moved checkout", { CHECKOUT_SHA: previous }],
  ["unknown branch owner", { REFRESH_SHA: previous }],
  ["unowned open PR", { REFRESH_SHA: previous, PR_ROWS: owned().replace(marker, "unrelated PR") }],
  [
    "fork head with the same marker and OID",
    { REFRESH_SHA: previous, PR_ROWS: owned().replace("example/repo", "contributor/fork") },
  ],
  ["unavailable incident index", { BASE_RED_RC: "42" }],
  ["out-of-scope staged file", { CHANGED_PATH: "src/unsafe.ts" }],
]) {
  test(`${name} stops before push or PR mutation`, () => {
    const result = execute(publish, values);
    assert.notEqual(result.status, 0);
    assert.equal(calls(result, "git", "push").length, 0);
    for (const command of ["create", "edit", "ready"])
      assert.equal(calls(result, "gh", command).length, 0);
  });
}

test("a rejected head lease cannot create or update a PR", () => {
  const result = execute(publish, { PUSH_RC: "1" });
  assert.equal(result.status, 1);
  assert.equal(calls(result, "gh", "create").length, 0);
  assert.equal(calls(result, "gh", "edit").length, 0);
});

test("post-hook stale state blocks the committed candidate", () => {
  const result = execute(publish, {}, report("staleTargets"));
  assert.equal(result.status, 1);
  assert.equal(calls(result, "git", "push").length, 0);
});

test("protected mirrors and incident numbers are visible without inherited or green claims", () => {
  const result = execute(publish, {
    CHANGED_PATH: "docs/i18n/ja/AGENTS.md",
    BASE_REDS: "55\t🔴 Release branch not green: release/v3.8.53",
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.prBody, /protected_surface: true/);
  assert.match(result.prBody, /incident index: #55/);
  assert.match(result.prBody, /specific owner approval/);
  assert.doesNotMatch(result.prBody, /base-red inherited/);
});

test("Git enforces empty and stale head leases against a local bare remote", () => {
  const temporary = mkdtempSync(path.join(tmpdir(), "i18n-refresh-lease-"));
  const remote = path.join(temporary, "remote.git");
  const checkout = path.join(temporary, "checkout");
  const ref = "refs/heads/chore/i18n-mirror-refresh";
  const env = {
    PATH: "/usr/bin:/bin",
    LANG: "C.UTF-8",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: "/dev/null",
  };
  const git = (args, cwd = temporary) => spawnSync("git", args, { cwd, env, encoding: "utf8" });
  const ok = (args, cwd) => {
    const result = git(args, cwd);
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  };
  try {
    ok(["init", "--bare", "--initial-branch=main", remote]);
    ok(["init", "--initial-branch=main", checkout]);
    ok(["remote", "add", "origin", remote], checkout);
    const commit = (text) => {
      writeFileSync(path.join(checkout, "fixture.txt"), text);
      ok(["add", "fixture.txt"], checkout);
      ok(
        [
          "-c",
          "user.name=Fixture",
          "-c",
          "user.email=fixture@example.invalid",
          "commit",
          "-m",
          "test: lease fixture",
        ],
        checkout
      );
      return ok(["rev-parse", "HEAD"], checkout);
    };
    const first = commit("first\n");
    ok(["push", `--force-with-lease=${ref}:`, "origin", `HEAD:${ref}`], checkout);
    const second = commit("second\n");
    ok(["push", `--force-with-lease=${ref}:${first}`, "origin", `HEAD:${ref}`], checkout);
    commit("third\n");
    assert.notEqual(
      git(["push", `--force-with-lease=${ref}:${first}`, "origin", `HEAD:${ref}`], checkout).status,
      0
    );
    assert.notEqual(
      git(["push", `--force-with-lease=${ref}:`, "origin", `HEAD:${ref}`], checkout).status,
      0
    );
    assert.equal(ok(["rev-parse", ref], remote), second);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
