import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// conversationTurnContent.ts resolves a conversation_turn_nodes row's actual
// display text/tool-call shape on demand from the call-log artifact its
// last_correlation_id points at (migration 156 dropped the old stored
// text_preview/block_kind/tool_name columns -- see conversationTracker.ts).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-conv-turn-content-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { hashTurnContent } = await import("../../open-sse/services/conversationTracker.ts");
const { resolveTurnDisplayContent } =
  await import("../../open-sse/services/conversationTurnContent.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function insertCallLog(row: { id: string; correlationId: string; artifactRelPath: string | null }) {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, correlation_id, artifact_relpath)
     VALUES (?, ?, 'POST', '/v1/chat/completions', 200, 'big-pickle', ?, ?)`
  ).run(row.id, new Date().toISOString(), row.correlationId, row.artifactRelPath);
}

function writeArtifact(relPath: string, clientRawRequestBody: unknown) {
  const absPath = path.join(TEST_DATA_DIR, "call_logs", relPath);
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  fs.writeFileSync(
    absPath,
    JSON.stringify({
      schemaVersion: 5,
      requestBody: null,
      responseBody: null,
      error: null,
      pipeline: {
        clientRawRequest: { body: clientRawRequestBody },
      },
    })
  );
}

test("resolveTurnDisplayContent resolves plain text turns from the artifact's raw request body", () => {
  insertCallLog({ id: "log-1", correlationId: "corr-1", artifactRelPath: "2026-01-01/log-1.json" });
  writeArtifact("2026-01-01/log-1.json", {
    messages: [
      { role: "user", content: "hello there" },
      { role: "assistant", content: "hi!" },
    ],
  });

  const result = resolveTurnDisplayContent([{ lastCorrelationId: "corr-1" }]);
  const userHash = hashTurnContent({
    role: "user",
    text: "hello there",
    blockKind: "text",
    toolName: null,
  });
  assert.deepEqual(result.get(userHash), {
    textPreview: "hello there",
    blockKind: "text",
    toolName: null,
  });
});

test("resolveTurnDisplayContent resolves tool_use/tool_result shape, full and untruncated", () => {
  const bigArgs = JSON.stringify({ path: "/tmp/big.md", content: "line\n".repeat(2000) });
  insertCallLog({ id: "log-2", correlationId: "corr-2", artifactRelPath: "2026-01-01/log-2.json" });
  writeArtifact("2026-01-01/log-2.json", {
    input: [{ type: "function_call", name: "write", call_id: "c1", arguments: bigArgs }],
  });

  const result = resolveTurnDisplayContent([{ lastCorrelationId: "corr-2" }]);
  const hash = hashTurnContent({
    role: "tool",
    text: bigArgs,
    blockKind: "tool_use",
    toolName: "write",
  });
  const content = result.get(hash);
  assert.equal(content?.blockKind, "tool_use");
  assert.equal(content?.toolName, "write");
  // No 8000-char truncation anymore -- the full raw arguments string survives.
  assert.equal(content?.textPreview, bigArgs);
  assert.ok(content!.textPreview.length > 8000);
});

test("resolveTurnDisplayContent groups nodes by correlation id, reading each artifact once", () => {
  insertCallLog({ id: "log-3", correlationId: "corr-3", artifactRelPath: "2026-01-01/log-3.json" });
  writeArtifact("2026-01-01/log-3.json", {
    messages: [
      { role: "user", content: "a" },
      { role: "assistant", content: "b" },
      { role: "user", content: "c" },
    ],
  });

  const result = resolveTurnDisplayContent([
    { lastCorrelationId: "corr-3" },
    { lastCorrelationId: "corr-3" },
    { lastCorrelationId: "corr-3" },
  ]);

  for (const [role, text] of [
    ["user", "a"],
    ["assistant", "b"],
    ["user", "c"],
  ] as const) {
    const hash = hashTurnContent({ role, text, blockKind: "text", toolName: null });
    assert.equal(result.get(hash)?.textPreview, text);
  }
});

test("resolveTurnDisplayContent skips nodes with no correlation id without throwing", () => {
  const result = resolveTurnDisplayContent([{ lastCorrelationId: null }]);
  assert.equal(result.size, 0);
});

test("resolveTurnDisplayContent omits content for an unresolvable correlation id (missing call_logs row, purged artifact, or no pipeline captured)", () => {
  const missingRow = resolveTurnDisplayContent([{ lastCorrelationId: "corr-does-not-exist" }]);
  assert.equal(missingRow.size, 0);

  insertCallLog({ id: "log-4", correlationId: "corr-4", artifactRelPath: null });
  const noArtifact = resolveTurnDisplayContent([{ lastCorrelationId: "corr-4" }]);
  assert.equal(noArtifact.size, 0);

  insertCallLog({
    id: "log-5",
    correlationId: "corr-5",
    artifactRelPath: "2026-01-01/does-not-exist.json",
  });
  const missingFile = resolveTurnDisplayContent([{ lastCorrelationId: "corr-5" }]);
  assert.equal(missingFile.size, 0);
});

test("resolveTurnDisplayContent reads turns from top-level requestBody when detailed pipeline logging is off (#20623)", () => {
  insertCallLog({ id: "log-6", correlationId: "corr-6", artifactRelPath: "2026-01-01/log-6.json" });
  const absPath = path.join(TEST_DATA_DIR, "call_logs", "2026-01-01/log-6.json");
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  fs.writeFileSync(
    absPath,
    JSON.stringify({
      schemaVersion: 5,
      requestBody: {
        messages: [{ role: "user", content: "top-level request turn" }],
      },
      responseBody: null,
      error: null,
    })
  );

  const result = resolveTurnDisplayContent([{ lastCorrelationId: "corr-6" }]);
  const userHash = hashTurnContent({
    role: "user",
    text: "top-level request turn",
    blockKind: "text",
    toolName: null,
  });
  assert.deepEqual(result.get(userHash), {
    textPreview: "top-level request turn",
    blockKind: "text",
    toolName: null,
  });
});

test("resolveTurnDisplayContent prefers the pipeline body over a whole-body requestBody summary (#20623)", () => {
  insertCallLog({ id: "log-7", correlationId: "corr-7", artifactRelPath: "2026-01-01/log-7.json" });
  const absPath = path.join(TEST_DATA_DIR, "call_logs", "2026-01-01/log-7.json");
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  fs.writeFileSync(
    absPath,
    JSON.stringify({
      schemaVersion: 5,
      // truncateForLog replaces a body over CHAT_LOG_MAX_BODY_KB with a summary that has no turns.
      requestBody: { _truncated: true, _originalBytes: 2_000_000, model: "m", messageCount: 1 },
      responseBody: null,
      error: null,
      pipeline: {
        clientRawRequest: { body: { messages: [{ role: "user", content: "large request turn" }] } },
      },
    })
  );

  const result = resolveTurnDisplayContent([{ lastCorrelationId: "corr-7" }]);
  const userHash = hashTurnContent({
    role: "user",
    text: "large request turn",
    blockKind: "text",
    toolName: null,
  });
  assert.deepEqual(result.get(userHash), {
    textPreview: "large request turn",
    blockKind: "text",
    toolName: null,
  });
});

function writeBareArtifact(relPath: string, requestBody: unknown, responseBody: unknown) {
  const absPath = path.join(TEST_DATA_DIR, "call_logs", relPath);
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  fs.writeFileSync(
    absPath,
    JSON.stringify({ schemaVersion: 5, requestBody, responseBody, error: null })
  );
}

test("resolveTurnDisplayContent resolves assistant turns from top-level responseBody when the pipeline is absent (Responses shape, #20988)", () => {
  insertCallLog({ id: "log-8", correlationId: "corr-8", artifactRelPath: "2026-01-01/log-8.json" });
  writeBareArtifact(
    "2026-01-01/log-8.json",
    { input: [{ role: "user", content: "hi" }] },
    {
      output: [
        {
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text: "hello there" }],
        },
      ],
    }
  );

  const result = resolveTurnDisplayContent([{ lastCorrelationId: "corr-8" }]);
  const assistantHash = hashTurnContent({
    role: "assistant",
    text: "hello there",
    blockKind: "text",
    toolName: null,
  });
  assert.deepEqual(result.get(assistantHash), {
    textPreview: "hello there",
    blockKind: "text",
    toolName: null,
  });
  const userHash = hashTurnContent({ role: "user", text: "hi", blockKind: "text", toolName: null });
  assert.equal(result.get(userHash)?.textPreview, "hi");
});

test("resolveTurnDisplayContent resolves assistant text and tool_calls from responseBody choices[].message when the pipeline is absent (#20988)", () => {
  insertCallLog({ id: "log-9", correlationId: "corr-9", artifactRelPath: "2026-01-01/log-9.json" });
  const args = JSON.stringify({ path: "/tmp/a.md" });
  writeBareArtifact(
    "2026-01-01/log-9.json",
    { messages: [{ role: "user", content: "read it" }] },
    {
      choices: [
        { message: { role: "assistant", content: "reading now" } },
        {
          message: {
            role: "assistant",
            content: null,
            tool_calls: [
              { id: "c1", type: "function", function: { name: "read", arguments: args } },
            ],
          },
        },
      ],
    }
  );

  const result = resolveTurnDisplayContent([{ lastCorrelationId: "corr-9" }]);
  const textHash = hashTurnContent({
    role: "assistant",
    text: "reading now",
    blockKind: "text",
    toolName: null,
  });
  assert.equal(result.get(textHash)?.textPreview, "reading now");
  const toolHash = hashTurnContent({
    role: "tool",
    text: args,
    blockKind: "tool_use",
    toolName: "read",
  });
  assert.equal(result.get(toolHash)?.toolName, "read");
});
