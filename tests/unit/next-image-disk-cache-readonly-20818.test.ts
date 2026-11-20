import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";

// #20818: on a global npm install run by a service account (systemd
// ProtectSystem=full, install tree under read-only /usr), Next's
// `ImageOptimizerCache` constructor eagerly ran
// `mkdir(<distDir>/cache/images)` + `statfs` for its disk LRU on the first
// `/_next/image` request, even with `images.unoptimized: true`. The mkdir
// failed inside the install tree and the promise was never awaited.
// `images.maximumDiskCacheSize: 0` is Next's switch that turns that disk
// cache off; with unoptimized images it is never read or written anyway.

const require = createRequire(import.meta.url);
const { ImageOptimizerCache } = require("next/dist/server/image-optimizer");
const { resetDiskLRU } = require("next/dist/server/lib/disk-lru-cache.external");
const { imageConfigDefault } = require("next/dist/shared/lib/image-config");

/**
 * Creates a `distDir` path whose `cache/` can never be created: its parent is
 * a regular file, so mkdir fails with ENOTDIR even when the tests run as root.
 *
 * @returns {{ root: string, distDir: string }} the temp root (for cleanup) and the unwritable distDir
 */
function makeUnwritableDistDir() {
  const root = mkdtempSync(join(tmpdir(), "omniroute-20818-"));
  const installTree = join(root, "dist");
  writeFileSync(installTree, "not a directory");
  return { root, distDir: join(installTree, ".build", "next") };
}

/**
 * Builds the server-side config shape `ImageOptimizerCache` reads: Next's image
 * defaults merged with the given `images` block, and Next's default
 * `isrFlushToDisk: true`.
 *
 * @param {Record<string, unknown>} images the `images` block to apply over Next's defaults
 * @returns {object} the config object passed to the `ImageOptimizerCache` constructor
 */
function buildServerConfig(images) {
  return {
    images: { ...imageConfigDefault, ...images },
    experimental: { isrFlushToDisk: true },
  };
}

test("next config disables the image disk cache alongside unoptimized images", async () => {
  const { default: nextConfig } = await import("../../next.config.mjs");

  assert.equal(nextConfig.images.unoptimized, true);
  assert.equal(nextConfig.images.maximumDiskCacheSize, 0);
});

test("an /_next/image request never touches <distDir>/cache with OmniRoute's image config", async (t) => {
  const { default: nextConfig } = await import("../../next.config.mjs");
  const { root, distDir } = makeUnwritableDistDir();
  t.after(() => {
    resetDiskLRU();
    rmSync(root, { recursive: true, force: true });
  });
  resetDiskLRU();

  const cache = new ImageOptimizerCache({
    distDir,
    nextConfig: buildServerConfig(nextConfig.images),
  });

  assert.notEqual(cache.isDiskCacheEnabled, true);
  assert.equal(cache.cacheDiskLRU, undefined);
  assert.equal(existsSync(join(root, "dist", ".build")), false);
});

test("control: Next's default image config starts a disk-cache mkdir that fails on a read-only tree", async (t) => {
  const { root, distDir } = makeUnwritableDistDir();
  t.after(() => {
    resetDiskLRU();
    rmSync(root, { recursive: true, force: true });
  });
  resetDiskLRU();

  const cache = new ImageOptimizerCache({
    distDir,
    nextConfig: buildServerConfig({ unoptimized: true }),
  });

  assert.equal(cache.isDiskCacheEnabled, true);
  await assert.rejects(cache.cacheDiskLRU, { code: "ENOTDIR" });
});
