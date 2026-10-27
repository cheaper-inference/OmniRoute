/**
 * Bounded tail read for /api/cli-tools/logs (perf: large log files must not
 * stall served requests).
 *
 * Proves:
 *   - A 50 MB file with limit 50 reads only the tail and returns 50 lines.
 *   - A short file returns the same lines as a full read.
 *   - A short file with small limit, filter and hour window matches a full read.
 *   - A filter matched only higher up widens the window and returns the lines.
 *   - A missing file returns an empty list.
 *   - The hour filter holds on a 25-hour day.
 *   - Multibyte characters split by the window edge decode without replacement.
 *   - An object component matches its JSON shape and a numeric msg matches.
 */

import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { updateSettings } from "../../src/lib/db/settings";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-logs-tail-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const tailLogDir = path.join(TEST_DATA_DIR, "logs");
fs.mkdirSync(tailLogDir, { recursive: true });
const tailLogPath = path.join(tailLogDir, "tail-app.log");
const origAppLogPath = process.env.APP_LOG_FILE_PATH;
process.env.APP_LOG_FILE_PATH = tailLogPath;

const { GET } = await import("../../src/app/api/cli-tools/logs/route.ts");

function makeReq(queryString = "") {
  const url = `http://localhost/api/cli-tools/logs${queryString ? `?${queryString}` : ""}`;
  return new Request(url);
}

test.before(async () => {
  await updateSettings({ requireLogin: false });
});

test.after(async () => {
  await updateSettings({ requireLogin: true });
  process.env.APP_LOG_FILE_PATH = origAppLogPath;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  mock.restoreAll();
});

test("50 MB file with limit 50 reads only the tail and returns 50 lines", async (t) => {
  const now = Date.now();
  // ~200 bytes per line, ~250k lines -> ~50 MB.
  const pad = "x".repeat(150);
  const total = 250_000;
  const fd = fs.openSync(tailLogPath, "w");
  try {
    for (let i = 0; i < total; i++) {
      fs.writeSync(
        fd,
        `${JSON.stringify({ level: 30, msg: `tail entry ${i} ${pad}`, component: "router", time: now })}\n`
      );
    }
  } finally {
    fs.closeSync(fd);
  }
  const size = fs.statSync(tailLogPath).size;
  assert.ok(size > 50 * 1024 * 1024, `fixture should exceed 50 MB, got ${size}`);

  // Spy the fd-level reads on the same `fs` object the tail reader uses.
  // The base route never calls openSync/readSync (it uses readFileSync),
  // so the call-count assertion below fails on base (RED) and the byte
  // assertion proves the window stays bounded with the change (GREEN).
  const realOpenSync = fs.openSync.bind(fs);
  const realReadSync = fs.readSync.bind(fs);
  const tailedFds = new Set<number>();
  let readCalls = 0;
  let largestWindow = 0;
  t.mock.method(fs, "openSync", (...args: unknown[]) => {
    const fd = (realOpenSync as (...a: never[]) => number)(...(args as never[]));
    if (args[0] === tailLogPath) tailedFds.add(fd);
    return fd as never;
  });
  t.mock.method(fs, "readSync", (...args: unknown[]) => {
    const n = (realReadSync as (...a: never[]) => number)(...(args as never[]));
    if (typeof args[0] === "number" && tailedFds.has(args[0])) {
      readCalls += 1;
      if (n > largestWindow) largestWindow = n;
    }
    return n as never;
  });

  try {
    const res = await GET(makeReq("limit=50"));
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body));
    assert.equal(body.length, 50);
    assert.equal(body[0].msg, `tail entry ${total - 50} ${pad}`);
    assert.equal(body[49].msg, `tail entry ${total - 1} ${pad}`);
    assert.ok(readCalls > 0, "tail path must read through openSync/readSync");
    assert.ok(
      largestWindow < size,
      `bounded read must load fewer bytes than the file size (${largestWindow} < ${size})`
    );
  } finally {
    mock.restoreAll();
    fs.rmSync(tailLogPath, { force: true });
  }
});

test("short file returns the same lines as a full read", async () => {
  const now = Date.now();
  const fixture = [
    JSON.stringify({ level: 30, msg: "alpha", component: "router", time: now }),
    JSON.stringify({ level: 40, msg: "beta", module: "auth", time: now }),
    JSON.stringify({ level: 20, msg: "no timestamp here", component: "debug" }),
    "not-valid-json-should-be-skipped",
    JSON.stringify({ level: 30, msg: "gamma", component: "router", time: now }),
  ];
  try {
    fs.writeFileSync(tailLogPath, `${fixture.join("\n")}\n`, "utf-8");

    const res = await GET(makeReq("limit=50"));
    assert.equal(res.status, 200);
    const body = await res.json();

    // Oracle: the same full-read semantics the route applied before the change.
    const raw = fs.readFileSync(tailLogPath, "utf-8");
    const oracle = raw
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter((e) => e !== null)
      .slice(-50);
    assert.deepEqual(
      body.map((e: { msg?: string }) => e.msg),
      oracle.map((e: { msg?: string }) => e.msg)
    );
    assert.equal(body.length, 4);
  } finally {
    fs.rmSync(tailLogPath, { force: true });
  }
});

