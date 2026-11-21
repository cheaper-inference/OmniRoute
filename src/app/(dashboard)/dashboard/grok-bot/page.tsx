"use client";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { switchAccount, switchBot } from "./page-actions";
import { useAccounts, useBotDetails, useLiveTranscript, useRoster } from "./page-effects";
import { usePageState } from "./page-state";
import { ConversationCard, DetailsPanel } from "./page-view";
import { ConsoleBar, type Translate } from "./panels";
import { statusKey } from "./regions";
export { grokBotAccounts, grokBotRegions } from "./regions";
export default function GrokBotPage() {
  const tSidebar = useTranslations("sidebar");
  const state = usePageState();
  useAccounts(state);
  useRoster(state);
  useBotDetails(state);
  useLiveTranscript(state);
  const {
    accounts,
    t,
    roster,
    rosterLoading,
    selectedAccount,
    selectedBot,
    status,
    detailsOpen,
    setDetailsOpen,
  } = state;
  return (
    <div className="flex h-[calc(100vh-11rem)] min-h-[32rem] flex-col">
      <PageHeader compact title={tSidebar("grokBot")} description={tSidebar("grokBotSubtitle")} />
      <ConsoleBar
        accounts={accounts}
        chiefLabel={t("chiefOfStaff")}
        onAccount={(id) => switchAccount(state, id)}
        onBot={(id) => switchBot(state, id)}
        onToggleDetails={() => setDetailsOpen((open) => !open)}
        roster={roster}
        rosterLoading={rosterLoading}
        selectedAccount={selectedAccount}
        selectedBot={selectedBot}
        stateLabel={t(statusKey(status))}
        t={t as Translate}
      />
      {detailsOpen ? <DetailsPanel state={state} /> : null}
      <ConversationCard state={state} />
    </div>
  );
}
