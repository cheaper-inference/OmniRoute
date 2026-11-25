/**
 * The key's percent share and the member usage bars on the self-service quota page. Every
 * fixture goes through the real response schema, and the page runs on the real English catalog.
 */
import React from "react";
import axe from "axe-core";
import { cleanup, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import PoolSection from "@/app/quota/[provider]/components/PoolSection";
import type { SelfQuotaShare } from "@/shared/schemas/selfQuota";
import {
  account,
  accountDim,
  memberSlices,
  parsedPool,
  renderQuota,
  sharedDim,
} from "./quotaSelfHarness";

// The shared UI setup mocks next-intl without `useFormatter`; this page runs on the real one.
vi.mock("next-intl", async (importOriginal) => await importOriginal());

afterEach(() => cleanup());

const ESTIMATE =
  "This is an estimate. The account reports one figure. The part routed through this pool is split by the tokens each key sent.";
const MEMBERS_NOTE =
  "Other members are shown without names. Member numbers can change when a key joins or leaves the pool.";
const PERCENT_NOTE =
  "On this plan each figure is an estimate of what the member routed through the pool.";

function percentPool(share: SelfQuotaShare) {
  return parsedPool({
    dimensions: [],
    accounts: [account({ dimensions: [accountDim({ yourShare: share })] })],
  });
}

const shareBar = () => screen.queryByRole("progressbar", { name: "Your share" });
const segmentWidths = (bar: HTMLElement) =>
  [...bar.children].map((element) => (element as HTMLElement).style.width);

describe("percent share", () => {
  it("a percent share that was read says it is an estimate and names its two parts", () => {
    renderQuota(
      <PoolSection
        pool={percentPool({
          fairShare: 50,
          consumed: 35,
          remaining: 15,
          status: "ok",
          attributed: 10,
          external: 25,
        })}
      />
    );
    expect(
      screen.getByRole("progressbar", { name: "Your share" }).getAttribute("aria-valuenow")
    ).toBe("70");
    expect(screen.getByText(ESTIMATE)).toBeTruthy();
    expect(
      screen.getByText(
        "10% came from your requests. 25% is your part of usage made outside this pool."
      )
    ).toBeTruthy();
  });

  it("a share without its two parts shows the estimate line alone", () => {
    renderQuota(
      <PoolSection
        pool={percentPool({ fairShare: 50, consumed: 35, remaining: 15, status: "ok" })}
      />
    );
    expect(shareBar()).not.toBeNull();
    expect(screen.getByText(ESTIMATE)).toBeTruthy();
    expect(screen.queryByText(/came from your requests/)).toBeNull();
  });

  it("an unread percent share shows its reason and no estimate line", () => {
    renderQuota(
      <PoolSection
        pool={percentPool({
          fairShare: 50,
          consumed: null,
          remaining: null,
          status: "unavailable",
          reason: "percent_attribution_unavailable",
        })}
      />
    );
    expect(screen.getByText(/Your part of this window is not counted yet\./)).toBeTruthy();
    expect(screen.queryByText(/This is an estimate/)).toBeNull();
    expect(shareBar()).toBeNull();
  });

  it("the two new reasons each have their sentence and no bar", () => {
    const sentences: Array<[string, string]> = [
      [
        "percent_window_ended",
        "The window that was being counted has ended. Your part returns when the account reports the new window.",
      ],
      ["account_not_used_by_key", "Your key does not use this account."],
    ];
    for (const [reason, sentence] of sentences) {
      renderQuota(
        <PoolSection
          pool={percentPool({
            fairShare: 50,
            consumed: null,
            remaining: null,
            status: "unavailable",
            reason,
          })}
        />
      );
      expect(screen.getByText(sentence)).toBeTruthy();
      expect(screen.queryByText(/This is an estimate/)).toBeNull();
      expect(shareBar()).toBeNull();
      cleanup();
    }
  });

  it("a stale percent share keeps its numbers and the stale badge", () => {
    renderQuota(
      <PoolSection
        pool={percentPool({
          fairShare: 50,
          consumed: 20,
          remaining: 30,
          status: "stale",
          attributed: 5,
          external: 15,
        })}
      />
    );
    expect(
      screen.getByRole("progressbar", { name: "Your share" }).getAttribute("aria-valuenow")
    ).toBe("40");
    expect(screen.getByText("May be out of date")).toBeTruthy();
    expect(screen.getByText(ESTIMATE)).toBeTruthy();
    expect(
      screen.getByText(
        "5% came from your requests. 15% is your part of usage made outside this pool."
      )
    ).toBeTruthy();
  });

  it("a countable share never gets the estimate line", () => {
    renderQuota(<PoolSection pool={parsedPool({ dimensions: [sharedDim()] })} />);
    expect(shareBar()).not.toBeNull();
    expect(screen.queryByText(/This is an estimate/)).toBeNull();
  });
});

describe("member bars", () => {
  it("member bars put you first and say every value in words", () => {
    renderQuota(
      <PoolSection
        pool={parsedPool({
          dimensions: [
            sharedDim({ unit: "requests", limit: 1000, members: memberSlices([120, 300, 0]) }),
          ],
        })}
      />
    );
    const bar = screen.getByRole("progressbar", { name: "Usage split between 3 members" });
    expect(segmentWidths(bar)).toEqual(["12%", "30%", "0%"]);
    // The track is a named progress bar: the members' total against the window's limit.
    expect(bar.getAttribute("aria-valuemin")).toBe("0");
    expect(bar.getAttribute("aria-valuemax")).toBe("1000");
    expect(bar.getAttribute("aria-valuenow")).toBe("420");
    expect(bar.getAttribute("aria-valuetext")).toBe(
      "You: 120 requests, Member 2: 300 requests, Member 3: 0 requests"
    );
    const items = within(screen.getByRole("list", { name: "Usage by member" }))
      .getAllByRole("listitem")
      .map((li) => li.textContent);
    expect(items).toEqual(["You: 120 requests", "Member 2: 300 requests", "Member 3: 0 requests"]);
    expect(screen.getByText(MEMBERS_NOTE)).toBeTruthy();
    expect(screen.queryByText(PERCENT_NOTE)).toBeNull();
  });

  it("slices above the limit do not overflow the track", () => {
    renderQuota(
      <PoolSection
        pool={parsedPool({
          dimensions: [sharedDim({ limit: 1000, members: memberSlices([1200, 300, 0]) })],
        })}
      />
    );
    const bar = screen.getByRole("progressbar", { name: "Usage split between 3 members" });
    expect(segmentWidths(bar)).toEqual(["80%", "20%", "0%"]);
    expect(bar.getAttribute("aria-valuemax")).toBe("1500");
    expect(bar.getAttribute("aria-valuenow")).toBe("1500");
  });

  it("a percent window says the member figures are estimates", () => {
    renderQuota(
      <PoolSection
        pool={parsedPool({
          dimensions: [],
          accounts: [
            account({
              dimensions: [
                accountDim({
                  yourShare: { fairShare: 50, consumed: 10, remaining: 40, status: "ok" },
                  members: memberSlices([10, 20, 5, 0]),
                }),
              ],
            }),
          ],
        })}
      />
    );
    expect(screen.getByRole("progressbar", { name: "Usage split between 4 members" })).toBeTruthy();
    const items = within(screen.getByRole("list", { name: "Usage by member" }))
      .getAllByRole("listitem")
      .map((li) => li.textContent);
    expect(items).toEqual(["You: 10%", "Member 2: 20%", "Member 3: 5%", "Member 4: 0%"]);
    expect(screen.getByText(PERCENT_NOTE)).toBeTruthy();
    expect(screen.getByText(MEMBERS_NOTE)).toBeTruthy();
  });

  it("no slices, no member bar", () => {
    renderQuota(<PoolSection pool={parsedPool({ dimensions: [sharedDim()] })} />);
    expect(screen.queryByRole("progressbar", { name: /Usage split between/ })).toBeNull();
    expect(screen.queryByText("Usage by member")).toBeNull();
  });

  it("the member bar has no accessibility violations", async () => {
    const { container } = renderQuota(
      <PoolSection
        pool={parsedPool({
          dimensions: [sharedDim({ members: memberSlices([120, 300, 0]) })],
        })}
      />
    );
    const result = await axe.run(container);
    expect(result.violations.map((violation) => violation.id)).toEqual([]);
  });
});
