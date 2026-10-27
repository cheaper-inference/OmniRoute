import { after, test } from "node:test";
import assert from "node:assert/strict";

// The test runner preloads isolateDataDir.ts before this module graph opens SQLite.
process.env.API_KEY_SECRET ||= "systemone-selection-fixture-secret";
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { defaultSystemOneDispatchDeps } = await import("../../src/app/api/v1/systemone/dispatch.ts");

after(() => resetDbInstance());

test("tier filtering happens before account selection and preserves the caller allowlist", async () => {
  const paid: string[] = [];
  for (let index = 0; index < 4; index++) {
    const connection = await createProviderConnection({
      provider: "opencode-zen",
      authType: "apikey",
      name: `paid fixture ${index}`,
      apiKey: `fixture-paid-${index}`,
      priority: index + 1,
      isActive: true,
    });
    paid.push(String(connection.id));
  }
  const free = await createProviderConnection({
    provider: "opencode-zen",
    authType: "apikey",
    name: "free fixture",
    apiKey: "fixture-free",
    priority: 10,
    isActive: true,
    providerSpecificData: { systemOneTier: "free" },
  });
  const selection = {
    provider: "opencode-zen",
    model: "jev-1.13-free",
    tier: "free" as const,
    allowedConnections: null,
    excludeConnectionIds: [],
  };
  const selected = await defaultSystemOneDispatchDeps.selectCredentials(selection);
  assert.equal((selected as { connectionId?: string })?.connectionId, free.id);

  const denied = await defaultSystemOneDispatchDeps.selectCredentials({
    ...selection,
    allowedConnections: paid,
  });
  assert.equal(denied, null, "tier eligibility must not widen the caller's connection scope");

  const exhausted = await defaultSystemOneDispatchDeps.selectCredentials({
    ...selection,
    excludeConnectionIds: [String(free.id)],
  });
  assert.ok(!exhausted || !(exhausted as { connectionId?: string }).connectionId);
});
