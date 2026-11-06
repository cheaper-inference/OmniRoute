/**
 * #18684 — the Responses -> Chat translator lifts every historical tool-output
 * `input_image` into a following user message (#14111). In a long session that grows
 * the request without bound (~51 MB with 43 images) until the upstream rejects the
 * body. Only the newest images within a count and byte budget are re-sent; each older
 * one becomes a text placeholder carrying its tool_call_id.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

const THREE_MB = 3 * 1024 * 1024;

function imageUrl(fill: string, size: number): string {
  return `data:image/png;base64,${fill.repeat(size)}`;
}

function screenshotTurns(count: number, size: number): unknown[] {
  const input: unknown[] = [];
  for (let i = 0; i < count; i++) {
    const callId = `call_shot${i}`;
    input.push({ type: "function_call", call_id: callId, name: "screenshot", arguments: "{}" });
    input.push({
      type: "function_call_output",
      call_id: callId,
      output: [
        { type: "input_text", text: `shot ${i}` },
        { type: "input_image", image_url: imageUrl(String.fromCharCode(65 + i), size) },
      ],
    });
  }
  return input;
}

function translate(input: unknown[]): Record<string, unknown>[] {
  const result = openaiResponsesToOpenAIRequest("gpt-5.2", { input }, false, {}) as Record<
    string,
    unknown
  >;
  return result.messages as Record<string, unknown>[];
}

function liftedParts(messages: Record<string, unknown>[]): Record<string, unknown>[][] {
  return messages
    .filter((m) => m.role === "user" && Array.isArray(m.content))
    .map((m) => m.content as Record<string, unknown>[]);
}

function withEnv(vars: Record<string, string>, fn: () => void): void {
  const previous = Object.fromEntries(Object.keys(vars).map((k) => [k, process.env[k]]));
  Object.assign(process.env, vars);
  try {
    fn();
  } finally {
    for (const [k, v] of Object.entries(previous)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
}

test("#18684 eleven ~3 MB tool-output images are capped to the newest that fit 20 MB", () => {
  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => warnings.push(args.join(" "));
  let messages: Record<string, unknown>[];
  try {
    messages = translate(screenshotTurns(11, THREE_MB));
  } finally {
    console.warn = originalWarn;
  }

  const lifted = liftedParts(messages);
  assert.equal(lifted.length, 11, "every tool output still gets its follow-up user message");

  const imageBytes = lifted
    .flat()
    .filter((p) => p.type === "image_url")
    .reduce((sum, p) => sum + ((p.image_url as { url: string }).url.length as number), 0);
  assert.ok(imageBytes <= 20 * 1024 * 1024, `image payload ${imageBytes} exceeds 20 MB`);

  for (let i = 0; i < 5; i++) {
    assert.deepEqual(lifted[i], [
      {
        type: "text",
        text: `[Earlier tool output image omitted to bound request size (tool_call_id: call_shot${i})]`,
      },
    ]);
  }
  for (let i = 5; i < 11; i++) {
    assert.equal(lifted[i][0].type, "image_url", `newest image ${i} must be kept`);
  }

  const capLogs = warnings.filter((w) => w.startsWith("TOOL_OUTPUT_IMAGE_CAP"));
  assert.equal(capLogs.length, 1, "the cap logs once per request");
  assert.match(capLogs[0], /kept=6 dropped=5/);
});

test("#18684 the count cap is env-configurable and drops oldest first", () => {
  withEnv({ OMNIROUTE_TOOL_OUTPUT_IMAGE_MAX_COUNT: "2" }, () => {
    const originalWarn = console.warn;
    console.warn = () => {};
    try {
      const lifted = liftedParts(translate(screenshotTurns(4, 64)));
      assert.deepEqual(
        lifted.map((parts) => parts[0].type),
        ["text", "text", "image_url", "image_url"]
      );
    } finally {
      console.warn = originalWarn;
    }
  });
});

test("#18684 the byte cap is env-configurable", () => {
  withEnv({ OMNIROUTE_TOOL_OUTPUT_IMAGE_MAX_BYTES: "300" }, () => {
    const originalWarn = console.warn;
    console.warn = () => {};
    try {
      const lifted = liftedParts(translate(screenshotTurns(3, 128)));
      assert.deepEqual(
        lifted.map((parts) => parts[0].type),
        ["text", "image_url", "image_url"]
      );
    } finally {
      console.warn = originalWarn;
    }
  });
});

test("#18684 a request under both caps is unchanged and logs nothing", () => {
  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => warnings.push(args.join(" "));
  try {
    const lifted = liftedParts(translate(screenshotTurns(3, 64)));
    assert.deepEqual(
      lifted.map((parts) => parts[0].type),
      ["image_url", "image_url", "image_url"]
    );
  } finally {
    console.warn = originalWarn;
  }
  assert.equal(warnings.filter((w) => w.startsWith("TOOL_OUTPUT_IMAGE_CAP")).length, 0);
});

test("#18684 custom_tool_call_output and role-based tool images share the same budget", () => {
  withEnv({ OMNIROUTE_TOOL_OUTPUT_IMAGE_MAX_COUNT: "1" }, () => {
    const originalWarn = console.warn;
    console.warn = () => {};
    try {
      const lifted = liftedParts(
        translate([
          { type: "custom_tool_call", call_id: "call_custom", name: "screenshot", input: "{}" },
          {
            type: "custom_tool_call_output",
            call_id: "call_custom",
            output: [{ type: "input_image", image_url: imageUrl("C", 64) }],
          },
          {
            role: "tool",
            tool_call_id: "call_role",
            content: [{ type: "input_image", image_url: imageUrl("R", 64) }],
          },
        ])
      );
      assert.deepEqual(lifted, [
        [
          {
            type: "text",
            text: "[Earlier tool output image omitted to bound request size (tool_call_id: call_custom)]",
          },
        ],
        [{ type: "image_url", image_url: { url: imageUrl("R", 64) } }],
      ]);
    } finally {
      console.warn = originalWarn;
    }
  });
});
