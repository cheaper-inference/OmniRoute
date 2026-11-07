// @vitest-environment jsdom
//
// #6540 — ModelSelectField renders the hidePaid-filtered `/api/models` catalog
// as a <select>, preserves an off-catalog saved value via a "(custom)" option
// instead of silently dropping it, and falls back to a plain text input when
// the fetch fails so the field never becomes unusable.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, afterEach } from "vitest";
// The shared Select renders the kit (Radix) Select for `options` since KEA-7886: no DOM
// <select>/<option>; the helpers read the menu items (data-value) and the controlled value.
import { kitSelectOptions, kitSelectTriggers, kitSelectValue } from "../../helpers/kitSelect";

const { default: ModelSelectField } =
  await import("../../../src/shared/components/ModelSelectField");

function okJson(data: unknown) {
  return Promise.resolve({ ok: true, json: () => Promise.resolve(data) } as Response);
}

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render(el: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(el);
  });
  containers.push({ root, el: container });
  return container;
}

async function waitFor(fn: () => boolean, timeoutMs = 2000) {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeoutMs) throw new Error("waitFor timed out");
    await new Promise((r) => setTimeout(r, 20));
  }
}

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
});

describe("ModelSelectField (#6540)", () => {
  it("renders a <select> populated from the fetched /api/models catalog", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        okJson({
          models: [
            { provider: "openrouter", model: "auto", fullModel: "openrouter/auto" },
            { provider: "openai", model: "gpt-5", fullModel: "openai/gpt-5" },
          ],
        })
      )
    );

    const el = render(<ModelSelectField value="" onChange={() => {}} />);
    const select = () => el.querySelector<HTMLButtonElement>("[data-slot=select-trigger]");
    // the picker is disabled while the catalog loads
    await waitFor(() => !!select() && !select()!.disabled);

    const optionValues = kitSelectOptions(select()!).map((o) => o.value);
    expect(optionValues).toContain("openrouter/auto");
    expect(optionValues).toContain("openai/gpt-5");
  });

  it('injects a "(custom)" option and keeps it selected when value is off-catalog', async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        okJson({
          models: [{ provider: "openrouter", model: "auto", fullModel: "openrouter/auto" }],
        })
      )
    );

    const el = render(<ModelSelectField value="legacy/deprecated-model" onChange={() => {}} />);
    const select = () => el.querySelector<HTMLButtonElement>("[data-slot=select-trigger]");
    await waitFor(() => !!select() && !select()!.disabled);

    const options = kitSelectOptions(select()!).map((o) => o.value);
    expect(options).toContain("legacy/deprecated-model");
    expect(kitSelectValue(select()!)).toBe("legacy/deprecated-model");
    expect(select()!.textContent).toContain("legacy/deprecated-model");
  });

  it("falls back to a text input when the /api/models fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("network error")))
    );

    const el = render(<ModelSelectField value="some-value" onChange={() => {}} />);
    await waitFor(() => el.querySelector("input") !== null);

    expect(el.querySelector("select")).toBeNull();
    expect(kitSelectTriggers(el)).toHaveLength(0);
    expect((el.querySelector("input") as HTMLInputElement).value).toBe("some-value");
  });
});
