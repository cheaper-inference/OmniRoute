import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import {
  rosebudImageBinding,
  scopedRosebudKey,
  matchesRosebudPin,
} from "../../open-sse/services/rosebud/imageBinding.ts";
import { RosebudRuntime } from "../../open-sse/services/rosebud/runtime.ts";
import { RosebudError } from "../../open-sse/services/rosebud/cli.ts";
import { rosebudPublish } from "../../open-sse/services/rosebud/publishing.ts";

async function isolated(run: (root: string) => Promise<void>) {
  const root = await mkdtemp(join(tmpdir(), "rosebud-review-"));
  const before = process.env.ROSEBUD_DATA_DIR;
  process.env.ROSEBUD_DATA_DIR = root;
  try {
    await run(root);
  } finally {
    if (before === undefined) delete process.env.ROSEBUD_DATA_DIR;
    else process.env.ROSEBUD_DATA_DIR = before;
    await rm(root, { recursive: true, force: true });
  }
}
const model = {
  id: "test",
  name: "Test",
  category: "image",
  inputs: [{ name: "prompt", type: "string", required: true }],
  output_formats: ["png"],
};

test("image idempotency stays pinned across account selection and process restarts", async () =>
  isolated(async () => {
    const body = { model: "rosebud/test", prompt: "hello" };
    const bound = await Promise.all([
      rosebudImageBinding("key-a", "retry", body, null, "account-a"),
      rosebudImageBinding("key-a", "retry", body, null, "account-b"),
    ]);
    assert.equal(bound[0], bound[1]);
    assert.equal(
      await rosebudImageBinding("key-a", "retry", { prompt: "hello", model: "rosebud/test" }, null),
      bound[0]
    );
    await assert.rejects(
      rosebudImageBinding("key-a", "retry", body, ["other"]),
      /connection_not_allowed/
    );
    await assert.rejects(
      rosebudImageBinding("key-a", "retry", { ...body, prompt: "changed" }, null),
      /idempotency_conflict/
    );
    assert.equal(await rosebudImageBinding("different-caller", "retry", body, null), undefined);
  }));

test("unpaid transient failures can retry the same key; unknown catalog entries do not disable supported models", async () =>
  isolated(async () => {
    let quotes = 0,
      submissions = 0;
    const runtime = new RosebudRuntime(async (_profile, args) => {
      if (args[1] === "models")
        return { models: [model, { ...model, id: "future", category: "future-modality" }] };
      if (args[1] === "quote") {
        if (++quotes === 1) throw new RosebudError("throttled", 429);
        return { credits: 5 };
      }
      if (args[1] === "create") {
        submissions++;
        return { id: "paid", status: "succeeded", credits: 5 };
      }
      return {};
    });
    assert.equal((await runtime.models("a")).length, 1);
    const request = { model: "test", input: { prompt: "hello" }, idempotencyKey: "retry" };
    await assert.rejects(runtime.generate("a", request), /throttled/);
    assert.equal((await runtime.generate("a", request)).upstreamId, "paid");
    assert.equal(submissions, 1);
  }));

test("a second key cannot adopt an uncertain paid request with identical input", async () =>
  isolated(async () => {
    let submits = 0;
    const runtime = new RosebudRuntime(async (_profile, args) => {
      if (args[1] === "models") return { models: [model] };
      if (args[1] === "quote") return { credits: 5 };
      if (args[1] === "create") {
        submits++;
        throw new RosebudError("interrupted", 502, true);
      }
      return {};
    });
    const request = { model: "test", input: { prompt: "hello" }, idempotencyKey: "first" };
    await assert.rejects(runtime.generate("a", request), /interrupted/);
    await assert.rejects(
      runtime.generate("a", { ...request, idempotencyKey: "second" }),
      /matching_request_requires_reconciliation/
    );
    assert.equal(submits, 1);
  }));

test("profile traversal is refused before download or publishing writes; status remains available during reconciliation", async () =>
  isolated(async (root) => {
    const runtime = new RosebudRuntime(async () => ({}));
    await assert.rejects(runtime.downloadAsset("../outside", randomUUID()), /invalid_profile/);
    await assert.rejects(
      rosebudPublish("../outside", "publish", { gameId: randomUUID() }),
      /invalid_profile/
    );
    const gameId = randomUUID();
    const folder = join(root, "games", "primary", gameId);
    await mkdir(folder, { recursive: true });
    await writeFile(join(folder, "operation.lock"), "uncertain");
    const result = await rosebudPublish(
      "primary",
      "game_status",
      { gameId },
      async (_profile, args) => {
        assert.equal(args[0], "status");
        return { status: "active" };
      }
    );
    assert.equal(result.status, "active");
  }));

