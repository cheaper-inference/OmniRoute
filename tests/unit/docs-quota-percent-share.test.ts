/**
 * tests/unit/docs-quota-percent-share.test.ts
 *
 * Pins the self-service docs of the key's percent share and of the member usage bars to the code:
 * the reasons the view sends, the member floor and ceiling, the worked example of `attributed`,
 * and the OpenAPI shapes of the share, the member slice and the pool option.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { load } from "js-yaml";

import type { LedgerSnapshot } from "../../src/lib/quota/types.ts";
import type { SelfViewPoolContext } from "../../src/lib/quota/selfViewTypes.ts";

// The floor is read from the environment on every call: a value in the shell must not change
// the worked example.
const savedFloor = process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;
delete process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;

const { previewPercentDimension } = await import("../../src/lib/quota/percentAttribution.ts");
const { buildMemberSlices, membersAllowed } =
  await import("../../src/lib/quota/selfViewMembers.ts");
const { MAX_MEMBER_SLICES, selfQuotaResponseSchema } =
  await import("../../src/shared/schemas/selfQuota.ts");
const { PoolUpdateSchema } = await import("../../src/shared/schemas/quota.ts");
const { QuotaPoolSchema } = await import("../../src/lib/quota/dimensions.ts");

test.after(() => {
  if (savedFloor === undefined) delete process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;
  else process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT = savedFloor;
});

const ROOT = path.resolve(import.meta.dirname, "../..");
const DOC = fs.readFileSync(path.join(ROOT, "docs/routing/QUOTA_SHARE.md"), "utf8");
const OPENAPI = load(fs.readFileSync(path.join(ROOT, "docs/openapi.yaml"), "utf8")) as {
  components: { schemas: Record<string, OpenApiSchema> };
};

type OpenApiSchema = {
  type?: string | string[];
  required?: string[];
  additionalProperties?: boolean;
  minimum?: number;
  minItems?: number;
  maxItems?: number;
  items?: { $ref?: string };
  properties?: Record<string, OpenApiSchema>;
};

/** The few Zod accessors this file walks the response schema with. */
type ZodNode = {
  shape: Record<string, ZodNode>;
  element: ZodNode;
  unwrap: () => ZodNode;
  safeParse: (value: unknown) => { success: boolean };
};

/** The text from a heading line to the next heading of the same or a higher level. */
function section(doc: string, heading: string): string {
  const level = /^#+/.exec(heading)?.[0].length ?? 0;
  const lines = doc.split("\n");
  const start = lines.indexOf(heading);
  if (start < 0) return "";
  const next = lines.findIndex(
    (line, i) => i > start && /^#+ /.test(line) && (/^#+/.exec(line)?.[0].length ?? 0) <= level
  );
  return lines.slice(start, next === -1 ? undefined : next).join("\n");
}

/** Line breaks and indentation of wrapped prose collapse to single spaces. */
function prose(text: string): string {
  return text.replace(/\s+/g, " ");
}

const selfService = section(DOC, "## Self-Service Quota API (opt-in)");
const memberUsage = section(selfService, "### Member usage");
const selfServicePage = section(selfService, "### Self-service page");
const poolsPage = section(DOC, "### `/dashboard/costs/quota-share` — Main pools page");

function hasSentence(text: string, sentence: string): void {
  assert.ok(prose(text).includes(sentence), `missing sentence: ${sentence}`);
}

const WORDS: Record<number, string> = { 2: "two", 3: "three", 4: "four", 5: "five" };

test("the sections this file reads exist", () => {
  for (const text of [selfService, memberUsage, selfServicePage, poolsPage])
    assert.ok(text.length > 0);
});

test("the docs name every reason the view sends for a percent share, in the reason table", () => {
  const source = fs.readFileSync(path.join(ROOT, "src/lib/quota/selfViewPercent.ts"), "utf8");
  const reasons = [...source.matchAll(/^const [A-Z_]+ = "([a-z_]+)";$/gm)].map((m) => m[1]);
  assert.deepEqual(reasons.sort(), [
    "account_not_used_by_key",
    "percent_attribution_unavailable",
    "percent_window_ended",
    "store_unavailable",
  ]);
  for (const reason of reasons) {
    assert.match(selfService, new RegExp("^\\| `" + reason + "`\\s+\\| \\S", "m"), reason);
  }
  assert.equal(/not calculated yet|for now/.test(selfService), false);
  assert.equal(/anonym/i.test(selfService), false);
});

