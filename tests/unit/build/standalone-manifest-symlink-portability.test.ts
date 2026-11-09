import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Regression guard for issue #11979 (Stage 8 shared standalone bundle fails
 * manifest verification on Windows because symlink targets were stored as
 * absolute, packing-machine-specific paths).
 *
 * The one absolute link in a real bundle is
 * standalone/node_modules/global-agent/node_modules/.bin/semver. npm writes it
 * relative; colocateLlmlinguaOptionals' cpSync rewrote it to the build
 * checkout's root node_modules, which is OUTSIDE the packed `.build/next` tree
 * (run 33238093090 on the hosted runner, run 42206099467 on omni-build). Such a
 * target is not portable: it dangles once the packing machine's path is gone
 * and Windows' CreateSymbolicLink rewrites it to a drive-relative path on
 * read-back. The colocation cases below reproduce that shape; the #11979 cases
 * cover an absolute target that does sit inside the tree.
 */

const bundleMod = await import("../../../scripts/build/standaloneBundle.mjs");
const colocateMod = await import("../../../scripts/build/colocateOptionals.mjs");
const manifestMod = await import("../../../scripts/build/standaloneManifest.mjs");
const { runPack, runRestore } = bundleMod as typeof bundleMod & {
  runPack: (opts: { dir?: string; out: string }) => Promise<{ files: number }>;
  runRestore: (opts: { archive: string; dir?: string }) => Promise<{ files: number }>;
};
const { colocateLlmlinguaOptionals } = colocateMod as typeof colocateMod & {
  colocateLlmlinguaOptionals: (opts: {
    rootDir: string;
    targetNodeModulesDir: string;
    seeds: string[];
  }) => { skipped: boolean; copied?: number };
};
const { buildStandaloneManifest, verifyStandaloneManifest, normalizeSymlinkTarget } =
  manifestMod as typeof manifestMod & {
    buildStandaloneManifest: (
      rootDir: string
    ) => Promise<{ version: number; entries: { path: string; symlink?: string }[] }>;
    verifyStandaloneManifest: (
      rootDir: string,
      manifest: unknown
    ) => Promise<{ ok: true } | { ok: false; errors: string[] }>;
    normalizeSymlinkTarget: (
      rootDir: string,
      entryRelPath: string,
      rawTarget: string,
      sep?: string
    ) => { ok: true; value: string } | { ok: false; reason: string };
  };

function tmpDir(prefix: string): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

/** Build the exact shape from the report: nested node_modules .bin symlink. */
function makeTreeWithAbsoluteBinSymlink(root: string): void {
  const semverDir = path.join(
    root,
    "node_modules",
    "global-agent",
    "node_modules",
    "semver",
    "bin"
  );
  fs.mkdirSync(semverDir, { recursive: true });
  fs.writeFileSync(path.join(semverDir, "semver.js"), "#!/usr/bin/env node\n// fake semver cli\n");

  const binDir = path.join(root, "node_modules", "global-agent", "node_modules", ".bin");
  fs.mkdirSync(binDir, { recursive: true });
  // Mirrors what the ubuntu web-build leg actually produced: an ABSOLUTE
  // symlink target tied to that machine's checkout path.
  fs.symlinkSync(path.join(semverDir, "semver.js"), path.join(binDir, "semver"));
}

test("#11979: buildStandaloneManifest relativizes an absolute .bin symlink target", async () => {
  const packRoot = tmpDir("standalone-pack-");
  makeTreeWithAbsoluteBinSymlink(packRoot);

  const manifest = await buildStandaloneManifest(packRoot);
  const entry = manifest.entries.find((e) => e.path.endsWith("node_modules/.bin/semver"));
  assert.ok(entry, "manifest must record the .bin/semver symlink entry");
  assert.ok(entry!.symlink, "entry must be recorded as a symlink");
  assert.equal(
    path.isAbsolute(entry!.symlink!),
    false,
    "recorded target must be relativized, not the packing-machine absolute path"
  );
  assert.equal(
    entry!.symlink,
    "../semver/bin/semver.js",
    "must match the portable form npm install already produces locally for this exact file"
  );

  fs.rmSync(packRoot, { recursive: true, force: true });
});

