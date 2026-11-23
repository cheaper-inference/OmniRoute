import http from "node:http";
import { randomUUID } from "node:crypto";
import { config, log } from "./config.js";
import { getContext } from "./browser.js";
import { MuseSession } from "./muse.js";

let session = null;
let queue = Promise.resolve();

function enqueue(fn) {
  const run = queue.then(fn, fn);
  queue = run.catch(() => {});
  return run;
}

function lastUserMessage(messages = []) {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const m = messages[i];
    if (!m || m.role !== "user") continue;
    if (typeof m.content === "string") return m.content;
    if (Array.isArray(m.content)) {
      return m.content
        .map((part) => (typeof part === "string" ? part : part?.text || ""))
        .filter(Boolean)
        .join("\n");
    }
  }
  return "";
}

function approxTokens(text) {
  return Math.max(1, Math.round(String(text || "").length / 4));
}

async function sendToMuse(prompt) {
  return enqueue(async () => {
    const context = await getContext();
    if (!session) session = new MuseSession(context);
    return session.send(prompt);
  });
}

function json(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "content-type": "application/json",
    "content-length": Buffer.byteLength(body),
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 8 * 1024 * 1024) {
        reject(new Error("body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(new Error(`invalid JSON body: ${err.message}`));
      }
    });
    req.on("error", reject);
  });
}

async function handleChat(req, res) {
  const body = await readBody(req);
  const prompt = lastUserMessage(body.messages);
  if (!prompt.trim())
    return json(res, 400, { error: { message: "no user message", type: "invalid_request_error" } });

  log("chat request", JSON.stringify(prompt.slice(0, 120)));
  let reply;
  try {
    reply = await sendToMuse(prompt);
  } catch (err) {
    log("chat failed:", err.message);
    return json(res, 502, { error: { message: err.message, type: "upstream_error" } });
  }

  const id = `chatcmpl-${randomUUID()}`;
  const created = Math.floor(Date.now() / 1000);
  const model = body.model || config.modelId;
  const usage = {
    prompt_tokens: approxTokens(prompt),
    completion_tokens: approxTokens(reply),
    total_tokens: approxTokens(prompt) + approxTokens(reply),
  };

  if (!body.stream) {
    return json(res, 200, {
      id,
      object: "chat.completion",
      created,
      model,
      choices: [
        { index: 0, message: { role: "assistant", content: reply }, finish_reason: "stop" },
      ],
      usage,
    });
  }

  res.writeHead(200, {
    "content-type": "text/event-stream; charset=utf-8",
    "cache-control": "no-cache",
    connection: "keep-alive",
  });

  const chunk = (delta, finish = null) => {
    res.write(
      `data: ${JSON.stringify({
        id,
        object: "chat.completion.chunk",
        created,
        model,
        choices: [{ index: 0, delta, finish_reason: finish }],
      })}\n\n`
    );
  };

  chunk({ role: "assistant", content: "" });
  const step = 40;
  for (let i = 0; i < reply.length; i += step) {
    chunk({ content: reply.slice(i, i + step) });
  }
  chunk({}, "stop");
  res.write(
    `data: ${JSON.stringify({ id, object: "chat.completion.chunk", created, model, choices: [], usage })}\n\n`
  );
  res.write("data: [DONE]\n\n");
  res.end();
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  try {
    if (req.method === "GET" && (url.pathname === "/health" || url.pathname === "/")) {
      return json(res, 200, { ok: true, model: config.modelId });
    }
    if (req.method === "GET" && url.pathname === "/debug") {
      const state = await enqueue(async () => {
        const context = await getContext();
        if (!session) session = new MuseSession(context);
        return session.debugState();
      });
      return json(res, 200, state);
    }
    if (req.method === "GET" && url.pathname === "/v1/models") {
      return json(res, 200, {
        object: "list",
        data: [
          {
            id: config.modelId,
            object: "model",
            created: Math.floor(Date.now() / 1000),
            owned_by: "muse",
          },
        ],
      });
    }
    if (req.method === "POST" && url.pathname === "/v1/chat/completions") {
      return await handleChat(req, res);
    }
    return json(res, 404, { error: { message: "not found", type: "invalid_request_error" } });
  } catch (err) {
    log("request error:", err.message);
    if (!res.headersSent) json(res, 500, { error: { message: err.message, type: "server_error" } });
    else res.end();
  }
});

server.listen(config.port, "0.0.0.0", () => {
  log(`muse-bridge listening on :${config.port} model=${config.modelId}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    log("shutting down");
    server.close(() => process.exit(0));
  });
}
