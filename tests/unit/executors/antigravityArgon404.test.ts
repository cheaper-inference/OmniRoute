import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join, resolve } from "node:path";
import { transformSync } from "esbuild";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = resolve(__dirname, "../../..");

function resolveFileOrDir(target: string): string {
  if (existsSync(target) && statSync(target).isFile()) {
    return target;
  }
  if (existsSync(`${target}.ts`) && statSync(`${target}.ts`).isFile()) {
    return `${target}.ts`;
  }
  if (existsSync(join(target, "index.ts")) && statSync(join(target, "index.ts")).isFile()) {
    return join(target, "index.ts");
  }
  return target;
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const target = resolveFileOrDir(resolve(ROOT_DIR, "src", specifier.slice(2)));
      return nextResolve(pathToFileURL(target).href, context);
    }
    if (specifier === "@omniroute/open-sse") {
      return nextResolve(pathToFileURL(resolve(ROOT_DIR, "open-sse/index.ts")).href, context);
    }
    if (specifier.startsWith("@omniroute/open-sse/")) {
      const target = resolveFileOrDir(
        resolve(ROOT_DIR, "open-sse", specifier.slice("@omniroute/open-sse/".length))
      );
      return nextResolve(pathToFileURL(target).href, context);
    }
    if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL) {
      const parentDir = dirname(fileURLToPath(context.parentURL));
      const candidate = resolveFileOrDir(resolve(parentDir, specifier));
      if (candidate !== resolve(parentDir, specifier)) {
        return nextResolve(pathToFileURL(candidate).href, context);
      }
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.startsWith("file://") && url.endsWith(".json")) {
      const filePath = fileURLToPath(url);
      const raw = readFileSync(filePath, "utf8");
      return {
        format: "json",
        shortCircuit: true,
        source: raw,
      };
    }
    if (url.startsWith("file://") && url.endsWith(".ts")) {
      const filePath = fileURLToPath(url);
      let raw = readFileSync(filePath, "utf8");
      if (filePath.endsWith("/open-sse/utils/jsonSize.ts") && !raw.includes("jsonLengthStrippingBase64DataUris")) {
        raw += "\nexport const jsonLengthStrippingBase64DataUris = jsonLength;\nexport const rawLengthStrippingBase64DataUris = (s: string) => s.length;\n";
      }
      const { code } = transformSync(raw, {
        loader: "ts",
        format: "esm",
        target: "node22",
        sourcefile: filePath,
      });
      return {
        format: "module",
        shortCircuit: true,
        source: code,
      };
    }
    return nextLoad(url, context);
  },
});

const { AntigravityExecutor } = await import("../../../open-sse/executors/antigravity.ts");
const { applyArgon404ExclusionToPsd, markAccountUnavailable } = await import(
  "@/sse/services/auth"
);
const { createProviderConnection, getProviderConnectionById } = await import(
  "@/lib/db/providers"
);
const { isModelLocked, clearAllModelLockouts } = await import(
  "@omniroute/open-sse/services/accountFallback.ts"
);

test("AntigravityExecutor.shouldRetry returns false on 404 for Argon models", () => {
  const executor = new AntigravityExecutor();

  assert.equal(executor.shouldRetry(404, 0, "gemini-4-argon"), false);
  assert.equal(executor.shouldRetry(404, 0, "antigravity/gemini-4-argon-high"), false);
  assert.equal(executor.shouldRetry(404, 0, "gemini-4-argon-low"), false);
});

test("AntigravityExecutor.shouldRetry returns true on 429 for Argon models when fallback URLs exist", () => {
  const executor = new AntigravityExecutor();

  assert.equal(executor.shouldRetry(429, 0, "gemini-4-argon"), true);
});

test("AntigravityExecutor.shouldRetry returns true on 404 for non-Argon models when fallback URLs exist", () => {
  const executor = new AntigravityExecutor();

  assert.equal(executor.shouldRetry(404, 0, "gemini-3.8-flash"), true);
  assert.equal(executor.shouldRetry(404, 0), true);
});

test("applyArgon404ExclusionToPsd sets hasArgon: false and non-destructively merges excludedModels", () => {
  assert.equal(typeof applyArgon404ExclusionToPsd, "function");

  // Given: empty PSD
  const emptyResult = applyArgon404ExclusionToPsd({});
  assert.equal(emptyResult.changed, true);
  assert.equal(emptyResult.nextPsd.hasArgon, false);
  assert.deepEqual(emptyResult.nextPsd.excludedModels, ["gemini-4*", "*argon*"]);

  // Given: PSD with existing custom excludedModels and other fields
  const existingPsd = {
    plan: "Pro",
    hasArgon: true,
    excludedModels: ["claude-3-haiku*", "gemini-4*"],
  };
  const mergedResult = applyArgon404ExclusionToPsd(existingPsd);
  assert.equal(mergedResult.changed, true);
  assert.equal(mergedResult.nextPsd.plan, "Pro");
  assert.equal(mergedResult.nextPsd.hasArgon, false);
  assert.deepEqual(mergedResult.nextPsd.excludedModels, [
    "claude-3-haiku*",
    "gemini-4*",
    "*argon*",
  ]);

  // Given: PSD already marked ineligible with both exclusion patterns
  const idempotentResult = applyArgon404ExclusionToPsd(mergedResult.nextPsd);
  assert.equal(idempotentResult.changed, false);
  assert.deepEqual(idempotentResult.nextPsd, mergedResult.nextPsd);
});

test("markAccountUnavailable on 404 for Antigravity Argon model locks only the model and persists hasArgon: false + excludedModels in DB", async () => {
  clearAllModelLockouts();

  // Given: an active Antigravity connection with custom excludedModels
  const created = await createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "argon-404-test-acct",
    email: "argon404@example.com",
    accessToken: "fake-access-token",
    refreshToken: "fake-refresh-token",
    isActive: true,
    providerSpecificData: {
      plan: "Pro",
      hasArgon: true,
      excludedModels: ["claude-3-haiku*"],
    },
  });

  // When: markAccountUnavailable is called for a 404 on gemini-4-argon
  const result = await markAccountUnavailable(
    String(created.id),
    404,
    "Requested entity was not found.",
    "antigravity",
    "gemini-4-argon"
  );
  await new Promise((r) => setTimeout(r, 25));

  // Then: returns shouldFallback: true with model lockout cooldown and persists PSD exclusion
  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs > 0);
  assert.equal(isModelLocked("antigravity", String(created.id), "gemini-4-argon"), true);
  assert.equal(isModelLocked("antigravity", String(created.id), "gemini-3.8-flash"), false);

  const updated = await getProviderConnectionById(String(created.id));
  assert.ok(updated);
  assert.equal(updated.backoffLevel || 0, 0);
  assert.equal(updated.rateLimitedUntil ?? null, null);
  assert.equal(Number(updated.errorCode), 404);
  assert.equal(updated.lastErrorType, "not_found");

  const psd = (updated.providerSpecificData || {}) as Record<string, unknown>;
  assert.equal(psd.hasArgon, false);
  assert.equal(psd.plan, "Pro");
  assert.deepEqual(psd.excludedModels, ["claude-3-haiku*", "gemini-4*", "*argon*"]);
});


