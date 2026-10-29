import test from "node:test";
import assert from "node:assert/strict";
import { createProviderConnection, deleteProviderConnection } from "../../src/lib/db/providers.ts";
import { GET } from "../../src/app/api/providers/client/route.ts";

for (const status of ["banned", "expired"])
  test(`client connection read observes authoritative ${status} fields`, async () => {
    const created = await createProviderConnection({
      provider: "openai",
      authType: "apikey",
      apiKey: "synthetic-key",
      isActive: false,
      testStatus: status,
      rateLimitedUntil: "2099-01-01T00:00:00Z",
    });
    const before = Date.now();
    try {
      const response = await GET();
      assert.equal(response.status, 200);
      const data = await response.json();
      const connection = data.connections.find((c: { id: string }) => c.id === created.id);
      assert.equal(connection.testStatus, status);
      assert.equal(connection.isActive, false);
      assert.equal(connection.rateLimitedUntil, "2099-01-01T00:00:00Z");
      assert.ok(Date.parse(connection.runtimeObservedAt) >= before);
      assert.ok(Date.parse(connection.runtimeObservedAt) <= Date.now());
      assert.notEqual(connection.apiKey, "synthetic-key");
      assert.equal(connection.accessToken, undefined);
    } finally {
      await deleteProviderConnection(String(created.id));
    }
  });
