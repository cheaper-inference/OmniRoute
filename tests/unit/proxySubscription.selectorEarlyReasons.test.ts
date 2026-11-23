import test from "node:test";
import assert from "node:assert/strict";
import fs, { readdirSync, readFileSync } from "node:fs";
import os from "node:os";
import path, { join } from "node:path";
import { IntlMessageFormat } from "intl-messageformat";

// Early selector skips (no control URL / unmapped set-aside key) bump an
// in-memory counter while leaving the trigger result unchanged. The selector
// flag-off path touches nothing. The management list only reports counts > 0
// that concern a configured selector, so default setups see an unchanged
// response body. Inputs go through the production reader
// (maybeSwitchOnSetAside) and the real GET route, never hand-built.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-selector-early-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  NODE_ENV: process.env.NODE_ENV,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  PROXY_SKIP_RECENTLY_FAILED: process.env.PROXY_SKIP_RECENTLY_FAILED,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
};
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test"; // keeps the subscription scheduler from arming timers
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "selector-early-test-secret";
delete process.env.INITIAL_PASSWORD; // management auth is a no-op without a password
process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
process.env.PROXY_HEALTH_TCP_TIMEOUT_MS = "50";

const core = await import("../../src/lib/db/core.ts");
const trigger = await import("../../src/lib/proxySubscription/selectorTrigger.ts");
const early = await import("../../src/lib/proxySubscription/selectorEarlyReasons.ts");
const service = await import("../../src/lib/proxySubscription/subscriptionService.ts");
const route = await import("../../src/app/api/v1/management/proxy-subscriptions/route.ts");

const KEY = "socks5://@127.0.0.1:1080";
const ZERO = { "no-control": 0, unmapped: 0 };

function resetAll() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  trigger.__resetSelectorTriggerForTesting();
  early.__resetSelectorEarlyReasonsForTesting();
}

async function withFlag<T>(value: string, fn: () => Promise<T> | T): Promise<T> {
  const prev = process.env.PROXY_SKIP_RECENTLY_FAILED;
  process.env.PROXY_SKIP_RECENTLY_FAILED = value;
  try {
    return await fn();
  } finally {
    process.env.PROXY_SKIP_RECENTLY_FAILED = prev;
  }
}

async function getList(): Promise<Record<string, unknown>> {
  const res = await route.GET(
    new Request("http://localhost/api/v1/management/proxy-subscriptions")
  );
  assert.equal(res.status, 200);
  return (await res.json()) as Record<string, unknown>;
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [k, v] of Object.entries(ORIGINAL_ENV)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
});

// ── trigger path ────────────────────────────────────────────────

test("flag off touches nothing: same result, no counter moves", async () => {
  resetAll();
  try {
    await withFlag("false", async () => {
      trigger.__setAnyControlUrlConfiguredForTesting(true);
      for (let i = 0; i < 3; i++) {
        const res = await trigger.maybeSwitchOnSetAside(KEY);
        assert.equal(res.switched, false);
        assert.equal(res.reason, "flag-off");
      }
      assert.deepEqual(early.readSelectorEarlyReasons(), ZERO);
    });
  } finally {
    resetAll();
  }
});

test("missing control URL counts no-control", async () => {
  resetAll();
  try {
    trigger.__setAnyControlUrlConfiguredForTesting(false);
    const res = await trigger.maybeSwitchOnSetAside(KEY);
    assert.equal(res.switched, false);
    assert.equal(res.reason, "no-control");
    assert.deepEqual(early.readSelectorEarlyReasons(), { "no-control": 1, unmapped: 0 });
  } finally {
    resetAll();
  }
});

test("unmapped output counts unmapped", async () => {
  resetAll();
  try {
    trigger.__setAnyControlUrlConfiguredForTesting(true);
    const res = await trigger.maybeSwitchOnSetAside(KEY);
    assert.equal(res.switched, false);
    assert.equal(res.reason, "unmapped");
    assert.deepEqual(early.readSelectorEarlyReasons(), { "no-control": 0, unmapped: 1 });
  } finally {
    resetAll();
  }
});

