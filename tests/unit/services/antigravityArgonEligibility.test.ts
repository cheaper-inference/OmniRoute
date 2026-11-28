import test from "node:test";
import assert from "node:assert/strict";
import { isModelExcludedByConnection } from "../../../src/domain/connectionModelRules.ts";

const { persistThenReport, syncAntigravitySubscriptionIfNeeded } =
  await import("../../../src/lib/usage/providerLimits.ts");
const { applyAntigravityArgonEligibilityToPsd, logArgonEligibilityNotices } =
  await import("../../../src/lib/usage/antigravityArgonExclusions.ts");
const { markArgonEligible, markArgonIneligible } =
  await import("../../../src/lib/usage/antigravityArgonExclusions.ts");
type ArgonEligibilityNotice =
  import("../../../src/lib/usage/antigravityArgonExclusions.ts").ArgonEligibilityNotice;

test("markArgonIneligible: appends the guard through its own entry point", () => {
  // nextPsd is a copy of psd, the shape every production caller passes.
  const psd: Record<string, unknown> = { excludedModels: ["gemini-4*"], connectionTestModel: "x" };
  const nextPsd: Record<string, unknown> = { ...psd };
  const notices: ArgonEligibilityNotice[] = [];
  assert.equal(markArgonIneligible(psd, nextPsd, notices), true);
  assert.equal(nextPsd.hasArgon, false);
  assert.deepEqual(nextPsd.excludedModels, ["*argon*"]);
  assert.equal(nextPsd.connectionTestModel, "x");
  assert.deepEqual(notices, ["legacy-blanket-exclusion-removed"]);
  // The contract is "only nextPsd keys are written": the caller's own record is untouched.
  assert.deepEqual(psd, { excludedModels: ["gemini-4*"], connectionTestModel: "x" });
});

test("markArgonEligible: strips the guard through its own entry point", () => {
  const psd: Record<string, unknown> = { hasArgon: false, excludedModels: ["*argon*", 5] };
  const nextPsd: Record<string, unknown> = { ...psd };
  const notices: ArgonEligibilityNotice[] = [];
  assert.equal(markArgonEligible(psd, nextPsd, notices), true);
  assert.equal(nextPsd.hasArgon, true);
  assert.deepEqual(nextPsd.excludedModels, [5]);
  assert.deepEqual(notices, []);
  assert.deepEqual(psd, { hasArgon: false, excludedModels: ["*argon*", 5] });
});

test("logArgonEligibilityNotices: one tagged line per notice, silent when empty, repeating when repeated", () => {
  const calls: unknown[][] = [];
  const errors: unknown[][] = [];
  const original = console.warn;
  const originalError = console.error;
  console.warn = (...args: unknown[]) => {
    calls.push(args);
  };
  // A change of sink must show up here rather than silently redirect the report.
  console.error = (...args: unknown[]) => {
    errors.push(args);
  };
  try {
    logArgonEligibilityNotices("conn-silent", []);
    assert.deepEqual(calls, []);

    logArgonEligibilityNotices("conn-shape", [
      "legacy-blanket-exclusion-removed",
      "unreadable-exclusion-list-replaced",
    ]);
    assert.equal(calls.length, 2);
    for (const call of calls) {
      // One formatted line per notice: a caller that splits the message or drops the tag fails.
      assert.equal(call.length, 1);
      assert.equal(typeof call[0], "string");
      assert.match(String(call[0]), /^\[ProviderLimits\] /);
      assert.match(String(call[0]), /conn-shape/);
    }
    assert.match(String(calls[0][0]), /legacy-blanket-exclusion-removed/);
    assert.match(String(calls[1][0]), /unreadable-exclusion-list-replaced/);

    // A preserved unreadable value recurs on every pass and is reported each time: the field
    // is still corrupt, so silence would be a lie about the state.
    logArgonEligibilityNotices("conn-repeat", ["unreadable-exclusion-list-preserved"]);
    logArgonEligibilityNotices("conn-repeat", ["unreadable-exclusion-list-preserved"]);
    assert.equal(calls.length, 4);
    assert.match(String(calls[2][0]), /conn-repeat/);
    assert.match(String(calls[3][0]), /conn-repeat/);
    assert.deepEqual(errors, []);
  } finally {
    console.warn = original;
    console.error = originalError;
  }
});

