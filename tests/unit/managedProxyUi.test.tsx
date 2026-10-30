// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { assertManagedFixture } from "../_setup/managedProxyFixture.mjs";
assertManagedFixture();
const { default: ProxyConfigModal } = await import("../../src/shared/components/ProxyConfigModal");
const { default: ManagedProxyTab } =
  await import("../../src/app/(dashboard)/dashboard/settings/components/proxy/ManagedProxyTab");
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
const source = "vless://11111111-1111-4111-8111-111111111111@example.invalid:443?security=tls";

test("managed source form keeps native values and input on failed activation with kit controls", async () => {
  const request = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) =>
    init?.method === "POST"
      ? Response.json({ error: { message: "Synthetic activation failure" } }, { status: 400 })
      : Response.json({ cores: [] })
  );
  vi.stubGlobal("fetch", request);
  render(<ManagedProxyTab />);
  const core = screen.getByLabelText("Core") as HTMLSelectElement;
  const name = screen.getByLabelText("Name") as HTMLInputElement;
  const input = screen.getByLabelText("Source link or native outbound JSON") as HTMLTextAreaElement;
  const save = screen.getByRole("button", { name: "Save and activate" }) as HTMLButtonElement;
  expect(core.classList.contains("ci-select-native")).toBe(true);
  expect(name.classList.contains("ci-input")).toBe(true);
  expect(input.classList.contains("ci-textarea")).toBe(true);
  expect(name.maxLength).toBe(120);
  expect(input.rows).toBe(4);
  expect(input.getAttribute("autocomplete")).toBe("off");
  expect(input.getAttribute("spellcheck")).toBe("false");
  expect(save.disabled).toBe(true);
  fireEvent.change(core, { target: { value: "xray" } });
  fireEvent.change(name, { target: { value: "Fixture proxy" } });
  fireEvent.change(input, { target: { value: source } });
  expect(save.disabled).toBe(false);
  expect(request.mock.calls.filter(([, init]) => init?.method === "POST")).toHaveLength(0);
  fireEvent.click(save);
  const alert = await screen.findByRole("alert", {}, { timeout: 2000 });
  expect(alert.textContent).toBe("Synthetic activation failure");
  expect(alert.classList.contains("text-error")).toBe(true);
  const submissions = request.mock.calls.filter(([, init]) => init?.method === "POST");
  expect(submissions).toHaveLength(1);
  expect(JSON.parse(String(submissions[0][1]?.body))).toEqual({
    core: "xray",
    name: "Fixture proxy",
    sourceLink: source,
  });
  expect(core.value).toBe("xray");
  expect(name.value).toBe("Fixture proxy");
  expect(input.value).toBe(source);
}, 5000);

for (const successful of [true, false]) {
  test(`existing Custom host field only activates on explicit Save and ${successful ? "closes on success" : "retains input on failure"}`, async () => {
    const request = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url === "/api/services/managed-proxy") {
        expect(init?.method).toBe("POST");
        expect(JSON.parse(String(init?.body))).toEqual({
          core: "singbox",
          sourceLink: source,
          name: "Custom Global Proxy",
          assignment: { scope: "global", scopeId: null },
        });
        return new Response(
          JSON.stringify(
            successful
              ? { item: { id: "synthetic" } }
              : { error: { message: "Synthetic activation failure" } }
          ),
          { status: successful ? 200 : 400 }
        );
      }
      expect(init?.method || "GET").toBe("GET");
      if (url.startsWith("/api/settings/proxies/assignments")) return Response.json({ items: [] });
      if (url === "/api/settings/proxies") return Response.json({ items: [], socks5Enabled: true });
      if (url.startsWith("/api/settings/proxy?")) return Response.json({ proxy: null });
      throw new Error(`Unexpected fixture request: ${url}`);
    });
    vi.stubGlobal("fetch", request);
    const onClose = vi.fn();
    const onSaved = vi.fn();
    render(<ProxyConfigModal isOpen onClose={onClose} onSaved={onSaved} level="global" />);
    const host = await screen.findByLabelText("Host", {}, { timeout: 2000 });
    const beforeTyping = request.mock.calls.length;
    fireEvent.change(host, { target: { value: source } });
    expect(request.mock.calls.length).toBe(beforeTyping);
    const core = screen.getByLabelText("Proxy core");
    expect((core as HTMLSelectElement).value).toBe("");
    fireEvent.click(screen.getByRole("button", { name: /^Save$/i }));
    expect(
      await screen.findByText("Select sing-box or Xray before saving this tunnel")
    ).toBeTruthy();
    expect(request.mock.calls.length).toBe(beforeTyping);
    fireEvent.change(core, { target: { value: "singbox" } });
    expect(request.mock.calls.length).toBe(beforeTyping);
    expect(
      (screen.getByRole("button", { name: /Test Connection/i }) as HTMLButtonElement).disabled
    ).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: /^Save$/i }));
    await waitFor(
      () =>
        expect(
          request.mock.calls.filter(([url]) => url === "/api/services/managed-proxy")
        ).toHaveLength(1),
      { timeout: 2000 }
    );
    if (successful) {
      await waitFor(() => expect(onSaved).toHaveBeenCalledTimes(1), { timeout: 2000 });
      expect(onClose).toHaveBeenCalledTimes(1);
    } else {
      expect(
        await screen.findByText("Synthetic activation failure", {}, { timeout: 2000 })
      ).toBeTruthy();
      expect((host as HTMLInputElement).value).toBe(source);
      expect(onClose).not.toHaveBeenCalled();
      expect(onSaved).not.toHaveBeenCalled();
    }
  }, 15000);
}
