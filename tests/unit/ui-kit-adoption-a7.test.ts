// Adoption of the new CI UI Kit in the "a7" slice (2026-11-18): the screen components shared
// between routes, the home page, the small dashboard areas and the pages outside the dashboard.
// Each test pins one mapping of the adoption on those files, so a hand-made copy of something the
// kit now offers cannot come back. A static scan: the exceptions are listed line by line with the
// reason, and an exception that stops matching fails the test (no stale entries).
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const DASHBOARD = "src/app/(dashboard)/dashboard";
const DASHBOARD_AREAS = [
  "a2a",
  "acp-agents",
  "api-endpoints",
  "auto-combo",
  "changelog",
  "cloud-agents",
  "conversations",
  "free-provider-rankings",
  "free-tiers",
  "gamification",
  "leaderboard",
  "limits",
  "mcp",
  "onboarding",
  "plugins",
  "profile",
  "provider-stats",
  "quota",
  "relay",
  "tokens",
];
const SHARED = "src/shared/components";
/** The screen components of `src/shared/components` (the kit adapters belong to the foundation). */
const SHARED_SCREEN_COMPONENTS = [
  "AnimatedNumber",
  "CachedInputTokens",
  "CallContentProvenanceBadges",
  "CapabilityBadge",
  "ChatGptLocalUsage",
  "ChatGptOAuthModal",
  "ChatGptPlanUi",
  "ChatGptSignInButton",
  "CloudSyncStatus",
  "CodexServiceModeSettings",
  "ConnectionTestButton",
  "ConnectionTestModelField",
  "ConsoleLogViewer",
  "CursorAuthModal",
  "DegradationBadge",
  "DiscoveryDegradedNotice",
  "DistributeProxiesButton",
  "ErrorPageScaffold",
  "KiroAuthModal",
  "KiroOAuthWrapper",
  "KiroSocialOAuthModal",
  "M365OAuthModal",
  "MaintenanceBanner",
  "ManualConfigModal",
  "ModelRoutingSection",
  "ModelSelectField",
  "ModelSelectModal",
  "NoAuthAccountCard",
  "NoAuthProviderCard",
  "NoAuthProviderToggle",
  "OAuthModal",
  "OAuthModalPanels",
  "PresetSlider",
  "ProviderCardGrid",
  "ProviderTestSlideOver",
  "ProviderTosNotice",
  "ProxyConfigModal",
  "ProxyLogDetail",
  "ProxyLogger",
  "ReasoningRoutingRules",
  "RequestLogThroughput",
  "RequestLogTokens",
  "RequestLoggerDetail",
  "RequestLoggerDetail.sections",
  "RequestLoggerV2",
  "RequestTimeline",
  "RiskNoticeModal",
  "SkillsConceptCard",
  "TokenHealthBadge",
  "TraeAuthModal",
  "UsageAnalytics",
  "UsageEvidenceNotice",
  "UsageOverview",
  "UsageStats",
];
const SHARED_SCREEN_FOLDERS = ["analytics", "flow", "cli", "compression", "routing", "oauthModal"];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (path.endsWith(".tsx") && !path.endsWith(".test.tsx")) out.push(path);
  }
  return out;
}

function sliceFiles(): string[] {
  const files = [
    ...walk("src/app/(dashboard)/home"),
    ...DASHBOARD_AREAS.flatMap((area) => walk(join(DASHBOARD, area))),
    // Pages outside the dashboard, minus the root layout (and the API routes, which have no UI).
    ...readdirSync("src/app")
      .filter((entry) => entry !== "(dashboard)" && entry !== "api" && entry !== "layout.tsx")
      .flatMap((entry) => {
        const path = join("src/app", entry);
        if (statSync(path).isDirectory()) return walk(path);
        return path.endsWith(".tsx") ? [path] : [];
      }),
    ...SHARED_SCREEN_COMPONENTS.map((name) => join(SHARED, `${name}.tsx`)),
    ...SHARED_SCREEN_FOLDERS.flatMap((folder) => walk(join(SHARED, folder))),
  ];
  return [...new Set(files)].sort();
}

const FILES = sliceFiles();
const SOURCES = new Map(FILES.map((file) => [file, readFileSync(file, "utf8")]));

/** `file:line` of every match of `pattern` in the slice, minus the listed exceptions. */
function offenders(pattern: RegExp, exceptions: Record<string, string> = {}): string[] {
  const found: string[] = [];
  for (const [file, source] of SOURCES) {
    source.split("\n").forEach((line, index) => {
      if (pattern.test(line)) found.push(`${file}:${index + 1}`);
    });
  }
  const stale = Object.keys(exceptions).filter((entry) => !found.includes(entry));
  assert.deepEqual(stale, [], "exceptions that no longer match (remove them)");
  return found.filter((entry) => !(entry in exceptions));
}

test("the slice covers the files it claims", () => {
  assert.ok(FILES.length > 150, `only ${FILES.length} files found`);
  for (const file of [
    "src/app/(dashboard)/home/HomeRecentRequests.tsx",
    "src/shared/components/RequestLoggerV2.tsx",
    "src/shared/components/analytics/charts.tsx",
    "src/app/login/page.tsx",
    "src/app/not-found.tsx",
  ]) {
    assert.ok(SOURCES.has(file), file);
  }
  assert.ok(!SOURCES.has("src/app/layout.tsx"));
  assert.ok(!SOURCES.has("src/shared/components/Button.tsx"), "adapters are not in the slice");
});

// Mapping F (heading-scale-eyebrow.md, step 1): text under the kit's 12px floor uses the kit's
// two label sizes, `text-2xs` (11px) and `text-3xs` (10px); running text at those sizes went up
// to `text-xs`, and 8-9px is gone.
test("F: no arbitrary font size under 12px; labels use text-2xs / text-3xs", () => {
  assert.deepEqual(offenders(/(?<![\w-])text-\[(?:8|9|10|11)(?:\.\d+)?px\]/), []);
});
