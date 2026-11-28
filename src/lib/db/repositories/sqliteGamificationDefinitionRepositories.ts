/**
 * SQLite implementation for the gamification definition and community tables
 * (migration 060): badge_definitions, user_badges, invite_tokens and
 * community_servers.
 *
 * The async repositories and the SQLite-only legacy helpers share these private
 * operations. SQL text, parameter order and row mapping are unchanged from the
 * original `gamification.ts` / `gamification/*.ts` call sites. Resolve the
 * database at call time so reset/restore never leaves a captured handle.
 */
import type {
  BadgeDefinition,
  BadgeDefinitionSeed,
  BadgeRepository,
  CommunityServerRepository,
  CommunityServerSummary,
  CreateInviteTokenInput,
  InviteToken,
  InviteTokenRepository,
  InviteTokenSummary,
  UserBadge,
} from "@/domain/persistence/gamificationDefinitionRepositories";
import { getDbInstance } from "../core";

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
  transaction: <TArgs extends unknown[], TResult>(
    fn: (...args: TArgs) => TResult
  ) => (...args: TArgs) => TResult;
}

function db(): DbLike {
  return getDbInstance() as unknown as DbLike;
}

/** Name, description, icon and rarity of one definition, as shown in the unlock toast. */
export interface BadgeUnlockDetails {
  name: string;
  description: string | null;
  icon: string | null;
  rarity: string;
}

// ──────────────── Badges ────────────────

function listBadgeDefinitions(category?: string): BadgeDefinition[] {
  const sql = category
    ? `SELECT * FROM badge_definitions WHERE category = ?`
    : `SELECT * FROM badge_definitions`;
  const rows = (category ? db().prepare(sql).all(category) : db().prepare(sql).all()) as Array<{
    id: string;
    name: string;
    description: string | null;
    icon: string | null;
    category: string | null;
    rarity: string;
    criteria: string | null;
    hidden: number;
    created_at: string;
  }>;
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    description: r.description,
    icon: r.icon,
    category: r.category,
    rarity: r.rarity,
    criteria: r.criteria,
    hidden: r.hidden,
    createdAt: r.created_at,
  }));
}

