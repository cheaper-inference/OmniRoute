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

export type LendingSaveOutcome =
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

/**
 * Sends the holder's lending change and shows the view the server returns, with no second read.
 * The view is shown only for the key and the epoch the save started under, and never after the
 * view of a save that started later: each save is numbered. A save whose view is dropped still
 * reports "saved" for its own card. A refused key and an unreadable answer reload the quota, so
 * the page's own handling of the read decides what follows. Nothing here touches where the key
 * is kept.
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
  // Read and written only inside `save`, which runs from event handlers.
  const started = useRef(0);
  const adopted = useRef(0);

  const save = async (patch: SelfLendingPatch, signal: AbortSignal) => {
    if (!apiKey) return { kind: "aborted" } as const;
    started.current += 1;
    const order = started.current;
    const result = await sendSelfService({
      path,
      apiKey,
      body: patch,
      schema: selfQuotaResponseSchema,
      signal,
    }).catch(() => SERVER_FAILURE);
    if (signal.aborted) return { kind: "aborted" } as const;
    // `in` narrows the union with or without strictNullChecks.
    if (!("failure" in result)) {
      if (order > adopted.current) {
        adopted.current = order;
        adopt(result.data, apiKey, epoch);
      }
      const saved = result.data.pools.find((pool) => pool.ref === patch.pool) ?? null;
      return { kind: "saved", pool: saved } as const;
    }
    const { failure, retryAfterSeconds } = result;
    if (failure === "aborted") return { kind: "aborted" } as const;
    if (failure === "unauthorized" || failure === "invalid-response") reload();
    return { kind: "error", error: failure, retryAfterSeconds } as const;
  };

  return { save, reload };
}
