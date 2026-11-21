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
  expect(screen.queryByRole("alert")).toBeNull();
});

const unconfirmedLabel = "routingAntigravityCreditsUnconfirmed";
const recheckLabel = "routingAntigravityCreditsRecheck";

type AmbiguousResponse = "dropped" | "5xx" | "malformed" | "mismatch";

async function renderAmbiguousPatch(outcome: AmbiguousResponse, { failFirstRecheck = false } = {}) {
  let serverMode = "retry";
  let refreshes = 0;
  const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
    if (url !== "/api/settings") return Response.json([]);
    if (init?.method === "PATCH") {
      serverMode = JSON.parse(String(init.body)).antigravityCreditsMode;
      if (outcome === "dropped") throw new TypeError("response connection lost");
      if (outcome === "5xx") return Response.json({}, { status: 500 });
      if (outcome === "malformed") return new Response("not JSON");
      return Response.json({ antigravityCreditsMode: "retry" });
    }
    if (init?.cache === "no-store" && refreshes++ === 0 && failFirstRecheck) {
      return Response.json({}, { status: 503 });
    }
    return Response.json({ antigravityCreditsMode: serverMode });
  });
  vi.stubGlobal("fetch", fetchMock);
  render(<RoutingTab />);
  const group = await screen.findByRole("radiogroup", { name: title });
  const radio = (mode: keyof typeof optionLabels) =>
    within(group).getByRole<HTMLInputElement>("radio", { name: optionLabels[mode] });
  await waitFor(() => expect(radio("retry").checked).toBe(true));
  fireEvent.click(radio("always"));
  const settingsCalls = () => fetchMock.mock.calls.filter(([url]) => url === "/api/settings");
  return { settingsCalls, group, radio };
}

for (const outcome of ["dropped", "5xx", "malformed", "mismatch"] as const) {
  it(
    `requires a fresh read after a ${outcome} PATCH response without retrying the write`,
    {
      timeout: 60_000,
    },
    async () => {
      const { settingsCalls, group, radio } = await renderAmbiguousPatch(outcome);
      expect((await screen.findByRole("alert")).textContent).toContain(unconfirmedLabel);
      for (const option of within(group).getAllByRole<HTMLInputElement>("radio")) {
        expect(option.disabled).toBe(true);
        expect(option.checked).toBe(false);
      }
      const recheck = screen.getByRole("button", { name: recheckLabel });
      expect(settingsCalls()).toHaveLength(2);
      fireEvent.click(recheck);
      await waitFor(() => expect(radio("always").checked).toBe(true));
      expect(radio("always").disabled).toBe(false);
      expect(screen.queryByRole("alert")).toBeNull();
      expect(settingsCalls()).toHaveLength(3);
      expect(settingsCalls()[2]).toEqual(["/api/settings", { cache: "no-store" }]);
    }
  );
}

it("stays unknown and editable only after a successful recheck", { timeout: 60_000 }, async () => {
  const { settingsCalls, radio } = await renderAmbiguousPatch("dropped", {
    failFirstRecheck: true,
  });
  const recheck = await screen.findByRole<HTMLButtonElement>("button", { name: recheckLabel });
  fireEvent.click(recheck);
  await waitFor(() => expect(settingsCalls()).toHaveLength(3));
  await waitFor(() => expect(recheck.disabled).toBe(false));
  expect(screen.getByRole("alert").textContent).toContain(unconfirmedLabel);
  expect(radio("always").disabled).toBe(true);
  expect(radio("retry").checked).toBe(false);
  fireEvent.click(recheck);
  await waitFor(() => expect(radio("always").checked).toBe(true));
  expect(settingsCalls().filter(([, init]) => init?.method === "PATCH")).toHaveLength(1);
});
