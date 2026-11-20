/**
 * Shared Google Flow page plumbing for the Flow client: session cookies, the
 * browser/context lifecycle, workspace entry and host validation of the URLs
 * the page hands back. Playwright is loaded lazily (and can be faked in tests).
 */

import type { BrowserContext, Page } from "playwright";
import {
  acquireFlowBrowser,
  getStableFlowLauncher,
  releaseFlowBrowser,
  type FlowBrowser,
} from "./browserLease.ts";
import { isUrlHost, isUrlHostOrSubdomain } from "../../utils/urlHost.ts";
import { normalizeFlowCookies } from "../../services/usage/googleflow.ts";

export const FLOW_HOME_URL = "https://flow.google.com/";

export const FLOW_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36";

export type FlowCredentials = { apiKey?: string; accessToken?: string };

/** Credential fields the Flow client reads beyond the cookie string. */
type FlowCredentialExtras = {
  customUserAgent?: unknown;
  providerSpecificData?: { customUserAgent?: unknown };
};

// ─── Host validation ────────────────────────────────────────────────────────

function parseHttpsUrl(value: string | null | undefined): URL | null {
  if (typeof value !== "string" || !value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

/** A Flow video asset URL: flow-content.google/video/… or *.googlevideo.com/videoplayback. */
export function isFlowVideoMediaUrl(value: string | null | undefined): boolean {
  const url = parseHttpsUrl(value);
  if (!url) return false;
  if (isUrlHost(url.href, "flow-content.google")) return url.pathname.startsWith("/video/");
  if (isUrlHostOrSubdomain(url.href, "googlevideo.com")) {
    return url.pathname.startsWith("/videoplayback");
  }
  return false;
}

/** A Flow video asset URL that carries its CDN signature (a finished, fetchable render). */
export function isSignedFlowVideoMediaUrl(value: string | null | undefined): boolean {
  if (!isFlowVideoMediaUrl(value)) return false;
  const url = new URL(value as string);
  if (isUrlHost(url.href, "flow-content.google")) return url.searchParams.has("Signature");
  return url.searchParams.has("sig") || url.searchParams.has("lsig");
}

/** A generated Flow image: *.googleusercontent.com/asb/… */
export function isFlowImageMediaUrl(value: string | null | undefined): boolean {
  const url = parseHttpsUrl(value);
  if (!url || !isUrlHostOrSubdomain(url.href, "googleusercontent.com")) return false;
  return url.pathname.startsWith("/asb/");
}

/** Flow's public /about landing page (shown to signed-out or first-time visitors). */
function isFlowAboutUrl(value: string | null | undefined): boolean {
  const url = parseHttpsUrl(value);
  return !!url && url.pathname.includes("/about");
}

/** Flow bounced the session to Google sign-in or the public /about landing page. */
export function isFlowSignedOutUrl(value: string | null | undefined): boolean {
  if (isUrlHostOrSubdomain(value, "accounts.google.com")) return true;
  return isFlowAboutUrl(value);
}

/** Origin + path only: signed CDN query strings must never reach the logs. */
export function redactUrl(value: string): string {
  const url = parseHttpsUrl(value);
  return url ? `${url.origin}${url.pathname}` : "[unparseable url]";
}

// ─── Session cookies ────────────────────────────────────────────────────────

/** Google session cookies that rotate while a Flow page is open. */
const ROTATABLE_FLOW_COOKIES = ["__Secure-1PSID", "__Secure-1PSIDTS", "__Secure-1PSIDCC"];

type CookiePair = [name: string, value: string];

function splitCookieHeader(header: string): CookiePair[] {
  const pairs: CookiePair[] = [];
  for (const pair of header.split(";")) {
    const index = pair.indexOf("=");
    const name = index > 0 ? pair.slice(0, index).trim() : "";
    if (name) pairs.push([name, pair.slice(index + 1).trim()]);
  }
  return pairs;
}

function jarValues(jarCookies: ReadonlyArray<{ name?: unknown; value?: unknown }>) {
  const jar = new Map<string, string>();
  for (const cookie of jarCookies) {
    if (typeof cookie?.name === "string" && typeof cookie.value === "string" && cookie.value) {
      jar.set(cookie.name, cookie.value);
    }
  }
  return jar;
}

/**
 * Merge the cookies Google rotated during a run into the stored cookie header.
 * Only cookies already present in the stored header, plus the rotating
 * __Secure-1PSID* family, are taken from the browser jar; analytics/consent
 * cookies the page picked up are never promoted to credentials. Returns null
 * when nothing changed.
 */
export function mergeRotatedFlowCookies(
  storedCookieHeader: string,
  jarCookies: ReadonlyArray<{ name?: unknown; value?: unknown }>
): string | null {
  const jar = jarValues(jarCookies);
  const stored = splitCookieHeader(storedCookieHeader);
  const storedNames = new Set(stored.map(([name]) => name));
  const merged: CookiePair[] = stored.map(([name, value]) => [name, jar.get(name) ?? value]);
  for (const name of ROTATABLE_FLOW_COOKIES) {
    const rotated = jar.get(name);
    if (rotated !== undefined && !storedNames.has(name)) merged.push([name, rotated]);
  }
  const changed =
    merged.length !== stored.length || merged.some(([, value], i) => value !== stored[i][1]);
  return changed ? merged.map(([name, value]) => `${name}=${value}`).join("; ") : null;
}

/**
 * Read the live cookie jar after a run and hand rotated session cookies to the
 * caller, which persists them through the provider-connection DB module. A
 * persistence failure never fails the generation.
 */
export async function persistRotatedFlowCookies(
  context: Pick<BrowserContext, "cookies"> | null,
  storedCookieHeader: string,
  onSessionCookieRotated?: (cookie: string) => Promise<void>
): Promise<void> {
  if (!context || !onSessionCookieRotated) return;
  try {
    const merged = mergeRotatedFlowCookies(storedCookieHeader, await context.cookies());
    if (merged) await onSessionCookieRotated(merged);
  } catch (err) {
    console.warn(
      "[FLOW_DEBUG] Failed to persist rotated cookies:",
      err instanceof Error ? err.name : "unknown error"
    );
  }
}

type FlowCookieParam = {
  name: string;
  value: string;
  domain: string;
  path: string;
  secure: boolean;
  httpOnly?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
};

function flowCookieDomain(name: string, explicit?: unknown): string {
  if (name.includes("OSID") || name.startsWith("__Host-")) return "flow.google.com";
  return typeof explicit === "string" && explicit ? explicit : ".google.com";
}

function toSameSite(value: unknown): "Strict" | "Lax" | "None" {
  const normalized = String(value || "").toLowerCase();
  if (normalized === "no_restriction" || normalized === "none") return "None";
  return normalized === "strict" ? "Strict" : "Lax";
}

function cookieFromJson(item: Record<string, unknown>): FlowCookieParam {
  const name = String(item.name).trim();
  return {
    name,
    value: String(item.value).trim(),
    domain: flowCookieDomain(name, item.domain),
    path: typeof item.path === "string" && item.path ? item.path : "/",
    secure: item.secure !== false,
    httpOnly: Boolean(item.httpOnly),
    sameSite: toSameSite(item.sameSite),
  };
}

/** Cookie-Editor / EditThisCookie JSON export → Playwright cookies (keeps their domains). */
function parseJsonCookies(token: string): FlowCookieParam[] {
  const raw = token.trim();
  if (!raw.startsWith("[") || !raw.endsWith("]")) return [];
  try {
    const list: unknown = JSON.parse(raw);
    if (!Array.isArray(list)) return [];
    return list
      .filter((item) => item && item.name && typeof item.value === "string")
      .map((item) => cookieFromJson(item as Record<string, unknown>));
  } catch {
    console.error("[FLOW_DEBUG] Failed to parse JSON cookies");
    return [];
  }
}

function parseHeaderCookies(cookieHeader: string): FlowCookieParam[] {
  return splitCookieHeader(cookieHeader)
    .filter(([, value]) => value)
    .map(([name, value]) => ({
      name,
      value,
      domain: flowCookieDomain(name),
      path: "/",
      secure: true,
    }));
}

function buildFlowCookies(token: string, cookieHeader: string): FlowCookieParam[] {
  const fromJson = parseJsonCookies(token);
  return fromJson.length > 0 ? fromJson : parseHeaderCookies(cookieHeader);
}

/** The stored credential and its normalized Cookie header; throws when there is none. */
export function resolveFlowCookies(credentials: FlowCredentials): {
  token: string;
  cookieHeader: string;
} {
  const token = credentials.apiKey || credentials.accessToken || "";
  const cookieHeader = normalizeFlowCookies(token);
  if (!cookieHeader) {
    throw new Error("Missing Google Flow cookies (__Secure-1PSID)");
  }
  return { token, cookieHeader };
}

function resolveUserAgent(credentials: FlowCredentials): string {
  const extras = credentials as FlowCredentialExtras;
  const customUa = extras?.providerSpecificData?.customUserAgent || extras?.customUserAgent;
  return typeof customUa === "string" && customUa.trim() ? customUa.trim() : FLOW_USER_AGENT;
}

// ─── Browser session lifecycle ──────────────────────────────────────────────

type PlaywrightModule = typeof import("playwright");
const importPlaywright = (): Promise<PlaywrightModule> => import("playwright");
let loadPlaywright = importPlaywright;

/** Test seam: drive the Flow client with a fake Playwright (null restores the real one). */
export function setFlowPlaywrightLoaderForTests(loader: (() => Promise<unknown>) | null): void {
  loadPlaywright = loader ? (loader as () => Promise<PlaywrightModule>) : importPlaywright;
}

/** One generation run: the context to close and the generation timer to clear. */
export type FlowRun = {
  browser: FlowBrowser;
  context: BrowserContext | null;
  timer: ReturnType<typeof setTimeout> | undefined;
};

export async function startFlowRun(): Promise<FlowRun> {
  let playwright: PlaywrightModule;
  try {
    playwright = await loadPlaywright();
  } catch {
    throw new Error("Playwright is not installed. Run: npx playwright install chromium");
  }
  const browser = await acquireFlowBrowser(getStableFlowLauncher(playwright.chromium));
  return { browser, context: null, timer: undefined };
}

/** Fresh context with the account's cookies and one page. */
export async function openFlowPage(
  run: FlowRun,
  credentials: FlowCredentials,
  token: string,
  cookieHeader: string
): Promise<Page> {
  run.context = (await run.browser.newContext({
    userAgent: resolveUserAgent(credentials),
    viewport: { width: 1280, height: 800 },
  })) as BrowserContext;
  await run.context.addCookies(buildFlowCookies(token, cookieHeader));
  return run.context.newPage();
}

export async function finishFlowRun(
  run: FlowRun,
  cookieHeader: string,
  onSessionCookieRotated?: (cookie: string) => Promise<void>
): Promise<void> {
  if (run.timer) clearTimeout(run.timer);
  if (run.context) {
    await persistRotatedFlowCookies(run.context, cookieHeader, onSessionCookieRotated);
    await run.context.close().catch(() => {});
  }
  await releaseFlowBrowser(run.browser).catch(() => {});
}

// ─── Page helpers ───────────────────────────────────────────────────────────

const FLOW_ENTRY_CTA_SELECTOR =
  "a:has-text('Create with Google Flow'), a:has-text('Начать'), a:has-text('Попробовать'), a:has-text('Sign in'), a:has-text('Войти'), a[href*='flow.google.com'], button:has-text('Create')";

async function leaveAboutPage(page: Page): Promise<void> {
  const ctaBtn = page.locator(FLOW_ENTRY_CTA_SELECTOR).first();
  if (await ctaBtn.isVisible({ timeout: 4_000 }).catch(() => false)) {
    await ctaBtn.click().catch(() => {});
    await page.waitForTimeout(3_000);
    return;
  }
  await page.goto(FLOW_HOME_URL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2_000);
}

/** Open Flow, step past the /about landing page, and fail when the session is signed out. */
export async function enterFlowWorkspace(page: Page): Promise<void> {
  await page.goto(FLOW_HOME_URL, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForTimeout(2_000);
  if (isFlowAboutUrl(page.url())) await leaveAboutPage(page);
  if (isFlowSignedOutUrl(page.url())) {
    throw new Error(
      "Google Flow session is expired or requires re-authentication (redirected to " +
        redactUrl(page.url()) +
        ")"
    );
  }
}

export async function typeFlowPrompt(page: Page, text: string): Promise<void> {
  const editor = page.locator(".ProseMirror").first();
  await editor.waitFor({ timeout: 15_000 });
  await editor.click();
  await page.keyboard.type(text);
  await page.waitForTimeout(1_000);
}

export async function submitFlowPrompt(page: Page, sendSelector: string): Promise<void> {
  const sendBtn = page.locator(sendSelector).first();
  if (await sendBtn.isVisible({ timeout: 2_000 }).catch(() => false)) {
    await sendBtn.click();
  } else {
    await page.keyboard.press("Enter");
  }
}

/** One poll interval; false once the run has finished or the page went away. */
export async function waitFlowPollTick(
  page: Page,
  state: { finished: boolean },
  ms: number
): Promise<boolean> {
  if (state.finished) return false;
  const slept = await page.waitForTimeout(ms).then(
    () => true,
    () => false
  );
  return slept && !state.finished;
}

// ─── Request helpers for the media handlers ─────────────────────────────────

function readNonEmptyString(value: unknown): string | undefined {
  return typeof value === "string" && value ? value : undefined;
}

/** Aspect ratio from the OpenAI-style (`aspect_ratio`, `size`) or native (`aspectRatio`) body. */
export function readFlowAspectRatio(body: Record<string, unknown>): string | undefined {
  return (
    readNonEmptyString(body.aspect_ratio) ??
    readNonEmptyString(body.aspectRatio) ??
    readNonEmptyString(body.size)
  );
}

/** The cookie credential fields the Flow client reads from a stored connection. */
export function toFlowCredentials(credentials: Record<string, unknown> | null): FlowCredentials {
  return {
    apiKey: readNonEmptyString(credentials?.apiKey),
    accessToken: readNonEmptyString(credentials?.accessToken),
  };
}

/** HTTP status for a Flow failure: 429 for exhausted credits, 401 for a dead session. */
export function flowErrorStatus(message: string): number {
  if (message.includes("quota exhausted") || message.includes("credits remaining")) return 429;
  if (message.includes("session is expired") || message.includes("re-authentication")) return 401;
  return 502;
}
