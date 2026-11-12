import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { generateOpencodeConfig } =
  await import("../../src/lib/cli-helper/config-generator/opencode.ts");

function existingConfigFile(options: Record<string, unknown>): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "oc-remote-target-"));
  const file = path.join(dir, "opencode.json");
  fs.writeFileSync(
    file,
    JSON.stringify({ provider: { omniroute: { name: "OmniRoute", options, models: {} } } }),
    { mode: 0o600 }
  );
  return file;
}

async function generate(configPath: string, apiKey: string) {
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({ object: "list", data: [{ id: "cx/gpt-6-sol", context_length: 872000 }] }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    )) as typeof fetch;
  try {
    const out = await generateOpencodeConfig({
      baseUrl: "https://router.example.test",
      apiKey,
      configPath,
    });
    return JSON.parse(out).provider.omniroute.options;
  } finally {
    globalThis.fetch = original;
  }
}

describe("opencode generator — the requested router wins over a stale provider entry", () => {
  it("rewrites baseURL and apiKey from the call, keeping the user's other options", async () => {
    const file = existingConfigFile({
      baseURL: "http://127.0.0.1:20128/v1",
      apiKey: "old-key",
      timeout: 600000,
      headers: { "X-Team": "a" },
    });
    const options = await generate(file, "new-key");
    assert.equal(options.baseURL, "https://router.example.test/v1");
    assert.equal(options.apiKey, "new-key");
    assert.equal(options.timeout, 600000);
    assert.deepEqual(options.headers, { "X-Team": "a" });
  });

  it("keeps the existing apiKey when the call has none", async () => {
    const file = existingConfigFile({ baseURL: "http://127.0.0.1:20128/v1", apiKey: "{env:KEY}" });
    const options = await generate(file, "");
    assert.equal(options.baseURL, "https://router.example.test/v1");
    assert.equal(options.apiKey, "{env:KEY}");
  });
});
