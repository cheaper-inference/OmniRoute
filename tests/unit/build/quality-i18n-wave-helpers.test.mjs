import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const helperTest = process.platform === "linux" ? test : test.skip;

const templates = fileURLToPath(
  new URL("../../../config/quality/skill-templates/i18n-waves/scripts/", import.meta.url)
);

const tool = `#!${process.execPath}
const fs = require("node:fs");
const path = require("node:path");
const cp = require("node:child_process");
const name = path.basename(process.argv[1]);
const args = process.argv.slice(2);
fs.appendFileSync(process.env.MOCK_ACTIONS, name + "\\n");
if (name === "pgrep") process.exit(1);
if (name === "git") {
  if (args.includes("--show-current") || args.includes("--abbrev-ref")) console.log("docs/helper-test");
  else if (args[0] === "rev-parse") console.log("1".repeat(40));
  else if (args[0] === "branch" && args.includes("-r")) console.log("origin/release/v1.0.0");
  process.exit(0);
}
if (name === "node") {
  if (args[0] === "-e") {
    const r = cp.spawnSync(process.env.MOCK_REAL_NODE, args, { env: process.env, stdio: "inherit" });
    process.exit(r.status === null ? 2 : r.status);
  }
  if (args[0].endsWith("check-translation-drift.mjs")) {
    const item = { rel: "README.md", locale: "xx" };
    console.log(JSON.stringify({ ok: true, checkedSources: 1, driftedSources: [], missingTargets: [],
      driftedTargets: process.env.MOCK_DRIFT === "target" ? [item] : [], staleTargets: [],
      inconsistentSectionCaches: process.env.MOCK_DRIFT === "cache" ? [item] : [] }));
    process.exit(0);
  }
  if (args[0].endsWith("run-translation.mjs")) {
    console.log("[i18n-run] summary: translated=1, skipped=0, failed=0");
    process.exit(0);
  }
  process.exit(2);
}
if (name === "curl") { process.stdout.write("200"); process.exit(0); }
if (["gh", "npm", "npx", "sleep"].includes(name)) process.exit(0);
process.exit(2);
`;

function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-wave-contract-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  writeFileSync(join(dir, "package.json"), '{"type":"commonjs"}\n');
  const root = join(dir, "repo");
  const kit = join(dir, "kit");
  const bin = join(dir, "bin");
  const wt = join(root, ".claude/worktrees/helper-test");
  for (const path of [root, kit, bin, wt, join(wt, "docs/i18n/xx"), join(root, "scripts/dev")]) {
    mkdirSync(path, { recursive: true });
  }
  writeFileSync(join(wt, "README.md"), "reviewed source\n");
  for (const name of ["bootstrap.sh", "wave.sh"]) {
    let source = readFileSync(join(templates, name), "utf8");
    if (name === "bootstrap.sh") {
      const fixedRoot = "ROOT=/home/diegosouzapw/dev/proxys/OmniRoute";
      assert.equal(source.split(fixedRoot).length, 2, "only the fixture root binding changes");
    }
    // Older wave revisions contain an absolute dotenv fallback. Relocate every
    // old checkout path before testing a preimage; no original binding is retained.
    const originalRoot = "/home/diegosouzapw/dev/proxys/OmniRoute";
    const rootMarker = "__SYNTHETIC_I18N_HELPER_ROOT__";
    assert.equal(source.includes(rootMarker), false);
    source = source.replaceAll(originalRoot, rootMarker);
    assert.equal(source.includes(originalRoot), false);
    source = source.replaceAll(rootMarker, root);
    if (name === "bootstrap.sh") {
      source = source.replace(`ROOT=${root}`, `ROOT='${root.replaceAll("'", "'\\''")}'`);
    }
    // A private TMPDIR may itself live under the checkout. Prove relocation
    // before substituting it, instead of rejecting that legitimate prefix.
    assert.equal(source.includes(rootMarker), false);
    writeFileSync(join(kit, name), source);
  }
  for (const name of ["git", "gh", "node", "npm", "npx", "curl", "pgrep", "sleep"]) {
    writeFileSync(join(bin, name), tool, { mode: 0o700 });
  }
  for (const name of ["audit_all.py", "audit_spans.py"]) {
    writeFileSync(join(kit, name), 'print("synthetic audit")\n');
  }
  writeFileSync(
    join(kit, "readopt_targets.py"),
    'import os\nfrom pathlib import Path\nPath(os.environ["MOCK_READOPT_MARKER"]).write_text("executed")\n'
  );
  writeFileSync(
    join(root, "scripts/dev/new-worktree.sh"),
    '#!/bin/bash\nmkdir -p "$MOCK_WT/docs/i18n/xx"\nexit "${MOCK_NEW_WORKTREE_EXIT:-0}"\n'
  );
  const dotenv = join(dir, "untrusted.env");
  writeFileSync(
    dotenv,
    'touch "$MOCK_DOTENV_MARKER"\nOMNIROUTE_TRANSLATION_API_URL=http://mock.invalid\nOMNIROUTE_TRANSLATION_API_KEY=synthetic-key\nOMNIROUTE_TRANSLATION_MODEL=synthetic-model\n'
  );
  const env = {
    PATH: `${bin}:/usr/bin:/bin`,
    LANG: "C.UTF-8",
    TZ: "UTC",
    I18N_OUT: join(dir, "output"),
    FILES: "README.md",
    MOCK_ACTIONS: join(dir, "actions.txt"),
    MOCK_REAL_NODE: process.execPath,
    MOCK_WT: wt,
    MOCK_DOTENV_MARKER: join(dir, "dotenv-executed"),
    MOCK_READOPT_MARKER: join(dir, "adoption-executed"),
    OMNIROUTE_TRANSLATION_API_URL: "http://mock.invalid",
    OMNIROUTE_TRANSLATION_API_KEY: "synthetic-key",
    OMNIROUTE_TRANSLATION_MODEL: "synthetic-model",
  };
  const run = (name, args, overrides = {}) =>
    spawnSync("/bin/bash", [join(kit, name), ...args], {
      cwd: root,
      env: { ...env, ...overrides },
      encoding: "utf8",
      timeout: 15000,
    });
  const actions = () =>
    existsSync(env.MOCK_ACTIONS) ? readFileSync(env.MOCK_ACTIONS, "utf8").split("\n") : [];
  return { dir, root, kit, wt, env, dotenv, run, actions };
}

