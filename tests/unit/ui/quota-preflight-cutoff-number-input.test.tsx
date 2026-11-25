// @vitest-environment jsdom
// Kit NumberInput adoption: the Quota Preflight cutoff used to PATCH on every keystroke (the
// local NumberField called `save` from onChange). It now follows the typing locally and saves
// once when the edit ends, with the value already inside 0–99.
import React from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import QuotaPreflightCard from "@/app/(dashboard)/dashboard/settings/components/QuotaPreflightCard";

type Preflight = { enabled: boolean; defaultThresholdPercent: number };

let saved: Preflight;
let failPatch: boolean;
let fetchMock: ReturnType<typeof vi.fn>;

const json = (status: number, body: unknown) =>
  ({ ok: status < 400, status, json: async () => body }) as Response;

beforeEach(() => {
  saved = { enabled: true, defaultThresholdPercent: 2 };
  failPatch = false;
  fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
    if (init?.method !== "PATCH") return json(200, { quotaPreflight: saved });
    if (failPatch) return json(500, { error: "boom" });
    saved = { ...saved, ...(JSON.parse(String(init.body)).quotaPreflight as Partial<Preflight>) };
    return json(200, { quotaPreflight: saved });
  });
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const patches = () =>
  fetchMock.mock.calls
    .filter(([, init]) => (init as RequestInit | undefined)?.method === "PATCH")
    .map(([, init]) => JSON.parse(String((init as RequestInit).body)).quotaPreflight);

async function renderCutoff() {
  const view = render(<QuotaPreflightCard />);
  const input = (await view.findByRole("textbox", {
    name: "Global cutoff (min remaining %)",
  })) as HTMLInputElement;
  return { ...view, input };
}

const type = (input: HTMLInputElement, value: string) =>
  fireEvent.change(input, { target: { value } });

describe("QuotaPreflightCard cutoff on the NumberInput adapter", () => {
  it("is a named kit number field with the % unit inside it", async () => {
    const { input, container } = await renderCutoff();
    expect(input.className).toContain("ci-number-input");
    expect(input.value).toBe("2");
    expect(container.querySelector(".ci-number-input__unit")?.textContent).toBe("%");
  });

  it("does not save while typing and saves once when the field is left", async () => {
    const { input } = await renderCutoff();
    type(input, "5");
    type(input, "50");
    expect(input.value).toBe("50");
    expect(patches()).toEqual([]);
    fireEvent.blur(input);
    await waitFor(() => expect(patches()).toEqual([{ defaultThresholdPercent: 50 }]));
    await waitFor(() => expect(input.value).toBe("50"));
  });

  it("brings a value above the cap to 99 before saving", async () => {
    const { input } = await renderCutoff();
    type(input, "150");
    fireEvent.keyDown(input, { key: "Enter" });
    await waitFor(() => expect(patches()).toEqual([{ defaultThresholdPercent: 99 }]));
    expect(input.value).toBe("99");
  });

  it("an emptied field saves nothing and shows the saved cutoff again", async () => {
    const { input } = await renderCutoff();
    type(input, "");
    expect(input.value).toBe("");
    fireEvent.blur(input);
    await waitFor(() => expect(input.value).toBe("2"));
    expect(patches()).toEqual([]);
  });

  it("goes back to the saved cutoff when the save fails", async () => {
    // The card lets a failed save reject (as before); keep the rejection out of the run.
    const swallow = (event: PromiseRejectionEvent) => event.preventDefault();
    const onNodeRejection = () => {};
    window.addEventListener("unhandledrejection", swallow);
    process.on("unhandledRejection", onNodeRejection);
    try {
      failPatch = true;
      const { input } = await renderCutoff();
      type(input, "40");
      fireEvent.blur(input);
      await waitFor(() => expect(patches()).toEqual([{ defaultThresholdPercent: 40 }]));
      await waitFor(() => expect(input.value).toBe("2"));
    } finally {
      window.removeEventListener("unhandledrejection", swallow);
      process.off("unhandledRejection", onNodeRejection);
    }
  });
});
