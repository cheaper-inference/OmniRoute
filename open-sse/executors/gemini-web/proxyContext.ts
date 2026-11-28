// Proxy setup and context creation for gemini-web. Kept out of the executor so
// the failure path - a context that never gets created - can be tested without
// launching Chromium.

import type { Browser, BrowserContext } from "playwright";
import type { SocksBridge } from "../../utils/socksBridge.ts";
import { resolveExecutorProxy } from "../../utils/executorProxy.ts";

type ExecutorProxyResolution = Awaited<ReturnType<typeof resolveExecutorProxy>>;

export interface GeminiProxyDeps {
  resolveConnectionProxy?: (
    connectionId: string
  ) => Promise<{ proxy?: unknown; directBy?: string } | null | undefined>;
  resolveProviderProxy?: (providerKey: string) => Promise<unknown>;
}

async function defaultConnectionProxy(
  connectionId: string
): Promise<{ proxy?: unknown; directBy?: string } | null> {
  const { resolveProxyForConnection } = await import("../../../src/lib/db/settings.ts");
  return resolveProxyForConnection(connectionId);
}

async function defaultProviderProxy(providerKey: string): Promise<unknown> {
  const { resolveProxyForProvider } = await import("../../../src/lib/db/proxies.ts");
  return resolveProxyForProvider(providerKey);
}

/**
 * The connection's own proxy wins. Without one the proxy configured for the
 * `gemini-web` provider key applies, which is what this executor did before
 * connection-scoped proxies existed (#15076). A connection that turned proxying
 * off stays direct instead of inheriting the provider proxy.
 *
 * The provider record goes through the same resolver as the connection one, so
 * an authenticated SOCKS5 proxy at either scope is bridged instead of being
 * handed to Chromium, which cannot authenticate to it.
 */
export async function resolveGeminiWebProxy(
  connectionId: string | null | undefined,
  deps: GeminiProxyDeps = {}
): Promise<ExecutorProxyResolution> {
  const loadProvider = async (): Promise<ExecutorProxyResolution> =>
    resolveExecutorProxy(await (deps.resolveProviderProxy ?? defaultProviderProxy)("gemini-web"));

  if (!connectionId) return loadProvider();

  const assigned = await (deps.resolveConnectionProxy ?? defaultConnectionProxy)(connectionId);
  const scoped = await resolveExecutorProxy(assigned?.proxy ?? null);
  if (scoped.proxy || assigned?.directBy) return scoped;
  return loadProvider();
}

export interface GeminiContextOptions {
  userAgent: string;
}

/**
 * Create the context and hand the bridge to it. A context that never gets
 * created releases the bridge here; once it exists, its `close` event does.
 */
export async function openGeminiContext(
  browser: Pick<Browser, "newContext">,
  options: GeminiContextOptions,
  connectionId: string | null | undefined,
  deps: GeminiProxyDeps = {}
): Promise<{ context: BrowserContext; bridge: SocksBridge | null }> {
  const { proxy, bridge } = await resolveGeminiWebProxy(connectionId, deps);
  let context: BrowserContext;
  try {
    context = await browser.newContext({ ...options, ...(proxy ? { proxy } : {}) });
  } catch (error) {
    // The context failure is the one the caller needs: a close error here would replace it.
    await bridge?.close().catch(() => undefined);
    throw error;
  }
  if (bridge) {
    context.on("close", () => {
      // Nobody awaits this: an unhandled rejection here would surface as a process-level error.
      void bridge.close().catch(() => undefined);
    });
  }
  return { context, bridge };
}
