import assert from "node:assert/strict";
import test from "node:test";
import { runProbePass, runReconciliation } from "../src/runner.ts";
import { enrichLocalEndpoints } from "../src/catalog.ts";
import type { LocalEndpoint } from "../src/types.ts";
import type { LiveCombo } from "../src/omniroute/plan.ts";

const endpoint: LocalEndpoint = {
  connectionId: "c",
  providerId: "claude",
  modelId: "claude-fable-5.2",
  billingClass: "subscription",
  active: true,
};

test("CPA failure stays independent and a second run does not reprobe", async () => {
  let probes = 0;
  const rows: LiveCombo[] = [];
  const clients = {
    async probe() {
      probes += 1;
      return { ok: true };
    },
    omniroute: {
      async list() {
        return structuredClone(rows);
      },
      async create(input: LiveCombo) {
        rows.push({ ...input, id: String(rows.length) });
      },
      async update(id: string, input: LiveCombo) {
        const index = rows.findIndex((row) => row.id === id);
        rows[index] = { ...input, id };
      },
      async delete(id: string) {
        const index = rows.findIndex((row) => row.id === id);
        rows.splice(index, 1);
      },
    },
    cpa: {
      async getProviders() {
        return [];
      },
      async putProviders() {
        throw new Error("cpa unavailable");
      },
    },
  };
  const first = await runReconciliation({
    mode: "apply",
    clients,
    input: {
      now: Date.UTC(2026, 10, 11),
      endpoints: [endpoint],
      metadata: [{ modelId: "claude-fable-5.2", familyId: "claude/fable" }],
      health: {},
      budget: { day: "", used: 0 },
      liveCombos: [],
      liveCpaProviders: [],
      omnirouteBaseUrl: "https://omni",
      omnirouteApiKeyRef: "env:OMNIROUTE_API_KEY",
      omnirouteApiKey: "runtime-key",
    },
  });
  assert.equal(first.targets.omniroute.status, "success");
  assert.equal(first.targets.cpa.status, "failed");
  assert.equal(first.probesUsed, 1);
  const second = await runReconciliation({
    mode: "plan",
    clients,
    input: {
      now: Date.UTC(2026, 10, 11, 1),
      endpoints: [endpoint],
      metadata: [{ modelId: "claude-fable-5.2", familyId: "claude/fable" }],
      health: first.health,
      budget: first.budget,
      liveCombos: [],
      liveCpaProviders: [],
      omnirouteBaseUrl: "https://omni",
      omnirouteApiKeyRef: "env:OMNIROUTE_API_KEY",
      omnirouteApiKey: "runtime-key",
    },
  });
  assert.equal(second.probesUsed, 0);
  assert.equal(probes, 1);
});

const baseInput = () => ({
  now: Date.UTC(2026, 10, 11),
  endpoints: [endpoint],
  metadata: [{ modelId: "claude-fable-5.2", familyId: "claude/fable" }],
  health: {},
  budget: { day: "", used: 0 },
  liveCombos: [] as LiveCombo[],
  liveCpaProviders: [],
  omnirouteBaseUrl: "https://omni",
  omnirouteApiKeyRef: "env:OMNIROUTE_API_KEY",
  omnirouteApiKey: "runtime-key",
});

test("a rejected probe is a failed result that keeps the consumed budget", async () => {
  const second: LocalEndpoint = { ...endpoint, connectionId: "d", modelId: "claude-fable-5.1" };
  const result = await runProbePass({
    endpoints: enrichLocalEndpoints([endpoint, second], []),
    health: {},
    budget: { day: "", used: 0 },
    now: Date.UTC(2026, 10, 11),
    async probe(item) {
      if (item.connectionId === "d") throw new Error("probe transport down");
      return { ok: true };
    },
  });
  assert.equal(result.probesUsed, 2);
  assert.equal(result.budget.used, 2);
  assert.equal(result.health["c\u0000claude-fable-5.2"].status, "healthy");
  assert.equal(result.health["d\u0000claude-fable-5.1"].status, "temporary_failure");
  assert.equal(result.health["d\u0000claude-fable-5.1"].reason, "probe transport down");
});

test("an OmniRoute exception is a failed target, keeps the probe state, and skips CPA", async () => {
  const cpaCalls: string[] = [];
  const result = await runReconciliation({
    mode: "apply",
    input: baseInput(),
    clients: {
      async probe() {
        return { ok: true };
      },
      omniroute: {
        async list() {
          throw new Error("omniroute unavailable");
        },
        async create() {},
        async update() {},
        async delete() {},
      },
      cpa: {
        async getProviders() {
          cpaCalls.push("get");
          return [];
        },
        async putProviders() {
          cpaCalls.push("put");
        },
      },
    },
  });
  assert.equal(result.targets.omniroute.status, "failed");
  assert.equal(result.targets.omniroute.reason, "omniroute unavailable");
  assert.equal(result.targets.cpa.status, "skipped");
  assert.equal(result.probesUsed, 1);
  assert.equal(result.budget.used, 1);
  assert.deepEqual(cpaCalls, []);
});

test("a refused OmniRoute apply does not publish CPA aliases", async () => {
  const cpaCalls: string[] = [];
  const result = await runReconciliation({
    mode: "apply",
    input: baseInput(),
    clients: {
      async probe() {
        return { ok: true };
      },
      omniroute: {
        // Live state differs from the planned precondition, so apply refuses.
        async list() {
          return [{ id: "x", name: "manual", models: [] }] as LiveCombo[];
        },
        async create() {},
        async update() {},
        async delete() {},
      },
      cpa: {
        async getProviders() {
          cpaCalls.push("get");
          return [];
        },
        async putProviders() {
          cpaCalls.push("put");
        },
      },
    },
  });
  assert.equal(result.targets.omniroute.status, "refused");
  assert.equal(result.targets.cpa.status, "skipped");
  assert.deepEqual(cpaCalls, []);
});
