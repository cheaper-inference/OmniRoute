/**
 * The quota panel role of the bridge relays the self-service quota page, the two API routes
 * it calls and the build assets, with GET and HEAD and no request body, plus the one bounded
 * PATCH covered in quota-panel-bridge-write.test.ts, and answers the bridge's 404 for everything
 * else. It goes through the same path guard as the API role.
 */

import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import { once } from "node:events";

const bridge = await import("../../src/lib/apiBridgeServer.ts");
const panel = await import("../../src/lib/quotaPanelBridge.ts");

type Seen = { method: string; url: string; headers: http.IncomingHttpHeaders };
type Reply = { status: number; body: string };
type Recorder = { mainPort: number; seen: Seen[]; upgrades: string[] };
type PanelContext = Recorder & { panelPort: number };
type CallOptions = {
  method?: string;
  headers?: http.OutgoingHttpHeaders;
  body?: string;
  host?: string;
};

const NOT_FOUND = { error: "not_found", message: "Not found." };
const API_NOT_FOUND = {
  error: "not_found",
  message: "API port only serves OpenAI-compatible routes.",
};

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

function createRecorder(): { server: http.Server; seen: Seen[]; upgrades: string[] } {
  const seen: Seen[] = [];
  const upgrades: string[] = [];
  const server = http.createServer((req, res) => {
    seen.push({ method: req.method || "", url: req.url || "", headers: req.headers });
    req.resume();
    req.on("end", () => {
      res.writeHead(200, { "content-type": "text/plain" });
      res.end("relayed");
    });
  });
  server.on("upgrade", (req, socket) => {
    upgrades.push(req.url || "");
    socket.destroy();
  });
  return { server, seen, upgrades };
}

async function withBridge(
  makeBridge: (mainPort: number) => http.Server,
  fn: (ctx: Recorder & { bridgePort: number }) => Promise<void>,
  listenHost = "127.0.0.1"
): Promise<void> {
  const { server: main, seen, upgrades } = createRecorder();
  const mainPort = await listen(main);
  const front = makeBridge(mainPort);
  const bridgePort = await listen(front, listenHost);
  try {
    await fn({ mainPort, seen, upgrades, bridgePort });
  } finally {
    shut(front, main);
  }
}

function withPanel(
  fn: (ctx: PanelContext) => Promise<void>,
  basePath = "",
  listenHost = "127.0.0.1"
): Promise<void> {
  return withBridge(
    (mainPort) => bridge.createApiBridgeServer(mainPort, bridge.createQuotaPanelRole(basePath)),
    ({ bridgePort, ...rest }) => fn({ ...rest, panelPort: bridgePort }),
    listenHost
  );
}

async function closedPort(): Promise<number> {
  const server = net.createServer();
  const port = await listen(server);
  await new Promise<void>((resolve) => server.close(() => resolve()));
  return port;
}

function call(port: number, path: string, options: CallOptions = {}): Promise<Reply> {
  const { method = "GET", body, host = "127.0.0.1" } = options;
  // The client does not declare the length of a body on every method by itself, and an
  // undeclared body would be read as the start of the next request on a kept-alive socket.
  const headers =
    body === undefined
      ? options.headers
      : { "content-length": Buffer.byteLength(body), ...options.headers };
  return new Promise((resolve, reject) => {
    const req = http.request({ host, port, path, method, headers }, (res) => {
      let text = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => (text += chunk));
      res.on("end", () => resolve({ status: res.statusCode || 0, body: text }));
    });
    req.on("error", reject);
    req.end(body);
  });
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

