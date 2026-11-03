// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const refresh = vi.fn();
const persistLocale = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh }) }));
vi.mock("@/shared/lib/persistLocale", () => ({
  persistLocale: (code: string) => persistLocale(code),
}));
// Three locales instead of all 66: the test covers the selector's wiring, and opening a Radix
// menu with every locale row costs >10 s in jsdom on a loaded box. The explicit timeout below
// covers the kit menu's open/close cost under the parallel vitest pool (~8 s at load 40).
vi.mock("@/i18n/config", () => ({
  LANGUAGES: [
    { code: "en", label: "EN", name: "English", native: "English", english: "English", flag: "🇺🇸" },
    {
      code: "pt-BR",
      label: "PT",
      name: "Português (Brasil)",
      native: "Português",
      english: "Portuguese",
      flag: "🇧🇷",
    },
    { code: "es", label: "ES", name: "Español", native: "Español", english: "Spanish", flag: "🇪🇸" },
  ],
}));

const { default: LanguageSelector } = await import("@/shared/components/LanguageSelector");

afterEach(() => {
  cleanup();
  refresh.mockClear();
  persistLocale.mockClear();
});

describe("LanguageSelector on the kit DropdownMenu", () => {
  it(
    "opens a menu of radio items with the current locale checked; picking one persists and refreshes",
    { timeout: 20_000 },
    async () => {
      render(<LanguageSelector />);
      // WCAG 2.5.3 label-in-name: the name carries the visible label ("EN") and the purpose
      const trigger = screen.getByRole("button", { name: "Language: EN — English" });
      expect(trigger.className).toContain("ci-button--ghost");
      expect(trigger.querySelector(".material-symbols-outlined")).toBeNull();
      fireEvent.keyDown(trigger, { key: "Enter" });
      const menu = await screen.findByRole("menu");
      expect(menu.className).toContain("ci-menu");
      const items = screen.getAllByRole("menuitemradio");
      expect(items).toHaveLength(3);
      expect(items[0].getAttribute("aria-checked")).toBe("true");
      expect(items[0].textContent).toContain("English");
      fireEvent.click(items[0]);
      expect(persistLocale).not.toHaveBeenCalled();
      fireEvent.keyDown(trigger, { key: "Enter" });
      fireEvent.click((await screen.findAllByRole("menuitemradio"))[1]);
      expect(persistLocale).toHaveBeenCalledWith("pt-BR");
      expect(refresh).toHaveBeenCalledTimes(1);
    }
  );
});
