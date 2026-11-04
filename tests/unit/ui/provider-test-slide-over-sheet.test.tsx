// @vitest-environment jsdom
// ProviderTestSlideOver on the real kit Sheet (Radix Dialog), KEA-7886 lote 7: a named dialog, the
// test/logs tabs, Escape → onClose, and focus back on the opener once the parent drops the panel.
import React, { useState } from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => {
  const t = Object.assign((key: string) => key, { rich: (key: string) => key, has: () => true });
  return { useTranslations: () => t };
});
vi.mock("next/image", () => ({
  default: ({ alt }: { alt?: string }) => <span data-testid="next-image">{alt}</span>,
}));
vi.mock("@/app/(dashboard)/dashboard/media-providers/components/LlmChatCard", () => ({
  LlmChatCard: () => <div data-testid="llm-chat-card" />,
}));
vi.mock("@/shared/components/ProviderIcon", () => ({ default: () => <span /> }));
vi.mock("@/app/(dashboard)/dashboard/providers/hooks/useApiKey", () => ({
  useApiKey: () => ({ keys: [] }),
}));
vi.mock("@/app/(dashboard)/dashboard/providers/hooks/useProviderModels", () => ({
  useProviderModels: () => ({ models: [{ id: "model-a" }] }),
}));

const { default: ProviderTestSlideOver } =
  await import("@/shared/components/ProviderTestSlideOver");

function Harness({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open tester
      </button>
      <ProviderTestSlideOver
        isOpen={open}
        onClose={() => {
          onClose();
          setOpen(false);
        }}
        providerId="openai"
        provider={{ name: "OpenAI" }}
      />
    </>
  );
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify({ logs: [] }), { status: 200 }))
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("ProviderTestSlideOver (kit Sheet)", () => {
  it("opens a named dialog, switches tabs, closes on Escape and refocuses the opener", async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);

    const opener = screen.getByRole("button", { name: "Open tester" });
    opener.focus();
    fireEvent.click(opener);

    const dialog = await screen.findByRole("dialog", { name: "dialogLabel" });
    expect(screen.getByTestId("llm-chat-card")).toBeTruthy();
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));

    const logsTab = screen.getByRole("tab", { name: /tabs\.logs/ });
    fireEvent.click(logsTab);
    await waitFor(() => expect(logsTab.getAttribute("aria-selected")).toBe("true"));
    expect(screen.queryByTestId("llm-chat-card")).toBeNull();

    fireEvent.keyDown(dialog, { key: "Escape" });
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(opener));
  });
});
