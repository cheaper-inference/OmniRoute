// Unit tests for the probeTool version cache (core/version-cache.mjs).
import { after, test } from "node:test";
import assert from "node:assert/strict";
import {
  mkdtempSync,
  rmSync,
  writeFileSync,
  chmodSync,
  symlinkSync,
  existsSync,
  statSync,
  utimesSync,
  readFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const CORE = join(process.cwd(), "bin", "cli", "launch", "core");
const { probeTool } = await import(pathToFileURL(join(CORE, "resolve-bin.mjs")).href);

const dirs: string[] = [];
function tmp(): string {
  const dir = mkdtempSync(join(tmpdir(), "launch-vcache-"));
  dirs.push(dir);
  return dir;
}
after(() => {
  for (const dir of dirs) rmSync(dir, { recursive: true, force: true });
});

function adapter(gate: Record<string, unknown> = { args: ["--version"], min: "1.0.0" }): any {
  return { id: "fake", binaries: ["fake"], capabilities: { versionGate: gate } };
}

function makeBin(dir: string, name: string, body: string): string {
  const path = join(dir, name);
  writeFileSync(path, body);
  chmodSync(path, 0o755);
  return path;
}

function counter(output: string | (() => string)) {
  const state = { calls: 0 };
  const runVersion = async () => {
    state.calls += 1;
    return typeof output === "function" ? output() : output;
  };
  return { state, runVersion };
}

test("second probe is served from cache with the same result", async () => {
  const dir = tmp();
  const bin = { command: makeBin(dir, "tool", "#!/bin/sh\necho 2.0.0\n"), shell: false };
  const { state, runVersion } = counter("fake 2.0.0");
  const deps = { cacheDir: join(dir, "state"), runVersion };
  const first = await probeTool(adapter(), bin, deps);
  const second = await probeTool(adapter(), bin, deps);
  assert.equal(state.calls, 1);
  assert.deepEqual(second, first);
  assert.equal(first.version, "2.0.0");
});

test("cache file has no secrets and is mode 0600", async () => {
  if (process.platform === "win32") return;
  const dir = tmp();
  const bin = { command: makeBin(dir, "tool", "#!/bin/sh\n"), shell: false };
  const cacheDir = join(dir, "state");
  await probeTool(adapter(), bin, { cacheDir, runVersion: counter("2.0.0").runVersion });
  const file = join(cacheDir, "version-cache.json");
  assert.equal(statSync(file).mode & 0o777, 0o600);
  const data = JSON.parse(readFileSync(file, "utf8"));
  const [entry] = Object.values(data.entries) as any[];
  assert.deepEqual(Object.keys(entry).sort(), ["at", "path", "version"]);
});

test("changed mtime or size re-probes", async () => {
  const dir = tmp();
  const path = makeBin(dir, "tool", "#!/bin/sh\n");
  const bin = { command: path, shell: false };
  const { state, runVersion } = counter("2.0.0");
  const deps = { cacheDir: join(dir, "state"), runVersion };
  await probeTool(adapter(), bin, deps);
  utimesSync(path, new Date(), new Date(Date.now() + 5000));
  await probeTool(adapter(), bin, deps);
  assert.equal(state.calls, 2);
  writeFileSync(path, "#!/bin/sh\n# bigger\n");
  await probeTool(adapter(), bin, deps);
  assert.equal(state.calls, 3);
});

test("a retargeted symlink re-probes", async () => {
  if (process.platform === "win32") return;
  const dir = tmp();
  const a = makeBin(dir, "a", "#!/bin/sh\n# a\n");
  const b = makeBin(dir, "b", "#!/bin/sh\n# bbbbbbbb\n");
  const link = join(dir, "link");
  symlinkSync(a, link);
  const bin = { command: link, shell: false };
  const { state, runVersion } = counter("2.0.0");
  const deps = { cacheDir: join(dir, "state"), runVersion };
  await probeTool(adapter(), bin, deps);
  await probeTool(adapter(), bin, deps);
  assert.equal(state.calls, 1);
  rmSync(link);
  symlinkSync(b, link);
  await probeTool(adapter(), bin, deps);
  assert.equal(state.calls, 2);
});

test("a different gate (args or pattern) re-probes", async () => {
  const dir = tmp();
  const bin = { command: makeBin(dir, "tool", "#!/bin/sh\n"), shell: false };
  const { state, runVersion } = counter("2.0.0");
  const deps = { cacheDir: join(dir, "state"), runVersion };
  await probeTool(adapter(), bin, deps);
  await probeTool(adapter({ args: ["-V"], min: "1.0.0" }), bin, deps);
  await probeTool(adapter({ args: ["--version"], pattern: "(\\d+\\.\\d+\\.\\d+)" }), bin, deps);
  assert.equal(state.calls, 3);
});

test("refreshCache probes again and updates the entry", async () => {
  const dir = tmp();
  const bin = { command: makeBin(dir, "tool", "#!/bin/sh\n"), shell: false };
  let out = "2.0.0";
  const { state, runVersion } = counter(() => out);
  const deps = { cacheDir: join(dir, "state"), runVersion };
  await probeTool(adapter(), bin, deps);
  out = "3.0.0";
  const refreshed = await probeTool(adapter(), bin, { ...deps, refreshCache: true });
  assert.equal(state.calls, 2);
  assert.equal(refreshed.version, "3.0.0");
  const cached = await probeTool(adapter(), bin, deps);
  assert.equal(state.calls, 2);
  assert.equal(cached.version, "3.0.0");
});

test("no cacheDir means no file and always probes", async () => {
  const dir = tmp();
  const bin = { command: makeBin(dir, "tool", "#!/bin/sh\n"), shell: false };
  const { state, runVersion } = counter("2.0.0");
  await probeTool(adapter(), bin, { runVersion });
  await probeTool(adapter(), bin, { runVersion });
  assert.equal(state.calls, 2);
  assert.equal(existsSync(join(dir, "version-cache.json")), false);
});

test("an undefined version is never cached", async () => {
  const dir = tmp();
  const bin = { command: makeBin(dir, "tool", "#!/bin/sh\n"), shell: false };
  const cacheDir = join(dir, "state");
  const { state, runVersion } = counter("no version here");
  await probeTool(adapter(), bin, { cacheDir, runVersion });
  await probeTool(adapter(), bin, { cacheDir, runVersion });
  assert.equal(state.calls, 2);
  assert.equal(existsSync(join(cacheDir, "version-cache.json")), false);
});

test("shell shims are never cached", async () => {
  const dir = tmp();
  const bin = { command: makeBin(dir, "tool.cmd", "x"), shell: true };
  const cacheDir = join(dir, "state");
  const { state, runVersion } = counter("2.0.0");
  await probeTool(adapter(), bin, { cacheDir, runVersion });
  await probeTool(adapter(), bin, { cacheDir, runVersion });
  assert.equal(state.calls, 2);
  assert.equal(existsSync(join(cacheDir, "version-cache.json")), false);
});

test("the min-version gate still throws on a cache hit", async () => {
  const dir = tmp();
  const bin = { command: makeBin(dir, "tool", "#!/bin/sh\n"), shell: false };
  const cacheDir = join(dir, "state");
  const { state, runVersion } = counter("0.5.0");
  const gateAdapter = adapter({ args: ["--version"], min: "1.0.0" });
  await assert.rejects(probeTool(gateAdapter, bin, { cacheDir, runVersion }), {
    code: "ToolVersionTooOld",
  });
  assert.equal(state.calls, 1);
  // The too-old version was cached; the gate must still reject without a spawn.
  await assert.rejects(probeTool(gateAdapter, bin, { cacheDir, runVersion }), {
    code: "ToolVersionTooOld",
  });
  assert.equal(state.calls, 1);
});

test("an expired entry re-probes", async () => {
  const dir = tmp();
  const bin = { command: makeBin(dir, "tool", "#!/bin/sh\n"), shell: false };
  const { state, runVersion } = counter("2.0.0");
  let t = 1_000_000;
  const deps = { cacheDir: join(dir, "state"), runVersion, now: () => t };
  await probeTool(adapter(), bin, deps);
  t += 23 * 3600 * 1000;
  await probeTool(adapter(), bin, deps);
  assert.equal(state.calls, 1);
  t += 2 * 3600 * 1000;
  await probeTool(adapter(), bin, deps);
  assert.equal(state.calls, 2);
});

test("a corrupt cache file falls back silently", async () => {
  const dir = tmp();
  const bin = { command: makeBin(dir, "tool", "#!/bin/sh\n"), shell: false };
  const cacheDir = join(dir, "state");
  const { state, runVersion } = counter("2.0.0");
  await probeTool(adapter(), bin, { cacheDir, runVersion });
  writeFileSync(join(cacheDir, "version-cache.json"), "{not json");
  const res = await probeTool(adapter(), bin, { cacheDir, runVersion });
  assert.equal(res.version, "2.0.0");
  assert.equal(state.calls, 2);
  writeFileSync(join(cacheDir, "version-cache.json"), JSON.stringify({ entries: [1, 2] }));
  await probeTool(adapter(), bin, { cacheDir, runVersion });
  assert.equal(state.calls, 3);
});

test("the cache keeps at most 64 entries", async () => {
  const dir = tmp();
  const cacheDir = join(dir, "state");
  let t = 1000;
  for (let i = 0; i < 70; i++) {
    const bin = { command: makeBin(dir, `tool${i}`, `#!/bin/sh\n# ${i}\n`), shell: false };
    t += 1;
    await probeTool(adapter(), bin, {
      cacheDir,
      runVersion: counter("2.0.0").runVersion,
      now: () => t,
    });
  }
  const data = JSON.parse(readFileSync(join(cacheDir, "version-cache.json"), "utf8"));
  assert.equal(Object.keys(data.entries).length, 64);
});
