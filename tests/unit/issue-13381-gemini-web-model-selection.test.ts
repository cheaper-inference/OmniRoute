// #13381 — gemini-web advertised model IDs but never selected the requested
// model in the Gemini UI: every alias ran the identical automation, so the
// OpenAI-shaped `model` field on the response was a caller-supplied label, not
// an observed fact.
//
// gemini-web now selects the model in Gemini's model menu before typing anything
// (open-sse/executors/gemini-web/modeSelection.ts): it opens the menu, picks the
// option whose label is the model name, and confirms it by reopening the menu and
// reading the option's `aria-checked`. The choice persists on the Google account,
// so no model is assumed to be already active. Unconfirmed → 400
// `unsupported_control_for_provider`, never an answer under the wrong label.

import test from "node:test";
import assert from "node:assert/strict";

const { GeminiWebExecutor } = await import("../../open-sse/executors/gemini-web.ts");
const { GEMINI_WEB_UNSUPPORTED_CONTROL_CODE } =
  await import("../../open-sse/executors/gemini-web/capabilities.ts");
const {
  GEMINI_WEB_EXTENDED_THINKING_MODE,
  GEMINI_WEB_MODE_MENU_BUTTON,
  geminiWebModeOptionSelector,
} = await import("../../open-sse/executors/gemini-web/modeSelection.ts");

type Call = { fn: string; args: unknown[] };

interface SelectorScriptEntry {
  found: boolean;
  text?: string | null;
}

interface PageScript {
  /** Gemini's model menu: the option labels it offers and the one that is checked. */
  menu?: {
    labels: string[];
    checked: string;
    /** true: clicking an option does not change the selection (a failed switch). */
    ignoresClicks?: boolean;
    /** Gemini's high-demand fallback: the option it switches to once it has answered. */
    switchesToAfterAnswer?: string;
  };
  /** Text of a StreamGenerate answer fired when Enter is pressed (no answer: 502). */
  answer?: string;
  /** Other controls, keyed by the EXACT selector string the production descriptor uses. */
  selectors?: Record<string, SelectorScriptEntry>;
}

/**
 * A configurable fake Playwright. `waitForSelector` resolves the prompt editor
 * unconditionally, emulates the model menu from `script.menu` (selectors built with
 * the production helpers, never duplicated as literals), and otherwise consults
 * `script.selectors`.
 */
function makeStreamGenerateRaw(text: string): string {
  const inner = new Array(80).fill(null);
  inner[4] = [[null, [text]]];
  return `)]}'\n10\n[["wrb.fr", null, ${JSON.stringify(JSON.stringify(inner))}]]`;
}

function makeFakePlaywright(calls: Call[], script: PageScript = {}) {
  const menu = script.menu ? { ...script.menu } : null;
  let onResponse: ((resp: { url: () => string; text: () => Promise<string> }) => unknown) | null =
    null;
  return {
    newContext: async (opts: unknown) => {
      calls.push({ fn: "newContext", args: [opts] });
      return {
        addCookies: async (cookies: unknown) => {
          calls.push({ fn: "addCookies", args: [cookies] });
        },
        cookies: async () => [],
        newPage: async () => ({
          on: (event: string, cb: typeof onResponse) => {
            calls.push({ fn: "page.on", args: [event] });
            if (event === "response") onResponse = cb;
          },
          goto: async (url: string, opts2: unknown) => {
            calls.push({ fn: "goto", args: [url, opts2] });
          },
          waitForTimeout: async (ms: number) => {
            calls.push({ fn: "waitForTimeout", args: [ms] });
          },
          waitForSelector: async (selector: string, opts2: unknown) => {
            calls.push({ fn: "waitForSelector", args: [selector, opts2] });
            if (selector.includes(".ql-editor")) {
              return {
                click: async () => {
                  calls.push({ fn: "editor.click", args: [] });
                },
              };
            }
            if (menu && selector === GEMINI_WEB_MODE_MENU_BUTTON) {
              return {
                click: async () => {
                  calls.push({ fn: "menu.open", args: [] });
                },
              };
            }
            const label = menu?.labels.find((l) => geminiWebModeOptionSelector(l) === selector);
            if (menu && label) {
              return {
                click: async () => {
                  calls.push({ fn: "option.click", args: [label] });
                  if (!menu.ignoresClicks) menu.checked = label;
                },
                getAttribute: async (name: string) =>
                  name === "aria-checked" ? String(menu.checked === label) : null,
              };
            }
            const entry = script.selectors?.[selector];
            if (!entry || !entry.found) return null;
            return {
              click: async () => {
                calls.push({ fn: "mode.click", args: [selector] });
              },
              textContent: async () => entry.text ?? null,
            };
          },
          keyboard: {
            type: async (text: string, opts2: unknown) => {
              calls.push({ fn: "keyboard.type", args: [text, opts2] });
            },
            insertText: async (text: string) => {
              calls.push({ fn: "keyboard.insertText", args: [text] });
            },
            press: async (key: string) => {
              calls.push({ fn: "keyboard.press", args: [key] });
              if (key !== "Enter" || script.answer === undefined || !onResponse) return;
              await onResponse({
                url: () => "https://gemini.google.com/_/BardChatUi/data/x/StreamGenerate?rt=c",
                text: async () => makeStreamGenerateRaw(script.answer!),
              });
              if (menu?.switchesToAfterAnswer) menu.checked = menu.switchesToAfterAnswer;
            },
          },
        }),
      };
    },
    close: async () => {
      calls.push({ fn: "browser.close", args: [] });
    },
  };
}

