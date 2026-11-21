import test from "node:test";
import assert from "node:assert/strict";

import { openaiToAntigravityRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";

type Content = { role: string; parts: Array<{ text?: string }> };

function contentsFor(messages: unknown[]): Content[] {
  const out = openaiToAntigravityRequest("gemini-3-pro", { messages }, false, {
    projectId: "p",
  }) as { request: { contents: Content[] } };
  return out.request.contents;
}

test("client system text is not placed into a model turn", () => {
  const contents = contentsFor([
    { role: "system", content: "SYS-RULES" },
    { role: "assistant", content: "Hello, I am a bot." },
    { role: "user", content: "hi" },
  ]);
  const holder = contents.find((c) => c.parts.some((p) => p.text === "SYS-RULES"));
  assert.equal(holder?.role, "user");
  const model = contents.find((c) => c.parts.some((p) => p.text === "Hello, I am a bot."));
  assert.equal(model?.role, "model");
  assert.ok(!model?.parts.some((p) => p.text === "SYS-RULES"));
});

test("the roles still alternate after the system text moves", () => {
  const contents = contentsFor([
    { role: "system", content: "SYS-RULES" },
    { role: "assistant", content: "Hello, I am a bot." },
    { role: "user", content: "hi" },
  ]);
  for (let i = 1; i < contents.length; i++) {
    assert.notEqual(contents[i].role, contents[i - 1].role, `roles at ${i - 1} and ${i}`);
  }
});

test("with a user turn first, the system text still leads that turn", () => {
  const contents = contentsFor([
    { role: "system", content: "SYS-RULES" },
    { role: "user", content: "hi" },
  ]);
  assert.equal(contents[0].role, "user");
  assert.deepEqual(
    contents[0].parts.map((p) => p.text),
    ["SYS-RULES", "hi"]
  );
});
