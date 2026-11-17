// The OpenCode plugins are published by npm-publish.yml, which bumps a plugin's patch version
// when its folder changed since the previous release tag. The bump step runs with
// `working-directory: @omniroute/<plugin>`, and git resolves a pathspec against the current
// directory: `git diff <tag> -- "@omniroute/<plugin>/"` looked for
// @omniroute/<plugin>/@omniroute/<plugin>/, always found nothing, and every release logged
// "No plugin changes since <tag> — nothing to publish". @omniroute/opencode-plugin-v2 changed
// 18 files between v3.8.52 and v3.8.53 and stayed at 0.1.0 on npm.
//
// This test runs the real step script from the workflow inside a throwaway git repository.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import YAML from "yaml";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const workflow = YAML.parse(readFileSync(join(root, ".github/workflows/npm-publish.yml"), "utf8"));

const PLUGIN_JOBS = {
  "publish-opencode-plugin": "@omniroute/opencode-plugin",
  "publish-opencode-plugin-v2": "@omniroute/opencode-plugin-v2",
};

function bumpStep(jobName) {
  const step = workflow.jobs[jobName].steps.find((s) => s.id === "bump");
  assert.ok(step, `${jobName} has a step with id "bump"`);
  return step;
}

function git(cwd, ...args) {
  const res = spawnSync("git", args, { cwd, encoding: "utf8" });
  assert.equal(res.status, 0, `git ${args.join(" ")}: ${res.stderr}`);
  return res.stdout;
}

/**
 * Builds a repo with tags v1.0.0 (previous release) and v1.0.1 (current), where the plugin
 * folder changed between them only when `pluginChanged` is true, then runs the bump step in
 * the plugin folder with a fake `npm` whose registry holds `published` (the manifest's own
 * 0.1.0 by default, so the step has something to bump past).
 */
function runBump(jobName, { pluginChanged, published = ["0.1.0"] }) {
  const pkgDir = PLUGIN_JOBS[jobName];
  const dir = mkdtempSync(join(tmpdir(), "npm-plugin-bump-"));
  try {
    const repo = join(dir, "repo");
    const bin = join(dir, "bin");
    mkdirSync(join(repo, pkgDir), { recursive: true });
    mkdirSync(bin);
    git(repo, "init", "-q");
    git(repo, "config", "user.email", "test@example.com");
    git(repo, "config", "user.name", "test");
    git(repo, "config", "commit.gpgsign", "false");
    writeFileSync(
      join(repo, pkgDir, "package.json"),
      `${JSON.stringify({ name: pkgDir, version: "0.1.0" }, null, 2)}\n`
    );
    writeFileSync(join(repo, pkgDir, "index.js"), "export const v = 1;\n");
    writeFileSync(join(repo, "README.md"), "root\n");
    git(repo, "add", "-A");
    git(repo, "commit", "-q", "-m", "previous release");
    git(repo, "tag", "v1.0.0");
    if (pluginChanged) {
      writeFileSync(join(repo, pkgDir, "index.js"), "export const v = 2;\n");
    } else {
      writeFileSync(join(repo, "README.md"), "root changed, plugin untouched\n");
    }
    git(repo, "add", "-A");
    git(repo, "commit", "-q", "-m", "current release");
    git(repo, "tag", "v1.0.1");

    // Fake npm: `npm view <name>@<v> version` prints <v> only when it is in PUBLISHED_VERSIONS
    // (an unpublished version prints nothing, like the real `npm view ... || true`);
    // `npm version patch` bumps the patch in package.json.
    const fakeNpm = join(bin, "npm");
    writeFileSync(
      fakeNpm,
      [
        "#!/usr/bin/env node",
        'const fs = require("node:fs");',
        "const [cmd, spec] = process.argv.slice(2);",
        'if (cmd === "view") {',
        '  const v = spec.slice(spec.lastIndexOf("@") + 1);',
        '  if (process.env.PUBLISHED_VERSIONS.split(",").includes(v)) { console.log(v); process.exit(0); }',
        "  process.exit(1);",
        "}",
        'if (cmd === "version") {',
        '  const p = JSON.parse(fs.readFileSync("package.json", "utf8"));',
        '  const [a, b, c] = p.version.split(".").map(Number);',
        "  p.version = `${a}.${b}.${c + 1}`;",
        '  fs.writeFileSync("package.json", JSON.stringify(p, null, 2) + "\\n");',
        "  process.exit(0);",
        "}",
        "process.exit(1);",
      ].join("\n")
    );
    chmodSync(fakeNpm, 0o755);

    const step = bumpStep(jobName);
    const output = join(dir, "github_output");
    writeFileSync(output, "");
    const res = spawnSync("bash", ["-e", "-c", step.run], {
      cwd: join(repo, step["working-directory"]),
      encoding: "utf8",
      env: {
        PATH: `${bin}:${process.env.PATH}`,
        HOME: dir,
        GITHUB_OUTPUT: output,
        CURRENT_TAG: "v1.0.1",
        PUBLISHED_VERSIONS: published.join(","),
      },
    });
    assert.equal(res.status, 0, `bump step failed: ${res.stdout}\n${res.stderr}`);
    const version = JSON.parse(readFileSync(join(repo, pkgDir, "package.json"), "utf8")).version;
    return { stdout: res.stdout, output: readFileSync(output, "utf8"), version };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

for (const [jobName, pkgDir] of Object.entries(PLUGIN_JOBS)) {
  test(`${jobName}: bump step runs inside ${pkgDir}`, () => {
    assert.equal(bumpStep(jobName)["working-directory"], pkgDir);
  });

  test(`${jobName}: a change in the plugin folder since the previous tag bumps the patch version`, () => {
    const result = runBump(jobName, { pluginChanged: true });
    assert.match(result.output, /^bumped=true$/m, result.stdout);
    assert.equal(result.version, "0.1.1");
  });

  // The bump lives only in the job workspace, so the committed manifest stays at 0.1.0 while
  // npm already has the 0.1.1 an earlier release published: the next release with plugin
  // changes must land on 0.1.2, not recompute 0.1.1 and have the publish step skip it.
  test(`${jobName}: the bump moves past versions an earlier release already published`, () => {
    const result = runBump(jobName, { pluginChanged: true, published: ["0.1.0", "0.1.1"] });
    assert.match(result.output, /^bumped=true$/m, result.stdout);
    assert.equal(result.version, "0.1.2");
    const far = runBump(jobName, {
      pluginChanged: true,
      published: ["0.1.0", "0.1.1", "0.1.2", "0.1.3"],
    });
    assert.equal(far.version, "0.1.4");
  });

  test(`${jobName}: a manifest version not yet on npm is published as is`, () => {
    const result = runBump(jobName, { pluginChanged: true, published: [] });
    assert.match(result.output, /^bumped=false$/m, result.stdout);
    assert.equal(result.version, "0.1.0");
  });

  test(`${jobName}: a release that leaves the plugin folder untouched does not bump`, () => {
    const result = runBump(jobName, { pluginChanged: false });
    assert.match(result.output, /^bumped=false$/m, result.stdout);
    assert.equal(result.version, "0.1.0");
  });
}
