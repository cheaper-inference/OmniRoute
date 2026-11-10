/**
 * Durability fix for pinned Muse scopes: `call:` references that were never served
 * through this scope under the current owner generation (e.g. tool calls issued by
 * OTHER models in the same ZCode thread, replayed by auto-compaction) must be
 * recorded under owner.generation instead of 409-killing the turn on every retry.
 *
 * Still fail-closed on the pinned branch:
 *  - `item:` references and `opaque:` encrypted_content hashes (self-healing those
 *    would let a caller mint continuation ids it never received);
 *  - owners without a generation (legacy bare rows) — there is nothing to bind to;
 *  - cross-account forced mismatch (409) and unavailable owner (503).
 *
 * Qualification note: before the heal landed, the healing cases (tests 1, 2 and the
 * stale-generation re-record) threw MuseOwnershipError 409 "Muse tool continuation
 * was not issued to this session and caller generation." from the reference loop in
 * claimMuseSession; they were run failing-first against the unpatched tree.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  museSessionScope,
  claimMuseSession,
  bindMuseGeneration,
} from "../../src/sse/services/museSessionOwnership.ts";
import {
  readMuseOwnershipValue,
  writeMuseOwnershipValue,
} from "../../src/lib/db/museSessionOwnership.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { opaqueTokenFingerprint } from "../../open-sse/utils/opaqueTokenFingerprint.ts";

const accountA = { id: "pinned-adoption-account-a" };
const accountB = { id: "pinned-adoption-account-b" };
const referenceKey = (scope: string, id: string) =>
  `reference:${scope}:${opaqueTokenFingerprint(id)}`;

// Responses-style history a sole available account can adopt (same shape the
// tool-adoption suite uses); bindMuseGeneration then records "call:legacy-call".
const adoptionBody = {
  input: [
    { type: "function_call", call_id: "legacy-call", name: "read", arguments: "{}" },
    { type: "function_call_output", call_id: "legacy-call", output: "fixture result" },
  ],
};

function scopeFor(session: string): string {
  return museSessionScope({ session_id: session }, undefined, "pinned-client");
}

/** Adopted + bound pinned scope: owner has generation set and "call:legacy-call" recorded. */
function pinScope(session: string): { scope: string; generation: string } {
  const scope = scopeFor(session);
  const owner = claimMuseSession(scope, structuredClone(adoptionBody), [accountA]);
  assert.equal(owner.connectionId, accountA.id);
  const generation = bindMuseGeneration(
    scope,
    accountA.id,
    `${session}-credential`,
    "pinned-identity"
  );
  return { scope, generation };
}

test("pinned scope heals a never-served call: reference by recording it under owner.generation", () => {
  // This claim failed 409 "not issued" before the heal landed (failing-first).
  const { scope, generation } = pinScope("heal-missing");
  const healed = structuredClone(adoptionBody);
  healed.input.push(
    { type: "function_call", call_id: "foreign-call", name: "list", arguments: "{}" },
    { type: "function_call_output", call_id: "foreign-call", output: "other model result" }
  );
  const owner = claimMuseSession(scope, healed, [accountA]);
  assert.equal(owner.connectionId, accountA.id);
  assert.equal(
    readMuseOwnershipValue(referenceKey(scope, "call:foreign-call")),
    generation,
    "the healed reference is recorded under the current owner generation"
  );
});

test("after healing, a repeat claim with the same foreign call: reference passes", () => {
  const { scope, generation } = pinScope("heal-repeat");
  const body = {
    messages: [
      {
        role: "assistant",
        tool_calls: [
          { id: "foreign-tool", type: "function", function: { name: "list", arguments: "{}" } },
        ],
      },
      { role: "tool", tool_call_id: "foreign-tool", content: "other model result" },
    ],
  };
  // First claim performs the healing (failed 409 before the heal landed); this also
  // pins the chat tool_calls/tool-role form of call: references.
  claimMuseSession(scope, structuredClone(body), [accountA]);
  assert.equal(readMuseOwnershipValue(referenceKey(scope, "call:foreign-tool")), generation);
  const owner = claimMuseSession(scope, structuredClone(body), [accountA]);
  assert.equal(owner.connectionId, accountA.id);
});

test("pinned scope still rejects a never-served opaque encrypted_content hash", () => {
  const { scope } = pinScope("opaque-failclosed");
  const body = {
    input: [{ type: "reasoning", encrypted_content: "foreign-opaque" }],
  };
  assert.throws(() => claimMuseSession(scope, body, [accountA]), /not issued/);
});

test("pinned scope owner without a generation stays fail-closed for any reference", () => {
  // Legacy bare owner row: no service path creates one, so write it directly.
  const scope = scopeFor("legacy-bare-owner");
  writeMuseOwnershipValue(`session:${scope}`, JSON.stringify({ connectionId: accountA.id }));
  assert.throws(
    () => claimMuseSession(scope, structuredClone(adoptionBody), [accountA]),
    /not issued/
  );
});

test("pinned scope still rejects an item: reference with an unknown id", () => {
  const { scope } = pinScope("item-failclosed");
  const body = {
    input: [...adoptionBody.input, { type: "item_reference", id: "item-unknown" }],
  };
  assert.throws(() => claimMuseSession(scope, body, [accountA]), /not issued/);
});

test("a reference recorded under a stale generation is re-recorded under the current one", () => {
  // Fresh-prompt owner (no recorded items yet) so a credential rotation is allowed;
  // then plant a reference row from the older generation.
  const scope = scopeFor("stale-generation");
  claimMuseSession(scope, { input: "fresh" }, [accountA]);
  const stale = bindMuseGeneration(scope, accountA.id, "stale-credential", "pinned-identity");
  const current = bindMuseGeneration(scope, accountA.id, "current-credential", "pinned-identity");
  assert.notEqual(stale, current);
  writeMuseOwnershipValue(referenceKey(scope, "call:stale-call"), stale);
  const body = {
    input: [{ type: "function_call", call_id: "stale-call", name: "read", arguments: "{}" }],
  };
  // This threw 409 "not issued" before the heal landed (row held the stale generation).
  const owner = claimMuseSession(scope, body, [accountA]);
  assert.equal(owner.connectionId, accountA.id);
  assert.equal(
    readMuseOwnershipValue(referenceKey(scope, "call:stale-call")),
    current,
    "the stale row is re-recorded under the current owner generation"
  );
});

test("a heal is rolled back when a later reference in the same body stays fail-closed", () => {
  const { scope } = pinScope("heal-rollback");
  const body = {
    input: [
      { type: "function_call_output", call_id: "rollback-call", output: "other model result" },
      { type: "item_reference", id: "item-unknown" },
    ],
  };
  assert.throws(() => claimMuseSession(scope, body, [accountA]), /not issued/);
  assert.equal(
    readMuseOwnershipValue(referenceKey(scope, "call:rollback-call")),
    undefined,
    "no healed row survives the rolled-back claim"
  );
});

test("pinned scope keeps the cross-account and unavailable-owner guards", () => {
  const { scope } = pinScope("regression-guards");
  assert.throws(
    () => claimMuseSession(scope, structuredClone(adoptionBody), [accountA, accountB], accountB.id),
    /differs/
  );
  assert.throws(
    () =>
      claimMuseSession(scope, structuredClone(adoptionBody), [{ ...accountA, unavailable: true }]),
    /unavailable/
  );
  assert.equal(
    claimMuseSession(scope, structuredClone(adoptionBody), [accountA]).connectionId,
    accountA.id
  );
});

test.after(() => resetDbInstance());
