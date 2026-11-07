"use client";

import { Card } from "@/shared/components";
import Checkbox from "@/shared/components/Checkbox";
import { toggleFanout } from "./fanout";
import { ComputersPanel, ConversationPanel, SkillsPanel, type Translate } from "./panels";
import { statusKey } from "./regions";
import { idle, isTerminal } from "./session";

import * as actions from "./page-actions";
import type { PageState } from "./page-state";
export function DetailsPanel({ state }: { state: PageState }) {
  const {
    t,
    accountRegion,
    skillRegion,
    computerRegion,
    accounts,
    computers,
    skills,
    routines,
    fanout,
    setFanout,
  } = state;
  return (
    <aside className="grid gap-3 border-b border-border p-3 md:grid-cols-2">
      <Card icon="badge" padding="sm" title={t("fanoutTitle")}>
        {accounts.length > 0 ? (
          <ul className="space-y-1">
            {accounts.map((account) => (
              <li className="flex items-center gap-2 text-sm" key={account.id}>
                <Checkbox
                  aria-label={account.name}
                  checked={fanout.includes(account.id)}
                  onChange={(event) =>
                    setFanout((current) =>
                      toggleFanout(current, account.id, event.target.checked, account.email ?? "")
                    )
                  }
                />
                <span className="truncate">{account.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-text-muted">{accountRegion.empty}</p>
        )}
      </Card>
      <Card icon="extension" padding="sm" title={skillRegion.title}>
        {skills.length > 0 || routines.length > 0 ? (
          <SkillsPanel routines={routines} skills={skills} />
        ) : (
          <p className="text-sm text-text-muted">{skillRegion.empty}</p>
        )}
      </Card>
      <Card icon="computer" padding="sm" title={computerRegion.title}>
        {computers.length > 0 ? (
          <ComputersPanel computers={computers} />
        ) : (
          <p className="text-sm text-text-muted">{computerRegion.empty}</p>
        )}
      </Card>
      <Card icon="storefront" padding="sm" title="Marketplace">
        <a
          className="text-sm text-primary underline"
          href="https://x.ai/bot/marketplace"
          rel="noreferrer"
          target="_blank"
        >
          x.ai/bot/marketplace
        </a>
        <p className="mt-2 text-xs text-text-muted">{t("marketplaceNote")}</p>
      </Card>
    </aside>
  );
}
function conversationHandlers(
  state: PageState
): React.ComponentProps<typeof ConversationPanel>["handlers"] {
  const { t, setWindowSize, setSession, setRetryNonce, setUploadNote, setDraft, liveRef } = state;
  return {
    onAnswer: (item, resolution) => void actions.answerPermission(state, item, resolution),
    onConnector: (card, resolution) => void actions.answerConnector(state, card, resolution),
    onWidget: (card, value) => void actions.answerWidget(state, card, value),
    onDismissWidget: (card) => void actions.dismissWidget(state, card),
    onSecret: (card, value) => void actions.answerSecret(state, card, value),
    onDiscardDraft: (card) => void actions.discardDraft(state, card),
    onDraft: setDraft,
    onRetry: () => {
      liveRef.current = idle();
      setSession(liveRef.current);
      setRetryNonce((count) => count + 1);
    },
    onOlder: () => setWindowSize((size) => size + 40),
    onSubmit: () => actions.submit(state),
    onUpload: (name) => setUploadNote(t("attachUnavailable", { name })),
  };
}
function conversationState(
  state: PageState
): React.ComponentProps<typeof ConversationPanel>["state"] {
  const {
    t,
    computers,
    messages,
    windowSize,
    permissions,
    cards,
    cardState,
    cardBusy,
    permissionState,
    historyUnavailable,
    session,
    fanState,
    uploadNote,
    status,
    runState,
    draft,
    sendState,
    needsSignIn,
    blocked,
    linkLost,
  } = state;
  return {
    blocked,
    computers,
    draft,
    fanState,
    uploadNote,
    historyUnavailable,
    loading: session.phase === "opening",
    linkLost,
    messages,
    window: windowSize,
    cards,
    cardFailed: cardState === "failed",
    cardBusy,
    needsSignIn,
    permissionFailed: permissionState === "failed",
    permissions,
    runState,
    sendState,
    stateLabel: t(statusKey(status)),
    terminal: isTerminal(session),
  };
}
export function ConversationCard({ state }: { state: PageState }) {
  const { t, conversationRegion, selectedBot } = state;
  return (
    <Card
      className="flex min-h-0 min-w-0 flex-1 flex-col [&>div:last-child]:flex [&>div:last-child]:min-h-0 [&>div:last-child]:flex-1 [&>div:last-child]:flex-col"
      icon="chat"
      padding="none"
      title={conversationRegion.title}
    >
      {selectedBot ? (
        <ConversationPanel
          handlers={conversationHandlers(state)}
          state={conversationState(state)}
          t={t as Translate}
        />
      ) : (
        <p className="px-6 py-8 text-sm text-text-muted">{conversationRegion.empty}</p>
      )}
    </Card>
  );
}
