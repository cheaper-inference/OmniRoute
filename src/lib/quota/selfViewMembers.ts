/**
 * selfViewMembers.ts — the member usage slices of the self-service quota view.
 *
 * A dimension carries `members` only when the pool's option is on, three or more of the pool's
 * keys can make requests, the pool has at most 20 allocated keys, the asking key may see account
 * data (`ctx.accountVisible`) and the key's own reading of that window is available. The slices
 * list every allocated key, also one that stopped working. A slice is `{ slot, consumed, isYou }`
 * and nothing else. A failing read of the option or of the usable-key count counts as off.
 *
 * Slot 1 is the asking key. The other members are ranked by HMAC-SHA256 with the server secret
 * over (context, pool id, asking key id, member id), so the numbering is stable for one asking
 * key and pool, differs between asking keys, and does not follow ids, use or creation order.
 * The slices are listed in slot order. A holder can still match slices by their values.
 *
 * Countable windows read each other member's consumption from the store, in parallel. Percent
 * windows use the attributed part of each key from the same book read as the share, never the
 * external charge. One value that cannot be read leaves the whole list out.
 */

import { opaqueTokenFingerprint } from "@omniroute/open-sse/utils/opaqueTokenFingerprint.ts";
import { createLogger } from "@/shared/utils/logger";
import {
  MAX_MEMBER_SLICES,
  type SelfQuotaMemberSlice,
  type SelfQuotaSharedDimension,
} from "@/shared/schemas/selfQuota";
import { readViewStore, type ViewStore } from "./selfViewStore";
import type { SelfViewPoolContext } from "./selfViewTypes";

/** Usable keys the pool needs for the bars. */
const MIN_MEMBERS_FOR_BREAKDOWN = 3;
/** Allocated keys above which the bars are not sent: each one costs a read per window. */
const MAX_MEMBERS_FOR_BREAKDOWN = MAX_MEMBER_SLICES;
const MEMBER_SLOT_CONTEXT = "quota-member-slot:v1";
const MEMBER_SLOT_DIGEST_LENGTH = 32;

type MemberValue = { apiKeyId: string; consumed: number | null };

const log = createLogger("quota:self-view");

/**
 * The pool's option and, when it is on, how many of its keys can make requests. Nothing is read
 * when the key may not see account data. A failing read counts as off, with a server-side warning.
 */
export function readMemberBreakdown(input: {
  poolId: string;
  accountVisible: boolean;
  nowMs: number;
  getOption: (poolId: string) => boolean;
  countUsable: (poolId: string, nowMs: number) => number;
}): { memberBreakdown: boolean; usableMemberCount: number } {
  const off = { memberBreakdown: false, usableMemberCount: 0 };
  if (!input.accountVisible) return off;
  try {
    if (!input.getOption(input.poolId)) return off;
    return {
      memberBreakdown: true,
      usableMemberCount: input.countUsable(input.poolId, input.nowMs),
    };
  } catch (err) {
    log.warn(
      { err, poolId: input.poolId },
      "self-service quota view: member breakdown lookup failed"
    );
    return off;
  }
}

function assignMemberSlots({
  poolId,
  viewerApiKeyId,
  memberApiKeyIds,
  secret,
}: {
  poolId: string;
  viewerApiKeyId: string;
  memberApiKeyIds: string[];
  secret: string;
}): Map<string, number> {
  if (!secret) throw new Error("assignMemberSlots requires a non-empty secret");
  const digest = (memberId: string) =>
    opaqueTokenFingerprint(
      JSON.stringify([MEMBER_SLOT_CONTEXT, poolId, viewerApiKeyId, memberId]),
      {
        key: secret,
        length: MEMBER_SLOT_DIGEST_LENGTH,
      }
    );
  const others = [...new Set(memberApiKeyIds)]
    .filter((id) => id !== viewerApiKeyId)
    .map((id) => ({ id, rank: digest(id) }))
    .sort((a, b) => (a.rank < b.rank ? -1 : a.rank > b.rank ? 1 : a.id < b.id ? -1 : 1));
  const slots = new Map<string, number>([[viewerApiKeyId, 1]]);
  others.forEach((entry, index) => slots.set(entry.id, index + 2));
  return slots;
}

