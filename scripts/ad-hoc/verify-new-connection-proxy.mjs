/**
 * PR #18828 isolated component/handler/SQLite browser acceptance.
 * Run from the worktree: node --import tsx/esm --import ./tests/_setup/isolateDataDir.ts
 *   --import ./open-sse/utils/setupPolyfill.ts scripts/ad-hoc/verify-new-connection-proxy.mjs [path/to/chromium]
 * Requires installed locked dependencies and Chromium (optional positional path or /usr/bin/chromium).
 * Account creation is programmatic through the production bulk handler, not UI-driven.
 * This does not exercise full Next.js navigation/middleware or installed packaging.
 */
import fs from "node:fs";
import path from "node:path";
import net from "node:net";
import { syncBuiltinESMExports } from "node:module";
import assert from "node:assert/strict";
const log = (level, message) => console.log(`${new Date().toISOString()} ${level} ${message}`);
const root = process.cwd();
const originalEnv = { ...process.env };
const command = [process.execPath, ...process.execArgv, ...process.argv.slice(1)];
const { execFileSync } = await import("node:child_process");
const sha = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const dirty = Boolean(execFileSync("git", ["status", "--porcelain"], { encoding: "utf8" }).trim());
const artifacts = path.join(root, "_artifacts/proxy-browser");
fs.mkdirSync(artifacts, { recursive: true });
process.env.DATA_DIR = fs.mkdtempSync(path.join(artifacts, "db-"));
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
process.env.NODE_ENV = "test";
process.env.API_KEY_SECRET = "browser-fixture-api-secret-only";
process.env.JWT_SECRET = "browser-fixture-session-secret-only";
process.env.STORAGE_ENCRYPTION_KEY = "browser-fixture-encryption-secret-only";
delete process.env.INITIAL_PASSWORD;
delete process.env.REDIS_URL;
for (const key of [
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "ALL_PROXY",
  "NO_PROXY",
  "http_proxy",
  "https_proxy",
  "all_proxy",
  "no_proxy",
])
  delete process.env[key];
