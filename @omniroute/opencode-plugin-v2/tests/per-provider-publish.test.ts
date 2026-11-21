import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildProviderPayload,
  buildProviderPayloads,
  collectCatalog,
  publishProviderPayloads,
  type CollectedCatalog,
  type ProviderPayload,
  type ResolvedOptions,
  type StableProviderEditor,
} from "../src/catalog.js";
import { parsePluginOptions, toResolvedOptions } from "../src/options.js";
import type { OmniRouteEnrichmentMap } from "../src/shared/enrich.js";

const BASE_URL = "https://gw.example.com";
const KEY = "test-shared-key";

function resolved(overrides: Partial<ResolvedOptions> = {}): ResolvedOptions {
  return {
    providerId: "omniroute",
    baseURL: BASE_URL,
    apiKey: "test-shared-key",
    timeoutMs: 1000,
    modelCacheTtlMs: 300000,
    usableOnly: false,
    // Full catalog: the picker narrowing must not decide which models a
    // publication test sees.
    visibleModels: ["*"],
    displayName: "OmniRoute",
    ...overrides,
  } as ResolvedOptions;
}

type Entries = Record<string, Record<string, unknown>>;
function overlay(entries: Entries): OmniRouteEnrichmentMap {
  return new Map(Object.entries(entries)) as OmniRouteEnrichmentMap;
}

async function collect(
  opts: ResolvedOptions,
  models: Array<Record<string, unknown>>,
  combos: Array<Record<string, unknown>> = []
): Promise<CollectedCatalog> {
  return collectCatalog(opts, {
    fetcher: async () => models,
    combosFetcher: async () => combos,
  });
}

function byId(payloads: readonly ProviderPayload[]): Map<string, ProviderPayload> {
  const out = new Map<string, ProviderPayload>();
  for (const payload of payloads) out.set(String(payload.info.id), payload);
  return out;
}

function fakeEditor() {
  const providers = new Map<string, { provider: Record<string, unknown> }>();
  const models = new Map<string, Array<Record<string, unknown>>>();
  const calls = { add: 0, set: 0, remove: 0, logs: [] as string[] };
  const editor = {
    add(input: { info: Record<string, unknown>; models: Array<Record<string, unknown>> }) {
      calls.add += 1;
      providers.set(String(input.info.id), { provider: input.info });
      models.set(String(input.info.id), input.models);
    },
    get(id: string) {
      return providers.get(id);
    },
    list() {
      return [...providers.values()];
    },
    update(id: string, fn: (p: Record<string, unknown>) => void) {
      const found = providers.get(id);
      if (found) fn(found.provider);
    },
    remove(id: string) {
      calls.remove += 1;
      providers.delete(id);
      models.delete(id);
    },
    models: {
      set(id: string, next: Array<Record<string, unknown>>) {
        calls.set += 1;
        if (!providers.has(id)) providers.set(id, { provider: { id } });
        models.set(id, next);
      },
      update() {},
      remove() {},
    },
  } as unknown as StableProviderEditor;
  const log = { warn: (message: string) => calls.logs.push(message) };
  return { editor, providers, models, calls, log };
}

