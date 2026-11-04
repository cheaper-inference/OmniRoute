import assert from "node:assert/strict";
import fs from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { load } from "js-yaml";
import { ensureStandaloneInput } from "../../../scripts/build/standaloneInput.mjs";

test("CI package consumer rejects BUILD_ID without standalone before invoking Next", (t) => {
  const root = fs.mkdtempSync(join(tmpdir(), "ci-prebuilt-consumer-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const nextDir = join(root, ".build", "next");
  fs.mkdirSync(nextDir, { recursive: true });
  fs.writeFileSync(join(nextDir, "BUILD_ID"), "synthetic-id\n");
  const workflow = load(
    fs.readFileSync(new URL("../../../.github/workflows/ci.yml", import.meta.url), "utf8")
  );
  const consumers = workflow.jobs["package-artifact"].steps.filter(
    (step) => step.run === "npm run build:cli"
  );
  assert.equal(consumers.length, 1);
  assert.equal(consumers[0].env?.OMNIROUTE_REQUIRE_PREBUILT_NEXT, "1");
  let builds = 0;
  assert.throws(
    () =>
      ensureStandaloneInput({
        serverPath: join(nextDir, "standalone", "server.js"),
        requirePrebuilt: consumers[0].env.OMNIROUTE_REQUIRE_PREBUILT_NEXT === "1",
        build: () => builds++,
      }),
    /PREBUILT_NEXT_REQUIRED/
  );
  assert.equal(builds, 0);
  const producers = workflow.jobs.build.steps.filter((step) => step.run === "npm run build");
  assert.equal(producers.length, 1);
  assert.equal(producers[0].env?.OMNIROUTE_REQUIRE_PREBUILT_NEXT, undefined);
});
