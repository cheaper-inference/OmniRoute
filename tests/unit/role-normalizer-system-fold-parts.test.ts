/**
 * Regression guard: the system-role fold must not destroy structured content
 * parts in the first user message.
 *
 * normalizeSystemRole folds `system` into the first user turn for models that
 * reject the system role (the GLM 4.x family per its own gating). The fold
 * used extractTextFromContent on the first user message and replaced its
 * content with a flat string — so an image (or any non-text part) in that
 * first turn was silently dropped on exactly the vision-capable models that
 * need the fold. The structure-preserving fix prepends the system text as a
 * leading text part instead of re-serializing the message.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { normalizeSystemRole } = await import("../../open-sse/services/roleNormalizer.ts");

const FOLDING_MODEL = "glm-4.6v"; // 4.x family: folds system into the first user turn

function visionFirstTurn() {
  return [
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content: [
        { type: "text", text: "What is in this image?" },
        { type: "image_url", image_url: { url: "data:image/png;base64,aGVsbG8=" } },
      ],
    },
    { role: "assistant", content: "Sure." },
  ];
}

test("1. the fold keeps the image part of the first user message", () => {
  const folded = normalizeSystemRole(
    visionFirstTurn() as never,
    "glm",
    FOLDING_MODEL
  ) as Array<{ role: string; content: unknown }>;

  assert.equal(folded.length, 2, "system message is folded away");
  const firstUser = folded[0];
  assert.equal(firstUser.role, "user");
  assert.ok(Array.isArray(firstUser.content), "structured content stays structured");

  const parts = firstUser.content as Array<{ type?: string; text?: string }>;
  const imagePart = parts.find((p) => p.type === "image_url");
  assert.ok(imagePart, "image part survives the fold");
  const systemTextPart = parts.find((p) => p.type === "text" && p.text?.includes("[System Instructions]"));
  assert.ok(systemTextPart, "system instructions are prepended as a text part");
  assert.ok(
    (systemTextPart as { text?: string }).text?.includes("You are a helpful assistant."),
    "system content is carried over"
  );
  const userText = parts.find((p) => p.type === "text" && p.text === "What is in this image?");
  assert.ok(userText, "original user text part survives");
  assert.equal(folded[1].role, "assistant");
});

test("2. string-content first user turn keeps the historical flat fold", () => {
  const folded = normalizeSystemRole(
    [
      { role: "system", content: "Be terse." },
      { role: "user", content: "hi" },
    ] as never,
    "glm",
    FOLDING_MODEL
  ) as Array<{ role: string; content: unknown }>;

  assert.equal(folded.length, 1);
  assert.equal(folded[0].role, "user");
  assert.equal(
    folded[0].content,
    "[System Instructions]\nBe terse.\n\n[User Message]\nhi"
  );
});

test("3. no first user message: system inserted as its own user turn (unchanged)", () => {
  const folded = normalizeSystemRole(
    [
      { role: "system", content: "Be terse." },
      { role: "assistant", content: "ok" },
    ] as never,
    "glm",
    FOLDING_MODEL
  ) as Array<{ role: string; content: unknown }>;

  assert.equal(folded.length, 2);
  assert.equal(folded[0].role, "user");
  assert.equal(folded[0].content, "[System Instructions]\nBe terse.");
});

test("4. system-capable models leave the messages untouched", () => {
  const input = visionFirstTurn();
  const result = normalizeSystemRole(input as never, "glm", "glm-5.2") as typeof input;
  assert.equal(result.length, 3);
  assert.equal(result[0].role, "system");
});
