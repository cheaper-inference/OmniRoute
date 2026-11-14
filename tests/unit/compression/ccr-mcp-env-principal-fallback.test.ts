/**
 * An MCP HTTP caller must never act as the environment-key principal.
 *
 * The HTTP transport authenticates `x-goog-api-key`, but the ambient auth context only
 * forwards Authorization, Cookie and x-api-key. With no key found there, the caller
 * resolver fell back to OMNIROUTE_API_KEY, whose principal is `env-key`, and the CCR tools
 * preferred that over the caller the transport had already authenticated. The env key is a
 * stdio fallback only.
 */
import { after, test } from "node:test";
import assert from "node:assert/strict";

const ORIGINAL_ENV_KEY = process.env.OMNIROUTE_API_KEY;
process.env.OMNIROUTE_API_KEY = "sk-env-principal-test";

const { withMcpHttpAuthContext } = await import("../../../open-sse/mcp-server/httpAuthContext.ts");
const { resolveMcpCallerApiKeyId } =
  await import("../../../open-sse/mcp-server/mcpCallerIdentity.ts");
const { handleCcrRetrieveTool, handleCcrListTool } =
  await import("../../../open-sse/mcp-server/tools/compressionTools.ts");
const { storeBlock, resetCcrStore } =
  await import("../../../open-sse/services/compression/engines/ccr/index.ts");

after(() => {
  if (ORIGINAL_ENV_KEY === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = ORIGINAL_ENV_KEY;
});

const SECRET = "compressed content that belongs to the env-key principal ".repeat(40);

function googKeyRequest(): Request {
  return new Request("http://localhost/api/mcp/stream", {
    method: "POST",
    headers: { "x-goog-api-key": "sk-tenant-b" },
  });
}

test("stdio keeps the env key as its principal", async () => {
  assert.equal(await resolveMcpCallerApiKeyId(), "env-key");
});

test("an HTTP caller with no forwarded key does not become the env-key principal", async () => {
  const principal = await withMcpHttpAuthContext(googKeyRequest(), () =>
    resolveMcpCallerApiKeyId()
  );
  assert.equal(principal, undefined);
});

test("an x-goog-api-key caller cannot read or list the env-key principal's blocks", async () => {
  resetCcrStore();
  const hash = storeBlock(SECRET, "env-key");
  const extra = { authInfo: { clientId: "77", scopes: ["read:compression"] } };

  const retrieved = await withMcpHttpAuthContext(googKeyRequest(), () =>
    handleCcrRetrieveTool({ hash } as never, extra as never)
  );
  assert.equal((retrieved as { found: boolean }).found, false);

  const listed = await withMcpHttpAuthContext(googKeyRequest(), () =>
    handleCcrListTool({} as never, extra as never)
  );
  assert.ok(!JSON.stringify(listed).includes(hash), "the env-key block was listed");
});

test("the authenticated caller still reaches its own blocks", async () => {
  resetCcrStore();
  const hash = storeBlock(SECRET, "77");
  const extra = { authInfo: { clientId: "77", scopes: ["read:compression"] } };
  const retrieved = await withMcpHttpAuthContext(googKeyRequest(), () =>
    handleCcrRetrieveTool({ hash } as never, extra as never)
  );
  assert.equal((retrieved as { found: boolean }).found, true);
});
