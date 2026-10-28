/**
 * Free-tier egress probe (OPENCODE_FREE_TIER_EGRESS_PROBE, default off).
 *
 * The upstream answers the same 403 FreeTierError for a refused request shape and for a
 * flagged egress IP. With the flag on, a proxied refusal is replayed once through a DIFFERENT
 * proxy (another account proxy, else another pool member): only a 200 there sets the first
 * egress aside in the proxy refusal memory and serves the probe. Both refusing records
 * nothing. A direct connection is never used for the probe, and a refusal that went out
 * direct is never probed.
 */
import { describe, it, before, after, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import net from "node:net";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import type { ExecutorLog, ProviderCredentials } from "../../open-sse/executors/base.ts";
import {
  resolveProxyForRequest,
  runWithAppliedProxyCapture,
  runWithProxyContext,
} from "../../open-sse/utils/proxyFetch.ts";
import { runInRequestContext } from "../../open-sse/executors/opencodeRequestContext.ts";
import {
  __resetProxyRefusalMemoryForTesting,
  __proxyRefusalMemorySizeForTesting,
  isProxyAvoided,
  proxyEgressKey,
  snapshotProxySetAside,
} from "../../open-sse/utils/proxyRefusalMemory.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

const FLAG = "OPENCODE_FREE_TIER_EGRESS_PROBE";
const MODEL = "muse-spark-1.3-contributor-free";
const FPS = ["a", "b", "c"].map((c) => c.repeat(32));
const FREE_TIER_BODY = JSON.stringify({
  type: "error",
  error: {
    type: "FreeTierError",
    message: "OpenCode's free tier can only be used from within OpenCode.",
  },
});
const OTHER_403_BODY = JSON.stringify({
  error: { type: "permission_error", message: "forbidden" },
});

const servers: net.Server[] = [];
const ports: number[] = [];

function listen(server: net.Server): Promise<number> {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve((server.address() as net.AddressInfo).port));
  });
}

before(async () => {
  for (let i = 0; i < 3; i++) {
    const server = net.createServer((s) => s.destroy());
    servers.push(server);
    ports.push(await listen(server));
  }
});

after(() => {
  servers.forEach((s) => s.close());
  resetDbInstance();
});

const proxyAt = (port: number) => ({ type: "http", host: "127.0.0.1", port });
const keyAt = (port: number) => proxyEgressKey(proxyAt(port));

function proxiedCredentials(proxied: Array<number | null>): ProviderCredentials {
  const fingerprints = FPS.slice(0, proxied.length);
  return {
    apiKey: null,
    accessToken: null,
    connectionId: "noauth",
    providerSpecificData: {
      fingerprints,
      accountProxies: fingerprints.map((fp, i) => ({
        fingerprint: fp,
        proxy: proxied[i] === null ? null : proxyAt(proxied[i] as number),
      })),
    },
  };
}

type AccountsProbe = Array<{ fingerprint: string; cooldownUntil: number }>;
const accountsOf = (exec: OpencodeExecutor) =>
  (exec as unknown as { accounts: AccountsProbe }).accounts;

let originalFetch: typeof globalThis.fetch;
let priorFlag: string | undefined;
// Egress of every upstream dispatch, in order: a proxy port, or "direct".
let observed: string[];
let warns: string[];
const log: ExecutorLog = {
  debug() {},
  info() {},
  warn(_tag, message) {
    warns.push(String(message));
  },
  error() {},
};

beforeEach(() => {
  originalFetch = globalThis.fetch;
  priorFlag = process.env[FLAG];
  observed = [];
  warns = [];
  __resetProxyRefusalMemoryForTesting();
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (priorFlag === undefined) delete process.env[FLAG];
  else process.env[FLAG] = priorFlag;
  __resetProxyRefusalMemoryForTesting();
});

