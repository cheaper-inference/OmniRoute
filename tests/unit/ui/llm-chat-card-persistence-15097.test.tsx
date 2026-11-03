// @vitest-environment jsdom
//
// #15097 — the provider test playground conversation must survive the card being
// unmounted (Test ↔ Logs, closing the slide-over) and must stay bound to the selected key.
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/(dashboard)/dashboard/providers/hooks/useApiKey", () => ({
  useApiKey: () => ({ keys: [], apiKey: "", setApiKey: () => {}, loading: false }),
}));
vi.mock("@/app/(dashboard)/dashboard/providers/hooks/useProviderModels", () => ({
  useProviderModels: () => ({
    models: [{ id: "m1" }],
    loading: false,
    error: null,
    retry: () => {},
  }),
}));

const { LlmChatCard } =
  await import("../../../src/app/(dashboard)/dashboard/media-providers/components/LlmChatCard");
const {
  loadPlaygroundMessages,
  playgroundMessagesStorageKey,
  sanitizePlaygroundMessages,
  savePlaygroundMessages,
} =
  await import("../../../src/app/(dashboard)/dashboard/media-providers/components/llmChatStorage");

const KEY_A = playgroundMessagesStorageKey("prov", "");
const KEY_B = playgroundMessagesStorageKey("prov", "sk-abc****xyz");

const SEEDED = [
  { role: "user", content: "hello there" },
  { role: "assistant", content: "general kenobi", model: "prov/m1" },
];

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  window.localStorage.clear();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  window.localStorage.clear();
  vi.restoreAllMocks();
});

function mount(props: { selectedKey?: string } = {}) {
  act(() => {
    root.render(<LlmChatCard providerId="prov" {...props} />);
  });
}

describe("LlmChatCard conversation persistence (#15097)", () => {
  it("restores the saved conversation after unmount → remount", () => {
    window.localStorage.setItem(KEY_A, JSON.stringify(SEEDED));
    mount();
    expect(container.textContent).toContain("hello there");
    expect(container.textContent).toContain("general kenobi");

    act(() => root.unmount());
    root = createRoot(container);
    mount();
    expect(container.textContent).toContain("hello there");
    expect(container.textContent).toContain("general kenobi");
    // mount must not wipe what was stored
    expect(JSON.parse(window.localStorage.getItem(KEY_A) as string)).toEqual(SEEDED);
  });

  it("reloads the messages of the new key instead of copying them across keys", () => {
    window.localStorage.setItem(KEY_A, JSON.stringify(SEEDED));
    mount({ selectedKey: "" });
    expect(container.textContent).toContain("hello there");

    mount({ selectedKey: "sk-abc****xyz" });
    expect(container.textContent).not.toContain("hello there");
    expect(window.localStorage.getItem(KEY_B)).toBeNull();
    expect(JSON.parse(window.localStorage.getItem(KEY_A) as string)).toEqual(SEEDED);

    mount({ selectedKey: "" });
    expect(container.textContent).toContain("hello there");
  });

  it("Clear empties the stored conversation", () => {
    window.localStorage.setItem(KEY_A, JSON.stringify(SEEDED));
    mount();
    const clear = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "Clear"
    );
    expect(clear).toBeTruthy();
    act(() => clear!.click());
    expect(container.textContent).not.toContain("hello there");
    expect(window.localStorage.getItem(KEY_A)).toBeNull();
  });

  it("ignores corrupted storage (non-array / invalid JSON) without crashing", () => {
    window.localStorage.setItem(KEY_A, JSON.stringify({ not: "an array" }));
    expect(() => mount()).not.toThrow();
    act(() => root.unmount());
    root = createRoot(container);
    window.localStorage.setItem(KEY_A, "{not json");
    expect(() => mount()).not.toThrow();
  });

  it("does not crash when localStorage.setItem throws (quota / blocked)", () => {
    window.localStorage.setItem(KEY_A, JSON.stringify(SEEDED));
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("full", "QuotaExceededError");
    });
    mount();
    // Clear → persist path runs; with a throwing setItem the panel must stay alive.
    const clear = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "Clear"
    );
    expect(() => act(() => clear!.click())).not.toThrow();
  });

  it("does not persist while streaming and drops the empty assistant placeholder", async () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    // A response that never produces a token until aborted.
    vi.stubGlobal(
      "fetch",
      vi.fn(
        (_url: string, init?: RequestInit) =>
          new Promise((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () =>
              reject(Object.assign(new Error("aborted"), { name: "AbortError" }))
            );
          })
      )
    );
    mount();
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      "value"
    )?.set;
    await act(async () => {
      setter?.call(textarea, "ping");
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await act(async () => {
      textarea.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true })
      );
    });
    // streaming in flight: nothing written for the in-progress turn
    expect(setItem).not.toHaveBeenCalled();

    // unmount mid-stream (switch to Logs): the user turn is kept, the empty placeholder is not
    act(() => root.unmount());
    root = createRoot(container);
    const stored = JSON.parse(window.localStorage.getItem(KEY_A) as string);
    expect(stored).toEqual([{ role: "user", content: "ping" }]);
    vi.unstubAllGlobals();
  });
});

describe("llmChatStorage helpers", () => {
  it("sanitizePlaygroundMessages validates shape and drops empty assistant turns", () => {
    expect(sanitizePlaygroundMessages("nope")).toEqual([]);
    expect(sanitizePlaygroundMessages({})).toEqual([]);
    expect(
      sanitizePlaygroundMessages([
        { role: "user", content: "a" },
        { role: "assistant", content: "" },
        { role: "system", content: "x" },
        { role: "user", content: 5 },
        null,
        { role: "assistant", content: "b", model: "p/m" },
      ])
    ).toEqual([
      { role: "user", content: "a" },
      { role: "assistant", content: "b", model: "p/m" },
    ]);
  });

  it("savePlaygroundMessages swallows storage errors and removes the key when empty", () => {
    savePlaygroundMessages(KEY_A, SEEDED);
    expect(loadPlaygroundMessages(KEY_A)).toEqual(SEEDED);
    savePlaygroundMessages(KEY_A, []);
    expect(window.localStorage.getItem(KEY_A)).toBeNull();
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(() => savePlaygroundMessages(KEY_A, SEEDED)).not.toThrow();
  });
});
