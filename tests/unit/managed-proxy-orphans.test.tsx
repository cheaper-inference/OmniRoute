// @vitest-environment node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, expect, test, vi } from "vitest";

const state = vi.hoisted(() => ({ running: false, calls: [] as string[], root: "" }));
vi.mock("../../src/lib/services/managedProxy/runtime", () => ({
  isManagedRunning: () => state.running,
  stopManaged: async () => {
    state.calls.push("stop");
    state.running = false;
  },
  startManaged: async () => {
    state.calls.push("start");
    state.running = true;
  },
  checkNative: async () => {
    state.calls.push("check");
  },
}));
vi.mock("../../src/lib/services/managedProxy/install", () => ({
  installManagedCore: async (_core: string, _root: string, download: boolean) => {
    expect(download).toBe(false);
    state.calls.push("installed");
    return "synthetic-never-executed";
  },
}));
vi.mock("../../src/lib/services/managedProxy/manager", () => ({
  managedRoot: () => state.root,
  withManagedLock: async (_core: string, _root: string, action: () => Promise<unknown>) => action(),
  readManagedManifest: (text: string | null) => (text ? JSON.parse(text).entries : []),
  managedListeners: (_core: string, entries: { id: string; port: number }[]) =>
    entries.map((entry) => ({
      ...entry,
      outbound: { type: "socks", server: "example.invalid", server_port: 9 },
    })),
}));
const { removeManagedProxy } = await import("../../src/lib/services/managedProxy/remove");
const previousDataDir = process.env.DATA_DIR;
/**
 * Reset deletion state and create optional saved sources and config in an isolated data directory.
 */
function fixture(entries?: { id: string; port: number }[], config = true) {
  state.root = fs.mkdtempSync(path.join(os.tmpdir(), "managed-orphans-"));
  process.env.DATA_DIR = state.root;
  state.calls = [];
  fs.mkdirSync(path.join(state.root, "singbox"));
  if (entries)
    fs.writeFileSync(
      path.join(state.root, "singbox/sources.json"),
      JSON.stringify({ version: 1, entries })
    );
  if (config)
    fs.writeFileSync(path.join(state.root, "singbox/config.json"), "synthetic-old-config");
}
afterEach(() => {
  fs.rmSync(state.root, { recursive: true, force: true });
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
});

for (const running of [false, true]) {
  test(`orphan without manifest stops any listener before registry deletion (${running})`, async () => {
    fixture();
    state.running = running;
    await removeManagedProxy("singbox", "orphan", async () => {
      expect(state.running).toBe(false);
      expect(state.calls).toEqual(["stop"]);
    });
    expect(fs.existsSync(path.join(state.root, "singbox/config.json"))).toBe(false);
  });
}
test("missing id rebuilds known listeners instead of leaving an unknown listener running", async () => {
  fixture([{ id: "known", port: 24001 }]);
  state.running = true;
  await removeManagedProxy("singbox", "orphan", async () => {});
  expect(state.calls).toEqual(["installed", "check", "stop", "start"]);
  const config = JSON.parse(fs.readFileSync(path.join(state.root, "singbox/config.json"), "utf8"));
  expect(config.inbounds).toHaveLength(1);
  expect(config.inbounds[0].listen_port).toBe(24001);
});
test("missing config allows deleting final source and stops its listener", async () => {
  fixture([{ id: "last", port: 24001 }], false);
  state.running = true;
  await removeManagedProxy("singbox", "last", async () => {});
  expect(state.running).toBe(false);
  expect(
    JSON.parse(fs.readFileSync(path.join(state.root, "singbox/sources.json"), "utf8")).entries
  ).toEqual([]);
});
test("failed orphan registry deletion restores files but never resurrects unverifiable listeners", async () => {
  fixture();
  state.running = true;
  await expect(
    removeManagedProxy("singbox", "orphan", async () => {
      throw new Error("synthetic-db");
    })
  ).rejects.toThrow("synthetic-db");
  expect(state.running).toBe(false);
  expect(fs.readFileSync(path.join(state.root, "singbox/config.json"), "utf8")).toBe(
    "synthetic-old-config"
  );
  expect(fs.existsSync(path.join(state.root, "singbox/sources.json"))).toBe(false);
});
