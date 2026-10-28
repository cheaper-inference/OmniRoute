import { availability, blocker, decision } from "./quota-availability-fixtures";
import React from "react";
import "@testing-library/jest-dom/vitest";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../src/i18n/messages/en.json";
import zh from "../../src/i18n/messages/zh-CN.json";
import QuotaHealthOverview from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaHealthOverview";
import QuotaLayoutPicker, {
  useQuotaLayout,
} from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaLayoutPicker";
import QuotaCardGrid from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCardGrid";
import {
  buildHealthAccount,
  type HealthConnection,
  type HealthData,
} from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview";
// Real bilingual context, with synthetic identities only. No service or database imports.
vi.unmock("next-intl");
// Isolate the existing heavy detail card, not the overview or callback wiring.
vi.mock("@/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCard", () => ({
  default: (props: {
    connection: HealthConnection;
    onRefresh: () => void;
    onOpenCutoff: () => void;
    onOpenResetCredits: () => void;
    onToggleActive: (active: boolean) => void;
    onHideQuota: (q: object) => void;
    onShowQuota: (q: object) => void;
  }) => (
    <div data-testid="detail-card" data-provider-card={props.connection.provider}>
      <button onClick={props.onRefresh}>refresh action</button>
      <button onClick={props.onOpenCutoff}>cutoff action</button>
      <button onClick={props.onOpenResetCredits}>credits action</button>
      <button onClick={() => props.onToggleActive(false)}>park action</button>
      <button onClick={() => props.onHideQuota({ name: "weekly" })}>hide action</button>
      <button onClick={() => props.onShowQuota({ name: "weekly" })}>show action</button>
    </div>
  ),
}));
const fetchedAt = "2099-01-01T00:00:00Z",
  now = Date.parse(fetchedAt);
