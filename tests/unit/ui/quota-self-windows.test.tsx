/**
 * The body of one pool on the self-service quota page: pool facts, shared window cards, account
 * rows, and how each reading state is drawn. Every fixture goes through the real response schema.
 */
import React from "react";
import axe from "axe-core";
import { cleanup, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import PoolSection from "@/app/quota/[provider]/components/PoolSection";
import type { SelfQuotaPool } from "@/shared/schemas/selfQuota";
import { account, accountDim, parsedPool, renderQuota, sharedDim } from "./quotaSelfHarness";

// The shared UI setup mocks next-intl without `useFormatter`; this page runs on the real one.
vi.mock("next-intl", async (importOriginal) => await importOriginal());

afterEach(() => cleanup());

function renderPool(over: Partial<SelfQuotaPool> = {}) {
  return renderQuota(<PoolSection pool={parsedPool(over)} />);
}

const bar = (name: string) => screen.getByRole("progressbar", { name });
const noBar = (name: string) => expect(screen.queryByRole("progressbar", { name })).toBeNull();

const SHARE_OVER = {
  hard: "You have used your share. While the account is busy, new requests are blocked until this window resets.",
  soft: "You have used your share. Your requests still go through, with lower priority.",
  burst: "You have used your share. Your requests still go through while the account has room.",
} as const;

const REASONS: Array<[string, string]> = [
  ["store_unavailable", "Usage could not be read just now. Try again in a moment."],
  [
    "percent_attribution_unavailable",
    "Your part of this window is not counted yet. Counting starts when a request goes through this pool and the account reports its usage.",
  ],
  ["window_not_reported", "The provider does not report this window."],
  ["connection_lookup_failed", "This account could not be looked up."],
  ["not_supported", "The provider does not report usage for this kind of account."],
  ["fetch_failed", "Usage could not be fetched from the provider. It will be tried again."],
  ["not_available", "No reading is available for this account yet."],
  ["brand_new", "This reading is not available."],
];

describe("self-service quota windows", () => {
  it("a countable window shows the pool bar and the key's share", () => {
    renderPool({
      dimensions: [
        sharedDim({
          unit: "tokens",
          window: "daily",
          limit: 2000,
          total: { used: 400, status: "ok" },
          yourShare: { fairShare: 500, consumed: 120, remaining: 380, status: "ok" },
        }),
      ],
    });
    const poolBar = bar("Pool (everyone)");
    expect(poolBar.getAttribute("aria-valuenow")).toBe("20");
    expect(poolBar.getAttribute("aria-valuetext")).toBe("400 of 2,000 tokens");
    const shareBar = bar("Your share");
    expect(shareBar.getAttribute("aria-valuenow")).toBe("24");
    expect(shareBar.getAttribute("aria-valuetext")).toBe("120 of 500 tokens");
    expect(screen.getByText("Daily window")).toBeTruthy();
    expect(screen.getByText("380 tokens left")).toBeTruthy();
  });

  it("a key that may not see the account gets one bar and one sentence", () => {
    renderPool({
      accountVisible: false,
      dimensions: [sharedDim({ total: undefined })],
    });
    expect(screen.getAllByRole("progressbar")).toHaveLength(1);
    expect(screen.getAllByText("Account-level usage is not shared with this key.")).toHaveLength(1);
  });

  it("going past the share is worded by policy", () => {
    for (const policy of ["hard", "soft", "burst"] as const) {
      renderPool({
        policy,
        dimensions: [
          sharedDim({ yourShare: { fairShare: 500, consumed: 600, remaining: 0, status: "ok" } }),
        ],
      });
      expect(screen.getByText(SHARE_OVER[policy])).toBeTruthy();
      expect(screen.getAllByText(/^You have used your share/)).toHaveLength(1);
      cleanup();
    }
  });

  it("a key with no reserved share is not told it ran out", () => {
    renderPool({
      dimensions: [
        sharedDim({ yourShare: { fairShare: 0, consumed: 0, remaining: 0, status: "ok" } }),
      ],
    });
    expect(
      screen.getByText(
        "Your key has no reserved share in this pool. It can use what others leave free."
      )
    ).toBeTruthy();
    expect(screen.queryByText(/You have used your share/)).toBeNull();
    noBar("Your share");
  });

  it("an unreadable share is shown as unavailable, never as zero", () => {
    renderPool({
      dimensions: [
        sharedDim({
          total: undefined,
          yourShare: {
            fairShare: 500,
            consumed: null,
            remaining: null,
            status: "unavailable",
            reason: "store_unavailable",
          },
        }),
      ],
    });
    expect(screen.getByText("Not available")).toBeTruthy();
    expect(
      screen.getByText("Usage could not be read just now. Try again in a moment.")
    ).toBeTruthy();
    noBar("Your share");
    expect(document.body.textContent).not.toContain("0 of");
  });

  it("an account percent window shows the account bar and why the share is missing", () => {
    renderPool({
      accounts: [
        account({
          dimensions: [
            accountDim({
              window: "5h",
              limit: 100,
              account: { used: 40, status: "ok", resetAt: "2026-05-27T18:00:00.000Z" },
            }),
          ],
        }),
      ],
    });
    const accountBar = bar("Account (everyone)");
    expect(accountBar.getAttribute("aria-valuenow")).toBe("40");
    expect(accountBar.getAttribute("aria-valuetext")).toBe("40% used");
    expect(screen.getByText("5-hour window")).toBeTruthy();
    expect(screen.getByText(/^Resets on /)).toBeTruthy();
    expect(screen.getByText(REASONS[1][1])).toBeTruthy();
    noBar("Your share");
  });

  it("a stale account reading is drawn as stale", () => {
    renderPool({
      accounts: [account({ dimensions: [accountDim({ account: { used: 40, status: "stale" } })] })],
    });
    const fill = bar("Account (everyone)").firstElementChild;
    expect(fill?.className).toContain("bg-border-strong");
    expect(screen.getByText("May be out of date")).toBeTruthy();
    expect(
      screen.getByText("This reading is older than usual. A newer one has not arrived yet.")
    ).toBeTruthy();
  });

  it("a stale reading of the key's own part is drawn as stale", () => {
    renderPool({
      dimensions: [
        sharedDim({
          total: undefined,
          yourShare: { fairShare: 500, consumed: 120, remaining: 380, status: "stale" },
        }),
      ],
    });
    expect(bar("Your share").firstElementChild?.className).toContain("bg-border-strong");
    expect(screen.getByText("May be out of date")).toBeTruthy();
    expect(screen.getByText("380 requests left")).toBeTruthy();
  });

  it("a dollar window is written as currency by the page's formatter", () => {
    renderPool({
      dimensions: [
        sharedDim({
          unit: "usd",
          limit: 100,
          total: { used: 12.5, status: "ok" },
          yourShare: { fairShare: 50, consumed: 10, remaining: 40, status: "ok" },
        }),
      ],
    });
    expect(bar("Pool (everyone)").getAttribute("aria-valuetext")).toBe("$12.50 of $100.00");
    expect(bar("Your share").getAttribute("aria-valuetext")).toBe("$10.00 of $50.00");
    expect(screen.getByText("$40.00 left")).toBeTruthy();
  });

  it("every documented reason has its own sentence", () => {
    for (const [reason, sentence] of REASONS) {
      renderPool({
        accounts: [
          account({
            dimensions: [accountDim({ account: { used: null, status: "unavailable", reason } })],
          }),
        ],
      });
      expect(screen.getAllByText(sentence).length).toBeGreaterThan(0);
      noBar("Account (everyone)");
      cleanup();
    }
  });

  it("the share bar appears as soon as the API reports it", () => {
    renderPool({
      accounts: [
        account({
          dimensions: [
            accountDim({ yourShare: { fairShare: 50, consumed: 20, remaining: 30, status: "ok" } }),
          ],
        }),
      ],
    });
    expect(bar("Your share").getAttribute("aria-valuenow")).toBe("40");
  });

  it("several accounts are listed in order under the API's labels", () => {
    renderPool({
      accounts: [
        account({ dimensions: [accountDim()] }),
        account({ slot: 2, label: "Account 2", dimensions: [accountDim()] }),
      ],
    });
    const names = screen
      .getAllByRole("heading")
      .map((heading) => heading.textContent)
      .filter((text) => text?.startsWith("Account "));
    expect(names).toEqual(["Account 1", "Account 2"]);
    cleanup();

    renderPool({ accounts: [account({ dimensions: [accountDim()] })] });
    expect(screen.queryByRole("heading", { name: "Account 1" })).toBeNull();
  });

  it("an account outside the key's reach says why it shows no account reading", () => {
    renderPool({
      accounts: [
        account({ dimensions: [accountDim()] }),
        account({
          slot: 2,
          label: "Account 2",
          dimensions: [accountDim({ account: undefined })],
        }),
      ],
    });
    const sentence = "Account-level usage is not shared with this key.";
    expect(screen.getAllByText(sentence)).toHaveLength(1);
    const second = screen.getByRole("heading", { name: "Account 2" }).closest("section");
    expect(second && within(second).getByText(sentence)).toBeTruthy();
    expect(
      screen.getByText("Account readings come from the provider and can be a few minutes behind.")
    ).toBeTruthy();
  });

  it("the lag note only appears when some account reading is drawn with a number", () => {
    renderPool({ accounts: [account({ dimensions: [accountDim({ account: undefined })] })] });
    expect(screen.queryByText(/can be a few minutes behind/)).toBeNull();
    cleanup();

    renderPool({
      accounts: [
        account({
          dimensions: [
            accountDim({ account: { used: null, status: "unavailable", reason: "fetch_failed" } }),
          ],
        }),
      ],
    });
    expect(screen.queryByText(/can be a few minutes behind/)).toBeNull();
  });

  it("a reading without a usable scale is not available, never zero", () => {
    renderPool({
      dimensions: [
        sharedDim({ unit: "tokens", limit: 0, total: { used: 400, status: "ok" } }),
        sharedDim({ unit: "requests", limit: 100, total: { used: -20, status: "ok" } }),
      ],
    });
    noBar("Pool (everyone)");
    expect(screen.getAllByText("Not available")).toHaveLength(2);
    expect(screen.getAllByText("This reading is not available.")).toHaveLength(2);
    const text = document.body.textContent ?? "";
    expect(text).not.toContain("of 0");
    expect(text).not.toContain("-20");
    expect(text).not.toMatch(/(^|\D)0%/);
  });

  it("an over-limit reading shows its real numbers with a full bar", () => {
    renderPool({
      dimensions: [
        sharedDim({ unit: "requests", limit: 1000, total: { used: 1200, status: "ok" } }),
      ],
    });
    const poolBar = bar("Pool (everyone)");
    expect(poolBar.getAttribute("aria-valuenow")).toBe("100");
    expect(poolBar.getAttribute("aria-valuetext")).toBe("1,200 of 1,000 requests");
    expect(screen.getByText("120%")).toBeTruthy();
  });

  it("an account with nothing to show gets no row", () => {
    renderPool({
      dimensions: [sharedDim()],
      accounts: [account({ dimensions: [accountDim()] }), account({ slot: 2, label: "Account 2" })],
    });
    expect(screen.getByRole("heading", { name: "Account 1" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Account 2" })).toBeNull();
  });

  it("pool facts are stated in words", () => {
    renderPool({ weight: 33.333, policy: "soft", cap: { unit: "requests", value: 200 } });
    expect(screen.getByText("Your share: 33.3% of this pool")).toBeTruthy();
    expect(
      screen.getByText("Past your share, requests still go through with lower priority.")
    ).toBeTruthy();
    expect(
      screen.getByText("A fixed ceiling also applies to your key: 200 requests per window.")
    ).toBeTruthy();
  });

  it("a pool without windows says so", () => {
    renderPool({ dimensions: [], accounts: [account()] });
    expect(screen.getByText("This pool has no usage windows set up yet.")).toBeTruthy();
  });

  it("every bar is a named progressbar with a range", async () => {
    const { container } = renderPool({
      dimensions: [sharedDim()],
      accounts: [
        account({ dimensions: [accountDim()] }),
        account({
          slot: 2,
          label: "Account 2",
          dimensions: [accountDim({ account: { used: 90, status: "stale" } })],
        }),
      ],
    });
    const bars = screen.getAllByRole("progressbar");
    expect(bars.length).toBeGreaterThan(2);
    for (const element of bars) {
      expect(element.getAttribute("aria-label")).toBeTruthy();
      expect(element.getAttribute("aria-valuemin")).toBe("0");
      expect(element.getAttribute("aria-valuemax")).toBe("100");
      expect(element.getAttribute("aria-valuenow")).toBeTruthy();
    }
    const result = await axe.run(container, {
      runOnly: { type: "rule", values: ["aria-progressbar-name", "aria-valid-attr-value"] },
    });
    expect(result.violations.map((violation) => violation.id)).toEqual([]);
  });
});
