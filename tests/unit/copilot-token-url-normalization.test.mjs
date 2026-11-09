import assert from "node:assert/strict";
import { once } from "node:events";
import { registerHooks } from "node:module";
import test from "node:test";
import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";

const wrapperUrl = new URL("../../src/sse/services/tokenRefresh.ts", import.meta.url).href;
const providerUrl = new URL(
  "../../open-sse/services/tokenRefresh/providers/copilot.ts",
  import.meta.url
).href;
const sanitizerUrl = new URL("../../open-sse/utils/urlSanitize.ts", import.meta.url).href;

// Load the real URL builders while isolating unrelated DB, proxy and OAuth dependencies.
function isolatedDependencies() {
  const unexpected = () => {
    throw new Error("unexpected dependency call in URL normalization test");
  };
  const exported = (names) =>
    names.map((name) => `export const ${name} = ${unexpected.toString()};`).join("\n");
  const coreNames = [
    "getRefreshLeadMs",
    "refreshAccessToken",
    "refreshClaudeOAuthToken",
    "refreshGoogleToken",
    "refreshCodexToken",
    "refreshQoderToken",
    "refreshGitHubToken",
    "refreshCopilotToken",
    "getAccessToken",
    "refreshTokenByProvider",
    "formatProviderCredentials",
    "getAllAccessTokens",
  ];
  const stubs = new Map([
    ["../utils/logger", "export {};"],
    ["@omniroute/open-sse/services/tokenRefresh/passiveCodex.ts", "export {};"],
    ["@/lib/db/providers", exported(["updateProviderConnection"])],
    ["@/lib/tokenHealthCheckExpiry", exported(["parseTokenExpiryMs"])],
    ["@/lib/db/settings", exported(["resolveProxyForConnection"])],
    ["@/lib/db/proxies", exported(["resolveProxyForProvider", "hasBlockingProxyAssignment"])],
    [
      "@omniroute/open-sse/services/tokenRefresh.ts",
      "export const TOKEN_EXPIRY_BUFFER_MS = 300000;\n" + exported(coreNames),
    ],
    [
      "../../../config/providerHeaderProfiles.ts",
      "export const getGitHubCopilotRefreshHeaders = (Authorization) => ({ Authorization });",
    ],
    [
      "../../../utils/proxyFetch.ts",
      "export const runWithProxyContext = (_proxy, operation) => operation();",
    ],
  ]);
  return registerHooks({
    resolve(specifier, context, nextResolve) {
      if (context.parentURL !== wrapperUrl && context.parentURL !== providerUrl) {
        return nextResolve(specifier, context);
      }
      if (specifier.endsWith("/utils/urlSanitize.ts")) {
        return { url: sanitizerUrl, shortCircuit: true };
      }
      const source = stubs.get(specifier);
      assert.notEqual(source, undefined, `unreviewed dependency: ${specifier}`);
      return { url: `data:text/javascript,${encodeURIComponent(source)}`, shortCircuit: true };
    },
  });
}

async function checkBuilder(kind, base) {
  const hooks = isolatedDependencies();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("unexpected network call in URL normalization test");
  };
  try {
    if (kind === "wrapper") {
      const { resolveCopilotTokenBaseUrl } = await import(wrapperUrl);
      return resolveCopilotTokenBaseUrl("ghe-copilot", { providerSpecificData: { gheUrl: base } });
    }
    const calls = [];
    globalThis.fetch = async (url, init) => {
      calls.push({ url, authorization: new Headers(init?.headers).get("authorization") });
      return Response.json({ token: "synthetic-copilot", expires_at: "synthetic-expiry" });
    };
    const { refreshCopilotToken } = await import(providerUrl);
    const result = await refreshCopilotToken("synthetic-github", undefined, null, base);
    assert.deepEqual(result, { token: "synthetic-copilot", expiresAt: "synthetic-expiry" });
    assert.equal(calls.length, 1);
    assert.equal(calls[0].authorization, "token synthetic-github");
    return calls[0].url;
  } finally {
    globalThis.fetch = originalFetch;
    hooks.deregister();
  }
}

if (!isMainThread) {
  await checkBuilder(workerData, "https://ghe.example");
  parentPort.postMessage({ ready: true });
  await once(parentPort, "message");
  const base = "https://ghe.example/" + "/".repeat(200_000) + "x";
  const expected = base + (workerData === "wrapper" ? "/api/v3" : "/copilot_internal/v2/token");
  assert.equal(await checkBuilder(workerData, base), expected);
  parentPort.postMessage({ matched: true });
  parentPort.close();
} else {
  for (const kind of ["wrapper", "provider"]) {
    test(`Copilot ${kind} preserves endpoint construction`, async () => {
      const suffix = kind === "wrapper" ? "/api/v3" : "/copilot_internal/v2/token";
      for (const base of [
        "https://ghe.example",
        "https://ghe.example/",
        "https://ghe.example///",
      ]) {
        assert.equal(await checkBuilder(kind, base), "https://ghe.example" + suffix);
      }
      if (kind === "wrapper") {
        assert.equal(
          await checkBuilder(kind, "  https://ghe.example/// \n"),
          "https://ghe.example/api/v3"
        );
      }
    });

    test(`Copilot ${kind} handles a long nonterminal slash run without blocking`, async () => {
      const worker = new Worker(new URL(import.meta.url), { workerData: kind });
      let timer;
      let exited = false;
      let matched = false;
      try {
        await new Promise((resolve, reject) => {
          worker.once("error", reject);
          worker.once("exit", (code) => {
            exited = true;
            if (code !== 0) {
              reject(new Error(`URL normalization worker exited with code ${code}`));
            } else if (!matched) {
              reject(new Error("URL normalization worker exited before reporting a match"));
            } else {
              resolve();
            }
          });
          worker.on("message", (message) => {
            if (message.ready) {
              timer = setTimeout(
                () => reject(new Error("URL normalization blocked for 3000ms")),
                3000
              );
              worker.postMessage({ run: true });
              return;
            }
            try {
              assert.deepEqual(message, { matched: true });
              matched = true;
            } catch (error) {
              reject(error);
            }
          });
        });
      } finally {
        clearTimeout(timer);
        if (!exited) await worker.terminate();
      }
    });
  }
}
