import { config, log } from "./config.js";
import { fetchOtp } from "./tmail.js";

const UA_TIMEOUT = 45000;

function isLoginPage(url) {
  return /\/login|\/signup|\/auth/i.test(url);
}

export class MuseSession {
  constructor(context) {
    this.context = context;
    this.page = null;
    this.ready = false;
  }

  async page_() {
    if (this.page && !this.page.isClosed()) return this.page;
    const existing = this.context.pages().find((p) => p.url().includes("muse.ai"));
    this.page = existing || (await this.context.newPage());
    return this.page;
  }

  async ensureReady() {
    const page = await this.page_();
    if (this.ready) return page;

    await page.goto(`${config.muse.baseUrl}/`, {
      waitUntil: "domcontentloaded",
      timeout: UA_TIMEOUT,
    });
    await page.waitForTimeout(2500);

    if (await this.composer(page)) {
      this.ready = true;
      log("muse session restored");
      return page;
    }

    log("muse session missing, logging in");
    await this.login(page);
    this.ready = true;
    return page;
  }

  async composer(page) {
    const box = page.locator('textarea, [contenteditable="true"][role="textbox"]').first();
    return (await box.count()) ? box : null;
  }

  async login(page) {
    await page.goto(`${config.muse.baseUrl}/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);

    const field = page.getByRole("textbox", { name: /mobile number or email/i });
    await field.waitFor({ state: "visible", timeout: UA_TIMEOUT });
    await field.fill(config.muse.email);
    await page.getByRole("button", { name: /^continue$/i }).click();

    await page.getByText(/enter your code to log in/i).waitFor({ timeout: UA_TIMEOUT });
    const otp = await fetchOtp(this.context, { timeoutMs: 120000 });
    const code = page.getByRole("textbox", { name: /security code/i });
    await code.fill(otp);
    // The code screen submits the moment six digits land, so the button click races a
    // navigation that is already in flight; press Enter and ignore the race.
    await code.press("Enter").catch(() => {});
    await page
      .getByRole("button", { name: /^next$/i })
      .click({ timeout: 5000 })
      .catch(() => {});
    await page.waitForTimeout(4000);

    const box = await this.composer(page);
    if (!box) throw new Error("login finished but the composer never appeared");
    await box.waitFor({ state: "visible", timeout: UA_TIMEOUT });
    log("muse logged in");
  }

  countAssistant(page) {
    return page.evaluate(() => {
      const bubbles = [...document.querySelectorAll('[class*="hatch-chat-groupable-bubble"]')];
      return bubbles.filter((b) => String(b.className).includes("hatch-agent")).length;
    });
  }

  lastAssistant(page) {
    return page.evaluate(() => {
      const bubbles = [...document.querySelectorAll('[class*="hatch-chat-groupable-bubble"]')];
      const agent = bubbles.filter((b) => String(b.className).includes("hatch-agent"));
      const last = agent[agent.length - 1];
      if (!last) return "";
      const copy = last.cloneNode(true);
      copy.querySelectorAll("button").forEach((b) => b.remove());
      return (copy.innerText || "").trim();
    });
  }

  async send(text) {
    const page = await this.ensureReady();
    const box = await this.composer(page);
    if (!box) throw new Error("composer not found");

    // The thread renders lazily after load; wait for the bubble count to stop moving so
    // the pre-send baseline is the real one.
    let before = -1;
    for (let i = 0; i < 12; i += 1) {
      const count = await this.countAssistant(page);
      if (count === before) break;
      before = count;
      await page.waitForTimeout(700);
    }
    const beforeLast = await this.lastAssistant(page);

    await box.click();
    await page.keyboard.insertText(text);
    await page.waitForTimeout(250);
    await page.keyboard.press("Enter");

    const deadline = Date.now() + config.replyTimeoutMs;
    let last = "";
    let stableSince = 0;
    let started = false;

    while (Date.now() < deadline) {
      await page.waitForTimeout(700);
      const count = await this.countAssistant(page);
      if (count > before) {
        started = true;
        const current = await this.lastAssistant(page);
        if (current !== beforeLast && current !== last) {
          last = current;
          stableSince = Date.now();
        } else if (last && stableSince && Date.now() - stableSince >= config.settleMs) {
          return last.trim();
        }
      }
    }

    if (started && last.trim()) return last.trim();
    throw new Error("muse reply timed out");
  }
}
