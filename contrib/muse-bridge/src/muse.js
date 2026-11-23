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

  async debugState() {
    const page = await this.ensureReady();
    return page.evaluate(() => {
      const bubbles = [...document.querySelectorAll('[class*="hatch-chat-groupable-bubble"]')];
      return {
        url: location.href,
        total: bubbles.length,
        tail: bubbles.slice(-6).map((b) => ({
          agent: String(b.className).includes("hatch-agent"),
          text: (b.innerText || "").slice(0, 160),
        })),
        bodyTail: document.body.innerText.slice(-600),
      };
    });
  }

  async send(text) {
    const page = await this.ensureReady();
    const box = await this.composer(page);
    if (!box) throw new Error("composer not found");

    // Bubble counts are unreliable: the thread renders lazily and Muse may still be answering
    // earlier prompts. Stamp every bubble present now, then read only unstamped agent bubbles
    // that follow our own (unstamped) user bubble.
    await page.waitForTimeout(1500);
    const stamp = `mb-${Date.now()}`;
    await page.evaluate((s) => {
      document
        .querySelectorAll('[class*="hatch-chat-groupable-bubble"]')
        .forEach((b) => b.setAttribute("data-mb-seen", s));
    }, stamp);

    await box.click();
    await page.keyboard.insertText(text);
    await page.waitForTimeout(250);
    await page.keyboard.press("Enter");

    const deadline = Date.now() + config.replyTimeoutMs;
    let last = "";
    let stableSince = 0;
    let started = false;

    while (Date.now() < deadline) {
      await page.waitForTimeout(800);
      const current = await page.evaluate(
        (prompt) => {
          const bubbles = [...document.querySelectorAll('[class*="hatch-chat-groupable-bubble"]')];
          const fresh = bubbles.filter((b) => !b.hasAttribute("data-mb-seen"));
          const isAgent = (b) => String(b.className).includes("hatch-agent");
          const norm = (s) =>
            String(s || "")
              .replace(/\s+/g, " ")
              .trim();
          const mine = fresh.findIndex(
            (b) => !isAgent(b) && norm(b.innerText).includes(norm(prompt))
          );
          if (mine < 0) return null;
          const parts = [];
          for (const b of fresh.slice(mine + 1)) {
            if (!isAgent(b)) break;
            const copy = b.cloneNode(true);
            copy.querySelectorAll("button").forEach((x) => x.remove());
            const t = (copy.innerText || "").trim();
            if (t) parts.push(t);
          }
          return parts.join("\n\n");
        },
        text.trim().slice(0, 120)
      );

      if (current === null || current === "") continue;
      started = true;
      if (current !== last) {
        last = current;
        stableSince = Date.now();
      } else if (Date.now() - stableSince >= config.settleMs) {
        return last.trim();
      }
    }

    if (started && last.trim()) return last.trim();
    throw new Error("muse reply timed out");
  }
}
