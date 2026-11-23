// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import QdrantConfigCard from "@/app/(dashboard)/dashboard/memory/components/QdrantConfigCard";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const settings = {
  enabled: false,
  host: "http://127.0.0.1",
  port: 6333,
  collection: "omniroute_memory",
  embeddingModel: "openai/text-embedding-3-small",
  hasApiKey: false,
  apiKeyMasked: null,
};

let container: HTMLDivElement;
let root: Root | undefined;

async function mountCard() {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => root?.render(<QdrantConfigCard />));
}

async function saveSettings() {
  const button = Array.from(container.querySelectorAll("button")).find(
    (candidate) => candidate.textContent === "save"
  );
  expect(button).toBeDefined();
  await act(async () => button?.click());
}

async function unmountCard() {
  await act(async () => root?.unmount());
  root = undefined;
}

describe("Qdrant save notification lifecycle", () => {
  beforeEach(() => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => ({
        ok: true,
        json: async () =>
          url.endsWith("embedding-models")
            ? { models: [] }
            : url.endsWith("health")
              ? { ok: true, latencyMs: 1 }
              : settings,
      }))
    );
  });

  afterEach(async () => {
    await unmountCard();
    container?.remove();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("releases the save notification timer when leaving the card", async () => {
    await mountCard();
    await saveSettings();
    expect(container.textContent).toContain("qdrant.saved");
    expect(vi.getTimerCount()).toBe(1);

    await unmountCard();

    expect(vi.getTimerCount()).toBe(0);
  });

  it("keeps the latest saved notice visible for its own full interval", async () => {
    await mountCard();
    await saveSettings();
    await act(async () => vi.advanceTimersByTime(1000));
    await saveSettings();

    await act(async () => vi.advanceTimersByTime(1000));
    expect(container.textContent).toContain("qdrant.saved");
    await act(async () => vi.advanceTimersByTime(999));
    expect(container.textContent).toContain("qdrant.saved");
    await act(async () => vi.advanceTimersByTime(1));
    expect(container.textContent).not.toContain("qdrant.saved");
    expect(vi.getTimerCount()).toBe(0);
  });

  it("does not schedule a timer or health request when a save finishes after unmount", async () => {
    await mountCard();
    let finishSave: (response: Response) => void = () => {
      throw new Error("The save request was not started");
    };
    vi.mocked(fetch).mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          finishSave = resolve;
        })
    );
    await saveSettings();
    expect(container.textContent).toContain("saving");
    const requestsBeforeUnmount = vi.mocked(fetch).mock.calls.length;

    await unmountCard();
    await act(async () => finishSave(Response.json(settings)));

    expect(vi.getTimerCount()).toBe(0);
    expect(fetch).toHaveBeenCalledTimes(requestsBeforeUnmount);
  });

  it("does not let an earlier success dismiss a later save error", async () => {
    await mountCard();
    await saveSettings();
    await act(async () => vi.advanceTimersByTime(1000));
    vi.mocked(fetch).mockResolvedValueOnce(Response.json({}, { status: 500 }));

    await saveSettings();
    expect(container.textContent).toContain("qdrant.saveError");
    await act(async () => vi.advanceTimersByTime(2000));

    expect(container.textContent).toContain("qdrant.saveError");
    expect(vi.getTimerCount()).toBe(0);
  });
});
