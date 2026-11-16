import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const WORKFLOWS = path.join(process.cwd(), ".github/workflows");
const read = (name: string) => fs.readFileSync(path.join(WORKFLOWS, name), "utf8");

test("deploy-vps trusts a workflow_run only from this repository, event and ref", () => {
  const source = read("deploy-vps.yml");
  assert.match(source, /workflow_run\.head_repository\.id == github\.event\.repository\.id/);
  assert.match(source, /fromJSON\('\["push","release","workflow_dispatch"\]'\)/);
  assert.match(source, /workflow_run\.head_branch == 'main'/);
  assert.match(source, /startsWith\(github\.event\.workflow_run\.head_branch, 'release\/v'\)/);
});

test("the Semgrep container is pinned to a digest", () => {
  assert.match(read("semgrep.yml"), /image: semgrep\/semgrep@sha256:[0-9a-f]{64}\b/);
});

for (const name of [
  "electron-release.yml",
  "npm-publish.yml",
  "opencode-plugin-ci.yml",
  "opencode-provider-ci.yml",
]) {
  test(`${name} never restores a package-manager cache`, () => {
    const source = read(name);
    assert.doesNotMatch(source, /^\s*cache: npm\s*$/m);
    const steps = source.match(/uses: actions\/setup-node@/g) ?? [];
    const disabled = source.match(/^\s*package-manager-cache: false\s*$/gm) ?? [];
    assert.ok(steps.length > 0, "the workflow still sets up Node");
    assert.equal(disabled.length, steps.length, "every setup-node step disables the cache");
  });
}
