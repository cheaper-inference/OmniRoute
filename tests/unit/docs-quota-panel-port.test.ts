/**
 * The quota panel port documentation states what the code does. Each value the docs give that
 * has a constant or a decision function in src/lib/quotaPanelBridge.ts is compared with it.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const panel = await import("../../src/lib/quotaPanelBridge.ts");

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
  assert.match(envExample, /^# Every other path answers 404\. Only GET and HEAD are relayed\.$/m);
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
  const [, first, second] = match(row, / Only ([A-Z]+) and ([A-Z]+) requests are relayed\. /);
  assert.deepEqual([first, second].sort(), [...panel.QUOTA_PANEL_METHOD_NAMES].sort());
});

test("the Port Modes example uses a port that opens a listener", () => {
  const port = match(networkSection, /│ {2}QUOTA_PANEL_PORT=([0-9]+) +│/)[1];
  const host = match(networkSection, /│ {2}QUOTA_PANEL_HOST=(\S+) +│/)[1];
  assert.equal(host, panel.QUOTA_PANEL_DEFAULT_HOST);
  assert.equal(
    panel.resolveQuotaPanelListener({ QUOTA_PANEL_PORT: port }, UNSPLIT_PORTS).kind,
    "listen"
  );
  assert.match(
    networkSection,
    new RegExp(`→ Page: http://${host.replace(/\./g, "\\.")}:${port}/quota/<provider> `)
  );
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
  const [, first, second] = match(sectionText, /Only `([A-Z]+)` and `([A-Z]+)` are relayed\./);
  assert.deepEqual([first, second].sort(), [...panel.QUOTA_PANEL_METHOD_NAMES].sort());
  for (const sentence of [
    "Any other method answers 404, and so does a request that declares a body.",
    "Upgrade requests are refused and their connection is closed.",
    "The dashboard, the login page, the management API and the inference routes cannot be reached through this port.",
  ]) {
    assert.ok(sectionText.includes(sentence), sentence);
  }
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
