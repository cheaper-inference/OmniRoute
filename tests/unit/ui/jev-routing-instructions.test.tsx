// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

import CombosPage from "@/app/(dashboard)/dashboard/combos/page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/dashboard/combos",
}));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("loads Jev routing instructions per combo, discards canceled edits, and saves a clear", async () => {
  const faster = {
    id: "faster",
    name: "faster",
    strategy: "jev",
    models: ["openai/gpt-4.1", "anthropic/claude-3"],
    config: { maxRetries: 1, jevInstructions: "Prefer lower latency." },
  };
  const deeper = {
    ...faster,
    id: "deeper",
    name: "deeper",
    config: { ...faster.config, jevInstructions: "Prefer deeper analysis." },
  };
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url === "/api/combos/faster" && init?.method === "PUT") return Response.json({});
    if (url.startsWith("/api/combos/metrics")) return Response.json({ metrics: {} });
    if (url.startsWith("/api/combos/builder/options")) {
      return Response.json({ providers: [], comboRefs: [] });
    }
    if (url.startsWith("/api/combos")) return Response.json({ combos: [faster, deeper] });
    if (url.startsWith("/api/providers")) return Response.json({ connections: [] });
    if (url.startsWith("/api/provider-nodes")) return Response.json({ nodes: [] });
    if (url.startsWith("/api/settings")) return Response.json({ comboConfigMode: "expert" });
    return Response.json({});
  });
  vi.stubGlobal("fetch", fetchMock);
  await act(async () => {
    render(<CombosPage />);
  });

  async function edit(id: string) {
    const card = await screen.findByTestId(`combo-card-${id}`, undefined, { timeout: 10_000 });
    await act(async () => {
      fireEvent.click(within(card).getByRole("button", { name: "Edit" }));
    });
    const dialog = within(await screen.findByRole("dialog"));
    const instructions = await dialog.findByRole("textbox", { name: /routing instructions/i });
    return { dialog, instructions };
  }

  let editor = await edit(faster.id);
  expect(editor.instructions).toHaveValue("Prefer lower latency.");
  fireEvent.change(editor.instructions, { target: { value: "Unsaved instructions" } });
  fireEvent.click(editor.dialog.getByRole("button", { name: "Cancel" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  expect(fetchMock.mock.calls.some(([, init]) => init?.method === "PUT")).toBe(false);

  editor = await edit(deeper.id);
  expect(editor.instructions).toHaveValue("Prefer deeper analysis.");
  fireEvent.click(editor.dialog.getByRole("button", { name: "Cancel" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

  editor = await edit(faster.id);
  expect(editor.instructions).toHaveValue("Prefer lower latency.");
  fireEvent.change(editor.instructions, { target: { value: "" } });
  fireEvent.click(editor.dialog.getByRole("button", { name: "Save" }));
  await waitFor(() => {
    const save = fetchMock.mock.calls.find(([, init]) => init?.method === "PUT");
    expect(save?.[0]).toBe("/api/combos/faster");
    expect(JSON.parse(String(save?.[1]?.body))).toMatchObject({
      strategy: "jev",
      config: { maxRetries: 1, jevInstructions: "" },
      routes: { chat: { config: { jevInstructions: "" } } },
    });
  });
}, 120_000);
