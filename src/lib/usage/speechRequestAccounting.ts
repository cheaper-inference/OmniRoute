import { after } from "next/server";
import { speechUsage } from "@omniroute/open-sse/utils/speechUsage.ts";
import { saveCallLog } from "./callLogs";
import {
  attachMediaResponseMeta,
  priceMediaRequest,
  recordMediaRequest,
  safelyRecordMedia,
  type MediaRequestIdentity,
} from "./mediaRequestAccounting";

/** The direct and combo routes share one successful-attempt accounting owner. */
export async function accountSpeechResponse(
  response: Response,
  input: MediaRequestIdentity & { characters: number; fallbackAttempts?: number }
): Promise<Response> {
  const billInput = { ...input, unit: "character" as const, quantity: input.characters };
  const estimate = await priceMediaRequest(billInput);
  const reported = speechUsage(response);
  const persist = (usage?: Record<string, number> | null) =>
    safelyRecordMedia(async () => {
      const bill = usage ? await priceMediaRequest({ ...billInput, usage }) : estimate;
      await recordMediaRequest(input, bill);
      await saveCallLog({
        ...input,
        id: input.requestId,
        method: "POST",
        path: input.endpoint,
        status: 200,
        duration: Date.now() - input.startTime,
        tokens: bill.usage,
      });
    });
  if (reported) {
    const task = reported.then(persist).catch(() => {
      console.error("[Speech accounting] Billing persistence failed");
    });
    // Next's lifecycle keeps reconciliation alive after the stream closes. Standalone
    // callers (unit tests / embedded gateway) have no request context; the task still runs.
    try {
      after(() => task);
    } catch {
      void task;
    }
  } else await persist();
  const result = attachMediaResponseMeta(response, {
    ...input,
    costUsd: reported ? null : estimate.costUsd,
    latencyMs: Date.now() - input.startTime,
    strategy: input.comboStrategy,
    fallbackAttempts: input.fallbackAttempts,
  });
  if (reported) result.headers.set("X-OmniRoute-Cost-Status", "pending");
  return result;
}
