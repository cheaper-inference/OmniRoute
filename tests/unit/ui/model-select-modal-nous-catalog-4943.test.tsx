import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import ModelSelectModal from "@/shared/components/ModelSelectModal";

const catalogUrl = "/api/providers/nous-connection/models?excludeHidden=true&chatOnly=true";

async function openPicker(catalogResponse: Response) {
  const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
    switch (String(input)) {
      case catalogUrl:
        return catalogResponse;
      case "/api/provider-models":
        return Response.json({
          models: { "nous-research": [{ id: "custom", name: "Custom Nous Model" }] },
          hiddenModelsByProvider: { "nous-research": ["hidden", "nous/legacy-hidden"] },
        });
      case "/api/provider-nodes":
        return Response.json({ nodes: [] });
      case "/api/combos":
        return Response.json({ combos: [] });
      default:
        throw new Error(`Unexpected fetch to ${String(input)}`);
    }
  });
  vi.stubGlobal("fetch", fetchMock);
  const onSelect = vi.fn();
  await act(async () => {
    render(
      <ModelSelectModal
        isOpen
        onClose={() => {}}
        onSelect={onSelect}
        activeProviders={[{ provider: "nous-research", id: "nous-connection" }]}
      />
    );
  });
  return { fetchMock, onSelect };
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("selects a live Nous chat model and keeps existing and hidden rows deduplicated", async () => {
  const { fetchMock, onSelect } = await openPicker(
    Response.json({
      source: "cache",
      models: [
        { id: "nous/Hermes-Vision", name: "Hermes Vision", supportsVision: true },
        { id: "Hermes-Vision", name: "Duplicate Live Model" },
        { id: "nous/Hermes-4-70B", name: "Duplicate Static Model" },
        { id: "nous-research/custom", name: "Duplicate Custom Model" },
        { id: "nous/hidden", name: "Hidden Nous Model" },
        { id: "legacy-hidden", name: "Previously Hidden Nous Model" },
      ],
    })
  );

  fireEvent.click(screen.getByRole("button", { name: /Hermes Vision/ }));
  expect(fetchMock).toHaveBeenCalledWith(catalogUrl);
  expect(onSelect).toHaveBeenCalledWith(
    expect.objectContaining({ value: "nous/Hermes-Vision", source: "auto" })
  );
  expect(screen.getAllByRole("button", { name: /Hermes 4 70B/ })).toHaveLength(1);
  expect(screen.getAllByRole("button", { name: /Custom Nous Model/ })).toHaveLength(1);
  expect(screen.queryByRole("button", { name: /Duplicate|Hidden Nous Model/ })).toBeNull();
});

it("keeps the built-in Nous models when discovery returns no models", async () => {
  const { fetchMock } = await openPicker(Response.json({ models: [] }));

  expect(fetchMock).toHaveBeenCalledWith(catalogUrl);
  expect(screen.getByRole("button", { name: /Hermes 4 70B/ })).toBeDefined();
  expect(screen.getByRole("button", { name: /Hermes 4 405B/ })).toBeDefined();
});
