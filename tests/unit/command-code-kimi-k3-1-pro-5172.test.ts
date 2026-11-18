/**
 * Command Code static catalog: Kimi K3.1 Pro.
 *
 * Command Code advertises `moonshotai/Kimi-K3.1-Pro` on its public
 * `GET /provider/v1/models` (context_length 1048576), but the static registry
 * stopped at Kimi K2.6. Because `liveCatalogAuthoritative` is false, a fresh or
 * not-yet-synced install relies on the static row for listing, reasoning-effort
 * variants and context metadata. The id must stay verbatim (capitalized): the
 * gateway matches it case-sensitively.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { command_codeProvider } =
  await import("../../open-sse/config/providers/registry/command-code/index.ts");
const { getModelsByProviderId } = await import("../../open-sse/config/providerModels.ts");
const { parseModel } = await import("../../open-sse/services/model.ts");

const KIMI_K31_PRO = "moonshotai/Kimi-K3.1-Pro";

type Row = Record<string, unknown> & { id: string };

function findRow(models: readonly unknown[] | undefined, id: string): Row | undefined {
  return (models as Row[] | undefined)?.find((m) => m.id === id);
}

test("command-code static catalog lists Kimi K3.1 Pro with reasoning metadata", () => {
  const row = findRow(command_codeProvider.models, KIMI_K31_PRO);
  assert.ok(row, `${KIMI_K31_PRO} must be in the command-code static catalog`);
  assert.equal(row.name, "Kimi K3.1 Pro (CC)");
  assert.equal(row.supportsReasoning, true);
  assert.equal(row.contextLength, 1_048_576);
  assert.equal(row.maxOutputTokens, 384_000);
  // Same effort vocabulary as every other reasoning row on this provider.
  const sibling = findRow(command_codeProvider.models, "moonshotai/Kimi-K2.6");
  assert.ok(sibling, "moonshotai/Kimi-K2.6 sibling must still be registered");
  assert.deepEqual(row.supportedThinkingEfforts, sibling.supportedThinkingEfforts);
  assert.deepEqual(row.supportedThinkingEfforts, ["low", "medium", "high", "xhigh", "max"]);
  // OpenAI wire format (no claude targetFormat override).
  assert.equal(row.targetFormat, undefined);
});

test("command-code provider model list exposes Kimi K3.1 Pro", () => {
  const ids = getModelsByProviderId("command-code").map((m) => m.id);
  assert.ok(ids.includes(KIMI_K31_PRO), `${KIMI_K31_PRO} must be listed for command-code`);
  // Listed ahead of the older Kimi K2.6 entry.
  assert.ok(ids.indexOf(KIMI_K31_PRO) < ids.indexOf("moonshotai/Kimi-K2.6"));
});

test("cmd/moonshotai/Kimi-K3.1-Pro routes to command-code without rewriting the id", () => {
  const parsed = parseModel(`cmd/${KIMI_K31_PRO}`);
  assert.equal(parsed.provider, "command-code");
  assert.equal(parsed.model, KIMI_K31_PRO);
});
