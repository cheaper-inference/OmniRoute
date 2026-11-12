import assert from "node:assert/strict";
import test from "node:test";
import { runReconciliation } from "../src/runner.ts";
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
      async list() { return structuredClone(rows); },
      async create(input: LiveCombo) { rows.push({ ...input, id: String(rows.length) }); },
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
      async getProviders() { return []; },
      async putProviders() { throw new Error("cpa unavailable"); },
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
