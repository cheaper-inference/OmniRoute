import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, mkdir, writeFile, readFile } from "node:fs/promises";
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
      return { id: "remote-job", status: "running", credits: 250, charged_credits: 250 };
    }
    if (args[1] === "status")
      return {
        id: "remote-job",
        status: "succeeded",
        asset: { id: "asset" },
        credits: 250,
        charged_credits: 250,
      };
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

test("separate route modules respect an active job owner's process lease", async () => {
  const dir = await mkdtemp(join(tmpdir(), "rosebud-routes-"));
  const previous = process.env.ROSEBUD_DATA_DIR;
  process.env.ROSEBUD_DATA_DIR = dir;
  let release!: () => void, started!: () => void;
  const waiting = new Promise<void>((resolve) => {
    release = resolve;
  });
  const entered = new Promise<void>((resolve) => {
    started = resolve;
  });
  let submissions = 0;
  const first = new RosebudRuntime(async (_profile, args) => {
    if (args[1] === "models") return { models: [model] };
    if (args[1] === "quote") {
      started();
      await waiting;
      return { credits: 250 };
    }
    submissions++;
    return { id: "first", status: "running" };
  });
  let pending: Promise<unknown> | undefined;
  try {
    const request = { model: model.id, input: { prompt: "x" }, idempotencyKey: "shared" };
    pending = first.generate("one", request);
    await entered;
    const { createHash } = await import("node:crypto");
    const id = createHash("sha256")
      .update(JSON.stringify(["one", "shared"]))
      .digest("hex");
    // Exercise the pre-save crash window while the original owner remains alive.
    await rm(join(dir, "jobs", id, "job.json"));
    const other = (await import(
      new URL("../../open-sse/services/rosebud/runtime.ts?separate-route", import.meta.url).href
    )) as typeof import("../../open-sse/services/rosebud/runtime.ts");
    const second = new other.RosebudRuntime(async (_profile, args) => {
      if (args[1] === "models") return { models: [model] };
      if (args[1] === "quote") return { credits: 250 };
      submissions++;
      return { id: "second", status: "running" };
    });
    await assert.rejects(second.generate("one", request), /job_busy/);
    release();
    await pending;
    assert.equal(submissions, 1);
  } finally {
    release();
    await pending?.catch(() => {});
    if (previous === undefined) delete process.env.ROSEBUD_DATA_DIR;
    else process.env.ROSEBUD_DATA_DIR = previous;
    await rm(dir, { recursive: true, force: true });
  }
});

test("concurrent artifact readers never observe a partially downloaded file", async () => {
  const dir = await mkdtemp(join(tmpdir(), "rosebud-artifact-"));
  const previous = process.env.ROSEBUD_DATA_DIR;
  process.env.ROSEBUD_DATA_DIR = dir;
  let release!: () => void, started!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const entered = new Promise<void>((resolve) => {
    started = resolve;
  });
  const png = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 1, 2, 3, 4]);
  const id = "a".repeat(64);
  await mkdir(join(dir, "jobs", id), { recursive: true });
  await writeFile(
    join(dir, "jobs", id, "job.json"),
    JSON.stringify({
      id,
      profile: "one",
      model: "test-image",
      category: "image",
      status: "succeeded",
      assetId: "asset",
      upstreamId: "remote",
      input: {},
      fingerprint: "x",
      updatedAt: new Date().toISOString(),
    })
  );
  const runtime = new RosebudRuntime(async (_profile, args) => {
    if (args[1] === "status")
      return { id: "remote", status: "succeeded", asset: { id: "asset" }, charged_credits: 250 };
    assert.equal(args[1], "download");
    const out = args.at(-1)!;
    await writeFile(out, png.subarray(0, 4));
    started();
    await gate;
    await writeFile(out, png);
    return {};
  });
  try {
    const first = runtime.artifact("one", id);
    await entered;
    const second = runtime.artifact("one", id);
    await new Promise((resolve) => setTimeout(resolve, 20));
    release();
    const results = await Promise.all([first, second]);
    assert.ok(results.every((result) => result.data.equals(png)));
    assert.ok((await readFile(join(dir, "jobs", id, "artifact"))).equals(png));
  } finally {
    release();
    if (previous === undefined) delete process.env.ROSEBUD_DATA_DIR;
    else process.env.ROSEBUD_DATA_DIR = previous;
    await rm(dir, { recursive: true, force: true });
  }
});

test("provider failure and late refunds use actual charges rather than reserved credits", async () => {
  const dir = await mkdtemp(join(tmpdir(), "rosebud-refund-test-"));
  const previous = process.env.ROSEBUD_DATA_DIR;
  process.env.ROSEBUD_DATA_DIR = dir;
  let submissions = 0;
  let refunded = false;
  const runtime = new RosebudRuntime(async (_profile, args) => {
    if (args[1] === "models") return { models: [model] };
    if (args[1] === "quote") return { credits: 250 };
    if (args[1] === "create") {
      submissions++;
      return {
        id: "upstream",
        status: "failed",
        credits: 250,
        charged_credits: 250,
        refunded_credits: 0,
        error: { code: "provider_failed" },
      };
    }
    assert.equal(args[1], "status");
    return {
      id: "upstream",
      status: "failed",
      credits: 250,
      charged_credits: refunded ? 0 : 250,
      refunded_credits: refunded ? 250 : 0,
      error: { code: "provider_failed" },
    };
  });
  try {
    const request = { model: "test-image", input: { prompt: "test" }, idempotencyKey: "refund" };
    const first = await runtime.generate("account", request);
    assert.equal(first.actualCredits, 250);
    assert.equal(first.error, "provider_failed");
    refunded = true;
    const reconciled = await runtime.generate("account", request);
    assert.equal(reconciled.status, "failed");
    assert.equal(reconciled.actualCredits, 0);
    assert.equal(reconciled.refundedCredits, 250);
    assert.equal(submissions, 1);
  } finally {
    if (previous === undefined) delete process.env.ROSEBUD_DATA_DIR;
    else process.env.ROSEBUD_DATA_DIR = previous;
    await rm(dir, { recursive: true, force: true });
  }
});
