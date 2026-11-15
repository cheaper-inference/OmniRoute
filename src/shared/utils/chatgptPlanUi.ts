/** A token expiry, a network error or a generic 429 is not a plan-usage limit. */
export function hasChatGptUsageLimit(
  connection: {
    provider?: string;
    testStatus?: string | null;
    lastErrorType?: string | null;
    rateLimitedUntil?: string | null;
  },
  now = Date.now()
): boolean {
  if (connection.provider !== "chatgpt") return false;
  if (connection.testStatus === "credits_exhausted") return true;
  return (
    connection.testStatus === "unavailable" &&
    connection.lastErrorType === "quota_exhausted" &&
    Date.parse(connection.rateLimitedUntil || "") > now
  );
}

// Only an acknowledgement flag, never credentials or account identifiers.
const WELCOME_KEY = "omniroute.chatgpt.plan-welcome.v1";
let acknowledgedInSession = false;
export function shouldWelcomeChatGptPlan(reauth: boolean): boolean {
  if (reauth || acknowledgedInSession) return false;
  try {
    return window.localStorage.getItem(WELCOME_KEY) !== "acknowledged";
  } catch {
    return true;
  }
}
export function acknowledgeChatGptPlan() {
  acknowledgedInSession = true;
  try {
    window.localStorage.setItem(WELCOME_KEY, "acknowledged");
  } catch {
    // Storage can be disabled; acknowledgement still lasts for this page session.
  }
}
