import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import CodexResetCreditsAction from "@/app/(dashboard)/dashboard/providers/[id]/components/CodexResetCreditsAction";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
describe("Codex provider reset-credit action", () => {
  it("loads the account's credits and requires confirmation before spending", async () => {
    const refresh = vi.fn();
    const fetcher = vi.fn(
      async (_url, init) =>
        new Response(
          JSON.stringify(
            init?.method === "POST"
              ? { ok: true, usage: { bankedResetCredits: 0 } }
              : {
                  ok: true,
                  availableCount: 1,
                  credits: [{ selectionToken: "chosen-credit", title: "Full reset" }],
                }
          ),
          { status: 200 }
        )
    );
    vi.stubGlobal("fetch", fetcher);
    render(<CodexResetCreditsAction connectionId="account-42" count={1} onRefresh={refresh} />);
    fireEvent.click(screen.getByRole("button", { name: /Redeem reset/i }));
    await screen.findByText("Full reset");
    expect(fetcher).toHaveBeenCalledWith(expect.stringContaining("connectionId=account-42"), {
      cache: "no-store",
    });
    expect(fetcher.mock.calls.some(([, init]) => init?.method === "POST")).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: /^Redeem$/ }));
    expect(fetcher.mock.calls.some(([, init]) => init?.method === "POST")).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: /^Redeem credit$/ }));
    await waitFor(() => expect(refresh).toHaveBeenCalledOnce());
    const post = fetcher.mock.calls.find(([, init]) => init?.method === "POST");
    expect(JSON.parse(String(post?.[1]?.body))).toMatchObject({
      connectionId: "account-42",
      creditId: "chosen-credit",
      idempotencyKey: expect.any(String),
    });
  });
  it("does not offer redemption for absent, zero or invalid credits", () => {
    for (const count of [undefined, 0, NaN, -1]) {
      const { unmount } = render(<CodexResetCreditsAction connectionId="account" count={count} />);
      expect(screen.queryByRole("button")).toBeNull();
      unmount();
    }
  });
  it("surfaces a failed credit lookup without sending redemption", async () => {
    const fetcher = vi.fn(
      async () => new Response(JSON.stringify({ error: "Credits unavailable" }), { status: 503 })
    );
    vi.stubGlobal("fetch", fetcher);
    render(<CodexResetCreditsAction connectionId="account" count={2} />);
    fireEvent.click(screen.getByRole("button", { name: /Redeem reset/i }));
    expect(await screen.findByRole("alert")).toHaveProperty("textContent", "Credits unavailable");
    expect(fetcher).toHaveBeenCalledOnce();
  });
});
