import test from "node:test";
import assert from "node:assert/strict";

import { handleGoogleFlowWebVideoGeneration } from "../../../open-sse/handlers/videoGeneration/googleflowWebHandler.ts";
import { handleGoogleFlowWebImageGeneration } from "../../../open-sse/handlers/imageGeneration/providers/googleflowWeb.ts";
import { getVideoProvider, parseVideoModel } from "../../../open-sse/config/videoRegistry.ts";

test("videoRegistry: registers googleflow-web provider and its active models", () => {
  const provider = getVideoProvider("googleflow-web");
  assert.ok(provider);
  assert.equal(provider.format, "googleflow-web");
  assert.ok(provider.models.some((m) => m.id === "veo-3.1-quality"));
  assert.ok(provider.models.some((m) => m.id === "veo-3.1-fast"));
  assert.ok(provider.models.some((m) => m.id === "veo-3.1-lite"));
  assert.ok(provider.models.some((m) => m.id === "omni-1.1-flash"));

  const parsed = parseVideoModel("googleflow-web/veo-3.1-fast");
  assert.equal(parsed.provider, "googleflow-web");
  assert.equal(parsed.model, "veo-3.1-fast");
});

test("handleGoogleFlowWebVideoGeneration: validates prompt is required", async () => {
  const res = await handleGoogleFlowWebVideoGeneration({
    model: "veo-3.1-fast",
    providerConfig: { baseUrl: "https://flow.google.com" },
    body: { prompt: "" },
    credentials: { apiKey: "__Secure-1PSID=test" },
  });

  assert.equal(res.success, false);
  assert.equal(res.status, 400);
  assert.ok(res.error?.includes("Prompt is required"));
});

test("handleGoogleFlowWebVideoGeneration: rejects missing credentials early", async () => {
  const res = await handleGoogleFlowWebVideoGeneration({
    model: "veo-3.1-fast",
    providerConfig: { baseUrl: "https://flow.google.com" },
    body: { prompt: "a sunset over mountains" },
    credentials: null,
  });

  assert.equal(res.success, false);
  assert.ok(res.error?.includes("Missing Google Flow cookies"));
});

test("handleGoogleFlowWebImageGeneration: validates prompt is required", async () => {
  const res = await handleGoogleFlowWebImageGeneration({
    model: "nano-banana-pro",
    provider: "googleflow-web",
    providerConfig: { baseUrl: "https://flow.google.com" },
    body: { prompt: "" },
    credentials: { apiKey: "__Secure-1PSID=test" },
  });

  assert.equal(res.success, false);
  assert.equal(res.status, 400);
  assert.ok(res.error?.includes("Prompt is required"));
});

test("handleGoogleFlowWebImageGeneration: rejects missing credentials early", async () => {
  const res = await handleGoogleFlowWebImageGeneration({
    model: "nano-banana-pro",
    provider: "googleflow-web",
    providerConfig: { baseUrl: "https://flow.google.com" },
    body: { prompt: "a cozy reading corner" },
    credentials: null,
  });

  assert.equal(res.success, false);
  assert.ok(res.error?.includes("Missing Google Flow cookies"));
});
