/**
 * #21116: some Gemini Web accounts no longer return the answer through a
 * `StreamGenerate` response (the app talks to geminiweb-pa `processSession`
 * and only renders the result), so gemini-web answered 502 "No response from
 * Gemini" while the answer was on screen. The executor now also reads the
 * rendered answer from the DOM, and selects Gemini 4 modes from the model menu
 * by their sublabel ("4 Hydrogen", "4 Neon", "4 Carbon").
 */
import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

const playwright = await import("playwright");
const { GeminiWebExecutor } = await import("../../open-sse/executors/gemini-web.ts");
const { readGeminiDomReply, waitForGeminiDomReply, toInPageExpression, isGeminiSignedOutInPage } =
  await import("../../open-sse/executors/gemini-web/domReply.ts");
const { selectGeminiModel, findMenuOptionInPage, GEMINI_WEB_MODE_MENU_BUTTON } =
  await import("../../open-sse/executors/gemini-web/modeSelection.ts");

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Trimmed from the live DOM (2026-11-24): Angular attributes and icon markup removed.
const LIVE_LIKE_REPLY = `
<user-query><div class="query-text"><p>question</p></div></user-query>
<model-response><model-response-content><structured-content-container class="model-response-text processing-state-visible">
<message-content id="message-content-id-r_1"><div class="markdown markdown-main-panel" aria-busy="false">
  <p data-path-to-node="0" class="first-token"><span>Here is the <b>requested</b> JSON.</span></p>
  <response-element class="no-md md-has-block-component"><code-block><div class="code-block">
    <div class="formatted-code-block-internal-container"><div class="animated-opacity">
      <div class="code-block-decoration header-formatted"><span>JSON</span><div class="buttons">
        <gem-icon-button arialabel="Copiar o código"><button aria-label="Copiar o código"><mat-icon>copy</mat-icon></button></gem-icon-button>
      </div></div>
      <pre><code role="text" data-test-id="code-content" class="code-container formatted">{<span class="hljs-attr">"a"</span>: <span class="hljs-number">1</span>, "c": "x&lt;y &amp; z"}</code></pre>
    </div></div>
  </div></code-block></response-element>
  <ul><li>first <code>x</code></li><li>second<ul><li>nested</li></ul></li></ul>
  <p>Done with <i>style</i>.</p>
</div></message-content>
</structured-content-container></model-response-content></model-response>`;

test("readGeminiDomReply converts the rendered answer back to Markdown, keeping code exact", () => {
  const { document } = new JSDOM(`<body>${LIVE_LIKE_REPLY}</body>`).window;
  const snap = readGeminiDomReply(document);
  assert.equal(snap.queries, 1);
  assert.equal(snap.responses, 1);
  assert.equal(snap.busy, false);
  assert.equal(
    snap.text,
    [
      "Here is the **requested** JSON.",
      '```json\n{"a": 1, "c": "x<y & z"}\n```',
      "- first `x`\n- second\n  - nested",
      "Done with *style*.",
    ].join("\n\n")
  );
});

test("readGeminiDomReply reports busy while the answer is still rendering, and no answer as empty", () => {
  const busy = new JSDOM(
    `<body><model-response><message-content><div class="markdown" aria-busy="true"><p>Hal</p></div></message-content></model-response></body>`
  ).window.document;
  assert.deepEqual(readGeminiDomReply(busy), { queries: 0, responses: 1, busy: true, text: "Hal" });
  const empty = new JSDOM(`<body><user-query></user-query></body>`).window.document;
  assert.deepEqual(readGeminiDomReply(empty), { queries: 1, responses: 0, busy: false, text: "" });
});

/** A page whose `evaluate(readGeminiDomReply)` returns `snaps` in order (last one repeats). */
function snapshotPage(snaps: Array<Record<string, unknown>>) {
  let i = 0;
  return {
    evaluate: async () => snaps[Math.min(i++, snaps.length - 1)],
    waitForTimeout: async () => sleep(1),
  };
}

