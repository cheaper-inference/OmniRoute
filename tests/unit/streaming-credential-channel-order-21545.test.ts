import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The transform pulls in the settings store, which reads DATA_DIR when the module loads,
// so the isolation has to happen before the import; a static import would run too early.
process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-channel-order-"));
const { createCredentialSseTransform } = await import(
  "../../src/lib/streamingCredentialTransform.ts"
);

async function runTransform(transform: TransformStream, input: string[]): Promise<string> {
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const writing = (async () => {
    for (const chunk of input) await writer.write(new TextEncoder().encode(chunk));
    await writer.close();
  })();
  const out: string[] = [];
  let result = await reader.read();
  while (!result.done) {
    out.push(new TextDecoder().decode(result.value));
    result = await reader.read();
  }
  await writing;
  return out.join("");
}

type Frame = { choices?: Array<{ delta?: Record<string, unknown> }> };

function frames(output: string): Frame[] {
  const parsed: Frame[] = [];
  for (const line of output.split("\n")) {
    if (!line.startsWith("data:")) continue;
    const payload = line.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    try {
      parsed.push(JSON.parse(payload) as Frame);
    } catch {
      // Not a JSON frame.
    }
  }
  return parsed;
}

/** Channel order as the client sees it: field names in delta key order, per frame. */
function channelRuns(parsed: Frame[]): Array<{ field: string; text: string }> {
  const runs: Array<{ field: string; text: string }> = [];
  for (const frame of parsed) {
    for (const [field, value] of Object.entries(frame.choices?.[0]?.delta ?? {})) {
      if (typeof value !== "string" || !value) continue;
      const last = runs[runs.length - 1];
      if (last && last.field === field) last.text += value;
      else runs.push({ field, text: value });
    }
  }
  return runs;
}

const thinking = (text: string) =>
  `data: ${JSON.stringify({ choices: [{ index: 0, delta: { reasoning_content: text } }] })}\n\n`;

const answer = (text: string) =>
  `data: ${JSON.stringify({ choices: [{ index: 0, delta: { content: text } }] })}\n\n`;

const done = "data: [DONE]\n\n";

test("a reasoning tail is emitted before the answer, not after it", async () => {
  const output = await runTransform(createCredentialSseTransform(), [
    thinking("r ".repeat(350)),
    answer("a ".repeat(350)),
    done,
  ]);
  const runs = channelRuns(frames(output));

  assert.deepEqual(
    runs.map((run) => run.field),
    ["reasoning_content", "content"],
    "each channel is contiguous and reasoning comes first"
  );
  assert.equal(runs[0].text.length, 700, "the whole reasoning trace reaches the client");
  assert.equal(runs[1].text.length, 700, "the whole answer reaches the client");
});

test("the reopened reasoning field precedes content inside the switch frame", async () => {
  const output = await runTransform(createCredentialSseTransform(), [
    thinking("r ".repeat(350)),
    answer("a ".repeat(350)),
    done,
  ]);
  const switchFrame = frames(output).find((frame) => {
    const keys = Object.keys(frame.choices?.[0]?.delta ?? {});
    return keys.includes("reasoning_content") && keys.includes("content");
  });

  assert.ok(switchFrame, "one frame reopens reasoning and carries content");
  assert.deepEqual(Object.keys(switchFrame.choices?.[0]?.delta ?? {}), [
    "reasoning_content",
    "content",
  ]);
});

test("a short answer still lands after the reasoning tail", async () => {
  const output = await runTransform(createCredentialSseTransform(), [
    thinking("r ".repeat(350)),
    answer("short"),
    done,
  ]);
  const runs = channelRuns(frames(output));

  assert.deepEqual(
    runs.map((run) => run.field),
    ["reasoning_content", "content"]
  );
  assert.equal(runs[0].text.length, 700);
  assert.equal(runs[1].text, "short");
});

test("a credential in the reopened tail is still redacted", async () => {
  const secret = `sk-${"A".repeat(32)}`;
  const output = await runTransform(createCredentialSseTransform(), [
    thinking(`${"r ".repeat(300)}${secret}`),
    answer("a ".repeat(350)),
    done,
  ]);

  assert.ok(!output.includes(secret), "the key must not reach the client");
  assert.ok(output.includes("REDACTED"), "the drained tail is masked before it is emitted");
});