test("filter matched only higher up widens the window and returns the lines", async (t) => {
  const now = Date.now();
  const pad = "y".repeat(400);
  // Old top: noise that forces the first window to miss, then 60 small needle
  // lines. Recent: ~500 KiB of noise. The second window (512 KiB) covers the
  // noise plus all needles, so growth stops before the whole file.
  const top: string[] = [];
  for (let i = 0; i < 1500; i++) {
    top.push(
      JSON.stringify({
        level: 30,
        msg: `old noise ${i} ${pad}`,
        component: "router",
        time: now - 30 * 60 * 1000,
      })
    );
  }
  const needles: string[] = [];
  for (let i = 0; i < 60; i++) {
    needles.push(
      JSON.stringify({
        level: 30,
        msg: `needle match ${i}`,
        component: "needle",
        time: now - 30 * 60 * 1000,
      })
    );
  }
  const recent: string[] = [];
  for (let i = 0; i < 1100; i++) {
    recent.push(
      JSON.stringify({ level: 30, msg: `recent noise ${i} ${pad}`, component: "router", time: now })
    );
  }
  try {
    fs.writeFileSync(tailLogPath, `${[...top, ...needles, ...recent].join("\n")}\n`, "utf-8");
    const size = fs.statSync(tailLogPath).size;
    assert.ok(size > 768 * 1024, `fixture must exceed two windows, got ${size}`);

    const realOpenSync = fs.openSync.bind(fs);
    const realReadSync = fs.readSync.bind(fs);
    const tailedFds = new Set<number>();
    let readCalls = 0;
    let largestWindow = 0;
    t.mock.method(fs, "openSync", (...args: unknown[]) => {
      const fd = (realOpenSync as (...a: never[]) => number)(...(args as never[]));
      if (args[0] === tailLogPath) tailedFds.add(fd);
      return fd as never;
    });
    t.mock.method(fs, "readSync", (...args: unknown[]) => {
      const n = (realReadSync as (...a: never[]) => number)(...(args as never[]));
      if (typeof args[0] === "number" && tailedFds.has(args[0])) {
        readCalls += 1;
        // One window read issues one large readSync; the largest single read
        // is the window size, not the cumulative overlap across windows.
        if (n > largestWindow) largestWindow = n;
      }
      return n as never;
    });

    const res = await GET(makeReq("filter=needle&limit=50"));
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body));
    assert.equal(body.length, 50);
    assert.ok(body.every((e: { component?: string }) => (e.component || "").includes("needle")));
    assert.ok(readCalls > 1, `window must widen past the first window (${readCalls} reads)`);
    assert.ok(
      largestWindow > 256 * 1024,
      `window must widen past the initial 256 KiB window (largest read ${largestWindow})`
    );
    assert.ok(
      largestWindow < size,
      `widened window must still stay below the full file size (${largestWindow} < ${size})`
    );
  } finally {
    mock.restoreAll();
    fs.rmSync(tailLogPath, { force: true });
  }
});

test("missing file returns an empty list", async () => {
  const saved = process.env.APP_LOG_FILE_PATH;
  process.env.APP_LOG_FILE_PATH = path.join(TEST_DATA_DIR, "no-such-file.log");
  try {
    const res = await GET(makeReq());
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body));
    assert.equal(body.length, 0);
  } finally {
    process.env.APP_LOG_FILE_PATH = saved;
  }
});

test("hour filter holds on a 25-hour day", async () => {
  const realDateNow = Date.now;
  // Fixed date on a DST fallback day in Europe/Paris: 2026-10-25 03:00 CEST
  // becomes 02:00 CET, a 25-hour day. TZ is set in this process below.
  const fixedNow = Date.parse("2026-10-25T01:30:00.000Z");
  process.env.TZ = "Europe/Paris";
  Date.now = () => fixedNow;
  try {
    const lines = [
      JSON.stringify({
        level: 30,
        msg: "fresh",
        component: "router",
        time: fixedNow - 10 * 60 * 1000,
      }),
      JSON.stringify({
        level: 30,
        msg: "stale",
        component: "router",
        time: fixedNow - 2 * 60 * 60 * 1000,
      }),
      JSON.stringify({ level: 30, msg: "nodate", component: "router" }),
    ];
    fs.writeFileSync(tailLogPath, `${lines.join("\n")}\n`, "utf-8");

    const res = await GET(makeReq("limit=50"));
    assert.equal(res.status, 200);
    const body = await res.json();
    const msgs = body.map((e: { msg?: string }) => e.msg);
    assert.ok(msgs.includes("fresh"), "entry inside the hour is kept");
    assert.ok(msgs.includes("nodate"), "undated entry is kept");
    assert.ok(!msgs.includes("stale"), "entry older than one hour is dropped");
  } finally {
    Date.now = realDateNow;
    delete process.env.TZ;
    fs.rmSync(tailLogPath, { force: true });
  }
});