test("persistThenReport: a failing report does not turn a landed write into an error", async () => {
  let ran = false;
  const value = await persistThenReport(
    async () => {
      ran = true;
      return "written";
    },
    () => {
      throw new Error("logger exploded");
    }
  );
  assert.equal(ran, true);
  assert.equal(value, "written");
});

test("persistThenReport: the report runs only after the write resolves", async () => {
  const order: string[] = [];
  const value = await persistThenReport(
    async () => {
      order.push("persist");
      return 7;
    },
    () => order.push("report")
  );
  assert.equal(value, 7);
  assert.deepEqual(order, ["persist", "report"]);

  // A failed write must not be reported as done.
  const failedOrder: string[] = [];
  await assert.rejects(
    persistThenReport(
      async () => {
        failedOrder.push("persist");
        throw new Error("write failed");
      },
      () => failedOrder.push("report")
    ),
    /write failed/
  );
  assert.deepEqual(failedOrder, ["persist"]);
});

function agyConnection(psd: Record<string, unknown>) {
  return { id: "conn-under-test", provider: "agy", providerSpecificData: psd } as never;
}

function captureWarn() {
  const lines: string[] = [];
  const original = console.warn;
  console.warn = (...args: unknown[]) => {
    lines.push(args.map((arg) => String(arg)).join(" "));
  };
  return { lines, restore: () => (console.warn = original) };
}

test("syncAntigravitySubscriptionIfNeeded: a No-Argon account gets the bucket guard in the persisted record", async () => {
  const writes: Array<{ id: string; update: Record<string, unknown> }> = [];
  const warn = captureWarn();
  try {
    const out = await syncAntigravitySubscriptionIfNeeded(
      agyConnection({ hasArgon: true, excludedModels: ["gemini-4*", "claude-3-haiku*"] }),
      { hasArgon: false },
      {
        updateProviderConnection: (async (id: string, update: Record<string, unknown>) => {
          writes.push({ id, update });
          return null;
        }) as never,
      }
    );

    assert.equal(writes.length, 1, "one write");
    assert.equal(writes[0].id, "conn-under-test");
    const persisted = writes[0].update.providerSpecificData as Record<string, unknown>;
    assert.deepEqual(persisted.excludedModels, ["claude-3-haiku*", "*argon*"]);
    assert.equal(persisted.hasArgon, false);
    // The returned connection mirrors the write, so the caller sees the same state.
    assert.deepEqual(
      (out as { providerSpecificData: Record<string, unknown> }).providerSpecificData,
      persisted
    );
    assert.equal(warn.lines.length, 1);
    assert.match(warn.lines[0], /legacy-blanket-exclusion-removed/);
  } finally {
    warn.restore();
  }
});

test("syncAntigravitySubscriptionIfNeeded: the Argon step keeps fields the subscription step wrote", async () => {
  // Passing the pre-subscription psd into the Argon step would drop these, and only a behaviour
  // test on the real function can see that.
  const writes: Array<Record<string, unknown>> = [];
  const warn = captureWarn();
  try {
    await syncAntigravitySubscriptionIfNeeded(
      agyConnection({ excludedModels: ["gemini-4*"] }),
      // A truthy subscriptionInfo is what makes the subscription step run; `plan` is its field.
      { hasArgon: false, plan: "Pro", subscriptionInfo: {} },
      {
        updateProviderConnection: (async (_id: string, update: Record<string, unknown>) => {
          writes.push(update);
          return null;
        }) as never,
      }
    );

    const persisted = writes[0].providerSpecificData as Record<string, unknown>;
    assert.equal(persisted.plan, "Pro", "subscription field survives the Argon step");
    assert.deepEqual(persisted.excludedModels, ["*argon*"]);
  } finally {
    warn.restore();
  }
});

