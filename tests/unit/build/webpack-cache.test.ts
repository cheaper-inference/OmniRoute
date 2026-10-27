import { test } from "node:test";
import assert from "node:assert/strict";
import { configureWebpackBuildCache } from "../../../scripts/build/webpackCache.mjs";

test("production cache opt-out preserves caller configuration and activates only for exact zero", () => {
  for (const value of [undefined, "", "1", "false", "0"]) {
    for (const dev of [false, true]) {
      const cache = { type: "filesystem", maxMemoryGenerations: Infinity };
      const plugins: unknown[] = [];
      const config = { cache, plugins };
      const env = value === undefined ? {} : { OMNIROUTE_BUILD_WEBPACK_CACHE: value };
      const result = configureWebpackBuildCache(config, { dev }, env);
      assert.equal(result, config);
      assert.equal(result.plugins, plugins);
      assert.equal(result.cache, !dev && value === "0" ? false : cache);
    }
  }
});

test("unset cache override does not create a cache property or re-enable caller-disabled caching", () => {
  const empty = {};
  assert.equal(configureWebpackBuildCache(empty, { dev: false }, {}), empty);
  assert.equal(Object.hasOwn(empty, "cache"), false);
  const disabled = { cache: false };
  assert.equal(configureWebpackBuildCache(disabled, { dev: false }, {}).cache, false);
});
