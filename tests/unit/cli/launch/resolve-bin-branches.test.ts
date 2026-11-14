// Branch coverage for resolveBinary / probeTool / applyVersionGate (core/resolve-bin.mjs).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyVersionGate,
  probeTool,
  resolveBinary,
} from "../../../../bin/cli/launch/core/resolve-bin.mjs";

function adapter(gate?: object, install?: object) {
  return {
    id: "tool",
    binaries: ["a", "b"],
    capabilities: { versionGate: gate, install },
  } as never;
}

test("resolveBinary win32 prefers exe, then cmd shim through shell", async () => {
  const exe = await resolveBinary(adapter(), {
    platform: "win32",
    probe: async () => ["C:\\x\\a.cmd", "C:\\x\\a.EXE"],
  });
  assert.deepEqual(exe, { command: "C:\\x\\a.EXE", shell: false });
  const shim = await resolveBinary(adapter(), {
    platform: "win32",
    probe: async () => "C:\\x\\a.bat" as never,
  });
  assert.deepEqual(shim, { command: "C:\\x\\a.bat", shell: true });
});

test("resolveBinary win32 falls through to the next binary name", async () => {
  const seen: string[] = [];
  const r = await resolveBinary(adapter(), {
    platform: "win32",
    probe: async (n: string) => (seen.push(n), n === "b" ? ["b.exe"] : []),
  });
  assert.deepEqual(seen, ["a", "b"]);
  assert.deepEqual(r, { command: "b.exe", shell: false });
});

test("resolveBinary posix uses which with env PATH, and throws ToolNotFound with hint", async () => {
  const r = await resolveBinary(adapter(), {
    platform: "linux",
    which: (n: string) => (n === "b" ? "/bin/b" : null),
  });
  assert.deepEqual(r, { command: "/bin/b", shell: false });
  await assert.rejects(
    resolveBinary(adapter(undefined, { commands: { linux: ["npm i -g x"] }, url: "https://x" }), {
      platform: "linux",
      which: () => null,
    }),
    (e: { code?: string; message: string; hint?: string }) => {
      assert.match(e.message, /tool: binary not found \(a, b\)/);
      assert.equal(e.hint, "install with: npm i -g x; https://x");
      return true;
    }
  );
});

test("probeTool without a gate returns empty result and never runs", async () => {
  const r = await probeTool(
    adapter(),
    { command: "x", shell: false },
    {
      runVersion: async () => assert.fail("must not run"),
    }
  );
  assert.deepEqual(r, { version: undefined, features: {}, warnings: [] });
});

test("probeTool runs the command, parses and applies the gate", async () => {
  const gate = { args: ["-v"], pattern: /(\d+\.\d+\.\d+)/, features: { f: "2.0.0" } };
  const calls: unknown[] = [];
  const r = await probeTool(
    adapter(gate),
    { command: "x", shell: true },
    {
      platform: "linux",
      runVersion: async (...a: unknown[]) => (calls.push(a), "tool 2.1.0\n"),
    }
  );
  assert.equal(r.version, "2.1.0");
  assert.deepEqual(r.features, { f: true });
  assert.deepEqual(calls[0], ["x", ["-v"], { shell: true, platform: "linux", env: undefined }]);
});

test("applyVersionGate: no gate, unknown version, too old, recommended", () => {
  assert.deepEqual(applyVersionGate(adapter(), "1.0.0", "linux"), { features: {}, warnings: [] });
  const gate = { min: "2.0.0", recommended: "3.0.0", features: { f: "2.5.0" } };
  const unknown = applyVersionGate(adapter(gate), undefined, "linux");
  assert.deepEqual(unknown.features, { f: true });
  assert.deepEqual(unknown.warnings, [
    "tool: could not read the tool version; assuming a supported one",
  ]);
  const noBounds = applyVersionGate(adapter({ features: { f: "1.0.0" } }), undefined, "linux");
  assert.deepEqual(noBounds, { features: { f: false }, warnings: [] });
  assert.throws(
    () => applyVersionGate(adapter(gate, { commands: { any: ["up"] } }), "1.0.0", "linux"),
    (e: { message: string; hint?: string }) => {
      assert.equal(e.message, "tool 1.0.0 is too old; need 2.0.0 or newer");
      assert.equal(e.hint, "install with: up");
      return true;
    }
  );
  const rec = applyVersionGate(adapter(gate), "2.6.0", "linux");
  assert.deepEqual(rec.features, { f: true });
  assert.deepEqual(rec.warnings, ["tool 2.6.0 works, but 3.0.0 or newer is recommended"]);
  assert.deepEqual(applyVersionGate(adapter(gate), "3.0.0", "linux").warnings, []);
});
