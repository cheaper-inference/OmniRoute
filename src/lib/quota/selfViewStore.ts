/**
 * selfViewStore.ts — quota-store access shared by the self-service quota view builders
 * (selfView.ts and selfViewBlocks.ts). A leaf module: it imports neither builder.
 *
 * The one rule both builders rely on: a store that fails to load, a read that throws and a read
 * that returns a non-finite number all become `null`, never zero.
 */

import { createLogger } from "@/shared/utils/logger";
import type { QuotaStore } from "./types";

/**
 * The read-only store methods the view uses. `ledgerRead` (the percent attribution book) is
 * optional: a store without it reports percent shares as store_unavailable.
 */
export type ViewStore = Pick<QuotaStore, "peek" | "poolConsumedTotal"> &
  Partial<Pick<QuotaStore, "ledgerRead">>;

const log = createLogger("quota:self-view");

/**
 * The quota store, or null when it cannot be loaded (one server-side warning) or when the loader
 * already answers null (a store the caller loaded before and found unavailable).
 */
export async function loadViewStore(
  getQuotaStore: () => Promise<ViewStore | null>
): Promise<ViewStore | null> {
  try {
    return (await getQuotaStore()) ?? null;
  } catch (err) {
    log.warn({ err: (err as Error)?.message }, "self-service quota view: quota store unavailable");
    return null;
  }
}

/** A store read as a number, or null when the store is missing, throws or returns non-finite. */
export async function readViewStore(read: (() => Promise<number>) | null): Promise<number | null> {
  if (!read) return null;
  try {
    const value = await read();
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}
