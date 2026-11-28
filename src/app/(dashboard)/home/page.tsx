import { getMachineId } from "@/shared/utils/machine";
import { loadHomeSettings } from "./loadHomeSettings";
import HomePageClient from "../dashboard/HomePageClient";
import BootstrapBanner from "../dashboard/BootstrapBanner";
import KimiSponsorBanner from "../dashboard/KimiSponsorBanner";
import CheaperInferenceSponsorBanner from "../dashboard/CheaperInferenceSponsorBanner";
import VscodeCopilotBanner from "../dashboard/VscodeCopilotBanner";
import NewsBanner from "../dashboard/NewsBanner";
import FirstRunReadinessCard from "../dashboard/FirstRunReadinessCard";
import HomePageHeader from "./HomePageHeader";
import HomeSystemMetricsCards from "./HomeSystemMetricsCards";
import { LazyHomeUsageWidgets, LazyProviderQuotaWidget } from "./LazyHomeWidgets";
import UnpricedUsageBanner from "../dashboard/UnpricedUsageBanner";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Settings failures degrade to defaults here (display-only) — see loadHomeSettings (#14060).
  const [settings, machineId] = await Promise.all([loadHomeSettings(), getMachineId()]);
  const isBootstrapped = process.env.OMNIROUTE_BOOTSTRAPPED === "true";
  return (
    <>
      <HomePageHeader />
      {isBootstrapped && <BootstrapBanner />}
      <FirstRunReadinessCard setupComplete={Boolean(settings.setupComplete)} />
      <UnpricedUsageBanner />
      <KimiSponsorBanner />
      <CheaperInferenceSponsorBanner />
      <VscodeCopilotBanner />
      <NewsBanner />
      <div className="mb-4">
        <HomeSystemMetricsCards />
      </div>
      <HomePageClient machineId={machineId}>
        <LazyHomeUsageWidgets
          showStats={settings.showUsageStatsOnHome !== false}
          showHeatmap={settings.showActivityHeatmapOnHome !== false}
          aside={
            settings.showProviderQuotaOnHome !== false ? (
              <LazyProviderQuotaWidget showAllQuotas fillHeight />
            ) : undefined
          }
        />
      </HomePageClient>
    </>
  );
}
