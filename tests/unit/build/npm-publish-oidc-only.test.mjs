// npm publishing goes through Trusted Publishing (OIDC) only. The long-lived NPM_TOKEN expired
// in silence (npm caps write tokens at 90 days) and the v3.8.54 plugin publishes failed with
// E404 because the plugin jobs still sent it; the Trusted Publisher for both plugins was set up
// on 2026-11-18 and @omniroute/opencode-plugin@0.2.2 / -v2@0.1.1 shipped through OIDC. The
// only step left on a token is the DIRECT emergency fallback of `stage-npm`, which exists for
// the case where Trusted Publishing itself is broken and needs a freshly minted token.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import YAML from "yaml";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const workflow = YAML.parse(readFileSync(join(root, ".github/workflows/npm-publish.yml"), "utf8"));

const DIRECT_FALLBACK = "Publish to npm (DIRECT — emergency fallback)";

function stepsUsingNpmToken() {
  const found = [];
  for (const [jobName, job] of Object.entries(workflow.jobs)) {
    for (const step of job.steps || []) {
      if (JSON.stringify(step).includes("secrets.NPM_TOKEN"))
        found.push(`${jobName} → ${step.name}`);
    }
  }
  return found;
}

test("only the DIRECT emergency fallback still reads the NPM_TOKEN secret", () => {
  assert.deepEqual(stepsUsingNpmToken(), [`stage-npm → ${DIRECT_FALLBACK}`]);
});

for (const jobName of [
  "publish-opencode-plugin",
  "publish-opencode-plugin-v2",
  "publish-opencode-provider",
]) {
  test(`${jobName} publishes through OIDC: id-token write, no auth token on the publish step`, () => {
    const job = workflow.jobs[jobName];
    assert.equal(job.permissions["id-token"], "write");
    const publish = job.steps.find((s) => /^Publish @omniroute\//.test(s.name || ""));
    assert.ok(publish, `${jobName} has a publish step`);
    assert.equal(publish.env?.NODE_AUTH_TOKEN, undefined);
    assert.match(publish.run, /npm publish --provenance --access public/);
  });
}

test("stage-npm staged mode publishes through OIDC as well", () => {
  const job = workflow.jobs["stage-npm"];
  assert.equal(job.permissions["id-token"], "write");
  const staged = job.steps.find((s) => (s.name || "").startsWith("Publish to npm (staged"));
  assert.ok(staged, "stage-npm has the staged step");
  assert.equal(staged.env?.NODE_AUTH_TOKEN, undefined);
  assert.match(staged.run, /npm stage publish/);
});

// The reusable-workflow entry used to declare NPM_TOKEN as required and electron-release.yml
// forwarded it, so deleting the expired secret would fail the desktop release at startup.
// The default publish path is OIDC; only the dispatch-only DIRECT fallback reads the secret.
test("the reusable entry no longer requires NPM_TOKEN and electron-release no longer forwards it", () => {
  const call = workflow.on.workflow_call;
  assert.equal(call.secrets?.NPM_TOKEN, undefined);
  const electron = readFileSync(join(root, ".github/workflows/electron-release.yml"), "utf8");
  assert.doesNotMatch(electron, /secrets\.NPM_TOKEN/);
});
