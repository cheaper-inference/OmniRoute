const ANTIGRAVITY_IDE_DOWNLOAD_URL = "https://antigravity.google/download";
const ANTIGRAVITY_IDE_RELEASE_FEED_URL =
  "https://antigravity-auto-updater-974169037036.us-central1.run.app/releases";
const ANTIGRAVITY_CLI_RELEASE_URL =
  "https://api.github.com/repos/google-antigravity/antigravity-cli/releases/latest";

export const ANTIGRAVITY_VERSION_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
export const ANTIGRAVITY_VERSION_FETCH_TIMEOUT_MS = 5_000;
const FAILURE_RETRY_MS = 60_000;
// Verified stable floors from the official IDE download page and CLI GitHub release.
// The legacy IDE updater feed can lag behind model-gating releases; the current
// download page is authoritative and the old feed is only a fallback.
export const ANTIGRAVITY_IDE_FALLBACK_VERSION = "2.7.0";
export const ANTIGRAVITY_CLI_FALLBACK_VERSION = "1.5.9";

type VersionCache = {
  fetchedAt: number;
  version: string;
};

type ProductVersionState = {
  cache: VersionCache | null;
  inFlight: Promise<string> | null;
  retryAt: number;
};

type FetchLike = typeof fetch;
type VersionParser = (payload: unknown) => string | null;

const ideState: ProductVersionState = { cache: null, inFlight: null, retryAt: 0 };
const cliState: ProductVersionState = { cache: null, inFlight: null, retryAt: 0 };

function normalizeVersion(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().replace(/^v/i, "");
  const match = trimmed.match(/^(\d+\.\d+\.\d+)\b/);
  return match ? match[1] : null;
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

async function fetchVersionPayloadWithTimeout(fetchImpl: FetchLike, url: string): Promise<unknown> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ANTIGRAVITY_VERSION_FETCH_TIMEOUT_MS);

  try {
    const response = await fetchImpl(url, {
      headers: {
        Accept: url === ANTIGRAVITY_IDE_DOWNLOAD_URL ? "text/html" : "application/json",
        "User-Agent": "OmniRoute-AntigravityVersion/1.0",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Version source ${url} returned ${response.status}`);
    }

    // Keep the deadline active while reading the body, with a finite size bound.
    const reader = response.body?.getReader();
    if (!reader) throw new Error("Empty version response");
    const cancel = () => {
      void reader.cancel().catch(() => {});
    };
    controller.signal.addEventListener("abort", cancel, { once: true });
    const decoder = new TextDecoder();
    let bytes = 0;
    let text = "";
    try {
      controller.signal.throwIfAborted();
      while (true) {
        const part = await reader.read();
        controller.signal.throwIfAborted();
        if (part.done) break;
        bytes += part.value.byteLength;
        if (bytes > 512 * 1024) {
          cancel();
          throw new Error("Version response too large");
        }
        text += decoder.decode(part.value, { stream: true });
      }
      text += decoder.decode();
      return url === ANTIGRAVITY_IDE_DOWNLOAD_URL ? text : JSON.parse(text);
    } finally {
      controller.signal.removeEventListener("abort", cancel);
      reader.releaseLock();
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

function parseIdeReleaseFeed(payload: unknown): string | null {
  if (typeof payload === "string") {
    // The page also advertises App, CLI, extension and SDK releases. Only this
    // explicitly named IDE marker identifies the version used on the IDE wire.
    const match = payload.match(
      /<[^>]+\bdata-ide-latest-version(?:\s*=\s*(?:"[^"]*"|'[^']*'))?\s*[^>]*>\s*v?(\d+\.\d+\.\d+)\s*<\//i
    );
    return match ? normalizeVersion(match[1]) : null;
  }
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
  fallbackVersion: string,
  sourceUrl: string | readonly string[],
  parsePayload: VersionParser,
  fetchImpl: FetchLike
): Promise<string> {
  const now = Date.now();
  if (state.cache && now - state.cache.fetchedAt < ANTIGRAVITY_VERSION_CACHE_TTL_MS) {
    return pickNewestVersion(state.cache.version, fallbackVersion) ?? fallbackVersion;
  }

  if (now < state.retryAt) {
    return pickNewestVersion(state.cache?.version, fallbackVersion) ?? fallbackVersion;
  }

  if (state.inFlight) {
    return state.inFlight;
  }

  state.inFlight = (async () => {
    let resolved: string | null = null;
    for (const url of typeof sourceUrl === "string" ? [sourceUrl] : sourceUrl) {
      try {
        resolved = parsePayload(await fetchVersionPayloadWithTimeout(fetchImpl, url));
      } catch {
        resolved = null;
      }
      if (resolved) break;
    }

    const version =
      pickNewestVersion(resolved, state.cache?.version, fallbackVersion) ?? fallbackVersion;

    state.retryAt = resolved ? 0 : Date.now() + FAILURE_RETRY_MS;
    if (resolved) {
      state.cache = {
        fetchedAt: Date.now(),
        version,
      };
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
  state.retryAt = 0;
}

export function resolveAntigravityIdeVersion(fetchImpl: FetchLike = fetch): Promise<string> {
  return resolveProductVersion(
    ideState,
    ANTIGRAVITY_IDE_FALLBACK_VERSION,
    [ANTIGRAVITY_IDE_DOWNLOAD_URL, ANTIGRAVITY_IDE_RELEASE_FEED_URL],
    parseIdeReleaseFeed,
    fetchImpl
  );
}

export function resolveAntigravityCliVersion(fetchImpl: FetchLike = fetch): Promise<string> {
  return resolveProductVersion(
    cliState,
    ANTIGRAVITY_CLI_FALLBACK_VERSION,
    ANTIGRAVITY_CLI_RELEASE_URL,
    parseCliRelease,
    fetchImpl
  );
}

export function getCachedAntigravityIdeVersion(): string {
  return ideState.cache?.version ?? ANTIGRAVITY_IDE_FALLBACK_VERSION;
}

export function getCachedAntigravityCliVersion(): string {
  return cliState.cache?.version ?? ANTIGRAVITY_CLI_FALLBACK_VERSION;
}

export function seedAntigravityIdeVersionCache(version: string, fetchedAt = Date.now()): void {
  seedVersionCache(ideState, version, fetchedAt);
}

export function seedAntigravityCliVersionCache(version: string, fetchedAt = Date.now()): void {
  seedVersionCache(cliState, version, fetchedAt);
}

export function clearAntigravityVersionCaches(): void {
  ideState.retryAt = 0;
  cliState.retryAt = 0;
  ideState.cache = null;
  ideState.inFlight = null;
  cliState.cache = null;
  cliState.inFlight = null;
}