test("syncAntigravitySubscriptionIfNeeded: a non-boolean hasArgon changes nothing and writes nothing", async () => {
  const writes: unknown[] = [];
  const warn = captureWarn();
  try {
    const connection = agyConnection({ hasArgon: false, excludedModels: ["gemini-4*"] });
    const out = await syncAntigravitySubscriptionIfNeeded(
      connection,
      { hasArgon: "unknown" },
      {
        updateProviderConnection: (async () => {
          writes.push(1);
          return null;
        }) as never,
      }
    );

    assert.equal(writes.length, 0, "no write without a boolean reading");
    assert.equal(out, connection, "the caller's record is returned untouched");
    assert.deepEqual(warn.lines, []);
  } finally {
    warn.restore();
  }
});

test("syncAntigravitySubscriptionIfNeeded: a failed persist reports nothing", async () => {
  const warn = captureWarn();
  try {
    await assert.rejects(
      syncAntigravitySubscriptionIfNeeded(
        agyConnection({ hasArgon: true, excludedModels: ["gemini-4*"] }),
        { hasArgon: false },
        {
          updateProviderConnection: (async () => {
            throw new Error("db write failed");
          }) as never,
        }
      ),
      /db write failed/
    );
    assert.deepEqual(warn.lines, [], "no report for a write that never landed");
  } finally {
    warn.restore();
  }
});

test("syncAntigravitySubscriptionIfNeeded: an eligible account keeps the pool guard off after the flip", async () => {
  const writes: Array<Record<string, unknown>> = [];
  const warn = captureWarn();
  try {
    await syncAntigravitySubscriptionIfNeeded(
      agyConnection({ hasArgon: false, excludedModels: ["*argon*", "claude-3-haiku*"] }),
      { hasArgon: true },
      {
        updateProviderConnection: (async (_id: string, update: Record<string, unknown>) => {
          writes.push(update);
          return null;
        }) as never,
      }
    );

    const persisted = writes[0].providerSpecificData as Record<string, unknown>;
    assert.equal(persisted.hasArgon, true);
    assert.deepEqual(persisted.excludedModels, ["claude-3-haiku*"]);
  } finally {
    warn.restore();
  }
});

test("applyAntigravityArgonEligibilityToPsd: when hasArgon is false on empty psd", () => {
  const psd = {};
  const result = applyAntigravityArgonEligibilityToPsd(psd, false);

  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, false);
  // Only the Argon bucket is withheld: a No-Argon account still runs the Gemini-4 fleet.
  assert.deepEqual(result.nextPsd.excludedModels, ["*argon*"]);
});

test("applyAntigravityArgonEligibilityToPsd: when hasArgon is false preserves existing operator exclusions", () => {
  const psd = {
    excludedModels: ["claude-3-haiku*", "gpt-4*"],
  };
  const result = applyAntigravityArgonEligibilityToPsd(psd, false);

  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, false);
  assert.deepEqual(result.nextPsd.excludedModels, ["claude-3-haiku*", "gpt-4*", "*argon*"]);
});

test("applyAntigravityArgonEligibilityToPsd: when hasArgon is false drops the legacy blanket gemini-4* entry", () => {
  const psd = {
    hasArgon: false,
    excludedModels: ["claude-3-haiku*", "gemini-4*", "*argon*"],
  };
  const result = applyAntigravityArgonEligibilityToPsd(psd, false);

  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, false);
  assert.deepEqual(result.nextPsd.excludedModels, ["claude-3-haiku*", "*argon*"]);
});

test("applyAntigravityArgonEligibilityToPsd: when hasArgon is false is idempotent", () => {
  const psd = {
    hasArgon: false,
    excludedModels: ["claude-3-haiku*", "*argon*"],
  };
  const result = applyAntigravityArgonEligibilityToPsd(psd, false);

  assert.equal(result.changed, false);
  assert.equal(result.nextPsd.hasArgon, false);
  assert.deepEqual(result.nextPsd.excludedModels, ["claude-3-haiku*", "*argon*"]);
});

