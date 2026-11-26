// Pure verification layer of the signed Marketplace: index signature + validity window,
// package digest, and the private-staging archive extraction. Keys are generated here,
// never versioned.
import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { gzipSync } from "node:zlib";
import { buildTar, buildTarGz, pluginPackageEntries } from "../helpers/tarGzFixture.ts";

const integrity = await import("../../src/lib/plugins/marketplaceIntegrity.ts");
const archive = await import("../../src/lib/plugins/marketplaceArchive.ts");

const NOW = new Date("2026-11-26T12:00:00.000Z");
const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
const other = crypto.generateKeyPairSync("ed25519");

const sha256 = (bytes: Uint8Array) => crypto.createHash("sha256").update(bytes).digest("hex");
const sign = (bytes: Uint8Array, key = privateKey) =>
  crypto.sign(null, bytes, key).toString("base64");

function entry(overrides: Record<string, unknown> = {}) {
  return {
    name: "signed-fixture",
    version: "1.0.0",
    downloadUrl: "https://plugins.example.test/signed-fixture-1.0.0.tgz",
    checksum: "a".repeat(64),
    ...overrides,
  };
}

function indexBytes(overrides: Record<string, unknown> = {}): Buffer {
  return Buffer.from(
    JSON.stringify({
      issuedAt: "2026-11-26T00:00:00.000Z",
      expiresAt: "2026-12-26T00:00:00.000Z",
      plugins: [entry()],
      ...overrides,
    })
  );
}

function codeOf(fn: () => unknown): string | undefined {
  try {
    fn();
  } catch (error) {
    assert.ok(error instanceof integrity.MarketplaceIntegrityError, String(error));
    return error.code;
  }
  return undefined;
}

