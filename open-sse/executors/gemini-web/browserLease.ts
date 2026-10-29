// #13382: one Chromium process, a fresh context per request. Contexts are
// not shared, so two accounts never type into the same page. The process
// closes after it has been idle.

export const GEMINI_WEB_BROWSER_IDLE_MS = 60_000;

type Launch = (options: { headless: true }) => Promise<GeminiBrowser>;

export type GeminiBrowser = {
  isConnected?: () => boolean;
  close: () => Promise<void>;
  newContext: (options: unknown) => Promise<unknown>;
};

type Slot = { launch: Launch; browser: GeminiBrowser };

let slot: Slot | null = null;
let pending: Promise<GeminiBrowser> | null = null;
let inflight = 0;
let idleTimer: ReturnType<typeof setTimeout> | null = null;

function alive(browser: GeminiBrowser): boolean {
  if (typeof browser.isConnected !== "function") return true;
  return browser.isConnected();
}

function clearIdle() {
  if (!idleTimer) return;
  clearTimeout(idleTimer);
  idleTimer = null;
}

// #16935: a browser that still has in-flight requests is never closed because the caller
// passed a different launcher closure, and concurrent cold acquires share one pending launch.
export async function acquireGeminiBrowser(launch: Launch): Promise<GeminiBrowser> {
  clearIdle();
  if (slot && alive(slot.browser) && (slot.launch === launch || inflight > 0)) {
    inflight += 1;
    return slot.browser;
  }
  if (pending) {
    inflight += 1;
    try {
      return await pending;
    } catch (error) {
      inflight = Math.max(0, inflight - 1);
      throw error;
    }
  }
  if (slot) {
    const previous = slot.browser;
    slot = null;
    await previous.close().catch(() => undefined);
  }
  inflight += 1;
  const launching = launch({ headless: true }).then((browser) => {
    slot = { launch, browser };
    return browser;
  });
  pending = launching;
  try {
    return await launching;
  } catch (error) {
    inflight = Math.max(0, inflight - 1);
    throw error;
  } finally {
    if (pending === launching) pending = null;
  }
}

export async function releaseGeminiBrowser(browser: GeminiBrowser): Promise<void> {
  inflight = Math.max(0, inflight - 1);
  if (inflight > 0 || slot?.browser !== browser) return;
  clearIdle();
  idleTimer = setTimeout(() => {
    idleTimer = null;
    if (inflight === 0 && slot?.browser === browser) {
      slot = null;
      void browser.close().catch(() => undefined);
    }
  }, GEMINI_WEB_BROWSER_IDLE_MS);
  idleTimer.unref?.();
}

export async function resetGeminiBrowserLeaseForTests(): Promise<void> {
  clearIdle();
  inflight = 0;
  pending = null;
  const previous = slot?.browser;
  slot = null;
  if (previous) await previous.close().catch(() => undefined);
}

// #16935: one launcher per Playwright launch function, so repeated requests share lease identity
// (a replaced launch function, e.g. a test double, still gets its own launcher).
const launchers = new WeakMap<object, Launch>();

export function getStableLauncher(chromium: {
  launch: (options: { headless: true }) => Promise<unknown>;
}): Launch {
  const key = chromium.launch;
  let launcher = launchers.get(key);
  if (!launcher) {
    launcher = (options) => chromium.launch(options) as Promise<GeminiBrowser>;
    launchers.set(key, launcher);
  }
  return launcher;
}
