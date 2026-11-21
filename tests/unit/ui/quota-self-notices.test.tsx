/**
 * What blocks the key right now (schedules and model caps) and the account's per-model windows on
 * the self-service quota page. Every fixture goes through the real response schema.
 */
import React from "react";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import BlockNotices from "@/app/quota/[provider]/components/BlockNotices";
import PoolSection from "@/app/quota/[provider]/components/PoolSection";
import {
  selfQuotaResponseSchema,
  type SelfQuotaAccount,
  type SelfQuotaBlocks,
} from "@/shared/schemas/selfQuota";
import { account, accountDim, parsedPool, pool, quotaView, renderQuota } from "./quotaSelfHarness";

// The shared UI setup mocks next-intl without `useFormatter`; this page runs on the real one.
vi.mock("next-intl", async (importOriginal) => await importOriginal());

afterEach(() => cleanup());

type Schedule = SelfQuotaBlocks["schedules"][number];
type ModelCap = SelfQuotaBlocks["modelCaps"][number];

const NOTICE_TITLES = [
  "Paused by a schedule",
  "Outside the allowed hours",
  "Time-slot budget used up",
] as const;

function schedule(over: Partial<Schedule> = {}): Schedule {
  return {
    pool: "qpr_a",
    state: "closed",
    reason: "blackout",
    label: "freeze",
    retryAfterSeconds: 5400,
    reserves: [],
    budget: null,
    ...over,
  };
}

function modelCap(over: Partial<ModelCap> = {}): ModelCap {
  return {
    pool: "qpr_a",
    model: "claude-fable-5",
    unit: "requests",
    window: "hourly",
    cap: 50,
    consumed: 50,
    reached: true,
    ...over,
  };
}

function renderNotices(blocks: Partial<SelfQuotaBlocks>, pools = [pool()]) {
  const view = selfQuotaResponseSchema.parse(
    quotaView({ pools, blocks: { schedules: [], modelCaps: [], ...blocks } })
  );
  return renderQuota(<BlockNotices blocks={view.blocks} pools={view.pools} />);
}

function renderAccount(over: Partial<SelfQuotaAccount>) {
  return renderQuota(<PoolSection pool={parsedPool({ accounts: [account(over)] })} />);
}

const noText = (text: string | RegExp) => expect(screen.queryByText(text)).toBeNull();
const modelList = () => screen.getByRole("list", { name: "Per-model limits on this account" });

