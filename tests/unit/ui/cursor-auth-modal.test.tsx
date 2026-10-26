// @vitest-environment jsdom
// Cursor / Trae / Kiro auth modals on the kit Modal adapter (KEA-7886, lote 7): labelled fields, error tone,
// a named dialog and Escape-to-close. The translator mock returns the key, so labels read as their i18n keys.
import React from "react";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => {
  const t = Object.assign((key: string) => key, {
    rich: (key: string) => key,
    has: () => true,
  });
  return { useTranslations: () => t };
});

const { default: CursorAuthModal } = await import("@/shared/components/CursorAuthModal");
const { default: TraeAuthModal } = await import("@/shared/components/TraeAuthModal");
const { default: KiroAuthModal } = await import("@/shared/components/KiroAuthModal");

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("CursorAuthModal", () => {
  function stubFetch(importStatus = 400) {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/auto-import")) return jsonResponse({ found: false });
      if (url.includes("/import")) {
        return jsonResponse({ error: "Token rejected by Cursor" }, importStatus);
      }
      return jsonResponse({});
    });
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
  }

  it("renders a named dialog and wires the import-tab labels to their fields", async () => {
    stubFetch();
    render(<CursorAuthModal isOpen onClose={vi.fn()} />);

    const dialog = await screen.findByRole("dialog", { name: "title" });
    expect(dialog).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "tabImport" }));

    // Field htmlFor ↔ Textarea id (useId): the label resolves to the textarea itself.
    const access = screen.getByLabelText(/accessToken/);
    expect(access.tagName).toBe("TEXTAREA");
    const refresh = screen.getByLabelText(/refreshToken/);
    expect(refresh.tagName).toBe("TEXTAREA");
    expect(refresh).not.toBe(access);
    const machine = screen.getByLabelText(/machineId/);
    expect(machine.tagName).toBe("INPUT");
  });

  it("shows an import failure in the error tone", async () => {
    const fetchMock = stubFetch(400);
    render(<CursorAuthModal isOpen onClose={vi.fn()} />);
    await screen.findByRole("dialog", { name: "title" });
    fireEvent.click(screen.getByRole("button", { name: "tabImport" }));

    const importButton = screen.getByRole("button", { name: "importToken" });
    expect((importButton as HTMLButtonElement).disabled).toBe(true);

    fireEvent.change(screen.getByLabelText(/accessToken/), { target: { value: "tok_123" } });
    expect((importButton as HTMLButtonElement).disabled).toBe(false);
    await act(async () => {
      fireEvent.click(importButton);
    });

    const message = await screen.findByText("Token rejected by Cursor");
    expect(message.className).toMatch(/\btext-error\b/);
    expect(message.parentElement?.className).toMatch(/\bbg-error\/10\b/);
    expect(fetchMock.mock.calls.some(([u]) => String(u) === "/api/oauth/cursor/import")).toBe(true);
  });

  it("closes on Escape", async () => {
    stubFetch();
    const onClose = vi.fn();
    render(<CursorAuthModal isOpen onClose={onClose} />);
    const dialog = await screen.findByRole("dialog", { name: "title" });

    fireEvent.keyDown(dialog, { key: "Escape" });
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });
});

describe("TraeAuthModal", () => {
  it("renders a named dialog with the access token labelled and closes on Escape", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => jsonResponse({}))
    );
    const onClose = vi.fn();
    render(<TraeAuthModal isOpen onClose={onClose} />);
    const dialog = await screen.findByRole("dialog", { name: "title" });

    expect(screen.getByLabelText(/accessTokenLabel/).tagName).toBe("TEXTAREA");
    expect(screen.getByLabelText("scope").tagName).toBe("INPUT");

    fireEvent.keyDown(dialog, { key: "Escape" });
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });
});

describe("KiroAuthModal", () => {
  it("renders the method rows as card-shaped outline buttons in a named dialog", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => jsonResponse({}))
    );
    render(<KiroAuthModal isOpen onMethodSelect={vi.fn()} onClose={vi.fn()} />);
    const dialog = await screen.findByRole("dialog", { name: "title" });

    const rows = Array.from(
      dialog.querySelectorAll<HTMLButtonElement>("button.ci-button--outline")
    );
    expect(rows.length).toBeGreaterThanOrEqual(4);
    for (const row of rows) expect(row.className).toMatch(/\brounded-card\b/);
  });
});