interface ErrorBodyLike {
  error: { message: string; type: string; code: string };
}

async function runWithFakePage(
  model: string,
  script: PageScript,
  extra: Record<string, unknown> = {}
): Promise<{ calls: Call[]; status: number; body: ErrorBodyLike | Record<string, unknown> }> {
  const playwright = await import("playwright");
  const originalLaunch = playwright.chromium.launch;
  const calls: Call[] = [];
  playwright.chromium.launch = (async () =>
    makeFakePlaywright(calls, script)) as unknown as typeof originalLaunch;
  try {
    const executor = new GeminiWebExecutor();
    const result = await executor.execute({
      model,
      body: { messages: [{ role: "user", content: "What is 2+2?" }], stream: false, ...extra },
      stream: false,
      credentials: { apiKey: "__Secure-1PSID=fake" },
      signal: AbortSignal.timeout(5000),
      log: null,
    });
    const body = (await result.response.json()) as ErrorBodyLike | Record<string, unknown>;
    return { calls, status: result.response.status, body };
  } finally {
    playwright.chromium.launch = originalLaunch;
  }
}

/** The model menu of the account checked live on 2026-11-20. */
const LIVE_MENU = ["4 Hydrogen", "4 Hydrogen Thinking", "3.1 Pro"];
const reachedEditor = (calls: Call[]) => calls.some((c) => c.fn === "editor.click");
const optionClicks = (calls: Call[]) =>
  calls.filter((c) => c.fn === "option.click").map((c) => c.args[0]);

// ─── The requested model is actually selected ───────────────────────────────

test("#13381: an already-checked model proceeds without clicking any option", async () => {
  const { status, calls } = await runWithFakePage("gemini-4-hydrogen", {
    menu: { labels: LIVE_MENU, checked: "4 Hydrogen" },
  });

  // This fake page never fires the "response" event, so reaching the prompt ends in 502.
  assert.equal(status, 502);
  assert.deepEqual(optionClicks(calls), []);
  assert.ok(reachedEditor(calls));
  assert.ok(
    calls.some((c) => c.fn === "keyboard.press" && c.args[0] === "Escape"),
    "the menu must be closed before typing"
  );
});

test("#13381: a different model is clicked, read back from the menu, then proceeds", async () => {
  for (const [model, label] of [
    ["gemini-4-hydrogen-thinking", "4 Hydrogen Thinking"],
    ["gemini-3.1-pro", "3.1 Pro"],
  ]) {
    const { status, calls } = await runWithFakePage(model, {
      menu: { labels: LIVE_MENU, checked: "4 Hydrogen" },
    });
    assert.equal(status, 502, `${model} must reach the prompt once confirmed`);
    assert.deepEqual(optionClicks(calls), [label]);
    assert.equal(
      calls.filter((c) => c.fn === "menu.open").length,
      2,
      "the menu is reopened to read the selection back"
    );
    assert.ok(reachedEditor(calls));
  }
});

