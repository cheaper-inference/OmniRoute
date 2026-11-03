import { test } from "node:test";
import assert from "node:assert/strict";
import { chromium, type Locator, type Page } from "playwright-core";
import { ChatGptBrowserWorker } from "../../open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/browser-worker.ts";

test(
  "current and legacy app mentions retain exact connector identity and prompt text",
  { skip: !process.env.CHATGPT_DOM_TEST_BROWSER },
  async () => {
    const browser = await chromium.launch({
      executablePath: process.env.CHATGPT_DOM_TEST_BROWSER,
      headless: true,
    });
    try {
      const page = await browser.newPage();
      const worker = ChatGptBrowserWorker.forProvider({
        adapter: "chatgpt-web",
        baseUrl: "https://chatgpt.com",
        defaultModel: "gpt-5.6-sol",
        models: ["gpt-5.6-sol"],
        chatgptWeb: {
          appName: "Codex Native2",
          storageStatePath: "/tmp/unused-connector-fixture.json",
          headed: false,
          solAvailable: true,
          proAvailable: true,
          localToolsEnabled: false,
        },
      }) as unknown as {
        connectorIsSelected(composer: Locator): Promise<boolean>;
        attachedPromptText(page: Page): Promise<string>;
        selectConnector(page: Page): Promise<Locator>;
        close(): Promise<void>;
      };
      for (const attributes of [
        'data-id="plugin:test" data-keyword="Codex Native2"',
        'app-mention-path="app://test" app-mention-display-name="Codex Native2"',
      ]) {
        await page.setContent(
          `<form><div id="prompt-textarea" role="textbox" contenteditable="true"><span ${attributes} contenteditable="false">Codex Native2</span>Hello</div></form>`
        );
        const composer = page.locator("#prompt-textarea");
        assert.equal(await worker.connectorIsSelected(composer), true);
        assert.equal(await worker.attachedPromptText(page), "Hello");
      }
      await page.setContent(
        '<form><div id="prompt-textarea" role="textbox" contenteditable="true"><span app-mention-path="app://test" app-mention-display-name="Wrong App" contenteditable="false">Codex Native2</span></div></form>'
      );
      assert.equal(await worker.connectorIsSelected(page.locator("#prompt-textarea")), false);
      await page.setContent(
        `<form><div id="prompt-textarea" role="textbox" contenteditable="true"></div></form><div data-mention-list-scroll-area style="display:none"><button data-list-navigation-item="true" aria-current="true"><span>Codex Native2</span></button></div>`
      );
      await page.evaluate(() => {
        const composer = document.querySelector<HTMLElement>("#prompt-textarea")!;
        const menu = document.querySelector<HTMLElement>("[data-mention-list-scroll-area]")!;
        composer.addEventListener("input", () => {
          menu.style.display = composer.textContent?.startsWith("@") ? "block" : "none";
        });
        composer.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" || menu.style.display !== "block") return;
          event.preventDefault();
          composer.innerHTML =
            '<span app-mention-path="app://test" app-mention-display-name="Codex Native2" contenteditable="false">Codex Native2</span>';
          menu.style.display = "none";
        });
      });
      const selected = await worker.selectConnector(page);
      assert.equal(await worker.connectorIsSelected(selected), true);
      await worker.close();
    } finally {
      await browser.close();
    }
  }
);
