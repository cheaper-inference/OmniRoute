#!/usr/bin/env node
/**
 * A fake `mcode acp` agent for the shared-agent tests.
 *
 * It speaks the Agent Client Protocol: it answers `initialize`, opens a
 * session, and streams one assistant message back as `session/update`
 * notifications.
 */
import { createInterface } from "node:readline";

const assistantText = process.env.FAKE_ACP_TEXT || "works";
let sessionCounter = 0;
const failWith = process.env.FAKE_ACP_FAIL || "";

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
    send({ jsonrpc: "2.0", id, result: { protocolVersion: 1, agentCapabilities: {} } });
    return;
  }
  if (message.method === "session/new") {
    sessionCounter += 1;
    send({ jsonrpc: "2.0", id, result: { sessionId: `fake-session-${sessionCounter}` } });
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
    send({
      jsonrpc: "2.0",
      method: "session/update",
      params: {
        sessionId,
        update: {
          sessionUpdate: "agent_message_chunk",
          content: { type: "text", text: assistantText },
        },
      },
    });
    send({ jsonrpc: "2.0", id, result: { stopReason: "end_turn" } });
    return;
  }
  send({ jsonrpc: "2.0", id, result: {} });
});

rl.on("close", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
process.on("SIGINT", () => process.exit(0));