test("the API role is unchanged", async () => {
  // This test passes before the change as well. It pins what the three existing files do not.
  await withBridge(
    (mainPort) => bridge.createApiBridgeServer(mainPort),
    async ({ bridgePort, seen }) => {
      const blocked = await call(bridgePort, "/dashboard");
      assert.equal(blocked.status, 404);
      assert.deepEqual(JSON.parse(blocked.body), API_NOT_FOUND);
      const posted = await call(bridgePort, "/v1/chat/completions", { method: "POST", body: "{}" });
      assert.equal(posted.status, 200);
      assert.equal(seen[0].method, "POST");
    }
  );
  const apiBridge = bridge.createApiBridgeServer(await closedPort());
  const apiPortToClosedTarget = await listen(apiBridge);
  try {
    const down = await call(apiPortToClosedTarget, "/v1/models");
    assert.equal(down.status, 502);
    assert.equal(JSON.parse(down.body).error, "api_bridge_unavailable");
    assert.equal(typeof JSON.parse(down.body).detail, "string");
  } finally {
    shut(apiBridge);
  }
});

test("isRelayablePath runs the guard before any allowlist it is given", () => {
  const anything = () => true;
  assert.equal(bridge.isRelayablePath("/quota/claude"), false);
  assert.equal(bridge.isRelayablePath("/quota/claude", anything), true);
  for (const path of [
    "/quota/../login",
    "/x/%2e%2e/y",
    "/x/..%5cy",
    "/x/%252e%252e/y",
    "/x#",
    "/x/.#",
  ]) {
    assert.equal(bridge.isRelayablePath(path, anything), false, path);
  }
  assert.equal(bridge.isRelayablePath("/x?next=../y#z", anything), true);
});

test("the panel port relays the page, its API routes and its assets with the path unchanged", async () => {
  await withPanel(async ({ panelPort, seen }) => {
    const paths = [
      "/quota/claude",
      "/quota/claude?_rsc=1a2b3",
      "/quota/cc?next=../login",
      "/api/v1/me/quota/claude",
      "/v1/me/quota/claude",
      "/api/v1/me/usage?range=7d",
      "/v1/me/usage?range=30d#../x",
      "/_next/static/chunks/0d_ks0ow7ur6m.js?dpl=abc",
      "/_next/static/chunks/app/quota/%5Bprovider%5D/page-1a2b.js",
      "/_next/static/media/inter.woff2",
      "/favicon.ico",
      "/favicon.svg",
      "/icon-512.png",
      "/apple-touch-icon.png",
    ];
    for (const path of paths) {
      const res = await call(panelPort, path);
      assert.equal(res.status, 200, path);
      assert.equal(res.body, "relayed", path);
    }
    assert.deepEqual(
      seen.map((s) => s.url),
      paths
    );
  });
});

test("the panel port answers 404 for every other path and nothing reaches the main port", async () => {
  await withPanel(async ({ panelPort, seen }) => {
    const blocked = [
      "/",
      "/dashboard",
      "/dashboard/costs/quota-share",
      "/login",
      "/login?next=/quota/claude",
      "/quota",
      "/quota/",
      "/quota/claude/",
      "/quotas/claude",
      "/quota-share/claude",
      "/QUOTA/claude",
      "/api/keys",
      "/api/settings",
      "/api/settings/favicon",
      "/api/auth/login",
      "/api/v1/models",
      "/api/v1/me/status",
      "/api/v1/me-other",
      "/api/v1/mexico",
      "/api/v1/me/sessions",
      "/v1/models",
      "/v1/chat/completions",
      "/v1/me/status",
      "/V1/me/usage",
      "/v1/v1/me/usage",
      "/_next/image?url=%2Ffavicon.svg&w=64&q=75",
      "/_next/static",
      "/_next/static/",
      "/_next/staticx/a.js",
      "/_next/webpack-hmr",
      "/manifest.webmanifest",
      "/sw.js",
      "/providers/claude.svg",
      "//quota/claude",
      "/\\quota/claude",
      "*",
    ];
    for (const path of blocked) {
      const res = await call(panelPort, path);
      assert.equal(res.status, 404, path);
      assert.deepEqual(JSON.parse(res.body), NOT_FOUND, path);
    }
    assert.deepEqual(seen, []);
  });
});

