import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProviderAccountRoutingCard from "@/app/(dashboard)/dashboard/settings/components/ProviderAccountRoutingCard";
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
describe("Account routing accordion", () => {
  it("summarizes the current strategy and limit, then searches and saves the existing override", async () => {
    const fetcher = vi.fn(
      async (_url, init) =>
        new Response(
          JSON.stringify(
            init?.method === "PATCH"
              ? { ok: true }
              : {
                  settingsRevision: 7,
                  providerStrategies: {
                    codex: {
                      fallbackStrategy: "round-robin",
                      stickyRoundRobinLimit: 4,
                      planWeights: { pro: 3 },
                    },
                  },
                }
          ),
          { status: 200 }
        )
    );
    vi.stubGlobal("fetch", fetcher);
    const { container } = render(
      <ProviderAccountRoutingCard providerKey="codex" connectionCount={3} />
    );
    await waitFor(() =>
      expect(container.querySelector("summary")?.textContent).toContain("round-robin")
    );
    expect(container.querySelector("summary")?.textContent).toContain("4");
    expect(container.querySelector("details")?.open).toBe(false);
    fireEvent.click(container.querySelector("summary")!);
    fireEvent.click(screen.getByRole("button", { name: "Account strategy" }));
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "least-used" } });
    expect(screen.queryByRole("option", { name: "random", exact: true })).toBeNull();
    fireEvent.click(screen.getByRole("option", { name: "least-used", exact: true }));
    await waitFor(() =>
      expect(fetcher.mock.calls.some(([, init]) => init?.method === "PATCH")).toBe(true)
    );
    const post = fetcher.mock.calls.find(([, init]) => init?.method === "PATCH");
    expect(JSON.parse(String(post?.[1]?.body))).toMatchObject({
      expectedRevision: 7,
      providerStrategies: { codex: { fallbackStrategy: "least-used", planWeights: { pro: 3 } } },
    });
    expect(container.querySelector("summary")?.textContent).toContain("least-used");
  });
});
