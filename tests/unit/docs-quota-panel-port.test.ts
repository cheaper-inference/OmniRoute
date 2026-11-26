/**
 * The quota panel port documentation states what the code does. Each value the docs give that
 * has a constant or a decision function in src/lib/quotaPanelBridge.ts is compared with it.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import http from "node:http";
import net from "node:net";

const panel = await import("../../src/lib/quotaPanelBridge.ts");
const bridge = await import("../../src/lib/apiBridgeServer.ts");
const { getTrustProxyMode } = await import("../../src/server/origin/trustProxyMode.ts");

const envExample = readFileSync(".env.example", "utf8");
const envReference = readFileSync("docs/reference/ENVIRONMENT.md", "utf8");
const quotaShare = readFileSync("docs/routing/QUOTA_SHARE.md", "utf8");
const bridgeSource = readFileSync("src/lib/apiBridgeServer.ts", "utf8");

/** The text from a heading to the next heading of the same or a higher level. */
function sliceSection(doc: string, heading: string): string {
  const level = /^#+/.exec(heading)?.[0].length ?? 0;
  const lines = doc.split("\n");
  const start = lines.indexOf(heading);
  assert.notEqual(start, -1, `heading not found: ${heading}`);
  const end = lines.findIndex(
    (line, index) => index > start && new RegExp(`^#{1,${level}} `).test(line)
  );
  return lines.slice(start, end === -1 ? lines.length : end).join("\n");
}

/** Prose with its line breaks folded, so a sentence can be matched whole. */
function prose(section: string): string {
  return section.replace(/\s+/g, " ");
}

function match(text: string, pattern: RegExp): RegExpExecArray {
  const found = pattern.exec(text);
  assert.ok(found, `not found: ${pattern}`);
  return found;
}

const section = sliceSection(quotaShare, "### Dedicated port for the page");
const sectionText = prose(section);
const quotaEnvTable = sliceSection(quotaShare, "## Environment Variables");
const networkSection = sliceSection(envReference, "## 3. Network & Ports");

const UNSPLIT_PORTS = { apiPort: 20128, dashboardPort: 20128 };
const SPLIT_PORTS = { apiPort: 20129, dashboardPort: 20128 };

