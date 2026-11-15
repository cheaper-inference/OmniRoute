import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/i18n/messages/en.json";
import RequestLogTokens from "@/shared/components/RequestLogTokens";

vi.unmock("next-intl");
afterEach(cleanup);
const tokenMessages = {
  common: { usageEvidence: messages.common.usageEvidence },
  cache: messages.cache,
  requestLogger: { detail: messages.requestLogger.detail },
};

it.each([
  {
    name: "live cacheCreation count",
    tokens: { cacheCreation: 17 },
    expected: "17 (reported)",
  },
  {
    name: "live zero cacheCreation count",
    tokens: { cacheCreation: 0 },
    expected: "0 (reported)",
  },
  {
    name: "live count when cacheWrite is null",
    tokens: { cacheWrite: null, cacheCreation: 17 },
    expected: "17 (reported)",
  },
  {
    name: "explicit zero cacheWrite ahead of cacheCreation",
    tokens: { cacheWrite: 0, cacheCreation: 17 },
    expected: "0 (reported)",
  },
  {
    name: "persisted cacheWrite ahead of cacheCreation",
    tokens: { cacheWrite: 23, cacheCreation: 17 },
    expected: "23 (reported)",
  },
  {
    name: "missing cache write count",
    tokens: {},
    expected: "N/A",
  },
])("renders $name", ({ tokens, expected }) => {
  render(
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={tokenMessages}>
      <RequestLogTokens
        log={{
          tokens,
          usageEvidence: {
            input: { source: "reported" },
            output: { source: "reported" },
            cacheRead: { source: "reported" },
            cacheCreation: { source: "reported" },
          },
        }}
      />
    </NextIntlClientProvider>
  );
  expect(screen.getByLabelText(`Cache Write: ${expected}`).textContent).toBe(`CW: ${expected}`);
});

it("keeps cache writes unknown when live evidence is unknown", () => {
  render(
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={tokenMessages}>
      <RequestLogTokens
        log={{
          tokens: { cacheCreation: 17 },
          usageEvidence: {
            input: { source: "reported" },
            output: { source: "reported" },
            cacheRead: { source: "reported" },
            cacheCreation: { source: "unknown" },
          },
        }}
      />
    </NextIntlClientProvider>
  );
  expect(screen.getByLabelText("Cache Write: N/A").textContent).toBe("CW: N/A");
});