test.describe("verifyMarketplaceIndex", () => {
  test("accepts an index signed over its exact bytes", () => {
    const bytes = indexBytes();
    const index = integrity.verifyMarketplaceIndex(bytes, sign(bytes), [publicKey], NOW);
    assert.equal(index.plugins.length, 1);
    assert.equal(index.plugins[0].name, "signed-fixture");
    assert.equal(index.plugins[0].checksum, "a".repeat(64));
    assert.equal(index.issuedAt, "2026-11-26T00:00:00.000Z");
  });

  test("normalises an upper-case checksum to lower-case", () => {
    const bytes = indexBytes({ plugins: [entry({ checksum: "AB".repeat(32) })] });
    const index = integrity.verifyMarketplaceIndex(bytes, sign(bytes), [publicKey], NOW);
    assert.equal(index.plugins[0].checksum, "ab".repeat(32));
  });

  test("any trusted key may have signed it (rotation window)", () => {
    const bytes = indexBytes();
    integrity.verifyMarketplaceIndex(bytes, sign(bytes), [other.publicKey, publicKey], NOW);
  });

  test("a signature made by an untrusted key is refused", () => {
    const bytes = indexBytes();
    const code = codeOf(() =>
      integrity.verifyMarketplaceIndex(bytes, sign(bytes, other.privateKey), [publicKey], NOW)
    );
    assert.equal(code, "index_signature_invalid");
  });

  test("a single changed byte after signing is refused", () => {
    const bytes = indexBytes();
    const signature = sign(bytes);
    const tampered = Buffer.from(bytes);
    tampered[tampered.length - 3] ^= 0x01;
    assert.equal(
      codeOf(() => integrity.verifyMarketplaceIndex(tampered, signature, [publicKey], NOW)),
      "index_signature_invalid"
    );
  });

  test("a re-serialised (reformatted) index does not verify against the original signature", () => {
    const bytes = indexBytes();
    const signature = sign(bytes);
    const pretty = Buffer.from(JSON.stringify(JSON.parse(bytes.toString("utf8")), null, 2));
    assert.equal(
      codeOf(() => integrity.verifyMarketplaceIndex(pretty, signature, [publicKey], NOW)),
      "index_signature_invalid"
    );
  });

  test("empty, malformed and wrong-length signatures are refused", () => {
    const bytes = indexBytes();
    for (const bad of ["", "   ", "not base64 !!!", Buffer.alloc(10).toString("base64")]) {
      assert.equal(
        codeOf(() => integrity.verifyMarketplaceIndex(bytes, bad, [publicKey], NOW)),
        "index_signature_invalid",
        JSON.stringify(bad)
      );
    }
  });

  test("an empty trust list refuses everything, with a configuration error", () => {
    const bytes = indexBytes();
    assert.equal(
      codeOf(() => integrity.verifyMarketplaceIndex(bytes, sign(bytes), [], NOW)),
      "integrity_not_configured"
    );
  });

  test("a non-Ed25519 key is never accepted as a trust anchor", () => {
    const rsa = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });
    const bytes = indexBytes();
    assert.equal(
      codeOf(() => integrity.verifyMarketplaceIndex(bytes, sign(bytes), [rsa.publicKey], NOW)),
      "integrity_not_configured"
    );
  });

  test("an expired index is refused even with a valid signature", () => {
    const bytes = indexBytes({
      issuedAt: "2026-11-01T00:00:00.000Z",
      expiresAt: "2026-11-25T00:00:00.000Z",
    });
    assert.equal(
      codeOf(() => integrity.verifyMarketplaceIndex(bytes, sign(bytes), [publicKey], NOW)),
      "index_expired"
    );
  });

  test("an index issued in the future is refused", () => {
    const bytes = indexBytes({ issuedAt: "2026-12-01T00:00:00.000Z" });
    assert.equal(
      codeOf(() => integrity.verifyMarketplaceIndex(bytes, sign(bytes), [publicKey], NOW)),
      "index_not_yet_valid"
    );
  });

  test("a signed index must still pass the strict schema", () => {
    const cases: Array<[string, Record<string, unknown>]> = [
      ["missing checksum", { plugins: [entry({ checksum: undefined })] }],
      ["short checksum", { plugins: [entry({ checksum: "abc" })] }],
      ["non-hex checksum", { plugins: [entry({ checksum: "z".repeat(64) })] }],
      [
        "http download url",
        { plugins: [entry({ downloadUrl: "http://plugins.example.test/a.tgz" })] },
      ],
      ["file download url", { plugins: [entry({ downloadUrl: "file:///etc/passwd" })] }],
      [
        "credentials in url",
        { plugins: [entry({ downloadUrl: "https://u:p@plugins.example.test/a.tgz" })] },
      ],
      ["bad name", { plugins: [entry({ name: "../evil" })] }],
      ["bad version", { plugins: [entry({ version: "1.0" })] }],
      ["unknown entry field", { plugins: [entry({ extra: true })] }],
      ["unknown index field", { surprise: 1 }],
      ["duplicate name+version", { plugins: [entry(), entry()] }],
      ["missing expiry", { expiresAt: undefined }],
      ["expiry before issue", { expiresAt: "2026-11-01T00:00:00.000Z" }],
      ["plugins not an array", { plugins: {} }],
    ];
    for (const [label, overrides] of cases) {
      const bytes = indexBytes(overrides);
      assert.equal(
        codeOf(() => integrity.verifyMarketplaceIndex(bytes, sign(bytes), [publicKey], NOW)),
        "index_invalid",
        label
      );
    }
  });

  test("two versions of one plugin are allowed; non-JSON signed bytes are refused", () => {
    const two = indexBytes({ plugins: [entry(), entry({ version: "1.1.0" })] });
    assert.equal(
      integrity.verifyMarketplaceIndex(two, sign(two), [publicKey], NOW).plugins.length,
      2
    );
    const junk = Buffer.from("not json");
    assert.equal(
      codeOf(() => integrity.verifyMarketplaceIndex(junk, sign(junk), [publicKey], NOW)),
      "index_invalid"
    );
  });

  test("an oversized index is refused before the signature is even checked", () => {
    const big = Buffer.alloc(integrity.MARKETPLACE_INTEGRITY_LIMITS.maxIndexBytes + 1, 0x20);
    assert.equal(
      codeOf(() => integrity.verifyMarketplaceIndex(big, sign(big), [publicKey], NOW)),
      "index_invalid"
    );
  });
});

