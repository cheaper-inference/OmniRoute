// @vitest-environment jsdom
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { parseQuotaData } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing";
import QuotaCardExpanded from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/QuotaCardExpanded";
import KiloPassMeter, {
  buildKiloPassMeterModel,
} from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/KiloPassMeter";

vi.mock("next-intl", () => ({
  useLocale: () => "en-US",
  useTranslations: () =>
    Object.assign(
      (key: string, values?: { count?: number; pct?: number }) => {
        if (key === "kiloPassUsageLabel") return "This month's usage";
        if (key === "kiloPassPaid") return "Paid";
        if (key === "kiloPassBonus") return "Available bonus";
        if (key === "kiloPassRemaining") return "Remaining";
        if (key === "kiloAccountBalance") return "Account Balance";
        if (key === "kiloPassBandUsage")
          return `${(values as { used?: string })?.used} of ${(values as { total?: string })?.total}`;
        if (key === "percentLeft") return `${values?.pct}% left`;
        return key;
      },
      { has: () => true }
    ),
}));

const rawKilocodeUsage = {
  quotas: {
    balance: {
      remaining: 11.51,
      remainingPercentage: 100,
      currency: "USD",
      displayName: "Personal Balance",
      unlimited: true,
    },
    kiloPassBase: {
      total: 49,
      remaining: 49,
      resetAt: "2030-09-15T00:00:00.000Z",
    },
    kiloPassBonus: { total: 24.5, remaining: 24.5 },
    kiloPassUsage: {
      used: 73.55,
      total: 73.5,
      resetAt: "2030-09-15T00:00:00.000Z",
    },
    kiloPassRemaining: { remaining: 0, total: 73.5 },
  },
};

describe("Kilo Pass meter production render path", () => {
  it("renders the dedicated meter rather than a generic 0% left quota row", () => {
    const quotas = parseQuotaData("kilocode", rawKilocodeUsage);
    const kiloPass = quotas.find((quota) => quota.kiloPass);

    expect(kiloPass).toMatchObject({
      name: "kiloPass",
      kiloPass: true,
      kiloPassBase: 49,
      kiloPassBonus: 24.5,
      used: 73.55,
      total: 73.5,
      remaining: 0,
      kiloPassBalance: 11.51,
    });

    const html = renderToStaticMarkup(
      <QuotaCardExpanded
        quotas={quotas}
        providerId="kilocode"
        loading={false}
        error={null}
        hasStaleData={false}
        onRefresh={() => {}}
        onOpenCutoff={() => {}}
        onOpenCost={() => {}}
        canEditCutoff={false}
        hasCutoffOverrides={false}
      />
    );

    expect(html).toContain("This month&#x27;s usage");
    expect(html).toContain("Paid");
    expect(html).toContain("Available bonus");
    expect(html).toContain("Remaining");
    expect(html).toContain("Account Balance");
    expect(html).toContain("$73.55");
    expect(html).toContain("$73.50");
    // Kit Progress bands (#19620, kit #190): one bar per pool, each clamped to its capacity.
    const doc = parse(html);
    expect(band(doc, "Paid")).toMatchObject({ max: "49", now: "49" });
    expect(band(doc, "Available bonus")).toMatchObject({ max: "24.5", now: "24.5" });
    expect(html).not.toContain("0% left");
  });
});

function parse(html: string): Document {
  return new DOMParser().parseFromString(html, "text/html");
}

/** The kit band progressbar named `label`, as its ARIA values. */
function band(doc: Document, label: string) {
  const bar = doc.querySelector<HTMLElement>(`[role="progressbar"][aria-label="${label}"]`);
  if (!bar) return null;
  return {
    min: bar.getAttribute("aria-valuemin"),
    max: bar.getAttribute("aria-valuemax"),
    now: bar.getAttribute("aria-valuenow"),
    text: bar.getAttribute("aria-valuetext"),
    tone: bar.closest<HTMLElement>(".ci-progress__band")?.dataset.tone,
    legend: bar.closest(".ci-progress__band")?.querySelector(".ci-progress__band-legend")
      ?.textContent,
  };
}