test("#11979: a relativized manifest restores to a working (non-dangling) symlink", async () => {
  const packRoot = tmpDir("standalone-pack-");
  makeTreeWithAbsoluteBinSymlink(packRoot);
  const manifest = await buildStandaloneManifest(packRoot);
  const entry = manifest.entries.find((e) => e.path.endsWith("node_modules/.bin/semver"))!;

  // packRoot no longer exists once the archive is shipped to another
  // machine/leg -- only the tar + manifest travel.
  fs.rmSync(packRoot, { recursive: true, force: true });

  // Simulate restoring the identical relative tree under a different
  // absolute root, exactly what extractTarGz now does: it recreates each
  // symlink verbatim from the (now-relativized) manifest string.
  const restoredRoot = tmpDir("standalone-restore-");
  const semverDir2 = path.join(
    restoredRoot,
    "node_modules",
    "global-agent",
    "node_modules",
    "semver",
    "bin"
  );
  fs.mkdirSync(semverDir2, { recursive: true });
  fs.writeFileSync(path.join(semverDir2, "semver.js"), "#!/usr/bin/env node\n// fake semver cli\n");
  const binDir = path.join(restoredRoot, "node_modules", "global-agent", "node_modules", ".bin");
  fs.mkdirSync(binDir, { recursive: true });
  fs.symlinkSync(entry.symlink!, path.join(binDir, "semver"));

  const verdict = await verifyStandaloneManifest(restoredRoot, manifest);
  const restoredBin = path.join(binDir, "semver");

  assert.equal(
    fs.existsSync(restoredBin),
    true,
    "restored .bin/semver must resolve to the co-located semver.js"
  );
  assert.deepEqual(verdict, { ok: true }, "a genuinely portable restored tree must verify clean");

  fs.rmSync(restoredRoot, { recursive: true, force: true });
});

test("#11979: relative-target comparison is unaffected when both sides already match (scope boundary)", async () => {
  // The fix is about portability of the *recorded string*, not about
  // resolving the symlink on disk -- a relative target that matches the
  // manifest still verifies even if the referenced file happens to be
  // missing on this particular tree. Documented here so a future change
  // does not assume verifyStandaloneManifest performs fs resolution.
  const restoredRoot = tmpDir("standalone-restore-");
  const binDir = path.join(restoredRoot, "node_modules", "global-agent", "node_modules", ".bin");
  fs.mkdirSync(binDir, { recursive: true });
  fs.symlinkSync("../semver/bin/semver.js", path.join(binDir, "semver"));
  // Note: unlike the previous test, semver.js is never created here, so the
  // relative target is a real dangling reference on the restored tree.

  const manifest = {
    version: 1,
    entries: [
      {
        path: "node_modules/global-agent/node_modules/.bin/semver",
        bytes: 0,
        sha256: "",
        symlink: "../semver/bin/semver.js",
      },
    ],
  };

  const verdict = await verifyStandaloneManifest(restoredRoot, manifest);
  // The string-form comparison still matches (both sides are the same
  // relative string), which is correct: the manifest layer's job is
  // portability of the *recorded* target, not filesystem resolution --
  // this asserts that guarantee is unaffected by the fix.
  assert.deepEqual(verdict, { ok: true });

  fs.rmSync(restoredRoot, { recursive: true, force: true });
});

test("#11979: normalizeSymlinkTarget rejects an absolute target that escapes the tree root", () => {
  const rootDir = tmpDir("standalone-root-");
  const result = normalizeSymlinkTarget(
    rootDir,
    "node_modules/.bin/semver",
    "/completely/unrelated/path/semver.js"
  );
  assert.equal(result.ok, false);
  fs.rmSync(rootDir, { recursive: true, force: true });
});

