// @vitest-environment jsdom
import React from "react";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
vi.mock("@/shared/components", () => ({
  Button: ({
    children,
    size: _size,
    variant: _variant,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & { size?: string; variant?: string }) => (
    <button {...props}>{children}</button>
  ),
}));
const { default: DecisionModelsSection } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/DecisionModelsSection");
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("does not discover or import on mount, and requires an active selected connection", () => {
  const fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  render(<DecisionModelsSection providerId="typesafe" onChanged={vi.fn()} />);
  expect(
    (screen.getByRole("button", { name: "Discover decision models" }) as HTMLButtonElement).disabled
  ).toBe(true);
  expect(fetchMock).not.toHaveBeenCalled();
});

it("explicit discovery reads only the selected connection catalog and never tests chat", async () => {
  const fetchMock = vi.fn().mockResolvedValue(
    Response.json({
      models: [
        {
          id: "jev-fixture",
          apiFormat: "systemone",
          supportedEndpoints: ["systemone"],
          modelType: "decision",
          context_length: null,
          pricing_status: "unknown",
        },
      ],
      inferenceAccess: "unverified",
    })
  );
  vi.stubGlobal("fetch", fetchMock);
  const changed = vi.fn();
  render(
    <DecisionModelsSection
      providerId="typesafe"
      connectionId="selected-connection"
      onChanged={changed}
    />
  );
  fireEvent.click(screen.getByRole("button", { name: "Discover decision models" }));
  expect((await screen.findAllByText("jev-fixture")).length).toBeGreaterThan(0);
  expect(fetchMock).toHaveBeenCalledOnce();
  const [url, init] = fetchMock.mock.calls[0];
  expect(url).toBe("/api/providers/selected-connection/models?kind=decision");
  expect(init.method).toBe("GET");
  expect(changed).not.toHaveBeenCalled();
  expect(screen.getByText("Account access not verified")).toBeTruthy();
});

it("import is a separate intentional metadata POST and reload callback", async () => {
  const fetchMock = vi.fn().mockResolvedValue(
    Response.json({
      success: true,
      models: [{ id: "jev-fixture", modelType: "decision", supportedEndpoints: ["systemone"] }],
    })
  );
  vi.stubGlobal("fetch", fetchMock);
  const changed = vi.fn();
  render(
    <DecisionModelsSection
      providerId="typesafe"
      connectionId="selected-connection"
      onChanged={changed}
    />
  );
  fireEvent.click(screen.getByRole("button", { name: "Import decision models" }));
  await waitFor(() => expect(changed).toHaveBeenCalledOnce());
  expect(fetchMock).toHaveBeenCalledOnce();
  expect(fetchMock.mock.calls[0][0]).toBe(
    "/api/providers/selected-connection/sync-models?kind=decision"
  );
  expect(fetchMock.mock.calls[0][1].method).toBe("POST");
});

it("a reported 429 stops without retry, account rotation or an account-quota claim", async () => {
  const fetchMock = vi
    .fn()
    .mockResolvedValue(Response.json({ error: "FreeUsageLimitError" }, { status: 429 }));
  vi.stubGlobal("fetch", fetchMock);
  render(
    <DecisionModelsSection
      providerId="typesafe"
      connectionId="selected-connection"
      onChanged={vi.fn()}
    />
  );
  fireEvent.click(screen.getByRole("button", { name: "Discover decision models" }));
  expect((await screen.findByRole("alert")).textContent).toContain("HTTP 429");
  expect(screen.getByRole("alert").textContent).not.toMatch(
    /account.*quota|exhausted|invalid.*key/i
  );
  expect(fetchMock).toHaveBeenCalledOnce();
});

it("changing selected connection aborts and ignores the previous discovery result", async () => {
  let finish!: () => void;
  let signal!: AbortSignal;
  const fetchMock = vi.fn((_url, init: RequestInit) => {
    signal = init.signal as AbortSignal;
    return new Promise<Response>((resolve) => {
      finish = () => resolve(Response.json({ models: [{ id: "old-model" }] }));
    });
  });
  vi.stubGlobal("fetch", fetchMock);
  const { rerender } = render(
    <DecisionModelsSection providerId="typesafe" connectionId="old" onChanged={vi.fn()} />
  );
  fireEvent.click(screen.getByRole("button", { name: "Discover decision models" }));
  rerender(<DecisionModelsSection providerId="typesafe" connectionId="new" onChanged={vi.fn()} />);
  expect(signal.aborted).toBe(true);
  await act(async () => finish());
  expect(screen.queryByText("old-model")).toBeNull();
  expect(fetchMock).toHaveBeenCalledOnce();
});

it("cancelling an issued import explicitly retains its uncertain outcome", async () => {
  let finish!: () => void;
  vi.stubGlobal(
    "fetch",
    vi.fn(
      () =>
        new Promise<Response>((resolve) => {
          finish = () => resolve(Response.json({ models: [{ id: "late-model" }] }));
        })
    )
  );
  const changed = vi.fn();
  render(
    <DecisionModelsSection providerId="typesafe" connectionId="selected" onChanged={changed} />
  );
  fireEvent.click(screen.getByRole("button", { name: "Import decision models" }));
  fireEvent.click(screen.getByRole("button", { name: "Cancel request" }));
  expect(
    screen.getByText("Cancelled locally. Reload models to check whether the import completed.")
  ).toBeTruthy();
  await act(async () => finish());
  expect(changed).not.toHaveBeenCalled();
});
