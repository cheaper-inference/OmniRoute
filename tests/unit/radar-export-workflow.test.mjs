import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

const WORKFLOW = load(
  readFileSync(new URL("../../.github/workflows/radar-export.yml", import.meta.url), "utf8")
);
const SELECTOR = new URL("../../scripts/release/radar-export-target.mjs", import.meta.url);
const SCHEDULE_GUARD =
  "github.event_name != 'schedule' || github.repository == 'cheaper-inference/OmniRoute'";
const TARGET = "${{ needs.resolve-target.outputs.target }}";
const REMOTE_HEADS = [
  `${"a".repeat(40)}\trefs/heads/release/v3.8.55`,
  `${"b".repeat(40)}\trefs/heads/release/v3.9.0-rc`,
  `${"c".repeat(40)}\trefs/heads/release/v3.8.9`,
];

test("radar export chooses the highest stable release numerically", async () => {
  const { pickHighestReleaseBranch } = await import(SELECTOR.href);
  assert.equal(
    pickHighestReleaseBranch([
      "release/v3.8.9",
      "release/v3.8.55",
      "release/v3.8.54",
      "release/v3.9.0-rc",
      "main",
    ]),
    "release/v3.8.55"
  );
  assert.equal(pickHighestReleaseBranch(["release/v3.9.0", "release/v3.10.0"]), "release/v3.10.0");
  assert.equal(pickHighestReleaseBranch(REMOTE_HEADS), "release/v3.8.55");
  assert.equal(pickHighestReleaseBranch([]), null);
});

test("radar export target CLI reads remote heads from stdin and fails without a stable release", () => {
  const run = (refs) =>
    spawnSync(process.execPath, [fileURLToPath(SELECTOR)], {
      input: `${refs.join("\n")}\n`,
      encoding: "utf8",
    });

  const selected = run(REMOTE_HEADS);
  assert.equal(selected.status, 0, selected.stderr);
  assert.equal(selected.stdout.trim(), "release/v3.8.55");

  const noStable = run([REMOTE_HEADS[1]]);
  assert.equal(typeof noStable.status, "number");
  assert.notEqual(noStable.status, 0);
  assert.equal(noStable.stdout, "");
});

test("radar export triggers on retired rows and evidence and shares concurrency across refs", () => {
  assert.ok(WORKFLOW.on.push.paths.includes("open-sse/config/freeModelCatalog.retired.data.ts"));
  assert.ok(WORKFLOW.on.push.paths.includes("config/quality/free-catalog-evidence.json"));
  assert.ok(Object.hasOwn(WORKFLOW.on, "workflow_dispatch"));
  assert.ok(WORKFLOW.on.schedule.length > 0);
  assert.equal(WORKFLOW.concurrency.group, "radar-export");
  assert.equal(WORKFLOW.concurrency["cancel-in-progress"], false);
});

test("radar export resolves its target with the selector from a credential-free sparse checkout", () => {
  const resolve = WORKFLOW.jobs["resolve-target"];
  assert.ok(resolve, "resolve-target job");
  assert.ok(resolve.if.includes(SCHEDULE_GUARD));
  const checkout = resolve.steps.find(({ uses }) => uses?.startsWith("actions/checkout@"));
  assert.equal(checkout.with["sparse-checkout"].trim(), "scripts/release/radar-export-target.mjs");
  assert.equal(checkout.with["sparse-checkout-cone-mode"], false);
  assert.equal(checkout.with["persist-credentials"], false);

  const selector = resolve.steps.find(({ run }) => run?.includes("git ls-remote"));
  assert.match(
    selector.run,
    /git ls-remote --heads "https:\/\/github\.com\/\$GITHUB_REPOSITORY" 'refs\/heads\/release\/v\*'\s*\|\s*node scripts\/release\/radar-export-target\.mjs/
  );
  assert.match(selector.run, /target=.+>> "\$GITHUB_OUTPUT"/);
  assert.equal(resolve.outputs.target, `\${{ steps.${selector.id}.outputs.target }}`);
});

test("radar export publishes the resolved release with provenance from that checkout", () => {
  const publish = WORKFLOW.jobs["publish-export"];
  assert.equal(publish.needs, "resolve-target");
  const condition = publish.if.replace(/\s+/g, " ");
  assert.ok(condition.includes(`(${SCHEDULE_GUARD})`));
  assert.ok(
    condition.includes(
      "&& (github.event_name != 'push' || github.ref_name == needs.resolve-target.outputs.target)"
    )
  );

  const checkout = publish.steps.find(({ uses }) => uses?.startsWith("actions/checkout@"));
  assert.equal(checkout.with.ref, TARGET);
  const generate = publish.steps.find(({ run }) =>
    run?.includes("scripts/release/radar-export.mjs")
  );
  assert.equal(generate.env.RADAR_EXPORT_SOURCE_REF, TARGET);
  assert.match(generate.run, /RADAR_EXPORT_SOURCE_SHA=.*\$\(git rev-parse HEAD\)/);
});
