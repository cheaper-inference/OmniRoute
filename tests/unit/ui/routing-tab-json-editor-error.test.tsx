// @vitest-environment jsdom
// KEA-7886 (lote 5a fix round 1): the per-provider system-transforms JSON editor must expose its
// validation error on the field — the textarea is marked aria-invalid and points (aria-describedby)
// at an announced message — instead of a loose paragraph under the control.
import React from "react";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () =>
    Object.assign((key: string) => key, { has: () => true, rich: (key: string) => key }),
}));

const { default: RoutingTab } =
  await import("../../../src/app/(dashboard)/dashboard/settings/components/RoutingTab");

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({ ok: true, json: async () => ({}) }) as unknown as Response)
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

// RoutingTab is the largest settings module (~1.7k lines); its first render alone takes several
// seconds under a loaded runner, so this new test gets an explicit budget.
it("marks the JSON editor invalid and announces the parse error", { timeout: 60_000 }, async () => {
  const { container } = render(<RoutingTab />);

  // Open the first system-transforms provider row (kit Accordion via the Collapsible adapter).
  const providerTrigger = await waitFor(() => {
    const trigger = Array.from(
      container.querySelectorAll<HTMLButtonElement>("[data-slot=accordion-trigger]")
    ).find((button) => button.querySelector("code"));
    if (!trigger) throw new Error("no provider row yet");
    return trigger;
  });
  act(() => providerTrigger.click());

  fireEvent.click(await screen.findByRole("button", { name: "routingJsonEditorImportExport" }));
  const textarea = container.querySelector<HTMLTextAreaElement>(
    'textarea[id^="routing-json-editor-"]'
  );
  expect(textarea).toBeTruthy();
  expect(textarea!.getAttribute("aria-invalid")).not.toBe("true");

  fireEvent.change(textarea!, { target: { value: "{ not json" } });
  fireEvent.click(screen.getByRole("button", { name: "routingApplyJson" }));

  await waitFor(() => expect(textarea!.getAttribute("aria-invalid")).toBe("true"));
  const message = (textarea!.getAttribute("aria-describedby") ?? "")
    .split(" ")
    .map((id) => document.getElementById(id))
    .find((el) => el?.textContent?.includes("routingInvalidJson"));
  expect(message, "the error must be referenced by aria-describedby").toBeTruthy();
  expect(message!.getAttribute("role")).toBe("alert");
});