test("store stays bounded: fixed keys, reset returns to start level", async () => {
  resetAll();
  try {
    assert.deepEqual(early.readSelectorEarlyReasons(), ZERO);
    trigger.__setAnyControlUrlConfiguredForTesting(true);
    for (let i = 0; i < 5; i++) {
      await trigger.maybeSwitchOnSetAside(KEY);
    }
    const snap = early.readSelectorEarlyReasons();
    assert.deepEqual(Object.keys(snap).sort(), ["no-control", "unmapped"]);
    assert.equal(snap.unmapped, 5);
    early.__resetSelectorEarlyReasonsForTesting();
    assert.deepEqual(early.readSelectorEarlyReasons(), ZERO);
  } finally {
    resetAll();
  }
});

test("concurrent callers count invocations", async () => {
  resetAll();
  try {
    trigger.__setAnyControlUrlConfiguredForTesting(true);
    const [a, b] = await Promise.all([
      trigger.maybeSwitchOnSetAside(KEY),
      trigger.maybeSwitchOnSetAside(KEY),
    ]);
    assert.equal(a.reason, "unmapped");
    assert.equal(b.reason, "unmapped");
    assert.equal(early.readSelectorEarlyReasons().unmapped, 2);
  } finally {
    resetAll();
  }
});

test("unknown reasons (including the retired flag-off) never grow the store", () => {
  resetAll();
  try {
    early.noteSelectorEarlyReason("bogus" as never);
    early.noteSelectorEarlyReason("flag-off" as never);
    assert.deepEqual(early.readSelectorEarlyReasons(), ZERO);
  } finally {
    resetAll();
  }
});

// ── display filter (pure) ───────────────────────────────────────

const SELECTOR_SUB = { controlUrl: null, localCoreEndpoint: "socks5://127.0.0.1:1080 selector=g" };
const PINNED_SUB = { controlUrl: null, localCoreEndpoint: "socks5://127.0.0.1:1080" };
const DRIVEN_SUB = {
  controlUrl: "http://localhost:9090",
  localCoreEndpoint: "socks5://127.0.0.1:1080 selector=g",
};

test("display: selector feature off shows nothing, whatever the counts", () => {
  const out = early.selectorEarlyReasonsForDisplay(
    { "no-control": 9, unmapped: 9 },
    { selectorEnabled: false, subscriptions: [DRIVEN_SUB, SELECTOR_SUB] }
  );
  assert.equal(out, null);
});

test("display: zero counts show nothing", () => {
  assert.equal(
    early.selectorEarlyReasonsForDisplay(ZERO, {
      selectorEnabled: true,
      subscriptions: [SELECTOR_SUB, DRIVEN_SUB],
    }),
    null
  );
});

test("display: no-control is hidden for setups without a selector tag", () => {
  for (const subscriptions of [[], [PINNED_SUB]]) {
    assert.equal(
      early.selectorEarlyReasonsForDisplay(
        { "no-control": 42, unmapped: 0 },
        { selectorEnabled: true, subscriptions }
      ),
      null
    );
  }
});

test("display: no-control shows when a selector tag has no control URL anywhere", () => {
  assert.deepEqual(
    early.selectorEarlyReasonsForDisplay(
      { "no-control": 3, unmapped: 0 },
      { selectorEnabled: true, subscriptions: [PINNED_SUB, SELECTOR_SUB] }
    ),
    { "no-control": 3 }
  );
});

test("display: no-control is hidden once a control URL exists (stale count)", () => {
  assert.deepEqual(
    early.selectorEarlyReasonsForDisplay(
      { "no-control": 3, unmapped: 2 },
      { selectorEnabled: true, subscriptions: [SELECTOR_SUB, DRIVEN_SUB] }
    ),
    { unmapped: 2 }
  );
});

// ── management list route ───────────────────────────────────────

