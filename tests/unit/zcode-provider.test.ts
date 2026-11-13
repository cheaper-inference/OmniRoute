import test from "node:test";
import assert from "node:assert/strict";
import {
  zcodeIndividualProvider,
  zcodeProvider,
  zcodeStartProvider,
} from "../../open-sse/config/providers/registry/zcode/index.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";
import {
  NOAUTH_PROVIDERS,
  providerAllowsOptionalApiKey,
} from "../../src/shared/constants/providers.ts";

test("ZCode provider registry exposes a local no-auth GLM Coding Plan backend", () => {
  assert.equal(zcodeProvider.id, "zcode");
  assert.equal(zcodeProvider.alias, "zc");
  assert.equal(zcodeProvider.executor, "zcode");
  assert.equal(zcodeProvider.format, "openai");
  assert.equal(zcodeProvider.baseUrl, "zcode://app-server/stdio");
  assert.equal(zcodeProvider.authType, "none");
  assert.equal(zcodeProvider.authHeader, "none");
  assert.equal(
    zcodeProvider.models.find((model) => model.id === "glm-5.3-flash")?.supportsVision,
    true
  );
  assert.equal(
    Boolean(zcodeProvider.models.find((model) => model.id === "glm-5.3")?.supportsVision),
    false
  );
  assert.equal(
    zcodeProvider.models.some((model) => model.id === "glm-5.2"),
    true
  );
  for (const alias of [
    "glm-5.3-high",
    "glm-5.3-low",
    "glm-5.3-flash-high",
    "glm-5.3-flash-low",
    "glm-5.3-flash-max",
    "glm-5.2-high",
    "glm-5.2-max",
  ]) {
    assert.equal(
      zcodeProvider.models.some((model) => model.id === alias),
      false,
      alias
    );
  }
  assert.deepEqual(
    zcodeProvider.models.find((model) => model.id === "glm-5.3")?.supportedThinkingEfforts,
    []
  );
  assert.deepEqual(
    zcodeProvider.models.find((model) => model.id === "glm-5.3-flash")?.supportedThinkingEfforts,
    []
  );
  assert.deepEqual(
    zcodeProvider.models.find((model) => model.id === "glm-5.2")?.supportedThinkingEfforts,
    []
  );
});

test("combo profile executors are independently identifiable to request monitoring", async () => {
  const [start, individual] = await Promise.all([
    getExecutor("zcode-start"),
    getExecutor("zcode-individual"),
  ]);
  assert.equal(start.getProvider(), "zcode-start");
  assert.equal(individual.getProvider(), "zcode-individual");
  assert.notEqual(start, individual);
});

test("ZCode Start and Individual are separate catalog routes for combo quota tracking", () => {
  assert.deepEqual(
    [
      [zcodeStartProvider.id, zcodeStartProvider.alias, zcodeStartProvider.executor],
      [zcodeIndividualProvider.id, zcodeIndividualProvider.alias, zcodeIndividualProvider.executor],
    ],
    [
      ["zcode-start", "zc-start", "zcode-start"],
      ["zcode-individual", "zc-individual", "zcode-individual"],
    ]
  );
  assert.match(
    zcodeStartProvider.models.find((model) => model.id === "glm-5.3-flash")?.name || "",
    /Z-code Start/
  );
  assert.match(
    zcodeIndividualProvider.models.find((model) => model.id === "glm-5.3-flash")?.name || "",
    /Z-code Individual/
  );
  assert.equal(
    zcodeStartProvider.models.find((model) => model.id === "glm-5.3-flash")
      ?.supportedThinkingEfforts,
    zcodeProvider.models.find((model) => model.id === "glm-5.3-flash")?.supportedThinkingEfforts
  );
  assert.equal(NOAUTH_PROVIDERS["zcode-start"].noAuth, true);
  assert.equal(NOAUTH_PROVIDERS["zcode-individual"].noAuth, true);
  assert.equal(providerAllowsOptionalApiKey("zcode-start"), true);
  assert.equal(providerAllowsOptionalApiKey("zcode-individual"), true);
});
