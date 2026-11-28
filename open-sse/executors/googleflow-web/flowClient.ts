/**
 * FlowClient — executes video and image generations through Google Flow
 * using browser automation + RPC response interception.
 */

import type { Page, Response as PlaywrightResponse } from "playwright";
import {
  enterFlowWorkspace,
  finishFlowRun,
  FLOW_HOME_URL,
  isFlowImageMediaUrl,
  isFlowVideoMediaUrl,
  isSignedFlowVideoMediaUrl,
  openFlowPage,
  redactUrl,
  resolveFlowCookies,
  startFlowRun,
  submitFlowPrompt,
  typeFlowPrompt,
  waitFlowPollTick,
  type FlowCredentials,
  type FlowRun,
} from "./flowPage.ts";
import { isUrlHostOrSubdomain } from "../../utils/urlHost.ts";
import { fetchFlowCredits, invalidateFlowCreditsCache } from "../../services/usage/googleflow.ts";

export interface FlowVideoOptions {
  prompt: string;
  model?: string;
  aspectRatio?: string;
  duration?: number;
  credentials: FlowCredentials;
  /** Persists the session cookie after Google rotated it during the run. */
  onSessionCookieRotated?: (cookie: string) => Promise<void>;
}

export interface FlowImageOptions {
  prompt: string;
  model?: string;
  aspectRatio?: string;
  credentials: FlowCredentials;
  /** Persists the session cookie after Google rotated it during the run. */
  onSessionCookieRotated?: (cookie: string) => Promise<void>;
}

export interface FlowMediaResult {
  url: string;
  format?: string;
  b64_json?: string;
}

// Map user model names to UI selector / model keys
export const VIDEO_MODEL_MAP: Record<string, string> = {
  "veo-3.1": "veo_3_1_quality",
  "veo-3.1-quality": "veo_3_1_quality",
  "veo-3.1-fast": "veo_3_1_fast",
  "veo-3.1-lite": "veo_3_1_lite",
  "omni-1.1-flash": "omni_flash",
  "omni-flash": "omni_flash",
};

export const IMAGE_MODEL_MAP: Record<string, string> = {
  "nano-banana-2.1": "NARWHAL",
  "nano-banana-2": "NARWHAL",
  "nano-banana-pro": "GEM_PIX_2",
  "nano-banana-2-lite": "HARBOR_SEAL",
  "omni-1.1-flash": "omni_flash",
};

/**
 * Normalizes video model string. Defaults to Veo 3.1 Fast if not specified.
 */
