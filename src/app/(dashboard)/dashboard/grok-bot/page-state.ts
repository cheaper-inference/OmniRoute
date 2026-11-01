"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { type GrokBotComputer } from "./computers";
import { type GrokBotRoutine, type GrokBotSkill } from "./details";
import { emptyPresence, type Presence } from "./presence";
import { grokBotRegions } from "./regions";
import { type GrokBotRosterEntry } from "./roster";
import { idle, reduce, type SessionState } from "./session";
import { type PermissionRequest, type TranscriptCard, type TranscriptItem } from "./transcript";

function useRegionLabels() {
  const t = useTranslations("grokBotPage");
  const regions = grokBotRegions((key) => t(key));
  const accountRegion = regions.find((region) => region.id === "accounts") ?? regions[0];
  const conversationRegion = regions.find((region) => region.id === "conversation") ?? regions[2];
  const skillRegion = regions.find((region) => region.id === "skills") ?? regions[3];
  const computerRegion = regions.find((region) => region.id === "computers") ?? regions[4];
  return { t, regions, accountRegion, conversationRegion, skillRegion, computerRegion };
}
function useAccountSelection() {
  const [accounts, setAccounts] = useState<Array<{ id: string; name: string; email: string }>>([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [connectionUpdatedAt, setConnectionUpdatedAt] = useState("");
  const [roster, setRoster] = useState<GrokBotRosterEntry[]>([]);
  const [computers, setComputers] = useState<GrokBotComputer[]>([]);
  const [selectedBot, setSelectedBot] = useState("");
  const [skills, setSkills] = useState<GrokBotSkill[]>([]);
  const [routines, setRoutines] = useState<GrokBotRoutine[]>([]);
  const [rosterLoading, setRosterLoading] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  return {
    accounts,
    setAccounts,
    selectedAccount,
    setSelectedAccount,
    connectionUpdatedAt,
    setConnectionUpdatedAt,
    roster,
    setRoster,
    computers,
    setComputers,
    selectedBot,
    setSelectedBot,
    skills,
    setSkills,
    routines,
    setRoutines,
    rosterLoading,
    setRosterLoading,
    detailsOpen,
    setDetailsOpen,
  };
}
function useTranscriptCards() {
  const [messages, setMessages] = useState<TranscriptItem[]>([]);
  const [windowSize, setWindowSize] = useState(40);
  const [permissions, setPermissions] = useState<PermissionRequest[]>([]);
  const [cards, setCards] = useState<TranscriptCard[]>([]);
  const [cardState, setCardState] = useState("");
  const [cardBusy, setCardBusy] = useState(false);
  const closedNowRef = useRef<string[]>([]);
  const [permissionState, setPermissionState] = useState("");
  const [historyUnavailable, setHistoryUnavailable] = useState(false);
  const rememberedRef = useRef<Record<string, { after: string; messages: TranscriptItem[] }>>({});
  const shownByBotRef = useRef<Record<string, TranscriptItem[]>>({});
  const nextStableRef = useRef(0);
  return {
    messages,
    setMessages,
    windowSize,
    setWindowSize,
    permissions,
    setPermissions,
    cards,
    setCards,
    cardState,
    setCardState,
    cardBusy,
    setCardBusy,
    closedNowRef,
    permissionState,
    setPermissionState,
    historyUnavailable,
    setHistoryUnavailable,
    rememberedRef,
    shownByBotRef,
    nextStableRef,
  };
}
function useSessionStatus() {
  const [session, setSession] = useState<SessionState>(idle());
  const [retryNonce, setRetryNonce] = useState(0);
  const presenceRef = useRef<Presence>(emptyPresence());
  const [status, setStatus] = useState<"running" | "idle" | "stale">("stale");
  const [runState, setRunState] = useState("");
  const liveRef = useRef<SessionState>(idle());
  const reauthRef = useRef(false);
  const selectionRef = useRef("");
  const generationRef = useRef(0);
  useEffect(
    () => () => {
      generationRef.current += 1;
    },
    []
  );
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const apply = useCallback(
    (event: Parameters<typeof reduce>[1]) => {
      liveRef.current = reduce(liveRef.current, event);
      setSession(liveRef.current);
    },
    [setSession]
  );
  const blocked = session.phase === "stalled";
  const linkLost = session.phase === "lost";
  return {
    session,
    setSession,
    retryNonce,
    setRetryNonce,
    presenceRef,
    status,
    setStatus,
    runState,
    setRunState,
    liveRef,
    reauthRef,
    selectionRef,
    generationRef,
    needsSignIn,
    setNeedsSignIn,
    apply,
    blocked,
    linkLost,
  };
}
function useDeliveryState() {
  const [fanout, setFanout] = useState<string[]>([]);
  const [fanState, setFanState] = useState<"" | "done" | "partial">("");
  const [uploadNote, setUploadNote] = useState("");
  const [draft, setDraft] = useState("");
  const [sendState, setSendState] = useState("");
  const pendingSendRef = useRef("");
  return {
    fanout,
    setFanout,
    fanState,
    setFanState,
    uploadNote,
    setUploadNote,
    draft,
    setDraft,
    sendState,
    setSendState,
    pendingSendRef,
  };
}
export function usePageState() {
  return {
    ...useRegionLabels(),
    ...useAccountSelection(),
    ...useTranscriptCards(),
    ...useSessionStatus(),
    ...useDeliveryState(),
  };
}
export type PageState = ReturnType<typeof usePageState>;
