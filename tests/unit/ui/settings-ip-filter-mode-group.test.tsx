import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import IPFilterSection from "@/app/(dashboard)/dashboard/settings/components/IPFilterSection";
import en from "@/i18n/messages/en.json";

// #18073 (lote 5b nit): the IP filter mode radio group was named by its card title
// ("IP Access Control"), so a screen reader announced the card twice and never said what
// the choice was. It now has its own name and lays its four cards out with the kit grid.
vi.unmock("next-intl");

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockImplementation(
    async () =>
      new Response(
        JSON.stringify({
          enabled: true,
          mode: "whitelist",
          blacklist: [],
          whitelist: [],
          tempBans: [],
        }),
        { status: 200 }
      )
  );
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function mount() {
  return render(
    <NextIntlClientProvider
      locale="en"
      timeZone="UTC"
      messages={{ settings: en.settings, common: en.common }}
      onError={(error) => {
        throw error;
      }}
    >
      <IPFilterSection />
    </NextIntlClientProvider>
  );
}

describe("IP filter mode radio group", () => {
  it("names the group after the choice, not after the card title", async () => {
    mount();
    const group = await screen.findByRole("radiogroup", { name: en.settings.ipAccessMode });
    expect(en.settings.ipAccessMode).not.toBe(en.settings.ipAccessControl);
    expect(screen.queryByRole("radiogroup", { name: en.settings.ipAccessControl })).toBeNull();
    await waitFor(() =>
      expect(
        (screen.getByRole("radio", { name: en.settings.ipModeWhitelist }) as HTMLInputElement)
          .checked
      ).toBe(true)
    );
    expect(group.querySelectorAll('input[type="radio"]')).toHaveLength(4);
  });

  it("lays the four mode cards out with the kit RadioGroup grid", async () => {
    mount();
    const group = await screen.findByRole("radiogroup", { name: en.settings.ipAccessMode });
    const items = group.querySelector<HTMLElement>(".ci-radio-group__items");
    expect(items?.dataset.layout).toBe("grid");
    expect(items?.style.getPropertyValue("--ci-radio-group-columns")).toBe("4");
    // The radios are direct grid cells, not wrapped in a hand-made Tailwind grid.
    expect(group.querySelector(".grid")).toBeNull();
  });
});
