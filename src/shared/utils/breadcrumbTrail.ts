/**
 * Pure rules of the dashboard breadcrumb trail (`src/shared/components/Breadcrumbs.tsx`):
 * which crumbs may be links and where each segment's label comes from. Kept out of the
 * component so the static guards can check them against the route tree and `en.json`
 * (`tests/unit/breadcrumb-trail-routes.test.ts`).
 */
import { SIDEBAR_SECTIONS, getSectionItems } from "@/shared/constants/sidebarVisibility";

/**
 * Route prefixes that only group sub-routes: the folder has no `page.tsx` (and no dynamic
 * sibling answers for it), so the URL is a 404 and its crumb must not be a link.
 * `[param]` stands for any single segment. The guard test derives the same list from
 * `src/app/(dashboard)` and fails when a folder gains or loses its page.
 */
const ROUTE_PREFIXES_WITHOUT_PAGE: readonly string[] = [
  "/dashboard/api-manager/[id]",
  "/dashboard/gamification",
  "/dashboard/plugins/[name]",
  "/dashboard/resilience",
  "/dashboard/system",
  "/dashboard/tools",
];

/**
 * Static routes that sit next to a page-less `[param]` folder of the list above and do have a
 * page: the static folder wins over the dynamic one, so they stay links.
 */
const STATIC_ROUTES_WITH_PAGE: ReadonlySet<string> = new Set(["/dashboard/api-manager/routing"]);

const PAGELESS_PATTERNS = ROUTE_PREFIXES_WITHOUT_PAGE.map((prefix) =>
  prefix.split("/").filter(Boolean)
);

/** False when `href` is a route prefix with no page behind it (see the lists above). */
export function routeHasPage(href: string): boolean {
  if (STATIC_ROUTES_WITH_PAGE.has(href)) return true;
  const segments = href.split("/").filter(Boolean);
  return !PAGELESS_PATTERNS.some(
    (pattern) =>
      pattern.length === segments.length &&
      pattern.every((part, i) => part.startsWith("[") || part === segments[i])
  );
}

/** Segment → key in the `breadcrumbs` namespace. */
const BREADCRUMB_LABEL_KEYS: Readonly<Record<string, string>> = {
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
  orchestration: "orchestration",
  // Segments no sidebar entry names (sub-pages and redirects).
  access: "access",
  "auto-combo": "autoCombo",
  config: "config",
  connect: "connect",
  intel: "intel",
  "media-providers": "mediaProviders",
  offers: "offers",
  onboarding: "onboarding",
};

/**
 * Segment → key in the `sidebar` namespace, for segments that are not a sidebar entry of their
 * own but already have a label there (a group title, or an entry that moved).
 */
const SIDEBAR_LABEL_KEYS: Readonly<Record<string, string>> = {
  system: "systemGroup",
  "mitm-proxy": "mitmProxy",
  "1proxy": "oneProxy",
};

const sidebarKeyByHref = new Map<string, string>(
  SIDEBAR_SECTIONS.flatMap((section) => getSectionItems(section))
    .filter((item) => !item.external)
    .map((item) => [item.href, item.i18nKey])
);

type BreadcrumbLabelRef = { namespace: "breadcrumbs" | "sidebar"; key: string };

/**
 * Where the label of the crumb at `href` (whose last segment is `segment`) may come from, in
 * order of preference: the breadcrumb's own key, then the sidebar label of the same route, then
 * a sidebar label mapped by segment. Empty for a segment that is data (a provider or combo id).
 */
export function breadcrumbLabelRefs(segment: string, href: string): BreadcrumbLabelRef[] {
  const refs: BreadcrumbLabelRef[] = [];
  const ownKey = BREADCRUMB_LABEL_KEYS[segment];
  if (ownKey) refs.push({ namespace: "breadcrumbs", key: ownKey });
  const routeKey = sidebarKeyByHref.get(href);
  if (routeKey) refs.push({ namespace: "sidebar", key: routeKey });
  const segmentKey = SIDEBAR_LABEL_KEYS[segment];
  if (segmentKey) refs.push({ namespace: "sidebar", key: segmentKey });
  return refs;
}
