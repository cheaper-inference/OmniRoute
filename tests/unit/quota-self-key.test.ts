import test, { describe } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { parseApiKeyInput } from "../../src/app/quota/[provider]/lib/apiKeyInput.ts";
import {
  createKeyStore,
  type KeyStorageAreas,
  type KeyStore,
} from "../../src/app/quota/[provider]/lib/keyStore.ts";

const ENTRY = "omniroute:quota-self:api-key";
const QUOTA_PAGE_DIR = join(process.cwd(), "src/app/quota");

type AreaMode = Storage | "blocked" | "full" | "absent";

/** A Storage over a Map, enough for the store. */
function memoryStorage(initial: Record<string, string> = {}, opts: { full?: boolean } = {}) {
  const map = new Map(Object.entries(initial));
  const storage = {
    get length() {
      return map.size;
    },
    key: (index: number) => [...map.keys()][index] ?? null,
    getItem: (name: string) => map.get(name) ?? null,
    setItem: (name: string, value: string) => {
      if (opts.full) throw new Error("QuotaExceededError");
      map.set(name, String(value));
    },
    removeItem: (name: string) => {
      map.delete(name);
    },
    clear: () => map.clear(),
  };
  return storage as Storage;
}

function accessor(mode: AreaMode): () => Storage | null {
  if (mode === "blocked") {
    return () => {
      throw new Error("SecurityError");
    };
  }
  if (mode === "absent") return () => null;
  if (mode === "full") {
    const storage = memoryStorage({}, { full: true });
    return () => storage;
  }
  return () => mode;
}

function areas(modes: { session: AreaMode; device: AreaMode }): KeyStorageAreas {
  return { session: accessor(modes.session), device: accessor(modes.device) };
}

function setup(
  initial: { session?: Record<string, string>; device?: Record<string, string> } = {}
) {
  const session = memoryStorage(initial.session);
  const device = memoryStorage(initial.device);
  const store = createKeyStore(areas({ session, device }));
  let notified = 0;
  store.subscribe(() => {
    notified += 1;
  });
  return { session, device, store, notifications: () => notified };
}

function brief(store: KeyStore) {
  const snapshot = store.getSnapshot();
  return snapshot && { key: snapshot.key, persistence: snapshot.persistence };
}

describe("parseApiKeyInput", () => {
  test("a pasted key is cleaned before use", () => {
    for (const raw of [
      "  sk-live-1234567890  ",
      "Bearer sk-live-1234567890",
      "bearer   sk-live-1234567890\n",
      '"sk-live-1234567890"',
      "'Bearer sk-live-1234567890'",
    ]) {
      assert.deepEqual(parseApiKeyInput(raw), { ok: true, key: "sk-live-1234567890" }, raw);
    }
  });

  test("empty and impossible keys are named, not sent", () => {
    for (const raw of ["", "   ", "Bearer "]) {
      assert.deepEqual(parseApiKeyInput(raw), { ok: false, problem: "empty" }, raw);
    }
    for (const raw of ["sk live", "sk-ção", "sk\tx", "k".repeat(513)]) {
      assert.deepEqual(parseApiKeyInput(raw), { ok: false, problem: "malformed" }, raw);
    }
    assert.deepEqual(parseApiKeyInput("k".repeat(512)), { ok: true, key: "k".repeat(512) });
  });
});

