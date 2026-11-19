// @vitest-environment jsdom
/**
 * UI review 2026-11-15, defect 13: the hand-made proportion and quota bars had no
 * `role="progressbar"`, so a screen reader skipped them. This pins the rendered contract of a
 * sample of the bars that stay hand-made (thin height, series colour, categorical segments) and
 * of the ones that became the kit `Progress`. The static inventory is guarded by
 * tests/unit/progress-bars-have-semantics.test.ts.
 */
import React from "react";
import axe from "axe-core";
import { cleanup, render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it } from "vitest";
import messages from "../../../src/i18n/messages/en.json";
import QuotaMiniBar from "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaMiniBar";
import DimensionBar from "../../../src/app/(dashboard)/dashboard/costs/quota-share/components/DimensionBar";
import StackedAllocationBar from "../../../src/app/(dashboard)/dashboard/costs/quota-share/components/StackedAllocationBar";
import WeightTotalBar from "../../../src/app/(dashboard)/dashboard/combos/WeightTotalBar";
import { TimingWaterfall } from "../../../src/app/(dashboard)/dashboard/tools/traffic-inspector/components/shared/TimingWaterfall";
import { WaterfallInspector } from "../../../src/app/(dashboard)/dashboard/compression/studio/WaterfallInspector";
import type { CompressionRunModel } from "../../../src/app/(dashboard)/dashboard/compression/studio/compressionFlowModel";

afterEach(cleanup);

function renderWithIntl(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

function bars(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>('[role="progressbar"]'));
}

function range(bar: HTMLElement) {
  return {
    name: bar.getAttribute("aria-label"),
    min: bar.getAttribute("aria-valuemin"),
    max: bar.getAttribute("aria-valuemax"),
    now: bar.getAttribute("aria-valuenow"),
    text: bar.getAttribute("aria-valuetext"),
  };
}

async function expectNamedProgressbars(container: HTMLElement) {
  const results = await axe.run(container, {
    runOnly: { type: "rule", values: ["aria-progressbar-name", "aria-valid-attr-value"] },
  });
  expect(results.violations.map((violation) => violation.id)).toEqual([]);
}

const RUN: CompressionRunModel = {
  requestId: "req-1",
  comboId: "stacked",
  mode: "stacked",
  originalTokens: 10000,
  compressedTokens: 5500,
  savingsPercent: 45,
  timestamp: 1718000001000,
  steps: [
    {
      engine: "rtk",
      originalTokens: 10000,
      compressedTokens: 8000,
      savingsPercent: 20,
      techniquesUsed: ["tool-output-trim"],
      durationMs: 2.1,
    },
  ],
};

describe("hand-made bars announce themselves as progressbars", () => {
  it("QuotaMiniBar carries the quota name and the clamped remaining value", async () => {
    const { container } = render(<QuotaMiniBar percent={142} label="Weekly" />);
    const [bar] = bars(container);
    expect(range(bar)).toMatchObject({ name: "Weekly", min: "0", max: "100", now: "100" });
    // The drawing is unchanged: a thin track with one fill.
    expect(bar.className).toContain("h-1");
    expect((bar.firstElementChild as HTMLElement).style.width).toBe("100%");
    await expectNamedProgressbars(container);
  });

  it("DimensionBar is no longer hidden and is named by its unit and window", async () => {
    const { container } = renderWithIntl(
      <DimensionBar
        dimension={{ unit: "tokens", window: "daily", limit: 200 } as never}
        consumedTotal={50}
      />
    );
    const [bar] = bars(container);
    expect(bar.closest('[aria-hidden="true"]')).toBeNull();
    expect(range(bar)).toMatchObject({ name: "tokens / daily", min: "0", max: "100", now: "25" });
    await expectNamedProgressbars(container);
  });

  it("StackedAllocationBar speaks the allocated total and lists each key", async () => {
    const { container } = renderWithIntl(
      <StackedAllocationBar
        allocations={[
          { apiKeyId: "key_1", weight: 50, policy: "hard" },
          { apiKeyId: "key_2", weight: 30, policy: "soft" },
        ]}
        usage={null}
        keyLabels={{ key_1: "KeyOne", key_2: "KeyTwo" }}
      />
    );
    const [bar] = bars(container);
    expect(range(bar)).toMatchObject({
      name: messages.quotaShare.stackedBarTitle,
      min: "0",
      max: "100",
      now: "80",
      text: "KeyOne: 50%, KeyTwo: 30%",
    });
    expect(bar.children).toHaveLength(2);
    await expectNamedProgressbars(container);
  });

  it("WeightTotalBar speaks the weight total, capped at the range", async () => {
    const { container } = renderWithIntl(
      <WeightTotalBar models={[{ weight: 70 }, { weight: 50 }]} />
    );
    const [bar] = bars(container);
    expect(range(bar)).toMatchObject({
      name: messages.combos.weightPercent,
      min: "0",
      max: "100",
      now: "100",
      text: "120%",
    });
    await expectNamedProgressbars(container);
  });

  it("TimingWaterfall names each latency bar and gives it the real milliseconds", async () => {
    const { container } = renderWithIntl(
      <TimingWaterfall
        request={{ proxyLatencyMs: 20, upstreamLatencyMs: 180, totalLatencyMs: 200 } as never}
      />
    );
    expect(bars(container).map(range)).toEqual([
      {
        name: messages.trafficInspector.timingProxyOverhead,
        min: "0",
        max: "200",
        now: "20",
        text: "20ms (10.0%)",
      },
      {
        name: messages.trafficInspector.timingUpstreamResponse,
        min: "0",
        max: "200",
        now: "180",
        text: "180ms (90.0%)",
      },
    ]);
    await expectNamedProgressbars(container);
  });

  it("WaterfallInspector: step bars stay hand-made, the output bar is the kit Progress", async () => {
    const { container } = renderWithIntl(<WaterfallInspector run={RUN} />);
    const all = bars(container);
    expect(all.map((bar) => bar.getAttribute("aria-label"))).toEqual([
      `rtk: ${messages.compressionStudio.input}`,
      `rtk: ${messages.compressionStudio.output}`,
      messages.compressionStudio.output,
    ]);
    expect(range(all[0])).toMatchObject({ min: "0", max: "10000", now: "10000" });
    expect(range(all[1])).toMatchObject({ min: "0", max: "10000", now: "8000" });
    const output = all[2];
    expect(output.classList.contains("ci-progress__track")).toBe(true);
    expect(range(output)).toMatchObject({ min: "0", max: "10000", now: "5500" });
    expect(output.querySelector(".ci-progress__indicator")?.getAttribute("data-tone")).toBe(
      "success"
    );
    await expectNamedProgressbars(container);
  });
});
