"use client";

import { Card } from "@/shared/components";
import { useTranslations } from "next-intl";
import { grokBotComputers, type GrokBotComputer } from "./computers";
import { rosterEntries, type GrokBotRosterEntry } from "./roster";
import { grokBotSkills, namedItems, type GrokBotRoutine, type GrokBotSkill } from "./details";
import { openTranscript } from "./open";
import {
  liveRetry,
  nextTranscriptRequest,
  recordedSend,
  resumeTranscript,
  mergeTranscriptRows,
  localRowId,
  sendOnce,
  type PermissionRequest,
  type TranscriptItem,
  type TranscriptCard,
} from "./transcript";
import { fanoutTargets, toggleFanout, type FanoutRoster } from "./fanout";
import { emptyPresence, readPresence, statusOf, type Presence } from "./presence";
import { idle, isTerminal, reduce, type SessionState } from "./session";
import { grokBotAccounts, grokBotRegions, statusKey } from "./regions";
import {
  AccountsPanel,
  ComputersPanel,
  ConsoleBar,
  ConversationPanel,
  RosterPanel,
  SkillsPanel,
  type Translate,
} from "./panels";
import { readTranscriptStream } from "./stream";
import { useEffect, useRef, useState } from "react";

export { grokBotAccounts, grokBotRegions } from "./regions";

/** crypto.randomUUID is missing outside a secure context and this dashboard is
 *  served over plain http on the LAN, so fall back instead of throwing. */
