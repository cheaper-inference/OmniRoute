import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseImageModel } from "../../open-sse/config/imageRegistry.ts";
import { IMAGE_PROVIDERS } from "../../open-sse/config/imageRegistryData.ts";
import { NOAUTH_PROVIDERS } from "../../src/shared/constants/providers/noauth.ts";
import { isFlatRateProvider } from "../../src/lib/usage/flatRateProviders.ts";

const valid = {
  GOOGLE_FLOW_WEB_CDP_URL: "http://127.0.0.1:19345",
  GOOGLE_FLOW_WEB_PROJECT_ID: "00000001-0000-4000-8000-000000000001",
};
test("explicit image-only registration, no credentials or chat alias", () => {
  const provider = NOAUTH_PROVIDERS["google-flow-web"];
  assert.ok(provider);
  assert.deepEqual(provider.serviceKinds, ["image"]);
  assert.equal(provider.noAuth, true);
  assert.equal(provider.hasFree, false);
  assert.equal("alias" in provider, false);
  assert.equal(IMAGE_PROVIDERS["google-flow-web"].authType, "none");
  assert.equal(isFlatRateProvider("google-flow-web"), true);
});
test("explicit prefix parses without stealing bare nano-banana ids", () => {
  assert.deepEqual(parseImageModel("google-flow-web/nano-banana-2.1"), {
    provider: "google-flow-web",
    model: "nano-banana-2.1",
  });
  assert.deepEqual(parseImageModel("nano-banana-2.1"), {
    provider: null,
    model: "nano-banana-2.1",
  });
  // Existing Adobe Firefly/UC ownership must stay unchanged.
  for (const model of ["nano-banana-2", "nano-banana-pro", "nano-banana-ultra"]) {
    assert.deepEqual(parseImageModel(model), {
      provider: model === "nano-banana-ultra" ? "uc" : "adobe-firefly",
      model,
    });
  }
});
for (const url of [
  undefined,
  "http://169.254.169.254:80",
  "http://example.com:19345",
  "ws://127.0.0.1:19345",
  "http://user:pass@127.0.0.1:19345",
  "http://127.1:19345",
  "http://127.0.0.1:19345/path",
  "http://127.0.0.1:19345?x=1",
]) {
  test(`disabled config for ${url}`, async () => {
    const { getGoogleFlowWebConfig } =
      await import("../../open-sse/services/googleFlowWebConfig.ts");
    assert.equal(getGoogleFlowWebConfig({ ...valid, GOOGLE_FLOW_WEB_CDP_URL: url }), null);
  });
}
test("project UUID required and optional timeout bounded", async () => {
  const { getGoogleFlowWebConfig } = await import("../../open-sse/services/googleFlowWebConfig.ts");
  for (const project of [undefined, "", "project", "https://flow.google.com/project/id"]) {
    assert.equal(getGoogleFlowWebConfig({ ...valid, GOOGLE_FLOW_WEB_PROJECT_ID: project }), null);
  }
  assert.equal(getGoogleFlowWebConfig({ ...valid, GOOGLE_FLOW_WEB_TIMEOUT_MS: "999999999" }), null);
  for (const host of ["127.0.0.1", "localhost", "[::1]"]) {
    const config = getGoogleFlowWebConfig({
      ...valid,
      GOOGLE_FLOW_WEB_CDP_URL: `http://${host}:19345`,
    });
    assert.equal(config?.timeoutMs, 180000);
    assert.equal(config?.queueTimeoutMs, 60000);
  }
});
test("unsupported parameters and request-controlled config rejected strictly", async () => {
  const { parseGoogleFlowWebRequest } =
    await import("../../open-sse/handlers/imageGeneration/providers/googleFlowWebRequest.ts");
  const base = { model: "nano-banana-2.1", prompt: "apple" };
  assert.equal(parseGoogleFlowWebRequest(base).aspect, "1:1");
  assert.equal(parseGoogleFlowWebRequest({ ...base, size: "1536x1024" }).aspect, "16:9");
  for (const extra of [
    { response_format: "url" },
    { image: "x" },
    { seed: 1 },
    { quality: "hd" },
    { style: "vivid" },
    { mask: "x" },
    { n: 5 },
    { n: 1.2 },
    { aspect_ratio: "2:1" },
    { size: "123x456" },
    { cdpUrl: "x" },
    { project: "x" },
    { providerSpecificData: {} },
    { script: "x" },
    { model: "nano-banana-pro" },
  ]) {
    assert.throws(() => parseGoogleFlowWebRequest({ ...base, ...extra }));
  }
});
test("google-flow-web stays image-only and out of the video registry", () => {
  const videoRegistry = readFileSync(
    new URL("../../open-sse/config/videoRegistry.ts", import.meta.url),
    "utf8"
  );
  assert.equal(videoRegistry.includes("google-flow-web"), false);
});
