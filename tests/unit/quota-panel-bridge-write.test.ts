/**
 * The quota panel role relays one request with a body: a JSON PATCH of the quota view, with a
 * declared length from 1 to 4096 bytes.
 */

import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import net from "node:net";
import { once } from "node:events";

const bridge = await import("../../src/lib/apiBridgeServer.ts");

type Seen = { method: string; url: string; headers: http.IncomingHttpHeaders; body: string };
type Reply = { status: number; headers?: http.OutgoingHttpHeaders };
type Ctx = { panelPort: number; seen: Seen[]; started: string[] };
type Options = { basePath?: string; timeoutMs?: number; reply?: Reply; apiRole?: boolean };

async function listen(server: http.Server | net.Server, host = "127.0.0.1"): Promise<number> {
  await new Promise<void>((resolve) => server.listen(0, host, resolve));
  return (server.address() as net.AddressInfo).port;
}

function shut(...servers: http.Server[]): void {
  for (const server of servers) {
    server.close();
    server.closeAllConnections();
  }
}

function raw(port: number, bytes: string | Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const socket = net.connect(port, "127.0.0.1");
    let data = "";
    const timer = setTimeout(() => socket.destroy(), 2000);
    socket.setEncoding("utf8");
    socket.on("connect", () => socket.write(bytes));
    socket.on("data", (chunk) => (data += chunk));
    socket.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    socket.on("close", () => {
      clearTimeout(timer);
      resolve(data);
    });
  });
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type KeptAnswer = { data: string; closedByServer: boolean };

/**
 * Sends the bytes on a connection the client keeps alive. Resolves when the bridge closes the
 * socket, or after `boundMs`, when the client closes it itself.
 */
function keptAlive(port: number, bytes: string, boundMs = 4000): Promise<KeptAnswer> {
  return new Promise((resolve) => {
    const socket = net.connect(port, "127.0.0.1");
    let data = "";
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      socket.destroy();
    }, boundMs);
    socket.setEncoding("utf8");
    socket.on("connect", () => socket.write(bytes));
    socket.on("data", (chunk) => (data += chunk));
    socket.on("error", () => {});
    socket.on("close", () => {
      clearTimeout(timer);
      resolve({ data, closedByServer: !timedOut });
    });
  });
}

async function withPanel(fn: (ctx: Ctx) => Promise<void>, options: Options = {}): Promise<void> {
  const seen: Seen[] = [];
  // A request is listed here as soon as its headers reach the main port, before its body.
  const started: string[] = [];
  const reply = options.reply ?? { status: 200 };
  const main = http.createServer((req, res) => {
    started.push(`${req.method} ${req.url}`);
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      seen.push({
        method: req.method || "",
        url: req.url || "",
        headers: req.headers,
        body: Buffer.concat(chunks).toString("utf8"),
      });
      res.writeHead(reply.status, { "content-type": "text/plain", ...reply.headers });
      res.end("relayed");
    });
  });
  const mainPort = await listen(main);
  const role = bridge.createQuotaPanelRole(options.basePath ?? "");
  const tuned =
    options.timeoutMs === undefined || !role.boundedBody
      ? role
      : { ...role, boundedBody: { ...role.boundedBody, timeoutMs: options.timeoutMs } };
  const front = options.apiRole
    ? bridge.createApiBridgeServer(mainPort)
    : bridge.createApiBridgeServer(mainPort, tuned);
  // Longer than any bound of these tests, so a socket that closes was closed by an answer.
  front.keepAliveTimeout = 60_000;
  const panelPort = await listen(front);
  try {
    await fn({ panelPort, seen, started });
  } finally {
    shut(front, main);
  }
}

const BODY =
  '{"pool":"qpr_0123456789abcdef0123456789abcdef","lendingPercent":25,"lendingUntil":null}';
const JSON_TYPE = "Content-Type: application/json";
const length = (body: string) => `Content-Length: ${Buffer.byteLength(body)}`;
function request(line: string, headers: string[], body = ""): string {
  return keepAliveRequest(line, [...headers, "Connection: close"], body);
}
/** A request without `Connection: close`, so only the bridge can close its connection. */
function keepAliveRequest(line: string, headers: string[], body = ""): string {
  const lines = [`${line} HTTP/1.1`, "Host: panel.test", ...headers];
  return `${lines.join("\r\n")}\r\n\r\n${body}`;
}
const NOT_FOUND_BODY = /\{"error":"not_found","message":"Not found\."\}/;