test("applyAntigravityArgonEligibilityToPsd: when hasArgon is false keeps non-string entries it does not own", () => {
  // The rewrite must only take out what this module wrote: a malformed entry the operator
  // or an older build left behind is not ours to delete.
  const psd = { hasArgon: false, excludedModels: ["gemini-4*", 42, "*argon*"] };
  const result = applyAntigravityArgonEligibilityToPsd(psd, false);

  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, false);
  assert.deepEqual(result.nextPsd.excludedModels, [42, "*argon*"]);
  assert.deepEqual(result.notices, ["legacy-blanket-exclusion-removed"]);
});

test("applyAntigravityArgonEligibilityToPsd: hasArgon false strips the legacy entry and appends the Argon one in one call", () => {
  const psd = { hasArgon: false, excludedModels: ["gemini-4*", "claude-3-haiku*"] };
  const result = applyAntigravityArgonEligibilityToPsd(psd, false);

  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, false);
  // Strip and append happen together, and the appended pattern lands after what was kept.
  assert.deepEqual(result.nextPsd.excludedModels, ["claude-3-haiku*", "*argon*"]);

  const rerun = applyAntigravityArgonEligibilityToPsd({ ...result.nextPsd }, false);
  assert.equal(rerun.changed, false);
  assert.deepEqual(rerun.nextPsd.excludedModels, ["claude-3-haiku*", "*argon*"]);
  assert.deepEqual(rerun.notices, []);
});

test("applyAntigravityArgonEligibilityToPsd: hasArgon false keeps duplicate entries it does not own", () => {
  const psd = { hasArgon: false, excludedModels: ["*argon*", "*argon*", 7] };
  const result = applyAntigravityArgonEligibilityToPsd(psd, false);

  // A duplicate is already the pattern the guard wants, so nothing is appended and nothing
  // is deduplicated: this function synchronises one entry, it does not clean the list.
  assert.equal(result.changed, false);
  assert.equal(result.nextPsd.hasArgon, false);
  assert.deepEqual(result.nextPsd.excludedModels, ["*argon*", "*argon*", 7]);
  assert.deepEqual(result.notices, []);
  assert.deepEqual(psd, { hasArgon: false, excludedModels: ["*argon*", "*argon*", 7] });
});

test("applyAntigravityArgonEligibilityToPsd: hasArgon false strips duplicate legacy entries into one guard", () => {
  const psd = { hasArgon: false, excludedModels: ["gemini-4*", "gemini-4*"] };
  const result = applyAntigravityArgonEligibilityToPsd(psd, false);

  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, false);
  assert.deepEqual(result.nextPsd.excludedModels, ["*argon*"]);
  assert.deepEqual(result.notices, ["legacy-blanket-exclusion-removed"]);
});

test("applyAntigravityArgonEligibilityToPsd: hasArgon true strips every duplicate of a managed pattern", () => {
  const psd = {
    hasArgon: true,
    excludedModels: ["gemini-4*", "*argon*", "*argon*", "claude-3-haiku*"],
  };
  const result = applyAntigravityArgonEligibilityToPsd(psd, true);

  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, true);
  assert.deepEqual(result.nextPsd.excludedModels, ["claude-3-haiku*"]);
  assert.deepEqual(result.notices, ["legacy-blanket-exclusion-removed"]);
});

test("applyAntigravityArgonEligibilityToPsd: a stored string is read the way consumers read it", () => {
  const single = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: false, excludedModels: "claude-3-haiku*" },
    false
  );
  assert.equal(single.changed, true);
  assert.equal(single.nextPsd.hasArgon, false);
  assert.deepEqual(single.nextPsd.excludedModels, ["claude-3-haiku*", "*argon*"]);

  // Consumers split a comma-separated string, so it holds two patterns, not one odd one.
  const commaSeparated = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: false, excludedModels: "claude-3-haiku*, gemini-4*" },
    false
  );
  assert.equal(commaSeparated.changed, true);
  assert.equal(commaSeparated.nextPsd.hasArgon, false);
  assert.deepEqual(commaSeparated.nextPsd.excludedModels, ["claude-3-haiku*", "*argon*"]);
});

