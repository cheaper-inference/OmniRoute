import type { AntigravityClientProfile } from "@/shared/constants/antigravityClientProfile";
import {
  getCachedAntigravityCliVersion,
  getCachedAntigravityIdeVersion,
} from "./antigravityVersion.ts";

// loadCodeAssist/onboardUser's `metadata` body is a protobuf-JSON-shaped
// object — ideType/pluginType are int32 enums on the wire, not strings, and
// platform is required. Values mirror the sibling 9router project's
// LOAD_CODE_ASSIST_METADATA (open-sse/config/appConstants.js).
//
// Live comparison (same Google account, same host, 2026-08-25): 9Router
// (this exact metadata shape, including a Linux platform enum) succeeded
// against loadCodeAssist/onboardUser; OmniRoute (ideType as the bare string
// "ANTIGRAVITY", no platform/pluginType) got 403 on both from the identical
// account. Sending an incomplete client identity reads to Google's backend
// as untrusted and gets rejected.
//
// NOTE: a prior version of this function carried the comment "Matches
// Antigravity-Manager quota.rs: only ideType (no platform — LINUX is
// rejected)" — the opposite conclusion, presumably true when it was
// written. Trusting the fresh live comparison over that stale claim here;
// if this regresses Linux specifically, that old note is why.
const ANTIGRAVITY_IDE_TYPE_ENUM = 9;
const ANTIGRAVITY_PLUGIN_TYPE_GEMINI_ENUM = 2;
const ANTIGRAVITY_PLATFORM_ENUM = {
  UNSPECIFIED: 0,
  DARWIN_AMD64: 1,
  DARWIN_ARM64: 2,
  LINUX_AMD64: 3,
  LINUX_ARM64: 4,
  WINDOWS_AMD64: 5,
} as const;

function resolveAntigravityPlatformEnum(): number {
  const platform = process.platform;
  const arch = process.arch;
  if (platform === "darwin") {
    return arch === "arm64"
      ? ANTIGRAVITY_PLATFORM_ENUM.DARWIN_ARM64
      : ANTIGRAVITY_PLATFORM_ENUM.DARWIN_AMD64;
  }
  if (platform === "linux") {
    return arch === "arm64"
      ? ANTIGRAVITY_PLATFORM_ENUM.LINUX_ARM64
      : ANTIGRAVITY_PLATFORM_ENUM.LINUX_AMD64;
  }
  if (platform === "win32") return ANTIGRAVITY_PLATFORM_ENUM.WINDOWS_AMD64;
  return ANTIGRAVITY_PLATFORM_ENUM.UNSPECIFIED;
}

export const ANTIGRAVITY_IDE_NODE_API_CLIENT = "google-api-nodejs-client/10.3.0";
export const ANTIGRAVITY_IDE_NODE_X_GOOG_API_CLIENT = "gl-node/22.21.1";

// Antigravity presents the native macOS desktop client fingerprint on the IDE path:
// the upstream backend expects the Mac build, so the OS/arch token is pinned to
// darwin/arm64 regardless of the host OmniRoute happens to run on (#8098). The IDE /
// CLI / IDE-Node User-Agent split (#8013) is preserved — only the platform token is fixed.
//
// The CLI path (agy, a Go binary) has no such constraint: it reports the real host in
// Go's runtime.GOOS/GOARCH dialect, captured live from `agy 1.4.4` on Windows x64 as
// `os_type=windows; arch=amd64`. Node's own names ("win32"/"x64") are a giveaway.
const ANTIGRAVITY_OS_TYPE = "darwin";
const ANTIGRAVITY_ARCH = "arm64";

const ANTIGRAVITY_GO_OS: Record<string, string> = {
  win32: "windows",
  darwin: "darwin",
  linux: "linux",
  freebsd: "freebsd",
  openbsd: "openbsd",
  sunos: "solaris",
  aix: "aix",
};

const ANTIGRAVITY_GO_ARCH: Record<string, string> = {
  x64: "amd64",
  ia32: "386",
  arm64: "arm64",
  arm: "arm",
  ppc64: "ppc64",
  s390x: "s390x",
};

