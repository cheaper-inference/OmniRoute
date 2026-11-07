import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { PassThrough } from "node:stream";

/**
 * Stage 8 (issue #10321) — shared standalone web bundle.
 *
 * One ubuntu `web-build` job packs `.build/next` into a deterministic
 * archive + byte-level manifest; every desktop leg restores it (verifying
 * every entry) and re-forks install-machine-forked native optionals for its
 * platform. These tests pin the integrity chain on temp trees: pack/restore
 * roundtrip, byte determinism, tamper detection (archive and restored tree),
 * manifest-version gating, native fork hydration, and the bundled-native
 * serviceability assertion (including the onnxruntime darwin-x64 exemption).
 */

const bundleMod = await import("../../../scripts/build/standaloneBundle.mjs");
const manifestMod = await import("../../../scripts/build/standaloneManifest.mjs");
const hydrateMod = await import("../../../scripts/build/hydrateNativeDeps.mjs");
const tarballMod = await import("../../../scripts/build/standaloneTarball.mjs");

const { runPack, runRestore } = bundleMod as typeof bundleMod & {
  runPack: (opts: { dir?: string; out: string; manifest?: string }) => Promise<{
    archive: string;
    manifest: string;
    files: number;
    archiveBytes: number;
  }>;
  runRestore: (opts: { archive: string; manifest?: string; dir?: string }) => Promise<{
    archive: string;
    dir: string;
    files: number;
  }>;
};
const { verifyStandaloneManifest, MANIFEST_VERSION } = manifestMod as typeof manifestMod & {
  MANIFEST_VERSION: number;
  verifyStandaloneManifest: (
    rootDir: string,
    manifest: unknown
  ) => Promise<{ ok: true } | { ok: false; errors: string[] }>;
};
const { hydratePlatformNatives, verifyBundledNatives } = hydrateMod as typeof hydrateMod & {
  hydratePlatformNatives: (opts: { standaloneNodeModules: string; sourceNodeModules: string }) => {
    replaced: string[];
    removed: string[];
    copied: string[];
  };
  verifyBundledNatives: (opts: { nodeModulesDir: string; platform: string; arch: string }) => {
    ok: boolean;
    errors: string[];
  };
};

const { BlockSource, READ_AHEAD_BYTES, createTarGz, extractTarGz } =
  tarballMod as typeof tarballMod & {
    READ_AHEAD_BYTES: number;
    BlockSource: new (stream: PassThrough) => {
      buffered: number;
      read: (n: number) => Promise<Buffer | null>;
      readSome: (max?: number) => Promise<Buffer | null>;
    };
    createTarGz: (srcDir: string, outFile: string) => Promise<void>;
    extractTarGz: (archive: string, destDir: string) => Promise<{ entries: number }>;
  };

const IS_WINDOWS = process.platform === "win32";

function tmpDir(prefix: string): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

