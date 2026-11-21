export function watchOverlap(open: number): "keep" | "refuse" {
  return open >= 2 ? "refuse" : "keep";
}

export type WatchCounter = {
  open(key: string): "keep" | "refuse";
  close(key: string): void;
  size(key: string): number;
};

export function watchCounter(): WatchCounter {
  const open = new Map<string, number>();
  return {
    open(key) {
      const current = open.get(key) ?? 0;
      if (watchOverlap(current) === "refuse") return "refuse";
      open.set(key, current + 1);
      return "keep";
    },
    close(key) {
      const current = open.get(key) ?? 0;
      if (current <= 1) open.delete(key);
      else open.set(key, current - 1);
    },
    size(key) {
      return open.get(key) ?? 0;
    },
  };
}

/**
 * Takes a watch slot and hands back the one call that gives it up. Releasing
 * twice must not free somebody else's slot, so the returned function is a
 * no-op after the first call. A refused slot returns null.
 */
export function watchSlot(counter: WatchCounter, key: string): (() => void) | null {
  if (counter.open(key) === "refuse") return null;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    counter.close(key);
  };
}

/**
 * The answer a second watch on the same connection gets. The counter refuses the
 * third open, so the route can say what happened instead of failing silently.
 */
export function watchRefusal(granted: boolean): { status: number; code: string } | null {
  if (granted) return null;
  return { status: 429, code: "too_many_watches" };
}
