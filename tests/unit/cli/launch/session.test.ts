import { test } from "node:test";
import assert from "node:assert/strict";

import { createSessionClient, startHeartbeat } from "../../../../bin/cli/launch/core/session.mjs";
import { viewHash } from "../../../../src/shared/launch/viewSelect.ts";
import { startStubGateway } from "../../../helpers/launch/stubGateway.mjs";

test("mint, PATCH view, heartbeat, usage, DELETE against the stub gateway", async () => {
  const stub = await startStubGateway({ parentKey: "sk-parent" });
  try {
    const client = createSessionClient({ rootUrl: stub.url, credential: "sk-parent" });
    const caps = await client.capabilities();
    assert.ok(caps.features.includes("view"));
    const session = await client.mint({ tool: "fake" });
    assert.match(session.token, /^olx_/);
    const record = stub.sessions.get(session.sessionId);
    assert.equal(record.ttlSec, 900);
    await client.patchView(session, { hash: viewHash(["a", "b"]), ids: ["a", "b"] });
    assert.deepEqual(record.view.ids, ["a", "b"]);
    await client.heartbeat(session);
    assert.equal(record.heartbeats, 1);
    const usage = await client.usage(session);
    assert.equal(usage.sessionId, session.sessionId);
    await client.revoke(session);
    assert.equal(record.revoked, true);
    const patch = stub.requests.find((r: any) => r.method === "PATCH");
    assert.equal(patch.auth, session.token, ":id routes use the session token");
  } finally {
    await stub.close();
  }
});

test("error mapping: 404 GatewayTooOld, 401 AuthFailed, 400 ViewInvalid, network GatewayUnreachable", async () => {
  const old = await startStubGateway({ capabilities: null, sessionsEnabled: false });
  try {
    const client = createSessionClient({ rootUrl: old.url });
    await assert.rejects(
      client.capabilities(),
      (e: any) => e.code === "GatewayTooOld" && e.exitCode === 69
    );
    await assert.rejects(client.mint({ tool: "x" }), (e: any) => e.code === "GatewayTooOld");
  } finally {
    await old.close();
  }
  const auth = await startStubGateway({ parentKey: "right" });
  try {
    const client = createSessionClient({ rootUrl: auth.url, credential: "wrong" });
    await assert.rejects(
      client.mint({ tool: "x" }),
      (e: any) => e.code === "AuthFailed" && e.exitCode === 77
    );
    const ok = createSessionClient({ rootUrl: auth.url, credential: "right" });
    const session = await ok.mint({ tool: "x" });
    await assert.rejects(
      ok.patchView(session, { hash: "h", ids: "nope" }),
      (e: any) => e.code === "ViewInvalid" && e.exitCode === 70
    );
    assert.ok(!(await ok.revoke(session).then(() => "ok")).includes("olx_"));
  } finally {
    await auth.close();
  }
  const closed = await startStubGateway();
  const url = closed.url;
  await closed.close();
  await assert.rejects(
    createSessionClient({ rootUrl: url }).capabilities(),
    (e: any) => e.code === "GatewayUnreachable"
  );
});

test("heartbeat interval: calls PATCH heartbeat, warns once on failure, stops", async () => {
  let ticks: Function | undefined;
  let cleared = false;
  const calls: string[] = [];
  const warnings: string[] = [];
  const client = {
    heartbeat: async () => {
      calls.push("hb");
      throw new Error("down");
    },
  };
  const hb = startHeartbeat(
    client,
    { sessionId: "s", token: "t" },
    {
      intervalMs: 60000,
      warn: (m: string) => warnings.push(m),
      setInterval: (fn: Function, ms: number) => {
        assert.equal(ms, 60000);
        ticks = fn;
        return 1;
      },
      clearInterval: () => {
        cleared = true;
      },
    }
  );
  ticks!();
  ticks!();
  await new Promise((r) => setImmediate(r));
  assert.equal(calls.length, 2);
  assert.equal(warnings.length, 1);
  hb.stop();
  assert.equal(cleared, true);
});

