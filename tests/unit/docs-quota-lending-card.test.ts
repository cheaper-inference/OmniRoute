/**
 * Pins the lending card paragraphs of the self-service page docs to the code: the durations come
 * from LENDING_DURATIONS, the percentage bounds from the PATCH body schema, the route and method
 * from what the page's client sends, and each refusal class from the client's status table and
 * the catalog text it selects.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

import {
  LENDING_DURATIONS,
  LENDING_UNTIL_FORMAT,
  buildLendingSubmission,
  describeLending,
  lendingBorrowRows,
  lendingCardKind,
  lendingDraft,
  lendingErrorText,
  lendingFormView,
  parseLendingPercent,
} from "../../src/app/quota/[provider]/lib/lendingForm.ts";
import {
  quotaPath,
  sendSelfService,
} from "../../src/app/quota/[provider]/lib/selfServiceClient.ts";
import { useLendingSave } from "../../src/app/quota/[provider]/lib/useLendingSave.ts";
import { selfLendingPatchSchema } from "../../src/shared/schemas/selfQuota.ts";

const ROOT = process.cwd();
const read = (file: string) => readFileSync(path.join(ROOT, file), "utf8");
const doc = read("docs/routing/QUOTA_SHARE.md");
const catalog = JSON.parse(read("src/i18n/messages/en.json")).quotaSelf as Record<string, string>;

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

const page = section("### Self-service page");
const prose = fold(page);

/** The five lending card paragraphs of the section, in order. */
function cardParagraphs(): string[] {
  const paragraphs = page.split(/\n\s*\n/).map(fold);
  const start = paragraphs.findIndex((p) => p.startsWith("A pool in `consent` mode shows"));
  assert.ok(start >= 0, "the lending card paragraph is missing");
  return paragraphs.slice(start, start + 5);
}

const PATH = quotaPath("claude");
const POOL = "qpr_0123456789abcdef0123456789abcdef";
const KEY = "sk-docs-card-key";

function has(sentence: string) {
  assert.ok(prose.includes(sentence), `missing sentence: ${sentence}`);
}

type Recorded = { url: string; method: string; headers: Headers; body: string };

function answering(response: () => Promise<Response>, calls: Recorded[]): typeof fetch {
  return (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({
      url: String(url),
      method: init?.method ?? "GET",
      headers: new Headers(init?.headers),
      body: typeof init?.body === "string" ? init.body : "",
    });
    return response();
  }) as typeof fetch;
}

const status =
  (code: number, headers: Record<string, string> = {}) =>
  () =>
    Promise.resolve(new Response("{}", { status: code, headers }));

/** The hook's actions, from one render of a component that calls it (it keeps its own refs). */
function saveActions(input: Parameters<typeof useLendingSave>[0]) {
  let actions: ReturnType<typeof useLendingSave> | null = null;
  function Probe() {
    actions = useLendingSave(input);
    return null;
  }
  renderToString(createElement(Probe));
  if (!actions) throw new Error("the hook did not render");
  return actions as ReturnType<typeof useLendingSave>;
}

/** What the card shows for one answer: catalog text, reload button, automatic reload. */
async function outcomeOf(response: () => Promise<Response>) {
  const original = globalThis.fetch;
  globalThis.fetch = answering(response, []);
  let reloads = 0;
  try {
    const actions = saveActions({
      path: PATH,
      apiKey: KEY,
      adopt: () => {},
      reload: () => {
        reloads++;
      },
      epoch: 0,
    });
    const result = await actions.save(
      { pool: POOL, lendingPercent: 25, lendingUntil: null },
      new AbortController().signal
    );
    assert.equal(result.kind, "error");
    if (result.kind !== "error") throw new Error("expected an error");
    const text = lendingErrorText(result.error, result.retryAfterSeconds);
    return { text: catalog[text.key], button: text.reload, reloads };
  } finally {
    globalThis.fetch = original;
  }
}

test("the lending card paragraphs follow the key paragraph and keep the docs style", () => {
  const paragraphs = page.split(/\n\s*\n/).map(fold);
  const key = paragraphs.findIndex((p) => p.startsWith("The page has no session."));
  assert.ok(key >= 0);
  assert.ok(paragraphs[key + 1].startsWith("A pool in `consent` mode shows a lending card."));
  for (const paragraph of cardParagraphs()) {
    assert.ok(!paragraph.includes("—"), "no em dash");
    assert.ok(!paragraph.includes(";"), "no semicolon");
    for (const sentence of paragraph.split(/(?<=\.) /)) {
      assert.ok(sentence.split(" ").length <= 25, `too long: ${sentence}`);
    }
  }
});