test("#13381: gemini-3.1-pro is no longer assumed active (the account remembers the last model)", async () => {
  const { calls } = await runWithFakePage("gemini-3.1-pro", {
    menu: { labels: LIVE_MENU, checked: "4 Hydrogen Thinking" },
  });
  assert.deepEqual(optionClicks(calls), ["3.1 Pro"]);
});

// ─── Anything unconfirmed fails closed ──────────────────────────────────────

test("#13381: a model the account's menu does not offer is a 400, never another model's answer", async () => {
  const { status, body, calls } = await runWithFakePage("gemini-3.7-flash", {
    menu: { labels: LIVE_MENU, checked: "4 Hydrogen" },
  });

  assert.equal(status, 400);
  const err = (body as ErrorBodyLike).error;
  assert.equal(err.code, GEMINI_WEB_UNSUPPORTED_CONTROL_CODE);
  assert.match(err.message, /gemini-3\.7-flash/);
  assert.match(err.message, /does not offer/);
  assert.equal(reachedEditor(calls), false);
  assert.equal(err.message.includes("at /"), false, "error bodies must stay sanitized");
});

test("#13381: a missing model menu fails closed with 400", async () => {
  const { status, body, calls } = await runWithFakePage("gemini-4-hydrogen", {});
  assert.equal(status, 400);
  assert.equal((body as ErrorBodyLike).error.code, GEMINI_WEB_UNSUPPORTED_CONTROL_CODE);
  assert.equal(reachedEditor(calls), false);
});

test("#13381: a click that does not change the selection fails closed with 400", async () => {
  const { status, body, calls } = await runWithFakePage("gemini-4-hydrogen-thinking", {
    menu: { labels: LIVE_MENU, checked: "4 Hydrogen", ignoresClicks: true },
  });
  assert.equal(status, 400);
  assert.equal((body as ErrorBodyLike).error.code, GEMINI_WEB_UNSUPPORTED_CONTROL_CODE);
  assert.equal(reachedEditor(calls), false);
});

test("#13381: an unmapped model id fails closed instead of running the account's model", async () => {
  const { status, body, calls } = await runWithFakePage("gemini-4.0-ultra-does-not-exist", {
    menu: { labels: LIVE_MENU, checked: "4 Hydrogen" },
  });
  assert.equal(status, 400);
  assert.equal((body as ErrorBodyLike).error.code, GEMINI_WEB_UNSUPPORTED_CONTROL_CODE);
  assert.equal(
    calls.some((c) => c.fn === "menu.open"),
    false
  );
});

test("#13381: model options are matched by their full label, so 4 Hydrogen is not 4 Hydrogen Thinking", () => {
  assert.notEqual(
    geminiWebModeOptionSelector("4 Hydrogen"),
    geminiWebModeOptionSelector("4 Hydrogen Thinking")
  );
  assert.match(geminiWebModeOptionSelector("4 Hydrogen"), /:text-is\("4 Hydrogen"\)/);
});

// ─── Gemini's high-demand fallback ──────────────────────────────────────────

test("an answer is returned when the requested model is still active afterwards", async () => {
  const { status, body } = await runWithFakePage("gemini-3.1-pro", {
    menu: { labels: LIVE_MENU, checked: "4 Hydrogen" },
    answer: "4",
  });
  assert.equal(status, 200);
  const json = body as { model: string; choices: Array<{ message: { content: string } }> };
  assert.equal(json.choices[0].message.content, "4");
  assert.equal(json.model, "gemini-3.1-pro");
});

test("an answer Gemini gave with another model (high demand) is a 503, not a mislabeled 200", async () => {
  const { status, body } = await runWithFakePage("gemini-3.1-pro", {
    menu: { labels: LIVE_MENU, checked: "4 Hydrogen", switchesToAfterAnswer: "4 Hydrogen" },
    answer: "4",
  });
  assert.equal(status, 503);
  const err = (body as ErrorBodyLike).error;
  assert.equal(err.code, "server_is_overloaded");
  assert.match(err.message, /gemini-3\.1-pro/);
  assert.match(err.message, /high demand/);
});

