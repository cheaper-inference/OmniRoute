/**
 * FlowClient — executes video and image generations through Google Flow
 * using browser automation + RPC response interception.
 */

import { acquireFlowBrowser, releaseFlowBrowser, type FlowBrowser } from "./browserLease.ts";
import {
  normalizeFlowCookies,
  fetchFlowCredits,
  invalidateFlowCreditsCache,
} from "../../services/usage/googleflow.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

export const FLOW_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36";

export interface FlowVideoOptions {
  prompt: string;
  model?: string;
  aspectRatio?: string;
  duration?: number;
  credentials: { apiKey?: string; accessToken?: string };
}

export interface FlowImageOptions {
  prompt: string;
  model?: string;
  aspectRatio?: string;
  credentials: { apiKey?: string; accessToken?: string };
}

export interface FlowMediaResult {
  url: string;
  format?: string;
  b64_json?: string;
}

async function syncRotatedCookies(context: any): Promise<void> {
  if (!context) return;
  try {
    const cookies = await context.cookies();
    if (!Array.isArray(cookies) || cookies.length === 0) return;
    const hasTimestamp = cookies.some((c: any) => c && c.name && c.name.includes("PSIDTS"));
    if (!hasTimestamp) return;

    const fs = await import("fs").catch(() => null);
    if (!fs || !fs.existsSync("/app/data/storage.sqlite") || !fs.existsSync("/app/data/server.env"))
      return;

    const crypto = await import("crypto");
    const env = fs.readFileSync("/app/data/server.env", "utf8");
    let key = "";
    for (const line of env.split("\n")) {
      if (line.startsWith("STORAGE_ENCRYPTION_KEY=")) {
        key = line.split("=")[1].trim();
      }
    }
    if (!key) return;

    const cookieStr = cookies
      .filter((c: any) => c && typeof c.name === "string" && typeof c.value === "string")
      .map((c: any) => `${c.name}=${c.value}`)
      .join("; ");

    const staticKey = crypto.scryptSync(key, "omniroute-field-encryption-v1", 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-gcm", staticKey, iv, { authTagLength: 16 });
    let enc = cipher.update(cookieStr, "utf8", "hex");
    enc += cipher.final("hex");
    const tag = cipher.getAuthTag().toString("hex");
    const encrypted = "enc:v1:" + iv.toString("hex") + ":" + enc + ":" + tag;

    const Database = (await import("better-sqlite3")).default;
    const db = new Database("/app/data/storage.sqlite");
    db.prepare(
      "UPDATE provider_connections SET api_key = ?, updated_at = ? WHERE provider = 'googleflow-web' AND is_active = 1"
    ).run(encrypted, new Date().toISOString());
    db.close();
    console.log("[FLOW_DEBUG] Automatically synced rotated session cookies to storage.sqlite");
  } catch (err) {
    console.error("[FLOW_DEBUG] Failed to auto-sync rotated cookies:", err);
  }
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

/**
 * Generates a video using Google Flow Web session.
 */
export async function generateFlowVideo(opts: FlowVideoOptions): Promise<FlowMediaResult> {
  const token = opts.credentials.apiKey || opts.credentials.accessToken || "";
  const cookieHeader = normalizeFlowCookies(token);
  if (!cookieHeader) {
    throw new Error("Missing Google Flow cookies (__Secure-1PSID)");
  }

  // Pre-flight check: ensure credits >= 20 before launching heavy browser for video
  const creditsInfo = await fetchFlowCredits(cookieHeader).catch(() => null);
  if (creditsInfo && creditsInfo.credits < 20) {
    throw new Error(
      `Google Flow quota exhausted (${creditsInfo.credits} Veo credits remaining, 20 required for video generation)`
    );
  }

  let playwright: any;
  try {
    playwright = await import("playwright");
  } catch {
    throw new Error("Playwright is not installed. Run: npx playwright install chromium");
  }

  const browser = await acquireFlowBrowser((options) => playwright.chromium.launch(options));
  let context: any = null;

  try {
    const customUa =
      (opts.credentials as any)?.providerSpecificData?.customUserAgent ||
      (opts.credentials as any)?.customUserAgent;
    const resolvedUserAgent =
      typeof customUa === "string" && customUa.trim() ? customUa.trim() : FLOW_USER_AGENT;

    context = await browser.newContext({
      userAgent: resolvedUserAgent,
      viewport: { width: 1280, height: 800 },
    });

    let cookiesToSet: Array<{
      name: string;
      value: string;
      domain: string;
      path: string;
      secure: boolean;
      httpOnly?: boolean;
      sameSite?: "Strict" | "Lax" | "None";
    }> = [];

    const rawTrimmed = (token || "").trim();
    if (rawTrimmed.startsWith("[") && rawTrimmed.endsWith("]")) {
      try {
        const rawList = JSON.parse(rawTrimmed);
        if (Array.isArray(rawList)) {
          cookiesToSet = rawList
            .filter((item: any) => item && item.name && typeof item.value === "string")
            .map((item: any) => {
              const name = String(item.name).trim();
              let domain =
                item.domain ||
                (name.includes("OSID") || name.startsWith("__Host-")
                  ? "flow.google.com"
                  : ".google.com");
              if (name.includes("OSID") || name.startsWith("__Host-")) {
                domain = "flow.google.com";
              }
              const sameSiteVal = String(item.sameSite || "").toLowerCase();
              const sameSite: "Strict" | "Lax" | "None" =
                sameSiteVal === "no_restriction" || sameSiteVal === "none"
                  ? "None"
                  : sameSiteVal === "strict"
                    ? "Strict"
                    : "Lax";

              return {
                name,
                value: String(item.value).trim(),
                domain,
                path: item.path || "/",
                secure: item.secure !== false,
                httpOnly: Boolean(item.httpOnly),
                sameSite,
              };
            });
        }
      } catch (e) {
        console.error("[FLOW_DEBUG] Failed to parse JSON cookies:", e);
      }
    }

    if (cookiesToSet.length === 0) {
      for (const pair of cookieHeader.split(";")) {
        const [name, ...valParts] = pair.trim().split("=");
        if (!name || valParts.length === 0) continue;
        const cleanName = name.trim();
        const cleanVal = valParts.join("=").trim();
        if (!cleanName || !cleanVal) continue;

        if (cleanName.includes("OSID") || cleanName.startsWith("__Host-")) {
          cookiesToSet.push({
            name: cleanName,
            value: cleanVal,
            domain: "flow.google.com",
            path: "/",
            secure: true,
          });
        } else {
          cookiesToSet.push({
            name: cleanName,
            value: cleanVal,
            domain: ".google.com",
            path: "/",
            secure: true,
          });
        }
      }
    }
    await context.addCookies(cookiesToSet);

    const page = await context.newPage();

    // Directly navigate to project creation or studio workspace
    await page.goto("https://flow.google.com/", {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    await page.waitForTimeout(2_000);
    console.log("[FLOW_DEBUG] Initial explore URL:", page.url());

    // If redirected to /about, click the main entry button ("Get started", "Create with Google Flow", etc.)
    if (page.url().includes("/about")) {
      console.log("[FLOW_DEBUG] Landed on /about, clicking CTA entry button...");
      const ctaBtn = page
        .locator(
          "a:has-text('Create with Google Flow'), a:has-text('Начать'), a:has-text('Попробовать'), a:has-text('Sign in'), a:has-text('Войти'), a[href*='flow.google.com'], button:has-text('Create')"
        )
        .first();
      if (await ctaBtn.isVisible({ timeout: 4_000 }).catch(() => false)) {
        await ctaBtn.click().catch(() => {});
        await page.waitForTimeout(3_000);
      } else {
        await page.goto("https://flow.google.com/", { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(2_000);
      }
    }
    console.log("[FLOW_DEBUG] Navigated to:", page.url());
    if (page.url().includes("accounts.google.com") || page.url().includes("/about")) {
      throw new Error(
        "Google Flow session is expired or requires re-authentication (redirected to " +
          page.url() +
          ")"
      );
    }

    // Always start by going to the main dashboard so we are guaranteed not to be in an old project
    await page.goto("https://flow.google.com/", {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    await page.waitForTimeout(2_000);

    // If we were redirected into an existing project, click Home or force load /
    if (page.url().includes("/project/")) {
      const homeBtn = page
        .locator("a[aria-label*='Home' i], button[aria-label*='Home' i], a[href='/']")
        .first();
      if (await homeBtn.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await homeBtn.click();
        await page.waitForTimeout(2_000);
      }
    }

    // Now click New Project on the main dashboard to create a brand new isolated project
    let newProjectCreated = false;
    const newProjBtn = page
      .locator("button:has-text('New project'), button:has-text('Новый проект')")
      .first();

    if (await newProjBtn.isVisible({ timeout: 6_000 }).catch(() => false)) {
      try {
        const startUrl = page.url();
        await newProjBtn.click();
        await page.waitForURL((url) => url.href.includes("/project/") && url.href !== startUrl, {
          timeout: 15_000,
        });
        newProjectCreated = true;
        console.log("[FLOW_DEBUG] Created fresh project via button:", page.url());
      } catch (err) {
        console.log("[FLOW_DEBUG] Failed to wait for new project URL:", err);
      }
    }

    // 2. Pre-scan existing asset IDs from BOTH DOM attributes, img/video tags, and script/JSON payloads
    const existingVideoUrls = new Set<string>();
    const existingAssetIds = new Set<string>();

    const extractAssetId = (str: string) => {
      const match =
        /(?:video\/|[a-f0-9-]{36}|image\/)([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i.exec(
          str
        );
      return match ? match[1].toLowerCase() : null;
    };

    try {
      const pageContent = await page.content();
      const allUuids =
        pageContent.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi) || [];
      for (const u of allUuids) {
        existingAssetIds.add(u.toLowerCase());
      }
      console.log(
        "[FLOW_DEBUG] Pre-scanned existing asset UUIDs from page DOM:",
        existingAssetIds.size
      );
    } catch {}

    const initialAssetListener = async (response: any) => {
      try {
        const text = await response.text();
        const foundUuids =
          text.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi) || [];
        for (const u of foundUuids) {
          existingAssetIds.add(u.toLowerCase());
        }
      } catch {}
    };
    page.on("response", initialAssetListener);

    let promptSentAt = 0;
    let videoUrl = "";
    let isFinished = false;

    const videoPromise = new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => {
        if (!isFinished) {
          isFinished = true;
          reject(new Error("Timed out waiting for Veo video generation to complete (600s limit)"));
        }
      }, 600_000);

      page.on("response", async (response: any) => {
        if (isFinished) return;
        const url = response.url();
        const now = Date.now();

        // Veo takes at least 15s to render; anything earlier is existing canvas asset
        if (!promptSentAt || now - promptSentAt < 15_000) {
          if (url.includes("flow-content.google/video")) {
            existingVideoUrls.add(url);
            const aid = extractAssetId(url);
            if (aid) existingAssetIds.add(aid);
          }
          return;
        }

        // Direct CDN video request
        if (url.includes("flow-content.google/video") && url.includes("Signature=")) {
          const aid = extractAssetId(url);
          if (!existingVideoUrls.has(url) && (!aid || !existingAssetIds.has(aid))) {
            console.log("[FLOW_DEBUG] RESOLVED video response with direct CDN URL:", url);
            isFinished = true;
            clearTimeout(timeout);
            resolve(url);
            return;
          }
        }

        // Catch any batchexecute, labs-flow, or direct video/stream response from Google Flow
        if (
          url.includes("flow-content.google/video") ||
          url.includes("batchexecute") ||
          url.includes("labs-flow") ||
          url.includes("flow.google.com")
        ) {
          try {
            const body = await response.text();
            if (isFinished) return;
            if (body.includes("flow-content.google/video")) {
              const matches = body.matchAll(/(https:\/\/flow-content\.google\/video\/[^"\s\\]+)/g);
              for (const match of matches) {
                if (!match || !match[1]) continue;
                const cleanUrl = match[1]
                  .replace(/\\\\u003d|\\u003d/g, "=")
                  .replace(/\\\\u0026|\\u0026/g, "&");
                const aid = extractAssetId(cleanUrl);
                if (
                  !existingVideoUrls.has(cleanUrl) &&
                  (!aid || !existingAssetIds.has(aid)) &&
                  cleanUrl.includes("Signature=")
                ) {
                  console.log("[FLOW_DEBUG] RESOLVED video response with clean URL:", cleanUrl);
                  isFinished = true;
                  clearTimeout(timeout);
                  resolve(cleanUrl);
                  return;
                }
              }
            }
          } catch {}
        }
      });
    });

    const videoPrompt = `Create a video: ${opts.prompt}`;

    console.log("[FLOW_DEBUG] Typing prompt:", videoPrompt.slice(0, 50));
    const editor = page.locator(".ProseMirror").first();
    await editor.waitFor({ timeout: 15_000 });
    await editor.click();
    await page.keyboard.type(videoPrompt);
    await page.waitForTimeout(1_000);

    promptSentAt = Date.now();
    console.log("[FLOW_DEBUG] Clicking send button...");

    // Remove the initial asset listener once prompt is sent so we don't accidentally blackhole the new asset
    page.off("response", initialAssetListener);

    const sendBtn = page
      .locator(
        "button.generate-icon-button, button[aria-label='Начать генерацию'], button[aria-label*='generat' i], button[aria-label*='send' i], button:has-text('arrow_forward')"
      )
      .first();
    if (await sendBtn.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await sendBtn.click();
    } else {
      await page.keyboard.press("Enter");
    }
    console.log("[FLOW_DEBUG] Send triggered!");

    // Helper to click approve button if prompt creates a confirmation dialog
    const clickApproveIfPresent = async (timeoutMs: number) => {
      const btn = page
        .locator(
          ".option-row:not(.read-only):has-text('Approve'), .option-row:not(.read-only):has-text('Одобрить'), button:not([disabled]):has-text('Approve'), button:not([disabled]):has-text('Одобрить'), [role='button']:not([aria-disabled='true']):has-text('Approve'), [role='button']:not([aria-disabled='true']):has-text('Одобрить')"
        )
        .first();
      if (await btn.isVisible({ timeout: timeoutMs }).catch(() => false)) {
        await btn.click().catch(() => {});
        console.log("[FLOW_DEBUG] Clicked approve option row!");
        return true;
      }
      return false;
    };

    await clickApproveIfPresent(12_000);

    const pollPromise = (async () => {
      for (let i = 0; i < 200; i++) {
        if (isFinished) return "";
        try {
          await page.waitForTimeout(3_000);
        } catch {
          return "";
        }
        if (isFinished) return "";
        await clickApproveIfPresent(500).catch(() => {});

        if (Date.now() - promptSentAt < 15_000) continue;
        if (isFinished) return "";

        // Check if there is an active generation progress card or container
        try {
          const progressEl = page
            .locator(
              ".video-container, .media-option, .generation-card, [class*='generation-progress'], [class*='rendering'], [class*='media-card']"
            )
            .first();
          if (await progressEl.isVisible({ timeout: 500 }).catch(() => false)) {
            const text = await progressEl.innerText().catch(() => "");
            if (text.includes("%") && !text.includes("100%")) {
              console.log("[FLOW_DEBUG] Generation in progress:", text.replace(/\n/g, " "));
              continue;
            }
            if (isFinished) return "";
            // Click the container to open editor or trigger CDN stream
            console.log("[FLOW_DEBUG] Clicking media container...");
            await progressEl.click().catch(() => {});
            await page.waitForTimeout(1_000).catch(() => {});
          }
        } catch {}

        if (isFinished) return "";

        // Check for video tag directly created anywhere in DOM
        try {
          const videoSrc = await page
            .evaluate(() => {
              const v = document.querySelector("video");
              return v ? v.src || v.currentSrc : null;
            })
            .catch(() => null);
          if (videoSrc && videoSrc.includes("flow-content.google/video")) {
            const aid = extractAssetId(videoSrc);
            if (!existingVideoUrls.has(videoSrc) && (!aid || !existingAssetIds.has(aid))) {
              console.log("[FLOW_DEBUG] RESOLVED video directly from <video> element:", videoSrc);
              isFinished = true;
              return videoSrc;
            }
          }
        } catch {}

        if (isFinished) return "";

        // Also check any download buttons or media action menus
        try {
          const downloadBtn = page
            .locator("button[aria-label*='Download'], button[aria-label*='Скачать'], a[download]")
            .first();
          if (await downloadBtn.isVisible({ timeout: 300 }).catch(() => false)) {
            const href = await downloadBtn.getAttribute("href").catch(() => null);
            if (href && href.includes("flow-content.google/video")) {
              const aid = extractAssetId(href);
              if (!existingVideoUrls.has(href) && (!aid || !existingAssetIds.has(aid))) {
                console.log("[FLOW_DEBUG] RESOLVED video via download button href:", href);
                isFinished = true;
                return href;
              }
            }
          }
          const videos = await page
            .$$eval("video", (els: any[]) =>
              els
                .map((e: any) => e.src || e.currentSrc)
                .filter((s: string) => s && s.startsWith("http"))
            )
            .catch(() => []);
          const newVideos = videos.filter((v: string) => {
            const aid = extractAssetId(v);
            return (
              !existingVideoUrls.has(v) &&
              (!aid || !existingAssetIds.has(aid)) &&
              v.includes("flow-content.google")
            );
          });
          if (newVideos.length > 0) {
            isFinished = true;
            return newVideos[0];
          }
        } catch {}
      }
      return "";
    })();

    try {
      videoUrl = await Promise.race([videoPromise, pollPromise]);
    } finally {
      isFinished = true;
    }
    invalidateFlowCreditsCache();

    return {
      url: videoUrl,
      format: "mp4",
    };
  } finally {
    if (context) {
      await syncRotatedCookies(context).catch(() => {});
      await context.close().catch(() => {});
    }
    await releaseFlowBrowser(browser).catch(() => {});
  }
}

/**
 * Generates an image using Google Flow Web session.
 */
export async function generateFlowImage(opts: FlowImageOptions): Promise<FlowMediaResult> {
  const token = opts.credentials.apiKey || opts.credentials.accessToken || "";
  const cookieHeader = normalizeFlowCookies(token);
  if (!cookieHeader) {
    throw new Error("Missing Google Flow cookies (__Secure-1PSID)");
  }

  let playwright: any;
  try {
    playwright = await import("playwright");
  } catch {
    throw new Error("Playwright is not installed. Run: npx playwright install chromium");
  }

  const browser = await acquireFlowBrowser((options) => playwright.chromium.launch(options));
  let context: any = null;

  try {
    const customUa =
      (opts.credentials as any)?.providerSpecificData?.customUserAgent ||
      (opts.credentials as any)?.customUserAgent;
    const resolvedUserAgent =
      typeof customUa === "string" && customUa.trim() ? customUa.trim() : FLOW_USER_AGENT;

    context = await browser.newContext({
      userAgent: resolvedUserAgent,
      viewport: { width: 1280, height: 800 },
    });

    let cookiesToSet: Array<{
      name: string;
      value: string;
      domain: string;
      path: string;
      secure: boolean;
      httpOnly?: boolean;
      sameSite?: "Strict" | "Lax" | "None";
    }> = [];

    const rawTrimmed = (token || "").trim();
    if (rawTrimmed.startsWith("[") && rawTrimmed.endsWith("]")) {
      try {
        const rawList = JSON.parse(rawTrimmed);
        if (Array.isArray(rawList)) {
          cookiesToSet = rawList
            .filter((item: any) => item && item.name && typeof item.value === "string")
            .map((item: any) => {
              const name = String(item.name).trim();
              let domain =
                item.domain ||
                (name.includes("OSID") || name.startsWith("__Host-")
                  ? "flow.google.com"
                  : ".google.com");
              if (name.includes("OSID") || name.startsWith("__Host-")) {
                domain = "flow.google.com";
              }
              const sameSiteVal = String(item.sameSite || "").toLowerCase();
              const sameSite: "Strict" | "Lax" | "None" =
                sameSiteVal === "no_restriction" || sameSiteVal === "none"
                  ? "None"
                  : sameSiteVal === "strict"
                    ? "Strict"
                    : "Lax";

              return {
                name,
                value: String(item.value).trim(),
                domain,
                path: item.path || "/",
                secure: item.secure !== false,
                httpOnly: Boolean(item.httpOnly),
                sameSite,
              };
            });
        }
      } catch (e) {
        console.error("[FLOW_DEBUG] Failed to parse JSON cookies:", e);
      }
    }

    if (cookiesToSet.length === 0) {
      for (const pair of cookieHeader.split(";")) {
        const [name, ...valParts] = pair.trim().split("=");
        if (!name || valParts.length === 0) continue;
        const cleanName = name.trim();
        const cleanVal = valParts.join("=").trim();
        if (!cleanName || !cleanVal) continue;

        if (cleanName.includes("OSID") || cleanName.startsWith("__Host-")) {
          cookiesToSet.push({
            name: cleanName,
            value: cleanVal,
            domain: "flow.google.com",
            path: "/",
            secure: true,
          });
        } else {
          cookiesToSet.push({
            name: cleanName,
            value: cleanVal,
            domain: ".google.com",
            path: "/",
            secure: true,
          });
        }
      }
    }
    await context.addCookies(cookiesToSet);

    const page = await context.newPage();

    await page.goto("https://flow.google.com/", {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    await page.waitForTimeout(2_000);

    if (page.url().includes("/about")) {
      const ctaBtn = page
        .locator(
          "a:has-text('Create with Google Flow'), a:has-text('Начать'), a:has-text('Попробовать'), a:has-text('Sign in'), a:has-text('Войти'), a[href*='flow.google.com'], button:has-text('Create')"
        )
        .first();
      if (await ctaBtn.isVisible({ timeout: 4_000 }).catch(() => false)) {
        await ctaBtn.click().catch(() => {});
        await page.waitForTimeout(3_000);
      } else {
        await page.goto("https://flow.google.com/", { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(2_000);
      }
    }

    if (page.url().includes("accounts.google.com") || page.url().includes("/about")) {
      throw new Error(
        "Google Flow session is expired or requires re-authentication (redirected to " +
          page.url() +
          ")"
      );
    }

    if (!page.url().includes("/project/")) {
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

    let imageUrl = "";
    const imagePromise = new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Timed out waiting for image generation to complete (60s limit)"));
      }, 60_000);

      page.on("response", async (response: any) => {
        const url = response.url();
        if (!url.includes("batchexecute")) return;
        try {
          const body = await response.text();
          if (
            url.includes("bOKtO") ||
            body.includes("bOKtO") ||
            body.includes("googleusercontent.com/asb/")
          ) {
            const match = /(https:\/\/lh3\.googleusercontent\.com\/asb\/[A-Za-z0-9_\-\/]+)/.exec(
              body
            );
            if (match && match[1]) {
              clearTimeout(timeout);
              resolve(match[1]);
            }
          }
        } catch {}
      });
    });

    const editor = page.locator(".ProseMirror").first();
    await editor.waitFor({ timeout: 15_000 });
    await editor.click();
    await page.keyboard.type(opts.prompt);
    await page.waitForTimeout(1_000);

    const sendBtn = page
      .locator("button[aria-label='Начать генерацию'], button:has-text('arrow_forward')")
      .first();
    if (await sendBtn.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await sendBtn.click();
    } else {
      await page.keyboard.press("Enter");
    }

    const approveBtn = page
      .locator(
        ".option-row[aria-label*='Approve' i], .option-row[aria-label*='Одобр' i], .option-row:has-text('Approve'), .option-row:has-text('Always approve'), .option-row:has-text('Всегда одобрять'), .option-row:has-text('Одобрить'), button:has-text('Approve'), button:has-text('Always approve'), button:has-text('Всегда одобрять'), button:has-text('Одобрить')"
      )
      .first();
    try {
      await approveBtn.waitFor({ state: "visible", timeout: 15_000 });
      await approveBtn.click();
    } catch {}

    let isFinished = false;
    const pollPromise = (async () => {
      for (let i = 0; i < 12; i++) {
        if (isFinished) return "";
        try {
          await page.waitForTimeout(5_000);
        } catch {
          return "";
        }
        if (isFinished) return "";
        try {
          const imgs = await page.$$eval("img", (els: any[]) =>
            els
              .map((e: any) => e.src || e.currentSrc)
              .filter((s: string) => s && s.includes("googleusercontent.com/asb/"))
          );
          if (imgs.length > 0) {
            isFinished = true;
            return imgs[0];
          }
        } catch {}
      }
      return "";
    })();

    try {
      imageUrl = await Promise.race([imagePromise, pollPromise]);
    } finally {
      isFinished = true;
    }
    invalidateFlowCreditsCache();

    return {
      url: imageUrl,
      format: "png",
    };
  } finally {
    if (context) {
      await syncRotatedCookies(context).catch(() => {});
      await context.close().catch(() => {});
    }
    await releaseFlowBrowser(browser).catch(() => {});
  }
}