/** Map a Node `process.platform`/`process.arch` pair onto Go's GOOS/GOARCH tokens. */
export function resolveAntigravityGoPlatform(
  platform: string = process.platform,
  arch: string = process.arch
): { osType: string; arch: string } {
  return {
    osType: ANTIGRAVITY_GO_OS[platform] ?? platform,
    arch: ANTIGRAVITY_GO_ARCH[arch] ?? arch,
  };
}

// `cl` is Google's internal Piper changelist for the build that shipped a given CLI
// version — not derivable from the version, and not exposed by the public manifests
// (only version/url/sha512 are). Seeded from the native capture; refresh when bumping.
const ANTIGRAVITY_KNOWN_CHANGELISTS: Record<string, string> = {
  "1.4.4": "1003595037",
};

/**
 * Resolve the CLI build changelist: explicit override, then the known-version table.
 * Returns `null` when the version has no recorded changelist, so the caller omits `cl=`
 * entirely — a stale changelist paired with a newer version is a worse fingerprint than
 * no changelist at all.
 */
export function resolveAntigravityCliChangelist(version: string): string | null {
  const override = process.env.ANTIGRAVITY_CLI_CL?.trim();
  if (override) return override;
  return ANTIGRAVITY_KNOWN_CHANGELISTS[version] ?? null;
}

function withOptionalBearerAuth(
  headers: Record<string, string>,
  accessToken?: string | null
): Record<string, string> {
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return headers;
}

export function antigravityIdeUserAgent(version = getCachedAntigravityIdeVersion()): string {
  return `antigravity/ide/${version} ${ANTIGRAVITY_OS_TYPE}/${ANTIGRAVITY_ARCH}`;
}

export function antigravityCliUserAgent(
  version = getCachedAntigravityCliVersion(),
  authMethod = "consumer",
  changelist = resolveAntigravityCliChangelist(version),
  platform = resolveAntigravityGoPlatform()
): string {
  const clToken = changelist ? `cl=${changelist}; ` : "";
  return `antigravity/cli/${version} (aidev_client; os_type=${platform.osType}; arch=${platform.arch}; ${clToken}auth_method=${authMethod})`;
}

export function antigravityIdeNodeUserAgent(version = getCachedAntigravityIdeVersion()): string {
  return `antigravity/${version} ${ANTIGRAVITY_OS_TYPE}/${ANTIGRAVITY_ARCH} ${ANTIGRAVITY_IDE_NODE_API_CLIENT}`;
}

export function getAntigravityOAuthUserAgent(profile: AntigravityClientProfile): string {
  return profile === "cli" ? antigravityCliUserAgent() : antigravityIdeNodeUserAgent();
}

export function getAntigravityContentHeaders(
  profile: AntigravityClientProfile,
  accessToken?: string | null
): Record<string, string> {
  return withOptionalBearerAuth(
    {
      "Content-Type": "application/json",
      "User-Agent": profile === "cli" ? antigravityCliUserAgent() : antigravityIdeUserAgent(),
    },
    accessToken
  );
}

export function getAntigravityIdeNodeHeaders(accessToken?: string | null): Record<string, string> {
  return withOptionalBearerAuth(
    {
      "Content-Type": "application/json",
      "User-Agent": antigravityIdeNodeUserAgent(),
      "X-Goog-Api-Client": ANTIGRAVITY_IDE_NODE_X_GOOG_API_CLIENT,
    },
    accessToken
  );
}

/** Native loadCodeAssist body metadata, per client profile. */
export function getAntigravityLoadCodeAssistMetadata(
  profile: AntigravityClientProfile = "ide"
): Record<string, number> | { ideType: string } {
  // The Go CLI sends the bare string form — 38 bytes, 200 OK, captured live. The numeric
  // enum shape below is what the IDE build needs; sending it from the CLI path would be
  // an identity mismatch.
  if (profile === "cli") {
    return { ideType: "ANTIGRAVITY" };
  }
  return {
    ideType: ANTIGRAVITY_IDE_TYPE_ENUM,
    platform: resolveAntigravityPlatformEnum(),
    pluginType: ANTIGRAVITY_PLUGIN_TYPE_GEMINI_ENUM,
  };
}