test("the path guard of the bridge applies to the panel port", async () => {
  await withPanel(async ({ panelPort, seen }) => {
    const refused = [
      "/quota/../login",
      "/quota/claude/../../dashboard",
      "/quota/%2e%2e/login",
      "/quota/%2E%2E/login",
      "/quota/..%2flogin",
      "/quota/..%5clogin",
      "/quota/..\\login",
      "/quota/%252e%252e/login",
      "/_next/static/../../api/keys",
      "/_next/static/%2e%2e/%2e%2e/api/keys",
      "/_next/static/chunks/..%2f..%2f..%2fapi/keys",
      "/_next/static/x\\..\\..\\..\\api\\keys",
      "/_next/static/%252e%252e/%252e%252e/api/keys",
      "/_next/static/a/./b.js",
      "/_next/static/.",
      "/api/v1/me/quota/../../../keys",
      "/v1/me/usage/..",
      "/api/v1/me/usage/%2e%2e/%2e%2e/keys",
      "/quota/claude#",
      "/quota/claude#/../../login",
      "/_next/static/a.js#/../../../api/keys",
      "/api/v1/me/usage#x",
      "/_next/static/../server/x",
    ];
    for (const path of refused) {
      const res = await call(panelPort, path);
      assert.equal(res.status, 404, path);
      assert.deepEqual(JSON.parse(res.body), NOT_FOUND, path);
    }
    assert.deepEqual(seen, []);
  });
});

test("the panel port relays GET and HEAD only", async () => {
  await withPanel(async ({ panelPort, seen }) => {
    for (const method of ["POST", "PUT", "PATCH", "DELETE", "OPTIONS", "TRACE"]) {
      for (const path of ["/quota/claude", "/api/v1/me/quota/claude", "/api/v1/me/usage"]) {
        const res = await call(panelPort, path, {
          method,
          body: method === "TRACE" ? undefined : "{}",
        });
        assert.equal(res.status, 404, `${method} ${path}`);
        assert.deepEqual(JSON.parse(res.body), NOT_FOUND);
      }
    }
    // The same methods without a body, so the method rule alone refuses them.
    for (const method of ["POST", "DELETE", "OPTIONS"]) {
      for (const path of ["/quota/claude", "/api/v1/me/quota/claude", "/api/v1/me/usage"]) {
        const response = await raw(
          panelPort,
          `${method} ${path} HTTP/1.1\r\nHost: panel.test\r\nConnection: close\r\n\r\n`
        );
        assert.match(response, /^HTTP\/1\.1 404 /, `${method} ${path}`);
        assert.match(response, /\{"error":"not_found","message":"Not found\."\}/, method);
      }
    }
    assert.deepEqual(seen, []);
    assert.equal((await call(panelPort, "/quota/claude", { method: "HEAD" })).status, 200);
    assert.deepEqual(
      seen.map((s) => s.method),
      ["HEAD"]
    );
  });
});

test("the panel port relays no request body and nothing reaches the main port", async () => {
  await withPanel(async ({ panelPort, seen }) => {
    const requests = [
      "GET /quota/claude HTTP/1.1\r\nHost: panel.test\r\nContent-Length: 2\r\nConnection: close\r\n\r\n{}",
      "HEAD /quota/claude HTTP/1.1\r\nHost: panel.test\r\nContent-Length: 2\r\nConnection: close\r\n\r\n{}",
      "GET /api/v1/me/usage HTTP/1.1\r\nHost: panel.test\r\nTransfer-Encoding: chunked\r\nConnection: close\r\n\r\n2\r\n{}\r\n0\r\n\r\n",
      "HEAD /_next/static/a.js HTTP/1.1\r\nHost: panel.test\r\nTransfer-Encoding: chunked\r\nConnection: close\r\n\r\n0\r\n\r\n",
    ];
    for (const request of requests) {
      const response = await raw(panelPort, request);
      assert.match(response, /^HTTP\/1\.1 404 /, request);
    }
    const getWithBody = await call(panelPort, "/quota/claude", {
      headers: { "content-length": "2" },
      body: "{}",
    });
    assert.equal(getWithBody.status, 404);
    assert.deepEqual(JSON.parse(getWithBody.body), NOT_FOUND);
    assert.deepEqual(seen, []);
    const empty = await raw(
      panelPort,
      "GET /quota/claude HTTP/1.1\r\nHost: panel.test\r\nContent-Length: 0\r\nConnection: close\r\n\r\n"
    );
    assert.match(empty, /^HTTP\/1\.1 200 /);
    assert.deepEqual(
      seen.map((s) => s.url),
      ["/quota/claude"]
    );
  });
  await withBridge(
    (mainPort) => bridge.createApiBridgeServer(mainPort),
    async ({ bridgePort, seen }) => {
      const res = await call(bridgePort, "/v1/models", {
        headers: { "content-length": "2" },
        body: "{}",
      });
      assert.equal(res.status, 200);
      assert.deepEqual(
        seen.map((s) => s.method),
        ["GET"]
      );
    }
  );
});

