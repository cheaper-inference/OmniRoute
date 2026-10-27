import { timingSafeEqual } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import type { Browser, BrowserContext, BrowserContextOptions, Page } from "playwright-core";

type Cookie = { name: string; value: string; domain: string };

function sessionToken(cookies: Cookie[]): string {
  const relevant = cookies.filter(
    (cookie) =>
      (cookie.domain === "chatgpt.com" || cookie.domain === ".chatgpt.com") &&
      /^__Secure-next-auth\.session-token(?:\.\d+)?$/.test(cookie.name)
  );
  const plain = relevant.find((cookie) => cookie.name === "__Secure-next-auth.session-token");
  if (plain) return plain.value;
  return relevant
    .sort((a, b) => Number(a.name.split(".").at(-1)) - Number(b.name.split(".").at(-1)))
    .map((cookie) => cookie.value)
    .join("");
}

export function assertMatchingChatGptSession(expected: Cookie[], actual: Cookie[]): void {
  const a = Buffer.from(sessionToken(expected));
  const b = Buffer.from(sessionToken(actual));
  if (!a.length || a.length !== b.length || !timingSafeEqual(a, b)) {
    throw new Error(
      "ChatGPT dedicated browser account does not match this connection. Import the current session from that browser before retrying."
    );
  }
}

export function usePersistentCdpProfile(cdpEndpoint?: string): boolean {
  return Boolean(cdpEndpoint) && process.env.CHATGPT_WEB_CODEX_USE_CDP_PROFILE === "1";
}

/** Persistent profile: the dedicated browser must be signed in to the connection's own account. */
async function assertPersistentAccountMatches(
  context: BrowserContext,
  state: { omnirouteUserId: string; cookies: Cookie[] },
  currentCookies: Cookie[]
): Promise<void> {
  const page = context.pages().find((page) => page.url().startsWith("https://chatgpt.com/"));
  if (!page) throw new Error("Open ChatGPT in the dedicated browser before retrying");
  // Restored background tabs may defer their document and authentication requests.
  await page.bringToFront();
  await page.waitForLoadState("domcontentloaded", { timeout: 30_000 });
  const userId = await page.evaluate(async () => {
    const response = await fetch("/api/auth/session");
    if (!response.ok) return null;
    const session = await response.json();
    return typeof session.user?.id === "string" ? session.user.id : null;
  });
  const account = (cookies: Cookie[]) =>
    cookies.find(
      (cookie) =>
        cookie.name === "_account" &&
        (cookie.domain === ".chatgpt.com" || cookie.domain === "chatgpt.com")
    )?.value;
  if (
    userId !== state.omnirouteUserId ||
    !account(state.cookies) ||
    account(state.cookies) !== account(currentCookies)
  ) {
    throw new Error("ChatGPT dedicated browser account does not match this connection");
  }
}

export async function openChatGptContext(
  browser: Browser,
  storageState: NonNullable<BrowserContextOptions["storageState"]>,
  persistent: boolean
): Promise<BrowserContext> {
  if (!persistent) return browser.newContext({ storageState });
  const context = browser.contexts()[0];
  if (!context) throw new Error("ChatGPT dedicated browser profile is unavailable");
  const state =
    typeof storageState === "string"
      ? JSON.parse(readFileSync(storageState, "utf8"))
      : storageState;
  const currentCookies = await context.cookies("https://chatgpt.com");
  if (typeof state.omnirouteUserId === "string" && state.omnirouteUserId) {
    await assertPersistentAccountMatches(context, state, currentCookies);
  } else {
    assertMatchingChatGptSession(state.cookies, currentCookies);
  }
  if (typeof storageState === "string" && !state.omnirouteUserId) {
    const page = context.pages().find((page) => page.url().startsWith("https://chatgpt.com/"));
    if (!page) throw new Error("Open ChatGPT in the dedicated browser before retrying");
    // Restored background tabs may defer their document and authentication requests.
    await page.bringToFront();
    await page.waitForLoadState("domcontentloaded", { timeout: 30_000 });
    const userId = await page.evaluate(async () => {
      const response = await fetch("/api/auth/session");
      const session = response.ok ? await response.json() : null;
      return typeof session?.user?.id === "string" ? session.user.id : null;
    });
    if (!userId) throw new Error("ChatGPT dedicated browser requires sign-in");
    const captured = await context.storageState();
    writeFileSync(
      storageState,
      JSON.stringify({
        cookies: captured.cookies.filter(
          (cookie) => cookie.domain === "chatgpt.com" || cookie.domain === ".chatgpt.com"
        ),
        origins: captured.origins.filter((origin) => origin.origin === "https://chatgpt.com"),
        omnirouteUserId: userId,
      }),
      { mode: 0o600 }
    );
  }
  return context;
}

let persistentPageBusy = false;
const leasedPages = new WeakSet<Page>();

export function isPersistentChatGptPageBusy(): boolean {
  return persistentPageBusy;
}

export function releasePersistentChatGptPage(page: Page): void {
  if (leasedPages.delete(page)) persistentPageBusy = false;
}

export async function openChatGptPage(context: BrowserContext, persistent: boolean, lease = true) {
  if (!persistent) return context.newPage();
  const pages = context.pages().filter((page) => page.url().startsWith("https://chatgpt.com/"));
  if (persistentPageBusy || pages.length !== 1) {
    throw new Error("ChatGPT dedicated browser is busy or requires exactly one operator tab");
  }
  const page = pages[0];
  if (!page.url().startsWith("https://chatgpt.com/")) {
    throw new Error("Open ChatGPT in the dedicated browser before retrying");
  }
  if (lease) {
    persistentPageBusy = true;
    leasedPages.add(page);
  }
  return page;
}
