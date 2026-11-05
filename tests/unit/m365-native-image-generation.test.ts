import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import type WebSocket from "ws";
import { __setCopilotM365WebSocketForTesting } from "../../open-sse/executors/copilot-m365-web.ts";
import { encodeFrame } from "../../open-sse/executors/copilot-m365-frames.ts";
import {
  M365GeneratedImageCollector,
  M365_IMAGE_OPTION_SETS,
  classifyM365ImageFailure,
  isM365ArtifactUrl,
  m365ImagePrompt,
  m365OrientationForSize,
} from "../../open-sse/executors/m365Protocol/imageGeneration.ts";
import { __resetM365ArtifactTokensForTesting } from "../../open-sse/executors/m365ImageGeneration.ts";
import { handleM365ImageGeneration } from "../../open-sse/handlers/imageGeneration/providers/m365Image.ts";

// Copilot draws with a built-in tool: the turn opts in with the web client's image options and
// declares GenerateGraphicArt; images arrive as contentGenerationProgressList entries whose
// artifact URLs need a Designer token minted from the connection's refresh token.

type Frame = Record<string, unknown>;
const ARTIFACT = "https://designerapp.officeapps.live.com/designerapp/document.ashx?path=img1";
const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  "base64"
);

/** A bot message announcing one image at `status`. */
const progress = (status: number, url = ARTIFACT, fileToken = "f1") => ({
  author: "bot",
  messageId: "m",
  messageType: "GenerateGraphicArt",
  contentGenerationProgressList: [
    { fileToken, status, size: "Xlimage", orientation: "Landscape", ImageReferenceUrls: [url] },
  ],
});

test("the collector keeps one, readiest copy of each announced image", () => {
  const collector = new M365GeneratedImageCollector();
  collector.push({ type: 1, target: "update", arguments: [{ messages: [progress(1)] }] });
  collector.push({ type: 1, target: "update", arguments: [{ messages: [progress(2)] }] });
  collector.push({ type: 2, item: { messages: [progress(1), { author: "bot", text: "Here" }] } });
  assert.deepEqual(collector.images, [
    { url: ARTIFACT, status: 2, size: "Xlimage", orientation: "Landscape" },
  ]);
  collector.push({ type: 2, item: { messages: [{ contentGenerationProgressList: [{}] }] } });
  assert.equal(collector.images.length, 1, "an entry without URLs announces nothing");
});

test("the Designer token is only ever sent to the Designer artifact host", () => {
  assert.equal(isM365ArtifactUrl(ARTIFACT), true);
  for (const url of [
    "http://designerapp.officeapps.live.com/x",
    "https://designerapp.officeapps.live.com:8443/x",
    "https://designerapp.officeapps.live.com.evil.example/x",
    "https://designerapp.officeapps.live.com@evil.example/x",
    "https://evil.example/designerapp.officeapps.live.com",
    "not a url",
  ])
    assert.equal(isM365ArtifactUrl(url), false, url);
});

test("no-image turns are classified; only the observed quota wording is certain", () => {
  assert.equal(
    classifyM365ImageFailure("Sorry, I can't generate any more images today. Try again tomorrow."),
    "quota_exceeded"
  );
  assert.equal(classifyM365ImageFailure("Here is a poem instead."), "no_image");
  assert.equal(classifyM365ImageFailure(""), "no_image");
});

test("size steers orientation through the prompt", () => {
  assert.equal(m365OrientationForSize("1792x1024"), "landscape");
  assert.equal(m365OrientationForSize("1024x1792"), "portrait");
  assert.equal(m365OrientationForSize("1024x1024"), "square");
  assert.equal(m365OrientationForSize("auto"), null);
  assert.equal(m365ImagePrompt("a fox", null), "a fox");
  assert.match(m365ImagePrompt("a fox", "portrait"), /^a fox\n\nUse a portrait/);
});

let turns: Frame[][] = [];
const invocations: Frame[] = [];
class Socket extends EventEmitter {
  readyState = 1;
  constructor(public url: string) {
    super();
    queueMicrotask(() => this.emit("open"));
  }
  send(data: string) {
    const frames = data
      .split("\x1e")
      .filter(Boolean)
      .map((f) => JSON.parse(f) as Frame);
    if (frames.some((f) => f.protocol === "json"))
      queueMicrotask(() => this.emit("message", Buffer.from(encodeFrame({}))));
    const invocation = frames.find((f) => f.type === 4);
    if (!invocation) return;
    invocations.push((invocation.arguments as Frame[])[0]);
    const turn = turns.shift() ?? [];
    queueMicrotask(() => {
      for (const frame of turn) this.emit("message", Buffer.from(encodeFrame(frame)));
    });
  }
  close() {
    this.readyState = 3;
    this.emit("close");
  }
  terminate() {
    this.close();
  }
}

/** A turn that announces one image and finishes. */
const drawn = (url = ARTIFACT): Frame[] => [
  { type: 1, target: "update", arguments: [{ messages: [progress(1, url)] }] },
  { type: 2, item: { result: { value: "Success" }, messages: [progress(2, url)] } },
  { type: 3, invocationId: "0" },
];
/** A turn that answers with text only. */
const refused = (text: string): Frame[] => [
  { type: 2, item: { result: { value: "Success" }, messages: [{ author: "bot", text }] } },
  { type: 3, invocationId: "0" },
];