helperTest("bootstrap rejects a missing reviewed base before preparation or probing", (t) => {
  const f = fixture(t);
  const r = f.run("bootstrap.sh", ["docs/helper-test"]);
  assert.equal(r.status, 2, r.stderr);
  assert.deepEqual(f.actions(), []);
});

helperTest(
  "bootstrap requires inherited credentials and never falls back to a dotenv file",
  (t) => {
    const f = fixture(t);
    const r = f.run("bootstrap.sh", ["docs/helper-test", "release/v1.0.0"], {
      OMNIROUTE_TRANSLATION_API_KEY: "",
      I18N_ENV: f.dotenv,
    });
    assert.equal(r.status, 2, r.stderr);
    assert.equal(existsSync(f.env.MOCK_DOTENV_MARKER), false);
    assert.equal(f.actions().includes("curl"), false);
  }
);

helperTest(
  "bootstrap accepts an authorized inherited environment without executing supplied files",
  (t) => {
    const f = fixture(t);
    const r = f.run("bootstrap.sh", ["docs/helper-test", "release/v1.0.0"], { I18N_ENV: f.dotenv });
    assert.equal(r.status, 0, r.stderr);
    assert.equal(f.actions().includes("curl"), true);
    assert.equal(existsSync(f.env.MOCK_DOTENV_MARKER), false);
  }
);

helperTest("bootstrap propagates worktree preparation failure before probing", (t) => {
  const f = fixture(t);
  rmSync(f.wt, { recursive: true });
  const r = f.run("bootstrap.sh", ["docs/helper-test", "release/v1.0.0"], {
    I18N_ENV: f.dotenv,
    MOCK_NEW_WORKTREE_EXIT: "1",
  });
  assert.equal(r.status, 2, r.stderr);
  assert.equal(f.actions().includes("curl"), false);
});

helperTest("wave accepts an inherited LLM environment without requiring dotenv", (t) => {
  const f = fixture(t);
  const r = f.run("wave.sh", [f.wt, "inherited"]);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(f.actions().includes("curl"), true);
  assert.equal(existsSync(f.env.MOCK_READOPT_MARKER), false);
});

helperTest("wave never executes an arbitrary I18N_ENV file", (t) => {
  const f = fixture(t);
  const r = f.run("wave.sh", [f.wt, "untrusted-file"], { I18N_ENV: f.dotenv });
  assert.equal(r.status, 0, r.stderr);
  assert.equal(existsSync(f.env.MOCK_DOTENV_MARKER), false);
  assert.equal(existsSync(f.env.MOCK_READOPT_MARKER), false);
});

helperTest("wave does not replace missing inherited credentials with another engine", (t) => {
  const f = fixture(t);
  const r = f.run("wave.sh", [f.wt, "missing-env"], {
    I18N_ENV: f.dotenv,
    OMNIROUTE_TRANSLATION_API_KEY: "",
  });
  assert.equal(r.status, 2, r.stderr);
  assert.equal(existsSync(f.env.MOCK_DOTENV_MARKER), false);
  assert.equal(f.actions().includes("curl"), false);
});

for (const drift of ["target", "cache"]) {
  helperTest(`wave leaves ${drift} drift visible without automatically adopting hashes`, (t) => {
    const f = fixture(t);
    const r = f.run("wave.sh", [f.wt, `drift-${drift}`], { I18N_ENV: f.dotenv, MOCK_DRIFT: drift });
    assert.equal(r.status, 1, r.stderr);
    assert.equal(existsSync(f.env.MOCK_READOPT_MARKER), false);
  });
}

helperTest("wave rejects a selected engine absent from the candidate", (t) => {
  const f = fixture(t);
  const r = f.run("wave.sh", [f.wt, "missing-google"], {
    I18N_ENV: f.dotenv,
    OMNIROUTE_TRANSLATION_ENGINE: "google",
  });
  assert.equal(r.status, 2, r.stderr);
});

helperTest("wave preserves an explicitly selected supported Google engine", (t) => {
  const f = fixture(t);
  mkdirSync(join(f.wt, "scripts/i18n/lib"), { recursive: true });
  writeFileSync(
    join(f.wt, "scripts/i18n/lib/google-translate.mjs"),
    "// synthetic presence only\n"
  );
  const r = f.run("wave.sh", [f.wt, "selected-google"], {
    OMNIROUTE_TRANSLATION_ENGINE: "google",
    OMNIROUTE_TRANSLATION_API_KEY: "",
  });
  assert.equal(r.status, 0, r.stderr);
  assert.equal(f.actions().includes("curl"), false);
  assert.equal(existsSync(f.env.MOCK_READOPT_MARKER), false);
});
