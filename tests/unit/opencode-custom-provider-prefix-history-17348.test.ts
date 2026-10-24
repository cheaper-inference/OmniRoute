import test from "node:test";
import assert from "node:assert/strict";
import {
  defaultOmniRouteEnrichmentFetcher,
  buildCanonicalToAliasMap,
  lookupEnrichment,
  reconcileHistoricalEnrichment,
  type OmniRouteEnrichmentMap,
} from "../../@omniroute/opencode-plugin-v2/src/shared/enrich.ts";

const NODE = "openai-compatible-chat-synthetic-17348";
type Model = { id: string };

async function withMockedCatalog(
  catalog: Record<string, unknown>,
  prices: Record<string, unknown>,
  check: (overlay: OmniRouteEnrichmentMap) => Promise<void> | void
): Promise<void> {
  const previous = globalThis.fetch;
  globalThis.fetch = (async (input: unknown) => {
    const url = String(input);
    const value = url.endsWith("/api/pricing/models")
      ? catalog
      : url.endsWith("/api/pricing")
        ? prices
        : { perModel: [] };
    return { ok: true, status: 200, json: async () => value };
  }) as typeof fetch;
  try {
    await check(await defaultOmniRouteEnrichmentFetcher("https://synthetic.invalid", "fake"));
  } finally {
    globalThis.fetch = previous;
  }
}

const history = [{ prefix: "ag", modelIds: ["foo", "org/nested"] }];
const current = {
  [NODE]: {
    id: NODE,
    alias: NODE,
    name: "Synthetic provider",
    displayPrefix: "ih",
    historicalPrefixes: history,
    models: [{ id: "foo" }, { id: "org/nested" }],
  },
};

test("#17348: recorded old prefix and current served ID restore matching model price", async () => {
  await withMockedCatalog(current, {
    [NODE]: { "ag/foo": { input: 3, output: 6 }, "ag/org/nested": { input: 7 } },
  }, (original) => {
    assert.equal(original.get("ih/foo")?.pricing, undefined, "legacy pricing is deferred");
    const applied = reconcileHistoricalEnrichment(original, [
      { id: "ih/foo" }, { id: "ih/org/nested" },
    ] satisfies Model[]);
    assert.deepEqual(applied.get("ih/foo")?.pricing, { input: 3, output: 6 });
    assert.deepEqual(applied.get("ih/org/nested")?.pricing, { input: 7 });
    assert.equal(applied.get("ih/foo")?.providerCanonical, NODE);
    assert.equal(applied.get("ih/foo")?.providerAlias, "ih");
    assert.equal(applied.get("ih/unknown")?.pricing, undefined);
    assert.equal(applied.get("ih/unknown")?.freeType, undefined);
    assert.deepEqual(
      lookupEnrichment("ih/foo", applied, buildCanonicalToAliasMap(applied), "ih")?.pricing,
      { input: 3, output: 6 }
    );
  });
});

test("#17348: legitimate slash-bearing upstream ID defeats speculative migration", async () => {
  await withMockedCatalog(current, { [NODE]: { "ag/foo": { input: 8 } } }, (overlay) => {
    const applied = reconcileHistoricalEnrichment(overlay, [
      { id: "ih/foo" }, { id: "ih/ag/foo" },
    ]);
    assert.equal(applied.get("ih/foo")?.pricing, undefined);
    assert.equal(applied.get("ih/ag/foo")?.pricing?.input, 8);
  });
});

test("#17348: never map a historical priced model that was absent from the old raw catalog", async () => {
  await withMockedCatalog(current, { [NODE]: { "ag/deleted": { input: 1 } } }, (overlay) => {
    const applied = reconcileHistoricalEnrichment(overlay, [{ id: "ih/deleted" }]);
    assert.equal(applied.get("ih/deleted")?.pricing, undefined);
    assert.equal(applied.get("ih/deleted")?.freeType, undefined);
  });
});

