"use client";

/**
 * useModelComboUsage
 *
 * Loads all combos once and inverts them into a "which combos reference this
 * model" lookup for the provider currently being viewed. The provider detail
 * page shows the result as a small badge behind each model row so an operator
 * can tell at a glance whether a model is wired into a combo.
 *
 * Matching: a combo step of `kind: "model"` carries `providerId` (the canonical
 * provider id — the same id the detail page is routed on) plus a `model` string
 * of the form `${prefix}/${modelId}`. We strip the first segment and key the
 * lookup by the bare model id, which is what every model row already renders.
 *
 * Best-effort: a failed or unauthorized fetch leaves the map empty, so the
 * provider page still renders — just without the badges.
 */

import { useEffect, useState } from "react";

type ComboStepLike = {
  kind?: unknown;
  model?: unknown;
  providerId?: unknown;
};

type ComboLike = {
  name?: unknown;
  models?: unknown;
};

export type ModelComboUsage = Record<string, string[]>;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function isCombo(value: unknown): value is ComboLike {
  return isPlainObject(value);
}

function isComboStep(value: unknown): value is ComboStepLike {
  return isPlainObject(value);
}

/**
 * Extract the bare model id from a combo step's `${prefix}/${modelId}` string.
 * Model ids themselves contain `/` (e.g. `qwen/qwen-plus`), so only the FIRST
 * segment is the provider prefix and must be dropped.
 */
function stepModelId(model: unknown): string | null {
  if (typeof model !== "string" || !model) return null;
  const slashIndex = model.indexOf("/");
  return slashIndex === -1 ? model : model.slice(slashIndex + 1);
}

/** Trimmed combo name, or "" when the entry is not a usable combo. */
function comboName(combo: unknown): string {
  if (!isCombo(combo) || typeof combo.name !== "string") return "";
  return combo.name.trim();
}

/** Bare model ids of the combo's `kind: "model"` steps that target `providerId`. */
function comboModelIdsForProvider(combo: ComboLike, providerId: string): string[] {
  const steps = Array.isArray(combo.models) ? combo.models : [];
  const modelIds: string[] = [];
  for (const step of steps) {
    if (!isComboStep(step) || step.kind !== "model" || step.providerId !== providerId) continue;
    const modelId = stepModelId(step.model);
    if (modelId) modelIds.push(modelId);
  }
  return modelIds;
}

function addComboUsage(usage: ModelComboUsage, modelId: string, name: string): void {
  const existing = usage[modelId];
  if (!existing) {
    usage[modelId] = [name];
  } else if (!existing.includes(name)) {
    existing.push(name);
  }
}

/**
 * Pure inversion of the combo list into a model-id → combo-names map, scoped to
 * one provider. Exported so the mapping can be unit-tested without a browser.
 */
export function buildModelComboUsage(combos: unknown, providerId: string): ModelComboUsage {
  if (!Array.isArray(combos) || !providerId) return {};

  const usage: ModelComboUsage = {};

  for (const combo of combos) {
    const name = comboName(combo);
    if (!name) continue;
    for (const modelId of comboModelIdsForProvider(combo as ComboLike, providerId)) {
      addComboUsage(usage, modelId, name);
    }
  }

  return usage;
}

export function useModelComboUsage(providerId: string): ModelComboUsage {
  const [usage, setUsage] = useState<ModelComboUsage>({});

  useEffect(() => {
    if (!providerId) return;

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/combos", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { combos?: unknown };
        if (cancelled) return;
        setUsage(buildModelComboUsage(data.combos, providerId));
      } catch {
        // Best-effort: badges are informational, never load-bearing.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [providerId]);

  return usage;
}