test("waitForGeminiDomReply waits for a new, finished and stable answer", async () => {
  const page = snapshotPage([
    { queries: 1, responses: 1, busy: false, text: "old answer" }, // baseline response: ignored
    { queries: 2, responses: 2, busy: true, text: "par" },
    { queries: 2, responses: 2, busy: true, text: "partial" },
    { queries: 2, responses: 2, busy: false, text: "final" },
  ]);
  const text = await waitForGeminiDomReply(page, {
    baselineResponses: 1,
    timeoutMs: 2000,
    pollMs: 1,
    stableMs: 20,
  });
  assert.equal(text, "final");
});

test("waitForGeminiDomReply gives up with an empty string on timeout", async () => {
  const page = snapshotPage([{ queries: 1, responses: 1, busy: false, text: "old answer" }]);
  const text = await waitForGeminiDomReply(page, {
    baselineResponses: 1,
    timeoutMs: 50,
    pollMs: 1,
    stableMs: 10,
  });
  assert.equal(text, "");
});

/** Fake page with a mode menu: options keyed by sublabel. */
function menuPage(options: Record<string, { testId: string; checked: boolean }>, calls: string[]) {
  const state = structuredClone(options);
  return {
    waitForSelector: async (sel: string) =>
      sel === GEMINI_WEB_MODE_MENU_BUTTON ? { click: async () => {} } : null,
    click: async (sel: string) => {
      calls.push(`click ${sel}`);
      for (const opt of Object.values(state)) {
        if (sel === `[data-test-id="${opt.testId}"]`) {
          for (const other of Object.values(state)) other.checked = false;
          opt.checked = true;
        }
      }
    },
    // The production code evaluates a self-contained expression string; recover the sublabel.
    evaluate: async (expression: string) => {
      const sublabel = JSON.parse(/"sublabel":("(?:[^"\\]|\\.)*")/.exec(expression)![1]);
      const opt = state[sublabel];
      return opt
        ? { testId: opt.testId, checked: opt.checked, locked: /upsell/.test(opt.testId) }
        : null;
    },
    waitForTimeout: async () => {},
    keyboard: { press: async (k: string) => void calls.push(`press ${k}`) },
  };
}

const MENU = {
  "4 Hydrogen": { testId: "bard-mode-option-h", checked: true },
  "4 Neon": { testId: "bard-mode-option-n", checked: false },
  "4 Carbon": { testId: "bard-mode-option-upsell_MODE_CATEGORY_ULTRA", checked: false },
};

test("menu mode: an already-checked option is confirmed without clicking it", async () => {
  const calls: string[] = [];
  const r = await selectGeminiModel(menuPage(MENU, calls), "gemini-4-hydrogen", 200);
  assert.equal(r.confirmed, true);
  assert.deepEqual(calls, [`click ${GEMINI_WEB_MODE_MENU_BUTTON}`, "press Escape"]);
});

test("menu mode: an unchecked option is clicked, then confirmed by reopening the menu", async () => {
  const calls: string[] = [];
  const r = await selectGeminiModel(menuPage(MENU, calls), "gemini-4-neon", 200);
  assert.equal(r.confirmed, true);
  assert.deepEqual(calls, [
    `click ${GEMINI_WEB_MODE_MENU_BUTTON}`,
    'click [data-test-id="bard-mode-option-n"]',
    `click ${GEMINI_WEB_MODE_MENU_BUTTON}`,
    "press Escape",
  ]);
});

test("menu mode: a locked (upsell) option fails closed as mode_locked", async () => {
  const r = await selectGeminiModel(menuPage(MENU, []), "gemini-4-carbon", 200);
  assert.deepEqual([r.confirmed, r.reason], [false, "mode_locked"]);
});

test("menu mode: an option missing from the menu fails closed as mode_not_offered", async () => {
  const { "4 Neon": _omit, ...withoutNeon } = MENU;
  const r = await selectGeminiModel(menuPage(withoutNeon, []), "gemini-4-neon", 200);
  assert.deepEqual([r.confirmed, r.reason], [false, "mode_not_offered"]);
});

