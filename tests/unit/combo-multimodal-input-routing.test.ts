import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omni-multimodal-routing-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const { filterTargetsByRequestCompatibility } = await import("../../open-sse/services/combo.ts");
const { computeCompatRejectedTargets, deriveRequestCompatibilityRequirements } =
  await import("../../open-sse/services/combo/comboStructure.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { detectMediaParts } = await import("../../open-sse/utils/mediaParts.ts");
const { normalizeDiscoveredModels } =
  await import("../../src/lib/providerModels/modelDiscovery.ts");
const { CloudflarePlaygroundExecutor } =
  await import("../../open-sse/executors/cloudflare-playground.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const { buildTargetTimeoutRunner } =
  await import("../../open-sse/services/combo/targetTimeoutRunner.ts");
const { tryPinnedModelDispatch } = await import("../../open-sse/services/combo/dispatchPrelude.ts");
const { resolveComboSetupConfig } = await import("../../open-sse/services/comboConfig.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { resolveAutoStrategyOrder } =
  await import("../../open-sse/services/combo/resolveAutoStrategy.ts");
const { DEFAULT_RESILIENCE_SETTINGS } = await import("../../src/lib/resilience/settings.ts");
test.after(() => {
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
const log = { info() {}, warn() {}, error() {}, debug() {} };
const target = (modelStr: string) => ({
  kind: "model" as const,
  stepId: modelStr,
  executionKey: modelStr,
  modelStr,
  provider: modelStr.split("/")[0],
  providerId: modelStr.split("/")[0],
  connectionId: null,
  weight: 1,
  label: null,
});
const blind = target("cfp/moonshotai/kimi-k2.7-code");
const capable = target("cinf/gemini-4-argon");
test("PDF/video require proven CI transports despite advertisements, including fail-open", () => {
  const advertised = target("cheaperinference/gpt-4o-mini");
  const oldVideo = target("cheaperinference/gemini-2.5-flash");
  for (const fixture of [fixtures[1], fixtures[2]]) {
    assert.deepEqual(
      filterTargetsByRequestCompatibility([advertised, oldVideo, capable], body(fixture.part), log),
      [capable]
    );
    assert.deepEqual(
      filterTargetsByRequestCompatibility([advertised, oldVideo], body(fixture.part), log, "test", {
        failOpen: true,
      }),
      []
    );
    assert.deepEqual(
      computeCompatRejectedTargets([advertised, oldVideo], [], body(fixture.part)),
      []
    );
  }
  assert.equal(getResolvedModelCapabilities(advertised.modelStr).supportsPdf, false);
  assert.equal(getResolvedModelCapabilities(oldVideo.modelStr).supportsVideo, false);
});
test("Chat audio excludes transcription-only and unverified transports", () => {
  const transcribe = target("cinf/gpt-4o-mini-transcribe");
  const oldChat = target("cinf/gemini-2.5-flash");
  const provenChat = target("cinf/gemini-3.7-flash");
  assert.deepEqual(
    filterTargetsByRequestCompatibility(
      [transcribe, oldChat, provenChat, capable],
      body(fixtures[0].part),
      log,
      "test",
      { failOpen: true }
    ),
    [provenChat, capable]
  );
  assert.deepEqual(
    computeCompatRejectedTargets([transcribe, oldChat], [], body(fixtures[0].part)),
    []
  );
  assert.equal(getResolvedModelCapabilities(transcribe.modelStr).supportsAudio, false);
});
const body = (part: unknown) => ({
  messages: [
    { role: "user", content: [part] },
    { role: "user", content: "continue" },
  ],
});
const fixtures = [
  { kind: "audio", part: { type: "input_audio", input_audio: { data: "fixture", format: "wav" } } },
  {
    kind: "video",
    part: { type: "video_url", video_url: { url: "https://example.com/clip.mp4" } },
  },
  {
    kind: "document",
    part: {
      type: "file",
      file: { filename: "report.pdf", file_data: "data:application/pdf;base64,JVBERfixture" },
    },
  },
  {
    kind: "document",
    part: {
      type: "input_file",
      filename: "report.pdf",
      file_data: "data:application/pdf;base64,JVBERfixture",
    },
  },
  {
    kind: "document",
    part: {
      type: "document",
      source: { type: "base64", media_type: "application/pdf", data: "JVBERfixture" },
    },
  },
  { kind: "video", part: { inlineData: { mimeType: "video/mp4", data: "fixture" } } },
  {
    kind: "audio",
    part: { fileData: { mimeType: "audio/wav", fileUri: "https://example.com/audio.wav" } },
  },
] as const;
for (const [index, fixture] of fixtures.entries()) {
  test(`media ${index}: recognizes ${fixture.kind} and excludes incompatible routes, including fail-open`, () => {
    assert.ok(detectMediaParts([{ content: [fixture.part] }]).some((p) => p.kind === fixture.kind));
    for (const request of [
      body(fixture.part),
      { input: body(fixture.part).messages },
      body({ type: "tool_result", content: [fixture.part] }),
    ]) {
      assert.deepEqual(filterTargetsByRequestCompatibility([blind, capable], request, log), [
        capable,
      ]);
      assert.deepEqual(
        filterTargetsByRequestCompatibility([blind], request, log, "test", { failOpen: true }),
        []
      );
      assert.deepEqual(computeCompatRejectedTargets([blind], [], request), []);
    }
  });
}
test("mixed media requires every capability; image-only models cannot take video or PDF", () => {
  const request = {
    messages: [{ role: "user", content: fixtures.slice(0, 3).map((f) => f.part) }],
  };
  assert.deepEqual(
    filterTargetsByRequestCompatibility([target("cinf/gpt-5.6-sol"), blind, capable], request, log),
    [capable]
  );
});
test("Auto rechecks media after expansion and cannot restore rejected routes without telemetry", async () => {
  const advertised = target("cinf/gpt-4o-mini");
  const run = async (targets: ReturnType<typeof target>[]) =>
    resolveAutoStrategyOrder({
      orderedTargets: targets,
      body: body(fixtures[2].part),
      combo: { name: "media-auto", models: targets.map((t) => t.modelStr), strategy: "auto" },
      settings: null,
      config: { compatFilterFailOpen: true },
      resilienceSettings: DEFAULT_RESILIENCE_SETTINGS,
      log,
      buildAutoCandidates: async () => [],
    });
  const rejected = await run([advertised]);
  assert.ok("earlyResponse" in rejected);
  if ("earlyResponse" in rejected) assert.equal(rejected.earlyResponse.status, 400);
  const accepted = await run([advertised, capable]);
  assert.ok("orderedTargets" in accepted);
  if ("orderedTargets" in accepted) assert.deepEqual(accepted.orderedTargets, [capable]);
});
test("PDF and generic files are distinct from image vision and extracted plain text", () => {
  assert.equal(getResolvedModelCapabilities("cinf/gemini-4-argon").supportsVideo, true);
  const opaque = body({ type: "input_file", filename: "report.docx", file_data: "opaque-bytes" });
  assert.deepEqual(
    filterTargetsByRequestCompatibility([blind, capable], opaque, log, "test", { failOpen: true }),
    []
  );
  assert.equal(
    filterTargetsByRequestCompatibility(
      [blind],
      body({ type: "document", source: { type: "text", data: "already extracted text" } }),
      log
    ).length,
    1
  );
  assert.equal(
    deriveRequestCompatibilityRequirements(
      body({ type: "text", text: "video_url and report.pdf are words here" })
    ).requiresVision,
    false
  );
});

test("discovery preserves CI's distinct input features instead of turning all vision models into PDF/video models", () => {
  const models = normalizeDiscoveredModels(
    [
      { id: "native-media", features: ["image-input", "file-input", "audio-input", "video-input"] },
      { id: "image-only", features: ["image-input"] },
    ],
    "cheaperinference"
  );
  assert.deepEqual(models[0].supportedInputTypes, ["text", "image", "audio", "video", "pdf"]);
  assert.deepEqual(models[1].supportedInputTypes, ["text", "image"]);
});

test("direct Cloudflare media requests fail before opening a browser transport", async () => {
  let opened = 0;
  const executor = new CloudflarePlaygroundExecutor(() => {
    opened++;
    throw new Error("must not open");
  });
  for (const fixture of fixtures) {
    const result = await executor.execute({ body: body(fixture.part), stream: false } as never);
    assert.equal(result.response.status, 400);
  }
  assert.equal(opened, 0);
});

test("tool declarations and extracted text do not create phantom attachments", () => {
  const request = {
    messages: [{ role: "user", content: "hello" }],
    tools: [
      {
        type: "function",
        function: {
          name: "example",
          parameters: { example: { type: "input_file", filename: "not-an-upload.pdf" } },
        },
      },
    ],
  };
  assert.equal(filterTargetsByRequestCompatibility([blind], request, log).length, 1);
});

test("a capable account cannot lend video support to a text-only account of the same provider", async () => {
  const first = "10000000-0000-4000-8000-000000000001";
  const second = "10000000-0000-4000-8000-000000000002";
  await replaceSyncedAvailableModelsForConnection("cheaperinference", first, [
    { id: "gemini-4-argon", name: "fixture", supportedInputTypes: ["text", "video"] },
  ]);
  await replaceSyncedAvailableModelsForConnection("cheaperinference", second, [
    { id: "gemini-4-argon", name: "fixture", supportedInputTypes: ["text"] },
  ]);
  try {
    const yes = { ...capable, connectionId: first },
      no = { ...capable, connectionId: second };
    assert.deepEqual(filterTargetsByRequestCompatibility([no, yes], body(fixtures[1].part), log), [
      yes,
    ]);
  } finally {
    await replaceSyncedAvailableModelsForConnection("cheaperinference", first, []);
    await replaceSyncedAvailableModelsForConnection("cheaperinference", second, []);
  }
});

test("late pipeline/tool attachments cannot bypass the common target guard", async () => {
  let sent = 0;
  const run = buildTargetTimeoutRunner({
    comboTargetTimeoutMs: 0,
    log,
    handleSingleModel: async () => {
      sent++;
      return new Response("ok");
    },
  });
  for (const fixture of fixtures)
    assert.equal((await run(body(fixture.part), blind.modelStr)).status, 400);
  assert.equal(sent, 0);
  assert.equal((await run(body(fixtures[2].part), capable.modelStr)).status, 200);
  assert.equal(sent, 1);
});

test("a context pin from a text turn cannot override a later PDF/video request", async () => {
  const combo = {
    name: "media-pin",
    strategy: "priority",
    models: [blind.modelStr, capable.modelStr],
  };
  let sent = false;
  const result = await tryPinnedModelDispatch({
    body: body(fixtures[2].part),
    combo,
    pinnedModel: blind.modelStr,
    allCombos: [combo],
    config: resolveComboSetupConfig(combo, {}),
    clientRequestedStream: false,
    log,
    handleSingleModelWithTimeout: async () => {
      sent = true;
      return new Response("should not run");
    },
  });
  assert.equal(result, null);
  assert.equal(sent, false);
});

test("fusion excludes text-only panel members and judges from PDF input", async () => {
  const sent: string[] = [];
  const result = await handleComboChat({
    body: body(fixtures[2].part),
    combo: {
      name: "media-fusion",
      strategy: "fusion",
      models: [blind.modelStr, capable.modelStr],
      config: { judgeModel: blind.modelStr },
    },
    handleSingleModel: async (_body, model) => {
      sent.push(model);
      return Response.json({ choices: [{ message: { content: "Read the PDF" } }] });
    },
    log,
    settings: {},
    allCombos: [],
  });
  assert.equal(result.status, 200);
  assert.ok(sent.includes(capable.modelStr));
  assert.ok(!sent.includes(blind.modelStr));
});

test("an unrelated model's declaration does not suppress this connection's capability fallback", async () => {
  const { getInputModalities } = await import("../../src/lib/db/models/inputModalities.ts");
  const values = new Map([
    [
      "openrouter",
      new Map([
        ["embedding-only", ["text"]],
        ["declared-chat", ["text", "pdf"]],
      ]),
    ],
    ["openrouter:first", new Map([["declared-chat", ["text", "pdf"]]])],
  ]);
  assert.equal(getInputModalities("openrouter", "undeclared-chat", values, "second"), undefined);
  assert.deepEqual(getInputModalities("openrouter", "declared-chat", values, "second"), []);
  assert.deepEqual(getInputModalities("openrouter", "declared-chat", values, "first"), [
    "text",
    "pdf",
  ]);
});

test("non-CI unknown PDF/file capabilities preserve fallback while explicit denials and CI stay strict", async () => {
  const { nonImageMediaFailures } =
    await import("../../open-sse/services/combo/mediaCompatibility.ts");
  const unknown = target("openrouter/undeclared-compatible-model");
  for (const requirements of [{ requiresPdf: true }, { requiresFiles: true }]) {
    assert.deepEqual(nonImageMediaFailures(unknown, requirements), []);
    assert.ok(nonImageMediaFailures(blind, requirements).length > 0);
    assert.ok(nonImageMediaFailures(target("cinf/gpt-4o-mini"), requirements).length > 0);
  }
  await replaceSyncedAvailableModelsForConnection("openrouter", "scoped-denial", [
    { id: "explicitly-text-only", name: "Explicit", supportedInputTypes: ["text"] },
  ]);
  const denied = { ...target("openrouter/explicitly-text-only"), connectionId: "scoped-denial" };
  assert.deepEqual(nonImageMediaFailures(denied, { requiresPdf: true, requiresFiles: true }), [
    "pdf",
    "file",
  ]);
});