const BIN_LINK = "node_modules/global-agent/node_modules/.bin/semver";

/**
 * A build checkout laid out like the real one: global-agent installed by npm at
 * the root with its relative .bin link, and a `.build/next` tree that Next did
 * not trace global-agent into.
 */
function makeBuildCheckout(checkout: string): { packDir: string; standaloneNm: string } {
  const pkg = path.join(checkout, "node_modules", "global-agent");
  const nestedBin = path.join(pkg, "node_modules", ".bin");
  const semverBin = path.join(pkg, "node_modules", "semver", "bin");
  fs.mkdirSync(nestedBin, { recursive: true });
  fs.mkdirSync(semverBin, { recursive: true });
  fs.writeFileSync(
    path.join(pkg, "package.json"),
    JSON.stringify({ name: "global-agent", version: "4.1.3", main: "index.js" })
  );
  fs.writeFileSync(path.join(pkg, "index.js"), "module.exports = {};\n");
  fs.writeFileSync(path.join(semverBin, "semver.js"), "// semver cli\n");
  fs.symlinkSync("../semver/bin/semver.js", path.join(nestedBin, "semver"));

  const packDir = path.join(checkout, ".build", "next");
  const standaloneNm = path.join(packDir, "standalone", "node_modules");
  fs.mkdirSync(standaloneNm, { recursive: true });
  fs.writeFileSync(path.join(packDir, "standalone", "server.js"), "// server\n");
  return { packDir, standaloneNm };
}

function colocateGlobalAgent(checkout: string, standaloneNm: string): void {
  const result = colocateLlmlinguaOptionals({
    rootDir: checkout,
    targetNodeModulesDir: standaloneNm,
    seeds: ["global-agent"],
  });
  assert.equal(result.copied, 1, "global-agent must be co-located");
}

test("colocation keeps a package's nested .bin link relative", () => {
  const checkout = tmpDir("standalone-checkout-");
  try {
    const { standaloneNm } = makeBuildCheckout(checkout);
    colocateGlobalAgent(checkout, standaloneNm);
    assert.equal(
      fs.readlinkSync(path.join(standaloneNm, "global-agent/node_modules/.bin/semver")),
      "../semver/bin/semver.js",
      "the copy must not point back at the build checkout's root node_modules"
    );
  } finally {
    fs.rmSync(checkout, { recursive: true, force: true });
  }
});

test("colocation fills a partially traced package without breaking its .bin link", () => {
  const checkout = tmpDir("standalone-checkout-");
  try {
    const { standaloneNm } = makeBuildCheckout(checkout);
    // The trace left the link and the manifest but not the entrypoint, so the
    // package is not intact and the copy merges over the existing link.
    const traced = path.join(standaloneNm, "global-agent");
    fs.mkdirSync(path.join(traced, "node_modules", ".bin"), { recursive: true });
    fs.copyFileSync(
      path.join(checkout, "node_modules", "global-agent", "package.json"),
      path.join(traced, "package.json")
    );
    fs.symlinkSync("../semver/bin/semver.js", path.join(traced, "node_modules", ".bin", "semver"));

    colocateGlobalAgent(checkout, standaloneNm);

    assert.ok(fs.existsSync(path.join(traced, "index.js")), "missing entrypoint filled in");
    assert.equal(
      fs.readlinkSync(path.join(traced, "node_modules", ".bin", "semver")),
      "../semver/bin/semver.js"
    );
  } finally {
    fs.rmSync(checkout, { recursive: true, force: true });
  }
});

