import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
  cpSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import * as yaml from "js-yaml";

const root = path.resolve(import.meta.dirname, "../../..");
type Step = { name?: string; uses?: string; run?: string; with?: { files?: string } };
const workflow = yaml.load(
  readFileSync(path.join(root, ".github/workflows/electron-release.yml"), "utf8")
) as {
  jobs: Record<string, { steps: Step[] }>;
};

test("Electron release collection preserves the generated browser-runtime pack", () => {
  const fixture = mkdtempSync(path.join(tmpdir(), "desktop-pack-delivery-"));
  try {
    mkdirSync(path.join(fixture, "electron/dist-electron"), { recursive: true });
    mkdirSync(path.join(fixture, ".build/optional-packs"), { recursive: true });
    writeFileSync(
      path.join(fixture, "electron/dist-electron/OmniRoute.AppImage"),
      "installer fixture"
    );
    writeFileSync(
      path.join(fixture, ".build/optional-packs/optional-pack-browser-runtime.tar.gz"),
      "pack fixture"
    );
    writeFileSync(path.join(fixture, "electron/dist-electron/omniroute.deb"), "deb fixture");
    writeFileSync(path.join(fixture, "electron/dist-electron/latest-linux.yml"), "updater fixture");
    const digest = createHash("sha256").update("pack fixture").digest("hex");
    const tarball = `optional-pack-browser-runtime-${digest}.tar.gz`;
    writeFileSync(path.join(fixture, ".build/optional-packs", tarball), "pack fixture");
    mkdirSync(path.join(fixture, ".build/electron-standalone"), { recursive: true });
    writeFileSync(
      path.join(fixture, ".build/electron-standalone/optional-packs.index.json"),
      JSON.stringify({ packs: [{ name: "browser-runtime", tarball, sha256: digest }] })
    );
    for (const file of [
      "scripts/release/collect-optional-packs.mjs",
      "scripts/packs/optionalPackManifest.mjs",
    ]) {
      mkdirSync(path.dirname(path.join(fixture, file)), { recursive: true });
      cpSync(path.join(root, file), path.join(fixture, file));
    }
    const collect = workflow.jobs.build.steps.find((s) => s.name === "Collect installers");
    assert.ok(collect?.run, "collection step exists");
    const script = collect.run
      .replaceAll("${{ matrix.ext }}", ".AppImage")
      .replaceAll("${{ matrix.platform }}", "linux");
    const result = spawnSync("bash", ["-e", "-c", script], {
      cwd: fixture,
      env: {
        PATH: process.env.PATH,
        LANG: "C.UTF-8",
        HOME: fixture,
        DATA_DIR: path.join(fixture, "data"),
      },
      encoding: "utf8",
      timeout: 10_000,
    });
    assert.equal(result.status, 0, result.stderr);
    const assets = readdirSync(path.join(fixture, "release-assets"));
    assert.ok(assets.includes("OmniRoute.AppImage"), "installer control collected");
    assert.equal(
      assets.includes("optional-pack-browser-runtime.tar.gz"),
      false,
      "unindexed archive is not published"
    );
    assert.ok(
      assets.some((name) => /^optional-pack-browser-runtime.*\.tar\.gz$/.test(name)),
      "generated browser-runtime pack must reach upload-artifact input"
    );
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test("Electron release attachment selection includes browser-runtime tarballs", () => {
  const release = workflow.jobs.release.steps.find((s) =>
    s.uses?.startsWith("softprops/action-gh-release@")
  );
  const patterns = release?.with?.files?.split(/\s+/).filter(Boolean) ?? [];
  assert.ok(
    patterns.some((pattern) => path.matchesGlob("release-assets/OmniRoute.AppImage", pattern)),
    "installer control published"
  );
  assert.ok(
    patterns.some((pattern) =>
      path.matchesGlob("release-assets/optional-pack-browser-runtime.tar.gz", pattern)
    ),
    "collected browser-runtime pack must be selected for GitHub release upload"
  );
});
