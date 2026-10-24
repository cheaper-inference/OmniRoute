#!/usr/bin/env node
/**
 * A fake `mcode acp` agent for the shared-agent tests.
 *
 * It speaks the Agent Client Protocol: it answers `initialize`, opens a
 * session, and streams one assistant message back as `session/update`
 * notifications.
 *
 * The environment switches make the failure paths reachable from a test:
 *   FAKE_ACP_TEXT            the text of the answer
 *   FAKE_ACP_CHUNKS          how many chunks the answer is split into
 *   FAKE_ACP_FAIL            fail the prompt request with this message
 *   FAKE_ACP_INIT_FAIL       fail the initialize request with this message
 *   FAKE_ACP_SESSION_DELAY_MS  delay the session/new answer
 *   FAKE_ACP_PROMPT_DELAY_MS   delay the prompt answer
 *   FAKE_ACP_PID_FILE        write the pid of this process into this file
 */
import { createInterface } from "node:readline";
import { writeFileSync } from "node:fs";

const assistantText = process.env.FAKE_ACP_TEXT || "works";
const chunkCount = Math.max(1, Number(process.env.FAKE_ACP_CHUNKS || 1));
const failWith = process.env.FAKE_ACP_FAIL || "";
const initFailWith = process.env.FAKE_ACP_INIT_FAIL || "";
const sessionDelayMs = Number(process.env.FAKE_ACP_SESSION_DELAY_MS || 0);
const promptDelayMs = Number(process.env.FAKE_ACP_PROMPT_DELAY_MS || 0);
let sessionCounter = 0;

if (process.env.FAKE_ACP_PID_FILE) {
  try {
    writeFileSync(process.env.FAKE_ACP_PID_FILE, String(process.pid));
  } catch {
    // The test only needs the pid when it exists.
  }
}

function send(payload) {
  process.stdout.write(`${JSON.stringify(payload)}\n`);
}

const rl = createInterface({ input: process.stdin });
rl.on("line", (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  let message;
  try {
    message = JSON.parse(trimmed);
  } catch {
    return;
  }
  const id = message.id;
  if (id === undefined) return;

  if (message.method === "initialize") {
    if (initFailWith) {
      send({ jsonrpc: "2.0", id, error: { code: "agent_error", message: initFailWith } });
      return;
    }
    send({ jsonrpc: "2.0", id, result: { protocolVersion: 1, agentCapabilities: {} } });
    return;
  }
  if (message.method === "session/new") {
    sessionCounter += 1;
    const sessionId = `fake-session-${sessionCounter}`;
    const answer = () => send({ jsonrpc: "2.0", id, result: { sessionId } });
    if (sessionDelayMs > 0) setTimeout(answer, sessionDelayMs);
    else answer();
    return;
  }
  if (message.method === "session/cancel") {
    send({ jsonrpc: "2.0", id, result: {} });
    return;
  }
  if (message.method === "session/prompt") {
    const sessionId = message.params?.sessionId;
    if (failWith) {
      send({ jsonrpc: "2.0", id, error: { code: "agent_error", message: failWith } });
      return;
    }
    const chunks = [];
    const size = Math.max(1, Math.floor(assistantText.length / chunkCount));
    for (let index = 0; index < chunkCount; index += 1) {
      const start = index * size;
      const text =
        index === chunkCount - 1
          ? assistantText.slice(start)
          : assistantText.slice(start, start + size);
      if (text) chunks.push(text);
    }
    const answer = () => {
      for (const text of chunks) {
        send({
          jsonrpc: "2.0",
          method: "session/update",
          params: {
            sessionId,
            update: {
              sessionUpdate: "agent_message_chunk",
              content: { type: "text", text },
            },
          },
        });
      }
      send({ jsonrpc: "2.0", id, result: { stopReason: "end_turn" } });
    };
    if (promptDelayMs > 0) setTimeout(answer, promptDelayMs);
    else answer();
    return;
  }
  send({ jsonrpc: "2.0", id, result: {} });
});

rl.on("close", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
process.on("SIGINT", () => process.exit(0));