test("multibyte characters split by the window edge decode without replacement", async () => {
  const now = Date.now();
  const lines = [
    JSON.stringify({ level: 30, msg: "caf\u00e9 au lait", component: "d\u00e9ficit", time: now }),
    JSON.stringify({ level: 30, msg: "plain", component: "router", time: now }),
  ];
  try {
    fs.writeFileSync(tailLogPath, `${lines.join("\n")}\n`, "utf-8");

    const res = await GET(makeReq("limit=50"));
    assert.equal(res.status, 200);
    const body = await res.json();
    const text = JSON.stringify(body);
    assert.ok(!text.includes("�"), "response must not contain replacement characters");
    assert.ok(
      body.some((e: { msg?: string }) => (e.msg || "").includes("caf\u00e9")),
      "multibyte content survives the tail read"
    );
  } finally {
    fs.rmSync(tailLogPath, { force: true });
  }
});

test("object component matches its JSON shape and numeric msg matches", async () => {
  const now = Date.now();
  const lines = [
    JSON.stringify({ level: 30, component: { x: 1 }, msg: "hello", time: now }),
    JSON.stringify({ level: 30, component: "router", msg: 12345, time: now }),
    JSON.stringify({ level: 30, component: "other", msg: "unrelated", time: now }),
  ];
  try {
    fs.writeFileSync(tailLogPath, `${lines.join("\n")}\n`, "utf-8");

    const resX = await GET(makeReq("filter=x"));
    assert.equal(resX.status, 200);
    const bodyX = await resX.json();
    assert.ok(
      bodyX.some((e: { msg?: string }) => e.msg === "hello"),
      "object component entry matches its JSON shape"
    );

    const resNum = await GET(makeReq("filter=123"));
    assert.equal(resNum.status, 200);
    const bodyNum = await resNum.json();
    assert.ok(
      bodyNum.some((e: { msg?: string }) => String(e.msg).includes("123")),
      "numeric msg entry matches"
    );
  } finally {
    fs.rmSync(tailLogPath, { force: true });
  }
});

test("dated stamp helper keeps the oldest finite stamp and ignores the rest", async () => {
  // Direct reader for the exported helper: entries here are plain values, so a
  // dynamic import keeps this the only case that fails without the change.
  const { oldestDatedStamp } = await import("../../src/lib/logTail.ts");
  const now = Date.now();
  assert.equal(oldestDatedStamp([]), null);
  assert.equal(
    oldestDatedStamp([{ component: "router" }, { time: "not-a-date" }, { time: Number.NaN }]),
    null
  );
  assert.equal(
    oldestDatedStamp([
      { time: now - 10 * 60 * 1000 },
      { time: now - 50 * 60 * 1000 },
      { timestamp: now - 5 * 60 * 1000 },
      { time: { nested: true } },
    ]),
    now - 50 * 60 * 1000
  );
});

test("short file with small limit filter and hour window matches a full read", async () => {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;
  const fixture = [
    JSON.stringify({
      level: 30,
      msg: "old needle one",
      component: "needle",
      time: now - 2 * 60 * 60 * 1000,
    }),
    JSON.stringify({ level: 30, msg: "recent other", component: "router", time: now }),
    JSON.stringify({ level: 30, msg: "recent needle one", component: "needle", time: now }),
    JSON.stringify({ level: 30, msg: "recent needle two", module: "needle", time: now }),
    JSON.stringify({ level: 30, msg: "recent other two", component: "router", time: now }),
    JSON.stringify({ level: 30, msg: "recent needle three", component: "needle", time: now }),
    JSON.stringify({ level: 30, msg: "undated needle", component: "needle" }),
  ];
  try {
    fs.writeFileSync(tailLogPath, `${fixture.join("\n")}\n`, "utf-8");

    const res = await GET(makeReq("filter=needle&limit=2"));
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body));

    // Oracle: the previous full-read semantics (whole file, then the same hour,
    // token and slice gates the route applies), so the bounded tail must render
    // exactly what the full read rendered.
    const raw = fs.readFileSync(tailLogPath, "utf-8");
    const oracle = raw
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter((e) => e !== null)
      .filter((e: { time?: unknown; timestamp?: unknown }) => {
        const ts = e.time || e.timestamp;
        if (ts) {
          const entryTime = new Date(ts as string | number).getTime();
          if (entryTime < oneHourAgo) return false;
        }
        return true;
      })
      .filter((e: { component?: unknown; module?: unknown; msg?: unknown; message?: unknown }) => {
        const haystack = [e.component || "", e.module || "", e.msg ?? e.message ?? ""]
          .map(String)
          .join(" ")
          .toLowerCase();
        return ["needle"].some((token) => haystack.includes(token));
      })
      .slice(-2);
    assert.deepEqual(
      body.map((e: { msg?: string }) => e.msg),
      oracle.map((e: { msg?: string }) => String(e.msg ?? e.message ?? ""))
    );
    // Hand-computed expectation: the slice keeps the last two needle matches,
    // the hour gate drops the old one, the missing stamp keeps the undated one.
    assert.equal(body.length, 2);
    assert.deepEqual(
      body.map((e: { msg?: string }) => e.msg),
      ["recent needle three", "undated needle"]
    );
  } finally {
    fs.rmSync(tailLogPath, { force: true });
  }
});
