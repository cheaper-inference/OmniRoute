/**
 * Unit tests for `liveServerAllowList`.
 *
 * Bug #1 (plans/2026-06-23-omniroute-v3.8.34-deep-audit.md) introduced the
 * `LIVE_WS_ALLOWED_HOSTS` opt-in for LAN/Tailscale deployments. These tests
 * pin down the contract: defaults remain loopback-only; the env var extends
 * the allow-list with bare hostnames or `host:port` pairs; the absence of
 * Origin is still only acceptable on loopback.
 *
 * Runner note: lives under tests/unit/security/ (a node:test–collected subdir)
 * and uses node:test + assert/strict so the gate `check:test-discovery` actually
 * runs it. The original copy under tests/unit/server/ used vitest in a path no
 * runner collected — it never executed (caught by Gate 6A.1).
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildAllowedOrigins,
  buildAllowedHosts,
  isOriginAllowed,
  isLiveWsAuthAcceptedForOrigin,
  originHost,
  originHostMatches,
  parseCsvEnv,
  DEFAULT_ALLOWED_ORIGINS,
  resolveLiveWsOriginVerdict,
} from "@/server/ws/liveServerAllowList";

const EMPTY_ENV: NodeJS.ProcessEnv = {};

describe("parseCsvEnv", () => {
  it("returns empty set for undefined", () => {
    assert.equal(parseCsvEnv(undefined).size, 0);
  });

  it("returns empty set for empty string", () => {
    assert.equal(parseCsvEnv("").size, 0);
  });

  it("trims whitespace and drops empty entries", () => {
    const out = parseCsvEnv("  a , b ,, c  ");
    assert.deepEqual([...out], ["a", "b", "c"]);
  });

  it("deduplicates entries", () => {
    const out = parseCsvEnv("a,a,b");
    assert.deepEqual([...out], ["a", "b"]);
  });
});

describe("buildAllowedOrigins", () => {
  it("includes the loopback defaults", () => {
    const out = buildAllowedOrigins(EMPTY_ENV);
    for (const origin of DEFAULT_ALLOWED_ORIGINS) {
      assert.equal(out.has(origin), true);
    }
  });

  it("extends defaults with LIVE_WS_ALLOWED_ORIGINS", () => {
    const env = {
      ...EMPTY_ENV,
      LIVE_WS_ALLOWED_ORIGINS: "https://dash.example.com,https://other.example.com",
    };
    const out = buildAllowedOrigins(env);
    assert.equal(out.has("https://dash.example.com"), true);
    assert.equal(out.has("https://other.example.com"), true);
    // Defaults remain.
    assert.equal(out.has("http://localhost:20128"), true);
  });

  it("includes dynamic loopback origins when custom PORT is configured", () => {
    const env = {
      ...EMPTY_ENV,
      PORT: "37128",
    };
    const out = buildAllowedOrigins(env);
    assert.equal(out.has("http://localhost:37128"), true);
    assert.equal(out.has("http://127.0.0.1:37128"), true);
    assert.equal(out.has("http://[::1]:37128"), true);
    assert.equal(out.has("http://localhost:20128"), true);
  });
});

describe("buildAllowedHosts", () => {
  it("returns empty set when env is not set", () => {
    assert.equal(buildAllowedHosts(EMPTY_ENV).size, 0);
  });

  it("parses comma-separated hosts", () => {
    const env = { ...EMPTY_ENV, LIVE_WS_ALLOWED_HOSTS: "100.96.135.160,desktop.tailnet.ts.net" };
    const out = buildAllowedHosts(env);
    assert.equal(out.has("100.96.135.160"), true);
    assert.equal(out.has("desktop.tailnet.ts.net"), true);
  });
});

describe("originHost", () => {
  it("returns host and hostname for a valid URL", () => {
    assert.deepEqual(originHost("http://100.96.135.160:20128"), {
      host: "100.96.135.160:20128",
      hostname: "100.96.135.160",
    });
  });

  it("returns null for an invalid URL", () => {
    assert.equal(originHost("not a url"), null);
  });
});

describe("originHostMatches", () => {
  it("returns false when the allow-list is empty", () => {
    assert.equal(originHostMatches("http://100.96.135.160:20128", new Set()), false);
  });

  it("matches by exact host:port", () => {
    const allow = new Set(["100.96.135.160:20128"]);
    assert.equal(originHostMatches("http://100.96.135.160:20128", allow), true);
  });

  it("matches by bare hostname regardless of port", () => {
    const allow = new Set(["100.96.135.160"]);
    assert.equal(originHostMatches("http://100.96.135.160:20128", allow), true);
    assert.equal(originHostMatches("http://100.96.135.160:55555", allow), true);
  });

  it("returns false for a non-matching host", () => {
    const allow = new Set(["100.96.135.160"]);
    assert.equal(originHostMatches("http://10.0.0.5:20128", allow), false);
  });

  it("returns false for an unparseable origin", () => {
    const allow = new Set(["100.96.135.160"]);
    assert.equal(originHostMatches("not-a-url", allow), false);
  });
});

describe("isOriginAllowed", () => {
  it("rejects any non-loopback origin by default", () => {
    assert.equal(isOriginAllowed("http://100.96.135.160:20128", EMPTY_ENV), false);
  });

  it("accepts the default loopback origins", () => {
    assert.equal(isOriginAllowed("http://127.0.0.1:20128", EMPTY_ENV), true);
    assert.equal(isOriginAllowed("http://localhost:20128", EMPTY_ENV), true);
    assert.equal(isOriginAllowed("http://[::1]:20128", EMPTY_ENV), true);
    // 0.0.0.0 is loopback-equivalent in the browser; the dashboard is often
    // opened at http://0.0.0.0:20128, which sends exactly that Origin on WS.
    assert.equal(isOriginAllowed("http://0.0.0.0:20128", EMPTY_ENV), true);
  });

  it("accepts an Origin matching LIVE_WS_ALLOWED_ORIGINS", () => {
    const env = { ...EMPTY_ENV, LIVE_WS_ALLOWED_ORIGINS: "https://dash.example.com" };
    assert.equal(isOriginAllowed("https://dash.example.com", env), true);
  });

  it("accepts a Tailscale Origin when LIVE_WS_ALLOWED_HOSTS is set", () => {
    const env = { ...EMPTY_ENV, LIVE_WS_ALLOWED_HOSTS: "100.96.135.160" };
    assert.equal(isOriginAllowed("http://100.96.135.160:20128", env), true);
  });

  it("accepts a Tailscale Origin matched by host:port when LIVE_WS_ALLOWED_HOSTS is set", () => {
    const env = { ...EMPTY_ENV, LIVE_WS_ALLOWED_HOSTS: "100.96.135.160:20128" };
    assert.equal(isOriginAllowed("http://100.96.135.160:20128", env), true);
  });

  it("does not treat a wildcard host as an allow-all origin policy", () => {
    const env = { ...EMPTY_ENV, LIVE_WS_ALLOWED_HOSTS: "*" };
    assert.equal(isOriginAllowed("http://100.90.139.116:37128", env), false);
  });

  it("does NOT accept a Tailscale Origin when LIVE_WS_ALLOWED_HOSTS is unset", () => {
    // Critical security invariant: without explicit opt-in, the LAN/Tailscale
    // surface is closed even though the listener is reachable.
    assert.equal(isOriginAllowed("http://100.96.135.160:20128", EMPTY_ENV), false);
  });

  it("rejects a missing Origin when bound to LAN (0.0.0.0)", () => {
    // A CLI client that omits Origin should NOT be accepted when the
    // operator opted into LAN exposure. Browsers always send Origin, so the
    // empty-Origin path is for non-browser callers; the security stance is
    // "refuse unless loopback".
    const env = { ...EMPTY_ENV, LIVE_WS_HOST: "0.0.0.0" };
    assert.equal(isOriginAllowed(undefined, env), false);
  });

  it("accepts a missing Origin on loopback (CLI/MCP)", () => {
    // CLI/MCP clients running on the same host omit Origin. The default
    // listener (127.0.0.1) accepts them.
    assert.equal(isOriginAllowed(undefined, EMPTY_ENV), true);
  });

  it("accepts a missing Origin on ::1 / localhost hosts", () => {
    const env1 = { ...EMPTY_ENV, LIVE_WS_HOST: "::1" };
    assert.equal(isOriginAllowed(undefined, env1), true);
    const env2 = { ...EMPTY_ENV, LIVE_WS_HOST: "localhost" };
    assert.equal(isOriginAllowed(undefined, env2), true);
  });
});

/**
 * KEA-9514: the dashboard now dials `/live-ws` on its own origin off loopback, and the
 * production server relays that upgrade to the live server with the browser's headers
 * unchanged (scripts/dev/standalone-server-ws.mjs::proxyLiveWs). Such a socket is accepted
 * when its Origin is the origin the browser dialled (the Host it sent), and only with a real
 * credential (see isLiveWsAuthAcceptedForOrigin). A foreign Origin is still refused, which
 * is what stops cross-site WebSocket hijacking: a page on another site cannot make the
 * browser send a matching Origin.
 */
