export function singleFlight() {
  const running = new Map<string, Promise<unknown>>();
  return {
    run<T>(key: string, task: () => Promise<T>): Promise<T> {
      const existing = running.get(key) as Promise<T> | undefined;
      if (existing) return existing;
      const created = task().finally(() => {
        if (running.get(key) === created) running.delete(key);
      });
      running.set(key, created);
      return created;
    },
  };
}
