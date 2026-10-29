// @vitest-environment jsdom
import React, { act, useSyncExternalStore } from "react";
import { createRoot } from "react-dom/client";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import en from "../../../src/i18n/messages/en.json";
import zh from "../../../src/i18n/messages/zh-CN.json";
import type {
  Detail,
  Team,
  Report,
} from "../../../src/app/(dashboard)/dashboard/costs/teams/helpers";
vi.unmock("next-intl");

const nav = vi.hoisted(() => ({
  query: "?team=a",
  listeners: new Set<() => void>(),
  push: vi.fn(),
  replace: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard/costs/teams",
  useRouter: () => ({ push: nav.push, replace: nav.replace }),
  useSearchParams: () => {
    const query = useSyncExternalStore(
      (listener) => {
        nav.listeners.add(listener);
        return () => nav.listeners.delete(listener);
      },
      () => nav.query
    );
    return new URLSearchParams(query);
  },
}));
import TeamCostsPage from "../../../src/app/(dashboard)/dashboard/costs/teams-page";
import Breadcrumbs from "../../../src/shared/components/Breadcrumbs";
import { reportRange, money } from "../../../src/app/(dashboard)/dashboard/costs/teams/helpers";

// The kit SearchableSelect scrolls the active option into view; jsdom has no scrollIntoView.
Element.prototype.scrollIntoView ??= () => {};

const team = (id: string, status: "active" | "archived" = "active"): Team => ({
  id,
  name: id === "a" ? "Alpha" : "Beta",
  description: "",
  status,
  maxBudgetUsd: 2,
  budgetDuration: "1d",
  budgetResetAt: "2026-10-01T00:00:00.000Z",
  createdAt: "",
  updatedAt: "",
  archivedAt: null,
});
const detail = (id: string): Detail => ({
  team: team(id),
  members: [
    { apiKeyId: "member", apiKeyName: "Member one", assignedAt: "2026-09-29T12:00:00.000Z" },
  ],
  budgetStatus: {
    teamId: id,
    teamName: team(id).name,
    enforcementMode: "soft_committed_usage",
    maxBudgetUsd: 2,
    budgetDuration: "1d",
    windowStartIso: "2026-09-30T00:00:00.000Z",
    resetAtIso: "2026-10-01T00:00:00.000Z",
    estimatedListCostUsd: 0.25,
    hasUnpricedUsage: false,
    exceeded: false,
    actualProviderCostUsd: null,
    subscriptionQuotaUsed: null,
    compressionSavingsUsd: null,
  },
});
const report: Report = {
  summary: {
    requests: 9,
    inputTokens: 4,
    outputTokens: 3,
    estimatedListCostUsd: 9,
    hasUnpricedUsage: false,
  },
  byApiKey: [
    {
      apiKeyId: "member",
      apiKeyName: "Member one",
      requests: 9,
      inputTokens: 4,
      outputTokens: 3,
      estimatedListCostUsd: 0.000004,
      hasUnpricedUsage: false,
    },
  ],
};
let teams: Team[];
let details: Record<string, Detail>;
let usage: Report;
let deferredA: Promise<Response> | null;
let mutationStatus: number;
let mutationWait: Promise<Response> | null;
let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;
const fetchMock = vi.fn();
const response = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
function navigate(url: string) {
  nav.query = url.includes("?") ? url.slice(url.indexOf("?")) : "";
  nav.listeners.forEach((listener) => listener());
}
async function flush() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}
async function render(locale = "en") {
  await act(async () => {
    root.render(
      <NextIntlClientProvider locale={locale} messages={locale === "en" ? en : zh}>
        <TeamCostsPage />
      </NextIntlClientProvider>
    );
  });
  await flush();
  await flush();
}
// The kit Dialog (Modal) portals its content to document.body, outside `container`.
function button(label: string) {
  const found = [...document.body.querySelectorAll("button")].find((item) => {
    const copy = item.cloneNode(true) as HTMLElement;
    copy.querySelectorAll('[aria-hidden="true"]').forEach((icon) => icon.remove());
    return copy.textContent?.trim() === label;
  });
  if (!found) throw new Error("Missing button " + label + ": " + container.textContent);
  return found;
}
async function click(label: string) {
  await act(async () => {
    button(label).click();
  });
  await flush();
}
// The kit SearchableSelect portals its listbox (role="option" rows) to document.body.
const options = () => document.body.querySelectorAll('[role="option"]');
const listbox = () => document.body.querySelector('[role="listbox"]');
async function choose(label: string) {
  const found = [...options()].find((item) => item.textContent?.trim() === label);
  if (!found) throw new Error("Missing option " + label + ": " + document.body.textContent);
  await act(async () => (found as HTMLElement).click());
  await flush();
}
function control(label: string) {
  const labelElement = [...document.body.querySelectorAll("label")].find(
    (item) => item.textContent?.replace("*", "").trim() === label
  );
  const found =
    document.body.querySelector(`[aria-label="${label}"]`) ||
    (labelElement?.htmlFor
      ? document.body.querySelector(`[id="${labelElement.htmlFor}"]`)
      : labelElement?.querySelector("input,textarea,select"));
  if (!found) throw new Error("Missing control " + label);
  return found as HTMLInputElement;
}
async function change(label: string, value: string) {
  await act(async () => {
    const element = control(label);
    const proto =
      element.tagName === "SELECT"
        ? HTMLSelectElement.prototype
        : element.tagName === "TEXTAREA"
          ? HTMLTextAreaElement.prototype
          : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, "value")!.set!.call(element, value);
    element.dispatchEvent(
      new Event(element.tagName === "SELECT" ? "change" : "input", { bubbles: true })
    );
  });
  await flush();
}
const writes = () => fetchMock.mock.calls.filter(([, init]) => init?.method);
beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  nav.query = "?team=a";
  nav.push.mockImplementation(navigate);
  nav.replace.mockImplementation(navigate);
  teams = [team("a"), team("b")];
  details = { a: detail("a"), b: detail("b") };
  usage = structuredClone(report);
  deferredA = null;
  mutationStatus = 200;
  mutationWait = null;
  fetchMock.mockReset();
  fetchMock.mockImplementation(async (url: string, init?: RequestInit) => {
    if (init?.method)
      return mutationWait ?? response({ team: details.a.team, success: true }, mutationStatus);
    if (url.startsWith("/api/teams?"))
      return response({
        teams,
        keyOptions: [{ id: "key", name: "Transfer key", teamId: "b", teamName: "Beta" }],
      });
    if (url.includes("/usage?")) return response({ report: usage });
    const id = url.split("/").pop()!;
    if (id === "a" && deferredA) return deferredA;
    return details[id] ? response(details[id]) : response({}, 404);
  });
  vi.stubGlobal("fetch", fetchMock);
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

