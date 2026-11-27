// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import SecurityTab from "@/app/(dashboard)/dashboard/settings/components/SecurityTab";

vi.mock("@/shared/constants/providers", () => ({ AI_PROVIDERS: {} }));
vi.mock("@/shared/components/Icon", () => ({ default: () => null }));
vi.mock("@/shared/components/ProviderIcon", () => ({ default: () => null }));

// Keep the actual field and dialog while avoiding unrelated dashboard exports.
vi.mock("@/shared/components", async () => {
  const [button, card, input, modal, toggle] = await Promise.all([
    import("@/shared/components/Button"),
    import("@/shared/components/Card"),
    import("@/shared/components/Input"),
    import("@/shared/components/Modal"),
    import("@/shared/components/Toggle"),
  ]);
  return {
    Button: button.default,
    Card: card.default,
    Input: input.default,
    Modal: modal.default,
    Toggle: toggle.default,
  };
});
vi.mock("@/app/(dashboard)/dashboard/settings/components/IPFilterSection", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/PiiMaskingCard", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/SessionInfoCard", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/AuthzSection", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/MfaSection", () => ({
  default: () => null,
}));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

async function mountSecurityTab(hasPassword: boolean) {
  const savedOrigins = "https://app.example.com";
  const patch = vi.fn<(body: unknown) => void>();
  vi.stubGlobal(
    "fetch",
    vi.fn<typeof fetch>(async (_url, init) => {
      if (init?.method === "PATCH") {
        patch(JSON.parse(String(init.body)));
        return Response.json({});
      }
      return Response.json({ corsOrigins: savedOrigins, hasPassword });
    })
  );
  render(<SecurityTab />);
  await screen.findByDisplayValue(savedOrigins);
  const input = screen.getByRole("textbox", { name: "CORS allowed origins" });
  return { input, patch };
}

it("shows an inline error and skips the PATCH when an invalid origins list loses focus", async () => {
  const { input, patch } = await mountSecurityTab(false);
  fireEvent.change(input, { target: { value: "<b>x</b> 😀, http://" } });
  fireEvent.blur(input);

  expect(patch).not.toHaveBeenCalled();
  expect(input.getAttribute("aria-invalid")).toBe("true");
  const errorId = input.getAttribute("aria-describedby");
  expect(document.getElementById(errorId ?? "")?.textContent).toMatch(/unique HTTP\(S\) origins/);

  const corsOrigins = "https://admin.example.com, http://localhost:3000";
  fireEvent.change(input, { target: { value: corsOrigins } });
  expect(input.getAttribute("aria-invalid")).toBeNull();
  fireEvent.blur(input);
  await waitFor(() => expect(patch).toHaveBeenCalledExactlyOnceWith({ corsOrigins }));
});

it("keeps password confirmation for a valid origins list", async () => {
  const { input, patch } = await mountSecurityTab(true);
  const corsOrigins = "https://admin.example.com, http://localhost:3000";
  fireEvent.change(input, { target: { value: corsOrigins } });
  fireEvent.blur(input);

  const dialog = within(await screen.findByRole("dialog"));
  expect(patch).not.toHaveBeenCalled();
  fireEvent.change(dialog.getByLabelText("Current Password"), { target: { value: "password" } });
  fireEvent.click(dialog.getByRole("button", { name: /^confirm\??$/i }));
  await waitFor(() =>
    expect(patch).toHaveBeenCalledExactlyOnceWith({ corsOrigins, currentPassword: "password" })
  );
});