test("applyAntigravityArgonEligibilityToPsd: hasArgon true lifts a guard stored as a bare string", () => {
  // The eligible path reads the field the same way the ineligible path does, so a guard left
  // in a shape other than a list still comes off when the account regains the Argon pool.
  const result = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: true, excludedModels: "*argon*" },
    true
  );

  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, true);
  assert.deepEqual(result.nextPsd.excludedModels, []);
  // "*argon*" is the auto-managed pattern, not the legacy one, so nothing was migrated.
  assert.deepEqual(result.notices, []);

  const kept = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: true, excludedModels: "claude-3-haiku*" },
    true
  );
  assert.equal(kept.changed, false);
  assert.deepEqual(kept.nextPsd.excludedModels, "claude-3-haiku*");
});

test("applyAntigravityArgonEligibilityToPsd: an empty or comma-only string still gets the guard", () => {
  for (const empty of ["", "   ", ", ,", ","]) {
    const result = applyAntigravityArgonEligibilityToPsd(
      { hasArgon: false, excludedModels: empty },
      false
    );
    assert.equal(result.changed, true);
    assert.equal(result.nextPsd.hasArgon, false);
    assert.deepEqual(result.nextPsd.excludedModels, ["*argon*"]);
    assert.deepEqual(result.notices, []);
  }
});

test("applyAntigravityArgonEligibilityToPsd: eligible with no prior flag writes the flag and strips", () => {
  // psd.hasArgon is undefined on older records: the flag write and the strip happen together.
  const result = applyAntigravityArgonEligibilityToPsd(
    { excludedModels: ["gemini-4*", "claude-3-haiku*"] },
    true
  );
  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, true);
  assert.deepEqual(result.nextPsd.excludedModels, ["claude-3-haiku*"]);
  assert.deepEqual(result.notices, ["legacy-blanket-exclusion-removed"]);
});

test("applyAntigravityArgonEligibilityToPsd: a record with no excludedModels at all gets the guard", () => {
  // Older records omit the field entirely; that is not the same as an unreadable value.
  const missing = applyAntigravityArgonEligibilityToPsd({ hasArgon: false }, false);
  assert.equal(missing.changed, true);
  assert.deepEqual(missing.nextPsd.excludedModels, ["*argon*"]);
  assert.deepEqual(missing.notices, []);

  const undefinedField = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: false, excludedModels: undefined },
    false
  );
  assert.deepEqual(undefinedField.nextPsd.excludedModels, ["*argon*"]);
  assert.deepEqual(undefinedField.notices, []);
});

test("markArgonIneligible: an unreadable list is replaced and reported through its own entry point", () => {
  const psd: Record<string, unknown> = { hasArgon: false, excludedModels: 42 };
  const nextPsd: Record<string, unknown> = { ...psd };
  const notices: ArgonEligibilityNotice[] = [];
  assert.equal(markArgonIneligible(psd, nextPsd, notices), true);
  assert.deepEqual(nextPsd.excludedModels, ["*argon*"]);
  assert.deepEqual(notices, ["unreadable-exclusion-list-replaced"]);
  assert.deepEqual(psd, { hasArgon: false, excludedModels: 42 });
});

test("markArgonEligible: the notices parameter defaults, so a direct caller can ignore it", () => {
  const psd: Record<string, unknown> = { hasArgon: true, excludedModels: 42 };
  const nextPsd: Record<string, unknown> = { ...psd };
  // No notices array passed: the call must still work and leave the value alone.
  assert.equal(markArgonEligible(psd, nextPsd), false);
  assert.deepEqual(nextPsd, { hasArgon: true, excludedModels: 42 });
});