test("#17348: missing served model, cache alias rollover and empty response are fail-closed", async () => {
  await withMockedCatalog(current, { [NODE]: { "ag/foo": { input: 1 } } }, (overlay) => {
    const absent = reconcileHistoricalEnrichment(overlay, []);
    assert.equal(absent.get("ih/foo"), undefined, "unserved candidate not in active overlay");
    const stale = new Map(overlay);
    stale.set("ag/foo", {
      providerAlias: "ag",
      providerCanonical: NODE,
      pricing: { input: 99 },
    });
    const rotated = reconcileHistoricalEnrichment(stale, [{ id: "ih/foo" }]);
    assert.equal(rotated.has("ag/foo"), false, "disk-cached old public prefix is invalidated");
    assert.equal(rotated.get("ih/foo")?.pricing?.input, 1);
    assert.equal(overlay.get("ih/foo")?.pricing, undefined, "source snapshot is immutable");
  });
});

test("#17348: current prices beat historical ones and ambiguous histories cannot migrate", async () => {
  await withMockedCatalog(current, {
    [NODE]: {
      "ag/foo": { input: 1 },
      foo: { input: 7 },
    },
  }, (overlay) => {
    const currentWins = reconcileHistoricalEnrichment(overlay, [{ id: "ih/foo" }]);
    assert.equal(currentWins.get("ih/foo")?.pricing?.input, 7);
  });
  const duplicated = {
    [NODE]: {
      ...current[NODE],
      historicalPrefixes: [
        ...history,
        { prefix: "other", modelIds: ["foo"] },
      ],
    },
  };
  await withMockedCatalog(duplicated, {
    [NODE]: {
      "ag/foo": { input: 1 },
      "other/foo": { input: 9 },
    },
  }, (overlay) => {
    const ambiguous = reconcileHistoricalEnrichment(overlay, [{ id: "ih/foo" }]);
    assert.equal(ambiguous.get("ih/foo")?.pricing, undefined);
  });
});

test("#17348: unique historical pricing namespace and explicit pricingKey preserve owner", async () => {
  const catalog = {
    [NODE]: {
      ...current[NODE],
      pricingKey: "old-pricing-namespace",
    },
  };
  await withMockedCatalog(catalog, {
    ag: { foo: { input: 2 } },
    "old-pricing-namespace": { "org/nested": { input: 4 } },
  }, (overlay) => {
    const applied = reconcileHistoricalEnrichment(overlay, [
      { id: "ih/foo" }, { id: "ih/org/nested" },
    ]);
    assert.equal(applied.get("ih/foo")?.pricing?.input, 2);
    assert.equal(applied.get("ih/org/nested")?.pricing?.input, 4);
    assert.equal(applied.get("ih/org/nested")?.providerCanonical, NODE);
  });
});

test("#17348: reused old prefix cannot steal another live provider's pricing", async () => {
  await withMockedCatalog({
    ...current,
    "openai-compatible-chat-new-owner": {
      id: "openai-compatible-chat-new-owner",
      displayPrefix: "ag",
      models: [{ id: "foo" }],
    },
  }, {
    ag: { foo: { input: 90 } },
    [NODE]: { "ag/foo": { input: 3 } },
  }, (overlay) => {
    const applied = reconcileHistoricalEnrichment(overlay, [
      { id: "ih/foo" }, { id: "ag/foo" },
    ]);
    assert.equal(applied.get("ag/foo")?.pricing?.input, 90);
    assert.equal(applied.get("ih/foo")?.pricing?.input, undefined,
      "reused live old alias invalidates historical mapping when it is also served");
  });
});

test("#17348: old namespace must never bypass ambiguous served-ID reconciliation", async () => {
  await withMockedCatalog(current, { ag: { foo: { input: 42 } } }, (overlay) => {
    const bothServed = reconcileHistoricalEnrichment(overlay, [
      { id: "ih/foo" }, { id: "ih/ag/foo" },
    ]);
    assert.equal(bothServed.get("ih/foo")?.pricing, undefined);
    assert.equal(bothServed.get("ih/ag/foo")?.pricing, undefined);
    assert.equal(overlay.get("ih/foo")?.pricing, undefined,
      "legacy namespace pricing must only exist as a pending candidate");
  });
});

test("#17348: direct current prices dominate legacy pricing in either enumeration order", async () => {
  for (const prices of [
    { ag: { foo: { input: 1 } }, [NODE]: { foo: { input: 9 } } },
    { [NODE]: { foo: { input: 9 } }, ag: { foo: { input: 1 } } },
  ]) {
    await withMockedCatalog(current, prices, (overlay) => {
      assert.equal(
        reconcileHistoricalEnrichment(overlay, [{ id: "ih/foo" }]).get("ih/foo")?.pricing?.input,
        9
      );
    });
  }
});