test("the docs state how the percent share is read and what its two parts are", () => {
  hasSentence(
    selfService,
    "For the key's own share of a `percent` window: the book was read without an account reading in the gate's cache to confirm it."
  );
  hasSentence(
    selfService,
    "`consumed` is the number enforcement compares with the fair share. It is `attributed` plus `external`, exactly."
  );
  hasSentence(
    selfService,
    "Both parts are sent only when the pool's `accountVisible` is true: the key has `self:account-quota` and the provider is in its `sharedQuotaProviders`. A key without it gets `consumed` alone, with the same `status` and `reason`."
  );
  hasSentence(
    selfService,
    "With both parts and its own weight, a holder can work out the use made outside the pool that is charged to the pool's keys. A holder with the account scope already sees the account total."
  );
  hasSentence(
    selfService,
    "A key that routed nothing in the window can still read its external charge from `consumed`, because its attributed part is then 0."
  );
  assert.equal(/sent to every key with `self:usage`/.test(prose(selfService)), false);
  const table = section(selfService, "### What each visibility shows");
  assert.match(
    table,
    /^\| Own share +\|[^\n]*without `attributed` and `external`/m,
    "the own-share row says the two parts are left out"
  );
  assert.match(
    table,
    /^\| Account level +\|[^\n]*`attributed` and `external` on the `yourShare` of a `percent` window/m,
    "the account-level row adds the two parts"
  );
  hasSentence(
    selfService,
    "The view reads the book and never writes its state. It does not open a book, and it never asks the provider for a reading."
  );
  hasSentence(
    selfService,
    "Per-model windows carry no share for the key. The book keeps no per-model data."
  );
});

test("the documented member floor and ceiling are the ones the view applies", () => {
  const rows = (n: number) =>
    Array.from({ length: n }, (_, i) => ({ apiKeyId: `k${i}`, consumed: i }));
  const slices = (n: number) =>
    buildMemberSlices({ poolId: "p", viewerApiKeyId: "k0", secret: "s", consumed: rows(n) });
  const allowed = (allocated: number, usable: number) =>
    membersAllowed({
      memberBreakdown: true,
      accountVisible: true,
      usableMemberCount: usable,
      pool: { id: "p", allocations: rows(allocated).map((r) => ({ apiKeyId: r.apiKeyId })) },
    } as unknown as SelfViewPoolContext);

  const floor = [1, 2, 3, 4, 5].find((n) => slices(n) !== undefined) as number;
  assert.equal(slices(floor)?.length, floor);
  assert.equal(allowed(floor, floor - 1), false);
  assert.equal(allowed(floor, floor), true);
  const ceiling = Array.from({ length: 100 }, (_, i) => i + floor).find(
    (n) => !allowed(n + 1, floor)
  ) as number;
  assert.equal(allowed(ceiling, floor), true);
  assert.equal(ceiling, MAX_MEMBER_SLICES, "the view's ceiling is the schema's");

  hasSentence(
    memberUsage,
    `the pool has at most ${ceiling} allocated keys, and at least ${WORDS[floor]} of them can make requests`
  );
  hasSentence(
    memberUsage,
    `When a pool drops below ${WORDS[floor]} usable keys, the bars disappear. Views taken earlier still show what each member used.`
  );
  hasSentence(
    memberUsage,
    `In a pool of ${WORDS[floor]} keys, someone who knows what one key used can tell what the last key used.`
  );
  hasSentence(memberUsage, "Otherwise `members` is absent. It is never an empty list.");
});

test("the documented slot rules and limits are stated as whole sentences", () => {
  hasSentence(memberUsage, "Slot 1 is always the asking key, with `isYou` true.");
  hasSentence(memberUsage, "So the numbers do not line up between holders.");
  hasSentence(memberUsage, "Holders can still match slices by their values.");
  hasSentence(memberUsage, "Usage made outside the pool is never split into slices.");
  hasSentence(
    memberUsage,
    "A failing read of the option or of the usable-key count turns the bars off for that pool."
  );
  hasSentence(
    memberUsage,
    "On a countable window, the pool total minus the slices can show the use of keys that are no longer allocated."
  );
  hasSentence(
    memberUsage,
    "A member that shows zero on one account and use on another can show which member uses which account."
  );
  assert.equal(/slices shows the use|another shows which/.test(prose(memberUsage)), false);
  assert.equal(/cannot match|anonym/i.test(memberUsage), false);
});

test("the documented example of attributed is what the preview computes", async () => {
  const now = 1_800_000_000_000;
  const snapshot: LedgerSnapshot = {
    state: {
      rev: 1,
      last: 0.6,
      baseline: 0,
      resetAt: now + 3_600_000,
      readAt: now - 60_000,
      updatedAt: now - 60_000,
      keys: { a: { startTokens: 0 }, b: { startTokens: 0 } },
    },
    counters: {
      a: { tokens: 900_000, updatedAt: now - 120_000 },
      b: { tokens: 100_000, updatedAt: now - 120_000 },
    },
  };
  const r = await previewPercentDimension({
    store: { ledgerRead: async () => snapshot },
    pool: {
      id: "p",
      allocations: [
        { apiKeyId: "a", weight: 50 },
        { apiKeyId: "b", weight: 50 },
      ],
    },
    connectionId: "c",
    dimension: { window: "5h", limit: 100 },
    reading: null,
    nowMs: now,
  });
  assert.equal(r.kind, "book");
  if (r.kind !== "book") return;
  const round = (n: number) => Math.round(n * 1e6) / 1e6;
  const a = round(r.shares.internalByKey.a);
  const b = round(r.shares.internalByKey.b);
  const externalA = round(r.shares.externalByKey.a);
  const externalB = round(r.shares.externalByKey.b);
  assert.equal(externalA, externalB);

  hasSentence(
    selfService,
    "For example, a book opens at 0, with keys A and B at weight 50 each. Key A routes 900,000 tokens and key B 100,000. The account then reaches 60% of a limit of 100."
  );
  hasSentence(
    selfService,
    `Then \`attributed\` is ${a} for key A and ${b} for key B, and \`external\` is ${externalA} for both.`
  );
});

