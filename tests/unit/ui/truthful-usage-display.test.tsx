import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/i18n/messages/en.json";
import UsageOverview from "@/shared/components/UsageOverview";
import { formatUsageCounter } from "@/shared/utils/usageDisplay";
import { computeLogsSignature } from "@/shared/components/requestLoggerSignature";
vi.unmock("next-intl");
afterEach(cleanup);
const t = (key: string) =>
  ({
    reported: "reported",
    estimated: "estimated",
    unknownSource: "source unknown",
    unknown: "N/A",
  })[key] ?? key;
describe("truthful usage displays", () => {
  it("keeps each counter's evidence separate, including reported zero and unknown placeholders", () => {
    expect(formatUsageCounter(20, { source: "reported" }, t)).toBe("20 (reported)");
    expect(formatUsageCounter(5, { source: "estimated", method: "chars/4" }, t)).toBe(
      "5 (estimated: chars/4)"
    );
    expect(formatUsageCounter(0, { source: "unknown" }, t)).toBe("N/A");
    expect(formatUsageCounter(0, { source: "reported" }, t)).toBe("0 (reported)");
    expect(formatUsageCounter(0, null, t)).toBe("0 (source unknown)");
    expect(formatUsageCounter(null, null, t)).toBe("N/A");
  });
  it("refreshes existing rows when only provenance or a cache counter changes", () => {
    const row = {
      id: "a",
      status: 200,
      duration: 10,
      tokens: { in: 20, out: 5, cacheRead: null },
      usageEvidence: null,
    };
    expect(computeLogsSignature([row])).not.toBe(
      computeLogsSignature([{ ...row, usageEvidence: { output: { source: "reported" } } }])
    );
    expect(computeLogsSignature([row])).not.toBe(
      computeLogsSignature([{ ...row, tokens: { ...row.tokens, cacheRead: 0 } }])
    );
  });
  it("renders real totals with estimation and non-invoice cost labels", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <UsageOverview
          stats={{
            totalRequests: 1,
            totalPromptTokens: 20,
            totalCompletionTokens: 5,
            totalCost: 0.01,
            estimated: true,
          }}
        />
      </NextIntlClientProvider>
    );
    expect(screen.getByText("Contains estimated usage")).toBeTruthy();
    expect(screen.getByText("Catalogue cost estimate, not provider billing")).toBeTruthy();
  });
});
