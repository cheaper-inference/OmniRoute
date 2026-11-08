import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "or9r-gemini-web-parts-"));

const { GeminiWebExecutor, buildGeminiPrompt, buildGeminiToolPrompt } =
  await import("../../open-sse/executors/gemini-web.ts");

test("Gemini prompts flatten text parts and reject other content parts", () => {
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
          { type: "text", text: "do not send" },
          { type: "image_url", image_url: { url: "data:image/png;base64,AA==" } },
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

test("Gemini user validation accepts text parts and rejects image parts", async () => {
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
  const imageContent = [{ type: "image_url", image_url: { url: "data:image/png;base64,AA==" } }];
  assert.equal(await executeWithContent(imageContent), 400);
  assert.equal(await executeWithContent(imageContent, true), 400);
});