test.describe("resolveTrustedMarketplaceKeys", () => {
  const der = publicKey.export({ type: "spki", format: "der" }).toString("base64");
  const pem = other.publicKey.export({ type: "spki", format: "pem" }).toString();

  test("accepts base64-DER and PEM, skips malformed and retired keys", () => {
    const keys = integrity.resolveTrustedMarketplaceKeys(
      [
        { id: "current", publicKey: der },
        { id: "next", publicKey: pem },
        { id: "broken", publicKey: "###" },
        { id: "retired", publicKey: der, notAfter: "2026-11-01T00:00:00.000Z" },
      ],
      NOW
    );
    assert.equal(keys.length, 2);
  });

  test("the shipped trust list is empty until the owner provides the official key", () => {
    assert.deepEqual([...integrity.OFFICIAL_MARKETPLACE_TRUST.keys], []);
    assert.equal(integrity.OFFICIAL_MARKETPLACE_TRUST.indexUrl, "");
  });
});

test.describe("verifyMarketplaceArchive", () => {
  const bytes = Buffer.from("package bytes");

  test("accepts the exact digest, in either hex case", () => {
    integrity.verifyMarketplaceArchive(bytes, sha256(bytes));
    integrity.verifyMarketplaceArchive(bytes, sha256(bytes).toUpperCase());
  });

  test("a different digest, a missing digest and a malformed digest are all refused", () => {
    for (const expected of [sha256(Buffer.from("other")), "", "abc", undefined as never]) {
      assert.equal(
        codeOf(() => integrity.verifyMarketplaceArchive(bytes, expected)),
        "package_integrity_mismatch"
      );
    }
  });
});

