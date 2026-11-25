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

const CHECKED_PRO_OPTION = { testId: "bard-mode-option-pro", checked: true, locked: false };

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
        click: async () => {},
        evaluate: async (expression: string) => {
          if (/"sublabel":/.test(expression)) return CHECKED_PRO_OPTION; // 3.1 Pro is picked from the menu
          if (/mode-picker-sign-in-button/.test(expression)) return false;
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
          press: async (key: string) => {
            if (key === "Escape") return; // closes the model menu
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
  assert.equal((await result.response.json()).error.code, "gemini_web_signed_out");
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
        click: async () => {},
        evaluate: async (expression: string) => {
          if (/"sublabel":/.test(expression)) return CHECKED_PRO_OPTION;
          if (/mode-picker-sign-in-button/.test(expression)) return false;
          return sent
            ? { queries: 1, responses: 1, busy: false, text: "pineapple" }
            : { queries: 0, responses: 0, busy: false, text: "" };
        },
        keyboard: {
          type: async () => {},
          insertText: async () => {},
          press: async (key: string) => {
            if (key === "Escape") return;
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

// ── Review items (#21119): 3.1 Pro from the menu, signed-out heuristic ───────

const { GEMINI_WEB_MODEL_MODES } =
  await import("../../open-sse/executors/gemini-web/modeSelection.ts");
const { resolveResponseTimeoutMs } =
  await import("../../open-sse/executors/gemini-web/browserErrors.ts");

// The #21116 reporter's menu: Hydrogen is the active mode and there is no "3.1 Pro" option.
const REPORTER_MENU = {
  "4 Hydrogen": { testId: "bard-mode-option-h", checked: true },
  "4 Hydrogen Thinking": { testId: "bard-mode-option-ht", checked: false },
  "4 Neon": { testId: "bard-mode-option-n", checked: false },
};

test("3.1 Pro is never assumed to be the active mode: no menu entry fails closed as mode_not_offered", async () => {
  assert.equal(GEMINI_WEB_MODEL_MODES["gemini-3.1-pro"].menuSublabel, "3.1 Pro");
  const r = await selectGeminiModel(menuPage(REPORTER_MENU, []), "gemini-3.1-pro", 200);
  assert.deepEqual([r.confirmed, r.reason], [false, "mode_not_offered"]);
});

test("3.1 Pro is picked from the menu and read back when the account offers it", async () => {
  const calls: string[] = [];
  const menu = { ...REPORTER_MENU, "3.1 Pro": { testId: "bard-mode-option-p", checked: false } };
  const r = await selectGeminiModel(menuPage(menu, calls), "gemini-3.1-pro", 200);
  assert.equal(r.confirmed, true);
  assert.ok(calls.includes('click [data-test-id="bard-mode-option-p"]'));
});

test("a locked 3.1 Pro option fails closed as mode_locked", async () => {
  const menu = { "3.1 Pro": { testId: "bard-mode-option-upsell_PRO", checked: false } };
  const r = await selectGeminiModel(menuPage(menu, []), "gemini-3.1-pro", 200);
  assert.deepEqual([r.confirmed, r.reason], [false, "mode_locked"]);
});

test("4 Hydrogen Thinking is matched by its exact sublabel, never by the shorter 4 Hydrogen", async () => {
  const calls: string[] = [];
  const thinking = await selectGeminiModel(
    menuPage(REPORTER_MENU, calls),
    "gemini-4-hydrogen-thinking",
    200
  );
  assert.equal(thinking.confirmed, true);
  assert.ok(calls.includes('click [data-test-id="bard-mode-option-ht"]'));
  const plain = await selectGeminiModel(menuPage(REPORTER_MENU, []), "gemini-4-hydrogen", 200);
  assert.equal(plain.confirmed, true);
  // Without the Thinking entry in the menu, the Thinking model must not fall back to 4 Hydrogen.
  const { "4 Hydrogen Thinking": _omit, ...withoutThinking } = REPORTER_MENU;
  const missing = await selectGeminiModel(
    menuPage(withoutThinking, []),
    "gemini-4-hydrogen-thinking",
    200
  );
  assert.deepEqual([missing.confirmed, missing.reason], [false, "mode_not_offered"]);
});

test("gemini-4-hydrogen-thinking is advertised and gets the long Gemini 4 response timeout", async () => {
  const { gemini_webProvider } =
    await import("../../open-sse/config/providers/registry/gemini/web/index.ts");
  assert.ok(
    gemini_webProvider.models.some((m: { id: string }) => m.id === "gemini-4-hydrogen-thinking")
  );
  assert.ok(
    resolveResponseTimeoutMs("gemini-4-hydrogen-thinking", {}) >
      resolveResponseTimeoutMs("gemini-3.1-pro", {})
  );
});

test("executor: gemini-3.1-pro on a menu without 3.1 Pro answers 400 and never types the prompt", async () => {
  const typed: string[] = [];
  playwright.chromium.launch = (async () => ({
    newContext: async () => ({
      addCookies: async () => {},
      cookies: async () => [],
      newPage: async () => ({
        on: () => {},
        goto: async () => {},
        waitForTimeout: async () => {},
        waitForSelector: async () => ({ click: async () => {} }),
        click: async () => {},
        // No "3.1 Pro" option in the menu; not signed out.
        evaluate: async () => null,
        keyboard: {
          type: async (t: string) => void typed.push(t),
          insertText: async (t: string) => void typed.push(t),
          press: async () => {},
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
    signal: AbortSignal.timeout(5000),
    log: null,
  });
  assert.equal(result.response.status, 400);
  const body = await result.response.json();
  assert.equal(body.error.code, "unsupported_control_for_provider");
  assert.match(body.error.message, /does not offer it/);
  assert.deepEqual(typed, []);
});

test("signed-out detection does not fire on a signed-in page that carries Google account links", () => {
  const signedIn = new JSDOM(
    `<body>${LIVE_LIKE_REPLY}
      <a href="https://accounts.google.com/ServiceLogin?service=bard&continue=https://gemini.google.com">Add account</a>
      <a href="https://accounts.google.com/v3/signin/identifier?flowName=GlifWebSignIn">Switch account</a>
      <button data-test-id="bard-mode-menu-button">4 Hydrogen</button></body>`
  ).window.document;
  assert.equal(isGeminiSignedOutInPage(signedIn), false);
});

// ── Signed-out "Sign in" item lives inside the open mode menu (live, 2026-11-25) ─────
// With the menu closed the page has no sign-in button; once the menu is open it lists
// "Sign in · Get more access" and the Gemini 4 options carry aria-disabled="true".

function signedOutMenuPage(calls: string[]) {
  let menuOpen = false;
  return {
    on: () => {},
    goto: async () => {},
    waitForTimeout: async () => {},
    waitForSelector: async () => ({ click: async () => {} }),
    click: async (selector: string) => {
      calls.push(`click ${selector}`);
      if (selector === GEMINI_WEB_MODE_MENU_BUTTON) menuOpen = true;
    },
    evaluate: async (expression: string) => {
      if (/"sublabel":/.test(expression)) {
        return menuOpen ? { testId: "bard-mode-option-", checked: false, locked: true } : null;
      }
      if (/mode-picker-sign-in-button/.test(expression)) return menuOpen;
      return null;
    },
    keyboard: {
      type: async (t: string) => void calls.push(`type ${t}`),
      insertText: async (t: string) => void calls.push(`type ${t}`),
      press: async (key: string) => {
        calls.push(`press ${key}`);
        if (key === "Escape") menuOpen = false;
      },
    },
  };
}

test("menu path: a sign-in item in the open menu is reported as signed_out, not mode_locked", async () => {
  const calls: string[] = [];
  const r = await selectGeminiModel(signedOutMenuPage(calls), "gemini-4-hydrogen", 200);
  assert.deepEqual([r.confirmed, r.reason], [false, "signed_out"]);
  assert.ok(calls.includes("press Escape"), "the menu is closed again");
});

test("executor: a session that is only visibly signed out inside the menu answers 401", async () => {
  const calls: string[] = [];
  playwright.chromium.launch = (async () => ({
    newContext: async () => ({
      addCookies: async () => {},
      cookies: async () => [],
      newPage: async () => signedOutMenuPage(calls),
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
  assert.equal((await result.response.json()).error.code, "gemini_web_signed_out");
  assert.ok(!calls.some((c) => c.startsWith("type ")), "the prompt is never typed");
});

// ── Review round 2 (#21119) ──────────────────────────────────────────────────

const { isGeminiMenuModeReplaced } =
  await import("../../open-sse/executors/gemini-web/modeSelection.ts");

const streamGenerateBody = (text: string) => {
  const inner = new Array(80).fill(null);
  inner[4] = [[null, [text]]];
  return `)]}'\n10\n[["wrb.fr", null, ${JSON.stringify(JSON.stringify(inner))}]]`;
};

/**
 * A page that answers through StreamGenerate right after Enter. `menuAfterAnswer`
 * is what the requested option looks like once the answer is in (null = unreadable).
 */
function stubStreamLaunch(opts: {
  menuAfterAnswer: { checked: boolean } | null;
  userQueryAppears?: boolean;
  enterPresses?: { count: number };
}) {
  let onResponse: ((r: unknown) => Promise<void>) | null = null;
  let sent = 0;
  playwright.chromium.launch = (async () => ({
    newContext: async () => ({
      addCookies: async () => {},
      cookies: async () => [],
      newPage: async () => ({
        on: (event: string, handler: (r: unknown) => Promise<void>) => {
          if (event === "response") onResponse = handler;
        },
        goto: async () => {},
        waitForTimeout: async (ms: number) => sleep(ms >= 10_000 ? 4000 : 5),
        waitForSelector: async () => ({ click: async () => {} }),
        click: async () => {},
        evaluate: async (expression: string) => {
          if (/"sublabel":/.test(expression)) {
            if (!sent) return CHECKED_PRO_OPTION;
            return opts.menuAfterAnswer && { ...CHECKED_PRO_OPTION, ...opts.menuAfterAnswer };
          }
          if (/mode-picker-sign-in-button/.test(expression)) return false;
          const shown = sent && opts.userQueryAppears !== false;
          return { queries: shown ? 1 : 0, responses: 0, busy: false, text: "" };
        },
        keyboard: {
          type: async () => {},
          insertText: async () => {},
          press: async (key: string) => {
            if (key === "Escape") return;
            sent++;
            if (opts.enterPresses) opts.enterPresses.count++;
            if (sent > 1) return; // a second Enter must not produce a second answer
            void onResponse?.({
              url: () => "https://gemini.google.com/_/BardChatUi/data/x/StreamGenerate?rt=c",
              text: async () => streamGenerateBody("from the network"),
            });
          },
        },
      }),
    }),
    close: async () => {},
  })) as unknown as typeof playwright.chromium.launch;
}

const runPro = () =>
  new GeminiWebExecutor().execute({
    model: "gemini-3.1-pro",
    body: { messages: [{ role: "user", content: "hello" }], stream: false },
    stream: false,
    credentials: { apiKey: "__Secure-1PSID=test-psid" },
    signal: AbortSignal.timeout(15_000),
    log: null,
    onCredentialsRefreshed: async () => {},
  } as never);

test("an answer Gemini gave with another model (high demand) is a 503, not a mislabeled 200", async () => {
  stubStreamLaunch({ menuAfterAnswer: { checked: false } });
  const result = await runPro();
  assert.equal(result.response.status, 503);
  assert.equal(result.response.headers.get("X-Omni-Fallback-Hint"), "connection_cooldown");
  const err = (await result.response.json()).error;
  assert.equal(err.code, "server_is_overloaded");
  assert.match(err.message, /gemini-3\.1-pro/);
});

test("the answer is kept when the requested mode is still checked, or the menu cannot be read", async () => {
  stubStreamLaunch({ menuAfterAnswer: { checked: true } });
  let result = await runPro();
  assert.equal(result.response.status, 200);
  assert.equal((await result.response.json()).choices[0].message.content, "from the network");
  stubStreamLaunch({ menuAfterAnswer: null });
  result = await runPro();
  assert.equal(result.response.status, 200);
});

test("isGeminiMenuModeReplaced: only a listed, unchecked option counts as replaced", async () => {
  assert.equal(await isGeminiMenuModeReplaced(menuPage(MENU, []), "gemini-4-neon", 200), true);
  assert.equal(await isGeminiMenuModeReplaced(menuPage(MENU, []), "gemini-4-hydrogen", 200), false);
  assert.equal(await isGeminiMenuModeReplaced(menuPage({}, []), "gemini-4-neon", 200), false);
  // Legacy toggle models have no menu entry to read back.
  assert.equal(await isGeminiMenuModeReplaced(menuPage(MENU, []), "gemini-3.7-flash", 200), false);
});

test("a StreamGenerate answer counts as submitted: no second Enter while user-query lags", async () => {
  const enterPresses = { count: 0 };
  stubStreamLaunch({ menuAfterAnswer: { checked: true }, userQueryAppears: false, enterPresses });
  const result = await runPro();
  assert.equal(result.response.status, 200);
  assert.equal((await result.response.json()).choices[0].message.content, "from the network");
  assert.equal(enterPresses.count, 1);
});

test("legacy toggle path: a sign-in item in the opened menu is signed_out, not a mode error", async () => {
  let menuOpen = false;
  const pressed: string[] = [];
  const page = {
    waitForSelector: async () => ({
      click: async () => {
        menuOpen = true;
      },
      textContent: async () => "Auto",
    }),
    evaluate: async (expression: string) =>
      /mode-picker-sign-in-button/.test(expression) ? menuOpen : null,
    keyboard: { press: async (k: string) => void pressed.push(k) },
  };
  for (const model of ["gemini-3.7-flash", "gemini-3.1-flash-lite"]) {
    menuOpen = false;
    const r = await selectGeminiModel(page as never, model, 200);
    assert.deepEqual([r.confirmed, r.reason], [false, "signed_out"], model);
  }
  assert.ok(pressed.includes("Escape"));
});

test("the 401 body uses the standard error shape, so the gateway keeps message and code", async () => {
  playwright.chromium.launch = (async () => ({
    newContext: async () => ({
      addCookies: async () => {},
      cookies: async () => [],
      newPage: async () => signedOutMenuPage([]),
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
  const body = await result.response.json();
  assert.equal(body.error.code, "gemini_web_signed_out");
  assert.equal(body.error.type, "authentication_error");
  assert.match(body.error.message, /signed out/);
});

test("list item: instruction, code block and verification stay in DOM order", () => {
  const html =
    `<ol><li><p>Install it:</p>${codeBlockHtml("npm i x", "Bash")}` +
    `<p>Then check <code>x --version</code>.</p></li><li>Done</li></ol>`;
  assert.equal(
    readGeminiDomReply(replyDoc(html)).text,
    "1. Install it:\n   ```bash\n   npm i x\n   ```\n   Then check `x --version`.\n2. Done"
  );
});

test("list item: spaces inside inline code are kept, plain text is still normalized", () => {
  const html = `<ul><li>Use   <code>a  =  b</code>   here</li></ul>`;
  assert.equal(readGeminiDomReply(replyDoc(html)).text, "- Use `a  =  b` here");
});
