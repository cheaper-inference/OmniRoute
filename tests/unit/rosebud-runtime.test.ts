import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { RosebudRuntime } from "../../open-sse/services/rosebud/runtime.ts";
import { RosebudError, type RosebudRunner } from "../../open-sse/services/rosebud/cli.ts";
import {
  rosebudModel,
  validateRosebudInput,
  rosebudCatalogEntry,
} from "../../open-sse/services/rosebud/catalog.ts";

const model = rosebudModel.parse({
  id: "test-image",
  name: "Test",
  category: "image",
  inputs: [
    { name: "prompt", type: "string", required: true, max_length: 50 },
    { name: "seed", type: "integer", minimum: 0 },
    { name: "asset_type", type: "enum", values: ["sprite", "any"] },
  ],
  output_formats: ["png"],
  price: { credits: 250 },
});
test("validates provider inputs without interpreting prompt text as shell code", () => {
  const prompt = '$(whoami); `id` "quoted"';
  assert.equal(validateRosebudInput(model, { prompt }).prompt, prompt);
  assert.throws(() => validateRosebudInput(model, { prompt: "x", secret: true }));
  assert.throws(() => validateRosebudInput(model, { prompt: "x", seed: -1 }));
  assert.throws(() => validateRosebudInput(model, { prompt: "x", asset_type: "video" }));
});
test("catalog preserves native prices and never invents chat or USD prices", () => {
  assert.deepEqual(rosebudCatalogEntry(model).supportedEndpoints, ["images"]);
  assert.equal(rosebudCatalogEntry(model).rosebud.usdCost, null);
  assert.deepEqual(
    rosebudCatalogEntry(rosebudModel.parse({ ...model, category: "model_3d" })).supportedEndpoints,
    []
  );
});
test("durable jobs reuse a paid submission, bind account, and reject changed input", async () => {
  const dir = await mkdtemp(join(tmpdir(), "rosebud-test-"));
  const previous = process.env.ROSEBUD_DATA_DIR;
  process.env.ROSEBUD_DATA_DIR = dir;
  let submissions = 0;
  const calls: string[][] = [];
  const runner: RosebudRunner = async (_profile, args) => {
    calls.push(args);
    if (args[1] === "models") return { models: [model] };
    if (args[1] === "quote") return { credits: 250 };
    if (args[1] === "create") {
      submissions++;
      return { id: "remote-job", status: "running", credits: 250 };
    }
    if (args[1] === "status")
      return { id: "remote-job", status: "succeeded", asset: { id: "asset" }, credits: 250 };
    return {};
  };
  try {
    const runtime = new RosebudRuntime(runner);
    const request = { model: "test-image", input: { prompt: "sprite" }, idempotencyKey: "one" };
    const first = await runtime.generate("account-a", request);
    const resumed = await new RosebudRuntime(runner).generate("account-a", request);
    assert.equal(first.id, resumed.id);
    assert.equal(resumed.status, "succeeded");
    assert.equal(submissions, 1);
    assert.equal(
      calls.some((args) => args.includes("--max-credits")),
      false
    );
    await assert.rejects(runtime.read("account-b", first.id), /job_not_found/);
    await assert.rejects(
      runtime.generate("account-a", { ...request, input: { prompt: "different" } }),
      /idempotency_conflict/
    );
    await assert.rejects(
      runtime.generate("account-a", { ...request, category: "music" }),
      /unsupported_modality/
    );
  } finally {
    if (previous === undefined) delete process.env.ROSEBUD_DATA_DIR;
    else process.env.ROSEBUD_DATA_DIR = previous;
    await rm(dir, { recursive: true, force: true });
  }
});
test("insufficient credits is not automatically retried", async () => {
  const dir = await mkdtemp(join(tmpdir(), "rosebud-credit-test-"));
  const previous = process.env.ROSEBUD_DATA_DIR;
  process.env.ROSEBUD_DATA_DIR = dir;
  let submissions = 0;
  const runtime = new RosebudRuntime(async (_profile, args) => {
    if (args[1] === "models") return { models: [model] };
    if (args[1] === "quote") return { credits: 250 };
    submissions++;
    throw new RosebudError("insufficient_credits", 402);
  });
  try {
    await assert.rejects(
      runtime.generate("account-a", {
        model: model.id,
        input: { prompt: "x" },
        idempotencyKey: "no-money",
      }),
      /insufficient_credits/
    );
    assert.equal(submissions, 1);
  } finally {
    if (previous === undefined) delete process.env.ROSEBUD_DATA_DIR;
    else process.env.ROSEBUD_DATA_DIR = previous;
    await rm(dir, { recursive: true, force: true });
  }
});

test("lost acknowledgement without the CLI's durable key never regenerates", async () => {
  const dir = await mkdtemp(join(tmpdir(), "rosebud-unknown-test-"));
  const previous = process.env.ROSEBUD_DATA_DIR;
  process.env.ROSEBUD_DATA_DIR = dir;
  let submissions = 0;
  const runtime = new RosebudRuntime(async (_profile, args) => {
    if (args[1] === "models") return { models: [model] };
    if (args[1] === "quote") return { credits: 250 };
    submissions++;
    throw new RosebudError("interrupted", 502, true);
  });
  try {
    const request = { model: model.id, input: { prompt: "x" }, idempotencyKey: "lost" };
    await assert.rejects(runtime.generate("account-a", request), /interrupted/);
    const saved = await runtime.generate("account-a", request);
    assert.equal(saved.status, "uncertain");
    await assert.rejects(runtime.recover("account-a", saved.id), /manual_reconciliation_required/);
    assert.equal(submissions, 1);
  } finally {
    if (previous === undefined) delete process.env.ROSEBUD_DATA_DIR;
    else process.env.ROSEBUD_DATA_DIR = previous;
    await rm(dir, { recursive: true, force: true });
  }
});

test("concurrent identical requests never submit two paid jobs", async () => {
  const dir = await mkdtemp(join(tmpdir(), "rosebud-concurrent-"));
  const previous = process.env.ROSEBUD_DATA_DIR;
  process.env.ROSEBUD_DATA_DIR = dir;
  let submissions = 0;
  const runtime = new RosebudRuntime(async (_profile, args) => {
    if (args[1] === "models") return { models: [model] };
    if (args[1] === "quote") return { credits: 250 };
    if (args[1] === "create") {
      submissions++;
      return { id: "remote", status: "running" };
    }
    return { id: "remote", status: "succeeded" };
  });
  try {
    const request = { model: model.id, input: { prompt: "x" }, idempotencyKey: "same" };
    const results = await Promise.allSettled([
      runtime.generate("a", request),
      runtime.generate("a", request),
    ]);
    assert.ok(results.some((result) => result.status === "fulfilled"));
    assert.equal(submissions, 1);
  } finally {
    if (previous === undefined) delete process.env.ROSEBUD_DATA_DIR;
    else process.env.ROSEBUD_DATA_DIR = previous;
    await rm(dir, { recursive: true, force: true });
  }
});
