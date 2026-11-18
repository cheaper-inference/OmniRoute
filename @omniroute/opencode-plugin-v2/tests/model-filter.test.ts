import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";
import {
  branchOf,
  compileModelListFilter,
  matchesBranch,
  matchesModelFilter,
  matchesSuffix,
  parseBranchClaim,
} from "../src/model-filter.js";
import { collectCatalog, type ResolvedOptions } from "../src/catalog.js";
import { providerOf } from "../src/provider-filter.js";
import { parsePluginOptions, toResolvedOptions } from "../src/options.js";
import { defaultOmniRouteModelsFetcher } from "../src/shared/models-map.js";
import type { OmniRouteRawModelEntry } from "../src/shared/index.js";
import type { Logger } from "../src/shared/logger.js";

const servers: http.Server[] = [];
afterEach(async () => {
  while (servers.length > 0) {
    const server = servers.pop();
    if (server) await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

async function entriesThroughReader(
  data: Array<Record<string, unknown>>
): Promise<OmniRouteRawModelEntry[]> {
  const body = { object: "list", data };
  const server = http.createServer((_req, res) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(body));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  servers.push(server);
  const port = (server.address() as AddressInfo).port;
  return defaultOmniRouteModelsFetcher(`http://127.0.0.1:${port}`, "k", 2000);
}

function silentLogger(warns: string[]): Logger {
  return {
    error: () => {},
    warn: (msg: string) => {
      warns.push(String(msg));
    },
    info: () => {},
    debug: () => {},
    always: () => {},
    child: () => silentLogger(warns),
  } as unknown as Logger;
}

function resolvedWith(raw: Record<string, unknown>, warns: string[]): ResolvedOptions {
  const parsed = parsePluginOptions({
    baseURL: "https://gw.example.com",
    toolsOnly: false,
    ...raw,
  });
  const resolved = toResolvedOptions(parsed);
  resolved.logger = silentLogger(warns);
  resolved.modelCacheTtlMs = 300000;
  resolved.showcasePerOwner = 50;
  resolved.freshPerOwner = 50;
  return resolved;
}

function enrichmentOf(...pairs: Array<[string, string]>) {
  return new Map(
    pairs.map(([alias, canonical]) => [
      `${alias}/model-x`,
      { providerAlias: alias, providerCanonical: canonical },
    ])
  );
}

const FIXED_NOW = Date.parse("2026-10-03T12:00:00.000Z");

async function withFixedNow<T>(fn: () => Promise<T>): Promise<T> {
  const realNow = Date.now;
  Date.now = () => FIXED_NOW;
  try {
    return await fn();
  } finally {
    Date.now = realNow;
  }
}

describe("branch claim filter unit", () => {
  it("keeps an exact id and drops other ids", () => {
    const filter = compileModelListFilter(["cc/keep-me"]);
    assert.ok(filter);
    assert.ok(filter.exact.has("cc/keep-me"));
    assert.equal(matchesModelFilter("cc/keep-me", filter), true);
    assert.equal(matchesModelFilter("cc/other", filter), false);
  });

  it("matches a suffix after the first slash, including bare ids", () => {
    const filter = compileModelListFilter(["keep-me"]);
    assert.ok(filter);
    assert.equal(matchesModelFilter("cc/keep-me", filter), true);
    assert.equal(matchesModelFilter("keep-me", filter), true);
    assert.equal(matchesModelFilter("cc/keep-me-x", filter), false);
    assert.equal(matchesSuffix("cc/keep-me", filter.suffixes), true);
  });

  it("matches a branch before the first slash, including nested ids", () => {
    const filter = compileModelListFilter(["opencode-go/*"]);
    assert.ok(filter);
    assert.ok(filter.branches.has("opencode-go"));
    assert.equal(matchesModelFilter("opencode-go/m-1", filter), true);
    assert.equal(matchesModelFilter("opencode-go/deep/m-2", filter), true);
    assert.equal(matchesModelFilter("no-think/opencode-go/m-3", filter), false);
    assert.equal(matchesBranch("opencode-go/m-1", filter.branches), true);
  });

  it("never compiles the full-catalog sentinel into a branch", () => {
    const filter = compileModelListFilter(["*"]);
    assert.ok(filter);
    assert.equal(filter.branches.size, 0);
    assert.equal(matchesModelFilter("anything/here", filter!), false);
  });

  it("classifies a branch claim from its prefix shape", () => {
    assert.deepEqual(parseBranchClaim("opencode-go/*"), {
      claimed: true,
      branch: "opencode-go",
    });
  });

  it("leaves out-of-contract entries in their current shape", () => {
    for (const entry of ["/*", "*/*", "a/*/b"]) {
      assert.deepEqual(parseBranchClaim(entry), { claimed: false, branch: "" });
    }
    const filter = compileModelListFilter(["/*", "*/*", "a/*/b"]);
    assert.ok(filter);
    assert.equal(filter.branches.size, 0);
    assert.ok(filter.exact.has("/*"));
  });

  it("reads the branch as the segment before the first slash", () => {
    assert.equal(branchOf("a/b/c"), "a");
    assert.equal(branchOf("plain"), undefined);
    assert.equal(branchOf("/x"), undefined);
  });

  it("resolves the provider prefix through the shared branch rule", () => {
    assert.equal(providerOf("CC/model"), "cc");
    assert.equal(providerOf(" /x"), undefined);
    assert.equal(providerOf("a/b/c"), branchOf("a/b/c")?.toLowerCase());
  });
});

describe("branch claim filter publish", () => {
  it("publishes a branch and drops other branches", async () => {
    const warns: string[] = [];
    const raw = await entriesThroughReader([
      { id: "aaa/m-1" },
      { id: "aaa/m-2" },
      { id: "bbb/m-3" },
    ]);
    const collected = await withFixedNow(() =>
      collectCatalog(resolvedWith({ visibleModels: ["aaa/*"] }, warns), {
        fetcher: async () => raw,
        combos: async () => [],
        providers: async () => [],
        enrichment: async () => new Map(),
      })
    );
    assert.equal(collected.counts.models, 2);
    assert.ok(collected.entries.has("omniroute/aaa/m-1"));
    assert.ok(collected.entries.has("omniroute/aaa/m-2"));
    assert.ok(!collected.entries.has("omniroute/bbb/m-3"));
  });

  it("hides a branch while keeping the rest", async () => {
    const warns: string[] = [];
    const raw = await entriesThroughReader([{ id: "aaa/m-1" }, { id: "no-think/m-2" }]);
    const collected = await withFixedNow(() =>
      collectCatalog(resolvedWith({ hiddenModels: ["no-think/*"] }, warns), {
        fetcher: async () => raw,
        combos: async () => [],
        providers: async () => [],
        enrichment: async () => new Map(),
      })
    );
    assert.ok(collected.entries.has("omniroute/aaa/m-1"));
    assert.ok(![...collected.entries.keys()].some((k) => k.includes("no-think/m-2")));
  });

  it("keeps the full catalog under the sentinel with a narrow showcase", async () => {
    const warns: string[] = [];
    const rows = [{ id: "aaa/m-1" }, { id: "aaa/m-2" }, { id: "bbb/m-3" }];
    const raw = await entriesThroughReader(rows);
    const collected = await withFixedNow(() =>
      collectCatalog(resolvedWith({ visibleModels: ["*"], showcasePerOwner: 3 }, warns), {
        fetcher: async () => raw,
        combos: async () => [],
        providers: async () => [],
        enrichment: async () => new Map(),
      })
    );
    assert.equal(collected.entries.size, 3);
  });

  it("filters combos by member branch, keeping a combo with a matching member", async () => {
    const warns: string[] = [];
    const raw = await entriesThroughReader([{ id: "aaa/m-1" }, { id: "bbb/m-2" }]);
    const collected = await withFixedNow(() =>
      collectCatalog(resolvedWith({ visibleModels: ["aaa/*"] }, warns), {
        fetcher: async () => raw,
        combos: async () => [
          {
            id: "kept",
            name: "Kept",
            models: [{ kind: "model", model: "aaa/m-1" }],
          },
          {
            id: "dropped",
            name: "Dropped",
            models: [{ kind: "model", model: "bbb/m-2" }],
          },
        ],
        providers: async () => [],
        enrichment: async () => new Map(),
      })
    );
    assert.ok([...collected.entries.keys()].some((k) => k.endsWith("/Kept")));
    assert.ok(![...collected.entries.keys()].some((k) => k.endsWith("/Dropped")));
  });

  it("hides every combo when combos are off, keeping models", async () => {
    const warns: string[] = [];
    const raw = await entriesThroughReader([
      { id: "aaa/m-1" },
      { id: "auto/fast", owned_by: "combo" },
    ]);
    const collected = await withFixedNow(() =>
      collectCatalog(resolvedWith({ combos: false }, warns), {
        fetcher: async () => raw,
        combos: async () => [
          { id: "solo-combo", name: "Solo", models: [{ kind: "model", model: "aaa/m-1" }] },
        ],
        providers: async () => [],
        enrichment: async () => new Map(),
      })
    );
    assert.equal(collected.counts.combos, 0);
    assert.ok(collected.entries.has("omniroute/aaa/m-1"));
    assert.ok(![...collected.entries.keys()].some((k) => k.includes("auto/fast")));
    assert.ok(![...collected.entries.keys()].some((k) => k.endsWith("/Solo")));
  });

  it("keeps combos when the combos option is absent", async () => {
    const warns: string[] = [];
    const raw = await entriesThroughReader([{ id: "aaa/m-1" }]);
    const collected = await withFixedNow(() =>
      collectCatalog(resolvedWith({}, warns), {
        fetcher: async () => raw,
        combos: async () => [
          { id: "solo-combo", name: "Solo", models: [{ kind: "model", model: "aaa/m-1" }] },
        ],
        providers: async () => [],
        enrichment: async () => new Map(),
      })
    );
    assert.equal(collected.counts.combos, 1);
  });

  it("restricts catalog to a claimed branch in exhaustive mode", async () => {
    const warns: string[] = [];
    const collected = await withFixedNow(() =>
      collectCatalog(resolvedWith({ providersAllow: ["opencode-go/*"] }, warns), {
        models: async () => [{ id: "opencode-go/m-1" }, { id: "auto/fast" }, { id: "free-fast" }],
        combos: async () => [],
        providers: async () => [],
        enrichment: async () => enrichmentOf(["opencode-go", "opencode-go"], ["auto", "auto"]),
      })
    );
    assert.ok(collected.entries.has("omniroute/opencode-go/m-1"));
    assert.ok(![...collected.entries.keys()].some((k) => k.includes("auto/fast")));
    assert.ok(![...collected.entries.keys()].some((k) => k.includes("free-fast")));
  });

  it("keeps the current path for a flat allowlist without a branch claim", async () => {
    const warns: string[] = [];
    const collected = await withFixedNow(() =>
      collectCatalog(resolvedWith({ providersAllow: ["opencode-go"] }, warns), {
        models: async () => [{ id: "opencode-go/m-1" }, { id: "mystery/m-2" }],
        combos: async () => [],
        providers: async () => [],
        enrichment: async () => enrichmentOf(["opencode-go", "opencode-go"]),
      })
    );
    assert.ok(collected.entries.has("omniroute/opencode-go/m-1"));
    assert.ok(collected.entries.has("omniroute/mystery/m-2"));
  });

  it("publishes a claimed branch plus a flat provider prefix together", async () => {
    const warns: string[] = [];
    const collected = await withFixedNow(() =>
      collectCatalog(resolvedWith({ providersAllow: ["opencode-go/*", "nvidia"] }, warns), {
        models: async () => [
          { id: "opencode-go/m-1" },
          { id: "nvidia/m-2" },
          { id: "auto/fast" },
          { id: "free-fast" },
        ],
        combos: async () => [],
        providers: async () => [],
        enrichment: async () =>
          enrichmentOf(["opencode-go", "opencode-go"], ["nvidia", "nvidia"], ["auto", "auto"]),
      })
    );
    assert.ok(collected.entries.has("omniroute/opencode-go/m-1"));
    assert.ok(collected.entries.has("omniroute/nvidia/m-2"));
    assert.ok(![...collected.entries.keys()].some((k) => k.includes("auto/fast")));
    assert.ok(![...collected.entries.keys()].some((k) => k.includes("free-fast")));
  });

  it("emits no vocabulary warning in exhaustive mode and keys matched-nothing by claim", async () => {
    const warnsExhaustive: string[] = [];
    await withFixedNow(() =>
      collectCatalog(resolvedWith({ providersAllow: ["opencode-go/*"] }, warnsExhaustive), {
        models: async () => [{ id: "opencode-go/m-1" }],
        combos: async () => [],
        providers: async () => [],
        enrichment: async () => new Map(),
      })
    );
    assert.equal(warnsExhaustive.filter((w) => w.includes("unknown provider")).length, 0);
    assert.equal(warnsExhaustive.filter((w) => w.includes("no provider vocabulary")).length, 0);

    const warnsFlat: string[] = [];
    await withFixedNow(() =>
      collectCatalog(resolvedWith({ providersAllow: ["alpha"] }, warnsFlat), {
        models: async () => [{ id: "cc/a" }],
        combos: async () => [],
        providers: async () => [],
        enrichment: async () => enrichmentOf(["cc", "claude"], ["alpha", "alpha"]),
      })
    );
    const warnsClaim: string[] = [];
    await withFixedNow(() =>
      collectCatalog(resolvedWith({ providersAllow: ["nope/*"] }, warnsClaim), {
        models: async () => [{ id: "cc/a" }],
        combos: async () => [],
        providers: async () => [],
        enrichment: async () => enrichmentOf(["cc", "claude"]),
      })
    );
    const flatKey = warnsFlat.find((w) => w.includes("matched nothing"));
    const claimKey = warnsClaim.find((w) => w.includes("matched nothing"));
    assert.ok(flatKey);
    assert.ok(claimKey);
    assert.notEqual(flatKey, claimKey);
  });

  it("pins a branch past the default view but keeps capability filters", async () => {
    const stale: Array<Record<string, unknown>> = [];
    for (let i = 0; i < 10; i++) {
      stale.push({ id: `aaa/filler-${i}`, owned_by: "solo", context_length: 100000 });
    }
    stale.push({ id: "aaa/target", owned_by: "solo", context_length: 1000 });
    stale.push({ id: "aaa/old", owned_by: "solo", context_length: 1000, status: "deprecated" });
    const raw = await entriesThroughReader(stale);
    const warns: string[] = [];
    const collected = await withFixedNow(() =>
      collectCatalog(resolvedWith({ visibleModels: ["aaa/*"] }, warns), {
        fetcher: async () => raw,
        combos: async () => [],
        providers: async () => [],
        enrichment: async () => new Map(),
      })
    );
    assert.ok(collected.entries.has("omniroute/aaa/target"));
    assert.ok(collected.entries.has("omniroute/aaa/old"));

    const warnsFree: string[] = [];
    const rawFree = await entriesThroughReader([{ id: "aaa/paid" }, { id: "aaa/free" }]);
    const filtered = await withFixedNow(() =>
      collectCatalog(resolvedWith({ visibleModels: ["aaa/*"], freeOnly: true }, warnsFree), {
        fetcher: async () => rawFree,
        combos: async () => [],
        providers: async () => [],
        enrichment: async () => new Map([["aaa/free", { freeType: "recurring-monthly" as const }]]),
      })
    );
    assert.ok(filtered.entries.has("omniroute/aaa/free"));
    assert.ok(!filtered.entries.has("omniroute/aaa/paid"));
  });
});