test("applyAntigravityArgonEligibilityToPsd: a legacy excluded_models list is read, kept and retired", () => {
  // Three readers in this repo still honour the snake_case spelling, so a value stored there
  // must survive the rewrite instead of being replaced by the guard.
  const psd = { hasArgon: false, excluded_models: ["gemini-4*", "claude-3-haiku*"] };
  const result = applyAntigravityArgonEligibilityToPsd(psd, false);

  assert.equal(result.changed, true);
  assert.deepEqual(result.nextPsd.excludedModels, ["claude-3-haiku*", "*argon*"]);
  assert.equal(
    "excluded_models" in result.nextPsd,
    false,
    "the legacy key is retired, not left stale"
  );
  assert.deepEqual(psd.excluded_models, ["gemini-4*", "claude-3-haiku*"], "input untouched");

  const eligible = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: true, excluded_models: ["*argon*", "claude-3-haiku*"] },
    true
  );
  assert.deepEqual(eligible.nextPsd.excludedModels, ["claude-3-haiku*"]);
  assert.equal("excluded_models" in eligible.nextPsd, false);

  // A record with both spellings keeps the canonical one authoritative.
  const both = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: false, excludedModels: ["claude-3-haiku*"], excluded_models: ["other*"] },
    false
  );
  assert.deepEqual(both.nextPsd.excludedModels, ["claude-3-haiku*", "*argon*"]);
  assert.deepEqual((both.nextPsd as Record<string, unknown>).excluded_models, ["other*"]);
});

test("applyAntigravityArgonEligibilityToPsd: managed patterns match regardless of case or padding", () => {
  const ineligible = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: false, excludedModels: ["Gemini-4* ", "claude-3-haiku*"] },
    false
  );
  assert.equal(ineligible.changed, true);
  assert.equal(ineligible.nextPsd.hasArgon, false);
  assert.deepEqual(ineligible.nextPsd.excludedModels, ["claude-3-haiku*", "*argon*"]);

  // Consumers trim each stored pattern before a case-insensitive glob match, so a guard
  // written with padding or other casing is already effective and is left as it is.
  const alreadyGuarded = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: false, excludedModels: [" *ARGON* ", "claude-3-haiku*"] },
    false
  );
  assert.equal(alreadyGuarded.changed, false);
  assert.deepEqual(alreadyGuarded.nextPsd.excludedModels, [" *ARGON* ", "claude-3-haiku*"]);

  const eligible = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: true, excludedModels: ["  GEMINI-4*", "claude-3-haiku*"] },
    true
  );
  assert.equal(eligible.changed, true);
  assert.equal(eligible.nextPsd.hasArgon, true);
  assert.deepEqual(eligible.nextPsd.excludedModels, ["claude-3-haiku*"]);
  assert.deepEqual(eligible.notices, ["legacy-blanket-exclusion-removed"]);
});

test("applyAntigravityArgonEligibilityToPsd: the exclusion match itself tolerates padding and case", () => {
  // This is the premise behind treating a variant as "already present"; pinning it means a
  // future tightening of the consumer's matching shows up here instead of silently leaving
  // accounts unguarded.
  assert.equal(
    isModelExcludedByConnection("gemini-4-argon-high", { excludedModels: ["*ARGON*"] }),
    true
  );
  assert.equal(
    isModelExcludedByConnection("gemini-4-argon-high", { excludedModels: [" *ARGON* "] }),
    true
  );

  const repaired = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: false, excludedModels: [] },
    false
  );
  assert.deepEqual(repaired.nextPsd.excludedModels, ["*argon*"]);
  assert.equal(isModelExcludedByConnection("gemini-4-argon-high", repaired.nextPsd), true);
});

