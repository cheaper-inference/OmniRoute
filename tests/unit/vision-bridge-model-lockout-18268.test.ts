import test from "node:test";
import assert from "node:assert/strict";
import { createProviderConnection } from "@/lib/db/providers";
import { resetDbInstance } from "@/lib/db/core";
import { callVisionModel, type VisionModelConfig } from "@/lib/guardrails/visionBridgeHelpers";
import { isModelLocked } from "@omniroute/open-sse/services/accountFallback.ts";
test.after(() => resetDbInstance());
test("#18268: model-scoped 400 locks the Vision Bridge model and fallback continues", async () => {
  const connection = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "vision-lockout",
    apiKey: "sk-vision-lockout",
  });
  const attemptedModels: string[] = [];
  const fetchImpl: typeof fetch = async (_input, init) => {
    const body = JSON.parse(String(init?.body)) as { model: string };
    attemptedModels.push(body.model);
    if (body.model === "gpt-4o-mini")
      return new Response(
        JSON.stringify({
          error: { code: "model_not_supported", message: "The requested model is not supported." },
        }),
        { status: 400, headers: { "x-omniroute-selected-connection-id": connection.id } }
      );
    return Response.json({
      choices: [{ message: { content: "fallback description" } }],
      content: [{ type: "text", text: "fallback description" }],
    });
  };
  const deps = { hasUsableCredentials: async () => true, isModelLocked };
  const config: VisionModelConfig = {
    model: "openai/gpt-4o-mini",
    prompt: "Describe",
    timeoutMs: 30000,
    maxImages: 1,
    fetchImpl,
  };
  assert.equal(
    await callVisionModel(
      "data:image/png;base64,iVBORw0KGgo",
      config,
      undefined,
      { maxFallbackAttempts: 2 },
      deps
    ),
    "fallback description"
  );
  assert.equal(isModelLocked("openai", connection.id, "gpt-4o-mini"), true);
  assert.equal(attemptedModels[0], "gpt-4o-mini");
  assert.equal(attemptedModels.length, 2);
  attemptedModels.length = 0;
  assert.equal(
    await callVisionModel(
      "data:image/png;base64,iVBORw0KGgo",
      config,
      undefined,
      { maxFallbackAttempts: 1 },
      deps
    ),
    "fallback description"
  );
  assert.equal(attemptedModels.length, 1);
  assert.notEqual(attemptedModels[0], "gpt-4o-mini");
});
