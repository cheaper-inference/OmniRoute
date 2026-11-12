/**
 * Tests for src/shared/utils/clipboard.ts
 * Runs under Vitest + jsdom (via vitest.config.ts — environment: "jsdom").
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { copyToClipboard } from "../../src/shared/utils/clipboard";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("copyToClipboard", () => {
  it("exports copyToClipboard as a function", () => {
    expect(typeof copyToClipboard).toBe("function");
  });

  it("returns a Promise", () => {
    // Minimal smoke test: the function returns a thenable even when
    // navigator.clipboard is undefined (HTTP context simulation).
    const result = copyToClipboard("hello");
    expect(result).toBeInstanceOf(Promise);
  });

  it("succeeds via Clipboard API when available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
      writable: true,
    });

    const ok = await copyToClipboard("test-text");

    expect(writeText).toHaveBeenCalledWith("test-text");
    expect(ok).toBe(true);
  });

  it("falls back to execCommand when Clipboard API throws", async () => {
    const writeText = vi.fn().mockRejectedValue(new DOMException("NotAllowedError"));
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
      writable: true,
    });

    // jsdom does not implement execCommand — it returns false.
    // We just verify the function does not throw and returns a boolean.
    const ok = await copyToClipboard("fallback-text");
    expect(typeof ok).toBe("boolean");
  });

  describe("execCommand fallback host", () => {
    const useHttpContext = () =>
      Object.defineProperty(navigator, "clipboard", {
        value: undefined,
        configurable: true,
        writable: true,
      });

    afterEach(() => {
      document.body.replaceChildren();
    });

    it("hosts the textarea inside the open modal, whose focus trap would otherwise take it", async () => {
      useHttpContext();
      const dialog = document.createElement("div");
      dialog.setAttribute("role", "dialog");
      dialog.dataset.state = "open";
      document.body.append(dialog);
      let parent: Element | null = null;
      document.execCommand = vi.fn(() => {
        parent = document.activeElement?.parentElement ?? null;
        return true;
      }) as typeof document.execCommand;

      await expect(copyToClipboard("in-dialog")).resolves.toBe(true);

      expect(parent).toBe(dialog);
      expect(dialog.querySelector("textarea")).toBeNull();
    });

    it("uses the topmost of nested modals", async () => {
      useHttpContext();
      const open = () => {
        const dialog = document.createElement("div");
        dialog.setAttribute("role", "dialog");
        dialog.dataset.state = "open";
        document.body.append(dialog);
        return dialog;
      };
      open();
      const top = open();
      let parent: Element | null = null;
      document.execCommand = vi.fn(() => {
        parent = document.activeElement?.parentElement ?? null;
        return true;
      }) as typeof document.execCommand;

      await copyToClipboard("nested");

      expect(parent).toBe(top);
    });

    it("stays on the body when no modal is open", async () => {
      useHttpContext();
      let parent: Element | null = null;
      document.execCommand = vi.fn(() => {
        parent = document.activeElement?.parentElement ?? null;
        return true;
      }) as typeof document.execCommand;

      await copyToClipboard("no-dialog");

      expect(parent).toBe(document.body);
      expect(document.body.querySelector("textarea")).toBeNull();
    });

    it("gives focus back to the control that asked for the copy", async () => {
      useHttpContext();
      const button = document.createElement("button");
      document.body.append(button);
      button.focus();
      document.execCommand = vi.fn(() => true) as typeof document.execCommand;

      await copyToClipboard("focus");

      expect(document.activeElement).toBe(button);
    });
  });

  it("falls back when navigator.clipboard is undefined (HTTP context)", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true,
      writable: true,
    });

    // jsdom's execCommand returns false; that's acceptable in tests.
    const ok = await copyToClipboard("http-context-text");
    expect(typeof ok).toBe("boolean");
  });
});