test("applyAntigravityArgonEligibilityToPsd: a strip reports itself so the migration is observable", () => {
  const ineligible = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: false, excludedModels: ["gemini-4*"] },
    false
  );
  assert.deepEqual(ineligible.notices, ["legacy-blanket-exclusion-removed"]);

  const eligible = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: true, excludedModels: ["gemini-4*"] },
    true
  );
  assert.deepEqual(eligible.notices, ["legacy-blanket-exclusion-removed"]);

  const replaced = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: false, excludedModels: 42 },
    false
  );
  assert.equal(replaced.changed, true);
  assert.equal(replaced.nextPsd.hasArgon, false);
  assert.deepEqual(replaced.nextPsd.excludedModels, ["*argon*"]);
  assert.deepEqual(replaced.notices, ["unreadable-exclusion-list-replaced"]);

  // The eligible path cannot lift what it cannot read, so it reports the value it left alone
  // instead of staying silent about a corrupted field.
  const preserved = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: true, excludedModels: 42 },
    true
  );
  assert.equal(preserved.changed, false);
  assert.deepEqual(preserved.nextPsd.excludedModels, 42);
  assert.deepEqual(preserved.notices, ["unreadable-exclusion-list-preserved"]);

  const quiet = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: false, excludedModels: ["*argon*"] },
    false
  );
  assert.deepEqual(quiet.notices, []);
});

test("applyAntigravityArgonEligibilityToPsd: null reads as an empty list", () => {
  const result = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: false, excludedModels: null },
    false
  );

  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, false);
  assert.deepEqual(result.nextPsd.excludedModels, ["*argon*"]);
  assert.deepEqual(result.notices, []);
});

test("applyAntigravityArgonEligibilityToPsd: an uninterpretable shape gives way to the Argon guard", () => {
  // Nothing can read these as a list, so keeping them would leave the Argon bucket open on a
  // No-Argon account. The guard wins, and the eligible path still leaves the value alone.
  for (const broken of [{ patterns: ["*argon*"] }, 42, true]) {
    const ineligible = applyAntigravityArgonEligibilityToPsd(
      { hasArgon: false, excludedModels: broken },
      false
    );
    assert.equal(ineligible.changed, true);
    assert.equal(ineligible.nextPsd.hasArgon, false);
    assert.deepEqual(ineligible.nextPsd.excludedModels, ["*argon*"]);
    assert.equal(isModelExcludedByConnection("gemini-4-argon-high", ineligible.nextPsd), true);

    const eligible = applyAntigravityArgonEligibilityToPsd(
      { hasArgon: true, excludedModels: broken },
      true
    );
    assert.equal(eligible.changed, false);
    assert.equal(eligible.nextPsd.hasArgon, true);
    assert.deepEqual(eligible.nextPsd.excludedModels, broken);
    assert.deepEqual(eligible.notices, ["unreadable-exclusion-list-preserved"]);
  }
});

test("applyAntigravityArgonEligibilityToPsd: hasArgon false appends the Argon pattern after kept non-strings", () => {
  const psd = { hasArgon: false, excludedModels: [42] };
  const result = applyAntigravityArgonEligibilityToPsd(psd, false);

  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, false);
  assert.deepEqual(result.nextPsd.excludedModels, [42, "*argon*"]);
});

test("applyAntigravityArgonEligibilityToPsd: when hasArgon is true strips auto-managed patterns", () => {
  const psd = {
    hasArgon: false,
    excludedModels: ["claude-3-haiku*", "gemini-4*", "*argon*"],
  };
  const result = applyAntigravityArgonEligibilityToPsd(psd, true);

  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, true);
  assert.deepEqual(result.nextPsd.excludedModels, ["claude-3-haiku*"]);

  const rerun = applyAntigravityArgonEligibilityToPsd({ ...result.nextPsd }, true);
  assert.equal(rerun.changed, false);
  assert.deepEqual(rerun.nextPsd.excludedModels, ["claude-3-haiku*"]);
  assert.deepEqual(rerun.notices, []);
});

