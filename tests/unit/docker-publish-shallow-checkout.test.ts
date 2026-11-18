/**
 * docker-publish checks out shallow. On 2026-11-03 the full clone (`fetch-depth: 0`, a 2.6 GB
 * pack) ran 30+ min in `prepare` on a Blacksmith runner, outside GitHub's network. The image
 * build never reads history (.dockerignore drops .git), and the :latest decision only needs tag
 * names, which `prepare` now reads with `git ls-remote`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
type Step = { name?: string; uses?: string; run?: string; with?: Record<string, unknown> };
const workflow = load(
  fs.readFileSync(path.join(repoRoot, ".github/workflows/docker-publish.yml"), "utf8")
) as { jobs: Record<string, { steps?: Step[] }> };

test("no docker-publish checkout clones the full history", () => {
  const deep: string[] = [];
  for (const [job, def] of Object.entries(workflow.jobs)) {
    for (const step of def.steps ?? []) {
      if (!step.uses?.startsWith("actions/checkout@")) continue;
      if (Number(step.with?.["fetch-depth"] ?? 1) !== 1) deep.push(job);
    }
  }
  assert.deepEqual(deep, []);
});

test("the :latest decision lists remote tags and keeps only v<digit> names", () => {
  const step = workflow.jobs.prepare.steps!.find((s) => s.run?.includes("should-promote-latest"));
  const script = step!.run!;
  assert.match(script, /git ls-remote --tags --refs origin/);
  assert.doesNotMatch(script, /git tag -l/, "a shallow clone has no local tag list");
  assert.doesNotMatch(script, /ls-remote[^\n]*\|\|\s*true/, "a failed listing must fail the step");

  const expression = script.match(/sed -n '([^']+)'/)![1];
  const lsRemote = [
    "1111111111111111111111111111111111111111\trefs/tags/v3.8.52",
    "2222222222222222222222222222222222222222\trefs/tags/v3.8.53-rc.1",
    "3333333333333333333333333333333333333333\trefs/tags/release-notes",
    "4444444444444444444444444444444444444444\trefs/tags/v0.2.21",
  ].join("\n");
  const names = execFileSync("sed", ["-n", expression], { input: lsRemote, encoding: "utf8" });
  assert.deepEqual(names.trim().split("\n"), ["v3.8.52", "v3.8.53-rc.1", "v0.2.21"]);
});
