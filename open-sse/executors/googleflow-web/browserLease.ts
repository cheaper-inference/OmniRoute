/**
 * Browser lease manager for Google Flow Web sessions.
 *
 * Keeps a single Chromium process warm while requests are active,
 * with isolated browser contexts per account/request. Closes after 60s idle.
 */

export const FLOW_BROWSER_IDLE_MS = 60_000;

type Launch = (options: {
  headless: boolean;
  args?: string[];
  ignoreDefaultArgs?: string[];
}) => Promise<FlowBrowser>;

export type FlowBrowser = {
  isConnected?: () => boolean;
  close: () => Promise<void>;
  newContext: (options: unknown) => Promise<unknown>;
};

type Slot = { launch: Launch; browser: FlowBrowser };

let slot: Slot | null = null;
let inflight = 0;
let idleTimer: ReturnType<typeof setTimeout> | null = null;

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
  if (slot && slot.launch === launch && isAlive(slot.browser)) {
    inflight += 1;
    return slot.browser;
  }
  if (slot) {
    const previous = slot.browser;
    slot = null;
    await previous.close().catch(() => undefined);
  }

  // Stealth launch flags: suppress automation indicators for reCAPTCHA Enterprise
  const browser = await launch({
    headless: true,
    args: [
      "--disable-blink-features=AutomationControlled",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-infobars",
    ],
    ignoreDefaultArgs: ["--enable-automation"],
  });

  slot = { launch, browser };
  inflight += 1;
  return browser;
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
  const previous = slot?.browser;
  slot = null;
  if (previous) await previous.close().catch(() => undefined);
}
