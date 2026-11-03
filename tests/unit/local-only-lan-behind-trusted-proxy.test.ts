import test from "node:test";
import assert from "node:assert/strict";

import { stampPeerIp } from "../../scripts/dev/peer-stamp.mjs";
import { isLoopbackRequest, isPrivateLanRequest } from "../../src/server/authz/peerContext.ts";

/**
 * A private-network client reaching OmniRoute through a private reverse proxy (e.g. a
 * Tailscale/LAN nginx in front of the server) is still a private-network client. With
 * OMNIROUTE_TRUST_PROXY=private the LOCAL_ONLY LAN verdict judges the client that proxy
 * reported; without it, or for anything the proxy chain cannot vouch for, the proxied
 * request stays non-local exactly as before (#4632).
 */

function stamped(peer: string, headers: Record<string, string>) {
  const req = { socket: { remoteAddress: peer }, headers: { ...headers } };
  stampPeerIp(req);
  return { request: { headers: new Headers(req.headers as Record<string, string>) } } as never;
}

function withTrustProxy<T>(value: string | undefined, fn: () => T): T {
  const previous = process.env.OMNIROUTE_TRUST_PROXY;
  if (value === undefined) delete process.env.OMNIROUTE_TRUST_PROXY;
  else process.env.OMNIROUTE_TRUST_PROXY = value;
  try {
    return fn();
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_TRUST_PROXY;
    else process.env.OMNIROUTE_TRUST_PROXY = previous;
  }
}

const TAILNET_PROXY = "100.64.0.7";
const TAILNET_CLIENT = "100.64.0.21";

test("private client behind a private proxy is LAN when OMNIROUTE_TRUST_PROXY=private", () => {
  withTrustProxy("private", () => {
    const ctx = stamped(TAILNET_PROXY, { "x-forwarded-for": TAILNET_CLIENT });
    assert.equal(isPrivateLanRequest(ctx), true);
    assert.equal(isLoopbackRequest(ctx), false, "never loopback: CLI-token gate stays socket-only");
  });
});

test("the same proxied request stays non-local without the opt-in (unchanged default)", () => {
  for (const mode of [undefined, "true", "loopback", "false"]) {
    withTrustProxy(mode, () => {
      const ctx = stamped(TAILNET_PROXY, { "x-forwarded-for": TAILNET_CLIENT });
      assert.equal(isPrivateLanRequest(ctx), false, `mode=${mode}`);
    });
  }
});

test("an internet client behind the private proxy is never LAN", () => {
  withTrustProxy("private", () => {
    assert.equal(
      isPrivateLanRequest(stamped(TAILNET_PROXY, { "x-forwarded-for": "203.0.113.9" })),
      false
    );
    // A spoofed private entry on the left is client text; the right-most untrusted hop wins.
    assert.equal(
      isPrivateLanRequest(stamped(TAILNET_PROXY, { "x-forwarded-for": `10.0.0.5, 203.0.113.9` })),
      false
    );
  });
});

test("a chain that names no client (only loopback hops) proves nothing", () => {
  withTrustProxy("private", () => {
    // e.g. a tunnel daemon on the proxy host whose proxy overwrites X-Forwarded-For
    // with $remote_addr: every internet client then looks like 127.0.0.1.
    assert.equal(
      isPrivateLanRequest(stamped(TAILNET_PROXY, { "x-forwarded-for": "127.0.0.1" })),
      false
    );
    assert.equal(isPrivateLanRequest(stamped(TAILNET_PROXY, { "x-real-ip": "127.0.0.1" })), false);
  });
});

test("tunnel/CDN ingress is never LAN, even with a private-looking chain", () => {
  withTrustProxy("private", () => {
    const ctx = stamped(TAILNET_PROXY, {
      "x-forwarded-for": TAILNET_CLIENT,
      "cf-connecting-ip": "198.51.100.4",
    });
    assert.equal(isPrivateLanRequest(ctx), false);
  });
});

test("only a loopback or private-network proxy may vouch for a LAN client", () => {
  withTrustProxy("private", () => {
    // Cloudflare edge peer (trusted for client-IP attribution, never for LAN locality).
    assert.equal(
      isPrivateLanRequest(stamped("104.16.0.1", { "x-forwarded-for": TAILNET_CLIENT })),
      false
    );
    // Public peer: its forwarding headers are client text and do not even mark via-proxy.
    assert.equal(
      isPrivateLanRequest(stamped("203.0.113.50", { "x-forwarded-for": TAILNET_CLIENT })),
      false
    );
  });
});

test("direct private and loopback peers keep their existing verdicts", () => {
  withTrustProxy("private", () => {
    assert.equal(isPrivateLanRequest(stamped(TAILNET_CLIENT, {})), true);
    assert.equal(isLoopbackRequest(stamped("127.0.0.1", {})), true);
    assert.equal(
      isLoopbackRequest(stamped("127.0.0.1", { "x-forwarded-for": TAILNET_CLIENT })),
      false
    );
  });
});
