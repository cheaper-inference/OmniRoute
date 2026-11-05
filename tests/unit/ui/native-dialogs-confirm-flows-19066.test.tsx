// @vitest-environment jsdom
//
// #19066 block 3: destructive dashboard actions ask through the kit confirm dialog
// (`useConfirmDialog()` → `ConfirmModal`) instead of the native `confirm()`. The action must
// run only after Confirm; Cancel must do nothing. The next-intl mock from the vitest UI setup
// renders the real en.json copy, so the dialog is queried by its production labels.
import React, { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import messages from "../../../src/i18n/messages/en.json";
import { useConfirmDialog } from "../../../src/shared/hooks/useConfirmDialog";

const { default: ApiManagerPageClient } =
  await import("../../../src/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient");
const { default: PricingTab } =
  await import("../../../src/app/(dashboard)/dashboard/settings/components/PricingTab");

type FetchCall = { url: string; method: string };

function jsonResponse(body: unknown, ok = true) {
  return { ok, status: ok ? 200 : 500, json: async () => body, text: async () => "" };
}

function installFetch(routes: Record<string, unknown>): FetchCall[] {
  const calls: FetchCall[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string, init?: RequestInit) => {
      const url = String(input);
      const method = init?.method ?? "GET";
      calls.push({ url, method });
      if (method === "GET" && url in routes) return jsonResponse(routes[url]);
      return jsonResponse({});
    })
  );
  return calls;
}

function confirmDialog() {
  return screen.getByRole("dialog", { name: messages.common.confirmTitle });
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("useConfirmDialog", () => {
  function Probe({ onResult }: { onResult: (ok: boolean) => void }) {
    const { requestConfirm, confirmDialog } = useConfirmDialog();
    const [shown, setShown] = useState(true);
    return (
      <div>
        <button onClick={async () => onResult(await requestConfirm("Delete it?"))}>ask</button>
        <button onClick={() => setShown(false)}>hide</button>
        {shown && confirmDialog}
      </div>
    );
  }

  it("resolves true on Confirm and false on Cancel", async () => {
    const onResult = vi.fn();
    render(<Probe onResult={onResult} />);

    fireEvent.click(screen.getByText("ask"));
    expect(within(confirmDialog()).getByText("Delete it?")).toBeDefined();
    fireEvent.click(
      within(confirmDialog()).getByRole("button", { name: messages.common.confirmAction })
    );
    await waitFor(() => expect(onResult).toHaveBeenLastCalledWith(true));

    fireEvent.click(screen.getByText("ask"));
    fireEvent.click(within(confirmDialog()).getByRole("button", { name: messages.common.cancel }));
    await waitFor(() => expect(onResult).toHaveBeenLastCalledWith(false));
    expect(onResult).toHaveBeenCalledTimes(2);
    await waitFor(() => expect(screen.queryByText("Delete it?")).toBeNull());
  });

  it("resolves false when the component unmounts with the dialog open", async () => {
    const onResult = vi.fn();
    const { unmount } = render(<Probe onResult={onResult} />);
    fireEvent.click(screen.getByText("ask"));
    unmount();
    await waitFor(() => expect(onResult).toHaveBeenCalledWith(false));
  });
});

describe("API key delete (ApiManagerPageClient)", () => {
  const keys = [
    {
      id: "key_1",
      name: "Prod key",
      key: "sk-test-abc123",
      isActive: true,
      createdAt: "2026-01-01T00:00:00.000Z",
    },
  ];

  async function openDeleteConfirm() {
    const calls = installFetch({ "/api/keys": { keys } });
    render(<ApiManagerPageClient />);
    const deleteButton = await screen.findByRole("button", { name: messages.apiManager.deleteKey });
    fireEvent.click(deleteButton);
    expect(within(confirmDialog()).getByText(messages.apiManager.deleteConfirm)).toBeDefined();
    return calls;
  }

  const deletes = (calls: FetchCall[]) => calls.filter((c) => c.method === "DELETE");

  it("deletes only after Confirm", async () => {
    const calls = await openDeleteConfirm();
    expect(deletes(calls)).toHaveLength(0);

    fireEvent.click(within(confirmDialog()).getByRole("button", { name: messages.common.delete }));
    await waitFor(() =>
      expect(deletes(calls)).toEqual([{ url: "/api/keys/key_1", method: "DELETE" }])
    );
  });

  it("does nothing on Cancel", async () => {
    const calls = await openDeleteConfirm();
    fireEvent.click(within(confirmDialog()).getByRole("button", { name: messages.common.cancel }));
    await waitFor(() => expect(screen.queryByText(messages.apiManager.deleteConfirm)).toBeNull());
    expect(deletes(calls)).toHaveLength(0);
    expect(screen.getByText("Prod key")).toBeDefined();
  });
});

describe("pricing reset (PricingTab)", () => {
  const routes = {
    "/api/pricing/models": {
      openai: {
        id: "openai",
        alias: "openai",
        authType: "apikey",
        format: "openai",
        modelCount: 1,
        models: [{ id: "gpt-x", name: "gpt-x" }],
      },
    },
    "/api/pricing?includeSources=1": {
      pricing: { openai: { "gpt-x": { input: 1, output: 2 } } },
      sourceMap: { openai: { "gpt-x": "user" } },
    },
    "/api/pricing/sync": {
      enabled: false,
      lastSync: null,
      lastSyncModelCount: 0,
      nextSync: null,
      intervalMs: 0,
      sources: [],
    },
  };
  const resetMessage = messages.settings.resetPricingConfirm.replace("{provider}", "OPENAI");

  async function openResetConfirm() {
    const calls = installFetch(routes);
    render(<PricingTab />);
    fireEvent.click(await screen.findByText("(OPENAI)"));
    fireEvent.click(await screen.findByRole("button", { name: messages.settings.resetDefaults }));
    expect(within(confirmDialog()).getByText(resetMessage)).toBeDefined();
    return calls;
  }

  const resets = (calls: FetchCall[]) =>
    calls.filter((c) => c.method === "DELETE" && c.url.startsWith("/api/pricing?"));

  it("resets only after Confirm", async () => {
    const calls = await openResetConfirm();
    expect(resets(calls)).toHaveLength(0);

    fireEvent.click(
      within(confirmDialog()).getByRole("button", { name: messages.common.confirmAction })
    );
    await waitFor(() =>
      expect(resets(calls)).toEqual([{ url: "/api/pricing?provider=openai", method: "DELETE" }])
    );
  });

  it("does nothing on Cancel", async () => {
    const calls = await openResetConfirm();
    fireEvent.click(within(confirmDialog()).getByRole("button", { name: messages.common.cancel }));
    await waitFor(() => expect(screen.queryByText(resetMessage)).toBeNull());
    expect(resets(calls)).toHaveLength(0);
  });
});
