/**
 * #12913 — the active-stream watchdog is a HARD lifetime cap: it never resets on
 * upstream bytes. If its default ever drops below the largest per-model
 * `timeoutMs` the provider registry declares, a model that is allowed to run for
 * its full budget gets killed mid-answer by the watchdog instead of finishing.
 *
 * This test re-derives the maximum registered budget from the registry source and
 * fails when the default stops covering it, so a future `timeoutMs: 1_800_000`
 * entry cannot silently re-open the bug.
 *
 * The literal scan cannot see a budget declared through a constant (GLM's
 * provider-level `timeoutMs: GLM_TIMEOUT_MS`, 50 min), which the 21-minute default
 * used to cut short. The second test walks the loaded registry instead and checks
 * the cap each target actually resolves to, model-level and provider-level alike.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import {
  DEFAULT_STREAM_ACTIVE_TIMEOUT_MS,
  MAX_REGISTERED_MODEL_TIMEOUT_MARGIN_MS,
} from "../../src/shared/utils/runtimeTimeouts.ts";
import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import {
  resolveDeclaredTargetTimeoutMs,
  resolveStreamActiveTimeoutMs,
} from "../../open-sse/handlers/chatCore/upstreamTimeouts.ts";

const REGISTRY_ROOT = join(process.cwd(), "open-sse/config/providers/registry");
const TIMEOUT_LITERAL = /timeoutMs:\s*([0-9_]+)/g;

function collectTsFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) collectTsFiles(full, out);
    else if (full.endsWith(".ts")) out.push(full);
  }
  return out;
}

function maxRegisteredTimeoutMs(): { value: number; file: string } {
  let best = { value: 0, file: "" };
  for (const file of collectTsFiles(REGISTRY_ROOT)) {
    const source = readFileSync(file, "utf8");
    for (const match of source.matchAll(TIMEOUT_LITERAL)) {
      const value = Number(match[1].replaceAll("_", ""));
      if (Number.isFinite(value) && value > best.value) best = { value, file };
    }
  }
  return best;
}

test("the default active-stream budget covers every per-model timeoutMs in the registry", () => {
  const max = maxRegisteredTimeoutMs();

  assert.ok(max.value > 0, "expected at least one timeoutMs literal in the provider registry");
  assert.ok(
    DEFAULT_STREAM_ACTIVE_TIMEOUT_MS >= max.value,
    `DEFAULT_STREAM_ACTIVE_TIMEOUT_MS (${DEFAULT_STREAM_ACTIVE_TIMEOUT_MS}) must stay >= the largest ` +
      `registered model timeoutMs (${max.value}, declared in ${max.file}); otherwise the active ` +
      `watchdog kills a model that is still inside its own budget.`
  );
  assert.equal(
    DEFAULT_STREAM_ACTIVE_TIMEOUT_MS,
    max.value + MAX_REGISTERED_MODEL_TIMEOUT_MARGIN_MS,
    "the default is documented as the largest registered budget plus the margin — update both together"
  );
});

test("every registered budget, model-level or provider-level, resolves to a cap above itself", () => {
  let providerLevel = 0;
  let modelLevel = 0;
  for (const [providerId, entry] of Object.entries(REGISTRY)) {
    const providerTimeoutMs = typeof entry.timeoutMs === "number" ? entry.timeoutMs : undefined;
    for (const model of entry.models ?? []) {
      const declared =
        typeof model.timeoutMs === "number" && model.timeoutMs > 0
          ? model.timeoutMs
          : providerTimeoutMs;
      if (!declared || declared <= 0) continue;
      if (declared === model.timeoutMs) modelLevel += 1;
      else providerLevel += 1;
      // Resolve through the production lookup so a broken id/alias mapping fails here.
      const resolved = resolveDeclaredTargetTimeoutMs(providerId, model.id);
      assert.equal(
        resolved,
        declared,
        `${providerId}/${model.id} did not resolve its declared budget`
      );
      // STREAM_ACTIVE_TIMEOUT_MS unset: the default cap, raised by the declared budget.
      const cap = resolveStreamActiveTimeoutMs(undefined, resolved);
      assert.ok(
        cap >= declared + MAX_REGISTERED_MODEL_TIMEOUT_MARGIN_MS,
        `${providerId}/${model.id} declares ${declared}ms but the active watchdog would fire at ${cap}ms`
      );
    }
  }
  assert.ok(modelLevel > 0, "expected per-model timeoutMs declarations in the registry");
  assert.ok(providerLevel > 0, "expected provider-level timeoutMs declarations (e.g. GLM)");
});
