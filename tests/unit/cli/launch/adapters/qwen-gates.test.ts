// Qwen Code gates: context floor and the dotted-version gate (min and recommended).

import assert from "node:assert/strict";
import test from "node:test";

import {
  applyQwenVersionGate,
  assertMinContext,
  warnUnknownContext,
} from "../../../../../bin/cli/launch/adapters/_shared/qwen-gates.mjs";

type Err = { code?: string; message?: string; hint?: string };

test("assertMinContext throws ModelUnsuitable below a known floor", () => {
  assert.throws(
    () => assertMinContext({ id: "a/small", contextTokens: 8000 }, 32000),
    (err: Err) =>
      err.code === "ModelUnsuitable" &&
      err.message === "a/small has a 8000 token window; Qwen Code needs at least 32000." &&
      err.hint === "Pick a model with a larger context window."
  );
});

test("assertMinContext passes at the floor, without a floor, model or known window", () => {
  assert.equal(assertMinContext({ id: "a/ok", contextTokens: 32000 }, 32000), undefined);
  assert.equal(assertMinContext({ id: "a/small", contextTokens: 8000 }, undefined), undefined);
  assert.equal(assertMinContext(null, 32000), undefined);
  assert.equal(assertMinContext({ id: "a/unknown", contextTokens: null }, 32000), undefined);
  assert.equal(assertMinContext({ id: "a/zero", contextTokens: 0 }, 32000), undefined);
});

test("applyQwenVersionGate throws ToolVersionTooOld below min", () => {
  const warnings: string[] = [];
  assert.throws(
    () => applyQwenVersionGate("0.9.1-beta", { min: "0.10.0", recommended: "0.27.0" }, warnings),
    (err: Err) =>
      err.code === "ToolVersionTooOld" &&
      err.message === "Qwen Code 0.9.1-beta is older than the required 0.10.0." &&
      err.hint === "Upgrade with: npm install -g @qwen-code/qwen-code@latest"
  );
  assert.deepEqual(warnings, []);
});

test("applyQwenVersionGate warns between min and recommended, ignoring prerelease tags", () => {
  const warnings: string[] = [];
  applyQwenVersionGate("0.26.9-nightly", { min: "0.10.0", recommended: "0.27.0" }, warnings);
  assert.deepEqual(warnings, [
    "Qwen Code 0.26.9-nightly is older than the recommended 0.27.0; upgrade with: npm install -g @qwen-code/qwen-code@latest",
  ]);
});

test("applyQwenVersionGate is silent at or above recommended and without a version", () => {
  const warnings: string[] = [];
  applyQwenVersionGate("0.27.0-rc.1", { recommended: "0.27.0" }, warnings);
  applyQwenVersionGate("1.0", { min: "0.10.0", recommended: "0.27.0" }, warnings);
  applyQwenVersionGate(null, { min: "9.0.0" }, warnings);
  applyQwenVersionGate("", { min: "9.0.0" }, warnings);
  applyQwenVersionGate("0.1.0", {}, warnings);
  assert.deepEqual(warnings, []);
});

test("warnUnknownContext warns only for a chosen model without a known window", () => {
  const warnings: string[] = [];
  warnUnknownContext({ id: "a/known", contextTokens: 128000 }, warnings);
  warnUnknownContext(null, warnings);
  warnUnknownContext({ id: "a/unknown" }, warnings);
  assert.deepEqual(warnings, [
    "a/unknown has no known context window; Qwen Code assumes its default (200000 tokens).",
  ]);
});