test("applyAntigravityArgonEligibilityToPsd: never writes the user-facing connectionTestModel setting", () => {
  // connectionTestModel is an operator setting read by the provider test-message route;
  // a quota sync must not silently pick it for the user.
  const unset = applyAntigravityArgonEligibilityToPsd({}, true);
  assert.equal(unset.changed, true);
  assert.equal("connectionTestModel" in unset.nextPsd, false);

  const userChosen = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: true, connectionTestModel: "gemini-3.8-flash" },
    true
  );
  assert.equal(userChosen.changed, false);
  assert.equal(userChosen.nextPsd.connectionTestModel, "gemini-3.8-flash");

  const ineligible = applyAntigravityArgonEligibilityToPsd({}, false);
  assert.equal("connectionTestModel" in ineligible.nextPsd, false);
});

test("applyAntigravityArgonEligibilityToPsd: when hasArgon is true is idempotent", () => {
  const psd = {
    hasArgon: true,
    connectionTestModel: "gemini-4-argon",
    excludedModels: ["claude-3-haiku*"],
  };
  const result = applyAntigravityArgonEligibilityToPsd(psd, true);

  assert.equal(result.changed, false);
  assert.equal(result.nextPsd.hasArgon, true);
  assert.equal(result.nextPsd.connectionTestModel, "gemini-4-argon");
  assert.deepEqual(result.nextPsd.excludedModels, ["claude-3-haiku*"]);
});

test("applyAntigravityArgonEligibilityToPsd: non-boolean hasArgon does not modify psd", () => {
  const psd = { hasArgon: false, excludedModels: ["gemini-4*"] };

  for (const invalid of [undefined, null, "true", 1, {}, []]) {
    const result = applyAntigravityArgonEligibilityToPsd(psd, invalid);
    assert.equal(result.changed, false);
    assert.equal(result.nextPsd.hasArgon, false);
    // No eligibility signal means no cleanup: only a real hasArgon reading rewrites the list.
    assert.deepEqual(result.nextPsd.excludedModels, ["gemini-4*"]);
    assert.deepEqual(result.notices, []);
  }
});

test("isModelExcludedByConnection: integrates correctly with applyAntigravityArgonEligibilityToPsd", () => {
  const initialPsd = {
    excludedModels: ["claude-3-haiku*"],
  };
  const { nextPsd: ineligiblePsd } = applyAntigravityArgonEligibilityToPsd(initialPsd, false);

  // The Argon bucket is withheld, so Argon-only models stay unreachable.
  assert.equal(isModelExcludedByConnection("gemini-4-argon", ineligiblePsd), true);
  assert.equal(isModelExcludedByConnection("gemini-4-argon-high", ineligiblePsd), true);
  assert.equal(
    isModelExcludedByConnection("antigravity/gemini-4-argon-medium", ineligiblePsd),
    true
  );

  // The rest of the Gemini-4 fleet is not Argon-gated: excluding it took working models
  // offline and left combos answering 503 with zero attempts.
  assert.equal(isModelExcludedByConnection("gemini-4-neon-high", ineligiblePsd), false);
  assert.equal(isModelExcludedByConnection("agy/gemini-4-neon-high", ineligiblePsd), false);
  assert.equal(isModelExcludedByConnection("gemini-4-hydrogen-tiered-xhigh", ineligiblePsd), false);

  assert.equal(isModelExcludedByConnection("gemini-3.8-flash", ineligiblePsd), false);
  assert.equal(isModelExcludedByConnection("gemini-2.5-pro", ineligiblePsd), false);

  assert.equal(isModelExcludedByConnection("claude-3-haiku-20240307", ineligiblePsd), true);

  const { nextPsd: eligiblePsd } = applyAntigravityArgonEligibilityToPsd(ineligiblePsd, true);

  assert.equal(isModelExcludedByConnection("gemini-4-argon", eligiblePsd), false);
  assert.equal(isModelExcludedByConnection("gemini-4-argon-high", eligiblePsd), false);
  assert.equal(
    isModelExcludedByConnection("antigravity/gemini-4-argon-medium", eligiblePsd),
    false
  );

  assert.equal(isModelExcludedByConnection("claude-3-haiku-20240307", eligiblePsd), true);
});