export function normalizeVideoModel(input?: string): string {
  if (!input) return "veo_3_1_fast";
  const cleaned = input
    .toLowerCase()
    .replace(/^googleflow-web\//, "")
    .replace(/^gflow\//, "");
  return VIDEO_MODEL_MAP[cleaned] || "veo_3_1_fast";
}

/**
 * Normalizes image model string. Defaults to Nano Banana Pro.
 */
export function normalizeImageModel(input?: string): string {
  if (!input) return "GEM_PIX_2";
  const cleaned = input
    .toLowerCase()
    .replace(/^googleflow-web\//, "")
    .replace(/^gflow\//, "");
  return IMAGE_MODEL_MAP[cleaned] || "GEM_PIX_2";
}

/**
 * Parses aspect ratio for video (16:9 or 9:16).
 */
export function normalizeVideoAspectRatio(input?: string): string {
  if (input === "9:16" || input === "vertical") return "9:16";
  return "16:9";
}

/**
 * Parses aspect ratio for image (16:9, 4:3, 1:1, 3:4, 9:16).
 */
export function normalizeImageAspectRatio(input?: string): string {
  const valid = ["16:9", "4:3", "1:1", "3:4", "9:16"];
  if (input && valid.includes(input)) return input;
  return "16:9";
}

// ─── Video ──────────────────────────────────────────────────────────────────

const VIDEO_TIMEOUT_MS = 600_000;
/** Veo takes at least 15s to render; anything earlier is an existing canvas asset. */
const VIDEO_MIN_RENDER_MS = 15_000;
const VIDEO_POLL_ROUNDS = 200;
const VIDEO_CREDITS_REQUIRED = 20;

const VIDEO_SEND_SELECTOR =
  "button.generate-icon-button, button[aria-label='Начать генерацию'], button[aria-label*='generat' i], button[aria-label*='send' i], button:has-text('arrow_forward')";
const VIDEO_APPROVE_SELECTOR =
  ".option-row:not(.read-only):has-text('Approve'), .option-row:not(.read-only):has-text('Одобрить'), button:not([disabled]):has-text('Approve'), button:not([disabled]):has-text('Одобрить'), [role='button']:not([aria-disabled='true']):has-text('Approve'), [role='button']:not([aria-disabled='true']):has-text('Одобрить')";
const VIDEO_PROGRESS_SELECTOR =
  "flow-video-tile, .video-container, .media-option, .generation-card, [class*='generation-progress'], [class*='rendering'], [class*='media-card']";
const VIDEO_MODE_SELECTOR =
  "button:has-text('Видео'), button:has-text('Video'), [role='menuitem']:has-text('Видео'), [role='menuitem']:has-text('Video')";
const VIDEO_DOWNLOAD_SELECTOR =
  "button[aria-label*='Download'], button[aria-label*='Скачать'], a[download]";

const UUID_RE = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi;
const ASSET_ID_RE =
  /(?:video\/|[a-f0-9-]{36}|image\/)([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i;
const BODY_VIDEO_URL_RE = /(https:\/\/flow-content\.google\/video\/[^"\s\\]+)/g;

type VideoRunState = {
  finished: boolean;
  promptSentAt: number;
  existingVideoUrls: Set<string>;
  existingAssetIds: Set<string>;
};

function extractAssetId(value: string): string | null {
  const match = ASSET_ID_RE.exec(value);
  return match ? match[1].toLowerCase() : null;
}

function addUuids(text: string, ids: Set<string>): void {
  for (const uuid of text.match(UUID_RE) || []) ids.add(uuid.toLowerCase());
}

/** An asset that already existed before the prompt was sent (never the new render). */
function isKnownVideo(state: VideoRunState, url: string): boolean {
  if (state.existingVideoUrls.has(url)) return true;
  const assetId = extractAssetId(url);
  return !!assetId && state.existingAssetIds.has(assetId);
}

function rememberExistingVideo(state: VideoRunState, url: string): void {
  if (!isFlowVideoMediaUrl(url)) return;
  state.existingVideoUrls.add(url);
  const assetId = extractAssetId(url);
  if (assetId) state.existingAssetIds.add(assetId);
}

function isFlowRpcOrMediaResponse(url: string): boolean {
  return (
    isFlowVideoMediaUrl(url) ||
    isUrlHostOrSubdomain(url, "flow.google.com") ||
    url.includes("batchexecute") ||
    url.includes("labs-flow")
  );
}

function findNewVideoUrlInBody(body: string, state: VideoRunState): string | null {
  if (!body.includes("flow-content.google/video")) return null;
  for (const match of body.matchAll(BODY_VIDEO_URL_RE)) {
    const cleanUrl = match[1].replace(/\\\\u003d|\\u003d/g, "=").replace(/\\\\u0026|\\u0026/g, "&");
    if (!isKnownVideo(state, cleanUrl) && isSignedFlowVideoMediaUrl(cleanUrl)) return cleanUrl;
  }
  return null;
}

/** The new signed video URL a network response carries, if any. */
async function inspectVideoResponse(
  response: PlaywrightResponse,
  state: VideoRunState
): Promise<string | null> {
  const url = response.url();
  if (!state.promptSentAt || Date.now() - state.promptSentAt < VIDEO_MIN_RENDER_MS) {
    rememberExistingVideo(state, url);
    return null;
  }
  if (isSignedFlowVideoMediaUrl(url) && !isKnownVideo(state, url)) return url;
  if (!isFlowRpcOrMediaResponse(url)) return null;
  const body = await response.text().catch(() => "");
  return state.finished ? null : findNewVideoUrlInBody(body, state);
}

/** Resolves with the first new signed video URL seen on the network; rejects after 600s. */
function watchVideoResponses(page: Page, run: FlowRun, state: VideoRunState): Promise<string> {
  const promise = new Promise<string>((resolve, reject) => {
    run.timer = setTimeout(() => {
      if (state.finished) return;
      state.finished = true;
      reject(new Error("Timed out waiting for Veo video generation to complete (600s limit)"));
    }, VIDEO_TIMEOUT_MS);

    page.on("response", (response: PlaywrightResponse) => {
      if (state.finished) return;
      void inspectVideoResponse(response, state).then(
        (url) => {
          if (!url || state.finished) return;
          state.finished = true;
          clearTimeout(run.timer);
          console.log("[FLOW_DEBUG] RESOLVED video from network response:", redactUrl(url));
          resolve(url);
        },
        () => undefined
      );
    });
  });
  // Observed here so a throw before Promise.race (e.g. the editor never appears) cannot leave
  // the timeout to reject unhandled later; the race below still sees the rejection.
  promise.catch(() => {});
  return promise;
}

async function assertVideoCredits(cookieHeader: string): Promise<void> {
  const creditsInfo = await fetchFlowCredits(cookieHeader).catch(() => null);
  if (creditsInfo && creditsInfo.credits < VIDEO_CREDITS_REQUIRED) {
    throw new Error(
      `Google Flow quota exhausted (${creditsInfo.credits} Veo credits remaining, ${VIDEO_CREDITS_REQUIRED} required for video generation)`
    );
  }
}

/** Leave any project Flow restored and create a brand-new, isolated one. */
async function openFreshVideoProject(page: Page): Promise<void> {
  await page.goto(FLOW_HOME_URL, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForTimeout(2_000);

  if (page.url().includes("/project/")) {
    const homeBtn = page
      .locator("a[aria-label*='Home' i], button[aria-label*='Home' i], a[href='/']")
      .first();
    if (await homeBtn.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await homeBtn.click();
      await page.waitForTimeout(2_000);
    }
  }

  const newProjBtn = page
    .locator("button:has-text('New project'), button:has-text('Новый проект')")
    .first();
  if (!(await newProjBtn.isVisible({ timeout: 6_000 }).catch(() => false))) return;
  try {
    const startUrl = page.url();
    await newProjBtn.click();
    await page.waitForURL((url) => url.href.includes("/project/") && url.href !== startUrl, {
      timeout: 15_000,
    });
  } catch {
    console.log("[FLOW_DEBUG] Failed to wait for new project URL");
  }
}

/** Switch the project to video mode when Flow opened it in image (Nano Banana) mode. */
async function ensureVideoMode(page: Page): Promise<void> {
  try {
    const settingsTrigger = page.locator(".settings-trigger-button").first();
    await settingsTrigger.waitFor({ state: "visible", timeout: 8_000 }).catch(() => {});
    const triggerText = await settingsTrigger.innerText().catch(() => "");
    if (!triggerText.includes("Banana") && triggerText.toLowerCase().includes("veo")) return;
    await settingsTrigger.click();
    await page.waitForTimeout(1_000);
    const videoModeBtn = page.locator(VIDEO_MODE_SELECTOR).first();
    if (await videoModeBtn.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await videoModeBtn.click();
      await page.waitForTimeout(1_000);
    }
    await page.keyboard.press("Escape").catch(() => {});
    await page.waitForTimeout(500);
  } catch {
    console.warn("[FLOW_DEBUG] Failed to ensure video mode");
  }
}

async function clickApproveIfPresent(page: Page, timeoutMs: number): Promise<boolean> {
  const btn = page.locator(VIDEO_APPROVE_SELECTOR).first();
  if (!(await btn.isVisible({ timeout: timeoutMs }).catch(() => false))) return false;
  await btn.click().catch(() => {});
  return true;
}

/** True while a render tile still shows a progress percentage; clicks a finished tile. */
async function checkVideoProgress(page: Page, state: VideoRunState): Promise<boolean> {
  try {
    const progressEl = page.locator(VIDEO_PROGRESS_SELECTOR).first();
    if (!(await progressEl.isVisible({ timeout: 500 }).catch(() => false))) return false;
    const text = await progressEl.innerText().catch(() => "");
    if (text.includes("%") && !text.includes("100%")) return true;
    if (state.finished) return false;
    // Click the container to open the editor or trigger the CDN stream
    await progressEl.click().catch(() => {});
    await page.waitForTimeout(1_000).catch(() => {});
  } catch {
    // The tile can detach mid-check; the next round retries.
  }
  return false;
}

async function readVideoCandidates(page: Page): Promise<string[]> {
  const fromElement = await page
    .evaluate(() => {
      const video = document.querySelector("video");
      return video ? video.src || video.currentSrc : null;
    })
    .catch(() => null);
  const downloadBtn = page.locator(VIDEO_DOWNLOAD_SELECTOR).first();
  const fromDownload = (await downloadBtn.isVisible({ timeout: 300 }).catch(() => false))
    ? await downloadBtn.getAttribute("href").catch(() => null)
    : null;
  const fromTags = await page
    .$$eval("video", (els) =>
      els.map((e) => e.src || e.currentSrc).filter((s) => s && s.startsWith("http"))
    )
    .catch(() => [] as string[]);
  return [fromElement, fromDownload, ...fromTags].filter((v): v is string => !!v);
}

/** A new video asset visible in the DOM (video element, download link or video tags). */
async function findNewVideoInDom(page: Page, state: VideoRunState): Promise<string | null> {
  const candidates = await readVideoCandidates(page);
  if (state.finished) return null;
  return candidates.find((url) => isFlowVideoMediaUrl(url) && !isKnownVideo(state, url)) ?? null;
}

async function pollForVideo(page: Page, state: VideoRunState): Promise<string> {
  for (let i = 0; i < VIDEO_POLL_ROUNDS; i++) {
    if (!(await waitFlowPollTick(page, state, 3_000))) return "";
    await clickApproveIfPresent(page, 500).catch(() => {});
    if (Date.now() - state.promptSentAt < VIDEO_MIN_RENDER_MS) continue;
    if (await checkVideoProgress(page, state)) continue;
    if (state.finished) return "";
    const found = await findNewVideoInDom(page, state);
    if (found) {
      state.finished = true;
      console.log("[FLOW_DEBUG] RESOLVED video from the page DOM:", redactUrl(found));
      return found;
    }
  }
  throw new Error("Polling loop finished without finding video asset in DOM or network");
}

async function runVideoGeneration(page: Page, run: FlowRun, prompt: string): Promise<string> {
  await enterFlowWorkspace(page);
  await openFreshVideoProject(page);

  const state: VideoRunState = {
    finished: false,
    promptSentAt: 0,
    existingVideoUrls: new Set(),
    existingAssetIds: new Set(),
  };
  // Pre-scan existing asset IDs from the page and every response before the prompt is sent.
  addUuids(await page.content().catch(() => ""), state.existingAssetIds);
  const initialAssetListener = async (response: PlaywrightResponse) => {
    addUuids(await response.text().catch(() => ""), state.existingAssetIds);
  };
  page.on("response", initialAssetListener);
  const networkVideo = watchVideoResponses(page, run, state);

  await ensureVideoMode(page);
  await typeFlowPrompt(page, `Create a video: ${prompt}`);
  state.promptSentAt = Date.now();
  // Stop collecting "existing" IDs so the new asset is not blackholed.
  page.off("response", initialAssetListener);
  await submitFlowPrompt(page, VIDEO_SEND_SELECTOR);
  await clickApproveIfPresent(page, 12_000);

  try {
    return await Promise.race([networkVideo, pollForVideo(page, state)]);
  } finally {
    state.finished = true;
  }
}

/**
 * Generates a video using Google Flow Web session.
 */
export async function generateFlowVideo(opts: FlowVideoOptions): Promise<FlowMediaResult> {
  const { token, cookieHeader } = resolveFlowCookies(opts.credentials);
  // Pre-flight check: ensure enough credits before launching a heavy browser for video
  await assertVideoCredits(cookieHeader);

  const run = await startFlowRun();
  try {
    const page = await openFlowPage(run, opts.credentials, token, cookieHeader);
    const videoUrl = await runVideoGeneration(page, run, opts.prompt);
    if (!videoUrl) {
      throw new Error("Veo video generation finished without producing a valid CDN URL");
    }
    invalidateFlowCreditsCache();
    return { url: videoUrl, format: "mp4" };
  } finally {
    await finishFlowRun(run, cookieHeader, opts.onSessionCookieRotated);
  }
}

// ─── Image ──────────────────────────────────────────────────────────────────

const IMAGE_TIMEOUT_MS = 60_000;
const IMAGE_POLL_ROUNDS = 12;
const IMAGE_SEND_SELECTOR =
  "button[aria-label='Начать генерацию'], button:has-text('arrow_forward')";
const IMAGE_APPROVE_SELECTOR =
  ".option-row[aria-label*='Approve' i], .option-row[aria-label*='Одобр' i], .option-row:has-text('Approve'), .option-row:has-text('Always approve'), .option-row:has-text('Всегда одобрять'), .option-row:has-text('Одобрить'), button:has-text('Approve'), button:has-text('Always approve'), button:has-text('Всегда одобрять'), button:has-text('Одобрить')";
const IMAGE_URL_RE = /(https:\/\/lh3\.googleusercontent\.com\/asb\/[A-Za-z0-9_\-/]+)/;

/** Open a project when Flow landed on the dashboard. */
async function openImageProject(page: Page): Promise<void> {
  if (page.url().includes("/project/")) return;
  const newProjBtn = page
    .locator("button")
    .filter({ hasText: /новый проект|new project|start creating/i })
    .first();
  try {
    await newProjBtn.waitFor({ state: "visible", timeout: 15_000 });
    await newProjBtn.click();
    await page.waitForURL(/.*\/project\/.*/, { timeout: 20_000 });
  } catch {
    const addBtn = page.locator("button:has-text('add')").first();
    if (await addBtn.isVisible().catch(() => false)) {
      await addBtn.click();
      await page.waitForURL(/.*\/project\/.*/, { timeout: 15_000 }).catch(() => {});
    }
  }
}

async function readImageUrlFromResponse(response: PlaywrightResponse): Promise<string | null> {
  const url = response.url();
  if (!url.includes("batchexecute")) return null;
  const body = await response.text();
  const mentionsImage =
    url.includes("bOKtO") || body.includes("bOKtO") || body.includes("googleusercontent.com/asb/");
  if (!mentionsImage) return null;
  const match = IMAGE_URL_RE.exec(body);
  return match && isFlowImageMediaUrl(match[1]) ? match[1] : null;
}

/** Resolves with the first generated image URL seen on the network; rejects after 60s. */
function watchImageResponses(page: Page, run: FlowRun): Promise<string> {
  const promise = new Promise<string>((resolve, reject) => {
    run.timer = setTimeout(() => {
      reject(new Error("Timed out waiting for image generation to complete (60s limit)"));
    }, IMAGE_TIMEOUT_MS);

    page.on("response", (response: PlaywrightResponse) => {
      void readImageUrlFromResponse(response).then(
        (url) => {
          if (!url) return;
          clearTimeout(run.timer);
          resolve(url);
        },
        () => undefined
      );
    });
  });
  // Observed here so a throw before Promise.race (e.g. the editor never appears) cannot leave
  // the timeout to reject unhandled later; the race below still sees the rejection.
  promise.catch(() => {});
  return promise;
}

async function approveImageRun(page: Page): Promise<void> {
  const approveBtn = page.locator(IMAGE_APPROVE_SELECTOR).first();
  try {
    await approveBtn.waitFor({ state: "visible", timeout: 15_000 });
    await approveBtn.click();
  } catch {
    // No approval prompt for this account.
  }
}

async function pollForImage(page: Page, state: { finished: boolean }): Promise<string> {
  for (let i = 0; i < IMAGE_POLL_ROUNDS; i++) {
    if (!(await waitFlowPollTick(page, state, 5_000))) return "";
    const srcs = await page
      .$$eval("img", (els) => els.map((e) => e.src || e.currentSrc))
      .catch(() => [] as string[]);
    const found = srcs.find((src) => isFlowImageMediaUrl(src));
    if (found) {
      state.finished = true;
      return found;
    }
  }
  return "";
}

async function runImageGeneration(page: Page, run: FlowRun, prompt: string): Promise<string> {
  await enterFlowWorkspace(page);
  await openImageProject(page);

  const networkImage = watchImageResponses(page, run);
  await typeFlowPrompt(page, prompt);
  await submitFlowPrompt(page, IMAGE_SEND_SELECTOR);
  await approveImageRun(page);

  const state = { finished: false };
  try {
    return await Promise.race([networkImage, pollForImage(page, state)]);
  } finally {
    state.finished = true;
  }
}

/**
 * Generates an image using Google Flow Web session.
 */
export async function generateFlowImage(opts: FlowImageOptions): Promise<FlowMediaResult> {
  const { token, cookieHeader } = resolveFlowCookies(opts.credentials);

  const run = await startFlowRun();
  try {
    const page = await openFlowPage(run, opts.credentials, token, cookieHeader);
    const imageUrl = await runImageGeneration(page, run, opts.prompt);
    if (!imageUrl) {
      throw new Error("Google Flow image generation finished without producing an image URL");
    }
    invalidateFlowCreditsCache();
    return { url: imageUrl, format: "png" };
  } finally {
    await finishFlowRun(run, cookieHeader, opts.onSessionCookieRotated);
  }
}
