import { normalizeComboModels } from "@/lib/combos/steps";

type JsonRecord = Record<string, unknown>;

type ValidationErrorDetail = {
  field: string;
  message: string;
};

type CompositeTierValidationFailure = {
  success: false;
  error: {
    message: string;
    details: ValidationErrorDetail[];
  };
};

type CompositeTierValidationSuccess = {
  success: true;
};

export type CompositeTierValidationResult =
  | CompositeTierValidationFailure
  | CompositeTierValidationSuccess;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function toTrimmedString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function createFailure(details: ValidationErrorDetail[]): CompositeTierValidationFailure {
  return {
    success: false,
    error: {
      message: "Invalid composite tiers",
      details,
    },
  };
}

export function validateCompositeTiersConfig(combo: {
  name?: unknown;
  models?: unknown;
  config?: unknown;
}): CompositeTierValidationResult {
  if (!isRecord(combo.config)) {
    return { success: true };
  }

  const compositeTiers = combo.config.compositeTiers;
  if (compositeTiers === undefined || compositeTiers === null) {
    return { success: true };
  }

  if (!isRecord(compositeTiers)) {
    return createFailure([
      {
        field: "config.compositeTiers",
        message: "compositeTiers must be an object",
      },
    ]);
  }

  const defaultTier = toTrimmedString(compositeTiers.defaultTier);
  const tiers = isRecord(compositeTiers.tiers) ? compositeTiers.tiers : null;
  const details: ValidationErrorDetail[] = [];

  if (!defaultTier) {
    details.push({
      field: "config.compositeTiers.defaultTier",
      message: "defaultTier is required",
    });
  }

  if (!tiers || Object.keys(tiers).length === 0) {
    details.push({
      field: "config.compositeTiers.tiers",
      message: "tiers must define at least one tier",
    });
    return createFailure(details);
  }

  const normalizedSteps = normalizeComboModels(combo.models, {
    comboName: toTrimmedString(combo.name),
  });
  const stepIds = new Set(
    normalizedSteps
      .map((step) => toTrimmedString(step.id))
      .filter((value): value is string => !!value)
  );
  const tierEntries = new Map<string, { stepId: string; fallbackTier: string | null }>();
  const stepIdOwners = new Map<string, string>();

  for (const [rawTierName, rawTierValue] of Object.entries(tiers)) {
    const tierName = toTrimmedString(rawTierName);
    const fieldBase = `config.compositeTiers.tiers.${rawTierName}`;

    if (!tierName) {
      details.push({
        field: fieldBase,
        message: "tier name must be a non-empty string",
      });
      continue;
    }

    if (!isRecord(rawTierValue)) {
      details.push({
        field: fieldBase,
        message: "tier config must be an object",
      });
      continue;
    }

    const stepId = toTrimmedString(rawTierValue.stepId);
    const fallbackTier = toTrimmedString(rawTierValue.fallbackTier);

    if (!stepId) {
      details.push({
        field: `${fieldBase}.stepId`,
        message: "stepId is required",
      });
      continue;
    }

    if (!stepIds.has(stepId)) {
      details.push({
        field: `${fieldBase}.stepId`,
        message: `stepId "${stepId}" does not exist in combo.models`,
      });
    }

    const previousTierForStep = stepIdOwners.get(stepId);
    if (previousTierForStep && previousTierForStep !== tierName) {
      details.push({
        field: `${fieldBase}.stepId`,
        message: `stepId "${stepId}" is already assigned to tier "${previousTierForStep}"`,
      });
    } else {
      stepIdOwners.set(stepId, tierName);
    }

    if (fallbackTier && fallbackTier === tierName) {
      details.push({
        field: `${fieldBase}.fallbackTier`,
        message: "fallbackTier cannot reference the same tier",
      });
    }

    tierEntries.set(tierName, {
      stepId,
      fallbackTier,
    });
  }

  if (defaultTier && !tierEntries.has(defaultTier)) {
    details.push({
      field: "config.compositeTiers.defaultTier",
      message: `defaultTier "${defaultTier}" does not exist in tiers`,
    });
  }

  for (const [tierName, entry] of tierEntries.entries()) {
    if (entry.fallbackTier && !tierEntries.has(entry.fallbackTier)) {
      details.push({
        field: `config.compositeTiers.tiers.${tierName}.fallbackTier`,
        message: `fallbackTier "${entry.fallbackTier}" does not exist in tiers`,
      });
    }
  }

  const visitState = new Map<string, "visiting" | "visited">();

  function visit(tierName: string, path: string[]) {
    const state = visitState.get(tierName);
    if (state === "visited") return;
    if (state === "visiting") {
      details.push({
        field: `config.compositeTiers.tiers.${tierName}.fallbackTier`,
        message: `fallbackTier cycle detected: ${[...path, tierName].join(" -> ")}`,
      });
      return;
    }

    visitState.set(tierName, "visiting");
    const fallbackTier = tierEntries.get(tierName)?.fallbackTier;
    if (fallbackTier && tierEntries.has(fallbackTier)) {
      visit(fallbackTier, [...path, tierName]);
    }
    visitState.set(tierName, "visited");
  }

  for (const tierName of tierEntries.keys()) {
    visit(tierName, []);
  }

  return details.length > 0 ? createFailure(details) : { success: true };
}
