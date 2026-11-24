// Smoke front for the shared stub gateway (tests/helpers/launch/stubGateway.mjs, not edited).
//
// The helper stub owns /api/monitoring/health, /api/launch/* and /v1/models (mint, PATCH,
// usage, revoke, view-filtered catalog). This front listens on its own port and:
//   - answers inference routes itself with the canned text OMNI-SMOKE-OK (chat, messages,
//     responses, and Gemini /v1beta/models/*:generateContent|streamGenerateContent|countTokens),
//     validating olx_ tokens against the helper's live sessions;
//   - records every request (method, path, headers, body, auth) in `requests`, and also pushes
//     inference records into the helper's `requests` so its /usage endpoint counts them;
//   - proxies everything else to the helper stub verbatim.
// Requires the tsx loader (the helper imports .ts schemas).

import http from "node:http";

import { DEFAULT_MODELS, startStubGateway } from "../helpers/launch/stubGateway.mjs";

export const SMOKE_TEXT = "OMNI-SMOKE-OK";

/** Fixture rows: the helper defaults plus a gemini-shaped id (all with context windows). */
export const SMOKE_MODELS = [
  ...DEFAULT_MODELS,
  {
    id: "gemini/gemini-2.5-pro",
    object: "model",
    owned_by: "google",
    display_name: "Gemini 2.5 Pro",
    context_length: 1048576,
    max_output_tokens: 65536,
    capabilities: { tool_calling: true, reasoning: true, vision: true },
  },
];

const INFERENCE = {
  "/v1/chat/completions": "chat",
  "/chat/completions": "chat",
  "/v1/messages": "messages",
  "/v1/responses": "responses",
  "/responses": "responses",
};

const GEMINI_RE = /^\/(?:v1beta|v1)\/models\/([^/:]+(?:\/[^/:]+)*):([A-Za-z]+)$/;

function sendJson(res, status, payload) {
  const text = JSON.stringify(payload);
  res.writeHead(status, {
    "content-type": "application/json",
    "content-length": Buffer.byteLength(text),
  });
  res.end(text);
}

function sse(res, events) {
  res.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-cache" });
  for (const ev of events) {
    res.write((ev.event ? `event: ${ev.event}\n` : "") + `data: ${ev.data}\n\n`);
  }
  res.end();
}

const j = JSON.stringify;

function chatEvents(model) {
  const base = { id: "chatcmpl-smoke", object: "chat.completion.chunk", created: 1, model };
  const chunk = (delta, finish, extra) =>
    j({ ...base, choices: [{ index: 0, delta, finish_reason: finish }], ...(extra || {}) });
  return [
    { data: chunk({ role: "assistant", content: "" }, null) },
    { data: chunk({ content: SMOKE_TEXT }, null) },
    {
      data: chunk({}, "stop", {
        usage: { prompt_tokens: 3, completion_tokens: 1, total_tokens: 4 },
      }),
    },
    { data: "[DONE]" },
  ];
}

function chatBody(model) {
  return {
    id: "chatcmpl-smoke",
    object: "chat.completion",
    created: 1,
    model,
    choices: [
      { index: 0, message: { role: "assistant", content: SMOKE_TEXT }, finish_reason: "stop" },
    ],
    usage: { prompt_tokens: 3, completion_tokens: 1, total_tokens: 4 },
  };
}

function messagesEvents(model) {
  return [
    {
      event: "message_start",
      data: j({
        type: "message_start",
        message: {
          id: "msg_smoke",
          type: "message",
          role: "assistant",
          model,
          content: [],
          stop_reason: null,
          stop_sequence: null,
          usage: { input_tokens: 3, output_tokens: 0 },
        },
      }),
    },
    {
      event: "content_block_start",
      data: j({ type: "content_block_start", index: 0, content_block: { type: "text", text: "" } }),
    },
    {
      event: "content_block_delta",
      data: j({
        type: "content_block_delta",
        index: 0,
        delta: { type: "text_delta", text: SMOKE_TEXT },
      }),
    },
    { event: "content_block_stop", data: j({ type: "content_block_stop", index: 0 }) },
    {
      event: "message_delta",
      data: j({
        type: "message_delta",
        delta: { stop_reason: "end_turn", stop_sequence: null },
        usage: { output_tokens: 1 },
      }),
    },
    { event: "message_stop", data: j({ type: "message_stop" }) },
  ];
}

function messagesBody(model) {
  return {
    id: "msg_smoke",
    type: "message",
    role: "assistant",
    model,
    content: [{ type: "text", text: SMOKE_TEXT }],
    stop_reason: "end_turn",
    stop_sequence: null,
    usage: { input_tokens: 3, output_tokens: 1 },
  };
}

