import { redactSensitiveErrorText } from "@omniroute/open-sse/utils/errorSanitization.ts";

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function displayString(value: string): string {
  // Redact each string, never a whole serialized distribution (the error redactor has a length cap).
  return value.length > 4000
    ? `${redactSensitiveErrorText(value.slice(0, 4000))} … [truncated]`
    : redactSensitiveErrorText(value);
}
function number(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
function monetary(value: unknown): number | string | null {
  if (number(value) && value >= 0) return value;
  if (typeof value === "string" && /^\d+(?:\.\d+)?$/.test(value) && Number.isFinite(Number(value)))
    return value;
  return null;
}
function answerDisplay(value: unknown): Record<string, unknown> {
  if (!record(value)) return {};
  const result: Record<string, unknown> = {};
  if (typeof value.type === "string") result.type = displayString(value.type);
  if (typeof value.choice === "string") result.choice = displayString(value.choice);
  for (const key of ["noul", "score", "confidence"]) {
    if (number(value[key]) || value[key] === null) result[key] = value[key];
  }
  if (value.probabilities === null) result.probabilities = null;
  if (record(value.probabilities))
    result.probabilities = Object.fromEntries(
      Object.entries(value.probabilities)
        .filter(([, probability]) => number(probability))
        .map(([key, probability]) => [displayString(key), probability])
    );
  if (record(value.legend))
    result.legend = Object.fromEntries(
      Object.entries(value.legend)
        .filter(
          ([, description]) =>
            typeof description === "string" || number(description) || description === null
        )
        .map(([key, description]) => [
          displayString(key),
          typeof description === "string" ? displayString(description) : description,
        ])
    );
  return result;
}

/** Display only native answer/token fields and explicitly identified cost sources. */
export function projectNativeDecisionResult(
  body: Record<string, unknown>,
  headers: Headers
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  if (typeof body.model === "string") result.model = displayString(body.model);
  if (record(body.answers))
    result.answers = Object.fromEntries(
      Object.entries(body.answers).map(([name, answer]) => [
        displayString(name),
        answerDisplay(answer),
      ])
    );
  const usage: Record<string, unknown> = {};
  if (record(body.usage)) {
    for (const key of ["input_tokens", "output_tokens", "total_tokens"]) {
      if (number(body.usage[key]) || body.usage[key] === null) usage[key] = body.usage[key];
    }
    if (Object.hasOwn(body.usage, "cost")) usage.cost = monetary(body.usage.cost);
    result.usage = usage;
  }
  const receipt: Record<string, unknown> = {};
  const status = headers.get("x-omniroute-cost-status");
  if (status === "known" || status === "unknown") receipt.cost_status = status;
  const accounted = monetary(headers.get("x-omniroute-response-cost"));
  if (accounted !== null) receipt.omniroute_accounted_cost_usd = accounted;
  // Gateway cost may be the actual provider report even when usage.cost is absent.
  if (record(body.provider_metadata) && record(body.provider_metadata.gateway)) {
    const providerCost = monetary(body.provider_metadata.gateway.cost);
    if (providerCost !== null) receipt.provider_gateway_cost_usd = providerCost;
  }
  if (Object.keys(receipt).length) result.cost_receipt = receipt;
  return result;
}
