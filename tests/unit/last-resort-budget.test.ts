import test from "node:test";
import assert from "node:assert/strict";
import { resolveLastResortMessageBudget } from "../../open-sse/handlers/chatCore/lastResortBudget.ts";

const oldToolsOnlyTarget = (ceiling: number, tools: number) => Math.max(1, ceiling - tools - 1);

test("matches ceiling minus tools when the gate is only messages and tools", () => {
  const budget = resolveLastResortMessageBudget({
    ceiling: 872_000,
    calibratedTokens: 920_000,
    messages: 900_000,
    tools: 20_000,
    system: 0,
    instructions: 0,
    total: 920_000,
  });
  assert.equal(budget, oldToolsOnlyTarget(872_000, 20_000));
});

test("shrinks messages when system tokens overflow a request the tools-only target would keep", () => {
  const ceiling = 4000;
  const tools = 200;
  const input = {
    ceiling,
    calibratedTokens: 4200,
    messages: 3500,
    tools,
    system: 500,
    instructions: 0,
    total: 4200,
  };
  const budget = resolveLastResortMessageBudget(input);
  assert.ok(budget != null);
  assert.ok(budget < input.messages);
  assert.ok(budget < oldToolsOnlyTarget(ceiling, tools));
  assert.equal(budget, ceiling - tools - input.system - 1);
});

test("follows this request's calibration factor instead of a fixed window", () => {
  const ceiling = 872_000;
  const total = 850_000;
  const calibratedTokens = 900_000;
  const budget = resolveLastResortMessageBudget({
    ceiling,
    calibratedTokens,
    messages: total,
    tools: 0,
    system: 0,
    instructions: 0,
    total,
  });
  const factor = calibratedTokens / total;
  assert.equal(budget, Math.floor(ceiling / factor) - 1);
  assert.ok(budget != null && budget < ceiling && budget < total);
  assert.notEqual(budget, 760_000);
  assert.notEqual(budget, 640_000);
});

test("a larger ceiling yields a larger budget for the same request", () => {
  const request = {
    calibratedTokens: 5000,
    messages: 5000,
    tools: 0,
    system: 0,
    instructions: 0,
    total: 5000,
  };
  const small = resolveLastResortMessageBudget({ ...request, ceiling: 4000 });
  const large = resolveLastResortMessageBudget({ ...request, ceiling: 4800 });
  assert.equal(small, 3999);
  assert.equal(large, 4799);
  assert.ok(small != null && large != null && large > small);
});

test("returns null when non-message tokens already fill the ceiling", () => {
  assert.equal(
    resolveLastResortMessageBudget({
      ceiling: 4000,
      calibratedTokens: 4100,
      messages: 100,
      tools: 4000,
      system: 0,
      instructions: 0,
      total: 4100,
    }),
    null
  );
});
