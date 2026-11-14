/**
 * CPA account health: when the deprecated /v0/management/auth-files route is gone (404),
 * the probe retries the same list on /v8/management/credentials. The v0 request stays first,
 * so a CPA that still serves v0 sees no change.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { getCliproxyAccountHealth } from "../../../src/lib/services/cliproxyAccountHealth.ts";

const V0 = "http://127.0.0.1:8317/v0/management/auth-files";
const V8 = "http://127.0.0.1:8317/v8/management/credentials";
const files = { files: [{ auth_index: "acct-1", status: "active" }] };

function stub(routes: Record<string, () => Response>) {
  const seen: Array<{ url: string; authorization: string | null }> = [];
  const fetchImpl = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    seen.push({ url, authorization: new Headers(init?.headers).get("authorization") });
    return (routes[url] ?? (() => new Response(null, { status: 404 })))();
  };
  return { seen, fetchImpl: fetchImpl as typeof fetch };
}

describe("CLIProxyAPI account health v8 fallback", () => {
  it("falls back to /v8/management/credentials when v0 returns 404", async () => {
    const { seen, fetchImpl } = stub({ [V8]: () => Response.json(files) });
    const result = await getCliproxyAccountHealth({ managementKey: "k", fetchImpl });
    assert.equal(result.state, "ready");
    assert.equal(result.accounts[0]?.authIndex, "acct-1");
    assert.deepEqual(
      seen.map((s) => s.url),
      [V0, V8]
    );
    assert.equal(seen[1].authorization, "Bearer k");
  });

  it("does not call v8 when v0 answers", async () => {
    const { seen, fetchImpl } = stub({ [V0]: () => Response.json(files) });
    const result = await getCliproxyAccountHealth({ managementKey: "k", fetchImpl });
    assert.equal(result.state, "ready");
    assert.deepEqual(
      seen.map((s) => s.url),
      [V0]
    );
  });

  it("reports unsupported only after both routes return 404", async () => {
    const { seen, fetchImpl } = stub({});
    const result = await getCliproxyAccountHealth({ managementKey: "k", fetchImpl });
    assert.equal(result.state, "unsupported");
    assert.equal(seen.length, 2);
  });

  it("does not fall back on 401", async () => {
    const { seen, fetchImpl } = stub({ [V0]: () => new Response(null, { status: 401 }) });
    const result = await getCliproxyAccountHealth({ managementKey: "k", fetchImpl });
    assert.equal(result.state, "unauthorized");
    assert.equal(seen.length, 1);
  });
});
