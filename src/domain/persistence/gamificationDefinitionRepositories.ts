/**
 * Persistence contracts for the gamification definition and community tables
 * (migration 060): the badge catalogue and earned badges, invite tokens and
 * community server connections.
 *
 * The XP audit log, levels, leaderboard scores and the token ledger are a
 * separate atomic ledger and are deliberately not part of these contracts.
 */

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  category: string | null;
  rarity: string;
  criteria: string | null;
  hidden: number;
  createdAt: string;
}

/** A catalogue row to seed; created_at comes from the column default. */
export type BadgeDefinitionSeed = Omit<BadgeDefinition, "createdAt">;

export interface UserBadge {
  apiKeyId: string;
  badgeId: string;
  unlockedAt: string;
  badgeName?: string;
  badgeDescription?: string | null;
  badgeIcon?: string | null;
  badgeCategory?: string | null;
  badgeRarity?: string;
}

export interface BadgeRepository {
  /** Every definition, or only one category when a non-empty category is given. */
  listDefinitions(category?: string): Promise<BadgeDefinition[]>;
  /** Inserts the rows that do not exist yet, in one transaction; existing ids are kept as they are. */
  seedDefinitions(rows: readonly BadgeDefinitionSeed[]): Promise<void>;
  /** Idempotent on (api key, badge); true only when this call inserted the row. */
  unlock(apiKeyId: string, badgeId: string): Promise<boolean>;
  /** Reads earned badges directly, so it is correct even before the catalogue is seeded. */
  has(apiKeyId: string, badgeId: string): Promise<boolean>;
  /** Earned badges joined with their definitions; badges without a definition are left out. */
  listEarned(apiKeyId: string): Promise<UserBadge[]>;
  /** Distinct badges earned by any key, earliest unlock first wins; apiKeyId is "*". */
  listEarnedByAnyKey(): Promise<UserBadge[]>;
}

export interface InviteToken {
  id: string;
  code: string;
  tokenHash: string;
  createdBy: string;
  usedBy: string | null;
  serverUrl: string | null;
  maxUses: number;
  useCount: number;
  expiresAt: string | null;
  revokedAt: string | null;
  createdAt: string;
}

/** An invite as listed to its creator: no token hash and no redeemer. */
export type InviteTokenSummary = Omit<InviteToken, "tokenHash" | "createdBy" | "usedBy">;

export interface CreateInviteTokenInput {
  id: string;
  code: string;
  tokenHash: string;
  createdBy: string;
  serverUrl: string | null;
  maxUses: number;
}

export interface InviteTokenRepository {
  create(input: CreateInviteTokenInput): Promise<void>;
  findByCode(code: string): Promise<InviteToken | null>;
  /**
   * Single conditional update: counts one use and records the redeemer only while the
   * invite is not revoked, not used up and not expired. True when a row was updated.
   */
  redeem(code: string, usedBy: string): Promise<boolean>;
  /** Stamps revoked_at; an unknown id is not an error. */
  revoke(id: string): Promise<void>;
  /** Newest first. */
  listByCreator(createdBy: string): Promise<InviteTokenSummary[]>;
}

export interface CommunityServer {
  id: string;
  name: string;
  url: string;
  apiKeyHash: string;
  connectedAt: string;
  lastSyncAt: string | null;
  status: string;
  errorMessage: string | null;
}

/** A server as listed to the operator: the key hash is never returned. */
export type CommunityServerSummary = Omit<CommunityServer, "apiKeyHash">;

export interface CommunityServerRepository {
  /** Only servers whose status is "connected" match. */
  findConnectedIdByKeyHash(apiKeyHash: string): Promise<{ id: string } | null>;
  /** Replaces any row with the same id, so status, sync time and error go back to their defaults. */
  connect(id: string, name: string, url: string, apiKeyHash: string): Promise<void>;
  disconnect(id: string): Promise<void>;
  list(): Promise<CommunityServerSummary[]>;
}
