/**
 * Telegram Mini App configuration.
 *
 * The bot token is read from the environment (TELEGRAM_BOT_TOKEN) so it is
 * never stored in the DB or committed. It doubles as the HMAC secret for
 * initData verification (see ./initData.ts).
 */

import { parseEnvBoolean } from "@/shared/utils/envBoolean";

const DEFAULT_WEBHOOK_TIMEOUT_MS = 60_000;

/** Telegram bot token format: <numeric_id>:<alphanumeric_secret> (min 35 chars after colon). */
const BOT_TOKEN_RE = /^\d+:[A-Za-z0-9_-]{35,}$/;

export function getTelegramBotToken(): string {
  return process.env.TELEGRAM_BOT_TOKEN || "";
}

export function isTelegramEnabled(): boolean {
  return BOT_TOKEN_RE.test(getTelegramBotToken());
}

export function getTelegramWebhookTimeoutMs(): number {
  const raw = process.env.TELEGRAM_WEBHOOK_TIMEOUT_MS;
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isInteger(parsed) && parsed > 0 ? parsed : DEFAULT_WEBHOOK_TIMEOUT_MS;
}

/**
 * Shared secret for authenticating Telegram webhook deliveries.
 *
 * Telegram echoes the `secret_token` passed to `setWebhook` back on every
 * delivery in the `X-Telegram-Bot-Api-Secret-Token` header, which is the only
 * way to prove a webhook POST actually came from Telegram. Kept in the
 * environment alongside the bot token so it is never stored in the DB.
 */
export function getTelegramWebhookSecret(): string {
  return process.env.TELEGRAM_WEBHOOK_SECRET || "";
}

/**
 * Whether webhook deliveries are authenticated.
 *
 * When no secret is configured the webhook path is rejected outright rather
 * than served unauthenticated: an open path mints API keys and spends upstream
 * quota for any caller (see #13172). The Mini App path is unaffected — it
 * authenticates with the initData HMAC and does not use this secret.
 */
export function isTelegramWebhookSecretConfigured(): boolean {
  return getTelegramWebhookSecret().length > 0;
}

/**
 * Opt-in Telegram user allowlist (TELEGRAM_USER_ALLOWLIST_ENABLED).
 *
 * A Telegram bot is publicly reachable: anyone who finds its @username can
 * message it or open its Mini App, and both paths carry a *genuine* Telegram
 * signature/secret. Signature checks therefore prove origin, not authorization:
 * without an allowlist every Telegram user gets a minted API key and spends the
 * operator's upstream quota.
 *
 * Off by default so existing bots keep serving every user. When enabled, only
 * the numeric user ids in TELEGRAM_ALLOWED_USER_IDS (comma separated) are
 * served, and an empty list serves nobody.
 */
export function isTelegramUserAllowlistEnabled(): boolean {
  return parseEnvBoolean(process.env.TELEGRAM_USER_ALLOWLIST_ENABLED, false);
}

const TELEGRAM_USER_ID = /^[1-9]\d*$/;

function getTelegramAllowedUserIdEntries(): string[] {
  return (process.env.TELEGRAM_ALLOWED_USER_IDS || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

/** Listed user ids; entries that are not a plain positive integer can never match and are dropped. */
export function getTelegramAllowedUserIds(): string[] {
  return getTelegramAllowedUserIdEntries().filter((v) => TELEGRAM_USER_ID.test(v));
}

/**
 * Allowlist misconfigurations that would otherwise fail silently. The values
 * themselves are not echoed: list entries may be Telegram user ids.
 */
export function getTelegramAllowlistConfigWarnings(): string[] {
  const warnings: string[] = [];
  const rawSwitch = process.env.TELEGRAM_USER_ALLOWLIST_ENABLED;
  // parseEnvBoolean() returns its fallback for an unrecognised value.
  if (rawSwitch?.trim() && parseEnvBoolean(rawSwitch, true) !== parseEnvBoolean(rawSwitch, false)) {
    warnings.push(
      "TELEGRAM_USER_ALLOWLIST_ENABLED is not a recognised boolean (true/false/1/0/yes/no/on/off); the allowlist stays off"
    );
  }
  const ignored = getTelegramAllowedUserIdEntries().length - getTelegramAllowedUserIds().length;
  if (ignored > 0) {
    warnings.push(
      `TELEGRAM_ALLOWED_USER_IDS has ${ignored} entry(ies) that are not numeric Telegram user ids; they are ignored`
    );
  }
  if (!isTelegramUserAllowlistEnabled() && getTelegramAllowedUserIds().length > 0) {
    warnings.push(
      "TELEGRAM_ALLOWED_USER_IDS is set but TELEGRAM_USER_ALLOWLIST_ENABLED is off; every Telegram user is served"
    );
  }
  return warnings;
}

export function isTelegramUserAllowed(userId: number | null | undefined): boolean {
  if (!isTelegramUserAllowlistEnabled()) return true;
  if (typeof userId !== "number" || !Number.isSafeInteger(userId) || userId <= 0) return false;
  return getTelegramAllowedUserIds().includes(String(userId));
}

export function getTelegramBotApiBase(): string {
  return process.env.TELEGRAM_BOT_API_BASE || "https://api.telegram.org";
}
