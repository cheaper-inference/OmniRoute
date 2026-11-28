import { chromium } from "playwright";
import { config, ensureDirs, log } from "./config.js";

let contextPromise = null;

export async function getContext() {
  if (!contextPromise) {
    contextPromise = (async () => {
      ensureDirs();
      log("launching chromium, proxy:", config.proxy ? config.proxy.server : "direct");
      const context = await chromium.launchPersistentContext(config.profileDir, {
        headless: config.headless,
        proxy: config.proxy || undefined,
        viewport: { width: 1440, height: 900 },
        locale: "en-US",
        timezoneId: "America/Los_Angeles",
        args: [
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--disable-blink-features=AutomationControlled",
        ],
      });
      context.setDefaultTimeout(45000);
      context.on("close", () => {
        log("context closed");
        contextPromise = null;
      });
      return context;
    })().catch((err) => {
      contextPromise = null;
      throw err;
    });
  }
  return contextPromise;
}

export async function resetContext() {
  const p = contextPromise;
  contextPromise = null;
  if (p) {
    const ctx = await p.catch(() => null);
    if (ctx) await ctx.close().catch(() => {});
  }
}