test(".env.example has both variables commented out, so the port is off by default", () => {
  assert.doesNotMatch(envExample, /^QUOTA_PANEL_(PORT|HOST)=/m);
  const port = match(envExample, /^# QUOTA_PANEL_PORT=([0-9]+)$/m)[1];
  const host = match(envExample, /^# QUOTA_PANEL_HOST=(\S+)$/m)[1];
  assert.equal(host, panel.QUOTA_PANEL_DEFAULT_HOST);
  const envMethods = match(
    envExample,
    /^# Every other path answers 404\. ([A-Z]+) and ([A-Z]+) are relayed without a body\.$/m
  );
  assert.deepEqual(envMethods.slice(1).sort(), [...panel.QUOTA_PANEL_METHOD_NAMES].sort());
  const [, envWrite, envMax] = match(
    envExample,
    /^# One JSON ([A-Z]+) of the quota view is also relayed, with a body of at most ([0-9]+) bytes\.$/m
  );
  assert.equal(envWrite, panel.QUOTA_PANEL_WRITE_METHOD);
  assert.equal(Number(envMax), panel.QUOTA_PANEL_WRITE_MAX_BYTES);
  assert.match(
    envExample,
    /^# The port serves plain HTTP\. Keep it on 127\.0\.0\.1 and put a TLS reverse proxy in front of it\.$/m
  );
  assert.match(
    envExample,
    /^# So does a value equal to the dashboard port, the API port or the live WebSocket port\.$/m
  );
  // The example port opens a listener with the default settings, live WebSocket server included.
  assert.deepEqual(panel.resolveQuotaPanelListener({ QUOTA_PANEL_PORT: port }, UNSPLIT_PORTS), {
    kind: "listen",
    port: Number(port),
    host: panel.QUOTA_PANEL_DEFAULT_HOST,
    basePath: "",
  });
});

test("the environment reference documents both variables with the code defaults", () => {
  assert.match(
    networkSection,
    /^\| `QUOTA_PANEL_PORT` +\| _\(unset\)_ +\| `src\/lib\/quotaPanelBridge\.ts` +\|/m
  );
  const host = match(networkSection, /^\| `QUOTA_PANEL_HOST` +\| `([^`]+)` +\|/m)[1];
  assert.equal(host, panel.QUOTA_PANEL_DEFAULT_HOST);
  const row = match(networkSection, /^\| `QUOTA_PANEL_PORT` .*$/m)[0];
  for (const sentence of [
    "Every other path answers 404.",
    "Unset means no listener.",
    "A value that is not a port from 1 to 65535 opens nothing and logs a warning.",
    "So does a value equal to the dashboard, API or live WebSocket port.",
  ]) {
    assert.ok(row.includes(sentence), sentence);
  }
  const [, first, second, write, max] = match(
    row,
    / ([A-Z]+) and ([A-Z]+) requests are relayed without a body, and one JSON ([A-Z]+) of the quota view with a body of at most ([0-9]+) bytes\. /
  );
  assert.deepEqual([first, second].sort(), [...panel.QUOTA_PANEL_METHOD_NAMES].sort());
  assert.equal(write, panel.QUOTA_PANEL_WRITE_METHOD);
  assert.equal(Number(max), panel.QUOTA_PANEL_WRITE_MAX_BYTES);
});

test("the Port Modes example uses a port that opens a listener", () => {
  const port = match(networkSection, /│ {2}QUOTA_PANEL_PORT=([0-9]+) +│/)[1];
  const host = match(networkSection, /│ {2}QUOTA_PANEL_HOST=(\S+) +│/)[1];
  assert.equal(host, panel.QUOTA_PANEL_DEFAULT_HOST);
  assert.equal(
    panel.resolveQuotaPanelListener({ QUOTA_PANEL_PORT: port }, UNSPLIT_PORTS).kind,
    "listen"
  );
  assert.ok(networkSection.includes(`→ Page: http://${host}:${port}/quota/<provider> `));
});

test("the section says the port is off unless QUOTA_PANEL_PORT is set, on the default host", () => {
  assert.ok(sectionText.includes("It is off unless the variable is set."));
  assert.deepEqual(panel.resolveQuotaPanelListener({}, UNSPLIT_PORTS), { kind: "off" });
  const host = match(
    sectionText,
    /`QUOTA_PANEL_HOST` is the bind address and defaults to `([^`]+)`\./
  )[1];
  assert.equal(host, panel.QUOTA_PANEL_DEFAULT_HOST);
  assert.match(
    quotaEnvTable,
    /^\| `QUOTA_PANEL_PORT` +\| _\(unset\)_ +\| Dedicated port for the self-service page\. Unset means no listener\. +\|$/m
  );
  assert.equal(
    match(quotaEnvTable, /^\| `QUOTA_PANEL_HOST` +\| `([^`]+)` +\|/m)[1],
    panel.QUOTA_PANEL_DEFAULT_HOST
  );
});

test("the path table lists exactly what the allowlist relays", () => {
  const rows = section.split("\n").filter((line) => /^\| `/.test(line));
  const listed = rows.flatMap((row) =>
    [...row.split("|")[1].matchAll(/`([^`]+)`/g)].map((m) => m[1])
  );
  assert.deepEqual(listed, [
    "/quota/{provider}",
    "/api/v1/me/quota/{provider}",
    "/v1/me/quota/{provider}",
    "/api/v1/me/usage",
    "/v1/me/usage",
    "/_next/static/",
    "/favicon.ico",
    "/favicon.svg",
    "/icon-512.png",
    "/apple-touch-icon.png",
  ]);
  for (const path of listed) {
    const sample = path
      .replace("{provider}", "claude")
      .replace(/\/_next\/static\/$/, "/_next/static/chunks/a.js");
    assert.equal(panel.isQuotaPanelPath(sample), true, sample);
  }
  for (const path of [
    "/dashboard",
    "/login",
    "/api/keys",
    "/v1/chat/completions",
    "/quota/claude/",
    "/sw.js",
    "/manifest.webmanifest",
    "/api/settings/favicon",
  ]) {
    assert.equal(panel.isQuotaPanelPath(path), false, path);
  }
  assert.ok(
    sectionText.includes(
      "The listener relays these paths to the main port and answers 404 for every other path:"
    )
  );
  assert.ok(
    sectionText.includes("- `/quota/{provider}/` with a trailing slash answers 404 on this port.")
  );
  assert.ok(
    sectionText.includes(
      "- The service worker and the web app manifest are not served on this port."
    )
  );
});

