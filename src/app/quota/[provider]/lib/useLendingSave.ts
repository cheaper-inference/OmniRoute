"use client";

import { useRef } from "react";

import {
  selfQuotaResponseSchema,
  type SelfLendingPatch,
  type SelfQuotaPool,
  type SelfQuotaResponse,
} from "@/shared/schemas/selfQuota";

import {
  sendSelfService,
  type SelfServiceWriteFailure,
  type SelfServiceWriteResult,
} from "./selfServiceClient";

type LendingSaveOutcome =
  | { kind: "saved"; pool: SelfQuotaPool | null }
  | { kind: "aborted" }
  | { kind: "error"; error: SelfServiceWriteFailure; retryAfterSeconds: number | null };

export interface LendingActions {
  save: (patch: SelfLendingPatch, signal: AbortSignal) => Promise<LendingSaveOutcome>;
  reload: () => void;
}

const SERVER_FAILURE: SelfServiceWriteResult<SelfQuotaResponse> = {
  ok: false,
  failure: "server",
  retryAfterSeconds: null,
};

/** The saves in flight together. A group is overlapped once a save starts while another runs. */
type SaveGroup = { inFlight: number; overlapped: boolean; succeeded: boolean };

const ABORTED = { kind: "aborted" } as const;

/**
 * Sends the holder's lending change and shows the view the server returns, with no second read.
 * The view is shown only for the key and the epoch the save started under, and never after the
 * view of a save that started later: each save is numbered. A save whose view is dropped still
 * reports "saved" for its own card. When saves overlap and one of them succeeds, the quota is read
 * once after the last one settles, so the page shows every change. A refused key and an
 * unreadable answer reload the quota, so the page's own handling of the read decides what follows.
 * Nothing here touches where the key is kept.
 */
export function useLendingSave(input: {
  path: string;
  apiKey: string | null;
  adopt: (data: SelfQuotaResponse, forApiKey: string, forEpoch: number) => void;
  reload: () => void;
  /** The query's epoch when the save starts. */
  epoch: number;
}): LendingActions {
  const { path, apiKey, adopt, reload, epoch } = input;
  // Read and written only by `save` and its helpers, which run from event handlers.
  const started = useRef(0);
  const adopted = useRef(0);
  const group = useRef<SaveGroup>({ inFlight: 0, overlapped: false, succeeded: false });

  const begin = () => {
    const current = group.current;
    if (current.inFlight > 0) current.overlapped = true;
    current.inFlight += 1;
    started.current += 1;
    return started.current;
  };

  const end = (succeeded: boolean) => {
    const current = group.current;
    current.inFlight -= 1;
    if (succeeded) current.succeeded = true;
    if (current.inFlight > 0) return;
    group.current = { inFlight: 0, overlapped: false, succeeded: false };
    if (current.overlapped && current.succeeded) reload();
  };

  const exchange = async (
    patch: SelfLendingPatch,
    signal: AbortSignal,
    key: string,
    order: number
  ): Promise<LendingSaveOutcome> => {
    const result = await sendSelfService({
      path,
      apiKey: key,
      body: patch,
      schema: selfQuotaResponseSchema,
      signal,
    }).catch(() => SERVER_FAILURE);
    if (signal.aborted) return ABORTED;
    // `in` narrows the union with or without strictNullChecks.
    if (!("failure" in result)) {
      if (order > adopted.current) {
        adopted.current = order;
        adopt(result.data, key, epoch);
      }
      const saved = result.data.pools.find((pool) => pool.ref === patch.pool) ?? null;
      return { kind: "saved", pool: saved };
    }
    const { failure, retryAfterSeconds } = result;
    if (failure === "aborted") return ABORTED;
    if (failure === "unauthorized" || failure === "invalid-response") reload();
    return { kind: "error", error: failure, retryAfterSeconds };
  };

  const save = async (patch: SelfLendingPatch, signal: AbortSignal) => {
    if (!apiKey) return ABORTED;
    const order = begin();
    let succeeded = false;
    try {
      const outcome = await exchange(patch, signal, apiKey, order);
      succeeded = outcome.kind === "saved";
      return outcome;
    } finally {
      end(succeeded);
    }
  };

  return { save, reload };
}
