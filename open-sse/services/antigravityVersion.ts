const ANTIGRAVITY_IDE_RELEASE_FEED_URL =
  "https://antigravity-auto-updater-974169037036.us-central1.run.app/releases";
const ANTIGRAVITY_CLI_RELEASE_URL =
  "https://api.github.com/repos/google-antigravity/antigravity-cli/releases/latest";

export const ANTIGRAVITY_VERSION_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
export const ANTIGRAVITY_VERSION_FETCH_TIMEOUT_MS = 5_000;
// A failed lookup is not cached as a version, but it is remembered for a short
// window so a dead release source costs one timeout per window instead of one
// timeout on every request.
export const ANTIGRAVITY_VERSION_RETRY_TTL_MS = 60_000;
// Version floor for the IDE fingerprint. Cloud Code's fetchAvailableModels only returns quota
// buckets for newer models (e.g. Gemini 3.7 Flash) to IDE clients >= 2.5.5, and the public
// updater feed can lag behind that, so the resolver never reports anything older than this.
export const ANTIGRAVITY_IDE_FALLBACK_VERSION = "2.5.5";
// What we claim when the release lookup fails. It is sent as the client version,
// so it has to stay near the live release; refresh it together with the feed
// rather than letting it age into an obviously fake identity.
export const ANTIGRAVITY_CLI_FALLBACK_VERSION = "1.5.8";

const ANTIGRAVITY_IDE_VERSION_ENV = "ANTIGRAVITY_IDE_VERSION";
const ANTIGRAVITY_CLI_VERSION_ENV = "ANTIGRAVITY_CLI_VERSION";

type VersionCache = {
  fetchedAt: number;
  version: string;
};

type ProductVersionState = {
  cache: VersionCache | null;
  inFlight: Promise<string> | null;
  // Timestamp of the last failed lookup, and the timestamp of the warning that
  // was emitted for the current outage (reset on the next success).
  failedAt: number | null;
  warnedAt: number | null;
};

type FetchLike = typeof fetch;
type VersionParser = (payload: unknown) => string | null;

const ideState: ProductVersionState = {
  cache: null,
  inFlight: null,
  failedAt: null,
  warnedAt: null,
};
const cliState: ProductVersionState = {
  cache: null,
  inFlight: null,
  failedAt: null,
  warnedAt: null,
};

function normalizeVersion(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().replace(/^v/i, "");
  const match = trimmed.match(/^(\d+\.\d+\.\d+)\b/);
  return match ? match[1] : null;
}

function readVersionOverride(envName: string): string | null {
  return normalizeVersion(process.env[envName]);
}

function compareSemver(a: string, b: string): number {
  const aParts = a.split(".").map((part) => Number.parseInt(part, 10) || 0);
  const bParts = b.split(".").map((part) => Number.parseInt(part, 10) || 0);
  for (let i = 0; i < 3; i += 1) {
    if (aParts[i] !== bParts[i]) return aParts[i] - bParts[i];
  }
  return 0;
}

function pickNewestVersion(...versions: unknown[]): string | null {
  return versions
    .map((version) => normalizeVersion(version))
    .filter((version): version is string => !!version)
    .reduce<string | null>(
      (best, version) => (!best || compareSemver(version, best) > 0 ? version : best),
      null
    );
}