/** Each step answers by egress port: a refused egress gets FreeTierError, others 200. */
function installFetch(answer: (egress: string) => { status: number; body?: string }) {
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    const resolved = resolveProxyForRequest(url);
    const egress = resolved.proxyUrl ? new URL(resolved.proxyUrl).port : "direct";
    observed.push(egress);
    const step = answer(egress);
    return new Response(step.body ?? JSON.stringify({ ok: true }), {
      status: step.status,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;
}

const refuseOn =
  (...refused: string[]) =>
  (egress: string) =>
    refused.includes(egress) ? { status: 403, body: FREE_TIER_BODY } : { status: 200 };

async function run(exec: OpencodeExecutor, credentials: ProviderCredentials) {
  const result = (await exec.execute({
    model: MODEL,
    body: {
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "read", parameters: { type: "object" } } }],
      stream: false,
    },
    stream: false,
    signal: null,
    credentials,
    log,
  })) as { response: Response };
  return result.response;
}

/** Keyed single connection served through an ambient pool member (the chat-layer wiring). */
async function runPooled(ambientPort: number, reselect: (() => Promise<unknown>) | undefined) {
  const exec = new OpencodeExecutor("opencode-go");
  const sink: Record<string, unknown> = { proxy: null };
  if (reselect) sink.reselectPoolMember = reselect;
  return runWithProxyContext(proxyAt(ambientPort), () =>
    runWithAppliedProxyCapture(sink as never, () =>
      runInRequestContext(() =>
        run(exec, {
          apiKey: "sk-test",
          accessToken: null,
          connectionId: "noauth",
          providerSpecificData: { fingerprints: [FPS[0]] },
        })
      )
    )
  );
}

describe("flag off (default): behavior unchanged", () => {
  it("account proxies: the refusal is returned after one dispatch, nothing recorded", async () => {
    delete process.env[FLAG];
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch(refuseOn(String(ports[0])));

    const response = await run(exec, proxiedCredentials([ports[0], ports[1], ports[2]]));

    assert.strictEqual(response.status, 403);
    assert.strictEqual(await response.text(), FREE_TIER_BODY);
    assert.deepStrictEqual(observed, [String(ports[0])], "no probe without the flag");
    assert.strictEqual(__proxyRefusalMemorySizeForTesting(), 0);
    for (const a of accountsOf(exec)) assert.strictEqual(a.cooldownUntil, 0);
  });

  it("pool member: the refusal is returned after one dispatch, the pool is not asked", async () => {
    delete process.env[FLAG];
    let asked = 0;
    installFetch(refuseOn(String(ports[0])));

    const response = await runPooled(ports[0], async () => {
      asked++;
      return proxyAt(ports[1]);
    });

    assert.strictEqual(response.status, 403);
    assert.deepStrictEqual(observed, [String(ports[0])]);
    assert.strictEqual(asked, 0);
    assert.strictEqual(__proxyRefusalMemorySizeForTesting(), 0);
  });
});

