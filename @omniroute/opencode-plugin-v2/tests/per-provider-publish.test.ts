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

  it("publishes one labeled provider for each enriched upstream prefix", async () => {
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

  it("publishes a single provider for the alias and canonical ids of one upstream", async () => {
    const opts = resolved({
      publishPerProvider: true,
      enrichment: overlay({
        "cc/sonnet-a": {
          name: "Sonnet A",
          providerAlias: "cc",
          providerCanonical: "claude",
          providerDisplayName: "Claude",
        },
        "cc/opus": {
          name: "Opus",
          providerAlias: "cc",
          providerCanonical: "claude",
          providerDisplayName: "Claude",
        },
      }),
    });
    // "cc/sonnet-a" hits enrichment directly; "claude/opus" only resolves
    // through the canonical-to-alias map. Neither twin is dropped here, so the
    // single-provider result comes from grouping, not from canonical dedupe.
    const collected = await collect(opts, [{ id: "cc/sonnet-a" }, { id: "claude/opus" }]);
    const groups = byId(buildProviderPayloads(collected, opts));

    assert.equal(groups.size, 1);
    assert.equal(groups.get("omniroute-claude")?.info.name, "OmniRoute - Claude");
    assert.equal(groups.has("omniroute-cc"), false);
    const ids = (groups.get("omniroute-claude")!.models as Array<Record<string, unknown>>)
      .map((m) => String(m.id))
      .sort();
    assert.deepEqual(ids, ["cc/sonnet-a", "claude/opus"]);
  });

  it("keeps alias and canonical prefixes separate when enrichment is missing", async () => {
    // Documented limit: without enrichment data there is no canonical identity
    // to group on, so each prefix becomes its own provider.
    const opts = resolved({ publishPerProvider: true });
    const collected = await collect(opts, [{ id: "cc/sonnet" }, { id: "claude/sonnet" }]);
    const groups = byId(buildProviderPayloads(collected, opts));

    assert.equal(groups.has("omniroute-cc"), true);
    assert.equal(groups.has("omniroute-claude"), true);
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

  it("keeps wrapper ids on the base provider instead of creating a wrapper provider", async () => {
    const opts = resolved({
      publishPerProvider: true,
      enrichment: overlay({
        "cc/sonnet": { name: "Sonnet", providerAlias: "cc", providerDisplayName: "Claude" },
      }),
    });
    const collected = await collect(opts, [
      { id: "cc/sonnet" },
      { id: "no-think/cc/sonnet" },
      { id: "claude/kimi/kimi-k2.6" },
    ]);
    const groups = byId(buildProviderPayloads(collected, opts));

    assert.equal(groups.has("omniroute-no-think"), false);
    assert.equal(groups.has("omniroute-claude"), false);
    assert.equal(groups.has("omniroute-cc"), true);

    const base = groups.get("omniroute");
    assert.ok(base, "wrapper ids must stay under the base provider");
    const baseIds = (base!.models as Array<Record<string, unknown>>).map((m) => m.id);
    assert.ok(baseIds.includes("no-think/cc/sonnet"));
    assert.ok(baseIds.includes("claude/kimi/kimi-k2.6"));
  });

  it("routes two-segment aliases to their own provider without listing prefixes", async () => {
    const opts = resolved({
      publishPerProvider: true,
      enrichment: overlay({
        "cc/sonnet": { name: "Sonnet", providerAlias: "cc", providerDisplayName: "Claude" },
        "cc/model/with/slash": {
          name: "Nested Sonnet",
          providerAlias: "cc",
          providerDisplayName: "Claude",
        },
        "relay/cc/sonnet": {
          name: "Relayed Sonnet",
          providerAlias: "cc",
          providerDisplayName: "Claude",
        },
      }),
    });
    const collected = await collect(opts, [
      { id: "cc/sonnet" },
      { id: "cc/model/with/slash" },
      { id: "relay/cc/sonnet" },
      { id: "claude/kimi/kimi-k2.6" },
      { id: "claude/claude-sonnet-4-6" },
      { id: "auto/best-coding" },
      { id: "gpt-x" },
    ]);
    const groups = byId(buildProviderPayloads(collected, opts));
    const idsOf = (id: string): string[] =>
      ((groups.get(id)?.models ?? []) as Array<Record<string, unknown>>).map((m) => String(m.id));
    const sorted = (values: string[]): string[] => [...values].sort();

    // A two-segment id is an ordinary alias, whatever its first segment.
    assert.deepEqual(sorted(idsOf("omniroute-claude")), ["claude/claude-sonnet-4-6"]);
    // An upstream alias keeps its provider even with extra path segments.
    assert.deepEqual(sorted(idsOf("omniroute-cc")), ["cc/model/with/slash", "cc/sonnet"]);

    // A wrapper is detected from the data and the id shape, never from a name.
    assert.deepEqual(sorted(idsOf("omniroute")), [
      "auto/best-coding",
      "claude/kimi/kimi-k2.6",
      "gpt-x",
      "relay/cc/sonnet",
    ]);
    assert.equal(groups.has("omniroute-relay"), false);
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

  it("derives collision-safe provider ids from the identity, not from row order", async () => {
    const opts = resolved({
      publishPerProvider: true,
      enrichment: overlay({
        "cc/a": { name: "A", providerAlias: "cc", providerDisplayName: "First" },
        "cc/b": { name: "B", providerAlias: "cc", providerDisplayName: "First" },
        "c c/c": { name: "C", providerAlias: "c c", providerDisplayName: "Third" },
        "c-c/d": { name: "D", providerAlias: "c-c", providerDisplayName: "Fourth" },
      }),
    });
    const rows = [{ id: "cc/a" }, { id: "cc/b" }, { id: "c c/c" }, { id: "c-c/d" }];
    const providerFor = (collected: CollectedCatalog, modelId: string): string | undefined => {
      for (const payload of buildProviderPayloads(collected, opts)) {
        if (payload.models.some((m) => (m as unknown as Record<string, unknown>).id === modelId)) {
          return String(payload.info.id);
        }
      }
      return undefined;
    };
    const forward = await collect(opts, rows);
    const reverse = await collect(opts, [...rows].reverse());
    const ccId = providerFor(forward, "cc/a");
    const spacedId = providerFor(forward, "c c/c");
    const dashedId = providerFor(forward, "c-c/d");
    assert.equal(ccId, "omniroute-cc");
    assert.notEqual(spacedId, dashedId, "colliding slugs must get distinct ids");
    assert.equal(providerFor(reverse, "cc/a"), ccId, "reordering must not move a stable id");
    assert.equal(providerFor(reverse, "c c/c"), spacedId, "reordering must not swap colliding ids");
    assert.equal(providerFor(reverse, "c-c/d"), dashedId, "reordering must not swap colliding ids");
    // Removing the other identity of a collision must not renumber this one.
    const withoutSpaced = await collect(opts, [{ id: "cc/a" }, { id: "cc/b" }, { id: "c-c/d" }]);
    const withoutDashed = await collect(opts, [{ id: "cc/a" }, { id: "cc/b" }, { id: "c c/c" }]);
    assert.equal(providerFor(withoutSpaced, "c-c/d"), dashedId);
    assert.equal(providerFor(withoutDashed, "c c/c"), spacedId);
    const ids = buildProviderPayloads(forward, opts).map((p) => String(p.info.id));
    assert.equal(new Set(ids).size, ids.length, "provider ids must be unique");
    for (const id of ids) assert.match(id, /^[A-Za-z0-9._-]+$/);
    // The same alias stays one provider instead of splitting per model.
    assert.equal(byId(buildProviderPayloads(forward, opts)).get("omniroute-cc")!.models.length, 2);
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

  it("keeps a raw combo row on the base provider regardless of combosSource", async () => {
    const opts = resolved({ publishPerProvider: true });
    const collected = await collect(opts, [
      { id: "team/fast", owned_by: "combo" },
      { id: "cc/sonnet" },
    ]);
    const groups = byId(buildProviderPayloads(collected, opts));
    assert.equal(groups.has("omniroute-team"), false, "a raw combo must not get an alias provider");
    const base = groups.get("omniroute");
    assert.ok(base, "the base provider must carry the raw combo row");
    assert.ok((base!.models as Array<Record<string, unknown>>).some((m) => m.id === "team/fast"));
  });

  it("applies modelOrder within each published provider", async () => {
    const opts = resolved({
      publishPerProvider: true,
      enrichment: overlay({
        "cc/z": { name: "Zulu", providerAlias: "cc", providerDisplayName: "Claude" },
        "cc/a": { name: "Alpha", providerAlias: "cc", providerDisplayName: "Claude" },
      }),
      modelOrder: [{ key: "name" }],
    });
    const collected = await collect(opts, [{ id: "cc/z" }, { id: "cc/a" }]);
    const cc = byId(buildProviderPayloads(collected, opts)).get("omniroute-cc");
    assert.ok(cc, "the alias provider must exist");
    assert.deepEqual(
      (cc!.models as Array<Record<string, unknown>>).map((m) => m.id),
      ["cc/a", "cc/z"],
      "rows inside a provider follow the configured order"
    );
    assert.deepEqual(
      buildProviderPayload(collected, opts).models.map(
        (m) => (m as unknown as Record<string, unknown>).id
      ),
      ["cc/a", "cc/z"],
      "the grouped and single-provider paths share the same comparator"
    );
  });

  it("reuses a known canonical identity for an alias model missing its own enrichment", async () => {
    const opts = resolved({
      publishPerProvider: true,
      enrichment: overlay({
        "cc/a": {
          name: "A",
          providerAlias: "cc",
          providerCanonical: "claude",
          providerDisplayName: "Claude",
        },
      }),
    });
    // "cc/b" has no overlay entry: its alias must inherit the canonical known
    // from "cc/a" instead of producing a second provider.
    const collected = await collect(opts, [{ id: "cc/a" }, { id: "cc/b" }]);
    const groups = byId(buildProviderPayloads(collected, opts));
    assert.equal(groups.size, 1, "both rows must share one canonical provider");
    assert.equal(groups.get("omniroute-claude")?.info.name, "OmniRoute - Claude");
    assert.equal(groups.has("omniroute-cc"), false, "no alias provider survives");
  });
});
