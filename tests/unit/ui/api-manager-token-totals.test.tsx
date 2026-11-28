import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import ApiManagerPageClient from "@/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("shows each key's lifetime token total alongside its filtered costs link", async () => {
  const keys = ["first-key", "second-key"].map((id) => ({
    id,
    name: "Shared Name",
    key: "sk-test-masked",
    createdAt: "2026-01-01T00:00:00.000Z",
  }));
  const routes: Record<string, unknown> = {
    "/api/keys": { keys },
    "/api/usage/analytics?range=all&view=apiKeys": {
      byApiKey: [
        { apiKeyId: "second-key", requests: 1, totalTokens: 77, cost: 0 },
        { apiKeyId: "first-key", requests: 2, totalTokens: 1234, cost: 0 },
      ],
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => Response.json(routes[url] ?? {}))
  );

  render(<ApiManagerPageClient />);

  const firstRow = (await screen.findByText("1,234 tokens")).closest("tr");
  const secondRow = screen.getByText("77 tokens").closest("tr");
  expect(firstRow).not.toBeNull();
  expect(secondRow).not.toBeNull();
  expect(
    within(firstRow).getByRole("link", { name: "View costs for Shared Name" }).getAttribute("href")
  ).toBe("/dashboard/costs?range=all&apiKeyIds=first-key&groupBy=model");
  expect(
    within(secondRow).getByRole("link", { name: "View costs for Shared Name" }).getAttribute("href")
  ).toBe("/dashboard/costs?range=all&apiKeyIds=second-key&groupBy=model");
});
