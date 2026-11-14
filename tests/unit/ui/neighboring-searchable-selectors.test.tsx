// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import ConnectionTestModelField from "@/shared/components/ConnectionTestModelField";
import CustomCliCard from "@/app/(dashboard)/dashboard/cli-code/components/CustomCliCard";
import ProxyConfigModal from "@/shared/components/ProxyConfigModal";
import NoAuthAccountCard from "@/shared/components/NoAuthAccountCard";
import ProxyRegistryManager from "@/app/(dashboard)/dashboard/settings/components/ProxyRegistryManager";

// Real adapters, real kit overlays, synthetic transport only.
let root: Root;
let container: HTMLDivElement;
const proxies = [
  {
    id: "proxy-z",
    name: "Zebra",
    type: "http",
    host: "z.example.test",
    port: 8080,
    status: "active",
    password: "SECRET_CANARY",
    url: "http://SECRET_CANARY@z.example.test",
  },
  {
    id: "proxy-a",
    name: "Apple",
    type: "http",
    host: "a.example.test",
    port: 8080,
    status: "active",
  },
];
const fetchMock = vi.fn<(url: RequestInfo | URL, init?: RequestInit) => Promise<Response>>();
const writes = () =>
  fetchMock.mock.calls.filter(([, init]) => init?.method && init.method !== "GET");
