/**
 * Browser lease manager for Google Flow Web sessions.
 *
 * Keeps a single Chromium process warm while requests are active,
 * with isolated browser contexts per account/request. Closes after 60s idle.
 *
 * Same lease rules as gemini-web/browserLease.ts (#16935): a browser that still
 * has in-flight requests is never closed because a caller passed a different
 * launcher, and concurrent cold acquires share one pending launch, so two
 * requests can never orphan a Chromium process or close each other's browser.
 */

export const FLOW_BROWSER_IDLE_MS = 60_000;

export type FlowLaunchOptions = {
  headless: boolean;
  args?: string[];
  ignoreDefaultArgs?: string[];
};

type Launch = (options: FlowLaunchOptions) => Promise<FlowBrowser>;

export type FlowBrowser = {
  isConnected?: () => boolean;
  close: () => Promise<void>;
  newContext: (options: unknown) => Promise<unknown>;
};

type Slot = { launch: Launch; browser: FlowBrowser };

let slot: Slot | null = null;
let pending: Promise<FlowBrowser> | null = null;
let inflight = 0;
let idleTimer: ReturnType<typeof setTimeout> | null = null;

// Stealth launch flags: suppress automation indicators for reCAPTCHA Enterprise
const FLOW_LAUNCH_OPTIONS: FlowLaunchOptions = {
  headless: true,
  args: [
    "--disable-blink-features=AutomationControlled",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--disable-infobars",
  ],
  ignoreDefaultArgs: ["--enable-automation"],
};

function isAlive(browser: FlowBrowser): boolean {
  if (typeof browser.isConnected !== "function") return true;
  return browser.isConnected();
}

function clearIdleTimer() {
  if (!idleTimer) return;
  clearTimeout(idleTimer);
  idleTimer = null;
}

export async function acquireFlowBrowser(launch: Launch): Promise<FlowBrowser> {
  clearIdleTimer();
  if (slot && isAlive(slot.browser) && (slot.launch === launch || inflight > 0)) {
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
  const launching = launch({ ...FLOW_LAUNCH_OPTIONS }).then((browser) => {
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

export async function releaseFlowBrowser(browser: FlowBrowser): Promise<void> {
  inflight = Math.max(0, inflight - 1);
  if (inflight > 0 || slot?.browser !== browser) return;

  clearIdleTimer();
  idleTimer = setTimeout(() => {
    idleTimer = null;
    if (inflight === 0 && slot?.browser === browser) {
      slot = null;
      void browser.close().catch(() => undefined);
    }
  }, FLOW_BROWSER_IDLE_MS);
  idleTimer.unref?.();
}

export async function resetFlowBrowserLeaseForTests(): Promise<void> {
  clearIdleTimer();
  inflight = 0;
  pending = null;
  const previous = slot?.browser;
  slot = null;
  if (previous) await previous.close().catch(() => undefined);
}

// One launcher per Playwright launch function, so repeated requests share lease identity
// (a replaced launch function, e.g. a test double, still gets its own launcher).
const launchers = new WeakMap<object, Launch>();

export function getStableFlowLauncher(chromium: {
  launch: (options: FlowLaunchOptions) => Promise<unknown>;
}): Launch {
  const key = chromium.launch;
  let launcher = launchers.get(key);
  if (!launcher) {
    launcher = (options) => chromium.launch(options) as Promise<FlowBrowser>;
    launchers.set(key, launcher);
  }
  return launcher;
}
