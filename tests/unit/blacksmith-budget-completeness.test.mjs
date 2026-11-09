import test from "node:test";
import assert from "node:assert/strict";
import { decide, usedMinutes } from "../../scripts/ci/blacksmith-budget.mjs";

const NOW = Date.UTC(2026, 10, 3, 23);
const options = {
  repo: "fixture/repository",
  token: "",
  api: "https://budget-fixture.invalid",
  selfRunId: 999999,
  now: NOW,
};
const run = (id, conclusion = "success") => ({ id, status: "completed", conclusion });
const job = (id, minutes = 0) => ({
  id,
  runner_name: "blacksmith-fixture",
  labels: ["blacksmith-2vcpu-ubuntu-2404"],
  started_at: new Date(NOW - minutes * 60000).toISOString(),
  completed_at: new Date(NOW).toISOString(),
});
const body = (key, rows, total = rows.length) => ({ total_count: total, [key]: rows });

function transport(t, respond) {
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, init) => {
    const parsed = new URL(url);
    assert.equal(parsed.origin, options.api);
    assert.equal(parsed.searchParams.get("per_page"), "100");
    calls.push(parsed);
    const result = respond(parsed, calls.length, init);
    if (result instanceof Error) throw result;
    return {
      ok: result.ok !== false,
      status: result.ok === false ? 403 : 200,
      headers: new Headers(result.link ? { link: result.link } : {}),
      json: async () => result.body,
    };
  });
  return calls;
}

function sequence(t, responses) {
  return transport(t, (_url, index) => {
    assert.ok(index <= responses.length, "unexpected request");
    return responses[index - 1];
  });
}

// Mirrors the unchanged main catch boundary: an incomplete estimate cannot select Blacksmith.
async function selection() {
  try {
    const used = await usedMinutes(options);
    return { blacksmith: decide({ want: "blacksmith", used, cap: 2500 }), used, complete: true };
  } catch {
    return { blacksmith: false, used: null, complete: false };
  }
}

test("B01 cancelled runs with completed jobs contribute to the estimate", async (t) => {
  const calls = sequence(t, [
    { body: body("workflow_runs", [run(1, "cancelled")]) },
    { body: body("jobs", [job(11, 2600)]) },
  ]);
  assert.deepEqual(await selection(), { blacksmith: false, used: 2600, complete: true });
  assert.equal(calls.length, 2);
  assert.equal(calls[1].searchParams.get("filter"), "all");
});

test("B02 the second jobs page must contribute before a runner is selected", async (t) => {
  const calls = sequence(t, [
    { body: body("workflow_runs", [run(1)]) },
    {
      body: body(
        "jobs",
        Array.from({ length: 100 }, (_, i) => job(i + 1)),
        101
      ),
    },
    { body: body("jobs", [job(101, 2600)], 101) },
  ]);
  assert.deepEqual(await selection(), { blacksmith: false, used: 2600, complete: true });
  assert.equal(calls[2].searchParams.get("page"), "2");
});

test("B03 a missing runs collection is unknown rather than zero usage", async (t) => {
  sequence(t, [{ body: { total_count: 0 } }]);
  assert.deepEqual(await selection(), { blacksmith: false, used: null, complete: false });
});

test("B04 a short runs page below total_count is unknown", async (t) => {
  const calls = sequence(t, [{ body: body("workflow_runs", [run(options.selfRunId)], 2) }]);
  assert.deepEqual(await selection(), { blacksmith: false, used: null, complete: false });
  assert.equal(calls.length, 1);
});

test("B05 a saturated filtered search is unknown even when total_count says 1000", async (t) => {
  const calls = transport(t, (url) => {
    if (url.pathname.endsWith("/jobs")) return { body: body("jobs", []) };
    const page = Number(url.searchParams.get("page"));
    return {
      body: body(
        "workflow_runs",
        Array.from({ length: 100 }, (_, i) => run((page - 1) * 100 + i + 1)),
        1000
      ),
    };
  });
  assert.deepEqual(await selection(), { blacksmith: false, used: null, complete: false });
  assert.equal(calls.length, 1);
});

