// The Import button and the re-sync run through
// POST /api/providers/[id]/sync-models, which refuses to store a degraded
// discovery (502 with `source` + `warning`). These are the B-03 (#15159) and
// #15069 contracts on that response: a fallback never reads as success or as
// "nothing new", an intentional built-in catalog is not a fallback (#5460 /
// #5465), and the dashboard's notion of "degraded" is the server's own.
import assert from "node:assert/strict";
import { test } from "node:test";

import { isDegradedDiscovery } from "../../src/app/api/providers/[id]/sync-models/degradedLocalCatalog.ts";
import {
  classifyModelSync,
  phaseOfModelSync,
} from "../../src/app/(dashboard)/dashboard/providers/[id]/hooks/modelImportWarning.ts";

const FALLBACK = {
  error: "HTTP 401",
  source: "local_catalog",
  warning: "No remote models discovered — using local catalog",
};

test("a degraded discovery is classified as degraded, with its warning and cause", () => {
  assert.deepEqual(classifyModelSync(false, 502, FALLBACK), {
    kind: "degraded",
    warning: "No remote models discovered — using local catalog",
    cause: "HTTP 401",
  });
});

test("#15069: a degraded discovery ends in the warning phase, never done", () => {
  const phase = phaseOfModelSync(classifyModelSync(false, 502, FALLBACK));
  assert.equal(phase, "warning", "the dialog would show a false success");
});

test("a degraded cached or public catalog is flagged too", () => {
  for (const source of ["github_catalog", "cache"]) {
    const outcome = classifyModelSync(false, 502, {
      error: "x",
      source,
      warning: "stale upstream",
    });
    assert.equal(outcome.kind, "degraded", `${source} with a warning must be degraded`);
  }
});

test("a failure that is not a discovery fallback is an error with its message", () => {
  assert.deepEqual(classifyModelSync(false, 404, { error: "Connection not found" }), {
    kind: "failed",
    error: "Connection not found",
  });
  assert.deepEqual(classifyModelSync(false, 500, { error: { message: "boom" } }), {
    kind: "failed",
    error: "boom",
  });
  assert.deepEqual(classifyModelSync(false, 503, null), { kind: "failed", error: "HTTP 503" });
  assert.equal(phaseOfModelSync(classifyModelSync(false, 503, null)), "error");
});

test("#5460/#5465: an intentional built-in catalog is the provider's list, not a fallback", () => {
  const outcome = classifyModelSync(true, 200, {
    ok: true,
    source: "local_catalog",
    intentional: true,
    warning: "Model discovery is not configured for this provider — using local catalog",
    addedModelIds: ["a"],
  });

  assert.deepEqual(outcome, {
    kind: "no-listing",
    warning: "Model discovery is not configured for this provider — using local catalog",
    addedModelIds: ["a"],
  });
  assert.equal(phaseOfModelSync(outcome), "done");
});

test("a live listing reports the models it added and the ones no longer listed", () => {
  const outcome = classifyModelSync(true, 200, {
    ok: true,
    source: "api",
    addedModelIds: ["b"],
    removedModelIds: ["c"],
  });

  assert.deepEqual(outcome, { kind: "synced", addedModelIds: ["b"], removedModelIds: ["c"] });
  assert.equal(phaseOfModelSync(outcome), "done");
});

test("a live listing with nothing new is a true success", () => {
  assert.deepEqual(
    classifyModelSync(true, 200, {
      ok: true,
      source: "api",
      addedModelIds: [],
      removedModelIds: [],
    }),
    { kind: "synced", addedModelIds: [], removedModelIds: [] }
  );
});

test("a free-only connection whose provider lists no free model says so", () => {
  assert.deepEqual(classifyModelSync(true, 200, { ok: true, freeFilterEmpty: true }), {
    kind: "free-filter-empty",
  });
});

test("the dashboard classifier agrees with the server's own definition of degraded", () => {
  // If the server's rule changes, this fails and the two cannot silently disagree.
  const samples: Array<Record<string, unknown>> = [
    { source: "local_catalog" },
    { source: "local_catalog", intentional: true },
    { source: "local_catalog", warning: "w" },
    { source: "cache" },
    { source: "cache", warning: "w" },
    { source: "github_catalog", warning: "w" },
    { source: "api" },
    { source: "api", warning: "ignored" },
  ];

  for (const body of samples) {
    const phase = phaseOfModelSync(classifyModelSync(false, 502, { error: "x", ...body }));
    // A degraded discovery is the only failure that ends in "warning".
    assert.equal(
      phase === "warning",
      isDegradedDiscovery(body),
      `classification diverged from the server rule for ${JSON.stringify(body)}`
    );
  }
});
