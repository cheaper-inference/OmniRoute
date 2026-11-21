import test, { describe } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

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

    store.confirmKey();
    assert.equal(session.getItem(ENTRY), "k1");
    assert.equal(device.getItem(ENTRY), null);
    assert.deepEqual(store.getSnapshot(), { key: "k1", persistence: "session", confirmed: true });

    const before = store.getSnapshot();
    const count = notifications();
    store.confirmKey();
    assert.equal(store.getSnapshot(), before);
    assert.equal(notifications(), count);
    assert.equal(session.getItem(ENTRY), "k1");
    assert.equal(device.getItem(ENTRY), null);
  });

  test("remember on this device moves the key to device storage", () => {
    const { session, device, store } = setup();
    store.hold("k1", true);
    store.confirmKey();
    assert.equal(device.getItem(ENTRY), "k1");
    assert.equal(session.getItem(ENTRY), null);
    assert.deepEqual(brief(store), { key: "k1", persistence: "device" });

    store.hold("k2", false);
    store.confirmKey();
    assert.equal(session.getItem(ENTRY), "k2");
    assert.equal(device.getItem(ENTRY), null);
    assert.deepEqual(brief(store), { key: "k2", persistence: "session" });
  });

  test("confirming a key read from storage leaves it where it is", () => {
    const { session, device, store, notifications } = setup({ device: { [ENTRY]: "k1" } });
    assert.deepEqual(store.getSnapshot(), { key: "k1", persistence: "device", confirmed: true });
    store.confirmKey();
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
        store.confirmKey();
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

  test("a tab keeping its key in memory or session ignores what other tabs save", () => {
    const sessionTab = setup({ session: { [ENTRY]: "k1" } });
    assert.deepEqual(brief(sessionTab.store), { key: "k1", persistence: "session" });
    sessionTab.device.setItem(ENTRY, "k2");
    sessionTab.store.reload();
    assert.deepEqual(sessionTab.store.getSnapshot(), {
      key: "k1",
      persistence: "session",
      confirmed: true,
    });

    const memoryTab = setup();
    memoryTab.store.hold("k1", false);
    memoryTab.device.setItem(ENTRY, "k2");
    memoryTab.store.reload();
    assert.deepEqual(memoryTab.store.getSnapshot(), {
      key: "k1",
      persistence: "memory",
      confirmed: false,
    });
    assert.equal(sessionTab.notifications() + memoryTab.notifications(), 1);
  });

  test("a tab keeping its key on the device follows the device entry", () => {
    const { device, store } = setup();
    store.hold("k1", true);
    store.confirmKey();
    assert.deepEqual(brief(store), { key: "k1", persistence: "device" });

    device.setItem(ENTRY, "k2");
    store.reload();
    assert.deepEqual(store.getSnapshot(), { key: "k2", persistence: "device", confirmed: true });

    device.removeItem(ENTRY);
    store.reload();
    assert.equal(store.getSnapshot(), null);
  });

  test("a tab without a key picks up a key another tab saves on the device", () => {
    const { device, store, notifications } = setup();
    assert.equal(store.getSnapshot(), null);
    device.setItem(ENTRY, "k2");
    store.reload();
    assert.deepEqual(store.getSnapshot(), { key: "k2", persistence: "device", confirmed: true });
    assert.equal(notifications(), 1);
  });

  test("a new subscriber sees a device key change made while nothing listened", () => {
    const device = memoryStorage({ [ENTRY]: "k1" });
    const session = memoryStorage();
    const store = createKeyStore(areas({ session, device }));
    const unsubscribe = store.subscribe(() => {});
    assert.deepEqual(brief(store), { key: "k1", persistence: "device" });
    unsubscribe();

    // Another tab forgets the key while the page shows nothing that listens.
    device.removeItem(ENTRY);
    let notified = 0;
    store.subscribe(() => {
      notified += 1;
    });
    assert.equal(store.getSnapshot(), null);
    assert.equal(notified, 1);
  });

  test("a new subscriber keeps a key held in memory or in this tab's session", () => {
    const { device, store } = setup();
    store.hold("k1", false);
    device.setItem(ENTRY, "k2");
    store.subscribe(() => {});
    assert.deepEqual(brief(store), { key: "k1", persistence: "memory" });

    store.confirmKey();
    device.setItem(ENTRY, "k3");
    store.subscribe(() => {});
    assert.deepEqual(brief(store), { key: "k1", persistence: "session" });
  });

  test("reading the snapshot never writes to storage", () => {
    const session = memoryStorage({ [ENTRY]: "not a key" });
    let removals = 0;
    const removeItem = session.removeItem.bind(session);
    session.removeItem = (name: string) => {
      removals += 1;
      removeItem(name);
    };
    const store = createKeyStore(areas({ session, device: memoryStorage() }));
    assert.equal(store.getSnapshot(), null);
    assert.equal(store.getSnapshot(), null);
    assert.equal(removals, 0);
    assert.equal(session.getItem(ENTRY), "not a key");

    store.subscribe(() => {});
    assert.equal(removals, 1);
    assert.equal(session.getItem(ENTRY), null);
  });

  test("an unusable value replaced by a real key before the cleanup is kept", () => {
    const session = memoryStorage({ [ENTRY]: "not a key" });
    const store = createKeyStore(areas({ session, device: memoryStorage() }));
    assert.equal(store.getSnapshot(), null);
    session.setItem(ENTRY, "k1");
    store.subscribe(() => {});
    assert.equal(session.getItem(ENTRY), "k1");
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
        store.confirmKey();
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
    .map((file) => relative(process.cwd(), file).split(sep).join("/"));
  assert.deepEqual(offenders, ["src/app/quota/[provider]/lib/useStoredApiKey.ts"]);
});
