import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

globalThis.fetch = () => {
  throw new Error("network access in tests");
};

const { SOCIAL_DENYLIST, loadManifest, validateManifest } =
  await import("../../scripts/quality/catalog-drift/manifest.mjs");

function manifest() {
  return {
    schemaVersion: 1,
    reviewedAt: "2026-11-09",
    allowedHosts: ["api.example.com"],
    probes: [
      {
        id: "a",
        provider: "example",
        type: "model-list",
        source: "public-api",
        url: "https://api.example.com/v1/models",
        addedAt: "2026-11-09",
        minIds: 1,
      },
    ],
  };
}

test("accepts a minimal valid manifest", () => {
  assert.deepEqual(validateManifest(manifest()), []);
});

test("rejects duplicate probe ids", () => {
  const m = manifest();
  m.probes.push({ ...m.probes[0] });
  assert.ok(validateManifest(m).includes("duplicate probe id: a"));
});

test("rejects ids that are not kebab-case", () => {
  const m = manifest();
  m.probes[0].id = "Bad_Id";
  assert.ok(validateManifest(m).includes("invalid probe id: Bad_Id"));
});

test("rejects non-https urls", () => {
  const m = manifest();
  m.probes[0].url = "http://api.example.com/v1/models";
  assert.ok(validateManifest(m).includes("a: url must be https"));
});

test("rejects hosts outside allowedHosts", () => {
  const m = manifest();
  m.probes[0].url = "https://other.example.com/v1/models";
  assert.ok(validateManifest(m).includes("a: host not allowed: other.example.com"));
});

test("rejects social platforms even when allowed", () => {
  const hosts = [
    "x.com",
    "twitter.com",
    "reddit.com",
    "old.reddit.com",
    "discord.com",
    "discord.gg",
    "t.me",
    "telegram.org",
    "linux.do",
    "youtube.com",
  ];
  assert.deepEqual([...SOCIAL_DENYLIST].sort(), [...hosts].sort());
  for (const host of hosts) {
    const m = manifest();
    m.allowedHosts.push(host);
    m.probes[0].url = `https://${host}/v1/models`;
    assert.ok(validateManifest(m).includes("a: social platform hosts are never probed"), host);
  }
});

test("rejects credentials in the url", () => {
  for (const url of [
    "https://api.example.com/v1/models?api_key=1",
    "https://user:pw@api.example.com/",
  ]) {
    const m = manifest();
    m.probes[0].url = url;
    assert.ok(validateManifest(m).includes("a: url must not carry credentials"));
  }
});

test("requires type-specific fields", () => {
  const m = manifest();
  const cases = [
    ["model-list", "minIds >= 1"],
    ["json-assert", "assertions"],
    ["page-text", "at least one check"],
  ];
  for (const [type, field] of cases) {
    const probe = { ...m.probes[0], type, minIds: undefined };
    assert.ok(validateManifest({ ...m, probes: [probe] }).includes(`a: ${type} needs ${field}`));
  }
});

test("rejects unknown assertion ops", () => {
  const m = manifest();
  const probe = {
    ...m.probes[0],
    type: "json-assert",
    assertions: [{ path: "data", op: "matches" }],
  };
  assert.ok(
    validateManifest({ ...m, probes: [probe] }).includes("a: unknown assertion op: matches")
  );
});

test("validates backs", () => {
  const m = manifest();
  for (const monthlyTokens of [-1, 1.5]) {
    const probe = { ...m.probes[0], backs: [{ provider: "example", monthlyTokens }] };
    assert.ok(
      validateManifest({ ...m, probes: [probe] }).includes(
        "a: backs.monthlyTokens must be a non-negative integer"
      )
    );
  }
});

test("loadManifest throws with every error joined", (t) => {
  mkdirSync("_artifacts", { recursive: true });
  const dir = mkdtempSync("_artifacts/catalog-drift-manifest-");
  t.after(() => rmSync(dir, { recursive: true }));
  const m = manifest();
  m.probes.push({ ...m.probes[0], url: "http://api.example.com/" });
  const file = join(dir, "manifest.json");
  writeFileSync(file, JSON.stringify(m));
  assert.throws(() => loadManifest(file), /duplicate probe id[\s\S]*url must be https/);
});
