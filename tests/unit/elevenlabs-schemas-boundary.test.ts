import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import * as engineSchemas from "../../open-sse/handlers/mediaGeneration/elevenLabsSchemas.ts";
import * as appSchemas from "../../src/shared/validation/schemas/elevenlabs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const handler = fs.readFileSync(
  path.join(root, "open-sse/handlers/mediaGeneration/elevenLabsMusic.ts"),
  "utf8"
);

// Base-red #17219 (2026-10-24): the ElevenLabs media handler imported its request schema from
// `src/`, adding an open-sse → src edge above the boundary ratchet ceiling. The schemas now live
// with the engine and the app path only re-exports them.
test("the ElevenLabs media handler does not import the request schema from src/", () => {
  assert.doesNotMatch(handler, /from "@\/shared\/validation\/schemas\/elevenlabs"/);
  assert.match(handler, /from "\.\/elevenLabsSchemas\.ts"/);
});

test("the src path re-exports the very same schema objects the engine uses", () => {
  for (const name of [
    "elevenLabsSoundGenerationSchema",
    "elevenLabsMusicSchema",
    "elevenLabsMusicPlanSchema",
  ] as const) {
    assert.equal(appSchemas[name], engineSchemas[name], name);
  }
});

test("the relocated schemas keep their contracts", () => {
  assert.equal(engineSchemas.elevenLabsMusicSchema.safeParse({ prompt: "lofi" }).success, true);
  assert.equal(
    engineSchemas.elevenLabsMusicSchema.safeParse({ prompt: "lofi", composition_plan: {} }).success,
    false,
    "prompt and composition_plan are mutually exclusive"
  );
  assert.equal(
    engineSchemas.elevenLabsSoundGenerationSchema.safeParse({ text: "rain", duration_seconds: 5 })
      .success,
    true
  );
  assert.equal(
    engineSchemas.elevenLabsMusicPlanSchema.safeParse({ prompt: "x".repeat(4101) }).success,
    false,
    "plan prompt is capped at 4100 chars"
  );
});
