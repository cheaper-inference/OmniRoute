"use client";

import { Card } from "@/shared/components";
import Checkbox from "@/shared/components/Checkbox";
import { toggleFanout } from "./fanout";
import { ComputersPanel, ConversationPanel, SkillsPanel, type Translate } from "./panels";
import { statusKey } from "./regions";
import { idle, isTerminal } from "./session";

import * as actions from "./page-actions";
import type { PageState } from "./page-state";
/** The bot's machines, and reading a file from one of them. */
function ComputerCard({ state }: { state: PageState }) {
  const {
    computerRegion,
    computers,
    computerPath,
    setComputerPath,
    computerFileState,
    setComputerFileState,
    selectedAccount,
    selectedBot,
  } = state;
  return (
    <Card icon="computer" padding="sm" title={computerRegion.title}>
      {computers.length > 0 ? (
        <ComputersPanel
          computers={computers}
          onPath={setComputerPath}
          onRead={(computer) => {
            void fetch(
              `/api/providers/${encodeURIComponent(selectedAccount)}/grok-bot/computer-file`,
              {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  agentId: selectedBot,
                  machineId: computer.machineId,
                  path: computerPath,
                }),
              }
            )
              .then(async (response) => {
                if (!response.ok) throw new Error(String(response.status));
                const bytes = new Uint8Array(await response.arrayBuffer());
                setComputerFileState(`${bytes.byteLength} bytes`);
              })
              .catch((error: unknown) => {
                setComputerFileState(error instanceof Error ? error.message : "unavailable");
              });
          }}
          path={computerPath}
          result={computerFileState}
        />
      ) : (
        <p className="text-sm text-text-muted">{computerRegion.empty}</p>
      )}
        </Card>
  );
}

/** What the selected bot can be asked to do. */
function SkillsCard({
  empty,
  routines,
  skills,
  title,
}: {
  empty: string;
  routines: PageState["routines"];
  skills: PageState["skills"];
  title: string;
}) {
  return (
    <Card icon="extension" padding="sm" title={title}>
      {skills.length > 0 || routines.length > 0 ? (
        <SkillsPanel routines={routines} skills={skills} />
      ) : (
        <p className="text-sm text-text-muted">{empty}</p>
      )}
    </Card>
  );
}

/** Who a message goes to when it is sent, beyond the account it was written for. */
function FanoutCard({
  accounts,
  fanout,
  empty,
  onToggle,
  title,
}: {
  accounts: PageState["accounts"];
  fanout: PageState["fanout"];
  empty: string;
  onToggle: PageState["setFanout"];
  title: string;
}) {
  if (accounts.length === 0) {
    return (
      <Card icon="badge" padding="sm" title={title}>
        <p className="text-sm text-text-muted">{empty}</p>
      </Card>
    );
  }
  return (
    <Card icon="badge" padding="sm" title={title}>
      <ul className="space-y-1">
        {accounts.map((account) => (
          <li className="flex items-center gap-2 text-sm" key={account.id}>
            <Checkbox
              aria-label={account.name}
              checked={fanout.includes(account.id)}
              onChange={(event) =>
                onToggle((current) =>
                  toggleFanout(current, account.id, event.target.checked)
                )
              }
            />
            <span className="truncate">{account.name}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function DetailsPanel({ state }: { state: PageState }) {
  const {
    t,
    accountRegion,
    skillRegion,
    accounts,
    skills,
    routines,
    fanout,
    setFanout,
  } = state;
  return (
    <aside className="grid gap-3 border-b border-border p-3 md:grid-cols-2">
      <FanoutCard
        accounts={accounts}
        fanout={fanout}
        empty={accountRegion.empty}
        onToggle={setFanout}
        title={t("fanoutTitle")}
      />
      <SkillsCard
        empty={skillRegion.empty}
        routines={routines}
        skills={skills}
        title={skillRegion.title}
      />
      <ComputerCard state={state} />

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
    turnFailure,
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
    turnFailure,
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
