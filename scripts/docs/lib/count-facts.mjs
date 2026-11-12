// Pure count definitions shared by the updater, renderers and blocking checker.
// No application, database, process environment or network imports belong here.
export const PROVIDER_COLLECTION_NAMES = Object.freeze([
  "FREE_PROVIDERS",
  "NOAUTH_PROVIDERS",
  "OAUTH_PROVIDERS",
  "WEB_COOKIE_PROVIDERS",
  "APIKEY_PROVIDERS",
  "LOCAL_PROVIDERS",
  "SEARCH_PROVIDERS",
  "AUDIO_ONLY_PROVIDERS",
  "UPSTREAM_PROXY_PROVIDERS",
  "CLOUD_AGENT_PROVIDERS",
  "SYSTEM_PROVIDERS",
]);

const FOREVER = new Set([
  "recurring-monthly",
  "recurring-daily",
  "recurring-uncapped",
  "recurring-credit",
  "keyless",
]);
const FREE_TYPES = new Set([...FOREVER, "one-time-initial", "discontinued"]);

export function measureCatalogCounts(collections, totals) {
  if (!totals || !Array.isArray(totals.perModel))
    throw new Error("COUNT_FACTS_CATALOG_UNAVAILABLE");
  const providers = new Set();
  const marked = new Set();
  for (const name of PROVIDER_COLLECTION_NAMES) {
    const collection = collections[name];
    if (!collection || typeof collection !== "object")
      throw new Error(`COUNT_FACTS_COLLECTION_MISSING:${name}`);
    for (const provider of Object.values(collection)) {
      if (!provider || typeof provider.id !== "string" || !provider.id)
        throw new Error(`COUNT_FACTS_INVALID_PROVIDER:${name}`);
      providers.add(provider.id);
      if (provider.hasFree === true) marked.add(provider.id);
    }
  }
  if (!providers.size) throw new Error("COUNT_FACTS_NO_PROVIDERS");
  for (const row of totals.perModel) {
    if (!row || typeof row.provider !== "string" || !FREE_TYPES.has(row.freeType)) {
      throw new Error("COUNT_FACTS_UNKNOWN_FREE_REGIME");
    }
  }
  const forever = new Set(
    totals.perModel
      .filter((row) => FOREVER.has(row.freeType) && !row.eligibilityGate)
      .map((row) => row.provider)
  );
  const finite = (value, key) => {
    if (!Number.isFinite(value) || value < 0) throw new Error(`COUNT_FACTS_INVALID_TOTAL:${key}`);
    return value;
  };
  return Object.freeze({
    providers: providers.size,
    catalogMarkedFree: marked.size,
    freeForever: forever.size,
    catalogEntries: totals.perModel.length,
    freePools: finite(totals.poolCount, "freePools"),
    freeSteady: finite(totals.steadyRecurringTokens, "steady"),
    freeFirst: finite(totals.firstMonthRealisticTokens, "first"),
    freeGated: finite(totals.gatedRecurringTokens, "gated"),
    steadyBillions: (finite(totals.steadyRecurringTokens, "steady") / 1e9).toFixed(2),
    firstBillions: (finite(totals.firstMonthRealisticTokens, "first") / 1e9).toFixed(2),
    gatedMillions: String(Number((finite(totals.gatedRecurringTokens, "gated") / 1e6).toFixed(2))),
  });
}

export function parseRoutingStrategyCount(source) {
  const declaration = source.match(/ROUTING_STRATEGY_VALUES\s*=\s*\[([^\]]*)\]/);
  if (!declaration) throw new Error("COUNT_FACTS_STRATEGIES_UNAVAILABLE");
  const body = declaration[1].replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, "");
  if (!/^\s*(?:"[^"\n\\]+"\s*,\s*)*"[^"\n\\]+"\s*,?\s*$/.test(body))
    throw new Error("COUNT_FACTS_STRATEGIES_SHAPE");
  const values = [...body.matchAll(/"([^"\n]+)"/g)].map((match) => match[1]);
  if (!values.length || new Set(values).size !== values.length)
    throw new Error("COUNT_FACTS_STRATEGIES_INVALID");
  return values.length;
}

// Chat catalog identity follows generateModels(): nonempty entry.models arrays,
// alias || id namespaces, and the first nonempty entry for a namespace wins.
// imageModels, provider images registries and discovered account models are not
// inputs to these public claims. Repeated rows do not add another pair or raw ID.
export function measureChatModelCounts(inventory) {
  if (!Array.isArray(inventory) || !inventory.length)
    throw new Error("COUNT_FACTS_CHAT_INVENTORY_UNAVAILABLE");
  const namespaces = new Map();
  for (const row of inventory) {
    if (
      !row ||
      typeof row.id !== "string" ||
      !row.id ||
      row.id.includes("\0") ||
      !Array.isArray(row.modelIds) ||
      row.modelIds.some((id) => typeof id !== "string" || !id || id.includes("\0"))
    )
      throw new Error("COUNT_FACTS_CHAT_ROW_INVALID");
    if (!row.modelIds.length) continue;
    const namespace = row.alias || row.id;
    if (
      typeof namespace !== "string" ||
      namespace.includes("\0") ||
      Object.hasOwn(Object.prototype, namespace)
    )
      throw new Error("COUNT_FACTS_CHAT_NAMESPACE_INVALID");
    if (!namespaces.has(namespace)) namespaces.set(namespace, row.modelIds);
  }
  if (!namespaces.size) throw new Error("COUNT_FACTS_CHAT_CATALOG_EMPTY");
  const pairs = new Set();
  const ids = new Set();
  for (const [namespace, models] of namespaces) {
    for (const id of models) {
      pairs.add(`${namespace}\0${id}`);
      ids.add(id);
    }
  }
  return Object.freeze({
    chatNamespaces: namespaces.size,
    distinctProviderModelPairs: pairs.size,
    uniqueRawModelIds: ids.size,
  });
}