function responsesObject(model, status) {
  const done = status === "completed";
  return {
    id: "resp_smoke",
    object: "response",
    created_at: 1,
    status,
    model,
    output: done
      ? [
          {
            id: "msg_smoke",
            type: "message",
            status: "completed",
            role: "assistant",
            content: [{ type: "output_text", text: SMOKE_TEXT, annotations: [] }],
          },
        ]
      : [],
    usage: done
      ? {
          input_tokens: 3,
          output_tokens: 1,
          total_tokens: 4,
          input_tokens_details: { cached_tokens: 0 },
          output_tokens_details: { reasoning_tokens: 0 },
        }
      : null,
  };
}

function responsesEvents(model) {
  const item = {
    id: "msg_smoke",
    type: "message",
    status: "in_progress",
    role: "assistant",
    content: [],
  };
  const part = { type: "output_text", text: "", annotations: [] };
  return [
    {
      event: "response.created",
      data: j({
        type: "response.created",
        sequence_number: 0,
        response: responsesObject(model, "in_progress"),
      }),
    },
    {
      event: "response.in_progress",
      data: j({
        type: "response.in_progress",
        sequence_number: 1,
        response: responsesObject(model, "in_progress"),
      }),
    },
    {
      event: "response.output_item.added",
      data: j({ type: "response.output_item.added", sequence_number: 2, output_index: 0, item }),
    },
    {
      event: "response.content_part.added",
      data: j({
        type: "response.content_part.added",
        sequence_number: 3,
        item_id: "msg_smoke",
        output_index: 0,
        content_index: 0,
        part,
      }),
    },
    {
      event: "response.output_text.delta",
      data: j({
        type: "response.output_text.delta",
        sequence_number: 4,
        item_id: "msg_smoke",
        output_index: 0,
        content_index: 0,
        delta: SMOKE_TEXT,
      }),
    },
    {
      event: "response.output_text.done",
      data: j({
        type: "response.output_text.done",
        sequence_number: 5,
        item_id: "msg_smoke",
        output_index: 0,
        content_index: 0,
        text: SMOKE_TEXT,
      }),
    },
    {
      event: "response.content_part.done",
      data: j({
        type: "response.content_part.done",
        sequence_number: 6,
        item_id: "msg_smoke",
        output_index: 0,
        content_index: 0,
        part: { ...part, text: SMOKE_TEXT },
      }),
    },
    {
      event: "response.output_item.done",
      data: j({
        type: "response.output_item.done",
        sequence_number: 7,
        output_index: 0,
        item: responsesObject(model, "completed").output[0],
      }),
    },
    {
      event: "response.completed",
      data: j({
        type: "response.completed",
        sequence_number: 8,
        response: responsesObject(model, "completed"),
      }),
    },
  ];
}

function geminiBody(model) {
  return {
    candidates: [
      {
        content: { role: "model", parts: [{ text: SMOKE_TEXT }] },
        finishReason: "STOP",
        index: 0,
      },
    ],
    usageMetadata: { promptTokenCount: 3, candidatesTokenCount: 1, totalTokenCount: 4 },
    modelVersion: model,
  };
}

/** Bearer, x-api-key or x-goog-api-key (or ?key=), whichever the tool sent. */
export function credentialOf(headers, query) {
  const m = /^Bearer\s+(.+)$/i.exec(String(headers.authorization || ""));
  if (m) return { header: "authorization", value: m[1].trim() };
  if (headers["x-api-key"]) return { header: "x-api-key", value: String(headers["x-api-key"]) };
  if (headers["x-goog-api-key"]) {
    return { header: "x-goog-api-key", value: String(headers["x-goog-api-key"]) };
  }
  if (query && query.key) return { header: "?key", value: String(query.key) };
  return null;
}

/**
 * @param {{ parentKey?: string }} [options]
 * @returns {Promise<{ url, port, requests, inference, inner, close }>}
 */
