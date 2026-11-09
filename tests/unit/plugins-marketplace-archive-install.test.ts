import test, { mock } from "node:test";
import assert from "node:assert/strict";
import dnsPromises from "node:dns/promises";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { gzipSync } from "node:zlib";

// installMarketplacePlugin used to save the downloaded plugin.tar.gz into a temp
// folder and hand that folder to pluginManager.install, which looks for plugin.json
// and so never finds it: an archive entry could not be installed at all. The archive
// must be extracted into a staging folder first, with Zip Slip, duplicate-path, link
// and size checks, because the archive comes from a remote registry.
const root = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-mp-archive-"));
process.env.DATA_DIR = path.join(root, "data");
process.env.OMNIROUTE_PLUGINS_DIR = path.join(root, "plugins");
fs.mkdirSync(process.env.DATA_DIR, { recursive: true });

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { installMarketplacePlugin } = await import("../../src/lib/plugins/marketplace.ts");
const { pluginExists, deletePlugin } = await import("../../src/lib/db/plugins.ts");

const REGISTRY_URL = "https://registry.example.test/index.json";
const ARCHIVE_URL = "https://registry.example.test/plugin.tar.gz";
const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  mock.restoreAll();
  core.resetDbInstance();
  fs.rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type TarEntry = { name: string; data?: Buffer; type?: string; linkname?: string };

/** Minimal ustar writer; the tests need hostile names that `tar` itself refuses to write. */
function tar(entries: TarEntry[]): Buffer {
  const blocks: Buffer[] = [];
  for (const entry of entries) {
    const data = entry.data ?? Buffer.alloc(0);
    const header = Buffer.alloc(512);
    header.write(entry.name, 0, "utf8");
    header.write("0000644\0", 100);
    header.write("0000000\0", 108);
    header.write("0000000\0", 116);
    header.write(`${data.length.toString(8).padStart(11, "0")}\0`, 124);
    header.write("00000000000\0", 136);
    header.write("        ", 148);
    header.write(entry.type ?? "0", 156);
    if (entry.linkname) header.write(entry.linkname, 157, "utf8");
    header.write("ustar\0" + "00", 257, "latin1");
    let sum = 0;
    for (const byte of header) sum += byte;
    header.write(`${sum.toString(8).padStart(6, "0")}\0 `, 148);
    blocks.push(header, data, Buffer.alloc((512 - (data.length % 512)) % 512));
  }
  blocks.push(Buffer.alloc(1024));
  return Buffer.concat(blocks);
}

const manifest = (name: string) =>
  Buffer.from(JSON.stringify({ name, version: "1.0.0", main: "index.js" }));
const goodEntries = (name: string): TarEntry[] => [
  { name: "plugin.json", data: manifest(name) },
  { name: "index.js", data: Buffer.from("module.exports = {};") },
];

let counter = 0;
/** Serve `archive` for `name` through the registry and download URL, with no real network. */
async function install(archive: Buffer, name = `archive-plugin-${++counter}`) {
  mock.method(dnsPromises, "lookup", async () => [{ address: "93.184.216.34", family: 4 }]);
  await settingsDb.updateSettings({ pluginMarketplaceUrl: REGISTRY_URL });
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = String(input);
    if (url === REGISTRY_URL) {
      return new Response(
        JSON.stringify([
          {
            name,
            version: "1.0.0",
            description: "fixture",
            author: "test",
            license: "MIT",
            downloadUrl: ARCHIVE_URL,
            tags: [],
            downloads: 0,
            rating: 0,
            verified: false,
            lastUpdated: "2026-01-01",
          },
        ]),
        { headers: { "content-type": "application/json" } }
      );
    }
    if (url === ARCHIVE_URL) return new Response(new Uint8Array(archive));
    return new Response("unexpected", { status: 500 });
  }) as typeof fetch;
  try {
    return { name, result: await installMarketplacePlugin(name) };
  } finally {
    mock.restoreAll();
  }
}