test("the section states the methods, the body rule and the upgrade rule", () => {
  const [, first, second] = match(
    sectionText,
    /`([A-Z]+)` and `([A-Z]+)` are relayed without a body\./
  );
  assert.deepEqual([first, second].sort(), [...panel.QUOTA_PANEL_METHOD_NAMES].sort());
  for (const sentence of [
    "Any other method answers 404, except a CONNECT request, whose connection is closed with no answer.",
    "Any other request that declares a body answers 404 and its connection is closed.",
    "A raw control character in the target is answered 400 by the HTTP parser, before this port's own check.",
    "Upgrade requests are refused and their connection is closed.",
    "The dashboard, the login page, the management API and the inference routes cannot be reached through this port.",
  ]) {
    assert.ok(sectionText.includes(sentence), sentence);
  }
  const [, prefixList, nameList] = match(
    sectionText,
    /Request headers that the framework reserves for its own use are not relayed: names that begin with (.+?), and the names (.+?)\. The request is relayed without them\./
  );
  const ticked = (text: string) => [...text.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
  const { droppedRequestHeaders } = bridge.createQuotaPanelRole();
  assert.deepEqual(ticked(prefixList), [...panel.QUOTA_PANEL_DROPPED_HEADER_PREFIXES]);
  assert.deepEqual(ticked(nameList), [...panel.QUOTA_PANEL_DROPPED_HEADER_NAMES]);
  assert.deepEqual([...droppedRequestHeaders.prefixes], ticked(prefixList));
  assert.deepEqual([...droppedRequestHeaders.names], ticked(nameList));
});

test("the section states the port clashes, and the live WebSocket default matches the code", () => {
  assert.ok(sectionText.includes("It must differ from the dashboard port and the API port."));
  const liveDefault = match(
    sectionText,
    /While the live WebSocket server is on, it must also differ from `LIVE_WS_PORT` \(default ([0-9]+)\)\./
  )[1];
  for (const port of [String(SPLIT_PORTS.dashboardPort), String(SPLIT_PORTS.apiPort)]) {
    assert.equal(
      panel.resolveQuotaPanelListener({ QUOTA_PANEL_PORT: port }, SPLIT_PORTS).kind,
      "refused",
      port
    );
  }
  const clash = panel.resolveQuotaPanelListener({ QUOTA_PANEL_PORT: liveDefault }, SPLIT_PORTS);
  assert.equal(clash.kind, "refused");
  assert.match(clash.kind === "refused" ? clash.warning : "", /live dashboard WebSocket port/);
  const liveOff = { QUOTA_PANEL_PORT: liveDefault, OMNIROUTE_ENABLE_LIVE_WS: "0" };
  assert.equal(panel.resolveQuotaPanelListener(liveOff, SPLIT_PORTS).kind, "listen");
  assert.ok(
    sectionText.includes(
      "`QUOTA_PANEL_PORT` must be a port from 1 to 65535, written in digits only."
    )
  );
});

test("the section states the base path shape the port accepts", () => {
  const example = match(
    sectionText,
    /Write it with a leading slash and no trailing slash, for example `([^`]+)`\./
  )[1];
  assert.equal(panel.isQuotaPanelBasePath(example), true, example);
  const [, root, trailing] = match(
    sectionText,
    /Another shape, including `([^`]+)` and `([^`]+)`, leaves the port off with a warning, although the build accepts those forms\./
  );
  for (const shape of [root, trailing]) {
    assert.equal(panel.isQuotaPanelBasePath(shape), false, shape);
    const decision = panel.resolveQuotaPanelListener(
      { QUOTA_PANEL_PORT: "20133", OMNIROUTE_BASE_PATH: shape },
      UNSPLIT_PORTS
    );
    assert.equal(decision.kind, "refused", shape);
  }
  assert.ok(
    sectionText.includes("Use the same `OMNIROUTE_BASE_PATH` at build time and at run time.")
  );
});

test("the section asks for TLS in front and quotes the notice the code logs", () => {
  for (const sentence of [
    "The port serves plain HTTP and the page sends API keys.",
    "Keep the default bind address and put a reverse proxy with TLS in front of it.",
    "So a proxy on the same host must send `X-Forwarded-For`.",
  ]) {
    assert.ok(sectionText.includes(sentence), sentence);
  }
  const notice = match(section, /^\[Quota Panel\] Bound to <host>\. .*$/m)[0];
  assert.ok(bridgeSource.includes(`\`${notice.replace("<host>", "${host}")}\``), notice);
});

