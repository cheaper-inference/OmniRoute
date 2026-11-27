// tests/launch-smoke/mockUpstream.mjs: a tiny OpenAI-compatible upstream for the live launch smoke.
// Node built-ins only. Any bearer is accepted. Answers every completion with OMNI-SMOKE-OK.

import http from "node:http";

export const MOCK_REPLY_TEXT = "OMNI-SMOKE-OK";
export const DEFAULT_MOCK_MODELS = ["smoke-large-1", "smoke-large-2", "smoke-large-3"];
const CONTEXT_LENGTH = 200000;
const USAGE = { prompt_tokens: 11, completion_tokens: 3, total_tokens: 14 };

function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", () => resolve(""));
  });
}

function sendJson(res, status, body) {
  const text = JSON.stringify(body);
  res.writeHead(status, {
    "content-type": "application/json",
    "content-length": Buffer.byteLength(text),
  });
  res.end(text);
}

function sse(res, events) {
  res.writeHead(200, {
    "content-type": "text/event-stream",
    "cache-control": "no-cache",
    connection: "keep-alive",
  });
  for (const e of events) {
    if (e.event) res.write(`event: ${e.event}\n`);
    res.write(`data: ${typeof e.data === "string" ? e.data : JSON.stringify(e.data)}\n\n`);
  }
  res.end();
}

function chatCompletion(model, id) {
  return {
    id,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      { index: 0, message: { role: "assistant", content: MOCK_REPLY_TEXT }, finish_reason: "stop" },
    ],
    usage: USAGE,
  };
}

function chatChunks(model, id) {
  const base = {
    id,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
  };
  return [
    {
      data: {
        ...base,
        choices: [{ index: 0, delta: { role: "assistant", content: "" }, finish_reason: null }],
      },
    },
    {
      data: {
        ...base,
        choices: [{ index: 0, delta: { content: MOCK_REPLY_TEXT }, finish_reason: null }],
      },
    },
    { data: { ...base, choices: [{ index: 0, delta: {}, finish_reason: "stop" }] } },
    { data: { ...base, choices: [], usage: USAGE } },
    { data: "[DONE]" },
  ];
}

function responsesObject(model, id, status = "completed") {
  return {
    id,
    object: "response",
    created_at: Math.floor(Date.now() / 1000),
    status,
    model,
    output:
      status === "completed"
        ? [
            {
              id: `msg_${id}`,
              type: "message",
              role: "assistant",
              status: "completed",
              content: [{ type: "output_text", text: MOCK_REPLY_TEXT, annotations: [] }],
            },
          ]
        : [],
    usage: { input_tokens: 11, output_tokens: 3, total_tokens: 14 },
  };
}

function responsesEvents(model, id) {
  const msgId = `msg_${id}`;
  const part = { type: "output_text", text: "", annotations: [] };
  return [
    {
      event: "response.created",
      data: { type: "response.created", response: responsesObject(model, id, "in_progress") },
    },
    {
      event: "response.output_item.added",
      data: {
        type: "response.output_item.added",
        output_index: 0,
        item: { id: msgId, type: "message", role: "assistant", status: "in_progress", content: [] },
      },
    },
    {
      event: "response.content_part.added",
      data: {
        type: "response.content_part.added",
        item_id: msgId,
        output_index: 0,
        content_index: 0,
        part,
      },
    },
    {
      event: "response.output_text.delta",
      data: {
        type: "response.output_text.delta",
        item_id: msgId,
        output_index: 0,
        content_index: 0,
        delta: MOCK_REPLY_TEXT,
      },
    },
    {
      event: "response.output_text.done",
      data: {
        type: "response.output_text.done",
        item_id: msgId,
        output_index: 0,
        content_index: 0,
        text: MOCK_REPLY_TEXT,
      },
    },
    {
      event: "response.content_part.done",
      data: {
        type: "response.content_part.done",
        item_id: msgId,
        output_index: 0,
        content_index: 0,
        part: { ...part, text: MOCK_REPLY_TEXT },
      },
    },
    {
      event: "response.output_item.done",
      data: {
        type: "response.output_item.done",
        output_index: 0,
        item: responsesObject(model, id).output[0],
      },
    },
    {
      event: "response.completed",
      data: { type: "response.completed", response: responsesObject(model, id) },
    },
  ];
}

/**
 * @param {{ models?: string[] }} [opts]
 * @returns {Promise<{ url: string, port: number, requests: object[], close: () => Promise<void> }>}
 */
export async function startMockUpstream({ models } = {}) {
  const ids = models && models.length ? models : DEFAULT_MOCK_MODELS;
  const requests = [];
  let counter = 0;

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || "/", "http://127.0.0.1");
    const path = url.pathname.replace(/^\/v1(?=\/)/, "");
    const raw = req.method === "POST" ? await readBody(req) : "";
    let body = null;
    if (raw) {
      try {
        body = JSON.parse(raw);
      } catch {
        body = raw;
      }
    }
    requests.push({
      method: req.method,
      path: url.pathname,
      query: url.search,
      headers: { ...req.headers },
      body,
      at: Date.now(),
    });

    try {
      if (req.method === "GET" && path === "/models") {
        return sendJson(res, 200, {
          object: "list",
          data: ids.map((id) => ({
            id,
            object: "model",
            created: 1700000000,
            owned_by: "smoke-mock",
            context_length: CONTEXT_LENGTH,
            max_context_length: CONTEXT_LENGTH,
            context_window: CONTEXT_LENGTH,
          })),
        });
      }
      const model = (body && typeof body === "object" && body.model) || ids[0];
      const id = `mock-${++counter}`;
      if (req.method === "POST" && path === "/chat/completions") {
        if (body && body.stream) return sse(res, chatChunks(model, `chatcmpl-${id}`));
        return sendJson(res, 200, chatCompletion(model, `chatcmpl-${id}`));
      }
      if (req.method === "POST" && path === "/responses") {
        if (body && body.stream) return sse(res, responsesEvents(model, `resp_${id}`));
        return sendJson(res, 200, responsesObject(model, `resp_${id}`));
      }
      return sendJson(res, 404, {
        error: {
          message: `mock upstream: no route ${req.method} ${url.pathname}`,
          type: "not_found",
        },
      });
    } catch (err) {
      if (!res.headersSent) sendJson(res, 500, { error: { message: String(err?.message || err) } });
      else res.end();
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const { port } = server.address();
  return {
    url: `http://127.0.0.1:${port}/v1`,
    port,
    requests,
    models: ids,
    close() {
      return new Promise((resolve) => {
        server.closeAllConnections?.();
        server.close(() => resolve());
      });
    },
  };
}
