// Stub OmniRoute gateway for launcher integration tests (node built-ins only).
import http from "node:http";
import crypto from "node:crypto";

// The SAME Zod schemas the G1 routes use, so schema drift fails core tests. schema.ts is kept
// free of server imports (launchRouteHelpers.ts opens the DB at load time) for exactly this.
import { launchMintSchema } from "../../../src/app/api/launch/sessions/schema.ts";
import { launchSessionPatchSchema } from "../../../src/shared/validation/launchView.ts";

const CAPS = { tool_calling: true };

export const DEFAULT_MODELS = [
  {
    id: "anthropic/claude-sonnet-4-6",
    object: "model",
    owned_by: "anthropic",
    display_name: "Claude Sonnet 4.6",
    context_length: 200000,
    max_output_tokens: 64000,
    capabilities: { tool_calling: true, reasoning: true, vision: true },
  },
  {
    id: "openai/gpt-5.2",
    object: "model",
    owned_by: "openai",
    display_name: "GPT-5.2",
    context_length: 400000,
    max_output_tokens: 128000,
    capabilities: { tool_calling: true, reasoning: true },
  },
  {
    id: "auto/best-coding",
    object: "model",
    owned_by: "combo",
    display_name: "Best Coding",
    context_length: 200000,
    capabilities: { ...CAPS },
  },
  {
    id: "small/ctx-32k",
    object: "model",
    owned_by: "small",
    display_name: "Small 32k",
    context_length: 32768,
    capabilities: { ...CAPS },
  },
  {
    id: "plain/no-tools",
    object: "model",
    owned_by: "plain",
    display_name: "Plain",
    context_length: 128000,
    capabilities: { tool_calling: false },
  },
  { id: "text-embedding-3", object: "model", type: "embedding", owned_by: "openai" },
];

const ALPHABET = "abcdefghijklmnopqrstuvwxyz234567";

