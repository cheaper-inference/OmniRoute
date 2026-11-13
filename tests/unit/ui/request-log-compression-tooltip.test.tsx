import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/i18n/messages/fr.json";
import RequestLogTokens from "@/shared/components/RequestLogTokens";
vi.unmock("next-intl");
afterEach(cleanup);
it("renders the complete compressed-token tooltip in the active locale", () => {
  render(
    <NextIntlClientProvider locale="fr" timeZone="UTC" messages={messages}>
      <RequestLogTokens log={{ tokens: { in: 100, out: 10, compressed: 20 } }} />
    </NextIntlClientProvider>
  );
  expect(screen.getByText("↓20").getAttribute("title")).toBe("20 jetons compressés");
});
it("does not show a compression tooltip for zero compression", () => {
  const { container } = render(
    <NextIntlClientProvider locale="fr" timeZone="UTC" messages={messages}>
      <RequestLogTokens log={{ tokens: { compressed: 0 } }} />
    </NextIntlClientProvider>
  );
  expect(container.textContent).not.toContain("↓");
});
