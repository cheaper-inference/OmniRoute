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
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { load } from "js-yaml";

const root = fileURLToPath(new URL("../../", import.meta.url));
const workflow = load(
  readFileSync(join(root, ".github/workflows/ui-kit-upstream-watch.yml"), "utf8")
);
const tracking = workflow.jobs.watch.steps.find(
  (step) => step.name === "Open, update or close the tracking issue"
);

function fixture(t, base) {
  const temporary = mkdtempSync(join(tmpdir(), "ui-kit-guidance-"));
  t.after(() =>
    rmSync(temporary, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
  );
  const main = join(temporary, "main");
  const bin = join(temporary, "scripts/ad-hoc/bin");
  const log = join(temporary, "calls.jsonl");
  const body = join(temporary, "published-body.md");
  mkdirSync(main);
  mkdirSync(bin, { recursive: true });
  writeFileSync(log, "");
  const write = (name, source, executable = false) => {
    const filename = join(main, name);
    mkdirSync(dirname(filename), { recursive: true });
    writeFileSync(filename, source);
    if (executable) chmodSync(filename, 0o755);
  };
  write("packages/ui-kit/fixture.txt", "main snapshot\n");
  write(
    "ui-kit-upstream.json",
    JSON.stringify({ pinned: { version: "0.0.1" }, latest: { version: "0.0.2" } })
  );
  const prelude = `#!${process.execPath}\nconst fs = require("node:fs");\nconst path = require("node:path");\nconst args = process.argv.slice(2);\nconst log = (extra) => fs.appendFileSync(process.env.FIXTURE_LOG, JSON.stringify({ cwd: process.cwd(), args, ...extra }) + "\\n");\n`;
  write(
    "scripts/dev/sync-ui-kit.sh",
    prelude +
      'log({ tool: "sync-ui-kit" });\nfs.mkdirSync("packages/ui-kit", { recursive: true });\nfs.writeFileSync("packages/ui-kit/fixture.txt", "updated kit\\n");\n',
    true
  );
  write(
    "scripts/dev/new-worktree.sh",
    prelude +
      [
        'log({ tool: "new-worktree" });',
        "if (args.length !== 2 || !args[0] || !args[1]) process.exit(91);",
        'const target = path.join(process.cwd(), ".claude/worktrees", args[0].split("/").at(-1));',
        'fs.mkdirSync(path.join(target, "scripts/dev"), { recursive: true });',
        'fs.copyFileSync("scripts/dev/sync-ui-kit.sh", path.join(target, "scripts/dev/sync-ui-kit.sh"));',
        'fs.chmodSync(path.join(target, "scripts/dev/sync-ui-kit.sh"), 0o755);',
      ].join("\n"),
    true
  );
  const stub =
    prelude +
    String.raw`
const tool = path.basename(process.argv[1]);
log({ tool });
if (tool === "git") process.exit(0);
if (tool === "jq") {
  fs.readFileSync(0, "utf8");
  if (process.env.FIXTURE_EXISTING) process.stdout.write(process.env.FIXTURE_EXISTING + "\n");
  process.exit(0);
}
if (tool === "gh") {
  if (args[0] === "issue" && args[1] === "list") { process.stdout.write("[]\n"); process.exit(0); }
  if (args[0] === "issue" && ["create", "edit", "close"].includes(args[1])) {
    if (args.includes("--body-file")) fs.copyFileSync(args[args.indexOf("--body-file") + 1], process.env.FIXTURE_BODY);
    process.exit(0);
  }
}
process.stderr.write("unexpected guidance fixture command\n"); process.exit(96);
`;
  for (const command of ["git", "gh", "jq"]) {
    const filename = join(bin, command);
    writeFileSync(filename, stub);
    chmodSync(filename, 0o755);
  }
  const env = {
    PATH: `${bin}:${dirname(process.execPath)}:/usr/bin:/bin`,
    LANG: "C.UTF-8",
    FIXTURE_LOG: log,
    FIXTURE_BODY: body,
    GITHUB_REPOSITORY: "example/fixture",
    GITHUB_SERVER_URL: "https://example.invalid",
    GITHUB_RUN_ID: "1",
    GH_TOKEN: "fixture-token",
    STATE: "behind",
    FROZEN: "false",
    BASE: base,
    DECISION: "branch-only",
    BRANCH: "chore/ui-kit-sync-latest",
    PR_URL: "",
  };
  const run = (script, overrides = {}) => {
    const result = spawnSync(
      "bash",
      ["--noprofile", "--norc", "-e", "-o", "pipefail", "-c", script],
      {
        cwd: main,
        env: { ...env, ...overrides },
        encoding: "utf8",
        timeout: 10000,
      }
    );
    assert.equal(result.error, undefined);
    assert.equal(result.signal, null);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    return result;
  };
  return {
    main,
    body,
    run,
    calls: () => readFileSync(log, "utf8").split("\n").filter(Boolean).map(JSON.parse),
  };
}

for (const base of ["release/v3.8.55", "release/v3.9.1"]) {
  test(`generated manual instructions preserve the main checkout and bind ${base}`, (t) => {
    const f = fixture(t, base);
    f.run(tracking.run);
    const body = readFileSync(f.body, "utf8");
    const snippet = body.match(/```(?:sh|bash)?\n([\s\S]*?)\n```/)?.[1];
    assert.equal(
      typeof snippet,
      "string",
      "the existing public message contains executable guidance"
    );
    f.run(snippet);
    assert.equal(
      readFileSync(join(f.main, "packages/ui-kit/fixture.txt"), "utf8"),
      "main snapshot\n",
      "manual guidance must preserve the main checkout"
    );
    const created = f.calls().filter((call) => call.tool === "new-worktree");
    const synced = f.calls().filter((call) => call.tool === "sync-ui-kit");
    assert.equal(created.length, 1);
    assert.equal(created[0].args[1], base, "the rendered target is an explicit helper argument");
    assert.match(created[0].args[0], /^(chore|fix)\/ui-kit-/);
    assert.equal(synced.length, 1);
    assert.equal(
      synced[0].cwd,
      join(f.main, ".claude/worktrees", created[0].args[0].split("/").at(-1))
    );
    assert.deepEqual(synced[0].args, ["latest"]);
  });
}

test("the existing tracking issue still closes when the pinned kit is current", (t) => {
  const f = fixture(t, "release/v3.8.55");
  f.run(tracking.run, { STATE: "up-to-date", FIXTURE_EXISTING: "12" });
  assert.equal(existsSync(f.body), false);
  const closed = f.calls().filter((call) => call.tool === "gh" && call.args[1] === "close");
  assert.equal(closed.length, 1);
  assert.equal(closed[0].args[2], "12");
  assert.equal(
    f.calls().filter((call) => call.tool === "new-worktree" || call.tool === "sync-ui-kit").length,
    0
  );
});
