import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "or9r-gemini-web-parts-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { GeminiWebExecutor, buildGeminiPrompt, buildGeminiToolPrompt } =
  await import("../../open-sse/executors/gemini-web.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.closeDbInstance();
  rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("Gemini prompts flatten text parts, skip attachment parts and reject other parts", () => {
  assert.equal(
    buildGeminiPrompt([
      {
        role: "user",
        content: [
          { type: "text", text: "Hello " },
          { type: "text", text: "world" },
        ],
      },
    ]),
    "Hello world"
  );
  assert.equal(
    buildGeminiPrompt([{ role: "user", content: "  byte-identical\n" }]),
    "  byte-identical\n"
  );
  assert.equal(
    buildGeminiPrompt([
      {
        role: "user",
        content: [
          { type: "text", text: "describe this" },
          { type: "image_url", image_url: { url: "data:image/png;base64,AA==" } },
        ],
      },
    ]),
    "describe this",
    "the image is uploaded separately, its text is kept"
  );
  assert.equal(
    buildGeminiPrompt([
      {
        role: "user",
        content: [
          { type: "text", text: "do not send" },
          { type: "input_audio", input_audio: { data: "AA==", format: "wav" } },
        ],
      },
    ]),
    ""
  );
});

test("Gemini tool prompts keep text-part user questions", () => {
  const prompt = buildGeminiToolPrompt([
    { role: "system", content: "TOOL CONTRACT" },
    {
      role: "user",
      content: [
        { type: "text", text: "Use the " },
        { type: "text", text: "weather tool" },
      ],
    },
  ]);

  assert.equal(prompt, "TOOL CONTRACT\n\nUse the weather tool");
});

test("Gemini user validation accepts text and attachment parts, rejects unreadable parts", async () => {
  async function executeWithContent(content: unknown, withTools = false): Promise<number> {
    const controller = new AbortController();
    controller.abort(new Error("stop before browser launch"));
    const result = await new GeminiWebExecutor().execute({
      model: "gemini-3.1-pro",
      body: {
        messages: [{ role: "user", content }],
        stream: false,
        ...(withTools
          ? {
              tools: [
                {
                  type: "function",
                  function: {
                    name: "weather",
                    description: "Get weather",
                    parameters: { type: "object", properties: {} },
                  },
                },
              ],
            }
          : {}),
      },
      stream: false,
      credentials: { apiKey: "__Secure-1PSID=test" },
      signal: controller.signal,
      log: null,
    });
    return result.response.status;
  }

  assert.equal(await executeWithContent([{ type: "text", text: "Hello" }]), 499);
  assert.equal(await executeWithContent([{ type: "text", text: "Hello" }], true), 499);
  // An image-only turn is now a valid ask: it passes validation and reaches the browser
  // step (499 = the pre-aborted signal stopped it there).
  const imageContent = [{ type: "image_url", image_url: { url: "data:image/png;base64,AA==" } }];
  assert.equal(await executeWithContent(imageContent), 499);
  assert.equal(await executeWithContent(imageContent, true), 499);
  const audioContent = [{ type: "input_audio", input_audio: { data: "AA==", format: "wav" } }];
  assert.equal(await executeWithContent(audioContent), 400);
  assert.equal(await executeWithContent(audioContent, true), 400);
});

test("Gemini tool mode rejects an unreadable last user array even after a readable user turn", async () => {
  const tools = [
    {
      type: "function",
      function: {
        name: "weather",
        description: "Get weather",
        parameters: { type: "object", properties: {} },
      },
    },
  ];
  async function statusFor(lastUserContent: unknown, withTools = true): Promise<number> {
    const controller = new AbortController();
    controller.abort(new Error("stop before browser launch"));
    const result = await new GeminiWebExecutor().execute({
      model: "gemini-3.1-pro",
      body: {
        messages: [
          { role: "user", content: "What is the weather?" },
          { role: "assistant", content: "Which city?" },
          { role: "user", content: lastUserContent },
        ],
        stream: false,
        ...(withTools ? { tools } : {}),
      },
      stream: false,
      credentials: { apiKey: "__Sec...est" },
      signal: controller.signal,
      log: null,
    });
    return result.response.status;
  }

  const audio = [{ type: "input_audio", input_audio: { data: "AA==", format: "wav" } }];
  assert.equal(await statusFor(audio), 400, "an unreadable last turn would send an empty ask");
  const image = [{ type: "image_url", image_url: { url: "data:image/png;base64,AA==" } }];
  assert.equal(await statusFor(image), 499, "an image-only last turn is uploaded, not rejected");
  assert.equal(await statusFor([{ type: "text", text: "Paris" }]), 499, "readable text parts pass");
  assert.equal(await statusFor("Paris"), 499, "string input is unchanged");
  assert.equal(await statusFor(""), 499, "an empty string last turn keeps its old behavior");

  // Without tools too: the unreadable turn's image must not ride on the earlier question.
  const mixed = [{ type: "text", text: "And this?" }, ...image, ...audio];
  assert.equal(await statusFor(mixed, false), 400, "unreadable last turn with an attachment");
  assert.equal(await statusFor([{ type: "text", text: "This?" }, ...image], false), 499);
  assert.equal(await statusFor(audio, false), 499, "no attachment: old non-tool behavior kept");
});
