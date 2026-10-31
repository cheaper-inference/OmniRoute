import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { parseSubscription } from "../../src/lib/proxySubscription/parse.ts";

function feed(body: string) {
  return parseSubscription(body);
}

test("two healthy sources render nodes from both", async () => {
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-multi-two-"));
  const origWarn = console.warn;
  const warned: string[] = [];
  console.warn = (...args: unknown[]) => {
    warned.push(args.map(String).join(" "));
  };
  try {
    const target = path.join(dir, "core.json");
    fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
    const first = feed("vless://user-a@203.0.113.10:443#alpha");
    const second = feed("vless://user-b@203.0.113.11:443#beta");
    const res = await sync.generateCoreConfigIntentionMulti(
      { coreConfigPath: target, localCoreEndpoint: "socks5://127.0.0.1:1080 selector=solo" },
      [first, second]
    );
    assert.equal(res.warning, null);
    const generated = JSON.parse(fs.readFileSync(`${target}.generated`, "utf8"));
    const tags = JSON.stringify(generated.outbounds);
    assert.ok(tags.includes("alpha"));
    assert.ok(tags.includes("beta"));
    assert.equal(res.perSource[0].rendered, 1);
    assert.equal(res.perSource[1].rendered, 1);
    assert.equal(warned.length, 0);
  } finally {
    console.warn = origWarn;
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("one failing source isolates its skips while the other renders", async () => {
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-multi-partial-"));
  try {
    const target = path.join(dir, "core.json");
    fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
    const healthy = feed("vless://user-a@203.0.113.10:443#alpha");
    const failing = feed("not a subscription at all !!!");
    assert.equal(failing.format, "unknown");
    const res = await sync.generateCoreConfigIntentionMulti(
      { coreConfigPath: target, localCoreEndpoint: "socks5://127.0.0.1:1080 selector=solo" },
      [healthy, failing]
    );
    assert.ok(res.perSource[1].skipped > 0);
    const generated = JSON.parse(fs.readFileSync(`${target}.generated`, "utf8"));
    const tags = JSON.stringify(generated.outbounds);
    assert.ok(tags.includes("alpha"));
    assert.equal(res.perSource[1].usable, false);
    assert.equal(res.perSource[0].rendered, 1);
    assert.ok(res.warning?.includes("CORE_CONFIG_ENTRIES_SKIPPED"));
    const partialWarning = JSON.parse(res.warning!);
    assert.ok(partialWarning.detail.includes("source_unavailable=1"));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("all sources failing leaves empty groups with per-source reasons", async () => {
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-multi-allfail-"));
  try {
    const target = path.join(dir, "core.json");
    fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
    const failing = feed("not a subscription at all !!!");
    const res = await sync.generateCoreConfigIntentionMulti(
      { coreConfigPath: target, localCoreEndpoint: "socks5://127.0.0.1:1080 selector=solo" },
      [failing, failing]
    );
    assert.ok(res.warning?.includes("CORE_CONFIG_ENTRIES_SKIPPED"));
    const parsed = JSON.parse(res.warning!);
    assert.ok(parsed.detail.includes("source_unavailable=2"));
    assert.equal(res.perSource.length, 2);
    assert.ok(res.perSource.every((row: { usable: boolean }) => row.usable === false));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("same logical node under two spellings renders once and counts the duplicate", async () => {
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const first = feed("vless://user@203.0.113.30:443#alpha");
  const second = feed("vless://user@203.0.113.30:443#alpha?ignored-param");
  assert.equal(first.format !== "unknown" && second.format !== "unknown", true);
  const merged = sync.mergeParsedSources([first, second]);
  const totalRendered = merged.nodes.length + merged.needsCore.length;
  assert.equal(totalRendered, 1);
  assert.equal(merged.skipped.length, 0);
  assert.equal(merged.perSource[1].duplicates, 1);
});

test("duplicate node across sources renders once and counts the duplicate", async () => {
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-multi-dupe-"));
  try {
    const target = path.join(dir, "core.json");
    fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
    const first = feed("vless://shared-user@203.0.113.20:443#shared");
    const second = feed("vless://shared-user@203.0.113.20:443#shared");
    const res = await sync.generateCoreConfigIntentionMulti(
      { coreConfigPath: target, localCoreEndpoint: "socks5://127.0.0.1:1080 selector=solo" },
      [first, second]
    );
    const merged = sync.mergeParsedSources([first, second]);
    const totalRendered = merged.nodes.length + merged.needsCore.length;
    assert.equal(totalRendered, 1);
    assert.equal(res.perSource[0].rendered, 1);
    assert.equal(res.perSource[1].rendered, 0);
    assert.equal(res.perSource[1].skipped, 0);
    assert.equal(res.perSource[1].duplicates, 1);
    // A duplicate loses nothing: it never raises the skipped-entries warning.
    assert.equal(res.warning ?? "", "");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
