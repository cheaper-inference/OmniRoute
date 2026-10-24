import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
test("macOS development loads TypeScript configuration without spawning the CLI", async () => {
  const previousNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  try {
    const { default: config } = await import("../../next.config.mjs");
    if (process.platform === "darwin") {
      assert.equal(config.experimental.useTypeScriptCli, false);
      assert.equal(config.experimental.workerThreads, true);
      const loadJsConfig = require("next/dist/build/load-jsconfig.js").default;
      const result = await loadJsConfig(process.cwd(), config);
      assert.deepEqual(result.jsConfig.compilerOptions.paths["@/*"], ["./src/*"]);
    } else {
      assert.equal(config.experimental.useTypeScriptCli, undefined);
      assert.equal(config.experimental.workerThreads, undefined);
    }
  } finally {
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousNodeEnv;
  }
});

test("worker thread workaround is limited to macOS development", async () => {
  const previousNodeEnv = process.env.NODE_ENV;
  const platform = Object.getOwnPropertyDescriptor(process, "platform");
  try {
    for (const [os, nodeEnv, expected] of [
      ["darwin", "development", true],
      ["darwin", "production", undefined],
      ["linux", "development", undefined],
    ]) {
      Object.defineProperty(process, "platform", { value: os, configurable: true });
      process.env.NODE_ENV = nodeEnv;
      const { default: config } = await import(`../../next.config.mjs?test=${os}-${nodeEnv}`);
      assert.equal(config.experimental.workerThreads, expected);
    }
  } finally {
    Object.defineProperty(process, "platform", platform);
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousNodeEnv;
  }
});