const renderMeter = (props: Partial<React.ComponentProps<typeof KiloPassMeter>> = {}) =>
  renderToStaticMarkup(
    <KiloPassMeter
      base={49}
      bonus={24.5}
      used={47.95}
      total={73.5}
      remaining={25.55}
      balance={11.51}
      {...props}
    />
  );

describe("KiloPassMeter segment model", () => {
  it("splits the pool into paid and bonus segments and uses paid credits first", () => {
    const model = buildKiloPassMeterModel({
      base: 49,
      bonus: 24.5,
      used: 47.95,
      total: 73.5,
      remaining: 25.55,
    });

    expect(model.paidPercent).toBeCloseTo(66.67, 1);
    expect(model.bonusPercent).toBeCloseTo(33.33, 1);
    expect(model.paidUsedPercent).toBeCloseTo(97.86, 1);
    expect(model.bonusUsedPercent).toBe(0);
  });

  it("fills paid completely before consuming the bonus segment", () => {
    const model = buildKiloPassMeterModel({
      base: 49,
      bonus: 24.5,
      used: 60,
      total: 73.5,
      remaining: 13.5,
    });

    expect(model.paidUsedPercent).toBe(100);
    expect(model.bonusUsedPercent).toBeCloseTo(44.9, 1);
  });

  it("fills both segments exactly when usage reaches the total", () => {
    const model = buildKiloPassMeterModel({
      base: 49,
      bonus: 24.5,
      used: 73.5,
      total: 73.5,
      remaining: 0,
    });

    expect(model.paidUsedPercent).toBe(100);
    expect(model.bonusUsedPercent).toBe(100);
    expect(model.progressValue).toBe(73.5);
  });

  it("clamps only visual progress when usage exceeds the total", () => {
    const model = buildKiloPassMeterModel({
      base: 49,
      bonus: 24.5,
      used: 73.55,
      total: 73.5,
      remaining: 0,
    });

    expect(model.used).toBe(73.55);
    expect(model.progressValue).toBe(73.5);
    expect(model.paidUsedPercent).toBe(100);
    expect(model.bonusUsedPercent).toBe(100);
  });

  it("handles absent paid or bonus pools and zero totals without NaN percentages", () => {
    const onlyPaid = buildKiloPassMeterModel({
      base: 49,
      bonus: 0,
      used: 10,
      total: 49,
      remaining: 39,
    });
    const onlyBonus = buildKiloPassMeterModel({
      base: 0,
      bonus: 24.5,
      used: 10,
      total: 24.5,
      remaining: 14.5,
    });
    const empty = buildKiloPassMeterModel({
      base: 0,
      bonus: 0,
      used: 0,
      total: 0,
      remaining: 0,
    });

    expect(onlyPaid.bonusPercent).toBe(0);
    expect(onlyBonus.paidPercent).toBe(0);
    expect(empty.paidPercent).toBe(0);
    expect(empty.bonusPercent).toBe(0);
    expect(empty.paidUsedPercent).toBe(0);
    expect(empty.bonusUsedPercent).toBe(0);
  });
});