const originalConnect = net.Socket.prototype.connect;
net.Socket.prototype.connect = function (...args) {
  const first = Array.isArray(args[0]) ? args[0][0] : args[0];
  const opts =
    typeof first === "object"
      ? first
      : { host: typeof args[1] === "string" ? args[1] : "localhost" };
  if (!opts?.path && !["localhost", "127.0.0.1", "::1", undefined].includes(opts?.host)) {
    log("ERROR", "Blocked non-loopback network connection");
    throw new Error("External network connections are forbidden in this fixture");
  }
  return originalConnect.apply(this, args);
};
syncBuiltinESMExports();
let server;
let browser;
let core;
try {
  const { createServer } = await import("vite");
  const { default: react } = await import("@vitejs/plugin-react");
  const { chromium } = await import("playwright");
  const paths = await import("../../src/lib/dataPaths.ts");
  assert.equal(paths.resolveDataDir(), process.env.DATA_DIR);
  core = await import("../../src/lib/db/core.ts");
  const settings = await import("../../src/lib/db/settings.ts");
  const providers = await import("../../src/lib/db/providers.ts");
  const settingsRoute = await import("../../src/app/api/settings/route.ts");
  const bulkRoute = await import("../../src/app/api/providers/bulk/route.ts");
  await settings.updateSettings({ requireLogin: false, setupComplete: true });
  fs.writeFileSync(
    path.join(artifacts, "components.tsx"),
    `
export {default as Card} from '@/shared/components/Card';
export {default as Toggle} from '@/shared/components/Toggle';
export {default as Button} from '@/shared/components/Button';
export {default as Input} from '@/shared/components/Input';
export {default as Badge} from '@/shared/components/Badge';
export {default as Checkbox} from '@/shared/components/Checkbox';
export {default as Select} from '@/shared/components/Select';
export {default as ReorderControl} from '@/shared/components/ReorderControl';
export {Spinner} from '@/shared/components/Loading';
export const ProxyConfigModal = () => null;
`
  );
  fs.writeFileSync(
    path.join(artifacts, "client.tsx"),
    `
import React from 'react';
import {createRoot} from 'react-dom/client';
import {NextIntlClientProvider} from 'next-intl';
import ConnectionRow from '@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow';
import GlobalConfigTab from '@/app/(dashboard)/dashboard/settings/components/proxy/GlobalConfigTab';
import en from '@/i18n/messages/en.json';
import fa from '@/i18n/messages/fa.json';
import '@/app/globals.css';
const params = new URLSearchParams(location.search);
const locale = params.get('locale') || 'en';
document.documentElement.lang=locale;
document.documentElement.dir=locale==='fa'?'rtl':'ltr';
document.documentElement.className='ci-theme '+(params.get('theme')==='dark'?'dark':'');
document.documentElement.dataset.theme=params.get('theme')==='dark'?'dark':'light';
function Fixture() {
  const [accounts, setAccounts] = React.useState([]);
  React.useEffect(() => { const controller = new AbortController();
    fetch('/__fixture/accounts', {signal: controller.signal}).then(r => r.json()).then(setAccounts).catch(error => {if(!controller.signal.aborted) throw error;});
    return () => controller.abort();
  }, []);
  const noop = () => {};
  return <main style={{maxWidth:1000,margin:'24px auto',padding:16}}><GlobalConfigTab />
    <section aria-label="Synthetic accounts">{accounts.map(connection => <div key={connection.id} data-account={connection.name}>
      <ConnectionRow connection={connection} proxyEnabled={connection.proxyEnabled} isOAuth={false} isFirst isLast
        onMoveUp={noop} onMoveDown={noop} onToggleActive={noop} onToggleRateLimit={noop} onRetest={noop} onEdit={noop} onDelete={noop} onToggleProxyEnabled={noop}/>
    </div>)}</section></main>;
}
createRoot(document.getElementById('root')).render(<NextIntlClientProvider locale={locale} messages={{common:(locale==='fa'?fa:en).common,settings:(locale==='fa'?fa:en).settings,providers:(locale==='fa'?fa:en).providers,connectionTest:(locale==='fa'?fa:en).connectionTest}}><Fixture /></NextIntlClientProvider>);
`
  );
  server = await createServer({
    configFile: false,
    root,
    // Next's client environment shim, without exposing executor environment values.
    define: { "process.env": "{}" },
    resolve: {
      alias: [
        { find: /^@\/shared\/components$/, replacement: path.join(artifacts, "components.tsx") },
        { find: "@", replacement: path.join(root, "src") },
        { find: "@omniroute/open-sse", replacement: path.join(root, "open-sse") },
        { find: "@omniroute/ui-kit", replacement: path.join(root, "packages/ui-kit/src") },
      ],
    },
    esbuild: { jsx: "automatic" },
    optimizeDeps: {
      noDiscovery: true,
      include: [
        "react",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-dom/client",
        "next-intl",
        "clsx",
        "lucide-react",
        "tailwind-merge",
        "zustand",
        "zustand/middleware",
      ],
    },
    server: { host: "127.0.0.1", port: 0, strictPort: false },
    plugins: [
      react(),
      {
        name: "isolated-production-route-fixture",
        configureServer(dev) {
          dev.middlewares.use(async (req, res, next) => {
            try {
              const url = new URL(req.url, "http://127.0.0.1");
              if (url.pathname === "/__proxy-fixture") {
                res.setHeader("Content-Type", "text/html");
                res.end(
                  await dev.transformIndexHtml(
                    url.pathname,
                    '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div id="root"></div><script type="module" src="/_artifacts/proxy-browser/client.tsx"></script></body></html>'
                  )
                );
                return;
              }
              if (url.pathname === "/__fixture/accounts") {
                res.setHeader("Content-Type", "application/json");
                const rows = await providers.getProviderConnections();
                res.end(
                  JSON.stringify(
                    rows.map(
                      ({ id, name, provider, proxyEnabled, isActive, priority, authType }) => ({
                        id,
                        name,
                        provider,
                        proxyEnabled,
                        isActive,
                        priority,
                        authType,
                      })
                    )
                  )
                );
                return;
              }
              if (!url.pathname.startsWith("/api/")) return next();
              let body = "";
              for await (const chunk of req) body += chunk;
              const request = new Request(url, {
                method: req.method,
                headers: req.headers,
                ...(body ? { body } : {}),
              });
              let result;
              if (url.pathname === "/api/settings")
                result = await settingsRoute[req.method === "PATCH" ? "PATCH" : "GET"](request);
              else if (url.pathname === "/api/providers/bulk")
                result = await bulkRoute.POST(request);
              else if (url.pathname === "/api/settings/proxy")
                result = Response.json({ proxy: null });
              else result = Response.json({ error: "Unknown fixture route" }, { status: 404 });
              res.statusCode = result.status;
              result.headers.forEach((value, key) => res.setHeader(key, value));
              res.end(await result.text());
            } catch {
              log("ERROR", "Fixture request failed");
              res.statusCode = 500;
              res.end("{}");
            }
          });
        },
      },
    ],
  });
  await server.listen();
  const address = server.httpServer.address();
  const origin = `http://127.0.0.1:${address.port}`;
  browser = await chromium.launch({
    executablePath: process.argv[2] || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const context = await browser.newContext();
  await context.route("**/*", (route) =>
    new URL(route.request().url()).hostname === "127.0.0.1" ? route.continue() : route.abort()
  );
  const page = await context.newPage();
  const browserErrors = [];
  let reportPageError;
  const pageError = new Promise((_, reject) => {
    reportPageError = reject;
  });
  // Attach before navigation so an import error terminates the fixture promptly.
  void pageError.catch(() => {});
  page.on("console", (message) => {
    if (/MISSING_MESSAGE|INVALID_MESSAGE/.test(message.text())) browserErrors.push(message.text());
  });
  page.on("pageerror", (err) => {
    browserErrors.push(err.name);
    reportPageError(err);
    log("WARNING", `Browser error: ${err.message}`);
  });
  await page.goto(origin + "/__proxy-fixture", { waitUntil: "networkidle" });
  const label = JSON.parse(fs.readFileSync("src/i18n/messages/en.json")).settings
    .defaultNewConnectionProxyEnabled;
  const toggle = page.getByRole("switch", { name: label, exact: true });
  await Promise.race([toggle.waitFor({ timeout: 60000 }), pageError]);
  assert.equal(await toggle.isChecked(), true);
  const flip = async (enabled) => {
    const response = page.waitForResponse(
      (r) => r.url() === origin + "/api/settings" && r.request().method() === "PATCH"
    );
    await toggle.focus();
    await toggle.press("Space");
    assert.equal((await response).status(), 200);
    await page.waitForFunction(
      ({ label, enabled }) =>
        document.querySelector('[aria-label="' + label + '"]')?.getAttribute("aria-checked") ===
        String(enabled),
      { label, enabled }
    );
    assert.equal((await settings.getSettings()).defaultNewConnectionProxyEnabled, enabled);
  };
  const add = async (name) => {
    const response = await context.request.post(origin + "/api/providers/bulk", {
      data: {
        provider: "openai",
        validateKeys: false,
        entries: [{ name, apiKey: "sk-synthetic-" + name }],
      },
    });
    assert.equal(response.status(), 200);
    const body = await response.json();
    assert.equal(body.failed, 0);
    return body.created[0];
  };
  const english = JSON.parse(fs.readFileSync("src/i18n/messages/en.json"));
  const checkRows = async () => {
    await page
      .locator('[data-account="browser-off"]')
      .getByRole("button", { name: english.providers.proxyDisabledTitle, exact: true })
      .waitFor();
    assert.ok(
      (await page.locator('[data-account="browser-off"]').textContent()).includes(
        english.providers.proxyOff
      )
    );
  };
  await flip(false);
  const off = await add("browser-off");
  assert.equal(off.proxyEnabled, false);
  await page.reload({ waitUntil: "networkidle" });
  await checkRows();
  await flip(true);
  const on = await add("browser-on");
  assert.equal(on.proxyEnabled, true);
  assert.equal((await providers.getProviderConnectionById(off.id)).proxyEnabled, false);
  core.resetDbInstance();
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(await toggle.isChecked(), true);
  await checkRows();
  await page
    .locator('[data-account="browser-on"]')
    .getByRole("button", { name: english.providers.proxyEnabledTitle, exact: true })
    .waitFor();
  assert.equal((await providers.getProviderConnectionById(off.id)).proxyEnabled, false);
  assert.equal((await providers.getProviderConnectionById(on.id)).proxyEnabled, true);
  log("INFO", "Production Settings PATCH/GET -> bulk creation -> SQLite reopen workflow passed");
  for (const locale of ["en", "fa"])
    for (const theme of ["light", "dark"]) {
      const width = locale === "fa" ? 390 : 1280;
      await page.setViewportSize({ width, height: 960 });
      await page.goto(origin + "/__proxy-fixture?locale=" + locale + "&theme=" + theme, {
        waitUntil: "networkidle",
      });
      const localLabel = JSON.parse(fs.readFileSync("src/i18n/messages/" + locale + ".json"))
        .settings.defaultNewConnectionProxyEnabled;
      const switchEl = page.getByRole("switch", { name: localLabel, exact: true });
      await switchEl.waitFor();
      assert.equal(await switchEl.isChecked(), true);
      await switchEl.focus();
      const focus = await switchEl.evaluate((el) => ({
        focused: document.activeElement === el,
        shadow: getComputedStyle(el).boxShadow,
        outline: getComputedStyle(el).outlineStyle,
      }));
      assert.equal(focus.focused, true);
      assert.ok(
        focus.shadow !== "none" || focus.outline !== "none",
        "keyboard focus must be visible"
      );
      const persisted = page.waitForResponse(
        (r) => r.url() === origin + "/api/settings" && r.request().method() === "PATCH"
      );
      await switchEl.press("Space");
      assert.equal((await persisted).status(), 200);
      await page.waitForFunction(
        (label) =>
          document.querySelector('[aria-label="' + label + '"]')?.getAttribute("aria-checked") ===
          "false",
        localLabel
      );
      const restored = page.waitForResponse(
        (r) => r.url() === origin + "/api/settings" && r.request().method() === "PATCH"
      );
      await switchEl.press("Space");
      assert.equal((await restored).status(), 200);
      await page.waitForFunction(
        (label) =>
          document.querySelector('[aria-label="' + label + '"]')?.getAttribute("aria-checked") ===
          "true",
        localLabel
      );
      const help = JSON.parse(fs.readFileSync("src/i18n/messages/" + locale + ".json")).settings
        .defaultNewConnectionProxyEnabledDesc;
      assert.equal(await page.getByText(help, { exact: true }).isVisible(), true);
      assert.equal(
        await page.evaluate(() => document.documentElement.dir),
        locale === "fa" ? "rtl" : "ltr"
      );
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        true
      );
      await page.screenshot({
        path: path.join(artifacts, locale + "-" + theme + ".png"),
        fullPage: true,
      });
      log("INFO", `Browser rendering passed: ${locale} ${theme} width=${width}`);
    }
  assert.deepEqual(browserErrors, []);
  fs.writeFileSync(
    path.join(artifacts, "result.json"),
    JSON.stringify(
      {
        passed: true,
        sha,
        dirty,
        command,
        node: process.version,
        platform: process.platform,
        browser: browser.version(),
        sqlite: core.getDbInstance().prepare("SELECT sqlite_version() AS version").get().version,
        utc: new Date().toISOString(),
        exitCode: 0,
        workflow: ["OFF create", "ON create", "first unchanged", "reopen"],
        screenshots: ["en-light", "en-dark", "fa-light", "fa-dark"],
      },
      null,
      2
    )
  );
  log("INFO", "Browser acceptance complete");
} catch (error) {
  fs.writeFileSync(
    path.join(artifacts, "result.json"),
    JSON.stringify(
      { passed: false, sha, dirty, command, exitCode: 1, utc: new Date().toISOString() },
      null,
      2
    )
  );
  log("ERROR", error instanceof Error ? error.message : "Browser check failed");
  process.exitCode = 1;
} finally {
  await browser?.close();
  await server?.close();
  core?.resetDbInstance();
  fs.rmSync(process.env.DATA_DIR, { recursive: true, force: true });
  net.Socket.prototype.connect = originalConnect;
  syncBuiltinESMExports();
  for (const key of Object.keys(process.env)) if (!(key in originalEnv)) delete process.env[key];
  Object.assign(process.env, originalEnv);
  log("DEBUG", "Fixture server, database handles and disposable data cleaned up");
}
