/**
 * Liquid AI API-key validation.
 *
 * Liquid issues keys that work on its decisions API only: on 2026-11-26 a fresh key
 * answered 401 "Could not validate credentials" on inference.liquid.ai (models and
 * chat) and 200 on api.liquid.ai/decisions/v1/systemone. Checking chat alone refused
 * the connection that POST /v1/systemone `liquid/<model>` needs, so when chat refuses
 * the key this probes the decisions API with one tiny question (about $0.000003).
 */

import { LIQUID_SYSTEMONE_URL } from "@omniroute/open-sse/config/systemOneRegistry.ts";
import { validationWrite } from "./transport";

const DECISIONS_PROBE_BODY = JSON.stringify({
  model: "d1",
  state: "ping",
  questions: { ping: { type: "noul", instructions: "Is this a ping?" } },
});

type ValidationResult = {
  valid: boolean;
  error: string | null;
  method?: string;
  warning?: string;
  [key: string]: unknown;
};

export async function validateLiquidProvider({
  apiKey,
  validateChat,
}: {
  apiKey?: string | null;
  validateChat: () => Promise<ValidationResult>;
}): Promise<ValidationResult> {
  const chat = await validateChat();
  if (chat.valid || !apiKey || chat.error !== "Invalid API key") return chat;

  try {
    const response = await validationWrite(LIQUID_SYSTEMONE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: DECISIONS_PROBE_BODY,
    });
    if (response.ok || response.status === 429) {
      return {
        valid: true,
        error: null,
        method: "liquid_decisions",
        warning:
          "This key works for Liquid decisions (POST /v1/systemone with liquid/<model>), " +
          "not for Liquid chat models.",
      };
    }
  } catch {
    // Unreachable decisions API: keep the chat verdict.
  }
  return chat;
}