test("the key paragraph names the PATCH the page sends, with the key only in the header", async () => {
  has(
    "The key is sent only in the `Authorization` header of `GET /api/v1/me/quota/{provider}`, " +
      "`PATCH /api/v1/me/quota/{provider}` and `GET /api/v1/me/usage`, never in a URL."
  );
  has("Each press sends one `PATCH /api/v1/me/quota/{provider}` request");
  assert.equal(
    quotaPath("PROVIDER").replace("PROVIDER", "{provider}"),
    "/api/v1/me/quota/{provider}"
  );

  const calls: Recorded[] = [];
  const patch = { pool: POOL, lendingPercent: 25, lendingUntil: null };
  await sendSelfService({
    path: PATH,
    apiKey: KEY,
    body: patch,
    schema: { safeParse: () => ({ success: false }) } as never,
    signal: new AbortController().signal,
    fetchImpl: answering(status(500), calls),
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].method, "PATCH");
  assert.equal(calls[0].url, "/api/v1/me/quota/claude");
  assert.equal(calls[0].headers.get("Authorization"), `Bearer ${KEY}`);
  assert.deepEqual(JSON.parse(calls[0].body), patch);
  assert.ok(!calls[0].url.includes(KEY) && !calls[0].body.includes(KEY));
  has("The body carries the pool's opaque `ref` from the view, the percentage and the deadline.");
});

test("the save sentences match what the page does after a press", () => {
  // Pinned through the page in tests/unit/ui/quota-self-lending.test.tsx: "two presses send one
  // request" and "a second press on Withdraw while the first is pending sends nothing".
  has(
    "Each press sends one `PATCH /api/v1/me/quota/{provider}` request, and a second press sends nothing while the first is pending."
  );
  has("The answer is the rebuilt quota view, and the page shows it with no second read.");
  // Pinned through the page in tests/unit/ui/quota-self-lending.test.tsx: "two saves at once are
  // followed by one read" and "two saves one after the other send no read".
  has("When two saves overlap, the page reads the quota once after the last answer.");
  has("The page does not keep the consent in browser storage.");
  const dir = "src/app/quota/[provider]";
  const lendingFiles = ["lib", "components"].flatMap((sub) =>
    readdirSync(path.join(ROOT, dir, sub))
      .filter((name) => /lending/i.test(name))
      .map((name) => `${dir}/${sub}/${name}`)
  );
  assert.ok(lendingFiles.length >= 5);
  for (const file of lendingFiles) {
    assert.ok(!/Storage/.test(read(file)), `${file} names a browser storage`);
  }
});

test("the documented percentage bounds are the PATCH schema's", () => {
  has(
    "There the key holder sets a whole percentage from 0 to 100 of the key's idle share to lend."
  );
  const accepts = (lendingPercent: number) =>
    selfLendingPatchSchema.safeParse({ pool: POOL, lendingPercent, lendingUntil: null }).success;
  assert.equal(accepts(0), true);
  assert.equal(accepts(100), true);
  assert.equal(accepts(-1), false);
  assert.equal(accepts(101), false);
  assert.equal(accepts(12.5), false);
  assert.deepEqual(["0", "100", "101", "-1", "12.5"].map(parseLendingPercent), [
    0,
    100,
    null,
    null,
    null,
  ]);
});

test("the documented durations are LENDING_DURATIONS, in order", () => {
  const named = LENDING_DURATIONS.map((d) => {
    const unit = d.unit === "hours" ? "hour" : "day";
    return `${d.value} ${unit}${d.value === 1 ? "" : "s"}`;
  });
  const list = `${named.slice(0, -1).join(", ")} or ${named[named.length - 1]}`;
  has(`The holder also picks how long the consent lasts: until turned off, ${list}.`);
  has("A duration counts from the moment of saving.");
  assert.equal(catalog.lendingDeadlineNone, "Until I turn it off");
});

test("the deadline and ended-consent sentences match the rules", () => {
  has("The card shows the stored deadline with its time zone named.");
  assert.equal(LENDING_UNTIL_FORMAT.timeZoneName, "short");
  has("A consent whose deadline has passed is shown as ended.");
  has("With 0% no deadline is sent.");
  const now = Date.parse("2026-05-27T15:30:00.000Z");
  const lending = describeLending({
    lendingPercent: 40,
    lendingUntil: now + 3_600_000,
    lendingActive: true,
  });
  for (const deadline of ["keep", "24h", "none"] as const) {
    assert.deepEqual(buildLendingSubmission({ percent: "0", deadline }, lending, now), {
      ok: true,
      lendingPercent: 0,
      lendingUntil: null,
    });
  }
  assert.equal(
    describeLending({ lendingPercent: 40, lendingUntil: 1, lendingActive: false }).kind,
    "ended"
  );

  has("If that deadline passes before Save, the card sends nothing and asks for another choice.");
  const ended = describeLending({
    lendingPercent: 40,
    lendingUntil: now + 3_600_000,
    lendingActive: false,
  });
  const kept = lendingDraft({ percent: "40", deadline: "keep" }, lending, null);
  const { values } = lendingFormView(kept, ended);
  assert.equal(values.deadline, "keep");
  assert.deepEqual(buildLendingSubmission(values, ended, now), { ok: false, problem: "deadline" });
});