test("B06 a missing jobs collection is unknown rather than zero usage", async (t) => {
  sequence(t, [{ body: body("workflow_runs", [run(1)]) }, { body: { total_count: 0 } }]);
  assert.deepEqual(await selection(), { blacksmith: false, used: null, complete: false });
});

test("B07 complete empty data permits the configured choice", async (t) => {
  sequence(t, [{ body: body("workflow_runs", []) }]);
  assert.deepEqual(await selection(), { blacksmith: true, used: 0, complete: true });
});

test("B08 complete data below the cap remains an estimate that permits Blacksmith", async (t) => {
  sequence(t, [{ body: body("workflow_runs", [run(1)]) }, { body: body("jobs", [job(11, 42)]) }]);
  assert.deepEqual(await selection(), { blacksmith: true, used: 42, complete: true });
});

test("B09 an unstarted cancelled job contributes zero, not guessed minutes", async (t) => {
  sequence(t, [
    { body: body("workflow_runs", [run(1, "cancelled")]) },
    { body: body("jobs", [{ ...job(11), started_at: null, completed_at: null }]) },
  ]);
  assert.deepEqual(await selection(), { blacksmith: true, used: 0, complete: true });
});

test("B10 a failing later page invalidates the entire partial estimate", async (t) => {
  sequence(t, [
    { body: body("workflow_runs", [run(1)]) },
    {
      body: body(
        "jobs",
        Array.from({ length: 100 }, (_, i) => job(i + 1)),
        101
      ),
    },
    { ok: false },
  ]);
  assert.deepEqual(await selection(), { blacksmith: false, used: null, complete: false });
});

test("B11 drifting totals between pages are unknown", async (t) => {
  sequence(t, [
    { body: body("workflow_runs", [run(1)]) },
    {
      body: body(
        "jobs",
        Array.from({ length: 100 }, (_, i) => job(i + 1)),
        101
      ),
    },
    { body: body("jobs", [job(101), job(102)], 102) },
  ]);
  assert.deepEqual(await selection(), { blacksmith: false, used: null, complete: false });
});

test("B12 duplicate job IDs cannot establish complete pagination", async (t) => {
  sequence(t, [
    { body: body("workflow_runs", [run(1)]) },
    { body: body("jobs", [job(11), job(11)]) },
  ]);
  assert.deepEqual(await selection(), { blacksmith: false, used: null, complete: false });
});

test("B13 a next Link after the advertised total is contradictory", async (t) => {
  sequence(t, [
    { body: body("workflow_runs", []), link: '<https://budget-fixture.invalid/page2>; rel="next"' },
  ]);
  assert.deepEqual(await selection(), { blacksmith: false, used: null, complete: false });
});

test("B14 missing and noninteger totals are unknown", async (t) => {
  for (const count of [undefined, -1, 0.5, "0"]) {
    const mock = t.mock.method(globalThis, "fetch", async () => ({
      ok: true,
      headers: new Headers(),
      json: async () => ({ total_count: count, workflow_runs: [] }),
    }));
    assert.deepEqual(await selection(), { blacksmith: false, used: null, complete: false });
    mock.mock.restore();
  }
});

test("B15 the jobs page ceiling fails closed before any partial sum", async (t) => {
  sequence(t, [
    { body: body("workflow_runs", [run(1)]) },
    {
      body: body(
        "jobs",
        Array.from({ length: 100 }, (_, i) => job(i + 1)),
        1001
      ),
    },
  ]);
  assert.deepEqual(await selection(), { blacksmith: false, used: null, complete: false });
});

test("B16 aggregate request count is finite and exhaustion is unknown", async (t) => {
  const calls = transport(t, (url) => {
    if (url.pathname.endsWith("/jobs")) return { body: body("jobs", []) };
    const page = Number(url.searchParams.get("page"));
    return {
      body: body(
        "workflow_runs",
        Array.from({ length: page === 1 ? 100 : 29 }, (_, i) => run((page - 1) * 100 + i + 1)),
        129
      ),
    };
  });
  assert.deepEqual(await selection(), { blacksmith: false, used: null, complete: false });
  assert.equal(calls.length, 128);
});

