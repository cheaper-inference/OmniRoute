"use client";

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
 * A refused key and an unreadable answer reload the quota, so the page's own handling of the
 * read decides what follows. Nothing here touches where the key is kept.
 */
export function useLendingSave(input: {
  path: string;
  apiKey: string | null;
  adopt: (data: SelfQuotaResponse, forApiKey: string) => void;
  reload: () => void;
}): LendingActions {
  const { path, apiKey, adopt, reload } = input;

  const save = async (patch: SelfLendingPatch, signal: AbortSignal) => {
    if (!apiKey) return { kind: "aborted" } as const;
    const result = await sendSelfService({
      path,
      apiKey,
      body: patch,
      schema: selfQuotaResponseSchema,
      signal,
    }).catch(() => SERVER_FAILURE);
    if (signal.aborted) return { kind: "aborted" } as const;
    if (result.ok) {
      adopt(result.data, apiKey);
      const saved = result.data.pools.find((pool) => pool.ref === patch.pool) ?? null;
      return { kind: "saved", pool: saved } as const;
    }
    if (result.failure === "aborted") return { kind: "aborted" } as const;
    if (result.failure === "unauthorized" || result.failure === "invalid-response") reload();
    const { failure, retryAfterSeconds } = result;
    return { kind: "error", error: failure, retryAfterSeconds } as const;
  };

  return { save, reload };
}