test("the panel port refuses every upgrade request", async () => {
  await withPanel(async ({ panelPort, seen, upgrades }) => {
    for (const path of [
      "/quota/claude",
      "/_next/static/a.js",
      "/_next/webpack-hmr",
      "/quota/../login",
      "/v1/realtime",
    ]) {
      const response = await raw(
        panelPort,
        `GET ${path} HTTP/1.1\r\nHost: panel.test\r\nConnection: Upgrade\r\nUpgrade: websocket\r\n\r\n`
      );
      assert.match(response, /^HTTP\/1\.1 404 /, path);
      assert.match(response, /"error":"not_found"/, path);
      assert.match(response, /"message":"Not found\."/, path);
    }
    assert.deepEqual(seen, []);
    assert.equal(upgrades.length, 0);
  });
});

test("an absolute-form or CONNECT target reaches nothing through the panel port", async () => {
  await withPanel(async ({ panelPort, seen, upgrades }) => {
    for (const target of [
      "http://127.0.0.1/quota/claude",
      "http://panel.test/dashboard",
      "//panel.test/quota/claude",
    ]) {
      const response = await raw(
        panelPort,
        `GET ${target} HTTP/1.1\r\nHost: panel.test\r\nConnection: close\r\n\r\n`
      );
      assert.match(response, /^HTTP\/1\.1 404 /, target);
    }
    await raw(panelPort, "CONNECT 127.0.0.1:1 HTTP/1.1\r\nHost: 127.0.0.1:1\r\n\r\n");
    assert.deepEqual(seen, []);
    assert.equal(upgrades.length, 0);
  });
});

test("a raw control character or non-ASCII byte in the target is refused and the port stays up", async () => {
  await withPanel(async ({ panelPort, seen }) => {
    const targets: (string | Buffer)[] = [
      "/quota/cl\taude",
      "/quota/claude?a=\tb",
      "/quota/claude\f",
      "/_next/static/.\t./.\t./api/keys",
      Buffer.concat([Buffer.from("/quota/claude?a="), Buffer.from([0xff])]),
      Buffer.concat([Buffer.from("/_next/static/"), Buffer.from([0xe9]), Buffer.from(".js")]),
    ];
    for (const target of targets) {
      const bytes = Buffer.concat([
        Buffer.from("GET "),
        Buffer.from(target),
        Buffer.from(" HTTP/1.1\r\nHost: panel.test\r\nConnection: close\r\n\r\n"),
      ]);
      const response = await raw(panelPort, bytes);
      assert.match(response, /^HTTP\/1\.1 (400|404) /, JSON.stringify(String(target)));
      assert.equal((await call(panelPort, "/quota/claude")).status, 200);
    }
    assert.deepEqual(
      seen.map((s) => s.url),
      targets.map(() => "/quota/claude")
    );
  });
});

test("isRelayableRequest refuses a target outside printable ASCII for the panel role only", () => {
  const panelRole = bridge.createQuotaPanelRole();
  assert.equal(bridge.isRelayableRequest(panelRole, "GET", "/quota/claude"), true);
  assert.equal(bridge.isRelayableRequest(panelRole, "HEAD", "/quota/claude"), true);
  for (const target of [
    "/quota/cl\taude",
    "/quota/claude?a=ÿ",
    "/_next/static/.\t./x",
    "/quota/claude x",
  ]) {
    assert.equal(
      bridge.isRelayableRequest(panelRole, "GET", target),
      false,
      JSON.stringify(target)
    );
  }
  assert.equal(bridge.isRelayableRequest(panelRole, undefined, "/quota/claude"), false);
  assert.equal(bridge.isRelayableRequest(panelRole, "get", "/quota/claude"), false);
  assert.equal(bridge.isRelayableRequest(panelRole, "POST", "/quota/claude"), false);
});