async function fetchJsonWithTimeout(fetchImpl: FetchLike, url: string): Promise<unknown> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ANTIGRAVITY_VERSION_FETCH_TIMEOUT_MS);

  try {
    const response = await fetchImpl(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "OmniRoute-AntigravityVersion/1.0",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Version source ${url} returned ${response.status}`);
    }

    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

function parseIdeReleaseFeed(payload: unknown): string | null {
  if (!Array.isArray(payload)) return null;
  return pickNewestVersion(...payload.map((entry) => (entry as { version?: unknown })?.version));
}

function parseCliRelease(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const release = payload as { name?: unknown; tag_name?: unknown };
  return normalizeVersion(release.tag_name ?? release.name);
}

async function resolveProductVersion(
  state: ProductVersionState,
  product: string,
  envName: string,
  fallbackVersion: string,
  sourceUrl: string,
  parsePayload: VersionParser,
  fetchImpl: FetchLike
): Promise<string> {
  const override = readVersionOverride(envName);
  if (override) return override;

  const now = Date.now();
  if (state.cache && now - state.cache.fetchedAt < ANTIGRAVITY_VERSION_CACHE_TTL_MS) {
    return pickNewestVersion(state.cache.version, fallbackVersion) ?? fallbackVersion;
  }

  if (state.inFlight) {
    return state.inFlight;
  }

  if (state.failedAt !== null && now - state.failedAt < ANTIGRAVITY_VERSION_RETRY_TTL_MS) {
    return pickNewestVersion(state.cache?.version, fallbackVersion) ?? fallbackVersion;
  }

  state.inFlight = (async () => {
    let resolved: string | null = null;
    let failure: unknown = null;
    try {
      resolved = parsePayload(await fetchJsonWithTimeout(fetchImpl, sourceUrl));
    } catch (error) {
      failure = error;
      resolved = null;
    }

    const version =
      pickNewestVersion(resolved, state.cache?.version, fallbackVersion) ?? fallbackVersion;

    if (resolved) {
      state.cache = {
        fetchedAt: Date.now(),
        version,
      };
      state.failedAt = null;
      state.warnedAt = null;
      return version;
    }

    state.failedAt = Date.now();
    if (state.warnedAt === null) {
      state.warnedAt = state.failedAt;
      const detail = failure instanceof Error ? failure.message : String(failure ?? "unknown");
      console.warn(
        `[antigravity-version] ${product} release lookup failed (${detail}); ` +
          `reporting ${version} until the source recovers`
      );
    }
    return version;
  })();

  try {
    return await state.inFlight;
  } finally {
    state.inFlight = null;
  }
}

function seedVersionCache(state: ProductVersionState, version: string, fetchedAt: number): void {
  const normalized = normalizeVersion(version);
  if (!normalized) {
    throw new TypeError(`Invalid Antigravity version: ${version}`);
  }
  state.cache = { fetchedAt, version: normalized };
}

export function resolveAntigravityIdeVersion(fetchImpl: FetchLike = fetch): Promise<string> {
  return resolveProductVersion(
    ideState,
    "ide",
    ANTIGRAVITY_IDE_VERSION_ENV,
    ANTIGRAVITY_IDE_FALLBACK_VERSION,
    ANTIGRAVITY_IDE_RELEASE_FEED_URL,
    parseIdeReleaseFeed,
    fetchImpl
  );
}

export function resolveAntigravityCliVersion(fetchImpl: FetchLike = fetch): Promise<string> {
  return resolveProductVersion(
    cliState,
    "cli",
    ANTIGRAVITY_CLI_VERSION_ENV,
    ANTIGRAVITY_CLI_FALLBACK_VERSION,
    ANTIGRAVITY_CLI_RELEASE_URL,
    parseCliRelease,
    fetchImpl
  );
}

export function getCachedAntigravityIdeVersion(): string {
  return (
    readVersionOverride(ANTIGRAVITY_IDE_VERSION_ENV) ??
    ideState.cache?.version ??
    ANTIGRAVITY_IDE_FALLBACK_VERSION
  );
}

export function getCachedAntigravityCliVersion(): string {
  return (
    readVersionOverride(ANTIGRAVITY_CLI_VERSION_ENV) ??
    cliState.cache?.version ??
    ANTIGRAVITY_CLI_FALLBACK_VERSION
  );
}

export function seedAntigravityIdeVersionCache(version: string, fetchedAt = Date.now()): void {
  seedVersionCache(ideState, version, fetchedAt);
}

export function seedAntigravityCliVersionCache(version: string, fetchedAt = Date.now()): void {
  seedVersionCache(cliState, version, fetchedAt);
}

export function clearAntigravityVersionCaches(): void {
  ideState.cache = null;
  ideState.inFlight = null;
  ideState.failedAt = null;
  ideState.warnedAt = null;
  cliState.cache = null;
  cliState.inFlight = null;
  cliState.failedAt = null;
  cliState.warnedAt = null;
}
