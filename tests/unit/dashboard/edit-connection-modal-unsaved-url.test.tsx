// @vitest-environment jsdom
import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({ notify: vi.fn() }),
}));
vi.mock("@/store/emailPrivacyStore", () => ({
  default: () => ({ hidden: false, toggle: vi.fn() }),
}));

const { default: EditConnectionModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/EditConnectionModal.tsx");

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("tests the edited Ollama URL before saving the connection", async () => {
  const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ valid: true }) });
  vi.stubGlobal("fetch", fetchMock);
  const onSave = vi.fn();
  render(
    <EditConnectionModal
      isOpen={true}
      providerId="ollama-local"
      connection={{
        id: "ollama-test",
        provider: "ollama-local",
        authType: "apikey",
        name: "Ollama",
        providerSpecificData: { baseUrl: "http://localhost:11434/v1" },
      }}
      onSave={onSave}
      onClose={vi.fn()}
    />
  );
  fireEvent.change(screen.getByDisplayValue("http://localhost:11434/v1"), {
    target: { value: " http://host.docker.internal:11434/v1 " },
  });
  fireEvent.click(screen.getByRole("button", { name: "testConnection" }));
  await waitFor(() =>
    expect(fetchMock).toHaveBeenCalledWith("/api/providers/ollama-test/test", expect.anything())
  );
  const call = fetchMock.mock.calls.find(([url]) => url === "/api/providers/ollama-test/test")!;
  expect(JSON.parse(call[1].body)).toEqual({
    baseUrl: "http://host.docker.internal:11434/v1",
  });
  expect(onSave).not.toHaveBeenCalled();
});