function newId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export default function GrokBotPage() {
  const t = useTranslations("grokBotPage");
  const regions = grokBotRegions((key) => t(key));
  const accountRegion = regions.find((region) => region.id === "accounts") ?? regions[0];
  const rosterRegion = regions.find((region) => region.id === "roster") ?? regions[1];
  const conversationRegion = regions.find((region) => region.id === "conversation") ?? regions[2];
  const skillRegion = regions.find((region) => region.id === "skills") ?? regions[3];
  const computerRegion = regions.find((region) => region.id === "computers") ?? regions[4];
  const [accounts, setAccounts] = useState<Array<{ id: string; name: string; email: string }>>([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [connectionUpdatedAt, setConnectionUpdatedAt] = useState("");
  const [roster, setRoster] = useState<GrokBotRosterEntry[]>([]);
  const [computers, setComputers] = useState<GrokBotComputer[]>([]);
  const [selectedBot, setSelectedBot] = useState("");
  const [skills, setSkills] = useState<GrokBotSkill[]>([]);
  const [routines, setRoutines] = useState<GrokBotRoutine[]>([]);
  const [messages, setMessages] = useState<TranscriptItem[]>([]);
  const [windowSize, setWindowSize] = useState(40);
  const [rosterLoading, setRosterLoading] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [permissions, setPermissions] = useState<PermissionRequest[]>([]);
  const [cards, setCards] = useState<TranscriptCard[]>([]);
  const [cardState, setCardState] = useState("");
  const [cardBusy, setCardBusy] = useState(false);
  const [closedCards, setClosedCards] = useState<string[]>([]);
  const closedNow = useRef<string[]>([]);
  const [permissionState, setPermissionState] = useState("");
  const [historyUnavailable, setHistoryUnavailable] = useState(false);
  const [session, setSession] = useState<SessionState>(idle());
  const [retryNonce, setRetryNonce] = useState(0);
  const [fanout, setFanout] = useState<string[]>([]);
  const [fanState, setFanState] = useState<"" | "done" | "partial">("");
  const [uploadNote, setUploadNote] = useState("");
  const presence = useRef<Presence>(emptyPresence());
  const [status, setStatus] = useState<"running" | "idle" | "stale">("stale");
  const [runState, setRunState] = useState("");
  const [draft, setDraft] = useState("");
  const [sendState, setSendState] = useState("");
  const live = useRef<SessionState>(idle());
  const reauth = useRef(false);
  const selection = useRef("");
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const apply = (event: Parameters<typeof reduce>[1]) => {
    live.current = reduce(live.current, event);
    setSession(live.current);
  };
  const blocked = session.phase === "stalled";
  const linkLost = session.phase === "lost";
  const pendingSend = useRef("");
  const remembered = useRef<Record<string, { after: string; messages: TranscriptItem[] }>>({});
  const shownByBot = useRef<Record<string, TranscriptItem[]>>({});
  const nextStable = useRef(0);

  /** Everything that belongs to one conversation, cleared before another starts.
   *  Permission cards go with it: a card from the previous bot is an answer aimed
   *  at a machine that is no longer on screen. */
  const forgetConversation = () => {
    live.current = idle();
    setSession(live.current);
    setFanState("");
    setUploadNote("");
    setSendState("idle");
    setNeedsSignIn(false);
    reauth.current = false;
    presence.current = emptyPresence();
    setStatus("stale");
    setRunState("");
    setPermissions([]);
    setCards([]);
    setCardState("");
    setCardBusy(false);
    setClosedCards([]);
    closedNow.current = [];
    setPermissionState("");
    setHistoryUnavailable(false);
  };

  const switchAccount = (id: string) => {
    setRoster([]);
    setComputers([]);
    setSelectedBot("");
    setSkills([]);
    setRoutines([]);
    forgetConversation();
    setMessages([]);
    setSelectedAccount(id);
  };

  const switchBot = (agentId: string) => {
    setSkills([]);
    setRoutines([]);
    forgetConversation();
    const resumed = resumeTranscript(
      remembered.current,
      selectedAccount,
      agentId,
      connectionUpdatedAt
    );
    setMessages(shownByBot.current[`${selectedAccount}:${agentId}`] ?? []);
    setSelectedBot(agentId);
  };

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/providers", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : { connections: [] }))
      .then((data) => {
        const connections = Array.isArray(data?.connections) ? data.connections : [];
        setAccounts(grokBotAccounts(connections));
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setAccounts([]);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!selectedAccount) return;
    const controller = new AbortController();
    setRosterLoading(true);
    fetch(`/api/providers/${selectedAccount}/grok-bot`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : { roster: [] }))
      .then((data) => {
        setRoster(rosterEntries(data?.roster));
        setComputers(grokBotComputers(data));
        setConnectionUpdatedAt(typeof data?.connectionUpdatedAt === "string" ? data.connectionUpdatedAt : "");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setRoster([]);
        setComputers([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setRosterLoading(false);
      });
    return () => controller.abort();
  }, [selectedAccount]);

  useEffect(() => {
    if (!selectedAccount || !selectedBot) return;
    const controller = new AbortController();
    const query = new URLSearchParams({ agentId: selectedBot });
    fetch(`/api/providers/${selectedAccount}/grok-bot?${query}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : { skills: [], routines: [] }))
      .then((data) => {
        setSkills(grokBotSkills(data));
        setRoutines(namedItems(data?.routines));
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setSkills([]);
        setRoutines([]);
      });
    return () => controller.abort();
  }, [selectedAccount, selectedBot]);

  useEffect(() => {
    if (!selectedAccount || !selectedBot) return;
    const resumed = resumeTranscript(
      remembered.current,
      selectedAccount,
      selectedBot,
      connectionUpdatedAt
    );
    setCards(resumed.cards);
    reauth.current = false;
    selection.current = `${selectedAccount}:${selectedBot}`;
    setWindowSize(40);
    apply({ type: "select", resume: resumed.phase === "live" ? "live" : "snapshot" });
    let request = { phase: resumed.phase, after: resumed.after };
    let shown = shownByBot.current[`${selectedAccount}:${selectedBot}`] ?? [];
    const opened = openTranscript({
      request,
      read: (cursor, signal) =>
        readTranscriptStream(selectedAccount, selectedBot, cursor, signal, {
          onReauth: () => {
            reauth.current = true;
          },
        }),
      onFrame: (frame, cursor) => {
        if (selectedBot) apply({ type: "frame" });
        const seen = readPresence(frame, Date.now());
        presence.current = { ...presence.current, ...seen };
        setStatus(statusOf(presence.current, Date.now(), selectedBot));
        if (seen.runState !== undefined) setRunState(seen.runState);
        const next = nextTranscriptRequest(cursor, frame);
        if (next.permissions.length > 0) setPermissions(next.permissions);
        if (next.cards.length > 0) {
          setCards((held) => {
            const merged = [...held];
            for (const card of next.cards) {
              const identity = card.entryId !== "" ? card.entryId : card.seq;
              if (closedNow.current.includes(identity)) continue;
              const index = merged.findIndex(
                (current) => (current.entryId !== "" ? current.entryId : current.seq) === identity
              );
              if (index >= 0) merged[index] = card;
              else merged.push(card);
            }
            return merged;
          });
        }
        if (next.historyUnavailable) setHistoryUnavailable(true);
        if (next.visible.length > 0) {
          const scoped: TranscriptItem[] = [];
          for (const [index] of next.visible.entries()) {
            const named = localRowId(shown, next.visible, index, nextStable.current, `${selectedAccount}:${selectedBot}`);
            nextStable.current = named.next;
            scoped.push(named.item);
          }
          shown = mergeTranscriptRows(shown, scoped);
          shownByBot.current[`${selectedAccount}:${selectedBot}`] = shown;
          setMessages(shown);
          if (next.visible.some((item) => recordedSend(pendingSend.current, item))) {
            setSendState("recorded");
          }
        }
        request = { phase: next.phase, after: next.after };
        remembered.current[`${selectedAccount}:${selectedBot}`] = {
          after: request.after,
          seenAt: connectionUpdatedAt,
        };
        if (next.stop) apply({ type: "cutover" });
        return { phase: next.phase, after: next.after, stop: next.stop };
      },
      onFault: () => apply({ type: "fault" }),
      retryWait: (fails, livedMs, kind) => {
        if (reauth.current) {
          setNeedsSignIn(true);
          apply({ type: "fault" });
          return -1;
        }
        if (kind === "drop") apply({ type: "close", livedMs, nowMs: Date.now() });
        else apply({ type: "hold" });
        if (isTerminal(live.current)) return -1;
        return liveRetry(request.after, fails).wait;
      },
    });
    const ageing = setInterval(
      () => setStatus(statusOf(presence.current, Date.now(), selectedBot)),
      15_000
    );
    return () => {
      clearInterval(ageing);
      opened.abort();
    };
  }, [selectedAccount, selectedBot, retryNonce]);

  const postSend = (account: string, agentId: string, text: string, messageId: string) =>
    fetch(`/api/providers/${encodeURIComponent(account)}/grok-bot/send`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ agentId, text, messageId }),
    });

  const postCard = async (path: string, body: Record<string, string | boolean>) => {
    if (!selectedAccount) return false;
    const response = await fetch(
      `/api/providers/${encodeURIComponent(selectedAccount)}/grok-bot/${path}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ agentId: selectedBot, ...body }),
      }
    );
    return response.ok;
  };

  const finishCard = (card: { entryId: string }, ok: boolean, close: boolean) => {
    if (!ok) {
      setCardState("failed");
      setCardBusy(false);
      return;
    }
    setCardState("");
    setCardBusy(false);
    const identity = card.entryId !== "" ? card.entryId : card.seq;
    if (close && identity !== "") {
      closedNow.current = [...closedNow.current, identity];
      setClosedCards(closedNow.current);
    }
    setCards((held) => held.filter((item) => (item.entryId !== "" ? item.entryId : item.seq) !== identity));
  };

  const answerConnector = async (
    card: Extract<TranscriptCard, { kind: "connector" }>,
    resolution: string
  ) => {
    setCardBusy(true);
    const ok = await postCard("connector", {
      entryId: card.entryId,
      requestId: card.requestId,
      resolution,
    }).catch(() => false);
    finishCard(card, ok, true);
  };

  const answerWidget = async (
    card: Extract<TranscriptCard, { kind: "widget" }>,
    value: string
  ) => {
    setCardBusy(true);
    const ok = await postCard("widget", { entryId: card.entryId, value }).catch(() => false);
    finishCard(card, ok, false);
  };

  const dismissWidget = async (card: Extract<TranscriptCard, { kind: "widget" }>) => {
    setCardBusy(true);
    const ok = await postCard("widget", { entryId: card.entryId, dismiss: true }).catch(() => false);
    finishCard(card, ok, true);
  };

  const answerSecret = async (
    card: Extract<TranscriptCard, { kind: "secret" }>,
    value: string
  ) => {
    setCardBusy(true);
    const ok = await postCard("secret", { entryId: card.entryId, value }).catch(() => false);
    finishCard(card, ok, true);
  };

  const discardDraft = async (card: Extract<TranscriptCard, { kind: "email" | "slack" }>) => {
    setCardBusy(true);
    const ok = await postCard("draft", { entryId: card.entryId, kind: card.kind }).catch(() => false);
    finishCard(card, ok, true);
  };

  const answerPermission = async (request: PermissionRequest, resolution: string) => {
    if (!selectedAccount) return;
    setPermissionState("sending");
    try {
      const response = await fetch(
        `/api/providers/${encodeURIComponent(selectedAccount)}/grok-bot/permission`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            agentId: selectedBot,
            entryId: request.entryId,
            requestId: request.requestId,
            resolution,
          }),
        }
      );
      if (response.status === 409) {
        // Already answered or expired upstream; the card is stale, so it goes.
        setPermissions((held) => held.filter((item) => item.requestId !== request.requestId));
        setPermissionState("");
        return;
      }
      if (!response.ok) {
        setPermissionState("failed");
        return;
      }
      setPermissionState("answered");
      setPermissions((held) => held.filter((item) => item.requestId !== request.requestId));
    } catch {
      setPermissionState("failed");
    }
  };

  const fanOutOther = async (text: string, others: string[]) => {
    const preferred = roster.find((bot) => bot.agentId === selectedBot)?.name ?? "";
    const rosters: FanoutRoster[] = [];
    for (const account of others) {
      try {
        const response = await fetch(`/api/providers/${account}/grok-bot`);
        if (!response.ok) continue;
        const data = (await response.json()) as { roster?: unknown };
        rosters.push({
          account,
          bots: rosterEntries(data.roster).map(({ agentId, name }) => ({ agentId, name })),
        });
      } catch {
        /* an account whose roster cannot be read is skipped */
      }
    }
    const targets = fanoutTargets(rosters, preferred).slice(0, 8);
    let sent = 0;
    for (const target of targets) {
      const response = await postSend(target.account, target.agentId, text, newId()).catch(
        () => null
      );
      if (response?.ok) sent += 1;
    }
    // Counted against the accounts the user ticked, not against the ones we could
    // address: an account we skipped must not be reported as delivered.
    return { sent, total: others.length };
  };

  const submit = () => {
    const text = draft;
    if (!selectedAccount || !selectedBot || text.trim() === "") return;
    const messageId = newId();
    pendingSend.current = messageId;
    setDraft("");
    setSendState("sending");
    const others = fanout.filter((account) => account !== selectedAccount);
    const origin = `${selectedAccount}:${selectedBot}`;
    void sendOnce(text, () =>
      postSend(selectedAccount, selectedBot, text, messageId)
        .then((response) => (response.ok ? "ok" : "failed") as "ok" | "failed")
        .catch(() => "failed" as const)
    ).then(async (result) => {
      const confirmed = result === "recorded";
      if (selection.current === origin) setSendState(confirmed ? "submitted" : "unknown");
      if (others.length === 0) return;
      const { sent, total } = await fanOutOther(text, others);
      // The sentence claims every selected account; the account on screen is the
      // only one whose delivery was actually confirmed, so it counts too.
      if (selection.current !== origin) return;
      setFanState(confirmed && total > 0 && sent === total ? "done" : "partial");
    });
  };

  return (
    <div className="flex h-[calc(100vh-11rem)] min-h-[32rem] flex-col">
      <ConsoleBar
        accounts={accounts}
        chiefLabel={t("chiefOfStaff")}
        onAccount={switchAccount}
        onBot={switchBot}
        onToggleDetails={() => setDetailsOpen((open) => !open)}
        roster={roster}
        rosterLoading={rosterLoading}
        selectedAccount={selectedAccount}
        selectedBot={selectedBot}
        stateLabel={t(statusKey(status))}
        t={t as Translate}
      />
      {detailsOpen ? (
        <aside className="grid gap-3 border-b border-border p-3 md:grid-cols-2">
          <Card icon="badge" padding="sm" title={t("fanoutTitle")}>
            {accounts.length > 0 ? (
              <ul className="space-y-1">
                {accounts.map((account) => (
                  <li className="flex items-center gap-2 text-sm" key={account.id}>
                    <input
                      aria-label={account.name}
                      checked={fanout.includes(account.id)}
                      onChange={(event) =>
                        setFanout((current) =>
                          toggleFanout(current, account.id, event.target.checked, account.email ?? "")
                        )
                      }
                      type="checkbox"
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
            <a className="text-sm text-primary underline" href="https://x.ai/bot/marketplace" rel="noreferrer" target="_blank">
              x.ai/bot/marketplace
            </a>
            <p className="mt-2 text-xs text-text-muted">{t("marketplaceNote")}</p>
          </Card>
        </aside>
      ) : null}
      <Card
        className="flex min-h-0 min-w-0 flex-1 flex-col [&>div:last-child]:flex [&>div:last-child]:min-h-0 [&>div:last-child]:flex-1 [&>div:last-child]:flex-col"
        icon="chat"
        padding="none"
        title={conversationRegion.title}
      >
        {selectedBot ? (
          <ConversationPanel
            handlers={{
              onAnswer: (item, resolution) => void answerPermission(item, resolution),
              onConnector: (card, resolution) => void answerConnector(card, resolution),
              onWidget: (card, value) => void answerWidget(card, value),
              onDismissWidget: (card) => void dismissWidget(card),
              onSecret: (card, value) => void answerSecret(card, value),
              onDiscardDraft: (card) => void discardDraft(card),
              onDraft: setDraft,
              onRetry: () => {
                live.current = idle();
                setSession(live.current);
                setRetryNonce((count) => count + 1);
              },
              onOlder: () => setWindowSize((size) => size + 40),
              onSubmit: submit,
              onUpload: (name) => setUploadNote(t("attachUnavailable", { name })),
            }}
            state={{
              blocked,
              computers,
              draft,
              fanState,
              uploadNote,
              historyUnavailable,
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
            }}
            t={t as Translate}
          />
        ) : (
          <p className="px-6 py-8 text-sm text-text-muted">{conversationRegion.empty}</p>
        )}
      </Card>
    </div>
  );
}
