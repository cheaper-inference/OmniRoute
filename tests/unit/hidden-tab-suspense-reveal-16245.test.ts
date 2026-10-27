import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { PassThrough } from "node:stream";
import { HIDDEN_TAB_REVEAL_SCRIPT } from "../../src/shared/utils/hiddenTabReveal.ts";

const require = createRequire(import.meta.url);
const React = require("react");
const { renderToPipeableStream } = require("react-dom/server");
const { JSDOM } = require("jsdom");

async function streamedHtml(): Promise<string> {
  let resolveData: (v: string) => void = () => {};
  const promise = new Promise<string>((r) => (resolveData = r));
  function Slow() {
    return React.createElement("main", { id: "real" }, React.use(promise));
  }
  const tree = React.createElement(
    "body",
    null,
    React.createElement(
      React.Suspense,
      { fallback: React.createElement("p", { id: "fb" }, "Loading OmniRoute...") },
      React.createElement(Slow)
    )
  );
  const out = new PassThrough();
  let html = "";
  out.on("data", (c) => (html += c.toString()));
  const done = new Promise<void>((r) => out.on("end", () => r()));
  const { pipe } = await new Promise<{ pipe: (d: PassThrough) => void }>((resolve) => {
    const s = renderToPipeableStream(tree, { onShellReady: () => resolve(s) });
  });
  pipe(out);
  setTimeout(() => resolveData("dashboard content"), 20);
  await done;
  return html;
}

function hiddenTab(html: string, preScript = "") {
  return new JSDOM(`<!doctype html><html><head></head>${html}`, {
    runScripts: "dangerously",
    beforeParse(w: {
      document: Document;
      requestAnimationFrame: unknown;
      eval: (s: string) => void;
    }) {
      Object.defineProperty(w.document, "visibilityState", { value: "hidden" });
      w.requestAnimationFrame = () => 0;
      if (preScript) w.eval(preScript);
    },
  });
}

test("#16245 shipped HIDDEN_TAB_REVEAL_SCRIPT reveals content in a hidden tab", async () => {
  const html = await streamedHtml();
  assert.match(html, /\$RC/, "fixture must contain React's reveal runtime");
  const doc = hiddenTab(html, HIDDEN_TAB_REVEAL_SCRIPT).window.document;
  await new Promise((r) => setTimeout(r, 3000));
  assert.ok(doc.getElementById("real"));
  assert.equal(doc.getElementById("fb"), null);
});

test("#16245 root layout injects the script via dangerouslySetInnerHTML", () => {
  const src = fs.readFileSync("src/app/layout.tsx", "utf8");
  assert.match(src, /import \{ HIDDEN_TAB_REVEAL_SCRIPT \}/);
  assert.match(
    src,
    /<script dangerouslySetInnerHTML=\{\{ __html: HIDDEN_TAB_REVEAL_SCRIPT \}\} \/>/
  );
});
