import test from "node:test";
import assert from "node:assert/strict";
import { resolveMediaOrigin } from "../../../src/server/origin/mediaOrigin.ts";

/**
 * #16372 — media URLs handed back to the caller. The server binds HOSTNAME=0.0.0.0, so
 * `request.url` reports `http://0.0.0.0:<port>`; forwarding headers are honoured only from a
 * trusted proxy, otherwise a client could mint URLs on any host via X-Forwarded-Host.
 */
const ENV_KEYS = [
  "OMNIROUTE_PUBLIC_BASE_URL",
  "NEXT_PUBLIC_BASE_URL",
  "NEXT_PUBLIC_APP_URL",
  "OMNIROUTE_TRUST_PROXY",
  "OMNIROUTE_PEER_STAMP_TOKEN",
] as const;

function withEnv(values: Partial<Record<(typeof ENV_KEYS)[number], string>>, fn: () => void) {
  const saved = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
  for (const key of ENV_KEYS) {
    if (values[key] === undefined) delete process.env[key];
    else process.env[key] = values[key];
  }
  try {
    fn();
  } finally {
    for (const key of ENV_KEYS) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  }
}

const STAMP_TOKEN = "t".repeat(32);
const BIND_URL = "http://0.0.0.0:20128/api/v1/videos/generations";

test("an untrusted X-Forwarded-Host is ignored (no proxy trust configured)", () =>
  withEnv({}, () => {
    const request = new Request(BIND_URL, {
      headers: {
        host: "gateway.lan:20128",
        "x-forwarded-host": "evil.example",
        "x-forwarded-proto": "https",
      },
    });
    assert.equal(resolveMediaOrigin(request), "http://gateway.lan:20128");
  }));

test("forwarded host and proto are honoured from a trusted loopback proxy", () =>
  withEnv({ OMNIROUTE_TRUST_PROXY: "loopback", OMNIROUTE_PEER_STAMP_TOKEN: STAMP_TOKEN }, () => {
    const request = new Request(BIND_URL, {
      headers: {
        host: "127.0.0.1:20128",
        "x-forwarded-host": "assistant.example.app",
        "x-forwarded-proto": "https",
        "x-omniroute-peer-ip": `${STAMP_TOKEN}|127.0.0.1`,
      },
    });
    assert.equal(resolveMediaOrigin(request), "https://assistant.example.app");
  }));

test("forwarding headers from a remote (untrusted) peer are ignored even with proxy trust on", () =>
  withEnv({ OMNIROUTE_TRUST_PROXY: "loopback", OMNIROUTE_PEER_STAMP_TOKEN: STAMP_TOKEN }, () => {
    const request = new Request(BIND_URL, {
      headers: {
        host: "gateway.lan:20128",
        "x-forwarded-host": "evil.example",
        "x-forwarded-proto": "https",
        "x-omniroute-peer-ip": `${STAMP_TOKEN}|203.0.113.9`,
      },
    });
    assert.equal(resolveMediaOrigin(request), "http://gateway.lan:20128");
  }));

test("a configured public base URL wins over every header", () =>
  withEnv({ OMNIROUTE_PUBLIC_BASE_URL: "https://omni.example.com/" }, () => {
    const request = new Request(BIND_URL, {
      headers: { host: "gateway.lan:20128", "x-forwarded-host": "evil.example" },
    });
    assert.equal(resolveMediaOrigin(request), "https://omni.example.com");
  }));

test("a malformed Host falls back to the request origin", () =>
  withEnv({}, () => {
    const request = new Request(BIND_URL, { headers: { host: "bad host/../x" } });
    assert.equal(resolveMediaOrigin(request), "http://0.0.0.0:20128");
  }));
