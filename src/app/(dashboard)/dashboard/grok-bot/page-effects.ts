"use client";

import { useEffect, useEffectEvent } from "react";
import { grokBotComputers } from "./computers";
import { grokBotSkills, namedItems } from "./details";
import { openTranscript, transcriptStep } from "./open";
import { readPresence, statusOf } from "./presence";
import { grokBotAccounts } from "./regions";
import { rosterEntries } from "./roster";
import { isTerminal } from "./session";
import { readTranscriptStream } from "./stream";
import {
  liveRetry,
  localRowId,
  mergeTranscriptRows,
  nextTranscriptRequest,
  recordedSend,
  resumeTranscript,
  transcriptDeletionMatches,
  type TranscriptCard,
  type TranscriptItem,
} from "./transcript";

import type { PageState } from "./page-state";
import type { TranscriptCursor } from "./transcript";
export function useAccounts(state: PageState) {
  const { setAccounts } = state;

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
  }, [setAccounts]);
}
export function useRoster(state: PageState) {
  const {
    selectedAccount,

    setConnectionUpdatedAt,

    setRoster,
    setComputers,
    setRosterLoading,
  } = state;

  useEffect(() => {
    if (!selectedAccount) return;
    const controller = new AbortController();
    fetch(`/api/providers/${selectedAccount}/grok-bot`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : { roster: [] }))
      .then((data) => {
        if (controller.signal.aborted) return;
        setRoster(rosterEntries(data?.roster));
        setComputers(grokBotComputers(data));
        setConnectionUpdatedAt(
          typeof data?.connectionUpdatedAt === "string" ? data.connectionUpdatedAt : ""
        );
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (controller.signal.aborted) return;
        setRoster([]);
        setComputers([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setRosterLoading(false);
      });
    return () => controller.abort();
  }, [selectedAccount, setRoster, setComputers, setConnectionUpdatedAt, setRosterLoading]);
}
export function useBotDetails(state: PageState) {
  const { selectedAccount, selectedBot, setSkills, setRoutines } = state;

  useEffect(() => {
    if (!selectedAccount || !selectedBot) return;
    const controller = new AbortController();
    const query = new URLSearchParams({ agentId: selectedBot });
    fetch(`/api/providers/${selectedAccount}/grok-bot?${query}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : { skills: [], routines: [] }))
      .then((data) => {
        if (controller.signal.aborted) return;
        setSkills(grokBotSkills(data));
        setRoutines(namedItems(data?.routines));
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (controller.signal.aborted) return;
        setSkills([]);
        setRoutines([]);
      });
    return () => controller.abort();
  }, [selectedAccount, selectedBot, setSkills, setRoutines]);
}
type StreamView = { request: TranscriptCursor; shown: TranscriptItem[] };
type FrameState = Pick<
  PageState,
  | "selectedAccount"
  | "selectedBot"
  | "setMessages"
  | "setPermissions"
  | "setCards"
  | "closedNowRef"
  | "setHistoryUnavailable"
  | "presenceRef"
  | "setStatus"
  | "setRunState"
  | "setSendState"
  | "setTurnFailure"
  | "connectionUpdatedAt"
  | "turnFailureKeyRef"
  | "apply"
  | "pendingSendRef"
  | "rememberedRef"
  | "shownByBotRef"
  | "nextStableRef"
>;
type DeletedRow = { entryId: string; seq: string };

const botKey = (state: { selectedAccount: string; selectedBot: string }) =>
  `${state.selectedAccount}:${state.selectedBot}`;

/** A replaced session leaves nothing from before it on screen, notices included. */
function applyClearedFrame(state: FrameState, stream: StreamView, next: { cleared?: boolean }) {
  if (!next.cleared) return;
  stream.shown = [];
  state.shownByBotRef.current[botKey(state)] = [];
  state.setMessages([]);
  state.setCards([]);
  state.setPermissions([]);
  state.setHistoryUnavailable(false);
  state.setTurnFailure("");
  state.closedNowRef.current = [];
}

/** A row the service deleted has to leave every collection it could appear in. */
function applyDeletedRows(state: FrameState, stream: StreamView, next: { deleted: DeletedRow[] }) {
  if (next.deleted.length === 0) return;
  const removed = (item: DeletedRow) => transcriptDeletionMatches(next.deleted, item);
  stream.shown = stream.shown.filter((item) => !removed(item));
  state.shownByBotRef.current[botKey(state)] = stream.shown;
  state.setMessages(stream.shown);
  state.setCards((held) => held.filter((item) => !removed(item)));
  state.setPermissions((held) => held.filter((item) => !removed(item)));
}

/** A reason describes one turn: another turn, or another bot, must not inherit it. */
function applyTurnFailure(state: FrameState, next: { turnFailure?: string }) {
  const key = botKey(state);
  if (next.turnFailure !== undefined) {
    state.turnFailureKeyRef.current = key;
    state.setTurnFailure(next.turnFailure);
    return;
  }
  if (state.turnFailureKeyRef.current === "" || state.turnFailureKeyRef.current === key) return;
  state.turnFailureKeyRef.current = "";
  state.setTurnFailure("");
}

function mergeCards(state: FrameState, next: { cards: TranscriptCard[] }) {
  if (next.cards.length === 0) return;
  state.setCards((held) => {
    const merged = [...held];
    for (const card of next.cards) {
      const identity = card.entryId !== "" ? card.entryId : card.seq;
      if (state.closedNowRef.current.includes(identity)) continue;
      const index = merged.findIndex(
        (current) => (current.entryId !== "" ? current.entryId : current.seq) === identity
      );
      if (index >= 0) merged[index] = card;
      else merged.push(card);
    }
    return merged;
  });
}

/** Gives every arriving row its local id, then folds it into what is on screen. */
function applyVisibleRows(
  state: FrameState,
  stream: StreamView,
  next: { visible: TranscriptItem[] }
) {
  if (next.visible.length === 0) return;
  const scoped: TranscriptItem[] = [];
  for (const [index] of next.visible.entries()) {
    const named = localRowId(
      stream.shown,
      next.visible,
      index,
      state.nextStableRef.current,
      botKey(state)
    );
    state.nextStableRef.current = named.next;
    scoped.push(named.item);
  }
  stream.shown = mergeTranscriptRows(stream.shown, scoped);
  state.shownByBotRef.current[botKey(state)] = stream.shown;
  state.setMessages(stream.shown);
  if (next.visible.some((item) => recordedSend(state.pendingSendRef.current, item))) {
    state.setSendState("recorded");
  }
}

function rememberCursor(
  state: FrameState,
  stream: StreamView,
  next: { phase: "snapshot" | "live"; after: string; generation?: number }
) {
  stream.request = { phase: next.phase, after: next.after, generation: next.generation };
  state.rememberedRef.current[botKey(state)] = {
    after: stream.request.after,
    generation: next.generation,
    // The connection's timestamp is what decides whether a resumed cursor still belongs
    // to this connection; without it every resume fell back to a snapshot.
    seenAt: state.connectionUpdatedAt,
    messages: stream.shown,
  };
}

function handleFrame(
  state: FrameState,
  stream: StreamView,
  frame: unknown,
  cursor: TranscriptCursor
) {
  if (state.selectedBot) state.apply({ type: "frame" });
  const seen = readPresence(frame, Date.now());
  state.presenceRef.current = { ...state.presenceRef.current, ...seen };
  state.setStatus(statusOf(state.presenceRef.current, Date.now(), state.selectedBot));
  if (seen.runState !== undefined) state.setRunState(seen.runState);
  const next = nextTranscriptRequest(cursor, frame);
  applyClearedFrame(state, stream, next);
  applyDeletedRows(state, stream, next);
  applyTurnFailure(state, next);
  if (next.permissions.length > 0) state.setPermissions(next.permissions);
  mergeCards(state, next);
  if (next.historyUnavailable) state.setHistoryUnavailable(true);
  applyVisibleRows(state, stream, next);
  rememberCursor(state, stream, next);
  if (next.halt) {
    // The service replaced the session in a way this reader cannot continue from.
    // Reporting a cutover would leave the console looking like a live stream that
    // simply went quiet, so the page moves to its lost state and offers a retry.
    state.apply({ type: "fault" });
  } else if (next.stop) {
    state.apply({ type: "cutover" });
  }
  // open.ts builds the next cursor from this step, so the generation has to travel with
  // it; dropping it here is what made every request after the handover fail.
  return transcriptStep(next);
}

function startTranscript(state: PageState) {
  const {
    selectedAccount,
    connectionUpdatedAt,
    selectedBot,
    setWindowSize,
    setCards,
    presenceRef,
    setStatus,
    liveRef,
    reauthRef,
    selectionRef,
    setNeedsSignIn,
    apply,
    rememberedRef,
    shownByBotRef,
  } = state;

  if (!selectedAccount || !selectedBot) return;
  const resumed = resumeTranscript(
    rememberedRef.current,
    selectedAccount,
    selectedBot,
    connectionUpdatedAt
  );
  setCards(resumed.cards);
  reauthRef.current = false;
  selectionRef.current = `${selectedAccount}:${selectedBot}`;
  setWindowSize(40);
  apply({ type: "select", resume: resumed.phase === "live" ? "live" : "snapshot" });
  const stream: StreamView = {
    request: { phase: resumed.phase, after: resumed.after, generation: resumed.generation },
    shown: shownByBotRef.current[`${selectedAccount}:${selectedBot}`] ?? [],
  };
  const opened = openTranscript({
    request: stream.request,
    read: (cursor, signal) =>
      readTranscriptStream(selectedAccount, selectedBot, cursor, signal, {
        onReauth: () => {
          reauthRef.current = true;
        },
      }),
    onFrame: (frame, cursor) => handleFrame(state, stream, frame, cursor),
    onFault: () => apply({ type: "fault" }),
    retryWait: (fails, livedMs, kind) => {
      if (reauthRef.current) {
        setNeedsSignIn(true);
        apply({ type: "fault" });
        return -1;
      }
      if (kind === "drop") apply({ type: "close", livedMs, nowMs: Date.now() });
      else apply({ type: "hold" });
      if (isTerminal(liveRef.current)) return -1;
      return liveRetry(stream.request.after, fails).wait;
    },
  });
  const ageing = setInterval(
    () => setStatus(statusOf(presenceRef.current, Date.now(), selectedBot)),
    15_000
  );
  return () => {
    clearInterval(ageing);
    opened.abort();
  };
}
export function useLiveTranscript(state: PageState) {
  const { selectedAccount, selectedBot, retryNonce, connectionUpdatedAt } = state;
  // Only selection, explicit retry, or connection revision starts a subscription.
  // The event captures the corresponding render's state without treating message
  // and card updates as new subscriptions. startTranscript owns its cleanup.
  const start = useEffectEvent(() => startTranscript(state));
  useEffect(() => start(), [selectedAccount, selectedBot, retryNonce, connectionUpdatedAt]);
}
