import test from "node:test";
import assert from "node:assert/strict";

// #18184: Turbopack remains the fast default for machines with >16 GiB RAM.
// A 16 GiB production build was observed to OOM; the webpack path succeeds.
// Explicit build-env choices still override automatic low-memory selection.
const buildIsolated = await import("../../scripts/build/build-next-isolated.mjs");
const GiB = 1024 ** 3;

test("default bundler is Turbopack when the effective RAM limit exceeds 16 GiB", () => {
  assert.equal(buildIsolated.resolveNextBuildBundlerFlag({}, 16 * GiB + 1), "--turbopack");
  assert.equal(buildIsolated.resolveNextBuildBundlerFlag({}, 32 * GiB), "--turbopack");
});

test("default bundler is webpack at exactly 16 GiB and below", () => {
  assert.equal(buildIsolated.resolveNextBuildBundlerFlag({}, 16 * GiB), "--webpack");
  assert.equal(buildIsolated.resolveNextBuildBundlerFlag({}, 12 * GiB), "--webpack");
});

test("explicit Turbopack opt-in remains honored at 16 GiB", () => {
  assert.equal(
    buildIsolated.resolveNextBuildBundlerFlag({ OMNIROUTE_USE_TURBOPACK: "1" }, 16 * GiB),
    "--turbopack"
  );
});

test("explicit webpack override remains honored on large hosts", () => {
  assert.equal(
    buildIsolated.resolveNextBuildBundlerFlag({ OMNIROUTE_USE_TURBOPACK: "0" }, 64 * GiB),
    "--webpack"
  );
});

test("legacy nonzero env values preserve their prior explicit Turbopack behavior", () => {
  assert.equal(
    buildIsolated.resolveNextBuildBundlerFlag({ OMNIROUTE_USE_TURBOPACK: "yes" }, 8 * GiB),
    "--turbopack"
  );
});

test("empty Turbopack override acts as unset for RAM-constrained Compose builds", () => {
  assert.equal(
    buildIsolated.resolveNextBuildBundlerFlag({ OMNIROUTE_USE_TURBOPACK: "" }, 8 * GiB),
    "--webpack"
  );
  assert.equal(
    buildIsolated.resolveNextBuildBundlerFlag({ OMNIROUTE_USE_TURBOPACK: "" }, 32 * GiB),
    "--turbopack"
  );
});

test("explicit nonempty nonzero strings keep prior Turbopack semantics", () => {
  for (const value of ["false", "yes"]) {
    assert.equal(
      buildIsolated.resolveNextBuildBundlerFlag({ OMNIROUTE_USE_TURBOPACK: value }, 8 * GiB),
      "--turbopack"
    );
  }
});
