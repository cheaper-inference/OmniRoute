import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Requests the CLI sends itself are checked on the scheme and authority only:
// commands put ids in the path and query unencoded, and a remote context must
// keep its token for them. Whole-string URL checks for tool configs are in
// cli-untrusted-cwd-env.test.ts.

const REMOTE_CONTEXT = { baseUrl: "https://remote.example.test:8443", accessToken: "oma_ctx" };

async function withRemoteContext(fn: () => Promise<void>) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ctx-request-"));
  const saved = {
    DATA_DIR: process.env.DATA_DIR,
    OMNIROUTE_BASE_URL: process.env.OMNIROUTE_BASE_URL,
    OMNIROUTE_API_KEY: process.env.OMNIROUTE_API_KEY,
    OMNIROUTE_CONTEXT: process.env.OMNIROUTE_CONTEXT,
  };
  process.env.DATA_DIR = dir;
  delete process.env.OMNIROUTE_BASE_URL;
  delete process.env.OMNIROUTE_API_KEY;
  delete process.env.OMNIROUTE_CONTEXT;
  fs.writeFileSync(
    path.join(dir, "config.json"),
    JSON.stringify({ version: 1, currentContext: "prod", contexts: { prod: REMOTE_CONTEXT } })
  );
  try {
    await fn();
  } finally {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test("buildHeaders: an unencoded id in the path or query keeps the context token", async () => {
  await withRemoteContext(async () => {
    const { buildHeaders } = await import("../../bin/cli/api.mjs");
    for (const destinationUrl of [
      "https://remote.example.test:8443/api/memory/my id",
      "https://remote.example.test:8443/api/tags?q=a b",
      "https://remote.example.test:8443/api/files?path=C:\\Users\\a",
      "https://remote.example.test:8443/api/notes#a b",
      "https://remote.example.test:8443?q=a b",
    ]) {
      const headers = await buildHeaders({ cliToken: "", destinationUrl });
      assert.equal(headers.get("authorization"), "Bearer oma_ctx", destinationUrl);
    }
  });
});

test("buildHeaders: only the path may hold those characters, never the scheme or authority", async () => {
  await withRemoteContext(async () => {
    const { buildHeaders } = await import("../../bin/cli/api.mjs");
    for (const destinationUrl of [
      "https://remote.example.test:8443\\@evil.test/x",
      "https://remote.example.test:8443\\evil/x y",
      "https://remote.example.test:8443\t/x",
      "https://remote.example.test\n:8443/x",
      "https://user@remote.example.test:8443/x y",
      "https://:pw@remote.example.test:8443/x",
      "https://evil.test/x?https://remote.example.test:8443/a b",
      "https://remote.example.test:9443/a b",
      "http://remote.example.test:8443/a b",
      " https://remote.example.test:8443/a b",
      "https:remote.example.test:8443/a b",
      "not a url",
      "",
    ]) {
      const headers = await buildHeaders({ cliToken: "", destinationUrl });
      assert.equal(headers.get("authorization"), null, JSON.stringify(destinationUrl));
    }
  });
});