test("under a base path the prefixed page and assets are relayed and the bare ones are not", async () => {
  await withPanel(async ({ panelPort, seen }) => {
    const relayed = [
      "/omniroute/quota/claude",
      "/omniroute/_next/static/chunks/a.js",
      "/omniroute/api/v1/me/usage?range=7d",
    ];
    for (const path of relayed) assert.equal((await call(panelPort, path)).status, 200, path);
    for (const path of [
      "/quota/claude",
      "/_next/static/chunks/a.js",
      "/omniroute",
      "/omniroute/",
      "/omniroute/dashboard",
      "/omniroutex/quota/claude",
      "/omniroute/../quota/claude",
      "/omniroute/quota/../dashboard",
    ]) {
      assert.equal((await call(panelPort, path)).status, 404, path);
    }
    assert.deepEqual(
      seen.map((s) => s.url),
      relayed
    );
  }, "/omniroute");
});

test("a failed relay answers 502 without internal detail", async () => {
  const port = await closedPort();
  const panelBridge = bridge.createApiBridgeServer(port, bridge.createQuotaPanelRole());
  const panelPortToClosedTarget = await listen(panelBridge);
  try {
    const res = await call(panelPortToClosedTarget, "/quota/claude");
    assert.equal(res.status, 502);
    assert.deepEqual(JSON.parse(res.body), { error: "api_bridge_unavailable" });
    assert.equal(res.body.includes(String(port)), false);
    assert.equal(res.body.includes("127.0.0.1"), false);
  } finally {
    shut(panelBridge);
  }
});

test("a loopback client of the panel port reaches the main port with its headers and a loopback Host", async () => {
  await withPanel(async ({ panelPort, mainPort, seen }) => {
    await call(panelPort, "/quota/claude", {
      headers: { "x-forwarded-for": "198.51.100.7", cookie: "NEXT_LOCALE=en" },
    });
    const host = new URL(`http://${seen[0].headers.host}`);
    assert.equal(host.hostname, "127.0.0.1");
    assert.equal(host.port, String(mainPort));
    assert.equal(seen[0].headers["x-forwarded-for"], "198.51.100.7");
    assert.equal(seen[0].headers.cookie, "NEXT_LOCALE=en");
  });
});

const externalAddress = Object.values(os.networkInterfaces())
  .flat()
  .find((entry) => entry && entry.family === "IPv4" && !entry.internal)?.address;

test(
  "a remote client of the panel port is reported by the address of its connection",
  { skip: externalAddress ? false : "no non-loopback IPv4 interface" },
  async (t) => {
    // The expected header assumes no peer is trusted as a proxy.
    const savedTrustProxy = process.env.OMNIROUTE_TRUST_PROXY;
    process.env.OMNIROUTE_TRUST_PROXY = "none";
    t.after(() => {
      if (savedTrustProxy === undefined) delete process.env.OMNIROUTE_TRUST_PROXY;
      else process.env.OMNIROUTE_TRUST_PROXY = savedTrustProxy;
    });
    await withPanel(
      async ({ panelPort, seen }) => {
        await call(panelPort, "/quota/claude", {
          host: externalAddress as string,
          headers: {
            "x-forwarded-for": "198.51.100.77",
            "x-real-ip": "198.51.100.77",
            "x-forwarded-host": "evil.test",
            "x-forwarded-proto": "https",
            forwarded: "for=198.51.100.77",
            "cf-connecting-ip": "198.51.100.77",
          },
        });
        assert.equal(seen[0].headers["x-forwarded-for"], externalAddress);
        for (const name of [
          "x-real-ip",
          "x-forwarded-host",
          "x-forwarded-proto",
          "forwarded",
          "cf-connecting-ip",
        ]) {
          assert.equal(seen[0].headers[name], undefined, name);
        }
      },
      "",
      "0.0.0.0"
    );
  }
);

