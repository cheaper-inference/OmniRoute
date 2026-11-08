import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS_ENTERPRISE } =
  await import("../../src/shared/constants/providers/apikey/enterprise-cloud.ts");
const { APIKEY_PROVIDERS_INFERENCE } =
  await import("../../src/shared/constants/providers/apikey/inference-hosts.ts");
const { WEB_COOKIE_PROVIDERS } = await import("../../src/shared/constants/providers/web-cookie.ts");

// #5461 — Scaleway's `website` pointed at https://www.scaleway.com/en/ai/generative-apis
// which returns HTTP 404. The live docs page is /en/docs/ai-data/generative-apis/.
test("#5461 Scaleway website points at a live docs URL, not the 404 marketing path", () => {
  const scaleway = (APIKEY_PROVIDERS_ENTERPRISE as Record<string, any>).scaleway;
  assert.ok(scaleway, "scaleway provider must exist");
  assert.equal(scaleway.website, "https://www.scaleway.com/en/docs/ai-data/generative-apis/");
  assert.ok(
    !scaleway.website.includes("/en/ai/generative-apis"),
    "must not keep the 404 marketing URL"
  );
});

// #5470 — Together AI retired its $25 signup credit and is now fully prepaid
// (minimum $5 purchase). The catalog claimed a free tier, so the "Free" badge lied.
test("#5470 Together AI no longer advertises a free tier and warns about the prepaid minimum", () => {
  const together = (APIKEY_PROVIDERS_INFERENCE as Record<string, any>).together;
  assert.ok(together, "together provider must exist");
  assert.equal(together.hasFree, false, "Together is prepaid-only — hasFree must be false");
  assert.ok(!together.freeNote, "the stale $25/free-models freeNote must be gone");
  const noticeText: string = together.notice?.text || "";
  assert.ok(noticeText.length > 0, "a prepaid notice must be present");
  assert.ok(!noticeText.includes("$25 signup credits"), "must not repeat the retired $25 claim");
  assert.ok(/prepaid|\$5/i.test(noticeText), "notice must mention the prepaid / $5 minimum");
});

// #5534 — the M365 Copilot authHint gave no concrete steps and the reporter's guessed
// method (Authorization header) was wrong. Native Microsoft sign-in replaced manual token
// capture: the hint now routes users there, and the concrete DevTools steps live in the
// sign-in dialog, which captures the nativeclient request URL rather than any header.
test("#5534 M365 Copilot authHint routes to native sign-in, whose dialog gives concrete DevTools steps", async () => {
  const m365 = (WEB_COOKIE_PROVIDERS as Record<string, any>)["copilot-m365-web"];
  assert.ok(m365, "copilot-m365-web provider must exist");
  const hint: string = m365.authHint || "";
  assert.match(hint, /native Microsoft sign-in/i, "hint must point at native Microsoft sign-in");
  assert.match(hint, /HAR import/i, "hint must name the legacy import path for captured sessions");
  assert.doesNotMatch(hint, /Authorization/i, "hint must never suggest an Authorization header");

  const { default: en } = await import("../../src/i18n/messages/en.json", {
    with: { type: "json" },
  });
  const dialog = (en as { oauthModal: Record<string, string> }).oauthModal;
  assert.match(dialog.m365StepNetwork, /DevTools → Network/, "the dialog names the DevTools panel");
  assert.match(
    dialog.m365StepNetwork,
    /Preserve log/,
    "the dialog keeps the request across redirects"
  );
  assert.match(
    dialog.m365StepCopy,
    /login\.microsoftonline\.com\/common\/oauth2\/nativeclient/,
    "the dialog names the exact request to copy"
  );
});