test("a JSON PATCH of the quota view is relayed with exactly the declared bytes", async () => {
  await withPanel(async ({ panelPort, seen }) => {
    for (const path of ["/api/v1/me/quota/claude", "/v1/me/quota/claude"]) {
      const res = await raw(
        panelPort,
        request(
          `PATCH ${path}`,
          [
            JSON_TYPE,
            length(BODY),
            "Authorization: Bearer sk-live-1234567890",
            "X-Middleware-Subrequest: x",
          ],
          BODY
        )
      );
      assert.match(res, /^HTTP\/1\.1 200 /, path);
    }
    assert.deepEqual(
      seen.map((s) => [s.method, s.url, s.body]),
      [
        ["PATCH", "/api/v1/me/quota/claude", BODY],
        ["PATCH", "/v1/me/quota/claude", BODY],
      ]
    );
    assert.equal(seen[0].headers["content-length"], String(Buffer.byteLength(BODY)));
    assert.equal(seen[0].headers["transfer-encoding"], undefined);
    assert.equal(seen[0].headers["content-type"], "application/json");
    assert.equal(seen[0].headers.authorization, "Bearer sk-live-1234567890");
    // The role's request header rule applies to the write as to every other request.
    assert.equal(seen[0].headers["x-middleware-subrequest"], undefined);
    assert.equal(new URL(`http://${seen[0].headers.host}`).hostname, "127.0.0.1");
  });
});

test("a write sent with Expect is relayed without it, body whole", async () => {
  await withPanel(async ({ panelPort, seen }) => {
    const head = [JSON_TYPE, length(BODY), "Expect: 100-continue"];
    const res = await raw(panelPort, request("PATCH /api/v1/me/quota/claude", head, BODY));
    assert.match(res, /\r\n\r\nHTTP\/1\.1 200 |^HTTP\/1\.1 200 /);
    assert.equal(seen.length, 1);
    assert.equal(seen[0].headers.expect, undefined);
    assert.equal(seen[0].body, BODY);
  });
});

test("the largest body is 4096 bytes, and a charset parameter is accepted", async () => {
  await withPanel(async ({ panelPort, seen }) => {
    const full = "a".repeat(4096);
    const head = ["Content-Type: application/json; charset=utf-8", length(full)];
    assert.match(
      await raw(panelPort, request("PATCH /api/v1/me/quota/claude", head, full)),
      /^HTTP\/1\.1 200 /
    );
    assert.equal(seen[0].body.length, 4096);
  });
});

test("a body sent in two writes is relayed whole, and only once it is complete", async () => {
  await withPanel(async ({ panelPort, seen, started }) => {
    const socket = net.connect(panelPort, "127.0.0.1");
    // A write after the far end closed must not fail the test by itself.
    socket.on("error", () => {});
    let answer = "";
    socket.setEncoding("utf8");
    socket.on("data", (chunk) => (answer += chunk));
    const closed = once(socket, "close");
    await once(socket, "connect");
    const head = request("PATCH /api/v1/me/quota/claude", [JSON_TYPE, length(BODY)]);
    socket.write(head + BODY.slice(0, 5));
    await wait(100);
    // The main port has not been contacted while the body is incomplete.
    assert.deepEqual(started, []);
    socket.write(BODY.slice(5));
    await closed;
    assert.match(answer, /^HTTP\/1\.1 200 /);
    assert.equal(seen.length, 1);
    assert.equal(seen[0].body, BODY);
  });
});

test("the answer to a relayed PATCH keeps its status and Retry-After", async () => {
  await withPanel(
    async ({ panelPort }) => {
      const res = await raw(
        panelPort,
        request("PATCH /api/v1/me/quota/claude", [JSON_TYPE, length(BODY)], BODY)
      );
      assert.match(res, /^HTTP\/1\.1 429 /);
      assert.match(res, /\r\nretry-after: 7\r\n/i);
    },
    { reply: { status: 429, headers: { "retry-after": "7" } } }
  );
});

