export type GrokBotActionOutcome = "accepted" | "refused" | "unknown";

export function grokBotErrorStatus(error: unknown): number | undefined {
  if (!error || typeof error !== "object") return undefined;
  const status = (error as { status?: unknown }).status;
  return typeof status === "number" ? status : undefined;
}

type Answer = Record<string, unknown>;

function record(answer: unknown): Answer | null {
  return answer !== null && typeof answer === "object" ? (answer as Answer) : null;
}

function hasRefusal(answer: Answer): boolean {
  return answer.refusal !== null && typeof answer.refusal === "object";
}

const ACCEPTED_DELIVERIES = new Set<unknown>([
  1,
  2,
  3,
  "GROK_BOT_USER_MESSAGE_DELIVERY_ACCEPTED_BOX",
  "GROK_BOT_USER_MESSAGE_DELIVERY_ACCEPTED_TEMPORAL",
  "GROK_BOT_USER_MESSAGE_DELIVERY_DUPLICATE",
]);

export function grokBotSendOutcome(answer: unknown): GrokBotActionOutcome {
  const body = record(answer);
  if (!body) return "unknown";
  if (
    hasRefusal(body) ||
    body.delivery === 4 ||
    body.delivery === "GROK_BOT_USER_MESSAGE_DELIVERY_REFUSED"
  ) {
    return "refused";
  }
  if (ACCEPTED_DELIVERIES.has(body.delivery)) return "accepted";
  if (body.delivery !== undefined) return "unknown";
  return body.dispatched === true ? "accepted" : "unknown";
}

/** The keys a service uses to explain that it did not do what was asked. */
const REFUSAL_KEYS = ["error", "code", "status", "message"] as const;

function saysRefused(body: Record<string, unknown>): boolean {
  if (body.accepted === false || body.dispatched === false) return true;
  if (hasRefusal(body)) return true;
  return REFUSAL_KEYS.some((key) => key in body);
}

export function grokBotCardOutcome(
  answer: unknown,
  options: { allowEmpty?: boolean } = {}
): GrokBotActionOutcome {
  const allowEmpty = options.allowEmpty ?? true;
  if (answer === null) return allowEmpty ? "accepted" : "unknown";
  const body = record(answer);
  if (!body) return "unknown";
  if (saysRefused(body)) return "refused";
  if (Object.keys(body).length === 0) return allowEmpty ? "accepted" : "unknown";
  if (body.accepted === true || body.dispatched === true) return "accepted";
  return "unknown";
}


export function grokBotRefusal(answer: unknown): { failureCode: string; message: string } | null {
  const body = record(answer);
  const refusal = body && record(body.refusal);
  if (!refusal) return null;
  return {
    failureCode: typeof refusal.failureCode === "string" ? refusal.failureCode : "",
    message: typeof refusal.message === "string" ? refusal.message : "",
  };
}

export type GrokBotSendReply = {
  status: "submitted" | "refused" | "unknown";
  httpStatus: number;
  failureCode?: string;
  message?: string;
};

/**
 * Turns the send answer into the reply the dashboard should receive. A refusal is
 * an answer the service gave, not a failure to deliver, so it must not come back as
 * "submitted": the page would show a message that never reached anyone.
 */
export function grokBotSendReply(answer: unknown): GrokBotSendReply {
  const outcome = grokBotSendOutcome(answer);
  if (outcome === "accepted") return { status: "submitted", httpStatus: 200 };
  if (outcome === "refused") {
    const refusal = grokBotRefusal(answer);
    return {
      status: "refused",
      httpStatus: 502,
      failureCode: refusal?.failureCode ?? "",
      message: refusal?.message ?? "",
    };
  }
  return { status: "unknown", httpStatus: 502 };
}
