import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import OpenAIBillingPanel from "../../../src/shared/components/OpenAIBillingPanel";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => key,
}));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("shows a Billing link without an Admin key and never renders an invented zero balance", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ organizations: [] }) })
  );
  render(<OpenAIBillingPanel />);
  expect(await screen.findByText("notConfigured")).toBeTruthy();
  expect(screen.getByRole("link", { name: /billingLink/ }).getAttribute("href")).toBe(
    "https://platform.openai.com/settings/organization/billing/overview"
  );
  expect(screen.queryByText("$0.00")).toBeNull();
  expect(screen.getByText("noDoubleCounting")).toBeTruthy();
});

it("shows the organization total once and treats a failed organization as unavailable", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        organizations: [
          {
            organizationId: "org-one",
            costs: { totalUsd: 4.25, startTime: 1, endTime: 2, fetchedAt: "2026-11-08T12:00:00Z" },
          },
          { organizationId: "org-two", costs: null, error: "billing_unavailable" },
        ],
      }),
    })
  );
  render(<OpenAIBillingPanel />);
  expect(await screen.findByText("$4.25")).toBeTruthy();
  expect(screen.getAllByText("$4.25")).toHaveLength(1);
  expect(screen.getByText("unavailable")).toBeTruthy();
});

it("submits optional credentials only to the billing endpoint and clears the password field", async () => {
  const fetchMock = vi
    .fn()
    .mockResolvedValue({ ok: true, json: async () => ({ organizations: [] }) });
  vi.stubGlobal("fetch", fetchMock);
  render(<OpenAIBillingPanel />);
  await screen.findByText("notConfigured");
  fireEvent.click(screen.getByText("configure"));
  fireEvent.change(screen.getByLabelText("organizationId"), { target: { value: "org-one" } });
  fireEvent.change(screen.getByLabelText("adminKey"), { target: { value: "test-admin-secret" } });
  fireEvent.click(screen.getByRole("button", { name: "save" }));
  await waitFor(() =>
    expect((screen.getByLabelText("adminKey") as HTMLInputElement).value).toBe("")
  );
  expect(fetchMock.mock.calls.find(([, options]) => options?.method === "PUT")).toEqual([
    "/api/usage/openai-costs",
    expect.objectContaining({
      body: JSON.stringify({ organizationId: "org-one", apiKey: "test-admin-secret" }),
    }),
  ]);
});
