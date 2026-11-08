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
function handleFrame(
  state: FrameState,
  stream: StreamView,
  frame: unknown,
  cursor: TranscriptCursor
) {
  const {
    selectedAccount,
    selectedBot,
    setMessages,
    setPermissions,
    setCards,
    closedNowRef,
    setHistoryUnavailable,
    presenceRef,
    setStatus,
    setRunState,
    setSendState,
    setTurnFailure,
    connectionUpdatedAt,
    apply,
    pendingSendRef,
    rememberedRef,
    shownByBotRef,
    nextStableRef,
    turnFailureKeyRef,
  } = state;

  if (selectedBot) apply({ type: "frame" });
  const seen = readPresence(frame, Date.now());
  presenceRef.current = { ...presenceRef.current, ...seen };
  setStatus(statusOf(presenceRef.current, Date.now(), selectedBot));
  if (seen.runState !== undefined) setRunState(seen.runState);
  const next = nextTranscriptRequest(cursor, frame);
  if (next.cleared) {
    // The session was replaced, so nothing from before the reset belongs on screen —
    // including the notices and dismissed cards that described the old one.
    stream.shown = [];
    shownByBotRef.current[`${selectedAccount}:${selectedBot}`] = [];
    setMessages([]);
    setCards([]);
    setPermissions([]);
    setHistoryUnavailable(false);
    setTurnFailure("");
    closedNowRef.current = [];
  }
  if (next.deleted.length > 0) {
    // A row the service deleted has to leave every collection it could appear in.
    const removed = (item: { entryId: string; seq: string }) =>
      transcriptDeletionMatches(next.deleted, item);
    stream.shown = stream.shown.filter((item) => !removed(item));
    shownByBotRef.current[`${selectedAccount}:${selectedBot}`] = stream.shown;
    setMessages(stream.shown);
    setCards((held) => held.filter((item) => !removed(item)));
    setPermissions((held) => held.filter((item) => !removed(item)));
  }
  // A reason describes one turn: starting another turn, or watching a different bot,
  // must not leave the previous one's text on screen.
  const turnFailureKey = `${selectedAccount}:${selectedBot}`;
  if (next.turnFailure !== undefined) {
    turnFailureKeyRef.current = turnFailureKey;
    setTurnFailure(next.turnFailure);
  } else if (turnFailureKeyRef.current !== "" && turnFailureKeyRef.current !== turnFailureKey) {
    turnFailureKeyRef.current = "";
    setTurnFailure("");
  }
  if (next.permissions.length > 0) setPermissions(next.permissions);
  if (next.cards.length > 0) {
    setCards((held) => {
      const merged = [...held];
      for (const card of next.cards) {
        const identity = card.entryId !== "" ? card.entryId : card.seq;
        if (closedNowRef.current.includes(identity)) continue;
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
      const named = localRowId(
        stream.shown,
        next.visible,
        index,
        nextStableRef.current,
        `${selectedAccount}:${selectedBot}`
      );
      nextStableRef.current = named.next;
      scoped.push(named.item);
    }
    stream.shown = mergeTranscriptRows(stream.shown, scoped);
    shownByBotRef.current[`${selectedAccount}:${selectedBot}`] = stream.shown;
    setMessages(stream.shown);
    if (next.visible.some((item) => recordedSend(pendingSendRef.current, item))) {
      setSendState("recorded");
    }
  }
  stream.request = { phase: next.phase, after: next.after, generation: next.generation };
  rememberedRef.current[`${selectedAccount}:${selectedBot}`] = {
    after: stream.request.after,
    generation: next.generation,
    // The connection's timestamp is what decides whether a resumed cursor still
    // belongs to this connection; without it every resume fell back to a snapshot.
    seenAt: connectionUpdatedAt,
    messages: stream.shown,
  };
  if (next.halt) {
    // The service replaced the session in a way this reader cannot continue from.
    // Reporting a cutover would leave the console looking like a live stream that
    // simply went quiet, so the page moves to its lost state and offers a retry.
    apply({ type: "fault" });
  } else if (next.stop) {
    apply({ type: "cutover" });
  }
  // open.ts builds the next cursor from this step, so the generation has to travel
  // with it; dropping it here is what made every request after the handover fail.
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
