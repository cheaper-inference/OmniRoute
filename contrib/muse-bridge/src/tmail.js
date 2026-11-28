import { config, log } from "./config.js";

const CODE_RE = /\b(\d{6})\b/g;

async function openTmail(context) {
  const pages = context.pages().filter((p) => p.url().includes("tmail."));
  const page = pages[0] || (await context.newPage());
  await page.goto(`${config.tmail.baseUrl}/login`, { waitUntil: "domcontentloaded" });
  const inbox = page.getByText("Your temporary email");
  if (await inbox.count()) return page;

  await page.getByRole("textbox", { name: /email address/i }).fill(config.tmail.email);
  await page.getByRole("textbox", { name: /password/i }).fill(config.tmail.password);
  await page.getByRole("button", { name: /^sign in$/i }).click();
  await page.waitForSelector("text=Your temporary email", { timeout: 60000 });
  log("tmail logged in");
  return page;
}

async function readLatestOtp(page, exclude) {
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  const rows = page
    .locator("main li, main a, main button")
    .filter({ hasText: /log in|code|verification|muse/i });
  const count = await rows.count();
  if (!count) return null;
  await rows
    .first()
    .click()
    .catch(() => {});
  await page.waitForTimeout(1500);
  const body = await page.evaluate(() => document.body.innerText);
  const codes = [...body.matchAll(CODE_RE)].map((m) => m[1]).filter((c) => !exclude.has(c));
  return codes[0] || null;
}

export async function fetchOtp(context, { timeoutMs = 90000, exclude = new Set() } = {}) {
  const page = await openTmail(context);
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const code = await readLatestOtp(page, exclude);
    if (code) {
      log("otp found:", code);
      return code;
    }
    await page.waitForTimeout(4000);
  }
  throw new Error("otp not found in tmail inbox");
}
