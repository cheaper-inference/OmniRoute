/** Native backend-specific guards; never rewrites caller content or invents capability. */
import { systemOneTextSubsetError } from "./systemOneTextSubset.ts";
import type { SystemOneBackend } from "../../config/systemOneRegistry.ts";
export function systemOneBackendRuleError(
  backend: SystemOneBackend,
  body: Record<string, unknown>
): string | null {
  if (backend.rejectRecognizedMediaParts) {
    const subsetError = systemOneTextSubsetError(body, backend.limits.maxBodyBytes);
    if (subsetError) return subsetError;
  }
  const model = body.model;
  if (
    typeof model !== "string" ||
    (backend.supportedModels && !backend.supportedModels.includes(model)) ||
    (backend.supportedModelPattern && !backend.supportedModelPattern.test(model))
  )
    return "The selected model is not supported by this native backend";
  const stateText = typeof body.state === "string" ? body.state : JSON.stringify(body.state);
  if (backend.maxStateChars && stateText.length > backend.maxStateChars)
    return `state must contain at most ${backend.maxStateChars} characters for this backend`;
  if (backend.maxStateBytes && Buffer.byteLength(stateText, "utf8") > backend.maxStateBytes)
    return `state must contain at most ${backend.maxStateBytes} bytes for this backend`;
  if (
    backend.stringOrObjectState &&
    (Array.isArray(body.state) ||
      body.state === null ||
      !["string", "object"].includes(typeof body.state))
  )
    return "state must be a string or object for this backend";
  let options = 0;
  for (const question of Object.values(body.questions as Record<string, Record<string, unknown>>)) {
    if (backend.plainInstructions && typeof question.instructions !== "string")
      return "instructions must be a string for this backend";
    const criteria = question.criteria;
    options +=
      question.type === "noul"
        ? 2
        : Array.isArray(criteria)
          ? criteria.length
          : criteria && typeof criteria === "object"
            ? Object.keys(criteria).length
            : 0;
  }
  if (backend.maxTotalOptions && options > backend.maxTotalOptions)
    return `questions exceed the ${backend.maxTotalOptions} total-option limit for this backend`;
  return null;
}
