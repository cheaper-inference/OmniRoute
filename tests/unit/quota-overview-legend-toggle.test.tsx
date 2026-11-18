import React from "react";
import fs from "node:fs";
import path from "node:path";
import "@testing-library/jest-dom/vitest";
import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { isInaccessible } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { NextIntlClientProvider } from "next-intl";
import en from "../../src/i18n/messages/en.json";
import zh from "../../src/i18n/messages/zh-CN.json";
import QuotaHealthOverview from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaHealthOverview";

vi.unmock("next-intl");
const key = "omniroute:limits:healthLegendHidden";
const now = new Date("2099-01-01T00:00:00Z");
function overview(locale = "en") {
  const messages = locale === "en" ? en : zh;
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={{ usage: messages.usage, common: messages.common }}
      timeZone="UTC"
      now={now}
      onError={(error) => {
        throw error;
      }}
    >
      <QuotaHealthOverview
        connections={[]}
        quotaData={{}}
        providerLabels={{}}
        emailsVisible
        renderCard={() => null}
      />
    </NextIntlClientProvider>
  );
}
function mount(locale = "en") {
  return render(overview(locale));
}
function legend() {
  return document.querySelector<HTMLElement>("[data-legend]")!;
}
function controlled(button: HTMLElement) {
  return document.getElementById(button.getAttribute("aria-controls")!)!;
}
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  // Reset the shared session fallback through successful public UI writes.
  mount();
  const hide = screen.queryByRole("button", { name: "Hide legend" });
  if (hide) fireEvent.click(hide);
  fireEvent.click(screen.getByRole("button", { name: "Show legend" }));
  cleanup();
  localStorage.clear();
});
it("shows all seven legend items by default with an accessible toggle", () => {
  mount();
  const button = screen.getByRole("button", { name: "Hide legend" });
  expect(button).toHaveAttribute("aria-expanded", "true");
  expect(legend()).toBeVisible();
  expect(legend().children).toHaveLength(7);
  expect(isInaccessible(legend())).toBe(false);
  expect(controlled(button)).toContainElement(legend());
  expect(controlled(button)).not.toHaveAttribute("inert");
});
it("collapses accessibly, persists across mounts, and removes the key when expanded", () => {
  const view = mount();
  fireEvent.click(screen.getByRole("button", { name: "Hide legend" }));
  const show = screen.getByRole("button", { name: "Show legend" });
  expect(show).toHaveAttribute("aria-expanded", "false");
  expect(controlled(show)).toHaveAttribute("inert");
  expect(isInaccessible(legend())).toBe(true);
  expect(localStorage.getItem(key)).toBe("1");
  view.unmount();
  mount();
  expect(screen.getByRole("button", { name: "Show legend" })).toHaveAttribute(
    "aria-expanded",
    "false"
  );
  expect(isInaccessible(legend())).toBe(true);
  fireEvent.click(screen.getByRole("button", { name: "Show legend" }));
  expect(screen.getByRole("button", { name: "Hide legend" })).toHaveAttribute(
    "aria-expanded",
    "true"
  );
  expect(isInaccessible(legend())).toBe(false);
  expect(localStorage.getItem(key)).toBeNull();
});
it("keeps toggling and remounting when setItem throws despite readable stale storage", () => {
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw Error("blocked");
  });
  const view = mount();
  expect(() => fireEvent.click(screen.getByRole("button", { name: "Hide legend" }))).not.toThrow();
  expect(isInaccessible(legend())).toBe(true);
  expect(localStorage.getItem(key)).toBeNull();
  view.unmount();
  mount();
  expect(screen.getByRole("button", { name: "Show legend" })).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: "Show legend" }));
  expect(isInaccessible(legend())).toBe(false);
});
it("keeps toggling when storage reads and writes are unavailable", () => {
  for (const method of ["getItem", "setItem", "removeItem"] as const) {
    vi.spyOn(Storage.prototype, method).mockImplementation(() => {
      throw Error("blocked");
    });
  }
  mount();
  fireEvent.click(screen.getByRole("button", { name: "Hide legend" }));
  expect(isInaccessible(legend())).toBe(true);
  fireEvent.click(screen.getByRole("button", { name: "Show legend" }));
  expect(isInaccessible(legend())).toBe(false);
});
it("keeps expanding when removeItem throws and storage still contains the hidden value", () => {
  localStorage.setItem(key, "1");
  vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
    throw Error("blocked");
  });
  const view = mount();
  fireEvent.click(screen.getByRole("button", { name: "Show legend" }));
  expect(isInaccessible(legend())).toBe(false);
  expect(localStorage.getItem(key)).toBe("1");
  view.unmount();
  mount();
  expect(screen.getByRole("button", { name: "Hide legend" })).toBeTruthy();
});
it("synchronizes multiple mounted overviews with distinct controlled ids", () => {
  const first = mount();
  mount();
  const buttons = screen.getAllByRole("button", { name: "Hide legend" });
  expect(buttons[0].getAttribute("aria-controls")).not.toBe(
    buttons[1].getAttribute("aria-controls")
  );
  fireEvent.click(buttons[0]);
  expect(screen.getAllByRole("button", { name: "Show legend" })).toHaveLength(2);
  first.unmount();
  fireEvent.click(screen.getByRole("button", { name: "Show legend" }));
  expect(screen.getByRole("button", { name: "Hide legend" })).toBeTruthy();
});
it("supports keyboard activation without making collapsed legend contents tabbable", async () => {
  const user = userEvent.setup();
  mount();
  const button = screen.getByRole("button", { name: "Hide legend" });
  button.focus();
  await user.keyboard("{Enter}");
  expect(button).toHaveAccessibleName("Show legend");
  expect(controlled(button)).toHaveAttribute("inert");
  expect(legend().querySelector("button, a, input, [tabindex]")).toBeNull();
  await user.keyboard(" ");
  expect(button).toHaveAccessibleName("Hide legend");
});
it("uses height and opacity transitions with a reduced-motion override", () => {
  mount();
  const button = screen.getByRole("button", { name: "Hide legend" });
  const container = controlled(button);
  expect(container).toHaveClass(
    "grid",
    "grid-rows-[1fr]",
    "opacity-100",
    "transition-[grid-template-rows,opacity]",
    "motion-reduce:transition-none"
  );
  fireEvent.click(button);
  expect(container).toHaveClass("grid-rows-[0fr]", "opacity-0");
  expect(container.firstElementChild).toHaveClass("min-h-0", "overflow-hidden");
});
it("renders the Chinese toggle text", () => {
  mount("zh-CN");
  fireEvent.click(screen.getByRole("button", { name: "隐藏图例" }));
  expect(screen.getByRole("button", { name: "显示图例" })).toBeTruthy();
});
it("synchronizes relevant storage events without reacting to unrelated keys", () => {
  mount();
  act(() => {
    localStorage.setItem(key, "1");
    window.dispatchEvent(new StorageEvent("storage", { key: "unrelated" }));
  });
  expect(screen.getByRole("button", { name: "Hide legend" })).toBeTruthy();
  act(() => window.dispatchEvent(new StorageEvent("storage", { key })));
  expect(screen.getByRole("button", { name: "Show legend" })).toBeTruthy();
  act(() => {
    localStorage.clear();
    window.dispatchEvent(new StorageEvent("storage", { key: null }));
  });
  expect(screen.getByRole("button", { name: "Hide legend" })).toBeTruthy();
});
it("all catalogs translate both toggle labels without ICU parameters", () => {
  const directory = path.resolve("src/i18n/messages");
  const files = fs.readdirSync(directory).filter((file) => file.endsWith(".json"));
  expect(files).toHaveLength(67);
  for (const file of files) {
    const usage = JSON.parse(fs.readFileSync(path.join(directory, file), "utf8")).usage;
    for (const name of ["healthLegendHide", "healthLegendShow"] as const) {
      expect(usage[name], `${file}:${name}`).toEqual(expect.any(String));
      expect(usage[name].trim()).not.toBe("");
      expect(usage[name]).not.toMatch(/[{}]|__MISSING__/);
      if (file !== "en.json") expect(usage[name]).not.toBe(en.usage[name]);
    }
  }
  const traditional = JSON.parse(fs.readFileSync(path.join(directory, "zh-TW.json"), "utf8"));
  expect(traditional.usage.healthLegendHide).toBe("隱藏圖例");
  expect(traditional.usage.healthLegendShow).toBe("顯示圖例");
});
it("keeps SSR and the hydration snapshot visible before applying the stored preference", async () => {
  localStorage.setItem(key, "1");
  const html = renderToString(overview());
  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);
  expect(container.querySelector('[aria-expanded="true"]')).toHaveTextContent("Hide legend");
  expect(isInaccessible(container.querySelector("[data-legend]")!)).toBe(false);
  const onRecoverableError = vi.fn();
  let root: ReturnType<typeof hydrateRoot>;
  await act(async () => {
    root = hydrateRoot(container, overview(), { onRecoverableError });
  });
  expect(onRecoverableError).not.toHaveBeenCalled();
  expect(screen.getByRole("button", { name: "Show legend" })).toBeTruthy();
  expect(isInaccessible(legend())).toBe(true);
  act(() => root.unmount());
  container.remove();
});
