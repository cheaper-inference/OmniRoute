// Re-exported from accountFallback.ts (its public import site). Lives in a leaf
// so adding a signal does not grow that file, which is frozen at its size cap.

// T10 (sub2api PR #1169): Signals that indicate billing credits are exhausted.
// Distinct from rate-limit 429 — the account won't recover until credits are added.
export const CREDITS_EXHAUSTED_SIGNALS = [
  "insufficient_quota",
  "billing_hard_limit_reached",
  "exceeded your current quota",
  "exceeded your current usage quota",
  "credit_balance_too_low",
  "your credit balance is too low",
  "credits exhausted",
  "out of credits",
  "payment required",
  "free tier of the model has been exhausted",
  // #8631: narrower than a bare "has been exhausted" — that generic phrase also
  // appears in Gemini's transient RPM/TPM 429 body ("Resource has been exhausted
  // (e.g. check quota)."), which must stay RATE_LIMIT_EXCEEDED, not terminal.
  // Anchoring on "tier" keeps free-tier depletion wording matched while excluding
  // Gemini's "resource has been exhausted" rate-limit phrasing.
  "tier has been exhausted",
  // #5239: providers (e.g. DeepSeek/GLM-style) return "Insufficient account balance"
  // on a depleted key. 402 is already terminalized by status, but catch non-402
  // out-of-credit bodies here too.
  "insufficient balance",
  "insufficient_balance",
  "insufficient account balance",
  "insufficient credit balance",
  // Command Code returns 400 "You have insufficient credits to make this
  // request. Please purchase more credits to continue using the service."
  // when the account's billing credits run out. Without this signal the
  // error stays unclassified (errorType=null), so the connection is never
  // marked credits_exhausted and keeps being re-selected on every request.
  "insufficient credits",
  "insufficient credit",
  // FriendliAI 403 when free tier credits are depleted via adaptive rate limits
  "exhausted all your credits",
  // Z.AI/GLM code 1113 reports an out-of-credit account as HTTP 429 with a
  // Chinese-only body and no Retry-After:
  //   {"error":{"code":"1113","message":"余额不足或无可用资源包,请充值。"}}
  // ("insufficient balance or no available resource package, please top up").
  // Without these it stayed a transient rate limit and the dead key kept being
  // re-selected on a short backoff. A bare "请充值" (top up) is deliberately NOT
  // a signal: Kimi/Qwen quota-window bodies also say it and stay QUOTA (#13194).
  "余额不足",
  "无可用资源包",
  "[1113]",
  // new-api family gateways (b.ai and other pooled resellers) report a dry key
  // as HTTP 400 with code `insufficient_user_quota`; the human message is often
  // localized, so the code is the only stable marker. Distinct from the
  // "insufficient_quota" entry above, which does not substring-match it.
  "insufficient_user_quota",
  // "You have run out of funds" / "Account is out of funds".
  "out of funds",
];