test("a PATCH outside the rule answers 404 and nothing reaches the main port", async () => {
  const ok = [JSON_TYPE, length(BODY)];
  const quota = "PATCH /api/v1/me/quota/claude";
  const cases: Array<[string, string]> = [
    ["page path", request("PATCH /quota/claude", ok, BODY)],
    ["usage path", request("PATCH /api/v1/me/usage", ok, BODY)],
    ["deeper path", request("PATCH /api/v1/me/quota/claude/x", ok, BODY)],
    ["dot segment", request("PATCH /api/v1/me/quota/../quota/claude", ok, BODY)],
    ["encoded dot segment", request("PATCH /api/v1/me/quota/%2e%2e/quota/claude", ok, BODY)],
    ["fragment marker", request("PATCH /api/v1/me/quota/claude#x", ok, BODY)],
    ["no content type", request(quota, [length(BODY)], BODY)],
    ["text content type", request(quota, ["Content-Type: text/plain", length(BODY)], BODY)],
    [
      "json suffix type",
      request(quota, ["Content-Type: application/json-patch+json", length(BODY)], BODY),
    ],
    [
      "other charset",
      request(quota, ["Content-Type: application/json; charset=utf-16", length(BODY)], BODY),
    ],
    ["no length", request(quota, [JSON_TYPE])],
    ["zero length", request(quota, [JSON_TYPE, "Content-Length: 0"])],
    ["length 4097", request(quota, [JSON_TYPE, "Content-Length: 4097"], "a".repeat(4097))],
    ["leading zero", request(quota, [JSON_TYPE, "Content-Length: 05"], "12345")],
    ["chunked", request(quota, [JSON_TYPE, "Transfer-Encoding: chunked"], "2\r\n{}\r\n0\r\n\r\n")],
    ...["POST", "PUT", "DELETE", "OPTIONS"].map((method): [string, string] => [
      method,
      request(`${method} /api/v1/me/quota/claude`, ok, BODY),
    ]),
    ["GET with a JSON body", request("GET /api/v1/me/quota/claude", ok, BODY)],
    ["HEAD with a JSON body", request("HEAD /v1/me/quota/claude", ok, BODY)],
    [
      "OPTIONS without a body",
      request("OPTIONS /api/v1/me/quota/claude", ["Access-Control-Request-Method: PATCH"]),
    ],
  ];
  await withPanel(async ({ panelPort, seen, started }) => {
    for (const [name, bytes] of cases) {
      const res = await raw(panelPort, bytes);
      assert.match(res, /^HTTP\/1\.1 404 /, name);
      // The answer to HEAD carries no body.
      if (!name.startsWith("HEAD")) assert.match(res, NOT_FOUND_BODY, name);
    }
    assert.deepEqual(seen, []);
    assert.deepEqual(started, []);
  });
});

test("a refused PATCH that declares a body closes a kept-alive connection", async () => {
  await withPanel(async ({ panelPort, seen }) => {
    const head = ["Content-Type: text/plain", length(BODY)];
    const answer = await keptAlive(
      panelPort,
      keepAliveRequest("PATCH /api/v1/me/quota/claude", head, BODY)
    );
    assert.match(answer.data, /^HTTP\/1\.1 404 /);
    assert.match(answer.data, NOT_FOUND_BODY);
    assert.match(answer.data, /\r\nconnection: close\r\n/i);
    assert.equal(answer.closedByServer, true);
    assert.deepEqual(seen, []);
  });
});

test("a length the HTTP parser refuses answers 400 and reaches nothing", async () => {
  // Signed, hexadecimal, exponent, listed and repeated lengths, and a length next to a coding.
  const odd = [
    ["Content-Length: +5"],
    ["Content-Length: 0x5"],
    ["Content-Length: 1e1"],
    ["Content-Length: 5, 5"],
    [length(BODY), length(BODY)],
    [length(BODY), "Transfer-Encoding: chunked"],
  ];
  await withPanel(async ({ panelPort, seen, started }) => {
    for (const headers of odd) {
      const res = await raw(
        panelPort,
        request("PATCH /api/v1/me/quota/claude", [JSON_TYPE, ...headers], BODY)
      );
      assert.match(res, /^HTTP\/1\.1 400 /, headers.join());
    }
    assert.deepEqual(seen, []);
    assert.deepEqual(started, []);
    assert.match(await raw(panelPort, request("GET /quota/claude", [])), /^HTTP\/1\.1 200 /);
  });
});

test("a body shorter than its declared length is refused after the wait", async () => {
  await withPanel(
    async ({ panelPort, seen, started }) => {
      const begun = Date.now();
      const answer = await keptAlive(
        panelPort,
        keepAliveRequest("PATCH /api/v1/me/quota/claude", [JSON_TYPE, "Content-Length: 10"], "1234")
      );
      const elapsed = Date.now() - begun;
      assert.match(answer.data, /^HTTP\/1\.1 404 /);
      assert.match(answer.data, NOT_FOUND_BODY);
      assert.match(answer.data, /\r\nconnection: close\r\n/i);
      assert.equal(answer.closedByServer, true);
      assert.ok(elapsed >= 100, `answered after ${elapsed} ms`);
      assert.ok(elapsed < 1500, `answered after ${elapsed} ms`);
      assert.deepEqual(seen, []);
      assert.deepEqual(started, []);
    },
    { timeoutMs: 150 }
  );
});