test("a colocated tree packs here and restores where the build checkout is gone", async () => {
  const checkout = tmpDir("standalone-checkout-");
  const outDir = tmpDir("standalone-out-");
  const restored = path.join(outDir, "restored");
  try {
    const { packDir, standaloneNm } = makeBuildCheckout(checkout);
    colocateGlobalAgent(checkout, standaloneNm);

    const archive = path.join(outDir, "web-bundle.tar.gz");
    await runPack({ dir: packDir, out: archive });
    // Only the archive and its manifest travel to the desktop legs.
    fs.rmSync(checkout, { recursive: true, force: true });
    await runRestore({ archive, dir: restored });

    const restoredLink = path.join(restored, "standalone", BIN_LINK);
    assert.equal(fs.readlinkSync(restoredLink), "../semver/bin/semver.js");
    assert.equal(fs.readFileSync(restoredLink, "utf8"), "// semver cli\n");
  } finally {
    fs.rmSync(checkout, { recursive: true, force: true });
    fs.rmSync(outDir, { recursive: true, force: true });
  }
});

test("pack refuses an absolute link into the build checkout even when the tree has that path", async () => {
  const checkout = tmpDir("standalone-checkout-");
  const outDir = tmpDir("standalone-out-");
  try {
    const { packDir, standaloneNm } = makeBuildCheckout(checkout);
    colocateGlobalAgent(checkout, standaloneNm);
    // The exact v3.8.53 shape: the same file exists inside the tree, but the
    // link itself leaves it. Guessing the in-tree twin would hide a broken build.
    const link = path.join(standaloneNm, "global-agent/node_modules/.bin/semver");
    fs.rmSync(link);
    fs.symlinkSync(
      path.join(checkout, "node_modules/global-agent/node_modules/semver/bin/semver.js"),
      link
    );

    await assert.rejects(
      () => runPack({ dir: packDir, out: path.join(outDir, "web-bundle.tar.gz") }),
      /target escapes the tree root/
    );
  } finally {
    fs.rmSync(checkout, { recursive: true, force: true });
    fs.rmSync(outDir, { recursive: true, force: true });
  }
});

for (const [label, target] of [
  ["absolute", "/opt/actions-runner/_work/secret.txt"],
  ["relative", "../../../../secret.txt"],
] as const) {
  test(`pack refuses a ${label} link that escapes the tree`, async () => {
    const root = tmpDir("standalone-escape-");
    const outDir = tmpDir("standalone-out-");
    try {
      const binDir = path.join(root, "standalone", "node_modules", ".bin");
      fs.mkdirSync(binDir, { recursive: true });
      fs.symlinkSync(target, path.join(binDir, "escape"));

      await assert.rejects(
        () => runPack({ dir: root, out: path.join(outDir, "web-bundle.tar.gz") }),
        /target escapes the tree root/
      );
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
      fs.rmSync(outDir, { recursive: true, force: true });
    }
  });
}

test("pack keeps Turbopack's relative externals, which resolve in every checkout", async () => {
  const checkout = tmpDir("standalone-checkout-");
  const outDir = tmpDir("standalone-out-");
  const restoredCheckout = tmpDir("standalone-leg-");
  try {
    const { packDir } = makeBuildCheckout(checkout);
    // The real shape: 15 of these sit beside standalone/ in a Turbopack build.
    const links = [
      ["ws-a972e7ffa40ff725", "../../../node_modules/ws"],
      ["@ngrok/ngrok-0f98e1294a0b09d5", "../../../../node_modules/@ngrok/ngrok"],
    ];
    for (const [name, target] of links) {
      const link = path.join(packDir, "node_modules", name);
      fs.mkdirSync(path.dirname(link), { recursive: true });
      fs.symlinkSync(target, link);
    }

    const archive = path.join(outDir, "web-bundle.tar.gz");
    await runPack({ dir: packDir, out: archive });
    const restored = path.join(restoredCheckout, ".build", "next");
    await runRestore({ archive, dir: restored });

    for (const [name, target] of links) {
      assert.equal(fs.readlinkSync(path.join(restored, "node_modules", name)), target);
    }
    // The leg's own npm ci provides the package the link lands on.
    fs.mkdirSync(path.join(restoredCheckout, "node_modules", "ws"), { recursive: true });
    fs.writeFileSync(path.join(restoredCheckout, "node_modules", "ws", "index.js"), "// ws\n");
    assert.equal(
      fs.readFileSync(path.join(restored, "node_modules", links[0][0], "index.js"), "utf8"),
      "// ws\n"
    );
  } finally {
    fs.rmSync(checkout, { recursive: true, force: true });
    fs.rmSync(outDir, { recursive: true, force: true });
    fs.rmSync(restoredCheckout, { recursive: true, force: true });
  }
});

