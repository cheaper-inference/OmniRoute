// agy-mcp-server.mjs — the stdio MCP server agy talks to for the client's tools.
//
// Spawned by agy itself: the bridge puts this file behind a `nc` shim on agy's
// PATH, and `--ide-mcp-port` makes agy dial it as if it were netcat. Everything
// here is a relay. The catalog and the tool results belong to the host process,
// which this shim reaches over a loopback control socket (AGY_BRIDGE_CONTROL_PORT
// with AGY_BRIDGE_TOKEN). Nothing is cached: agy may restart this process at any
// moment, and it must then come back with the current catalog.
//
// Ported from magpie-community/plugins packages/agy-cli mcp-server.mjs.
import fs from "node:fs";
import net from "node:net";

const PROTOCOL_VERSION = "2025-11-25";
const SERVER_INFO = { name: "omniroute-agy-cli", version: "0.1.0" };
// The bridge swaps tool catalogs in place and pushes list_changed over a watch channel.
const CAPABILITIES = { tools: { listChanged: true } };
const MAX_MESSAGE_BYTES = 16 * 1024 * 1024;
const CONTROL_PORT = Number(process.env.AGY_BRIDGE_CONTROL_PORT);
const CONTROL_TOKEN = process.env.AGY_BRIDGE_TOKEN;
const CONTROL_CONFIGURED =
  Number.isInteger(CONTROL_PORT) &&
  CONTROL_PORT >= 1 &&
  CONTROL_PORT <= 65535 &&
  typeof CONTROL_TOKEN === "string" &&
  CONTROL_TOKEN.length > 0;

const activeControls = new Set();
const pendingCalls = new Map();
let inputChunks = [];
let inputLength = 0;
let discardingInput = false;
let inputClosed = false;
let watchSocket = null;

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isValidId(value) {
  return (
    value === null ||
    typeof value === "string" ||
    (typeof value === "number" && Number.isFinite(value))
  );
}

function internalError(message = "Internal error") {
  return { code: -32603, message };
}

function closeAllControls() {
  for (const request of [...activeControls]) request.cancel();
}

function closeInput() {
  if (inputClosed) return;
  inputClosed = true;
  inputChunks = [];
  inputLength = 0;
  closeAllControls();
  watchSocket?.destroy();
}

function handleStdoutError(error) {
  closeInput();
  process.exit(error?.code === "EPIPE" ? 0 : 1);
}

// Diagnostics only: AGY_BRIDGE_MCP_TRACE names a file that receives the MCP traffic.
const TRACE_PATH = process.env.AGY_BRIDGE_MCP_TRACE;
function trace(direction, message) {
  if (!TRACE_PATH) return;
  try {
    const summary =
      message?.method === "tools/list" || message?.result?.tools
        ? {
            ...message,
            result: message.result?.tools
              ? { tools: message.result.tools.map((tool) => tool.name) }
              : message.result,
          }
        : message;
    fs.appendFileSync(
      TRACE_PATH,
      JSON.stringify({ at: Date.now(), pid: process.pid, direction, message: summary }) + "\n",
      { mode: 0o600 }
    );
  } catch {
    /* tracing must never break the relay */
  }
}

function send(message) {
  if (inputClosed) return;
  trace("out", message);
  try {
    process.stdout.write(JSON.stringify(message) + "\n");
  } catch (error) {
    handleStdoutError(error);
  }
}

function sendResult(id, result) {
  send({ jsonrpc: "2.0", id, result });
}

function sendError(id, error) {
  send({ jsonrpc: "2.0", id, error });
}

function configurationError() {
  return internalError("Bridge control channel is not configured");
}

