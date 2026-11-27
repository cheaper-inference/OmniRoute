import type {
  BadgeRepository,
  CommunityServerRepository,
  InviteTokenRepository,
} from "@/domain/persistence/gamificationDefinitionRepositories";
import {
  sqliteBadgeRepository,
  sqliteCommunityServerRepository,
  sqliteGamificationDefinitionLegacySync,
  sqliteInviteTokenRepository,
} from "./sqliteGamificationDefinitionRepositories";

export interface GamificationDefinitionRepositories {
  badges: BadgeRepository;
  invites: InviteTokenRepository;
  communityServers: CommunityServerRepository;
  legacySync: typeof sqliteGamificationDefinitionLegacySync;
}

/**
 * SQLite-only composition root for badge definitions, earned badges, invite
 * tokens and community servers. There is deliberately no backend selection.
 * Legacy synchronous access is explicitly separate from the Promise contracts;
 * it does not pretend to support a future network database synchronously.
 */
export const gamificationDefinitionRepositories: GamificationDefinitionRepositories = {
  badges: sqliteBadgeRepository,
  invites: sqliteInviteTokenRepository,
  communityServers: sqliteCommunityServerRepository,
  legacySync: sqliteGamificationDefinitionLegacySync,
};