test("a panel role with an unsupported base path refuses every path", () => {
  for (const basePath of ["/", "/x/"]) {
    const role = bridge.createQuotaPanelRole(basePath);
    for (const path of ["//quota/claude", "/quota/claude", "/x//quota/claude"]) {
      assert.equal(role.isAllowedPath(path), false, `${basePath} ${path}`);
      assert.equal(bridge.isRelayableRequest(role, "GET", path), false, `${basePath} ${path}`);
    }
  }
  assert.equal(bridge.createQuotaPanelRole("/x").isAllowedPath("/x/quota/claude"), true);
});

test("the methods of a panel role cannot be widened", () => {
  const role = bridge.createQuotaPanelRole();
  assert.ok(role.methods);
  assert.deepEqual([...role.methods].sort(), ["GET", "HEAD"]);
  assert.throws(() => (role.methods as string[]).push("POST"), TypeError);
  assert.equal(bridge.isRelayableRequest(role, "POST", "/quota/claude"), false);
  assert.equal(
    bridge.isRelayableRequest(bridge.createQuotaPanelRole(), "POST", "/quota/claude"),
    false
  );
});

test("a refused upgrade closes the socket even when the client keeps its side open", async () => {
  const front = bridge.createApiBridgeServer(await closedPort(), bridge.createQuotaPanelRole());
  const port = await listen(front);
  const client = net.connect({ port, host: "127.0.0.1", allowHalfOpen: true });
  const connections = () =>
    new Promise<number>((resolve, reject) =>
      front.getConnections((error, count) => (error ? reject(error) : resolve(count)))
    );
  try {
    let data = "";
    client.setEncoding("utf8");
    client.on("data", (chunk) => (data += chunk));
    await once(client, "connect");
    client.write(
      "GET /quota/claude HTTP/1.1\r\nHost: panel.test\r\nConnection: Upgrade\r\nUpgrade: websocket\r\n\r\n"
    );
    const deadline = Date.now() + 1000;
    while (!/"error":"not_found"/.test(data) && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    assert.match(data, /^HTTP\/1\.1 404 /);
    let count = await connections();
    while (count > 0 && Date.now() < deadline + 1000) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      count = await connections();
    }
    assert.equal(count, 0);
  } finally {
    client.destroy();
    shut(front);
  }
});

