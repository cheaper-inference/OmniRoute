// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () =>
    Object.assign((key: string) => key, { has: () => true, rich: (key: string) => key }),
}));

const { default: RoutingTab } =
  await import("../../../src/app/(dashboard)/dashboard/settings/components/RoutingTab");

function mockSettings(status = 200) {
  const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
    if (init?.method === "PATCH") {
      const body = JSON.parse(String(init.body));
      return Response.json(body, { status });
    }
    return Response.json({ antigravityCreditsMode: "retry" });
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const title = "routingAntigravityCreditsTitle";
const optionLabels = {
  off: "routingAntigravityCreditsOffLabel",
  retry: "routingAntigravityCreditsRetryLabel",
  always: "routingAntigravityCreditsAlwaysLabel",
};

it(
  "displays the inherited setting and PATCHes all three choices",
  { timeout: 60_000 },
  async () => {
    const fetchMock = mockSettings();
    render(<RoutingTab />);
    const group = await screen.findByRole("radiogroup", { name: title });
    const radio = (mode: keyof typeof optionLabels) =>
      within(group).getByRole<HTMLInputElement>("radio", { name: optionLabels[mode] });
    expect(within(group).getAllByRole("radio")).toHaveLength(3);
    expect(screen.getByText("routingAntigravityCreditsWarning")).toBeDefined();
    await waitFor(() => expect(radio("retry").checked).toBe(true));

    for (const mode of ["off", "always", "retry"] as const) {
      fireEvent.click(radio(mode));
      await waitFor(() => expect(radio(mode).checked).toBe(true));
    }
    const patches = fetchMock.mock.calls
      .filter(([, init]) => init?.method === "PATCH")
      .map(([url, init]) => [url, JSON.parse(String(init!.body))]);
    expect(patches).toEqual(
      ["off", "always", "retry"].map((mode) => ["/api/settings", { antigravityCreditsMode: mode }])
    );
  }
);

it("retains the last confirmed mode if PATCH is rejected", { timeout: 60_000 }, async () => {
  const fetchMock = mockSettings(400);
  render(<RoutingTab />);
  const group = await screen.findByRole("radiogroup", { name: title });
  const retry = within(group).getByRole<HTMLInputElement>("radio", { name: optionLabels.retry });
  const always = within(group).getByRole<HTMLInputElement>("radio", { name: optionLabels.always });
  await waitFor(() => expect(retry.checked).toBe(true));
  fireEvent.click(always);
  await waitFor(() =>
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/settings",
      expect.objectContaining({ method: "PATCH" })
    )
  );
  await waitFor(() => expect(always.disabled).toBe(false));
  expect(retry.checked).toBe(true);
  expect(always.checked).toBe(false);
});
