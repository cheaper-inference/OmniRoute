import test, { mock } from "node:test";
import assert from "node:assert/strict";
import dnsPromises from "node:dns/promises";
import fs from "node:fs";
import http from "node:http";
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
const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
const { pluginExists, deletePlugin, getPluginByName } = await import("../../src/lib/db/plugins.ts");

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
/** Serve `archive` (or the response `archive()` returns) for `name` through the registry and download URL. */
async function install(
  archive: Buffer | (() => Promise<Response>),
  name = `archive-plugin-${++counter}`
) {
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
    if (url === ARCHIVE_URL) {
      return typeof archive === "function" ? archive() : new Response(new Uint8Array(archive));
    }
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
  const { name, result } = await install(
    gzipSync(tar(goodEntries("good-archive"))),
    "good-archive"
  );
  assert.equal(name, "good-archive");
  assert.deepEqual(result, { name: "good-archive", version: "1.0.0" });
  assert.ok(fs.existsSync(path.join(root, "plugins", "good-archive", "index.js")));
});

test("a package/ prefixed archive (npm pack layout) installs too", async () => {
  const entries = goodEntries("prefixed-plugin").map((entry) => ({
    ...entry,
    name: `package/${entry.name}`,
  }));
  const { result } = await install(gzipSync(tar(entries)), "prefixed-plugin");
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
    const { result } = await install(fs.readFileSync(out), "system-tar-plugin");
    assert.equal(result.name, "system-tar-plugin");
    const extracted = path.join(root, "plugins", "system-tar-plugin");
    assert.ok(fs.existsSync(path.join(extracted, long, "long.txt")), `${format} long path`);
    deletePlugin("system-tar-plugin");
    fs.rmSync(extracted, { recursive: true, force: true });
  }
});

test("a download past the byte cap is refused, no longer read, and installs nothing", async () => {
  // A chunked body with no Content-Length: only a cap on the bytes read can stop it.
  const total = 128 * 1024 * 1024;
  const chunk = Buffer.alloc(64 * 1024);
  let sent = 0;
  const server = http.createServer((_req, res) => {
    const pump = () => {
      while (sent < total) {
        sent += chunk.length;
        if (!res.write(chunk)) return void res.once("drain", pump);
      }
      res.end();
    };
    pump();
  });
  await new Promise<void>((done) => server.listen(0, "127.0.0.1", done));
  const { port } = server.address() as import("node:net").AddressInfo;
  const name = `big-download-${++counter}`;
  try {
    await assert.rejects(
      () => install(() => originalFetch(`http://127.0.0.1:${port}/plugin.tar.gz`), name),
      /download is too large/i
    );
    assert.ok(sent < total, `the download was cut short (${sent} of ${total} bytes sent)`);
    assert.equal(pluginExists(name), false, "a refused download installs nothing");
  } finally {
    server.closeAllConnections();
    await new Promise((done) => server.close(done));
  }
});

test("an archive whose plugin.json names another plugin is refused and the installed one is unchanged", async () => {
  // Without the name check, pluginManager.install() sees "victim" installed at 1.0.0, the archive's
  // 2.0.0 as newer, and upgrades (replaces) it: one listing could overwrite a different plugin.
  const victim = `victim-plugin-${++counter}`;
  await install(gzipSync(tar(goodEntries(victim))), victim);
  const before = getPluginByName(victim);
  const upgrade = Buffer.from(JSON.stringify({ name: victim, version: "2.0.0", main: "index.js" }));
  const entries = [
    { name: "plugin.json", data: upgrade },
    { name: "index.js", data: Buffer.from("module.exports = { replaced: true };") },
  ];
  await assert.rejects(
    () => install(gzipSync(tar(entries)), `listed-as-another-${++counter}`),
    /does not match/i
  );
  const after = getPluginByName(victim);
  assert.equal(after?.version, "1.0.0");
  assert.equal(after?.id, before?.id);
  assert.equal(
    fs.readFileSync(path.join(root, "plugins", victim, "index.js"), "utf8"),
    "module.exports = {};"
  );
});

/** A plugin.json + index.js pair that asks to be activated on install. */
const autoActivating = (name: string, version = "1.0.0"): TarEntry[] => [
  {
    name: "plugin.json",
    data: Buffer.from(JSON.stringify({ name, version, main: "index.js", enabledByDefault: true })),
  },
  { name: "index.js", data: Buffer.from("module.exports = {};") },
];

test("a marketplace install and upgrade leave an enabledByDefault plugin inactive; a local install activates it", async () => {
  const local = `local-auto-${++counter}`;
  const market = `market-auto-${++counter}`;
  try {
    // Local installs keep today's behaviour: enabledByDefault activates at once.
    const source = fs.mkdtempSync(path.join(root, "local-src-"));
    for (const entry of autoActivating(local)) {
      fs.writeFileSync(path.join(source, entry.name), entry.data!);
    }
    assert.equal((await pluginManager.install(source)).name, local);
    assert.equal(getPluginByName(local)?.status, "active");

    // Marketplace installs of the same manifest stay inactive and show as not enabled.
    await install(gzipSync(tar(autoActivating(market))), market);
    for (const row of [getPluginByName(market)]) {
      assert.equal(row?.status, "installed");
      assert.equal(row?.enabled, 0);
    }
    assert.equal(pluginManager.getLoaded(market), undefined);

    // An upgrade from the listing does not activate the plugin either.
    await install(gzipSync(tar(autoActivating(market, "2.0.0"))), market);
    assert.equal(getPluginByName(market)?.version, "2.0.0");
    assert.notEqual(getPluginByName(market)?.status, "active");
    assert.equal(pluginManager.getLoaded(market), undefined);
  } finally {
    await pluginManager.uninstall(local).catch(() => {});
    await pluginManager.uninstall(market).catch(() => {});
  }
});
