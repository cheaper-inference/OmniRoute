"use client";

/**
 * Breadcrumbs — FASE-07 UX
 *
 * Dashboard breadcrumb navigation component. Automatically generates
 * breadcrumbs from the current path with friendly labels.
 * Uses usePathname() internally — no props needed.
 *
 * Usage:
 *   <Breadcrumbs />
 */

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@omniroute/ui-kit/breadcrumb";
import { decodeRouteParam } from "@/shared/utils/decodeRouteParam";

const PATH_LABELS = {
  dashboard: "dashboard",
  providers: "providers",
  combos: "combos",
  settings: "settings",
  general: "general",
  appearance: "appearance",
  ai: "ai",
  routing: "routing",
  resilience: "resilience",
  advanced: "advanced",
  "access-tokens": "accessTokens",
  "feature-flags": "featureFlags",
  logs: "logs",
  "audit-log": "auditLog",
  console: "console",
  logger: "logger",
  translator: "translator",
  playground: "playground",
  add: "add",
  edit: "edit",
  keys: "apiKeys",
  models: "models",
  "cli-code": "cliCode",
  "cli-agents": "cliAgents",
  "acp-agents": "acpAgents",
  endpoint: "endpoint",
  "api-manager": "apiManager",
  context: "context",
  compression: "compression",
  services: "services",
  analytics: "analytics",
  costs: "costs",
  health: "health",
  runtime: "runtime",
  webhooks: "webhooks",
  home: "home",
  activity: "activity",
  "agent-skills": "agentSkills",
  "combo-health": "comboHealth",
  evals: "evals",
  search: "search",
  utilization: "utilization",
  "api-endpoints": "apiEndpoints",
  audit: "audit",
  a2a: "a2a",
  mcp: "mcp",
  batch: "batch",
  files: "files",
  media: "media",
  cache: "cache",
  changelog: "changelog",
  chaos: "chaos",
  "cloud-agents": "cloudAgents",
  live: "live",
  studio: "studio",
  aggressive: "aggressive",
  caveman: "caveman",
  ccr: "ccr",
  headroom: "headroom",
  lite: "lite",
  llmlingua: "llmlingua",
  omniglyph: "omniglyph",
  rtk: "rtk",
  "session-dedup": "sessionDedup",
  ultra: "ultra",
  budget: "budget",
  pricing: "pricing",
  "quota-share": "quotaShare",
  discovery: "discovery",
  "free-provider-rankings": "freeProviderRankings",
  radar: "radar",
  setup: "setup",
  "free-tiers": "freeTiers",
  gamification: "gamification",
  leaderboard: "leaderboard",
  limits: "limits",
  profile: "profile",
  plugins: "plugins",
  "provider-stats": "providerStats",
  new: "new",
  quota: "quota",
  relay: "relay",
  "search-tools": "searchTools",
  security: "security",
  sidebar: "sidebar",
  tokens: "tokens",
  tools: "tools",
  "agent-bridge": "agentBridge",
  "traffic-inspector": "trafficInspector",
  usage: "usage",
};

/**
 * Get a friendly label for a path segment.
 * @param {string} segment
 * @returns {string}
 */
function getLabel(segment, t) {
  const key = PATH_LABELS[segment];
  // usePathname() returns url.pathname verbatim — the URL's single encoding
  // layer (auto%2Ffast) — so one decode yields the display label.
  const decoded = decodeRouteParam(segment);
  const fallback = decoded.charAt(0).toUpperCase() + decoded.slice(1);
  return key && typeof t.has === "function" && t.has(key) ? t(key) : fallback;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations("breadcrumbs");
  const tTeams = useTranslations("teamCosts");
  if (!pathname || pathname === "/dashboard") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, idx) => ({
    label:
      seg === "teams" && segments[idx - 1] === "costs" ? tTeams("selectTeam") : getLabel(seg, t),
    href: "/" + segments.slice(0, idx + 1).join("/"),
    isLast: idx === segments.length - 1,
  }));

  return (
    <Breadcrumb aria-label={t("ariaLabel")} className="mb-2 py-2">
      <BreadcrumbList>
        {crumbs.map((crumb, i) => (
          <Fragment key={crumb.href}>
            {i > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {crumb.isLast ? (
                <BreadcrumbPage aria-current="page">{crumb.label}</BreadcrumbPage>
              ) : (
                // The kit BreadcrumbLink is a plain <a> (no asChild); next/link keeps client-side
                // navigation, so it carries the kit link slot + class itself.
                <Link href={crumb.href} data-slot="breadcrumb-link" className="ci-breadcrumb__link">
                  {crumb.label}
                </Link>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
