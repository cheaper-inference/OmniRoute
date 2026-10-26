"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { ComboLiveStudio } from "./ComboLiveStudio";
import { useLiveComboStatus } from "@/hooks/useLiveDashboard";
import { useProviderBreakerHealth } from "@/hooks/useProviderBreakerHealth";

/**
 * Combo/Routing Studio (Tela B) — live combo cascade.
 *
 * Thin route wrapper: subscribes to the `combo` WS channel via
 * `useLiveComboStatus` and feeds the events into the studio. `LiveComboEvent` is
 * structurally compatible with the studio's `ComboEventInput`. The studio shows a
 * "Live disabled" banner + empty state when the WS feed is off, so this degrades
 * gracefully. `useProviderBreakerHealth` overlays the real circuit-breaker state
 * (U1b) from the monitoring health snapshot — fail-soft, so it never breaks the
 * cascade when the endpoint is unavailable.
 */
export default function ComboLiveStudioPage() {
  const { comboEvents, activeCombos, isConnected } = useLiveComboStatus();
  const { providerHealth, connectionHealth } = useProviderBreakerHealth();
  const t = useTranslations("sidebar");

  return (
    <div className="flex h-[calc(100dvh-6rem)] min-h-[480px] flex-col gap-3 p-4">
      <PageHeader compact title={t("combosLive")} description={t("combosLiveSubtitle")} />
      <div className="min-h-0 flex-1">
        <ComboLiveStudio
          comboEvents={comboEvents}
          combos={[...activeCombos]}
          isConnected={isConnected}
          providerHealth={providerHealth}
          connectionHealth={connectionHealth}
        />
      </div>
    </div>
  );
}
