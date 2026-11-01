"use client";

import { fanoutTargets, type FanoutRoster } from "./fanout";
import { emptyPresence } from "./presence";
import { rosterEntries } from "./roster";
import { idle } from "./session";
import { sendOnce, type PermissionRequest, type TranscriptCard } from "./transcript";

import type { PageState } from "./page-state";
/** crypto.randomUUID is missing outside a secure context and this dashboard is
 *  served over plain http on the LAN, so fall back instead of throwing. */
function newId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Everything that belongs to one conversation, cleared before another starts.
 *  Permission cards go with it: a card from the previous bot is an answer aimed
 *  at a machine that is no longer on screen. */
const forgetConversation = (state: PageState) => {
  const {
    setPermissions,
    setCards,
    setCardState,
    setCardBusy,
    closedNowRef,
    setPermissionState,
    setHistoryUnavailable,
    setSession,
    setFanState,
    setUploadNote,
    presenceRef,
    setStatus,
    setRunState,
    setSendState,
    liveRef,
    reauthRef,
    setNeedsSignIn,
  } = state;

  state.generationRef.current += 1;
  liveRef.current = idle();
  setSession(liveRef.current);
  setFanState("");
  setUploadNote("");
  setSendState("idle");
  setNeedsSignIn(false);
  reauthRef.current = false;
  presenceRef.current = emptyPresence();
  setStatus("stale");
  setRunState("");
  setPermissions([]);
  setCards([]);
  setCardState("");
  setCardBusy(false);
  closedNowRef.current = [];
  setPermissionState("");
  setHistoryUnavailable(false);
};
export const switchAccount = (state: PageState, id: string) => {
  const {
    selectedAccount,
    setSelectedAccount,
    setRoster,
    setComputers,
    setSelectedBot,
    setSkills,
    setRoutines,
    setMessages,
    setRosterLoading,
  } = state;

  if (id === selectedAccount) return;
  setRosterLoading(id !== "");
  setRoster([]);
  setComputers([]);
  setSelectedBot("");
  setSkills([]);
  setRoutines([]);
  forgetConversation(state);
  setMessages([]);
  setSelectedAccount(id);
};
export const switchBot = (state: PageState, agentId: string) => {
  const { selectedAccount, setSelectedBot, setSkills, setRoutines, setMessages, shownByBotRef } =
    state;

  setSkills([]);
  setRoutines([]);
  forgetConversation(state);
  setMessages(shownByBotRef.current[`${selectedAccount}:${agentId}`] ?? []);
  setSelectedBot(agentId);
};
const postSend = (
  _state: PageState,
  account: string,
  agentId: string,
  text: string,
  messageId: string
) =>
  fetch(`/api/providers/${encodeURIComponent(account)}/grok-bot/send`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ agentId, text, messageId }),
  });
