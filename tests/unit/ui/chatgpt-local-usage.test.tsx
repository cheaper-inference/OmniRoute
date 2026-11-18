// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import ChatGptLocalUsage from "@/shared/components/ChatGptLocalUsage";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("shows real zero values only after a successful local read", async () => {
  const fetchMock = vi
    .fn()
    .mockResolvedValue(
      Response.json({ source: "retained_local_history", requests: 0, tokens: 0, activeDays: 0 })
    );
  vi.stubGlobal("fetch", fetchMock);
  render(<ChatGptLocalUsage connectionId="first" />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading local usage");
  expect(await screen.findAllByText("0")).toHaveLength(3);
  expect(fetchMock.mock.calls[0][0]).toBe("/api/usage/local-summary?connectionId=first");
});

it("distinguishes errors from zero and allows a local-only retry", async () => {
  const fetchMock = vi
    .fn()
    .mockResolvedValueOnce(new Response(null, { status: 500 }))
    .mockResolvedValueOnce(
      Response.json({ source: "retained_local_history", requests: 5, tokens: 234, activeDays: 2 })
    );
  vi.stubGlobal("fetch", fetchMock);
  render(<ChatGptLocalUsage connectionId="first" />);
  expect(await screen.findByRole("alert")).toHaveTextContent("Local usage could not be loaded");
  expect(screen.queryByText("0")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Refresh local usage" }));
  expect(await screen.findByText("234")).toBeInTheDocument();
  expect(fetchMock).toHaveBeenCalledTimes(2);
});

it("does not let an old connection response overwrite a new connection", async () => {
  let completeFirst!: (response: Response) => void;
  vi.stubGlobal(
    "fetch",
    vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<Response>((resolve) => {
            completeFirst = resolve;
          })
      )
      .mockResolvedValueOnce(
        Response.json({ source: "retained_local_history", requests: 8, tokens: 88, activeDays: 1 })
      )
  );
  const view = render(<ChatGptLocalUsage connectionId="first" />);
  view.rerender(<ChatGptLocalUsage connectionId="second" />);
  expect(await screen.findByText("88")).toBeInTheDocument();
  completeFirst(
    Response.json({ source: "retained_local_history", requests: 999, tokens: 999, activeDays: 9 })
  );
  await waitFor(() => expect(screen.queryByText("999")).toBeNull());
});

it("rejects malformed or non-local statistics instead of inventing values", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ requests: 0 })));
  render(<ChatGptLocalUsage connectionId="first" />);
  expect(await screen.findByRole("alert")).toBeInTheDocument();
  expect(screen.queryByText("0")).toBeNull();
});
