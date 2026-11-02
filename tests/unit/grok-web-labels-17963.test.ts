import test from "node:test";
import assert from "node:assert/strict";

test("#17963 grok-web fast/expert labels reflect Grok 4.7, not 4.20", async () => {
  const { PROVIDER_MODELS } = await import("../../open-sse/config/providerModels.ts");
  const byId = Object.fromEntries(
    (PROVIDER_MODELS["gw"] as Array<{ id: string; name: string }>).map((m) => [m.id, m.name])
  );
  assert.equal(byId["fast"], "Grok 4.7");
  assert.equal(byId["expert"], "Grok 4.7 Thinking");
});

test("#17963 grok-cli registry does not advertise grok-composer-2.5-fast", async () => {
  const { PROVIDER_MODELS } = await import("../../open-sse/config/providerModels.ts");
  const ids = (PROVIDER_MODELS["gc"] as Array<{ id: string }>).map((m) => m.id);
  assert.ok(!ids.includes("grok-composer-2.5-fast"));
});
