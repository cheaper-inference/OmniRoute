import {
  isPublicApiRoute,
  isPublicReadonlyCorsRoute,
} from "../../shared/constants/publicApiRoutes";
import type { ClassificationReason, RouteClassification } from "./types";

const ALIAS_PREFIXES: ReadonlyArray<{
  alias: string;
  canonical: string;
  reason: ClassificationReason;
}> = [
  { alias: "/chat/completions", canonical: "/api/v1/chat/completions", reason: "client_api_alias" },
  { alias: "/responses", canonical: "/api/v1/responses", reason: "client_api_alias" },
  { alias: "/models", canonical: "/api/v1/models", reason: "client_api_alias" },
  // CLIProxyAPI management compatibility: next.config.mjs rewrites /v0/management/* to
  // /api/v0/management/*. Normalize here so the policy (and the ALWAYS_PROTECTED entry in
  // routeGuard.ts) sees the same path for both spellings. Still MANAGEMENT, never client API.
  { alias: "/v0/management", canonical: "/api/v0/management", reason: "cliproxy_management_alias" },
];

function normalizePathname(rawPath: string): { path: string; reason?: ClassificationReason } {
  let path = rawPath || "/";
  if (!path.startsWith("/")) path = "/" + path;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

  // Client-API aliases are matched case-insensitively on the control segment.
  // Next's rewrite layer accepts `/V1/...`, `/CODEX`, etc. and routes them to
  // the client handler, so the classifier must recognize the same casing —
  // otherwise an uppercase alias falls through to the management fallback and
  // the request is treated as a different route class than it is actually
  // dispatched to (GHSA-jvqc-mp9f-q936). Only the leading control segment is
  // lowercased for detection; the original-case tail is preserved.
  const lower = path.toLowerCase();

  if (lower === "/codex" || lower.startsWith("/codex/")) {
    return { path: "/api/v1/responses", reason: "client_api_codex_alias" };
  }

  if (lower === "/v1/v1" || lower.startsWith("/v1/v1/")) {
    const tail = path.slice("/v1/v1".length) || "";
    return { path: "/api/v1" + tail, reason: "client_api_double_prefix" };
  }

  if (lower === "/v1beta" || lower.startsWith("/v1beta/")) {
    const tail = path.slice("/v1beta".length) || "";
    return { path: "/api/v1beta" + tail, reason: "client_api_alias" };
  }

  if (lower === "/v1" || lower.startsWith("/v1/")) {
    const tail = path.slice("/v1".length) || "";
    return { path: "/api/v1" + tail, reason: "client_api_alias" };
  }

  for (const { alias, canonical, reason } of ALIAS_PREFIXES) {
    if (lower === alias) {
      return { path: canonical, reason };
    }
    if (lower.startsWith(alias + "/")) {
      return { path: canonical + path.slice(alias.length), reason };
    }
  }

  return { path };
}

export function classifyRoute(rawPath: string, method: string = "GET"): RouteClassification {
  const { path: normalizedPath, reason: aliasReason } = normalizePathname(rawPath);

  if (normalizedPath === "/" || normalizedPath === "") {
    return {
      routeClass: "MANAGEMENT",
      reason: "root_redirect",
      normalizedPath: "/",
    };
  }

  if (normalizedPath === "/dashboard/onboarding") {
    return {
      routeClass: "PUBLIC",
      reason: "setup_wizard",
      normalizedPath,
    };
  }

  // Public, ticket-gated device-flow connect pages (e.g. /connect/codex/{token}).
  // Anyone with the shared link completes the provider login in their own browser.
  if (normalizedPath === "/connect" || normalizedPath.startsWith("/connect/")) {
    return {
      routeClass: "PUBLIC",
      reason: "public_connect_page",
      normalizedPath,
    };
  }

  if (normalizedPath.startsWith("/dashboard")) {
    return {
      routeClass: "MANAGEMENT",
      reason: "dashboard_prefix",
      normalizedPath,
    };
  }

  if (normalizedPath === "/api/v1" || normalizedPath.startsWith("/api/v1/")) {
    return {
      routeClass: "CLIENT_API",
      reason: aliasReason ?? "client_api_v1",
      normalizedPath,
    };
  }

  if (normalizedPath === "/api/v1beta" || normalizedPath.startsWith("/api/v1beta/")) {
    return {
      routeClass: "CLIENT_API",
      reason: aliasReason ?? "client_api_v1",
      normalizedPath,
    };
  }

  if (normalizedPath.startsWith("/api/")) {
    if (isClassifiedAsPublic(normalizedPath, method)) {
      return {
        routeClass: "PUBLIC",
        reason: matchesReadonlyPublic(normalizedPath, method)
          ? "public_readonly_prefix"
          : "public_prefix",
        normalizedPath,
      };
    }

    return {
      routeClass: "MANAGEMENT",
      reason: managementApiReason(aliasReason),
      normalizedPath,
    };
  }

  return {
    routeClass: "MANAGEMENT",
    reason: "fallback_management",
    normalizedPath,
  };
}

// The CLIProxyAPI alias keeps its own reason so audit logs show which spelling was used.
function managementApiReason(aliasReason?: ClassificationReason): ClassificationReason {
  return aliasReason === "cliproxy_management_alias" ? aliasReason : "management_api";
}

function matchesReadonlyPublic(path: string, method: string): boolean {
  // Exact match, not startsWith: a prefix here would hand the CORS origin
  // relaxation to every adjacent path too (GHSA-74g9-q8f6-793h).
  return isPublicReadonlyCorsRoute(path, method);
}

function isClassifiedAsPublic(path: string, method: string): boolean {
  return isPublicApiRoute(path, method);
}
