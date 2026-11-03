// @vitest-environment jsdom
import React from "react";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import CompressionPanel from "../../../src/app/(dashboard)/dashboard/context/settings/CompressionPanel";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

async function openPanel() {
  const answers: Array<(status: number) => void> = [];
  vi.spyOn(globalThis, "fetch").mockImplementation(async (input, init) => {
    const url = String(input);
    if (init?.method === "PUT") {
      return new Promise<Response>((resolve) => {
        answers.push((status) => resolve(new Response("{}", { status })));
      });
    }
    return new Response(
      JSON.stringify(
        url.endsWith("/compression")
          ? { enabled: true, engines: {}, autoTriggerTokens: 0 }
          : url.endsWith("/mcp-accessibility")
            ? { enabled: true }
            : { combos: [] }
      )
    );
  });
  const panel = render(<CompressionPanel />);
  await act(async () => {});
  const input = panel.container.querySelector('input[type="number"]');
  expect(input).not.toBeNull();
  const save = async (value: string) => {
    fireEvent.change(input!, { target: { value } });
    fireEvent.keyDown(input!, { key: "Enter" });
    await act(async () => {});
  };
  const answer = async (index: number, status = 200) => {
    await act(async () => answers[index](status));
  };
  return { ...panel, save, answer };
}

it("releases the saved-status timer when the settings panel unmounts", async () => {
  const panel = await openPanel();
  await panel.save("500");
  await panel.answer(0);
  expect(panel.container.textContent).toContain("saved");
  await act(async () => {
    vi.advanceTimersByTime(0);
  });
  expect(vi.getTimerCount()).toBeGreaterThan(0);
  panel.unmount();
  await act(async () => {
    vi.advanceTimersByTime(0);
  });
  expect(vi.getTimerCount()).toBe(0);
});

it("does not schedule UI work when a pending save completes after unmount", async () => {
  const panel = await openPanel();
  await panel.save("500");
  panel.unmount();
  await act(async () => {
    vi.advanceTimersByTime(0);
  });
  expect(vi.getTimerCount()).toBe(0);
  await panel.answer(0);
  await act(async () => {
    vi.advanceTimersByTime(0);
  });
  expect(vi.getTimerCount()).toBe(0);
});

it("keeps only the latest saved message deadline across consecutive saves", async () => {
  const panel = await openPanel();
  await panel.save("500");
  await panel.answer(0);
  await act(async () => {
    vi.advanceTimersByTime(1000);
  });
  await panel.save("700");
  await panel.answer(1);
  await act(async () => {
    vi.advanceTimersByTime(0);
  });
  expect(vi.getTimerCount()).toBe(1);
  await act(async () => {
    vi.advanceTimersByTime(1000);
  });
  expect(panel.container.textContent).toContain("saved");
  await act(async () => {
    vi.advanceTimersByTime(1000);
  });
  expect(panel.container.textContent).not.toContain("saved");
  panel.unmount();
  expect(vi.getTimerCount()).toBe(0);
});
