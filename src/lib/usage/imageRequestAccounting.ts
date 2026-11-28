/**
 * Per-attempt accounting for the image routes (/v1/images/generations and
 * /v1/images/edits, direct and combo paths).
 *
 * Chat requests reach `usage_history` through chatCore; the image routes never
 * did, so per-key USD limits (`apiKeyUsageLimits`, which re-price
 * `usage_history`) and per-key usage reports ignored image calls, and the combo
 * and edit paths also wrote `call_logs` rows without the API key or the
 * selected connection.
 *
 * `runImageRequestWithAccounting` wraps ONE provider attempt:
 *  - binds the API key and the attempt's connection to every call log the
 *    provider handler writes (request-scoped, see callLogApiKeyContext);
 *  - on success, records exact upstream USD or a measured tariff snapshot;
 *  - debits the key once and retains the same cost/request id for response headers.
 * A missing tariff still allows usage attribution and preserves the key's
 * budget eligibility. Pricing-store failures keep their existing budget handling.
 */

import { trackMediaWrites } from "./callLogApiKeyContext";
import { recordSpecialtyCallLog } from "./specialtyRequestAccounting";
import { priceMediaRequest, recordMediaRequest, type MediaBill } from "./mediaRequestAccounting";
import { generateRequestId } from "@/shared/utils/requestId";

type ImageBill = MediaBill & { requestId: string };
const bills = new WeakMap<object, ImageBill>();

/** Internal request-scoped metadata; never serialized into the provider's public payload. */
export function imageRequestBill(value: unknown): ImageBill | undefined {
  return value && typeof value === "object" ? bills.get(value) : undefined;
}

export interface ImageRequestAccounting {
  /** Public route the client called, stored in `usage_history.endpoint`. */
  endpoint: string;
  provider: string;
  /** Model id; a leading `provider/` is stripped so it matches the pricing key. */
  model: string | null | undefined;
  apiKeyInfo?: { id?: string | null; name?: string | null } | null;
  /** Credentials selected for this attempt; only `connectionId` is read. */
  credentials?: unknown;
  startTime: number;
  comboStrategy?: string | null;
}

function connectionIdOf(credentials: unknown): string | null {
  if (!credentials || typeof credentials !== "object") return null;
  const connectionId = (credentials as { connectionId?: unknown }).connectionId;
  return typeof connectionId === "string" && connectionId.trim() ? connectionId.trim() : null;
}

function upstreamUsageOf(result: unknown): Record<string, unknown> | null {
  // Codex dedicated Images keeps usage in the existing public data envelope.
  // Read it without mutating that envelope or exposing internal handler fields.
  const imageResult = result as { usage?: unknown; data?: { usage?: unknown } } | null;
  const usage = imageResult?.usage ?? imageResult?.data?.usage;
  return usage && typeof usage === "object" && !Array.isArray(usage)
    ? (usage as Record<string, unknown>)
    : null;
}

function toProviderLocalModel(provider: string, model: string | null | undefined): string {
  const value = typeof model === "string" ? model : "";
  return value.startsWith(`${provider}/`) ? value.slice(provider.length + 1) : value;
}

function deliveredImageCount(payload: unknown): number | null {
  const images = Array.isArray(payload) ? payload : (payload as { data?: unknown[] })?.data;
  if (!Array.isArray(images)) return null;
  return images.filter(
    (image) =>
      image &&
      typeof image === "object" &&
      ((typeof image.url === "string" && image.url.length > 0) ||
        (typeof image.b64_json === "string" && image.b64_json.length > 0))
  ).length;
}

function shouldRecordImageUsage(
  usageWritten: boolean,
  apiKeyId: string | null,
  bill: ImageBill
): boolean {
  return (
    !usageWritten && (Boolean(apiKeyId) || bill.costUsd !== null || bill.pricingFailed === true)
  );
}

export async function runImageRequestWithAccounting<T>(
  accounting: ImageRequestAccounting,
  attempt: () => Promise<T>
): Promise<T> {
  const connectionId = connectionIdOf(accounting.credentials);
  const apiKeyId = accounting.apiKeyInfo?.id || null;
  const apiKeyName = accounting.apiKeyInfo?.name || null;

  const identity = { ...accounting, apiKeyId, apiKeyName, connectionId };
  const { result, mediaWrites } = await trackMediaWrites(identity, accounting.endpoint, attempt);

  const usage = upstreamUsageOf(result);
  if ((result as { success?: unknown } | null)?.success === true) {
    const localModel = toProviderLocalModel(accounting.provider, accounting.model);
    const payload = (result as { data?: unknown }).data;
    const bill = {
      ...(await priceMediaRequest({
        provider: accounting.provider,
        model: localModel,
        usage,
        unit: "image",
        quantity: deliveredImageCount(payload),
      })),
      requestId: generateRequestId(),
    };
    const attributed = { ...identity, model: localModel, requestId: bill.requestId };
    if (shouldRecordImageUsage(mediaWrites.usage, apiKeyId, bill)) {
      await recordMediaRequest(attributed, bill, {
        enforceUnpricedBudget: bill.pricingFailed === true,
      });
    }
    if (!mediaWrites.callLog) await recordSpecialtyCallLog(attributed);
    if (result && typeof result === "object") bills.set(result, bill);
    if (payload && typeof payload === "object") bills.set(payload, bill);
  }

  return result;
}