// ── Executor: no StreamGenerate at all, answer only in the DOM ───────────────

const originalLaunch = playwright.chromium.launch;
test.afterEach(() => {
  playwright.chromium.launch = originalLaunch;
});

function stubDomOnlyLaunch(answer: string) {
  let sent = 0;
  let polls = 0;
  playwright.chromium.launch = (async () => ({
    newContext: async () => ({
      addCookies: async () => {},
      cookies: async () => [],
      newPage: async () => ({
        on: () => {},
        goto: async () => {},
        // Short sleeps keep the poll loop cheap; the response-timeout wait (30 s) is capped
        // at 4 s so the DOM answer (stable after 2 s) wins the race.
        waitForTimeout: async (ms: number) => sleep(ms >= 10_000 ? 4000 : 5),
        waitForSelector: async () => ({ click: async () => {} }),
        evaluate: async (expression: string) => {
          assert.match(expression, /model-response/);
          assert.match(expression, /const __name = \(f\) => f/);
          if (!sent) return { queries: 0, responses: 0, busy: false, text: "" };
          polls++;
          return polls < 3
            ? { queries: 1, responses: 1, busy: true, text: answer.slice(0, 3) }
            : { queries: 1, responses: 1, busy: false, text: answer };
        },
        keyboard: {
          type: async () => {},
          insertText: async () => {},
          press: async () => {
            sent++;
          },
        },
      }),
    }),
    close: async () => {},
  })) as unknown as typeof playwright.chromium.launch;
}

test("no StreamGenerate response: the answer is read from the rendered page", async () => {
  stubDomOnlyLaunch("pineapple");
  const result = await new GeminiWebExecutor().execute({
    model: "gemini-3.1-pro",
    body: { messages: [{ role: "user", content: "hello" }], stream: false },
    stream: false,
    credentials: { apiKey: "__Secure-1PSID=test-psid" },
    signal: AbortSignal.timeout(15_000),
    log: null,
  });
  assert.equal(result.response.status, 200);
  const body = await result.response.json();
  assert.equal(body.choices[0].message.content, "pineapple");
});

test("the in-page reader runs inside a real page context, where transpiler helpers do not exist", () => {
  // jsdom's window.eval is a separate global: no __name or other tsx/esbuild helpers.
  const dom = new JSDOM(`<body>${LIVE_LIKE_REPLY}</body>`, { runScripts: "outside-only" });
  assert.equal(typeof (dom.window as unknown as Record<string, unknown>).__name, "undefined");
  const snap = dom.window.eval(toInPageExpression(readGeminiDomReply)) as { text: string };
  assert.match(snap.text, /^Here is the \*\*requested\*\* JSON\./);
  const option = dom.window.eval(
    toInPageExpression(findMenuOptionInPage, { selector: "x-none", sublabel: "4 Neon" })
  );
  assert.equal(option, null);
});

test("signed-out detection: the mode picker's sign-in button marks an expired session", () => {
  const signedOut = new JSDOM(
    `<body><button data-test-id="mode-picker-sign-in-button">Sign in</button></body>`
  ).window.document;
  const signedIn = new JSDOM(`<body>${LIVE_LIKE_REPLY}</body>`).window.document;
  assert.equal(isGeminiSignedOutInPage(signedOut), true);
  assert.equal(isGeminiSignedOutInPage(signedIn), false);
});

test("a signed-out page answers 401 gemini_web_signed_out instead of a mode error", async () => {
  playwright.chromium.launch = (async () => ({
    newContext: async () => ({
      addCookies: async () => {},
      cookies: async () => [],
      newPage: async () => ({
        on: () => {},
        goto: async () => {},
        waitForTimeout: async () => {},
        waitForSelector: async () => ({ click: async () => {} }),
        evaluate: async (expression: string) => /mode-picker-sign-in-button/.test(expression),
        keyboard: { type: async () => {}, insertText: async () => {}, press: async () => {} },
      }),
    }),
    close: async () => {},
  })) as unknown as typeof playwright.chromium.launch;
  const result = await new GeminiWebExecutor().execute({
    model: "gemini-4-hydrogen",
    body: { messages: [{ role: "user", content: "hello" }], stream: false },
    stream: false,
    credentials: { apiKey: "__Secure-1PSID=test-psid" },
    signal: AbortSignal.timeout(5000),
    log: null,
  });
  assert.equal(result.response.status, 401);
  assert.equal((await result.response.json()).code, "gemini_web_signed_out");
});

