import React from "react";
import { afterEach, expect, test, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

vi.mock("../../../src/app/(dashboard)/dashboard/providers/[id]/components/FalNativePanel", () => ({
  default: ({ connectionId }: { connectionId: string | null }) => (
    <div data-testid="fal-panel">{connectionId}</div>
  ),
}));

import FalNativeGate from "../../../src/app/(dashboard)/dashboard/providers/[id]/components/FalNativeGate";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function stubFlags(respond: () => Promise<Response>) {
  const fetchMock = vi.fn(respond);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

const flagResponse = (effectiveValue: string) =>
  Response.json({ flags: [{ key: "FAL_NATIVE_ENABLED", effectiveValue }] });

test("the Fal panel renders only after the flag reads as enabled", async () => {
  stubFlags(async () => flagResponse("true"));
  render(<FalNativeGate connectionId="connection-1" />);
  expect(screen.queryByTestId("fal-panel")).toBeNull();
  await waitFor(() => expect(screen.getByTestId("fal-panel").textContent).toBe("connection-1"));
});

for (const [label, respond] of [
  ["off", async () => flagResponse("false")],
  ["unreadable", async () => new Response("denied", { status: 401 })],
  ["unreachable", async () => Promise.reject(new Error("network"))],
] as const) {
  test(`the Fal panel stays hidden when the flag is ${label}`, async () => {
    const fetchMock = stubFlags(respond);
    render(<FalNativeGate connectionId="connection-1" />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.queryByTestId("fal-panel")).toBeNull();
  });
}
