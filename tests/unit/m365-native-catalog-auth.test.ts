import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { supportsDualAuthProvider } from "../../src/shared/constants/providers.ts";
import { WEB_COOKIE_PROVIDERS } from "../../src/shared/constants/providers/web-cookie.ts";
import { OAUTH_PROVIDERS } from "../../src/shared/constants/providers/oauth.ts";

test("M365 keeps one web-cookie catalog entry with native sign-in and legacy alternative", () => {
  assert.equal(WEB_COOKIE_PROVIDERS["copilot-m365-web"].id, "copilot-m365-web");
  assert.equal(WEB_COOKIE_PROVIDERS["copilot-m365-web"].name, "Microsoft 365 Copilot");
  assert.equal(OAUTH_PROVIDERS["copilot-m365-web"], undefined);
  assert.equal(supportsDualAuthProvider("copilot-m365-web"), true);
  const page = readFileSync(
    new URL(
      "../../src/app/(dashboard)/dashboard/providers/[id]/ProviderDetailPageClient.tsx",
      import.meta.url
    ),
    "utf8"
  );
  assert.match(page, /const providerSupportsOAuth =\s*providerId === "copilot-m365-web"/);
});