test.describe("extractMarketplaceArchive", () => {
  let staging: string;
  test.beforeEach(() => {
    staging = fs.mkdtempSync(path.join(os.tmpdir(), "mp-archive-test-"));
  });
  test.afterEach(() => {
    fs.rmSync(staging, { recursive: true, force: true });
  });

  let lastStaging = "";
  // Each call gets its own empty staging directory, as the installer provides.
  const extract = (bytes: Buffer, name = "signed-fixture", version = "1.0.0") => {
    lastStaging = fs.mkdtempSync(path.join(staging, "run-"));
    return archive.extractMarketplaceArchive(bytes, lastStaging, { name, version });
  };

  const codeOfAsync = async (promise: Promise<unknown>) => {
    try {
      await promise;
    } catch (error) {
      assert.ok(error instanceof integrity.MarketplaceIntegrityError, String(error));
      return error.code;
    }
    return undefined;
  };

  test("extracts a flat package and returns the plugin root", async () => {
    const { pluginDir } = await extract(
      buildTarGz(pluginPackageEntries("signed-fixture", "1.0.0"))
    );
    assert.equal(
      fs.readFileSync(path.join(pluginDir, "index.js"), "utf8"),
      "module.exports = {};\n"
    );
    assert.equal(pluginDir, lastStaging);
  });

  test("extracts a package wrapped in one top-level directory", async () => {
    const { pluginDir } = await extract(
      buildTarGz(pluginPackageEntries("signed-fixture", "1.0.0", { directory: "package" }))
    );
    assert.equal(path.basename(pluginDir), "package");
    assert.ok(fs.existsSync(path.join(pluginDir, "plugin.json")));
  });

  test("accepts ./-prefixed names", async () => {
    const entries = pluginPackageEntries("signed-fixture", "1.0.0").map((e) => ({
      ...e,
      name: `./${e.name}`,
    }));
    const { pluginDir } = await extract(buildTarGz(entries));
    assert.ok(fs.existsSync(path.join(pluginDir, "plugin.json")));
  });

  test("the manifest must carry the signed name and version", async () => {
    const wrongVersion = buildTarGz(pluginPackageEntries("signed-fixture", "2.0.0"));
    assert.equal(await codeOfAsync(extract(wrongVersion)), "manifest_mismatch");
    const wrongName = buildTarGz(pluginPackageEntries("someone-else", "1.0.0"));
    assert.equal(await codeOfAsync(extract(wrongName)), "manifest_mismatch");
  });

  test("exactly one manifest is required", async () => {
    const none = buildTarGz([{ name: "index.js", content: "x" }]);
    assert.equal(await codeOfAsync(extract(none)), "manifest_invalid");
    const two = buildTarGz([
      ...pluginPackageEntries("signed-fixture", "1.0.0", { directory: "a" }),
      ...pluginPackageEntries("signed-fixture", "1.0.0", { directory: "b" }),
    ]);
    assert.equal(await codeOfAsync(extract(two)), "manifest_invalid");
    const garbage = buildTarGz([{ name: "plugin.json", content: "{not json" }]);
    assert.equal(await codeOfAsync(extract(garbage)), "manifest_invalid");
    const invalid = buildTarGz([{ name: "plugin.json", content: JSON.stringify({ name: "X" }) }]);
    assert.equal(await codeOfAsync(extract(invalid)), "manifest_invalid");
  });

  test("links, devices and unknown entry kinds are refused and nothing escapes", async () => {
    for (const type of ["2", "1", "3"] as const) {
      const bytes = buildTarGz([
        ...pluginPackageEntries("signed-fixture", "1.0.0"),
        { name: "evil", type, linkName: "/etc/passwd" },
      ]);
      assert.equal(await codeOfAsync(extract(bytes)), "archive_unsafe_entry", `type ${type}`);
    }
  });

  test("absolute, parent-relative, backslash and NUL paths are refused (zip-slip)", async () => {
    const outside = path.join(path.dirname(staging), `mp-escape-${process.pid}.txt`);
    for (const name of [
      "/tmp/abs.txt",
      "../escape.txt",
      "a/../../escape.txt",
      "a\\..\\escape.txt",
      "C:/windows/x.txt",
      "ok/\0bad.txt",
      outside,
    ]) {
      const bytes = buildTarGz([
        ...pluginPackageEntries("signed-fixture", "1.0.0"),
        { name, content: "pwn" },
      ]);
      assert.equal(await codeOfAsync(extract(bytes)), "archive_unsafe_entry", JSON.stringify(name));
    }
    assert.equal(fs.existsSync(outside), false);
    assert.equal(fs.existsSync(path.join(path.dirname(staging), "escape.txt")), false);
  });

  test("a duplicate path, or a file used as a directory, is refused", async () => {
    const dup = buildTarGz([
      ...pluginPackageEntries("signed-fixture", "1.0.0"),
      { name: "index.js", content: "second" },
    ]);
    assert.equal(await codeOfAsync(extract(dup)), "archive_unsafe_entry");
    const clash = buildTarGz([
      ...pluginPackageEntries("signed-fixture", "1.0.0"),
      { name: "index.js/inner.txt", content: "x" },
    ]);
    assert.equal(await codeOfAsync(extract(clash)), "archive_unsafe_entry");
  });

  test("entry-count and unpacked-size limits are enforced", async () => {
    const many = buildTarGz([
      ...pluginPackageEntries("signed-fixture", "1.0.0"),
      ...Array.from({ length: archive.MARKETPLACE_ARCHIVE_LIMITS.maxEntries + 1 }, (_, i) => ({
        name: `f${i}.txt`,
        content: "",
      })),
    ]);
    assert.equal(await codeOfAsync(extract(many)), "archive_limit_exceeded");

    const bomb = gzipSync(
      Buffer.alloc(archive.MARKETPLACE_ARCHIVE_LIMITS.maxUnpackedBytes + 1024 * 1024, 0)
    );
    assert.equal(await codeOfAsync(extract(bomb)), "archive_limit_exceeded");
    assert.deepEqual(fs.readdirSync(lastStaging), []);
  });

  test("invalid gzip, a truncated tar and a bad header checksum are refused", async () => {
    assert.equal(await codeOfAsync(extract(Buffer.from("not gzip"))), "archive_invalid");
    const tar = buildTar(pluginPackageEntries("signed-fixture", "1.0.0"));
    assert.equal(await codeOfAsync(extract(gzipSync(tar.subarray(0, 700)))), "archive_invalid");
    const corrupt = Buffer.from(tar);
    corrupt[0] ^= 0xff;
    assert.equal(await codeOfAsync(extract(gzipSync(corrupt))), "archive_invalid");
  });

  test("files are written with fixed non-executable permissions", async () => {
    const { pluginDir } = await extract(
      buildTarGz(pluginPackageEntries("signed-fixture", "1.0.0"))
    );
    if (process.platform !== "win32") {
      assert.equal(fs.statSync(path.join(pluginDir, "index.js")).mode & 0o111, 0);
    }
  });
});
