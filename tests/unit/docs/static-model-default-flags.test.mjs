import assert from "node:assert/strict";
import test from "node:test";
import { projectChatModelCounts } from "../../../scripts/check/lib/staticChatModelMetadata.mjs";

const entry = "open-sse/config/providers/index.ts";
const catalog = "open-sse/config/providers/registry/gemini/web/index.ts";
const source = `
export const GEMINI_WEB_ARGON_ENV = "OMNIROUTE_GEMINI_WEB_ARGON_ENABLED";
export function isGeminiWebArgonEnabled(): boolean {
  const raw = typeof process === "undefined" ? undefined : process.env?.[GEMINI_WEB_ARGON_ENV];
  const value = raw?.trim().toLowerCase();
  return value === "1" || value === "true" || value === "yes";
}
export const provider = { id: "gemini-web", models: [
  { id: "regular" }, ...(isGeminiWebArgonEnabled() ? [{ id: "opt-in" }] : [])
] };
`;

function count(text = source, file = catalog) {
  const sources = {
    [entry]: `import { provider } from "./${file.slice("open-sse/config/providers/".length)}";
      export const REGISTRY = { gemini: provider };`,
    [file]: text,
  };
  return projectChatModelCounts((path) => sources[path]);
}

test("the documented default catalog excludes the reviewed opt-in Gemini model", () => {
  assert.deepEqual(count(), {
    chatNamespaces: 1,
    distinctProviderModelPairs: 1,
    uniqueRawModelIds: 1,
  });
});

test("comments and future ordinary model additions keep the default projection current", () => {
  const changed = source
    .replace("const raw =", "// The flag is disabled unless explicitly set.\n  const raw =")
    .replace('{ id: "regular" }', '{ id: "regular" }, { id: "new-regular" }');
  assert.equal(count(changed).uniqueRawModelIds, 2);
});

test("a changed opt-in implementation or shadowed runtime is rejected", () => {
  for (const changed of [
    source.replace('return value === "1"', 'return true || value === "1"'),
    source.replace('"OMNIROUTE_GEMINI_WEB_ARGON_ENABLED"', '"SOME_OTHER_FLAG"'),
    source.replace("const raw =", "sideEffect(); const raw ="),
    "const process = { env: {} };\n" + source,
  ]) {
    assert.throws(() => count(changed));
  }
});

test("the reviewed opt-in function does not authorize other modules or function names", () => {
  assert.throws(() => count(source, catalog.replace("gemini/web", "other")), /FACTORY_UNREVIEWED/);
  assert.throws(
    () => count(source.replaceAll("isGeminiWebArgonEnabled", "isUnreviewedFlagEnabled")),
    /FACTORY_UNREVIEWED/
  );
});
