import assert from "node:assert/strict";
import { test } from "node:test";

import { PlaywrightChatGptWebBrowserSession } from "../../open-sse/utils/chatgptWebBrowserSession.ts";

type PageCallback = (argument?: unknown) => unknown;

// Exercise the actual Playwright evaluation callbacks against minimal DOM fixtures.
function pageWithDocument(fixture: object, overrides: Record<string, unknown> = {}) {
  return {
    url: () => "https://chatgpt.com/?temporary-chat=true",
    async evaluate(callback: PageCallback, argument?: unknown) {
      const globals = globalThis as typeof globalThis & { document?: Document };
      const previous = globals.document;
      globals.document = fixture as Document;
      try {
        return await callback(argument);
      } finally {
        if (previous === undefined) Reflect.deleteProperty(globals, "document");
        else globals.document = previous;
      }
    },
    ...overrides,
  } as unknown as import("playwright").Page;
}

function sessionWithPage(page: import("playwright").Page) {
  return new PlaywrightChatGptWebBrowserSession(page);
}

function privateReadComposer(
  session: PlaywrightChatGptWebBrowserSession,
  composer: import("playwright").Locator
): Promise<string> {
  return (
    session as unknown as {
      readComposerText(composer: import("playwright").Locator): Promise<string>;
    }
  ).readComposerText(composer);
}

function privateReadAssistant(session: PlaywrightChatGptWebBrowserSession) {
  return (
    session as unknown as {
      readAssistantState(): Promise<{
        count: number;
        text: string;
        streaming: boolean;
        emptyNode: boolean;
      }>;
    }
  ).readAssistantState();
}

test("reads the current ProseMirror composer without the legacy prompt ID", async () => {
  const editable = { textContent: "What is 1 + 1? Reply with only the number." };
  const page = pageWithDocument({});
  const composer = {
    async textContent() {
      return editable.textContent;
    },
  } as unknown as import("playwright").Locator;
  assert.equal(
    await privateReadComposer(sessionWithPage(page), composer),
    "What is 1 + 1? Reply with only the number."
  );
});

test("retains support for the legacy prompt-textarea composer", async () => {
  const page = pageWithDocument({});
  const composer = {
    async textContent() {
      return "legacy\ncomposer";
    },
  } as unknown as import("playwright").Locator;
  assert.equal(await privateReadComposer(sessionWithPage(page), composer), "legacy composer");
});

test("uses the send-button fallback if Enter leaves ProseMirror text in place", async () => {
  let composerText = "";
  let clickedSend = 0;
  let pressedEnter = 0;
  const editable = {
    get textContent() {
      return composerText;
    },
    focus() {},
  };
  const page = pageWithDocument(
    {
      activeElement: editable,
      querySelector(selector: string) {
        return selector === 'div.ProseMirror[contenteditable="true"]' ? editable : null;
      },
      execCommand(_name: string, _showUI: boolean, text: string) {
        composerText = text;
        return true;
      },
    },
    {
      locator(selector: string) {
        return {
          first() {
            return {
              async isVisible() {
                return selector === 'div.ProseMirror[contenteditable="true"]';
              },
              async click() {
                if (selector === '[data-testid="send-button"]') clickedSend += 1;
              },
              async focus() {},
              async textContent() {
                return editable.textContent;
              },
              async isEnabled() {
                return true;
              },
            };
          },
        };
      },
      keyboard: {
        async press(key: string) {
          if (key === "Enter") pressedEnter += 1;
        },
      },
      async waitForTimeout() {},
    }
  );
  await sessionWithPage(page).submitPromptViaComposer({
    prompt: "What is 1 + 1?",
    attachments: [],
  });
  assert.equal(pressedEnter, 1);
  assert.equal(clickedSend, 1);
});

test("reads the resolved visible legacy composer even with hidden ProseMirror markup", async () => {
  const prompt = "What is 1 + 1?";
  const hidden = { textContent: "hidden stale prompt" };
  let visibleText = "";
  let sendClicks = 0;
  const visible = {
    get textContent() {
      return visibleText;
    },
    focus() {},
  };
  const page = pageWithDocument(
    {
      activeElement: visible,
      querySelector(selector: string) {
        if (selector === 'div.ProseMirror[contenteditable="true"]') return hidden;
        if (selector === "#prompt-textarea") return visible;
        return null;
      },
      execCommand(_command: string, _showUI: boolean, text: string) {
        visibleText = text;
        return true;
      },
    },
    {
      locator(selector: string) {
        return {
          first() {
            return {
              async isVisible() {
                return selector === "#prompt-textarea";
              },
              async click() {
                if (selector === '[data-testid="send-button"]') sendClicks += 1;
              },
              async focus() {},
              async textContent() {
                return selector === "#prompt-textarea" ? visibleText : hidden.textContent;
              },
              async isEnabled() {
                return true;
              },
            };
          },
        };
      },
      keyboard: { async press() {} },
      async waitForTimeout() {},
    }
  );

  await sessionWithPage(page).submitPromptViaComposer({ prompt, attachments: [] });
  assert.equal(visibleText, prompt);
  assert.equal(sendClicks, 1);
});

test("reads the current conversation-role assistant markup", async () => {
  const answer = {
    textContent: "container",
    querySelector(selector: string) {
      return selector.includes("assistant-message") ? { textContent: "2" } : null;
    },
  };
  const page = pageWithDocument({
    querySelectorAll(selector: string) {
      return selector === '[data-conversation-role="assistant"]' ? [answer] : [];
    },
    querySelector() {
      return null;
    },
  });
  assert.deepEqual(await privateReadAssistant(sessionWithPage(page)), {
    count: 1,
    text: "2",
    streaming: false,
    emptyNode: false,
  });
});

test("preserves legacy assistant-role markup and new search-unit markers", async () => {
  const answer = {
    textContent: "Legacy answer",
    querySelector() {
      return null;
    },
  };
  for (const selector of [
    '[data-message-author-role="assistant"]',
    '[data-content-search-unit-key$=":assistant"]',
    '[data-chatgpt-search-unit-key$=":assistant"]',
    '[data-turn-key]:has([data-conversation-role="assistant"],[data-chatgpt-agent-turn-start])',
    'section[data-turn="assistant"]',
  ]) {
    const page = pageWithDocument({
      querySelectorAll(query: string) {
        return query === selector ? [answer] : [];
      },
      querySelector() {
        return null;
      },
    });
    assert.equal((await privateReadAssistant(sessionWithPage(page))).text, "Legacy answer");
  }
});

test("uses the first matching assistant selector when layouts overlap", async () => {
  const selected = {
    textContent: "Preferred search-unit answer",
    querySelector() {
      return null;
    },
  };
  const fallback = {
    textContent: "Fallback conversation-role answer",
    querySelector() {
      return null;
    },
  };
  const visited: string[] = [];
  const page = pageWithDocument({
    querySelectorAll(selector: string) {
      visited.push(selector);
      if (selector === '[data-content-search-unit-key$=":assistant"]') return [selected];
      if (selector === '[data-conversation-role="assistant"]') return [fallback];
      return [];
    },
    querySelector() {
      return null;
    },
  });

  assert.deepEqual(await privateReadAssistant(sessionWithPage(page)), {
    count: 1,
    text: "Preferred search-unit answer",
    streaming: false,
    emptyNode: false,
  });
  assert.deepEqual(visited, [
    '[data-message-author-role="assistant"]',
    '[data-content-search-unit-key$=":assistant"]',
  ]);
});
