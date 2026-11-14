// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import ManagedProxyTab from "../../src/app/(dashboard)/dashboard/settings/components/proxy/ManagedProxyTab";
vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
const fetchMock = vi.fn();
beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockReset();
  fetchMock.mockImplementation(async (_url: string, init?: RequestInit) => {
    const body = init?.body ? JSON.parse(String(init.body)) : {};
    if (body.action === "test")
      return Response.json({ success: true, publicIp: "203.0.113.1", latencyMs: 1 });
    if (body.action === "subscription")
      return Response.json({
        nodes: [{ id: "node", name: "First node", sourceLink: "vless://fixture" }],
        skipped: 1,
      });
    if (body.action === "releases") return Response.json({ releases: [{ version: "v1" }] });
    return Response.json({ cores: [{ core: "xray", state: "stopped", entries: [] }] });
  });
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
function selectCore(value = "xray") {
  fireEvent.change(screen.getByLabelText("core"), { target: { value } });
}

test("unsaved test works without a name and preserves the source without saving", async () => {
  render(<ManagedProxyTab />);
  selectCore();
  fireEvent.change(screen.getByLabelText("source"), { target: { value: "vless://fixture" } });
  expect((screen.getByText("testSource") as HTMLButtonElement).disabled).toBe(false);
  expect((screen.getByText("saveActivate") as HTMLButtonElement).disabled).toBe(true);
  fireEvent.click(screen.getByText("testSource"));
  await screen.findByRole("status");
  expect((screen.getByLabelText("source") as HTMLTextAreaElement).value).toBe("vless://fixture");
  expect(fetchMock.mock.calls.filter(([, init]) => init?.method === "POST")).toHaveLength(0);
  const call = fetchMock.mock.calls.find(([, init]) => init?.method === "PATCH");
  expect(JSON.parse(call![1].body)).toMatchObject({
    action: "test",
    core: "xray",
    sourceLink: "vless://fixture",
  });
});
test("subscription loading is explicit and selecting a node never starts it", async () => {
  render(<ManagedProxyTab />);
  selectCore();
  await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
  fireEvent.change(screen.getByLabelText("subscriptionUrl"), {
    target: { value: "https://example.invalid/sub" },
  });
  expect(fetchMock).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByText("loadSubscription"));
  await screen.findByText("First node");
  fireEvent.change(screen.getByLabelText("subscriptionNode"), { target: { value: "node" } });
  expect((screen.getByLabelText("source") as HTMLTextAreaElement).value).toBe("vless://fixture");
  expect((screen.getByLabelText("name") as HTMLInputElement).value).toBe("First node");
  expect(fetchMock).toHaveBeenCalledTimes(2);
  selectCore("singbox");
  expect(screen.queryByText("First node")).toBeNull();
});
test("custom core use needs explicit acknowledgement which resets when its path changes", async () => {
  render(<ManagedProxyTab />);
  selectCore();
  fireEvent.change(screen.getByLabelText("customPath"), {
    target: { value: "/server/custom-core" },
  });
  fireEvent.change(screen.getByLabelText("customHash"), { target: { value: "a".repeat(64) } });
  expect((screen.getByText("useCustom") as HTMLButtonElement).disabled).toBe(true);
  fireEvent.click(screen.getByLabelText("customTrust"));
  expect((screen.getByText("useCustom") as HTMLButtonElement).disabled).toBe(false);
  fireEvent.change(screen.getByLabelText("customPath"), {
    target: { value: "/server/other-core" },
  });
  expect((screen.getByText("useCustom") as HTMLButtonElement).disabled).toBe(true);
});
test("fragmentation controls are opt-in and disappear for unsupported core", async () => {
  render(<ManagedProxyTab />);
  selectCore();
  expect(screen.queryByLabelText("fragmentLength")).toBeNull();
  fireEvent.click(screen.getByLabelText("fragmentEnable"));
  expect(screen.getByLabelText("fragmentLength")).toBeTruthy();
  selectCore("singbox");
  expect(screen.queryByLabelText("fragmentEnable")).toBeNull();
});
