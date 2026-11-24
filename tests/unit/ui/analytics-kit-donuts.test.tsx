// @vitest-environment jsdom
// Kit #221 (dataviz-additions): the three analytics donuts are the kit MetricDonut, with the
// values formatted by the screen (`valueFormatter`: compact tokens or cost). They used to be a
// hand-composed recharts pie with a hand-written legend and tooltip.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  AccountDonut,
  ApiKeyDonut,
  ProviderCostDonut,
} from "@/shared/components/analytics/rechartsDonuts";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => key,
}));

let container: HTMLElement;
let root: Root;

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

function render(node: React.ReactNode) {
  act(() => root.render(node));
}

const legend = () =>
  Array.from(container.querySelectorAll(".ci-metric-donut__legend > div")).map((row) => [
    row.querySelector("span")!.textContent,
    row.querySelector("strong")!.textContent,
  ]);

describe("analytics donuts", () => {
  it("AccountDonut is the kit MetricDonut with compact token values and a translated total", () => {
    render(
      <AccountDonut
        byAccount={[
          { account: "alice", totalTokens: 1500 },
          { account: "bob", totalTokens: 500 },
        ]}
      />
    );
    const figure = container.querySelector("figure.ci-metric-donut")!;
    expect(figure).not.toBeNull();
    expect(figure.getAttribute("aria-label")).toBe("chartByAccount: alice 1.5K, bob 500");
    expect(legend()).toEqual([
      ["alice", "1.5K"],
      ["bob", "500"],
    ]);
    const total = container.querySelector(".ci-metric-donut__total")!;
    expect(total.querySelector("strong")!.textContent).toBe("2.0K");
    expect(total.querySelector("span")!.textContent).toBe("chartTotal");
    // The card is the frame: the kit figure draws none of its own.
    expect(figure.className).toMatch(/\bborder-0\b/);
    expect(figure.className).toMatch(/\bp-0\b/);
    expect(container.querySelector("h3")!.textContent).toBe("chartByAccount");
  });

  it("ApiKeyDonut shows the masked key label, never the raw id", () => {
    render(
      <ApiKeyDonut
        byApiKey={[{ apiKeyName: "", apiKeyId: "sk-1234567890abcdef", totalTokens: 10 }]}
      />
    );
    const [[label, value]] = legend();
    expect(label).not.toContain("sk-1234567890abcdef");
    expect(value).toBe("10");
  });

  it("ProviderCostDonut formats cost, sorts by cost and drops providers without one", () => {
    render(
      <ProviderCostDonut
        byProvider={[
          { provider: "openai", cost: 0.25 },
          { provider: "free", cost: 0 },
          { provider: "anthropic", cost: 1.5 },
        ]}
      />
    );
    expect(legend()).toEqual([
      ["anthropic", "$1.50"],
      ["openai", "$0.2500"],
    ]);
    expect(container.querySelector(".ci-metric-donut__total strong")!.textContent).toBe("$1.75");
  });

  it("keeps the empty cards", () => {
    render(<AccountDonut byAccount={[]} />);
    expect(container.querySelector(".ci-metric-donut")).toBeNull();
    expect(container.textContent).toContain("chartNoData");
    render(<ProviderCostDonut byProvider={[{ provider: "free", cost: 0 }]} />);
    expect(container.textContent).toContain("chartNoCostData");
  });
});