export async function startSmokeStub(options = {}) {
  const inner = await startStubGateway({ models: SMOKE_MODELS, ...options });
  const requests = [];
  const sockets = new Set();

  const liveToken = (token) => {
    for (const s of inner.sessions.values()) if (s.token === token && !s.revoked) return s;
    return null;
  };

  const server = http.createServer((req, res) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const url = new URL(req.url, "http://127.0.0.1");
      const headers = {};
      for (const [k, v] of Object.entries(req.headers)) headers[k.toLowerCase()] = v;
      const raw = Buffer.concat(chunks);
      let body;
      if (raw.length) {
        const text = raw.toString("utf8");
        try {
          body = JSON.parse(text);
        } catch {
          body = text;
        }
      }
      const query = Object.fromEntries(url.searchParams);
      const cred = credentialOf(headers, query);
      const path = url.pathname;
      const gem = GEMINI_RE.exec(path);
      const kind = INFERENCE[path] || (gem ? `gemini:${gem[2]}` : null);
      const record = {
        at: Date.now(),
        method: req.method,
        path,
        query,
        headers,
        body,
        cred,
        auth: cred?.value,
        kind,
        model: kind ? (gem ? decodeURIComponent(gem[1]) : body?.model) : undefined,
      };
      requests.push(record);

      if (req.method === "POST" && kind) {
        const token = cred?.value;
        if (token && token.startsWith("olx_") && !liveToken(token)) {
          return sendJson(res, 401, { error: { message: "revoked or unknown session token" } });
        }
        // Make the helper's /usage endpoint count this request.
        // The helper counts only its own completion paths, so gemini calls are filed under
        // /v1/chat/completions with the model from the URL (usage counts only, not the log).
        if (token && (INFERENCE[path] || (gem && gem[2] !== "countTokens"))) {
          const usagePath = INFERENCE[path]
            ? "/v1" + path.replace(/^\/v1/, "")
            : "/v1/chat/completions";
          const usageBody = gem ? { model: decodeURIComponent(gem[1]) } : body;
          inner.requests.push({
            method: "POST",
            path: usagePath,
            headers,
            body: usageBody,
            auth: token,
          });
        }
        const model = record.model || "stub-model";
        if (gem) {
          const action = gem[2];
          if (action === "countTokens") return sendJson(res, 200, { totalTokens: 3 });
          if (action === "streamGenerateContent") {
            const data = j(geminiBody(model));
            if (query.alt === "sse") return sse(res, [{ data }]);
            return sendJson(res, 200, [geminiBody(model)]);
          }
          return sendJson(res, 200, geminiBody(model));
        }
        const stream = body && typeof body === "object" && body.stream === true;
        if (INFERENCE[path] === "chat")
          return stream ? sse(res, chatEvents(model)) : sendJson(res, 200, chatBody(model));
        if (INFERENCE[path] === "messages") {
          return stream ? sse(res, messagesEvents(model)) : sendJson(res, 200, messagesBody(model));
        }
        return stream
          ? sse(res, responsesEvents(model))
          : sendJson(res, 200, responsesObject(model, "completed"));
      }
      if (req.method === "POST" && /\/v1\/messages\/count_tokens$/.test(path)) {
        return sendJson(res, 200, { input_tokens: 3 });
      }
      if (gem && req.method === "GET") {
        return sendJson(res, 200, {
          name: `models/${gem[1]}`,
          inputTokenLimit: 1048576,
          outputTokenLimit: 65536,
        });
      }
      if (req.method === "GET" && /^\/v1beta\/models\/?$/.test(path)) {
        return sendJson(res, 200, {
          models: SMOKE_MODELS.filter((m) => m.context_length).map((m) => ({
            name: `models/${m.id}`,
            displayName: m.display_name,
            inputTokenLimit: m.context_length,
            supportedGenerationMethods: ["generateContent", "streamGenerateContent", "countTokens"],
          })),
        });
      }

      // Proxy to the helper stub.
      const fwdHeaders = { ...req.headers, host: `127.0.0.1:${inner.port}` };
      delete fwdHeaders["content-length"];
      if (raw.length) fwdHeaders["content-length"] = String(raw.length);
      const preq = http.request(
        {
          host: "127.0.0.1",
          port: inner.port,
          method: req.method,
          path: req.url,
          headers: fwdHeaders,
        },
        (pres) => {
          record.status = pres.statusCode;
          res.writeHead(pres.statusCode || 502, pres.headers);
          pres.pipe(res);
        }
      );
      preq.on("error", (err) => sendJson(res, 502, { error: { message: String(err.message) } }));
      if (raw.length) preq.write(raw);
      preq.end();
    });
  });

  server.on("connection", (sock) => {
    sockets.add(sock);
    sock.on("close", () => sockets.delete(sock));
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const port = server.address().port;
  return {
    url: `http://127.0.0.1:${port}`,
    port,
    requests,
    inner,
    get inference() {
      return requests.filter(
        (r) => r.method === "POST" && r.kind && !String(r.kind).endsWith("countTokens")
      );
    },
    async close() {
      await new Promise((resolve) => {
        server.close(() => resolve());
        if (typeof server.closeAllConnections === "function") server.closeAllConnections();
        for (const s of sockets) s.destroy();
      });
      await inner.close();
    },
  };
}
