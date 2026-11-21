// The ChatGPT Web browser providers launch a local Chrome/Chromium. Two inputs reached that
// launch from a remote management request:
//   - validation of `chatgpt-web-codex` ignored `allowLocalSpawn`, which remote-reachable
//     routes (POST /api/providers/bulk, the connection test) set to false for non-loopback
//     callers so a remote request never makes the host start a process;
//   - `providerSpecificData.chromeExecutablePath` — caller input, stored with the connection
//     and read again by the credential-health scheduler and by inference — was used as the
//     executable whenever the path existed on the server.
// The executable is now chosen only by the operator: the server's own environment
// (CHROME_PATH, CHATGPT_WEB_*_CHROME_PATH) or the known Chrome/Chromium install locations.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-browser-exec-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const ENV_KEYS = [
  "CHROME_PATH",
  "CHATGPT_WEB_CODEX_CHROME_PATH",
  "CHATGPT_WEB_CHROME_PATH",
  "CHATGPT_WEB_CODEX_CDP_URL",
  "PROGRAMFILES",
  "PROGRAMFILES(X86)",
  "LOCALAPPDATA",
];
const savedEnv = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
for (const k of ENV_KEYS) delete process.env[k];

const { detectChromeExecutable } = await import("../../open-sse/executors/chatgpt-web-codex.ts");
const { resolveChatGptWebChromeExecutable } =
  await import("../../open-sse/utils/chatgptWebExecutorAdapter.ts");
const { validateChatGptWebCodexProvider } =
  await import("../../src/lib/providers/validation/chatgptWebCodex.ts");
// The validator's import chain opens storage.sqlite in TEST_DATA_DIR. Release that handle
// before cleanup, as the other DATA_DIR tests do, or Windows rmSync fails with EPERM.
const { closeDbInstance } = await import("../../src/lib/db/core.ts");

// Any program that exists on the server, standing in for a caller-chosen executable.
const NOT_A_BROWSER = path.join(TEST_DATA_DIR, "not-a-browser");
fs.writeFileSync(NOT_A_BROWSER, "#!/bin/sh\nexit 0\n", { mode: 0o755 });

