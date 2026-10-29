import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import { useProviderOrder } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/useProviderOrder";
import { PROVIDER_ORDER_KEY } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/providerOrder";
const ids = ["claude", "codex", "antigravity"];
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  localStorage.clear();
});
function blockStorage() {
  for (const method of ["getItem", "setItem", "removeItem"] as const)
    vi.spyOn(Storage.prototype, method).mockImplementation(() => {
      throw Error("storage blocked");
    });
}
it("storage-disabled order is shared across separately mounted Full and overview consumers", () => {
  blockStorage();
  const overview = renderHook(() => useProviderOrder(ids));
  const grid = renderHook(() => useProviderOrder(ids));
  act(() => overview.result.current.reset());
  const reversed = [...overview.result.current.order].reverse();
  act(() => overview.result.current.reorder(reversed));
  expect(overview.result.current.order).toEqual(reversed);
  expect(grid.result.current.order).toEqual(reversed);
  overview.unmount();
  grid.unmount();
  const remounted = renderHook(() => useProviderOrder(ids));
  expect(remounted.result.current.order).toEqual(reversed);
  const other = renderHook(() => useProviderOrder(ids));
  act(() => other.result.current.reset());
  expect(remounted.result.current.custom).toBe(false);
  expect(remounted.result.current.order).toEqual(other.result.current.order);
});
it("a failed write cannot reread stale storage over the shared session order", () => {
  localStorage.setItem(PROVIDER_ORDER_KEY, JSON.stringify(ids));
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw Error("write blocked");
  });
  const first = renderHook(() => useProviderOrder(ids));
  const second = renderHook(() => useProviderOrder(ids));
  const reversed = [...ids].reverse();
  act(() => first.result.current.reorder(reversed));
  expect(first.result.current.order).toEqual(reversed);
  expect(second.result.current.order).toEqual(reversed);
  const later = renderHook(() => useProviderOrder(ids));
  expect(later.result.current.order).toEqual(reversed);
});
it("storage remains persistent and cross-tab changes notify every consumer", () => {
  const first = renderHook(() => useProviderOrder(ids));
  const second = renderHook(() => useProviderOrder(ids));
  act(() => first.result.current.reorder(ids));
  expect(JSON.parse(localStorage.getItem(PROVIDER_ORDER_KEY)!)).toEqual(ids);
  const reversed = [...ids].reverse();
  act(() => {
    localStorage.setItem(PROVIDER_ORDER_KEY, JSON.stringify(reversed));
    window.dispatchEvent(new StorageEvent("storage", { key: PROVIDER_ORDER_KEY }));
  });
  expect(first.result.current.order).toEqual(reversed);
  expect(second.result.current.order).toEqual(reversed);
  act(() => second.result.current.reset());
  expect(localStorage.getItem(PROVIDER_ORDER_KEY)).toBeNull();
  expect(first.result.current.custom).toBe(false);
});
