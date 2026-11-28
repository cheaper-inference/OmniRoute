// @vitest-environment jsdom
import React, { useState } from "react";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useTranslations } from "next-intl";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { AddWebhookWizard } from "@/app/(dashboard)/dashboard/webhooks/components/AddWebhookWizard";
import type { WebhookItem } from "@/app/(dashboard)/dashboard/webhooks/components/WebhookCard";

const endpoint = "https://example.com/events";
const draftPath = "/api/webhooks/draft-id";
const draftResponse = () => Response.json({ webhook: { id: "draft-id" } }, { status: 201 });
const fetchMock = vi.fn<typeof fetch>();
const requests = (path: string, method: string) =>
  fetchMock.mock.calls.filter(([url, init]) => url === path && init?.method === method);
const deletes = () => requests(draftPath, "DELETE");
const button = (name: string | RegExp) => screen.getByRole("button", { name });
const waitOptions = { timeout: 10_000 };

const defaultFetch: typeof fetch = async (url, init) => {
  if (url === "/api/webhooks/validate-url") return Response.json({ valid: true });
  if (url === "/api/webhooks" && init?.method === "POST") return draftResponse();
  if (url === `${draftPath}/test`) {
    return Response.json({ delivered: true, status: 200, latencyMs: 12 });
  }
  return Response.json({});
};

beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockImplementation(defaultFetch);
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function openWizard(editingWebhook?: WebhookItem) {
  const onClose = vi.fn();
  const onCreated = vi.fn();

  function Wizard() {
    const [isOpen, setOpen] = useState(true);
    const t = useTranslations("webhooks");
    return (
      <AddWebhookWizard
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setOpen(false);
        }}
        onCreated={onCreated}
        editingWebhook={editingWebhook}
        t={t}
      />
    );
  }

  return { ...render(<Wizard />), onClose, onCreated };
}

async function startDraft() {
  await act(async () => {});
  fireEvent.click(button(/^Custom Webhook/));
  fireEvent.click(button("Next"));
  fireEvent.change(screen.getByLabelText(/^Endpoint URL/), { target: { value: endpoint } });
  await act(async () => fireEvent.click(button("Next")));
}

async function openDraft() {
  const view = openWizard();
  await startDraft();
  await screen.findByRole("button", { name: "Send Test" }, waitOptions);
  return view;
}

it("creates a disabled draft on Next and uses its ID to send a manual test", async () => {
  await openDraft();
  fireEvent.click(button("Send Test"));
  await screen.findByText(/Test webhook sent successfully/, {}, waitOptions);
  expect(requests(`${draftPath}/test`, "POST")).toHaveLength(1);
  const creates = requests("/api/webhooks", "POST");
  expect(creates).toHaveLength(1);
  expect(JSON.parse(String(creates[0][1]?.body))).toEqual({
    url: endpoint,
    kind: "custom",
    enabled: false,
  });
});

it.each([
  ["X", () => fireEvent.click(button("Close"))],
  ["Escape", () => fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" })],
  [
    "outside click",
    () => {
      const overlay = document.querySelector('[data-slot="dialog-overlay"]')!;
      fireEvent.pointerDown(overlay, { button: 0 });
      fireEvent.click(overlay);
    },
  ],
  ["Cancel", () => fireEvent.click(button("Cancel"))],
] as const)("deletes the draft and then closes via %s", async (_path, close) => {
  const pending = Promise.withResolvers<Response>();
  fetchMock.mockImplementation((url, init) =>
    init?.method === "DELETE" ? pending.promise : defaultFetch(url, init)
  );
  const { onClose } = await openDraft();
  // Radix arms its outside-pointer listener after a timer.
  await act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)));
  close();
  expect(deletes()).toHaveLength(1);
  expect(onClose).not.toHaveBeenCalled();
  await act(async () => pending.resolve(Response.json({ success: true })));
  expect(onClose).toHaveBeenCalledTimes(1);
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(deletes()).toHaveLength(1);
});

