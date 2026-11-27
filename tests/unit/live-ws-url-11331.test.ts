import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  deriveLiveWsPath,
  isLoopbackLiveWsHostname,
  resolveLiveWsUrl,
  sanitizeLiveWsPort,
} from "../../src/shared/utils/wsPath.ts";

/**
 * The /api/v1/ws?handshake=1 response reports `live.port` — the port the live
 * server is actually listening on — but the dashboard client read only
 * `publicUrl` and `path`. An operator who moved the server with LIVE_WS_PORT
 * still got the compiled-in 20132 and a permanently disconnected Combo Studio
 * (#11331).
 */
const DEFAULT_URL = "wss://omniroute.example.tld:20132/live-ws";

describe("sanitizeLiveWsPort", () => {
  it("accepts a port in range, as a number or a string", () => {
    assert.equal(sanitizeLiveWsPort(20140), 20140);
    assert.equal(sanitizeLiveWsPort("20140"), 20140);
  });

  it("rejects anything that is not a usable port", () => {
    for (const value of [0, -1, 65536, 1.5, "", "abc", null, undefined, {}, NaN]) {
      assert.equal(sanitizeLiveWsPort(value), null, `expected null for ${String(value)}`);
    }
  });
});

describe("resolveLiveWsUrl", () => {
  it("uses the port the handshake reports instead of the compiled-in one", () => {
    const url = resolveLiveWsUrl({ handshakePort: 20140, defaultUrl: DEFAULT_URL });
    assert.equal(new URL(url).port, "20140");
    assert.equal(new URL(url).hostname, "omniroute.example.tld");
    assert.equal(new URL(url).pathname, "/live-ws");
  });

  it("keeps the default when the handshake reports nothing", () => {
    assert.equal(resolveLiveWsUrl({ defaultUrl: DEFAULT_URL }), DEFAULT_URL);
  });

  it("ignores a port the handshake cannot mean", () => {
    assert.equal(resolveLiveWsUrl({ handshakePort: 0, defaultUrl: DEFAULT_URL }), DEFAULT_URL);
    assert.equal(
      resolveLiveWsUrl({ handshakePort: 70000 as number, defaultUrl: DEFAULT_URL }),
      DEFAULT_URL
    );
  });

  it("applies the port and the path together", () => {
    const url = new URL(
      resolveLiveWsUrl({ handshakePort: 9443, handshakePath: "/ws/live", defaultUrl: DEFAULT_URL })
    );
    assert.equal(url.port, "9443");
    assert.equal(url.pathname, "/ws/live");
  });

  it("ignores a path that is not a path", () => {
    const url = new URL(resolveLiveWsUrl({ handshakePath: "live-ws", defaultUrl: DEFAULT_URL }));
    assert.equal(url.pathname, "/live-ws");
  });

  it("lets a complete publicUrl win over the reported port", () => {
    assert.equal(
      resolveLiveWsUrl({
        handshakeUrl: "wss://omniroute.example.tld/live-ws",
        handshakePort: 20140,
        defaultUrl: DEFAULT_URL,
      }),
      "wss://omniroute.example.tld/live-ws"
    );
  });

  it("lets an explicit wsUrl win over everything", () => {
    assert.equal(
      resolveLiveWsUrl({
        explicit: "wss://elsewhere.example/socket",
        handshakeUrl: "wss://omniroute.example.tld/live-ws",
        handshakePort: 20140,
        defaultUrl: DEFAULT_URL,
      }),
      "wss://elsewhere.example/socket"
    );
  });

  it("falls back to the default rather than throwing on an unparseable default", () => {
    assert.equal(resolveLiveWsUrl({ handshakePort: 20140, defaultUrl: "not a url" }), "not a url");
  });

  it("leaves deriveLiveWsPath alone", () => {
    assert.equal(deriveLiveWsPath("wss://host:20132/ws/live"), "/ws/live");
    assert.equal(deriveLiveWsPath("wss://host:20132/"), "/live-ws");
    assert.equal(deriveLiveWsPath(undefined), "/live-ws");
  });
});

/**
 * KEA-9514: behind an HTTPS reverse proxy that exposes only 443, the dashboard dialled
 * `wss://<host>:20132/live-ws` on every page, forever. The production server
 * (scripts/dev/standalone-server-ws.mjs) already relays `/live-ws` upgrades on the main
 * HTTP port, so off loopback the default is now the page's own origin. Loopback keeps the
 * separate live port, because `next dev` has no upgrade handler on the HTTP port.
 */
