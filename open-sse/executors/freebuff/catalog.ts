/**
 * freebuff/catalog.ts - the model catalog (`GET /api/v1/freebuff/models`).
 *
 * The free tier does not accept human model ids such as
 * `deepseek/deepseek-v4-flash` directly: the client fetches the catalog and
 * sends the opaque `handle` (`fbm1.…`) of the selected row as the chat body's
 * `model` and as `x-freebuff-model` on admission. The catalog response also
 * carries the `fetchId` (`fbf1.…`) that must be echoed in
 * `x-freebuff-catalog-fetch` and folded into the device signature.
 *
 * Human ids keep working through `legacyDigests`: the client's `ABH()` hash of
 * `freebuff-legacy-model:<id>` selects the row. Verified against a live
 * catalog: `deepseek/deepseek-v4-flash` -> `1e303ac563a6f9cc` (row
 * `m-096e75164d`), `fbc/deepseek-flash-slow` -> `85e88c27c998a67e` (row
 * `m-61c26317cc`).
 */

export interface FreebuffCatalogRow {
  key: string;
  handle: string;
  displayName: string;
  legacyDigests?: string[];
  contextWindow?: number;
  multimodal?: boolean;
  premium?: boolean;
  access?: "open" | "locked";
  dataUse?: "service" | "training";
  efforts?: string[];
  defaultEffort?: string;
  /** Unix ms after which the row becomes selectable (scheduled releases). */
  opensAt?: number;
  [key: string]: unknown;
}

export interface FreebuffCatalog {
  fetchId: string;
  rows: FreebuffCatalogRow[];
  recommendedKey?: string;
  fallbackKey?: string;
  /** Rows the current tier cannot use (`access: "locked"`). */
  lockedKeys: string[];
  plansUrl?: string;
  issuedAt?: number;
  refreshAt?: number;
}

/** Client `ABH()`: FNV-1a-style digest of `freebuff-legacy-model:<id>`. */
export function freebuffLegacyDigest(modelId: string): string {
  const input = `freebuff-legacy-model:${modelId}`;
  let h1 = 2166136261;
  let h2 = 1523705862;
  for (let i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ code, 16777619) >>> 0;
    h2 = Math.imul(h2 ^ code, 1540483477) >>> 0;
  }
  return h1.toString(16).padStart(8, "0") + h2.toString(16).padStart(8, "0");
}

function asRow(value: unknown): FreebuffCatalogRow | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const raw = value as Record<string, unknown>;
  if (typeof raw.key !== "string" || !raw.key) return null;
  if (typeof raw.handle !== "string" || !raw.handle) return null;
  return {
    ...(raw as FreebuffCatalogRow),
    legacyDigests: Array.isArray(raw.legacyDigests)
      ? raw.legacyDigests.filter((d): d is string => typeof d === "string")
      : [],
    efforts: Array.isArray(raw.efforts)
      ? raw.efforts.filter((e): e is string => typeof e === "string")
      : undefined,
  };
}

export function parseFreebuffCatalog(value: unknown): FreebuffCatalog | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const raw = value as Record<string, unknown>;
  if (typeof raw.fetchId !== "string" || !raw.fetchId) return null;
  const rows = Array.isArray(raw.rows)
    ? raw.rows.map(asRow).filter((row): row is FreebuffCatalogRow => row !== null)
    : [];
  if (rows.length === 0) return null;
  return {
    fetchId: raw.fetchId,
    rows,
    lockedKeys: rows.filter((row) => row.access === "locked").map((row) => row.key),
    recommendedKey: typeof raw.recommendedKey === "string" ? raw.recommendedKey : undefined,
    fallbackKey: typeof raw.fallbackKey === "string" ? raw.fallbackKey : undefined,
    plansUrl: typeof raw.plansUrl === "string" ? raw.plansUrl : undefined,
    issuedAt: typeof raw.issuedAt === "number" ? raw.issuedAt : undefined,
    refreshAt: typeof raw.refreshAt === "number" ? raw.refreshAt : undefined,
  };
}

/** Rows whose `opensAt` has already passed (the client's `AN()`). */
export function selectableRows(catalog: FreebuffCatalog, now = Date.now()): FreebuffCatalogRow[] {
  return catalog.rows.filter((row) => row.opensAt === undefined || row.opensAt <= now);
}

/**
 * Resolve a requested model id to the catalog handle.
 *
 * Accepts a ready handle (`fbm1.…`), a catalog key (`m-…`) or a human model id
 * (matched through `legacyDigests`).
 */