describe("resolveLiveWsOriginVerdict (KEA-9514)", () => {
  const relayed = (headers: Record<string, string>) => ({
    "x-forwarded-for": "203.0.113.7",
    "x-forwarded-proto": "https",
    ...headers,
  });

  it("accepts the page's own origin as same-origin", () => {
    assert.equal(
      resolveLiveWsOriginVerdict(
        "https://example.com",
        relayed({ host: "example.com" }),
        EMPTY_ENV
      ),
      "same-origin"
    );
    // A Host carrying the scheme's default port is the same origin.
    assert.equal(
      resolveLiveWsOriginVerdict("https://example.com", { host: "example.com:443" }, EMPTY_ENV),
      "same-origin"
    );
    assert.equal(
      resolveLiveWsOriginVerdict(
        "http://192.168.0.15:20128",
        { host: "192.168.0.15:20128" },
        EMPTY_ENV
      ),
      "same-origin"
    );
    assert.equal(
      resolveLiveWsOriginVerdict("https://Example.COM", { host: "example.com" }, EMPTY_ENV),
      "same-origin"
    );
  });

  it("still refuses a foreign Origin through the relay", () => {
    for (const origin of [
      "https://evil.example",
      "https://example.com.evil.example",
      "https://sub.example.com",
      "https://example.com:8443",
      "null",
      "file://",
      "chrome-extension://abcdef",
      "not a url",
    ]) {
      assert.equal(
        resolveLiveWsOriginVerdict(origin, relayed({ host: "example.com" }), EMPTY_ENV),
        "forbidden",
        origin
      );
    }
  });

  it("refuses when the Host header is missing or malformed", () => {
    assert.equal(resolveLiveWsOriginVerdict("https://example.com", {}, EMPTY_ENV), "forbidden");
    for (const host of ["", "example.com/evil", "user@example.com", "example.com evil"]) {
      assert.equal(
        resolveLiveWsOriginVerdict("https://example.com", { host }, EMPTY_ENV),
        "forbidden",
        JSON.stringify(host)
      );
    }
  });

  it("keeps the static allow-list verdict ahead of the same-origin rule", () => {
    assert.equal(
      resolveLiveWsOriginVerdict("http://localhost:20128", { host: "localhost:20128" }, EMPTY_ENV),
      "allowed"
    );
    assert.equal(
      resolveLiveWsOriginVerdict(
        "https://dash.example.com",
        { host: "elsewhere.example" },
        { ...EMPTY_ENV, LIVE_WS_ALLOWED_ORIGINS: "https://dash.example.com" }
      ),
      "allowed"
    );
  });

  it("keeps the no-Origin rule unchanged", () => {
    assert.equal(
      resolveLiveWsOriginVerdict(undefined, { host: "example.com" }, EMPTY_ENV),
      "allowed"
    );
    assert.equal(
      resolveLiveWsOriginVerdict(
        undefined,
        { host: "example.com" },
        { ...EMPTY_ENV, LIVE_WS_HOST: "0.0.0.0" }
      ),
      "forbidden"
    );
  });

  it("reads X-Forwarded-Host / -Proto only when OMNIROUTE_TRUST_PROXY trusts the proxy", () => {
    // A proxy that rewrites Host to the upstream address.
    const headers = relayed({ host: "127.0.0.1:20128", "x-forwarded-host": "example.com" });
    assert.equal(
      resolveLiveWsOriginVerdict("https://example.com", headers, EMPTY_ENV),
      "forbidden"
    );
    const trusted = { ...EMPTY_ENV, OMNIROUTE_TRUST_PROXY: "loopback" };
    assert.equal(
      resolveLiveWsOriginVerdict("https://example.com", headers, trusted),
      "same-origin"
    );
    // With the proxy trusted, its scheme must match the Origin's.
    assert.equal(resolveLiveWsOriginVerdict("http://example.com", headers, trusted), "forbidden");
    assert.equal(resolveLiveWsOriginVerdict("https://evil.example", headers, trusted), "forbidden");
  });

  it("does not widen isOriginAllowed (used by the embed proxy too)", () => {
    assert.equal(isOriginAllowed("https://example.com", EMPTY_ENV), false);
  });
});

describe("isLiveWsAuthAcceptedForOrigin (KEA-9514)", () => {
  it("requires a real credential for a same-origin socket", () => {
    assert.equal(
      isLiveWsAuthAcceptedForOrigin("same-origin", { authorized: true, anonymous: true }),
      false
    );
    assert.equal(isLiveWsAuthAcceptedForOrigin("same-origin", { authorized: true }), true);
    assert.equal(isLiveWsAuthAcceptedForOrigin("same-origin", { authorized: false }), false);
  });

  it("leaves allow-listed origins as they were, anonymous mode included", () => {
    assert.equal(
      isLiveWsAuthAcceptedForOrigin("allowed", { authorized: true, anonymous: true }),
      true
    );
    assert.equal(isLiveWsAuthAcceptedForOrigin("allowed", { authorized: false }), false);
    assert.equal(isLiveWsAuthAcceptedForOrigin("forbidden", { authorized: true }), false);
  });
});
