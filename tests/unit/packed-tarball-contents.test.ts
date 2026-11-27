import assert from "node:assert/strict";
import { mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { gzipSync } from "node:zlib";

import {
  NPM_TARBALL_ROOT,
  describeManifestMismatch,
  parsePaxRecords,
  readPackedTarball,
} from "../../scripts/build/packedTarballContents.ts";

/**
 * In-process tests for the tarball reader behind `check:pack-artifact --tarball` (#20644).
 * The gate-level tests in pack-artifact-prebuilt-tarball.test.ts run the script as a child
 * process; these import the reader directly and feed it archives assembled header by header
 * here (no binary fixtures, no system tar), so every header kind it understands is pinned:
 * ustar (with the prefix field), pax `x` (path and size overrides), pax `g`, GNU `L` long
 * names (GNU magic, where the prefix field is not a path), base-256 sizes, directories,
 * entries outside package/, and the failure modes (bad checksum, truncated tar, truncated
 * gzip, not gzip, missing file).
 */

const BLOCK = 512;

type HeaderSpec = {
  name: string;
  size: number;
  type?: string;
  prefix?: string;
  gnu?: boolean;
  base256Size?: boolean;
  /** Overwrite the stored checksum with this (to build a corrupt header). */
  badChecksum?: boolean;
};

function writeOctal(block: Buffer, offset: number, length: number, value: number) {
  block.write(value.toString(8).padStart(length - 1, "0") + "\0", offset, length, "ascii");
}

function tarHeader(spec: HeaderSpec): Buffer {
  const block = Buffer.alloc(BLOCK);
  block.write(spec.name, 0, 100, "utf8");
  writeOctal(block, 100, 8, 0o644);
  writeOctal(block, 108, 8, 0);
  writeOctal(block, 116, 8, 0);
  if (spec.base256Size) {
    block[124] = 0x80;
    let value = spec.size;
    for (let i = 135; i > 124; i--) {
      block[i] = value % 256;
      value = Math.floor(value / 256);
    }
  } else {
    writeOctal(block, 124, 12, spec.size);
  }
  writeOctal(block, 136, 12, 0);
  block.write(spec.type ?? "0", 156, 1, "ascii");
  if (spec.gnu) {
    block.write("ustar  \0", 257, 8, "ascii");
    // GNU format stores atime/ctime here, never a path prefix.
    block.write("00000000000\0", 345, 12, "ascii");
  } else {
    block.write("ustar\0", 257, 6, "ascii");
    block.write("00", 263, 2, "ascii");
    if (spec.prefix) block.write(spec.prefix, 345, 155, "utf8");
  }
  block.fill(0x20, 148, 156);
  let sum = 0;
  for (let i = 0; i < BLOCK; i++) sum += block[i];
  if (spec.badChecksum) sum += 1;
  block.write(sum.toString(8).padStart(6, "0") + "\0 ", 148, 8, "ascii");
  return block;
}

function padded(data: Buffer): Buffer {
  const padding = (BLOCK - (data.length % BLOCK)) % BLOCK;
  return Buffer.concat([data, Buffer.alloc(padding)]);
}

function entry(spec: Omit<HeaderSpec, "size">, content: string | Buffer = ""): Buffer {
  const data = Buffer.isBuffer(content) ? content : Buffer.from(content);
  return Buffer.concat([tarHeader({ ...spec, size: data.length }), padded(data)]);
}

function paxRecord(key: string, value: string): string {
  const body = ` ${key}=${value}\n`;
  let length = body.length;
  while (String(length).length + body.length !== length)
    length = String(length).length + body.length;
  return `${length}${body}`;
}

const END_OF_ARCHIVE = Buffer.alloc(BLOCK * 2);

function withTarball(
  parts: Buffer[],
  fn: (tarball: string) => Promise<void>,
  { gzip = true, endBlocks = true } = {}
) {
  return async () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), "packed-tarball-contents-"));
    try {
      const tar = Buffer.concat([...parts, ...(endBlocks ? [END_OF_ARCHIVE] : [])]);
      const tarball = path.join(dir, "fixture.tgz");
      writeFileSync(tarball, gzip ? gzipSync(tar) : tar);
      await fn(tarball);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  };
}