test.after(() => {
  for (const k of ENV_KEYS) {
    if (savedEnv[k] === undefined) delete process.env[k];
    else process.env[k] = savedEnv[k];
  }
  closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("codex: a stored chromeExecutablePath outside the operator's browsers is never used", () => {
  assert.notEqual(detectChromeExecutable(NOT_A_BROWSER), NOT_A_BROWSER);
});

test("codex: the operator's own CHATGPT_WEB_CODEX_CHROME_PATH / CHROME_PATH still selects the browser", () => {
  process.env.CHATGPT_WEB_CODEX_CHROME_PATH = NOT_A_BROWSER;
  try {
    assert.equal(detectChromeExecutable(), NOT_A_BROWSER);
    // Naming the operator's configured browser explicitly is fine too.
    assert.equal(detectChromeExecutable(NOT_A_BROWSER), NOT_A_BROWSER);
  } finally {
    delete process.env.CHATGPT_WEB_CODEX_CHROME_PATH;
  }
  process.env.CHROME_PATH = NOT_A_BROWSER;
  try {
    assert.equal(detectChromeExecutable(), NOT_A_BROWSER);
  } finally {
    delete process.env.CHROME_PATH;
  }
});

// #18850: on Windows the codex detector knew no install location, so Chrome in its default
// place was never found and the connection could not be added without CHROME_PATH.
test("codex: Chrome in the Windows install locations is an operator browser", () => {
  for (const envKey of ["PROGRAMFILES", "PROGRAMFILES(X86)", "LOCALAPPDATA"]) {
    const root = fs.mkdtempSync(path.join(TEST_DATA_DIR, "win-"));
    const chromeExe = path.join(root, "Google", "Chrome", "Application", "chrome.exe");
    fs.mkdirSync(path.dirname(chromeExe), { recursive: true });
    fs.writeFileSync(chromeExe, "");
    process.env[envKey] = root;
    try {
      assert.equal(detectChromeExecutable(chromeExe), chromeExe, envKey);
    } finally {
      delete process.env[envKey];
    }
  }
});

test("chatgpt-web: a stored chromeExecutablePath outside the operator's browsers is never used", () => {
  const exists = (p: string) => p === NOT_A_BROWSER;
  assert.equal(resolveChatGptWebChromeExecutable(NOT_A_BROWSER, { env: {}, exists }), undefined);
  // The operator's environment still decides.
  assert.equal(
    resolveChatGptWebChromeExecutable(undefined, {
      env: { CHATGPT_WEB_CHROME_PATH: NOT_A_BROWSER },
      exists,
    }),
    NOT_A_BROWSER
  );
  assert.equal(
    resolveChatGptWebChromeExecutable(NOT_A_BROWSER, {
      env: { CHROME_PATH: NOT_A_BROWSER },
      exists,
    }),
    NOT_A_BROWSER
  );
});

test("codex validation honours allowLocalSpawn=false: a remote caller never reaches the browser launch", async () => {
  const result = await validateChatGptWebCodexProvider({
    apiKey: "__Secure-next-auth.session-token=test-cookie",
    providerSpecificData: { chromeExecutablePath: NOT_A_BROWSER },
    allowLocalSpawn: false,
  });
  assert.equal(result.valid, false);
  assert.match(String(result.error), /local/i, "must say the browser check needs a local request");
});

// Error strings returned by the validator are rendered in the dashboard. They must be English:
// the old German wording shipped to English-only operators. Each assertion also rejects the
// distinctive legacy phrase so a partial revert is caught.
test("codex validation: the missing-cookie error is English, not the legacy German phrase", async () => {
  // "cookie:" decodes to an empty cookie without throwing, reaching the missing-cookie check.
  const result = await validateChatGptWebCodexProvider({ apiKey: "cookie:" });
  assert.equal(result.valid, false);
  assert.equal(
    result.error,
    "A fresh ChatGPT cookie or a saved browser state is required for browser validation."
  );
  assert.doesNotMatch(
    String(result.error),
    /Browserprüfung|für die|frischer ChatGPT-Cookie|Browserzustand|erforderlich/i
  );
});

test("codex validation: the bad-tunnel error is English, not the legacy German phrase", async () => {
  const result = await validateChatGptWebCodexProvider({
    apiKey: "__Secure-next-auth.session-token=test-cookie",
    providerSpecificData: { runtimeKey: "runtime-key", tunnelId: "not-a-tunnel-id" },
  });
  assert.equal(result.valid, false);
  assert.equal(
    result.error,
    "Tunnel ID and runtime key must both be configured with valid values."
  );
  assert.doesNotMatch(
    String(result.error),
    /Tunnel-ID und Runtime-Key|müssen gemeinsam gültig konfiguriert/i
  );
});

test("codex validation: the no-Chrome error is English, not the legacy German phrase", async () => {
  const source = fs.readFileSync(
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "../../src/lib/providers/validation/chatgptWebCodex.ts"
    ),
    "utf8"
  );
  assert.match(source, /No supported Chrome or Chromium was found\./);
  assert.doesNotMatch(source, /Kein unterstütztes Chrome oder Chromium gefunden\./);

  // Drive the real branch when this host has no operator-configured browser. CI images
  // with Chrome at a hardcoded POSIX path would otherwise reach the browser launch.
  if (!detectChromeExecutable()) {
    const result = await validateChatGptWebCodexProvider({
      apiKey: "__Secure-next-auth.session-token=test-cookie",
      allowLocalSpawn: true,
    });
    assert.equal(result.valid, false);
    assert.equal(
      result.error,
      "No supported Chrome or Chromium was found. Install Chromium or configure the browser path."
    );
    assert.doesNotMatch(
      String(result.error),
      /Kein unterstütztes Chrome|Installiere Chromium|Browserpfad/i
    );
  }
});
