/** Each explicit refresh must read after earlier reads settle, never borrow stale in-flight evidence. */
export function queueSummaryRefresh(read: () => Promise<void>): () => Promise<void> {
  let pending: Promise<void> = Promise.resolve();
  return () => {
    const next = pending.then(read, read);
    pending = next;
    return next;
  };
}
