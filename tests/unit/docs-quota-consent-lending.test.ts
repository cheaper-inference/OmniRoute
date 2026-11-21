/**
 * Pins the consented-lending documentation to the code: every number of the worked example is
 * recomputed with the real formula, the refusal sentences come from the real suffix builder, and
 * the self-service PATCH text and OpenAPI schemas follow the Zod contract.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";

const { computeBorrowAvailable } = await import("../../src/lib/quota/consentBorrow.ts");
const { blockResetSuffix, retryAfterSecondsFor } =
  await import("../../src/lib/quota/blockReset.ts");
const { LENDING_UNTIL_MAX_MS, LENDING_UNTIL_MIN_MS, checkLendingDeadline, selfLendingPatchSchema } =
  await import("../../src/shared/schemas/selfQuota.ts");

const ROOT = process.cwd();
const read = (file: string) => readFileSync(path.join(ROOT, file), "utf8");
const doc = read("docs/routing/QUOTA_SHARE.md");
const handlerSource = read("src/server/selfService/lendingHandler.ts");
const authSource = read("src/server/selfService/auth.ts");
const quotaHandlerSource = read("src/server/selfService/quotaHandler.ts");

/** The text from a heading line to the next heading of the same or a higher level. */
function section(heading: string): string {
  const level = heading.match(/^#+/)?.[0].length ?? 0;
  const lines = doc.split("\n");
  const start = lines.indexOf(heading);
  assert.ok(start >= 0, `missing heading ${heading}`);
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    const m = lines[i].match(/^(#+) /);
    if (m && m[1].length <= level) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join("\n");
}

/** Prose with line breaks folded, so a sentence wrapped by Prettier still matches. */
const fold = (text: string) => text.replace(/\s*\n\s*/g, " ");

const lending = section("### Consented lending (per-pool opt-in)");
const lendingProse = fold(lending);
const consentApi = section("### Lending consent");
const consentProse = fold(consentApi);
const preHook = fold(section("### PRE hook (`open-sse/handlers/chatCore.ts`)"));

const NOW = 1_800_000_000_000;

interface Row {
  key: string;
  weight: number;
  share: number;
  consumed: number;
  lends: number;
}

function exampleRows(): { limit: number; rows: Row[] } {
  const limit = Number(lending.match(/^\*\*Example\.\*\* `L` is (\d+)\.$/m)?.[1]);
  assert.ok(limit > 0, "the example states L");
  const rows: Row[] = [];
  for (const m of lending.matchAll(/^\| ([ABC]) +\| (\d+) +\| (\d+) +\| (\d+) +\| (\d+)% +\|$/gm)) {
    rows.push({
      key: m[1],
      weight: Number(m[2]),
      share: Number(m[3]),
      consumed: Number(m[4]),
      lends: Number(m[5]),
    });
  }
  assert.equal(rows.length, 3, "the example table has keys A, B and C");
  return { limit, rows };
}

function borrowFor(
  requester: string,
  rows: Row[],
  limit: number,
  consumed: Record<string, number>
): number {
  return computeBorrowAvailable({
    allocations: rows.map((r) => ({ apiKeyId: r.key, weight: r.weight, lendingPercent: r.lends })),
    requesterKeyId: requester,
    limit,
    consumedByKey: consumed,
    nowMs: NOW,
  });
}

test("the example table's shares are weight / 100 × L", () => {
  const { limit, rows } = exampleRows();
  for (const r of rows) assert.equal(r.share, (r.weight / 100) * limit, `share of ${r.key}`);
});

test("every number of the worked example is the formula's", () => {
  const { limit, rows } = exampleRows();
  const byKey = Object.fromEntries(rows.map((r) => [r.key, r]));
  const consumed = Object.fromEntries(rows.map((r) => [r.key, r.consumed]));

  const first = lending.match(
    /^- B lends (\d+)% of its idle (\d+), which is (\d+)\. C already took (\d+) above its share\. A may borrow (\d+)\.$/m
  );
  assert.ok(first, "the first example sentence");
  const [, pct, idle, lent, taken, available] = first.map(Number);
  assert.equal(pct, byKey.B.lends);
  assert.equal(idle, byKey.B.share - byKey.B.consumed);
  assert.equal(lent, (pct / 100) * idle);
  assert.equal(taken, byKey.C.consumed - byKey.C.share);
  assert.equal(available, borrowFor("A", rows, limit, consumed));

  const second = lending.match(
    /^- A is served at (\d+) and refused once its consumption reaches (\d+)\.$/m
  );
  assert.ok(second, "the second example sentence");
  assert.equal(Number(second[1]), byKey.A.consumed);
  assert.ok(Number(second[1]) < byKey.A.share + available);
  assert.equal(Number(second[2]), byKey.A.share + available);

  const third = lending.match(
    /^- Before C used anything, with A at or under its share, C could borrow (\d+)\.$/m
  );
  assert.ok(third, "the third example sentence");
  assert.equal(
    Number(third[1]),
    borrowFor("C", rows, limit, { A: byKey.A.share, B: byKey.B.consumed, C: 0 })
  );

  const fourth = lending.match(
    /^- Before C used anything, with A at (\d+), C could borrow (\d+)\.$/m
  );
  assert.ok(fourth, "the fourth example sentence");
  assert.equal(Number(fourth[1]), byKey.A.consumed);
  assert.equal(
    Number(fourth[2]),
    borrowFor("C", rows, limit, { A: byKey.A.consumed, B: byKey.B.consumed, C: 0 })
  );
});

test("the section states the rules the gate applies", () => {
  for (const sentence of [
    "In `consent` mode a `hard` key passes its share only within capacity that other keys agreed to lend.",
    "The requesting key's own consent never counts.",
    "Capacity that no allocation claims (100 minus the sum of the weights) is not lendable.",
    "When nobody lends, it is refused from its first request.",
    "Each request compares the deadline with its own time, and a deadline equal to that time has passed.",
    "A `saturation` pool reads nothing more than before.",
    "A failed read counts as a consumption of 0 for that key.",
    "A removed key loses its consent, and a key added back starts at 0.",
    "Switching a pool back to `saturation` keeps every stored consent, which has no effect in that mode.",
    "Switching the pool to `consent` again reactivates the stored consents whose deadline has not passed.",
    "A key holder can clear a stored consent in either mode.",
    "If the columns `lending_percent` and `lending_until` already exist, the migration adds only `borrow_mode`, and stored percentages stay as they are.",
    "A lender can find the pool at its ceiling before it uses its own share.",
    "Concurrent requests read consumption before any is recorded, so lent capacity can be spent more than once, bounded by the requests in flight.",
  ]) {
    assert.ok(lendingProse.includes(sentence), sentence);
  }
});

test("the refusal sentences are the ones the suffix builder writes", () => {
  const at = Date.UTC(2030, 0, 1, 5, 0, 0);
  const iso = new Date(at).toISOString();
  const template = (suffix: string) =>
    suffix.replace("5h", "<window>").replace("daily", "<window>").replace(iso, "<time>");
  const blocked = { window: "5h" as const, consumed: 10, ceiling: 5 };
  const percent = template(blockResetSuffix({ ...blocked, unit: "percent" }, at));
  const countable = template(blockResetSuffix({ ...blocked, unit: "tokens", window: "daily" }, at));
  assert.equal(percent, ". The <window> window resets at <time>.");
  assert.equal(countable, ". Enough <window> usage is expected to clear by <time>.");
  assert.ok(preHook.includes(`\`${percent}\``), percent);
  assert.ok(preHook.includes(`\`${countable}\``), countable);
  assert.equal(blockResetSuffix(undefined, at), "");

  assert.ok(
    preHook.includes(
      "The refusal then carries `Retry-After`: the whole seconds until that instant, plus one."
    )
  );
  assert.equal(retryAfterSecondsFor(NOW + 30_000, NOW), 31);
  assert.equal(retryAfterSecondsFor(NOW + 29_999, NOW), 30);
  assert.equal(retryAfterSecondsFor(null, NOW), undefined);
  for (const sentence of [
    "When the instant is not known, the refusal carries neither the sentence nor the header.",
    "An absolute cap refusal carries neither.",
    "The public code stays `quota_share_blocked`.",
    "The embeddings path ends its refusal with the same sentence and sends no `Retry-After`.",
  ]) {
    assert.ok(preHook.includes(sentence), sentence);
  }
});

test("the PATCH text, limits and error table are the handler's", () => {
  assert.match(consentApi, /^`PATCH \/api\/v1\/me\/quota\/\{provider\}` records/m);
  assert.ok(
    consentProse.includes(
      `It must be in the future and at most ${LENDING_UNTIL_MAX_MS}. A value below ${LENDING_UNTIL_MIN_MS} reads as seconds and is refused.`
    )
  );
  assert.match(handlerSource, /SELF_LENDING_MAX_BODY_BYTES = 4096;/);
  assert.match(handlerSource, /readRequestBodyWithLimit\(request, SELF_LENDING_MAX_BODY_BYTES\)/);
  assert.ok(
    consentProse.includes(
      "A body longer than 4096 bytes is refused. The read stops at that size, so a longer body is never held whole."
    )
  );
  assert.match(handlerSource, /body\.lendingPercent > 0 && !isConsentPool\(ctx\.pool\)/);
  assert.ok(consentProse.includes("A body with `lendingPercent` 0 is accepted in either mode."));
  assert.match(handlerSource, /SELF_LENDING_RATE_LIMIT = \{ limit: 20, window: 60 \}/);
  assert.ok(consentProse.includes("The limit is 20 requests per 60 seconds for each key."));
  assert.ok(
    consentProse.includes(
      "The `self:usage` scope authorizes this one write, although its name reads as read-only."
    )
  );
  assert.match(handlerSource, /action: "quota\.pool\.lending\.updated"/);
  assert.ok(consentProse.includes("writes one `quota.pool.lending.updated` audit record."));

  const json = consentApi.match(/^```json\n([\s\S]+?)\n```$/m)?.[1];
  assert.ok(json, "the body example");
  const body = selfLendingPatchSchema.parse(JSON.parse(json));
  assert.equal(checkLendingDeadline(body.lendingUntil, NOW), "ok");

  const rows: Array<[number, string, string]> = [
    [404, "Not found", authSource],
    [401, "Valid API key required", authSource],
    [403, "API key lacks the self:usage scope", authSource],
    [400, "Invalid provider", handlerSource],
    [429, "Too many lending changes. Retry later.", handlerSource],
    [
      400,
      "Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.",
      handlerSource,
    ],
    [400, "lendingUntil must be a Unix time in milliseconds", handlerSource],
    [400, "lendingUntil must be in the future", handlerSource],
    [404, "Pool not found", handlerSource],
    [403, "Lending is not enabled for this pool", handlerSource],
    [500, "Failed to build quota view", quotaHandlerSource],
  ];
  const tableRows = consentApi.split("\n").filter((l) => /^\| \d{3} /.test(l));
  assert.equal(tableRows.length, rows.length, "one table row per refusal");
  rows.forEach(([status, message, source], i) => {
    assert.ok(source.includes(`"${message}"`), `the code has the message ${message}`);
    const escaped = message.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(tableRows[i], new RegExp(`^\\| ${status} +\\| \`${escaped}\` +\\|`));
  });
  assert.ok(
    tableRows[9].includes("The pool is in `saturation` mode and `lendingPercent` is above 0."),
    "the borrow mode refusal applies only to a consent above 0"
  );
});

test("the schema summary names the three columns the migration adds", () => {
  const sql = read("src/lib/db/migrations/20261121004221_quota_consent_lending.sql");
  for (const [table, column] of [
    ["quota_allocations", "lending_percent"],
    ["quota_allocations", "lending_until"],
    ["quota_pools", "borrow_mode"],
  ]) {
    assert.match(sql, new RegExp(`^ALTER TABLE ${table} ADD COLUMN ${column} `, "m"));
    assert.ok(section("## DB Schema Summary").includes(`\`${table}.${column}\``), column);
  }
});

interface OpenApiSchema {
  type?: string | string[];
  enum?: unknown[];
  required?: string[];
  properties?: Record<string, OpenApiSchema>;
  minimum?: number;
  maximum?: number;
  default?: unknown;
  pattern?: string;
  readOnly?: boolean;
  additionalProperties?: boolean;
  $ref?: string;
}
interface OpenApiOperation {
  security?: unknown;
  requestBody?: { content: { "application/json": { schema: OpenApiSchema } } };
  responses: Record<string, { headers?: Record<string, unknown> }>;
}
const spec = yaml.load(read("docs/openapi.yaml")) as {
  paths: Record<string, Record<string, OpenApiOperation>>;
  components: { schemas: Record<string, OpenApiSchema> };
};
const schemas = spec.components.schemas;

test("the OpenAPI PATCH has the GET's security, the strict body and every status", () => {
  const route = spec.paths["/api/v1/me/quota/{provider}"];
  assert.deepEqual(route.patch.security, route.get.security);
  assert.equal(
    route.patch.requestBody?.content["application/json"].schema.$ref,
    "#/components/schemas/SelfLendingPatch"
  );
  assert.deepEqual(Object.keys(route.patch.responses).sort(), [
    "200",
    "400",
    "401",
    "403",
    "404",
    "429",
    "500",
  ]);
  assert.ok(route.patch.responses["429"].headers?.["Retry-After"]);

  const body = schemas.SelfLendingPatch;
  assert.equal(body.additionalProperties, false);
  assert.deepEqual(body.required, ["pool", "lendingPercent"]);
  const pattern = new RegExp(body.properties?.pool.pattern ?? "(?!)");
  for (const ref of [`qpr_${"a".repeat(32)}`, `qpr_${"A".repeat(32)}`, `qpr_${"a".repeat(31)}`]) {
    assert.equal(
      pattern.test(ref),
      selfLendingPatchSchema.safeParse({ pool: ref, lendingPercent: 0 }).success,
      ref
    );
  }
  assert.deepEqual(
    [
      body.properties?.lendingPercent.type,
      body.properties?.lendingPercent.minimum,
      body.properties?.lendingPercent.maximum,
    ],
    ["integer", 0, 100]
  );
  assert.deepEqual(body.properties?.lendingUntil.type, ["integer", "null"]);
  assert.equal(body.properties?.lendingUntil.maximum, LENDING_UNTIL_MAX_MS);
});

test("the OpenAPI view and admin schemas carry the new fields", () => {
  const pool = schemas.SelfQuotaPool;
  assert.deepEqual(pool.properties?.borrowMode.enum, ["saturation", "consent"]);
  for (const field of ["lendingPercent", "lendingUntil", "lendingActive"]) {
    assert.ok(pool.required?.includes(field), field);
  }
  assert.deepEqual(
    [
      pool.properties?.lendingPercent.type,
      pool.properties?.lendingPercent.minimum,
      pool.properties?.lendingPercent.maximum,
      pool.properties?.lendingPercent.default,
    ],
    ["integer", 0, 100, 0]
  );
  assert.deepEqual(pool.properties?.lendingUntil.type, ["integer", "null"]);
  assert.equal(pool.properties?.lendingUntil.default, null);
  assert.equal(pool.properties?.lendingActive.default, false);
  assert.deepEqual(schemas.SelfQuotaShare.properties?.borrowAvailable.type, ["number", "null"]);
  assert.ok(!schemas.SelfQuotaShare.required?.includes("borrowAvailable"));

  assert.deepEqual(schemas.QuotaPool.properties?.borrowMode.enum, ["saturation", "consent"]);
  assert.equal(schemas.PoolAllocation.properties?.lendingPercent.readOnly, true);
  assert.equal(schemas.PoolAllocation.properties?.lendingUntil.readOnly, true);
  assert.equal(schemas.PoolCreate.properties?.borrowMode.default, "saturation");
  assert.deepEqual(schemas.PoolUpdate.properties?.borrowMode.enum, ["saturation", "consent"]);
});