describe("KiloPassMeter segmented presentation", () => {
  // Kit Progress `bands` (kit 0.0.112, keak-ai/cheaper-inference-ui-kit#190) replaced the
  // hand-made meter (#19620): each pool is its own track sized by its capacity, with its own
  // used fill, inside a group named by the meter label.
  it("renders paid and bonus as kit bands with their own tracks, values and legends", () => {
    const html = renderMeter();
    const doc = parse(html);

    const group = doc.querySelector('[role="group"]');
    expect(group?.getAttribute("aria-label")).toBe("Kilo Pass usage meter");
    expect(group?.closest(".ci-progress")?.getAttribute("data-layout")).toBe("bands");
    expect(doc.querySelectorAll('[role="progressbar"]')).toHaveLength(2);
    expect(band(doc, "Paid")).toEqual({
      min: "0",
      max: "49",
      now: "47.95",
      text: "$47.95 of $49.00",
      tone: "success",
      legend: "Paid$49.00",
    });
    expect(band(doc, "Available bonus")).toEqual({
      min: "0",
      max: "24.5",
      now: "0",
      text: "$0.00 of $24.50",
      tone: "info",
      legend: "Available bonus$24.50",
    });
    expect(html).toContain("$47.95 / $73.50");
    expect(html).toContain("Account Balance");
    expect(html).toContain("$11.51");
    expect(html).not.toContain("kiloPassBase");
    expect(html).not.toContain("kiloPassBonus");
    expect(html).not.toContain("kiloPassUsage");
  });

  it("uses the paid band first and spills the rest into the bonus band", () => {
    const doc = parse(renderMeter({ used: 60, remaining: 13.5 }));

    expect(band(doc, "Paid")).toMatchObject({ now: "49", text: "$49.00 of $49.00" });
    expect(band(doc, "Available bonus")).toMatchObject({ now: "11", text: "$11.00 of $24.50" });
  });

  it("omits the bonus band when no free bonus exists", () => {
    const doc = parse(renderMeter({ bonus: 0, total: 49, used: 10, remaining: 39 }));

    expect(band(doc, "Paid")).toMatchObject({ max: "49", now: "10" });
    expect(band(doc, "Available bonus")).toBeNull();
    expect(doc.querySelectorAll('[role="progressbar"]')).toHaveLength(1);
  });

  it("omits the paid band when only the free bonus pool exists", () => {
    const doc = parse(
      renderMeter({ base: 0, bonus: 24.5, total: 24.5, used: 10, remaining: 14.5 })
    );

    expect(band(doc, "Paid")).toBeNull();
    expect(band(doc, "Available bonus")).toMatchObject({ max: "24.5", now: "10" });
  });

  it("keeps the real overage in text while clamping each band to its capacity", () => {
    const html = renderMeter({ used: 73.55, remaining: 0 });
    const doc = parse(html);

    expect(html).toContain("$73.55 / $73.50");
    expect(band(doc, "Paid")).toMatchObject({ max: "49", now: "49" });
    expect(band(doc, "Available bonus")).toMatchObject({ max: "24.5", now: "24.5" });
  });

  it("renders a stable empty, determinate meter for a zero total", () => {
    const html = renderMeter({ base: 0, bonus: 0, used: 0, total: 0, remaining: 0, balance: null });
    const doc = parse(html);

    const bar = doc.querySelector('[role="progressbar"]');
    expect(bar?.getAttribute("aria-label")).toBe("Kilo Pass usage meter");
    expect(bar?.getAttribute("aria-valuenow")).toBe("0");
    expect(html).not.toContain('data-state="indeterminate"');
    expect(html).not.toContain("NaN");
  });
});

describe("KiloPassMeter band text is translated", () => {
  it("speaks each band through the usage.kiloPassBandUsage message", async () => {
    vi.resetModules();
    vi.doMock("next-intl", () => ({
      useLocale: () => "de-DE",
      useTranslations: () =>
        Object.assign(
          (key: string, values?: { used?: string; total?: string }) =>
            key === "kiloPassBandUsage" ? `${values?.used} von ${values?.total}` : key,
          { has: () => true }
        ),
    }));
    const { default: Meter } =
      await import("@/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/KiloPassMeter");
    const doc = parse(
      renderToStaticMarkup(
        <Meter base={49} bonus={24.5} used={47.95} total={73.5} remaining={25.55} />
      )
    );
    const texts = Array.from(doc.querySelectorAll('[role="progressbar"]')).map((bar) =>
      bar.getAttribute("aria-valuetext")
    );
    expect(texts).toEqual(["$47.95 von $49.00", "$0.00 von $24.50"]);
    vi.doUnmock("next-intl");
  });
});
