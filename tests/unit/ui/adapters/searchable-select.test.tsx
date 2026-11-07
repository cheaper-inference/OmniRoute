// @vitest-environment jsdom
import React from "react";
import userEvent from "@testing-library/user-event";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import SearchableSelectField from "@/shared/components/SearchableSelectField";
import Modal from "@/shared/components/Modal";

const options = [
  { value: "", label: "Auto", alwaysVisible: true },
  { value: "provider/first", label: "Renée", keywords: ["İstanbul"] },
  { value: "provider/second", label: "علی کیان", description: "Imported" },
  { value: "disabled", label: "Unavailable", disabled: true },
];
afterEach(cleanup);

function setup(props: Partial<React.ComponentProps<typeof SearchableSelectField>> = {}) {
  const onValueChange = vi.fn();
  const result = render(
    <SearchableSelectField
      label="Model"
      value="provider/first"
      options={options}
      onValueChange={onValueChange}
      {...props}
    />
  );
  const trigger = result.getByRole("button", { name: "Model" });
  fireEvent.click(trigger);
  const search = result.getByRole("combobox") as HTMLInputElement;
  return { ...result, trigger, search, onValueChange };
}

describe("SearchableSelectField real kit composition", () => {
  it("filters label, exact ID and normalized metadata, commits exact identity once", async () => {
    const s = setup();
    expect(document.activeElement).toBe(s.search);
    fireEvent.change(s.search, { target: { value: "  RENEE İSTANBUL  " } });
    expect(s.queryByRole("option", { name: "علی کیان Imported" })).toBeNull();
    expect(s.onValueChange).not.toHaveBeenCalled();
    fireEvent.change(s.search, { target: { value: "provider/second" } });
    expect(s.trigger.textContent).toContain("Renée");
    fireEvent.click(s.getByRole("option", { name: "علی کیان Imported" }));
    expect(s.onValueChange).toHaveBeenCalledExactlyOnceWith("provider/second");
    await waitFor(() => expect(document.activeElement).toBe(s.trigger));
  });

  it.each(["pointer", "Enter"])(
    "closes unchanged selection via %s without firing a value change",
    async (method) => {
      const s = setup();
      fireEvent.change(s.search, { target: { value: "Renée" } });
      if (method === "pointer") fireEvent.click(s.getByRole("option", { name: "Renée" }));
      else fireEvent.keyDown(s.search, { key: "Enter" });
      expect(s.onValueChange).not.toHaveBeenCalled();
      expect(s.queryByRole("combobox")).toBeNull();
      expect(s.trigger.getAttribute("data-value")).toBe("provider/first");
      await waitFor(() => expect(document.activeElement).toBe(s.trigger));
      fireEvent.click(s.trigger);
      expect((s.getByRole("combobox") as HTMLInputElement).value).toBe("");
    }
  );

  it("clears and discards query without selection changes; empty Auto remains reachable", () => {
    const s = setup();
    fireEvent.change(s.search, { target: { value: "no such entity" } });
    expect(s.getAllByRole("option")).toHaveLength(1);
    fireEvent.click(s.getByRole("button", { name: /clear search/i }));
    expect(s.search.value).toBe("");
    fireEvent.change(s.search, { target: { value: "Renée" } });
    fireEvent.keyDown(s.search, { key: "Escape" });
    fireEvent.click(s.trigger);
    expect((s.getByRole("combobox") as HTMLInputElement).value).toBe("");
    expect(s.onValueChange).not.toHaveBeenCalled();
    fireEvent.click(s.getByRole("option", { name: "Auto" }));
    expect(s.onValueChange).toHaveBeenCalledExactlyOnceWith("");
  });

  it("announces no ordinary matches while keeping the Auto action reachable", () => {
    const s = setup({ emptyMessage: "No matching accounts" });
    fireEvent.change(s.search, { target: { value: "does-not-exist" } });
    expect(s.getByRole("status").textContent).toBe("No matching accounts");
    expect(s.getAllByRole("option")).toHaveLength(1);
    expect(s.getByRole("option", { name: "Auto" })).toBeTruthy();
    expect(s.onValueChange).not.toHaveBeenCalled();
    fireEvent.click(s.getByRole("button", { name: /clear search/i }));
    expect(s.queryByRole("status")).toBeNull();
    fireEvent.change(s.search, { target: { value: "does-not-exist" } });
    fireEvent.click(s.getByRole("option", { name: "Auto" }));
    expect(s.onValueChange).toHaveBeenCalledExactlyOnceWith("");
  });

  it("keeps Auto available without stealing the highlighted named match", () => {
    const s = setup();
    fireEvent.change(s.search, { target: { value: "provider/second" } });
    expect(s.getByRole("option", { name: "Auto" })).toBeTruthy();
    fireEvent.keyDown(s.search, { key: "Enter" });
    expect(s.onValueChange).toHaveBeenCalledExactlyOnceWith("provider/second");
  });

  it("keyboard skips disabled rows and Enter never submits the parent form", () => {
    const submit = vi.fn((event: React.FormEvent) => event.preventDefault());
    const change = vi.fn();
    const s = render(
      <form onSubmit={submit}>
        <SearchableSelectField
          label="Model"
          value=""
          options={[options[3], options[1], options[2]]}
          onValueChange={change}
        />
        <button type="submit">Save</button>
      </form>
    );
    fireEvent.keyDown(s.getByRole("button", { name: "Model" }), { key: "ArrowDown" });
    const input = s.getByRole("combobox");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(change).toHaveBeenCalledExactlyOnceWith("provider/second");
    expect(submit).not.toHaveBeenCalled();
  });

  it("keeps IME Enter and text-editing Home/End separate from selection", () => {
    const s = setup({ value: "", options: [options[1]] });
    fireEvent.compositionStart(s.search);
    expect(fireEvent.keyDown(s.search, { key: "Enter", isComposing: true })).toBe(true);
    expect(s.onValueChange).not.toHaveBeenCalled();
    fireEvent.compositionEnd(s.search);
    expect(fireEvent.keyDown(s.search, { key: "Home" })).toBe(true);
    expect(fireEvent.keyDown(s.search, { key: "End" })).toBe(true);
    expect(fireEvent.keyDown(s.search, { key: "a", ctrlKey: true })).toBe(true);
    fireEvent.keyDown(s.search, { key: "Enter" });
    expect(s.onValueChange).toHaveBeenCalledExactlyOnceWith("provider/first");
  });

  it("reconciles replaced options and all-disabled lists without stale active descendants", () => {
    const s = setup({ options: [options[1]] });
    s.rerender(
      <SearchableSelectField
        label="Model"
        value="provider/first"
        options={[options[3]]}
        onValueChange={s.onValueChange}
      />
    );
    expect(s.search.hasAttribute("aria-activedescendant")).toBe(false);
    fireEvent.keyDown(s.search, { key: "Enter" });
    fireEvent.click(s.getByRole("option"));
    expect(s.onValueChange).not.toHaveBeenCalled();
    expect(s.trigger.textContent).toContain("provider/first");
    s.rerender(
      <SearchableSelectField
        label="Model"
        value="provider/first"
        options={[options[2]]}
        onValueChange={s.onValueChange}
      />
    );
    expect(
      document.getElementById(s.search.getAttribute("aria-activedescendant")!)?.textContent
    ).toContain("علی");
    fireEvent.keyDown(s.search, { key: "Enter" });
    expect(s.onValueChange).toHaveBeenCalledExactlyOnceWith("provider/second");
  });

  it("distinguishes empty, no match, loading and errors; associates hint/error IDs", () => {
    const s = setup({ options: [], noOptionsMessage: "No available models", hint: "Help" });
    expect(s.getByRole("status").textContent).toBe("No available models");
    expect(document.getElementById(s.trigger.getAttribute("aria-describedby")!)?.textContent).toBe(
      "Help"
    );
    s.rerender(
      <SearchableSelectField
        label="Model"
        value=""
        options={[]}
        loading
        onValueChange={s.onValueChange}
      />
    );
    expect(s.getByRole("status").textContent).toMatch(/loading/i);
    s.rerender(
      <SearchableSelectField
        label="Model"
        value=""
        options={[]}
        error="Failed to load"
        onValueChange={s.onValueChange}
      />
    );
    expect(s.getByRole("status").textContent).toBe("Failed to load");
    expect(s.search.getAttribute("aria-invalid")).toBe("true");
    expect(document.getElementById(s.search.getAttribute("aria-describedby")!)?.textContent).toBe(
      "Failed to load"
    );
    s.rerender(
      <SearchableSelectField
        label="Model"
        value=""
        options={[options[1]]}
        emptyMessage="No matches"
        onValueChange={s.onValueChange}
      />
    );
    fireEvent.change(s.search, { target: { value: "missing" } });
    expect(s.getByRole("status").textContent).toBe("No matches");
  });

  it("serializes only exact selected value, never query; disabled fields submit nothing", () => {
    const s = render(
      <form data-testid="form">
        <SearchableSelectField
          label="Model"
          name="model"
          value=""
          options={options}
          onValueChange={() => {}}
        />
      </form>
    );
    fireEvent.click(s.getByRole("button", { name: "Model" }));
    fireEvent.change(s.getByRole("combobox"), { target: { value: "arbitrary query" } });
    expect(Array.from(new FormData(s.getByTestId("form") as HTMLFormElement))).toEqual([
      ["model", ""],
    ]);
    s.rerender(
      <form data-testid="form">
        <SearchableSelectField
          label="Model"
          name="model"
          value="provider/first"
          disabled
          options={options}
          onValueChange={() => {}}
        />
      </form>
    );
    expect(Array.from(new FormData(s.getByTestId("form") as HTMLFormElement))).toEqual([]);
  });

  it("first Escape inside actual Modal closes only picker and restores trigger focus", async () => {
    const close = vi.fn();
    const s = render(
      <Modal isOpen onClose={close} title="Edit combo">
        <SearchableSelectField
          label="Model"
          value="provider/first"
          options={options}
          onValueChange={() => {}}
        />
      </Modal>
    );
    const trigger = s.getByRole("button", { name: "Model" });
    fireEvent.click(trigger);
    const search = s.getByRole("combobox");
    expect(search.closest('[data-slot="dialog-content"]')).toBeNull();
    expect(s.getByRole("dialog", { name: "Edit combo" })).toBeTruthy();
    fireEvent.keyDown(search, { key: "Escape" });
    expect(s.queryByRole("combobox")).toBeNull();
    expect(close).not.toHaveBeenCalled();
    await waitFor(() => expect(document.activeElement).toBe(trigger));
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(close).toHaveBeenCalledTimes(1);
  });

  it("portaled options and clear-search Tab order work inside the real modal focus scope", async () => {
    const user = userEvent.setup();
    const close = vi.fn();
    const change = vi.fn();
    const s = render(
      <Modal isOpen onClose={close} title="Edit combo">
        <SearchableSelectField
          label="Model"
          value="provider/first"
          options={options}
          onValueChange={change}
        />
        <button>Next field</button>
      </Modal>
    );
    const trigger = s.getByRole("button", { name: "Model" });
    await user.click(trigger);
    await user.type(s.getByRole("combobox"), "provider/second");
    await user.tab();
    expect(document.activeElement).toBe(s.getByRole("button", { name: /clear search/i }));
    await user.tab();
    expect(s.queryByRole("combobox")).toBeNull();
    expect(document.activeElement).toBe(s.getByRole("button", { name: "Next field" }));
    await user.click(trigger);
    await user.click(s.getByRole("option", { name: "علی کیان Imported" }));
    expect(change).toHaveBeenCalledExactlyOnceWith("provider/second");
    expect(close).not.toHaveBeenCalled();
  });

  it("does not steal focus from a second picker opened immediately after selection", async () => {
    const s = render(
      <Modal isOpen onClose={() => {}} title="Edit combo">
        <SearchableSelectField
          label="Provider"
          value=""
          options={options}
          onValueChange={() => {}}
        />
        <SearchableSelectField label="Model" value="" options={options} onValueChange={() => {}} />
      </Modal>
    );
    fireEvent.click(s.getByRole("button", { name: "Provider" }));
    fireEvent.click(s.getByRole("option", { name: "Renée" }));
    fireEvent.click(s.getByRole("button", { name: "Model" }));
    const input = s.getByRole("combobox");
    fireEvent.change(input, { target: { value: "provider/second" } });
    // Wait for the previous overlay's deferred close-focus callback to run.
    await waitFor(() => expect(document.activeElement).toBe(input));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(s.getByRole("combobox")).toBe(input);
    expect(s.getByRole("option", { name: "علی کیان Imported" })).toBeTruthy();
  });

  it("refreshes privacy-safe index and reset key without losing selection/focus", () => {
    const s = setup({ options: [{ value: "account-1", label: "visible@example.invalid" }] });
    fireEvent.change(s.search, { target: { value: "visible@" } });
    s.rerender(
      <SearchableSelectField
        label="Model"
        value="account-1"
        resetKey="masked"
        options={[{ value: "account-1", label: "v***" }]}
        onValueChange={s.onValueChange}
      />
    );
    expect(s.search.value).toBe("");
    expect(document.activeElement).toBe(s.search);
    fireEvent.change(s.search, { target: { value: "visible@" } });
    expect(s.queryAllByRole("option")).toHaveLength(0);
    expect(s.onValueChange).not.toHaveBeenCalled();
  });

  it("Tab and outside pointer dismiss without committing or trapping focus", async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const s = render(
      <>
        <SearchableSelectField label="Model" value="" options={options} onValueChange={change} />
        <button>After</button>
      </>
    );
    const trigger = s.getByRole("button", { name: "Model" });
    await user.click(trigger);
    await user.tab();
    expect(s.queryByRole("combobox")).toBeNull();
    expect(change).not.toHaveBeenCalled();
    await user.click(trigger);
    await user.click(s.getByRole("button", { name: "After" }));
    expect(s.queryByRole("combobox")).toBeNull();
    expect(document.activeElement).toBe(s.getByRole("button", { name: "After" }));
    expect(change).not.toHaveBeenCalled();
  });

  it("filters all 5000 choices and selects the final exact ID", () => {
    const s = setup({
      options: Array.from({ length: 5000 }, (_, i) => ({
        value: `model/${i}`,
        label: `Model ${i}`,
      })),
    });
    fireEvent.change(s.search, { target: { value: "model/4999" } });
    expect(s.getAllByRole("option")).toHaveLength(1);
    fireEvent.keyDown(s.search, { key: "Enter" });
    expect(s.onValueChange).toHaveBeenCalledExactlyOnceWith("model/4999");
  });

  it("renders malicious labels inertly and gives instances unique list IDs", () => {
    const s = render(
      <>
        <SearchableSelectField
          label="First"
          value="x"
          options={[{ value: "x", label: '<img src=x onerror="alert(1)">' }]}
          onValueChange={() => {}}
        />
        <SearchableSelectField label="Second" value="" options={options} onValueChange={() => {}} />
      </>
    );
    fireEvent.click(s.getByRole("button", { name: "First" }));
    const first = s.getByRole("combobox").getAttribute("aria-controls");
    expect(s.container.querySelector("img")).toBeNull();
    fireEvent.keyDown(s.getByRole("combobox"), { key: "Escape" });
    fireEvent.click(s.getByRole("button", { name: "Second" }));
    expect(s.getByRole("combobox").getAttribute("aria-controls")).not.toBe(first);
  });
});