test("a body refusal closes the connection and the next request on it is not served", async () => {
  await withPanel(async ({ panelPort, seen }) => {
    for (const first of [
      "GET /quota/claude HTTP/1.1\r\nHost: panel.test\r\nContent-Length: 2\r\n\r\n{}",
      "GET /quota/claude HTTP/1.1\r\nHost: panel.test\r\nTransfer-Encoding: chunked\r\n\r\n0\r\n\r\n",
    ]) {
      const socket = net.connect(panelPort, "127.0.0.1");
      let data = "";
      socket.setEncoding("utf8");
      socket.on("data", (chunk) => (data += chunk));
      socket.on("error", () => undefined);
      const closed = once(socket, "close");
      await once(socket, "connect");
      socket.write(first);
      const deadline = Date.now() + 1000;
      while (!/"error":"not_found"/.test(data) && Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      assert.match(data, /^HTTP\/1\.1 404 /, first);
      assert.match(data, /\r\nconnection: close\r\n/i, first);
      if (!socket.destroyed && socket.writable) {
        socket.write("GET /quota/claude HTTP/1.1\r\nHost: panel.test\r\n\r\n");
      }
      const timer = setTimeout(() => socket.destroy(), 1000);
      await closed;
      clearTimeout(timer);
      assert.equal(data.match(/HTTP\/1\.1 /g)?.length, 1, first);
    }
    assert.deepEqual(seen, []);
  });
});

test("the panel role object is frozen", () => {
  assert.equal(Object.isFrozen(bridge.createQuotaPanelRole()), true);
  assert.equal(Object.isFrozen(bridge.createQuotaPanelRole("/x")), true);
  const { methods, boundedBody, droppedRequestHeaders, droppedResponseHeaders } =
    bridge.createQuotaPanelRole();
  assert.notEqual(boundedBody, null);
  for (const collection of [
    methods,
    boundedBody,
    droppedResponseHeaders,
    droppedRequestHeaders,
    droppedRequestHeaders.prefixes,
    droppedRequestHeaders.names,
  ]) {
    assert.equal(Object.isFrozen(collection), true);
  }
});

test("a panel role whose base path names an application route refuses every path", () => {
  for (const basePath of ["/api", "/V1", "/_next", "/Quota", "/dashboard/x"]) {
    const role = bridge.createQuotaPanelRole(basePath);
    for (const path of [`${basePath}/quota/claude`, "/quota/claude", `${basePath}/v1/me/usage`]) {
      assert.equal(role.isAllowedPath(path), false, `${basePath} ${path}`);
    }
  }
  assert.equal(bridge.createQuotaPanelRole("/apiary").isAllowedPath("/apiary/quota/claude"), true);
});

test("a refused upgrade handles an error on its socket", async () => {
  const front = bridge.createApiBridgeServer(await closedPort(), bridge.createQuotaPanelRole());
  let listeners = -1;
  let destroyed = false;
  // Runs after the bridge's own upgrade handler, on the same socket.
  front.on("upgrade", (_req, socket) => {
    listeners = socket.listenerCount("error");
    socket.emit("error", Object.assign(new Error("read ECONNRESET"), { code: "ECONNRESET" }));
    destroyed = socket.destroyed;
  });
  const port = await listen(front);
  try {
    const response = await raw(
      port,
      "GET /quota/claude HTTP/1.1\r\nHost: panel.test\r\nConnection: Upgrade\r\nUpgrade: websocket\r\n\r\n"
    );
    assert.ok(listeners >= 1, `error listeners: ${listeners}`);
    assert.equal(destroyed, true);
    assert.ok(response === "" || /^HTTP\/1\.1 404 /.test(response), response);
  } finally {
    shut(front);
  }
});

test("server options reach the bridge server: a short check interval enforces the header timeout", async () => {
  const front = bridge.createApiBridgeServer(await closedPort(), bridge.createQuotaPanelRole(), {
    connectionsCheckingInterval: 50,
  });
  front.headersTimeout = 200;
  const port = await listen(front);
  const client = net.connect(port, "127.0.0.1");
  client.on("error", () => undefined);
  client.resume(); // Read the server's answer, so its close reaches the client.
  try {
    await once(client, "connect");
    const started = Date.now();
    client.write("GET /quo"); // Part of the request line, then nothing.
    const closed = once(client, "close").then(() => Date.now() - started);
    const bound = new Promise<null>((resolve) => setTimeout(() => resolve(null), 2000));
    const elapsed = await Promise.race([closed, bound]);
    assert.notEqual(elapsed, null, "the socket is still open after 2000 ms");
    assert.ok((elapsed as number) >= 190, `closed after ${elapsed} ms, before the timeout`);
  } finally {
    client.destroy();
    shut(front);
  }
});

test("the panel port does not relay the request headers the framework reserves", async () => {
  const dropped = {
    "x-middleware-prefetch": "1",
    "x-middleware-subrequest": "a",
    "X-Middleware-Rewrite": "/dashboard",
    "x-invoke-path": "/dashboard",
    "x-nextjs-data": "1",
    "X-Now-Route-Matches": "a",
    "x-next-revalidate": "1",
    "x-matched-path": "/dashboard",
    "Next-Resume": "1",
  };
  const kept = {
    rsc: "1",
    "next-router-state-tree": "%5B%22%22%5D",
    "next-router-prefetch": "1",
    "next-router-segment-prefetch": "/_tree",
    "next-router-stale-time": "30",
    "next-url": "/quota/claude",
    "next-hmr-refresh": "1",
    accept: "text/x-component",
    authorization: "Bearer sk-test",
    "x-matched-path-extra": "kept, only the exact name is dropped",
  };
  const droppedNames = Object.keys(dropped).map((name) => name.toLowerCase());
  await withPanel(async ({ panelPort, seen }) => {
    const res = await call(panelPort, "/quota/claude", { headers: { ...dropped, ...kept } });
    assert.equal(res.status, 200);
    assert.equal(seen.length, 1);
    for (const name of droppedNames) assert.equal(seen[0].headers[name], undefined, name);
    for (const [name, value] of Object.entries(kept)) {
      assert.equal(seen[0].headers[name], value, name);
    }
  });
  // The API role relays the same headers as before.
  await withBridge(
    (mainPort) => bridge.createApiBridgeServer(mainPort),
    async ({ bridgePort, seen }) => {
      const res = await call(bridgePort, "/v1/models", { headers: { ...dropped, ...kept } });
      assert.equal(res.status, 200);
      for (const name of droppedNames) assert.ok(seen[0].headers[name], name);
      assert.equal(seen[0].headers.rsc, "1");
    }
  );
});

test("an idle socket timeout closes a panel connection whose answer never comes", async () => {
  const silent = http.createServer(() => undefined); // Never answers.
  const mainPort = await listen(silent);
  const front = bridge.createApiBridgeServer(mainPort, bridge.createQuotaPanelRole());
  front.setTimeout(200); // The listener sets its own value the same way.
  const port = await listen(front);
  const client = net.connect(port, "127.0.0.1");
  client.on("error", () => undefined);
  client.resume();
  try {
    await once(client, "connect");
    const started = Date.now();
    client.write("GET /quota/claude HTTP/1.1\r\nHost: panel.test\r\n\r\n");
    const closed = once(client, "close").then(() => Date.now() - started);
    const bound = new Promise<null>((resolve) => setTimeout(() => resolve(null), 2000));
    const elapsed = await Promise.race([closed, bound]);
    assert.notEqual(elapsed, null, "the socket is still open after 2000 ms");
    assert.ok((elapsed as number) >= 190, `closed after ${elapsed} ms, before the timeout`);
  } finally {
    client.destroy();
    shut(front, silent);
  }
});

test("the panel port answers with its own keep-alive, not the main port's", async () => {
  const upstream = http.createServer((req, res) => {
    req.resume();
    res.writeHead(200, {
      "content-type": "text/plain",
      "keep-alive": "timeout=65",
      connection: "keep-alive",
    });
    res.end("relayed");
  });
  const mainPort = await listen(upstream);
  const keepAliveOf = (port: number, path: string) =>
    new Promise<{ status: number; keepAlive: string; connection: string }>((resolve, reject) => {
      const agent = new http.Agent({ keepAlive: true });
      const req = http.request({ host: "127.0.0.1", port, path, agent }, (res) => {
        res.resume();
        res.on("end", () => {
          agent.destroy();
          resolve({
            status: res.statusCode || 0,
            keepAlive: String(res.headers["keep-alive"] ?? ""),
            connection: String(res.headers.connection ?? ""),
          });
        });
      });
      req.on("error", reject);
      req.end();
    });
  // The panel bridge gets the keep-alive value the listener sets on its server.
  const panelFront = bridge.createApiBridgeServer(mainPort, bridge.createQuotaPanelRole());
  panelFront.keepAliveTimeout = panel.QUOTA_PANEL_KEEP_ALIVE_TIMEOUT_MS;
  const apiFront = bridge.createApiBridgeServer(mainPort);
  const panelPort = await listen(panelFront);
  const apiPort = await listen(apiFront);
  try {
    const panelAnswer = await keepAliveOf(panelPort, "/quota/claude");
    assert.equal(panelAnswer.status, 200);
    assert.doesNotMatch(panelAnswer.keepAlive, /timeout=65/);
    assert.match(panelAnswer.keepAlive, /^timeout=5\b/);
    assert.equal(panelAnswer.connection.toLowerCase(), "keep-alive");
    // The API role still copies the main port's answer.
    const apiAnswer = await keepAliveOf(apiPort, "/v1/models");
    assert.equal(apiAnswer.status, 200);
    assert.match(apiAnswer.keepAlive, /timeout=65/);
  } finally {
    shut(panelFront, apiFront, upstream);
  }
});