const LONG_DIR = `package/dist/.build/next/server/chunks/${"segment-".repeat(14)}`;
const LONG_NAME = `${LONG_DIR}/chunk.js`;
const MANIFEST = '{"name":"omniroute","version":"3.8.55"}';
// Larger than the 1 MiB stream chunk, so a captured entry spans several chunks.
const BIG = Buffer.alloc(1_300_000, 0x61);

test(
  "reads ustar, pax and GNU long-name entries with their sizes and captured contents",
  withTarball(
    [
      entry({ name: "package/package.json" }, MANIFEST),
      // ustar: the path is split between the prefix and name fields.
      entry({ name: "server.js", prefix: "package/dist" }, "console.log(1);\n"),
      entry({ name: "package/dist/", type: "5" }),
      // pax global header: skipped, applies to nothing below.
      entry({ name: "pax_global_header", type: "g" }, paxRecord("comment", "npm")),
      // pax extended header: long path for the next entry.
      entry({ name: "PaxHeader/x", type: "x" }, paxRecord("path", LONG_NAME)),
      entry({ name: "package/dist/truncated-name.js" }, "abc"),
      // GNU long name: the name for the next entry; GNU magic, prefix field ignored.
      entry({ name: "././@LongLink", type: "L", gnu: true }, `${LONG_DIR}/gnu.js\0`),
      entry({ name: "package/dist/gnu-trunc", gnu: true }, "gnu!"),
      // GNU long link name: skipped.
      entry({ name: "././@LongLink", type: "K", gnu: true }, "target\0"),
      entry({ name: "package/dist/BUILD_SHA" }, "590c551\n"),
      entry({ name: "package/dist/big.bin" }, BIG),
      entry({ name: "package/empty.txt" }),
      // Old-style typeflag NUL is a regular file.
      entry({ name: "package/legacy.txt", type: "\0" }, "old"),
      entry({ name: "stray/outside.js" }, "1"),
    ],
    async (tarball) => {
      const contents = await readPackedTarball(tarball, {
        capture: ["package.json", "dist/BUILD_SHA", "dist/big.bin", "empty.txt", "missing"],
      });

      assert.equal(contents.filename, "fixture.tgz");
      assert.equal(contents.size, statSync(tarball).size, "packed size is the file size");
      assert.deepEqual(
        contents.files.map((file) => file.path),
        [
          "package.json",
          "dist/server.js",
          LONG_NAME.slice(NPM_TARBALL_ROOT.length),
          `${LONG_DIR.slice(NPM_TARBALL_ROOT.length)}/gnu.js`,
          "dist/BUILD_SHA",
          "dist/big.bin",
          "empty.txt",
          "legacy.txt",
          "stray/outside.js",
        ]
      );
      assert.equal(contents.entryCount, 9, "directories and meta headers are not entries");
      assert.equal(
        contents.unpackedSize,
        MANIFEST.length + 16 + 3 + 4 + 8 + BIG.length + 0 + 3 + 1
      );
      assert.equal(contents.captured["package.json"], MANIFEST);
      assert.equal(contents.captured["dist/BUILD_SHA"], "590c551\n");
      assert.equal(contents.captured["dist/big.bin"].length, BIG.length);
      assert.equal(contents.captured["empty.txt"], "");
      assert.equal("missing" in contents.captured, false);
    }
  )
);

test(
  "a pax size record overrides the header size",
  withTarball(
    [
      entry(
        { name: "PaxHeader/size", type: "x" },
        paxRecord("path", "package/dist/sized.js") + paxRecord("size", "5")
      ),
      // The header claims 0 bytes; the pax record says 5, and 5 bytes of data follow.
      Buffer.concat([tarHeader({ name: "package/x", size: 0 }), padded(Buffer.from("12345"))]),
      entry({ name: "package/after.txt" }, "ok"),
    ],
    async (tarball) => {
      const contents = await readPackedTarball(tarball, { capture: ["dist/sized.js"] });
      assert.deepEqual(contents.files, [
        { path: "dist/sized.js", size: 5 },
        { path: "after.txt", size: 2 },
      ]);
      assert.equal(contents.captured["dist/sized.js"], "12345");
    }
  )
);

