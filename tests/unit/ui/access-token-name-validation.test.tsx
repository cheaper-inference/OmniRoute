// @vitest-environment jsdom
// KEA-9387: the access-token Name field says what is wrong, where it is wrong. Create stays
// enabled; clicking it with an empty or over-long name flags the field inline and focuses it,
// and nothing is sent to the API.
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import AccessTokensTab from "@/app/(dashboard)/dashboard/settings/components/AccessTokensTab";
import en from "@/i18n/messages/en.json";
import { ACCESS_TOKEN_NAME_MAX_LENGTH } from "@/shared/constants/formLimits";

// The component formats dates with `useFormatter`, which the global key-only mock lacks:
// exercise the real catalog and provider instead.
vi.unmock("next-intl");

// The kit Table measures itself with ResizeObserver; jsdom lacks it.
beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const reply = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status });
const fetchMock = vi.fn<typeof fetch>();
const posts = () => fetchMock.mock.calls.filter(([, init]) => init?.method === "POST");

beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockImplementation(async () => reply({ tokens: [] }));
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

// Plain DOM lookups: role queries walk the whole accessibility tree on every call.
const createButton = () =>
  Array.from(document.querySelectorAll("button")).find(
    (node) => node.textContent === "Create"
  ) as HTMLButtonElement;
const alerts = () =>
  Array.from(document.querySelectorAll('[role="alert"]')).map((node) => node.textContent);

async function mount() {
  render(
    <NextIntlClientProvider
      locale="en"
      timeZone="UTC"
      messages={{
        settings: en.settings,
        common: en.common,
        formValidation: en.formValidation,
      }}
      onError={(error) => {
        throw error;
      }}
    >
      <AccessTokensTab />
    </NextIntlClientProvider>
  );
  // The list request settles first; generous for a loaded CI runner.
  await screen.findByText("No access tokens yet.", undefined, { timeout: 10_000 });
  return screen.getByPlaceholderText("Name (e.g. laptop)") as HTMLInputElement;
}

describe("access-token Name validation (KEA-9387)", () => {
  it("explains an empty name inline when Create is clicked, instead of a silent disabled button", async () => {
    const name = await mount();
    const create = createButton();
    expect(create.disabled).toBe(false);
    expect(name.required).toBe(true);
    // Nothing is flagged before the user tries to create.
    expect(alerts()).toEqual([]);

    fireEvent.click(create);

    expect(alerts()).toEqual(["Name is required"]);
    expect(name.getAttribute("aria-invalid")).toBe("true");
    expect(document.activeElement).toBe(name);
    expect(posts()).toHaveLength(0);

    // Typing a name clears the message.
    fireEvent.change(name, { target: { value: "laptop" } });
    expect(alerts()).toEqual([]);
  });

  it("flags a name over the server limit as it is typed and does not send it", async () => {
    const name = await mount();
    const tooLong = "n".repeat(ACCESS_TOKEN_NAME_MAX_LENGTH + 1);
    fireEvent.change(name, { target: { value: tooLong } });

    expect(alerts()).toEqual(["Name can have at most 100 characters (currently 101)"]);
    expect(name.getAttribute("aria-invalid")).toBe("true");
    // Nothing is cut: the user sees what they typed and decides what to remove.
    expect(name.value).toHaveLength(ACCESS_TOKEN_NAME_MAX_LENGTH + 1);

    fireEvent.click(createButton());
    expect(posts()).toHaveLength(0);
    expect(document.activeElement).toBe(name);
  });

  it("accepts a name exactly at the limit", async () => {
    const name = await mount();
    const atLimit = "n".repeat(ACCESS_TOKEN_NAME_MAX_LENGTH);
    fireEvent.change(name, { target: { value: `  ${atLimit}  ` } });
    expect(alerts()).toEqual([]);

    fetchMock.mockResolvedValueOnce(reply({ token: "omni_disposable_test_secret" }));
    fireEvent.click(createButton());
    await screen.findByText("omni_disposable_test_secret", undefined, { timeout: 10_000 });
    expect(JSON.parse(String(posts()[0][1]?.body))).toEqual({ name: atLimit, scope: "read" });
  });
});
