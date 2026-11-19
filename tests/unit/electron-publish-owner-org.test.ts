/**
 * The desktop app's auto-update feed: electron-builder writes `build.publish` into the
 * app-update.yml of every installer, and electron-updater reads the GitHub releases of that
 * owner/repo. The repository moved to the cheaper-inference organization on 2026-10-21, so new
 * builds point there. Installs made before this change keep `diegosouzapw/OmniRoute` and still
 * update through GitHub's rename redirect, which only holds while no repository with the old
 * name exists again.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("electron-builder publishes and auto-updates from cheaper-inference/OmniRoute", () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, "electron/package.json"), "utf8"));
  assert.deepEqual(pkg.build.publish, {
    provider: "github",
    owner: "cheaper-inference",
    repo: "OmniRoute",
  });
});