const find = <T extends Element = HTMLElement>(selector: string) => {
  const element = document.body.querySelector<T>(selector);
  if (!element) throw new Error(`Missing ${selector}`);
  return element;
};
const button = (text: string) => {
  const element = [...document.body.querySelectorAll<HTMLButtonElement>("button")].find(
    (b) => b.textContent?.trim() === text || b.getAttribute("aria-label") === text
  );
  if (!element) throw new Error(`Missing button ${text}`);
  return element;
};
async function click(element: Element) {
  await act(async () => (element as HTMLElement).click());
}
async function type(input: HTMLInputElement, value: string) {
  await act(async () => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}
async function search(value: string) {
  await type(find<HTMLInputElement>('input[role="combobox"]'), value);
}
async function choose(text: string) {
  const option = [...document.body.querySelectorAll('[role="option"]')].find((el) =>
    el.textContent?.includes(text)
  );
  if (!option) throw new Error(`Missing option ${text}`);
  await click(option);
}
async function render(node: React.ReactNode) {
  await act(async () => root.render(node));
}
async function settle(assertion: () => void) {
  await vi.waitFor(async () => {
    await act(async () => {});
    assertion();
  });
}
beforeEach(() => {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  fetchMock.mockReset();
  fetchMock.mockImplementation(async (input) => {
    const url = String(input);
    if (url === "/api/settings/proxies")
      return Response.json({ items: proxies, socks5Enabled: true });
    if (url.includes("/pool?")) return Response.json({ members: [], strategy: "round-robin" });
    if (url.includes("/health") || url.includes("/assignments"))
      return Response.json({ items: [] });
    if (url === "/api/providers")
      return Response.json({
        connections: [
          {
            id: "conn",
            provider: "mimocode",
            providerSpecificData: { fingerprints: ["fingerprint-synthetic"] },
          },
        ],
      });
    if (url.includes("/models?"))
      return Response.json({
        models: [{ id: "provider/model-4.10", name: "Friendly model" }],
        degraded: true,
        source: "local_catalog",
      });
    if (url.endsWith("/test-message")) return Response.json({ modelId: "removed-model" });
    return Response.json({ proxy: null });
  });
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

it("connection model search preserves stale selection and degradation without requests or draft changes", async () => {
  const onChange = vi.fn();
  await render(<ConnectionTestModelField connectionId="conn" onChange={onChange} />);
  const trigger = find<HTMLButtonElement>('button[aria-haspopup="listbox"]');
  expect(trigger.textContent).toContain("removed-model");
  expect(find('[data-testid="discovery-degraded-notice"]')).toBeTruthy();
  await click(trigger);
  expect(document.querySelector('[role="option"][aria-disabled="true"]')?.textContent).toContain(
    "removed-model"
  );
  const calls = fetchMock.mock.calls.length;
  await search("provider/model-4.10");
  expect(onChange).not.toHaveBeenCalled();
  expect(fetchMock).toHaveBeenCalledTimes(calls);
  expect(trigger.textContent).toContain("removed-model");
  await choose("Friendly model");
  expect(onChange).toHaveBeenCalledExactlyOnceWith("provider/model-4.10");
});

it("CLI model and alias searches only update generated config on exact selection", async () => {
  await render(
    <CustomCliCard
      tool={{ name: "Synthetic CLI" }}
      isExpanded
      baseUrl="http://localhost:20128"
      apiKeys={[]}
      hasActiveProviders
      availableModels={[
        { value: "initial", label: "Initial" },
        { value: "provider/model-4.10", label: "Friendly model" },
      ]}
    />
  );
  const before = [...container.querySelectorAll("pre")].map((el) => el.textContent);
  await click(find('button[aria-haspopup="listbox"]'));
  await search("4.10");
  expect([...container.querySelectorAll("pre")].map((el) => el.textContent)).toEqual(before);
  await choose("Friendly model");
  expect(container.querySelector("pre")?.textContent).toContain("provider/model-4.10");
  await click(button("Add alias"));
  const triggers = container.querySelectorAll('button[aria-haspopup="listbox"]');
  await click(triggers[1]);
  await search("initial");
  await choose("Initial");
  expect(triggers[1].getAttribute("data-value")).toBe("initial");
  expect(fetchMock).not.toHaveBeenCalled();
});

it("saved proxy search keeps name ordering and requires Save for the exact assignment", async () => {
  await render(<ProxyConfigModal isOpen onClose={() => {}} level="global" />);
  await click(find('button[aria-haspopup="listbox"]'));
  const labels = [...document.querySelectorAll('[role="option"]')].map((el) => el.textContent);
  expect(labels[1]).toContain("Apple");
  expect(labels[2]).toContain("Zebra");
  const calls = fetchMock.mock.calls.length;
  await search("SECRET_CANARY");
  expect(document.body.textContent).not.toContain("SECRET_CANARY");
  expect(document.querySelectorAll('[role="option"]')).toHaveLength(1);
  await search("proxy-z");
  expect(fetchMock).toHaveBeenCalledTimes(calls);
  await choose("Zebra");
  expect(writes()).toHaveLength(0);
  await click(button("Save"));
  expect(
    writes().some(
      ([url, init]) =>
        String(url).endsWith("/assignments") && JSON.parse(String(init?.body)).proxyId === "proxy-z"
    )
  ).toBe(true);
});

it("no-auth proxy search preserves explicit save and empty inheritance semantics", async () => {
  await render(
    <NoAuthAccountCard
      providerId="mimocode"
      providerName="Synthetic"
      generateAccountId={() => "unused"}
    />
  );
  await settle(() =>
    expect(document.querySelector('[data-testid="noauth-account-grid"]')).not.toBeNull()
  );
  await click(find('[data-account-id="fingerprint-synthetic"] button'));
  await click(find('button[aria-haspopup="listbox"]'));
  const calls = fetchMock.mock.calls.length;
  await search("proxy-z");
  expect(fetchMock).toHaveBeenCalledTimes(calls);
  await choose("Zebra");
  expect(writes()).toHaveLength(0);
  await click(find('button[aria-haspopup="listbox"]'));
  await search("no-matches");
  const inherit = find('[role="option"]');
  await click(inherit);
  expect(find('button[aria-haspopup="listbox"]').getAttribute("data-value")).toBe("");
  await click(find('button[aria-haspopup="listbox"]'));
  await search("proxy-z");
  await choose("Zebra");
  await click(button("Save"));
  const body = JSON.parse(String(writes()[0][1]?.body));
  expect(body.providerSpecificData.accountProxies).toEqual([
    { fingerprint: "fingerprint-synthetic", proxyId: "proxy-z" },
  ]);
});

it("registry pool filtering never adds membership until the explicit Add action", async () => {
  await render(<ProxyRegistryManager />);
  await click(find('[data-testid="proxy-registry-open-pool"]'));
  await type(
    find<HTMLInputElement>('[data-testid="proxy-registry-pool-scopeid"]'),
    "synthetic-provider"
  );
  await click(find('[data-testid="proxy-registry-pool-load"]'));
  await click(find('[data-testid="proxy-registry-pool-add-select"]'));
  const calls = fetchMock.mock.calls.length;
  await search("proxy-z");
  expect(fetchMock).toHaveBeenCalledTimes(calls);
  await choose("Zebra");
  expect(writes()).toHaveLength(0);
  await click(find('[data-testid="proxy-registry-pool-add"]'));
  expect(writes().some(([, init]) => JSON.parse(String(init?.body)).proxyId === "proxy-z")).toBe(
    true
  );
});

it("connection loading and failed discovery remain disabled and never emit a draft", async () => {
  let finish!: (response: Response) => void;
  const pending = new Promise<Response>((resolve) => {
    finish = resolve;
  });
  fetchMock.mockImplementation(() => pending);
  const onChange = vi.fn();
  await render(<ConnectionTestModelField connectionId="conn" onChange={onChange} />);
  expect(find<HTMLButtonElement>('button[aria-haspopup="listbox"]').disabled).toBe(true);
  await act(async () => finish(new Response(null, { status: 500 })));
  expect(find<HTMLButtonElement>('button[aria-haspopup="listbox"]').disabled).toBe(true);
  expect(find('[role="alert"]').textContent).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

it("registry bulk proxy search preserves the empty clear option and explicit assignment", async () => {
  await render(<ProxyRegistryManager />);
  await act(async () =>
    find('[data-testid="proxy-registry-more-actions"]').dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
    )
  );
  await click(find('[data-testid="proxy-registry-open-bulk"]'));
  const scope = find<HTMLSelectElement>('[role="dialog"] select');
  await act(async () => {
    Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")!.set!.call(
      scope,
      "global"
    );
    scope.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await click(find('button[aria-haspopup="listbox"]'));
  const calls = fetchMock.mock.calls.length;
  await search("proxy-z");
  expect(fetchMock).toHaveBeenCalledTimes(calls);
  expect(find('[role="option"]').textContent).toContain("clear assignment");
  await choose("Zebra");
  expect(writes()).toHaveLength(0);
  await click(find('[data-testid="proxy-registry-bulk-apply"]'));
  expect(writes().some(([, init]) => JSON.parse(String(init?.body)).proxyId === "proxy-z")).toBe(
    true
  );
});