function controlRequest(payload) {
  const request = {
    socket: null,
    cancelled: false,
    settled: false,
    cancel: () => {},
    promise: null,
  };

  request.promise = new Promise((resolve) => {
    const failure = () => ({ error: internalError("Bridge control channel failure") });
    const finish = (outcome) => {
      if (request.settled) return;
      request.settled = true;
      activeControls.delete(request);
      request.socket?.destroy();
      resolve(outcome);
    };

    request.cancel = () => {
      if (request.settled) return;
      request.cancelled = true;
      finish(failure());
    };

    activeControls.add(request);

    let socket;
    try {
      socket = net.createConnection({ host: "127.0.0.1", port: CONTROL_PORT });
    } catch {
      finish(failure());
      return;
    }

    request.socket = socket;
    socket.setEncoding("utf8");
    let buffer = "";

    socket.on("connect", () => {
      try {
        socket.write(JSON.stringify(payload) + "\n");
      } catch {
        finish(failure());
      }
    });

    socket.on("data", (chunk) => {
      if (request.settled) return;
      buffer += chunk;
      const newline = buffer.indexOf("\n");
      if (newline < 0) return;
      let line = buffer.slice(0, newline);
      if (line.endsWith("\r")) line = line.slice(0, -1);

      let response;
      try {
        response = JSON.parse(line);
      } catch {
        finish(failure());
        return;
      }

      if (!isObject(response)) {
        finish(failure());
        return;
      }

      if (Object.hasOwn(response, "error")) {
        const error = response.error;
        if (
          !isObject(error) ||
          typeof error.code !== "number" ||
          typeof error.message !== "string"
        ) {
          finish(failure());
          return;
        }
        finish({ error });
        return;
      }

      if (!Object.hasOwn(response, "result")) {
        finish(failure());
        return;
      }

      finish({ result: response.result });
    });

    socket.on("error", () => finish(failure()));
    socket.on("close", () => finish(failure()));
  });

  return request;
}

// One long-lived control connection; each line announces a changed tool catalog.
function startWatch() {
  if (!CONTROL_CONFIGURED || watchSocket || inputClosed) return;
  let socket;
  try {
    socket = net.createConnection({ host: "127.0.0.1", port: CONTROL_PORT });
  } catch {
    return;
  }
  watchSocket = socket;
  socket.setEncoding("utf8");
  let buffer = "";
  socket.on("connect", () => {
    try {
      socket.write(JSON.stringify({ token: CONTROL_TOKEN, kind: "watch" }) + "\n");
    } catch {
      /* the control server went away; tools/list will surface it */
    }
  });
  socket.on("data", (chunk) => {
    buffer += chunk;
    if (buffer.length > MAX_MESSAGE_BYTES) {
      socket.destroy();
      return;
    }
    let newline;
    while ((newline = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, newline);
      buffer = buffer.slice(newline + 1);
      let event;
      try {
        event = JSON.parse(line);
      } catch {
        continue;
      }
      if (isObject(event) && event.event === "tools_changed") {
        send({ jsonrpc: "2.0", method: "notifications/tools/list_changed" });
      }
    }
  });
  socket.on("error", () => {
    /* a dropped watch only costs the next list_changed */
  });
  socket.on("close", () => {
    if (watchSocket === socket) watchSocket = null;
  });
}

function cancelCall(params) {
  if (!isObject(params) || !Object.hasOwn(params, "requestId")) return;
  const request = pendingCalls.get(params.requestId);
  if (!request) return;
  pendingCalls.delete(params.requestId);
  request.cancel();
}

async function listTools(message, hasId) {
  if (!CONTROL_CONFIGURED) {
    if (hasId) sendError(message.id, configurationError());
    return;
  }

  const request = controlRequest({ token: CONTROL_TOKEN, kind: "list" });
  const outcome = await request.promise;
  if (inputClosed || !hasId) return;
  if (outcome.error) sendError(message.id, outcome.error);
  else sendResult(message.id, outcome.result);
}