describe("createKeyStore", () => {
  test("a held key touches no storage until the server accepts it", () => {
    const { session, device, store, notifications } = setup();
    store.hold("k1", false);
    assert.deepEqual(store.getSnapshot(), { key: "k1", persistence: "memory", confirmed: false });
    assert.equal(session.length, 0);
    assert.equal(device.length, 0);

    store.confirm();
    assert.equal(session.getItem(ENTRY), "k1");
    assert.equal(device.getItem(ENTRY), null);
    assert.deepEqual(store.getSnapshot(), { key: "k1", persistence: "session", confirmed: true });

    const before = store.getSnapshot();
    const count = notifications();
    store.confirm();
    assert.equal(store.getSnapshot(), before);
    assert.equal(notifications(), count);
    assert.equal(session.getItem(ENTRY), "k1");
    assert.equal(device.getItem(ENTRY), null);
  });

  test("remember on this device moves the key to device storage", () => {
    const { session, device, store } = setup();
    store.hold("k1", true);
    store.confirm();
    assert.equal(device.getItem(ENTRY), "k1");
    assert.equal(session.getItem(ENTRY), null);
    assert.deepEqual(brief(store), { key: "k1", persistence: "device" });

    store.hold("k2", false);
    store.confirm();
    assert.equal(session.getItem(ENTRY), "k2");
    assert.equal(device.getItem(ENTRY), null);
    assert.deepEqual(brief(store), { key: "k2", persistence: "session" });
  });

  test("confirming a key read from storage leaves it where it is", () => {
    const { session, device, store, notifications } = setup({ device: { [ENTRY]: "k1" } });
    assert.deepEqual(store.getSnapshot(), { key: "k1", persistence: "device", confirmed: true });
    store.confirm();
    assert.equal(device.getItem(ENTRY), "k1");
    assert.equal(session.getItem(ENTRY), null);
    assert.deepEqual(brief(store), { key: "k1", persistence: "device" });
    assert.equal(notifications(), 0);
  });

  test("a rejected key leaves the storages but stays for this page view", () => {
    const { session, device, store } = setup({ device: { [ENTRY]: "k1" } });
    assert.deepEqual(brief(store), { key: "k1", persistence: "device" });
    store.unpersist();
    assert.equal(session.length, 0);
    assert.equal(device.length, 0);
    assert.deepEqual(brief(store), { key: "k1", persistence: "memory" });
  });

  test("forget removes the key everywhere", () => {
    const { session, device, store, notifications } = setup({ session: { [ENTRY]: "k1" } });
    assert.deepEqual(brief(store), { key: "k1", persistence: "session" });
    store.forget();
    assert.equal(store.getSnapshot(), null);
    assert.equal(session.length, 0);
    assert.equal(device.length, 0);
    assert.equal(notifications(), 1);
  });

  test("blocked, full or absent storage keeps the key in memory and never throws", () => {
    for (const mode of ["blocked", "full", "absent"] as const) {
      for (const remember of [false, true]) {
        const store = createKeyStore(areas({ session: mode, device: mode }));
        assert.equal(store.getSnapshot(), null, mode);
        store.hold("k1", remember);
        store.confirm();
        assert.deepEqual(
          store.getSnapshot(),
          { key: "k1", persistence: "memory", confirmed: true },
          `${mode} remember=${remember}`
        );
        assert.doesNotThrow(() => store.reload(), mode);
        assert.deepEqual(brief(store), { key: "k1", persistence: "memory" }, mode);
        assert.doesNotThrow(() => store.unpersist(), mode);
        assert.doesNotThrow(() => store.forget(), mode);
        assert.equal(store.getSnapshot(), null, mode);
      }
    }
  });

  test("garbage in storage is dropped", () => {
    const { session, store } = setup({ session: { [ENTRY]: "not a key" } });
    assert.equal(store.getSnapshot(), null);
    assert.equal(session.getItem(ENTRY), null);
  });

  test("the snapshot is stable between changes", () => {
    const { store } = setup({ device: { [ENTRY]: "k1" } });
    assert.equal(store.getSnapshot(), store.getSnapshot());
    store.hold("k2", false);
    assert.equal(store.getSnapshot(), store.getSnapshot());
  });

  test("reload follows another tab for a stored key", () => {
    const { device, store, notifications } = setup({ device: { [ENTRY]: "k1" } });
    assert.deepEqual(brief(store), { key: "k1", persistence: "device" });
    device.setItem(ENTRY, "k2");
    store.reload();
    assert.deepEqual(brief(store), { key: "k2", persistence: "device" });
    device.removeItem(ENTRY);
    store.reload();
    assert.equal(store.getSnapshot(), null);
    assert.equal(notifications(), 2);
  });

  test("the store never logs", () => {
    const methods = ["log", "info", "warn", "error", "debug"] as const;
    const originals = methods.map((name) => console[name]);
    let calls = 0;
    for (const name of methods) {
      console[name] = () => {
        calls += 1;
      };
    }
    try {
      for (const mode of ["blocked", "full", "absent"] as const) {
        const store = createKeyStore(areas({ session: mode, device: mode }));
        store.hold("sk-live-1234567890", true);
        store.confirm();
        store.reload();
        store.unpersist();
        store.forget();
      }
      setup({ session: { [ENTRY]: "not a key" } }).store.getSnapshot();
    } finally {
      methods.forEach((name, index) => {
        console[name] = originals[index];
      });
    }
    assert.equal(calls, 0);
  });
});

/** Every source file under the quota page, so the storage rule covers files added later. */
function sourceFiles(dir: string): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return [];
  }
  return entries.flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.(ts|tsx)$/.test(name) ? [full] : [];
  });
}

test("browser storage is reached only through the key hook", () => {
  const offenders = sourceFiles(QUOTA_PAGE_DIR)
    .filter((file) => /\b(sessionStorage|localStorage)\b/.test(readFileSync(file, "utf8")))
    .map((file) => relative(process.cwd(), file));
  assert.deepEqual(offenders, ["src/app/quota/[provider]/lib/useStoredApiKey.ts"]);
});
