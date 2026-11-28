import { act, renderHook } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { useLocalDismissal } from "@/shared/hooks/useLocalDismissal";

const storageKey = "test-local-dismissal";

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

it("synchronizes consumers of the same key and restores dismissal on remount", () => {
  const first = renderHook(() => useLocalDismissal(storageKey));
  const second = renderHook(() => useLocalDismissal(storageKey));
  const unrelated = renderHook(() => useLocalDismissal("other-key"));

  expect(first.result.current.dismissed).toBe(false);
  act(() => first.result.current.dismiss());
  expect(first.result.current.dismissed).toBe(true);
  expect(second.result.current.dismissed).toBe(true);
  expect(unrelated.result.current.dismissed).toBe(false);

  first.unmount();
  expect(renderHook(() => useLocalDismissal(storageKey)).result.current.dismissed).toBe(true);
});

it("updates when another tab sets or clears local storage", () => {
  const { result } = renderHook(() => useLocalDismissal(storageKey));

  act(() => {
    localStorage.setItem(storageKey, "1");
    window.dispatchEvent(new StorageEvent("storage", { key: storageKey }));
  });
  expect(result.current.dismissed).toBe(true);

  act(() => {
    localStorage.clear();
    window.dispatchEvent(new StorageEvent("storage"));
  });
  expect(result.current.dismissed).toBe(false);
});

it("handles blocked local storage without throwing", () => {
  vi.spyOn(window, "localStorage", "get").mockImplementation(() => {
    throw new DOMException("Storage is blocked", "SecurityError");
  });

  const { result } = renderHook(() => useLocalDismissal(storageKey));
  expect(result.current.dismissed).toBe(false);
  expect(() => act(() => result.current.dismiss())).not.toThrow();
  expect(result.current.dismissed).toBe(false);
});