it("shows a failed deletion, keeps the dialog open and allows retry", async () => {
  fetchMock.mockImplementation((url, init) => {
    if (init?.method === "DELETE" && deletes().length === 1) {
      return Promise.resolve(Response.json({ error: "Service unavailable" }, { status: 503 }));
    }
    return defaultFetch(url, init);
  });
  const { onClose } = await openDraft();
  fireEvent.click(button("Close"));
  await screen.findByText("Failed to delete webhook.", {}, waitOptions);
  expect(screen.getByRole("dialog")).toBeTruthy();
  expect(onClose).not.toHaveBeenCalled();
  fireEvent.click(button("Cancel"));
  await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1), waitOptions);
  expect(deletes()).toHaveLength(2);
});

it("deletes an unfinished draft with keepalive when the wizard unmounts", async () => {
  const { unmount } = await openDraft();
  unmount();
  expect(deletes()).toEqual([[draftPath, expect.objectContaining({ keepalive: true })]]);
});

it("deletes the draft when the response to Next arrives after navigation", async () => {
  const pending = Promise.withResolvers<Response>();
  fetchMock.mockImplementation((url, init) =>
    url === "/api/webhooks" ? pending.promise : defaultFetch(url, init)
  );
  const { unmount } = openWizard();
  await startDraft();
  expect(requests("/api/webhooks", "POST")).toHaveLength(1);
  unmount();
  expect(deletes()).toHaveLength(0);
  await act(async () => pending.resolve(draftResponse()));
  expect(deletes()).toEqual([[draftPath, expect.objectContaining({ keepalive: true })]]);
});

it.each([true, false])(
  "Finish saves the name, events and enabled=%s and keeps the webhook",
  async (enabled) => {
    const { onCreated, onClose, unmount } = await openDraft();
    fireEvent.change(screen.getByLabelText("Name (optional)"), {
      target: { value: "Production alerts" },
    });
    fireEvent.click(screen.getByLabelText("request.completed"));
    if (!enabled) fireEvent.click(screen.getByRole("switch", { name: "Enabled" }));
    fireEvent.click(button("Finish"));
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1), waitOptions);
    expect(onCreated).toHaveBeenCalledTimes(1);
    const updates = requests(draftPath, "PUT");
    expect(updates).toHaveLength(1);
    expect(JSON.parse(String(updates[0][1]?.body))).toEqual({
      kind: "custom",
      url: endpoint,
      description: "Production alerts",
      events: ["request.completed"],
      enabled,
    });
    unmount();
    expect(deletes()).toHaveLength(0);
  }
);

it.each([200, 503])("handles a Finish response of %s after navigation", async (status) => {
  const pending = Promise.withResolvers<Response>();
  fetchMock.mockImplementation((url, init) =>
    init?.method === "PUT" ? pending.promise : defaultFetch(url, init)
  );
  const { unmount } = await openDraft();
  fireEvent.click(button("Finish"));
  expect(requests(draftPath, "PUT")).toHaveLength(1);
  unmount();
  expect(deletes()).toHaveLength(0);
  await act(async () => pending.resolve(Response.json({}, { status })));
  expect(deletes()).toHaveLength(status === 200 ? 0 : 1);
  if (status === 503) expect(deletes()[0][1]?.keepalive).toBe(true);
});

it("keeps the existing webhook when closing the edit wizard", async () => {
  const { onClose, unmount } = openWizard({
    id: "existing-id",
    url: endpoint,
    kind: "custom",
    events: ["request.completed"],
    enabled: true,
    description: "Existing webhook",
    secret: null,
    created_at: "2026-11-27T00:00:00Z",
    last_triggered_at: null,
    last_status: null,
    failure_count: 0,
  });
  await act(async () => {});
  fireEvent.click(button("Next"));
  await act(async () => fireEvent.click(button("Next")));
  await screen.findByRole("button", { name: "Send Test" }, waitOptions);
  expect(requests("/api/webhooks/existing-id", "PUT")).toHaveLength(1);
  fireEvent.click(button("Close"));
  expect(onClose).toHaveBeenCalledTimes(1);
  unmount();
  expect(fetchMock.mock.calls.some(([, init]) => init?.method === "DELETE")).toBe(false);
});