test("#17348: compatible upstream foo and ih/foo remain two different identities", async () => {
  await withMockedCatalog({
    [NODE]: {
      id: NODE,
      displayPrefix: "ih",
      models: [
        { id: "foo", name: "Short", upstreamId: true },
        { id: "ih/foo", name: "Literal upstream namespace", upstreamId: true },
      ],
    },
  }, {
    [NODE]: { foo: { input: 2 }, "ih/foo": { input: 12 } },
  }, (overlay) => {
    const served = reconcileHistoricalEnrichment(overlay, [
      { id: "ih/foo" }, { id: "ih/ih/foo" },
    ]);
    assert.equal(served.get("ih/foo")?.name, "Short");
    assert.equal(served.get("ih/foo")?.pricing?.input, 2);
    assert.equal(served.get("ih/ih/foo")?.name, "Literal upstream namespace");
    assert.equal(served.get("ih/ih/foo")?.pricing?.input, 12);
    assert.notEqual(served.get("ih/ih/foo"), served.get("ih/foo"));
  });
});

test("#17348: old prefix of A colliding with explicit pricingKey of B cannot assign prices", async () => {
  const nodeB = "openai-compatible-chat-explicit-pricing-b";
  await withMockedCatalog({
    [NODE]: current[NODE],
    [nodeB]: {
      id: nodeB,
      displayPrefix: "si",
      pricingKey: "ag",
      models: [{ id: "foo", upstreamId: true }],
    },
  }, { ag: { foo: { input: 77 } } }, (overlay) => {
    const served = reconcileHistoricalEnrichment(overlay, [
      { id: "ih/foo" }, { id: "si/foo" },
    ]);
    assert.equal(served.get("ih/foo")?.pricing, undefined);
    assert.equal(served.get("si/foo")?.pricing, undefined);
    assert.equal(served.get("foo")?.pricing, undefined);
  });
});


test("#17348: disagreeing historical prices for the same old ID remain unresolved", async () => {
  // The same old public identity can appear under a node's internal pricing key
  // and an old-prefix pricing namespace. Neither source is authoritative when
  // they disagree, regardless of response object enumeration order.
  for (const prices of [
    { [NODE]: { "ag/foo": { input: 1 } }, ag: { foo: { input: 9 } } },
    { ag: { foo: { input: 9 } }, [NODE]: { "ag/foo": { input: 1 } } },
  ]) {
    await withMockedCatalog(current, prices, (overlay) => {
      assert.equal(overlay.get("ih/foo")?.pricing, undefined, "never apply old prices eagerly");
      const reconciled = reconcileHistoricalEnrichment(overlay, [{ id: "ih/foo" }]);
      assert.equal(
        reconciled.get("ih/foo")?.pricing,
        undefined,
        "conflicting historical quotes must not publish an arbitrary price"
      );
    });
  }
});

test("#17348: agreeing historical quotes may be deduplicated safely", async () => {
  await withMockedCatalog(current, {
    [NODE]: { "ag/foo": { input: 2, output: 4 } },
    ag: { foo: { input: 2, output: 4 } },
  }, (overlay) => {
    const reconciled = reconcileHistoricalEnrichment(overlay, [{ id: "ih/foo" }]);
    assert.deepEqual(reconciled.get("ih/foo")?.pricing, { input: 2, output: 4 });
  });
});


test("#17348: historical display-only pricing slot cannot impersonate a live catalog owner", async () => {
  const priceOnlySlot = {
    id: "ag",
    alias: "ag",
    pricingOnly: true,
    historicalPricingNamespace: true,
    modelOverrideEligible: false,
    models: [{ id: "foo", custom: true }, { id: "not-old", custom: true }],
  };
  await withMockedCatalog({ ...current, ag: priceOnlySlot }, {
    ag: { foo: { input: 6 }, "not-old": { input: 42 } },
  }, (overlay) => {
    const resolved = reconcileHistoricalEnrichment(overlay, [{ id: "ih/foo" }, { id: "ih/not-old" }]);
    assert.deepEqual(resolved.get("ih/foo")?.pricing, { input: 6 });
    assert.equal(resolved.get("ih/not-old")?.pricing, undefined,
      "pricing-only model without recorded provenance cannot be migrated");
    assert.equal(overlay.get("ag/foo")?.providerCanonical, undefined,
      "the display-only slot must not be treated as current ownership");
  });
});