test("B17 valid two-page run listing includes all unique runs", async (t) => {
  const calls = transport(t, (url) => {
    if (url.pathname.endsWith("/jobs")) {
      const id = Number(url.pathname.split("/").at(-2));
      return { body: body("jobs", id === 101 ? [job(1001, 42)] : []) };
    }
    const page = Number(url.searchParams.get("page"));
    return {
      body: body(
        "workflow_runs",
        Array.from({ length: page === 1 ? 100 : 1 }, (_, i) => run((page - 1) * 100 + i + 1)),
        101
      ),
    };
  });
  assert.deepEqual(await selection(), { blacksmith: true, used: 42, complete: true });
  assert.equal(calls.length, 103);
});

test("B18 current run remains excluded after the complete runs listing", async (t) => {
  const calls = sequence(t, [{ body: body("workflow_runs", [run(options.selfRunId)]) }]);
  assert.deepEqual(await selection(), { blacksmith: true, used: 0, complete: true });
  assert.equal(calls.length, 1);
});

test("B19 invalid job timestamps cannot silently reduce the estimate", async (t) => {
  sequence(t, [
    { body: body("workflow_runs", [run(1)]) },
    { body: body("jobs", [{ ...job(11), started_at: "invalid" }]) },
  ]);
  assert.deepEqual(await selection(), { blacksmith: false, used: null, complete: false });
});

test("B20 missing runner classification metadata is unknown", async (t) => {
  sequence(t, [
    { body: body("workflow_runs", [run(1)]) },
    {
      body: body("jobs", [
        {
          id: 11,
          started_at: new Date(NOW).toISOString(),
          completed_at: new Date(NOW).toISOString(),
        },
      ]),
    },
  ]);
  assert.deepEqual(await selection(), { blacksmith: false, used: null, complete: false });
});

test("B21 collector forwards a shared abort signal to every mocked request", async (t) => {
  const signals = [];
  transport(t, (url, _index, init) => {
    signals.push(init.signal);
    return {
      body: url.pathname.endsWith("/jobs") ? body("jobs", []) : body("workflow_runs", [run(1)]),
    };
  });
  assert.equal((await selection()).complete, true);
  assert.ok(signals[0] instanceof AbortSignal);
  assert.equal(signals[0], signals[1]);
  assert.equal(signals[0].aborted, false);
});

test("B22 a request rejection preserves the hosted fallback", async (t) => {
  sequence(t, [new Error("fixture transport rejected")]);
  assert.deepEqual(await selection(), { blacksmith: false, used: null, complete: false });
});

test("B23 an exact full final jobs page does not require an invented empty page", async (t) => {
  const calls = sequence(t, [
    { body: body("workflow_runs", [run(1)]) },
    {
      body: body(
        "jobs",
        Array.from({ length: 100 }, (_, i) => job(i + 1, 1))
      ),
    },
  ]);
  assert.deepEqual(await selection(), { blacksmith: true, used: 100, complete: true });
  assert.equal(calls.length, 2);
});

test("B24 duplicate job IDs across pages cannot fill the advertised total", async (t) => {
  sequence(t, [
    { body: body("workflow_runs", [run(1)]) },
    {
      body: body(
        "jobs",
        Array.from({ length: 100 }, (_, i) => job(i + 1)),
        101
      ),
    },
    { body: body("jobs", [job(1)], 101) },
  ]);
  assert.deepEqual(await selection(), { blacksmith: false, used: null, complete: false });
});

test("B25 an expired collection deadline prevents further requests", async (t) => {
  const calls = sequence(t, []);
  t.mock.method(AbortSignal, "timeout", () => AbortSignal.abort());
  assert.deepEqual(await selection(), { blacksmith: false, used: null, complete: false });
  assert.equal(calls.length, 0);
});

test("B26 nonfinite or negative estimates and invalid caps do not permit Blacksmith", () => {
  for (const used of [NaN, Infinity, -1]) {
    assert.equal(decide({ want: "blacksmith", used, cap: 2500 }), false);
  }
  for (const cap of [NaN, Infinity, 0, -1]) {
    assert.equal(decide({ want: "blacksmith", used: 0, cap }), false);
  }
});