test("route: default setup (no selector) keeps the exact tip body shape", async () => {
  resetAll();
  try {
    // Flag on (the default) and no control URL: every set-aside is a no-control skip.
    for (let i = 0; i < 4; i++) {
      const res = await trigger.maybeSwitchOnSetAside(KEY);
      assert.equal(res.reason, "no-control");
    }
    assert.equal(early.readSelectorEarlyReasons()["no-control"], 4);
    const body = await getList();
    assert.deepEqual(Object.keys(body), ["items"]);
    assert.deepEqual(body.items, []);
  } finally {
    resetAll();
  }
});

test("route: a driven selector reports its unmapped skips", async () => {
  resetAll();
  try {
    await service.createSubscription({
      name: "driven",
      url: "https://example.com/sub",
      localCoreEndpoint: "socks5://127.0.0.1:1080 selector=g",
      controlUrl: "http://localhost:9090",
    });
    const res = await trigger.maybeSwitchOnSetAside("socks5://@10.9.9.9:1999");
    assert.equal(res.reason, "unmapped");
    const body = await getList();
    assert.equal((body.items as unknown[]).length, 1);
    assert.deepEqual(body.earlyReasons, { unmapped: 1 });
  } finally {
    resetAll();
  }
});

test("route: selector feature off omits the counts", async () => {
  resetAll();
  try {
    await service.createSubscription({
      name: "driven",
      url: "https://example.com/sub",
      localCoreEndpoint: "socks5://127.0.0.1:1080 selector=g",
      controlUrl: "http://localhost:9090",
    });
    await trigger.maybeSwitchOnSetAside("socks5://@10.9.9.9:1999");
    assert.equal(early.readSelectorEarlyReasons().unmapped, 1);
    const body = await withFlag("false", () => getList());
    assert.equal("earlyReasons" in body, false);
  } finally {
    resetAll();
  }
});

// ── i18n ────────────────────────────────────────────────────────

const messagesDir = join(import.meta.dirname, "../../src/i18n/messages");
const localeFiles = readdirSync(messagesDir).filter((f) => f.endsWith(".json"));

function labelsOf(file: string) {
  const parsed = JSON.parse(readFileSync(join(messagesDir, file), "utf8"));
  const sub = parsed?.settings?.proxySubscription;
  return {
    SELECTOR_EARLY_NO_CONTROL: sub?.error?.SELECTOR_EARLY_NO_CONTROL,
    SELECTOR_EARLY_UNMAPPED: sub?.error?.SELECTOR_EARLY_UNMAPPED,
    earlySkipsSinceRestart: sub?.earlySkipsSinceRestart,
    retiredFlagOff: sub?.error?.SELECTOR_EARLY_FLAG_OFF,
  };
}

test("early-skip labels exist in every locale, compile as ICU and are translated", () => {
  assert.ok(localeFiles.length >= 40, `expected the full locale set, got ${localeFiles.length}`);
  const en = labelsOf("en.json");
  const failures: string[] = [];
  for (const file of localeFiles) {
    const labels = labelsOf(file);
    if (labels.retiredFlagOff !== undefined) failures.push(`${file}: retired flag-off label`);
    for (const key of [
      "SELECTOR_EARLY_NO_CONTROL",
      "SELECTOR_EARLY_UNMAPPED",
      "earlySkipsSinceRestart",
    ] as const) {
      const value = labels[key];
      if (typeof value !== "string" || value.length === 0) {
        failures.push(`${file}: ${key} missing`);
        continue;
      }
      if (value.startsWith("__MISSING__")) failures.push(`${file}: ${key} untranslated marker`);
      try {
        new IntlMessageFormat(value, "en").format();
      } catch (err) {
        failures.push(`${file}: ${key}: ${(err as Error).message}`);
      }
    }
    if (file !== "en.json" && labels.earlySkipsSinceRestart === en.earlySkipsSinceRestart) {
      failures.push(`${file}: earlySkipsSinceRestart left in English`);
    }
  }
  assert.deepEqual(failures, [], `invalid early-skip labels:\n${failures.join("\n")}`);
});