test("Rosebud requires authenticated management access even in open mode and respects connection allowlists", async () => {
  const previousSecret = process.env.API_KEY_SECRET;
  process.env.API_KEY_SECRET = "test-only-rosebud-api-key-secret";
  const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
  const { requireRosebudAccess } = await import("../../src/lib/rosebud/authorization.ts");
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  try {
    assert.equal(
      (await requireRosebudAccess(new Request("http://localhost/api/rosebud/account"), "a"))
        ?.status,
      401
    );
    const key = await createApiKey("rosebud-restricted", "test-machine", ["manage"], {
      allowedConnections: ["a"],
    });
    const request = new Request("http://localhost/api/rosebud/account", {
      headers: { Authorization: "Bearer " + key.key },
    });
    assert.equal(await requireRosebudAccess(request, "a"), null);
    assert.equal((await requireRosebudAccess(request, "b"))?.status, 403);
    assert.equal((await requireRosebudAccess(request))?.status, 403);
  } finally {
    resetDbInstance();
    if (previousSecret === undefined) delete process.env.API_KEY_SECRET;
    else process.env.API_KEY_SECRET = previousSecret;
  }
});

test("cancellation while quoting does not start a paid request", async () =>
  isolated(async () => {
    const controller = new AbortController();
    let submissions = 0;
    const runtime = new RosebudRuntime(async (_profile, args) => {
      if (args[1] === "models") return { models: [model] };
      if (args[1] === "quote") {
        controller.abort();
        return { credits: 5 };
      }
      if (args[1] === "create") submissions++;
      return {};
    });
    await assert.rejects(
      runtime.generate(
        "a",
        { model: "test", input: { prompt: "hello" }, idempotencyKey: "cancel" },
        controller.signal
      ),
      /request_cancelled/
    );
    assert.equal(submissions, 0);
  }));

test("model discovery preserves other accounts and operator-added models", async (context) => {
  const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
  const { discoverRosebud, rosebudModelConnections } =
    await import("../../src/lib/rosebud/provider.ts");
  const { rosebudRuntime } = await import("../../open-sse/services/rosebud/runtime.ts");
  const { rosebudModel } = await import("../../open-sse/services/rosebud/catalog.ts");
  const { addCustomModel, getCustomModels } = await import("../../src/lib/db/models.ts");
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  try {
    const a = await createProviderConnection({
      provider: "rosebud",
      isActive: true,
      authType: "none",
      providerSpecificData: { rosebudProfile: "model-a" },
    });
    const b = await createProviderConnection({
      provider: "rosebud",
      isActive: true,
      authType: "none",
      providerSpecificData: { rosebudProfile: "model-b" },
    });
    assert.ok(a && b);
    context.mock.method(rosebudRuntime, "models", async (profile: string) => [
      rosebudModel.parse({ ...model, id: profile }),
    ]);
    await addCustomModel("rosebud", "operator-model", "Manual", "manual", "images-generations", [
      "images",
    ]);
    await discoverRosebud(a.id);
    await discoverRosebud(b.id);
    assert.deepEqual(await rosebudModelConnections("model-a", null), [a.id]);
    assert.deepEqual(await rosebudModelConnections("model-a", [b.id]), []);

    assert.deepEqual((await getCustomModels("rosebud")).map((entry) => entry.id).sort(), [
      "model-a",
      "model-b",
      "operator-model",
    ]);
  } finally {
    resetDbInstance();
  }
});

test("generation keys are isolated between callers and consistent across HTTP and tools", () => {
  assert.notEqual(scopedRosebudKey("client-a", "1"), scopedRosebudKey("client-b", "1"));
  assert.equal(scopedRosebudKey("client-a", "1"), scopedRosebudKey("client-a", "1"));
});

test("declared audio and video container signatures remain retrievable", async () => {
  const { rosebudArtifactType } = await import("../../open-sse/services/rosebud/artifact.ts");
  assert.equal(rosebudArtifactType(Buffer.from("fLaC0000"), "music"), "audio/flac");
  assert.equal(rosebudArtifactType(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]), "video"), "video/webm");
  const m4a = Buffer.alloc(16);
  m4a.write("ftyp", 4);
  m4a.write("M4A ", 8);
  assert.equal(rosebudArtifactType(m4a, "speech"), "audio/mp4");
  assert.throws(() => rosebudArtifactType(m4a, "image"), /invalid_artifact_format/);
});

test("unsupported output formats are rejected before a paid submission", async () =>
  isolated(async () => {
    let submissions = 0;
    const runtime = new RosebudRuntime(async (_profile, args) => {
      if (args[1] === "models")
        return { models: [{ ...model, output_formats: ["unknown-format"] }] };
      submissions++;
      return {};
    });
    await assert.rejects(
      runtime.generate("a", { model: "test", input: { prompt: "x" } }),
      /unsupported_output_format/
    );
    assert.equal(submissions, 0);
  }));

test("soft-dropping a pinned account must not authorize a second paid account", () => {
  assert.equal(matchesRosebudPin("account-a", "account-b"), false);
  assert.equal(matchesRosebudPin("account-a", undefined), false);
  assert.equal(matchesRosebudPin("account-a", "account-a"), true);
});