export function resolveCatalogHandle(
  catalog: FreebuffCatalog,
  requestedModel: string,
  now = Date.now()
): string | null {
  const model = requestedModel.trim();
  if (!model) return null;
  if (model.startsWith("fbm1.")) return model;

  const rows = selectableRows(catalog, now);
  const byKey = rows.find((row) => row.key === model);
  if (byKey) return byKey.handle;

  const digest = freebuffLegacyDigest(model);
  const byDigest = rows.find((row) => (row.legacyDigests ?? []).includes(digest));
  if (byDigest) return byDigest.handle;

  return null;
}

/** Row a handle belongs to (used to read context/efforts for a request). */
export function rowForHandle(
  catalog: FreebuffCatalog,
  handle: string
): FreebuffCatalogRow | undefined {
  return catalog.rows.find((row) => row.handle === handle);
}

/** Handle for a catalog key (the admission answer reports the admitted key). */
export function handleForKey(
  catalog: FreebuffCatalog,
  key: string | null | undefined
): string | null {
  if (!key) return null;
  return catalog.rows.find((row) => row.key === key)?.handle ?? null;
}

/**
 * Every human model id the catalog advertises, resolved through the legacy
 * digests. Used to build the provider's model list from live data instead of a
 * hand-maintained table that silently rots when upstream rotates its catalog.
 */
export function catalogModelIds(
  catalog: FreebuffCatalog
): Array<{ id: string; row: FreebuffCatalogRow }> {
  const known = Object.keys(FREEBUFF_LEGACY_MODEL_IDS);
  const out: Array<{ id: string; row: FreebuffCatalogRow }> = [];
  for (const row of catalog.rows) {
    const digests = new Set(row.legacyDigests ?? []);
    for (const id of known) {
      if (digests.has(freebuffLegacyDigest(id))) out.push({ id, row });
    }
  }
  return out;
}

/**
 * Human ids the upstream has been observed to advertise, with the display name
 * to show before a live catalog arrives. Keys are the ids; the values are only
 * used as a fallback label.
 */
export const FREEBUFF_LEGACY_MODEL_IDS: Record<string, string> = {
  "deepseek/deepseek-v4-flash": "DeepSeek V4.1 Flash Fast",
  "fbc/deepseek-flash": "DeepSeek V4.1 Flash",
  "fbc/deepseek-flash-slow": "DeepSeek V4.1 Flash Slow",
  "openai/gpt-6-luna": "GPT-6 Luna",
  "upstage/solar-mini4": "Solar Mini 4",
  "upstage/solar-pro4": "Solar Pro 4",
  "meta/muse-spark-1.3-contributor": "Muse Spark 1.3",
  "openai/gpt-6.1-terra": "GPT-6.1 Terra",
  "fbc/glyph-cluster": "Glyph Cluster",
  "fbc/nemotron-3.5-lightning": "Nemotron 3.5 Lightning",
  "fbc/beam-free": "Beam 1.0",
  "fbc/claude-haiku-5.5-100k": "Claude Haiku 5.5",
  "fbc/muse-ember": "Muse Ember",
};

/** Short-lived cache; a 409 `freebuff_catalog_stale` invalidates it. */
export class FreebuffCatalogCache {
  private catalog: FreebuffCatalog | null = null;
  private expiresAt = 0;
  private loading: Promise<FreebuffCatalog | null> | null = null;

  constructor(
    private readonly ttlMs = 5 * 60 * 1000,
    private readonly now: () => number = Date.now
  ) {}

  invalidate(): void {
    this.catalog = null;
    this.expiresAt = 0;
  }

  peek(): FreebuffCatalog | null {
    if (!this.catalog || this.expiresAt <= this.now()) return null;
    // The catalog carries its own refresh deadline; honour it.
    if (this.catalog.refreshAt && this.catalog.refreshAt <= this.now()) return null;
    return this.catalog;
  }

  async get(load: () => Promise<FreebuffCatalog | null>): Promise<FreebuffCatalog | null> {
    const cached = this.peek();
    if (cached) return cached;
    this.loading ??= (async () => {
      const catalog = await load();
      if (catalog) {
        this.catalog = catalog;
        const ttl = catalog.refreshAt
          ? Math.min(this.ttlMs, catalog.refreshAt - this.now())
          : this.ttlMs;
        this.expiresAt = this.now() + Math.max(0, ttl);
      }
      return catalog;
    })().finally(() => {
      this.loading = null;
    });
    return this.loading;
  }
}
