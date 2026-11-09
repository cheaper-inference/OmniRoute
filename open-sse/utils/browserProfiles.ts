/**
 * Browser-profile resolution against the installed wreq-js catalog.
 *
 * The TLS fingerprint surface (TlsClient default session, the *TlsClient
 * service clients, and every web-executor User-Agent / Sec-Ch-Ua header)
 * resolves from this single module at request time. Upgrading wreq-js moves
 * every fingerprint forward together; nothing here is frozen in source.
 *
 * Fail-loud contract: an unusable wreq-js catalog throws at request time
 * rather than silently pinning a degenerate fingerprint (the #5591 trap).
 */
import * as nodeModule from "node:module";

// #12491 — anchor on process.argv[1]||cwd() rather than import.meta.url: the
// standalone Docker runtime re-lays-out files at a different relative depth
// than the build, so an import.meta.url-relative resolution can miss even
// though this loader already keeps the specifier itself dynamic (see
// loadRuntimeModule() below). Matches src/lib/machineToken.ts and
// src/lib/db/adapters/runtimeRequire.ts's established anchor pattern.
const runtimeRequire = nodeModule.createRequire(process.argv[1] || process.cwd());

function loadRuntimeModule(moduleName: string): unknown {
  // Keep the specifier dynamic. Turbopack rewrites a literal createRequire call
  // to a hashed external name that is absent from the standalone Docker runtime.
  return Reflect.apply(runtimeRequire, undefined, [moduleName]);
}

let wreqRuntimeModule: Record<string, unknown> | null = null;
let wreqRuntimeModuleError: unknown;
let wreqRuntimeModuleResolved = false;

export function getWreqRuntimeModule(): Record<string, unknown> {
  if (!wreqRuntimeModuleResolved) {
    wreqRuntimeModuleResolved = true;
    try {
      wreqRuntimeModule = loadRuntimeModule("wreq-js") as Record<string, unknown>;
    } catch (error) {
      wreqRuntimeModuleError = error;
    }
  }
  if (wreqRuntimeModule) return wreqRuntimeModule;
  throw wreqRuntimeModuleError ?? new Error("wreq-js runtime unavailable");
}

// Newest plain profile of a family that the installed wreq-js ships, so the
// default follows the library instead of a version frozen in source.
export function newestProfile(family: string, profiles: readonly string[]): string | null {
  let best: string | null = null;
  let bestVersion = -1;
  const prefix = `${family}_`;
  for (const profile of profiles) {
    if (!profile.startsWith(prefix)) continue;
    const versionStr = profile.slice(prefix.length);
    const version = Number(versionStr);
    if (versionStr !== "" && Number.isInteger(version) && version > bestVersion) {
      best = profile;
      bestVersion = version;
    }
  }
  return best;
}

// Version part of a profile id ("chrome_149" -> "149"). Returns null for ids
// that do not follow the <family>_<number> convention.
export function profileVersion(profile: string): string | null {
  const version = profile.slice(profile.indexOf("_") + 1);
  return Number.isInteger(Number(version)) && version !== "" ? version : null;
}

const newestByFamily = new Map<string, string>();

// Resolve the newest profile of a family once per process. No literal
// fallback: a wreq-js runtime without a usable catalog must fail the request
// loudly rather than silently re-pin a frozen fingerprint (the #5591 trap).
function newestFamilyProfile(family: "chrome" | "firefox"): string {
  const cached = newestByFamily.get(family);
  if (cached) return cached;
  const getProfiles = getWreqRuntimeModule().getProfiles;
  const profiles = typeof getProfiles === "function" ? getProfiles() : [];
  const resolved = newestProfile(family, Array.isArray(profiles) ? profiles : []);
  if (!resolved) {
    throw new Error(`wreq-js runtime exposes no usable ${family}_* profile`);
  }
  newestByFamily.set(family, resolved);
  return resolved;
}

export function newestChromeProfile(): string {
  return newestFamilyProfile("chrome");
}

export function newestFirefoxProfile(): string {
  return newestFamilyProfile("firefox");
}

export function newestChromeVersion(): string {
  const profile = newestChromeProfile();
  const version = profileVersion(profile);
  if (version === null) {
    throw new Error(`wreq-js chrome profile id has no numeric version: ${profile}`);
  }
  return version;
}

export function newestFirefoxVersion(): string {
  const profile = newestFirefoxProfile();
  const version = profileVersion(profile);
  if (version === null) {
    throw new Error(`wreq-js firefox profile id has no numeric version: ${profile}`);
  }
  return version;
}

export function chromeUserAgent(platform: string, version: string): string {
  return (
    `Mozilla/5.0 (${platform}) AppleWebKit/537.36 (KHTML, like Gecko) ` +
    `Chrome/${version}.0.0.0 Safari/537.36`
  );
}

export function firefoxUserAgent(platform: string, version: string): string {
  return `Mozilla/5.0 (${platform}; rv:${version}.0) Gecko/20100101 Firefox/${version}.0`;
}