test("a client that leaves before the declared bytes arrive reaches nothing, and the port stays up", async () => {
  await withPanel(async ({ panelPort, seen, started }) => {
    const socket = net.connect(panelPort, "127.0.0.1");
    // A write after the far end closed must not fail the test by itself.
    socket.on("error", () => {});
    await once(socket, "connect");
    socket.write(
      request("PATCH /api/v1/me/quota/claude", [JSON_TYPE, "Content-Length: 10"], "1234")
    );
    await wait(50);
    socket.destroy();
    await wait(100);
    assert.deepEqual(seen, []);
    assert.deepEqual(started, []);
    assert.match(await raw(panelPort, request("GET /quota/claude", [])), /^HTTP\/1\.1 200 /);
  });
});

test("a complete body followed by bytes the HTTP parser refuses reaches nothing", async () => {
  await withPanel(async ({ panelPort, seen, started }) => {
    const write = request("PATCH /api/v1/me/quota/claude", [JSON_TYPE, length(BODY)], BODY);
    const res = await raw(panelPort, `${write}\u0000not a request\r\n\r\n`);
    assert.match(res, /^HTTP\/1\.1 400 /);
    await wait(100);
    assert.deepEqual(seen, []);
    assert.deepEqual(started, []);
  });
});

test("bytes after the declared length are read as the next request", async () => {
  await withPanel(async ({ panelPort, seen }) => {
    const first = `PATCH /v1/me/quota/claude HTTP/1.1\r\nHost: panel.test\r\n${JSON_TYPE}\r\nContent-Length: 10\r\n\r\n0123456789`;
    await raw(panelPort, first + request("GET /quota/claude", []));
    // The HTTP parser hands the second request over before the first body is complete, so the
    // two may reach the main port in either order.
    const relayed = seen.map((s) => [s.method, s.url, s.body]).sort();
    assert.deepEqual(relayed, [
      ["GET", "/quota/claude", ""],
      ["PATCH", "/v1/me/quota/claude", "0123456789"],
    ]);
  });
});

test("under a base path only the prefixed write path is relayed", async () => {
  await withPanel(
    async ({ panelPort, seen }) => {
      const head = [JSON_TYPE, length(BODY)];
      const prefixed = await raw(panelPort, request("PATCH /x/api/v1/me/quota/claude", head, BODY));
      assert.match(prefixed, /^HTTP\/1\.1 200 /);
      const bare = await raw(panelPort, request("PATCH /api/v1/me/quota/claude", head, BODY));
      assert.match(bare, /^HTTP\/1\.1 404 /);
      assert.match(bare, NOT_FOUND_BODY);
      assert.deepEqual(
        seen.map((s) => [s.method, s.url, s.body]),
        [["PATCH", "/x/api/v1/me/quota/claude", BODY]]
      );
    },
    { basePath: "/x" }
  );
});

test("a role whose base path names an application route refuses the write", async () => {
  await withPanel(
    async ({ panelPort, seen }) => {
      const head = [JSON_TYPE, length(BODY)];
      for (const path of ["/api/api/v1/me/quota/claude", "/api/v1/me/quota/claude"]) {
        const res = await raw(panelPort, request(`PATCH ${path}`, head, BODY));
        assert.match(res, /^HTTP\/1\.1 404 /, path);
      }
      assert.deepEqual(seen, []);
    },
    { basePath: "/api" }
  );
});

test("an upgrade request with PATCH is refused and closed", async () => {
  await withPanel(async ({ panelPort, started }) => {
    const res = await raw(
      panelPort,
      request("PATCH /api/v1/me/quota/claude", [
        JSON_TYPE,
        "Content-Length: 0",
        "Upgrade: websocket",
        "Connection: Upgrade",
      ])
    );
    assert.match(res, /^HTTP\/1\.1 404 /);
    assert.match(res, /\r\nConnection: close\r\n/);
    assert.deepEqual(started, []);
  });
});

test("the API role has no bounded body rule and relays bodies as before", async () => {
  await withPanel(
    async ({ panelPort, seen }) => {
      const body = "b".repeat(5000);
      const res = await raw(
        panelPort,
        request("POST /v1/chat/completions", [JSON_TYPE, length(body)], body)
      );
      assert.match(res, /^HTTP\/1\.1 200 /);
      assert.equal(seen.length, 1);
      assert.equal(seen[0].body, body);
    },
    { apiRole: true }
  );
});
