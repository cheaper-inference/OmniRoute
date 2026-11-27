"use client";

import { useEffect, useRef, useState } from "react";

import type { SelfLendingPatch, SelfQuotaPool } from "@/shared/schemas/selfQuota";

import type { LendingNotice } from "./lendingForm";
import type { LendingActions } from "./useLendingSave";

/** How a card that sends lending changes follows one save. */
export interface LendingSaveWatch {
  /** A save left the card: it keeps showing what it showed until the answer is in. */
  onStart: () => void;
  /** The pool as the saved view returned it, or null when nothing was saved. */
  onEnd: (saved: SelfQuotaPool | null) => void;
}

/**
 * One save at a time for a lending card, with the notice of its result. The pending request is
 * held in a ref read only by event handlers, so a second press sends nothing. After every result
 * that is not an abort, focus moves to the message container.
 */
export function useLendingSubmit(lending: LendingActions, watch: LendingSaveWatch) {
  const [notice, setNotice] = useState<LendingNotice | null>(null);
  const [saving, setSaving] = useState(false);
  const pending = useRef<AbortController | null>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const held = pending;
    return () => held.current?.abort();
  }, []);

  const busy = () => pending.current !== null;

  /** Sends `patch` and reports whether it was saved. */
  const send = async (patch: SelfLendingPatch): Promise<boolean> => {
    const controller = new AbortController();
    pending.current = controller;
    setSaving(true);
    setNotice(null);
    watch.onStart();
    const outcome = await lending.save(patch, controller.signal);
    pending.current = null;
    setSaving(false);
    watch.onEnd(outcome.kind === "saved" ? outcome.pool : null);
    if (outcome.kind === "aborted") return false;
    setNotice(outcome.kind === "saved" ? { kind: "saved" } : outcome);
    messageRef.current?.focus();
    return outcome.kind === "saved";
  };

  return { notice, clearNotice: () => setNotice(null), saving, busy, send, messageRef };
}
