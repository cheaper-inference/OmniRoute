import { test } from "node:test";
import assert from "node:assert/strict";
import {
  museSessionScope,
  claimMuseSession,
  bindMuseGeneration,
} from "../../src/sse/services/museSessionOwnership.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { readMuseOwnershipValue } from "../../src/lib/db/museSessionOwnership.ts";
import { opaqueTokenFingerprint } from "../../open-sse/utils/opaqueTokenFingerprint.ts";

const accountA = { id: "adoption-account-a" };
const accountB = { id: "adoption-account-b" };
const histories: { name: string; body: Record<string, unknown>; forcedId?: string }[] = [
  {
    name: "Responses function_call/function_call_output",
    body: {
      input: [
        { type: "function_call", call_id: "legacy-call", name: "read", arguments: "{}" },
        { type: "function_call_output", call_id: "legacy-call", output: "fixture result" },
      ],
    },
  },
  {
    name: "chat assistant tool_calls/role tool",
    body: {
      messages: [
        {
          role: "assistant",
          tool_calls: [
            { id: "legacy-call", type: "function", function: { name: "read", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "legacy-call", content: "fixture result" },
      ],
    },
    forcedId: accountA.id,
  },
];

function scopeFor(session: string): string {
  return museSessionScope({ session_id: session }, undefined, "adoption-client");
}

for (const { name, body, forcedId } of histories) {
  test(`${name}: a sole available account adopts legacy history and binds its actual generation`, () => {
    const scope = scopeFor(`adopt-${name}`);
    const before = structuredClone(body);
    assert.equal(claimMuseSession(scope, body, [accountA], forcedId).connectionId, accountA.id);
    const generation = bindMuseGeneration(
      scope,
      accountA.id,
      "adoption-key-1",
      "adoption-identity"
    );
    assert.equal(
      bindMuseGeneration(scope, accountA.id, "adoption-key-1", "adoption-identity"),
      generation
    );
    assert.equal(claimMuseSession(scope, body, [accountA]).connectionId, accountA.id);
    assert.equal(claimMuseSession(scope, body, [accountA, accountB]).connectionId, accountA.id);
    assert.deepEqual(body, before);

    // Pinned scopes self-heal foreign call: references under the bound generation;
    // item references and opaque history stay fail-closed.
    const healableUnknowns = [
      { input: [{ type: "function_call", call_id: "new-call", name: "read", arguments: "{}" }] },
      { input: [{ type: "function_call_output", call_id: "new-call", output: "unknown" }] },
      {
        messages: [
          {
            role: "assistant",
            tool_calls: [
              { id: "new-call", type: "function", function: { name: "read", arguments: "{}" } },
            ],
          },
        ],
      },
      { messages: [{ role: "tool", tool_call_id: "new-call", content: "unknown" }] },
    ];
    for (const healable of healableUnknowns) {
      assert.equal(claimMuseSession(scope, healable, [accountA]).connectionId, accountA.id);
      assert.equal(
        readMuseOwnershipValue(`reference:${scope}:${opaqueTokenFingerprint("call:new-call")}`),
        generation
      );
    }
    for (const unknown of [
      { input: [{ type: "item_reference", id: "unknown-item" }] },
      { input: [{ type: "reasoning", encrypted_content: "unknown-opaque" }] },
    ]) {
      assert.throws(() => claimMuseSession(scope, unknown, [accountA]), /not issued/);
    }
    assert.throws(
      () => bindMuseGeneration(scope, accountA.id, "adoption-key-2", "adoption-identity"),
      /generation changed/
    );
    assert.throws(
      () => bindMuseGeneration(scope, accountA.id, "adoption-key-1", "different-identity"),
      /owner changed/
    );
    assert.throws(
      () => bindMuseGeneration(scope, accountB.id, "adoption-key-1", "adoption-identity"),
      /owner changed/
    );
    assert.throws(() => claimMuseSession(scope, body, [accountB]), /unavailable/);
    assert.throws(
      () => claimMuseSession(scope, body, [accountA, accountB], accountB.id),
      /differs/
    );
    assert.equal(claimMuseSession(scope, body, [accountA]).connectionId, accountA.id);
    assert.equal(
      bindMuseGeneration(scope, accountA.id, "adoption-key-1", "adoption-identity"),
      generation
    );
  });

  const rejectedCandidates = [
    { name: "two available candidates", candidates: [accountA, accountB] },
    {
      name: "two total candidates with one unavailable",
      candidates: [accountA, { ...accountB, unavailable: true }],
      forcedId: accountA.id,
    },
    { name: "no candidates", candidates: [] },
    { name: "sole unavailable candidate", candidates: [{ ...accountA, unavailable: true }] },
    { name: "conflicting forcedId", candidates: [accountA], forcedId: accountB.id },
  ];
  for (const rejected of rejectedCandidates) {
    test(`${name}: rejects adoption with ${rejected.name}`, () => {
      const scope = scopeFor(`reject-${name}-${rejected.name}`);
      assert.throws(
        () => claimMuseSession(scope, body, rejected.candidates, rejected.forcedId),
        /no recorded owner/
      );
      assert.equal(
        claimMuseSession(scope, { input: "independent fresh prompt" }, [accountB]).connectionId,
        accountB.id
      );
    });
  }

  const forbiddenHistory = [
    {
      name: "unknown encrypted_content",
      extra: { metadata: { encrypted_content: "unknown-opaque" } },
    },
    { name: "previous_response_id", extra: { previous_response_id: "unknown-response" } },
    {
      name: "resumed previous response",
      extra: { _omniroutePreviousResponseResumed: true },
    },
    {
      name: "item_reference",
      extra: { input: [{ type: "item_reference", id: "unknown-item" }] },
    },
  ];
  for (const { name: forbidden, extra } of forbiddenHistory) {
    test(`${name}: rejects adoption with ${forbidden}`, () => {
      const scope = scopeFor(`opaque-${name}-${forbidden}`);
      const imported = structuredClone(body);
      if (extra.input && Array.isArray(imported.input)) {
        imported.input.push(...extra.input);
      } else {
        Object.assign(imported, extra);
      }
      assert.throws(() => claimMuseSession(scope, imported, [accountA]), /no recorded owner/);
      assert.equal(
        claimMuseSession(scope, { input: "independent fresh prompt" }, [accountB]).connectionId,
        accountB.id
      );
    });
  }

  test(`${name}: an unserved existing owner self-heals imported call history on the same account`, () => {
    const scope = scopeFor(`existing-${name}`);
    claimMuseSession(scope, { input: "fresh" }, [accountA]);
    const generation = bindMuseGeneration(scope, accountA.id, "existing-key", "existing-identity");
    assert.equal(claimMuseSession(scope, body, [accountA]).connectionId, accountA.id);
    assert.equal(
      readMuseOwnershipValue(`reference:${scope}:${opaqueTokenFingerprint("call:legacy-call")}`),
      generation
    );
    assert.equal(
      claimMuseSession(scope, { input: "fresh retry" }, [accountA]).connectionId,
      accountA.id
    );
  });

  for (const unavailable of [false, true]) {
    test(`${name}: imported history cannot move an unserved existing owner (unavailable=${unavailable})`, () => {
      const scope = scopeFor(`existing-move-${name}-${unavailable}`);
      claimMuseSession(scope, { input: "fresh" }, [accountA]);
      bindMuseGeneration(scope, accountA.id, "existing-key", "existing-identity");
      const remaining = unavailable ? [{ ...accountA, unavailable: true }, accountB] : [accountB];
      assert.throws(
        () => claimMuseSession(scope, body, remaining, accountB.id),
        /no recorded owner/
      );
      assert.equal(
        claimMuseSession(scope, { input: "fresh retry" }, [accountA]).connectionId,
        accountA.id
      );
    });
  }
}

test.after(() => resetDbInstance());
