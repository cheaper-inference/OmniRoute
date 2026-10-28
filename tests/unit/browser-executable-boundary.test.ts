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

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-browser-exec-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const ENV_KEYS = [
  "CHROME_PATH",
  "CHATGPT_WEB_CODEX_CHROME_PATH",
  "CHATGPT_WEB_CHROME_PATH",
  "CHATGPT_WEB_CODEX_CDP_URL",
];
const savedEnv = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
for (const k of ENV_KEYS) delete process.env[k];

const { detectChromeExecutable } = await import("../../open-sse/executors/chatgpt-web-codex.ts");
const { resolveChatGptWebChromeExecutable } =
  await import("../../open-sse/utils/chatgptWebExecutorAdapter.ts");
const { validateChatGptWebCodexProvider } =
  await import("../../src/lib/providers/validation/chatgptWebCodex.ts");

// Any program that exists on the server, standing in for a caller-chosen executable.
const NOT_A_BROWSER = path.join(TEST_DATA_DIR, "not-a-browser");
fs.writeFileSync(NOT_A_BROWSER, "#!/bin/sh\nexit 0\n", { mode: 0o755 });

test.after(() => {
  for (const k of ENV_KEYS) {
    if (savedEnv[k] === undefined) delete process.env[k];
    else process.env[k] = savedEnv[k];
  }
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
