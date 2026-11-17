import test from "node:test";
import assert from "node:assert/strict";
import { rosebudTools, rosebudToolResult } from "../../open-sse/mcp-server/tools/rosebudTools.ts";
import { rosebudArtifactType } from "../../open-sse/services/rosebud/artifact.ts";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard.ts";
import {
  markMcpPeerLocality,
  withMcpHttpAuthContext,
} from "../../open-sse/mcp-server/httpAuthContext.ts";

test("Rosebud tools are distinct, management-scoped and have no default credit cap", () => {
  assert.equal(new Set(rosebudTools.map((tool) => tool.name)).size, rosebudTools.length);
  for (const tool of rosebudTools) assert.deepEqual(tool.scopes, ["manage"]);
  for (const tool of rosebudTools.filter((tool) => tool.name.startsWith("rosebud_generate_"))) {
    const input = tool.inputSchema.parse({
      connectionId: "123e4567-e89b-42d3-a456-426614174000",
      model: "test",
      idempotencyKey: "stable-retry-key",
      input: { prompt: "hello" },
    }) as Record<string, unknown>;
    assert.equal(input.maxCredits, undefined);
    assert.ok(input.category);
  }
});
test("process spawning routes are local-only", () => {
  for (const action of ["generate", "connect", "account", "publish", "update"])
    assert.equal(isLocalOnlyPath("/api/rosebud/" + action), true);
});
test("download validation rejects a file in the wrong modality", () => {
  const png = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(rosebudArtifactType(png, "image"), "image/png");
  assert.throws(() => rosebudArtifactType(png, "model_3d"), /invalid_artifact/);
  assert.throws(
    () => rosebudArtifactType(Buffer.from("not an asset"), "image"),
    /invalid_artifact/
  );
});

test("MCP binary downloads survive text accessibility truncation", () => {
  const artifact = Buffer.alloc(100000, 42).toString("base64");
  const result = rosebudToolResult({ b64_data: artifact, mime_type: "image/png" });
  assert.equal(result.structuredContent?.b64_data, artifact);
  assert.ok(result.content[0].text.length < 1000);
  assert.equal(JSON.parse(result.content[0].text).artifactField, "structuredContent.b64_data");
  assert.equal(rosebudToolResult({ balance: 10 }).structuredContent, undefined);
});

test("paid MCP generation requires an explicit retry key", () => {
  const image = rosebudTools.find((tool) => tool.name === "rosebud_generate_image");
  assert.ok(image);
  assert.throws(() =>
    image.inputSchema.parse({
      connectionId: "123e4567-e89b-42d3-a456-426614174000",
      model: "test",
      input: { prompt: "hello" },
    })
  );
});

const connectionId = "123e4567-e89b-42d3-a456-426614174000";
const toolNamed = (name: string) => {
  const found = rosebudTools.find((tool) => tool.name === name);
  assert.ok(found);
  return found;
};

test("game operations outlast the CLI limit; other tools keep the shorter timeout", async (context) => {
  const timeouts: number[] = [];
  context.mock.method(AbortSignal, "timeout", (ms: number) => {
    timeouts.push(ms);
    return new AbortController().signal;
  });
  context.mock.method(globalThis, "fetch", async () => new Response("{}"));
  const game = { gameId: connectionId };
  await toolNamed("rosebud_publish_game").handler({ connectionId, game });
  await toolNamed("rosebud_update_game").handler({ connectionId, game });
  await toolNamed("rosebud_pull").handler({ connectionId, game });
  await toolNamed("rosebud_game_status").handler({ connectionId, game });
  await toolNamed("rosebud_models").handler({ connectionId });
  assert.deepEqual(timeouts, [630000, 630000, 630000, 180000, 180000]);
});

test("HTTP callers need a trusted locality and their own identity", async (context) => {
  const fetched = context.mock.method(globalThis, "fetch", async () => new Response("{}"));
  const call = (locality: string | undefined, extra: Record<string, string> = {}) => {
    const request = new Request("http://localhost/api/mcp/stream", { headers: extra });
    if (locality) markMcpPeerLocality(request, locality);
    return withMcpHttpAuthContext(request, () =>
      toolNamed("rosebud_models").handler({ connectionId })
    );
  };
  const auth = { Authorization: "Bearer key" };
  await assert.rejects(call("remote", auth), /trusted local or LAN caller/);
  await assert.rejects(call(undefined, auth), /trusted local or LAN caller/);
  await assert.rejects(call("lan"), /authenticated caller/);
  assert.equal(fetched.mock.callCount(), 0);
  await call("lan", auth);
  assert.equal(fetched.mock.callCount(), 1);
});
