import type { ReasoningCacheStore } from "@/domain/persistence/reasoningCacheStore";
import {
  sqliteReasoningCacheLegacySync,
  sqliteReasoningCacheStore,
} from "./sqliteReasoningCacheStore";

export interface ReasoningCacheStores {
  reasoning: ReasoningCacheStore;
  legacySync: {
    reasoning: typeof sqliteReasoningCacheLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * The replay hot path reads and writes synchronously, so that access stays explicitly
 * separate from the Promise contract instead of pretending to be backend-neutral.
 */
export const reasoningCacheStores: ReasoningCacheStores = {
  reasoning: sqliteReasoningCacheStore,
  legacySync: {
    reasoning: sqliteReasoningCacheLegacySync,
  },
};