test("the section says the feature flag, not the port, turns the page on", () => {
  for (const sentence of [
    "The listener does not read `QUOTA_SELF_PANEL`, and it does not turn the page on.",
    "While the flag is off, the page and its API answer 404 on the main port, and the listener relays that answer.",
  ]) {
    assert.ok(sectionText.includes(sentence), sentence);
  }
  const withFlagOff = { QUOTA_PANEL_PORT: "20133", QUOTA_SELF_PANEL: "false" };
  assert.equal(panel.resolveQuotaPanelListener(withFlagOff, UNSPLIT_PORTS).kind, "listen");
});

async function closedPort(): Promise<number> {
  const server = net.createServer();
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as net.AddressInfo;
  await new Promise<void>((resolve) => server.close(() => resolve()));
  return port;
}

/** The status and body a real panel bridge in front of a closed main port answers for a path. */
async function panelAnswer(path: string): Promise<{ status: number; body: string }> {
  const front = bridge.createApiBridgeServer(await closedPort(), bridge.createQuotaPanelRole());
  await new Promise<void>((resolve) => front.listen(0, "127.0.0.1", resolve));
  const { port } = front.address() as net.AddressInfo;
  try {
    return await new Promise((resolve, reject) => {
      const req = http.request({ host: "127.0.0.1", port, path }, (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve({ status: res.statusCode || 0, body }));
      });
      req.on("error", reject);
      req.end();
    });
  } finally {
    front.close();
    front.closeAllConnections();
  }
}

test("the section says the development server's page needs the main port", () => {
  for (const sentence of [
    "Under the development server (`next dev`), the page does not become interactive through this port.",
    "The development hot-reload socket is an upgrade request, and the port refuses it.",
    "Use the main port while developing.",
  ]) {
    assert.ok(sectionText.includes(sentence), sentence);
  }
  // The panel role refuses every upgrade, whatever its path.
  assert.equal(bridge.createQuotaPanelRole().relayUpgrades, false);
});

test("the quoted 404 body and the relay error names are what the port answers", async () => {
  const quoted = match(sectionText, /The 404 body is `([^`]+)`\./)[1];
  const refused = await panelAnswer("/dashboard");
  assert.equal(refused.status, 404);
  assert.equal(refused.body, quoted);
  const [, unavailable, timeout] = match(
    sectionText,
    /A failed relay answers 502 \(`([a-z_]+)`\) or 504 \(`([a-z_]+)`\) with no `detail` field\./
  );
  const failed = await panelAnswer("/quota/claude");
  assert.equal(failed.status, 502);
  assert.deepEqual(JSON.parse(failed.body), { error: unavailable });
  // The 504 is answered after the relay timeout, so its error name is read from the source.
  assert.match(
    bridgeSource,
    new RegExp(`writeHead\\(504[\\s\\S]{0,120}relayErrorBody\\(\\s*role,\\s*"${timeout}"`)
  );
});

test("the trusted proxy values named in the section are the ones the code accepts", () => {
  const [, first, second] = match(
    sectionText,
    /trusted for that header only with `OMNIROUTE_TRUST_PROXY=([a-z]+)` \(or `([a-z]+)`\)\./
  );
  const saved = process.env.OMNIROUTE_TRUST_PROXY;
  try {
    for (const value of [first, second]) {
      process.env.OMNIROUTE_TRUST_PROXY = value;
      assert.equal(getTrustProxyMode(), "private", value);
    }
  } finally {
    if (saved === undefined) delete process.env.OMNIROUTE_TRUST_PROXY;
    else process.env.OMNIROUTE_TRUST_PROXY = saved;
  }
});

test("the section states the limits of the listener with the values of the code", () => {
  const [, connections, headers, request, keepAlive, idle] = match(
    sectionText,
    /The listener holds at most ([0-9]+) connections at a time\. A client has ([0-9]+) seconds to send the request headers and ([0-9]+) seconds to send the whole request\. An idle kept-alive connection closes after about ([0-9]+) seconds\. A connection with no activity for ([0-9]+) seconds is closed\. These values are fixed\./
  );
  assert.equal(Number(connections), panel.QUOTA_PANEL_MAX_CONNECTIONS);
  assert.equal(Number(headers) * 1000, panel.QUOTA_PANEL_HEADERS_TIMEOUT_MS);
  assert.equal(Number(request) * 1000, panel.QUOTA_PANEL_REQUEST_TIMEOUT_MS);
  assert.equal(Number(keepAlive) * 1000, panel.QUOTA_PANEL_KEEP_ALIVE_TIMEOUT_MS);
  assert.equal(Number(idle) * 1000, panel.QUOTA_PANEL_SOCKET_TIMEOUT_MS);
  const proxyIdle = match(
    sectionText,
    /A reverse proxy in front should keep its idle upstream connections for less than ([0-9]+) seconds, or not reuse them\./
  )[1];
  assert.equal(Number(proxyIdle) * 1000, panel.QUOTA_PANEL_KEEP_ALIVE_TIMEOUT_MS);
  assert.ok(
    sectionText.includes("Set connection and rate limits on the reverse proxy in front as well.")
  );
});

test("the section quotes the warning for a port already in use as the code logs it", () => {
  const warning = match(section, /^\[Quota Panel\] Port <port> is already in use\. .*$/m)[0];
  assert.ok(bridgeSource.includes(`\`${warning.replace("<port>", "${port}")}\``), warning);
});