function seedBadgeDefinitions(rows: readonly BadgeDefinitionSeed[]): void {
  const instance = db();
  const insert = instance.prepare(
    `INSERT OR IGNORE INTO badge_definitions (id, name, description, icon, category, rarity, criteria, hidden)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );

  const insertMany = instance.transaction((badges: readonly BadgeDefinitionSeed[]) => {
    for (const badge of badges) {
      insert.run(
        badge.id,
        badge.name,
        badge.description,
        badge.icon,
        badge.category,
        badge.rarity,
        badge.criteria,
        badge.hidden
      );
    }
  });

  insertMany(rows);
}

function findBadgeUnlockDetails(badgeId: string): BadgeUnlockDetails | undefined {
  return db()
    .prepare("SELECT name, description, icon, rarity FROM badge_definitions WHERE id = ?")
    .get(badgeId) as BadgeUnlockDetails | undefined;
}

function unlockBadge(apiKeyId: string, badgeId: string): boolean {
  const result = db()
    .prepare(`INSERT OR IGNORE INTO user_badges (api_key_id, badge_id) VALUES (?, ?)`)
    .run(apiKeyId, badgeId);
  return result.changes > 0;
}

function hasBadge(apiKeyId: string, badgeId: string): boolean {
  const row = db()
    .prepare(`SELECT 1 FROM user_badges WHERE api_key_id = ? AND badge_id = ? LIMIT 1`)
    .get(apiKeyId, badgeId);
  return !!row;
}

function listEarnedBadges(apiKeyId: string): UserBadge[] {
  const rows = db()
    .prepare(
      `SELECT ub.api_key_id, ub.badge_id, ub.unlocked_at,
            bd.name, bd.description, bd.icon, bd.category, bd.rarity
     FROM user_badges ub
     JOIN badge_definitions bd ON bd.id = ub.badge_id
     WHERE ub.api_key_id = ?`
    )
    .all(apiKeyId) as Array<{
    api_key_id: string;
    badge_id: string;
    unlocked_at: string;
    name: string;
    description: string | null;
    icon: string | null;
    category: string | null;
    rarity: string;
  }>;
  return rows.map((r) => ({
    apiKeyId: r.api_key_id,
    badgeId: r.badge_id,
    unlockedAt: r.unlocked_at,
    badgeName: r.name,
    badgeDescription: r.description,
    badgeIcon: r.icon,
    badgeCategory: r.category,
    badgeRarity: r.rarity,
  }));
}

function listEarnedBadgesByAnyKey(): UserBadge[] {
  const rows = db()
    .prepare(
      `SELECT ub.badge_id, MIN(ub.unlocked_at) AS unlocked_at,
              bd.name, bd.description, bd.icon, bd.category, bd.rarity
       FROM user_badges ub
       JOIN badge_definitions bd ON bd.id = ub.badge_id
       GROUP BY ub.badge_id`
    )
    .all() as Array<{
    badge_id: string;
    unlocked_at: string;
    name: string;
    description: string | null;
    icon: string | null;
    category: string | null;
    rarity: string;
  }>;
  return rows.map((r) => ({
    apiKeyId: "*",
    badgeId: r.badge_id,
    unlockedAt: r.unlocked_at,
    badgeName: r.name,
    badgeDescription: r.description,
    badgeIcon: r.icon,
    badgeCategory: r.category,
    badgeRarity: r.rarity,
  }));
}

// ──────────────── Invite Tokens ────────────────

function createInviteToken(input: CreateInviteTokenInput): void {
  db()
    .prepare(
      `INSERT INTO invite_tokens (id, code, token_hash, created_by, server_url, max_uses)
     VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(input.id, input.code, input.tokenHash, input.createdBy, input.serverUrl, input.maxUses);
}

function findInviteByCode(code: string): InviteToken | null {
  const row = db().prepare(`SELECT * FROM invite_tokens WHERE code = ?`).get(code) as
    | {
        id: string;
        code: string;
        token_hash: string;
        created_by: string;
        used_by: string | null;
        server_url: string | null;
        max_uses: number;
        use_count: number;
        expires_at: string | null;
        revoked_at: string | null;
        created_at: string;
      }
    | undefined;
  if (!row) return null;
  return {
    id: row.id,
    code: row.code,
    tokenHash: row.token_hash,
    createdBy: row.created_by,
    usedBy: row.used_by,
    serverUrl: row.server_url,
    maxUses: row.max_uses,
    useCount: row.use_count,
    expiresAt: row.expires_at,
    revokedAt: row.revoked_at,
    createdAt: row.created_at,
  };
}

function redeemInvite(code: string, usedBy: string): boolean {
  const result = db()
    .prepare(
      `UPDATE invite_tokens
     SET use_count = use_count + 1, used_by = ?
     WHERE code = ? AND revoked_at IS NULL
       AND use_count < max_uses
       AND (expires_at IS NULL OR expires_at > datetime('now'))`
    )
    .run(usedBy, code);
  return result.changes > 0;
}

function revokeInvite(id: string): void {
  db().prepare(`UPDATE invite_tokens SET revoked_at = datetime('now') WHERE id = ?`).run(id);
}

function listInvitesByCreator(createdBy: string): InviteTokenSummary[] {
  const rows = db()
    .prepare(
      `SELECT id, code, server_url, max_uses, use_count, expires_at, revoked_at, created_at
       FROM invite_tokens WHERE created_by = ? ORDER BY created_at DESC`
    )
    .all(createdBy) as Array<{
    id: string;
    code: string;
    server_url: string | null;
    max_uses: number;
    use_count: number;
    expires_at: string | null;
    revoked_at: string | null;
    created_at: string;
  }>;

  return rows.map((r) => ({
    id: r.id,
    code: r.code,
    serverUrl: r.server_url,
    maxUses: r.max_uses,
    useCount: r.use_count,
    expiresAt: r.expires_at,
    revokedAt: r.revoked_at,
    createdAt: r.created_at,
  }));
}

// ──────────────── Community Servers ────────────────

function findConnectedServerByKeyHash(apiKeyHash: string): { id: string } | undefined {
  return db()
    .prepare("SELECT id FROM community_servers WHERE api_key_hash = ? AND status = 'connected'")
    .get(apiKeyHash) as { id: string } | undefined;
}

function connectServer(id: string, name: string, url: string, apiKeyHash: string): void {
  db()
    .prepare(
      `INSERT OR REPLACE INTO community_servers (id, name, url, api_key_hash)
     VALUES (?, ?, ?, ?)`
    )
    .run(id, name, url, apiKeyHash);
}

function disconnectServer(id: string): void {
  db().prepare(`UPDATE community_servers SET status = 'disconnected' WHERE id = ?`).run(id);
}

function listServers(): CommunityServerSummary[] {
  const rows = db()
    .prepare(
      `SELECT id, name, url, connected_at, last_sync_at, status, error_message FROM community_servers`
    )
    .all() as Array<{
    id: string;
    name: string;
    url: string;
    connected_at: string;
    last_sync_at: string | null;
    status: string;
    error_message: string | null;
  }>;
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    url: r.url,
    connectedAt: r.connected_at,
    lastSyncAt: r.last_sync_at,
    status: r.status,
    errorMessage: r.error_message,
  }));
}

// ──────────────── Bindings ────────────────

export const sqliteBadgeRepository: BadgeRepository = {
  listDefinitions: async (category) => listBadgeDefinitions(category),
  seedDefinitions: async (rows) => seedBadgeDefinitions(rows),
  unlock: async (apiKeyId, badgeId) => unlockBadge(apiKeyId, badgeId),
  has: async (apiKeyId, badgeId) => hasBadge(apiKeyId, badgeId),
  listEarned: async (apiKeyId) => listEarnedBadges(apiKeyId),
  listEarnedByAnyKey: async () => listEarnedBadgesByAnyKey(),
};

export const sqliteInviteTokenRepository: InviteTokenRepository = {
  create: async (input) => createInviteToken(input),
  findByCode: async (code) => findInviteByCode(code),
  redeem: async (code, usedBy) => redeemInvite(code, usedBy),
  revoke: async (id) => revokeInvite(id),
  listByCreator: async (createdBy) => listInvitesByCreator(createdBy),
};

export const sqliteCommunityServerRepository: CommunityServerRepository = {
  findConnectedIdByKeyHash: async (apiKeyHash) => findConnectedServerByKeyHash(apiKeyHash) ?? null,
  connect: async (id, name, url, apiKeyHash) => connectServer(id, name, url, apiKeyHash),
  disconnect: async (id) => disconnectServer(id),
  list: async () => listServers(),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract.
 * The existing exports in `gamification.ts` and the dynamic-import call sites in
 * `gamification/*.ts` run these in the caller's turn, exactly where the original
 * statements ran (the chat pipeline's badge unlock relies on that ordering).
 */
export const sqliteGamificationDefinitionLegacySync = {
  listBadgeDefinitions,
  seedBadgeDefinitions,
  findBadgeUnlockDetails,
  unlockBadge,
  hasBadge,
  listEarnedBadges,
  listEarnedBadgesByAnyKey,
  createInviteToken,
  findInviteByCode,
  redeemInvite,
  revokeInvite,
  listInvitesByCreator,
  findConnectedServerByKeyHash,
  connectServer,
  disconnectServer,
  listServers,
};
