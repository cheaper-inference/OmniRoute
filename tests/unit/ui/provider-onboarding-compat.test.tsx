// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
vi.mock("@/shared/components", () => ({
  Badge: ({ children }: React.PropsWithChildren) => <span>{children}</span>,
  Button: ({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) => (
    <button onClick={onClick}>{children}</button>
  ),
  Card: ({ children }: React.PropsWithChildren) => <section>{children}</section>,
  Input: () => <input aria-label="Search providers" />,
  CursorAuthModal: () => null,
  GrokBotAuthModal: () => null,
  KiroOAuthWrapper: () => null,
  OAuthModal: () => null,
}));
vi.mock("@/shared/components/ProviderIcon", () => ({ default: () => null }));
vi.mock("@/shared/components/ProviderTosNotice", () => ({ default: () => null }));
vi.mock(
  "@/app/(dashboard)/dashboard/providers/components/onboarding/providerOnboardingApi",
  () => ({
    fetchOnboardingProviderNodes: async () => ({ ccCompatibleProviderEnabled: false }),
  })
);
const { default: Wizard } =
  await import("@/app/(dashboard)/dashboard/providers/components/onboarding/ProviderOnboardingWizard");
afterEach(cleanup);

it("renders real decorative icons without leaking missing-font ligatures into type names", async () => {
  const { container } = render(<Wizard />);
  await screen.findByRole("button", { name: /^API-key provider Use built-in/ });
  expect(container.querySelector(".material-symbols-outlined")).toBeNull();
  const icons = container.querySelectorAll("svg.oi-icon");
  expect(icons.length).toBeGreaterThan(0);
  for (const icon of icons) expect(icon.getAttribute("aria-hidden")).toBe("true");
});

it("names provider groups and preserves them across changing the onboarding type", async () => {
  render(<Wizard />);
  fireEvent.click(await screen.findByRole("button", { name: /^API-key provider Use built-in/ }));
  expect(screen.getByRole("group", { name: "Choose an API-key provider" })).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: "Change type" }));
  fireEvent.click(screen.getByRole("button", { name: /^OAuth provider Reuse/ }));
  expect(screen.getByRole("group", { name: "Choose an OAuth provider" })).toBeTruthy();
});
