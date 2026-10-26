import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-unsaved-url-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK = "true";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { POST } = await import("../../src/app/api/providers/[id]/test/route.ts");
const originalFetch = globalThis.fetch;
const savedUrl = "http://localhost:11434/v1";
const editedUrl = "http://host.docker.internal:11434/v1";

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});

async function probe(id: string, body: Record<string, unknown>) {
  return POST(
    new Request(`http://localhost/api/providers/${id}/test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
    { params: Promise.resolve({ id }) }
  );
}

for (const status of [200, 401]) {
  test(`edited URL probe (${status}) uses stored credentials and preserves saved health`, async () => {
    const connection = await providers.createProviderConnection({
      provider: "ollama-local",
      authType: "apikey",
      name: `Ollama preview ${status}`,
      apiKey: "test-only-ollama-key",
      testStatus: "active",
      isActive: true,
      providerSpecificData: { baseUrl: savedUrl, tag: String(status) },
    });
    const before = await providers.getProviderConnectionById(connection.id);
    const urls: string[] = [];
    globalThis.fetch = async (input, init) => {
      const url = input instanceof Request ? input.url : String(input);
      urls.push(url);
      assert.ok(url.startsWith(`${editedUrl}/`), url);
      assert.equal(new Headers(init?.headers).get("authorization"), "Bearer test-only-ollama-key");
      return new Response(JSON.stringify({ data: [{ id: "test-model" }] }), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    };

    const response = await probe(connection.id, { baseUrl: editedUrl });
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.equal(result.valid, status === 200);
    assert.ok(urls.includes(`${editedUrl}/models`));
    assert.deepEqual(await providers.getProviderConnectionById(connection.id), before);
  });
}

test("rejects a non-HTTP base URL before probing", async () => {
  const response = await probe("unused", { baseUrl: "file:///etc/passwd" });
  assert.equal(response.status, 400);
});

for (const body of [{}, { baseUrl: savedUrl }]) {
  test(`saved URL probe still updates health (${JSON.stringify(body)})`, async () => {
    const connection = await providers.createProviderConnection({
      provider: "ollama-local",
      authType: "apikey",
      name: `Saved Ollama ${JSON.stringify(body)}`,
      testStatus: "error",
      providerSpecificData: { baseUrl: savedUrl },
    });
    globalThis.fetch = async (input) => {
      const url = input instanceof Request ? input.url : String(input);
      assert.ok(url.startsWith(`${savedUrl}/`), url);
      return new Response(JSON.stringify({ data: [{ id: "test-model" }] }), { status: 200 });
    };
    const response = await probe(connection.id, body);
    assert.equal((await response.json()).valid, true);
    const after = await providers.getProviderConnectionById(connection.id);
    assert.equal(after.testStatus, "active");
    assert.ok(after.lastTested);
    assert.equal(after.providerSpecificData.baseUrl, savedUrl);
  });
}