async function callTool(message, hasId) {
  const params = message.params;
  if (
    !isObject(params) ||
    typeof params.name !== "string" ||
    params.name.length === 0 ||
    (params.arguments !== undefined && !isObject(params.arguments))
  ) {
    if (hasId) sendError(message.id, { code: -32602, message: "Invalid params" });
    return;
  }

  if (!CONTROL_CONFIGURED) {
    if (hasId) sendError(message.id, configurationError());
    return;
  }

  if (hasId && pendingCalls.has(message.id)) {
    sendError(message.id, { code: -32600, message: "Duplicate request id" });
    return;
  }

  const request = controlRequest({
    token: CONTROL_TOKEN,
    kind: "call",
    name: params.name,
    arguments: params.arguments === undefined ? {} : params.arguments,
    meta: params._meta || {},
  });
  if (hasId) pendingCalls.set(message.id, request);

  try {
    const outcome = await request.promise;
    if (inputClosed || request.cancelled || !hasId) return;
    if (outcome.error) sendError(message.id, outcome.error);
    else sendResult(message.id, outcome.result);
  } finally {
    if (hasId && pendingCalls.get(message.id) === request) pendingCalls.delete(message.id);
  }
}

async function handleMessage(message) {
  const hasId = Object.hasOwn(message, "id");

  switch (message.method) {
    case "server/discover":
      // Answer as a pre-2026 server. Under 2026-07-28 agy expects notifications
      // through subscriptions/listen; the initialize flow delivers
      // notifications/tools/list_changed directly, which agy 1.4 honours.
      if (hasId) sendError(message.id, { code: -32601, message: "Method not found" });
      return;
    case "initialize": {
      if (!hasId) return;
      const requestedVersion =
        isObject(message.params) && typeof message.params.protocolVersion === "string"
          ? message.params.protocolVersion
          : PROTOCOL_VERSION;
      sendResult(message.id, {
        protocolVersion: requestedVersion,
        capabilities: CAPABILITIES,
        serverInfo: SERVER_INFO,
      });
      return;
    }
    case "notifications/initialized":
      startWatch();
      return;
    case "notifications/cancelled":
      cancelCall(message.params);
      return;
    case "ping":
      if (hasId) sendResult(message.id, {});
      return;
    case "tools/list":
      startWatch();
      await listTools(message, hasId);
      return;
    case "tools/call":
      await callTool(message, hasId);
      return;
    default:
      if (hasId) sendError(message.id, { code: -32601, message: "Method not found" });
  }
}

function dispatch(message) {
  handleMessage(message).catch(() => {
    if (Object.hasOwn(message, "id")) sendError(message.id, internalError());
  });
}

function handleLine(line) {
  if (line.length > 0 && line[line.length - 1] === 13) line = line.subarray(0, -1);
  if (line.length === 0) return;

  const text = line.toString("utf8");
  if (text.trim().length === 0) return;

  let message;
  try {
    message = JSON.parse(text);
  } catch {
    sendError(null, { code: -32700, message: "Parse error" });
    return;
  }

  if (
    !isObject(message) ||
    message.jsonrpc !== "2.0" ||
    typeof message.method !== "string" ||
    (Object.hasOwn(message, "id") && !isValidId(message.id))
  ) {
    sendError(null, { code: -32600, message: "Invalid Request" });
    return;
  }

  trace("in", message);
  dispatch(message);
}

function handleInput(chunk) {
  let start = 0;

  while (start < chunk.length) {
    const newline = chunk.indexOf(10, start);
    const end = newline < 0 ? chunk.length : newline;

    if (!discardingInput && end > start) {
      const piece = chunk.subarray(start, end);
      if (inputLength + piece.length > MAX_MESSAGE_BYTES) {
        inputChunks = [];
        inputLength = 0;
        discardingInput = true;
        sendError(null, { code: -32600, message: "Invalid Request: message exceeds 16 MiB" });
      } else {
        inputChunks.push(piece);
        inputLength += piece.length;
      }
    }

    if (newline < 0) return;

    if (!discardingInput) {
      const line =
        inputChunks.length === 1 ? inputChunks[0] : Buffer.concat(inputChunks, inputLength);
      inputChunks = [];
      inputLength = 0;
      handleLine(line);
    } else {
      discardingInput = false;
    }

    start = newline + 1;
  }
}

process.stdin.on("data", handleInput);
process.stdin.on("end", closeInput);
process.stdin.on("close", closeInput);
process.stdin.on("error", closeInput);
process.stdout.on("error", handleStdoutError);
