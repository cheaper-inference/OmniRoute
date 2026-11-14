// Qwen Code launch gates: the optional context floor and the dotted-version gate.
// Pure: no fs, process or os reads.

import { LaunchError } from "../../contract.mjs";
import { compareDotted } from "./semver.mjs";

const UPGRADE = "npm install -g @qwen-code/qwen-code@latest";

function knownContext(model) {
  return typeof model.contextTokens === "number" && model.contextTokens > 0;
}

/** -1, 0, 1 on major.minor.patch, ignoring any "-prerelease" suffix. */
function compareVersions(a, b) {
  return compareDotted(String(a).split("-")[0], String(b).split("-")[0], 3);
}

/**
 * Throw ModelUnsuitable when the chosen model has a known window below `min`.
 * @param {{ id: string, contextTokens?: number | null } | null | undefined} model
 * @param {number | undefined} min
 */
export function assertMinContext(model, min) {
  if (!model || typeof min !== "number" || !knownContext(model)) return;
  if (model.contextTokens < min) {
    throw new LaunchError(
      "ModelUnsuitable",
      `${model.id} has a ${model.contextTokens} token window; Qwen Code needs at least ${min}.`,
      { hint: "Pick a model with a larger context window." }
    );
  }
}

/**
 * Throw ToolVersionTooOld below `gate.min`; warn below `gate.recommended`.
 * @param {string | null | undefined} version
 * @param {{ min?: string, recommended?: string }} gate
 * @param {string[]} warnings
 */
export function applyQwenVersionGate(version, gate, warnings) {
  if (!version) return;
  if (gate.min && compareVersions(version, gate.min) < 0) {
    throw new LaunchError(
      "ToolVersionTooOld",
      `Qwen Code ${version} is older than the required ${gate.min}.`,
      { hint: `Upgrade with: ${UPGRADE}` }
    );
  }
  if (gate.recommended && compareVersions(version, gate.recommended) < 0) {
    warnings.push(
      `Qwen Code ${version} is older than the recommended ${gate.recommended}; upgrade with: ${UPGRADE}`
    );
  }
}

/**
 * Warn when the chosen model has no known context window (qwen assumes 200000).
 * @param {{ id: string, contextTokens?: number | null } | null | undefined} model
 * @param {string[]} warnings
 */
export function warnUnknownContext(model, warnings) {
  if (model && !knownContext(model)) {
    warnings.push(
      `${model.id} has no known context window; Qwen Code assumes its default (200000 tokens).`
    );
  }
}
