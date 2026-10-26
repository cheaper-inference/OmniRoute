/**
 * FlowClient — executes video and image generations through Google Flow
 * using browser automation + RPC response interception.
 */

import { acquireFlowBrowser, releaseFlowBrowser, type FlowBrowser } from "./browserLease.ts";
import { normalizeFlowCookies, fetchFlowCredits, invalidateFlowCreditsCache } from "../../services/usage/googleflow.ts";
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
  const cleaned = input.toLowerCase().replace(/^googleflow-web\//, "").replace(/^gflow\//, "");
  return VIDEO_MODEL_MAP[cleaned] || "veo_3_1_fast";
}

/**
 * Normalizes image model string. Defaults to Nano Banana Pro.
 */
export function normalizeImageModel(input?: string): string {
  if (!input) return "GEM_PIX_2";
  const cleaned = input.toLowerCase().replace(/^googleflow-web\//, "").replace(/^gflow\//, "");
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

  // Pre-flight check: ensure credits > 0 before launching heavy browser
  const creditsInfo = await fetchFlowCredits(cookieHeader).catch(() => null);
  if (creditsInfo && creditsInfo.credits <= 0) {
    throw new Error("Google Flow quota exhausted (0 Veo credits remaining on this account)");
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
    context = await browser.newContext({
      userAgent: FLOW_USER_AGENT,
      viewport: { width: 1280, height: 800 },
    });

    // Populate cookies into context
    const cookiesToSet = cookieHeader
      .split(";")
      .map((pair) => {
        const [name, ...valParts] = pair.trim().split("=");
        if (!name || valParts.length === 0) return null;
        const cleanName = name.trim();
        const cleanVal = valParts.join("=").trim();
        if (!cleanName || !cleanVal) return null;
        return {
          name: cleanName,
          value: cleanVal,
          domain: cleanName.includes("OSID") ? "flow.google.com" : ".google.com",
          path: "/",
          secure: true,
        };
      })
      .filter((c): c is { name: string; value: string; domain: string; path: string; secure: boolean } => c !== null);
    await context.addCookies(cookiesToSet);

    const page = await context.newPage();

    await page.goto("https://flow.google.com/", {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    await page.waitForTimeout(3_000);

    console.log("[FLOW_DEBUG] Navigated to:", page.url());
    if (page.url().includes("accounts.google.com")) {
      throw new Error("Google Flow session is expired or requires re-authentication");
    }

    // Ensure we start a fresh project or session
    const newProjBtn = page
      .locator("button.new-project-button, button:has-text('Новый проект'), button:has-text('New project'), button:has-text('Start Creating')")
      .first();
    if (await newProjBtn.isVisible({ timeout: 6_000 }).catch(() => false)) {
      try {
        await newProjBtn.click();
        await page.waitForURL(/.*\/project\/.*/, { timeout: 20_000 });
      } catch {}
    } else if (page.url().includes("/project/")) {
      const newChatBtn = page.locator("button[aria-label='Начать новый сеанс'], button:has-text('edit_square')").first();
      if (await newChatBtn.isVisible({ timeout: 3_000 }).catch(() => false)) {
        await newChatBtn.click().catch(() => {});
        await page.waitForTimeout(1_500);
      }
    }
    console.log("[FLOW_DEBUG] Active project URL:", page.url());

    // Collect existing videos already on the page/project canvas
    const existingVideoUrls = new Set<string>();
    try {
      const existing = await page.$$eval("video", (els: any[]) =>
        els.map((e: any) => e.src || e.currentSrc).filter((s: string) => s && s.startsWith("http"))
      );
      for (const u of existing) existingVideoUrls.add(u);
    } catch {}
    console.log("[FLOW_DEBUG] Existing video URLs count:", existingVideoUrls.size);

    let promptSentAt = 0;
    let videoUrl = "";

    const videoPromise = new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Timed out waiting for Veo video generation to complete (180s limit)"));
      }, 180_000);

      page.on("response", async (response: any) => {
        const url = response.url();
        const now = Date.now();

        // Veo takes at least 15s to render; anything earlier is existing canvas asset
        if (!promptSentAt || now - promptSentAt < 15_000) {
          if (url.includes("flow-content.google/video")) {
            existingVideoUrls.add(url);
          }
          return;
        }

        if (url.includes("flow-content.google/video") && url.includes("Signature=")) {
          if (!existingVideoUrls.has(url)) {
            console.log("[FLOW_DEBUG] RESOLVED videoPromise with direct URL:", url);
            clearTimeout(timeout);
            resolve(url);
            return;
          }
        }

        if (url.includes("batchexecute") && (url.includes("rpcids=as29s") || url.includes("rpcids=GN0Bre") || url.includes("rpcids=ngNC2"))) {
          try {
            const body = await response.text();
            if (body.includes("flow-content.google/video")) {
              const match = /(https:\/\/flow-content\.google\/video\/[^"\s\\]+)/.exec(body);
              if (match && match[1]) {
                const cleanUrl = match[1]
                  .replace(/\\\\u003d|\\u003d/g, "=")
                  .replace(/\\\\u0026|\\u0026/g, "&");
                if (!existingVideoUrls.has(cleanUrl) && cleanUrl.includes("Signature=")) {
                  console.log("[FLOW_DEBUG] RESOLVED batchexecute with clean URL:", cleanUrl);
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

    const videoPrompt =
      opts.prompt.toLowerCase().includes("video") || opts.prompt.toLowerCase().includes("видео")
        ? opts.prompt
        : `Create a video: ${opts.prompt}`;

    console.log("[FLOW_DEBUG] Typing prompt:", videoPrompt.slice(0, 50));
    const editor = page.locator(".ProseMirror").first();
    await editor.waitFor({ timeout: 15_000 });
    await editor.click();
    await page.keyboard.type(videoPrompt);
    await page.waitForTimeout(1_000);

    promptSentAt = Date.now();
    console.log("[FLOW_DEBUG] Clicking send button...");

    const sendBtn = page.locator("button.generate-icon-button, button[aria-label='Начать генерацию'], button:has-text('arrow_forward')").first();
    if (await sendBtn.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await sendBtn.click();
    } else {
      await page.keyboard.press("Enter");
    }
    console.log("[FLOW_DEBUG] Send triggered!");

    // Check for approval card ("Всегда одобрять" / "Одобрить")
    const approveBtn = page
      .locator(
        ".option-row:has-text('Всегда одобрять'), .option-row:has-text('Одобрить'), .option-label:has-text('Всегда одобрять'), .option-label:has-text('Одобрить'), button:has-text('Всегда одобрять'), button:has-text('Одобрить')"
      )
      .first();
    try {
      await approveBtn.waitFor({ state: "visible", timeout: 8_000 });
      await approveBtn.click();
      console.log("[FLOW_DEBUG] Clicked approval button!");
    } catch {}

    const pollPromise = (async () => {
      for (let i = 0; i < 40; i++) {
        await page.waitForTimeout(4_000);
        if (Date.now() - promptSentAt < 15_000) continue;

        const approveBtnLater = page.locator(".option-row:has-text('Всегда одобрять'), .option-row:has-text('Одобрить')").first();
        if (await approveBtnLater.isVisible({ timeout: 500 }).catch(() => false)) {
          await approveBtnLater.click().catch(() => {});
        }

        const vidContainer = page.locator(".video-container").first();
        if (await vidContainer.isVisible({ timeout: 1_000 }).catch(() => false)) {
          const containerText = await vidContainer.innerText().catch(() => "");
          if (!containerText.includes("%")) {
            await vidContainer.click().catch(() => {});
            await page.waitForTimeout(2_000);
          }
        }
        const videos = await page.$$eval("video", (els: any[]) =>
          els.map((e: any) => e.src || e.currentSrc).filter((s: string) => s && s.startsWith("http"))
        );
        const newVideos = videos.filter((v: string) => !existingVideoUrls.has(v) && v.includes("flow-content.google"));
        if (newVideos.length > 0) {
          return newVideos[0];
        }
      }
      throw new Error("Timeout polling video element");
    })();

    videoUrl = await Promise.race([videoPromise, pollPromise]);
    invalidateFlowCreditsCache();

    return {
      url: videoUrl,
      format: "mp4",
    };
  } finally {
    if (context) {
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
    context = await browser.newContext({
      userAgent: FLOW_USER_AGENT,
      viewport: { width: 1280, height: 800 },
    });

    const cookiesToSet = cookieHeader
      .split(";")
      .map((pair) => {
        const [name, ...valParts] = pair.trim().split("=");
        if (!name || valParts.length === 0) return null;
        const cleanName = name.trim();
        const cleanVal = valParts.join("=").trim();
        if (!cleanName || !cleanVal) return null;
        return {
          name: cleanName,
          value: cleanVal,
          domain: cleanName.includes("OSID") ? "flow.google.com" : ".google.com",
          path: "/",
          secure: true,
        };
      })
      .filter((c): c is { name: string; value: string; domain: string; path: string; secure: boolean } => c !== null);
    await context.addCookies(cookiesToSet);

    const page = await context.newPage();

    await page.goto("https://flow.google.com/", {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    await page.waitForTimeout(3_000);

    if (page.url().includes("accounts.google.com")) {
      throw new Error("Google Flow session is expired or requires re-authentication");
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
          if (url.includes("bOKtO") || body.includes("bOKtO") || body.includes("googleusercontent.com/asb/")) {
            const match = /(https:\/\/lh3\.googleusercontent\.com\/asb\/[A-Za-z0-9_\-\/]+)/.exec(body);
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

    const sendBtn = page.locator("button[aria-label='Начать генерацию'], button:has-text('arrow_forward')").first();
    if (await sendBtn.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await sendBtn.click();
    } else {
      await page.keyboard.press("Enter");
    }

    const approveBtn = page
      .locator(
        ".option-row:has-text('Всегда одобрять'), .option-row:has-text('Одобрить'), .option-label:has-text('Всегда одобрять'), .option-label:has-text('Одобрить'), button:has-text('Всегда одобрять'), button:has-text('Одобрить')"
      )
      .first();
    try {
      await approveBtn.waitFor({ state: "visible", timeout: 10_000 });
      await approveBtn.click();
    } catch {}

    const pollPromise = (async () => {
      for (let i = 0; i < 12; i++) {
        await page.waitForTimeout(5_000);
        const imgs = await page.$$eval("img", (els: any[]) =>
          els.map((e: any) => e.src || e.currentSrc).filter((s: string) => s && s.includes("googleusercontent.com/asb/"))
        );
        if (imgs.length > 0) {
          return imgs[0];
        }
      }
      throw new Error("Timeout polling image element");
    })();

    imageUrl = await Promise.race([imagePromise, pollPromise]);
    invalidateFlowCreditsCache();

    return {
      url: imageUrl,
      format: "png",
    };
  } finally {
    if (context) {
      await context.close().catch(() => {});
    }
    await releaseFlowBrowser(browser).catch(() => {});
  }
}
