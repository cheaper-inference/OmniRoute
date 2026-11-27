import { WEBHOOK_SECRET_MAX_LENGTH, WEBHOOK_URL_MAX_LENGTH } from "@/shared/constants/formLimits";

export type WebhookUrlProblem = "required" | "tooLong" | "invalid";

/** Where the server's check of a destination stands (see `useWebhookUrlCheck`). */
export type WebhookUrlCheckState = "idle" | "checking" | "ok" | "blocked" | "invalid";

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

interface WebhookUrlFieldOptions {
  /** The field's visible label, named in the message. */
  label: string;
  showRequired?: boolean;
  /** The `webhooks` translator the wizard is given. */
  t: Translate;
  /** The shared `formValidation` translator. */
  tv: Translate;
}

/**
 * The inline message for a destination field, or `undefined` when the value can go to the
 * server check. "Required" is only said once the user has tried to continue (`showRequired`);
 * a malformed or over-long value is said as it is typed.
 */
function webhookUrlFieldError(value: string, options: WebhookUrlFieldOptions): string | undefined {
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

/** The server check's verdict in words; empty while there is nothing to say. */
function webhookUrlCheckText(state: WebhookUrlCheckState, value: string, t: Translate): string {
  if (state === "checking") return t("validateUrl.checking");
  if (state === "ok") return t("validateUrl.ok");
  if (state === "blocked") return t("validateUrl.blockedPrivate");
  if (state === "invalid" && value.trim()) return t("validateUrl.invalidUrl");
  return "";
}

/**
 * What a destination field shows under itself. `error` is the field's own verdict (empty, over
 * the limit, not an http(s) URL — said at once, without a round trip) or, for a value that
 * passes it, the server's refusal. `status` is the server check while it runs or once it
 * accepted the value; empty otherwise.
 */
export function webhookUrlFieldFeedback(
  value: string,
  state: WebhookUrlCheckState,
  options: WebhookUrlFieldOptions
): { error: string | undefined; status: string } {
  const text = webhookUrlCheckText(state, value, options.t);
  const pendingOrAccepted = state === "ok" || state === "checking";
  return {
    error: webhookUrlFieldError(value, options) ?? (text && !pendingOrAccepted ? text : undefined),
    status: pendingOrAccepted ? text : "",
  };
}

/** The signing secret is sent trimmed; over the route's limit it is refused, never cut. */
export function webhookSecretTooLong(value: string): boolean {
  return value.trim().length > WEBHOOK_SECRET_MAX_LENGTH;
}

/**
 * The inline message for a signing secret over the route's limit. The key is flagged, never
 * cut: a truncated signing key would sign payloads the receiver cannot verify.
 */
export function webhookSecretFieldError(
  value: string,
  options: { label: string; tv: Translate }
): string | undefined {
  if (!webhookSecretTooLong(value)) return undefined;
  return options.tv("maxLength", {
    field: options.label,
    max: WEBHOOK_SECRET_MAX_LENGTH,
    count: value.trim().length,
  });
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