describe("real team costs components", () => {
  it("top team dropdown replaces the secondary rail and keeps URL/data selection", async () => {
    await render();
    const selector = control(en.teamCosts.selectTeam);
    const content = container.querySelector("main")!;
    expect(container.querySelectorAll("button[aria-pressed]")).toHaveLength(0);
    expect(selector.className).not.toContain("lg:hidden");
    expect(
      selector.compareDocumentPosition(content) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    await act(async () => control(en.teamCosts.selectTeam).click());
    await choose("Beta");
    expect(nav.query).toBe("?team=b");
    expect(container.querySelector("main h2")?.textContent).toBe("Beta");
  });
  it("discloses partial retained coverage without inventing a remaining allowance", async () => {
    details.a.budgetStatus!.hasPartialRetainedUsage = true;
    await render();
    expect(container.textContent).toContain(en.teamCosts.partialBudget);
    expect(container.textContent).toContain(`${en.teamCosts.remaining}: —`);
    expect(details.a.budgetStatus!.exceeded).toBe(false);
  });
  it("localizes the actual team-cost breadcrumb", async () => {
    await act(async () =>
      root.render(
        <NextIntlClientProvider locale="zh-CN" messages={zh}>
          <Breadcrumbs />
        </NextIntlClientProvider>
      )
    );
    expect(container.querySelector('[aria-current="page"]')?.textContent).toBe(
      zh.teamCosts.selectTeam
    );
  });
  it("does not invite replaying a successful write after refresh fails", async () => {
    await render();
    await click("Edit team");
    const original = fetchMock.getMockImplementation()!;
    let committed = false;
    fetchMock.mockImplementation(async (url: string, init?: RequestInit) => {
      if (init?.method) {
        committed = true;
        return original(url, init);
      }
      if (committed) return response({}, 503);
      return original(url, init);
    });
    await click("Save");
    expect(writes()).toHaveLength(1);
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();
    expect(container.querySelector('[role="alert"]')).not.toBeNull();
  });
  it("ignores delayed A after B selection and follows browser URL changes", async () => {
    let resolve!: (value: Response) => void;
    deferredA = new Promise((done) => {
      resolve = done;
    });
    await render();
    expect(container.querySelector('[aria-label="Loading team costs…"]')).not.toBeNull();
    await act(async () => navigate("/dashboard/costs/teams?team=b"));
    await flush();
    expect(container.querySelector("main h2")?.textContent).toBe("Beta");
    await act(async () => resolve(response(detail("a"))));
    await flush();
    expect(container.querySelector("main h2")?.textContent).toBe("Beta");
    deferredA = null;
    await act(async () => navigate("/dashboard/costs/teams?team=a"));
    await flush();
    expect(container.querySelector("main h2")?.textContent).toBe("Alpha");
  });
  it("uses success-only budget independently of all-attempt reports and formats tiny costs", async () => {
    await render();
    expect(container.textContent).toContain("$0.25");
    expect(container.textContent).toContain("$9.00");
    expect(container.textContent).toContain("$0.000004");
    expect(container.querySelector('[role="progressbar"]')?.getAttribute("aria-valuenow")).toBe(
      "12.5"
    );
    expect(reportRange("7d", Date.parse("2026-09-30T16:00:00Z"))).toBe(
      "startDate=2026-09-24&endDate=2026-09-30"
    );
    expect(money(0.000001, "en")).not.toBe("$0.00");
  });
  it("renders unknown pricing at known zero as a warning and caps overbudget progress", async () => {
    details.a.budgetStatus!.hasUnpricedUsage = true;
    details.a.budgetStatus!.estimatedListCostUsd = 0;
    details.a.budgetStatus!.exceeded = true;
    usage.summary.hasUnpricedUsage = true;
    await render();
    expect(container.textContent).toContain(en.teamCosts.unpricedBudget);
    expect(container.textContent).toContain(en.teamCosts.unpricedReport);
    expect(container.textContent).toContain(`${en.teamCosts.remaining}: —`);
    expect(container.querySelector('[role="alert"]')?.textContent).toContain(
      en.teamCosts.unpricedBudget
    );
    expect(
      container.querySelector('[role="progressbar"]')?.getAttribute("aria-valuenow")
    ).toBeNull();
    expect(container.querySelector('[role="progressbar"]')?.getAttribute("aria-valuetext")).toBe(
      en.teamCosts.unpricedBudget
    );
    details.a.budgetStatus!.estimatedListCostUsd = 3;
    await click("Refresh");
    expect(container.querySelector('[role="alert"]')?.textContent).toContain(
      "Budget reached or exceeded · $1.00 over"
    );
    expect((container.querySelector('[role="progressbar"] > div') as HTMLElement).style.width).toBe(
      "100%"
    );
  });
  it("shows honest unlimited state", async () => {
    details.a.team.maxBudgetUsd = null;
    details.a.budgetStatus = null;
    await render();
    expect(container.textContent).toContain(en.teamCosts.unlimited);
    expect(container.querySelector('[role="progressbar"]')).toBeNull();
  });
  it("does not PUT until transfer confirmation and submits expected source", async () => {
    await render();
    await change("Choose an API key", "key");
    expect(writes()).toHaveLength(0);
    await click("Assign");
    expect(writes()).toHaveLength(0);
    expect(document.body.querySelector('[role="dialog"]')?.textContent).toContain(
      "from “Beta” to “Alpha”"
    );
    await click("Confirm");
    const put = writes().find(([, init]) => init.method === "PUT")!;
    expect(JSON.parse(put[1].body)).toEqual({ apiKeyId: "key", expectedTeamId: "b" });
    expect(fetchMock.mock.calls.some(([url]) => url.startsWith("/api/keys"))).toBe(false);
  });
  it("confirms removal and keeps failed confirmation open", async () => {
    await render();
    await click("Remove");
    expect(writes()).toHaveLength(0);
    mutationStatus = 403;
    await click("Confirm");
    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull();
    expect(document.body.textContent).toContain(en.teamCosts.forbidden);
    expect(writes()[0][0]).toBe("/api/teams/a/members?apiKeyId=member");
  });
  it("archived teams have no mutation controls", async () => {
    teams[0].status = "archived";
    details.a.team.status = "archived";
    details.a.budgetStatus = null;
    await render();
    expect(container.textContent).toContain(en.teamCosts.archivedBudget);
    for (const label of ["Assign", "Remove", "Edit team", "Archive"]) {
      expect(
        [...container.querySelectorAll("button")].some((item) => item.textContent?.trim() === label)
      ).toBe(false);
    }
    expect(container.querySelector('[aria-label="Choose an API key"]')).toBeNull();
  });
  it("preserves editable budget fields when backspaced, validates, and sends both null when disabled", async () => {
    await render();
    await click("Edit team");
    await change("Budget amount (USD)", "");
    expect(control("Rolling budget window").disabled).toBe(false);
    await click("Save");
    expect(writes()).toHaveLength(0);
    expect(document.body.textContent).toContain(en.teamCosts.invalidAmount);
    await act(async () => control("Enable shared soft budget").click());
    await click("Save");
    expect(JSON.parse(writes()[0][1].body)).toMatchObject({
      maxBudgetUsd: null,
      budgetDuration: null,
    });
    expect(
      fetchMock.mock.calls.filter(([url, init]) => url === "/api/teams/a" && !init?.method).length
    ).toBeGreaterThan(1);
  });
  it("creates with paired fields through form submit, preserves input on 403 and blocks pending dismissal", async () => {
    await render();
    await click("Create team");
    await change("Team name", "New team");
    await act(async () => control("Enable shared soft budget").click());
    await change("Budget amount (USD)", "0.5");
    let resolve!: (value: Response) => void;
    mutationWait = new Promise((done) => {
      resolve = done;
    });
    await act(async () =>
      document.body
        .querySelector("form")!
        .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }))
    );
    expect(button("Save").disabled).toBe(true);
    await act(async () =>
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }))
    );
    expect(document.body.querySelector("form")).not.toBeNull();
    expect(JSON.parse(writes()[0][1].body)).toMatchObject({
      maxBudgetUsd: 0.5,
      budgetDuration: "30d",
    });
    await act(async () => resolve(response({}, 403)));
    await flush();
    expect(control("Team name").value).toBe("New team");
    expect(document.body.textContent).toContain(en.teamCosts.forbidden);
    expect(button("Save").disabled).toBe(false);
  });
  it("uses real Chinese catalog and keeps refresh failures visible", async () => {
    await render("zh-CN");
    expect(container.textContent).toContain("当前软预算");
    expect(container.textContent).not.toContain("teamCosts.");
    fetchMock.mockResolvedValue(response({}, 403));
    await click("刷新");
    expect(container.textContent).toContain(zh.teamCosts.forbidden);
  });
  it("searches inside the dropdown without changing the current report until selection", async () => {
    nav.query = "?team=missing";
    await render();
    expect(nav.query).toBe("?team=a");
    expect(document.body.querySelector('[aria-label="Search teams"]')).toBeNull();
    await act(async () => control(en.teamCosts.selectTeam).click());
    const input = control("Search teams");
    expect(input.getAttribute("role")).toBe("combobox");
    // focus is restored on the next frame after the kit popover closes
    await vi.waitFor(() => expect(document.activeElement).toBe(input));
    await change("Search teams", "Beta");
    expect(options()).toHaveLength(1);
    expect(container.querySelector("main h2")?.textContent).toBe("Alpha");
    expect(nav.query).toBe("?team=a");
    await change("Search teams", "no result");
    expect(options()).toHaveLength(0);
    expect(container.querySelector("main h2")?.textContent).toBe("Alpha");
    expect(nav.query).toBe("?team=a");
    await change("Search teams", "Beta");
    await act(async () =>
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }))
    );
    await flush();
    expect(nav.query).toBe("?team=b");
    expect(container.querySelector("main h2")?.textContent).toBe("Beta");
    expect(listbox()).toBeNull();
    // focus is restored on the next frame after the kit popover closes
    await vi.waitFor(() => expect(document.activeElement).toBe(control(en.teamCosts.selectTeam)));
  });
  it("supports keyboard dismissal, resets search, and disables team selection while editing", async () => {
    await render();
    const trigger = control(en.teamCosts.selectTeam);
    await act(async () =>
      trigger.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }))
    );
    await change("Search teams", "Beta");
    await act(async () =>
      control("Search teams").dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true })
      )
    );
    expect(listbox()).toBeNull();
    expect(nav.query).toBe("?team=a");
    // focus is restored on the next frame after the kit popover closes
    await vi.waitFor(() => expect(document.activeElement).toBe(trigger));
    await act(async () => trigger.click());
    expect(control("Search teams").value).toBe("");
    expect(options()).toHaveLength(2);
    await act(async () => document.body.dispatchEvent(new Event("pointerdown", { bubbles: true })));
    expect(listbox()).toBeNull();
    await click("Edit team");
    expect(trigger.matches(":disabled")).toBe(true);
    await act(async () => trigger.click());
    expect(listbox()).toBeNull();
  });
  it("navigates options by keyboard, ignores IME confirmation and preserves selection on Tab", async () => {
    await render();
    await act(async () => control(en.teamCosts.selectTeam).click());
    const input = control("Search teams");
    await act(async () =>
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }))
    );
    const activeId = input.getAttribute("aria-activedescendant")!;
    expect(document.getElementById(activeId)?.textContent).toBe("Beta");
    await act(async () =>
      input.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", isComposing: true, bubbles: true })
      )
    );
    expect(nav.query).toBe("?team=a");
    await act(async () => control(en.teamCosts.statusFilter).focus());
    expect(listbox()).toBeNull();
    expect(nav.query).toBe("?team=a");
  });
  it("keeps status filtering independent from dropdown search", async () => {
    teams[1].status = "archived";
    details.b.team.status = "archived";
    await render();
    await change(en.teamCosts.statusFilter, "archived");
    expect(nav.query).toBe("?team=b");
    expect(container.querySelector("main h2")?.textContent).toBe("Beta");
    await change(en.teamCosts.statusFilter, "active");
    expect(nav.query).toBe("?team=a");
  });
});
