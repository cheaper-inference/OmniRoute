import type { AccessTokenRepository } from "@/domain/persistence/accessTokenRepository";
import {
  sqliteAccessTokenLegacySync,
  sqliteAccessTokenRepository,
} from "./sqliteAccessTokenRepository";

export interface AccessTokenRepositories {
  tokens: AccessTokenRepository;
  legacySync: {
    tokens: typeof sqliteAccessTokenLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Management auth verifies a presented token synchronously on every request, so that
 * access stays explicitly separate from the Promise contract instead of pretending to
 * be backend-neutral.
 */
export const accessTokenRepositories: AccessTokenRepositories = {
  tokens: sqliteAccessTokenRepository,
  legacySync: {
    tokens: sqliteAccessTokenLegacySync,
  },
};