function isReadValue(value: number | null): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

/** Three or more distinct ids, none repeated, the asking key among them, every value read. */
function isCompleteList(consumed: ReadonlyArray<MemberValue>, viewerApiKeyId: string): boolean {
  const distinct = new Set(consumed.map((m) => m.apiKeyId));
  return (
    distinct.size >= MIN_MEMBERS_FOR_BREAKDOWN &&
    distinct.size === consumed.length &&
    distinct.has(viewerApiKeyId) &&
    consumed.every((m) => isReadValue(m.consumed))
  );
}

/** Slices in slot order, or undefined when they must not be sent. */
export function buildMemberSlices(input: {
  poolId: string;
  viewerApiKeyId: string;
  secret: string;
  consumed: ReadonlyArray<MemberValue>;
}): SelfQuotaMemberSlice[] | undefined {
  const { poolId, viewerApiKeyId, secret, consumed } = input;
  if (!secret) throw new Error("buildMemberSlices requires a non-empty secret");
  if (!isCompleteList(consumed, viewerApiKeyId)) return undefined;
  const slots = assignMemberSlots({
    poolId,
    viewerApiKeyId,
    memberApiKeyIds: consumed.map((m) => m.apiKeyId),
    secret,
  });
  return consumed
    .map((m) => ({
      slot: slots.get(m.apiKeyId) as number,
      consumed: m.consumed as number,
      isYou: m.apiKeyId === viewerApiKeyId,
    }))
    .sort((a, b) => a.slot - b.slot);
}

/**
 * The pool option is on, the key may see account data, three or more keys can make requests,
 * and the pool has from three to 20 distinct allocated keys.
 */
export function membersAllowed(ctx: SelfViewPoolContext): boolean {
  if (!ctx.memberBreakdown || !ctx.accountVisible) return false;
  if (ctx.usableMemberCount < MIN_MEMBERS_FOR_BREAKDOWN) return false;
  const allocations = Array.isArray(ctx.pool.allocations) ? ctx.pool.allocations : [];
  const allocated = new Set(allocations.map((a) => a.apiKeyId)).size;
  return allocated >= MIN_MEMBERS_FOR_BREAKDOWN && allocated <= MAX_MEMBERS_FOR_BREAKDOWN;
}

/** The members of one countable dimension: the asking key's share, the others read in parallel. */
async function countableMembers(
  ctx: SelfViewPoolContext,
  dimension: SelfQuotaSharedDimension,
  store: ViewStore,
  apiKeyId: string,
  secret: string
): Promise<SelfQuotaMemberSlice[] | undefined> {
  const key = { poolId: ctx.pool.id, unit: dimension.unit, window: dimension.window };
  const ids = [...new Set(ctx.pool.allocations.map((a) => a.apiKeyId))];
  const consumed = await Promise.all(
    ids.map(async (id): Promise<MemberValue> => ({
      apiKeyId: id,
      consumed:
        id === apiKeyId
          ? dimension.yourShare.consumed
          : await readViewStore(() => store.peek(id, key)),
    }))
  );
  return buildMemberSlices({ poolId: ctx.pool.id, viewerApiKeyId: apiKeyId, secret, consumed });
}

/** Sets `members` on each countable dimension whose share was read, when the pool allows it. */
export async function attachCountableMembers(input: {
  ctx: SelfViewPoolContext;
  dimensions: SelfQuotaSharedDimension[];
  store: ViewStore | null;
  apiKeyId: string;
  secret: string;
}): Promise<void> {
  const { ctx, dimensions, store, apiKeyId, secret } = input;
  if (!store || !membersAllowed(ctx)) return;
  await Promise.all(
    dimensions
      .filter((dimension) => dimension.yourShare.status !== "unavailable")
      .map(async (dimension) => {
        const members = await countableMembers(ctx, dimension, store, apiKeyId, secret);
        if (members) dimension.members = members;
      })
  );
}