test("mint sends sessionTag only when a tag is given", async () => {
  const stub = await startStubGateway({ parentKey: "sk-parent" });
  try {
    const client = createSessionClient({ rootUrl: stub.url, credential: "sk-parent" });
    await client.mint({ tool: "fake" });
    await client.mint({ tool: "fake", tag: "ci:run-1" });
    const posts = stub.requests.filter((r: { method: string }) => r.method === "POST");
    assert.equal("sessionTag" in posts[0].body, false);
    assert.equal(posts[1].body.sessionTag, "ci:run-1");
    const [first, second] = [...stub.sessions.values()] as { id: string; sessionTag: string }[];
    assert.equal(first.sessionTag, `launch:fake:${first.id}`);
    assert.equal(second.sessionTag, "ci:run-1");
  } finally {
    await stub.close();
  }
});

test("stub validates bodies with the gateway Zod schemas (400 like G1)", async () => {
  const stub = await startStubGateway({ parentKey: "sk-parent" });
  try {
    const post = (body: unknown) =>
      fetch(`${stub.url}/api/launch/sessions`, {
        method: "POST",
        headers: { authorization: "Bearer sk-parent", "content-type": "application/json" },
        body: JSON.stringify(body),
      });
    assert.equal((await post({ tool: "fake", bogus: 1 })).status, 400, "unknown field");
    assert.equal((await post({ ttlSec: 900 })).status, 400, "tool required");
    assert.equal((await post({ tool: "fake", sessionTag: "bad tag!" })).status, 400);
    assert.equal((await post({ tool: "fake" })).status, 201);

    const client = createSessionClient({ rootUrl: stub.url, credential: "sk-parent" });
    const session = await client.mint({ tool: "fake" });
    await assert.rejects(
      client.patchView(session, { hash: "h" }),
      (e: { code?: string }) => e.code === "ViewInvalid"
    );
    const empty = await fetch(`${stub.url}/api/launch/sessions/${session.sessionId}`, {
      method: "PATCH",
      headers: { authorization: `Bearer ${session.token}`, "content-type": "application/json" },
      body: "{}",
    });
    assert.equal(empty.status, 400, "empty patch rejected by the schema");
  } finally {
    await stub.close();
  }
});

test("stub auth parity: parent key and anonymous callers, revoked token 401", async () => {
  const stub = await startStubGateway({ parentKey: "sk-parent" });
  try {
    const client = createSessionClient({ rootUrl: stub.url, credential: "sk-parent" });
    const session = await client.mint({ tool: "fake" });
    const call = (method: string, suffix: string, auth?: string, body?: unknown) =>
      fetch(`${stub.url}/api/launch/sessions/${session.sessionId}${suffix}`, {
        method,
        headers: {
          ...(auth ? { authorization: `Bearer ${auth}` } : {}),
          ...(body ? { "content-type": "application/json" } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
    assert.equal((await call("PATCH", "", "sk-parent", { heartbeat: true })).status, 200);
    assert.equal((await call("GET", "/usage", "sk-parent")).status, 200);
    assert.equal((await call("PATCH", "", undefined, { heartbeat: true })).status, 401);
    assert.equal((await call("PATCH", "", "sk-wrong", { heartbeat: true })).status, 401);
    assert.equal((await call("DELETE", "", session.token)).status, 200);
    assert.equal((await call("GET", "/usage", session.token)).status, 401, "revoked token");
    assert.equal((await call("DELETE", "", "sk-parent")).status, 200, "parent may re-delete");
  } finally {
    await stub.close();
  }

  const anon = await startStubGateway();
  try {
    const client = createSessionClient({ rootUrl: anon.url });
    const session = await client.mint({ tool: "fake" });
    const res = await fetch(`${anon.url}/api/launch/sessions/${session.sessionId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ heartbeat: true }),
    });
    assert.equal(res.status, 200, "anonymous PATCH on an anonymous session");
  } finally {
    await anon.close();
  }
});
