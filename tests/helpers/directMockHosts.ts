import type { TestContext } from "node:test";

/** Keep ambient proxies for real destinations while exercising mocked direct transports. */
export function useDirectMockHosts(t: Pick<TestContext, "after">, ...hosts: string[]): void {
  const previous = process.env.NO_PROXY;
  process.env.NO_PROXY = [previous, ...hosts].filter(Boolean).join(",");
  t.after(() => {
    if (previous === undefined) delete process.env.NO_PROXY;
    else process.env.NO_PROXY = previous;
  });
}
