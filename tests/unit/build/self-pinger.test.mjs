import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { mock, test } from "node:test";

import { resolveSelfPingConfig, startSelfPinger } from "../../../scripts/build/runtime-env.mjs";

const BASE = "https://omni.onrender.com";

test("stays off without a public URL", () => {
  assert.deepEqual(resolveSelfPingConfig({}), { status: "off" });
  assert.deepEqual(resolveSelfPingConfig({ SELF_PING_URL: "  " }), { status: "off" });
  assert.deepEqual(resolveSelfPingConfig({ SELF_PING_INTERVAL_SECONDS: "60" }), { status: "off" });
});

for (const value of ["0", "false", "FALSE", " off ", "no"]) {
  test(`SELF_PING_ENABLED=${JSON.stringify(value)} turns it off even on Render`, () => {
    assert.deepEqual(
      resolveSelfPingConfig({ SELF_PING_ENABLED: value, RENDER_EXTERNAL_URL: BASE }),
      { status: "off" }
    );
  });
}

test("Render's URL enables it with the default path and interval", () => {
  const config = resolveSelfPingConfig({ RENDER_EXTERNAL_URL: BASE });
  assert.equal(config.status, "on");
  assert.equal(config.target.href, `${BASE}/api/monitoring/health`);
  assert.equal(config.intervalSeconds, 180);
});

test("SELF_PING_URL wins over RENDER_EXTERNAL_URL and SELF_PING_PATH overrides the path", () => {
  const config = resolveSelfPingConfig({
    RENDER_EXTERNAL_URL: BASE,
    SELF_PING_URL: "http://example.test:8080",
    SELF_PING_PATH: "/custom",
  });
  assert.equal(config.target.href, "http://example.test:8080/custom");
});

for (const url of ["not a url", "ftp://example.test"]) {
  test(`an unusable base URL (${url}) disables it`, () => {
    assert.deepEqual(resolveSelfPingConfig({ SELF_PING_URL: url }), { status: "invalid" });
  });
}

for (const path of ["https://attacker.test/x", "//attacker.test/x", "health"]) {
  test(`SELF_PING_PATH=${path} cannot leave the configured host`, () => {
    assert.deepEqual(resolveSelfPingConfig({ SELF_PING_URL: BASE, SELF_PING_PATH: path }), {
      status: "invalid",
    });
  });
}

for (const [value, expected] of [
  ["30", 30],
  ["600", 600],
  ["29", 180],
  ["0", 180],
  ["-5", 180],
  ["soon", 180],
]) {
  test(`SELF_PING_INTERVAL_SECONDS=${value} resolves to ${expected}`, () => {
    const config = resolveSelfPingConfig({
      SELF_PING_URL: BASE,
      SELF_PING_INTERVAL_SECONDS: value,
    });
    assert.equal(config.intervalSeconds, expected);
  });
}

/** Runs `run` with fake timers and console, and hands back what the pinger logged. */
async function withPinger(run) {
  const logs = [];
  const log = mock.method(console, "log", (line) => logs.push(line));
  const warn = mock.method(console, "warn", (line) => logs.push(line));
  mock.timers.enable({ apis: ["setTimeout", "setInterval"] });
  try {
    await run(logs);
  } finally {
    mock.timers.reset();
    log.mock.restore();
    warn.mock.restore();
  }
}

const settle = () => new Promise((resolve) => setImmediate(resolve));

test("inert config arms no timer, sends nothing and logs nothing", async () => {
  await withPinger(async (logs) => {
    const fetchImpl = mock.fn();
    startSelfPinger({}, fetchImpl);
    mock.timers.tick(24 * 60 * 60 * 1000);
    await settle();
    assert.equal(fetchImpl.mock.callCount(), 0);
    assert.deepEqual(logs, []);
  });
});

test("an invalid config warns once and never pings", async () => {
  await withPinger(async (logs) => {
    const fetchImpl = mock.fn();
    startSelfPinger({ SELF_PING_URL: "ftp://example.test" }, fetchImpl);
    mock.timers.tick(24 * 60 * 60 * 1000);
    await settle();
    assert.equal(fetchImpl.mock.callCount(), 0);
    assert.equal(logs.length, 1);
    assert.match(logs[0], /disabled/);
  });
});

test("pings the public URL after the first delay, then on the interval, logging changes only", async () => {
  await withPinger(async (logs) => {
    const statuses = [200, 200, 503];
    const fetchImpl = mock.fn(async () => new Response(null, { status: statuses.shift() }));
    startSelfPinger({ RENDER_EXTERNAL_URL: BASE }, fetchImpl);

    mock.timers.tick(59_999);
    assert.equal(fetchImpl.mock.callCount(), 0, "the server gets time to boot");
    mock.timers.tick(1);
    await settle();
    assert.equal(fetchImpl.mock.callCount(), 1);
    const [target, init] = fetchImpl.mock.calls[0].arguments;
    assert.equal(target.href, `${BASE}/api/monitoring/health`);
    assert.equal(init.headers["user-agent"], "omniroute-self-pinger");

    mock.timers.tick(180_000);
    await settle();
    mock.timers.tick(180_000);
    await settle();
    assert.equal(fetchImpl.mock.callCount(), 3);
    assert.deepEqual(
      logs.filter((line) => line.includes("->")),
      [
        "[self-pinger] GET /api/monitoring/health -> 200",
        "[self-pinger] GET /api/monitoring/health -> 503",
      ]
    );
  });
});

test("a failed ping is reported and does not stop the next one", async () => {
  await withPinger(async (logs) => {
    const fetchImpl = mock.fn(async () => {
      throw new Error("connect ECONNREFUSED");
    });
    startSelfPinger({ SELF_PING_URL: BASE }, fetchImpl);
    mock.timers.tick(60_000);
    await settle();
    mock.timers.tick(180_000);
    await settle();
    assert.equal(fetchImpl.mock.callCount(), 2);
    assert.equal(logs.filter((line) => line.includes("-> failed")).length, 1);
  });
});

test("the launcher starts the pinger with the child environment", () => {
  // The launcher spawns the server at import, so this one guard has to read its source.
  const source = readFileSync(
    new URL("../../../scripts/dev/run-standalone.mjs", import.meta.url),
    "utf8"
  );
  assert.match(source, /^startSelfPinger\(childEnv\);$/m);
});
