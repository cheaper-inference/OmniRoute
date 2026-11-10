// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { useProviderConnections } from "@/app/(dashboard)/dashboard/providers/[id]/hooks/useProviderConnections";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  }),
}));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function deferredResponse() {
  let resolve!: (response: Response) => void;
  const promise = new Promise<Response>((done) => {
    resolve = done;
  });
  return { promise, finish: (data: unknown) => resolve(new Response(JSON.stringify(data))) };
}
function requests() {
  const a = {
    connections: deferredResponse(),
    nodes: deferredResponse(),
    proxy: deferredResponse(),
  };
  const b = {
    connections: deferredResponse(),
    nodes: deferredResponse(),
    proxy: deferredResponse(),
  };
  let nodeCall = 0;
  let proxyCall = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string) => {
      if (url === "/api/providers?provider=test-a") return a.connections.promise;
      if (url === "/api/providers?provider=test-b") return b.connections.promise;
      if (url === "/api/provider-nodes") return (nodeCall++ === 0 ? a : b).nodes.promise;
      if (url === "/api/settings/proxy") return (proxyCall++ === 0 ? a : b).proxy.promise;
      return Promise.resolve(new Response("{}"));
    })
  );
  return { a, b };
}
async function finish(batch: ReturnType<typeof requests>["a"], provider: string) {
  await act(async () => {
    batch.connections.finish({ connections: [{ id: provider, provider }] });
    batch.nodes.finish({ nodes: [{ id: provider }] });
    batch.proxy.finish({ marker: provider });
    await Promise.all([batch.connections.promise, batch.nodes.promise, batch.proxy.promise]);
  });
}
function mount() {
  return renderHook(({ provider }) => useProviderConnections(provider, false, false), {
    initialProps: { provider: "test-a" },
  });
}

it("keeps the current provider connection, node and proxy config when old loads finish last", async () => {
  const { a, b } = requests();
  const { result, rerender } = mount();
  rerender({ provider: "test-b" });
  await finish(b, "test-b");
  expect(result.current.connections).toEqual([{ id: "test-b", provider: "test-b" }]);
  expect(result.current.providerNode).toEqual({ id: "test-b" });
  expect(result.current.proxyConfig).toEqual({ marker: "test-b" });
  await finish(a, "test-a");
  expect(result.current.connections).toEqual([{ id: "test-b", provider: "test-b" }]);
  expect(result.current.providerNode).toEqual({ id: "test-b" });
  expect(result.current.proxyConfig).toEqual({ marker: "test-b" });
});

it("does not finish loading when the previous provider resolves before the current one", async () => {
  const { a, b } = requests();
  const { result, rerender } = mount();
  rerender({ provider: "test-b" });
  await finish(a, "test-a");
  expect(result.current.loading).toBe(true);
  expect(result.current.connections).toEqual([]);
  await finish(b, "test-b");
  expect(result.current.loading).toBe(false);
  expect(result.current.connections).toEqual([{ id: "test-b", provider: "test-b" }]);
});

it("applies initial loads normally for the mounted provider", async () => {
  const { a } = requests();
  const { result } = mount();
  expect(result.current.loading).toBe(true);
  await finish(a, "test-a");
  expect(result.current.loading).toBe(false);
  expect(result.current.connections).toEqual([{ id: "test-a", provider: "test-a" }]);
  expect(result.current.providerNode).toEqual({ id: "test-a" });
  expect(result.current.proxyConfig).toEqual({ marker: "test-a" });
});

it("allows pending loads to settle after unmount", async () => {
  const { a } = requests();
  const { unmount } = mount();
  unmount();
  await finish(a, "test-a");
});