describe("resolveLiveWsUrl off loopback (KEA-9514)", () => {
  const httpsPage = { protocol: "https:", hostname: "example.com", host: "example.com" };
  const loopbackPage = { protocol: "http:", hostname: "localhost", host: "localhost:20128" };
  // What the hook compiles in from the page location: the separate live port.
  const portDefault = (page: { protocol: string; hostname: string }) =>
    `${page.protocol === "https:" ? "wss:" : "ws:"}//${page.hostname}:20132/live-ws`;

  it("dials the same origin on an https page with no public URL", () => {
    assert.equal(
      resolveLiveWsUrl({
        // The handshake always reports the live server's own port; it must not win here.
        handshakePort: 20132,
        handshakePath: "/live-ws",
        location: httpsPage,
        defaultUrl: portDefault(httpsPage),
      }),
      "wss://example.com/live-ws"
    );
  });

  it("dials ws:// on the same origin on an http page, keeping the page's port", () => {
    const lanPage = { protocol: "http:", hostname: "192.168.0.15", host: "192.168.0.15:20128" };
    assert.equal(
      resolveLiveWsUrl({ location: lanPage, defaultUrl: portDefault(lanPage) }),
      "ws://192.168.0.15:20128/live-ws"
    );
  });

  it("uses the path the handshake reports on the same origin", () => {
    assert.equal(
      resolveLiveWsUrl({
        handshakePath: "/omniroute/live",
        location: httpsPage,
        defaultUrl: portDefault(httpsPage),
      }),
      "wss://example.com/omniroute/live"
    );
  });

  it("keeps the live port on loopback", () => {
    for (const page of [
      loopbackPage,
      { protocol: "http:", hostname: "127.0.0.1", host: "127.0.0.1:20128" },
      { protocol: "http:", hostname: "[::1]", host: "[::1]:20128" },
    ]) {
      assert.equal(
        resolveLiveWsUrl({ handshakePort: 20132, location: page, defaultUrl: portDefault(page) }),
        `ws://${page.hostname}:20132/live-ws`,
        `expected the live port for ${page.hostname}`
      );
    }
  });

  it("keeps honouring a moved live port on loopback", () => {
    assert.equal(
      resolveLiveWsUrl({
        handshakePort: 20140,
        location: loopbackPage,
        defaultUrl: portDefault(loopbackPage),
      }),
      "ws://localhost:20140/live-ws"
    );
  });

  it("lets an explicit public URL win over the same-origin default", () => {
    assert.equal(
      resolveLiveWsUrl({
        handshakeUrl: "wss://ws.example.com/socket",
        location: httpsPage,
        defaultUrl: portDefault(httpsPage),
      }),
      "wss://ws.example.com/socket"
    );
    assert.equal(
      resolveLiveWsUrl({
        explicit: "wss://built-in.example.com/live-ws",
        location: httpsPage,
        defaultUrl: portDefault(httpsPage),
      }),
      "wss://built-in.example.com/live-ws"
    );
  });

  it("falls back to the live port when the server says its HTTP port cannot relay", () => {
    assert.equal(
      resolveLiveWsUrl({
        handshakeSameOrigin: false,
        handshakePort: 20132,
        location: httpsPage,
        defaultUrl: portDefault(httpsPage),
      }),
      "wss://example.com:20132/live-ws"
    );
  });

  it("yields no URL when the handshake says the live server is disabled", () => {
    for (const page of [httpsPage, loopbackPage]) {
      assert.equal(
        resolveLiveWsUrl({
          handshakeEnabled: false,
          handshakePort: 20132,
          location: page,
          defaultUrl: portDefault(page),
        }),
        null
      );
    }
  });
});

describe("isLoopbackLiveWsHostname (KEA-9514)", () => {
  it("treats localhost, 127.0.0.0/8, ::1 and 0.0.0.0 as loopback", () => {
    for (const hostname of ["localhost", "127.0.0.1", "127.1.2.3", "[::1]", "::1", "0.0.0.0"]) {
      assert.equal(isLoopbackLiveWsHostname(hostname), true, hostname);
    }
  });

  it("treats LAN and public hosts as remote", () => {
    for (const hostname of ["example.com", "192.168.0.15", "10.0.0.2", "localhost.example.com"]) {
      assert.equal(isLoopbackLiveWsHostname(hostname), false, hostname);
    }
  });
});