describe("per-provider publication", () => {
  it("stays off by default and keeps the single-provider payload unchanged", async () => {
    const parsed = parsePluginOptions({ baseURL: BASE_URL });
    assert.equal(parsed.publishPerProvider, false);
    assert.equal(toResolvedOptions(parsed).publishPerProvider, false);
    assert.equal(
      toResolvedOptions(parsePluginOptions({ baseURL: BASE_URL, publishPerProvider: true }))
        .publishPerProvider,
      true
    );

    const opts = resolved();
    const collected = await collect(opts, [{ id: "cc/sonnet" }]);
    const payloads = buildProviderPayloads(collected, opts);
    assert.equal(payloads.length, 1);
    assert.equal(payloads[0]!.info.id, "omniroute");
    assert.deepEqual(payloads[0], buildProviderPayload(collected, opts));
  });

  it("publishes one provider per upstream alias with a human label", async () => {
    const opts = resolved({
      publishPerProvider: true,
      enrichment: overlay({
        "cc/sonnet-4-6": { name: "Sonnet 4.6", providerAlias: "cc", providerDisplayName: "Claude" },
        "cf/llama-3-3": {
          name: "Llama 3.3",
          providerAlias: "cf",
          providerDisplayName: "Cloudflare",
        },
      }),
    });
    const collected = await collect(opts, [
      { id: "cc/sonnet-4-6" },
      { id: "cf/llama-3-3" },
      { id: "standalone-x" },
    ]);
    const groups = byId(buildProviderPayloads(collected, opts));

    assert.equal(groups.size, 3);
    assert.equal(groups.get("omniroute-cc")?.info.name, "OmniRoute - Claude");
    assert.equal(groups.get("omniroute-cf")?.info.name, "OmniRoute - Cloudflare");
    assert.equal(groups.get("omniroute")?.info.name, "OmniRoute");

    const cc = groups.get("omniroute-cc")!.models[0] as unknown as Record<string, any>;
    const cf = groups.get("omniroute-cf")!.models[0] as unknown as Record<string, any>;
    const base = groups.get("omniroute")!.models[0] as unknown as Record<string, any>;
    assert.equal(cc.name, "Sonnet 4.6");
    assert.equal(cf.name, "Llama 3.3");
    assert.equal(base.name, "omniroute - standalone-x");
  });

  it("keeps combos, auto strategies and alias-less ids under the base provider", async () => {
    const opts = resolved({
      publishPerProvider: true,
      enrichment: overlay({
        "cc/sonnet": { name: "Sonnet", providerAlias: "cc", providerDisplayName: "Claude" },
      }),
    });
    const collected = await collect(
      opts,
      [
        { id: "cc/sonnet" },
        { id: "auto/best-coding" },
        { id: "omniroute/bare-x" },
        { id: "gpt-x" },
      ],
      [{ id: "duo", name: "Duo Combo", models: [{ kind: "model", model: "gpt-x" }] }]
    );
    const groups = byId(buildProviderPayloads(collected, opts));
    const base = groups.get("omniroute");
    assert.ok(base, "the base provider must exist");
    assert.equal(base!.info.name, "OmniRoute");
    assert.deepEqual((base!.models as Array<Record<string, unknown>>).map((m) => m.id).sort(), [
      "Duo Combo",
      "auto/best-coding",
      "bare-x",
      "gpt-x",
    ]);
    assert.equal(groups.has("omniroute-cc"), true);
  });

  it("drops the provider prefix from a label but keeps the free marker and budget", async () => {
    const entry = {
      name: "Grok 4 Fast",
      providerAlias: "pol",
      providerDisplayName: "Pollinations",
      freeType: "recurring-monthly",
      monthlyTokens: 1_000_000,
    };
    const enr = overlay({ "pol/grok": entry });
    const off = resolved({ enrichment: enr });
    const offCollected = await collect(off, [{ id: "pol/grok" }]);
    const offName = (
      buildProviderPayload(offCollected, off).models[0] as unknown as Record<string, unknown>
    ).name;
    assert.equal(offName, "🆓 Pollinations - Grok 4 Fast · 1M tokens/month");

    const on = resolved({ publishPerProvider: true, enrichment: enr });
    const onCollected = await collect(on, [{ id: "pol/grok" }]);
    const onPayload = buildProviderPayloads(onCollected, on)[0]!;
    assert.equal(onPayload.info.id, "omniroute-pol");
    const name = (onPayload.models[0] as unknown as Record<string, unknown>).name;
    assert.equal(name, "🆓 Grok 4 Fast · 1M tokens/month");
  });

  it("sends the full gateway id to a renamed provider and shares one key", async () => {
    const opts = resolved({
      publishPerProvider: true,
      enrichment: overlay({
        "cc/sonnet": { name: "Sonnet", providerAlias: "cc", providerDisplayName: "Claude" },
        "cf/llama": { name: "Llama", providerAlias: "cf", providerDisplayName: "Cloudflare" },
      }),
    });
    const collected = await collect(opts, [{ id: "cc/sonnet" }, { id: "cf/llama" }]);
    const payloads = buildProviderPayloads(collected, opts);
    assert.equal(payloads.length, 2);
    for (const payload of payloads) {
      const info = payload.info as unknown as Record<string, any>;
      assert.equal(info.settings.baseURL, `${BASE_URL}/v1`);
      assert.equal(info.settings.apiKey, KEY);
      assert.equal(info.integrationID, info.id);
      assert.equal(payload.models.length, 1);
      const model = payload.models[0] as unknown as Record<string, any>;
      assert.equal(model.providerID, info.id);
      assert.equal(model.settings.baseURL, `${BASE_URL}/v1`);
      assert.equal(model.settings.apiKey, KEY);
    }
    const cc = byId(payloads).get("omniroute-cc")!.models[0] as unknown as Record<string, unknown>;
    assert.equal(cc.id, "cc/sonnet");
    const cf = byId(payloads).get("omniroute-cf")!.models[0] as unknown as Record<string, unknown>;
    assert.equal(cf.id, "cf/llama");
  });

  it("disambiguates names inside each provider, not across providers", async () => {
    const opts = resolved({
      publishPerProvider: true,
      enrichment: overlay({
        "cc/sonnet-a": { name: "Sonnet", providerAlias: "cc", providerDisplayName: "Claude" },
        "cc/sonnet-b": { name: "Sonnet", providerAlias: "cc", providerDisplayName: "Claude" },
        "cf/sonnet-a": { name: "Sonnet", providerAlias: "cf", providerDisplayName: "Cloudflare" },
      }),
    });
    const collected = await collect(opts, [
      { id: "cc/sonnet-a" },
      { id: "cc/sonnet-b" },
      { id: "cf/sonnet-a" },
    ]);
    const groups = byId(buildProviderPayloads(collected, opts));
    const ccNames = groups
      .get("omniroute-cc")!
      .models.map((m) => (m as unknown as Record<string, unknown>).name);
    const cfName = (groups.get("omniroute-cf")!.models[0] as unknown as Record<string, unknown>)
      .name;
    assert.equal(cfName, "Sonnet");
    assert.equal(ccNames.filter((n) => n === "Sonnet").length, 0);
    assert.equal(ccNames.filter((n) => typeof n === "string" && n.includes("(cc/")).length, 2);
  });

  it("bounds provider ids for dirty aliases and resolves collisions uniquely", async () => {
    const opts = resolved({
      publishPerProvider: true,
      enrichment: overlay({
        "cc/a": { name: "A", providerAlias: "cc", providerDisplayName: "First" },
        "zz/b": { name: "B", providerAlias: "cc", providerDisplayName: "First" },
        "cf/c": { name: "C", providerAlias: "c c", providerDisplayName: "Third" },
        "xy/d": { name: "D", providerAlias: "c-c", providerDisplayName: "Fourth" },
      }),
    });
    const collected = await collect(opts, [
      { id: "cc/a" },
      { id: "zz/b" },
      { id: "cf/c" },
      { id: "xy/d" },
    ]);
    const payloads = buildProviderPayloads(collected, opts);
    const ids = payloads.map((p) => String(p.info.id));
    assert.equal(new Set(ids).size, ids.length, "provider ids must be unique");
    for (const id of ids) assert.match(id, /^[A-Za-z0-9._-]+$/);
    assert.deepEqual(ids, ["omniroute-cc", "omniroute-c-c", "omniroute-c-c-2"]);
    // The same alias stays one provider instead of splitting per model.
    assert.equal(byId(payloads).get("omniroute-cc")!.models.length, 2);
  });

  it("falls back to the base provider when publication groups are missing", async () => {
    const opts = resolved({
      publishPerProvider: true,
      enrichment: overlay({
        "cc/sonnet": { name: "Sonnet", providerAlias: "cc", providerDisplayName: "Claude" },
      }),
    });
    const collected = await collect(opts, [{ id: "cc/sonnet" }, { id: "plain" }]);
    const cold: CollectedCatalog = { entries: collected.entries, counts: collected.counts };
    const payloads = buildProviderPayloads(cold, opts);
    assert.equal(payloads.length, 1);
    assert.equal(payloads[0]!.info.id, "omniroute");
    assert.equal(payloads[0]!.models.length, 2);
  });

  it("replays idempotently, removes vanished providers and bounds the published set", async () => {
    const opts = resolved({
      publishPerProvider: true,
      enrichment: overlay({
        "cc/sonnet": { name: "Sonnet", providerAlias: "cc", providerDisplayName: "Claude" },
        "cf/llama": { name: "Llama", providerAlias: "cf", providerDisplayName: "Cloudflare" },
      }),
    });
    const first = await collect(opts, [{ id: "cc/sonnet" }, { id: "cf/llama" }]);
    const second = await collect(opts, [{ id: "cc/sonnet" }]);
    const none = await collect(opts, []);

    const { editor, models, calls, log } = fakeEditor();
    const published = new Set<string>();
    const firstPayloads = buildProviderPayloads(first, opts);
    const secondPayloads = buildProviderPayloads(second, opts);
    const nonePayloads = buildProviderPayloads(none, opts);

    publishProviderPayloads(editor, firstPayloads, published, log);
    assert.equal(calls.add, 2);
    assert.equal(published.size, 2);

    publishProviderPayloads(editor, firstPayloads, published, log);
    assert.equal(calls.add, 2, "a replay must not add the same provider twice");
    assert.equal(calls.set, 2, "a replay refreshes models of present providers");
    assert.equal(published.size, 2);

    publishProviderPayloads(editor, secondPayloads, published, log);
    assert.equal(calls.remove, 1);
    assert.equal(published.size, 1);
    assert.equal(models.has("omniroute-cf"), false);
    assert.equal(calls.logs.length, 1, "N removals produce one log line");
    assert.match(calls.logs[0]!, /1/);

    publishProviderPayloads(editor, nonePayloads, published, log);
    assert.equal(published.size, 0, "the bounded set returns to its starting size");
    assert.equal(calls.remove, 2);
    assert.equal(calls.logs.length, 2);
  });

  it("keeps a combo that replaces an aliased model on the base provider", async () => {
    const opts = resolved({
      publishPerProvider: true,
      enrichment: overlay({
        "cc/sonnet": { name: "Sonnet", providerAlias: "cc", providerDisplayName: "Claude" },
      }),
    });
    const collected = await collect(
      opts,
      [{ id: "cc/sonnet" }],
      [{ id: "duo", name: "cc/sonnet", models: [{ kind: "model", model: "cc/sonnet" }] }]
    );
    const groups = byId(buildProviderPayloads(collected, opts));
    const base = groups.get("omniroute");
    assert.ok(base, "the base provider must carry the combo");
    assert.ok(
      (base!.models as Array<Record<string, unknown>>).some((m) => m.id === "cc/sonnet"),
      "the combo must be published on the base provider, not the alias"
    );
    assert.equal(groups.has("omniroute-cc"), false, "no alias provider survives the overwrite");
  });

  it("replays updates through add when the host only exposes add", async () => {
    const opts = resolved();
    const first = await collect(opts, [{ id: "m1" }]);
    const second = await collect(opts, [{ id: "m1" }, { id: "m2" }]);
    const batches: Array<Array<Record<string, unknown>>> = [];
    const minimal = {
      add(input: { info: Record<string, unknown>; models: Array<Record<string, unknown>> }) {
        batches.push(input.models);
      },
    } as unknown as StableProviderEditor;
    const published = new Set<string>();

    publishProviderPayloads(minimal, buildProviderPayloads(first, opts), published);
    publishProviderPayloads(minimal, buildProviderPayloads(second, opts), published);

    assert.equal(batches.length, 2, "each refresh must reach a host that only exposes add");
    assert.ok(
      batches[1]!.some((m) => m.id === "m2"),
      "the refreshed snapshot must be republished, not the first one"
    );
  });

  it("refreshes provider metadata when an existing provider is replayed", async () => {
    const opts = resolved({
      publishPerProvider: true,
      enrichment: overlay({
        "cc/sonnet": { name: "Sonnet", providerAlias: "cc", providerDisplayName: "Claude" },
      }),
    });
    const collected = await collect(opts, [{ id: "cc/sonnet" }]);
    const { editor, providers, calls } = fakeEditor();
    const published = new Set<string>();
    const first = buildProviderPayloads(collected, opts).find(
      (p) => String(p.info.id) === "omniroute-cc"
    )!;
    publishProviderPayloads(editor, [first], published);
    assert.equal(
      (providers.get("omniroute-cc")!.provider as Record<string, unknown>).name,
      "OmniRoute - Claude"
    );

    const changedOpts = resolved({
      publishPerProvider: true,
      enrichment: overlay({
        "cc/sonnet": { name: "Sonnet", providerAlias: "cc", providerDisplayName: "Anthropic" },
      }),
    });
    const changedCollected = await collect(changedOpts, [{ id: "cc/sonnet" }]);
    const changed = buildProviderPayloads(changedCollected, changedOpts).find(
      (p) => String(p.info.id) === "omniroute-cc"
    )!;
    publishProviderPayloads(editor, [changed], published);
    assert.equal(
      (providers.get("omniroute-cc")!.provider as Record<string, unknown>).name,
      "OmniRoute - Anthropic",
      "the existing provider must pick up the refreshed label"
    );
    assert.equal(calls.add, 1, "a metadata refresh must not re-add the provider");
  });
});
