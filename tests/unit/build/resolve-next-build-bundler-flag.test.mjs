import { test } from "node:test";
import assert from "node:assert/strict";

import { resolveNextBuildBundlerFlag } from "../../../scripts/build/build-next-isolated.mjs";

test("resolveNextBuildBundlerFlag returns --turbopack by default", () => {
  const flag = resolveNextBuildBundlerFlag({});
  assert.equal(flag, "--turbopack");
});

test("resolveNextBuildBundlerFlag returns --webpack when OMNIROUTE_USE_TURBOPACK is '0'", () => {
  const flag = resolveNextBuildBundlerFlag({ OMNIROUTE_USE_TURBOPACK: "0" });
  assert.equal(flag, "--webpack");
});

test("resolveNextBuildBundlerFlag returns --turbopack when OMNIROUTE_USE_TURBOPACK is '1'", () => {
  const flag = resolveNextBuildBundlerFlag({ OMNIROUTE_USE_TURBOPACK: "1" });
  assert.equal(flag, "--turbopack");
});

test("low-memory advisory only applies to default Turbopack on hosts with at most 16 GiB", async () => {
  const { getLowMemoryBuildWarning } = await import("../../../scripts/build/build-next-isolated.mjs");
  const gib = 1024 ** 3;
  assert.match(getLowMemoryBuildWarning({}, 16 * gib), /OMNIROUTE_USE_TURBOPACK=0/);
  assert.match(getLowMemoryBuildWarning({ OMNIROUTE_USE_TURBOPACK: "1" }, 8 * gib), /16|8\.0/);
  assert.equal(getLowMemoryBuildWarning({ OMNIROUTE_USE_TURBOPACK: "0" }, 8 * gib), null);
  assert.equal(getLowMemoryBuildWarning({}, 16 * gib + 1), null);
  assert.equal(getLowMemoryBuildWarning({}, Number.NaN), null);
  assert.equal(getLowMemoryBuildWarning({}, 0), null);
});