const connection = {
  id: "account-1",
  provider: "claude",
  email: "account@example.test",
  isActive: true,
};
const data: HealthData = {
  raw: { fetchedAt },
  quotas: [
    { name: "session (5h)", remainingPercentage: 90, resetAt: "2099-01-01T04:00:00Z" },
    { name: "weekly (7d)", remainingPercentage: 0, resetAt: "2099-01-07T00:00:00Z" },
  ],
};
function project(c: HealthConnection, d = data) {
  return buildHealthAccount(c, d, {}, now, {
    availability: availability(
      c.id,
      d.quotas?.length
        ? decision(false, [
            blocker(
              d.quotas[d.quotas.length - 1].name,
              d.quotas[d.quotas.length - 1].resetAt || null
            ),
          ])
        : decision(null)
    ),
    availabilityObservedAt: now,
    observedAt: fetchedAt,
    cooldown: { id: c.id, status: "healthy", lockouts: [] },
  });
}
function wrapper(ui: React.ReactNode, locale = "en") {
  const m = locale === "en" ? en : zh;
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={{ usage: m.usage, common: m.common }}
      timeZone="UTC"
      now={new Date(fetchedAt)}
      onError={(e) => {
        throw e;
      }}
    >
      {ui}
    </NextIntlClientProvider>
  );
}
function localized(ui: React.ReactNode, locale = "en") {
  return render(wrapper(ui, locale));
}
const units = () => Array.from(document.querySelectorAll<HTMLButtonElement>("[data-availability]"));
function props(cs = [connection]) {
  return {
    connections: cs,
    accounts: Object.fromEntries(cs.map((c) => [c.id, project(c)])),
    quotaData: {},
    emailsVisible: false,
    providerLabels: { claude: "Claude" },
    renderCard: () => <div>details</div>,
  };
}
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  localStorage.clear();
});
it("keeps known-usable capsules green when the water level is unknown", () => {
  const account = buildHealthAccount(connection, undefined, {}, now, {
    availability: availability(connection.id, decision(true)),
    availabilityObservedAt: now,
  });
  expect(account.cells).toHaveLength(0);
  localized(<QuotaHealthOverview {...props()} accounts={{ [connection.id]: account }} />);
  const unit = units()[0];
  expect(unit).toHaveAttribute("data-availability", "ok");
  expect(unit).toHaveAttribute("data-kind", "ok");
  expect(unit).not.toHaveClass("border-dashed");
  expect(unit.style.getPropertyValue("--capsule-color")).toBe("var(--color-success)");
  expect(unit.querySelector("[data-fill]")).toBeNull();
  expect(document.querySelector("[data-group-counts]")).toHaveTextContent("1 / 1 available");
});
it.each([1, 2, 40, 200])(
  "renders %i fixed-width capsules with inverse cooldown waterlines",
  (size) => {
    const cs = Array.from({ length: size }, (_, i) => ({
      ...connection,
      id: `id-${i}`,
      email: `account-${i}@example.test`,
    }));
    localized(<QuotaHealthOverview {...props(cs)} />);
    expect(units()).toHaveLength(size);
    expect(document.body.textContent).toContain(en.usage.healthAccountHint);
    expect(screen.getByRole("heading", { level: 3 }).parentElement).toHaveTextContent(
      `${size} account`
    );
    for (const unit of units()) {
      expect(unit).toHaveAttribute("data-availability", "critical");
      expect(unit).toHaveAttribute("data-kind", "cdw");
      expect(unit.style.getPropertyValue("--capsule-color")).toBe("var(--color-error)");
      expect(unit).toHaveClass("w-[9px]", "h-[32px]", "grow-0", "rounded-full", "overflow-hidden");
      expect(unit.parentElement).toHaveClass("flex", "flex-wrap", "gap-x-[4px]", "gap-y-[6px]");
      expect(unit.getAttribute("aria-label")).not.toContain("@example.test");
      expect(unit).not.toHaveAttribute("title");
      expect(unit.querySelector("[data-fill]")).toBeTruthy();
    }
    expect(document.querySelector("[data-group-counts]")).toHaveTextContent(
      `0 / ${size} available`
    );
    expect(document.querySelector("[data-group-counts]")).not.toHaveTextContent(en.common.paused);
    fireEvent.focus(units()[0]);
    const tip = screen.getByRole("tooltip");
    expect(tip).toHaveTextContent("90%");
    expect(tip).toHaveTextContent(en.usage.healthQuotaExhausted);
    expect(tip).toHaveTextContent(en.usage.healthFiveHour);
    expect(tip).toHaveTextContent("0%");
    expect(tip.parentElement).toBe(document.body);
    expect(units()[0]).toHaveAttribute("aria-describedby", tip.id);
    expect(tip).not.toHaveTextContent("@example.test");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).toBeNull();
    fireEvent.focus(units()[0]);
    fireEvent.blur(units()[0]);
    expect(screen.queryByRole("tooltip")).toBeNull();
    fireEvent.mouseEnter(units()[0]);
    expect(screen.getByRole("tooltip")).toHaveTextContent("90%");
    fireEvent.mouseLeave(units()[0]);
    expect(screen.queryByRole("tooltip")).toBeNull();
    fireEvent.click(units()[0]);
    expect(units()[0]).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("details")).toBeTruthy();
    fireEvent.click(units()[0]);
    expect(screen.queryByText("details")).toBeNull();
  }
);
it.each(["en", "zh-CN"])(
  "keeps all existing card actions reachable through account selection (%s)",
  (locale) => {
    const actions = {
      onRefresh: vi.fn(),
      onOpenCutoff: vi.fn(),
      onOpenResetCredits: vi.fn(),
      onToggleActive: vi.fn(),
      onHideQuota: vi.fn(),
      onShowQuota: vi.fn(),
    };
    localized(
      <QuotaCardGrid
        overview
        connections={[connection]}
        accounts={{ [connection.id]: project(connection) }}
        quotaData={{ [connection.id]: data }}
        loading={{}}
        errors={{}}
        lastRefreshedAt={{}}
        emailsVisible={false}
        providerLabels={{ claude: "Claude" }}
        togglingActiveId={null}
        {...actions}
      />,
      locale
    );
    expect(screen.queryByTestId("detail-card")).toBeNull();
    fireEvent.click(units()[0]);
    for (const label of ["refresh", "cutoff", "credits", "park", "hide", "show"])
      fireEvent.click(screen.getByText(`${label} action`));
    expect(actions.onRefresh).toHaveBeenCalledWith(connection.id, "claude");
    expect(actions.onOpenCutoff).toHaveBeenCalledWith(connection);
    expect(actions.onOpenResetCredits).toHaveBeenCalledWith(connection.id, "claude");
    expect(actions.onToggleActive).toHaveBeenCalledWith(connection.id, false);
    const scope = { connectionId: connection.id, provider: "claude" };
    expect(actions.onHideQuota).toHaveBeenCalledWith(scope, { name: "weekly" });
    expect(actions.onShowQuota).toHaveBeenCalledWith(scope, { name: "weekly" });
  }
);
it.each(["en", "zh-CN"])(
  "distinguishes paused from unknown and shows degraded observations (%s)",
  (locale) => {
    const m = locale === "en" ? en : zh,
      paused = { ...connection, isActive: false },
      unknown = { ...connection, id: "unknown" };
    localized(
      <QuotaHealthOverview
        {...props([paused, unknown])}
        accounts={{ [paused.id]: project(paused), unknown: project(unknown, { quotas: [] }) }}
      />,
      locale
    );
    const unit = screen.getByRole("button", { name: new RegExp(m.common.paused) });
    expect(unit).toHaveAttribute("data-kind", "paused");
    expect(unit).toHaveStyle({ background: "var(--color-text-muted)" });
    expect(unit.querySelector("[data-fill]")).toBeNull();
    fireEvent.focus(unit);
    expect(screen.getByRole("tooltip")).toHaveTextContent(m.common.paused);
    fireEvent.click(unit);
    expect(screen.getByText("details")).toBeTruthy();
    const missing = screen.getByRole("button", { name: new RegExp(m.usage.noQuotaData) });
    expect(missing).toHaveAttribute("data-kind", "empty");
    expect(missing).toHaveClass("border-dashed");
  }
);
it("invalidates open details and preview when filters remove the account", () => {
  const view = localized(<QuotaHealthOverview {...props()} />);
  fireEvent.focus(units()[0]);
  fireEvent.click(units()[0]);
  view.rerender(wrapper(<QuotaHealthOverview {...props()} connections={[]} />));
  expect(screen.queryByText("details")).toBeNull();
  expect(screen.queryByRole("tooltip")).toBeNull();
  view.rerender(wrapper(<QuotaHealthOverview {...props()} />));
  expect(screen.queryByText("details")).toBeNull();
});
it.each(["en", "zh-CN"])("localizes exact recovery duration and window labels (%s)", (locale) => {
  const d = {
    ...data,
    quotas: [
      {
        name: "weekly",
        remainingPercentage: 0,
        resetAt: new Date(now + 133 * 60_000).toISOString(),
      },
    ],
  };
  localized(
    <QuotaHealthOverview {...props()} accounts={{ [connection.id]: project(connection, d) }} />,
    locale
  );
  fireEvent.mouseEnter(units()[0]);
  const tip = screen.getByRole("tooltip"),
    m = locale === "en" ? en : zh;
  expect(tip).toHaveTextContent(m.usage.healthQuotaExhausted);
  expect(tip).toHaveTextContent(m.usage.weekly);
  expect(tip).toHaveTextContent(locale === "en" ? "2 hours, 13 minutes" : "2小时13分钟");
  expect(tip).not.toHaveTextContent("2099-01-01T");
});
it("clamps the portal card inside a 390px viewport using measured geometry", () => {
  const width = window.innerWidth;
  Object.defineProperty(window, "innerWidth", { value: 390, configurable: true });
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
    this: HTMLElement
  ) {
    return {
      left: 380,
      bottom: 100,
      width: this.getAttribute("role") === "tooltip" ? 330 : 9,
      height: 120,
    } as DOMRect;
  });
  try {
    localized(<QuotaHealthOverview {...props()} />);
    fireEvent.focus(units()[0]);
    expect(screen.getByRole("tooltip")).toHaveStyle({ left: "52px" });
    expect(screen.getByRole("tooltip")).toHaveClass("fixed", "max-w-[calc(100vw-16px)]");
    expect(document.querySelector("section")).toHaveClass("min-w-0");
  } finally {
    Object.defineProperty(window, "innerWidth", { value: width, configurable: true });
  }
});
function LayoutHarness() {
  const { layoutMode, selectLayout } = useQuotaLayout();
  return <QuotaLayoutPicker value={layoutMode} onChange={selectLayout} />;
}
it("defaults to localized overview and persists explicit legacy layouts across remounts", () => {
  const view = localized(<LayoutHarness />, "zh-CN");
  expect(screen.getByRole("button", { name: "健康总览" })).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(screen.getByRole("button", { name: "完整" }));
  expect(localStorage.getItem("omniroute:limits:layoutMode")).toBe("full");
  view.unmount();
  const second = localized(<LayoutHarness />);
  expect(screen.getByRole("button", { name: "Full" })).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(screen.getByRole("button", { name: "Compact" }));
  second.unmount();
  localized(<LayoutHarness />);
  expect(screen.getByRole("button", { name: "Compact" })).toHaveAttribute("aria-pressed", "true");
});
it("still switches layouts when localStorage is unavailable", () => {
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw Error("blocked");
  });
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw Error("blocked");
  });
  localized(<LayoutHarness />);
  fireEvent.click(screen.getByRole("button", { name: "Compact" }));
  expect(screen.getByRole("button", { name: "Compact" })).toHaveAttribute("aria-pressed", "true");
});
it.each([
  { compact: false, locale: "en" },
  { compact: true, locale: "en" },
  { compact: false, locale: "zh-CN" },
  { compact: true, locale: "zh-CN" },
])(
  "full/compact follows saved provider order without handles ($locale, compact=$compact)",
  ({ compact, locale }) => {
    localStorage.setItem(
      "omniroute:limits:providerOrder",
      JSON.stringify(["minimax", "claude", "codex"])
    );
    const cs = ["claude", "codex", "minimax"].map((provider) => ({
      ...connection,
      provider,
      id: provider,
    }));
    localized(
      <QuotaCardGrid
        compact={compact}
        connections={cs}
        quotaData={{}}
        loading={{}}
        errors={{}}
        lastRefreshedAt={{}}
        emailsVisible={false}
        providerLabels={{}}
        togglingActiveId={null}
        onRefresh={() => {}}
        onOpenCutoff={() => {}}
        onToggleActive={() => {}}
      />,
      locale
    );
    expect(
      screen.getAllByTestId("detail-card").map((e) => e.getAttribute("data-provider-card"))
    ).toEqual(["minimax", "claude", "codex"]);
    expect(document.querySelector("[data-drag-handle]")).toBeNull();
  }
);