test("the page and the wizard are described", () => {
  hasSentence(
    selfServicePage,
    "On percentage plans the page draws the key's own share when the API reports it. It says that the number is an estimate and names its two parts."
  );
  hasSentence(
    selfServicePage,
    "A text legend lists every segment with its value, so nothing depends on colour."
  );
  hasSentence(
    poolsPage,
    "The keys step of the pool wizard has a `Show usage by member to key holders` box."
  );
});

test("the OpenAPI share, member slice and pool option match the Zod schemas", () => {
  const schemas = OPENAPI.components.schemas;
  const poolShape = (selfQuotaResponseSchema.shape.pools as unknown as ZodNode).element.shape;
  const shared = poolShape.dimensions.element.shape;
  const account = poolShape.accounts.element.shape.dimensions.element.shape;

  // The share: the same properties, the two parts optional numbers.
  const share = schemas.SelfQuotaShare;
  assert.deepEqual(
    Object.keys(share.properties ?? {}).sort(),
    Object.keys(shared.yourShare.shape).sort()
  );
  for (const part of ["attributed", "external"]) {
    assert.equal(share.properties?.[part]?.type, "number", part);
    assert.equal(share.required?.includes(part), false, part);
  }

  // The slice: exactly the Zod properties, all required, nothing else allowed.
  const members = shared.members.unwrap();
  const slice = members.element;
  const sliceDoc = schemas.SelfQuotaMemberSlice;
  assert.deepEqual(Object.keys(sliceDoc.properties ?? {}).sort(), Object.keys(slice.shape).sort());
  assert.deepEqual([...(sliceDoc.required ?? [])].sort(), Object.keys(slice.shape).sort());
  assert.equal(sliceDoc.additionalProperties, false);
  assert.equal(
    slice.safeParse({ slot: 1, consumed: 0, isYou: true, apiKeyId: "k" }).success,
    false
  );
  assert.equal(sliceDoc.properties?.slot?.type, "integer");
  assert.equal(sliceDoc.properties?.slot?.minimum, 1);
  assert.equal(slice.safeParse({ slot: 0, consumed: 0, isYou: true }).success, false);
  assert.equal(sliceDoc.properties?.consumed?.type, "number");
  assert.equal(sliceDoc.properties?.consumed?.minimum, 0);
  assert.equal(slice.safeParse({ slot: 1, consumed: -1, isYou: true }).success, false);
  assert.equal(sliceDoc.properties?.isYou?.type, "boolean");

  // `members` on both dimensions: optional, at least as many items as the Zod minimum.
  const list = (n: number) =>
    Array.from({ length: n }, (_, i) => ({ slot: i + 1, consumed: 0, isYou: i === 0 }));
  const minItems = [0, 1, 2, 3, 4, 5].find((n) => members.safeParse(list(n)).success);
  for (const [name, zodShape] of [
    ["SelfQuotaSharedDimension", shared],
    ["SelfQuotaAccountDimension", account],
  ] as const) {
    const dim = schemas[name];
    assert.deepEqual(Object.keys(dim.properties ?? {}).sort(), Object.keys(zodShape).sort(), name);
    assert.equal(dim.properties?.members?.type, "array", name);
    assert.equal(dim.properties?.members?.minItems, minItems, name);
    assert.equal(dim.properties?.members?.maxItems, MAX_MEMBER_SLICES, name);
    assert.equal(members.safeParse(list(MAX_MEMBER_SLICES)).success, true, name);
    assert.equal(members.safeParse(list(MAX_MEMBER_SLICES + 1)).success, false, name);
    assert.equal(dim.properties?.members?.items?.$ref, "#/components/schemas/SelfQuotaMemberSlice");
    assert.equal(dim.required?.includes("members"), false, name);
  }

  // The admin pool option.
  assert.ok("memberBreakdown" in PoolUpdateSchema.shape);
  assert.ok("memberBreakdown" in QuotaPoolSchema.shape);
  assert.equal(schemas.PoolUpdate.properties?.memberBreakdown?.type, "boolean");
  assert.equal(schemas.QuotaPool.properties?.memberBreakdown?.type, "boolean");
});