test("under standalone/, normalizeSymlinkTarget refuses relative targets that leave the tree", () => {
  const entry = "standalone/node_modules/.bin/tool";
  const rootDir = tmpDir("standalone-root-");
  try {
    assert.deepEqual(normalizeSymlinkTarget(rootDir, entry, "../tool/cli.js"), {
      ok: true,
      value: "../tool/cli.js",
    });
    assert.deepEqual(normalizeSymlinkTarget(rootDir, entry, "../../../static/app.css"), {
      ok: true,
      value: "../../../static/app.css",
    });
    for (const target of ["../../../..", "../../../../outside.js", "../../..", "../../../"]) {
      const result = normalizeSymlinkTarget(rootDir, entry, target);
      assert.equal(result.ok, false, `${target} must be refused`);
    }
  } finally {
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
});

test("Windows read-back of a relative link compares equal to the manifest's posix target", () => {
  const entry = "standalone/node_modules/global-agent/node_modules/.bin/semver";
  const rootDir = tmpDir("standalone-root-");
  try {
    // fs.symlinkSync stores `\\` on Windows, so readlink never returns the `/`
    // the Linux pack recorded.
    assert.deepEqual(normalizeSymlinkTarget(rootDir, entry, "..\\semver\\bin\\semver.js", "\\"), {
      ok: true,
      value: "../semver/bin/semver.js",
    });
    const escaping = "..\\..\\..\\..\\..\\..\\outside.js";
    assert.equal(normalizeSymlinkTarget(rootDir, entry, escaping, "\\").ok, false);
    // A backslash is an ordinary filename character on POSIX.
    assert.deepEqual(normalizeSymlinkTarget(rootDir, entry, "..\\semver"), {
      ok: true,
      value: "..\\semver",
    });
  } finally {
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
});

test("verification still fails a restored link that was retargeted", async () => {
  const checkout = tmpDir("standalone-checkout-");
  const outDir = tmpDir("standalone-out-");
  const restored = path.join(outDir, "restored");
  try {
    const { packDir, standaloneNm } = makeBuildCheckout(checkout);
    colocateGlobalAgent(checkout, standaloneNm);
    const archive = path.join(outDir, "web-bundle.tar.gz");
    await runPack({ dir: packDir, out: archive });
    await runRestore({ archive, dir: restored });
    const manifest = JSON.parse(fs.readFileSync(`${archive}.manifest.json`, "utf8"));
    const link = path.join(restored, "standalone", BIN_LINK);

    fs.rmSync(link);
    fs.symlinkSync("../semver/package.json", link);
    const inTree = await verifyStandaloneManifest(restored, manifest);
    assert.equal(inTree.ok, false);
    assert.match(
      (inTree as { errors: string[] }).errors.join("; "),
      /symlink target \.\.\/semver\/package\.json != \.\.\/semver\/bin\/semver\.js/
    );

    fs.rmSync(link);
    fs.symlinkSync("../../../../../../../outside.js", link);
    await assert.rejects(
      () => verifyStandaloneManifest(restored, manifest),
      /target escapes the tree root/
    );
  } finally {
    fs.rmSync(checkout, { recursive: true, force: true });
    fs.rmSync(outDir, { recursive: true, force: true });
  }
});