async function rejection(archive: Buffer, pattern: RegExp) {
  const name = `archive-plugin-${++counter}`;
  await assert.rejects(() => install(archive, name), pattern);
  assert.equal(pluginExists(name), false, "a rejected archive installs nothing");
}

test("a plugin.tar.gz entry is extracted and installed", async () => {
  const { name, result } = await install(gzipSync(tar(goodEntries("placeholder"))), "good-archive");
  assert.equal(name, "good-archive");
  assert.deepEqual(result, { name: "placeholder", version: "1.0.0" });
  assert.ok(fs.existsSync(path.join(root, "plugins", "placeholder", "index.js")));
});

test("a package/ prefixed archive (npm pack layout) installs too", async () => {
  const entries = goodEntries("prefixed-plugin").map((entry) => ({
    ...entry,
    name: `package/${entry.name}`,
  }));
  const { result } = await install(gzipSync(tar(entries)));
  assert.equal(result.name, "prefixed-plugin");
});

test("a path that climbs out of the staging folder is rejected and writes nothing", async () => {
  const escaped = path.join(os.tmpdir(), "omniroute-zip-slip-probe.txt");
  fs.rmSync(escaped, { force: true });
  const entries = [
    ...goodEntries("slip-plugin"),
    { name: "../../omniroute-zip-slip-probe.txt", data: Buffer.from("pwned") },
  ];
  await rejection(gzipSync(tar(entries)), /unsafe path/i);
  assert.equal(fs.existsSync(escaped), false);
});

test("absolute and backslash paths are rejected", async () => {
  for (const name of ["/etc/omniroute-probe", "..\\evil.js", "a/../../b.js"]) {
    const entries = [...goodEntries("abs-plugin"), { name, data: Buffer.from("x") }];
    await rejection(gzipSync(tar(entries)), /unsafe path/i);
  }
});

test("duplicate paths are rejected, case-insensitively", async () => {
  const entries = [
    ...goodEntries("dup-plugin"),
    { name: "INDEX.js", data: Buffer.from("module.exports = { shadow: true };") },
  ];
  await rejection(gzipSync(tar(entries)), /duplicate/i);
});

test("link entries are rejected", async () => {
  const entries = [...goodEntries("link-plugin"), { name: "escape", type: "2", linkname: "/etc" }];
  await rejection(gzipSync(tar(entries)), /link|unsupported/i);
});

test("an archive that expands past the size cap is rejected", async () => {
  const entries = [
    ...goodEntries("bomb-plugin"),
    { name: "filler.bin", data: Buffer.alloc(40 * 1024 * 1024) },
  ];
  const archive = gzipSync(tar(entries));
  assert.ok(archive.length < 1024 * 1024, "the fixture is a small download");
  await rejection(archive, /too large|exceeds/i);
});

test("archives written by the system tar install, with long names and a package/ folder entry", async () => {
  const src = fs.mkdtempSync(path.join(root, "src-"));
  const long = path.join("d".repeat(60), "e".repeat(60));
  fs.mkdirSync(path.join(src, "package", long), { recursive: true });
  fs.writeFileSync(path.join(src, "package", "plugin.json"), manifest("system-tar-plugin"));
  fs.writeFileSync(path.join(src, "package", "index.js"), "module.exports = {};");
  fs.writeFileSync(path.join(src, "package", long, "long.txt"), "ok");
  for (const format of ["pax", "gnu"]) {
    const out = path.join(src, `${format}.tgz`);
    const made = spawnSync("tar", [`--format=${format}`, "-czf", out, "-C", src, "package"]);
    if (made.status !== 0) continue; // no system tar to compare with
    const { result } = await install(fs.readFileSync(out), `system-tar-${format}`);
    assert.equal(result.name, "system-tar-plugin");
    const extracted = path.join(root, "plugins", "system-tar-plugin");
    assert.ok(fs.existsSync(path.join(extracted, long, "long.txt")), `${format} long path`);
    deletePlugin("system-tar-plugin");
    fs.rmSync(extracted, { recursive: true, force: true });
  }
});
