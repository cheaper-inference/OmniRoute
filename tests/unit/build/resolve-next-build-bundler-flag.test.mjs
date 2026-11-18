import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getEffectiveBuildMemoryBytes,
  getLowMemoryBuildWarning,
  resolveNextBuildBundlerFlag,
} from "../../../scripts/build/build-next-isolated.mjs";

const GiB = 1024 ** 3;

test("memory detection takes the tighter physical or cgroup limit", () => {
  assert.equal(getEffectiveBuildMemoryBytes(64 * GiB, 8 * GiB), 8 * GiB);
  assert.equal(getEffectiveBuildMemoryBytes(8 * GiB, 64 * GiB), 8 * GiB);
  assert.equal(getEffectiveBuildMemoryBytes(32 * GiB, 0), 32 * GiB);
  assert.equal(getEffectiveBuildMemoryBytes(Number.NaN, 8 * GiB), 8 * GiB);
  assert.equal(getEffectiveBuildMemoryBytes(0, 0), null);
  assert.equal(getEffectiveBuildMemoryBytes(0, Number.MAX_SAFE_INTEGER + 1), null);
});

test("default build uses webpack through 16 GiB and Turbopack above it", () => {
  for (const memory of [0, Number.NaN, -1, null, 8 * GiB, 16 * GiB - 1, 16 * GiB]) {
    assert.equal(resolveNextBuildBundlerFlag({}, memory), "--webpack", String(memory));
  }
  assert.equal(resolveNextBuildBundlerFlag({}, 16 * GiB + 1), "--turbopack");
  assert.equal(resolveNextBuildBundlerFlag({}, 32 * GiB), "--turbopack");
});

test("operator override is authoritative regardless of available RAM", () => {
  for (const memory of [8 * GiB, 16 * GiB, 32 * GiB, null]) {
    assert.equal(
      resolveNextBuildBundlerFlag({ OMNIROUTE_USE_TURBOPACK: "0" }, memory),
      "--webpack"
    );
    assert.equal(
      resolveNextBuildBundlerFlag({ OMNIROUTE_USE_TURBOPACK: "1" }, memory),
      "--turbopack"
    );
    assert.equal(
      resolveNextBuildBundlerFlag({ OMNIROUTE_USE_TURBOPACK: "" }, memory),
      resolveNextBuildBundlerFlag({}, memory),
      "blank values inherit automatic RAM selection"
    );
    // Preserve the existing behavior for all explicitly set nonzero values.
    assert.equal(
      resolveNextBuildBundlerFlag({ OMNIROUTE_USE_TURBOPACK: "yes" }, memory),
      "--turbopack"
    );
  }
});

test("RAM advisory describes auto fallback, explicit risk and no message for large hosts", () => {
  assert.match(getLowMemoryBuildWarning({}, 16 * GiB), /selecting webpack automatically/);
  assert.match(getLowMemoryBuildWarning({}, 16 * GiB), /OMNIROUTE_USE_TURBOPACK=1/);
  assert.match(
    getLowMemoryBuildWarning({ OMNIROUTE_USE_TURBOPACK: "1" }, 8 * GiB),
    /Turbopack explicitly selected/
  );
  assert.match(getLowMemoryBuildWarning({}, null), /unknown/);
  assert.match(
    getLowMemoryBuildWarning({ OMNIROUTE_USE_TURBOPACK: "" }, 8 * GiB),
    /selecting webpack automatically/
  );
  assert.equal(getLowMemoryBuildWarning({ OMNIROUTE_USE_TURBOPACK: "0" }, 8 * GiB), null);
  assert.equal(getLowMemoryBuildWarning({}, 16 * GiB + 1), null);
});
