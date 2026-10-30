import assert from "node:assert/strict";
import test from "node:test";

import { readSrc } from "../_helpers/readSrc";

const FLAG = "CURSOR_GROK_47_DROP_MAX_EFFORT";
const RESOLVER_KEY = Symbol.for("omniroute.featureFlagResolver");

// grok47MaxEffort is reachable from ProviderDetailPageClient, and the server
// flag module reads the override table through db/core, so naming it here
// breaks the production build. client-bundle-no-server-only-10692 owns that
// invariant for the whole graph; this names the file that broke it.
test("grok47MaxEffort reads the flag through the open-sse helper", () => {
  const source = readSrc("open-sse/utils/cursorAgentProtobuf/grok47MaxEffort.ts");

  assert.match(source, /isRegisteredFeatureFlagEnabled\(CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG\)/);
  // The helper call could stay while the server import comes back alongside it.
  assert.doesNotMatch(source, /from "@\/shared\/utils\/featureFlags(\.ts)?"/);
});

// The bridge publishes the resolver under a shared symbol and open-sse reads
// that same symbol. Nothing else pins the two together: renaming the prefix in
// processSingleton.ts leaves the bridge and registeredFeatureFlag tests green.
test("a resolver registered through the bridge is the one the helper reads", async () => {
  const { registerFeatureFlagResolver } =
    await import("../../src/shared/utils/featureFlagResolverBridge.ts");
  const { isCursorGrok47MaxEffortDropped } =
    await import("../../open-sse/utils/cursorAgentProtobuf/grok47MaxEffort.ts");

  const savedFlag = process.env[FLAG];
  // A resolver may already be registered by whichever module loaded first. Put
  // it back instead of clearing the slot, or a later file in the same process
  // would lose the server's registration.
  const resolverStore = globalThis as Record<symbol, unknown>;
  const previousResolver = resolverStore[RESOLVER_KEY];

  delete process.env[FLAG];
  try {
    registerFeatureFlagResolver((key) => key === FLAG);
    assert.equal(
      isCursorGrok47MaxEffortDropped(),
      true,
      "a resolver registered through the bridge is read here"
    );

    registerFeatureFlagResolver(() => {
      throw new Error("override table unreadable");
    });
    assert.equal(
      isCursorGrok47MaxEffortDropped(),
      false,
      "an unreadable flag store fails closed and keeps max"
    );

    registerFeatureFlagResolver(null);
    assert.equal(
      isCursorGrok47MaxEffortDropped(),
      false,
      "with no resolver and no env var the flag stays off"
    );

    process.env[FLAG] = "true";
    assert.equal(isCursorGrok47MaxEffortDropped(), true, "the env var still decides");
  } finally {
    if (savedFlag === undefined) delete process.env[FLAG];
    else process.env[FLAG] = savedFlag;
    if (previousResolver === undefined) delete resolverStore[RESOLVER_KEY];
    else resolverStore[RESOLVER_KEY] = previousResolver;
  }
});