interface Seen {
  tokenScopes: string[];
  artifactAuth: string[];
  persisted: Array<Record<string, unknown>>;
  logs: Array<Record<string, unknown>>;
}

/** Run `fn` against scripted turns, a stubbed token endpoint and artifact host. */
async function run(script: Frame[][], fn: (seen: Seen) => Promise<void>) {
  turns = [...script];
  invocations.length = 0;
  __resetM365ArtifactTokensForTesting();
  const seen: Seen = { tokenScopes: [], artifactAuth: [], persisted: [], logs: [] };
  const restoreSocket = __setCopilotM365WebSocketForTesting(Socket as unknown as typeof WebSocket);
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    if (url.startsWith("https://login.microsoftonline.com/")) {
      seen.tokenScopes.push(new URLSearchParams(String(init?.body)).get("scope") ?? "");
      return Response.json({
        access_token: "designer-token",
        refresh_token: "rotated-refresh",
        expires_in: 3600,
      });
    }
    seen.artifactAuth.push(new Headers(init?.headers).get("authorization") ?? "");
    return new Response(PNG, { headers: { "content-type": "image/png" } });
  }) as typeof fetch;
  try {
    await fn(seen);
  } finally {
    globalThis.fetch = realFetch;
    restoreSocket();
  }
}

/** Generate through the provider handler on a signed-in connection. */
function generate(seen: Seen, body: Record<string, unknown>, refreshToken: string | null = "rt") {
  return handleM365ImageGeneration({
    model: "m365-copilot-image",
    provider: "copilot-m365-web",
    body,
    credentials: {
      connectionId: "conn-1",
      accessToken: "chat-token",
      ...(refreshToken ? { refreshToken } : {}),
      expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
      providerSpecificData: {
        chathubPath: "11111111-1111-4111-8111-111111111111@22222222-2222-4222-8222-222222222222",
        tier: "edu",
      },
    },
    onCredentialsRefreshed: async (next) => {
      seen.persisted.push(next as Record<string, unknown>);
    },
    deps: {
      saveCallLog: async (entry) => {
        seen.logs.push(entry);
      },
    },
  });
}

test("an image turn opts in like the web client and downloads with the Designer token", async () => {
  await run([drawn()], async (seen) => {
    const result = await generate(seen, { prompt: "a red fox", size: "1792x1024" });
    assert.equal(result.success, true);
    if (!result.success) return;
    assert.deepEqual(result.data.data, [{ b64_json: PNG.toString("base64") }]);
    const [args] = invocations as Array<Frame & { message: { text: string } }>;
    assert.equal(args.isStartOfSession, true);
    for (const option of M365_IMAGE_OPTION_SETS)
      assert.ok((args.optionsSets as string[]).includes(option), option);
    assert.ok((args.allowedMessageTypes as string[]).includes("GenerateGraphicArt"));
    assert.match(args.message.text, /^a red fox\n\nUse a landscape/);
    assert.deepEqual(seen.tokenScopes, [
      "openid profile offline_access https://designerappservice.officeapps.live.com/.default",
    ]);
    assert.deepEqual(seen.artifactAuth, ["Bearer designer-token"], "never the chat token");
    assert.equal(seen.persisted.at(-1)?.refreshToken, "rotated-refresh");
    assert.equal(seen.logs.at(-1)?.status, 200);
  });
});

test("n images take n turns; a url response is a data URL; the Designer token is reused", async () => {
  await run([drawn(), drawn()], async (seen) => {
    const result = await generate(seen, { prompt: "a fox", n: 2, response_format: "url" });
    assert.equal(result.success, true);
    if (!result.success) return;
    assert.equal(invocations.length, 2);
    assert.equal(seen.tokenScopes.length, 1);
    for (const image of result.data.data)
      assert.equal(image.url, `data:image/png;base64,${PNG.toString("base64")}`);
  });
});

test("a used-up image budget is a 429 and no token is minted", async () => {
  await run(
    [refused("Sorry, I can't generate any more images today. Try again tomorrow.")],
    async (seen) => {
      const result = await generate(seen, { prompt: "a fox" });
      assert.deepEqual([result.success, !result.success && result.status], [false, 429]);
      assert.equal(seen.tokenScopes.length, 0);
    }
  );
});

test("an image announced anywhere but the Designer host is not fetched with the token", async () => {
  await run([drawn("https://evil.example/steal")], async (seen) => {
    const result = await generate(seen, { prompt: "a fox" });
    assert.deepEqual([result.success, !result.success && result.status], [false, 502]);
    assert.deepEqual(seen.artifactAuth, []);
  });
});

test("requests are validated, and a pasted-token connection fails before spending a turn", async () => {
  await run([drawn()], async (seen) => {
    for (const body of [{}, { prompt: " " }, { prompt: "x", n: 0 }, { prompt: "x", n: 5 }]) {
      const result = await generate(seen, body);
      assert.deepEqual([result.success, !result.success && result.status], [false, 400]);
    }
    const pasted = await generate(seen, { prompt: "a fox" }, null);
    assert.deepEqual([pasted.success, !pasted.success && pasted.status], [false, 400]);
    assert.equal(invocations.length, 0, "no turn was spent");
  });
});
