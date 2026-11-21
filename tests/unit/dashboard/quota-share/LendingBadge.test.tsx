// @vitest-environment jsdom
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    values ? `${key} ${JSON.stringify(values)}` : key,
}));

const { default: LendingBadge } =
  await import("../../../../src/app/(dashboard)/dashboard/costs/quota-share/components/LendingBadge");
const { default: AllocationTable } =
  await import("../../../../src/app/(dashboard)/dashboard/costs/quota-share/components/AllocationTable");

const NOW = Date.UTC(2026, 10, 20, 12, 0, 0);
const FUTURE = Date.UTC(2100, 0, 1, 0, 0, 0);
const PAST = Date.UTC(2020, 0, 1, 0, 0, 0);

afterEach(() => cleanup());

function badgeText(props: React.ComponentProps<typeof LendingBadge>): string | null {
  const { container } = render(<LendingBadge {...props} />);
  return container.firstChild ? container.textContent : null;
}

function parsedValues(text: string | null, key: string): Record<string, unknown> {
  expect(text?.startsWith(`${key} `)).toBe(true);
  return JSON.parse((text ?? "").slice(key.length + 1)) as Record<string, unknown>;
}

describe("LendingBadge", () => {
  it("shows the percentage of an open-ended consent", () => {
    const text = badgeText({ percent: 30, nowMs: NOW });
    expect(parsedValues(text, "lendingBadge")).toEqual({ percent: 30 });
  });

  it("shows the deadline of a consent that still holds, in UTC", () => {
    const text = badgeText({ percent: 30, until: FUTURE, nowMs: NOW });
    const values = parsedValues(text, "lendingBadgeUntil");
    expect(values.percent).toBe(30);
    expect(String(values.date)).toContain("2100");
    expect(String(values.date)).toContain("UTC");
  });

  it("shows an expired consent once the deadline is reached", () => {
    expect(badgeText({ percent: 30, until: PAST, nowMs: NOW })).toBe("lendingBadgeExpired");
    expect(badgeText({ percent: 30, until: NOW, nowMs: NOW })).toBe("lendingBadgeExpired");
  });

  it("shows the deadline without judging it when there is no snapshot time", () => {
    const values = parsedValues(
      badgeText({ percent: 30, until: PAST, nowMs: null }),
      "lendingBadgeUntil"
    );
    expect(values.percent).toBe(30);
    expect(String(values.date)).toContain("2020");
  });

  it("treats an unreadable deadline as expired, as the gate does", () => {
    expect(badgeText({ percent: 30, until: Number.NaN, nowMs: NOW })).toBe("lendingBadgeExpired");
    expect(badgeText({ percent: 30, until: 8_640_000_000_000_001, nowMs: null })).toBe(
      "lendingBadgeExpired"
    );
  });

  it("treats a damaged deadline as expired also when there is no snapshot time", () => {
    // The database reader turns an unreadable deadline into 0. It must never print as 1970.
    expect(badgeText({ percent: 30, until: 0, nowMs: null })).toBe("lendingBadgeExpired");
    expect(badgeText({ percent: 30, until: 99_999_999_999, nowMs: null })).toBe(
      "lendingBadgeExpired"
    );
  });

  it("renders nothing when the key lends nothing", () => {
    expect(badgeText({ percent: 0, nowMs: NOW })).toBeNull();
    expect(badgeText({ nowMs: NOW })).toBeNull();
    expect(badgeText({ percent: Number.NaN, until: FUTURE, nowMs: NOW })).toBeNull();
  });
});

describe("AllocationTable lending badges", () => {
  const allocations = [
    { apiKeyId: "key-a", weight: 50, policy: "hard" as const, lendingPercent: 30 },
    {
      apiKeyId: "key-b",
      weight: 30,
      policy: "hard" as const,
      lendingPercent: 50,
      lendingUntil: PAST,
    },
    { apiKeyId: "key-c", weight: 20, policy: "hard" as const },
  ];
  const usage = {
    poolId: "pool-1",
    generatedAt: new Date(NOW).toISOString(),
    dimensions: [],
  };
  const keyLabels = { "key-a": "Key A", "key-b": "Key B", "key-c": "Key C" };

  function rowText(apiKeyLabel: string): string {
    const row = Array.from(document.querySelectorAll("tr")).find((tr) =>
      tr.textContent?.includes(apiKeyLabel)
    );
    return row?.textContent ?? "";
  }

  it("shows who lends in a consent pool, judged at the snapshot time", () => {
    render(
      <AllocationTable allocations={allocations} usage={usage} keyLabels={keyLabels} consentMode />
    );
    expect(rowText("Key A")).toContain('lendingBadge {"percent":30}');
    expect(rowText("Key B")).toContain("lendingBadgeExpired");
    expect(rowText("Key C")).not.toContain("lendingBadge");
  });

  it("shows the deadline unjudged when there is no usage snapshot", () => {
    render(
      <AllocationTable allocations={allocations} usage={null} keyLabels={keyLabels} consentMode />
    );
    expect(rowText("Key B")).toContain("lendingBadgeUntil");
  });

  it("shows no lending badge in a saturation pool", () => {
    render(
      <AllocationTable
        allocations={allocations}
        usage={usage}
        keyLabels={keyLabels}
        consentMode={false}
      />
    );
    expect(document.body.textContent).not.toContain("lendingBadge");
  });
});