describe("flag on", () => {
  beforeEach(() => {
    process.env[FLAG] = "true";
  });

  it("flagged egress + healthy egress: probes the other account proxy, serves 200, sets the first aside", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch(refuseOn(String(ports[0])));

    const response = await run(exec, proxiedCredentials([ports[0], ports[1], ports[2]]));

    assert.strictEqual(response.status, 200);
    await response.body?.cancel();
    assert.deepStrictEqual(observed, [String(ports[0]), String(ports[1])]);
    assert.strictEqual(isProxyAvoided(keyAt(ports[0])), true, "flagged egress set aside");
    assert.strictEqual(snapshotProxySetAside(keyAt(ports[0]))?.kind, "geo_blocked");
    assert.strictEqual(isProxyAvoided(keyAt(ports[1])), false, "healthy egress untouched");
    assert.strictEqual(__proxyRefusalMemorySizeForTesting(), 1);
    for (const a of accountsOf(exec)) {
      assert.strictEqual(a.cooldownUntil, 0, "the account is not at fault");
    }
    assert.ok(
      warns.some((l) => l.includes("answered 200") && l.includes(`127.0.0.1:${ports[0]}`)),
      `probe outcome must be logged, got=${JSON.stringify(warns)}`
    );
  });

  it("the set-aside egress is skipped by the next request", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    const creds = proxiedCredentials([ports[0], ports[1], ports[2]]);
    installFetch(refuseOn(String(ports[0])));
    const first = await run(exec, creds);
    await first.body?.cancel();

    observed = [];
    for (let i = 0; i < 3; i++) {
      const next = await run(exec, creds);
      assert.strictEqual(next.status, 200);
      await next.body?.cancel();
    }
    assert.ok(!observed.includes(String(ports[0])), `refused egress reused: ${observed}`);
  });

  it("both egresses refuse: the original refusal is returned and nothing is recorded", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch(() => ({ status: 403, body: FREE_TIER_BODY }));

    const response = await run(exec, proxiedCredentials([ports[0], ports[1], ports[2]]));

    assert.strictEqual(response.status, 403);
    assert.strictEqual(await response.text(), FREE_TIER_BODY, "the original refusal body");
    assert.deepStrictEqual(observed, [String(ports[0]), String(ports[1])], "one probe only");
    assert.strictEqual(__proxyRefusalMemorySizeForTesting(), 0, "nothing recorded");
    assert.strictEqual(isProxyAvoided(keyAt(ports[0])), false);
    assert.strictEqual(isProxyAvoided(keyAt(ports[1])), false);
    for (const a of accountsOf(exec)) assert.strictEqual(a.cooldownUntil, 0);
  });

  it("never probes through a direct connection: a proxy-less sibling is not a probe egress", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch(refuseOn(String(ports[0])));

    const response = await run(exec, proxiedCredentials([ports[0], null]));

    assert.strictEqual(response.status, 403);
    await response.body?.cancel();
    assert.deepStrictEqual(observed, [String(ports[0])], "no direct probe");
    assert.ok(!observed.includes("direct"));
    assert.strictEqual(__proxyRefusalMemorySizeForTesting(), 0);
  });

  it("a refusal that went out direct is never probed (no proxy, no pool: unchanged)", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch(() => ({ status: 403, body: FREE_TIER_BODY }));

    const response = await run(exec, {
      apiKey: null,
      accessToken: null,
      connectionId: "noauth",
      providerSpecificData: {},
    });

    assert.strictEqual(response.status, 403);
    assert.strictEqual(await response.text(), FREE_TIER_BODY);
    assert.deepStrictEqual(observed, ["direct"]);
    assert.strictEqual(__proxyRefusalMemorySizeForTesting(), 0);
  });

  it("a non-FreeTierError 403 is not probed", async () => {
    const exec = new OpencodeExecutor("opencode-zen");
    installFetch(() => ({ status: 403, body: OTHER_403_BODY }));

    const response = await run(exec, proxiedCredentials([ports[0], ports[1]]));

    assert.strictEqual(response.status, 403);
    await response.body?.cancel();
    assert.deepStrictEqual(observed, [String(ports[0])]);
    assert.strictEqual(__proxyRefusalMemorySizeForTesting(), 0);
  });

  it("pool member: probes another member, serves 200 and sets the flagged member aside", async () => {
    installFetch(refuseOn(String(ports[0])));

    const response = await runPooled(ports[0], async () => proxyAt(ports[1]));

    assert.strictEqual(response.status, 200);
    await response.body?.cancel();
    assert.deepStrictEqual(observed, [String(ports[0]), String(ports[1])]);
    assert.strictEqual(isProxyAvoided(keyAt(ports[0])), true);
    assert.strictEqual(isProxyAvoided(keyAt(ports[1])), false);
  });

  it("pool member: both members refuse, nothing recorded", async () => {
    installFetch(() => ({ status: 403, body: FREE_TIER_BODY }));

    const response = await runPooled(ports[0], async () => proxyAt(ports[1]));

    assert.strictEqual(response.status, 403);
    assert.strictEqual(await response.text(), FREE_TIER_BODY);
    assert.deepStrictEqual(observed, [String(ports[0]), String(ports[1])]);
    assert.strictEqual(__proxyRefusalMemorySizeForTesting(), 0);
  });

  it("pool member: a pool with nothing else to offer (null or the same member) is not probed", async () => {
    installFetch(refuseOn(String(ports[0])));
    const nothing = await runPooled(ports[0], async () => null);
    assert.strictEqual(nothing.status, 403);
    await nothing.body?.cancel();

    const same = await runPooled(ports[0], async () => proxyAt(ports[0]));
    assert.strictEqual(same.status, 403);
    await same.body?.cancel();

    assert.deepStrictEqual(observed, [String(ports[0]), String(ports[0])]);
    assert.ok(!observed.includes("direct"));
    assert.strictEqual(__proxyRefusalMemorySizeForTesting(), 0);
  });
});
