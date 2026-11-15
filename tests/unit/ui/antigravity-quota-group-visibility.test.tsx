import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));
import QuotaCard from "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCard";
import { useQuotaVisibility } from "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/useQuotaVisibility";
import type { QuotaVisibilityMap } from "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils";

const groups = [
  {
    id: "gemini",
    displayName: "Gemini Models",
    windows: { session: { remainingPercentage: 90 } },
    models: ["gemini-test"],
  },
  {
    id: "claude_gpt",
    displayName: "Claude & GPT Models",
    windows: { session: { remainingPercentage: 40 }, weekly: { remainingPercentage: 75 } },
    models: ["claude-test"],
  },
  {
    id: "argon",
    displayName: "Gemini 4 Argon",
    windows: { weekly: { remainingPercentage: 80 } },
    models: [],
  },
];
const quota = {
  quotas: [
    { name: "gemini_session", remainingPercentage: 90 },
    { name: "claude_gpt_session", remainingPercentage: 40 },
  ],
  raw: { quotaGroups: groups },
};
const tr = (_key: string, fallback: string) => fallback;
const notify = { error: vi.fn() };
let saved: QuotaVisibilityMap;
let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

function Harness() {
  const visibility = useQuotaVisibility(tr, notify);
  return (
    <>
      {["account-a", "account-b"].map((id) => (
        <div key={id} data-account={id}>
          <QuotaCard
            connection={{ id, provider: "antigravity", name: id, isActive: true }}
            quota={quota}
            loading={false}
            error={null}
            emailsVisible={true}
            providerLabel="Antigravity"
            onRefresh={() => {}}
            onOpenCutoff={() => {}}
            onToggleActive={() => {}}
            togglingActive={false}
            quotaVisibility={visibility.quotaVisibility}
            onHideQuota={(row) =>
              visibility.handleHideQuota({ connectionId: id, provider: "antigravity" }, row)
            }
            onShowQuota={(row) =>
              visibility.handleShowQuota({ connectionId: id, provider: "antigravity" }, row)
            }
          />
        </div>
      ))}
    </>
  );
}
function card(id = "account-a") {
  return container.querySelector(`[data-account="${id}"]`)!;
}
function headings(id = "account-a") {
  return [...card(id).querySelectorAll("h4")].map((h) => h.textContent);
}

beforeEach(() => {
  saved = {};
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_input, init) => {
      if (init?.method === "PATCH") saved = JSON.parse(init.body).quotaVisibility;
      return new Response(JSON.stringify({ quotaVisibility: saved }), { status: 200 });
    })
  );
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

it("hides a complete group per account, persists it through remount, and restores it", async () => {
  const original = JSON.stringify(quota);
  await act(async () => {
    root.render(<Harness />);
  });
  expect(headings()).toHaveLength(3);
  const hide = card().querySelector<HTMLButtonElement>(
    'button[aria-label="Hide this quota row: Claude & GPT Models"]'
  );
  expect(hide).not.toBeNull();
  await act(async () => {
    hide!.click();
  });
  expect(headings()).toEqual(["Gemini Models", "Gemini 4 Argon"]);
  expect(headings("account-b")).toHaveLength(3);
  expect(saved["account-a"].hidden).toContain("quota-group:claude_gpt");
  expect(JSON.stringify(quota)).toBe(original);
  await act(async () => {
    root.unmount();
  });
  root = createRoot(container);
  await act(async () => {
    root.render(<Harness />);
  });
  expect(headings()).not.toContain("Claude & GPT Models");
  const restore = [...card().querySelectorAll<HTMLButtonElement>("button")].find(
    (b) => b.textContent === "Claude & GPT Models"
  );
  expect(restore).toBeDefined();
  await act(async () => {
    restore!.click();
  });
  expect(headings()).toHaveLength(3);
  expect(saved["account-a"].hidden).not.toContain("quota-group:claude_gpt");
});

it("hiding every group does not expose the fallback quota rows", async () => {
  saved = { "account-a": { hidden: groups.map((g) => `quota-group:${g.id}`) } };
  await act(async () => {
    root.render(<Harness />);
  });
  expect(headings()).toEqual([]);
  expect(headings("account-b")).toHaveLength(3);
  expect(card().querySelectorAll('button[aria-label^="Hide this quota row"]')).toHaveLength(0);
  for (const group of groups)
    expect(
      [...card().querySelectorAll("button")].some((b) => b.textContent === group.displayName)
    ).toBe(true);
});
