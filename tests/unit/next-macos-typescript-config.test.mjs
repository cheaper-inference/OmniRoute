import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";

import { macosDevExperimentalOverrides } from "../../scripts/build/macosDevWorkaround.mjs";

// The darwin/development predicate is tested as a pure helper instead of importing the whole
// next.config.mjs: with NODE_ENV=development that import starts the fumadocs-mdx dev watcher,
// which keeps the event loop alive and hangs a plain `node --test` run (#17955).

const require = createRequire(import.meta.url);

test("macOS development disables the TypeScript CLI and enables worker threads", () => {
  assert.deepEqual(macosDevExperimentalOverrides({ platform: "darwin", nodeEnv: "development" }), {
    useTypeScriptCli: false,
    workerThreads: true,
  });
});

test("worker thread workaround is limited to macOS development", () => {
  for (const [platform, nodeEnv] of [
    ["darwin", "production"],
    ["darwin", "test"],
    ["darwin", undefined],
    ["linux", "development"],
    ["win32", "development"],
    ["linux", "production"],
  ]) {
    assert.deepEqual(
      macosDevExperimentalOverrides({ platform, nodeEnv }),
      {},
      `${platform}/${nodeEnv} must keep the Next defaults`
    );
  }
});

test("defaults read the current process platform and NODE_ENV", () => {
  const expected =
    process.platform === "darwin" && process.env.NODE_ENV === "development"
      ? { useTypeScriptCli: false, workerThreads: true }
      : {};
  assert.deepEqual(macosDevExperimentalOverrides(), expected);
});

test("in-process TypeScript config loading still resolves the @/* path alias", async () => {
  const experimental = macosDevExperimentalOverrides({
    platform: "darwin",
    nodeEnv: "development",
  });
  const loadJsConfig = require("next/dist/build/load-jsconfig.js").default;
  const result = await loadJsConfig(process.cwd(), { experimental, typescript: {} });
  assert.deepEqual(result.jsConfig.compilerOptions.paths["@/*"], ["./src/*"]);
});

test("next.config.mjs spreads the macOS dev overrides into experimental", () => {
  const source = readFileSync(new URL("../../next.config.mjs", import.meta.url), "utf8");
  assert.match(
    source,
    /import \{ macosDevExperimentalOverrides \} from "\.\/scripts\/build\/macosDevWorkaround\.mjs";/
  );
  assert.match(
    source,
    /experimental: \{\s*(?:\/\/[^\n]*\n\s*)*\.\.\.macosDevExperimentalOverrides\(\),/
  );
});
