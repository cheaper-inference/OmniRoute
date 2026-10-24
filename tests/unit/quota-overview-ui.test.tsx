import { availability, blocker, decision, scope } from "./quota-availability-fixtures";
import React from "react";
import "@testing-library/jest-dom/vitest";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../src/i18n/messages/en.json";
import zh from "../../src/i18n/messages/zh-CN.json";
import QuotaHealthOverview from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaHealthOverview";
import { buildHealthAccount } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview";
vi.unmock("next-intl");
const now = Date.parse("2099-01-01T00:00:00Z");
const connections = ["codex", "claude", "antigravity"].map((provider, i) => ({
  id: `a${i}`,
  provider,
  email: `a${i}@example.test`,
  isActive: true,
}));
const accounts = Object.fromEntries(
  connections.map((c) => [
    c.id,
    buildHealthAccount(
      c,
      {
        quotas:
          c.provider === "antigravity"
            ? [
                { name: "gemini_session", quotaGroupId: "gemini", remainingPercentage: 72 },
                {
                  name: "claude_gpt_session",
                  quotaGroupId: "claude_gpt",
                  remainingPercentage: 0,
                  resetAt: "2099-01-01T01:00:00Z",
                },
              ]
            : [{ name: "weekly", remainingPercentage: 10 }],
      },
      {},
      now,
      {
        availability: availability(
          c.id,
          decision(),
          c.provider === "antigravity"
            ? [
                scope("gemini", ["gemini_session"]),
                scope(
                  "claude_gpt",
                  ["claude_gpt_session"],
                  decision(false, [
                    blocker("claude_gpt_session", "2099-01-01T01:00:00Z", "fiveHour"),
                  ])
                ),
              ]
            : []
        ),
        availabilityObservedAt: now,
      }
    ),
  ])
);
function mount(locale: string, cs = connections, projected = accounts) {
  const m = locale === "en" ? en : zh;
  return render(
    <NextIntlClientProvider
      locale={locale}
      messages={{ usage: m.usage, common: m.common }}
      timeZone="UTC"
      now={new Date(now)}
      onError={(e) => {
        throw e;
      }}
    >
      <QuotaHealthOverview
        connections={cs}
        accounts={projected}
        quotaData={{}}
        providerLabels={{ codex: "Codex", claude: "Claude", antigravity: "AGY" }}
        emailsVisible
        renderCard={(c) => <button>{c.id} detail action</button>}
      />
    </NextIntlClientProvider>
  );
}
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  localStorage.clear();
});
it.each(["en", "zh-CN"])(
  "renders approved capsules, unique count and isolated subpool tooltip (%s)",
  (locale) => {
    const m = locale === "en" ? en : zh;
    mount(locale);
    const handle = document.querySelector<HTMLButtonElement>("[data-drag-handle]")!;
    const instructions = document.getElementById(handle.getAttribute("aria-describedby")!);
    expect(instructions).toHaveTextContent(
      `${m.usage.healthDrag}: ␣ → ↑ ↓ → ␣; ${m.usage.cancel} (⎋)`
    );
    const units = document.querySelectorAll<HTMLButtonElement>("[data-availability]");
    expect(units).toHaveLength(4);
    expect(units[0]).toHaveClass("w-[9px]", "h-[32px]", "rounded-full", "overflow-hidden");
    expect(document.querySelectorAll("[data-subpool]")).toHaveLength(2);
    const gemini = document.querySelector<HTMLButtonElement>(
      '[data-subpool="gemini"] [data-availability]'
    )!;
    expect(gemini.querySelector("[data-fill]")).toHaveStyle({ height: "72%" });
    const claude = document.querySelector<HTMLButtonElement>(
      '[data-subpool="claude_gpt"] [data-availability]'
    )!;
    expect(claude).toHaveAttribute("data-kind", "cd5");
    expect(claude.style.getPropertyValue("--capsule-color")).toBe("var(--color-warning)");
    expect(handle).toHaveClass("ci-button");
    expect(handle.querySelector('[data-icon="drag_indicator"]')).not.toBeNull();
    expect(claude.querySelector("[data-partial]")).toBeNull();
    fireEvent.mouseEnter(claude);
    const tip = screen.getByRole("tooltip");
    expect(tip).toHaveTextContent("a2@example.test");
    expect(tip.querySelectorAll('[role="progressbar"]')).toHaveLength(1);
    expect(tip.querySelector("[data-other-pool]")).toHaveTextContent("72%");
    expect(tip.parentElement).toBe(document.body);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).toBeNull();
    fireEvent.click(claude);
    expect(screen.getByText("a2 detail action")).toBeTruthy();
    expect(document.querySelector("[data-banner]")).toHaveTextContent("3");
    expect(document.querySelector("[data-legend]")).toBeTruthy();
    const text = Array.from(document.querySelectorAll("*"))
      .flatMap((el) =>
        Array.from(el.childNodes)
          .filter((n) => n.nodeType === Node.TEXT_NODE)
          .map((n) => n.textContent)
      )
      .join(" ");
    expect(text.replace(/\S+@example\.test/g, "synthetic-account")).not.toMatch(
      /\b[a-z]+\.[a-zA-Z]+\b/
    );
    expect(
      document.querySelector('[data-provider="antigravity"] [data-group-counts]')
    ).toHaveTextContent(m.usage.healthRestricted);
  }
);
function geometry() {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
    this: HTMLElement
  ) {
    const row = this.closest("[data-provider]");
    const rows = Array.from(document.querySelectorAll("[data-provider]"));
    const top = Math.max(0, rows.indexOf(row!)) * 120;
    return {
      x: 0,
      y: top,
      left: 0,
      top,
      right: 350,
      bottom: top + 100,
      width: 350,
      height: 100,
      toJSON: () => ({}),
    } as DOMRect;
  });
  HTMLElement.prototype.scrollIntoView = vi.fn();
}
async function drag() {
  const handle = document.querySelector<HTMLButtonElement>("[data-drag-handle]")!;
  handle.focus();
  fireEvent.keyDown(handle, { key: " ", code: "Space" });
  await waitFor(() => expect(handle).toHaveAttribute("aria-pressed", "true"));
  fireEvent.keyDown(document, { key: "ArrowDown", code: "ArrowDown" });
  await new Promise((resolve) => setTimeout(resolve, 30));
  fireEvent.keyDown(document, { key: " ", code: "Space" });
  await waitFor(() => expect(handle).not.toHaveAttribute("aria-pressed", "true"));
}
it.each(["en", "zh-CN"])(
  "keyboard moves whole provider including subpools, persists and resets (%s)",
  async (locale) => {
    geometry();
    const view = mount(locale);
    const rows = () =>
      Array.from(document.querySelectorAll("[data-provider]")).map((e) =>
        e.getAttribute("data-provider")
      );
    const before = rows();
    await drag();
    expect(rows()).not.toEqual(before);
    expect(JSON.parse(localStorage.getItem("omniroute:limits:providerOrder")!)).toEqual(rows());
    expect(
      document.querySelector('[data-provider="antigravity"]')?.querySelectorAll("[data-subpool]")
    ).toHaveLength(2);
    const after = rows();
    view.unmount();
    mount(locale);
    expect(rows()).toEqual(after);
    const reset = screen.getByRole("button", {
      name: locale === "en" ? en.usage.healthResetOrder : zh.usage.healthResetOrder,
    });
    expect(reset.querySelector('[data-icon="restart_alt"]')).not.toBeNull();
    fireEvent.click(reset);
    expect(rows()).toEqual(before);
    expect(localStorage.getItem("omniroute:limits:providerOrder")).toBeNull();
  }
);
it("storage disabled still allows keyboard sorting", async () => {
  geometry();
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw Error("blocked");
  });
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw Error("blocked");
  });
  mount("en");
  await drag();
  expect(document.querySelector("[data-provider]")).toHaveAttribute("data-provider", "codex");
});
it.each(["en", "zh-CN"])(
  "sorts AGY pools independently and counts unique accounts (%s)",
  (locale) => {
    const cs = ["a", "b"].map((id) => ({ ...connections[2], id, email: `${id}@example.test` }));
    const projected = Object.fromEntries(
      cs.map((c, i) => [
        c.id,
        buildHealthAccount(
          c,
          {
            quotas: [
              {
                name: "gemini_session",
                quotaGroupId: "gemini",
                remainingPercentage: i ? 0 : 80,
                resetAt: "2099-01-01T01:00:00Z",
              },
              {
                name: "claude_gpt_weekly",
                quotaGroupId: "claude_gpt",
                remainingPercentage: i ? 80 : 0,
                resetAt: "2099-01-03T00:00:00Z",
              },
            ],
          },
          {},
          now,
          {
            availability: availability(c.id, decision(), [
              scope(
                "gemini",
                ["gemini_session"],
                i
                  ? decision(false, [blocker("gemini_session", "2099-01-01T01:00:00Z", "fiveHour")])
                  : decision()
              ),
              scope(
                "claude_gpt",
                ["claude_gpt_weekly"],
                i
                  ? decision()
                  : decision(false, [blocker("claude_gpt_weekly", "2099-01-03T00:00:00Z")])
              ),
            ]),
            availabilityObservedAt: now,
          }
        ),
      ])
    );
    mount(locale, cs, projected);
    const ids = (pool: string) =>
      Array.from(document.querySelectorAll(`[data-subpool="${pool}"] [data-account]`)).map((el) =>
        el.getAttribute("data-account")
      );
    expect(ids("gemini")).toEqual(["a", "b"]);
    expect(ids("claude_gpt")).toEqual(["b", "a"]);
    expect(screen.getByRole("heading", { level: 3 }).parentElement).toHaveTextContent(
      locale === "en" ? "2 accounts" : "2 个账户"
    );
    expect(document.querySelector("[data-banner]")).toHaveTextContent(
      locale === "en" ? "All 2 accounts available" : "全部 2 个号可用"
    );
  }
);
it.each(["en", "zh-CN"])(
  "green capsules precede partial and cooldowns; banner and hover explain the wait (%s)",
  (locale) => {
    const cs = ["weekly", "session", "high", "low", "partial"].map((id) => ({
      ...connections[1],
      id,
      email: `${id}@example.test`,
    }));
    const projected = Object.fromEntries(
      cs.map((c) => [
        c.id,
        buildHealthAccount(
          c,
          {
            quotas: [
              {
                name: c.id === "weekly" ? "weekly" : "session",
                remainingPercentage: ["weekly", "session"].includes(c.id)
                  ? 0
                  : c.id === "low"
                    ? 10
                    : 80,
                resetAt: c.id === "weekly" ? "2099-01-03T00:00:00Z" : "2099-01-01T01:00:00Z",
              },
            ],
          },
          {},
          now,
          {
            availability: availability(
              c.id,
              ["weekly", "session"].includes(c.id)
                ? decision(false, [
                    blocker(
                      c.id,
                      c.id === "weekly" ? "2099-01-03T00:00:00Z" : "2099-01-01T01:00:00Z",
                      c.id === "weekly" ? "overall" : "fiveHour"
                    ),
                  ])
                : decision()
            ),
            availabilityObservedAt: now,
            observedAt: "2099-01-01T00:00:00Z",
            cooldown: {
              id: c.id,
              status: "healthy",
              lockouts:
                c.id === "partial"
                  ? [{ model: "claude-sonnet", remainingMs: 60000, reason: "429" }]
                  : [],
            },
          }
        ),
      ])
    );
    mount(locale, cs, projected);
    expect(
      Array.from(document.querySelectorAll("[data-account]")).map((el) =>
        el.getAttribute("data-account")
      )
    ).toEqual(["high", "low", "partial", "session", "weekly"]);
    const partial = document.querySelector('[data-account="partial"]')!;
    expect(partial.querySelector("[data-partial]")).toHaveClass("h-[6px]");
    const cooling = document.querySelector('[data-account="session"]')!;
    expect(cooling.querySelector("[data-fill]")).toHaveStyle({ height: "80%" });
    expect(document.querySelector("[data-banner]")).toHaveTextContent(
      locale === "en" ? "2 accounts temporarily unavailable" : "2 个号暂时不能用"
    );
    fireEvent.focus(cooling);
    expect(screen.getByRole("tooltip")).toHaveTextContent(
      locale === "en" ? "Waited 80%" : "已等 80%"
    );
  }
);
it.each(["en", "zh-CN"])(
  "drag live region announces provider and destination (%s)",
  async (locale) => {
    geometry();
    mount(locale);
    const row = document.querySelector<HTMLElement>("[data-provider]")!;
    const label = row.querySelector("h3")!.textContent!;
    const handle = row.querySelector<HTMLButtonElement>("[data-drag-handle]")!;
    const expected = (position: number) =>
      locale === "en" ? `${label}, position ${position} of 3` : `${label}, 第 ${position} / 3 位`;
    handle.focus();
    fireEvent.keyDown(handle, { key: " ", code: "Space" });
    await waitFor(() =>
      expect(document.querySelector('[role="status"]')).toHaveTextContent(expected(1))
    );
    fireEvent.keyDown(document, { key: "ArrowDown", code: "ArrowDown" });
    await waitFor(() =>
      expect(document.querySelector('[role="status"]')).toHaveTextContent(expected(2))
    );
    fireEvent.keyDown(document, { key: " ", code: "Space" });
    await waitFor(() => expect(handle).not.toHaveAttribute("aria-pressed", "true"));
    expect(document.querySelector('[role="status"]')).toHaveTextContent(expected(2));
  }
);
it("Escape cancels a keyboard drag without persisting", async () => {
  geometry();
  mount("en");
  const before = Array.from(document.querySelectorAll("[data-provider]")).map((el) =>
    el.getAttribute("data-provider")
  );
  const handle = document.querySelector<HTMLButtonElement>("[data-drag-handle]")!;
  handle.focus();
  fireEvent.keyDown(handle, { key: " ", code: "Space" });
  await waitFor(() => expect(handle).toHaveAttribute("aria-pressed", "true"));
  fireEvent.keyDown(document, { key: "ArrowDown", code: "ArrowDown" });
  fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
  await waitFor(() => expect(document.querySelector('[data-dragging="true"]')).toBeNull());
  expect(
    Array.from(document.querySelectorAll("[data-provider]")).map((el) =>
      el.getAttribute("data-provider")
    )
  ).toEqual(before);
  expect(localStorage.getItem("omniroute:limits:providerOrder")).toBeNull();
});