test("#17348: deleted compatible provider rows are not current enrichment evidence", async () => {
  await withMockedCatalog({
    [NODE]: {
      id: NODE,
      alias: NODE,
      pricingOnly: true,
      orphaned: true,
      modelOverrideEligible: false,
      models: [{ id: "deleted-model", custom: true }],
    },
  }, { [NODE]: { "deleted-model": { input: 80 } } }, (overlay) => {
    assert.equal(overlay.get(NODE + "/deleted-model")?.providerCanonical, undefined);
    assert.equal(overlay.get(NODE + "/deleted-model")?.providerAlias, undefined);
  });
});


test("#17348: reused public prefix can only be priced by the current node ID", async () => {
  const active = {
    [NODE]: {
      id: NODE,
      displayPrefix: "ag",
      pricingUnsafePublicPrefix: true,
      models: [{ id: "foo", upstreamId: true }],
    },
    ag: {
      id: "ag",
      alias: "ag",
      pricingOnly: true,
      historicalPricingNamespace: true,
      models: [{ id: "foo", custom: true }],
    },
  };
  await withMockedCatalog(active, {
    ag: { foo: { input: 99 } },
  }, (overlay) => {
    assert.equal(reconcileHistoricalEnrichment(overlay, [{ id: "ag/foo" }])
      .get("ag/foo")?.pricing, undefined,
      "unverified inherited public price must not be assigned to the new owner");
  });
  await withMockedCatalog(active, {
    ag: { foo: { input: 99 } },
    [NODE]: { foo: { input: 7 } },
  }, (overlay) => {
    assert.deepEqual(reconcileHistoricalEnrichment(overlay, [{ id: "ag/foo" }])
      .get("ag/foo")?.pricing, { input: 7 },
      "explicit price under the new owner node ID remains valid");
  });
});

test("#17348: a current node-ID price beats a public alias quote independently of JSON key order", async () => {
  const pricesByNode = {
    foo: { input: 7 },
  };
  const pricesByPublicAlias = {
    foo: { input: 99, output: 300 },
    "org/nested": { input: 11 },
  };
  for (const prices of [
    { ih: pricesByPublicAlias, [NODE]: pricesByNode },
    { [NODE]: pricesByNode, ih: pricesByPublicAlias },
  ]) {
    await withMockedCatalog(current, prices, (overlay) => {
      const served = reconcileHistoricalEnrichment(overlay, [
        { id: "ih/foo" },
        { id: "ih/org/nested" },
      ]);
      assert.deepEqual(served.get("ih/foo")?.pricing, { input: 7 },
        "canonical node price wins entirely, not just one property");
      assert.deepEqual(served.get("ih/org/nested")?.pricing, { input: 11 },
        "uncontested public-alias-only price remains usable");
      assert.deepEqual(served.get("foo")?.pricing, { input: 7 },
        "bare-key fallback cannot restore the rejected alias price");
    });
  }
});

test("#17348: canonical pricing precedence is stable for prefixed and literal-slash IDs", async () => {
  for (const [rawModelId, publicPriceKey, servedId] of [
    ["org/nested", "ih/org/nested", "ih/org/nested"],
    ["ih/org/nested", "ih/ih/org/nested", "ih/ih/org/nested"],
  ] as const) {
    const fixture = {
      [NODE]: {
        id: NODE,
        displayPrefix: "ih",
        models: [{ id: rawModelId, upstreamId: true }],
      },
    };
    for (const prices of [
      { ih: { [publicPriceKey]: { input: 99 } }, [NODE]: { [rawModelId]: { input: 7 } } },
      { [NODE]: { [rawModelId]: { input: 7 } }, ih: { [publicPriceKey]: { input: 99 } } },
    ]) {
      await withMockedCatalog(fixture, prices, (overlay) => {
        const reconciled = reconcileHistoricalEnrichment(overlay, [{ id: servedId }]);
        assert.deepEqual(reconciled.get(servedId)?.pricing, { input: 7 },
          "canonical pricing must beat prefixed public namespace without stripping a literal raw ID");
      });
    }
  }
});