test("the documented cards are the ones lendingCardKind picks", () => {
  has("A pool in `saturation` mode whose key stores a percentage above 0 shows a withdrawal only.");
  has("A pool in `saturation` mode with a stored 0 shows no lending card.");
  // Pinned through the page in tests/unit/ui/quota-self-lending.test.tsx (the withdrawal test).
  has(
    "After a save, a card that the returned view no longer needs stays with its message until the page's view changes again."
  );
  has("Its Withdraw button sends 0 with no deadline.");
  assert.equal(catalog.lendingWithdraw, "Withdraw");
  assert.equal(lendingCardKind({ borrowMode: "consent", lendingPercent: 0 }), "full");
  assert.equal(lendingCardKind({ borrowMode: "saturation", lendingPercent: 5 }), "withdraw");
  assert.equal(lendingCardKind({ borrowMode: "saturation", lendingPercent: 0 }), "none");
});

test("the documented figures of what others lend are the ones lendingBorrowRows returns", () => {
  has("Each row is one figure for all other keys together.");
  has("In a pool of two keys it is the other key's own figure.");
  has("A figure the view does not report reads as not available, not as zero.");
  has("For a `soft` or `burst` key the card says that no figure applies.");
  const dims = [
    { window: "daily", unit: "requests", yourShare: { borrowAvailable: 40 } },
    { window: "weekly", unit: "requests", yourShare: { borrowAvailable: null } },
    { window: "monthly", unit: "requests", yourShare: {} },
  ] as never;
  const rows = lendingBorrowRows({ policy: "hard", dimensions: dims });
  assert.equal(rows.kind, "rows");
  if (rows.kind === "rows")
    assert.deepEqual(
      rows.rows.map((r) => r.amount),
      [40, null, null]
    );
  for (const policy of ["soft", "burst"] as const) {
    assert.equal(lendingBorrowRows({ policy, dimensions: dims }).kind, "not-applicable");
  }
});

test("each documented refusal class is the text and reload the page picks for that status", async () => {
  has("A refused change is explained on the card by a text chosen from the HTTP status.");

  has("A 401 says the key was not accepted and reloads the quota.");
  const key = await outcomeOf(status(401));
  assert.ok(key.text.startsWith("This key was not accepted"));
  assert.deepEqual([key.button, key.reloads], [false, 1]);

  has("A 403 says the pool is not taking lending changes, and a 404 says the pool is gone.");
  has("Both offer a button that reloads the quota.");
  const closed = await outcomeOf(status(403));
  assert.ok(closed.text.startsWith("This pool is not taking lending changes"));
  assert.deepEqual([closed.button, closed.reloads], [true, 0]);
  const gone = await outcomeOf(status(404));
  assert.ok(gone.text.startsWith("This pool is no longer available"));
  assert.deepEqual([gone.button, gone.reloads], [true, 0]);

  has("A 400 or another 4xx answer asks the holder to check the percentage and the deadline.");
  const rejected = await outcomeOf(status(400));
  assert.ok(rejected.text.includes("Check the percentage and the deadline"));
  assert.deepEqual([rejected.button, rejected.reloads], [false, 0]);
  const otherClientError = await outcomeOf(status(422));
  assert.equal(otherClientError.text, rejected.text);
  assert.deepEqual([otherClientError.button, otherClientError.reloads], [false, 0]);

  has(
    "A 429 asks the holder to wait, with the seconds of `Retry-After` when the answer gives them."
  );
  const timed = await outcomeOf(status(429, { "Retry-After": "7" }));
  assert.ok(timed.text.includes("{seconds, plural"));
  const untimed = await outcomeOf(status(429));
  assert.equal(untimed.text, catalog.lendingErrorRateLimitedUnknown);

  has(
    "A 5xx answer, a 408 or a network failure says the change may not have been saved, and keeps the typed values."
  );
  for (const response of [
    status(500),
    status(503),
    status(408),
    () => Promise.reject(new TypeError("x")),
  ]) {
    const failed = await outcomeOf(response);
    assert.ok(failed.text.includes("the change may not have been saved"));
    assert.deepEqual([failed.button, failed.reloads], [false, 0]);
  }

  has("An answer outside the contract reloads the quota.");
  const unreadable = await outcomeOf(status(200));
  assert.equal(unreadable.text, catalog.lendingErrorUnreadable);
  assert.equal(unreadable.reloads, 1);

  has("A failed save does not remove the key by itself.");
  const client = read("src/app/quota/[provider]/lib/useLendingSave.ts");
  assert.ok(!/Storage|unpersist|forget/i.test(client.replace(/^\s*(\*|\/\/).*$/gm, "")));
  // Pinned through the page in tests/unit/ui/quota-self-lending-errors.test.tsx: "a 403 on save
  // followed by a refused reload runs the page's own refusal".
  has("When the reload after it is refused, the page removes the key as on any refused read.");
});
