import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import CodexQuotaAlertsTab from "@/app/(dashboard)/dashboard/settings/components/CodexQuotaAlertsTab";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));

function stubSettings(enabled: boolean, patchStatus = 200) {
  const patches: unknown[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === "PATCH") {
        patches.push(JSON.parse(String(init.body)));
        return new Response("{}", { status: patchStatus });
      }
      return Response.json({ codexQuotaAlerts: { enabled } });
    })
  );
  return patches;
}

async function loadedToggle() {
  const toggle = await screen.findByRole("switch", { name: "codexQuotaAlertsTitle" });
  await waitFor(() => expect(toggle.hasAttribute("disabled")).toBe(false));
  return toggle;
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("reflects the stored setting, off by default", async () => {
  stubSettings(false);
  render(<CodexQuotaAlertsTab />);

  expect((await loadedToggle()).getAttribute("aria-checked")).toBe("false");
});

it("turning it on writes exactly the opt-in setting", async () => {
  const patches = stubSettings(false);
  render(<CodexQuotaAlertsTab />);

  fireEvent.click(await loadedToggle());

  await waitFor(() => expect(patches).toEqual([{ codexQuotaAlerts: { enabled: true } }]));
  await screen.findByText("saved");
});

it("a failed save reverts the toggle and says so", async () => {
  stubSettings(true, 500);
  render(<CodexQuotaAlertsTab />);

  const toggle = await loadedToggle();
  expect(toggle.getAttribute("aria-checked")).toBe("true");
  fireEvent.click(toggle);

  await screen.findByText("codexQuotaAlertsSaveError");
  expect(toggle.getAttribute("aria-checked")).toBe("true");
});
