import { WEBHOOK_SECRET_MAX_LENGTH, WEBHOOK_URL_MAX_LENGTH } from "@/shared/constants/formLimits";

export type WebhookUrlProblem = "required" | "tooLong" | "invalid";

/**
 * What is wrong with a webhook destination before the server is asked: empty, over the route's
 * length limit, or not an http(s) URL (the first thing the outbound guard refuses). `null` means
 * the value is worth sending — the private-address check stays on the server.
 */
export function webhookUrlProblem(value: string): WebhookUrlProblem | null {
  const url = value.trim();
  if (!url) return "required";
  // The request carries the value as typed, so the limit is measured on it too.
  if (value.length > WEBHOOK_URL_MAX_LENGTH) return "tooLong";
  try {
    const parsed = new URL(url);
    const isHttp = parsed.protocol === "http:" || parsed.protocol === "https:";
    return isHttp && parsed.hostname !== "" ? null : "invalid";
  } catch {
    return "invalid";
  }
}

type Translate = (key: string, values?: Record<string, string | number>) => string;

/**
 * The inline message for a destination field, or `undefined` when the value can go to the
 * server check. "Required" is only said once the user has tried to continue (`showRequired`);
 * a malformed or over-long value is said as it is typed.
 */
export function webhookUrlFieldError(
  value: string,
  options: {
    /** The field's visible label, named in the message. */
    label: string;
    showRequired?: boolean;
    /** The `webhooks` translator the wizard is given. */
    t: Translate;
    /** The shared `formValidation` translator. */
    tv: Translate;
  }
): string | undefined {
  const problem = webhookUrlProblem(value);
  if (problem === "tooLong") {
    return options.tv("maxLength", {
      field: options.label,
      max: WEBHOOK_URL_MAX_LENGTH,
      count: value.length,
    });
  }
  if (problem === "invalid") return options.t("validateUrl.invalidUrl");
  if (problem === "required" && options.showRequired) {
    return options.tv("required", { field: options.label });
  }
  return undefined;
}

/** The signing secret is sent trimmed; over the route's limit it is refused, never cut. */
export function webhookSecretTooLong(value: string): boolean {
  return value.trim().length > WEBHOOK_SECRET_MAX_LENGTH;
}

/**
 * Text of the `error` field of a webhooks API reply. A validation failure arrives as an object
 * (`{ message, details: [{ field, message }] }`), which must not reach the UI as
 * "[object Object]".
 */
export function webhookErrorText(error: unknown, fallback: string): string {
  if (typeof error === "string" && error.trim() !== "") return error;
  if (error !== null && typeof error === "object") {
    const bag = error as { message?: unknown; details?: unknown };
    const details = Array.isArray(bag.details)
      ? bag.details
          .map((detail) =>
            detail !== null && typeof detail === "object"
              ? String((detail as { message?: unknown }).message ?? "")
              : ""
          )
          .filter((text) => text !== "")
      : [];
    if (details.length > 0) return details.join(". ");
    if (typeof bag.message === "string" && bag.message.trim() !== "") return bag.message;
  }
  return fallback;
}
