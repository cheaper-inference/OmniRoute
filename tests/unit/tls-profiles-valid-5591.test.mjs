import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// #5591 regression guard: every TLS impersonation profile referenced in the
// source must be a real BrowserProfile in the pinned wreq-js package. An invalid
// value makes the native layer produce a degenerate fingerprint. Read the
// supported set straight from the installed type definitions so this guard
// moves with an intentional dependency upgrade.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

function supportedProfiles() {
  const dts = fs.readFileSync(
    path.join(ROOT, "node_modules", "wreq-js", "dist", "wreq-js.d.ts"),
    "utf8"
  );
  const union = dts.match(/type BrowserProfile = ([^;]+);/)?.[1] ?? "";
  return new Set([...union.matchAll(/'([^']+)'/g)].map((match) => match[1]));
}

// Service clients must resolve the profile dynamically (never a frozen
// literal) and pin only the emulation OS.
const TRANSPORT_CLIENTS = {
  "open-sse/services/claudeTlsClient.ts": { family: "chrome", os: "linux" },
  "open-sse/services/perplexityTlsClient.ts": { family: "firefox", os: "macos" },
  "open-sse/services/grokTlsClient.ts": { family: "chrome", os: "linux" },
  "open-sse/services/notionTlsClient.ts": { family: "chrome", os: "windows" },
  "open-sse/services/lmarenaTlsClient.ts": { family: "chrome", os: "windows" },
};

// Source files that hand a browser profile directly to wreq-js — scanned for
// literal profiles, and the executors among them must resolve dynamically.
const SOURCES = [
  "src/app/api/internal/codex-responses-ws/route.ts",
  "open-sse/executors/codex.ts",
  "open-sse/executors/codex/appServerClient.ts",
  "open-sse/executors/grok-web.ts",
  "open-sse/executors/notion-web.ts",
  "open-sse/utils/proxyFetch.ts",
  "scripts/dev/responses-ws-proxy.mjs",
  "open-sse/utils/tlsClient.ts",
  ...Object.keys(TRANSPORT_CLIENTS),
];

// Strip comments before scanning — explanatory comments may name the bad
// profile ("chrome_149 absent in 2.3.1") without it ever reaching wreq-js.
function stripComments(line) {
  return line.replace(/\/\*.*?\*\//g, "").replace(/\/\/.*$/, "");
}

test("#5591 all configured browser TLS profiles exist in pinned wreq-js", () => {
  const supported = supportedProfiles();
  assert.ok(supported.size > 0, "expected to parse BrowserProfile from wreq-js d.ts");

  for (const rel of SOURCES) {
    const lines = fs.readFileSync(path.join(ROOT, rel), "utf8").split("\n");
    lines.forEach((line, i) => {
      const code = stripComments(line);
      for (const m of code.matchAll(/\b(?:chrome|firefox|edge|opera|safari|okhttp)_[\w.]+/g)) {
        const profile = m[0];
        assert.ok(
          supported.has(profile),
          `${rel}:${i + 1} uses ${profile} which is NOT a wreq-js BrowserProfile ` +
            `(supported: ${[...supported].sort().join(", ")})`
        );
      }
    });
  }

  // Executors must not freeze a profile literal. A version the library ships
  // still passes the check above, so this one rejects the literal itself.
  // grok-web / notion-web are intentionally absent: they delegate to their
  // *TlsClient services and never hand a profile to wreq-js directly.
  const NO_LITERAL = [
    "open-sse/executors/codex.ts",
    "open-sse/executors/codex/appServerClient.ts",
    "open-sse/utils/proxyFetch.ts",
  ];
  for (const rel of NO_LITERAL) {
    const source = fs
      .readFileSync(path.join(ROOT, rel), "utf8")
      .split("\n")
      .map(stripComments)
      .join("\n");
    assert.doesNotMatch(
      source,
      /(?:browser|tlsProfile):\s*["'](?:chrome|firefox)_/,
      `${rel} freezes a browser profile instead of reading the library`
    );
  }

  // The default session in tlsClient.ts resolves dynamically.
  const tlsClientSrc = fs.readFileSync(path.join(ROOT, "open-sse/utils/tlsClient.ts"), "utf8");
  assert.match(tlsClientSrc, /newestChromeProfile\(\)/);
  assert.match(tlsClientSrc, /os: "macos"/);

  // Service clients resolve dynamically and pin only the emulation OS; no
  // client may fall back to a frozen tlsProfile literal.
  for (const [rel, { family, os }] of Object.entries(TRANSPORT_CLIENTS)) {
    const source = fs.readFileSync(path.join(ROOT, rel), "utf8");
    const resolver = family === "chrome" ? "newestChromeProfile" : "newestFirefoxProfile";
    assert.match(
      source,
      new RegExp(`tlsProfile: ${resolver},`),
      `${rel} must resolve its TLS profile via ${resolver}() instead of a literal`
    );
    assert.match(source, new RegExp(`emulationOs: ["']${os}["']`));
    assert.doesNotMatch(
      source,
      /tlsProfile:\s*["'](?:chrome|firefox)_/,
      `${rel} freezes a browser profile instead of reading the library`
    );
  }
});