describe("block notices", () => {
  it("a blackout names the pool, the schedule and when it reopens", () => {
    renderNotices({ schedules: [schedule()] });
    expect(screen.getByText("Paused by a schedule")).toBeTruthy();
    expect(
      screen.getByText(
        "Pool A is in a blocked period right now. Requests with this key are refused until it ends."
      )
    ).toBeTruthy();
    expect(screen.getByText("Schedule: freeze")).toBeTruthy();
    expect(screen.getByText("It reopens in about 2 hours.")).toBeTruthy();
  });

  it("a schedule notice cannot be dismissed while the block holds", () => {
    renderNotices({ schedules: [schedule()] });
    expect(screen.getByText("Paused by a schedule")).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("outside the allowed hours has its own wording and no guess about reopening", () => {
    renderNotices({
      schedules: [schedule({ reason: "outside-window", retryAfterSeconds: null, label: null })],
    });
    expect(screen.getByText("Outside the allowed hours")).toBeTruthy();
    expect(
      screen.getByText(
        "Pool A only accepts requests during set hours, and this is not one of them."
      )
    ).toBeTruthy();
    noText(/Schedule:/);
    noText(/It reopens/);
  });

  it("a reopening time under an hour is worded in minutes", () => {
    renderNotices({ schedules: [schedule({ retryAfterSeconds: 1500 })] });
    expect(screen.getByText("It reopens in about 25 minutes.")).toBeTruthy();
  });

  it("a spent time-slot budget is a block; an unspent or unknown one is not", () => {
    const budget = (exhausted: boolean | null) => ({
      unit: "requests" as const,
      window: "daily" as const,
      exhausted,
    });
    renderNotices({ schedules: [schedule({ state: "open", reason: null, budget: budget(true) })] });
    expect(screen.getByText("Time-slot budget used up")).toBeTruthy();
    expect(
      screen.getByText(
        "The budget of the current time slot of Pool A is used up. Requests are refused until that budget resets."
      )
    ).toBeTruthy();
    cleanup();

    renderNotices({
      schedules: [
        schedule({ state: "open", reason: null, budget: budget(false) }),
        schedule({ state: "open", reason: null, budget: budget(null) }),
        schedule({
          state: "open",
          reason: null,
          budget: null,
          reserves: [{ window: "weekly", percent: 20 }],
        }),
      ],
    });
    for (const title of NOTICE_TITLES) noText(title);
  });

  it("a notice for a pool the key cannot see is dropped", () => {
    const { container } = renderNotices({
      schedules: [schedule({ pool: "qpr_other" })],
      modelCaps: [modelCap({ pool: "qpr_other" })],
    });
    expect(container.textContent).toBe("");
  });

  it("model caps list usage, and say when one is reached", () => {
    renderNotices({ modelCaps: [modelCap()] });
    expect(
      screen.getByRole("heading", { level: 2, name: "Limits on specific models for your key" })
    ).toBeTruthy();
    expect(screen.getByText("claude-fable-5: 50 of 50 requests this hour")).toBeTruthy();
    const reached = screen.getByText(
      "Limit reached. Requests to this model are refused until the hour rolls over."
    );
    expect(reached.className).toContain("text-warning");
    cleanup();

    renderNotices({ modelCaps: [modelCap({ consumed: null, reached: null })] });
    expect(
      screen.getByText(
        "claude-fable-5: up to 50 requests per hour (current usage is not available)"
      )
    ).toBeTruthy();
    noText(/Limit reached/);
  });

  it("caps from two pools on one model each name their pool; one pool names none", () => {
    const sentence = "claude-fable-5: 50 of 50 requests this hour";
    renderNotices({ modelCaps: [modelCap()] });
    noText("Pool: Pool A");
    cleanup();

    renderNotices({ modelCaps: [modelCap(), modelCap({ pool: "qpr_b" })] }, [
      pool(),
      pool({ ref: "qpr_b", name: "Pool B" }),
    ]);
    const rows = screen.getAllByRole("listitem");
    expect(rows).toHaveLength(2);
    expect(within(rows[0]).getByText(sentence)).toBeTruthy();
    expect(within(rows[0]).getByText("Pool: Pool A")).toBeTruthy();
    expect(within(rows[1]).getByText(sentence)).toBeTruthy();
    expect(within(rows[1]).getByText("Pool: Pool B")).toBeTruthy();
  });

  it("nothing to show renders nothing", () => {
    const { container } = renderNotices({});
    expect(container.textContent).toBe("");
  });
});

describe("per-model windows", () => {
  it("model windows are account-level bars and never talk about a share", () => {
    renderAccount({
      dimensions: [accountDim()],
      modelWindows: {
        status: "ok",
        windows: [{ label: "weekly fable (7d)", usedPercent: 100, resetAt: null }],
      },
    });
    const list = modelList();
    const bar = within(list).getByRole("progressbar", { name: "weekly fable (7d)" });
    expect(bar.getAttribute("aria-valuenow")).toBe("100");
    expect(bar.getAttribute("aria-valuetext")).toBe("100% used");
    expect(
      screen.getByText("These limits belong to the whole account, not to your share.")
    ).toBeTruthy();
    expect(within(list).queryByText(/Your share/)).toBeNull();
    expect(within(list).queryByText(/You have used your share/)).toBeNull();
  });

  it("a stale block draws muted bars with the out-of-date badge", () => {
    renderAccount({
      modelWindows: {
        status: "stale",
        windows: [{ label: "opus (5h)", usedPercent: 30, resetAt: "2026-05-27T18:00:00.000Z" }],
      },
    });
    const list = modelList();
    expect(within(list).getByRole("progressbar", { name: "opus (5h)" })).toBeTruthy();
    expect(within(list).getByText("May be out of date")).toBeTruthy();
    expect(within(list).getByText(/^Resets on /)).toBeTruthy();
  });

  it("a long list of model windows starts short", () => {
    const long = "x".repeat(120);
    const windows = Array.from({ length: 30 }, (_, index) => ({
      label: index === 0 ? long : `model ${index}`,
      usedPercent: index,
      resetAt: null,
    }));
    renderAccount({ modelWindows: { status: "ok", windows } });
    expect(within(modelList()).getAllByRole("progressbar")).toHaveLength(6);
    const toggle = screen.getByRole("button", { name: "Show all 30 limits" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(toggle);
    expect(within(modelList()).getAllByRole("progressbar")).toHaveLength(30);
    const fewer = screen.getByRole("button", { name: "Show fewer" });
    expect(fewer.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText(long).className).toContain("break-words");
  });

  it("unavailable model windows give the reason", () => {
    renderAccount({ modelWindows: { status: "unavailable", reason: "fetch_failed", windows: [] } });
    expect(screen.getByText("Per-model limits on this account")).toBeTruthy();
    expect(
      screen.getByText("Usage could not be fetched from the provider. It will be tried again.")
    ).toBeTruthy();
    cleanup();

    renderAccount({ dimensions: [accountDim()], modelWindows: { status: "ok", windows: [] } });
    noText("Per-model limits on this account");
  });

  it("an unavailable block that repeats the account reading's reason is not printed twice", () => {
    const reason = "fetch_failed";
    renderAccount({
      dimensions: [
        accountDim({ account: { used: null, status: "unavailable", reason, resetAt: null } }),
      ],
      modelWindows: { status: "unavailable", reason, windows: [] },
    });
    noText("Per-model limits on this account");
    expect(
      screen.getAllByText("Usage could not be fetched from the provider. It will be tried again.")
    ).toHaveLength(1);
  });
});