function randomChars(n) {
  const bytes = crypto.randomBytes(n);
  let out = "";
  for (let i = 0; i < n; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

function send(res, status, payload) {
  if (payload === undefined) {
    res.writeHead(status);
    res.end();
    return;
  }
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

function chatStream(model) {
  const base = { id: "chatcmpl-stub", object: "chat.completion.chunk", created: 1, model };
  const chunk = (delta, finish, extra) =>
    JSON.stringify({
      ...base,
      choices: [{ index: 0, delta, finish_reason: finish }],
      ...(extra || {}),
    });
  return [
    { data: chunk({ role: "assistant", content: "" }, null) },
    { data: chunk({ content: "OK" }, null) },
    {
      data: chunk({}, "stop", {
        usage: { prompt_tokens: 3, completion_tokens: 1, total_tokens: 4 },
      }),
    },
    { data: "[DONE]" },
  ];
}

function messagesStream(model) {
  const j = JSON.stringify;
  return [
    {
      event: "message_start",
      data: j({
        type: "message_start",
        message: {
          id: "msg_stub",
          type: "message",
          role: "assistant",
          model,
          content: [],
          stop_reason: null,
          usage: { input_tokens: 3, output_tokens: 0 },
        },
      }),
    },
    {
      event: "content_block_start",
      data: j({
        type: "content_block_start",
        index: 0,
        content_block: { type: "text", text: "" },
      }),
    },
    {
      event: "content_block_delta",
      data: j({
        type: "content_block_delta",
        index: 0,
        delta: { type: "text_delta", text: "OK" },
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

function responsesObject(model, status) {
  return {
    id: "resp_stub",
    object: "response",
    created_at: 1,
    status,
    model,
    output:
      status === "completed"
        ? [
            {
              id: "msg_stub",
              type: "message",
              status: "completed",
              role: "assistant",
              content: [{ type: "output_text", text: "OK", annotations: [] }],
            },
          ]
        : [],
    usage:
      status === "completed"
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

function responsesStream(model) {
  const j = JSON.stringify;
  return [
    {
      event: "response.created",
      data: j({ type: "response.created", response: responsesObject(model, "in_progress") }),
    },
    {
      event: "response.output_text.delta",
      data: j({
        type: "response.output_text.delta",
        item_id: "msg_stub",
        output_index: 0,
        content_index: 0,
        delta: "OK",
      }),
    },
    {
      event: "response.output_text.done",
      data: j({
        type: "response.output_text.done",
        item_id: "msg_stub",
        output_index: 0,
        content_index: 0,
        text: "OK",
      }),
    },
    {
      event: "response.completed",
      data: j({ type: "response.completed", response: responsesObject(model, "completed") }),
    },
  ];
}

function plainBody(kind, model) {
  if (kind === "chat") {
    return {
      id: "chatcmpl-stub",
      object: "chat.completion",
      created: 1,
      model,
      choices: [{ index: 0, message: { role: "assistant", content: "OK" }, finish_reason: "stop" }],
      usage: { prompt_tokens: 3, completion_tokens: 1, total_tokens: 4 },
    };
  }
  if (kind === "messages") {
    return {
      id: "msg_stub",
      type: "message",
      role: "assistant",
      model,
      content: [{ type: "text", text: "OK" }],
      stop_reason: "end_turn",
      stop_sequence: null,
      usage: { input_tokens: 3, output_tokens: 1 },
    };
  }
  return responsesObject(model, "completed");
}

const COMPLETION_ROUTES = {
  "/v1/chat/completions": "chat",
  "/v1/messages": "messages",
  "/v1/responses": "responses",
};

export async function startStubGateway(options = {}) {
  const state = {
    models: options.models || DEFAULT_MODELS,
    capabilities:
      options.capabilities === undefined
        ? { version: 1, features: ["sessions", "view", "heartbeat", "usage"] }
        : options.capabilities,
  };
  const parentKey = options.parentKey || null;
  const sessionsEnabled = options.sessionsEnabled !== false;
  const healthStatus = options.healthStatus || 200;
  const requests = [];
  const sessions = new Map();
  const sockets = new Set();

  const liveByToken = (token) => {
    for (const s of sessions.values()) if (s.token === token && !s.revoked) return s;
    return null;
  };

  // Returns true when the bearer is acceptable for /v1 calls.
  const v1Authorized = (auth) => {
    if (auth && auth.startsWith("olx_")) return Boolean(liveByToken(auth));
    if (parentKey) return auth === parentKey;
    return true;
  };

  const expiresAt = (s) => new Date(Date.now() + s.ttlSec * 1000).toISOString();

  const server = http.createServer((req, res) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const url = new URL(req.url, "http://127.0.0.1");
      const headers = {};
      for (const [k, v] of Object.entries(req.headers)) headers[k.toLowerCase()] = v;
      const raw = Buffer.concat(chunks).toString("utf8");
      let body;
      if (raw) {
        body = raw;
        if (String(headers["content-type"] || "").includes("json")) {
          try {
            body = JSON.parse(raw);
          } catch {
            body = raw;
          }
        }
      }
      const m = /^Bearer\s+(.+)$/i.exec(String(headers.authorization || ""));
      const auth = m ? m[1].trim() : undefined;
      requests.push({
        method: req.method,
        path: url.pathname,
        query: Object.fromEntries(url.searchParams),
        headers,
        body,
        auth,
      });
      try {
        route(req, res, url.pathname, body, auth);
      } catch (err) {
        send(res, 500, { error: { message: String(err && err.message) } });
      }
    });
  });

  const invalid = (res, error) =>
    send(res, 400, { error: { message: error.issues[0]?.message || "invalid request body" } });

  // Mirrors resolveLaunchCaller + callerOwnsSession (launchRouteHelpers.ts): the session's own
  // live token, the parent key the session was minted with, or anonymous (no credential) when
  // the gateway has no parent key. A bad or revoked credential is 401, never downgraded.
  const resolveCaller = (auth) => {
    if (auth) {
      if (auth.startsWith("olx_")) {
        const session = liveByToken(auth);
        return session ? { kind: "session", session } : null;
      }
      return parentKey && auth === parentKey ? { kind: "key" } : null;
    }
    return parentKey ? null : { kind: "anonymous" };
  };
  const callerOwns = (caller, session) => {
    if (caller.kind === "session") return caller.session.id === session.id;
    if (caller.kind === "key") return Boolean(parentKey);
    return !parentKey;
  };

  const notFound = (res) => send(res, 404, { error: { message: "not found" } });
  const unauthorized = (res) => send(res, 401, { error: { message: "unauthorized" } });

  function route(req, res, path, body, auth) {
    const method = req.method;
    if (method === "GET" && path === "/api/monitoring/health") {
      return send(res, healthStatus, { status: "ok" });
    }
    if (method === "GET" && path === "/api/launch/capabilities") {
      if (state.capabilities === null) return notFound(res);
      return send(res, 200, state.capabilities);
    }
    if (path === "/api/launch/sessions" || path.startsWith("/api/launch/sessions/")) {
      if (!sessionsEnabled) return notFound(res);
      return sessionRoute(method, path, body, auth, res);
    }
    if (method === "GET" && path === "/v1/models") {
      if (!v1Authorized(auth)) return unauthorized(res);
      const sess = auth && auth.startsWith("olx_") ? liveByToken(auth) : null;
      const view = sess && sess.view;
      let list = state.models;
      if (view && Array.isArray(view.ids)) {
        const byId = new Map(state.models.map((e) => [e.id, e]));
        list = view.ids.map((id) => byId.get(id)).filter(Boolean);
        if (view.serve && view.serve.shape === "codex") {
          return send(res, 200, {
            models: list.map((e) => ({ slug: e.id, display_name: e.display_name || e.id })),
          });
        }
      }
      return send(res, 200, { object: "list", data: list });
    }
    if (method === "POST" && COMPLETION_ROUTES[path]) {
      if (!v1Authorized(auth)) return unauthorized(res);
      const kind = COMPLETION_ROUTES[path];
      const model = (body && body.model) || "stub-model";
      if (body && body.stream === true) {
        const events =
          kind === "chat"
            ? chatStream(model)
            : kind === "messages"
              ? messagesStream(model)
              : responsesStream(model);
        return sse(res, events);
      }
      return send(res, 200, plainBody(kind, model));
    }
    return notFound(res);
  }

  function sessionRoute(method, path, body, auth, res) {
    if (method === "POST" && path === "/api/launch/sessions") {
      if (parentKey && auth !== parentKey) return unauthorized(res);
      if (options.mintStatus) {
        return send(res, options.mintStatus, { error: { message: "mint failed" } });
      }
      const parsed = launchMintSchema.safeParse(body);
      if (!parsed.success) return invalid(res, parsed.error);
      if (parsed.data.policy !== undefined || parsed.data.mcp !== undefined) {
        return send(res, 400, { error: { message: "policy and mcp blocks are not supported" } });
      }
      const spec = parsed.data;
      const id = randomChars(16);
      const session = {
        id,
        token: `olx_${id}_${randomChars(32)}`,
        tool: spec.tool || spec.toolId,
        sessionTag: spec.sessionTag || `launch:${spec.tool || spec.toolId}:${id}`,
        ttlSec: spec.ttlSec > 0 ? spec.ttlSec : 3600,
        view: spec.view || null,
        heartbeats: 0,
        patches: [],
        revoked: false,
        createdAt: new Date().toISOString(),
      };
      sessions.set(id, session);
      return send(res, 201, {
        sessionId: id,
        token: session.token,
        expiresAt: expiresAt(session),
      });
    }
    const m = /^\/api\/launch\/sessions\/([^/]+)(\/usage)?$/.exec(path);
    if (!m) return notFound(res);
    const caller = resolveCaller(auth);
    if (!caller) return unauthorized(res);
    const session = sessions.get(m[1]);
    if (!session || !callerOwns(caller, session)) return notFound(res);
    if (m[2]) {
      if (method !== "GET") return notFound(res);
      const mine = requests.filter(
        (r) => r.method === "POST" && COMPLETION_ROUTES[r.path] && r.auth === session.token
      );
      const counts = new Map();
      for (const r of mine) {
        const id = (r.body && r.body.model) || "stub-model";
        counts.set(id, (counts.get(id) || 0) + 1);
      }
      return send(res, 200, {
        sessionId: session.id,
        toolId: session.tool,
        startedAt: session.createdAt,
        requests: mine.length,
        errors: 0,
        inputTokens: mine.length * 3,
        outputTokens: mine.length,
        models: [...counts].map(([id, n]) => ({ id, requests: n })),
        fallbacks: 0,
        ...(options.usage || {}),
      });
    }
    if (method !== "PATCH" && method !== "DELETE") return notFound(res);
    if (method === "DELETE") {
      session.revoked = true;
      session.revokedAt = session.revokedAt || new Date().toISOString();
      return send(res, 200, { sessionId: session.id, revoked: true, revokedAt: session.revokedAt });
    }
    if (session.revoked) return notFound(res);
    if (typeof body === "string")
      return send(res, 400, { error: { message: "Invalid JSON body" } });
    const parsed = launchSessionPatchSchema.safeParse(body === undefined ? {} : body);
    if (!parsed.success) return invalid(res, parsed.error);
    const b = parsed.data;
    if (b.view !== undefined) session.view = b.view;
    if (b.heartbeat === true) session.heartbeats += 1;
    session.patches.push(b);
    return send(res, 200, { ok: true, expiresAt: expiresAt(session) });
  }

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
    sessions,
    close() {
      return new Promise((resolve) => {
        server.close(() => resolve());
        if (typeof server.closeAllConnections === "function") server.closeAllConnections();
        for (const s of sockets) s.destroy();
      });
    },
    setModels(entries) {
      state.models = entries;
    },
    setCapabilities(obj) {
      state.capabilities = obj === undefined ? null : obj;
    },
  };
}