test(
  "a base-256 size field is decoded",
  withTarball(
    [entry({ name: "package/b256.bin", base256Size: true }, "x".repeat(700))],
    async (tarball) => {
      const contents = await readPackedTarball(tarball);
      assert.deepEqual(contents.files, [{ path: "b256.bin", size: 700 }]);
    }
  )
);

test(
  "an archive without end-of-archive blocks still lists every complete entry",
  withTarball(
    [entry({ name: "package/package.json" }, MANIFEST)],
    async (tarball) => {
      const contents = await readPackedTarball(tarball);
      assert.equal(contents.entryCount, 1);
    },
    { endBlocks: false }
  )
);

test(
  "a tar cut inside an entry is reported as truncated",
  withTarball(
    [tarHeader({ name: "package/dist/server.js", size: 4096 }), Buffer.alloc(1000, 0x62)],
    async (tarball) => {
      await assert.rejects(
        readPackedTarball(tarball),
        /fixture\.tgz is truncated \(archive ends inside an entry\)/
      );
    },
    { endBlocks: false }
  )
);

test("a gzip stream cut short is rejected", async () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), "packed-tarball-contents-"));
  try {
    const whole = gzipSync(
      Buffer.concat([entry({ name: "package/a.bin" }, Buffer.alloc(200_000, 7)), END_OF_ARCHIVE])
    );
    const cut = path.join(dir, "cut.tgz");
    writeFileSync(cut, whole.subarray(0, Math.floor(whole.length / 2)));
    await assert.rejects(readPackedTarball(cut), /cannot read cut\.tgz as a gzipped tar: /);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test(
  "a header with a bad checksum is rejected",
  withTarball(
    [
      entry({ name: "package/package.json" }, MANIFEST),
      entry({ name: "package/corrupt.js", badChecksum: true }, "x"),
    ],
    async (tarball) => {
      await assert.rejects(
        readPackedTarball(tarball),
        /fixture\.tgz is not a valid tar archive \(bad header checksum\)/
      );
    }
  )
);

test(
  "a file that is not gzip is rejected",
  withTarball(
    [entry({ name: "package/package.json" }, MANIFEST)],
    async (tarball) => {
      await assert.rejects(readPackedTarball(tarball), /cannot read fixture\.tgz as a gzipped tar/);
    },
    { gzip: false }
  )
);

test("a missing tarball is rejected with its path", async () => {
  const absent = path.join(os.tmpdir(), "packed-tarball-contents-absent", "nope.tgz");
  await assert.rejects(
    readPackedTarball(absent),
    (error: Error) => error.message === `cannot read tarball ${absent} (ENOENT)`
  );
});

test("parsePaxRecords reads records and stops on malformed input", () => {
  const good = paxRecord("path", "package/a.js") + paxRecord("size", "12");
  assert.deepEqual(parsePaxRecords(Buffer.from(good)), { path: "package/a.js", size: "12" });
  // A record without "=" is skipped; parsing continues.
  assert.deepEqual(parsePaxRecords(Buffer.from(`11 novalue\n${paxRecord("k", "v")}`)), { k: "v" });
  // No length/space separator, or a non-numeric/zero length: stop instead of looping.
  assert.deepEqual(parsePaxRecords(Buffer.from("garbage")), {});
  assert.deepEqual(parsePaxRecords(Buffer.from("xx path=a\n")), {});
  assert.deepEqual(parsePaxRecords(Buffer.from("0 path=a\n")), {});
});

test("describeManifestMismatch covers match, mismatch, absent and invalid manifests", () => {
  const expected = { name: "omniroute", version: "3.8.55" };
  assert.deepEqual(describeManifestMismatch(MANIFEST, expected), []);
  assert.deepEqual(describeManifestMismatch('{"name":"omniroute","version":"3.8.54"}', expected), [
    'version "3.8.54" (expected "3.8.55")',
  ]);
  assert.deepEqual(describeManifestMismatch("null", expected), [
    'name "undefined" (expected "omniroute")',
    'version "undefined" (expected "3.8.55")',
  ]);
  assert.deepEqual(describeManifestMismatch(undefined, expected), [
    "no package/package.json (not an npm tarball?)",
  ]);
  assert.deepEqual(describeManifestMismatch("{not json", expected), [
    "package/package.json is not valid JSON",
  ]);
});
