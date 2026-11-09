import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { load } from "js-yaml";

for (const [file, job, installer] of [
  ["ci.yml", "quality-extended", "install-quality-scanners.sh"],
  ["quality.yml", "fast-gates", "install-workflow-scanners.sh"],
]) {
  test(`${file} requires the shared pinned scanner installer before auditing`, () => {
    const source = readFileSync(
      new URL(`../../.github/workflows/${file}`, import.meta.url),
      "utf8"
    );
    const workflow = load(source);
    const steps = workflow.jobs[job].steps;
    const setup = steps.findIndex((step) => step.run === `bash scripts/ci/${installer}`);
    assert.ok(setup >= 0);
    assert.notEqual(steps[setup]["continue-on-error"], true);
    assert.equal(steps[setup].env.GH_TOKEN, "${{ github.token }}");
    assert.ok(steps.slice(setup + 1).some((step) => /\bworkflows\b/.test(step.run || "")));
    assert.doesNotMatch(source, /download-actionlint\.bash|pipx install "zizmor/);
    if (installer === "install-quality-scanners.sh") {
      const wrapper = readFileSync(
        new URL("../../scripts/ci/install-quality-scanners.sh", import.meta.url),
        "utf8"
      );
      assert.match(wrapper, /set -euo pipefail/);
      const delegation = wrapper.indexOf('bash "$script_dir/install-workflow-scanners.sh"');
      assert.ok(delegation >= 0 && delegation < wrapper.indexOf("GITLEAKS_VERSION="));
      assert.doesNotMatch(wrapper, /\|\| true|set \+e/);
    }
  });
}

test("the shared installer pins release asset identity and validates before publishing PATH", () => {
  const source = readFileSync(
    new URL("../../scripts/ci/install-workflow-scanners.sh", import.meta.url),
    "utf8"
  );
  assert.match(source, /gh release download v1\.7\.12 --repo rhysd\/actionlint/);
  assert.match(source, /--pattern actionlint_1\.7\.12_linux_amd64\.tar\.gz/);
  assert.match(source, /8aca8db96f1b94770f1b0d72b6dddcb1ebb8123cb3712530b08cc387b349a3d8/);
  assert.match(source, /aa1facd105f0d83fe5c55b1adcd9d7417de5d83aa27471f91dc0b66cf3803577/);
  assert.ok(source.indexOf("sha256sum --check --strict") < source.indexOf("tar -xzf"));
  assert.ok(
    source.indexOf("Workflow scanner version mismatch") < source.indexOf('>> "$GITHUB_PATH"')
  );
});
