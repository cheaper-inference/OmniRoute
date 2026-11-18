import type { ReactElement } from "react";
import { SkillsConceptCard } from "../../src/shared/components/SkillsConceptCard";
import { ActivityHeatmap } from "../../src/shared/components/analytics/charts";
import {
  AccountDonut,
  ApiKeyDonut,
  ProviderCostDonut,
} from "../../src/shared/components/analytics/rechartsDonuts";
import OAuthModal from "../../src/shared/components/OAuthModal";
import {
  buildStaticProviderEntries,
  type ProviderEntry,
} from "../../src/app/(dashboard)/dashboard/providers/providerPageUtils";

// Compile with the canonical Electron ambient declaration; no local duplicate interface.
export const dashboardCards: ReactElement[] = [
  <SkillsConceptCard key="agent" variant="agent" />,
  <SkillsConceptCard key="omni" variant="omni" />,
  <ActivityHeatmap key="activity" activityMap={{ "2026-10-28": 123 }} />,
  <ActivityHeatmap key="empty-activity" />,
  <AccountDonut key="account" byAccount={[{ account: "demo", totalTokens: 123 }]} />,
  <ApiKeyDonut key="key" byApiKey={[{ apiKeyName: "demo", apiKeyId: "1", totalTokens: 123 }]} />,
  <ProviderCostDonut key="cost" byProvider={[{ provider: "demo", cost: 0.5 }]} />,
  <OAuthModal
    key="oauth"
    isOpen={false}
    provider="codex"
    providerInfo={{ name: "Codex" }}
    onClose={() => {}}
  />,
];

buildStaticProviderEntries("no-auth", (_providerId, authType) => {
  const supportedAuthType: ProviderEntry["toggleAuthType"] = authType;
  return { total: supportedAuthType === "no-auth" ? 0 : 1 };
});

type StatsAuthType = Parameters<Parameters<typeof buildStaticProviderEntries>[1]>[1];
export const noAuthStatsType: StatsAuthType = "no-auth";
// @ts-expect-error Activity totals must be numeric, not preformatted strings.
export const invalidActivity = <ActivityHeatmap activityMap={{ today: "123" }} />;