function sha256File(filePath: string): string {
  return createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

/** Minimal fake `.build/next` tree: nested files, exec bit, and a symlink. */
function buildWebTree(root: string): void {
  const standalone = path.join(root, "standalone");
  fs.mkdirSync(path.join(standalone, "node_modules", "left-pad"), { recursive: true });
  fs.writeFileSync(path.join(standalone, "server.js"), "console.log('omniroute');\n");
  fs.writeFileSync(
    path.join(standalone, "node_modules", "left-pad", "index.js"),
    "module.exports = (s, n) => String(s).padStart(n);\n"
  );
  fs.writeFileSync(path.join(standalone, "node_modules", "left-pad", "package.json"), "{}\n");
  const bin = path.join(standalone, "server-cli.js");
  fs.writeFileSync(bin, "#!/usr/bin/env node\n");
  fs.chmodSync(bin, 0o755);
  fs.mkdirSync(path.join(root, "static"), { recursive: true });
  fs.writeFileSync(path.join(root, "static", "app.css"), "body{margin:0}\n");
  if (!IS_WINDOWS) {
    fs.symlinkSync("../standalone/server.js", path.join(root, "static", "server-link.js"));
  }
}

function writeNative(root: string, relPath: string, content: string): void {
  const target = path.join(root, ...relPath.split("/"));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

test("pack → restore roundtrip restores the tree byte-for-byte", async () => {
  const src = tmpDir("s8-src-");
  const out = path.join(tmpDir("s8-out-"), "web-bundle.tar.gz");
  const dst = tmpDir("s8-dst-");
  try {
    buildWebTree(src);
    const packed = await runPack({ dir: src, out });
    assert.ok(packed.files > 0, "manifest must list entries");
    assert.ok(fs.existsSync(`${out}.manifest.json`), "manifest written next to archive");

    const restored = await runRestore({ archive: out, dir: dst });
    assert.equal(restored.files, packed.files);

    assert.equal(
      fs.readFileSync(path.join(dst, "standalone", "server.js"), "utf8"),
      "console.log('omniroute');\n"
    );
    // The restored tree satisfies the manifest (sizes + hashes + symlink targets).
    const manifest = JSON.parse(fs.readFileSync(`${out}.manifest.json`, "utf8"));
    const verdict = await verifyStandaloneManifest(dst, manifest);
    assert.equal(
      verdict.ok,
      true,
      `restored tree must verify: ${verdict.ok ? "" : (verdict as { errors: string[] }).errors.join("; ")}`
    );
    if (!IS_WINDOWS) {
      assert.equal(
        fs.readlinkSync(path.join(dst, "static", "server-link.js")),
        "../standalone/server.js",
        "symlink target preserved"
      );
      assert.equal(
        fs.statSync(path.join(dst, "standalone", "server-cli.js")).mode & 0o111,
        0o111,
        "exec bit preserved"
      );
    }
  } finally {
    fs.rmSync(src, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.rmSync(path.dirname(out), { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.rmSync(dst, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("packing is byte-deterministic across runs", async () => {
  const src = tmpDir("s8-det-");
  const outDir = tmpDir("s8-det-out-");
  try {
    buildWebTree(src);
    const a = path.join(outDir, "a.tar.gz");
    const b = path.join(outDir, "b.tar.gz");
    await runPack({ dir: src, out: a });
    await runPack({ dir: src, out: b });
    assert.equal(sha256File(a), sha256File(b), "two packs of the same tree must be identical");
  } finally {
    fs.rmSync(src, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.rmSync(outDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("restore rejects a corrupted archive before extraction", async () => {
  const src = tmpDir("s8-tamper-");
  const outDir = tmpDir("s8-tamper-out-");
  try {
    buildWebTree(src);
    const out = path.join(outDir, "web-bundle.tar.gz");
    await runPack({ dir: src, out });
    const raw = fs.readFileSync(out);
    raw[raw.length - 10] ^= 0xff; // flip one byte in the gzip trailer region
    fs.writeFileSync(out, raw);
    await assert.rejects(() => runRestore({ archive: out, dir: path.join(outDir, "dst") }), /sha/);
  } finally {
    fs.rmSync(src, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.rmSync(outDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("extraction does not recopy the buffered stream for every entry", async () => {
  const src = tmpDir("s8-copies-src-");
  const outDir = tmpDir("s8-copies-out-");
  const dst = tmpDir("s8-copies-dst-");
  const realConcat = Buffer.concat;
  try {
    // Restore time on a real bundle (123k entries) went quadratic through
    // Buffer.concat. Counting the copied bytes proves it without a timing assertion.
    const entries = 2000;
    const body = Buffer.alloc(1500, "x");
    for (let i = 0; i < entries; i++) {
      fs.writeFileSync(path.join(src, `f${i}.txt`), body);
    }
    const archive = path.join(outDir, "web-bundle.tar.gz");
    await createTarGz(src, archive);
    const tarBytes = entries * (512 + 2048);

    let copied = 0;
    Buffer.concat = ((list: Uint8Array[], length?: number) => {
      const joined = realConcat(list, length);
      copied += joined.length;
      return joined;
    }) as typeof Buffer.concat;
    const result = await extractTarGz(archive, dst);
    Buffer.concat = realConcat;

    assert.equal(result.entries, entries);
    assert.equal(fs.readFileSync(path.join(dst, "f1999.txt")).length, body.length);
    assert.ok(copied <= tarBytes, `copied ${copied} bytes extracting a ${tarBytes}-byte tar`);
  } finally {
    Buffer.concat = realConcat;
    fs.rmSync(src, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.rmSync(outDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.rmSync(dst, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("BlockSource pauses the stream ahead of a slow reader and loses no bytes", async () => {
  const stream = new PassThrough({ highWaterMark: 64 * 1024 });
  const source = new BlockSource(stream);
  const chunk = Buffer.alloc(256 * 1024, 7);
  const total = (READ_AHEAD_BYTES / chunk.length) * 4 * chunk.length;
  let written = 0;
  const writer = (async () => {
    while (written < total) {
      written += chunk.length;
      if (!stream.write(chunk)) await new Promise((resolve) => stream.once("drain", resolve));
    }
    stream.end();
  })();

  await new Promise((resolve) => setTimeout(resolve, 50));
  assert.ok(stream.isPaused(), "a reader that is behind must pause the stream");
  assert.ok(
    source.buffered <= READ_AHEAD_BYTES + chunk.length,
    `read-ahead ${source.buffered} exceeds the limit`
  );
  assert.ok(written < total, "the writer must feel the backpressure");

  // Reads cross chunk boundaries and must see every byte exactly once.
  let received = 0;
  const odd = 1000;
  for (;;) {
    const part = await source.read(odd);
    if (part === null) break;
    assert.equal(part.length, odd);
    received += part.length;
  }
  await writer;
  assert.equal(received, Math.floor(total / odd) * odd);
  assert.equal(await source.readSome(), null, "the stream is exhausted");
});

test("manifest verification flags modified and smuggled files in a restored tree", async () => {
  const src = tmpDir("s8-verify-");
  const outDir = tmpDir("s8-verify-out-");
  const dst = tmpDir("s8-verify-dst-");
  try {
    buildWebTree(src);
    const out = path.join(outDir, "web-bundle.tar.gz");
    await runPack({ dir: src, out });
    await runRestore({ archive: out, dir: dst });

    fs.appendFileSync(path.join(dst, "standalone", "server.js"), "// tampered\n");
    fs.writeFileSync(path.join(dst, "static", "smuggled.js"), "evil();\n");

    const manifest = JSON.parse(fs.readFileSync(`${out}.manifest.json`, "utf8"));
    const verdict = await verifyStandaloneManifest(dst, manifest);
    assert.equal(verdict.ok, false);
    assert.ok(
      verdict.errors.some((e) => e.includes("standalone/server.js")),
      `content tampering detected: ${verdict.errors.join("; ")}`
    );
    assert.ok(
      verdict.errors.some((e) => e.includes("unlisted files") && e.includes("static/smuggled.js")),
      `smuggled file detected: ${verdict.errors.join("; ")}`
    );
  } finally {
    fs.rmSync(src, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.rmSync(outDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.rmSync(dst, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("manifest verification rejects an unsupported manifest version", async () => {
  const dst = tmpDir("s8-ver-");
  try {
    const verdict = await verifyStandaloneManifest(dst, {
      version: MANIFEST_VERSION + 1,
      entries: [],
    });
    assert.equal(verdict.ok, false);
    assert.match(verdict.errors[0] ?? "", /unsupported manifest version/);
  } finally {
    fs.rmSync(dst, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("hydratePlatformNatives swaps install-machine-forked packages for this leg", () => {
  const standalone = tmpDir("s8-hydrate-sa-");
  const source = tmpDir("s8-hydrate-src-");
  try {
    // The ubuntu-built standalone carries linux sharp + darwin-only fsevents.
    writeNative(
      standalone,
      "node_modules/@img/sharp-linux-x64/package.json",
      '{"name":"@img/sharp-linux-x64"}'
    );
    writeNative(standalone, "node_modules/@img/sharp-linux-x64/lib/index.js", "linux fork");
    writeNative(
      standalone,
      "node_modules/@wreq-js/binding-linux-x64-gnu/wreq-js.linux-x64-gnu.node",
      "linux wreq"
    );
    writeNative(standalone, "node_modules/fsevents/fsevents.js", "mac only");
    // This leg (darwin-arm64) resolved its own forks: different sharp, no fsevents.
    writeNative(
      source,
      "node_modules/@img/sharp-darwin-arm64/package.json",
      '{"name":"@img/sharp-darwin-arm64"}'
    );
    writeNative(source, "node_modules/@img/sharp-darwin-arm64/lib/index.js", "darwin fork");
    writeNative(
      source,
      "node_modules/@wreq-js/binding-darwin-arm64/wreq-js.darwin-arm64.node",
      "darwin wreq"
    );

    const result = hydratePlatformNatives({
      standaloneNodeModules: path.join(standalone, "node_modules"),
      sourceNodeModules: path.join(source, "node_modules"),
    });

    // Platform forks ship under different package names, so hydration is
    // remove(standalone fork) + copy(this leg's fork); `replaced` stays empty
    // unless the exact same name exists on both sides.
    assert.deepEqual(result.copied.sort(), [
      "@img/sharp-darwin-arm64",
      "@wreq-js/binding-darwin-arm64",
    ]);
    assert.deepEqual(result.replaced, []);
    assert.deepEqual(result.removed.sort(), [
      "@img/sharp-linux-x64",
      "@wreq-js/binding-linux-x64-gnu",
      "fsevents",
    ]);
    assert.ok(
      fs.existsSync(
        path.join(standalone, "node_modules", "@img", "sharp-darwin-arm64", "lib", "index.js")
      ),
      "darwin fork copied in"
    );
    assert.ok(
      !fs.existsSync(path.join(standalone, "node_modules", "@img", "sharp-linux-x64")),
      "linux fork removed"
    );
    assert.ok(
      fs.existsSync(
        path.join(
          standalone,
          "node_modules",
          "@wreq-js",
          "binding-darwin-arm64",
          "wreq-js.darwin-arm64.node"
        )
      ),
      "darwin wreq binding copied in"
    );
    assert.ok(
      !fs.existsSync(path.join(standalone, "node_modules", "fsevents")),
      "fsevents dropped on non-matching leg"
    );
  } finally {
    fs.rmSync(standalone, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.rmSync(source, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("verifyBundledNatives asserts serviceability and honors the onnx darwin-x64 exemption", () => {
  const root = tmpDir("s8-natives-");
  try {
    const nm = path.join(root, "node_modules");
    writeNative(nm, "better-sqlite3/prebuilds/linux-x64.node", "napi");
    writeNative(nm, "@wreq-js/binding-linux-x64-gnu/wreq-js.linux-x64-gnu.node", "rust");
    writeNative(nm, "onnxruntime-node/bin/napi-v6/linux/x64/libonnxruntime.so", "ort");

    const good = verifyBundledNatives({ nodeModulesDir: nm, platform: "linux", arch: "x64" });
    assert.equal(
      good.ok,
      true,
      `expected serviceable: ${(good as { errors?: string[] }).errors?.join("; ")}`
    );

    const missingPlatformNatives = verifyBundledNatives({
      nodeModulesDir: nm,
      platform: "darwin",
      arch: "arm64",
    });
    assert.equal(missingPlatformNatives.ok, false);
    assert.ok(
      (missingPlatformNatives as { errors: string[] }).errors.some((e) => e.startsWith("wreq-js:"))
    );

    // darwin-x64 has no onnxruntime-node prebuild at all — the exemption must keep it green
    // as long as the other bundled natives service that triple.
    const nm2 = path.join(root, "node_modules2");
    writeNative(nm2, "better-sqlite3/prebuilds/darwin-x64.node", "napi");
    writeNative(nm2, "@wreq-js/binding-darwin-x64/wreq-js.darwin-x64.node", "rust");
    const exempted = verifyBundledNatives({ nodeModulesDir: nm2, platform: "darwin", arch: "x64" });
    assert.equal(
      exempted.ok,
      true,
      `darwin-x64 must pass via exemption: ${(exempted as { errors?: string[] }).errors?.join("; ")}`
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