const postCard = async (state: PageState, path: string, body: Record<string, string | boolean>) => {
  const { selectedAccount, selectedBot } = state;

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
const finishCard = (
  state: PageState,
  card: { entryId: string },
  ok: boolean,
  close: boolean,
  generation: number
) => {
  if (state.generationRef.current !== generation) return;
  const { setCards, setCardState, setCardBusy, closedNowRef } = state;

  if (!ok) {
    setCardState("failed");
    setCardBusy(false);
    return;
  }
  setCardState("");
  setCardBusy(false);
  const identity = card.entryId;
  if (close && identity !== "") {
    closedNowRef.current = [...closedNowRef.current, identity];
  }
  setCards((held) =>
    state.generationRef.current === generation
      ? held.filter((item) => (item.entryId !== "" ? item.entryId : item.seq) !== identity)
      : held
  );
};
export const answerConnector = async (
  state: PageState,
  card: Extract<TranscriptCard, { kind: "connector" }>,
  resolution: string
) => {
  const { setCardBusy } = state;
  const generation = state.generationRef.current;

  setCardBusy(true);
  const ok = await postCard(state, "connector", {
    entryId: card.entryId,
    requestId: card.requestId,
    resolution,
  }).catch(() => false);
  finishCard(state, card, ok, true, generation);
};
export const answerWidget = async (
  state: PageState,
  card: Extract<TranscriptCard, { kind: "widget" }>,
  value: string
) => {
  const { setCardBusy } = state;
  const generation = state.generationRef.current;

  setCardBusy(true);
  const ok = await postCard(state, "widget", { entryId: card.entryId, value }).catch(() => false);
  finishCard(state, card, ok, false, generation);
};
export const dismissWidget = async (
  state: PageState,
  card: Extract<TranscriptCard, { kind: "widget" }>
) => {
  const { setCardBusy } = state;
  const generation = state.generationRef.current;

  setCardBusy(true);
  const ok = await postCard(state, "widget", { entryId: card.entryId, dismiss: true }).catch(
    () => false
  );
  finishCard(state, card, ok, true, generation);
};
export const answerSecret = async (
  state: PageState,
  card: Extract<TranscriptCard, { kind: "secret" }>,
  value: string
) => {
  const { setCardBusy } = state;
  const generation = state.generationRef.current;

  setCardBusy(true);
  const ok = await postCard(state, "secret", { entryId: card.entryId, value }).catch(() => false);
  finishCard(state, card, ok, true, generation);
};
export const discardDraft = async (
  state: PageState,
  card: Extract<TranscriptCard, { kind: "email" | "slack" }>
) => {
  const { setCardBusy } = state;
  const generation = state.generationRef.current;

  setCardBusy(true);
  const ok = await postCard(state, "draft", { entryId: card.entryId, kind: card.kind }).catch(
    () => false
  );
  finishCard(state, card, ok, true, generation);
};
export const answerPermission = async (
  state: PageState,
  request: PermissionRequest,
  resolution: string
) => {
  const { selectedAccount, selectedBot, setPermissions, setPermissionState } = state;

  if (!selectedAccount) return;
  const generation = state.generationRef.current;
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
    if (state.generationRef.current !== generation) return;
    if (response.status === 409) {
      // Already answered or expired upstream; the card is stale, so it goes.
      setPermissions((held) =>
        state.generationRef.current === generation
          ? held.filter((item) => item.requestId !== request.requestId)
          : held
      );
      setPermissionState("");
      return;
    }
    if (!response.ok) {
      setPermissionState("failed");
      return;
    }
    setPermissionState("answered");
    setPermissions((held) =>
      state.generationRef.current === generation
        ? held.filter((item) => item.requestId !== request.requestId)
        : held
    );
  } catch {
    if (state.generationRef.current === generation) setPermissionState("failed");
  }
};
const fanOutOther = async (state: PageState, text: string, others: string[]) => {
  const { roster, selectedBot } = state;

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
    const response = await postSend(state, target.account, target.agentId, text, newId()).catch(
      () => null
    );
    if (response?.ok) sent += 1;
  }
  // Counted against the accounts the user ticked, not against the ones we could
  // address: an account we skipped must not be reported as delivered.
  return { sent, total: others.length };
};
export const submit = (state: PageState) => {
  const {
    selectedAccount,
    selectedBot,
    fanout,
    setFanState,
    draft,
    setDraft,
    setSendState,
    selectionRef,
    pendingSendRef,
  } = state;

  const generation = state.generationRef.current;
  const text = draft;
  if (!selectedAccount || !selectedBot || text.trim() === "") return;
  const messageId = newId();
  pendingSendRef.current = messageId;
  setDraft("");
  setSendState("sending");
  const others = fanout.filter((account) => account !== selectedAccount);
  const origin = `${selectedAccount}:${selectedBot}`;
  void sendOnce(text, () =>
    postSend(state, selectedAccount, selectedBot, text, messageId)
      .then((response) => (response.ok ? "ok" : "failed") as "ok" | "failed")
      .catch(() => "failed" as const)
  ).then(async (result) => {
    const confirmed = result === "recorded";
    if (state.generationRef.current === generation && selectionRef.current === origin)
      setSendState(confirmed ? "submitted" : "unknown");
    if (others.length === 0) return;
    const { sent, total } = await fanOutOther(state, text, others);
    // The sentence claims every selected account; the account on screen is the
    // only one whose delivery was actually confirmed, so it counts too.
    if (state.generationRef.current !== generation || selectionRef.current !== origin) return;
    setFanState(confirmed && total > 0 && sent === total ? "done" : "partial");
  });
};
