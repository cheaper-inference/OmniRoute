import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { stageOptionalPacks } from "../../../scripts/build/optionalPackStaging.mjs";
import { installPack } from "../../../scripts/packs/optionalPackInstaller.mjs";

type Entry = { name: string; tarball: string; sha256?: string; packages: object[] };
async function fixture(content = "linux fixture") {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "pack-archive-"));
  const stagingRoot = path.join(root, "app");
  const packsOutDir = path.join(root, "packs");
  for (const name of ["playwright", "playwright-core"]) {
    const dir = path.join(stagingRoot, "node_modules", name);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify({ name, version: "1.0.0" }));
    fs.writeFileSync(path.join(dir, "index.js"), content);
  }
  const result = await stageOptionalPacks({ stagingRoot, packsOutDir, emitTarballs: true });
  const index = result.index as { packs: Entry[] };
  return {
    root,
    stagingRoot,
    packsOutDir,
    index,
    entry: index.packs[0],
  };
}

test("staging names browser archives by their bytes and records the digest", async () => {
  const f = await fixture();
  try {
    const digest = createHash("sha256")
      .update(fs.readFileSync(path.join(f.packsOutDir, f.entry.tarball)))
      .digest("hex");
    assert.equal(f.entry.sha256, digest);
    assert.equal(f.entry.tarball, `optional-pack-browser-runtime-${digest}.tar.gz`);
  } finally {
    fs.rmSync(f.root, { recursive: true, force: true });
  }
});

test("installer selects the indexed platform payload when other payloads share its source", async () => {
  const f = await fixture();
  try {
    const original = path.join(f.packsOutDir, f.entry.tarball);
    const digest = createHash("sha256").update(fs.readFileSync(original)).digest("hex");
    f.entry.sha256 = digest;
    f.entry.tarball = `optional-pack-browser-runtime-${digest}.tar.gz`;
    const selected = path.join(f.packsOutDir, f.entry.tarball);
    if (selected !== original) fs.renameSync(original, selected);
    fs.rmSync(path.join(f.packsOutDir, "browser-runtime"), { recursive: true, force: true });
    fs.writeFileSync(
      path.join(f.packsOutDir, "optional-pack-browser-runtime.tar.gz"),
      "wrong platform decoy"
    );
    await installPack("browser-runtime", {
      dataDir: path.join(f.root, "data"),
      index: f.index,
      sourceDir: f.packsOutDir,
    });
    assert.equal(
      fs.readFileSync(
        path.join(f.root, "data/packs/browser-runtime/node_modules/playwright/index.js"),
        "utf8"
      ),
      "linux fixture"
    );
  } finally {
    fs.rmSync(f.root, { recursive: true, force: true });
  }
});

test("archive hash mismatch fails before extraction and preserves previous installation", async () => {
  const f = await fixture();
  try {
    const target = path.join(f.root, "data/packs/browser-runtime/node_modules");
    fs.mkdirSync(target, { recursive: true });
    fs.writeFileSync(path.join(target, "previous"), "preserve");
    f.entry.sha256 = "0".repeat(64);
    await assert.rejects(
      installPack("browser-runtime", {
        dataDir: path.join(f.root, "data"),
        index: f.index,
        sourceDir: f.packsOutDir,
      }),
      /archive.*checksum|checksum.*archive/i
    );
    assert.equal(fs.readFileSync(path.join(target, "previous"), "utf8"), "preserve");
  } finally {
    fs.rmSync(f.root, { recursive: true, force: true });
  }
});

test("index cannot select an archive outside the source directory", async () => {
  const f = await fixture();
  try {
    f.entry.tarball = "../outside.tar.gz";
    await assert.rejects(
      installPack("browser-runtime", {
        dataDir: path.join(f.root, "data"),
        index: f.index,
        sourceDir: f.packsOutDir,
      }),
      /invalid.*archive|invalid.*tarball/i
    );
  } finally {
    fs.rmSync(f.root, { recursive: true, force: true });
  }
});

test("release collector keeps distinct platform payloads, deduplicates identical archives and rejects corruption", async () => {
  const { collectOptionalPacks } =
    await import("../../../scripts/release/collect-optional-packs.mjs");
  const linux = await fixture("linux native fixture");
  const windows = await fixture("windows native fixture");
  const output = path.join(linux.root, "release-assets");
  try {
    await collectOptionalPacks(
      path.join(linux.stagingRoot, "optional-packs.index.json"),
      linux.packsOutDir,
      output
    );
    await collectOptionalPacks(
      path.join(windows.stagingRoot, "optional-packs.index.json"),
      windows.packsOutDir,
      output
    );
    await collectOptionalPacks(
      path.join(linux.stagingRoot, "optional-packs.index.json"),
      linux.packsOutDir,
      output
    );
    assert.equal(fs.readdirSync(output).length, 2);
    assert.notEqual(linux.entry.tarball, windows.entry.tarball);
    fs.writeFileSync(path.join(output, linux.entry.tarball), "collision");
    await assert.rejects(
      collectOptionalPacks(
        path.join(linux.stagingRoot, "optional-packs.index.json"),
        linux.packsOutDir,
        output
      ),
      /collision/
    );
    fs.writeFileSync(path.join(windows.packsOutDir, windows.entry.tarball), "corrupt source");
    await assert.rejects(
      collectOptionalPacks(
        path.join(windows.stagingRoot, "optional-packs.index.json"),
        windows.packsOutDir,
        output
      ),
      /checksum/
    );
  } finally {
    fs.rmSync(linux.root, { recursive: true, force: true });
    fs.rmSync(windows.root, { recursive: true, force: true });
  }
});
