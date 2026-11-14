import test from "node:test";
import assert from "node:assert/strict";

const helpers = await import("../../../src/app/api/v1beta/models/[...path]/geminiRouteHelpers.ts");
const route = await import("../../../src/app/api/v1beta/models/[...path]/route.ts");

const { parseGeminiModelPath, estimateGeminiCountTokens } = helpers;

test("parses a bare model with each action", () => {
  assert.deepEqual(parseGeminiModelPath(["gemini-2.5-flash:generateContent"]), {
    model: "gemini-2.5-flash",
    action: "generateContent",
  });
  assert.deepEqual(parseGeminiModelPath(["gemini-2.5-flash:streamGenerateContent"]), {
    model: "gemini-2.5-flash",
    action: "streamGenerateContent",
  });
  assert.deepEqual(parseGeminiModelPath(["gemini-2.5-flash:countTokens"]), {
    model: "gemini-2.5-flash",
    action: "countTokens",
  });
});

test("keeps every slash segment of the model id", () => {
  assert.deepEqual(parseGeminiModelPath(["openai", "gpt-5.1:streamGenerateContent"]), {
    model: "openai/gpt-5.1",
    action: "streamGenerateContent",
  });
  assert.deepEqual(parseGeminiModelPath(["a", "b", "c:generateContent"]), {
    model: "a/b/c",
    action: "generateContent",
  });
  assert.deepEqual(parseGeminiModelPath(["auto", "best-coding:streamGenerateContent"]), {
    model: "auto/best-coding",
    action: "streamGenerateContent",
  });
  assert.deepEqual(parseGeminiModelPath(["openrouter", "x-ai", "grok-4:countTokens"]), {
    model: "openrouter/x-ai/grok-4",
    action: "countTokens",
  });
});

test("splits on the last colon so model ids may contain colons", () => {
  assert.deepEqual(parseGeminiModelPath(["ollama", "qwen:7b:generateContent"]), {
    model: "ollama/qwen:7b",
    action: "generateContent",
  });
});

test("decodes percent-encoded segments", () => {
  assert.deepEqual(parseGeminiModelPath(["openai%2Fgpt-5.1%3AcountTokens"]), {
    model: "openai/gpt-5.1",
    action: "countTokens",
  });
});

test("falls back to generateContent with the whole id when no known action is present", () => {
  assert.deepEqual(parseGeminiModelPath(["gemini-pro"]), {
    model: "gemini-pro",
    action: "generateContent",
  });
  assert.deepEqual(parseGeminiModelPath(["ollama", "qwen:7b"]), {
    model: "ollama/qwen:7b",
    action: "generateContent",
  });
});

test("returns null when no model is left", () => {
  assert.equal(parseGeminiModelPath([]), null);
  assert.equal(parseGeminiModelPath(undefined), null);
  assert.equal(parseGeminiModelPath([":generateContent"]), null);
});

test("estimateGeminiCountTokens counts text, system, tools, function parts and media", () => {
  const empty = estimateGeminiCountTokens({ contents: [] });
  assert.equal(empty, 0);

  const textOnly = estimateGeminiCountTokens({
    contents: [{ role: "user", parts: [{ text: "Hello there, how are you today?" }] }],
  });
  assert.ok(textOnly > 0);

  const full = estimateGeminiCountTokens({
    systemInstruction: { parts: [{ text: "You are a careful coding assistant." }] },
    contents: [
      { role: "user", parts: [{ text: "Hello there, how are you today?" }] },
      {
        role: "model",
        parts: [{ functionCall: { name: "read_file", args: { file_path: "/a/b.ts" } } }],
      },
      {
        role: "user",
        parts: [
          { functionResponse: { name: "read_file", response: { output: "export const a = 1;" } } },
          { inlineData: { mimeType: "image/png", data: "AAAA" } },
        ],
      },
    ],
    tools: [
      {
        functionDeclarations: [
          {
            name: "read_file",
            description: "Read a file",
            parametersJsonSchema: { type: "object", properties: { file_path: { type: "string" } } },
          },
        ],
      },
    ],
  });
  assert.ok(full > textOnly + 258, `expected media + extras on top of text, got ${full}`);
});

test("estimateGeminiCountTokens accepts the generateContentRequest wrapper", () => {
  const contents = [{ role: "user", parts: [{ text: "Count these tokens please." }] }];
  const direct = estimateGeminiCountTokens({ contents });
  const wrapped = estimateGeminiCountTokens({
    generateContentRequest: { model: "models/x", contents },
  });
  assert.ok(direct > 0);
  assert.equal(wrapped, direct);
});

function postRequest(path: string, body: unknown): Request {
  return new Request(`http://localhost/v1beta/models/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("POST :countTokens on a slash model id answers {totalTokens} without dispatching", async () => {
  const body = { contents: [{ role: "user", parts: [{ text: "Hello there, how are you?" }] }] };
  const response = await route.POST(postRequest("openai/gpt-5.1:countTokens", body), {
    params: Promise.resolve({ path: ["openai", "gpt-5.1:countTokens"] }),
  });
  assert.equal(response.status, 200);
  const json = (await response.json()) as { totalTokens: number };
  assert.deepEqual(Object.keys(json), ["totalTokens"]);
  assert.equal(json.totalTokens, estimateGeminiCountTokens(body, "openai/gpt-5.1"));
  assert.ok(json.totalTokens > 0);
});

test("POST with no model in the path is a 400, not a 500", async () => {
  const response = await route.POST(postRequest(":generateContent", { contents: [] }), {
    params: Promise.resolve({ path: [":generateContent"] }),
  });
  assert.equal(response.status, 400);
});
