// @vitest-environment jsdom
import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import ModelEndpointTagsEditor from "../../../src/app/(dashboard)/dashboard/providers/[id]/components/ModelEndpointTagsEditor";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it.each(["gpt-5.6-luna", "gpt-6-luna", "openai/gpt-6-luna", "gpt-6.1-sol", "gpt-4.1"])(
  "shows documented endpoints for %s instead of assumed chat, including editor selections",
  (modelId) => {
    render(
      <ModelEndpointTagsEditor
        provider="openai"
        modelId={modelId}
        supportedEndpoints={["chat"]}
        t={(key) => key}
      />
    );
    expect(screen.getByText("responses")).toBeTruthy();
    expect(screen.getByText("chat")).toBeTruthy();
    expect(screen.queryByText("endpointCapabilitiesDefaulted")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesEdit" }));
    const checkbox = screen.getByRole("checkbox", { name: "responses" });
    expect(
      checkbox.getAttribute("aria-checked") === "true" ||
        (checkbox as HTMLInputElement).checked === true
    ).toBe(true);
  }
);

it("does not advertise chat for a documented Responses-only model", () => {
  render(<ModelEndpointTagsEditor provider="openai" modelId="gpt-5.4-pro" t={(key) => key} />);
  expect(screen.getByText("responses")).toBeTruthy();
  expect(screen.queryByText("chat")).toBeNull();
});

it.each(["operator", "declared", "inferred"])("preserves %s endpoint declarations", (source) => {
  render(
    <ModelEndpointTagsEditor
      provider="openai"
      modelId="gpt-6-luna"
      supportedEndpoints={["chat"]}
      endpointCapabilitySource={source}
      t={(key) => key}
    />
  );
  expect(screen.queryByText("responses")).toBeNull();
});

it.each([
  ["other", "gpt-6-luna"],
  ["openai", "gpt-unknown"],
  ["openai", "gpt-6-luna-unknown"],
])("does not invent capabilities for %s/%s", (provider, modelId) => {
  render(<ModelEndpointTagsEditor provider={provider} modelId={modelId} t={(key) => key} />);
  expect(screen.getByText("endpointCapabilitiesDefaulted")).toBeTruthy();
  expect(screen.queryByText("responses")).toBeNull();
});

it("#16929: edits declared endpoints through the existing operator PUT API", async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true });
  const onChanged = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal("fetch", fetchMock);
  render(
    <ModelEndpointTagsEditor
      provider="deepseek"
      modelId="speech-1"
      t={(key) => key}
      supportedEndpoints={["audio-transcriptions"]}
      endpointCapabilitySource="declared"
      onChanged={onChanged}
    />
  );
  expect(screen.getByText("endpointCapabilitiesDeclared")).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesEdit" }));
  fireEvent.click(screen.getByRole("checkbox", { name: "chat" }));
  fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesSave" }));
  await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
  const [url, init] = fetchMock.mock.calls[0];
  expect(url).toBe("/api/provider-models");
  expect(init.method).toBe("PUT");
  expect(JSON.parse(init.body)).toEqual({
    provider: "deepseek",
    modelId: "speech-1",
    supportedEndpoints: ["audio-transcriptions", "chat"],
  });
  await waitFor(() => expect(onChanged).toHaveBeenCalledOnce());
});

it("#16929: reset calls endpoint-only action and never deletes model or other overrides", async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal("fetch", fetchMock);
  render(
    <ModelEndpointTagsEditor
      provider="deepseek"
      modelId="speech-1"
      t={(key) => key}
      supportedEndpoints={["chat"]}
      resettable
      endpointCapabilitySource="operator"
    />
  );
  fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesEdit" }));
  fireEvent.click(screen.getByRole("button", { name: "endpointCapabilitiesReset" }));
  await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
  const [url, init] = fetchMock.mock.calls[0];
  expect(init.method).toBe("DELETE");
  const parsed = new URL(url, "http://localhost");
  expect(parsed.searchParams.get("resetEndpoints")).toBe("true");
  expect(parsed.searchParams.get("resetOverride")).toBe(null);
  expect(parsed.searchParams.get("model")).toBe("speech-1");
});
