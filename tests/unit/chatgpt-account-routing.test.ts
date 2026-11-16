import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-siwc-routing-"));
process.env.DATA_DIR = dataDir;
process.env.STORAGE_ENCRYPTION_KEY = "siwc-routing-test-only";
const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const { providerUsesExclusiveSyncedListing } =
  await import("../../src/lib/providers/modelListingCapability.ts");

test.after(() => {
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

test("ChatGPT selects only the registration advertising the model and fails closed on empty catalogs", async () => {
  assert.equal(providerUsesExclusiveSyncedListing("chatgpt"), true);
  const create = (clientId: string) =>
    createProviderConnection({
      provider: "chatgpt",
      authType: "oauth",
      name: clientId,
      email: "same@example.com",
      isActive: true,
      accessToken: "fixture-token",
      expiresAt: new Date(Date.now() + 3600_000).toISOString(),
      providerSpecificData: {
        issuer: "https://auth.openai.com",
        subject: "fixture-subject",
        clientId,
        scopes: ["chatgpt.tokens.use.direct"],
      },
    });
  const first = await create("oaiapp_first");
  const second = await create("oaiapp_second");
  const firstId = String(first.id);
  const secondId = String(second.id);
  const selectedId = (result: unknown) =>
    (result as { connectionId?: string } | null)?.connectionId;
  const select = () => getProviderCredentials("chatgpt", null, null, "fixture-model");

  assert.equal(selectedId(await select()), undefined, "missing catalogs must not allow routing");
  await replaceSyncedAvailableModelsForConnection("chatgpt", firstId, [
    { id: "fixture-model", name: "Fixture" },
  ]);
  await replaceSyncedAvailableModelsForConnection("chatgpt", secondId, [
    { id: "different-model", name: "Different" },
  ]);
  assert.equal(selectedId(await select()), firstId);
  assert.equal(
    selectedId(await getProviderCredentials("chatgpt", firstId, null, "fixture-model")),
    undefined,
    "fallback must not borrow another registration's inventory"
  );
  await replaceSyncedAvailableModelsForConnection("chatgpt", firstId, []);
  assert.equal(selectedId(await select()), undefined, "an empty sync revokes model eligibility");
});