// ── Review follow-ups (#21119) ───────────────────────────────────────────────

const replyDoc = (inner: string) =>
  new JSDOM(
    `<body><model-response><message-content><div class="markdown" aria-busy="false">${inner}</div></message-content></model-response></body>`
  ).window.document;

const codeBlockHtml = (code: string, lang = "Markdown") =>
  `<code-block><div class="code-block-decoration"><span>${lang}</span></div><pre><code data-test-id="code-content">${code}</code></pre></code-block>`;

test("a ``` line inside the code gets a longer outer fence", () => {
  const text = readGeminiDomReply(replyDoc(codeBlockHtml("before\n```js\nx()\n```\nafter"))).text;
  assert.equal(text, "````markdown\nbefore\n```js\nx()\n```\nafter\n````");
});

test("blank lines inside code are kept exactly", () => {
  const text = readGeminiDomReply(replyDoc(codeBlockHtml('s = """a\n\n\nb"""', "Python"))).text;
  assert.equal(text, '```python\ns = """a\n\n\nb"""\n```');
});

test("a code block inside a list item keeps its lines, indented as continuation", () => {
  const html = `<ol><li><p>Run:</p>${codeBlockHtml("if ready:\n    run()", "Python")}</li><li>Done</li></ol>`;
  assert.equal(
    readGeminiDomReply(replyDoc(html)).text,
    "1. Run:\n   ```python\n   if ready:\n       run()\n   ```\n2. Done"
  );
});

test("a late, unreadable StreamGenerate body cannot replace the DOM answer", async () => {
  let onResponse: ((r: unknown) => Promise<void>) | null = null;
  let sent = 0;
  playwright.chromium.launch = (async () => ({
    newContext: async () => ({
      addCookies: async () => {},
      // persistRotatedCookies() awaits this; the late StreamGenerate body lands meanwhile.
      cookies: async () => {
        await sleep(400);
        return [];
      },
      newPage: async () => ({
        on: (event: string, handler: (r: unknown) => Promise<void>) => {
          if (event === "response") onResponse = handler;
        },
        goto: async () => {},
        waitForTimeout: async (ms: number) => sleep(ms >= 10_000 ? 4000 : 5),
        waitForSelector: async () => ({ click: async () => {} }),
        evaluate: async (expression: string) => {
          if (/mode-picker-sign-in-button/.test(expression)) return false;
          return sent
            ? { queries: 1, responses: 1, busy: false, text: "pineapple" }
            : { queries: 0, responses: 0, busy: false, text: "" };
        },
        keyboard: {
          type: async () => {},
          insertText: async () => {},
          press: async () => {
            sent++;
            void onResponse?.({
              url: () => "https://gemini.google.com/_/BardChatUi/data/x/StreamGenerate?rt=c",
              text: async () => {
                await sleep(2300); // after the DOM answer is accepted (~2 s stable)
                return "garbage";
              },
            });
          },
        },
      }),
    }),
    close: async () => {},
  })) as unknown as typeof playwright.chromium.launch;
  const result = await new GeminiWebExecutor().execute({
    model: "gemini-3.1-pro",
    body: { messages: [{ role: "user", content: "hello" }], stream: false },
    stream: false,
    credentials: { apiKey: "__Secure-1PSID=test-psid" },
    signal: AbortSignal.timeout(15_000),
    log: null,
    onCredentialsRefreshed: async () => {},
  } as never);
  assert.equal(result.response.status, 200);
  assert.equal((await result.response.json()).choices[0].message.content, "pineapple");
});
