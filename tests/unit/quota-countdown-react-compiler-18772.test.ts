// Regression for #18772 — provider quota "Resets in" countdown did not update on refresh.
// Root cause: next.config.mjs enables `reactCompiler: true`; the compiler memoizes
// `formatCountdown(q.resetAt)` on the dependency `q.resetAt` only, but formatCountdown reads
// Date.now() internally (impure, invisible to the compiler). A refresh that returns the same
// resetAt re-renders the row yet reuses the stale cached string until the component remounts
// (full page reload). Fix: `now` is an explicit input (useQuotaClock, one tick per card) so the
// compiler's cache key includes it.
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const limitsDir = path.join(root, "src/app/(dashboard)/dashboard/usage/components/ProviderLimits");

function compileWithReactCompiler(code: string, filename: string): string {
  const babel = require("@babel/core");
  const out = babel.transformSync(code, {
    filename,
    babelrc: false,
    configFile: false,
    parserOpts: { plugins: ["jsx", "typescript"] },
    plugins: [
      [require("babel-plugin-react-compiler"), {}],
      require("@babel/plugin-transform-react-jsx"),
      require("@babel/plugin-transform-typescript"),
      require("@babel/plugin-transform-modules-commonjs"),
    ],
  });
  return out.code;
}

test("#18772 static: compiled QuotaDetailRow does not memoize formatCountdown(q.resetAt) on resetAt alone", () => {
  const file = path.join(limitsDir, "parts/QuotaCardExpanded.tsx");
  const src = fs.readFileSync(file, "utf8");
  const compiled = compileWithReactCompiler(src, file);
  const m = compiled.match(
    /if \(\$\[(\d+)\] !== q\.resetAt\) \{\s*t\d+ = \(0, _utils\.formatCountdown\)\(q\.resetAt\);/
  );
  assert.equal(
    m,
    null,
    "formatCountdown(q.resetAt) is cached by the React Compiler keyed only on q.resetAt, " +
      "so the 'Resets in' text never recomputes on re-render"
  );
});

test("#18772 parent refresh actions update the clock used by inline quota summaries", () => {
  const src = fs.readFileSync(path.join(limitsDir, "index.tsx"), "utf8");
  const refreshProviderStart = src.indexOf("const refreshProvider = useCallback(");
  const refreshAllStart = src.indexOf("const refreshAll = useCallback(");
  const refreshingAllRefStart = src.indexOf("const refreshingAllRef =", refreshProviderStart);
  const refreshAllEffectStart = src.indexOf("\n  useEffect(", refreshAllStart);
  const refreshProvider = src.slice(refreshProviderStart, refreshingAllRefStart);
  const refreshAll = src.slice(refreshAllStart, refreshAllEffectStart);

  assert.match(src, /formatCountdown\(q\.resetAt, clockNow\)/);
  assert.ok(refreshProvider.includes("refreshClock()"), "single-provider refresh updates clock");
  assert.ok(refreshAll.includes("refreshClock()"), "refresh-all action updates clock");
});

test("#18772 behavior: countdown row keeps showing the stale value after a refresh re-render", async () => {
  const { JSDOM } = require("jsdom");
  const dom = new JSDOM("<!doctype html><div id='root'></div>");
  const g = globalThis as Record<string, unknown>;
  g.window = dom.window;
  g.document = dom.window.document;
  g.IS_REACT_ACT_ENVIRONMENT = true;

  const { formatCountdown } = await import(pathToFileURL(path.join(limitsDir, "utils.tsx")).href);

  // Same pattern as QuotaDetailRow: call the shared helper with the quota's resetAt.
  const rowSrc = `
    import { formatCountdown } from "utils";
    export function Row({ q, now }) {
      const cd = formatCountdown(q.resetAt, now);
      return <span id="cd">{cd}</span>;
    }`;
  const compiled = compileWithReactCompiler(rowSrc, "Row.tsx");
  const mod: { exports: Record<string, unknown> } = { exports: {} };
  const fakeRequire = (id: string) => (id === "utils" ? { formatCountdown } : require(id));
  const wrapper = vm.runInThisContext(`(function (require, module, exports) {${compiled}\n})`) as (
    r: typeof fakeRequire,
    m: typeof mod,
    e: typeof mod.exports
  ) => void;
  wrapper(fakeRequire, mod, mod.exports);

  const React = require("react");
  const { createRoot } = require("react-dom/client");
  const { act } = React;

  const realNow = Date.now;
  let now = Date.parse("2026-11-10T10:00:00Z");
  Date.now = () => now;
  try {
    const resetAt = "2026-11-10T12:00:00.000Z"; // 2h away
    const container = document.getElementById("root")!;
    const reactRoot = createRoot(container);
    await act(async () => {
      reactRoot.render(React.createElement(mod.exports.Row as never, { q: { resetAt }, now }));
    });
    assert.equal(container.textContent, "2h 0m");

    // 90 minutes pass; the user clicks refresh -> parseQuotaData yields a NEW quota object
    // with the same resetAt, and the row re-renders.
    now += 90 * 60_000;
    await act(async () => {
      reactRoot.render(React.createElement(mod.exports.Row as never, { q: { resetAt }, now }));
    });
    assert.equal(
      container.textContent,
      "0h 30m",
      "after refresh the countdown must reflect the current time"
    );
  } finally {
    Date.now = realNow;
  }
});

test("#18772 formatCountdown honours an explicit now", async () => {
  const { formatCountdown } = await import(pathToFileURL(path.join(limitsDir, "utils.tsx")).href);
  const now = Date.parse("2026-11-10T10:00:00Z");
  assert.equal(formatCountdown("2026-11-10T12:00:00.000Z", now), "2h 0m");
  assert.equal(formatCountdown("2026-11-10T12:00:00.000Z", now + 90 * 60_000), "0h 30m");
  assert.equal(formatCountdown("2026-11-10T12:00:00.000Z", now + 3 * 3_600_000), null);
});

test("#18772 useQuotaClock advances on its interval tick", async () => {
  const { JSDOM } = require("jsdom");
  const dom = new JSDOM("<!doctype html><div id='root'></div>");
  const g = globalThis as Record<string, unknown>;
  g.window = dom.window;
  g.document = dom.window.document;
  g.IS_REACT_ACT_ENVIRONMENT = true;

  const { useQuotaClock, QUOTA_CLOCK_INTERVAL_MS } = await import(
    pathToFileURL(path.join(limitsDir, "useQuotaClock.ts")).href
  );
  const React = require("react");
  const { createRoot } = require("react-dom/client");
  const { act } = React;

  const realNow = Date.now;
  let now = Date.parse("2026-11-10T10:00:00Z");
  Date.now = () => now;
  mock.timers.enable({ apis: ["setInterval"] });
  try {
    function Probe() {
      const clock = useQuotaClock();
      return React.createElement(
        "button",
        { onClick: clock.refresh },
        String(clock.now)
      );
    }
    const container = document.getElementById("root")!;
    const reactRoot = createRoot(container);
    await act(async () => {
      reactRoot.render(React.createElement(Probe));
    });
    assert.equal(container.textContent, String(now));

    // Clicking refresh synchronizes the shared clock before the next interval tick.
    now += 90 * 60_000;
    await act(async () => {
      container.querySelector("button")!.dispatchEvent(
        new window.MouseEvent("click", { bubbles: true })
      );
    });
    assert.equal(container.textContent, String(now));

    now += QUOTA_CLOCK_INTERVAL_MS;
    await act(async () => {
      mock.timers.tick(QUOTA_CLOCK_INTERVAL_MS);
    });
    assert.equal(container.textContent, String(now));
    await act(async () => {
      reactRoot.unmount();
    });
  } finally {
    mock.timers.reset();
    Date.now = realNow;
  }
});
