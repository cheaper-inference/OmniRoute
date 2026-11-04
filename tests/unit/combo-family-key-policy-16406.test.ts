import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const directory = mkdtempSync(join(tmpdir(), "combo-family-policy-16406-"));
process.env.DATA_DIR = directory;
process.env.API_KEY_SECRET = "combo-family-policy-fixture-only";
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { enforceApiKeyPolicy } = await import("../../src/shared/utils/apiKeyPolicy.ts");
const { withPathTokenApiKey } = await import("../../src/lib/vscode/tokenizedRequest.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const combos = await import("../../src/lib/db/combos.ts");
const providers = await import("../../src/lib/db/providers.ts");
const core = await import("../../src/lib/db/core.ts");
const high = "codex/gpt-6-astra-high";
const max = "codex/gpt-6-astra-max";
const log = { info() {}, warn() {}, error() {}, debug() {} };

test.before(async () => {
  await providers.createProviderConnection({
    provider: "codex",
    authType: "apikey",
    name: "fixture",
    apiKey: "fixture-key",
  });
});
test.after(() => {
  core.resetDbInstance();
  rmSync(directory, { recursive: true, force: true });
});

for (const transport of ["bearer", "path-token"] as const) {
  for (const mode of ["implicit-denied", "explicit-target", "directly-allowed"] as const) {
    test(`stored combo grant: ${mode} via ${transport}`, async () => {
      const name = `family-policy-${mode}-${transport}`;
      const models = mode === "explicit-target" ? [high, max] : [high];
      const combo = await combos.createCombo({ name, strategy: "priority", models });
      const key = await keys.createApiKey(name, "fixture-machine", [], {
        modelAccessMode: "restricted",
        allowedModels: mode === "directly-allowed" ? [max] : ["gemini/*"],
        blockedModels: mode === "directly-allowed" ? [high] : [high, max],
        allowedCombos: [name],
      });
      const headers =
        transport === "bearer"
          ? new Headers({ authorization: `Bearer ${key.key}` })
          : withPathTokenApiKey(
              new Request(
                `http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/chat/completions`
              )
            ).headers;
      const admitted = await enforceApiKeyPolicy(
        new Request("http://localhost/v1/chat/completions", { headers }),
        name
      );
      assert.equal(admitted.rejection, null, "the stored combo itself is permitted");
      assert.equal(await keys.isModelAllowedForKey(key.key, max, max), mode === "directly-allowed");
      const sent: string[] = [];
      const result = await handleComboChat({
        combo: { ...combo, config: { maxRetries: 0 } },
        body: { messages: [{ role: "user", content: "hello" }], stream: false },
        requestHeaders: headers,
        // The dispatch callback has the server-owned explicit-combo grant. Family
        // recovery must enforce direct model policy before extending that grant.
        handleSingleModel: async (_body, model) => {
          sent.push(model);
          return Response.json({ choices: [{ message: { content: model === high ? "" : "OK" } }] });
        },
        isModelAvailable: async () => true,
        log,
      });
      if (mode === "implicit-denied") {
        assert.deepEqual(sent, [high]);
        assert.equal(result.ok, false);
      } else {
        assert.deepEqual(sent, [high, max]);
        assert.equal(result.ok, true);
      }
    });
  }
}
