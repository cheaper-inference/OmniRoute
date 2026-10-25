/**
 * FlowClient — executes video and image generations through Google Flow
 * using browser automation + RPC response interception.
 */

import { acquireFlowBrowser, releaseFlowBrowser, type FlowBrowser } from "./browserLease.ts";
import { normalizeFlowCookies, fetchFlowCredits } from "../../services/usage/googleflow.ts";
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
    const cookiesToSet = cookieHeader.split(";").map((pair) => {
      const [name, ...valParts] = pair.trim().split("=");
      return {
        name,
        value: valParts.join("="),
        domain: ".google.com",
        path: "/",
      };
    });
    await context.addCookies(cookiesToSet);

    const page = await context.newPage();

    // Navigate to Flow app
    await page.goto("https://flow.google.com/", {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });

    // Check for login redirect
    if (page.url().includes("accounts.google.com") || page.url().includes("/about")) {
      throw new Error("Google Flow session is expired or requires re-authentication");
    }

    // Set up response listener for batchexecute video result RPC (as29s / jwpduf)
    let videoUrl = "";
    const videoPromise = new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Timed out waiting for Veo video generation to complete (120s limit)"));
      }, 120_000);

      page.on("response", async (response: any) => {
        const url = response.url();
        if (!url.includes("batchexecute")) return;
        try {
          const body = await response.text();
          // Look for signed Google video CDN URL in response
          const match = /(https:\/\/lh3\.googleusercontent\.com\/[A-Za-z0-9_\-\/]+)/.exec(body) ||
                        /(https:\/\/[a-z0-9-]+\.googleusercontent\.com\/[A-Za-z0-9_\-\/]+)/.exec(body);
          if (match && match[1] && (body.includes(".mp4") || body.includes("as29s") || body.includes("video"))) {
            clearTimeout(timeout);
            resolve(match[1]);
          }
        } catch {
          // Ignore parse errors on other responses
        }
      });
    });

    // Focus prompt input and submit
    const promptSelector = 'textarea, [contenteditable="true"], input[type="text"]';
    await page.waitForSelector(promptSelector, { timeout: 15_000 });
    await page.fill(promptSelector, opts.prompt);
    await page.keyboard.press("Enter");

    // Wait for the video generation promise to settle
    videoUrl = await videoPromise;

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

    const cookiesToSet = cookieHeader.split(";").map((pair) => {
      const [name, ...valParts] = pair.trim().split("=");
      return {
        name,
        value: valParts.join("="),
        domain: ".google.com",
        path: "/",
      };
    });
    await context.addCookies(cookiesToSet);

    const page = await context.newPage();

    await page.goto("https://flow.google.com/", {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });

    if (page.url().includes("accounts.google.com") || page.url().includes("/about")) {
      throw new Error("Google Flow session is expired or requires re-authentication");
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
          // Scan for ogiZ0b (image RPC) or CDN image URL
          if (body.includes("ogiZ0b") || body.includes("googleusercontent.com")) {
            const match = /(https:\/\/[a-z0-9-]+\.googleusercontent\.com\/[A-Za-z0-9_\-\/]+)/.exec(body);
            if (match && match[1]) {
              clearTimeout(timeout);
              resolve(match[1]);
            }
          }
        } catch {
          // Ignore
        }
      });
    });

    const promptSelector = 'textarea, [contenteditable="true"], input[type="text"]';
    await page.waitForSelector(promptSelector, { timeout: 15_000 });
    await page.fill(promptSelector, opts.prompt);
    await page.keyboard.press("Enter");

    imageUrl = await imagePromise;

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
