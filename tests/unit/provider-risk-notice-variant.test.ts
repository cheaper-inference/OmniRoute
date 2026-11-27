import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { ProviderSchema } from "@/shared/validation/providerSchema.ts";

const {
  providers: { riskNotice },
} = JSON.parse(readFileSync(new URL("../../src/i18n/messages/en.json", import.meta.url), "utf8"));

test("an unofficial service can use its own subscription risk notice", () => {
  const result = ProviderSchema.safeParse({
    id: "fixture",
    name: "Fixture",
    icon: "hub",
    color: "#000000",
    serviceKinds: ["llm"],
    subscriptionRisk: true,
    riskNoticeVariant: "unofficial-service",
  });
  assert.equal(result.success, true, result.error?.message);
});

test("the English risk notices include the new warning and preserve the prior messages", () => {
  assert.equal(
    riskNotice["unofficial-service"],
    "This service is not an official channel of the model makers, or its terms restrict this kind of use. Whoever runs it can read your prompts, and the account or the service itself can be blocked or shut down without notice. Use at your own risk."
  );
  assert.deepEqual(
    [
      riskNotice.oauth,
      riskNotice.webCookie,
      riskNotice.deprecated,
      riskNotice["official-client-only"],
    ],
    [
      "This provider uses your official product session/OAuth, which is not authorized for proxy/router use. We don't recommend intensive autonomous agent usage (OpenCloud-style, long multi-step flows, large batches) — the upstream may react by restricting or banning the account. Use at your own risk.",
      "This provider authenticates through your web session cookies. The upstream service may invalidate the session at any time, requiring you to log in again. Not recommended for long unattended operations. Use at your own risk.",
      "This provider was discontinued by its upstream and may stop working without notice. Existing connections may continue working until the upstream fully removes access. Consider alternatives.",
      "The upstream restricts free mode to its official clients and suspends accounts used through proxies. Use at your own risk; the paid API (freebuff.com/account/api) is the sanctioned path.",
    ]
  );
});