test("the base path segments the section names leave the port off", () => {
  const list = match(
    sectionText,
    /So does a base path whose first segment names an application route: (.+), in any case\./
  )[1];
  const segments = [...list.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
  assert.deepEqual(segments, [...panel.QUOTA_PANEL_RESERVED_BASE_SEGMENTS]);
  for (const segment of segments) {
    for (const value of [`/${segment}`, `/${segment.toUpperCase()}/x`]) {
      assert.equal(panel.isQuotaPanelBasePath(value), false, value);
    }
  }
});

test("the Limitations list is complete", () => {
  const start = section.indexOf("Limitations:");
  assert.notEqual(start, -1);
  const items = section
    .slice(start)
    .split("\n")
    .filter((line) => line.startsWith("- "));
  assert.deepEqual(items, [
    "- `/quota/{provider}/` with a trailing slash answers 404 on this port.",
    "- The service worker and the web app manifest are not served on this port.",
    "- A custom favicon set in the dashboard is not shown on this port.",
    "- Icons are not shown when the application runs under a base path.",
    "- The port speaks plain HTTP/1.1.",
    "- A bind that fails is not retried until the process restarts.",
    "- The listener has no connection or rate limit per client address.",
    "- Container setups are not covered by this section.",
  ]);
});

test("the section states the one write the port relays, with the code's limits", () => {
  const [, method] = match(
    sectionText,
    /One request with a body is also relayed: a `([A-Z]+)` of the quota view path, which the page sends to save a lending choice\./
  );
  assert.equal(method, panel.QUOTA_PANEL_WRITE_METHOD);
  const [, max] = match(
    sectionText,
    /It must carry one `Content-Length` from 1 to ([0-9]+), written as plain digits, and no `Transfer-Encoding`\./
  );
  assert.equal(Number(max), panel.QUOTA_PANEL_WRITE_MAX_BYTES);
  const { boundedBody } = bridge.createQuotaPanelRole();
  assert.equal(boundedBody?.maxBytes, Number(max));
  const [, seconds] = match(
    sectionText,
    /The port reads the declared bytes before it contacts the main port, and waits at most ([0-9]+) seconds for them\./
  );
  assert.equal(Number(seconds) * 1000, panel.QUOTA_PANEL_WRITE_TIMEOUT_MS);
  assert.equal(boundedBody?.timeoutMs, panel.QUOTA_PANEL_WRITE_TIMEOUT_MS);
  for (const sentence of [
    "The `PATCH` must carry `Content-Type: application/json`, with no parameter or with `charset=utf-8` only.",
    "A `PATCH` that breaks one of these rules answers 404.",
    "Some malformed lengths, such as a signed or a repeated one, are answered 400 by the HTTP parser before this port's own check.",
    "A body that is not complete by then answers 404 and its connection is closed.",
    "Nothing reaches the main port in that case, or when the client leaves first.",
    "The port relays exactly the declared bytes, with the same `Content-Length`.",
    "Bytes after them are read as the next request on the connection.",
    "A TLS reverse proxy in front must forward `Content-Length` and must not re-chunk the request body.",
  ]) {
    assert.ok(sectionText.includes(sentence), sentence);
  }
});