// ─── gemini-4-argon opt-in (#16573) ─────────────────────────────────────────

const ARGON_ENV = "OMNIROUTE_GEMINI_WEB_ARGON_ENABLED";

async function withArgonEnv<T>(value: string | undefined, fn: () => Promise<T>): Promise<T> {
  const previous = process.env[ARGON_ENV];
  if (value === undefined) delete process.env[ARGON_ENV];
  else process.env[ARGON_ENV] = value;
  try {
    return await fn();
  } finally {
    if (previous === undefined) delete process.env[ARGON_ENV];
    else process.env[ARGON_ENV] = previous;
  }
}

const ARGON_MENU: PageScript = {
  menu: { labels: [...LIVE_MENU, "4 Argon"], checked: "4 Hydrogen" },
};

test("#16573: gemini-4-argon stays an unknown model while its opt-in switch is off", async () => {
  for (const value of [undefined, "0", "false", ""]) {
    const { status, calls, body } = await withArgonEnv(value, () =>
      runWithFakePage("gemini-4-argon", ARGON_MENU)
    );
    assert.equal(status, 400, `switch=${String(value)} must keep the pre-#16573 rejection`);
    assert.equal((body as ErrorBodyLike).error.code, GEMINI_WEB_UNSUPPORTED_CONTROL_CODE);
    assert.match((body as ErrorBodyLike).error.message, /not one of the advertised/);
    assert.equal(
      calls.some((c) => c.fn === "menu.open"),
      false
    );
    assert.equal(reachedEditor(calls), false);
  }
});

test("#16573: gemini-4-argon is selected from the menu once its switch is on", async () => {
  const { status, calls } = await withArgonEnv("1", () =>
    runWithFakePage("gemini-4-argon", ARGON_MENU)
  );
  assert.equal(status, 502);
  assert.deepEqual(optionClicks(calls), ["4 Argon"]);
  assert.ok(reachedEditor(calls));
});

// ─── Extended Thinking (#13381 follow-up, 2026-09-11 reporter comment) ──────

test("#13381: Extended Thinking is attempted and, once confirmed, the request proceeds", async () => {
  const descriptor = GEMINI_WEB_EXTENDED_THINKING_MODE;
  const { status, calls } = await runWithFakePage(
    "gemini-3.1-pro",
    {
      menu: { labels: LIVE_MENU, checked: "3.1 Pro" },
      selectors: {
        [descriptor.toggleSelector!]: { found: true },
        [descriptor.activeIndicatorSelector!]: { found: true, text: "Deep Think enabled" },
      },
    },
    { reasoning_effort: "high" }
  );

  assert.equal(status, 502, "a CONFIRMED Extended Thinking switch must proceed to the prompt");
  assert.ok(calls.some((c) => c.fn === "mode.click"));
});

test(
  "#13381: Extended Thinking fails closed with 400 when the control cannot be confirmed " +
    "(no live account can verify it from this checkout)",
  async () => {
    const { status, body } = await runWithFakePage(
      "gemini-3.1-pro",
      { menu: { labels: LIVE_MENU, checked: "3.1 Pro" } },
      { reasoning_effort: "high" }
    );

    assert.notEqual(status, 200);
    assert.equal(status, 400);
    const err = (body as ErrorBodyLike).error;
    assert.equal(err.code, GEMINI_WEB_UNSUPPORTED_CONTROL_CODE);
    assert.match(err.message, /Extended Thinking/);
  }
);

test("#13381: reasoning_effort none/minimal never triggers the Extended Thinking control at all", async () => {
  for (const effort of ["none", "minimal"]) {
    const { status, calls } = await runWithFakePage(
      "gemini-3.1-pro",
      { menu: { labels: LIVE_MENU, checked: "3.1 Pro" } },
      { reasoning_effort: effort }
    );
    assert.equal(
      status,
      502,
      `effort="${effort}" must reach the ordinary (unanswered) prompt path`
    );
    assert.equal(
      calls.some((c) => c.fn === "mode.click"),
      false,
      `effort="${effort}" must not attempt any UI control switch`
    );
  }
});
