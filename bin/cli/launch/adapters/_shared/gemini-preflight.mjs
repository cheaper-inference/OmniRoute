// Shared launch preflight for single-model env adapters (gemini, kimi, copilot, continue, qwen).
// Callers pass their own user-facing messages, so each tool keeps its exact wording.
// Pure: no fs, process or os reads.

import { LaunchError } from "../../contract.mjs";
import { gateStatus } from "./semver.mjs";

/**
 * Throw UnsupportedPlatform when `ctx.platform` is not one of `platforms`.
 * @param {{ platform: string }} ctx
 * @param {ReadonlyArray<string>} platforms
 * @param {string} message
 */
export function assertPlatform(ctx, platforms, message) {
  if (!platforms.includes(ctx.platform)) throw new LaunchError("UnsupportedPlatform", message);
}

/**
 * Throw ModelNotFound when the model view is empty.
 * @param {{ view: { rows: ReadonlyArray<object> } }} ctx
 * @param {string} message
 * @param {string} hint
 */
export function assertViewRows(ctx, message, hint) {
  if (ctx.view.rows.length === 0) throw new LaunchError("ModelNotFound", message, { hint });
}

/**
 * Apply a `{ min, recommended }` version gate: throw ToolVersionTooOld below min, push the
 * `behind` warning below recommended, do nothing when the version does not parse.
 * @param {string | null | undefined} version
 * @param {{ min: string, recommended?: string }} gate
 * @param {{ tooOld: string, tooOldHint: string, behind?: string }} messages
 * @param {string[]} warnings
 */
function applyVersionGate(version, gate, messages, warnings) {
  const status = gateStatus(version, gate);
  if (status === "too-old") {
    throw new LaunchError("ToolVersionTooOld", messages.tooOld, { hint: messages.tooOldHint });
  }
  if (status === "behind") warnings.push(messages.behind);
}

/**
 * The full preflight of a required-model adapter: platform, version gate, non-empty view and a
 * chosen model (ModelRequired otherwise). Returns the chosen model row.
 * @param {import("../../contract.d.ts").LaunchContext} ctx
 * @param {{
 *   platforms: ReadonlyArray<string>,
 *   platformMessage: string,
 *   gate: { min: string, recommended?: string },
 *   tooOld: string,
 *   tooOldHint: string,
 *   behind?: string,
 *   noRows: string,
 *   noRowsHint: string,
 *   noModel: string,
 *   noModelHint: string,
 * }} spec
 * @param {string[]} warnings
 */
export function requireLaunchModel(ctx, spec, warnings) {
  assertPlatform(ctx, spec.platforms, spec.platformMessage);
  applyVersionGate(ctx.tool.version, spec.gate, spec, warnings);
  assertViewRows(ctx, spec.noRows, spec.noRowsHint);
  if (!ctx.model) {
    throw new LaunchError("ModelRequired", spec.noModel, { hint: spec.noModelHint });
  }
  return ctx.model;
}
